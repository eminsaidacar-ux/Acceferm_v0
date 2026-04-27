import type { Metadata } from "next";
import { CalendarClock, ChevronRight, Headphones, MonitorPlay } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { AssisteoFaq } from "@/components/assisteo/assisteo-faq";
import { ContractsSection } from "@/components/assisteo/contracts-section";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Assistéo & Maintenance — vidéo-assistance + 3 contrats",
  description:
    "Vidéo-assistance Assistéo offerte dès 300 € HT de motorisation. Contrats de maintenance Essentiel / Confort / Premium pour syndics et property managers.",
  alternates: { canonical: "/assisteo-maintenance" },
};

const VISIO_STEPS = [
  {
    icon: CalendarClock,
    title: "Réservez un créneau",
    body: "Calendrier en ligne, plages 8 h – 19 h L–V. Confirmation immédiate.",
  },
  {
    icon: MonitorPlay,
    title: "Recevez le lien visio",
    body: "Par SMS et email, 10 min avant le rendez-vous. Aucun téléchargement.",
  },
  {
    icon: Headphones,
    title: "Diagnostic en direct",
    body: "Un technicien IEF & Co dédié. Captures d'écran et schémas en temps réel.",
  },
];

/**
 * /assisteo-maintenance — vidéo-assistance + contrats de maintenance (v0.7).
 *
 * 4 sections :
 *  A. Vidéo-assistance Assistéo (3 étapes + CTA réservation)
 *  B. Contrats de maintenance (composant ContractsSection — 3 formules)
 *  C. Cross-link configurateur visuel
 *  D. FAQ Assistéo (composant AssisteoFaq — 5 questions + FAQPage JSON-LD)
 */
export default function AssisteoMaintenancePage() {
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
            <span className="font-medium text-fg">Assistéo & Maintenance</span>
          </div>
        </nav>

        {/* Section A — Vidéo-assistance */}
        <section id="visio" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
                Section A · vidéo-assistance
              </p>
              <h1 className="mt-4 font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.025em] text-fg lg:text-[64px]">
                Vidéo-assistance Assistéo
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                Un technicien IEF & Co en visio, 20 min, pour vous débloquer sur
                chantier. Offerte dès 300 € HT de motorisation commandée.
              </p>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-3">
              {VISIO_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border-soft bg-bg-elev p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[14px] font-semibold text-accent-fg">
                      {i + 1}
                    </span>
                    <step.icon
                      className="h-5 w-5 text-fg-muted"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-4 font-display text-[20px] font-semibold tracking-tight text-fg">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {/* TODO: connexion calendrier reel (Calendly / Cal.com / interne) */}
              <a
                href="#numero-a-confirmer"
                className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
              >
                Réserver un créneau
              </a>
              <a
                href="#faq"
                className="inline-flex min-h-12 items-center rounded-md border border-border bg-bg px-5 text-[14px] font-medium text-fg transition hover:border-fg"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </section>

        {/* Section B — Contrats de maintenance */}
        <ContractsSection />

        {/* Section C — Cross-link configurateur */}
        <section className="border-t border-border-soft bg-bg-elev py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-2xl border border-border-soft bg-bg p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="max-w-xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
                  Section C · besoin d'aide ?
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-fg">
                  Pas sûr du composant en panne ou à remplacer ? Notre configurateur
                  visuel vous guide en 3 clics.
                </p>
              </div>
              <a
                href="/configurateur"
                className="mt-4 inline-flex min-h-12 items-center rounded-md border border-border bg-bg px-5 text-[14px] font-medium text-fg transition hover:border-fg sm:mt-0 sm:shrink-0"
              >
                Ouvrir le configurateur
              </a>
            </div>
          </div>
        </section>

        {/* Section D — FAQ */}
        <AssisteoFaq />
      </main>
      <Footer />
    </>
  );
}
