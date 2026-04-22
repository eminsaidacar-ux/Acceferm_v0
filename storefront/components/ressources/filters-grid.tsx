"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { img, imagery } from "@/lib/images";
import { categoryLabel, type Resource, type ResourceCategory } from "@/lib/ressources";
import { cn } from "@/lib/utils";

const FILTERS: Array<ResourceCategory | "all"> = [
  "all",
  "guide",
  "diagnostic",
  "tuto",
  "conformite",
  "local",
];

/**
 * RessourcesFiltersGrid — client, gère le filtrage catégorie + recherche texte
 * sur les articles ressources, avec animation d'entrée/sortie.
 */
export function RessourcesFiltersGrid({ resources }: { resources: Resource[] }) {
  const [active, setActive] = useState<ResourceCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (active !== "all" && r.category !== active) return false;
      if (q.length < 2) return true;
      const hay = `${r.title} ${r.lede} ${r.author}`.toLowerCase();
      return hay.includes(q);
    });
  }, [active, query, resources]);

  return (
    <>
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          {FILTERS.map((f) => {
            const on = active === f;
            const count =
              f === "all"
                ? resources.length
                : resources.filter((r) => r.category === f).length;
            return (
              <button
                type="button"
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 transition",
                  on
                    ? "bg-accent font-medium text-accent-fg"
                    : "border border-border text-fg-muted hover:border-fg hover:text-fg",
                )}
              >
                {f === "all" ? "Tout" : categoryLabel[f]}
                <span className={cn("ml-1.5 font-mono text-[11px]", on ? "text-accent-fg/80" : "text-fg-subtle")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 lg:w-72">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher photocellule, VIGIK…"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
          />
        </label>
      </div>

      {/* Grid */}
      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-border-soft bg-bg-elev p-10 text-center">
            <p className="font-display text-[22px] font-semibold text-fg">
              Aucun article ne correspond.
            </p>
            <p className="mt-2 text-[14px] text-fg-muted">
              Essayez « VIGIK », « photocellule » ou « EN 12453 ».
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {filtered.map((r) => (
                <motion.a
                  key={r.slug}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  href={`/ressources/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg transition hover:border-fg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                    <img
                      src={img(imagery[r.image], 720, 450)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-bg/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fg backdrop-blur">
                      {categoryLabel[r.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-fg">
                      {r.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-fg-muted">{r.lede}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {r.readMinutes} min
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}
