import { catalogTree } from "./catalog-tree";
import { categories, promotions, topProducts, type Category, type Product } from "./data";
import type { ImageKey } from "./images";

/**
 * Récupère une catégorie par slug. Priorité aux 12 catégories éditorialisées
 * de `data.ts`. Fallback sur le catalog-tree (140+ sous-familles) pour que
 * toutes les routes `/catalogue/[slug]` soient routées.
 */
export function getCategory(slug: string): Category | null {
  // 1. Catégories éditorialisées
  const fromData = categories.find((c) => c.slug === slug);
  if (fromData) return fromData;

  // 2. Catalog tree — recherche famille, catégorie ou sous-catégorie
  for (const family of catalogTree) {
    if (family.slug === slug) {
      const total = family.categories.reduce((sum, c) => sum + c.subs.length * 3, 0);
      return {
        slug: family.slug,
        name: family.name,
        glyph: family.icon,
        count: `${Math.max(total, 20)} réf`,
        priceFrom: "dès 12 €",
        image: pickFallbackImage(family.slug),
      };
    }
    for (const category of family.categories) {
      if (category.slug === slug) {
        const total = category.subs.reduce((sum, s) => sum + s.productCount, 0);
        return {
          slug: category.slug,
          name: category.name,
          glyph: family.icon,
          count: `${Math.max(total, 6)} réf`,
          priceFrom: pickPriceFrom(category),
          image: pickFallbackImage(family.slug),
        };
      }
      for (const sub of category.subs) {
        if (sub.slug === slug) {
          return {
            slug: sub.slug,
            name: sub.name,
            glyph: family.icon,
            count: `${Math.max(sub.productCount, 4)} réf`,
            priceFrom: sub.priceFromHT ? `dès ${sub.priceFromHT} €` : "dès 12 €",
            image: pickFallbackImage(family.slug),
          };
        }
      }
    }
  }

  return null;
}

/** Tous les slugs pour generateStaticParams (12 cats + familles + sous-cats catalog-tree). */
export function getAllCategorySlugs(): string[] {
  const seen = new Set<string>();
  for (const c of categories) seen.add(c.slug);
  for (const family of catalogTree) {
    seen.add(family.slug);
    for (const category of family.categories) {
      seen.add(category.slug);
      for (const sub of category.subs) seen.add(sub.slug);
    }
  }
  return [...seen];
}

/**
 * Mock "tous les produits d'une catégorie" : on réplique les top/promo
 * en les tournant pour chaque catégorie (demo). En prod, fetch backend.
 */
export function getCategoryProducts(slug: string): Product[] {
  const base = [...topProducts, ...promotions];
  // Find seed from editorial categories first
  let seed = categories.findIndex((c) => c.slug === slug);
  if (seed < 0) {
    // Fallback : hash-based seed stable sur le slug pour avoir une grille cohérente
    seed = slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % base.length;
  }

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

function pickPriceFrom(category: { subs: { priceFromHT?: number }[] }): string {
  const mins = category.subs
    .map((s) => s.priceFromHT)
    .filter((x): x is number => typeof x === "number");
  if (mins.length === 0) return "dès 12 €";
  return `dès ${Math.min(...mins)} €`;
}

/** Fallback vers un visuel thématique cohérent selon la famille. */
function pickFallbackImage(familySlug: string): ImageKey {
  const map: Record<string, ImageKey> = {
    "portails-motorises": "gate",
    "motorisations": "factory",
    "motorisation-battant": "factory",
    "motorisation-coulissant": "workshopAlt",
    "controle-acces": "industrial",
    "securite": "photocell",
    "photocellules": "photocell",
    "recepteurs-radio": "receiver",
    "telecommandes": "remote",
    "interphonie": "remote",
    "claviers-selecteurs": "keypad",
    "feux-signalisations": "light",
    "serrures-electriques": "lock",
    "alimentation-batteries": "battery",
    "pieces-detachees": "engineering",
    "kits-complets": "gate",
    "portes-industrielles": "industrial",
    "portes-sectionnelles": "warehouse",
    "portes-rapides": "warehouse",
    "rideaux-metalliques": "warehouse",
    "bornes-escamotables": "industrial",
    "barrieres-levantes": "industrial",
    "portiques": "industrial",
  };
  return map[familySlug] ?? "engineering";
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
      { id: "v2", label: "V2 (groupe AFCA)", count: 64 },
      { id: "roger", label: "Roger Technology", count: 38 },
      { id: "motor-line", label: "Motor Line", count: 22 },
      { id: "doorgate", label: "Doorgate", count: 14 },
      { id: "integral", label: "Intégral Système", count: 31 },
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
