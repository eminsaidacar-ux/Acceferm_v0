"use client";

import { motion } from "motion/react";
import { tickerEntries } from "@/lib/data";

/**
 * LiveRow — strip éditorial minimaliste.
 * Une ligne de commandes récentes IDF qui défile, sans chrome.
 * Remplace l'ancien "Command Center" multi-tuiles.
 */
export function CommandCenter() {
  const items = [...tickerEntries, ...tickerEntries];
  return (
    <section
      aria-label="Activité récente de l'atelier"
      className="border-y border-border-soft bg-bg-elev"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-6 py-3 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Live · Atelier
          </span>
        </div>

        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            className="flex w-max items-center gap-10"
          >
            {items.map((entry, i) => (
              <span
                key={`${entry.id}-${i}`}
                className="flex shrink-0 items-center gap-3 text-[13px]"
              >
                <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
                  {entry.time}
                </span>
                <span className="text-fg-muted">{entry.who}</span>
                <span className="text-fg">·</span>
                <span className="text-fg">{entry.item}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{entry.city}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
