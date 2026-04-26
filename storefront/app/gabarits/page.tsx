import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Construction } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Gabarits & templates pro — bientôt disponibles",
  description:
    "Devis motorisation, PV mise en service, fiche SAV, audit EN 12453. Téléchargements pros bientôt disponibles. Inscrivez-vous au compte pro pour être notifié.",
  alternates: { canonical: "https://acceferm.fr/gabarits" },
};

export default function GabaritsPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav
          aria-label="Fil d'Ariane"
          className="border-b border-border-soft bg-bg-elev"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-sm lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <a
              href="/ressources"
              className="text-fg-muted transition hover:text-fg"
            >
              Ressources
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <span className="font-medium text-fg">Gabarits</span>
          </div>
        </nav>

        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-bg-elev px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-fg-muted">
              <Construction className="h-3.5 w-3.5" aria-hidden="true" />
              Bientôt disponible
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              Gabarits &amp; templates pro
            </h1>
            <p className="prose-narrow mx-auto mt-6 text-lg leading-relaxed text-fg-muted">
              Devis motorisation, PV de mise en service, fiche SAV, registre de
              maintenance copropriété, audit conformité EN 12453, et plus. Une
              dizaine de gabarits rédigés par les équipes IEF &amp; Co, testés
              sur 3 000 chantiers.
            </p>
            <p className="mx-auto mt-4 max-w-prose text-base text-fg-muted">
              Disponibles courant juin 2026 — gratuits ou réservés aux comptes
              pros validés selon le gabarit.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/compte-pro/nouveau"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg btn-soft"
              >
                Créer un compte pro
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/ressources"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border-soft bg-bg px-6 text-base font-medium text-fg transition hover:border-fg"
              >
                Lire les guides en attendant
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
