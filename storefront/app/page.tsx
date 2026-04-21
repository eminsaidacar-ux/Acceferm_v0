import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { BrandStrip } from "@/components/sections/brand-strip";
import { CategoryGrid } from "@/components/sections/category-grid";
import { CommandCenter } from "@/components/sections/command-center";
import { CompatibilityFinder } from "@/components/sections/compatibility-finder";
import { Comparison } from "@/components/sections/comparison";
import { Expertise } from "@/components/sections/expertise";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { IndexStrip } from "@/components/sections/index-strip";
import { LiveCatalog } from "@/components/sections/live-catalog";
import { Manifesto } from "@/components/sections/manifesto";
import { MegaWordmark } from "@/components/sections/mega-wordmark";
import { Nav } from "@/components/sections/nav";
import { ProcessStrip } from "@/components/sections/process-strip";
import { ProTiers } from "@/components/sections/pro-tiers";
import { Promotions } from "@/components/sections/promotions";
import { QuickOrder } from "@/components/sections/quick-order";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TrustStrip } from "@/components/sections/trust-strip";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <IndexStrip />
        <TrustStrip />
        <BrandStrip />
        <div id="live">
          <CommandCenter />
        </div>
        <div id="categories">
          <CategoryGrid />
        </div>
        <Promotions />
        <QuickOrder />
        <div id="best">
          <LiveCatalog />
        </div>
        <CompatibilityFinder />
        <ProcessStrip />
        <div id="services">
          <ServicesGrid />
        </div>
        <div id="metier">
          <Expertise />
        </div>
        <Manifesto />
        <ProTiers />
        <Comparison />
        <MegaWordmark />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
