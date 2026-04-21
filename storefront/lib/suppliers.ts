/**
 * USAGE INTERNE UNIQUEMENT — n'expose pas publiquement la chaîne d'approvisionnement.
 *
 * Référentiel des 12 fournisseurs sourcés par IEF & Co pour alimenter le catalogue
 * AcceFerm Pro. Sert à : (1) seed des produits & familles, (2) calcul de marges,
 * (3) routing logistique J+1 IDF.
 *
 * NE PAS générer de pages publiques `/marque/[slug]` à partir de cette liste : le
 * client final ne doit pas voir la cartographie fournisseur (clause AFCA + risque
 * commercial de court-circuit).
 */

import type { ImageKey } from "./images";

export type SupplierCategory =
  | "motorisation"
  | "portes-industrielles"
  | "controle-acces"
  | "bornes-portiques"
  | "rideaux-volets"
  | "distributeur";

export type Supplier = {
  slug: string;
  name: string;
  origin: string;
  founded?: string;
  tagline: string;
  description: string;
  categories: SupplierCategory[];
  specialties: string[];
  website?: string;
  image: ImageKey;
  featured?: boolean;
};

export const suppliers: Supplier[] = [
  {
    slug: "v2",
    name: "V2 Group",
    origin: "Italie · Legnago",
    founded: "1969",
    tagline: "Le choix silencieux des installateurs français qui savent.",
    description:
      "Fabricant italien 100 % familial. Cartes électroniques surdimensionnées, automatismes qui durent 15 ans en usage intensif. Distributeur officiel AcceFerm depuis 2024.",
    categories: ["motorisation", "controle-acces"],
    specialties: ["Portails battant/coulissant", "Barrières", "Tubulaires volets", "Récepteurs radio"],
    website: "v2home.com",
    image: "factory",
    featured: true,
  },
  {
    slug: "afca",
    name: "AFCA",
    origin: "France · Lyon",
    tagline: "Distributeur industriel multi-marques pour la fermeture automatique.",
    description:
      "Acteur historique du marché français. Livraison J+1 depuis Lyon. Catalogue profond rideaux métalliques, portes sectionnelles, parachutes, armoires D-PRO, accessoires sécurité SECURIS.",
    categories: ["distributeur", "rideaux-volets", "portes-industrielles"],
    specialties: ["Rideaux métalliques EASY/RDF", "Portes sectionnelles", "Armoires D-PRO", "Barres palpeuses SECURIS"],
    image: "warehouse",
    featured: true,
  },
  {
    slug: "roger-technology",
    name: "Roger Technology",
    origin: "Italie · Bonisiolo (TV)",
    founded: "1987",
    tagline: "Motorisations haut de gamme 100 % italiennes.",
    description:
      "Production intégrée en Vénétie. Pas d'ODM, pas d'externalisation. Gamme 24 V DC silencieuse avec batterie native. Techniciens IEF formés directement par Roger Europe chaque année.",
    categories: ["motorisation"],
    specialties: ["Portails battants BE20", "Coulissants H30", "Claviers IP65", "BUS H70 domotique"],
    website: "rogertechnology.it",
    image: "engineering",
    featured: true,
  },
  {
    slug: "safir",
    name: "Safir",
    origin: "France · Besançon",
    founded: "1923",
    tagline: "Fabricant centenaire de rideaux métalliques et portes sectionnelles.",
    description:
      "Plus de 100 ans de savoir-faire français. Fabrication sur-mesure en Franche-Comté. Gamme complète résidentiel à industriel lourd.",
    categories: ["rideaux-volets", "portes-industrielles"],
    specialties: ["Rideaux métalliques Safir", "Portes sectionnelles", "Portes Safir Industrie", "Sur-mesure"],
    website: "safir.fr",
    image: "factory",
  },
  {
    slug: "doorgate",
    name: "Doorgate",
    origin: "Portugal · importateur France",
    tagline: "Distributeur européen de motorisations portail résidentielles.",
    description:
      "Partenaire historique d'AcceFerm pour l'importation Roger Technology et Motor Line. Délai 1 semaine, stock Portugal.",
    categories: ["distributeur", "motorisation"],
    specialties: ["Roger Technology", "Motor Line", "Motorisations Portugal"],
    image: "workshop",
  },
  {
    slug: "integral-systeme",
    name: "Intégral Système",
    origin: "France · Bordeaux",
    tagline: "Spécialiste contrôle d'accès VIGIK et interphonie GSM.",
    description:
      "Fabricant français de centrales ELA CT-EVOLUTION, lecteurs PROXIPASS, ventouses électromagnétiques. Solutions complètes résidence + collectif.",
    categories: ["controle-acces"],
    specialties: ["Centrales VIGIK", "Interphonie GSM 4G", "Visiophonie IP", "Ventouses 60-750 kg"],
    website: "integral-systeme.com",
    image: "industrial",
    featured: true,
  },
  {
    slug: "trenois",
    name: "Trenois Decamps",
    origin: "France · Lille",
    founded: "1897",
    tagline: "Quincaillerie industrielle · section automatisme & contrôle d'accès.",
    description:
      "Grand distributeur français de quincaillerie et matériel de bâtiment depuis 1897. Catalogue étendu section automatismes, serrures électriques, contrôle d'accès. Levier commercial acquis par IEF.",
    categories: ["distributeur", "controle-acces"],
    specialties: ["Multi-marques automatisme", "Serrurerie bâtiment", "Quincaillerie pro"],
    website: "trenois.com",
    image: "warehouse",
  },
  {
    slug: "la-toulousaine",
    name: "La Toulousaine",
    origin: "France · Toulouse",
    founded: "1947",
    tagline: "Fabricant français de portes sectionnelles et industrielles.",
    description:
      "Fabrication sur-mesure en région toulousaine. Portes sectionnelles résidentielles, portes industrielles, portes rapides souples. Pose possible via réseau partenaire IEF.",
    categories: ["portes-industrielles"],
    specialties: ["Portes sectionnelles", "Portes industrielles lourdes", "Portes rapides souples", "Fabrication sur-mesure"],
    website: "latoulousaine.fr",
    image: "factory",
  },
  {
    slug: "tgo",
    name: "TGO",
    origin: "France",
    tagline: "Distributeur généraliste automatisme & fermeture.",
    description:
      "Partenaire multi-marques pour compléter les gammes AFCA et V2. Stock France, livraison standard.",
    categories: ["distributeur"],
    specialties: ["Multi-marques", "Dépannage", "Pièces détachées"],
    image: "tools",
  },
  {
    slug: "sobanor",
    name: "Sobanor",
    origin: "France",
    tagline: "Anti-intrusion, bornes, portiques de limitation de hauteur.",
    description:
      "Spécialiste français des protections périmétriques extérieures : bornes escamotables, bornes à chaîne, portiques de limitation pour parkings et zones logistiques.",
    categories: ["bornes-portiques"],
    specialties: ["Bornes escamotables hydrauliques", "Bornes à chaîne inox", "Portiques H limitation", "Barrières anti-intrusion"],
    website: "sobanor.com",
    image: "industrial",
    featured: true,
  },
  {
    slug: "ditec-entrematic",
    name: "Ditec / Entrematic",
    origin: "Italie / Suède",
    founded: "1979",
    tagline: "Portes rapides industrielles haut de gamme.",
    description:
      "Groupe européen (Entrematic, filiale Assa Abloy). Portes rapides en spirale, sectionnelles industrielles, portes piétonnes automatiques. Standard logistique et industrie.",
    categories: ["portes-industrielles"],
    specialties: ["Portes rapides spirale", "Sectionnelles industrielles", "Portes piétonnes auto", "Quais logistiques"],
    website: "ditec-entrematic.com",
    image: "industrial",
  },
  {
    slug: "prefabat",
    name: "Prefabat",
    origin: "France",
    tagline: "Structures préfabriquées · portiques et limitations hauteur.",
    description:
      "Fabricant français de structures métalliques préfabriquées. Portiques de limitation de hauteur sur mesure pour parkings, zones industrielles, copropriétés.",
    categories: ["bornes-portiques"],
    specialties: ["Portiques H limitation", "Structures sur-mesure", "Poteaux préfabriqués"],
    image: "factory",
  },
];

export function getSupplier(slug: string): Supplier | null {
  return suppliers.find((s) => s.slug === slug) ?? null;
}

export function getAllSupplierSlugs(): string[] {
  return suppliers.map((s) => s.slug);
}

export function getSuppliersByCategory(cat: SupplierCategory): Supplier[] {
  return suppliers.filter((s) => s.categories.includes(cat));
}

export const supplierCategoryLabel: Record<SupplierCategory, string> = {
  motorisation: "Motorisation",
  "portes-industrielles": "Portes industrielles",
  "controle-acces": "Contrôle d'accès",
  "bornes-portiques": "Bornes & portiques",
  "rideaux-volets": "Rideaux & volets",
  distributeur: "Distributeur multi-marques",
};
