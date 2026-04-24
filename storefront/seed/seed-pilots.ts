/**
 * Seed 20 SKU pilotes AcceFerm Pro.
 *
 * Usage (après avoir configuré DATABASE_URI dans .env.local) :
 *   npm run payload:seed
 *
 * Idempotent : utilise le slug comme clé de dédoublonnage.
 * Source : lib/data.ts (topProducts + promotions) + lib/afca-catalog.ts (échantillon).
 *
 * Clause AFCA : les motorisations (isMotorisation=true) n'ont pas de priceHT public.
 * Dans Payload admin, le champ reste visible pour Emin mais côté route publique
 * le prix est masqué.
 */
import { getPayload } from "payload";
import config from "../payload.config.js";

type SeedCategory = {
  slug: string;
  name: string;
  icon?: string;
  order: number;
};

type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  reference: string;
  categorySlug: string;
  shortDescription: string;
  priceHT: number | null;
  priceWasHT?: number;
  stock: number;
  stockLabel: string;
  isMotorisation: boolean;
  requiresProAccount?: boolean;
  badge?: "none" | "top" | "new" | "promo" | "limited";
  norms?: string[];
  compatibleBrands?: string[];
  specs?: Array<{ label: string; value: string }>;
};

const CATEGORIES: SeedCategory[] = [
  { slug: "photocellules", name: "Photocellules & barres palpeuses", icon: "◉", order: 1 },
  { slug: "recepteurs-radio", name: "Récepteurs & télécommandes", icon: "«»", order: 2 },
  { slug: "claviers-selecteurs", name: "Claviers & sélecteurs IP65", icon: "▦", order: 3 },
  { slug: "feux-signalisations", name: "Feux & signalisations", icon: "✦", order: 4 },
  { slug: "alimentation-batteries", name: "Alimentation & batteries secours", icon: "⚡", order: 5 },
  { slug: "serrures-electriques", name: "Serrures électriques & ventouses", icon: "⊡", order: 6 },
  { slug: "controle-acces", name: "Contrôle d'accès & VIGIK", icon: "◈", order: 7 },
  { slug: "motorisation-battant", name: "Motorisation portail battant", icon: "⦽", order: 8 },
  { slug: "motorisation-coulissant", name: "Motorisation portail coulissant", icon: "⇄", order: 9 },
];

const PRODUCTS: SeedProduct[] = [
  // ═══ Top 8 best-sellers (lib/data.ts) ═══
  {
    slug: "v2-sensiva-photocellules-paire",
    name: "V2 Sensiva photocellules filaires paire",
    brand: "V2",
    reference: "AF-PHC-V2-SENSIVA",
    categorySlug: "photocellules",
    shortDescription:
      "Paire d'émetteur + récepteur IR universelle 12-24 V AC/DC, NO/NF, portée 20 m. Compatible Came, Nice, FAAC, BFT.",
    priceHT: 48,
    stock: 142,
    stockLabel: "142 en stock",
    isMotorisation: false,
    badge: "top",
    norms: ["EN 12453", "IP54"],
    compatibleBrands: ["Came", "Nice", "FAAC", "BFT", "V2"],
    specs: [
      { label: "Tension", value: "12-24 V AC/DC" },
      { label: "Portée", value: "20 m" },
      { label: "Type contact", value: "NO/NF" },
      { label: "Température", value: "-20 °C à +55 °C" },
    ],
  },
  {
    slug: "roger-clavier-ip65-2-relais",
    name: "Roger clavier à codes IP65 filaire 2 relais",
    brand: "Roger Technology",
    reference: "AF-CLV-ROGER-2R",
    categorySlug: "claviers-selecteurs",
    shortDescription:
      "Clavier à codes extérieur IP65, 2 relais indépendants, jusqu'à 1000 codes, rétro-éclairage LED.",
    priceHT: 89,
    stock: 34,
    stockLabel: "34 en stock",
    isMotorisation: false,
    norms: ["IP65", "IK08", "CE"],
    specs: [
      { label: "Relais", value: "2 indépendants" },
      { label: "Codes mémoire", value: "1000" },
      { label: "Étanchéité", value: "IP65 / IK08" },
    ],
  },
  {
    slug: "faac-xr2-recepteur-433-mhz",
    name: "FAAC XR2 récepteur radio 433 MHz bi-canal",
    brand: "FAAC",
    reference: "AF-RCP-FAAC-XR2",
    categorySlug: "recepteurs-radio",
    shortDescription:
      "Récepteur radio rolling-code 433,92 MHz, 2 canaux, 256 télécommandes mémorisables.",
    priceHT: 76,
    stock: 87,
    stockLabel: "87 en stock",
    isMotorisation: false,
    norms: ["CE", "RED 2014/53/UE"],
    compatibleBrands: ["FAAC"],
    specs: [
      { label: "Fréquence", value: "433,92 MHz" },
      { label: "Canaux", value: "2" },
      { label: "Mémoire", value: "256 télécommandes" },
    ],
  },
  {
    slug: "came-kiaron-feu-clignotant-led",
    name: "Came Kiaron feu clignotant LED 230 V",
    brand: "Came",
    reference: "AF-FEU-CAME-KIARON",
    categorySlug: "feux-signalisations",
    shortDescription:
      "Feu clignotant LED basse conso 230 V avec antenne 433 MHz intégrée. IP54, durée vie 50 000 h.",
    priceHT: 32,
    priceWasHT: 39,
    stock: 58,
    stockLabel: "58 en stock",
    isMotorisation: false,
    badge: "promo",
    norms: ["IP54", "CE"],
    specs: [
      { label: "Tension", value: "230 V AC" },
      { label: "Antenne", value: "433 MHz intégrée" },
      { label: "Durée vie LED", value: "50 000 h" },
    ],
  },
  {
    slug: "bft-alimentation-24v-5a",
    name: "BFT alimentation 24 V DC 5 A armoire",
    brand: "BFT",
    reference: "AF-ALIM-BFT-24-5A",
    categorySlug: "alimentation-batteries",
    shortDescription:
      "Alimentation stabilisée 24 V DC 5 A pour armoire motorisation, parafoudre intégré.",
    priceHT: 64,
    stock: 92,
    stockLabel: "92 en stock",
    isMotorisation: false,
    norms: ["CE"],
    specs: [
      { label: "Tension sortie", value: "24 V DC" },
      { label: "Intensité", value: "5 A" },
      { label: "Parafoudre", value: "Type 2 intégré" },
    ],
  },
  {
    slug: "cisa-serrure-electrique-12v",
    name: "Cisa serrure électrique encastrée 12 V",
    brand: "Cisa",
    reference: "AF-SER-CISA-12V",
    categorySlug: "serrures-electriques",
    shortDescription:
      "Serrure électrique à encastrer 12 V, rupture ou émission, axe 60 mm.",
    priceHT: 118,
    stock: 18,
    stockLabel: "18 restants",
    isMotorisation: false,
    badge: "limited",
    norms: ["EN 12209", "CE"],
    specs: [
      { label: "Tension", value: "12 V AC/DC" },
      { label: "Mode", value: "Rupture ou émission" },
      { label: "Axe", value: "60 mm" },
    ],
  },
  {
    slug: "bft-mitto-2-telecommande",
    name: "BFT Mitto 2 télécommande rolling-code",
    brand: "BFT",
    reference: "AF-TLC-BFT-MITTO2",
    categorySlug: "recepteurs-radio",
    shortDescription:
      "Télécommande 2 canaux rolling-code 433 MHz, pile lithium CR2032 incluse.",
    priceHT: 24,
    stock: 210,
    stockLabel: "210 en stock",
    isMotorisation: false,
    badge: "top",
    norms: ["CE", "RED 2014/53/UE"],
    compatibleBrands: ["BFT"],
    specs: [
      { label: "Fréquence", value: "433,92 MHz" },
      { label: "Canaux", value: "2" },
      { label: "Portée", value: "150 m champ libre" },
    ],
  },
  {
    slug: "integral-vigik-centrale-1-porte",
    name: "Intégral Système VIGIK centrale 1 porte + résidents",
    brand: "Intégral Système",
    reference: "AF-VGK-INT-CS600-1P",
    categorySlug: "controle-acces",
    shortDescription:
      "Centrale VIGIK 1 porte avec gestion résidents, mise à jour 4G intégrée, compatible tous lecteurs.",
    priceHT: 289,
    stock: 12,
    stockLabel: "12 restants",
    isMotorisation: false,
    requiresProAccount: true,
    norms: ["CE", "RGPD"],
    specs: [
      { label: "Portes", value: "1 (extensible)" },
      { label: "Résidents", value: "Jusqu'à 500" },
      { label: "MAJ", value: "4G intégrée" },
    ],
  },
  // ═══ 4 promotions ═══
  {
    slug: "came-dir10-paire-photocellules",
    name: "Came DIR10 paire photocellules 10 m",
    brand: "Came",
    reference: "AF-PHC-CAME-DIR10",
    categorySlug: "photocellules",
    shortDescription:
      "Paire DIR10 compacte, protocole BUS 2easy natif, idéale rénovation armoire Came ZLJ24/ZBX.",
    priceHT: 41,
    priceWasHT: 92,
    stock: 67,
    stockLabel: "67 en stock",
    isMotorisation: false,
    badge: "promo",
    norms: ["EN 12453", "IP54"],
    compatibleBrands: ["Came"],
    specs: [
      { label: "Portée", value: "10 m" },
      { label: "Protocole", value: "BUS 2easy" },
    ],
  },
  {
    slug: "bft-radius-feu-230v",
    name: "BFT Radius feu clignotant 230 V + antenne",
    brand: "BFT",
    reference: "AF-FEU-BFT-RADIUS",
    categorySlug: "feux-signalisations",
    shortDescription:
      "Feu clignotant 230 V LED avec antenne radio 433 MHz intégrée. Montage mural ou pilier.",
    priceHT: 58,
    priceWasHT: 119,
    stock: 24,
    stockLabel: "24 en stock",
    isMotorisation: false,
    badge: "promo",
    norms: ["IP54", "CE"],
    specs: [{ label: "Tension", value: "230 V AC" }],
  },
  {
    slug: "nice-flox2r-kit-recepteur",
    name: "Nice FLOX2R kit récepteur + 2 télécommandes",
    brand: "Nice",
    reference: "AF-KIT-NICE-FLOX2R",
    categorySlug: "recepteurs-radio",
    shortDescription:
      "Kit récepteur 2 canaux 433 MHz rolling-code livré avec 2 télécommandes Flor-S.",
    priceHT: 84,
    priceWasHT: 149,
    stock: 33,
    stockLabel: "33 en stock",
    isMotorisation: false,
    badge: "promo",
    norms: ["CE"],
    compatibleBrands: ["Nice"],
  },
  {
    slug: "came-kit-batterie-secours-bx",
    name: "Came kit batterie secours BX armoire",
    brand: "Came",
    reference: "AF-BAT-CAME-BX",
    categorySlug: "alimentation-batteries",
    shortDescription:
      "Kit batterie 12 V 7 Ah + carte de charge compatible armoires Came BX série 1800.",
    priceHT: 79,
    priceWasHT: 124,
    stock: 19,
    stockLabel: "19 en stock",
    isMotorisation: false,
    badge: "promo",
    compatibleBrands: ["Came"],
  },
  // ═══ Motorisations — prix masqués clause AFCA ═══
  {
    slug: "v2-ayros-24v-kit-battant",
    name: "V2 AYROS 24 V kit complet portail battant",
    brand: "V2",
    reference: "AF-MOT-V2-AYROS-KIT",
    categorySlug: "motorisation-battant",
    shortDescription:
      "Kit motorisation V2 AYROS 24 V DC pour portail battant jusqu'à 400 kg. Devis personnalisé.",
    priceHT: null,
    stock: 15,
    stockLabel: "15 en stock",
    isMotorisation: true,
    requiresProAccount: true,
    norms: ["EN 12453", "CE", "Directive Machines 2006/42/CE"],
    specs: [
      { label: "Vantail max", value: "400 kg / 2,5 m" },
      { label: "Tension", value: "24 V DC" },
      { label: "Cycles/jour", value: "80-200 (classe 2)" },
    ],
  },
  {
    slug: "roger-be20-brushless-kit",
    name: "Roger BE20 brushless motorisation battant",
    brand: "Roger Technology",
    reference: "AF-MOT-ROGER-BE20",
    categorySlug: "motorisation-battant",
    shortDescription:
      "Motorisation brushless haut de gamme pour usage intensif 300+ cycles/jour. Garantie 5 ans.",
    priceHT: null,
    stock: 8,
    stockLabel: "8 restants",
    isMotorisation: true,
    requiresProAccount: true,
    norms: ["EN 12453", "CE"],
    specs: [
      { label: "Moteur", value: "Brushless 80 000+ cycles" },
      { label: "Vantail max", value: "350 kg / 2,3 m" },
    ],
  },
  {
    slug: "came-bx-243-coulissant",
    name: "Came BX-243 motorisation coulissant 600 kg",
    brand: "Came",
    reference: "AF-MOT-CAME-BX243",
    categorySlug: "motorisation-coulissant",
    shortDescription:
      "Motorisation coulissant robuste jusqu'à 600 kg. Compatibilité large accessoires Came.",
    priceHT: null,
    stock: 6,
    stockLabel: "6 restants",
    isMotorisation: true,
    requiresProAccount: true,
    norms: ["EN 12453", "CE"],
  },
  // ═══ Accessoires complémentaires ═══
  {
    slug: "barre-palpeuse-2m-en12453",
    name: "Barre palpeuse 2 m EN 12453 filaire",
    brand: "V2",
    reference: "AF-BPLP-V2-2M",
    categorySlug: "photocellules",
    shortDescription:
      "Barre palpeuse caoutchouc 2 m filaire NO 8,2 kΩ. Conforme EN 12453 classe 2+.",
    priceHT: 89,
    stock: 26,
    stockLabel: "26 en stock",
    isMotorisation: false,
    norms: ["EN 12453", "CE"],
    specs: [
      { label: "Longueur", value: "2 m" },
      { label: "Résistance", value: "8,2 kΩ" },
      { label: "Température", value: "-30 °C à +70 °C" },
    ],
  },
  {
    slug: "keypad-nice-ena-black",
    name: "Nice ENA clavier radio 433 MHz noir",
    brand: "Nice",
    reference: "AF-CLV-NICE-ENA",
    categorySlug: "claviers-selecteurs",
    shortDescription:
      "Clavier codé sans fil radio, 50 codes mémorisables, pile 2 ans, IP54.",
    priceHT: 71,
    stock: 45,
    stockLabel: "45 en stock",
    isMotorisation: false,
    norms: ["IP54", "CE"],
  },
  {
    slug: "ventouse-magnetique-300kg",
    name: "Ventouse magnétique 300 kg IP54",
    brand: "Intégral Système",
    reference: "AF-VNT-INT-300",
    categorySlug: "serrures-electriques",
    shortDescription:
      "Ventouse 300 kg à émission, contact NO/NF, boîtier aluminium IP54. Usage extérieur abrité.",
    priceHT: 95,
    stock: 22,
    stockLabel: "22 en stock",
    isMotorisation: false,
    norms: ["IP54", "CE", "EN 1634-1"],
    specs: [
      { label: "Force", value: "300 kg" },
      { label: "Tension", value: "12/24 V DC" },
    ],
  },
  {
    slug: "badge-vigik-resident-pack10",
    name: "Badges VIGIK résidents — pack 10 badges",
    brand: "Intégral Système",
    reference: "AF-BDG-INT-VGK-10",
    categorySlug: "controle-acces",
    shortDescription:
      "Pack de 10 badges VIGIK résidents vierges, à programmer sur centrale. RGPD-compatible.",
    priceHT: 89,
    stock: 38,
    stockLabel: "38 en stock",
    isMotorisation: false,
    requiresProAccount: true,
    specs: [
      { label: "Quantité", value: "10 badges" },
      { label: "Technologie", value: "13,56 MHz MIFARE" },
    ],
  },
  {
    slug: "interphone-gsm-4g-2-residents",
    name: "Interphone GSM 4G audio 2 résidents",
    brand: "Intégral Système",
    reference: "AF-ITF-INT-GSM-2R",
    categorySlug: "controle-acces",
    shortDescription:
      "Interphone audio GSM 4G 2 boutons, gestion jusqu'à 2 résidents, appli smartphone incluse.",
    priceHT: 289,
    stock: 15,
    stockLabel: "15 en stock",
    isMotorisation: false,
    requiresProAccount: true,
    norms: ["IP54", "IK07", "CE", "RED"],
    specs: [
      { label: "Réseau", value: "4G LTE" },
      { label: "Résidents", value: "2" },
    ],
  },
];

async function main() {
  console.log("[seed] Démarrage seed AcceFerm Pro — 20 SKU pilotes…");
  const payload = await getPayload({ config });

  // 1. Seed Categories
  console.log(`[seed] Catégories (${CATEGORIES.length})…`);
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    let id: string;
    if (existing.docs.length > 0) {
      id = String(existing.docs[0]!.id);
      console.log(`  = ${cat.slug} (déjà présent)`);
    } else {
      const created = await payload.create({
        collection: "categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon,
          order: cat.order,
          active: true,
        },
      });
      id = String(created.id);
      console.log(`  + ${cat.slug} créé`);
    }
    categoryMap.set(cat.slug, id);
  }

  // 2. Seed Products
  console.log(`[seed] Produits (${PRODUCTS.length})…`);
  let created = 0;
  let skipped = 0;
  for (const p of PRODUCTS) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      skipped++;
      continue;
    }
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) {
      console.warn(`  ! pas de catégorie pour ${p.slug}, skip`);
      continue;
    }
    await payload.create({
      collection: "products",
      data: {
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        reference: p.reference,
        shortDescription: p.shortDescription,
        priceHT: p.priceHT ?? 0,
        priceWasHT: p.priceWasHT,
        vatRate: 0.2,
        stock: p.stock,
        stockLabel: p.stockLabel,
        isMotorisation: p.isMotorisation,
        requiresProAccount: p.requiresProAccount ?? false,
        badge: p.badge ?? "none",
        active: true,
        // @ts-expect-error — Payload accepte string pour relationship
        category: categoryId,
        technicalSpecs: p.specs,
        compatibleBrands: p.compatibleBrands?.map((brand) => ({ brand })),
        norms: p.norms?.map((code) => ({ code })),
      },
    });
    created++;
  }

  console.log(`[seed] OK — ${created} produits créés, ${skipped} déjà présents.`);
  console.log("[seed] Terminé. Se connecter sur /admin pour les voir.");
  process.exit(0);
}

main().catch((err) => {
  console.error("[seed] ÉCHEC :", err);
  process.exit(1);
});
