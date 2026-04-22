import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Headset,
  LifeBuoy,
  UserCheck,
  Video,
} from "lucide-react";
import { serviceBlocks } from "@/lib/data";

const ICONS = {
  devis: FileText,
  conseiller: Headset,
  compte: UserCheck,
  sav: LifeBuoy,
  assisteo: Video,
  catalogue: BookOpen,
} as const;

const HREFS: Record<string, string> = {
  devis: "/configurer",
  conseiller: "/contact",
  compte: "/compte-pro/nouveau",
  sav: "/contact",
  assisteo: "/pose-idf#assisteo",
  catalogue: "/ressources",
};

export function ServicesGrid() {
  return (
    <section className="border-t border-border-soft bg-bg-elev py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Services inclus · compte pro gratuit
          </p>
          <h2 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[60px]">
            Six services pour vous faire
            <br />
            <span className="italic font-medium text-peach">gagner une heure par jour.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {serviceBlocks.map((svc) => {
            const Icon = ICONS[svc.kind];
            return (
              <a
                key={svc.kind}
                href={HREFS[svc.kind] ?? "/contact"}
                className="group flex flex-col gap-5 bg-bg p-7 transition hover:bg-bg-elev"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-bg-elev text-fg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-fg-subtle transition group-hover:text-accent" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-fg">{svc.title}</h3>
                  <p className="mt-1 text-[13px] text-fg-muted">{svc.subtitle}</p>
                </div>
                <div className="border-t border-border-soft pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
                  {svc.bullet}
                </div>
                <div className="text-[13px] font-medium text-accent">{svc.cta} →</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
