"use client";

import { Plus } from "lucide-react";
import { usePriceMode } from "@/components/price-mode-context";
import type { Product } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

export function ProductCrossSell({ products }: { products: Product[] }) {
  const { mode } = usePriceMode();
  if (products.length === 0) return null;

  return (
    <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex items-end justify-between pb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Souvent commandé ensemble
            </p>
            <h2 className="mt-3 font-display text-[32px] font-semibold tracking-tight text-fg lg:text-[40px]">
              Les pros ajoutent aussi
            </h2>
          </div>
          <a href="/catalogue/photocellules" className="hidden text-[13px] text-fg-muted transition hover:text-fg md:inline-block">
            Voir la catégorie complète →
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
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
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                  {p.brand}
                </div>
                <h3 className="mt-1.5 text-[14px] font-medium leading-snug text-fg">{p.name}</h3>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[22px] font-semibold leading-none tabular-nums text-fg">
                      {formatPrice(p.priceHT, mode)}
                    </span>
                    <span className="text-[11px] text-fg-muted">€ {mode}</span>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
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
