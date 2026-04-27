/**
 * Grille tarifaire IEF & CO — contrats de maintenance fermetures (v0.7.1).
 *
 * Tarifs HT/an par équipement, validés par 2 contrats clients réels
 * (HFC Technics, UNIVAR Solutions). `null` = formule non applicable
 * pour cet équipement (ex : Sérénité indispo sur rideau métallique
 * manuel ou portail battant hydraulique).
 */

export type Formule = "essentiel" | "confort" | "serenite";
export type EquipmentId = keyof typeof MAINTENANCE_PRICING;

export const MAINTENANCE_PRICING = {
  "rideau-metallique-manuel": { essentiel: 147, confort: 268, serenite: null },
  "rideau-metallique-motorise": { essentiel: 189, confort: 348, serenite: 578 },
  "porte-sectionnelle-motorisee": { essentiel: 197, confort: 358, serenite: 597 },
  "porte-souple-rapide": { essentiel: 237, confort: 418, serenite: 738 },
  "portail-coulissant-motorise": { essentiel: 189, confort: 348, serenite: 587 },
  "portail-battant-motorise": { essentiel: 197, confort: 358, serenite: 617 },
  "portail-battant-hydraulique": { essentiel: 317.55, confort: null, serenite: null },
  "barriere-levante": { essentiel: 178, confort: 318, serenite: 548 },
  "porte-garage-automatique": { essentiel: 178, confort: 318, serenite: 537 },
} as const;

export const EQUIPMENTS: { id: EquipmentId; label: string }[] = [
  { id: "rideau-metallique-manuel", label: "Rideau métallique manuel" },
  { id: "rideau-metallique-motorise", label: "Rideau métallique motorisé" },
  { id: "porte-sectionnelle-motorisee", label: "Porte sectionnelle motorisée" },
  { id: "porte-souple-rapide", label: "Porte souple rapide" },
  { id: "portail-coulissant-motorise", label: "Portail coulissant motorisé" },
  { id: "portail-battant-motorise", label: "Portail battant motorisé" },
  { id: "portail-battant-hydraulique", label: "Portail battant hydraulique" },
  { id: "barriere-levante", label: "Barrière levante" },
  { id: "porte-garage-automatique", label: "Porte de garage automatique" },
];

export const FORMULES: { id: Formule; label: string }[] = [
  { id: "essentiel", label: "Essentiel" },
  { id: "confort", label: "Confort" },
  { id: "serenite", label: "Sérénité" },
];

/**
 * Dégressivité multi-équipements (brief v0.7.1) :
 * - 1 équipement : prix plein
 * - 2-3 équipements : −5 % sur le total
 * - 4+ équipements : −10 % sur le total
 */
export function discountRate(qty: number): number {
  if (qty >= 4) return 0.1;
  if (qty >= 2) return 0.05;
  return 0;
}

export function fmtPrice(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

export type CalcResult =
  | { available: false }
  | {
      available: true;
      unit: number;
      subtotal: number;
      rate: number;
      total: number;
    };

export function computeMaintenance(
  equipment: EquipmentId,
  qty: number,
  formule: Formule,
): CalcResult {
  const unit = MAINTENANCE_PRICING[equipment][formule];
  if (unit === null) return { available: false };
  const subtotal = unit * qty;
  const rate = discountRate(qty);
  return {
    available: true,
    unit,
    subtotal,
    rate,
    total: subtotal * (1 - rate),
  };
}
