/**
 * Utilitaires commandes AcceFerm Pro.
 *
 * Règle compliance : numéro commande AcceFerm (AF-YYYY-XXXX) distinct du
 * numéro facture Odoo. Odoo est seul émetteur de la facture fiscale PDP.
 */

/**
 * Génère un N° commande format AF-YYYY-XXXX (4 chiffres aléatoires).
 * Collision improbable à petite échelle — à remplacer par une séquence DB
 * dès que volume > 1 000 commandes/jour.
 */
export function generateOrderNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `AF-${year}-${random}`;
}

/**
 * Calcule les totaux d'une commande depuis les items.
 * Retourne HT / TVA / TTC + breakdown par taux de TVA.
 */
export function computeTotals(
  items: Array<{ unitPriceHT: number; quantity: number; vatRate: number }>,
  shippingHT = 0,
) {
  const subtotalHT = items.reduce((s, it) => s + it.unitPriceHT * it.quantity, 0);
  const totalHT = subtotalHT + shippingHT;
  const vatAmount = items.reduce(
    (s, it) => s + it.unitPriceHT * it.quantity * it.vatRate,
    0,
  );
  const totalTTC = totalHT + vatAmount;
  return {
    subtotalHT: round2(subtotalHT),
    shippingHT: round2(shippingHT),
    totalHT: round2(totalHT),
    vatAmount: round2(vatAmount),
    totalTTC: round2(totalTTC),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
