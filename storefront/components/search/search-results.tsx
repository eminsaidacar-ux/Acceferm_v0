"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BookOpen, ChevronRight, Package, Search as SearchIcon, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { usePriceMode } from "@/components/price-mode-context";
import { promotions, topProducts, categories } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { resources } from "@/lib/ressources";
import { cn, formatPrice } from "@/lib/utils";

const FACETS = [
  { id: "brand", label: "Marque", options: ["V2", "Came", "FAAC", "Nice", "BFT", "Roger"] },
  { id: "voltage", label: "Tension", options: ["12 V", "24 V", "230 V"] },
  { id: "stock", label: "Stock", options: ["En stock", "48h", "Sur commande"] },
];

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function score(haystack: string, needle: string) {
  const h = normalize(haystack);
  const n = normalize(needle);
  if (!n) return 0;
  if (h.includes(n)) return n.length / h.length;
  const words = n.split(/\s+/);
  return words.filter((w) => h.includes(w)).length / words.length;
}

export function SearchResults({ query }: { query: string }) {
  const [q, setQ] = useState(query);
  const [activeFacets, setActiveFacets] = useState<Record<string, boolean>>({});
  const { mode } = usePriceMode();

  const trimmed = q.trim();

  const productHits = useMemo(() => {
    if (!trimmed) return topProducts.slice(0, 6);
    return [...topProducts, ...promotions]
      .map((p) => ({ p, s: score(`${p.brand} ${p.name} ${p.category}`, trimmed) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ p }) => p);
  }, [trimmed]);

  const categoryHits = useMemo(() => {
    if (!trimmed) return categories.slice(0, 4);
    return categories.filter((c) => score(c.name, trimmed) > 0).slice(0, 6);
  }, [trimmed]);

  const resourceHits = useMemo(() => {
    if (!trimmed) return resources.slice(0, 3);
    return resources
      .filter((r) => score(`${r.title} ${r.lede}`, trimmed) > 0)
      .slice(0, 5);
  }, [trimmed]);

  const total = productHits.length + categoryHits.length + resourceHits.length;

  return (
    <div>
      {/* Search header */}
      <div className="rounded-3xl border border-border bg-bg p-5">
        <div className="flex items-center gap-3">
          <SearchIcon className="h-5 w-5 shrink-0 text-fg-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Marque, référence, symptôme, catégorie…"
            className="min-w-0 flex-1 bg-transparent text-[17px] text-fg placeholder:text-fg-subtle focus:outline-none"
            autoFocus
          />
          {q && (
            <button
              type="button"
              aria-label="Effacer"
              onClick={() => setQ("")}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-fg-muted transition hover:border-fg hover:text-fg"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span className="hidden rounded-full bg-bg-elev px-3 py-1 font-mono text-[11px] text-fg-muted sm:inline-block">
            {total} résultats
          </span>
        </div>

        {/* Quick facets */}
        <div className="mt-4 flex flex-wrap gap-2">
          {FACETS.flatMap((f) =>
            f.options.map((o) => {
              const id = `${f.id}-${o}`;
              const on = activeFacets[id];
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() =>
                    setActiveFacets((s) => ({ ...s, [id]: !s[id] }))
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] transition",
                    on
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border text-fg-muted hover:border-fg hover:text-fg",
                  )}
                >
                  <span className="text-[9px] opacity-60">{f.label}</span>
                  <span>{o}</span>
                </button>
              );
            }),
          )}
        </div>
      </div>

      {/* Empty state */}
      {total === 0 && trimmed && (
        <div className="mt-10 rounded-3xl border border-border-soft bg-bg-elev p-10 text-center">
          <Sparkles className="mx-auto h-6 w-6 text-fg-subtle" />
          <p className="mt-4 font-display text-[24px] font-semibold text-fg">
            Aucun résultat pour « {trimmed} »
          </p>
          <p className="mt-2 text-[13px] text-fg-muted">
            Vérifiez l'orthographe, essayez une marque ou un symptôme. Ou ouvrez le Digital Gate
            Twin sur la home pour trouver par composant.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["photocellule V2", "barre palpeuse EN 12453", "clavier IP65", "récepteur 433 MHz"].map(
              (s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setQ(s)}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-fg-muted hover:border-fg hover:text-fg"
                >
                  {s}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {total > 0 && (
        <div className="mt-10 space-y-10">
          {categoryHits.length > 0 && (
            <section>
              <ResultsHeader
                label="Catégories"
                count={categoryHits.length}
                href="/#categories"
              />
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {categoryHits.map((c) => (
                  <a
                    key={c.slug}
                    href={`/catalogue/${c.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border-soft bg-bg p-4 transition hover:border-fg"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-fg">{c.name}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                        {c.count} · {c.priceFrom}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {productHits.length > 0 && (
            <section>
              <ResultsHeader label="Produits" count={productHits.length} icon={Package} href="#" />
              <AnimatePresence>
                <div className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-3">
                  {productHits.slice(0, 9).map((p) => (
                    <motion.a
                      key={p.id}
                      layout
                      href={`/produit/${p.slug}`}
                      className="group flex gap-4 bg-bg p-4 transition hover:bg-bg-elev"
                    >
                      <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-bg-soft">
                        {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                        <img
                          src={img(imagery[p.image], 240, 240)}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                          {p.brand}
                        </div>
                        <h3 className="mt-1 text-[13px] font-medium leading-snug text-fg">
                          {p.name}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="font-display text-[18px] font-semibold tabular-nums text-fg">
                            {formatPrice(p.priceHT, mode)}
                          </span>
                          <span className="text-[11px] text-fg-muted">€ {mode}</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </AnimatePresence>
            </section>
          )}

          {resourceHits.length > 0 && (
            <section>
              <ResultsHeader
                label="Guides & ressources"
                count={resourceHits.length}
                icon={BookOpen}
                href="/ressources"
              />
              <div className="mt-4 space-y-2">
                {resourceHits.map((r) => (
                  <a
                    key={r.slug}
                    href={`/ressources/${r.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border-soft bg-bg p-4 transition hover:border-fg"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                        {r.category} · {r.readMinutes} min
                      </div>
                      <div className="mt-1.5 text-[14px] font-medium text-fg">{r.title}</div>
                      <div className="mt-0.5 max-w-2xl text-[12px] text-fg-muted">{r.lede}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ResultsHeader({
  label,
  count,
  href,
  icon: Icon = Package,
}: {
  label: string;
  count: number;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-fg-muted" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
          {label} ({count})
        </span>
      </div>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-[12px] font-medium text-fg-muted hover:text-fg"
      >
        Voir tout
        <ArrowRight className="h-3 w-3" />
      </a>
    </div>
  );
}
