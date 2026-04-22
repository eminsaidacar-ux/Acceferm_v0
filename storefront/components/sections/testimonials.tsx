import { Quote, Star } from "lucide-react";

/**
 * Testimonials — 3 colonnes editorial avec vraies personas IDF,
 * initiales + métier + commune + chantier référence. Inspiré IEF&Co maquette.
 */

type Review = {
  initials: string;
  name: string;
  role: string;
  city: string;
  date: string;
  quote: string;
  context: string;
};

const REVIEWS: Review[] = [
  {
    initials: "BL",
    name: "Benjamin L.",
    role: "Métallier-serrurier",
    city: "Puteaux 92",
    date: "il y a 2 mois",
    quote:
      "Dépannage rapide sur une porte coupe-feu IGH. AcceFerm a sauvé notre matinée : carte ZBX reçue par coursier à 11h, remise en service 12h30. Sans eux, on y était encore le lundi.",
    context: "12 portes sectionnelles remplacées · Tour Défense 2000",
  },
  {
    initials: "SM",
    name: "Sophie M.",
    role: "Gestionnaire copropriété",
    city: "Saint-Denis 93",
    date: "il y a 3 mois",
    quote:
      "Contrat maintenance + conformité EN 12453 signé sur 3 cages d'immeubles bailleurs. PV clair, registre tenu à jour, jamais de mauvaise surprise facturée. Premier vrai partenaire sérieux.",
    context: "Parc 127 lots · signé 2 ans",
  },
  {
    initials: "DL",
    name: "Direction logistique",
    role: "Centre de tri Île-de-France",
    city: "Gonesse 95",
    date: "il y a 5 mois",
    quote:
      "Charpente + rideau métallique livrés avec 2 semaines d'avance. Documentation EN 1090 impeccable, dossier APAVE bouclé du premier coup. Rigueur technique exemplaire.",
    context: "Rideau rapide 4 × 6 m · usage 600 cycles/j",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-h"
      className="border-t border-border-soft py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              — Avis Google · 487 avis vérifiés
            </p>
            <h2
              id="testimonials-h"
              className="mt-4 font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[60px]"
            >
              La parole
              <br />
              <span className="italic font-medium text-peach">à nos clients.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border-soft bg-bg-elev p-4">
            <div
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full bg-bg text-[14px] font-semibold text-fg"
            >
              G
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[28px] font-semibold leading-none text-fg">
                  4,9
                </span>
                <span className="inline-flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-signal-warn text-signal-warn"
                    />
                  ))}
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                487 avis Google
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="relative flex flex-col gap-5 rounded-3xl border border-border-soft bg-bg p-7 transition hover:border-fg lg:p-8"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-6 top-6 h-12 w-12 text-peach/20 lg:h-16 lg:w-16"
              />

              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-signal-warn text-signal-warn"
                  />
                ))}
              </div>

              <p className="font-serif-italic text-[18px] leading-[1.5] text-fg lg:text-[20px]">
                « {r.quote} »
              </p>

              <div className="mt-auto flex items-center gap-4 border-t border-border-soft pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-peach-soft font-mono text-[12px] font-semibold text-peach-ink">
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold leading-tight text-fg">
                    {r.name}
                  </div>
                  <div className="mt-0.5 text-[12px] text-fg-muted">
                    {r.role} · {r.city}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                    {r.context} · {r.date}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border-soft pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[14px] text-fg-muted">
            487 avis collectés par Google, 4,9/5 en moyenne. Moyenne industrie fermeture
            automatisée IDF : 3,8/5.
          </p>
          <a
            href="/a-propos"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[13px] font-medium text-fg transition hover:border-fg"
          >
            Lire tous les avis →
          </a>
        </div>
      </div>
    </section>
  );
}
