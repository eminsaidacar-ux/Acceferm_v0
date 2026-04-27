import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { ProSignup } from "@/components/signup/pro-signup";

export const metadata: Metadata = {
  title: "Créer un compte pro — Validation SIRET < 2h",
  description: "Compte Pro AcceFerm : −5 % immédiat, livraison 24h IDF, facture PDF, paiement 30j compte Gold.",
};

export default function CreatePro() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <a href="/#pro" className="text-fg-muted transition hover:text-fg">
              Espace Pro
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Créer un compte</span>
          </div>
        </nav>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Compte Pro · validation SIRET instantanée
              </p>
              <h1 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
                Trois minutes.
                <br />
                <span className="italic font-medium text-accent">Un compte à vie.</span>
              </h1>
            </div>
            <ProSignup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
