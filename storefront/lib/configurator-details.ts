/**
 * Questions techniques spécifiques par type de produit pour l'étape "Options"
 * du configurateur. Chaque type d'équipement a ses propres choix de
 * matériaux/finitions/certifications.
 */

export type DetailOption = {
  id: string;
  label: string;
  sub?: string;
  /** Surcoût HT vs configuration de base (additionné au prix kit) */
  priceDelta?: number;
};

export type DetailQuestion = {
  id: string;
  label: string;
  hint?: string;
  type: "chip" | "boolean" | "count";
  required?: boolean;
  options?: DetailOption[];
  /** Pour type "count" */
  min?: number;
  max?: number;
};

export type ProductTypeId =
  | "battant-2"
  | "battant-1"
  | "coulissant"
  | "garage-sectionnelle"
  | "garage-basculante"
  | "rideau-metal-commerce"
  | "rideau-metal-industriel"
  | "sectionnelle-industrielle"
  | "porte-rapide-souple"
  | "barriere-levante"
  | "borne-escamotable"
  | "portique-limitation";

export const detailQuestionsByType: Record<ProductTypeId, DetailQuestion[]> = {
  // ───────── PORTAILS ─────────
  "battant-2": [
    {
      id: "matiere",
      label: "Matière du portail",
      type: "chip",
      required: true,
      options: [
        { id: "alu", label: "Aluminium" },
        { id: "fer-forge", label: "Fer forgé", priceDelta: 290 },
        { id: "bois", label: "Bois", priceDelta: 190 },
        { id: "pvc", label: "PVC", priceDelta: -150 },
      ],
    },
    {
      id: "couleur",
      label: "Finition / couleur",
      type: "chip",
      options: [
        { id: "noir", label: "Noir RAL 9005" },
        { id: "anthracite", label: "Anthracite RAL 7016" },
        { id: "blanc", label: "Blanc RAL 9010" },
        { id: "ral-au-choix", label: "RAL au choix", priceDelta: 120 },
      ],
    },
    {
      id: "serrure",
      label: "Serrure électrique",
      type: "boolean",
    },
    {
      id: "telecommandes",
      label: "Télécommandes additionnelles",
      type: "count",
      min: 0,
      max: 8,
    },
  ],
  "battant-1": [
    {
      id: "matiere",
      label: "Matière du vantail",
      type: "chip",
      required: true,
      options: [
        { id: "alu", label: "Aluminium" },
        { id: "bois", label: "Bois", priceDelta: 150 },
        { id: "pvc", label: "PVC", priceDelta: -120 },
      ],
    },
    { id: "serrure", label: "Serrure électrique", type: "boolean" },
    {
      id: "telecommandes",
      label: "Télécommandes additionnelles",
      type: "count",
      min: 0,
      max: 8,
    },
  ],
  coulissant: [
    {
      id: "support",
      label: "Type de support",
      type: "chip",
      required: true,
      options: [
        { id: "rail-sol", label: "Sur rail au sol" },
        { id: "autoportant", label: "Autoportant suspendu", priceDelta: 690 },
      ],
    },
    {
      id: "matiere",
      label: "Matière",
      type: "chip",
      required: true,
      options: [
        { id: "alu", label: "Aluminium" },
        { id: "acier", label: "Acier galva", priceDelta: 220 },
        { id: "fer-forge", label: "Fer forgé", priceDelta: 490 },
      ],
    },
    { id: "feu-orange", label: "Feu clignotant orange supplémentaire", type: "boolean" },
    {
      id: "telecommandes",
      label: "Télécommandes additionnelles",
      type: "count",
      min: 0,
      max: 8,
    },
  ],

  // ───────── GARAGE ─────────
  "garage-sectionnelle": [
    {
      id: "type-panneau",
      label: "Type de panneau",
      hint: "Le type de panneau définit l'esthétique et l'isolation",
      type: "chip",
      required: true,
      options: [
        { id: "lisse", label: "Lisse 40 mm", sub: "Look minimaliste" },
        { id: "cassettes", label: "Cassettes 40 mm", sub: "Aspect classique" },
        { id: "rainures", label: "Rainures", sub: "Aspect contemporain", priceDelta: 90 },
        { id: "isotherme-60", label: "Isotherme 60 mm", sub: "Coef U 0,8 W/m²K", priceDelta: 290 },
      ],
    },
    {
      id: "hublots",
      label: "Nombre de hublots panoramiques",
      type: "count",
      min: 0,
      max: 8,
    },
    {
      id: "couleur",
      label: "Couleur extérieure",
      type: "chip",
      options: [
        { id: "blanc", label: "Blanc RAL 9010" },
        { id: "anthracite", label: "Anthracite RAL 7016" },
        { id: "noir", label: "Noir RAL 9005" },
        { id: "ral-au-choix", label: "RAL au choix", priceDelta: 120 },
      ],
    },
    { id: "portillon-integre", label: "Portillon intégré", type: "boolean" },
  ],
  "garage-basculante": [
    {
      id: "matiere",
      label: "Matière",
      type: "chip",
      required: true,
      options: [
        { id: "acier-cassettes", label: "Acier cassettes" },
        { id: "acier-rainures", label: "Acier rainures" },
        { id: "alu", label: "Aluminium", priceDelta: 290 },
      ],
    },
    {
      id: "couleur",
      label: "Couleur",
      type: "chip",
      options: [
        { id: "blanc", label: "Blanc" },
        { id: "anthracite", label: "Anthracite" },
        { id: "ral-au-choix", label: "RAL au choix", priceDelta: 120 },
      ],
    },
    { id: "portillon", label: "Portillon intégré", type: "boolean" },
  ],

  // ───────── INDUSTRIE ─────────
  "rideau-metal-commerce": [
    {
      id: "type-lame",
      label: "Type de lame",
      hint: "La lame définit la sécurité, la visibilité et le bruit",
      type: "chip",
      required: true,
      options: [
        { id: "lame-pleine", label: "Lame pleine 75 mm", sub: "Anti-effraction maxi" },
        { id: "microperforee", label: "Microperforée", sub: "Visibilité 30 %", priceDelta: 190 },
        { id: "grillee", label: "Lame grillée", sub: "Visibilité 70 %, vitrine", priceDelta: 290 },
      ],
    },
    {
      id: "motorisation",
      label: "Type de motorisation",
      type: "chip",
      required: true,
      options: [
        { id: "tubulaire", label: "Tubulaire intégré", sub: "Compact, silencieux" },
        { id: "central", label: "Central avec chaîne", sub: "Pour gros tabliers", priceDelta: 350 },
      ],
    },
    {
      id: "commande",
      label: "Commande",
      type: "chip",
      required: true,
      options: [
        { id: "filaire", label: "Boîte à boutons filaire" },
        { id: "radio", label: "Télécommande radio", priceDelta: 110 },
        { id: "filaire-radio", label: "Filaire + radio", priceDelta: 190 },
      ],
    },
    { id: "serrure-baillonette", label: "Serrure baïonnette anti-soulèvement", type: "boolean" },
    { id: "antenne-gsm", label: "Module GSM contrôle à distance", type: "boolean" },
  ],
  "rideau-metal-industriel": [
    {
      id: "type-lame",
      label: "Type de lame",
      type: "chip",
      required: true,
      options: [
        { id: "lame-pleine-100", label: "Lame pleine 100 mm renforcée" },
        { id: "lame-isotherme", label: "Lame isotherme 75 mm", priceDelta: 990 },
        { id: "microperforee-renforcee", label: "Microperforée renforcée", priceDelta: 590 },
      ],
    },
    {
      id: "motorisation",
      label: "Motorisation",
      type: "chip",
      required: true,
      options: [
        { id: "central-tri", label: "Central tri 400V" },
        { id: "central-frein", label: "Central avec frein", priceDelta: 590 },
        { id: "central-parachute", label: "Central + parachute industriel", priceDelta: 1290 },
      ],
    },
    {
      id: "secours",
      label: "Manœuvre de secours",
      type: "chip",
      required: true,
      options: [
        { id: "manivelle", label: "Manivelle" },
        { id: "chaine", label: "Chaîne", priceDelta: 190 },
      ],
    },
    { id: "armoire-deportee", label: "Armoire de commande déportée", type: "boolean" },
  ],
  "sectionnelle-industrielle": [
    {
      id: "isolation",
      label: "Épaisseur d'isolation",
      hint: "Plus l'isolation est épaisse, meilleure la performance thermique",
      type: "chip",
      required: true,
      options: [
        { id: "40mm", label: "40 mm standard" },
        { id: "60mm", label: "60 mm renforcée", priceDelta: 690 },
        { id: "80mm", label: "80 mm chambre froide", priceDelta: 1490 },
      ],
    },
    {
      id: "vitrage",
      label: "Hublots panoramiques",
      type: "chip",
      options: [
        { id: "aucun", label: "Aucun" },
        { id: "1-rangee", label: "1 rangée", priceDelta: 290 },
        { id: "2-rangees", label: "2 rangées", priceDelta: 490 },
        { id: "tout-vitre", label: "Sectionnelle tout-vitré", priceDelta: 1990 },
      ],
    },
    {
      id: "motorisation",
      label: "Motorisation",
      type: "chip",
      required: true,
      options: [
        { id: "tri-400v", label: "Tri 400V intégré" },
        { id: "haute-cadence", label: "Haute cadence (1500 cycles/j)", priceDelta: 990 },
      ],
    },
    { id: "portillon", label: "Portillon intégré", type: "boolean" },
    { id: "feux-trafic", label: "Feux trafic rouge/vert", type: "boolean" },
  ],
  "porte-rapide-souple": [
    {
      id: "tablier",
      label: "Type de tablier",
      type: "chip",
      required: true,
      options: [
        { id: "pvc-souple", label: "PVC souple 900 g/m²" },
        { id: "pvc-renforce", label: "PVC renforcé 1200 g/m²", priceDelta: 590 },
        { id: "spirale-alu", label: "Spirale aluminium", priceDelta: 1490 },
      ],
    },
    {
      id: "vitesse",
      label: "Vitesse d'ouverture",
      type: "chip",
      required: true,
      options: [
        { id: "1-5-m-s", label: "1,5 m/s standard" },
        { id: "2-m-s", label: "2 m/s rapide", priceDelta: 490 },
        { id: "2-5-m-s", label: "2,5 m/s très rapide", priceDelta: 990 },
      ],
    },
    {
      id: "couleur",
      label: "Couleur du tablier",
      type: "chip",
      options: [
        { id: "bleu", label: "Bleu" },
        { id: "orange", label: "Orange" },
        { id: "rouge", label: "Rouge" },
        { id: "vert", label: "Vert" },
        { id: "transparent", label: "Transparent" },
      ],
    },
    { id: "self-repair", label: "Self-repair anti-crash", type: "boolean" },
    { id: "hublot", label: "Hublot transparent intégré", type: "boolean" },
  ],

  // ───────── ACCÈS & SÉCURITÉ ─────────
  "barriere-levante": [
    {
      id: "type-lisse",
      label: "Type de lisse",
      type: "chip",
      required: true,
      options: [
        { id: "alu-rect", label: "Aluminium rectangulaire" },
        { id: "alu-octogonale", label: "Aluminium octogonale", priceDelta: 190 },
        { id: "led-integre", label: "Lisse LED intégrée", priceDelta: 490 },
      ],
    },
    {
      id: "couleur-lisse",
      label: "Bandes de signalisation",
      type: "chip",
      options: [
        { id: "rouge-blanc", label: "Rouge / blanc" },
        { id: "jaune-noir", label: "Jaune / noir" },
        { id: "personnalise", label: "Personnalisé", priceDelta: 90 },
      ],
    },
    {
      id: "boucles",
      label: "Détection inductive",
      type: "chip",
      required: true,
      options: [
        { id: "aucune", label: "Aucune (commande manuelle)" },
        { id: "sortie", label: "Boucle de sortie", priceDelta: 290 },
        { id: "entree-sortie", label: "Entrée + sortie", priceDelta: 490 },
        { id: "4-boucles", label: "4 boucles complet", priceDelta: 890 },
      ],
    },
    { id: "lecteur-badges", label: "Lecteur badges proximité", type: "boolean" },
    { id: "feu-orange", label: "Feu orange clignotant", type: "boolean" },
  ],
  "borne-escamotable": [
    {
      id: "motorisation",
      label: "Type de motorisation",
      type: "chip",
      required: true,
      options: [
        { id: "manuelle", label: "Manuelle pivotante", sub: "Économique", priceDelta: -1000 },
        { id: "semi-auto", label: "Semi-automatique" },
        { id: "hydraulique", label: "Hydraulique automatique", priceDelta: 1400 },
        { id: "electromecanique", label: "Électromécanique 24V", priceDelta: 1100 },
      ],
    },
    {
      id: "certification",
      label: "Niveau de certification",
      hint: "Anti-bélier pour sites sensibles",
      type: "chip",
      required: true,
      options: [
        { id: "standard", label: "Standard (parking, voirie)" },
        { id: "k4", label: "K4 / PAS 68", sub: "Véhicule 7,5t @ 48 km/h", priceDelta: 2900 },
        { id: "k8", label: "K8 / PAS 68", sub: "Véhicule 7,5t @ 64 km/h", priceDelta: 4500 },
        { id: "k12", label: "K12 / PAS 68", sub: "Véhicule 7,5t @ 80 km/h", priceDelta: 7900 },
      ],
    },
    {
      id: "matiere",
      label: "Finition",
      type: "chip",
      options: [
        { id: "acier-galva", label: "Acier galvanisé" },
        { id: "inox-304", label: "Inox 304", priceDelta: 390 },
        { id: "inox-316l", label: "Inox 316L marin", priceDelta: 690 },
      ],
    },
    { id: "led-tete", label: "Tête LED rouge/blanche", type: "boolean" },
    { id: "boucle-magnetique", label: "Boucle magnétique de sortie", type: "boolean" },
  ],
  "portique-limitation": [
    {
      id: "matiere",
      label: "Matériau",
      type: "chip",
      required: true,
      options: [
        { id: "acier-galva", label: "Acier galvanisé" },
        { id: "inox", label: "Inox 304", priceDelta: 690 },
      ],
    },
    {
      id: "fixation",
      label: "Mode de fixation",
      type: "chip",
      required: true,
      options: [
        { id: "scelle-beton", label: "Scellement béton (massifs inclus)" },
        { id: "platine-bouloner", label: "Platines à boulonner sur dalle", priceDelta: -190 },
      ],
    },
    {
      id: "hauteur-reglable",
      label: "Hauteur réglable",
      type: "boolean",
    },
    {
      id: "signaletique",
      label: "Signalétique incluse",
      type: "chip",
      required: true,
      options: [
        { id: "panneau-b12", label: "Panneau B12 hauteur réglementaire" },
        { id: "panneau-led", label: "Panneau LED clignotant", priceDelta: 290 },
        { id: "complete", label: "Complète (panneau + bandes + balise)", priceDelta: 490 },
      ],
    },
    { id: "capteur-impact", label: "Capteur d'impact + alerte", type: "boolean" },
  ],
};

/**
 * Helper : calcule le surcoût total des détails sélectionnés
 */
export function computeDetailsExtra(
  type: ProductTypeId,
  details: Record<string, string | number | boolean>,
): number {
  const questions = detailQuestionsByType[type] ?? [];
  let extra = 0;

  for (const q of questions) {
    const value = details[q.id];
    if (q.type === "chip" && typeof value === "string") {
      const opt = q.options?.find((o) => o.id === value);
      if (opt?.priceDelta) extra += opt.priceDelta;
    } else if (q.type === "boolean" && value === true) {
      // Forfait booléen : 90 € HT par option additionnelle
      extra += 90;
    } else if (q.type === "count" && typeof value === "number" && value > 0) {
      // 35 € HT par item additionnel
      extra += value * 35;
    }
  }

  return extra;
}
