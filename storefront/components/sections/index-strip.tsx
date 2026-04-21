/**
 * IndexStrip — magazine-style table of contents.
 * Horizontal strip listing the 8 chapters of the page, editorial feel.
 */
const CHAPTERS = [
  { n: "I", label: "Catalogue", sub: "12 univers pros", href: "#categories" },
  { n: "II", label: "Activité live", sub: "Commandes IDF", href: "#live" },
  { n: "III", label: "Best-sellers", sub: "30 derniers jours", href: "#best" },
  { n: "IV", label: "Compatibilité", sub: "3 clics", href: "#configurateur" },
  { n: "V", label: "Services", sub: "6 outils pro", href: "#services" },
  { n: "VI", label: "Métier", sub: "IEF & Co", href: "#metier" },
  { n: "VII", label: "Compte Pro", sub: "HT −5 à −15 %", href: "#pro" },
  { n: "VIII", label: "Manifeste", sub: "L'outsider", href: "/manifeste" },
];

export function IndexStrip() {
  return (
    <section
      aria-label="Sommaire éditorial"
      className="border-y border-border-soft bg-bg"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <div className="shrink-0 pt-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
              Sommaire
            </div>
            <div className="mt-1 font-serif-italic text-[13px] text-fg-muted">
              8 chapitres
            </div>
          </div>

          <ol className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4 lg:grid-cols-8">
            {CHAPTERS.map((c) => (
              <li key={c.n}>
                <a
                  href={c.href}
                  className="group block"
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-2 border-b border-border-soft pb-2 transition group-hover:border-accent">
                    <span className="font-serif-italic text-[14px] text-accent">
                      {c.n}
                    </span>
                    <span className="text-[13px] font-medium text-fg transition group-hover:text-accent">
                      {c.label}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                    {c.sub}
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
