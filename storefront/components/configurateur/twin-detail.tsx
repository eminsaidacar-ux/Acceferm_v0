"use client";

import { ArrowRight, X } from "lucide-react";
import { usePriceMode } from "@/components/price-mode-context";
import { topProducts } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import type { TwinHotspot } from "@/lib/twin-schemas";
import { formatPrice } from "@/lib/utils";

const PRODUCT_BY_SLUG = Object.fromEntries(topProducts.map((p) => [p.slug, p]));

/**
 * Panneau de détail composant — affiché à droite du SVG (desktop)
 * ou sous le SVG (mobile). Liste 2-4 références compatibles + CTA catégorie.
 *
 * Composant pur (no state) — l'ouverture est pilotée par TwinExplorer.
 */
export function TwinDetail({
  part,
  onClose,
}: {
  part: TwinHotspot;
  onClose: () => void;
}) {
  const { mode } = usePriceMode();
  const products = part.productSlugs
    .map((slug) => PRODUCT_BY_SLUG[slug])
    .filter((p): p is (typeof topProducts)[number] => Boolean(p));

  return (
    <div
      className="relative rounded-2xl border border-border-soft bg-bg p-5"
      role="region"
      aria-live="polite"
      aria-label={`Détail composant : ${part.label}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer le détail"
        className="absolute right-3 top-3 grid size-12 place-items-center text-fg-muted transition hover:text-fg lg:size-9"
      >
        <X className="size-4" aria-hidden="true" />
      </button>

      <div className="pr-12">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-[12px] font-semibold text-accent-fg">
            {part.number}
          </span>
          <h3 className="font-display text-[20px] font-semibold tracking-tight text-fg">
            {part.label}
          </h3>
        </div>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-fg-muted">
          {part.description}
        </p>
        <p className="mt-1 text-[12px] uppercase tracking-wide text-fg-subtle">
          {part.count} · {part.priceFrom}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {products.slice(0, 4).map((p) => (
            <a
              key={p.slug}
              href={`/produit/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border-soft bg-bg-elev p-3 transition hover:border-accent"
            >
              <div className="relative aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-bg">
                {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash, migration next/image V0.8 */}
                <img
                  src={img(imagery[p.image], 120, 120)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                  {p.brand}
                </div>
                <div className="truncate text-[13px] font-medium text-fg">{p.name}</div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="font-display text-[14px] font-semibold tabular-nums text-accent">
                    {formatPrice(p.priceHT, mode)} €
                  </span>
                  <span className="text-[10px] text-fg-subtle">{mode}</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-accent/30 bg-accent-soft p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
            Sur devis — clause fabricant
          </p>
          <p className="mt-1.5 text-[13px] text-fg">
            Ce composant nécessite un dimensionnement. Devis chiffré sous 24 h ouvrées.
          </p>
          <a
            href="/configurer"
            className="mt-3 inline-flex min-h-12 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
          >
            Demander un devis
          </a>
        </div>
      )}

      <a
        href="/catalogue/photocellules"
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition hover:text-accent-hover"
      >
        Voir toutes les références compatibles
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
