/**
 * 10 familles catalogue v0.8 — refonte hub /catalogue.
 *
 * Chaque famille regroupe plusieurs sous-catégories existantes et
 * sert de point d'atterrissage haut niveau pour le visiteur. Les
 * anciens slugs catégories (ex : `photocellules`) restent accessibles
 * via /catalogue/[slug] pour ne pas casser les liens en place.
 *
 * Les noms d'icônes correspondent à des composants `lucide-react`.
 * Le `themesPreview` affiche jusqu'à 4 sous-thèmes en preview hub.
 */

export type CatalogueFamily = {
  /** Slug URL — utilisé dans /catalogue/[slug]. */
  id: string;
  name: string;
  description: string;
  /** Nom du composant lucide-react à utiliser pour l'icône. */
  icon:
    | "ShieldCheck"
    | "Radio"
    | "Cog"
    | "DoorOpen"
    | "CircuitBoard"
    | "Lightbulb"
    | "BatteryCharging"
    | "KeyRound"
    | "Phone"
    | "Wrench";
  /** Nombre de références approx. — affiché en card. */
  count: number;
  /** 4 sous-thèmes en preview sur la card hub. */
  themesPreview: string[];
  /** Note spéciale (ex : devis uniquement pour motorisations AFCA). */
  note?: string;
};

export const CATALOGUE_FAMILIES: CatalogueFamily[] = [
  {
    id: "organes-securite",
    name: "Organes de sécurité",
    description:
      "Détection d'obstacles, bord de palpeuse, signalisation visuelle.",
    icon: "ShieldCheck",
    count: 168,
    themesPreview: [
      "Photocellules",
      "Barres palpeuses",
      "Barrières immatérielles",
      "Feux clignotants",
    ],
  },
  {
    id: "organes-commande",
    name: "Organes de commande",
    description: "Récepteurs, télécommandes, claviers, lecteurs e-loop.",
    icon: "Radio",
    count: 244,
    themesPreview: [
      "Récepteurs radio",
      "Télécommandes",
      "Claviers IP65",
      "Sélecteurs à clé",
    ],
  },
  {
    id: "motorisations-portails",
    name: "Motorisations portails",
    description:
      "Coulissant, battant, bras articulés, vérins. Devis uniquement.",
    icon: "Cog",
    count: 86,
    themesPreview: [
      "Coulissant",
      "Battant à vérins",
      "Bras articulés",
      "Encastré / télescopique",
    ],
    note: "Clause fournisseur AFCA : prix sur devis.",
  },
  {
    id: "motorisations-portes",
    name: "Motorisations portes",
    description:
      "Sectionnelle, garage, rideau métallique, porte rapide industrielle.",
    icon: "DoorOpen",
    count: 64,
    themesPreview: [
      "Sectionnelle",
      "Garage",
      "Rideau métallique",
      "Porte rapide",
    ],
  },
  {
    id: "coffrets-cartes",
    name: "Coffrets & cartes électroniques",
    description:
      "Armoires de commande, cartes Modulis, temporisateurs, disjoncteurs.",
    icon: "CircuitBoard",
    count: 112,
    themesPreview: [
      "Armoires de commande",
      "Cartes Modulis",
      "Cartes de remplacement",
      "Temporisateurs",
    ],
  },
  {
    id: "signalisation",
    name: "Signalisation",
    description:
      "Feux clignotants, antennes, flashs LED, colonnes lumineuses.",
    icon: "Lightbulb",
    count: 47,
    themesPreview: [
      "Feux clignotants",
      "Antennes",
      "Flashs LED",
      "Colonnes lumineuses",
    ],
  },
  {
    id: "alimentation-secours",
    name: "Alimentation & secours",
    description:
      "Batteries de secours, alimentations 24 V, transformateurs, onduleurs.",
    icon: "BatteryCharging",
    count: 38,
    themesPreview: [
      "Batteries de secours",
      "Alimentations 24 V",
      "Transformateurs",
      "Onduleurs",
    ],
  },
  {
    id: "controle-acces",
    name: "Contrôle d'accès & VIGIK",
    description:
      "Centrales VIGIK, badges, claviers, ventouses, gâches, boîtes à clés.",
    icon: "KeyRound",
    count: 132,
    themesPreview: [
      "Centrales VIGIK",
      "Badges & lecteurs",
      "Ventouses & gâches",
      "Boîtes à clés",
    ],
  },
  {
    id: "interphonie",
    name: "Interphonie & visiophonie",
    description:
      "Interphones GSM 4G, visiophones, platines de rue, cornets.",
    icon: "Phone",
    count: 56,
    themesPreview: [
      "Interphones GSM 4G",
      "Visiophones",
      "Platines de rue",
      "Cornets",
    ],
  },
  {
    id: "pieces-detachees",
    name: "Pièces détachées par marque",
    description:
      "Vue alternative — filtrez par fabricant pour retrouver une pièce d'usure.",
    icon: "Wrench",
    count: 421,
    themesPreview: [
      "V2 (groupe AFCA)",
      "Roger Technology",
      "Motor Line",
      "Doorgate",
    ],
  },
];

export function getFamily(slug: string): CatalogueFamily | null {
  return CATALOGUE_FAMILIES.find((f) => f.id === slug) ?? null;
}

export function getAllFamilySlugs(): string[] {
  return CATALOGUE_FAMILIES.map((f) => f.id);
}

export function isFamilySlug(slug: string): boolean {
  return CATALOGUE_FAMILIES.some((f) => f.id === slug);
}
