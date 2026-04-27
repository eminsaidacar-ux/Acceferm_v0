import { BrandStrip } from "@/components/sections/brand-strip";
import { CategoryGrid } from "@/components/sections/category-grid";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { LiveCatalog } from "@/components/sections/live-catalog";
import { Nav } from "@/components/sections/nav";
import { ScrollingBanner } from "@/components/sections/scrolling-banner";
import { TrustBlock } from "@/components/sections/trust-block";

/**
 * Home AcceFerm Pro — refonte épurée 2026-04 (v0.7).
 *
 * Structure :
 * 1. Hero (titre + 2 CTA + bandeau confiance 4 items)
 * 2. Catalogue 12 univers
 * 3. Best-sellers 8 produits filtrables
 * 4. Marquise centrale rouge (10 points clés défilants — réintro v0.7)
 * 5. BrandStrip 5 marques fournisseurs (réintro v0.7)
 * 6. Bloc confiance 3 colonnes
 * 7. Footer
 *
 * NB : marquise + BrandStrip sont 2 ré-intégrations explicitement
 * demandées par Emin dans le brief v0.7 (contenu utile, pas ornement).
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CategoryGrid />
        <LiveCatalog />
        <ScrollingBanner />
        <BrandStrip />
        <TrustBlock />
      </main>
      <Footer />
    </>
  );
}
