/**
 * Données /sur-mesure (v0.8) — 9 types de fermetures fabriquées par
 * IEF & Co dans son atelier de Groslay (95) et posées en Île-de-France.
 *
 * Logique métier centralisée ici pour respecter la règle "lib séparé
 * du composant" (composants ≤ 150 L).
 */

export type SurMesureType = {
  /** Slug pour URL anchor + form pre-fill. */
  id: string;
  name: string;
  /** Description courte 2 lignes, affichée en card. */
  description: string;
  /** 4 caractéristiques bullet, séparées par " · " quand affichées inline. */
  features: string[];
};

export const SUR_MESURE_TYPES: SurMesureType[] = [
  {
    id: "rideau-metallique",
    name: "Rideau métallique",
    description:
      "Rideau à enroulement, lames pleines ou micro-perforées, motorisation tubulaire ou monobloc.",
    features: [
      "Largeur jusqu'à 12 m",
      "Lames acier galvanisé",
      "Manuel ou motorisé",
      "Sécurités EN 13241",
    ],
  },
  {
    id: "porte-sectionnelle",
    name: "Porte sectionnelle",
    description:
      "Porte sectionnelle à panneaux, pour locaux industriels, commerces, garages collectifs.",
    features: [
      "Panneaux 40-60 mm",
      "Isolation thermique",
      "Hublots sur option",
      "Motorisation plafonnier ou tubulaire",
    ],
  },
  {
    id: "porte-rapide-industrielle",
    name: "Porte rapide industrielle",
    description:
      "Porte souple à enroulement, ouverture jusqu'à 2 m/s, pour flux logistiques intensifs.",
    features: [
      "Tablier PVC ou polyester",
      "Ouverture rapide",
      "Auto-réparation possible",
      "Variateur de fréquence",
    ],
  },
  {
    id: "porte-industrielle-battante",
    name: "Porte industrielle battante",
    description:
      "Porte battante simple ou double vantail pour entrepôts, ateliers, locaux techniques.",
    features: [
      "Acier ou aluminium",
      "Coupe-feu sur option",
      "Ferme-porte",
      "Serrure renforcée",
    ],
  },
  {
    id: "portail-coulissant-sur-mesure",
    name: "Portail coulissant sur mesure",
    description:
      "Portail coulissant fabriqué en métallerie, design sur plan, motorisation intégrée.",
    features: [
      "Largeur jusqu'à 8 m",
      "Acier ou aluminium",
      "Remplissage barreaudé / plein / mixte",
      "Motorisation V2 ou Roger",
    ],
  },
  {
    id: "portail-battant-sur-mesure",
    name: "Portail battant sur mesure",
    description:
      "Portail à 2 vantaux fabriqué sur mesure, motorisation bras ou vérins.",
    features: [
      "Largeur jusqu'à 4 m par vantail",
      "Acier galvanisé ou alu",
      "Tous remplissages",
      "Motorisation invisible possible",
    ],
  },
  {
    id: "portillon",
    name: "Portillon",
    description:
      "Portillon piéton coordonné avec votre portail ou en accès indépendant.",
    features: [
      "Hauteur 1,60 à 2 m",
      "Serrure 3 ou 5 points",
      "Ferme-porte hydraulique",
      "Contrôle d'accès intégrable",
    ],
  },
  {
    id: "cloture",
    name: "Clôture",
    description:
      "Clôture rigide, barreaudée ou panneaux soudés. Périmétrique site, copropriété, terrain industriel.",
    features: [
      "Hauteur 1 à 2,50 m",
      "Acier galvanisé / thermolaqué",
      "Panneaux soudés ou barreaudés",
      "Pose sur platines ou scellement",
    ],
  },
  {
    id: "portique-limitation-hauteur",
    name: "Portique de limitation de hauteur",
    description:
      "Portique métallique pour limiter l'accès en hauteur aux véhicules (parking, accès logistique, zone protégée).",
    features: [
      "Hauteur libre 1,90 à 2,50 m",
      "Largeur 4 à 8 m",
      "Acier galvanisé",
      "Panneau de signalisation intégré",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    title: "Vous demandez un devis",
    body: "Formulaire en ligne ou par téléphone, détails techniques quand vous les avez.",
  },
  {
    title: "Visite de métré",
    body: "Sous 5 jours ouvrés, offerte en Île-de-France. Relevé précis sur site.",
  },
  {
    title: "Devis chiffré",
    body: "Sous 48 h après le métré, valide 30 jours.",
  },
  {
    title: "Fabrication + pose",
    body: "Sous 4-8 semaines selon le type et le délai, atelier Groslay + équipes IEF & Co.",
  },
];

export const DELAI_OPTIONS = [
  { id: "urgent", label: "Urgent (< 1 mois)" },
  { id: "standard", label: "Standard (1-3 mois)" },
  { id: "flexible", label: "Flexible (> 3 mois)" },
] as const;

export function getSurMesureType(id: string): SurMesureType | null {
  return SUR_MESURE_TYPES.find((t) => t.id === id) ?? null;
}
