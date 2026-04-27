// 5 marques validées contrat (avril 2026) — NE PAS ré-introduire les
// 12 marques retirées en v0.6 (Nice / Came / FAAC / BFT / etc.).
// TODO: intégrer logos officiels marques fournisseurs (autorisations OK
// contrats actifs) — placeholders texte stylés en attendant.
const BRANDS = [
  { name: "V2", note: "Groupe AFCA — Italie" },
  { name: "Roger Technology", note: "Italie" },
  { name: "Motor Line", note: "Portugal" },
  { name: "Doorgate", note: "Portugal" },
  { name: "Intégral Système", note: "France" },
];

/**
 * BrandStrip — défilement marques fournisseurs (réintro v0.7).
 *
 * Bandeau placé entre la marquise centrale et TrustBlock dans la home.
 *
 * - Animation CSS pure (.marquee-track--slow, 45s linéaire infinie)
 * - Pause au hover desktop (héritée de .marquee-track)
 * - prefers-reduced-motion : animation arrêtée, marques visibles static
 * - Fond neutre #f6f5f3 (bg-bg-elev), pas le rouge
 * - Logos placeholder texte Inter Tight bold + bordure fine grise
 * - 2 jeux dupliqués pour boucle seamless ; le 2e aria-hidden
 */
export function BrandStrip() {
  return (
    <section
      aria-label="Marques fournisseurs distribuées par AcceFerm Pro"
      className="border-y border-border-soft bg-bg-elev py-10 lg:py-14"
    >
      <div className="relative isolate flex h-[80px] items-center overflow-hidden">
        <div className="marquee-track marquee-track--slow flex items-center gap-16 pl-16 lg:gap-24 lg:pl-24">
          <ul className="flex shrink-0 items-center gap-16 lg:gap-24">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <BrandPlaceholder name={b.name} note={b.note} />
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            className="flex shrink-0 items-center gap-16 lg:gap-24"
          >
            {BRANDS.map((b) => (
              <li key={`dup-${b.name}`}>
                <BrandPlaceholder name={b.name} note={b.note} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
        Marques distribuées · Contrats fournisseurs actifs
      </p>
    </section>
  );
}

function BrandPlaceholder({ name, note }: { name: string; note: string }) {
  return (
    <div className="group flex h-[50px] min-w-[180px] items-center justify-center rounded-md border border-border bg-bg px-5 transition hover:border-fg lg:min-w-[220px]">
      <span className="font-display text-[16px] font-bold tracking-tight text-fg-muted transition group-hover:text-fg lg:text-[18px]">
        {name}
      </span>
      <span className="ml-3 hidden text-[10px] uppercase tracking-wide text-fg-subtle lg:inline">
        · {note}
      </span>
    </div>
  );
}
