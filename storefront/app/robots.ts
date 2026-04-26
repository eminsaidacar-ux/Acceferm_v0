import type { MetadataRoute } from "next";

/**
 * robots.txt — refonte 2026-04.
 *
 * Mode "preview collaborateurs" (NEXT_PUBLIC_PREVIEW_MODE=true) :
 * → bloque toute indexation côté moteurs (Disallow: /).
 * Mode "production" (NEXT_PUBLIC_PREVIEW_MODE undefined ou false) :
 * → indexation normale, sauf routes privées (panier, commande, pro, compte-pro).
 *
 * Le bandeau visible côté UI (PreviewBanner) suit la même variable.
 */
const PREVIEW_MODE = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

export default function robots(): MetadataRoute.Robots {
  if (PREVIEW_MODE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/panier", "/commande", "/pro", "/compte-pro/", "/feedback"],
      },
    ],
    sitemap: "https://acceferm.fr/sitemap.xml",
  };
}
