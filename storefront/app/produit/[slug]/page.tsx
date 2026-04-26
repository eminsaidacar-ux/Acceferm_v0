import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { ProductBreadcrumb } from "@/components/product/breadcrumb";
import { ProductCrossSell } from "@/components/product/cross-sell";
import { ProductHero } from "@/components/product/hero";
import { ProductTabs } from "@/components/product/tabs";
import { ProductTrustStrip } from "@/components/product/trust-strip";
import {
  getAllProductSlugs,
  getCrossSell,
  getProductDetail,
} from "@/lib/product-detail";
import { img, imagery } from "@/lib/images";

const SITE_URL = "https://acceferm.fr";

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductDetail(slug);
  if (!p) return { title: "Produit introuvable" };
  const url = `${SITE_URL}/produit/${slug}`;
  const imageUrl = img(imagery[p.image], 1200, 1200);
  return {
    title: `${p.name} — ${p.brand}`,
    description: p.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${p.name} — ${p.brand}`,
      description: p.shortDescription,
      images: [{ url: imageUrl, width: 1200, height: 1200, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — ${p.brand}`,
      description: p.shortDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  const crossSell = getCrossSell(product.crossSellSlugs);
  const url = `${SITE_URL}/produit/${slug}`;
  const imageUrl = img(imagery[product.image], 1200, 1200);

  // Schema Product enrichi (url, image, priceValidUntil, review)
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.slug,
    image: imageUrl,
    url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceHT,
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      url,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "AcceFerm Pro" },
    },
  } as const;

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalogue",
        item: `${SITE_URL}/catalogue/${product.category}`,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  } as const;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <ProductBreadcrumb product={product} />
        <ProductHero product={product} />
        <ProductTrustStrip />
        <ProductTabs product={product} />
        <ProductCrossSell products={crossSell} />
      </main>
      <Footer />
    </>
  );
}
