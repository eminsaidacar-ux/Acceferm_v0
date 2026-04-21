"use client";

import { ArrowUpDown, Grid3x3, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  "Meilleures ventes",
  "Prix croissant",
  "Prix décroissant",
  "Nouveautés",
  "Note clients",
] as const;

export function CatalogueToolbar({ count }: { count: number }) {
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-soft bg-bg p-4 md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[12px] tabular-nums text-fg">
          <strong className="font-semibold text-fg">{count}</strong>{" "}
          <span className="text-fg-muted">produits</span>
        </span>
        <span className="hidden h-4 w-px bg-border md:inline-block" />
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle md:inline">
          Mise à jour il y a 2 min
        </span>
      </div>

      <div className="flex w-full items-center gap-2 md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] text-fg transition hover:border-fg md:w-auto"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-fg-muted" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
              Trier ·
            </span>
            <span className="font-medium">{sort}</span>
          </button>
          {open && (
            <div className="absolute right-0 top-full z-10 mt-1 w-56 overflow-hidden rounded-xl border border-border bg-bg shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)]">
              {SORT_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setSort(opt);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2 text-left text-[13px] transition hover:bg-bg-elev",
                    sort === opt ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {opt}
                  {sort === opt && <span className="font-mono text-[10px] text-accent">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-px overflow-hidden rounded-full border border-border">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="Vue grille"
            className={cn(
              "p-2 transition",
              view === "grid" ? "bg-fg text-accent-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-label="Vue liste"
            className={cn(
              "p-2 transition",
              view === "list" ? "bg-fg text-accent-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
