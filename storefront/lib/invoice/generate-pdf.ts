import { createHash } from "node:crypto";
import { renderToBuffer } from "@react-pdf/renderer";
import { Invoice } from "./Invoice";

/**
 * Génère le PDF de bon de commande AcceFerm Pro.
 *
 * Usage côté webhook Stripe (après status=paid) :
 *   const pdf = await generateInvoicePdf(order);
 *   // upload vers Payload media collection + lier à Order.invoice
 *
 * Hash SHA-256 calculé sur le snapshot canonique (orderNumber + items + totaux)
 * pour traçabilité — inclus en footer PDF.
 */

type OrderLike = {
  orderNumber: string;
  createdAt?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  contactCompany?: string | null;
  billingAddress: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    postalCode?: string | null;
    country?: string | null;
  };
  shippingAddress: {
    line1: string;
    line2?: string | null;
    city: string;
    postalCode: string;
    country?: string | null;
  };
  items: Array<{
    productName: string;
    quantity: number;
    unitPriceHT: number;
  }>;
  subtotalHT: number;
  shippingHT?: number | null;
  vatAmount: number;
  totalTTC: number;
};

export async function generateInvoicePdf(order: OrderLike): Promise<Buffer> {
  // Canonical snapshot pour hash
  const canonical = JSON.stringify({
    orderNumber: order.orderNumber,
    items: order.items.map((i) => ({
      n: i.productName,
      q: i.quantity,
      p: i.unitPriceHT,
    })),
    totals: {
      ht: order.subtotalHT,
      tva: order.vatAmount,
      ttc: order.totalTTC,
    },
  });
  const hash = createHash("sha256").update(canonical).digest("hex");

  // Billing = billing ou fallback shipping
  const billing =
    order.billingAddress?.line1 && order.billingAddress?.city && order.billingAddress?.postalCode
      ? {
          line1: order.billingAddress.line1,
          line2: order.billingAddress.line2 ?? null,
          city: order.billingAddress.city,
          postalCode: order.billingAddress.postalCode,
          country: order.billingAddress.country ?? "FR",
        }
      : order.shippingAddress;

  const issuedAt = order.createdAt ? new Date(order.createdAt) : new Date();

  const pdf = await renderToBuffer(
    Invoice({
      orderNumber: order.orderNumber,
      issuedAt,
      customer: {
        name: order.contactName,
        company: order.contactCompany,
        email: order.contactEmail,
        phone: order.contactPhone,
      },
      billingAddress: billing,
      items: order.items.map((it) => ({
        productName: it.productName,
        quantity: it.quantity,
        unitPriceHT: it.unitPriceHT,
        vatRate: 0.2,
      })),
      subtotalHT: order.subtotalHT,
      shippingHT: order.shippingHT ?? 0,
      vatAmount: order.vatAmount,
      totalTTC: order.totalTTC,
      hash,
    }),
  );

  return pdf;
}
