import { Marquee } from "@/components/ui/marquee";

/**
 * MegaWordmark — transition band giant wordmark.
 * Editorial typography moment that signals shift into the final CTA.
 */
export function MegaWordmark() {
  return (
    <section
      aria-hidden="true"
      className="paper-texture ink-band relative overflow-hidden border-t border-border-soft py-20 lg:py-28"
    >
      {/* Primary kinetic wordmark */}
      <div className="relative">
        <Marquee speed="slow" pauseOnHover fade={false}>
          <span className="wordmark text-bg">ACCEFERM</span>
          <span className="wordmark font-serif-italic font-light text-accent">
            pro.
          </span>
          <span className="wordmark text-bg/90">INDUSTRIE</span>
          <span className="wordmark font-serif-italic font-light text-accent">
            &amp;
          </span>
          <span className="wordmark text-bg">FERMETURE</span>
          <span className="wordmark font-serif-italic font-light text-accent">
            depuis 1978.
          </span>
        </Marquee>
      </div>

      {/* Secondary strip — reverse direction, smaller */}
      <div className="mt-6 border-y border-border/60 bg-black/30 py-3">
        <Marquee speed="medium" direction="right" pauseOnHover fade={false}>
          {[
            "24h · Île-de-France",
            "SAV humain",
            "Paiement 30j pro",
            "Vidéo-assistance Assistéo",
            "2 341 références en stock",
            "124 installateurs actifs",
            "EN 12453 · EN 13241-1",
            "IP65 · IK08",
            "Rolling-code 433 MHz",
          ].map((label) => (
            <span
              key={label}
              className="font-mono text-[12px] uppercase tracking-[0.3em] text-bg/80"
            >
              {label}
              <span className="ml-10 text-accent">●</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
