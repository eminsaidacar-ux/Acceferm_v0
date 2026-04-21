"use client";

import { Plus } from "lucide-react";
import { usePriceMode } from "@/components/price-mode-context";
import { topProducts } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

const FILTERS = ["Tous", "Photocellules", "Récepteurs", "Claviers", "Feux", "Contrôle accès", "Pièces"] as const;

export function LiveCatalog() {
  const { mode } = usePriceMode();

  return (
    <section className="border-t border-border-soft py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Best-sellers pros · 30 derniers jours
            </p>
            <h2 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[60px]">
              Ce que les installateurs
              <br />
              <span className="italic font-medium text-peach">commandent en boucle.</span>
            </h2>
          </div>
          <a
            href="/produit/v2-sensiva-photocellules-paire"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition hover:text-accent"
          >
            Voir le top 100 →
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-1.5 text-[13px]">
          {FILTERS.map((f, i) => (
            <button
              type="button"
              key={f}
              className={
                i === 0
                  ? "rounded-full bg-accent px-4 py-1.5 font-medium text-accent-fg"
                  : "rounded-full border border-border px-4 py-1.5 text-fg-muted transition hover:border-fg hover:text-fg"
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
          {topProducts.map((p) => (
            <a
              key={p.id}
              href={`/produit/${p.slug}`}
              className="group flex flex-col bg-bg p-5 transition hover:bg-bg-elev"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-bg-soft">
                {/* biome-ignore lint/performance/noImgElement: plain img for hotlinked Unsplash — no next/image config needed */}
                <img
                  src={img(imagery[p.image], 640, 512)}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-warm px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-fg shadow-md">
                    {p.badge}
                  </span>
                )}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-bg/95 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg backdrop-blur">
                  <span className="inline-block h-1 w-1 rounded-full bg-signal-ok" />
                  {p.stockLabel}
                </span>
              </div>

              <div className="mt-4 flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                    {p.brand}
                  </div>
                  {p.activity && (
                    <div className="font-mono text-[10px] text-fg-subtle">· {p.activity}</div>
                  )}
                </div>
                <h3 className="mt-1.5 text-[14px] font-medium leading-snug text-fg">{p.name}</h3>

                <div className="mt-auto flex items-end justify-between pt-4">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[24px] font-semibold leading-none tabular-nums text-fg">
                        {formatPrice(p.priceHT, mode)}
                      </span>
                      <span className="text-[12px] text-fg-muted">€</span>
                    </div>
                    {p.priceWasHT && (
                      <div className="mt-1 font-mono text-[10px] tabular-nums text-fg-subtle line-through">
                        {formatPrice(p.priceWasHT, mode)} €
                      </div>
                    )}
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                      {mode} · unité
                    </div>
                  </div>
                  <span
                    aria-label={`Voir la fiche ${p.name}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg-muted transition group-hover:border-warm group-hover:bg-warm group-hover:text-warm-fg group-hover:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
