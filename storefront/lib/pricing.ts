/**
 * Moteur de pricing AcceFerm Pro
 * ===============================
 * Règle d'or (CLAUDE.md) : marge brute cible ≥ 90 % sur accessoires,
 * ≥ 120 % sur consommables, 60-80 % sur motorisations Roger (tendu mais volume),
 * ≥ 100 % sur kits complets.
 *
 * Tous les prix sont en € HT. La TVA 20 % est calculée à l'affichage (helper TTC).
 *
 * Entrée : prix d'achat HT fournisseur (supplier cost).
 * Sortie : prix de vente HT client (retail HT).
 *
 * L'algo applique :
 * 1. Une marge cible par famille (margeTargetByFamily)
 * 2. Un arrondi psychologique (endings familiers B2B)
 * 3. Un plancher absolu si trop bas (anti-sous-coûté)
 * 4. Un plafond si le prix est trop haut vs marché (compétitif)
 * 5. Une remise compte pro appliquée côté UI (Silver −5 %, Gold −10 à −15 %)
 */

export type Family =
  | "motorisation-battant"
  | "motorisation-coulissant"
  | "motorisation-garage"
  | "photocellules"
  | "feux-signalisations"
  | "recepteurs-telecommandes"
  | "claviers-selecteurs"
  | "controle-acces"
  | "interphonie"
  | "serrures-electriques"
  | "alimentation-batteries"
  | "pieces-detachees"
  | "kits-complets"
  | "consommables";

export type MarginRule = {
  /** Marge en multiplicateur : 1.90 = marge 90 % (prix = coût × 1.90) */
  multiplier: number;
  /** Plancher HT client (anti sous-coté) */
  floor: number;
  /** Plafond HT client optionnel (si le marché est tendu) */
  ceiling?: number;
  /** Stratégie d'arrondi psychologique */
  rounding: "roundUp" | "ending9" | "ending5" | "none";
};

/**
 * Règles par famille de produit. Ajustables par Emin selon l'étude de marché.
 * Multiplicateur = 1 + (marge %) => 1.90 = marge 90 % sur le coût.
 */
export const marginRules: Record<Family, MarginRule> = {
  "motorisation-battant": { multiplier: 1.7, floor: 349, rounding: "ending9" }, // 60-80% (Roger/AFCA)
  "motorisation-coulissant": { multiplier: 1.75, floor: 389, rounding: "ending9" },
  "motorisation-garage": { multiplier: 1.75, floor: 299, rounding: "ending9" },
  photocellules: { multiplier: 1.9, floor: 28, rounding: "ending9" },
  "feux-signalisations": { multiplier: 2.0, floor: 24, rounding: "ending9" },
  "recepteurs-telecommandes": { multiplier: 2.1, floor: 18, rounding: "ending9" },
  "claviers-selecteurs": { multiplier: 1.95, floor: 39, rounding: "ending9" },
  "controle-acces": { multiplier: 1.85, floor: 59, rounding: "ending9" },
  interphonie: { multiplier: 1.85, floor: 99, rounding: "ending9" },
  "serrures-electriques": { multiplier: 1.9, floor: 45, rounding: "ending9" },
  "alimentation-batteries": { multiplier: 2.0, floor: 18, rounding: "ending9" },
  "pieces-detachees": { multiplier: 2.2, floor: 8, rounding: "ending5" },
  "kits-complets": { multiplier: 2.0, floor: 549, rounding: "ending9" },
  consommables: { multiplier: 2.3, floor: 4, rounding: "ending9" }, // marge 120 %+
};

export type ProTier = "particulier" | "silver" | "gold" | "platinum";

/** Remise appliquée au checkout selon le statut compte pro */
export const tierDiscount: Record<ProTier, number> = {
  particulier: 0,
  silver: 0.05, // -5 %
  gold: 0.12, // -12 % (milieu de la fourchette 10-15 %)
  platinum: 0.15, // -15 % (commerçant grand compte, contrats cadres)
};

/**
 * Arrondit selon la stratégie psychologique.
 * - ending9 : 24.17 → 24.90, 148.03 → 149.00
 * - ending5 : 7.12 → 7.95, 32.44 → 32.95
 * - roundUp : 24.17 → 25.00
 */
function applyRounding(value: number, mode: MarginRule["rounding"]): number {
  if (mode === "none") return Math.round(value * 100) / 100;
  if (mode === "roundUp") return Math.ceil(value);
  const integer = Math.floor(value);
  if (mode === "ending9") {
    // Si déjà X.9X, on laisse ; sinon on remonte au X.90 supérieur
    if (value - integer >= 0.85) return integer + 0.9;
    return integer + 0.9;
  }
  if (mode === "ending5") {
    if (value - integer >= 0.85) return integer + 0.95;
    return integer + 0.95;
  }
  return value;
}

/**
 * Applique la règle d'une famille sur un coût fournisseur.
 * Renvoie le prix public HT recommandé (particulier affiché TTC, pro −5 % si Silver).
 */
export function priceFromSupplier(supplierCostHT: number, family: Family): number {
  const rule = marginRules[family];
  if (!rule) throw new Error(`Unknown family: ${family}`);

  const rawMarkup = supplierCostHT * rule.multiplier;
  const raw = Math.max(rawMarkup, rule.floor);
  const capped = rule.ceiling ? Math.min(raw, rule.ceiling) : raw;
  return applyRounding(capped, rule.rounding);
}

/**
 * Calcule le prix d'affichage effectif pour un tier donné.
 */
export function displayPrice(
  supplierCostHT: number,
  family: Family,
  tier: ProTier = "particulier",
): { ht: number; ttc: number; tierDiscountPct: number } {
  const baseHT = priceFromSupplier(supplierCostHT, family);
  const discount = tierDiscount[tier];
  const ht = Math.round(baseHT * (1 - discount) * 100) / 100;
  const ttc = Math.round(ht * 1.2 * 100) / 100;
  return { ht, ttc, tierDiscountPct: discount * 100 };
}

/**
 * Marge observée vs coût fournisseur. Pour reporting interne.
 * Ex : supplier 10 €, retail 19 € → margePct = 90 %
 */
export function computeMarginPct(supplierCostHT: number, retailHT: number): number {
  if (supplierCostHT <= 0) return Number.POSITIVE_INFINITY;
  return Math.round(((retailHT - supplierCostHT) / supplierCostHT) * 1000) / 10;
}

/**
 * Audit batch — pour un ensemble de produits,
 * vérifie que chaque produit respecte les cibles CLAUDE.md.
 * Renvoie les alertes "sous-margé".
 */
export type AuditRow = {
  ref: string;
  family: Family;
  supplierCostHT: number;
  retailHT: number;
  marginPct: number;
  target: number;
  ok: boolean;
};

const MARGIN_TARGET_PCT: Record<Family, number> = {
  "motorisation-battant": 60,
  "motorisation-coulissant": 60,
  "motorisation-garage": 60,
  photocellules: 90,
  "feux-signalisations": 100,
  "recepteurs-telecommandes": 100,
  "claviers-selecteurs": 90,
  "controle-acces": 80,
  interphonie: 80,
  "serrures-electriques": 90,
  "alimentation-batteries": 100,
  "pieces-detachees": 120,
  "kits-complets": 100,
  consommables: 120,
};

export function auditCatalog(
  rows: { ref: string; family: Family; supplierCostHT: number; retailHT: number }[],
): AuditRow[] {
  return rows.map((r) => {
    const marginPct = computeMarginPct(r.supplierCostHT, r.retailHT);
    const target = MARGIN_TARGET_PCT[r.family];
    return {
      ...r,
      marginPct,
      target,
      ok: marginPct >= target,
    };
  });
}

/**
 * Exemple d'usage (test inline — peut être retiré en prod)
 */
// const p = priceFromSupplier(25.4, "photocellules");   // → 48.90 € HT
// const d = displayPrice(25.4, "photocellules", "silver"); // → { ht: 46.46, ttc: 55.75, tierDiscountPct: 5 }
