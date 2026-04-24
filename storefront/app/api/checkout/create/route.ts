import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPayload } from "@/lib/payload";
import { getStripe } from "@/lib/integrations/stripe";
import { computeTotals, generateOrderNumber } from "@/lib/orders";

/**
 * POST /api/checkout/create
 *
 * Crée une session Stripe Checkout à partir d'un panier client.
 *
 * Flow :
 * 1. Valide les items reçus (Zod).
 * 2. Fetch chaque produit via Payload (source de vérité prix + stock).
 * 3. Rejette :
 *    - produit introuvable ou inactif
 *    - stock insuffisant
 *    - motorisation AFCA (clause commerciale : pas d'achat direct public,
 *      doit passer par configurateur + devis)
 *    - produit requiresProAccount sans auth pro (sprint 2)
 * 4. Crée la commande en DB (statut "pending").
 * 5. Crée la session Stripe Checkout avec les line items corrects.
 * 6. Retourne l'URL de redirection Stripe.
 *
 * Le statut de la commande passe à "paid" uniquement via webhook Stripe
 * (voir /api/webhooks/stripe). Source de vérité = webhook.
 */

const Body = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(999),
      }),
    )
    .min(1)
    .max(50),
  contact: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().max(30).optional(),
    company: z.string().max(100).optional(),
  }),
  shippingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().default("FR"),
  }),
  customerId: z.string().optional(), // Compte pro authentifié
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const { items, contact, shippingAddress, customerId } = parsed.data;

    const payload = await getPayload();

    // 1. Fetch tous les produits en une requête
    const productIds = items.map((i) => i.productId);
    const { docs: products } = await payload.find({
      collection: "products",
      where: {
        and: [
          { id: { in: productIds } },
          { active: { equals: true } },
        ],
      },
      limit: items.length,
      depth: 0,
    });

    const productMap = new Map(products.map((p) => [String(p.id), p]));

    // 2. Valider chaque item
    const validatedItems: Array<{
      productId: string;
      productName: string;
      unitPriceHT: number;
      quantity: number;
      vatRate: number;
    }> = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: "Produit introuvable", productId: item.productId },
          { status: 400 },
        );
      }
      // Clause AFCA : motorisations non achetables en direct public
      if (product.isMotorisation) {
        return NextResponse.json(
          {
            error:
              "Les motorisations doivent passer par le configurateur. Devis sous 24h ouvrées.",
            productId: item.productId,
            redirectTo: "/configurer",
          },
          { status: 403 },
        );
      }
      // Pro-only sans auth
      if (product.requiresProAccount && !customerId) {
        return NextResponse.json(
          {
            error: "Ce produit est réservé aux comptes pros validés.",
            productId: item.productId,
            redirectTo: "/compte-pro/nouveau",
          },
          { status: 403 },
        );
      }
      // Stock
      if (product.stock !== undefined && product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: "Stock insuffisant",
            productId: item.productId,
            available: product.stock,
            requested: item.quantity,
          },
          { status: 400 },
        );
      }
      validatedItems.push({
        productId: String(product.id),
        productName: product.name,
        unitPriceHT: Number(product.priceHT ?? 0),
        quantity: item.quantity,
        vatRate: Number(product.vatRate ?? 0.2),
      });
    }

    // 3. Calcul des totaux
    const totals = computeTotals(validatedItems);
    const orderNumber = generateOrderNumber();

    // 4. Créer la commande en DB (statut pending)
    const order = await payload.create({
      collection: "orders",
      data: {
        orderNumber,
        status: "pending",
        contactEmail: contact.email,
        contactName: contact.name,
        contactPhone: contact.phone,
        contactCompany: contact.company,
        customer: customerId ? (customerId as unknown as number) : undefined,
        items: validatedItems.map((it) => ({
          product: it.productId as unknown as number,
          productName: it.productName,
          quantity: it.quantity,
          unitPriceHT: it.unitPriceHT,
        })),
        subtotalHT: totals.subtotalHT,
        shippingHT: totals.shippingHT,
        vatAmount: totals.vatAmount,
        totalTTC: totals.totalTTC,
        currency: "EUR",
        shippingAddress,
        billingAddress: { ...shippingAddress, sameAsShipping: true },
      },
    });

    // 5. Créer la session Stripe Checkout
    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: validatedItems.map((it) => ({
        quantity: it.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(it.unitPriceHT * (1 + it.vatRate) * 100), // TTC en cents
          product_data: {
            name: it.productName,
            description: `AcceFerm Pro · ${orderNumber}`,
          },
          tax_behavior: "inclusive",
        },
      })),
      customer_email: contact.email,
      client_reference_id: String(order.id),
      metadata: {
        orderId: String(order.id),
        orderNumber,
        source: "acceferm-web",
      },
      shipping_address_collection: { allowed_countries: ["FR"] },
      success_url: `${siteUrl}/commande/succes?order=${orderNumber}&session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/panier?cancelled=1`,
      locale: "fr",
    });

    // 6. Lier la session Stripe à la commande
    await payload.update({
      collection: "orders",
      id: order.id,
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json({
      orderNumber,
      orderId: String(order.id),
      checkoutUrl: session.url,
    });
  } catch (err) {
    console.error("[/api/checkout/create] error", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: "Erreur interne", message }, { status: 500 });
  }
}
