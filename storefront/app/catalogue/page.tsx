import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { DiagnosticCta } from "@/components/catalogue/diagnostic-cta";
import { FamilyGrid } from "@/components/catalogue/family-grid";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { LiveCatalog } from "@/components/sections/live-catalog";
import { Nav } from "@/components/sections/nav";
import { Promotions } from "@/components/sections/promotions";

export const metadata: Metadata = {
  title: "Catalogue pro — 10 familles, 1 400+ références",
  description:
    "Organes de sécurité, commande, motorisations, contrôle d'accès, interphonie, pièces détachées. Stock France, livraison 24 h IDF, prix HT par défaut.",
  alternates: { canonical: "/catalogue" },
};

/**
 * /catalogue — page hub statique (v0.8).
 *
 * Atterrissage refondu en 4 blocs :
 *  A. Grille des 10 familles produits (dominant, en haut)
 *  B. Best-sellers du moment (réutilise LiveCatalog v0.6)
 *  C. Promotions de la semaine (réutilise Promotions v0.6)
 *  D. Bandeau cross-link assistant diagnostic
 *
 * L'ancien atterrissage par défaut sur /catalogue/photocellules est
 * remplacé. Les pages /catalogue/[slug] (10 familles + sous-cats)
 * restent accessibles via la grille A et le sélecteur de familles.
 */
export default function CataloguePage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav
          aria-label="Fil d'Ariane"
          className="border-b border-border-soft bg-bg-elev"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" aria-hidden="true" />
            <span className="font-medium text-fg">Catalogue</span>
          </div>
        </nav>

        {/* Hero court */}
        <section className="border-b border-border-soft bg-bg py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
                Catalogue pro · 10 familles · 1 400+ réfs
              </p>
              <h1 className="mt-4 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-fg lg:text-[64px]">
                Tout ce qui ferme,
                <br />
                tout ce qui motorise.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                Pièces détachées, accessoires, kits motorisation. Stock France,
                expédition 24 h Île-de-France, prix HT par défaut, compte pro
                avec grilles dégressives dès inscription SIRET.
              </p>
            </div>
          </div>
        </section>

        {/* Bloc A — Grille 10 familles */}
        <FamilyGrid />

        {/* Bloc B — Best-sellers (réutilisé v0.6) */}
        <LiveCatalog />

        {/* Bloc C — Promotions (réutilisé v0.6) */}
        <Promotions />

        {/* Bloc D — Cross-link assistant diagnostic */}
        <DiagnosticCta variant="hub" />
      </main>
      <Footer />
    </>
  );
}
