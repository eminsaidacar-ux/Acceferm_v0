import type { ImageKey } from "./images";

/**
 * Mock data — refonte avril 2026.
 *
 * Marques distribuées : 5 fabricants avec contrats fournisseurs confirmés.
 * Toute autre marque mentionnée auparavant (Came, FAAC, BFT, Nice, Cisa,
 * Beninca, Cardin, Ditec, Sommer, Hörmann, Urmet, Somfy) a été retirée des
 * mock data sur ordre Emin (avril 2026). Si elles réapparaissent dans la
 * recherche ou autocomplétion : à nettoyer immédiatement.
 */

export type Brand = {
  name: string;
  slug: string;
  origin: string;
  category: "Motorisations" | "Contrôle d'accès";
  desc: string;
};

export const brands: Brand[] = [
  {
    name: "V2 (groupe AFCA)",
    slug: "v2",
    origin: "Italie",
    category: "Motorisations",
    desc:
      "Spécialiste motorisation portails battants et coulissants, photocellules, télécommandes. Distribution exclusive en France via AFCA.",
  },
  {
    name: "Roger Technology",
    slug: "roger",
    origin: "Italie",
    category: "Motorisations",
    desc:
      "Motorisations brushless haut de gamme, claviers IP65, récepteurs radio rolling-code. Réputation pour usage intensif >300 cycles/jour.",
  },
  {
    name: "Motor Line",
    slug: "motor-line",
    origin: "Portugal",
    category: "Motorisations",
    desc:
      "Fabricant portugais : motorisations résidentielles, kits coulissants, accessoires radio. Excellent rapport qualité-prix sur les pavillons.",
  },
  {
    name: "Doorgate",
    slug: "doorgate",
    origin: "Portugal",
    category: "Motorisations",
    desc:
      "Importateur officiel France de Roger Technology et Motor Line. Logistique IDF, délais ~1 semaine.",
  },
  {
    name: "Intégral Système",
    slug: "integral",
    origin: "France",
    category: "Contrôle d'accès",
    desc:
      "Centrales VIGIK, claviers, badges, interphonie GSM 4G, ventouses magnétiques, serrures électriques. Cœur du pivot pro/industrie.",
  },
];

export type Category = {
  slug: string;
  name: string;
  glyph: string;
  count: string;
  priceFrom: string;
  accent?: boolean;
  image: ImageKey;
};

export const categories: Category[] = [
  { slug: "motorisation-battant", name: "Motorisation portail battant", glyph: "⦽", count: "84 réf", priceFrom: "dès 289 €", accent: true, image: "factory" },
  { slug: "motorisation-coulissant", name: "Motorisation portail coulissant", glyph: "⇄", count: "62 réf", priceFrom: "dès 349 €", image: "workshopAlt" },
  { slug: "photocellules", name: "Photocellules & barres palpeuses", glyph: "◉", count: "124 réf", priceFrom: "dès 32 €", image: "photocell" },
  { slug: "feux-signalisations", name: "Feux & signalisations", glyph: "✦", count: "47 réf", priceFrom: "dès 28 €", image: "light" },
  { slug: "recepteurs-radio", name: "Récepteurs & télécommandes", glyph: "«»", count: "186 réf", priceFrom: "dès 19 €", image: "receiver" },
  { slug: "claviers-selecteurs", name: "Claviers & sélecteurs IP65", glyph: "▦", count: "58 réf", priceFrom: "dès 42 €", image: "keypad" },
  { slug: "controle-acces", name: "Contrôle d'accès & VIGIK", glyph: "◈", count: "94 réf", priceFrom: "dès 59 €", accent: true, image: "industrial" },
  { slug: "interphonie", name: "Interphonie GSM & visiophonie", glyph: "⌯", count: "71 réf", priceFrom: "dès 112 €", image: "remote" },
  { slug: "serrures-electriques", name: "Serrures électriques & ventouses", glyph: "⊡", count: "43 réf", priceFrom: "dès 48 €", image: "lock" },
  { slug: "alimentation-batteries", name: "Alimentation & batteries secours", glyph: "⚡", count: "38 réf", priceFrom: "dès 18 €", image: "battery" },
  { slug: "pieces-detachees", name: "Pièces détachées par marque", glyph: "⚙", count: "412 réf", priceFrom: "dès 8 €", image: "engineering" },
  { slug: "kits-complets", name: "Kits portail complets assemblés", glyph: "⬡", count: "24 kits", priceFrom: "dès 549 €", accent: true, image: "gate" },
];

export type TickerEntry = {
  id: number;
  time: string;
  who: string;
  item: string;
  city: string;
};

export const tickerEntries: TickerEntry[] = [
  { id: 1, time: "15:21", who: "Métallier", item: "Photocellules V2 Sensiva × 2", city: "Gonesse 95" },
  { id: 2, time: "15:19", who: "Électricien", item: "Récepteur Roger H93/RX22A", city: "Nanterre 92" },
  { id: 3, time: "15:17", who: "Ascensoriste", item: "Centrale VIGIK Intégral + 50 badges", city: "Paris 75" },
  { id: 4, time: "15:15", who: "Artisan portail", item: "Kit batterie secours V2 Forteco", city: "Aulnay 93" },
  { id: 5, time: "15:13", who: "Syndic 120 lots", item: "10 × interphone GSM 4G Intégral", city: "Puteaux 92" },
  { id: 6, time: "15:10", who: "Serrurier", item: "Barre palpeuse 2 m EN 12453", city: "Versailles 78" },
  { id: 7, time: "15:08", who: "Collectivité", item: "3 × clavier Roger codes IP65", city: "Bondy 93" },
  { id: 8, time: "15:05", who: "Métallier", item: "Feu clignotant LED 24 V Motor Line", city: "Rueil 92" },
];

export type Product = {
  id: number;
  slug: string;
  glyph: string;
  brand: string;
  origin: string;
  name: string;
  priceHT: number;
  priceWasHT?: number;
  stock: number;
  stockLabel: string;
  badge?: string;
  activity?: string;
  category: string;
  image: ImageKey;
};

export const topProducts: Product[] = [
  { id: 1, slug: "v2-sensiva-photocellules-paire", glyph: "◉", brand: "V2", origin: "Italie", name: "Sensiva photocellules filaires paire", priceHT: 48, stock: 142, stockLabel: "142 en stock", badge: "Top vente", activity: "Vu 12× cette heure", category: "Photocellules", image: "photocell" },
  { id: 2, slug: "roger-h85-clavier-ip65-2-relais", glyph: "▦", brand: "Roger Technology", origin: "Italie", name: "H85/TDR clavier à codes IP65 filaire 2 relais", priceHT: 89, stock: 34, stockLabel: "34 en stock", activity: "Commandé 4× ce matin", category: "Claviers", image: "keypad" },
  { id: 3, slug: "roger-rx22a-recepteur-433-mhz", glyph: "«»", brand: "Roger Technology", origin: "Italie", name: "RX22A récepteur radio 433 MHz bi-canal", priceHT: 76, stock: 87, stockLabel: "87 en stock", activity: "3 pros le regardent", category: "Récepteurs", image: "receiver" },
  { id: 4, slug: "v2-flash-feu-clignotant-led", glyph: "✦", brand: "V2", origin: "Italie", name: "Flash feu clignotant LED 230 V", priceHT: 32, priceWasHT: 39, stock: 58, stockLabel: "58 en stock", badge: "−18 %", activity: "Commandé il y a 7 min", category: "Feux", image: "light" },
  { id: 5, slug: "v2-alimentation-24v-5a", glyph: "⚡", brand: "V2", origin: "Italie", name: "Alimentation 24 V DC 5 A armoire", priceHT: 64, stock: 92, stockLabel: "92 en stock", category: "Alimentation", image: "battery" },
  { id: 6, slug: "integral-serrure-electrique-12v", glyph: "⊡", brand: "Intégral Système", origin: "France", name: "Serrure électrique encastrée 12 V", priceHT: 118, stock: 18, stockLabel: "18 restants", activity: "Stock limité", category: "Serrures", image: "lock" },
  { id: 7, slug: "v2-handy-telecommande-rolling-code", glyph: "«»", brand: "V2", origin: "Italie", name: "Handy télécommande rolling-code 4 canaux", priceHT: 24, stock: 210, stockLabel: "210 en stock", badge: "Top vente", category: "Télécommandes", image: "remote" },
  { id: 8, slug: "integral-vigik-centrale-1-porte", glyph: "◈", brand: "Intégral Système", origin: "France", name: "Centrale VIGIK 1 porte + résidents", priceHT: 289, stock: 12, stockLabel: "12 restants", category: "VIGIK", image: "industrial" },
];

export const promotions: Product[] = [
  { id: 101, slug: "v2-essential-paire-photocellules", glyph: "◉", brand: "V2", origin: "Italie", name: "Essential paire photocellules 10 m", priceHT: 41, priceWasHT: 92, stock: 67, stockLabel: "67 en stock", badge: "−55 %", category: "Photocellules", image: "photocell" },
  { id: 102, slug: "motorline-radius-feu-230v", glyph: "✦", brand: "Motor Line", origin: "Portugal", name: "Radius feu clignotant 230 V antenne intégrée", priceHT: 58, priceWasHT: 119, stock: 24, stockLabel: "24 en stock", badge: "−51 %", category: "Feux", image: "light" },
  { id: 103, slug: "motorline-flox2r-kit-recepteur", glyph: "«»", brand: "Motor Line", origin: "Portugal", name: "FLOX2R kit récepteur + 2 télécommandes", priceHT: 84, priceWasHT: 149, stock: 33, stockLabel: "33 en stock", badge: "−43 %", category: "Récepteurs", image: "receiver" },
  { id: 104, slug: "v2-kit-batterie-secours-forteco", glyph: "⚡", brand: "V2", origin: "Italie", name: "Kit batterie secours Forteco armoire", priceHT: 79, priceWasHT: 124, stock: 19, stockLabel: "19 en stock", badge: "−36 %", category: "Alimentation", image: "battery" },
];

export type FinderCategory = {
  title: string;
  count: string;
  priceFrom: string;
};

export const finderCategories: FinderCategory[] = [
  { title: "Photocellules", count: "14 réf compatibles", priceFrom: "dès 38 €" },
  { title: "Télécommandes", count: "6 réf rolling-code", priceFrom: "dès 24 €" },
  { title: "Carte électronique", count: "3 réf en stock", priceFrom: "dès 139 €" },
  { title: "Batterie secours", count: "2 réf compatibles", priceFrom: "dès 62 €" },
  { title: "Barre palpeuse", count: "4 longueurs", priceFrom: "dès 89 €" },
  { title: "Clavier / sélecteur", count: "8 réf IP65", priceFrom: "dès 71 €" },
];

// 5 marques validées uniquement (filtrage avril 2026)
export const finderModels: Record<string, string[]> = {
  V2: ["CITY1+", "FORTECO", "AYROS", "STARK", "SENSIVA"],
  "Roger Technology": ["BE20", "KR210", "H30", "SMARTY", "RX22A"],
  "Motor Line": ["LINCE", "JAGUAR", "MERCURY", "FLOX2R"],
  Doorgate: ["DG-RES-300", "DG-IND-1000", "DG-COUL-600"],
  "Intégral Système": ["CS600", "CS900", "VIGIK-PRO", "GSM-4G-2R"],
};

export type ComparisonRow = {
  criterion: string;
  incumbent: string;
  acceferm: string;
};

export const comparisonRows: ComparisonRow[] = [
  { criterion: "Responsive mobile", incumbent: "Souvent fixed-width — zoom manuel obligatoire", acceferm: "Mobile-first RGAA AA" },
  { criterion: "Schema.org (SEO riche)", incumbent: "Données structurées partielles ou absentes", acceferm: "Product, Offer, FAQ, BreadcrumbList" },
  { criterion: "Core Web Vitals", incumbent: "Stack héritée, performance variable", acceferm: "LCP < 2 s, cible Lighthouse 90+" },
  { criterion: "Espace pro digital", incumbent: "Souvent un formulaire de devis générique", acceferm: "Historique, facture PDF, re-commande 1 clic" },
  { criterion: "Paiement 30 j à terme", incumbent: "Non documenté self-service", acceferm: "Compte Pro Gold automatisé" },
  { criterion: "Vidéo-assistance pose", incumbent: "Service rare sur ce segment", acceferm: "Offerte au-delà du seuil motorisation" },
  { criterion: "Hub éditorial SEO", incumbent: "Contenu éditorial souvent absent", acceferm: "Guides + diagnostic + pages locales IDF" },
  { criterion: "Preuve sociale live", incumbent: "Statique", acceferm: "Ticker commandes temps réel" },
];

// TODO: numéros SAV / commercial / pose / comptes pro définitifs avant prod
// Placeholders visibles partagés avec les collaborateurs preview.
export const phoneLines = [
  {
    label: "SAV technique",
    number: "01 XX XX XX XX · à confirmer",
    href: "#numero-a-confirmer",
  },
  {
    label: "Commercial",
    number: "01 XX XX XX XX · à confirmer",
    href: "#numero-a-confirmer",
  },
  {
    label: "Pose IEF · IDF",
    number: "01 XX XX XX XX · à confirmer",
    href: "#numero-a-confirmer",
  },
  {
    label: "Comptes pro",
    number: "01 XX XX XX XX · à confirmer",
    href: "#numero-a-confirmer",
  },
];

export type TrustMetric = {
  value: string;
  label: string;
  note?: string;
};

export const trustMetrics: TrustMetric[] = [
  { value: "15 ans", label: "IEF & Co sur le terrain", note: "Île-de-France" },
  { value: "3 000+", label: "installations posées" },
  { value: "200+", label: "références au lancement", note: "expédition 24 h" },
  { value: "5", label: "marques distribuées", note: "fabricants confirmés" },
  { value: "4,9 / 5", label: "Avis Google", note: "sur 487 avis" },
];

export type ServiceBlock = {
  kind: "devis" | "conseiller" | "compte" | "sav" | "assisteo" | "catalogue";
  title: string;
  subtitle: string;
  bullet: string;
  cta: string;
};

export const serviceBlocks: ServiceBlock[] = [
  { kind: "devis", title: "Devis gratuit", subtitle: "Chiffrage sous 24 h ouvrées", bullet: "Motorisations · sur-mesure · multi-lignes", cta: "Demander un devis" },
  { kind: "conseiller", title: "Conseiller technique", subtitle: "Un ancien poseur au téléphone", bullet: "8 h - 19 h L-V · diagnostic panne · compatibilité", cta: "Être rappelé" },
  { kind: "compte", title: "Compte pro 30 j", subtitle: "Paiement à terme automatisé", bullet: "SIRET · remises volume · encours sécurisé", cta: "Créer mon compte" },
  { kind: "sav", title: "SAV technique", subtitle: "Suivi ticketing + plan intervention", bullet: "Garanties fabricant · pièces prioritaires", cta: "Ouvrir un ticket" },
  { kind: "assisteo", title: "Vidéo-assistance Assistéo", subtitle: "Offerte dès 300 € HT moto", bullet: "20 min visio · un technicien IEF dédié", cta: "Réserver un créneau" },
  { kind: "catalogue", title: "Catalogue papier 2026", subtitle: "PDF + version imprimée gratuite", bullet: "200 + réf · nomenclature + fiches techniques", cta: "Télécharger le PDF" },
];

export type SearchSuggestion = {
  q: string;
  count: string;
};

export const searchSuggestions: SearchSuggestion[] = [
  { q: "photocellule V2 compatible", count: "14 résultats" },
  { q: "barre palpeuse EN 12453", count: "11 résultats" },
  { q: "récepteur 433 MHz Roger", count: "23 résultats" },
  { q: "clavier IP65 sans fil", count: "8 résultats" },
  { q: "centrale VIGIK Intégral", count: "6 résultats" },
];
