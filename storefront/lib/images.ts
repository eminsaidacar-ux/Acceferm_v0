/**
 * Catalogue d'images hotlinkées (Unsplash CDN).
 * NOTE CLAUDE.md : ces visuels sont des PLACEHOLDERS pour la maquette.
 * En production, ils seront remplacés par des photos Gemini fond blanc
 * sans visages humains, générées par produit réel.
 */

const U = "https://images.unsplash.com/photo-";

export function img(id: string, w = 800, h = 600) {
  return `${U}${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

/** Banques d'images par thème — toutes vérifiées HTTP 200 le 2026-04-20 */
export const imagery = {
  // Ambient / editorial
  factory: "1504917595217-d4dc5ebe6122",
  workshop: "1565689157206-0fddef7589a2",
  workshopAlt: "1581092918056-0c4c3acd3789",
  warehouse: "1581094794329-c8112a89af12",
  tools: "1504148455328-c376907d081c",
  industrialDetail: "1540962351504-03099e0a754b",
  gate: "1558618666-fcd25c85cd64",
  engineering: "1565891741441-64926e441838",
  industrial: "1586528116311-ad8dd3c8310d",
  brassFitting: "1519389950473-47ba0277781c",

  // Product category themes
  photocell: "1518770660439-4636190af475", // PCB sensor vibe
  receiver: "1550745165-9bc0b252726f",
  keypad: "1589939705384-5185137a7f0f",
  light: "1576153192621-7a3be10b356e",
  lock: "1577563908411-5077b6dc7624",
  battery: "1593508512255-86ab42a8e620",
  remote: "1555041469-a586c61ea9bc",
} as const;

export type ImageKey = keyof typeof imagery;
