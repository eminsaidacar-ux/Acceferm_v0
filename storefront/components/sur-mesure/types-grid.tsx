import { SUR_MESURE_TYPES } from "@/lib/sur-mesure";

/**
 * Grille des 9 types de fermetures fabriquées sur mesure.
 *
 * Responsive : 1 col mobile, 2 col tablette, 3 col desktop.
 * CTA "Demander un devis" → ancre #devis avec query param ?type=…
 * pour pré-remplir le formulaire en bas de page.
 */
export function TypesGrid() {
  return (
    <section
      aria-labelledby="types-title"
      className="border-b border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
            9 fabrications · sur mesure
          </p>
          <h2
            id="types-title"
            className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[52px]"
          >
            Ce que nous fabriquons
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
            Atelier de Groslay (95) · pose par équipes IEF & Co · garanties
            fabricant + atelier.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUR_MESURE_TYPES.map((t) => (
            <li
              key={t.id}
              className="flex flex-col rounded-2xl border border-border-soft bg-bg p-5"
            >
              {/* Photo placeholder — sobre, pas d'image hotlinked en V0.8 */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-bg-elev">
                <div
                  aria-hidden="true"
                  className="grid h-full place-items-center text-[10px] uppercase tracking-[0.2em] text-fg-subtle"
                >
                  Photo · {t.name}
                </div>
              </div>
              <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight text-fg">
                {t.name}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                {t.description}
              </p>
              <ul className="mt-3 space-y-1 text-[12px] text-fg-subtle">
                {t.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <a
                href={`#devis?type=${t.id}`}
                data-type={t.id}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-bg text-[14px] font-medium text-fg transition hover:border-fg"
              >
                Demander un devis
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
