"use client";

import { Plus } from "lucide-react";
import { usePriceMode } from "@/components/price-mode-context";
import type { Product } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

export function CatalogueProductGrid({ products }: { products: Product[] }) {
  const { mode } = usePriceMode();

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
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
            {p.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-fg">
                {p.badge}
              </span>
            )}
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-bg/95 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg backdrop-blur">
              <span className="inline-block h-1 w-1 rounded-full bg-signal-ok" />
              {p.stockLabel}
            </span>
          </div>

          <div className="mt-4 flex flex-1 flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
              {p.brand} · {p.origin}
            </div>
            <h3 className="mt-1.5 text-[14px] font-medium leading-snug text-fg">{p.name}</h3>
            <div className="mt-auto flex items-end justify-between pt-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[22px] font-semibold leading-none tabular-nums text-fg">
                    {formatPrice(p.priceHT, mode)}
                  </span>
                  <span className="text-[11px] text-fg-muted">€ {mode}</span>
                </div>
                {p.priceWasHT && (
                  <div className="mt-1 font-mono text-[10px] tabular-nums text-fg-subtle line-through">
                    {formatPrice(p.priceWasHT, mode)} €
                  </div>
                )}
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                <Plus className="h-4 w-4" />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
