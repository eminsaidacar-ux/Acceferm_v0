import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/panier", "/commande", "/pro", "/compte-pro/"],
      },
    ],
    sitemap: "https://acceferm.fr/sitemap.xml",
    host: "https://acceferm.fr",
  };
}
