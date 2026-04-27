import { CATALOGUE_FAMILIES } from "@/lib/catalogue-families";

/**
 * Tabs horizontaux scrollables — sélecteur des 10 familles catalogue.
 *
 * Affiché en haut des pages /catalogue/[slug] pour permettre de basculer
 * rapidement entre familles sans repasser par la page hub. Tabs simples,
 * pas de hover effets lourds.
 *
 * `activeSlug` reçoit le slug courant pour mettre en avant la tab active.
 */
export function FamilySelector({ activeSlug }: { activeSlug: string }) {
  return (
    <nav
      aria-label="Familles du catalogue"
      className="border-b border-border-soft bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul
          role="tablist"
          aria-label="Familles produits"
          className="-mx-1 flex gap-1 overflow-x-auto scroll-smooth py-3"
        >
          <li>
            <a
              href="/catalogue"
              className="inline-flex min-h-12 shrink-0 items-center rounded-full px-4 text-[13px] font-medium text-fg-muted transition hover:bg-bg-elev hover:text-fg"
            >
              Toutes les familles
            </a>
          </li>
          {CATALOGUE_FAMILIES.map((f) => {
            const active = activeSlug === f.id;
            return (
              <li key={f.id}>
                <a
                  href={`/catalogue/${f.id}`}
                  role="tab"
                  aria-selected={active}
                  className={`inline-flex min-h-12 shrink-0 items-center rounded-full px-4 text-[13px] font-medium transition ${
                    active
                      ? "bg-accent text-accent-fg"
                      : "text-fg-muted hover:bg-bg-elev hover:text-fg"
                  }`}
                >
                  {f.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
