import { ArrowDownRight, CalendarCheck, HeadsetIcon, PackageCheck, ScanSearch, Truck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    time: "T+0",
    title: "Vous cliquez",
    desc: "Sur votre schéma portail ou dans le configurateur. 12 types, 6 étapes, 5 questions techniques max.",
    icon: ScanSearch,
  },
  {
    n: "02",
    time: "< 24h",
    title: "Devis chiffré",
    desc: "3 kits comparés HT/TTC avec compatibilité garantie. Un ancien poseur vérifie et valide.",
    icon: CalendarCheck,
  },
  {
    n: "03",
    time: "J+1",
    title: "Expédition IDF",
    desc: "Cartons préparés le jour même, transporteur le lendemain. Pose possible par IEF & Co en option.",
    icon: Truck,
  },
  {
    n: "04",
    time: "Sur chantier",
    title: "Vidéo-assistance",
    desc: "Un technicien IEF en visio, offert dès 300 € HT motorisation. Zéro trajet perdu, zéro re-commande.",
    icon: HeadsetIcon,
  },
  {
    n: "05",
    time: "Après pose",
    title: "SAV & garanties",
    desc: "Ticketing traçable, pièces prioritaires sous 48h, garanties fabricant gérées à votre place.",
    icon: PackageCheck,
  },
];

/**
 * ProcessStrip — 5 étapes verticales avec rail numérique,
 * inspiré des éditoriaux Apollo/Kellenove/Ueno.
 */
export function ProcessStrip() {
  return (
    <section
      id="parcours"
      className="relative border-t border-border-soft bg-bg-elev py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                Chapitre V · Parcours
              </div>
              <h2 className="mt-5 font-display text-[44px] font-semibold leading-[0.95] tracking-[-0.02em] text-fg lg:text-[72px]">
                Du clic au{" "}
                <span className="font-serif-italic text-accent">chantier</span>
                <br />
                en cinq{" "}
                <span className="font-serif-italic text-accent">mouvements.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
                Pas de tunnel sept étapes. Pas de formulaire PDF à imprimer. Chaque étape est
                pensée pour l'installateur qui calcule son temps au quart d'heure.
              </p>
              <a
                href="/configurer"
                className="mt-8 inline-flex items-center gap-2 border-b border-fg pb-1 text-[14px] font-medium text-fg transition hover:gap-3 hover:text-accent hover:border-accent"
                data-cursor="hover"
              >
                Tester le configurateur
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <ol className="relative lg:col-span-8">
            {/* Vertical rail */}
            <div
              aria-hidden="true"
              className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border-soft to-transparent lg:left-[30px]"
            />

            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.n}
                  className="reveal group relative flex gap-6 py-8 first:pt-0 last:pb-0"
                >
                  {/* Number bubble */}
                  <div className="relative z-10 shrink-0">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-border bg-bg font-mono text-[12px] text-fg transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg lg:h-[60px] lg:w-[60px] lg:text-[14px]">
                      {step.n}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 border-b border-border-soft pb-8 group-last:border-transparent">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[26px] font-semibold leading-tight text-fg lg:text-[36px]">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
                        {step.time}
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">
                      {step.desc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-fg-muted">
                      <Icon className="h-4 w-4" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                        Étape {step.n}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
