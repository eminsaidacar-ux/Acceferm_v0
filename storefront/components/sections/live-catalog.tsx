"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { usePriceMode } from "@/components/price-mode-context";
import { topProducts } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { cn, formatPrice } from "@/lib/utils";

type FilterId =
  | "all"
  | "photocellules"
  | "recepteurs"
  | "claviers"
  | "feux"
  | "controle"
  | "pieces";

const FILTERS: Array<{ id: FilterId; label: string; match?: (cat: string) => boolean }> = [
  { id: "all", label: "Tous" },
  { id: "photocellules", label: "Photocellules", match: (c) => /photocell/i.test(c) },
  { id: "recepteurs", label: "Récepteurs", match: (c) => /récepteur|télécomm/i.test(c) },
  { id: "claviers", label: "Claviers", match: (c) => /clavier/i.test(c) },
  { id: "feux", label: "Feux", match: (c) => /feu/i.test(c) },
  { id: "controle", label: "Contrôle accès", match: (c) => /vigik|serrure/i.test(c) },
  { id: "pieces", label: "Pièces", match: (c) => /alimentation|batterie/i.test(c) },
];

/**
 * Best-sellers — 8 produits filtrables.
 */
export function LiveCatalog() {
  const { mode } = usePriceMode();
  const [active, setActive] = useState<FilterId>("all");

  const products = useMemo(() => {
    if (active === "all") return topProducts;
    const f = FILTERS.find((x) => x.id === active);
    if (!f?.match) return topProducts;
    const list = topProducts.filter((p) => f.match!(p.category));
    return list.length > 0 ? list : topProducts;
  }, [active]);

  return (
    <section
      id="best-sellers"
      aria-labelledby="best-title"
      className="border-b border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          id="best-title"
          className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
        >
          Best-sellers du mois
        </h2>
        <p className="mt-3 max-w-2xl text-base text-fg-muted">
          Les références commandées par les pros sur les 30 derniers jours.
        </p>

        {/* Filtres */}
        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          className="mt-8 flex flex-wrap gap-2 text-sm"
        >
          {FILTERS.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setActive(f.id)}
                className={cn(
                  "min-h-11 rounded-full border px-4 transition",
                  on
                    ? "border-fg bg-fg text-bg"
                    : "border-border-soft bg-bg text-fg-muted hover:border-fg hover:text-fg",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <li key={p.id}>
              <a
                href={`/produit/${p.slug}`}
                className="card group flex h-full flex-col overflow-hidden rounded-md border border-border-soft bg-bg"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-elev">
                  <Image
                    src={img(imagery[p.image], 480, 480)}
                    alt={p.name}
                    width={480}
                    height={480}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                  />
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded bg-fg px-2 py-1 text-xs font-medium text-bg">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-xs uppercase tracking-wide text-fg-muted">
                    {p.brand}
                  </p>
                  <h3 className="text-sm font-medium leading-tight text-fg">
                    {p.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      <p className="font-display text-xl font-semibold tabular text-fg">
                        {formatPrice(p.priceHT, mode)} €
                      </p>
                      <p className="text-xs text-fg-muted">
                        {mode} · {p.stockLabel}
                      </p>
                    </div>
                    <span
                      aria-label={`Voir ${p.name}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-border-soft text-fg-muted transition group-hover:border-accent group-hover:text-accent"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
