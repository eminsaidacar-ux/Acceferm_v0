import type { Metadata } from "next";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { QuoteForm } from "@/components/sur-mesure/quote-form";
import { TypesGrid } from "@/components/sur-mesure/types-grid";
import { PROCESS_STEPS } from "@/lib/sur-mesure";

export const metadata: Metadata = {
  title: "Sur-mesure & Fabrication — atelier Groslay + pose IDF",
  description:
    "Rideaux métalliques, portes industrielles, portails fabriqués sur mesure dans notre atelier de Groslay (95). Devis 24 h, pose Île-de-France par équipes IEF & Co.",
  alternates: { canonical: "/sur-mesure" },
};

const TRUST_ITEMS = [
  "Devis chiffré sous 24 h",
  "Pose IDF par équipes IEF & Co",
  "Garanties fabricant + atelier",
];

/**
 * /sur-mesure (v0.8) — Modèle B fabrication.
 *
 * Atterrissage qui présente les 9 fermetures fabriquées sur mesure
 * par IEF & Co et permet de demander un devis ciblé. Distinct du
 * Modèle A /catalogue (fourniture seule, e-commerce).
 *
 * 4 blocs : Hero / TypesGrid / Process / QuoteForm.
 */
export default function SurMesurePage() {
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
            <span className="font-medium text-fg">Sur-mesure & Fabrication</span>
          </div>
        </nav>

        {/* Bloc A — Hero */}
        <section className="border-b border-border-soft bg-bg py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
                Modèle B · sur-mesure & fabrication
              </p>
              <h1 className="mt-4 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-fg lg:text-[68px]">
                Fabrication sur mesure ·
                <br />
                Pose en Île-de-France
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                Rideaux métalliques, portes industrielles, portails, clôtures
                et portiques fabriqués dans notre atelier de Groslay et posés
                par nos équipes terrain. 15 ans de métier.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[13px] font-medium text-fg"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#devis"
                className="mt-8 inline-flex min-h-12 items-center rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </section>

        {/* Bloc B — 9 types fabriqués */}
        <TypesGrid />

        {/* Bloc C — Process 4 étapes */}
        <section
          aria-labelledby="process-title"
          className="border-b border-border-soft bg-bg-elev py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
              Process · 4 étapes
            </p>
            <h2
              id="process-title"
              className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[44px]"
            >
              Comment ça marche
            </h2>

            <ol className="mt-10 grid gap-4 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border-soft bg-bg p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[14px] font-semibold text-accent-fg">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-[18px] font-semibold tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Bloc D — Formulaire devis (anchor #devis) */}
        <section id="devis" className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
              Devis sur-mesure
            </p>
            <h2 className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[44px]">
              Décrivez votre projet
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] text-fg-muted">
              Plus vous donnez de détails, plus le devis sera précis. Visite de
              métré offerte sous 5 jours en Île-de-France.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
