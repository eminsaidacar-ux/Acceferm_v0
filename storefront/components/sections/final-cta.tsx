import { ArrowUpRight, Phone } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

/**
 * FinalCta V3 — editorial magazine close.
 * Giant serif-italic hero, 2-column rationale, dual CTAs.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border-soft py-32 lg:py-48">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                Coda · N°09
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <h2 className="reveal mt-8 font-display text-[56px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg sm:text-[88px] lg:text-[128px]">
              Ouvrez votre
              <br />
              <span className="font-serif-italic font-medium text-accent">
                compte&nbsp;pro
              </span>
              <br />
              en deux minutes.
            </h2>
          </div>

          <aside className="lg:col-span-4 lg:pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
              Ce que ça débloque
            </p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-fg-muted">
              <li className="flex items-start gap-3 border-b border-border-soft pb-3">
                <span className="mt-[7px] h-px w-5 bg-accent" />
                <span>
                  Prix HT par défaut · remise Silver −5 % dès validation SIRET.
                </span>
              </li>
              <li className="flex items-start gap-3 border-b border-border-soft pb-3">
                <span className="mt-[7px] h-px w-5 bg-accent" />
                <span>
                  Historique chantier, facture PDF, re-commande 1-clic, import CSV.
                </span>
              </li>
              <li className="flex items-start gap-3 border-b border-border-soft pb-3">
                <span className="mt-[7px] h-px w-5 bg-accent" />
                <span>
                  Livraison 24h IDF · SAV technique par téléphone · paiement 30j en Gold.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[7px] h-px w-5 bg-accent" />
                <span>
                  Vidéo-assistance Assistéo offerte dès 300 € HT motorisation.
                </span>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <Magnetic strength={0.3}>
                <a
                  href="/compte-pro/nouveau"
                  className="inline-flex w-full items-center justify-between gap-1.5 rounded-full bg-accent px-7 py-4 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
                  data-cursor="hover"
                >
                  Créer mon compte pro
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href="tel:+33184000018"
                className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-border px-7 py-4 text-[14px] text-fg transition hover:border-fg"
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  Parler à un commercial
                </span>
                <span className="font-mono text-[12px] text-fg-muted">
                  01 84 XX XX 18
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
