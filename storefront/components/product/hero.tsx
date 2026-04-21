import { Star } from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail";
import { BuyBox } from "./buy-box";
import { ProductGallery } from "./gallery";

export function ProductHero({ product }: { product: ProductDetail }) {
  return (
    <section className="border-b border-border-soft bg-bg">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery items={product.gallery} alt={product.name} />
          </div>

          {/* Info + buy box */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-bg-elev px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                {product.brand} · {product.origin}
              </span>
              {product.badge && (
                <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-fg">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.015em] text-fg lg:text-[44px]">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3 text-[13px] text-fg-muted">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(product.rating.average)
                        ? "h-3.5 w-3.5 fill-signal-warn text-signal-warn"
                        : "h-3.5 w-3.5 text-fg-faint"
                    }
                  />
                ))}
              </div>
              <span className="font-mono text-[12px] tabular-nums">
                {product.rating.average} · {product.rating.count} avis vérifiés
              </span>
              <span>·</span>
              <span className="font-mono text-[12px] text-fg-muted">
                Réf. {product.slug.toUpperCase().replace(/-/g, "·")}
              </span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
              {product.shortDescription}
            </p>

            {/* Quick specs preview */}
            <ul className="mt-6 grid grid-cols-2 gap-2 text-[12px]">
              {Object.entries(product.specs)
                .slice(0, 4)
                .map(([k, v]) => (
                  <li key={k} className="rounded-lg border border-border-soft bg-bg-elev px-3 py-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                      {k}
                    </div>
                    <div className="mt-0.5 text-fg">{v}</div>
                  </li>
                ))}
            </ul>

            <div className="mt-7">
              <BuyBox product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
