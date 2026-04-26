import * as brevo from "@getbrevo/brevo";

/**
 * Client Brevo (email transactional).
 *
 * Prérequis : BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME dans env.
 * DNS SPF/DKIM/DMARC obligatoires côté registrar (voir docs/admin-emin.md).
 */

let cached: brevo.TransactionalEmailsApi | null = null;

function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (cached) return cached;
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error(
      "BREVO_API_KEY manquante. Configurer dans Vercel env vars (voir docs/admin-emin.md).",
    );
  }
  const client = new brevo.TransactionalEmailsApi();
  client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  cached = client;
  return cached;
}

type OrderItemForEmail = {
  productName: string;
  quantity: number;
  unitPriceHT: number;
};

type SendOrderConfirmationArgs = {
  to: { email: string; name: string };
  orderNumber: string;
  items: OrderItemForEmail[];
  totalHT: number;
  vatAmount: number;
  totalTTC: number;
  shippingAddress: {
    line1: string;
    line2?: string | null;
    city: string;
    postalCode: string;
  };
  siteUrl: string;
};

/**
 * Envoie l'email de confirmation de commande payée.
 * Template HTML inline pour éviter la dépendance au builder Brevo.
 */
export async function sendOrderConfirmationEmail(args: SendOrderConfirmationArgs) {
  const client = getBrevoClient();
  const sender = {
    email: process.env.BREVO_SENDER_EMAIL ?? "noreply@acceferm.fr",
    name: process.env.BREVO_SENDER_NAME ?? "AcceFerm Pro",
  };

  const sendSmtpEmail: brevo.SendSmtpEmail = {
    sender,
    to: [args.to],
    subject: `✓ Commande ${args.orderNumber} confirmée — AcceFerm Pro`,
    htmlContent: renderOrderEmailHtml(args),
    textContent: renderOrderEmailText(args),
    tags: ["order-confirmation", "sprint1"],
  };

  return client.sendTransacEmail(sendSmtpEmail);
}

function renderOrderEmailHtml(args: SendOrderConfirmationArgs): string {
  const itemsRows = args.items
    .map(
      (it) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5dcc6;">
            <div style="font-weight: 600; color: #1a1814;">${escapeHtml(it.productName)}</div>
            <div style="font-size: 12px; color: #6b6358; margin-top: 4px;">Qté × ${it.quantity}</div>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #e5dcc6; font-variant-numeric: tabular-nums; color: #1a1814;">
            ${fmt(it.unitPriceHT * it.quantity)} € HT
          </td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Commande ${args.orderNumber}</title>
</head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#faf7f2">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:40px 0;">
        <tr><td style="padding:0 32px;">

          <!-- Logo -->
          <div style="font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#1a1814;">
            AcceFerm <span style="color:#c4855c;font-style:italic;">Pro</span>
          </div>

          <!-- Accent band -->
          <div style="margin-top:32px;padding:24px;background:#fde6e8;border-radius:16px;border:1px solid #e11021;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#e11021;font-family:monospace;">
              ● COMMANDE CONFIRMÉE
            </div>
            <div style="margin-top:8px;font-size:32px;font-weight:600;color:#1a1814;">
              ${args.orderNumber}
            </div>
            <div style="margin-top:4px;font-size:14px;color:#6b6358;">
              Merci ${escapeHtml(args.to.name)}, votre paiement a été reçu.
            </div>
          </div>

          <!-- Items -->
          <h2 style="margin:40px 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.22em;color:#6b6358;font-weight:500;">
            Votre commande
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${itemsRows}
            <tr>
              <td style="padding:16px 0 0;color:#6b6358;font-size:13px;">Sous-total HT</td>
              <td align="right" style="padding:16px 0 0;color:#6b6358;font-size:13px;font-variant-numeric:tabular-nums;">
                ${fmt(args.totalHT)} €
              </td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#6b6358;font-size:13px;">TVA</td>
              <td align="right" style="padding:4px 0;color:#6b6358;font-size:13px;font-variant-numeric:tabular-nums;">
                ${fmt(args.vatAmount)} €
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0 0;border-top:1px solid #1a1814;font-weight:600;color:#1a1814;">
                Total TTC
              </td>
              <td align="right" style="padding:12px 0 0;border-top:1px solid #1a1814;font-weight:600;font-size:18px;color:#1a1814;font-variant-numeric:tabular-nums;">
                ${fmt(args.totalTTC)} €
              </td>
            </tr>
          </table>

          <!-- Livraison -->
          <h2 style="margin:40px 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.22em;color:#6b6358;font-weight:500;">
            Livraison
          </h2>
          <div style="padding:16px;background:#f2ede2;border-radius:12px;font-size:14px;color:#1a1814;line-height:1.5;">
            ${escapeHtml(args.shippingAddress.line1)}<br />
            ${args.shippingAddress.line2 ? `${escapeHtml(args.shippingAddress.line2)}<br />` : ""}
            ${escapeHtml(args.shippingAddress.postalCode)} ${escapeHtml(args.shippingAddress.city)}
          </div>
          <div style="margin-top:16px;font-size:13px;color:#6b6358;line-height:1.5;">
            Commandé avant 16 h IDF — <strong style="color:#1a1814;">expédition J+1</strong>. Vous
            recevrez un N° de suivi transporteur par email dès que le colis part.
          </div>

          <!-- CTA -->
          <div style="margin-top:40px;text-align:center;">
            <a href="${args.siteUrl}/pro" style="display:inline-block;padding:14px 28px;background:#e11021;color:#fdfaf3;text-decoration:none;border-radius:999px;font-weight:500;font-size:14px;">
              Voir ma commande →
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top:48px;padding-top:24px;border-top:1px solid #e5dcc6;font-size:12px;color:#958b7c;line-height:1.6;">
            <strong style="color:#1a1814;">AcceFerm Pro</strong> — division e-commerce d'IEF & Co<br />
            8 Rue René Dubos, 95410 Groslay · SIRET 888 693 981<br />
            SAV technique : <a href="#numero-a-confirmer" style="color:#e11021;">01 XX XX XX XX</a> · L-V 8h-19h
          </div>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function renderOrderEmailText(args: SendOrderConfirmationArgs): string {
  const lines = [
    `Commande ${args.orderNumber} confirmée`,
    "",
    `Merci ${args.to.name}, votre paiement a été reçu.`,
    "",
    "Votre commande :",
    ...args.items.map(
      (it) => `- ${it.productName} × ${it.quantity} : ${fmt(it.unitPriceHT * it.quantity)} € HT`,
    ),
    "",
    `Sous-total HT : ${fmt(args.totalHT)} €`,
    `TVA : ${fmt(args.vatAmount)} €`,
    `Total TTC : ${fmt(args.totalTTC)} €`,
    "",
    "Livraison :",
    args.shippingAddress.line1,
    args.shippingAddress.line2 ?? "",
    `${args.shippingAddress.postalCode} ${args.shippingAddress.city}`,
    "",
    "Expédition J+1 si commande avant 16h IDF.",
    "",
    `Voir ma commande : ${args.siteUrl}/pro`,
    "",
    "AcceFerm Pro — IEF & Co · 01 XX XX XX XX",
  ];
  return lines.filter(Boolean).join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
