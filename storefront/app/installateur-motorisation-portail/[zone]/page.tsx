import type { Metadata } from "next";
import { CheckCircle2, ChevronRight, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { getAllZoneSlugs, getZone } from "@/lib/local-zones";
import { img, imagery } from "@/lib/images";

export async function generateStaticParams() {
  return getAllZoneSlugs().map((zone) => ({ zone }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zone: string }>;
}): Promise<Metadata> {
  const { zone } = await params;
  const z = getZone(zone);
  if (!z) return { title: "Zone introuvable" };
  return {
    title: `${z.title} · IEF & Co`,
    description: `Pose, dépannage, maintenance de motorisations portail dans le ${z.department_num} ${z.department}. 15 ans de terrain, devis 24h.`,
  };
}

export default async function LocalZonePage({
  params,
}: {
  params: Promise<{ zone: string }>;
}) {
  const { zone } = await params;
  const z = getZone(zone);
  if (!z) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `IEF & Co — ${z.department}`,
    description: `Installateur motorisation portail ${z.department} (${z.department_num}) — opérateur AcceFerm Pro`,
    address: {
      "@type": "PostalAddress",
      addressLocality: z.citiesTop[0],
      addressRegion: "Île-de-France",
      postalCode: `${z.department_num}000`,
      addressCountry: "FR",
    },
    areaServed: z.citiesTop,
    telephone: "+33-1-84-00-00-19",
  } as const;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="text-fg-muted">Installateurs IDF</span>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">
              {z.department} ({z.department_num})
            </span>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border-soft">
          <div className="absolute inset-0">
            {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
            <img
              src={img(imagery[z.image], 1800, 800)}
              alt=""
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/30" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              <MapPin className="mr-1 inline h-3 w-3" />
              {z.department} · Île-de-France
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg lg:text-[88px]">
              {z.title}.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">{z.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
              >
                Devis pose sous 24h
              </a>
              <a
                href="tel:+33184000019"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[14px] text-fg transition hover:border-fg"
              >
                <Phone className="h-4 w-4" />
                01 84 XX XX 19
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden bg-border-soft px-0 sm:grid-cols-3">
            {z.stats.map((s) => (
              <div key={s.label} className="bg-bg p-8">
                <div className="font-display text-[44px] font-semibold leading-none tracking-tight text-fg">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Zones d'intervention
                </p>
                <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.02] tracking-[-0.02em] text-fg lg:text-[48px]">
                  Les villes où nos poseurs
                  <br />
                  <span className="italic font-medium text-peach">passent chaque semaine.</span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
                  Liste non exhaustive. Si votre commune n'apparaît pas, on intervient quand même
                  — appelez simplement le 01 84 XX XX 19 pour un devis.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2">
                  {z.citiesTop.map((c) => (
                    <div
                      key={c}
                      className="flex items-center justify-between gap-3 bg-bg p-5"
                    >
                      <div>
                        <div className="text-[15px] font-medium text-fg">{c}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                          {z.department_num} · pose · dépannage · maintenance
                        </div>
                      </div>
                      <MapPin className="h-4 w-4 text-fg-subtle" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Pose complète", d: "Motorisation + accessoires + mise en service testée." },
                { t: "Dépannage SAV", d: "Photocellules, cartes, récepteurs, télécommandes." },
                { t: "Contrat maintenance", d: "Visite annuelle + pièces d'usure + SLA 48h." },
                { t: "Audit conformité", d: "EN 12453 + PMR pour copropriétés et bailleurs." },
              ].map((s) => (
                <div
                  key={s.t}
                  className="rounded-2xl border border-border-soft bg-bg p-5"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <div className="mt-3 text-[15px] font-semibold text-fg">{s.t}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <div>
                <p className="font-display text-[22px] font-semibold text-fg">
                  Un devis pose <em>sous 24h</em> pour le {z.department_num}.
                </p>
                <p className="mt-1 text-[13px] text-fg-muted">
                  On vient voir le portail, on vous remet un chiffrage honnête. Gratuit, sans
                  engagement.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Demander le devis
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
