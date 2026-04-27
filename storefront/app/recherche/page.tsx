import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { SearchResults } from "@/components/search/search-results";

export const metadata: Metadata = {
  title: "Recherche — Catalogue pro",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-[1440px] items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Recherche {q ? `· ${q}` : ""}</span>
          </div>
        </nav>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Recherche catalogue · produits + guides
              </p>
              <h1 className="mt-4 font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[56px]">
                {q ? (
                  <>
                    Résultats pour
                    <br />
                    <span className="italic font-medium text-accent">« {q} »</span>
                  </>
                ) : (
                  <>
                    Qu'est-ce que
                    <br />
                    <span className="italic font-medium text-accent">vous cherchez ?</span>
                  </>
                )}
              </h1>
            </div>
            <SearchResults query={q} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
