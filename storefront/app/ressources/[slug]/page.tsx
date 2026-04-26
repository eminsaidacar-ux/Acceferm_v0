import type { Metadata } from "next";
import { ArrowUpRight, ChevronRight, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { img, imagery } from "@/lib/images";
import {
  categoryLabel,
  getAllResourceSlugs,
  getRelatedResources,
  getResource,
} from "@/lib/ressources";

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return { title: "Ressource introuvable" };
  return { title: r.title, description: r.lede };
}

export default async function ResourceArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  const related = getRelatedResources(r.slug, r.category);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": r.category === "tuto" ? "HowTo" : "Article",
    name: r.title,
    description: r.lede,
    author: { "@type": "Organization", name: r.author },
    datePublished: "2026-03-01",
    dateModified: r.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "AcceFerm Pro",
      parentOrganization: { "@type": "Organization", name: "IEF & Co" },
    },
  } as const;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-4xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <a href="/ressources" className="text-fg-muted transition hover:text-fg">
              Ressources
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="text-fg-muted">{categoryLabel[r.category]}</span>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="truncate font-medium text-fg">{r.title}</span>
          </div>
        </nav>

        {/* Article header */}
        <article>
          <header className="border-b border-border-soft py-14 lg:py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-fg">
                {categoryLabel[r.category]}
              </span>
              <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-fg lg:text-[64px]">
                {r.title}
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed text-fg-muted">{r.lede}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[12px] text-fg-subtle">
                <span className="inline-flex items-center gap-2 uppercase tracking-[0.2em]">
                  <Clock className="h-3.5 w-3.5" />
                  {r.readMinutes} min de lecture
                </span>
                <span className="uppercase tracking-[0.2em]">Maj {r.updatedAt}</span>
                <span>Par {r.author}</span>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Partager
                </button>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="mx-auto max-w-4xl px-6 pt-12 lg:px-8">
            <div className="overflow-hidden rounded-2xl">
              {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
              <img
                src={img(imagery[r.image], 1200, 700)}
                alt=""
                loading="eager"
                className="aspect-[12/7] w-full object-cover"
              />
            </div>
          </div>

          {/* Body with sticky TOC */}
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-14 lg:grid-cols-[1fr_240px] lg:px-8 lg:py-20">
            <div className="prose-like space-y-10">
              {r.sections?.map((section, i) => (
                <section key={section.heading}>
                  <h2
                    id={`s-${i}`}
                    className="font-display text-[28px] font-semibold tracking-tight text-fg lg:text-[34px]"
                  >
                    <span className="mr-3 font-mono text-[18px] font-normal text-fg-subtle">
                      0{i + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.75] text-fg/85">{section.body}</p>
                </section>
              )) ?? (
                <p className="text-[16px] leading-[1.75] text-fg/85">
                  Contenu complet en cours de rédaction par notre équipe technique. Cet article fait
                  partie de notre publication bi-mensuelle. En attendant, contactez notre SAV au 01
                  84 XX XX 17.
                </p>
              )}

              {/* Expert call-out */}
              <aside className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-mono text-[14px] font-semibold text-accent-fg">
                    IEF
                  </span>
                  <div className="flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      Un doute sur votre chantier ?
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg">
                      Vidéo-assistance 20 min offerte dès 300 € HT motorisation. Un ancien poseur
                      AcceFerm se connecte avec vous, regarde votre armoire, valide le branchement.
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent-hover"
                    >
                      Réserver un créneau →
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            {/* Sticky TOC + meta */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6 rounded-2xl border border-border-soft bg-bg-elev p-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                    Table des matières
                  </div>
                  <ol className="mt-3 space-y-2 text-[13px]">
                    {r.sections?.map((section, i) => (
                      <li key={section.heading}>
                        <a
                          href={`#s-${i}`}
                          className="flex gap-2 text-fg-muted transition hover:text-fg"
                        >
                          <span className="font-mono text-fg-subtle">0{i + 1}</span>
                          <span className="flex-1">{section.heading}</span>
                        </a>
                      </li>
                    )) ?? <li className="text-fg-subtle">Article en cours</li>}
                  </ol>
                </div>
                <div className="border-t border-border-soft pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                    Besoin immédiat ?
                  </div>
                  <a
                    href="#numero-a-confirmer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg hover:text-accent"
                  >
                    SAV · 01 XX XX XX XX
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="mb-8 font-display text-[28px] font-semibold tracking-tight text-fg lg:text-[34px]">
                Pour aller plus loin
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((rr) => (
                  <a
                    key={rr.slug}
                    href={`/ressources/${rr.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg transition hover:border-fg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                      <img
                        src={img(imagery[rr.image], 720, 450)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                        {categoryLabel[rr.category]} · {rr.readMinutes} min
                      </div>
                      <h3 className="font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.01em] text-fg">
                        {rr.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-fg transition group-hover:text-accent">
                        Lire
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
