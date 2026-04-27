import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { img, imagery } from "@/lib/images";

export const metadata: Metadata = {
  title: "À propos — IEF & Co derrière AcceFerm Pro",
  description:
    "15 ans de terrain Île-de-France, serrurerie-métallerie-automatismes. AcceFerm Pro est la division e-commerce d'IEF & Co.",
};

const TIMELINE = [
  { year: "2011", title: "Création IEF & Co", body: "Serrurerie, métallerie, maintenance multi-technique à Groslay (95)." },
  { year: "2016", title: "Contrat bailleurs sociaux IDF", body: "Début des contrats cadres avec trois grands bailleurs du 92/93." },
  { year: "2020", title: "Atelier dédié automatismes", body: "Ouverture d'une cellule spécialisée motorisation portail." },
  { year: "2024", title: "Distribution AFCA / V2 officielle", body: "Signature du contrat distributeur France avec V2 Group." },
  { year: "2026", title: "Lancement AcceFerm Pro", body: "La plateforme e-commerce pro/industrie qu'on aurait voulu avoir." },
];

const VALUES = [
  { t: "Honnêteté technique", b: "On vend ce qu'on pose. On recommande ce qu'on choisirait pour nous-mêmes." },
  { t: "Stock réel", b: "Pas de dropshipping. Le stock affiché est celui de notre atelier 95." },
  { t: "Prix justes", b: "Marge transparente, pas de promo fake, grilles pro automatiques." },
  { t: "SAV humain", b: "Un numéro direct, 8h-19h, un ancien poseur au bout du fil." },
];

export default function AProposPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">À propos · IEF & Co</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Qui opère AcceFerm Pro
            </p>
            <h1 className="mt-5 font-display text-[52px] font-semibold leading-[0.94] tracking-[-0.025em] text-fg lg:text-[96px]">
              IEF & Co · quinze ans
              <br />
              <span className="italic font-medium text-accent">de chantiers IDF.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-fg-muted">
              AcceFerm Pro n'est pas un pure-player parachuté. C'est la division e-commerce d'IEF
              & Co, entreprise terrain de serrurerie, métallerie et maintenance multi-technique
              fondée en 2011 en Île-de-France. On pose, on dépanne, on maintient. Puis on
              vend le matériel qu'on a validé sur 3 000+ chantiers.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl">
                {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                <img
                  src={img(imagery.tools, 900, 1100)}
                  alt=""
                  loading="lazy"
                  className="aspect-[5/6] w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-[36px] font-semibold leading-[1.02] tracking-[-0.02em] text-fg lg:text-[48px]">
                L'histoire · courte version
              </h2>
              <ol className="mt-8 space-y-5">
                {TIMELINE.map((t) => (
                  <li key={t.year} className="flex gap-5 border-t border-border-soft pt-5">
                    <div className="w-20 shrink-0 font-mono text-[14px] font-semibold tabular-nums text-accent">
                      {t.year}
                    </div>
                    <div>
                      <div className="text-[16px] font-semibold text-fg">{t.title}</div>
                      <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="max-w-2xl font-display text-[36px] font-semibold leading-[1.02] tracking-[-0.02em] text-fg lg:text-[56px]">
              Quatre principes qu'on ne négocie pas.
            </h2>
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div
                  key={v.t}
                  className="rounded-2xl border border-border-soft bg-bg p-6"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <div className="mt-4 font-display text-[22px] font-semibold tracking-tight text-fg">
                    {v.t}
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border-soft py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[44px] font-semibold leading-[0.96] tracking-[-0.02em] text-fg lg:text-[72px]">
              Travaillons ensemble.
            </h2>
            <p className="mt-5 text-[15px] text-fg-muted">
              Compte pro gratuit, devis 24h, pose IDF, vidéo-assistance Assistéo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/compte-pro/nouveau"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Créer un compte pro
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[14px] text-fg hover:border-fg"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
