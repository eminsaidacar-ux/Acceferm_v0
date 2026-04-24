import type Stripe from "stripe";
import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/integrations/stripe";
import { sendOrderConfirmationEmail } from "@/lib/integrations/brevo";
import { getPayload } from "@/lib/payload";

/**
 * POST /api/webhooks/stripe
 *
 * Webhook Stripe — **source de vérité** du statut paiement.
 *
 * Events traités :
 * - checkout.session.completed → Order → status=paid + email Brevo
 * - payment_intent.payment_failed → Order → status=cancelled
 *
 * Signature validée via stripe.webhooks.constructEvent avec STRIPE_WEBHOOK_SECRET.
 * Idempotence : si la commande est déjà en "paid", on ignore (retry Stripe).
 */

// Next.js exige que le body soit brut (non parsé) pour la validation signature.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET manquante");
    return NextResponse.json({ error: "Config manquante" }, { status: 500 });
  }

  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature invalide";
    console.error("[webhook] Signature rejetée :", message);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const payload = await getPayload();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (!orderId) {
          console.warn("[webhook] Session sans orderId :", session.id);
          break;
        }

        // Idempotence
        const order = await payload.findByID({
          collection: "orders",
          id: orderId,
          depth: 0,
        });
        if (order.status === "paid") {
          console.log("[webhook] Order déjà paid, skip :", orderId);
          break;
        }

        // Update commande
        const updated = await payload.update({
          collection: "orders",
          id: orderId,
          data: {
            status: "paid",
            paidAt: new Date().toISOString(),
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id ?? undefined,
          },
          depth: 1,
        });

        // Email de confirmation
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acceferm.fr";
          await sendOrderConfirmationEmail({
            to: {
              email: updated.contactEmail,
              name: updated.contactName,
            },
            orderNumber: updated.orderNumber,
            items: (updated.items ?? []).map(
              (it: { productName: string; quantity: number; unitPriceHT: number }) => ({
                productName: it.productName,
                quantity: it.quantity,
                unitPriceHT: it.unitPriceHT,
              }),
            ),
            totalHT: updated.subtotalHT + (updated.shippingHT ?? 0),
            vatAmount: updated.vatAmount,
            totalTTC: updated.totalTTC,
            shippingAddress: updated.shippingAddress,
            siteUrl,
          });
          console.log("[webhook] Email envoyé pour", updated.orderNumber);
        } catch (emailErr) {
          console.error("[webhook] Email échoué (commande OK) :", emailErr);
          // Ne pas faire échouer le webhook si l'email rate — Stripe retry sinon.
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const orderId = intent.metadata?.orderId;
        if (!orderId) break;
        await payload.update({
          collection: "orders",
          id: orderId,
          data: { status: "cancelled" },
        });
        break;
      }

      default:
        console.log("[webhook] Event ignoré :", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook] Traitement error :", err);
    // On renvoie 500 — Stripe retry automatiquement.
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}
