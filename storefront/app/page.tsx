import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { CategoryGrid } from "@/components/sections/category-grid";
import { CommandCenter } from "@/components/sections/command-center";
import { CompatibilityFinder } from "@/components/sections/compatibility-finder";
import { Comparison } from "@/components/sections/comparison";
import { Expertise } from "@/components/sections/expertise";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { LiveCatalog } from "@/components/sections/live-catalog";
import { Nav } from "@/components/sections/nav";
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
        <TrustStrip />
        <CommandCenter />
        <CategoryGrid />
        <Promotions />
        <QuickOrder />
        <LiveCatalog />
        <CompatibilityFinder />
        <ServicesGrid />
        <Expertise />
        <ProTiers />
        <Comparison />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
