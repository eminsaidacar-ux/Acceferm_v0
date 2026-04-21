import { ArrowUpRight } from "lucide-react";
import { img, imagery } from "@/lib/images";

const STATS = [
  { value: "15", label: "années de terrain IDF" },
  { value: "3 000+", label: "installations posées" },
  { value: "24h", label: "expédition IDF garantie" },
] as const;

export function Expertise() {
  return (
    <section className="border-t border-border-soft bg-bg-elev py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl">
              {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
              <img
                src={img(imagery.workshop, 900, 1100)}
                alt="Atelier IEF & Co · outils et matériel d'installation"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fg/80 via-fg/30 to-transparent p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/80">
                  Atelier IEF & Co · Cormeilles-en-Parisis
                </p>
                <p className="mt-2 font-display text-[26px] font-semibold leading-tight text-bg">
                  Expédition J+1
                  <br />
                  depuis le 95.
                </p>
              </div>
            </div>
          </div>

          {/* Copy + stats */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              IEF & Co · derrière AcceFerm Pro
            </p>
            <h2 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
              Quinze ans de chantiers.
              <br />
              <span className="text-accent">Zéro photo bling-bling.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
              AcceFerm Pro est opéré par les équipes terrain d'IEF & Co — serrurerie, métallerie,
              maintenance multi-technique. On connaît les moteurs parce qu'on les pose. On connaît
              les pannes parce qu'on les dépanne.
            </p>

            <a
              href="#assisteo"
              className="mt-8 inline-flex items-center gap-2 border-b border-fg pb-1 text-[14px] font-medium text-fg transition hover:gap-3 hover:text-accent hover:border-accent"
            >
              Vidéo-assistance Assistéo offerte dès 300 € HT motorisation
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-bg p-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-display text-[46px] font-semibold leading-none tracking-tight text-fg lg:text-[64px]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
