import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { TwinExplorer } from "@/components/assistant-diagnostic/twin-explorer";

export const metadata: Metadata = {
  title: "Assistant diagnostic — Identifiez la pièce de votre installation",
  description:
    "Vous ne savez pas comment s'appelle la pièce que vous devez remplacer ? Cliquez sur votre type d'équipement, identifiez le composant en panne, et nous vous montrons les références compatibles en stock.",
  alternates: { canonical: "/assistant-diagnostic" },
};

/**
 * /assistant-diagnostic — outil visuel d'identification de pièces (v0.8).
 *
 * Anciennement /configurateur (renommé en v0.8 pour clarifier le
 * positionnement : ce n'est pas un configurateur de devis mais un
 * assistant pour visiteurs novices). Distinct de /configurer (wizard
 * 5 questions devis motorisation, conservé).
 *
 * 7 schémas SVG inline statiques + interactions JS au clic.
 * Performance cible : Lighthouse Perf ≥ 88, A11y ≥ 95.
 */
export default function AssistantDiagnosticPage() {
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
            <span className="font-medium text-fg">Assistant diagnostic</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
                Assistant · cliquez · identifiez
              </p>
              <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.025em] text-fg lg:text-[64px]">
                Assistant diagnostic — Identifiez la pièce de votre installation
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                Vous ne savez pas comment s'appelle la pièce que vous devez remplacer ?
                Cliquez sur votre type d'équipement, identifiez le composant en panne,
                et nous vous montrons les références compatibles en stock.
              </p>
              <p className="mt-3 text-[13px] text-fg-subtle">
                7 types de fermeture · références en stock à chaque clic · prix HT pro
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <TwinExplorer />
          </div>
        </section>

        <section className="border-t border-border-soft bg-bg-elev py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border-soft bg-bg p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Vous remplacez un composant
                </p>
                <h2 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-fg">
                  Catalogue accessoires
                </h2>
                <p className="mt-2 text-[14px] text-fg-muted">
                  Photocellules, feux, claviers, télécommandes, alimentations,
                  serrures électriques. Prix HT visibles, livraison J+1 en IDF.
                </p>
                <a
                  href="/catalogue/photocellules"
                  className="mt-4 inline-flex min-h-12 items-center rounded-md border border-border bg-bg px-4 text-[13px] font-medium text-fg transition hover:border-fg"
                >
                  Voir le catalogue
                </a>
              </div>
              <div className="rounded-2xl border border-accent bg-accent-soft p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                  Vous installez une motorisation
                </p>
                <h2 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-fg">
                  Devis motorisation 24 h
                </h2>
                <p className="mt-2 text-[14px] text-fg-muted">
                  5 questions techniques, 3 kits cohérents pré-sélectionnés, devis
                  chiffré sous 24 h ouvrées. Clause fournisseur — prix sur devis.
                </p>
                <a
                  href="/configurer"
                  className="mt-4 inline-flex min-h-12 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
                >
                  Lancer le devis
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
