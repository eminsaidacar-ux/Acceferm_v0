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
  return {
    title: `${p.name} — ${p.brand}`,
    description: p.shortDescription,
    openGraph: {
      title: `${p.name} — ${p.brand}`,
      description: p.shortDescription,
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.slug,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceHT,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "AcceFerm Pro" },
    },
  } as const;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <AnnouncementBar />
      <Nav />
      <main>
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
