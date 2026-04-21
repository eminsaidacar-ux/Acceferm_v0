"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { defaultFilters } from "@/lib/catalogue";
import { cn } from "@/lib/utils";

export function FiltersSidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultFilters.slice(0, 4).map((f) => [f.id, true])),
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [price, setPrice] = useState<number>(500);

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const selectedCount = Object.values(checked).filter(Boolean).length;

  return (
    <aside aria-label="Filtres" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[18px] font-semibold text-fg">Filtres</h2>
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={() => setChecked({})}
            className="text-[12px] text-fg-muted hover:text-accent"
          >
            Effacer ({selectedCount})
          </button>
        )}
      </div>

      {/* Price range */}
      <div className="rounded-2xl border border-border-soft bg-bg p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            Prix max
          </div>
          <div className="font-mono text-[12px] tabular-nums text-fg">{price} € HT</div>
        </div>
        <input
          type="range"
          min={10}
          max={1500}
          step={10}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
          aria-label="Prix maximum"
        />
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-fg-subtle">
          <span>10 €</span>
          <span>1 500 €</span>
        </div>
      </div>

      {defaultFilters.map((section) => (
        <div
          key={section.id}
          className="overflow-hidden rounded-2xl border border-border-soft bg-bg"
        >
          <button
            type="button"
            onClick={() => toggle(section.id)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
              {section.label}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-fg-muted transition",
                open[section.id] && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence initial={false}>
            {open[section.id] && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5 px-4 pb-4">
                  {section.options.map((opt) => {
                    const id = `${section.id}-${opt.id}`;
                    const on = checked[id] ?? false;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 transition hover:bg-bg-elev"
                      >
                        <span className="flex min-w-0 items-center gap-2.5 text-[13px] text-fg">
                          <input
                            id={id}
                            type="checkbox"
                            checked={on}
                            onChange={(e) =>
                              setChecked((c) => ({ ...c, [id]: e.target.checked }))
                            }
                            className="h-3.5 w-3.5 cursor-pointer rounded border-border accent-accent"
                          />
                          <span className="truncate">{opt.label}</span>
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-fg-subtle">
                          {opt.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
