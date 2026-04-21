/**
 * Mini catalogue indexé par code fournisseur (nomenclature AcceFerm).
 * Utilisé par le module "Commande éclair" sur la home pour le lookup instantané.
 */

export type CatalogSku = {
  code: string;
  brand: string;
  name: string;
  priceHT: number;
  stock: "ok" | "low" | "backorder" | "out";
  stockNote: string;
};

export const catalogByCode: Record<string, CatalogSku> = {
  "V2-SE3": {
    code: "V2-SE3",
    brand: "V2",
    name: "Sensiva photocellules filaires paire",
    priceHT: 48,
    stock: "ok",
    stockNote: "142 en stock",
  },
  "V2-EASY1": {
    code: "V2-EASY1",
    brand: "V2",
    name: "Easy kit photocellule 1 paire",
    priceHT: 52,
    stock: "ok",
    stockNote: "68 en stock",
  },
  "FAAC-XR2": {
    code: "FAAC-XR2",
    brand: "FAAC",
    name: "Récepteur radio 433 MHz bi-canal XR2",
    priceHT: 76,
    stock: "ok",
    stockNote: "87 en stock",
  },
  "CAME-KIARON": {
    code: "CAME-KIARON",
    brand: "Came",
    name: "Kiaron feu clignotant LED 230V",
    priceHT: 32,
    stock: "ok",
    stockNote: "58 en stock",
  },
  "ROGER-KB3": {
    code: "ROGER-KB3",
    brand: "Roger Technology",
    name: "Clavier à codes IP65 filaire 2 relais",
    priceHT: 89,
    stock: "low",
    stockNote: "4 restants · 48h",
  },
  "NICE-TOONA5": {
    code: "NICE-TOONA5",
    brand: "Nice",
    name: "Barre palpeuse filaire 2 m EN 12453",
    priceHT: 112,
    stock: "backorder",
    stockNote: "Commande sous 5j",
  },
  "BFT-MITTO2": {
    code: "BFT-MITTO2",
    brand: "BFT",
    name: "Mitto 2 télécommande rolling-code 2 canaux",
    priceHT: 24,
    stock: "ok",
    stockNote: "210 en stock",
  },
};

export const sampleOrderInput = `V2-SE3 x2
FAAC-XR2
CAME-KIARON x3
ROGER-KB3
BFT-MITTO2 x5`;

/**
 * Parse une saisie multi-lignes "CODE [xQTY]" en items avec quantités.
 * Accepte aussi séparateur virgule et majuscules/minuscules mélangées.
 * Renvoie les lignes reconnues + les lignes non reconnues (pour feedback utilisateur).
 */
export function parseOrderInput(raw: string) {
  const lines = raw
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  type Match = { sku: CatalogSku; qty: number };
  const matches = new Map<string, Match>();
  const unknown: string[] = [];

  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9._-]+)(?:\s*[xX*]\s*(\d+))?$/);
    if (!m) {
      unknown.push(line);
      continue;
    }
    const code = m[1].toUpperCase();
    const qty = m[2] ? Math.max(1, Number.parseInt(m[2], 10)) : 1;
    const sku = catalogByCode[code];
    if (!sku) {
      unknown.push(line);
      continue;
    }
    const existing = matches.get(code);
    matches.set(code, { sku, qty: (existing?.qty ?? 0) + qty });
  }

  return { items: Array.from(matches.values()), unknown };
}
