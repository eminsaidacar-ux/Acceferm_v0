"use client";

import { Flame, Plus } from "lucide-react";
import { usePriceMode } from "@/components/price-mode-context";
import { promotions } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

export function Promotions() {
  const { mode } = usePriceMode();

  return (
    <section className="border-t border-border-soft bg-bg-elev py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-warm">
              <Flame className="h-3.5 w-3.5" />
              Promotions fournisseur · semaine 16
            </p>
            <h2 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[60px]">
              Jusqu'à <span className="italic font-medium text-accent">−55 %</span> sur les
              <br />
              références pros du moment.
            </h2>
          </div>
          <a
            href="/catalogue/photocellules"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition hover:text-accent"
          >
            Voir toutes les promos →
          </a>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {promotions.map((p) => {
            const pct = p.priceWasHT
              ? Math.round(((p.priceWasHT - p.priceHT) / p.priceWasHT) * 100)
              : 0;
            return (
              <a
                key={p.id}
                href={`/produit/${p.slug}`}
                className="group flex flex-col bg-bg p-5 transition hover:bg-bg-elev"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-bg-soft">
                  {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                  <img
                    src={img(imagery[p.image], 640, 512)}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-warm px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-fg shadow-md">
                    −{pct} %
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-bg/95 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg backdrop-blur">
                    Stock limité
                  </span>
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                    {p.brand}
                  </div>
                  <h3 className="mt-1.5 text-[14px] font-medium leading-snug text-fg">
                    {p.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-[24px] font-semibold leading-none tabular-nums text-warm">
                          {formatPrice(p.priceHT, mode)}
                        </span>
                        <span className="text-[12px] text-fg-muted">€</span>
                      </div>
                      {p.priceWasHT && (
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="font-mono text-[11px] tabular-nums text-fg-subtle line-through">
                            {formatPrice(p.priceWasHT, mode)} €
                          </span>
                          <span className="font-mono text-[10px] uppercase text-fg-muted">
                            {mode}
                          </span>
                        </div>
                      )}
                    </div>
                    <span
                      aria-label={`Voir la fiche ${p.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-fg text-accent-fg transition group-hover:bg-accent"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
