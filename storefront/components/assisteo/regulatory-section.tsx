import { Scale } from "lucide-react";

const REFERENCES = [
  {
    code: "Arrêté du 21/12/1993",
    label: "Article 9",
    detail: "Maintenance semestrielle obligatoire des fermetures automatiques",
  },
  {
    code: "Code du travail",
    label: "Article R4224-12",
    detail: "Vérification périodique des équipements à danger",
  },
  {
    code: "Norme EN 13241",
    label: "—",
    detail: "Maintenance préventive et corrective des portes industrielles",
  },
  {
    code: "Norme EN 13269",
    label: "—",
    detail: "Préparation des contrats de maintenance",
  },
];

/**
 * Section B — Cadre réglementaire (v0.7.1).
 *
 * Ancrage de légitimité B2B : la maintenance n'est pas une option de
 * confort, c'est une obligation légale. Ton sobre, pas alarmiste.
 * Placée entre vidéo-assistance (A) et formules de contrat (C).
 */
export function RegulatorySection() {
  return (
    <section
      id="cadre-legal"
      aria-labelledby="cadre-legal-title"
      className="border-t border-border-soft bg-bg-elev py-14 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-bg"
          >
            <Scale className="h-5 w-5 text-fg-muted" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
              Section B · cadre réglementaire
            </p>
            <h2
              id="cadre-legal-title"
              className="mt-2 font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg lg:text-[36px]"
            >
              La maintenance de vos fermetures est une obligation légale
            </h2>
          </div>
        </div>

        <div className="mt-6 max-w-3xl space-y-3 text-[15px] leading-relaxed text-fg-muted lg:ml-14">
          <p>
            L'<strong className="text-fg">Arrêté du 21 décembre 1993 (Article 9)</strong>{" "}
            impose une maintenance semestrielle obligatoire pour toute porte,
            portail ou fermeture automatique installé sur un lieu de travail.
          </p>
          <p>
            Le <strong className="text-fg">Code du travail (R4224-12)</strong>{" "}
            renforce cette obligation pour tout équipement présentant un danger
            en cas de dysfonctionnement.
          </p>
        </div>

        <ul className="mt-8 divide-y divide-border-soft border-y border-border-soft lg:ml-14">
          {REFERENCES.map((r) => (
            <li
              key={r.code}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5 text-[14px]"
            >
              <span className="font-display font-semibold text-fg">
                {r.code}
              </span>
              {r.label !== "—" && (
                <span className="text-[12px] uppercase tracking-wide text-accent">
                  {r.label}
                </span>
              )}
              <span className="basis-full text-fg-muted sm:basis-auto sm:flex-1">
                {r.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
