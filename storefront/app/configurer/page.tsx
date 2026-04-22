import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { ConfiguratorWizard } from "@/components/configurer/wizard";

export const metadata: Metadata = {
  title: "Configurateur motorisation — 5 questions · devis 24h",
  description:
    "Répondez à 5 questions, recevez trois kits pré-sélectionnés et un devis chiffré sous 24h ouvrées.",
};

export default function ConfigurerPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-5xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Configurateur motorisation</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Configurateur · 5 questions · 2 minutes
              </p>
              <h1 className="mt-5 font-display text-[48px] font-semibold leading-[0.98] tracking-[-0.025em] text-fg lg:text-[72px]">
                Votre motorisation,
                <br />
                <span className="italic font-medium text-peach">dimensionnée par un ingénieur.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                Répondez à cinq questions techniques. On vous pré-sélectionne trois kits cohérents
                avec votre projet et on chiffre le devis sous 24h ouvrées. Aucun prix public sur
                les motorisations — clause de nos partenaires fabricants.
              </p>
            </div>
          </div>
        </section>

        <section id="devis" className="py-10 lg:py-14">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <ConfiguratorWizard />
          </div>
        </section>

        <section className="border-t border-border-soft bg-bg-elev py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Réponse
                </div>
                <div className="mt-2 font-display text-[28px] font-semibold tracking-tight text-fg">
                  Sous 24h ouvrées
                </div>
                <p className="mt-2 text-[13px] text-fg-muted">
                  Chiffrage précis avec pose IDF optionnelle.
                </p>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Devis signé
                </div>
                <div className="mt-2 font-display text-[28px] font-semibold tracking-tight text-fg">
                  Expédition J+1
                </div>
                <p className="mt-2 text-[13px] text-fg-muted">
                  Moteur + accessoires en stock, IDF 24h garantie.
                </p>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Vidéo-assistance
                </div>
                <div className="mt-2 font-display text-[28px] font-semibold tracking-tight text-fg">
                  Offerte dès 300 € HT
                </div>
                <p className="mt-2 text-[13px] text-fg-muted">
                  Un ancien poseur IEF valide votre installation en visio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
