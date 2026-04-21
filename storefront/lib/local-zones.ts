import type { ImageKey } from "./images";

export type LocalZone = {
  slug: string;
  department: string;
  department_num: string;
  title: string;
  citiesTop: string[];
  tagline: string;
  stats: { value: string; label: string }[];
  image: ImageKey;
};

export const localZones: LocalZone[] = [
  {
    slug: "paris-75",
    department: "Paris",
    department_num: "75",
    title: "Installateur motorisation portail à Paris",
    citiesTop: ["Paris 1er", "Paris 15e", "Paris 16e", "Paris 17e", "Paris 18e", "Paris 19e"],
    tagline: "Paris intra-muros · copropriétés haussmanniennes, portes cochères, bureaux",
    stats: [
      { value: "14 ans", label: "d'interventions IEF à Paris" },
      { value: "1 420", label: "portails posés ou dépannés" },
      { value: "SLA 4h", label: "dépannage urgence IDF" },
    ],
    image: "industrial",
  },
  {
    slug: "hauts-de-seine-92",
    department: "Hauts-de-Seine",
    department_num: "92",
    title: "Installateur motorisation portail dans les Hauts-de-Seine",
    citiesTop: ["Nanterre", "Courbevoie", "Boulogne-Billancourt", "Issy-les-Moulineaux", "Puteaux", "Rueil-Malmaison"],
    tagline: "92 · siège IEF à proximité, temps de réponse médian 45 minutes",
    stats: [
      { value: "45 min", label: "temps de réponse médian" },
      { value: "38", label: "copropriétés en contrat maintenance" },
      { value: "6 techniciens", label: "affectés au 92" },
    ],
    image: "factory",
  },
  {
    slug: "seine-saint-denis-93",
    department: "Seine-Saint-Denis",
    department_num: "93",
    title: "Installateur motorisation portail en Seine-Saint-Denis",
    citiesTop: ["Saint-Denis", "Aubervilliers", "Aulnay-sous-Bois", "Bondy", "Drancy", "Pantin"],
    tagline: "93 · logistique industrielle, bailleurs sociaux, portails lourds coulissants",
    stats: [
      { value: "620", label: "installations en parc 93" },
      { value: "12", label: "bailleurs sociaux partenaires" },
      { value: "24h", label: "délai de remise en service" },
    ],
    image: "warehouse",
  },
  {
    slug: "yvelines-78",
    department: "Yvelines",
    department_num: "78",
    title: "Installateur motorisation portail dans les Yvelines",
    citiesTop: ["Versailles", "Saint-Germain-en-Laye", "Mantes-la-Jolie", "Poissy", "Houilles", "Conflans-Sainte-Honorine"],
    tagline: "78 · résidentiel haut de gamme, portails battants + coulissants 24 V",
    stats: [
      { value: "920", label: "résidences privées équipées" },
      { value: "24 V", label: "standard silencieux recommandé" },
      { value: "J+1", label: "livraison garantie sur 78" },
    ],
    image: "gate",
  },
];

export function getZone(slug: string): LocalZone | null {
  return localZones.find((z) => z.slug === slug) ?? null;
}

export function getAllZoneSlugs(): string[] {
  return localZones.map((z) => z.slug);
}
