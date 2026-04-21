/**
 * Seed produits pour les 3 nouvelles familles :
 * - Portes industrielles (Safir, Ditec, La Toulousaine)
 * - Bornes escamotables / à chaîne (Sobanor)
 * - Portiques de limitation de hauteur (Prefabat, Sobanor)
 *
 * Références Safir : extraites du site officiel portesafir.com (avril 2026).
 * Autres : mock plausible à confirmer lors du sourcing final.
 */

import type { ImageKey } from "./images";

export type SupplierProduct = {
  slug: string;
  supplierSlug: string;
  ref: string;
  name: string;
  family: string;
  category: string;
  specs: Record<string, string>;
  priceHT?: number;
  priceOnQuote?: boolean;
  image: ImageKey;
};

export const supplierProducts: SupplierProduct[] = [
  // ===== SAFIR Portes industrielles — refs réelles portesafir.com =====
  {
    slug: "safir-isotec-sectionnelle",
    supplierSlug: "safir",
    ref: "SAFIR-ISOTEC",
    name: "ISOTEC · Porte sectionnelle industrielle isotherme",
    family: "portes-industrielles",
    category: "portes-sectionnelles-industrielles",
    specs: {
      type: "Sectionnelle isotherme",
      panneaux: "40 mm PU injecté",
      usage: "Industrie · chambres froides",
      dimensions: "Sur mesure jusqu'à 8 × 7 m",
      coef: "U 0,9 W/m²K",
    },
    priceOnQuote: true,
    image: "factory",
  },
  {
    slug: "safir-thermotec-sectionnelle",
    supplierSlug: "safir",
    ref: "SAFIR-THERMOTEC",
    name: "THERMOTEC · Porte sectionnelle haute performance thermique",
    family: "portes-industrielles",
    category: "portes-sectionnelles-industrielles",
    specs: {
      type: "Sectionnelle panneaux thermiques",
      isolation: "Renforcée",
      usage: "Logistique froid",
      dimensions: "Sur mesure",
    },
    priceOnQuote: true,
    image: "warehouse",
  },
  {
    slug: "safir-cristal-sectionnelle",
    supplierSlug: "safir",
    ref: "SAFIR-CRISTAL",
    name: "CRISTAL · Porte sectionnelle panoramique",
    family: "portes-industrielles",
    category: "portes-sectionnelles-industrielles",
    specs: {
      type: "Panneaux hublots panoramiques",
      visibilité: "Vitrage sécurité",
      usage: "Commerce · salles expo",
    },
    priceOnQuote: true,
    image: "industrial",
  },
  {
    slug: "safir-pe100-rapide",
    supplierSlug: "safir",
    ref: "SAFIR-PE100",
    name: "PE100 · Porte rapide souple",
    family: "portes-industrielles",
    category: "portes-rapides",
    specs: {
      vitesse_ouverture: "1,5 m/s",
      cycles_jour: "500-1000",
      tablier: "PVC 900 g/m²",
      ip: "IP54",
    },
    priceOnQuote: true,
    image: "factory",
  },
  {
    slug: "safir-pe120-rapide",
    supplierSlug: "safir",
    ref: "SAFIR-PE120",
    name: "PE120 · Porte rapide grand trafic",
    family: "portes-industrielles",
    category: "portes-rapides",
    specs: {
      vitesse_ouverture: "2 m/s",
      cycles_jour: "1000+",
      tablier: "PVC renforcé",
    },
    priceOnQuote: true,
    image: "warehouse",
  },
  {
    slug: "safir-planezip-enroulable",
    supplierSlug: "safir",
    ref: "SAFIR-PLANEZIP",
    name: "PLANEZIP · Porte enroulable rapide à zip",
    family: "portes-industrielles",
    category: "portes-rapides",
    specs: {
      enroulement: "Spirale",
      tablier: "PVC + zip",
      self_repair: "Oui",
    },
    priceOnQuote: true,
    image: "engineering",
  },
  {
    slug: "safir-acm-lanieres",
    supplierSlug: "safir",
    ref: "SAFIR-ACM",
    name: "ACM · Rideau à lanières PVC industriel",
    family: "portes-industrielles",
    category: "portes-souples",
    specs: {
      matiere: "PVC transparent",
      largeur_laniere: "200/300/400 mm",
      usage: "Séparation froid/ambiance",
    },
    priceHT: 190,
    image: "industrial",
  },

  // ===== DITEC Portes industrielles =====
  {
    slug: "ditec-spirale-kubi",
    supplierSlug: "ditec-entrematic",
    ref: "DITEC-KUBI",
    name: "KUBI · Porte rapide à spirale aluminium",
    family: "portes-industrielles",
    category: "portes-rapides",
    specs: {
      ouverture: "2,5 m/s",
      materiau: "Aluminium",
      tablier: "Panneaux rigides alu",
      self_repair: "Anti-crash intégré",
    },
    priceOnQuote: true,
    image: "factory",
  },
  {
    slug: "ditec-sectional-flexo",
    supplierSlug: "ditec-entrematic",
    ref: "DITEC-FLEXO",
    name: "FLEXO · Porte sectionnelle industrielle premium",
    family: "portes-industrielles",
    category: "portes-sectionnelles-industrielles",
    specs: {
      dimensions: "Jusqu'à 10 × 8 m",
      isolation: "Panneaux 40 mm",
      finition: "RAL au choix",
    },
    priceOnQuote: true,
    image: "industrial",
  },

  // ===== LA TOULOUSAINE Portes sectionnelles =====
  {
    slug: "toulousaine-residence-sect",
    supplierSlug: "la-toulousaine",
    ref: "TOULOUSAINE-RES",
    name: "Porte sectionnelle résidentielle bois/composite",
    family: "portes-industrielles",
    category: "portes-sectionnelles-industrielles",
    specs: {
      finition: "Bois massif ou composite",
      isolation: "40 mm",
      sur_mesure: "Oui",
    },
    priceOnQuote: true,
    image: "workshop",
  },

  // ===== SOBANOR Bornes & portiques =====
  {
    slug: "sobanor-borne-hydraulique-700",
    supplierSlug: "sobanor",
    ref: "SBN-BH700",
    name: "Borne escamotable hydraulique 700 mm",
    family: "bornes-portiques",
    category: "bornes-escamotables",
    specs: {
      hauteur_hors_sol: "700 mm",
      diametre: "275 mm",
      materiau: "Inox 304 ou acier galva",
      motorisation: "Hydraulique 24 V",
      temps_escamotage: "4 s",
      cycles_jour: "3000",
    },
    priceHT: 3490,
    image: "industrial",
  },
  {
    slug: "sobanor-borne-semi-auto-600",
    supplierSlug: "sobanor",
    ref: "SBN-SA600",
    name: "Borne escamotable semi-automatique 600 mm",
    family: "bornes-portiques",
    category: "bornes-escamotables",
    specs: {
      hauteur_hors_sol: "600 mm",
      materiau: "Acier galva",
      verrouillage: "Clé triangle + serrure",
      poids: "35 kg",
    },
    priceHT: 1490,
    image: "warehouse",
  },
  {
    slug: "sobanor-borne-manuelle-pivotante",
    supplierSlug: "sobanor",
    ref: "SBN-MAN500",
    name: "Borne manuelle pivotante 500 mm",
    family: "bornes-portiques",
    category: "bornes-escamotables",
    specs: {
      hauteur: "500 mm",
      basculement: "Pivot 45°",
      verrouillage: "Cadenas",
      prix_reduit: "Solution éco-parking",
    },
    priceHT: 490,
    image: "tools",
  },
  {
    slug: "sobanor-borne-anti-belier-k8",
    supplierSlug: "sobanor",
    ref: "SBN-K8",
    name: "Borne anti-bélier certifiée K8/PAS 68",
    family: "bornes-portiques",
    category: "bornes-escamotables",
    specs: {
      certification: "K8 (PAS 68)",
      resistance: "Véhicule 7,5t @ 64 km/h",
      usage: "Sites sensibles",
    },
    priceHT: 6990,
    image: "industrial",
  },
  {
    slug: "sobanor-borne-chaine-inox",
    supplierSlug: "sobanor",
    ref: "SBN-CH-INOX",
    name: "Borne à chaîne inox fixe Ø60",
    family: "bornes-portiques",
    category: "bornes-chaine",
    specs: {
      diametre: "60 mm",
      hauteur: "1000 mm",
      materiau: "Inox 316L poli",
      chaine: "Inox Ø8 mm",
      tete: "Boule inox",
    },
    priceHT: 149,
    image: "engineering",
  },
  {
    slug: "sobanor-borne-chaine-amovible",
    supplierSlug: "sobanor",
    ref: "SBN-CH-AMV",
    name: "Borne à chaîne amovible sur douille",
    family: "bornes-portiques",
    category: "bornes-chaine",
    specs: {
      diametre: "76 mm",
      douille: "Noyée béton",
      verrouillage: "Cadenas inox",
      amovible: "Clé triangle",
    },
    priceHT: 189,
    image: "tools",
  },
  {
    slug: "sobanor-portique-limitation-h",
    supplierSlug: "sobanor",
    ref: "SBN-PORTIQUE-H",
    name: "Portique de limitation en H acier galvanisé",
    family: "bornes-portiques",
    category: "portiques-limitation",
    specs: {
      hauteur_utile: "2,00 m (ajustable)",
      largeur: "Sur mesure 2-8 m",
      materiau: "Acier tubulaire galva",
      finition: "Peinture jaune + bandes",
    },
    priceHT: 2290,
    image: "factory",
  },

  // ===== PREFABAT Portiques limitation hauteur =====
  {
    slug: "prefabat-portique-h-fixe-2m",
    supplierSlug: "prefabat",
    ref: "PREFA-PH200",
    name: "Portique H fixe 2,00 m standard",
    family: "bornes-portiques",
    category: "portiques-limitation",
    specs: {
      hauteur_utile: "2,00 m",
      largeur: "3-6 m (standard)",
      epaisseur_traverse: "200 × 100 mm",
      materiau: "Acier galva",
      scellement: "Massifs béton inclus",
    },
    priceHT: 1890,
    image: "engineering",
  },
  {
    slug: "prefabat-portique-reglable",
    supplierSlug: "prefabat",
    ref: "PREFA-PH-REG",
    name: "Portique réglable hauteur 2-4 m",
    family: "bornes-portiques",
    category: "portiques-limitation",
    specs: {
      hauteur_utile: "Réglable 2-4 m",
      largeur: "3-8 m",
      reglage: "Crémaillère acier",
    },
    priceHT: 2490,
    image: "factory",
  },
  {
    slug: "prefabat-panneau-signaletique",
    supplierSlug: "prefabat",
    ref: "PREFA-SIG",
    name: "Panneau signalétique limitation hauteur",
    family: "bornes-portiques",
    category: "portiques-limitation",
    specs: {
      matiere: "Aluminium réfléchissant",
      dimensions: "60 × 60 cm",
      classe_reflectance: "Classe 2",
    },
    priceHT: 89,
    image: "warehouse",
  },
];

export function getSupplierProducts(supplierSlug: string): SupplierProduct[] {
  return supplierProducts.filter((p) => p.supplierSlug === supplierSlug);
}

export function getProductsByFamily(familySlug: string): SupplierProduct[] {
  return supplierProducts.filter((p) => p.family === familySlug);
}

export function getAllSupplierProductSlugs(): string[] {
  return supplierProducts.map((p) => p.slug);
}
