import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { img, imagery } from "@/lib/images";
import { categoryLabel, resources, type ResourceCategory } from "@/lib/ressources";

export const metadata: Metadata = {
  title: "Ressources — Guides, diagnostics, tutos",
  description:
    "Rédigés par des poseurs, pas par des marketeurs. Guides d'achat, diagnostics, tutoriels, normes, annuaire installateurs IDF.",
};

const FILTERS: Array<ResourceCategory | "all"> = [
  "all",
  "guide",
  "diagnostic",
  "tuto",
  "conformite",
  "local",
];

export default function RessourcesHub() {
  const featured = resources.find((r) => r.featured) ?? resources[0];
  const others = resources.filter((r) => r.slug !== featured.slug);

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        {/* Hub header */}
        <section className="border-b border-border-soft">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Ressources AcceFerm Pro · rédigées par des poseurs
                </p>
                <h1 className="mt-5 font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg lg:text-[80px]">
                  Les guides techniques
                  <br />
                  <span className="italic font-medium text-peach">qu'un installateur écrirait.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                  Pas de blabla marketing, pas de SEO copié. Chaque article est rédigé par les
                  équipes IEF & Co, mis à jour après chaque chantier où on a cassé quelque chose.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <p className="mt-3 text-[14px] leading-relaxed text-fg">
                    <strong className="font-medium">{resources.length} ressources</strong>{" "}
                    publiques, accessibles sans compte. Mises à jour mensuelles. Newsletter pro 1× /
                    mois — sans spam.
                  </p>
                  <form className="mt-4 flex items-center gap-2 rounded-full border border-border bg-bg px-1 py-1">
                    <input
                      type="email"
                      placeholder="votre@email.fr"
                      className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-medium text-accent-fg transition hover:bg-accent-hover"
                    >
                      S'inscrire
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-12 flex flex-wrap items-center gap-2 text-[13px]">
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
                  {f === "all" ? "Tout" : categoryLabel[f]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              À la une
            </p>
            <a
              href={`/ressources/${featured.slug}`}
              className="group grid gap-8 overflow-hidden rounded-3xl border border-border bg-bg transition hover:border-fg lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                <img
                  src={img(imagery[featured.image], 1200, 800)}
                  alt=""
                  loading="eager"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-fg">
                  {categoryLabel[featured.category]}
                </span>
                <h2 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[48px]">
                  {featured.title}
                </h2>
                <p className="max-w-xl text-[15px] leading-relaxed text-fg-muted">{featured.lede}</p>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {featured.readMinutes} min
                  </span>
                  <span>Mis à jour {featured.updatedAt}</span>
                  <span>Par {featured.author}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                  Lire le guide complet
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* All resources grid */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((r) => (
                <a
                  key={r.slug}
                  href={`/ressources/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg transition hover:border-fg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                    <img
                      src={img(imagery[r.image], 720, 450)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-bg/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fg backdrop-blur">
                      {categoryLabel[r.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-fg">
                      {r.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-fg-muted">{r.lede}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                      <span>{r.readMinutes} min · {r.updatedAt.split(" ").slice(0, 2).join(" ")}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
