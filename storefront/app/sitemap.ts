import type { MetadataRoute } from "next";
import { CATALOGUE_FAMILIES } from "@/lib/catalogue-families";
import { categories } from "@/lib/data";
import { getAllLegalSlugs } from "@/lib/legal";
import { getAllZoneSlugs } from "@/lib/local-zones";
import { getAllProductSlugs } from "@/lib/product-detail";
import { getAllResourceSlugs } from "@/lib/ressources";

const BASE = "https://acceferm.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages publiques uniquement. /pro, /panier, /commande, /compte-pro
  // sont disallow dans robots.ts donc absents du sitemap (cohérence).
  const staticRoutes = [
    "",
    "/catalogue",
    "/sur-mesure",
    "/assistant-diagnostic",
    "/configurer",
    "/assisteo-maintenance",
    "/ressources",
    "/pose-idf",
    "/contact",
    "/a-propos",
    "/comparatif-centrales-achat",
    "/manifeste",
    "/normes",
    "/gabarits",
    "/glossaire",
    "/marques",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const products = getAllProductSlugs().map((slug) => ({
    url: `${BASE}/produit/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 10 familles v0.8 (priorité 0.8 — point d'atterrissage refondu)
  const families = CATALOGUE_FAMILIES.map((f) => ({
    url: `${BASE}/catalogue/${f.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 12 catégories historiques (rétro-compat, priorité plus basse)
  const cats = categories.map((c) => ({
    url: `${BASE}/catalogue/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const resources = getAllResourceSlugs().map((slug) => ({
    url: `${BASE}/ressources/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const zones = getAllZoneSlugs().map((slug) => ({
    url: `${BASE}/installateur-motorisation-portail/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legal = getAllLegalSlugs().map((slug) => ({
    url: `${BASE}/legal/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));

  return [
    ...staticRoutes,
    ...families,
    ...cats,
    ...products,
    ...resources,
    ...zones,
    ...legal,
  ];
}
