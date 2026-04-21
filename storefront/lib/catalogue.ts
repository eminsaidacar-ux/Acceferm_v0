import { promotions, topProducts, type Product } from "./data";
import { categories, type Category } from "./data";

/** Retourne la catégorie par slug ou null. */
export function getCategory(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Retourne tous les slugs (pour generateStaticParams). */
export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

/**
 * Mock "tous les produits d'une catégorie" : on réplique les top/promo
 * en les tournant pour chaque catégorie (demo). En prod, fetch backend.
 */
export function getCategoryProducts(slug: string): Product[] {
  const base = [...topProducts, ...promotions];
  const seed = categories.findIndex((c) => c.slug === slug);
  if (seed < 0) return [];

  // On crée une série plausible en variant les prix et en décalant les noms
  return base.map((p, i) => {
    const shift = (seed + i) % base.length;
    const src = base[shift];
    return {
      ...src,
      id: seed * 100 + i,
      slug: src.slug,
      priceHT: Math.round(src.priceHT * (0.9 + ((i + seed) % 5) * 0.08)),
    };
  });
}

export type FilterSection = {
  id: string;
  label: string;
  options: { id: string; label: string; count: number }[];
};

export const defaultFilters: FilterSection[] = [
  {
    id: "brand",
    label: "Marque",
    options: [
      { id: "v2", label: "V2", count: 34 },
      { id: "came", label: "Came", count: 42 },
      { id: "faac", label: "FAAC", count: 28 },
      { id: "nice", label: "Nice", count: 31 },
      { id: "bft", label: "BFT", count: 19 },
      { id: "roger", label: "Roger Technology", count: 22 },
      { id: "somfy", label: "Somfy", count: 14 },
      { id: "beninca", label: "Beninca", count: 11 },
    ],
  },
  {
    id: "voltage",
    label: "Tension",
    options: [
      { id: "12v", label: "12 V DC", count: 47 },
      { id: "24v", label: "24 V DC", count: 58 },
      { id: "230v", label: "230 V AC", count: 23 },
    ],
  },
  {
    id: "usage",
    label: "Usage",
    options: [
      { id: "res", label: "Résidentiel", count: 84 },
      { id: "coll", label: "Collectif / copropriété", count: 52 },
      { id: "ind", label: "Industriel intensif", count: 18 },
    ],
  },
  {
    id: "ip",
    label: "Classe étanchéité",
    options: [
      { id: "ip54", label: "IP54", count: 28 },
      { id: "ip65", label: "IP65", count: 41 },
      { id: "ip68", label: "IP68", count: 9 },
    ],
  },
  {
    id: "stock",
    label: "Disponibilité",
    options: [
      { id: "instock", label: "En stock", count: 98 },
      { id: "48h", label: "Sous 48-72h", count: 22 },
      { id: "backorder", label: "Sur commande", count: 4 },
    ],
  },
  {
    id: "cert",
    label: "Certifications",
    options: [
      { id: "en12453", label: "EN 12453", count: 31 },
      { id: "ce", label: "CE", count: 124 },
      { id: "rohs", label: "RoHS", count: 89 },
    ],
  },
];
