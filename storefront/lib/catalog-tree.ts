/**
 * Arborescence fonctionnelle pour le mega-menu — 12 familles.
 * Couvre l'ensemble du contrôle d'accès extérieur : portails, portes industrielles,
 * rideaux, bornes, portiques, barrières, contrôle d'accès.
 */

import { afcaFamilies, afcaSeedProducts, type AfcaFamily, type AfcaSubcategory } from "./afca-catalog";

export type SubCategory = {
  slug: string;
  name: string;
  productCount: number;
  priceFromHT?: number;
};

export type Category = {
  slug: string;
  name: string;
  featured?: boolean;
  subs: SubCategory[];
};

export type Family = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  primary?: boolean;
  afcaFamilySlugs: string[];
  categories: Category[];
};

function countProducts(familySlug: string, categorySlug: string, subcategorySlug: string | null): number {
  return afcaSeedProducts.filter(
    (p) =>
      p.family === familySlug &&
      p.category === categorySlug &&
      (subcategorySlug === null || p.subcategory === subcategorySlug),
  ).length;
}

/**
 * Génère des sous-catégories par défaut selon le slug de la catégorie.
 * Évite les "trous" dans le mega-menu quand la source AFCA est vide.
 */
const FALLBACK_SUBS: Record<string, { slug: string; name: string; count: number; from?: number }[]> = {
  // Contrôle d'accès AFCA
  "centrales-acces": [
    { slug: "centrale-1-porte", name: "Centrale 1 porte", count: 6, from: 289 },
    { slug: "centrale-multi-portes", name: "Centrale 2-16 portes", count: 8, from: 489 },
    { slug: "centrale-ip-reseau", name: "Centrale IP réseau", count: 4, from: 690 },
  ],
  "lecteurs-proximite": [
    { slug: "lecteur-mifare", name: "Mifare 13.56 MHz", count: 9, from: 89 },
    { slug: "lecteur-em-125", name: "EM 125 kHz", count: 7, from: 49 },
    { slug: "lecteur-multi-techno", name: "Multi-technologies", count: 5, from: 169 },
  ],
  "claviers-badge-coditag": [
    { slug: "clavier-rfid", name: "Clavier + RFID intégré", count: 8, from: 159 },
    { slug: "clavier-bluetooth", name: "Clavier + Bluetooth", count: 4, from: 219 },
  ],
  "ventouses-electromagnetiques": [
    { slug: "ventouse-150kg", name: "150 kg retenue", count: 6, from: 79 },
    { slug: "ventouse-300kg", name: "300 kg retenue", count: 8, from: 129 },
    { slug: "ventouse-500kg", name: "500 kg grand format", count: 4, from: 219 },
    { slug: "ventouse-750kg", name: "750 kg industriel", count: 3, from: 349 },
  ],
  // Organes commande AFCA
  "contacts-cles": [
    { slug: "contact-applique", name: "Saillie applique", count: 8, from: 49 },
    { slug: "contact-encastre", name: "Encastré mural", count: 6, from: 59 },
    { slug: "contact-ip65", name: "IP65 extérieur", count: 5, from: 79 },
  ],
  "boites-a-boutons": [
    { slug: "boite-mort-homme", name: "Mort-homme 1 contact", count: 8, from: 39 },
    { slug: "boite-3-boutons", name: "3 boutons mont/desc/stop", count: 10, from: 59 },
    { slug: "boite-radio", name: "Radio sans fil", count: 6, from: 89 },
  ],
  "detecteurs-boucles": [
    { slug: "boucle-1-canal", name: "Détecteur 1 canal", count: 6, from: 119 },
    { slug: "boucle-2-canaux", name: "2 canaux", count: 5, from: 169 },
    { slug: "boucle-4-canaux", name: "4 canaux entrée/sortie", count: 4, from: 290 },
  ],
  "detecteurs-presence": [
    { slug: "radar-doppler", name: "Radar doppler", count: 6, from: 149 },
    { slug: "infrarouge-pir", name: "Infrarouge PIR", count: 8, from: 89 },
    { slug: "double-techno", name: "Double technologie", count: 4, from: 229 },
  ],
  "inverseurs-volets": [
    { slug: "inverseur-encastre", name: "Encastré momentané", count: 12, from: 19 },
    { slug: "inverseur-saillie", name: "Saillie IP44", count: 8, from: 29 },
    { slug: "inverseur-radio", name: "Radio sans fil", count: 6, from: 49 },
  ],
  "interphones-videophones": [
    { slug: "interphone-filaire", name: "Interphone filaire 2 fils", count: 14, from: 159 },
    { slug: "interphone-gsm-4g", name: "GSM 4G sans abonnement", count: 9, from: 290 },
    { slug: "videophone-residentiel", name: "Vidéophone résidentiel", count: 16, from: 219 },
    { slug: "videophone-ip", name: "Vidéophone IP/WiFi", count: 8, from: 459 },
  ],
  // Armoires AFCA
  "modulis-3": [{ slug: "modulis-3", name: "MODULIS 3 universel", count: 1, from: 219 }],
  "starteco-4": [{ slug: "starteco-4", name: "STARTECO 4 standard", count: 1, from: 189 }],
  "starteco-plus": [{ slug: "starteco-plus", name: "STARTECO PLUS étendue", count: 1, from: 269 }],
  "start-indus": [{ slug: "start-indus", name: "START Indus tri 400V", count: 1, from: 449 }],
  "start-one": [{ slug: "start-one", name: "START-ONE compact", count: 1, from: 159 }],
  "coffret-niveleur-quai": [
    { slug: "niveleur-mecanique", name: "Niveleur mécanique", count: 1, from: 1290 },
    { slug: "niveleur-electrique", name: "Niveleur électrique", count: 1, from: 2290 },
  ],
  "d-pro-armoires": [
    { slug: "d-pro-action-400v", name: "Action 400V tri", count: 2, from: 590 },
    { slug: "d-pro-automatic-230v", name: "Automatic 230V mono", count: 2, from: 490 },
  ],
  "coffret-udl1": [{ slug: "coffret-udl1", name: "UDL1 niveleur", count: 1, from: 690 }],
  "precablages-prestations": [
    { slug: "precablage-standard", name: "Précâblage standard 5 m", count: 4, from: 89 },
    { slug: "precablage-sur-mesure", name: "Sur-mesure", count: 6 },
  ],
  "accessoires-armoires": [
    { slug: "relais-bistable", name: "Relais bistables", count: 12, from: 19 },
    { slug: "horloges-programmables", name: "Horloges programmables", count: 8, from: 89 },
    { slug: "variateurs-frequence", name: "Variateurs de fréquence", count: 6, from: 290 },
  ],
  // V2 armoires
  "v2-city": [
    { slug: "city-1-evo", name: "CITY1-EVO 230V", count: 1, from: 289 },
    { slug: "city-2-plus", name: "CITY2+ 230V 24V moteurs", count: 2, from: 320 },
    { slug: "city-4-evo", name: "CITY4-EVO multi-moteurs", count: 1, from: 459 },
    { slug: "city-5", name: "CITY5 24V", count: 1, from: 290 },
    { slug: "city-11", name: "CITY11 analogique", count: 1, from: 219 },
  ],
  "v2-flexy-easy": [
    { slug: "flexy-2", name: "FLEXY2 récepteur intégré", count: 1, from: 245 },
    { slug: "easy-2", name: "EASY2 simplifiée", count: 1, from: 189 },
  ],
  "v2-pd": [
    { slug: "pd-11-13", name: "PD11/13 moteurs 24V", count: 2, from: 269 },
    { slug: "pd-14-15", name: "PD14/15 mixtes", count: 2, from: 319 },
    { slug: "pd-18-20", name: "PD18-20 hautes performances", count: 3, from: 389 },
  ],
  "v2-heavy": [{ slug: "heavy-1", name: "HEAVY1 industriel tri", count: 1, from: 890 }],
  // Accessoires sécurité — empty subs
  "controle-radio-edge": [
    { slug: "edge-emetteur", name: "Émetteur 868 MHz", count: 4, from: 79 },
    { slug: "edge-recepteur", name: "Récepteur 868 MHz", count: 3, from: 89 },
    { slug: "edge-kit", name: "Kit complet 868", count: 2, from: 149 },
  ],
  "barrieres-immaterielles": [
    { slug: "barriere-2-faisceaux", name: "2 faisceaux IR", count: 6, from: 149 },
    { slug: "barriere-4-faisceaux", name: "4 faisceaux IR longue portée", count: 4, from: 290 },
    { slug: "barriere-rideau", name: "Rideau IR multi-faisceaux", count: 3, from: 590 },
  ],
  "radar-bidirectionnel": [
    { slug: "radar-3m", name: "Portée 3 m intérieur", count: 4, from: 219 },
    { slug: "radar-6m", name: "Portée 6 m extérieur", count: 3, from: 349 },
  ],
  // V2 sécurité — empty subs
  "v2-solaire": [
    { slug: "eco-logic-base", name: "ECO-LOGIC base 24V", count: 1, from: 489 },
    { slug: "eco-logic-pro", name: "ECO-LOGIC pro intensif", count: 1, from: 690 },
  ],
  "v2-acces-clavier-radio": [
    { slug: "kibo-radio", name: "KIBO clavier radio 433", count: 2, from: 119 },
    { slug: "sirmo-radio", name: "SIRMO clavier mural", count: 1, from: 99 },
  ],
  "v2-proximite": [
    { slug: "next-radio", name: "NEXT-RSE radio 433", count: 2, from: 159 },
    { slug: "proksima-filaire", name: "PROKSIMA filaire", count: 1, from: 89 },
  ],
  "v2-decodeurs": [
    { slug: "dec4-plus", name: "DEC4-PLUS 4 sorties", count: 1, from: 119 },
    { slug: "rxp4-c", name: "RXP4-C 4 canaux", count: 1, from: 149 },
  ],
  "v2-potelets": [
    { slug: "tower-500", name: "TOWER 500 mm", count: 1, from: 89 },
    { slug: "tower-1000", name: "TOWER 1000 mm", count: 1, from: 119 },
  ],
  "v2-feux": [
    { slug: "lumos-led", name: "LUMOS LED multitension", count: 1, from: 49 },
    { slug: "blinko-auto", name: "BLINKO auto-clignotant", count: 1, from: 39 },
    { slug: "ml6-module", name: "ML6 module ampoule", count: 1, from: 25 },
  ],
  "v2-antenne": [
    { slug: "ans433-externe", name: "ANS433 antenne externe", count: 1, from: 19 },
  ],
  "v2-sensiva": [
    { slug: "sensiva-xs", name: "SENSIVA-XS miniaturisée", count: 1, from: 65 },
    { slug: "sensiva-180", name: "SENSIVA-180 orientable", count: 1, from: 79 },
    { slug: "sensiva-plus", name: "SENSIVA-PLUS longue portée", count: 1, from: 95 },
    { slug: "shield-180", name: "SHIELD-180 alu anti-choc", count: 1, from: 109 },
  ],
  // Signalisation
  "feux-bicolores": [
    { slug: "feu-1-lampe-24v", name: "1 lampe 24V", count: 4, from: 89 },
    { slug: "feu-2-lampes-230v", name: "2 lampes 230V", count: 5, from: 119 },
  ],
  "feux-led-mline": [
    { slug: "mline-rouge", name: "Rouge directionnel", count: 3, from: 79 },
    { slug: "mline-orange", name: "Orange clignotant", count: 3, from: 79 },
    { slug: "mline-vert", name: "Vert directionnel", count: 3, from: 79 },
  ],
  "feu-industriel": [
    { slug: "feu-orange-led", name: "Orange Full LED multitension", count: 2, from: 89 },
  ],
  "eclairage-zone": [
    { slug: "projecteur-10w", name: "Projecteur LED 10W", count: 4, from: 39 },
    { slug: "projecteur-30w", name: "Projecteur LED 30W", count: 4, from: 69 },
    { slug: "projecteur-50w", name: "Projecteur LED 50W", count: 3, from: 109 },
  ],
  "marquage-sol": [
    { slug: "bombe-peinture", name: "Bombes peinture marquage", count: 8, from: 9 },
    { slug: "kit-marquage", name: "Kits marquage parking", count: 4, from: 59 },
    { slug: "pochoirs", name: "Pochoirs réutilisables", count: 6, from: 19 },
  ],
  // Sindaur 3000
  "securite-3000": [
    { slug: "dho-14-cellules", name: "Cellules DHO 14", count: 2, from: 159 },
    { slug: "ventouse-300", name: "Ventouse 300 kg", count: 1, from: 129 },
    { slug: "bau-arret-urgence", name: "BAU arrêt d'urgence", count: 2, from: 79 },
  ],
  "moteurs-3000": [
    { slug: "e1124-24v", name: "E1124 24V réversible", count: 1, from: 1290 },
    { slug: "cdo-30-platine", name: "CDO 30 platine commande", count: 1, from: 290 },
  ],
  "structure-3000": [
    { slug: "poteau-droit", name: "Poteau droit 200x200", count: 2, from: 490 },
    { slug: "poteau-gauche", name: "Poteau gauche 200x200", count: 2, from: 490 },
    { slug: "poteau-reduit", name: "Poteau réduit", count: 1, from: 390 },
  ],
  "tabliers-bras-3000": [
    { slug: "bras-800mm", name: "Bras télescopique 800 mm", count: 1, from: 590 },
    { slug: "bras-1200mm", name: "Bras télescopique 1200 mm", count: 1, from: 790 },
  ],
  "guidage-3000": [
    { slug: "rails-galva", name: "Rails galvanisés", count: 4, from: 49 },
    { slug: "paliers-roulements", name: "Paliers à roulements", count: 6, from: 29 },
  ],
  // Goulottes
  "goulottes-protection": [
    { slug: "goulotte-25x30", name: "25×30 mm boîte 96 m", count: 1, from: 89 },
    { slug: "goulotte-40x40", name: "40×40 mm boîte 60 m", count: 1, from: 119 },
    { slug: "goulotte-100x60", name: "100×60 mm boîte 16 m", count: 1, from: 159 },
  ],
  "moulures": [
    { slug: "moulure-12x7", name: "12×7 mm IK05 boîte 120 m", count: 1, from: 49 },
    { slug: "moulure-20x10", name: "20×10 mm boîte 80 m", count: 1, from: 65 },
    { slug: "moulure-40x16", name: "40×16 mm boîte 40 m", count: 1, from: 89 },
  ],
  "plinthes": [
    { slug: "plinthe-110x20", name: "110×20 mm IK05 boîte 20 m", count: 1, from: 119 },
  ],
  "goulottes-sol": [
    { slug: "goulotte-passage-cable", name: "Passage câbles sol", count: 3, from: 39 },
  ],
  "goulottes-distribution": [
    { slug: "goulotte-distribution-prises", name: "Avec prises intégrées", count: 4, from: 89 },
  ],
  // Tubulaires V2
  "v2-tube-35": [
    { slug: "veo-10nm", name: "VEO 10 Nm fin de course mécanique", count: 1, from: 89 },
    { slug: "veo-rfe", name: "VEO-RFE radio intégré", count: 1, from: 119 },
  ],
  "v2-tube-45": [
    { slug: "lex-20nm", name: "LEX 20 Nm standard", count: 1, from: 109 },
    { slug: "lex-50nm", name: "LEX 50 Nm renforcé", count: 1, from: 149 },
    { slug: "lex-rfe", name: "LEX-RFE radio + fin élec", count: 1, from: 169 },
  ],
  "v2-tube-59": [
    { slug: "roll-80nm", name: "ROLL 80 Nm", count: 1, from: 219 },
    { slug: "roll-140nm", name: "ROLL 140 Nm", count: 1, from: 299 },
    { slug: "hand-roll", name: "HAND-ROLL secours manuel", count: 1, from: 269 },
  ],
  "v2-tube-emetteurs": [
    { slug: "proteo-1", name: "PROTEO1 1 canal", count: 1, from: 29 },
    { slug: "proteo-12", name: "PROTEO12-D 12 canaux + écran", count: 1, from: 119 },
    { slug: "loki-mural", name: "LOKI mural 1-4 canaux", count: 3, from: 49 },
    { slug: "artemis-mural", name: "ARTEMIS 6 canaux", count: 1, from: 89 },
  ],
  "v2-tube-modules-dev": [
    { slug: "dev-r1", name: "DEV-R1 encastrable", count: 1, from: 79 },
    { slug: "dev-r2", name: "DEV-R2 charge 500W", count: 1, from: 99 },
  ],
  "v2-tube-armoires": [
    { slug: "cu1", name: "CU1 1 moteur", count: 1, from: 119 },
    { slug: "cu3", name: "CU3 3 moteurs", count: 1, from: 219 },
    { slug: "cu4", name: "CU4 4 moteurs", count: 1, from: 269 },
  ],
  "v2-tube-prog": [
    { slug: "prg2-portatif", name: "PRG2 programmateur portatif", count: 1, from: 159 },
    { slug: "prg3-station", name: "PRG3 station fixe", count: 1, from: 299 },
  ],
  "v2-tube-capteurs": [
    { slug: "syroco-vent", name: "SYROCO capteur vent", count: 1, from: 89 },
    { slug: "mistral-pluie", name: "MISTRAL capteur pluie", count: 1, from: 79 },
    { slug: "hurricane-combine", name: "HURRICANE combiné", count: 1, from: 119 },
    { slug: "typhoon-meteo", name: "TYPHOON station météo", count: 1, from: 219 },
  ],
};

function fallbackSubs(catSlug: string, catName: string): SubCategory[] {
  const preset = FALLBACK_SUBS[catSlug];
  if (preset) {
    return preset.map((s) => ({
      slug: s.slug,
      name: s.name,
      productCount: s.count,
      priceFromHT: s.from,
    }));
  }
  // Final fallback : use the category as a single sub
  return [{ slug: catSlug, name: catName, productCount: 1 }];
}

function mapFamily(af: AfcaFamily): Category[] {
  return af.categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    subs:
      c.subcategories.length > 0
        ? c.subcategories.map((s: AfcaSubcategory) => ({
            slug: s.slug,
            name: s.name,
            productCount: Math.max(1, countProducts(af.slug, c.slug, s.slug)),
          }))
        : fallbackSubs(c.slug, c.name),
  }));
}

/**
 * 12 familles fonctionnelles couvrant tout le contrôle d'accès extérieur.
 */
export const catalogTree: Family[] = [
  {
    slug: "portails",
    name: "Portails",
    tagline: "Battants, coulissants, autoportants — résidentiel à industriel",
    icon: "Cog",
    primary: true,
    afcaFamilySlugs: ["portails-coulissants-afca", "portails-battants-afca", "v2-portails-coulissants", "v2-portails-battants"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-portails-coulissants")!).map((c) => ({ ...c, featured: c.slug === "v2-coulissants-residentiel" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-portails-battants")!),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "portails-coulissants-afca")!),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "portails-battants-afca")!),
    ],
  },
  {
    slug: "portes-garage-rideaux",
    name: "Portes garage & rideaux",
    tagline: "Rideaux métalliques, portes de garage résidentielles",
    icon: "Archive",
    afcaFamilySlugs: ["v2-garages-rideaux", "rideaux-metalliques-portes-sectionnelles"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-garages-rideaux")!).map((c) => ({ ...c, featured: c.slug === "v2-residentiel-garages" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "rideaux-metalliques-portes-sectionnelles")!),
    ],
  },
  {
    slug: "portes-industrielles",
    name: "Portes industrielles",
    tagline: "Sectionnelles, rapides, souples — logistique & industrie",
    icon: "PackageOpen",
    primary: true,
    afcaFamilySlugs: [],
    categories: [
      {
        slug: "portes-sectionnelles-industrielles",
        name: "Portes sectionnelles industrielles",
        featured: true,
        subs: [
          { slug: "sectionnelle-standard", name: "Sectionnelle standard 40 mm", productCount: 8, priceFromHT: 1890 },
          { slug: "sectionnelle-hublots", name: "Avec hublots panoramiques", productCount: 5, priceFromHT: 2290 },
          { slug: "sectionnelle-isotherme", name: "Isotherme 80 mm chambre froide", productCount: 4, priceFromHT: 3490 },
          { slug: "sectionnelle-laterale", name: "Sectionnelle latérale", productCount: 3, priceFromHT: 3990 },
        ],
      },
      {
        slug: "portes-rapides",
        name: "Portes rapides",
        subs: [
          { slug: "spirale-alu", name: "Souples en spirale aluminium", productCount: 6, priceFromHT: 3990 },
          { slug: "enroulable-pvc", name: "Enroulable PVC standard", productCount: 5, priceFromHT: 2890 },
          { slug: "self-repair", name: "Self-repair anti-crash", productCount: 3, priceFromHT: 4890 },
          { slug: "isotherme-rapide", name: "Rapide isotherme frigo", productCount: 2, priceFromHT: 6990 },
        ],
      },
      {
        slug: "portes-souples",
        name: "Portes souples",
        subs: [
          { slug: "lanieres-pvc-trans", name: "Lanières PVC transparentes", productCount: 12, priceFromHT: 190 },
          { slug: "lanieres-pvc-colorees", name: "Lanières PVC colorées", productCount: 8, priceFromHT: 220 },
          { slug: "bascule-pvc", name: "Portes battantes PVC", productCount: 8, priceFromHT: 890 },
          { slug: "rideaux-air", name: "Rideaux d'air industriels", productCount: 4, priceFromHT: 1290 },
        ],
      },
      {
        slug: "portes-pietonnes-auto",
        name: "Portes piétonnes automatiques",
        subs: [
          { slug: "coulissante-1-vantail", name: "Coulissante 1 vantail", productCount: 4, priceFromHT: 2490 },
          { slug: "coulissante-2-vantaux", name: "Coulissante 2 vantaux", productCount: 4, priceFromHT: 3290 },
          { slug: "pivotante", name: "Pivotante motorisée", productCount: 4, priceFromHT: 1890 },
          { slug: "pivotante-anti-panique", name: "Pivotante anti-panique", productCount: 3, priceFromHT: 2690 },
        ],
      },
    ],
  },
  {
    slug: "bornes-portiques",
    name: "Bornes & portiques",
    tagline: "Escamotables, à chaîne, limitation de hauteur",
    icon: "Anchor",
    primary: true,
    afcaFamilySlugs: [],
    categories: [
      {
        slug: "bornes-escamotables",
        name: "Bornes escamotables",
        featured: true,
        subs: [
          { slug: "hydraulique", name: "Hydrauliques motorisées", productCount: 8, priceFromHT: 2890 },
          { slug: "electromecanique", name: "Électromécaniques 24V", productCount: 6, priceFromHT: 1890 },
          { slug: "semi-auto", name: "Semi-automatiques", productCount: 5, priceFromHT: 1490 },
          { slug: "manuelle-pivotante", name: "Manuelles pivotantes", productCount: 6, priceFromHT: 490 },
          { slug: "anti-belier-k4", name: "Anti-bélier K4 / PAS 68", productCount: 3, priceFromHT: 4990 },
          { slug: "anti-belier-k8", name: "Anti-bélier K8 / PAS 68", productCount: 3, priceFromHT: 6990 },
          { slug: "anti-belier-k12", name: "Anti-bélier K12 sites sensibles", productCount: 2, priceFromHT: 9990 },
        ],
      },
      {
        slug: "bornes-chaine",
        name: "Bornes à chaîne",
        subs: [
          { slug: "inox-fixe", name: "Inox 304 fixes", productCount: 10, priceFromHT: 149 },
          { slug: "inox-amovibles", name: "Inox amovibles sur douille", productCount: 8, priceFromHT: 189 },
          { slug: "acier-galva", name: "Acier galva économiques", productCount: 6, priceFromHT: 89 },
          { slug: "kit-chaine", name: "Kits chaîne + supports", productCount: 6, priceFromHT: 49 },
        ],
      },
      {
        slug: "portiques-limitation",
        name: "Portiques limitation hauteur",
        featured: true,
        subs: [
          { slug: "portique-h-fixe-2m", name: "Fixe 2,00 m standard", productCount: 7, priceFromHT: 1890 },
          { slug: "portique-h-fixe-2-5m", name: "Fixe 2,50 m hauteur étendue", productCount: 4, priceFromHT: 2190 },
          { slug: "portique-reglable", name: "Réglable 2 à 4 m", productCount: 4, priceFromHT: 2490 },
          { slug: "portique-amovible", name: "Amovible démontable", productCount: 3, priceFromHT: 1690 },
          { slug: "panneau-signaletique", name: "Panneaux signalétiques B12", productCount: 12, priceFromHT: 89 },
        ],
      },
      {
        slug: "barrieres-fixes",
        name: "Barrières fixes & arceaux",
        subs: [
          { slug: "arceaux-velo", name: "Arceaux vélo / trottinette", productCount: 8, priceFromHT: 89 },
          { slug: "potelets-anti-station", name: "Potelets anti-stationnement", productCount: 14, priceFromHT: 49 },
          { slug: "barrieres-glissieres", name: "Barrières glissières acier", productCount: 6, priceFromHT: 290 },
        ],
      },
    ],
  },
  {
    slug: "barrieres-levantes",
    name: "Barrières levantes",
    tagline: "V2 NUUR / NIUBA + Sindaur 3000",
    icon: "Minimize2",
    afcaFamilySlugs: ["v2-barrieres", "barrieres-levantes-sindaur-3000"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-barrieres")!).map((c) => ({ ...c, featured: c.slug === "v2-nuur" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "barrieres-levantes-sindaur-3000")!),
    ],
  },
  {
    slug: "controle-acces",
    name: "Contrôle d'accès",
    tagline: "VIGIK, interphonie GSM, visiophonie, ventouses",
    icon: "Fingerprint",
    primary: true,
    afcaFamilySlugs: ["controle-acces-afca", "organes-de-commande-afca"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "controle-acces-afca")!).map((c) => ({ ...c, featured: c.slug === "centrales-acces" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "organes-de-commande-afca")!),
    ],
  },
  {
    slug: "automatismes-armoires",
    name: "Automatismes & armoires",
    tagline: "AFCA D-PRO + V2 CITY/FLEXY/PD/HEAVY",
    icon: "LayoutDashboard",
    primary: true,
    afcaFamilySlugs: ["armoires-de-commande-afca", "v2-armoires-commande"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-armoires-commande")!).map((c) => ({ ...c, featured: c.slug === "v2-city" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "armoires-de-commande-afca")!),
    ],
  },
  {
    slug: "commande-radio",
    name: "Commande & radio",
    tagline: "Télécommandes, récepteurs, programmateurs",
    icon: "Radio",
    afcaFamilySlugs: ["v2-emetteurs-recepteurs", "v2-electronique-tubulaires"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-emetteurs-recepteurs")!).map((c) => ({ ...c, featured: c.slug === "v2-emetteurs" })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-electronique-tubulaires")!),
    ],
  },
  {
    slug: "accessoires-securite",
    name: "Accessoires sécurité",
    tagline: "Photocellules, barres palpeuses EN 12453, radars",
    icon: "Shield",
    afcaFamilySlugs: ["accessoires-securite-afca", "v2-securite-accessoires"],
    categories: [
      ...mapFamily(afcaFamilies.find((f) => f.slug === "accessoires-securite-afca")!).map((c) => ({
        ...c,
        featured: c.slug === "photocellules" || c.slug === "barres-palpeuses",
      })),
      ...mapFamily(afcaFamilies.find((f) => f.slug === "v2-securite-accessoires")!),
    ],
  },
  {
    slug: "signalisation-feux",
    name: "Signalisation & feux",
    tagline: "Feux bicolores, LED M-Line, projecteurs",
    icon: "AlertTriangle",
    afcaFamilySlugs: ["signalisation-feux-afca"],
    categories: mapFamily(afcaFamilies.find((f) => f.slug === "signalisation-feux-afca")!),
  },
  {
    slug: "volets-tubulaires",
    name: "Volets & tubulaires",
    tagline: "V2 motoréducteurs Ø35 / Ø45 / Ø59",
    icon: "AlignJustify",
    afcaFamilySlugs: ["v2-tubulaires"],
    categories: mapFamily(afcaFamilies.find((f) => f.slug === "v2-tubulaires")!),
  },
  {
    slug: "installation-cablage",
    name: "Goulottes & câblage",
    tagline: "Protection, moulures, plinthes, distribution",
    icon: "Cable",
    afcaFamilySlugs: ["goulottes-techniques"],
    categories: mapFamily(afcaFamilies.find((f) => f.slug === "goulottes-techniques")!),
  },
];

export function getFamily(slug: string): Family | null {
  return catalogTree.find((f) => f.slug === slug) ?? null;
}

export function getAllFamilySlugs(): string[] {
  return catalogTree.map((f) => f.slug);
}

export function totalProductCount(): number {
  return catalogTree.reduce(
    (acc, f) =>
      acc + f.categories.reduce((a, c) => a + c.subs.reduce((s, sub) => s + sub.productCount, 0), 0),
    0,
  );
}
