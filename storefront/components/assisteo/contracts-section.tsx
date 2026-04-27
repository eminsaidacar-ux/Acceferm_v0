import { Check } from "lucide-react";

// TODO: tarifs définitifs maintenance à confirmer par Emin avant prod
type Formule = {
  id: "essentiel" | "confort" | "premium";
  name: string;
  pricePlaceholder: string;
  cible: string;
  bullets: string[];
  highlighted?: boolean;
};

const FORMULES: Formule[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    pricePlaceholder: "XXX € HT/an · à confirmer",
    cible: "Copropriétés < 50 lots, petites entreprises",
    bullets: [
      "1 visite préventive / an",
      "Hotline 8 h – 19 h L-V",
      "Intervention sous 72 h ouvrées",
      "Pièces non incluses",
    ],
  },
  {
    id: "confort",
    name: "Confort",
    pricePlaceholder: "XXX € HT/an · à confirmer",
    cible: "Copropriétés 50–200 lots, PME, écoles",
    bullets: [
      "2 visites préventives / an",
      "Hotline 7 j / 7",
      "Intervention sous 24 h ouvrées",
      "Pièces standard incluses",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    pricePlaceholder: "XXX € HT/an · à confirmer",
    cible: "Grandes copropriétés, sites industriels, collectivités",
    bullets: [
      "4 visites préventives / an",
      "Hotline 24 / 7",
      "Intervention sous 4 h",
      "Toutes pièces incluses",
      "Vidéo-assistance Assistéo illimitée",
    ],
  },
];

/**
 * Section B — 3 formules de contrats de maintenance.
 *
 * Tarifs en placeholder (TODO : à confirmer par Emin avant prod).
 * CTA "Demander un devis" deep-link vers /contact?sujet=maintenance-[id].
 */
export function ContractsSection() {
  return (
    <section id="contrats" className="border-t border-border-soft py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
            Section B · contrats de maintenance
          </p>
          <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[52px]">
            Contrats de maintenance
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
            Pour syndics, property managers, facility managers, collectivités et
            entreprises avec parc de fermetures motorisées.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FORMULES.map((f) => (
            <article
              key={f.id}
              className={`rounded-2xl border p-6 transition ${
                f.highlighted
                  ? "border-accent bg-accent-soft"
                  : "border-border-soft bg-bg"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[24px] font-semibold tracking-tight text-fg">
                  {f.name}
                </h3>
                {f.highlighted && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-fg">
                    Recommandé
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-[18px] font-medium tabular-nums text-fg">
                {f.pricePlaceholder}
              </p>
              <p className="mt-1 text-[12px] uppercase tracking-wide text-fg-subtle">
                {f.cible}
              </p>

              <ul className="mt-5 space-y-2.5">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] leading-snug text-fg"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href={`/contact?sujet=maintenance-${f.id}`}
                className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md px-4 text-[14px] font-medium transition ${
                  f.highlighted
                    ? "bg-accent text-accent-fg hover:bg-accent-hover"
                    : "border border-border bg-bg text-fg hover:border-fg"
                }`}
              >
                Demander un devis
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
