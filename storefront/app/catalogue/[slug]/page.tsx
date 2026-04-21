import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { FiltersSidebar } from "@/components/catalogue/filters-sidebar";
import { CatalogueProductGrid } from "@/components/catalogue/product-grid";
import { CatalogueToolbar } from "@/components/catalogue/toolbar";
import {
  getAllCategorySlugs,
  getCategory,
  getCategoryProducts,
} from "@/lib/catalogue";
import { img, imagery } from "@/lib/images";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return { title: "Catégorie introuvable" };
  return {
    title: `${c.name} — Catalogue pro`,
    description: `${c.count} · ${c.priceFrom}. Livraison 24h IDF, prix HT par défaut, compte pro disponible.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getCategoryProducts(slug);

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <a href="/#categories" className="text-fg-muted transition hover:text-fg">
              Catalogue
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">{category.name}</span>
          </div>
        </nav>

        {/* Category hero with image */}
        <section className="relative overflow-hidden border-b border-border-soft">
          <div className="absolute inset-0">
            {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
            <img
              src={img(imagery[category.image], 1800, 600)}
              alt=""
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Univers · {category.count}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
              {category.name}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              Sélection rédigée par nos poseurs IEF & Co. Stock France, expédition 24h Île-de-France,
              compte pro avec grilles HT dès inscription SIRET.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
              >
                Voir les {products.length} produits
              </a>
              <a
                href="/#configurateur"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] text-fg transition hover:border-fg"
              >
                Compatibilité 3 clics
              </a>
            </div>
          </div>
        </section>

        {/* Products + filters */}
        <section id="products" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-24">
                  <FiltersSidebar />
                </div>
              </div>
              <div className="lg:col-span-9">
                <CatalogueToolbar count={products.length} />
                <div className="mt-6">
                  <CatalogueProductGrid products={products} />
                </div>

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-between rounded-2xl border border-border-soft bg-bg p-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                    Page 1 / 4
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((p) => (
                      <button
                        type="button"
                        key={p}
                        className={
                          p === 1
                            ? "grid h-9 w-9 place-items-center rounded-full bg-fg font-mono text-[12px] text-accent-fg"
                            : "grid h-9 w-9 place-items-center rounded-full font-mono text-[12px] text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                        }
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="ml-2 rounded-full border border-border px-4 py-1.5 text-[13px] text-fg transition hover:border-fg"
                    >
                      Suivant →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
