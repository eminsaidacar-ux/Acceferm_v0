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
 * 5. Bloc confiance 3 colonnes
 * 6. Footer
 *
 * NB : la marquise centrale est une exception au "5 sections max" v0.6
 * — réintégration explicite demandée par Emin dans le brief v0.7.
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
        <TrustBlock />
      </main>
      <Footer />
    </>
  );
}
