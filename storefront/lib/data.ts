import type { ImageKey } from "./images";

export type Brand = {
  name: string;
  slug: string;
  origin: string;
};

export const brands: Brand[] = [
  { name: "V2", slug: "v2", origin: "Italie" },
  { name: "Roger Technology", slug: "roger", origin: "Italie" },
  { name: "Nice", slug: "nice", origin: "Italie" },
  { name: "Came", slug: "came", origin: "Italie" },
  { name: "FAAC", slug: "faac", origin: "Italie" },
  { name: "BFT", slug: "bft", origin: "Italie" },
  { name: "Somfy", slug: "somfy", origin: "France" },
  { name: "Beninca", slug: "beninca", origin: "Italie" },
  { name: "Cardin", slug: "cardin", origin: "Italie" },
  { name: "Ditec", slug: "ditec", origin: "Italie" },
  { name: "Motorline", slug: "motorline", origin: "Portugal" },
  { name: "Sommer", slug: "sommer", origin: "Allemagne" },
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
  { id: 1, time: "15:21", who: "Métallier", item: "Photocellules V2 Sensiva x2", city: "Gonesse 95" },
  { id: 2, time: "15:19", who: "Électricien", item: "Récepteur 433 MHz FAAC XR2", city: "Nanterre 92" },
  { id: 3, time: "15:17", who: "Ascensoriste", item: "Centrale VIGIK + 50 badges", city: "Paris 75" },
  { id: 4, time: "15:15", who: "Artisan portail", item: "Kit batterie secours Came BX", city: "Aulnay 93" },
  { id: 5, time: "15:13", who: "Syndic 120 lots", item: "10x interphone GSM 4G", city: "Puteaux 92" },
  { id: 6, time: "15:10", who: "Serrurier", item: "Barre palpeuse 2m EN 12453", city: "Versailles 78" },
  { id: 7, time: "15:08", who: "Collectivité", item: "3x clavier IP65 + serrures", city: "Bondy 93" },
  { id: 8, time: "15:05", who: "Métallier", item: "Feu clignotant LED 24V + pose", city: "Rueil 92" },
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
  { id: 2, slug: "roger-clavier-ip65-2-relais", glyph: "▦", brand: "Roger Technology", origin: "Italie", name: "Clavier à codes IP65 filaire 2 relais", priceHT: 89, stock: 34, stockLabel: "34 en stock", activity: "Commandé 4× ce matin", category: "Claviers", image: "keypad" },
  { id: 3, slug: "faac-xr2-recepteur-433-mhz", glyph: "«»", brand: "FAAC", origin: "Italie", name: "XR2 récepteur radio 433 MHz bi-canal", priceHT: 76, stock: 87, stockLabel: "87 en stock", activity: "3 pros le regardent", category: "Récepteurs", image: "receiver" },
  { id: 4, slug: "came-kiaron-feu-clignotant-led", glyph: "✦", brand: "Came", origin: "Italie", name: "Kiaron feu clignotant LED 230V", priceHT: 32, priceWasHT: 39, stock: 58, stockLabel: "58 en stock", badge: "−18 %", activity: "Commandé il y a 7 min", category: "Feux", image: "light" },
  { id: 5, slug: "bft-alimentation-24v-5a", glyph: "⚡", brand: "BFT", origin: "Italie", name: "Alimentation 24 V DC 5 A armoire", priceHT: 64, stock: 92, stockLabel: "92 en stock", category: "Alimentation", image: "battery" },
  { id: 6, slug: "cisa-serrure-electrique-12v", glyph: "⊡", brand: "Cisa", origin: "Italie", name: "Serrure électrique encastrée 12 V", priceHT: 118, stock: 18, stockLabel: "18 restants", activity: "Stock limité", category: "Serrures", image: "lock" },
  { id: 7, slug: "bft-mitto-2-telecommande", glyph: "«»", brand: "BFT", origin: "Italie", name: "Mitto 2 télécommande rolling-code", priceHT: 24, stock: 210, stockLabel: "210 en stock", badge: "Top vente", category: "Télécommandes", image: "remote" },
  { id: 8, slug: "integral-vigik-centrale-1-porte", glyph: "◈", brand: "Intégral Système", origin: "France", name: "Centrale VIGIK 1 porte + résidents", priceHT: 289, stock: 12, stockLabel: "12 restants", category: "VIGIK", image: "industrial" },
];

export const promotions: Product[] = [
  { id: 101, slug: "came-dir10-paire-photocellules", glyph: "◉", brand: "Came", origin: "Italie", name: "DIR10 paire photocellules 10 m", priceHT: 41, priceWasHT: 92, stock: 67, stockLabel: "67 en stock", badge: "−55 %", category: "Photocellules", image: "photocell" },
  { id: 102, slug: "bft-radius-feu-230v", glyph: "✦", brand: "BFT", origin: "Italie", name: "Radius feu clignotant 230 V antenne", priceHT: 58, priceWasHT: 119, stock: 24, stockLabel: "24 en stock", badge: "−51 %", category: "Feux", image: "light" },
  { id: 103, slug: "nice-flox2r-kit-recepteur", glyph: "«»", brand: "Nice", origin: "Italie", name: "FLOX2R kit récepteur + télécommandes", priceHT: 84, priceWasHT: 149, stock: 33, stockLabel: "33 en stock", badge: "−43 %", category: "Récepteurs", image: "receiver" },
  { id: 104, slug: "came-kit-batterie-secours-bx", glyph: "⚡", brand: "Came", origin: "Italie", name: "Kit batterie secours BX armoire", priceHT: 79, priceWasHT: 124, stock: 19, stockLabel: "19 en stock", badge: "−36 %", category: "Alimentation", image: "battery" },
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

export const finderModels: Record<string, string[]> = {
  V2: ["CITY1+", "FORTECO", "AYROS", "STARK"],
  "Roger Technology": ["BE20", "KR210", "H30", "SMARTY"],
  Nice: ["ROBO 500", "ROBO 1000", "NAKED", "HINT 2"],
  Came: ["KRYNO", "BX-243", "BK 1800", "ATI 3000"],
  FAAC: ["C720", "S700H", "844 ER", "415 L"],
  BFT: ["ICARO", "ARES", "PHOBOS", "DEIMOS"],
};

export type ComparisonRow = {
  criterion: string;
  incumbent: string;
  acceferm: string;
};

export const comparisonRows: ComparisonRow[] = [
  { criterion: "Responsive mobile", incumbent: "Non — zoom manuel obligatoire", acceferm: "Mobile-first RGAA AA" },
  { criterion: "Schema.org (SEO riche)", incumbent: "Absent", acceferm: "Product, Offer, Review, FAQ, HowTo" },
  { criterion: "Core Web Vitals", incumbent: "Catastrophique (jQuery 2011)", acceferm: "LCP < 2s, cible 90+ Lighthouse" },
  { criterion: "Espace pro digital", incumbent: "Absent — formulaire générique", acceferm: "Historique, facture PDF, re-commande 1-clic" },
  { criterion: "Paiement 30j à terme", incumbent: "Non documenté", acceferm: "Compte Gold — automatisé" },
  { criterion: "Vidéo-assistance pose", incumbent: "Impensable", acceferm: "Offerte dès 300 € HT motorisation" },
  { criterion: "Hub éditorial SEO", incumbent: "Inexistant", acceferm: "Guides + diagnostic + pages locales IDF" },
  { criterion: "Preuve sociale live", incumbent: "Copyright figé 2016", acceferm: "Ticker commandes temps réel" },
];

export const phoneLines = [
  { label: "SAV technique", number: "01 84 XX XX 17", href: "tel:+33184000017" },
  { label: "Commercial", number: "01 84 XX XX 18", href: "tel:+33184000018" },
  { label: "Pose IEF · IDF", number: "01 84 XX XX 19", href: "tel:+33184000019" },
  { label: "Comptes pro", number: "01 84 XX XX 20", href: "tel:+33184000020" },
];

export type TrustMetric = {
  value: string;
  label: string;
  note?: string;
};

export const trustMetrics: TrustMetric[] = [
  { value: "15 ans", label: "IEF & Co sur le terrain", note: "Île-de-France" },
  { value: "3 000+", label: "installations posées" },
  { value: "2 341", label: "références en stock", note: "expédition 24h" },
  { value: "124", label: "pros actifs", note: "30 derniers jours" },
  { value: "4,8/5", label: "Avis Vérifiés", note: "sur 487 avis" },
];

export type ServiceBlock = {
  kind: "devis" | "conseiller" | "compte" | "sav" | "assisteo" | "catalogue";
  title: string;
  subtitle: string;
  bullet: string;
  cta: string;
};

export const serviceBlocks: ServiceBlock[] = [
  { kind: "devis", title: "Devis gratuit", subtitle: "Chiffrage sous 24h ouvrées", bullet: "Motorisations AFCA · sur-mesure · multi-lignes", cta: "Demander un devis" },
  { kind: "conseiller", title: "Conseiller technique", subtitle: "Un ancien poseur au téléphone", bullet: "8h-19h L-V · diagnostic panne · compatibilité", cta: "Être rappelé" },
  { kind: "compte", title: "Compte pro 30j", subtitle: "Paiement à terme automatisé", bullet: "SIRET · remises volume · encours sécurisé", cta: "Créer mon compte" },
  { kind: "sav", title: "SAV technique", subtitle: "Suivi ticketing + plan intervention", bullet: "Garanties fabricant · pièces prioritaires", cta: "Ouvrir un ticket" },
  { kind: "assisteo", title: "Vidéo-assistance Assistéo", subtitle: "Offerte dès 300 € HT moto", bullet: "20 min visio · un technicien IEF dédié", cta: "Réserver un créneau" },
  { kind: "catalogue", title: "Catalogue papier 2026", subtitle: "PDF + version imprimée gratuite", bullet: "2 341 réf · nomenclature + fiches techniques", cta: "Télécharger le PDF" },
];

export type SearchSuggestion = {
  q: string;
  count: string;
};

export const searchSuggestions: SearchSuggestion[] = [
  { q: "photocellule V2 compatible", count: "14 résultats" },
  { q: "barre palpeuse EN 12453", count: "11 résultats" },
  { q: "récepteur 433 MHz FAAC", count: "23 résultats" },
  { q: "clavier IP65 sans fil", count: "8 résultats" },
  { q: "carte électronique Came ZBX", count: "6 résultats" },
];
