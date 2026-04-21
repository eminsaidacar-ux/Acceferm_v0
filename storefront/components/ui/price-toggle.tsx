"use client";

import { usePriceMode } from "@/components/price-mode-context";
import { cn } from "@/lib/utils";

export function PriceToggle({ className }: { className?: string }) {
  const { mode, setMode } = usePriceMode();
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-bg p-0.5 font-mono text-[11px]",
        className,
      )}
      role="radiogroup"
      aria-label="Affichage des prix"
    >
      {(["HT", "TTC"] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          className={cn(
            "rounded-full px-2.5 py-1 transition",
            mode === m
              ? "bg-fg text-accent-fg"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
