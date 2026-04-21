import { promotions, topProducts, type Product } from "./data";
import type { ImageKey } from "./images";
import { imagery } from "./images";

export type ProductDetail = Product & {
  shortDescription: string;
  expertNote: string;
  specs: Record<string, string>;
  compatibility: { brand: string; models: string[] }[];
  gallery: ImageKey[];
  rating: { average: number; count: number };
  reviews: { author: string; role: string; date: string; rating: number; body: string }[];
  crossSellSlugs: string[];
  documents: { label: string; format: string; size: string }[];
  norms: string[];
  warranty: string;
  deliveryNote: string;
};

/** Enrichit une fiche à la volée avec des données pro crédibles (mock réaliste) */
function enrich(p: Product): ProductDetail {
  const gallery: ImageKey[] = [p.image, "workshop", "engineering", "tools"];

  return {
    ...p,
    shortDescription: `Référence ${p.brand} ${p.origin} · en stock atelier IEF & Co · expédition 24h IDF. Rédigé par nos techniciens poseurs.`,
    expertNote:
      "Compatible avec la majorité des armoires du marché. Vérifier la tension d'alimentation et le bornier avant installation. En cas de doute sur la compatibilité, la vidéo-assistance Assistéo est offerte dès 300 € HT.",
    specs: {
      Marque: `${p.brand} (${p.origin})`,
      Référence: p.slug.toUpperCase().replace(/-/g, "·"),
      Tension: p.category === "Alimentation" ? "24 V DC" : "12/24 V DC",
      "Classe étanchéité": p.category === "Claviers" ? "IP65" : "IP54",
      Poids: "220 g",
      Dimensions: "92 × 56 × 34 mm",
      Certification: "CE · EN 12453 · EN 60335-1",
      Garantie: "2 ans fabricant + 1 an AcceFerm Pro",
    },
    compatibility: [
      { brand: "V2", models: ["CITY1+", "FORTECO", "AYROS", "STARK"] },
      { brand: "Came", models: ["KRYNO", "BX-243", "BK 1800"] },
      { brand: "Nice", models: ["ROBO 500", "ROBO 1000", "NAKED"] },
      { brand: "FAAC", models: ["C720", "S700H", "844 ER"] },
    ],
    gallery,
    rating: { average: 4.8, count: 73 },
    reviews: [
      {
        author: "Métallier Gonesse 95",
        role: "Pro Silver · 12 commandes",
        date: "il y a 4 jours",
        rating: 5,
        body:
          "Livré J+1 comme annoncé. Monté en 20 minutes sur un portail battant V2 FORTECO. La fiche technique téléchargée a suffi, pas eu besoin d'appeler le SAV.",
      },
      {
        author: "Électricien Nanterre 92",
        role: "Pro Gold · 47 commandes",
        date: "il y a 2 semaines",
        rating: 5,
        body:
          "Bien reçu, bon câblage, prix HT compétitif vs Automatisme-Online. Le compte pro à 30j a fait la différence sur le chantier de copro.",
      },
      {
        author: "Serrurier Versailles 78",
        role: "Pro Silver · 8 commandes",
        date: "il y a 3 semaines",
        rating: 4,
        body:
          "Produit conforme, notice PDF claire. Petit bémol sur la boîte qui était légèrement abîmée à la livraison — transporteur à surveiller.",
      },
    ],
    crossSellSlugs: topProducts.filter((x) => x.slug !== p.slug).slice(0, 4).map((x) => x.slug),
    documents: [
      { label: "Notice d'installation officielle", format: "PDF", size: "2,1 Mo" },
      { label: "Schéma de câblage annoté AcceFerm", format: "PDF", size: "860 Ko" },
      { label: "Déclaration de conformité CE", format: "PDF", size: "340 Ko" },
      { label: "Tableau de compatibilité marques", format: "PDF", size: "1,2 Mo" },
    ],
    norms: ["EN 12453", "EN 60335-1", "CE", "RoHS"],
    warranty: "2 ans fabricant + 1 an AcceFerm Pro — échange sans question",
    deliveryNote: "Commande avant 15h47 · expédition J+1 · livraison IDF 24h ferme",
  };
}

const catalog: Record<string, ProductDetail> = {};
for (const p of [...topProducts, ...promotions]) {
  catalog[p.slug] = enrich(p);
}

export function getProductDetail(slug: string): ProductDetail | null {
  return catalog[slug] ?? null;
}

export function getAllProductSlugs(): string[] {
  return Object.keys(catalog);
}

export function getCrossSell(slugs: string[]): Product[] {
  return slugs
    .map((s) => catalog[s])
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      glyph: p.glyph,
      brand: p.brand,
      origin: p.origin,
      name: p.name,
      priceHT: p.priceHT,
      priceWasHT: p.priceWasHT,
      stock: p.stock,
      stockLabel: p.stockLabel,
      badge: p.badge,
      category: p.category,
      image: p.image,
    }));
}

/** Typing check for imagery keys used in gallery */
export type _AssertImagery = keyof typeof imagery;
