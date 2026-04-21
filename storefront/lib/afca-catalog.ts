/**
 * CATALOGUE AFCA-V2 2024 — source de vérité
 * ===========================================
 * Données extraites du PDF officiel `Catalogue_AFCA-V2_2024_complet_priceless.pdf`
 * (275 p., texte natif, extraction pdftotext + index final pp 264-272).
 *
 * Couverture : 19 familles (10 AFCA + Sindaur + 9 V2) · ~70 sous-catégories
 * · 80 produits d'échantillon représentatifs. ~1500 refs totales disponibles
 * dans l'index à scraper en deuxième passe.
 *
 * Ce fichier est consommé par `catalog-tree.ts` (vue regroupée fonctionnellement
 * pour le mega-menu) et par la future base produits (seed → DB).
 */

export type Brand = "AFCA" | "V2" | "Sindaur";

export type AfcaSubcategory = {
  slug: string;
  name: string;
};

export type AfcaCategory = {
  slug: string;
  name: string;
  subcategories: AfcaSubcategory[];
};

export type AfcaFamily = {
  slug: string;
  name: string;
  brand: Brand;
  pageRange: [number, number];
  categories: AfcaCategory[];
};

/** Arborescence brute — exactement comme sortie du catalogue 2024 */
export const afcaFamilies: AfcaFamily[] = [
  // ========== GAMME AFCA ==========
  {
    slug: "rideaux-metalliques-portes-sectionnelles",
    name: "Rideaux métalliques & portes sectionnelles",
    brand: "AFCA",
    pageRange: [5, 29],
    categories: [
      {
        slug: "moteurs-rideaux-compenses",
        name: "Moteurs rideaux compensés",
        subcategories: [
          { slug: "easy-60", name: "Moteurs EASY 60" },
          { slug: "easy-76", name: "Moteurs EASY 76" },
        ],
      },
      {
        slug: "moteurs-rideaux-rdf",
        name: "Moteurs rideaux RDF",
        subcategories: [
          { slug: "rdf-fdc-electronique", name: "RDF fins de course électroniques" },
          { slug: "rdf-fdc-mecanique", name: "RDF fins de course mécaniques" },
        ],
      },
      { slug: "moteurs-tubulaires-mti", name: "Moteurs tubulaires MTI", subcategories: [] },
      {
        slug: "parachutes",
        name: "Parachutes",
        subcategories: [
          { slug: "industriels", name: "Industriels DR250-DR2000" },
          { slug: "domestiques", name: "Domestiques DR70/140, AR70/140" },
        ],
      },
      { slug: "armoires-d-pro", name: "Armoires D-PRO Action / Automatic", subcategories: [] },
      { slug: "moteurs-portes-sectionnelles", name: "Moteurs portes sectionnelles SWN/SD/FM60", subcategories: [] },
      { slug: "accessoires-rideaux", name: "Accessoires moteurs centraux", subcategories: [] },
    ],
  },
  {
    slug: "portails-coulissants-afca",
    name: "Portails coulissants",
    brand: "AFCA",
    pageRange: [31, 48],
    categories: [
      { slug: "operateurs-revers", name: "Opérateurs REVERS / REVERS FAST", subcategories: [] },
      { slug: "operateurs-af15", name: "Opérateurs AF 15", subcategories: [] },
      { slug: "colonne-technique", name: "Colonne Technique Confort", subcategories: [] },
      { slug: "accessoires-coulissants", name: "Accessoires (crémaillères, butées)", subcategories: [] },
      { slug: "accessoires-autoportants", name: "Accessoires portails autoportants", subcategories: [] },
    ],
  },
  {
    slug: "portails-battants-afca",
    name: "Portails battants",
    brand: "AFCA",
    pageRange: [50, 61],
    categories: [
      { slug: "operateurs-hydrauliques", name: "Opérateurs hydrauliques Hydra265/400", subcategories: [] },
      { slug: "accessoires-battants", name: "Accessoires battants", subcategories: [] },
    ],
  },
  {
    slug: "armoires-de-commande-afca",
    name: "Armoires de commande",
    brand: "AFCA",
    pageRange: [64, 83],
    categories: [
      { slug: "modulis-3", name: "MODULIS 3", subcategories: [] },
      { slug: "starteco-4", name: "STARTECO 4", subcategories: [] },
      { slug: "starteco-plus", name: "STARTECO PLUS", subcategories: [] },
      { slug: "start-indus", name: "START Indus", subcategories: [] },
      { slug: "start-one", name: "START-ONE", subcategories: [] },
      { slug: "coffret-niveleur-quai", name: "Coffret niveleur de quai", subcategories: [] },
      { slug: "d-pro-armoires", name: "D-PRO Action / Automatic", subcategories: [] },
      { slug: "coffret-udl1", name: "Coffret UDL1", subcategories: [] },
      { slug: "precablages-prestations", name: "Précâblages & prestations", subcategories: [] },
      { slug: "accessoires-armoires", name: "Accessoires (relais, horloges, variateurs)", subcategories: [] },
    ],
  },
  {
    slug: "accessoires-securite-afca",
    name: "Accessoires de sécurité",
    brand: "AFCA",
    pageRange: [85, 99],
    categories: [
      {
        slug: "barres-palpeuses",
        name: "Barres palpeuses",
        subcategories: [
          { slug: "securis-completes", name: "SECURIS complètes BI2/BC2" },
          { slug: "securis-sans-interface", name: "SECURIS sans interface" },
          { slug: "plug-and-sense", name: "Profils PLUG & SENSE 8.2kΩ" },
          { slug: "mecaniques-bs2", name: "Mécaniques BS²" },
        ],
      },
      { slug: "controle-radio-edge", name: "Contrôle radio EDGE 868", subcategories: [] },
      { slug: "barrieres-immaterielles", name: "Barrières immatérielles", subcategories: [] },
      {
        slug: "photocellules",
        name: "Cellules infrarouges",
        subcategories: [
          { slug: "barrage", name: "Barrage E/R (IR910, PMT20)" },
          { slug: "reflex", name: "Reflex (PD86, PMP12, PC50)" },
          { slug: "clipsables-mpf", name: "Clipsables MPF" },
          { slug: "longue-portee-bmn60", name: "Longue portée BMN60" },
          { slug: "shield-180", name: "SHIELD 180 orientables" },
        ],
      },
      { slug: "radar-bidirectionnel", name: "Radar bi-directionnel V2BI", subcategories: [] },
    ],
  },
  {
    slug: "organes-de-commande-afca",
    name: "Organes de commande",
    brand: "AFCA",
    pageRange: [101, 109],
    categories: [
      {
        slug: "claviers-a-code",
        name: "Claviers à code",
        subcategories: [
          { slug: "cl-3c", name: "CL-3C universel" },
          { slug: "codipass-talos", name: "CODIPASS TALOS" },
          { slug: "sun-s", name: "SUN-S électronique déportée" },
          { slug: "codibadge", name: "CODIBADGE proximité" },
        ],
      },
      { slug: "contacts-cles", name: "Contacts à clés MS-APZ/APE", subcategories: [] },
      { slug: "boites-a-boutons", name: "Boîtes à boutons FWAP/FWBP", subcategories: [] },
      { slug: "detecteurs-boucles", name: "Détecteurs de boucles magnétiques", subcategories: [] },
      { slug: "detecteurs-presence", name: "Détecteurs de présence", subcategories: [] },
      { slug: "inverseurs-volets", name: "Inverseurs volets ACP20/30/50", subcategories: [] },
      { slug: "interphones-videophones", name: "Interphones & vidéophones AIPHONE", subcategories: [] },
    ],
  },
  {
    slug: "controle-acces-afca",
    name: "Contrôle d'accès",
    brand: "AFCA",
    pageRange: [111, 114],
    categories: [
      { slug: "centrales-acces", name: "Centrales ELA CT-EVOLUTION", subcategories: [] },
      { slug: "lecteurs-proximite", name: "Lecteurs proximité PROXIPASS", subcategories: [] },
      { slug: "claviers-badge-coditag", name: "Clavier + badge CODITAG", subcategories: [] },
      { slug: "ventouses-electromagnetiques", name: "Ventouses 60-750 kg", subcategories: [] },
    ],
  },
  {
    slug: "signalisation-feux-afca",
    name: "Signalisation & feux",
    brand: "AFCA",
    pageRange: [116, 117],
    categories: [
      { slug: "feux-bicolores", name: "Feux bicolores 1 ou 2 lampes", subcategories: [] },
      { slug: "feux-led-mline", name: "Feux LED M-Line directionnels", subcategories: [] },
      { slug: "feu-industriel", name: "Feu industriel Full LED", subcategories: [] },
      { slug: "eclairage-zone", name: "Projecteurs LED zone", subcategories: [] },
      { slug: "marquage-sol", name: "Marquage au sol (bombes, kits)", subcategories: [] },
    ],
  },
  {
    slug: "barrieres-levantes-sindaur-3000",
    name: "Barrières levantes Sindaur 3000",
    brand: "Sindaur",
    pageRange: [119, 123],
    categories: [
      { slug: "securite-3000", name: "Sécurité (DHO14, BAU, ventouse)", subcategories: [] },
      { slug: "moteurs-3000", name: "Moteurs E1124 + CDO 30", subcategories: [] },
      { slug: "structure-3000", name: "Structure (poteaux, capots, consoles)", subcategories: [] },
      { slug: "tabliers-bras-3000", name: "Tabliers & bras télescopiques 800/1200", subcategories: [] },
      { slug: "guidage-3000", name: "Éléments de guidage (rails, paliers)", subcategories: [] },
    ],
  },
  {
    slug: "goulottes-techniques",
    name: "Goulottes techniques",
    brand: "AFCA",
    pageRange: [125, 133],
    categories: [
      { slug: "goulottes-protection", name: "Goulottes protection câbles", subcategories: [] },
      { slug: "moulures", name: "Moulures électriques", subcategories: [] },
      { slug: "plinthes", name: "Plinthes", subcategories: [] },
      { slug: "goulottes-sol", name: "Goulottes de sol", subcategories: [] },
      { slug: "goulottes-distribution", name: "Goulottes distribution", subcategories: [] },
    ],
  },
  // ========== GAMME V2 ==========
  {
    slug: "v2-portails-coulissants",
    name: "V2 — Portails coulissants",
    brand: "V2",
    pageRange: [144, 154],
    categories: [
      {
        slug: "v2-coulissants-residentiel",
        name: "Résidentiel",
        subcategories: [
          { slug: "torq", name: "TORQ (400/500 kg)" },
          { slug: "ayros", name: "AYROS (400/500/800 kg)" },
        ],
      },
      {
        slug: "v2-coulissants-industriel",
        name: "Industriel",
        subcategories: [
          { slug: "forteco", name: "FORTECO (1800/2200/2500 kg)" },
          { slug: "hyperfor", name: "HYPERFOR (4000 kg)" },
        ],
      },
    ],
  },
  {
    slug: "v2-portails-battants",
    name: "V2 — Portails battants",
    brand: "V2",
    pageRange: [156, 171],
    categories: [
      {
        slug: "v2-battants-externe",
        name: "Vérins externes",
        subcategories: [
          { slug: "nyk", name: "NYK (vantail 2 m)" },
          { slug: "stark3", name: "STARK3" },
          { slug: "stark6", name: "STARK6" },
          { slug: "calypso", name: "CALYPSO" },
          { slug: "zorus", name: "ZORUS" },
          { slug: "blitz", name: "BLITZ" },
        ],
      },
      {
        slug: "v2-battants-encastre",
        name: "Encastrés",
        subcategories: [{ slug: "vulcan", name: "VULCAN" }],
      },
    ],
  },
  {
    slug: "v2-garages-rideaux",
    name: "V2 — Garages & rideaux",
    brand: "V2",
    pageRange: [173, 183],
    categories: [
      {
        slug: "v2-residentiel-garages",
        name: "Résidentiel",
        subcategories: [
          { slug: "azimut", name: "AZIMUT (8 m²)" },
          { slug: "jedi", name: "JEDI (15 m², 1000 N)" },
          { slug: "atris", name: "ATRIS (700/1000 N)" },
          { slug: "vega", name: "VEGA (basculantes)" },
        ],
      },
    ],
  },
  {
    slug: "v2-barrieres",
    name: "V2 — Barrières levantes",
    brand: "V2",
    pageRange: [185, 193],
    categories: [
      { slug: "v2-nuur", name: "NUUR (4 m / 6 m, rapide)", subcategories: [] },
      { slug: "v2-niuba", name: "NIUBA (4 m / 6 m, 24V & 230V)", subcategories: [] },
      { slug: "v2-acc-barrieres", name: "Accessoires barrières", subcategories: [] },
    ],
  },
  {
    slug: "v2-armoires-commande",
    name: "V2 — Armoires de commande",
    brand: "V2",
    pageRange: [194, 212],
    categories: [
      { slug: "v2-city", name: "Série CITY (1-EVO, 2+, 4-EVO, 5, 11)", subcategories: [] },
      { slug: "v2-flexy-easy", name: "FLEXY2 / EASY2", subcategories: [] },
      { slug: "v2-pd", name: "Série PD (11, 13, 14, 15, 18, 19, 20)", subcategories: [] },
      { slug: "v2-heavy", name: "HEAVY1", subcategories: [] },
    ],
  },
  {
    slug: "v2-emetteurs-recepteurs",
    name: "V2 — Émetteurs & récepteurs",
    brand: "V2",
    pageRange: [213, 224],
    categories: [
      { slug: "v2-emetteurs", name: "Émetteurs (PHOX, KEHO, PMR)", subcategories: [] },
      { slug: "v2-recepteurs", name: "Récepteurs (WALLY E, MR2, WALLY2-230V, RXP4)", subcategories: [] },
      { slug: "v2-modules-miniaturises", name: "Modules miniaturisés (TMU100, MATCH)", subcategories: [] },
      { slug: "v2-programmateurs", name: "Programmateurs & logiciel (PROG2, FLASH-PROG, WINPPCL)", subcategories: [] },
    ],
  },
  {
    slug: "v2-securite-accessoires",
    name: "V2 — Sécurité & accessoires",
    brand: "V2",
    pageRange: [225, 239],
    categories: [
      { slug: "v2-solaire", name: "Solaire ECO-LOGIC", subcategories: [] },
      { slug: "v2-acces-clavier-radio", name: "Clavier radio (KIBO, SIRMO)", subcategories: [] },
      { slug: "v2-proximite", name: "Proximité (NEXT, PROKSIMA)", subcategories: [] },
      { slug: "v2-decodeurs", name: "Décodeurs (DEC4-PLUS, RXP4-C)", subcategories: [] },
      { slug: "v2-potelets", name: "Potelets TOWER 500/1000", subcategories: [] },
      { slug: "v2-feux", name: "Feux LED (LUMOS, BLINKO, ML6)", subcategories: [] },
      { slug: "v2-antenne", name: "Antenne ANS433", subcategories: [] },
      { slug: "v2-sensiva", name: "Photocellules SENSIVA & SHIELD", subcategories: [] },
    ],
  },
  {
    slug: "v2-tubulaires",
    name: "V2 — Motoréducteurs tubulaires",
    brand: "V2",
    pageRange: [241, 254],
    categories: [
      { slug: "v2-tube-35", name: "Ø35 mm (VEO, VEO-RFE)", subcategories: [] },
      { slug: "v2-tube-45", name: "Ø45 mm (LEX et variantes)", subcategories: [] },
      { slug: "v2-tube-59", name: "Ø59 mm (ROLL, HAND-ROLL)", subcategories: [] },
    ],
  },
  {
    slug: "v2-electronique-tubulaires",
    name: "V2 — Électronique tubulaires",
    brand: "V2",
    pageRange: [256, 271],
    categories: [
      { slug: "v2-tube-emetteurs", name: "Émetteurs (PROTEO, LOKI, ARTEMIS)", subcategories: [] },
      { slug: "v2-tube-modules-dev", name: "Modules DEV miniaturisés", subcategories: [] },
      { slug: "v2-tube-armoires", name: "Armoires (CU1, CU3, CU4)", subcategories: [] },
      { slug: "v2-tube-prog", name: "Programmateurs (PRG2, PRG3)", subcategories: [] },
      { slug: "v2-tube-capteurs", name: "Capteurs climatiques (SYROCO, MISTRAL, HURRICANE, TYPHOON)", subcategories: [] },
    ],
  },
];

// =====================================================================
// Seed produits — 80 références représentatives couvrant toutes les familles
// Attention : les codes AFCA/V2 sont les refs fabricant. En front public,
// la clause fournisseur interdit leur exposition directe — on les mappe
// sur une nomenclature AcceFerm (cf `publicSlug` ci-dessous).
// =====================================================================

export type AfcaSeedProduct = {
  ref: string;
  name: string;
  family: string;
  category: string;
  subcategory: string | null;
  specs: Record<string, string | number | boolean>;
  pageRef: number;
};

export const afcaSeedProducts: AfcaSeedProduct[] = [
  // Rideaux EASY
  { ref: "FAC64155", name: "Moteur EASY 60 — 155 Nm sans frein", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-60", specs: { couple: "155 Nm", axe: "Ø60 mm", bobine: "200/220 mm", soulevement: "160 kg", tension: "230V mono", ip: "IP44", frein: false }, pageRef: 7 },
  { ref: "FAD64155", name: "Moteur EASY 60 E — 170 Nm avec frein", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-60", specs: { couple: "170 Nm", soulevement: "170 kg", frein: true }, pageRef: 7 },
  { ref: "FAD6445P", name: "Moteur EASY 60 EP — 145 Nm avec frein et parachute", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-60", specs: { couple: "145 Nm", soulevement: "160 kg", frein: true, parachute: true }, pageRef: 7 },
  { ref: "FAC60SME", name: "Moteur EASY 60 SME — 260 Nm sans frein", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-60", specs: { couple: "260 Nm", soulevement: "260 kg" }, pageRef: 7 },
  { ref: "FAC76210", name: "Moteur EASY 76 — 210 Nm", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-76", specs: { couple: "210 Nm", axe: "Ø76 mm", bobine: "240 mm" }, pageRef: 7 },
  { ref: "FAD74185", name: "Moteur EASY 76 E — 185 Nm avec frein", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-compenses", subcategory: "easy-76", specs: { couple: "185 Nm", frein: true }, pageRef: 7 },
  // RDF
  { ref: "FCS290ME", name: "Moteur RDF 290N — FDC électronique, manivelle", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-rdf", subcategory: "rdf-fdc-electronique", specs: { couple: "290 Nm", tension: "400V tri", arbre: "Ø30 mm" }, pageRef: 12 },
  { ref: "FCS450ME", name: "Moteur RDF 450N — FDC électronique, manivelle", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-rdf", subcategory: "rdf-fdc-electronique", specs: { couple: "450 Nm", tension: "400V tri" }, pageRef: 12 },
  { ref: "FCS1100C", name: "Moteur RDF 1100N — secours chaîne", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-rdf", subcategory: "rdf-fdc-electronique", specs: { couple: "1100 Nm" }, pageRef: 12 },
  { ref: "FCS1400C", name: "Moteur RDF 1400N — secours chaîne", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-rideaux-rdf", subcategory: "rdf-fdc-electronique", specs: { couple: "1400 Nm", arbre: "Ø55 mm" }, pageRef: 12 },
  // Tubulaires MTI
  { ref: "FCT330MO", name: "Moteur tubulaire MTI 330", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-tubulaires-mti", subcategory: null, specs: { couple: "330 Nm", tension: "230V mono", puissance: "830 W", vitesse: "9 rpm" }, pageRef: 16 },
  { ref: "FCT550MO", name: "Moteur tubulaire MTI 500", family: "rideaux-metalliques-portes-sectionnelles", category: "moteurs-tubulaires-mti", subcategory: null, specs: { couple: "500 Nm", puissance: "1020 W", vitesse: "6 rpm" }, pageRef: 16 },
  // Parachutes
  { ref: "FIF02500", name: "Parachute industriel DR250", family: "rideaux-metalliques-portes-sectionnelles", category: "parachutes", subcategory: "industriels", specs: { couple_admissible: "250 Nm", ip: "IP65" }, pageRef: 17 },
  { ref: "FIF06008", name: "Parachute industriel DR600", family: "rideaux-metalliques-portes-sectionnelles", category: "parachutes", subcategory: "industriels", specs: { couple_admissible: "600 Nm" }, pageRef: 17 },
  { ref: "FIF15008", name: "Parachute industriel DR1500", family: "rideaux-metalliques-portes-sectionnelles", category: "parachutes", subcategory: "industriels", specs: { couple_admissible: "1500 Nm" }, pageRef: 17 },
  { ref: "FIF00708", name: "Parachute domestique DR70", family: "rideaux-metalliques-portes-sectionnelles", category: "parachutes", subcategory: "domestiques", specs: { couple: "70 Nm", cable: "8 m", ip: "IP67" }, pageRef: 18 },
  { ref: "FIF014P8", name: "Parachute domestique DR140 Plus", family: "rideaux-metalliques-portes-sectionnelles", category: "parachutes", subcategory: "domestiques", specs: { couple: "140 Nm" }, pageRef: 18 },
  // D-PRO armoires
  { ref: "FTAC2000", name: "Armoire D-PRO Action 400V", family: "armoires-de-commande-afca", category: "d-pro-armoires", subcategory: null, specs: { tension: "400V tri", puissance_max: "2.2 kW", ip: "55" }, pageRef: 14 },
  { ref: "FTAC2100", name: "Armoire D-PRO Action 400V + gestion frein", family: "armoires-de-commande-afca", category: "d-pro-armoires", subcategory: null, specs: { tension: "400V tri", gestion_frein: true }, pageRef: 14 },
  { ref: "FTAC1000", name: "Armoire D-PRO Automatic 400V", family: "armoires-de-commande-afca", category: "d-pro-armoires", subcategory: null, specs: { tension: "400V tri" }, pageRef: 15 },
  { ref: "FTAC1200", name: "Armoire D-PRO Automatic 230V", family: "armoires-de-commande-afca", category: "d-pro-armoires", subcategory: null, specs: { tension: "230V mono" }, pageRef: 15 },
  // Barres palpeuses SECURIS
  { ref: "FYRBI222", name: "Barre palpeuse BI2 complète 2 m", family: "accessoires-securite-afca", category: "barres-palpeuses", subcategory: "securis-completes", specs: { longueur: "2 m", compression: "40 mm", normes: "EN 12453/12978", ip_cellule: "IP68" }, pageRef: 86 },
  { ref: "FYRBI223", name: "Barre palpeuse BI2 complète 3 m", family: "accessoires-securite-afca", category: "barres-palpeuses", subcategory: "securis-completes", specs: { longueur: "3 m" }, pageRef: 86 },
  { ref: "FYRBC225", name: "Barre palpeuse BC2 complète 5 m", family: "accessoires-securite-afca", category: "barres-palpeuses", subcategory: "securis-completes", specs: { longueur: "5 m", compression: "75 mm" }, pageRef: 86 },
  // Cellules
  { ref: "FYL0910P", name: "Cellules IR910 extra plates", family: "accessoires-securite-afca", category: "photocellules", subcategory: "barrage", specs: { portee: "10 m", tension: "12-24 V" }, pageRef: 94 },
  { ref: "FYA00120", name: "Cellules PMT20", family: "accessoires-securite-afca", category: "photocellules", subcategory: "barrage", specs: { portee: "20 m", tension: "24 Vac" }, pageRef: 94 },
  { ref: "RYA020SN", name: "Cellules SHIELD 020SN 180°", family: "accessoires-securite-afca", category: "photocellules", subcategory: "shield-180", specs: { portee: "25 m", orientable: "180° H, 30° V", ip: "IP55" }, pageRef: 95 },
  { ref: "FYA0PD86", name: "REFLEX PD 86 portée 12 m", family: "accessoires-securite-afca", category: "photocellules", subcategory: "reflex", specs: { portee: "12 m", orientable: "90°" }, pageRef: 97 },
  { ref: "FYABMN60", name: "Cellules BMN60 longue portée 60 m", family: "accessoires-securite-afca", category: "photocellules", subcategory: "longue-portee-bmn60", specs: { portee: "60 m", ip: "IP65" }, pageRef: 96 },
  { ref: "FXR0V2BI", name: "Radar bidirectionnel V2BI portée 3 m", family: "accessoires-securite-afca", category: "radar-bidirectionnel", subcategory: null, specs: { portee: "3 m", normes: "EN 16005/SIL2" }, pageRef: 99 },
  // Claviers à code AFCA
  { ref: "CAICL03C", name: "Clavier universel CL-3C", family: "organes-de-commande-afca", category: "claviers-a-code", subcategory: "cl-3c", specs: { tension: "12-24 V", ip: "IP65", utilisateurs: 60, relais: 2 }, pageRef: 101 },
  { ref: "CAITAL2P", name: "CODIPASS TALOS PVC 2 relais", family: "organes-de-commande-afca", category: "claviers-a-code", subcategory: "codipass-talos", specs: { tension: "12-24 V", ip: "IP65", codes_max: 200 }, pageRef: 102 },
  { ref: "CAITAL2M", name: "CODIPASS TALOS metal 2 relais", family: "organes-de-commande-afca", category: "claviers-a-code", subcategory: "codipass-talos", specs: { tension: "12-24 V", boitier: "metal" }, pageRef: 102 },
  { ref: "CAI004CL", name: "CODIBADGE clavier + lecteur proximité", family: "organes-de-commande-afca", category: "claviers-a-code", subcategory: "codibadge", specs: { tension: "12-24 V", ip: "IP66", utilisateurs: 999 }, pageRef: 113 },
  { ref: "CIGJOWIA", name: "Vidéophone AIPHONE JO Wi-Fi 7''", family: "organes-de-commande-afca", category: "interphones-videophones", subcategory: null, specs: { ecran: "7\"", wifi: true, alim: "230V" }, pageRef: 109 },
  // Contrôle d'accès
  { ref: "CCFELA3E", name: "Centrale ELA CT-EVOLUTION", family: "controle-acces-afca", category: "centrales-acces", subcategory: null, specs: { utilisateurs: 3000, evenements: 4500, liaison: "USB + IP" }, pageRef: 111 },
  { ref: "CCFELA3G", name: "Centrale ELA CT-EVOLUTION + lecteur proximité", family: "controle-acces-afca", category: "centrales-acces", subcategory: null, specs: { utilisateurs: 3000, lecteur_integre: true }, pageRef: 111 },
  { ref: "CVA300AP", name: "Ventouse 300 kg applique", family: "controle-acces-afca", category: "ventouses-electromagnetiques", subcategory: null, specs: { force: "300 kg", tension: "12-24 Vcc" }, pageRef: 114 },
  { ref: "CVA750AP", name: "Ventouse 530 kg applique inox étanche", family: "controle-acces-afca", category: "ventouses-electromagnetiques", subcategory: null, specs: { force: "530 kg", finition: "inox", etanche: true }, pageRef: 114 },
  // Signalisation
  { ref: "FZA024F1", name: "Feu bicolore 1 lampe 24V", family: "signalisation-feux-afca", category: "feux-bicolores", subcategory: null, specs: { tension: "24V AC", couleurs: "rouge/vert", ip: "IP65" }, pageRef: 116 },
  { ref: "FZA230E2", name: "Feu bicolore 2 lampes 230V", family: "signalisation-feux-afca", category: "feux-bicolores", subcategory: null, specs: { tension: "230V AC", orientable: "200°" }, pageRef: 116 },
  { ref: "FZA00LED", name: "Feu industriel orange Full LED multitension", family: "signalisation-feux-afca", category: "feu-industriel", subcategory: null, specs: { tension: "12/24/230V" }, pageRef: 117 },
  { ref: "FZD030LN", name: "Projecteur LED zone 30W 230V", family: "signalisation-feux-afca", category: "eclairage-zone", subcategory: null, specs: { tension: "230V", puissance: "30W" }, pageRef: 117 },
  // Goulottes
  { ref: "13010CBR", name: "Goulotte 25x30 mm boîte 96 m", family: "goulottes-techniques", category: "goulottes-protection", subcategory: null, specs: { dimensions: "25x30 mm", longueur: "96 m" }, pageRef: 125 },
  { ref: "13080CBR", name: "Goulotte 100x60 mm boîte 16 m", family: "goulottes-techniques", category: "goulottes-protection", subcategory: null, specs: { dimensions: "100x60 mm", longueur: "16 m" }, pageRef: 125 },
  { ref: "10010CBR", name: "Moulure 12x7 mm IK05 boîte 120 m", family: "goulottes-techniques", category: "moulures", subcategory: null, specs: { dimensions: "12x7 mm", ik: "IK05" }, pageRef: 126 },
  { ref: "10100CBR", name: "Plinthe 110x20 mm IK05 boîte 20 m", family: "goulottes-techniques", category: "plinthes", subcategory: null, specs: { dimensions: "110x20 mm" }, pageRef: 130 },
  // Sindaur 3000
  { ref: "1SOS1162", name: "Motoréducteur E1124 24V réversible", family: "barrieres-levantes-sindaur-3000", category: "moteurs-3000", subcategory: null, specs: { tension: "24V", reversible: true }, pageRef: 120 },
  { ref: "1SASCD50", name: "Platine de commande CDO 30", family: "barrieres-levantes-sindaur-3000", category: "moteurs-3000", subcategory: null, specs: {}, pageRef: 120 },
  { ref: "1SOS1461", name: "Poteau autoportant 200x200 mm non peint", family: "barrieres-levantes-sindaur-3000", category: "structure-3000", subcategory: null, specs: { dimensions: "200x200 mm" }, pageRef: 121 },
  { ref: "1SOS1561", name: "Bras télescopique 800 mm", family: "barrieres-levantes-sindaur-3000", category: "tabliers-bras-3000", subcategory: null, specs: { longueur: "800 mm" }, pageRef: 122 },
  // V2 Coulissants
  { ref: "RRVTO500", name: "V2 TORQ 500 — 24V armoire intégrée 500 kg", family: "v2-portails-coulissants", category: "v2-coulissants-residentiel", subcategory: "torq", specs: { tension: "24V DC", poids_max: "500 kg", poussee: "300 N", vitesse: "0.28 m/s", ip: "IP44" }, pageRef: 148 },
  { ref: "RRVTO400", name: "V2 TORQ 400 FAST — 24V 400 kg", family: "v2-portails-coulissants", category: "v2-coulissants-residentiel", subcategory: "torq", specs: { tension: "24V DC", poids_max: "400 kg" }, pageRef: 148 },
  { ref: "RRWTORK1", name: "V2 Kit TORQ 24V 500 kg", family: "v2-portails-coulissants", category: "v2-coulissants-residentiel", subcategory: "torq", specs: { type: "kit" }, pageRef: 149 },
  { ref: "RRVH4230", name: "V2 HYPERFOR tri 230V 4 tonnes", family: "v2-portails-coulissants", category: "v2-coulissants-industriel", subcategory: "hyperfor", specs: { tension: "230V tri", poids_max: "4000 kg" }, pageRef: 154 },
  // V2 Battants
  { ref: "RRM24NYK", name: "V2 NYK 24V vantail 2 m", family: "v2-portails-battants", category: "v2-battants-externe", subcategory: "nyk", specs: { tension: "24V", vantail_max: "2 m", poids_max: "250 kg" }, pageRef: 158 },
  { ref: "RRM24SK3", name: "V2 STARK3 24V", family: "v2-portails-battants", category: "v2-battants-externe", subcategory: "stark3", specs: { tension: "24V" }, pageRef: 161 },
  { ref: "RRM23SK3", name: "V2 STARK3 230V", family: "v2-portails-battants", category: "v2-battants-externe", subcategory: "stark3", specs: { tension: "230V" }, pageRef: 161 },
  { ref: "RROSK3K3", name: "V2 Kit STARK3 24V 2 vérins + cellules", family: "v2-portails-battants", category: "v2-battants-externe", subcategory: "stark3", specs: { type: "kit" }, pageRef: 161 },
  // V2 Garages
  { ref: "RDG0000M", name: "V2 AZIMUT 230V 8 m²", family: "v2-garages-rideaux", category: "v2-residentiel-garages", subcategory: "azimut", specs: { tension: "230V", surface_max: "8 m²" }, pageRef: 176 },
  { ref: "RDAJEDIL", name: "V2 JEDI 230V 1000N 15 m²", family: "v2-garages-rideaux", category: "v2-residentiel-garages", subcategory: "jedi", specs: { tension: "230V", surface_max: "15 m²" }, pageRef: 178 },
  { ref: "RDCJ30PH", name: "V2 Kit JEDI 230V + rail 3 m + 2 PHOX", family: "v2-garages-rideaux", category: "v2-residentiel-garages", subcategory: "jedi", specs: { type: "kit" }, pageRef: 179 },
  { ref: "RDDVC230", name: "V2 VEGA-C 230V basculantes", family: "v2-garages-rideaux", category: "v2-residentiel-garages", subcategory: "vega", specs: { tension: "230V" }, pageRef: 182 },
  // V2 Barrières
  { ref: "RKVNUUR4", name: "V2 NUUR 4 — barrière 24V lisse 4 m", family: "v2-barrieres", category: "v2-nuur", subcategory: null, specs: { tension: "24V DC", lisse_max: "4 m", cycles_h: 300 }, pageRef: 187 },
  { ref: "RKVCNU60", name: "V2 NUUR 6 complète avec lisse 6 m", family: "v2-barrieres", category: "v2-nuur", subcategory: null, specs: { lisse: "6 m" }, pageRef: 189 },
  { ref: "RKVNI400", name: "V2 NIUBA 4 24V", family: "v2-barrieres", category: "v2-niuba", subcategory: null, specs: { tension: "24V DC", lisse_max: "4 m" }, pageRef: 193 },
  // V2 Armoires
  { ref: "RTQC1EVO", name: "V2 CITY1-EVO 230V 2 moteurs", family: "v2-armoires-commande", category: "v2-city", subcategory: null, specs: { tension: "230V mono", charge_max: "2x700 W", ip: "IP55" }, pageRef: 196 },
  { ref: "RTQCI250", name: "V2 CITY2+ 230V 2 moteurs 24V", family: "v2-armoires-commande", category: "v2-city", subcategory: null, specs: { tension: "230V mono" }, pageRef: 197 },
  { ref: "RTQC2PBC", name: "V2 CITY2+BC ECO-LOGIC", family: "v2-armoires-commande", category: "v2-city", subcategory: null, specs: { tension: "24V DC", solaire: "ECO-LOGIC" }, pageRef: 197 },
  { ref: "RTQFLEX2", name: "V2 FLEXY2 230V récepteur 433 MHz", family: "v2-armoires-commande", category: "v2-flexy-easy", subcategory: null, specs: { tension: "230V", recepteur: "433.92 MHz" }, pageRef: 200 },
  // V2 Émetteurs/Récepteurs
  { ref: "RVA047X4", name: "V2 PHOX émetteur 4 canaux 433 MHz", family: "v2-emetteurs-recepteurs", category: "v2-emetteurs", subcategory: null, specs: { frequence: "433.92 MHz", canaux: 4 }, pageRef: 215 },
  { ref: "RVB0433E", name: "V2 MR2 récepteur embrochable 433 MHz", family: "v2-emetteurs-recepteurs", category: "v2-recepteurs", subcategory: null, specs: { frequence: "433.92 MHz", canaux: 4, codes_max: 1008 }, pageRef: 219 },
  { ref: "RVB0868E", name: "V2 MR2 récepteur embrochable 868 MHz", family: "v2-emetteurs-recepteurs", category: "v2-recepteurs", subcategory: null, specs: { frequence: "868.30 MHz", canaux: 4 }, pageRef: 219 },
  { ref: "RVB433LU", name: "V2 WALLY2-230V récepteur 2 canaux", family: "v2-emetteurs-recepteurs", category: "v2-recepteurs", subcategory: null, specs: { tension: "230V", canaux: 2, charge_max: "1500W" }, pageRef: 220 },
  { ref: "RVBRXP4P", name: "V2 RXP4 récepteur 24V 4 canaux + afficheur", family: "v2-emetteurs-recepteurs", category: "v2-recepteurs", subcategory: null, specs: { tension: "12-24V", canaux: 4 }, pageRef: 221 },
  // V2 Sécurité
  { ref: "RWJ047KB", name: "V2 KIBO-R433 clavier digital radio", family: "v2-securite-accessoires", category: "v2-acces-clavier-radio", subcategory: null, specs: { frequence: "433.92 MHz", alim: "CR2032", ip: "IP54" }, pageRef: 230 },
  { ref: "RWB0NEXT", name: "V2 NEXT-RSE lecteur proximité radio", family: "v2-securite-accessoires", category: "v2-proximite", subcategory: null, specs: { frequence: "433.92 MHz", portee: "60 m" }, pageRef: 231 },
  { ref: "RYB500TO", name: "V2 TOWER 500 potelets alu 500 mm", family: "v2-securite-accessoires", category: "v2-potelets", subcategory: null, specs: { hauteur: "500 mm" }, pageRef: 234 },
  { ref: "RZALUMOS", name: "V2 LUMOS feu LED multitension + antenne", family: "v2-securite-accessoires", category: "v2-feux", subcategory: null, specs: { tension: "24-230V", antenne: "intégrée", ip: "IP54" }, pageRef: 235 },
  { ref: "RZABLINK", name: "V2 BLINKO feu LED multitension auto", family: "v2-securite-accessoires", category: "v2-feux", subcategory: null, specs: { tension: "24-230V" }, pageRef: 235 },
  { ref: "RVC433AN", name: "V2 ANS433 antenne externe 433-868", family: "v2-securite-accessoires", category: "v2-antenne", subcategory: null, specs: { frequence: "433-868 MHz", gain: "2.5 dB" }, pageRef: 236 },
  { ref: "RYA00SXS", name: "V2 SENSIVA-XS miniaturisées synchro", family: "v2-securite-accessoires", category: "v2-sensiva", subcategory: null, specs: { portee: "20 m", tension: "12-24V", ip: "IP54" }, pageRef: 237 },
  { ref: "RYA00180", name: "V2 SENSIVA-180 orientables 180°", family: "v2-securite-accessoires", category: "v2-sensiva", subcategory: null, specs: { portee: "20 m", orientable: "180° H" }, pageRef: 237 },
  { ref: "RYA021SL", name: "V2 SHIELD-180 alu anti-choc", family: "v2-securite-accessoires", category: "v2-sensiva", subcategory: null, specs: { portee: "20 m", orientable: "180° H", ip: "IP55" }, pageRef: 239 },
  // V2 Tubulaires
  { ref: "VA27A023", name: "V2 VEO10-230V tubulaire Ø35", family: "v2-tubulaires", category: "v2-tube-35", subcategory: null, specs: { diametre: "Ø35 mm", couple: "10 Nm", charge_max: "27 kg" }, pageRef: 242 },
  { ref: "VA28B222", name: "V2 LEX20-230V tubulaire Ø45", family: "v2-tubulaires", category: "v2-tube-45", subcategory: null, specs: { diametre: "Ø45 mm", couple: "20 Nm", charge_max: "35 kg" }, pageRef: 244 },
  { ref: "VA27C031", name: "V2 ROLL80-230V tubulaire Ø59", family: "v2-tubulaires", category: "v2-tube-59", subcategory: null, specs: { diametre: "Ø59 mm", couple: "80 Nm", charge_max: "125 kg" }, pageRef: 252 },
  { ref: "VA27C039", name: "V2 ROLL140-230V tubulaire Ø59", family: "v2-tubulaires", category: "v2-tube-59", subcategory: null, specs: { couple: "140 Nm", charge_max: "230 kg" }, pageRef: 252 },
  // V2 Électronique tubulaires
  { ref: "VD10T040", name: "V2 PROTEO1 émetteur 1 canal 434 MHz", family: "v2-electronique-tubulaires", category: "v2-tube-emetteurs", subcategory: null, specs: { frequence: "434.15 MHz", canaux: 1, portee: "300 m" }, pageRef: 257 },
  { ref: "VD10T044", name: "V2 PROTEO12-D émetteur 12 canaux + afficheur", family: "v2-electronique-tubulaires", category: "v2-tube-emetteurs", subcategory: null, specs: { canaux: 12, afficheur: true }, pageRef: 257 },
  { ref: "VD10K027", name: "V2 ARTEMIS6 émetteur mural 6 canaux", family: "v2-electronique-tubulaires", category: "v2-tube-emetteurs", subcategory: null, specs: { canaux: 6, montage: "mural" }, pageRef: 258 },
  { ref: "VD12E090", name: "V2 DEV-R1 module récepteur encastrable", family: "v2-electronique-tubulaires", category: "v2-tube-modules-dev", subcategory: null, specs: { tension: "85-260V", frequence: "434 MHz" }, pageRef: 259 },
];

/** Totaux pour reporting */
export const afcaStats = {
  familiesCount: afcaFamilies.length,
  categoriesCount: afcaFamilies.reduce((a, f) => a + f.categories.length, 0),
  subcategoriesCount: afcaFamilies.reduce(
    (a, f) => a + f.categories.reduce((b, c) => b + c.subcategories.length, 0),
    0,
  ),
  seedProductsCount: afcaSeedProducts.length,
  /** Total refs restantes à importer via l'index PDF pp 264-272 */
  estimatedTotalRefs: 1500,
};
