/**
 * Mini catalogue indexé par code fournisseur (nomenclature AcceFerm).
 * Utilisé par le module "Commande éclair" sur la home pour le lookup instantané.
 *
 * Marques présentes : V2, Roger Technology, Motor Line, Doorgate, Intégral
 * Système — uniquement les 5 fournisseurs avec contrat confirmé (avril 2026).
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
  "V2-FLASH": {
    code: "V2-FLASH",
    brand: "V2",
    name: "Flash feu clignotant LED 230 V",
    priceHT: 32,
    stock: "ok",
    stockNote: "58 en stock",
  },
  "V2-HANDY": {
    code: "V2-HANDY",
    brand: "V2",
    name: "Handy télécommande rolling-code 4 canaux",
    priceHT: 24,
    stock: "ok",
    stockNote: "210 en stock",
  },
  "ROGER-RX22A": {
    code: "ROGER-RX22A",
    brand: "Roger Technology",
    name: "RX22A récepteur radio 433 MHz bi-canal",
    priceHT: 76,
    stock: "ok",
    stockNote: "87 en stock",
  },
  "ROGER-H85": {
    code: "ROGER-H85",
    brand: "Roger Technology",
    name: "H85/TDR clavier à codes IP65 filaire 2 relais",
    priceHT: 89,
    stock: "low",
    stockNote: "4 restants · 48 h",
  },
  "MOTORLINE-FLOX2R": {
    code: "MOTORLINE-FLOX2R",
    brand: "Motor Line",
    name: "FLOX2R kit récepteur + 2 télécommandes",
    priceHT: 84,
    stock: "ok",
    stockNote: "33 en stock",
  },
  "INTEGRAL-CS600": {
    code: "INTEGRAL-CS600",
    brand: "Intégral Système",
    name: "CS600 centrale VIGIK 1 porte + résidents",
    priceHT: 289,
    stock: "low",
    stockNote: "12 restants",
  },
  "INTEGRAL-SE12": {
    code: "INTEGRAL-SE12",
    brand: "Intégral Système",
    name: "Serrure électrique encastrée 12 V",
    priceHT: 118,
    stock: "low",
    stockNote: "18 restants",
  },
};

export const sampleOrderInput = `V2-SE3 x2
ROGER-RX22A
V2-FLASH x3
ROGER-H85
V2-HANDY x5`;

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
