import { Marquee } from "@/components/ui/marquee";

/**
 * BrandStrip — bande de marques distribuées, shape bullets signature IEF & Co.
 * Rend sobre en dessous de la TrustStrip.
 */
const BRANDS: Array<{ name: string; shape: string }> = [
  { name: "V2 · AFCA", shape: "●" },
  { name: "Roger Technology", shape: "▲" },
  { name: "Nice", shape: "■" },
  { name: "Came", shape: "◆" },
  { name: "FAAC", shape: "＋" },
  { name: "BFT", shape: "●" },
  { name: "Beninca", shape: "▲" },
  { name: "Motor Line", shape: "■" },
  { name: "Intégral Système", shape: "◆" },
  { name: "Urmet VIGIK", shape: "＋" },
  { name: "Ditec", shape: "●" },
  { name: "Sommer", shape: "▲" },
  { name: "Cardin", shape: "■" },
  { name: "Cisa", shape: "◆" },
  { name: "Hörmann", shape: "＋" },
];

export function BrandStrip() {
  return (
    <section
      aria-label="Marques distribuées"
      className="border-y border-border-soft bg-bg py-8 lg:py-10"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
            — Marques distribuées · 15 fabricants européens
          </div>
          <a
            href="/marques"
            className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg-muted transition hover:text-fg md:block"
          >
            Voir toutes les marques →
          </a>
        </div>
      </div>

      <Marquee speed="slow" fade pauseOnHover>
        {BRANDS.map((b) => (
          <span
            key={b.name}
            className="flex shrink-0 items-center gap-3 font-mono text-[13px] uppercase tracking-[0.18em] text-fg"
          >
            <span className="text-accent">{b.shape}</span>
            {b.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
