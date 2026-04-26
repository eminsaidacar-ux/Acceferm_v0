import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { categories } from "@/lib/data";
import { img, imagery } from "@/lib/images";

/**
 * Grille catalogue — 12 univers pros.
 * Visuels homogènes, sans tilt 3D, sans accent décoratif. Une carte = un lien
 * vers la page catégorie. Cliquable mobile (zone tactile complète).
 */
export function CategoryGrid() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="border-b border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2
            id="categories-title"
            className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            Nos 12 univers pros
          </h2>
          <a
            href="/catalogue/photocellules"
            className="hidden items-center gap-1 text-sm font-medium text-fg link-underline sm:inline-flex"
          >
            Voir tout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <a
                href={`/catalogue/${cat.slug}`}
                className="card group flex h-full flex-col overflow-hidden rounded-md border border-border-soft bg-bg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-elev">
                  <Image
                    src={img(imagery[cat.image], 480, 360)}
                    alt=""
                    width={480}
                    height={360}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-base font-medium leading-tight text-fg">
                    {cat.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="text-fg-muted">{cat.count}</span>
                    <span className="font-medium text-fg group-hover:text-accent">
                      {cat.priceFrom}
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
