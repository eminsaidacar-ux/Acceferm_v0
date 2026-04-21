import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { categories } from "@/lib/data";
import { img, imagery } from "@/lib/images";

/**
 * Grille dense 12 tuiles catégories — avec visuel thématique par tuile.
 */
export function CategoryGrid() {
  return (
    <section id="categories" className="border-t border-border-soft py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Catalogue · 12 univers
            </p>
            <h2 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
              Tout ce qu'un pro pose,
              <br />
              <span className="italic font-medium text-peach">en stock ou sous 48h.</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition hover:text-accent"
          >
            Voir le catalogue complet
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <TiltCard key={cat.slug} intensity={4} scale={1.015} className="rounded-2xl">
            <a
              href={`#${cat.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg shadow-[0_2px_8px_-4px_rgba(42,36,30,0.08)] transition hover:border-accent hover:shadow-[0_16px_40px_-20px_rgba(168,62,30,0.3)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                <img
                  src={img(imagery[cat.image], 640, 360)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                {cat.accent && (
                  <div className="absolute inset-0 bg-accent/60 mix-blend-multiply" />
                )}
                <span
                  className={[
                    "absolute left-4 top-4 font-display text-4xl leading-none",
                    cat.accent ? "text-accent-fg" : "text-bg",
                  ].join(" ")}
                >
                  {cat.glyph}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <h3 className="text-[15px] font-medium leading-tight text-fg">{cat.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-bg-elev px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted">
                    {cat.count}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-fg">
                    {cat.priceFrom}
                    <ArrowRight className="h-3 w-3 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </span>
                </div>
              </div>
            </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
