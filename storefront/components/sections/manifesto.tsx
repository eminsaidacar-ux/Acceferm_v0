import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

/**
 * Manifesto — editorial magazine spread.
 * Drop cap, pull-quote, 2-column asymmetric layout, serif mix.
 */
export function Manifesto() {
  return (
    <section
      id="manifeste"
      className="relative overflow-hidden border-t border-border-soft py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Kicker */}
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                Chapitre VIII
              </div>
              <div className="mt-2 chapter-num text-[72px] lg:text-[104px]">
                N°08
              </div>
              <div className="mt-3 font-serif-italic text-[15px] text-fg-muted">
                Le manifeste de l'outsider.
              </div>
              <a
                href="/manifeste"
                className="mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg link-swipe"
              >
                Lire l'intégrale
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <h2 className="font-display text-[56px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg lg:text-[96px]">
              <SplitText text="On n'attend pas" stagger={0.025} />
              <br />
              <span className="italic font-medium text-peach">
                <SplitText text="d'avoir raison." stagger={0.025} delay={0.18} />
              </span>
            </h2>

            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
              <p className="dropcap text-[17px] leading-[1.65] text-fg">
                Il y a dans ce métier des plateformes qui existent depuis 1978. On les respecte.
                On les connaît par cœur — parce qu'on a commandé chez elles pendant quinze ans,
                les soirs où il fallait faire tourner un portail coulissant de 300 kg avant
                huit heures du matin. Elles ont construit ce marché.
              </p>

              <div className="space-y-6 text-[17px] leading-[1.65] text-fg-muted">
                <p>
                  Mais elles n'ont pas bougé depuis une décennie. Encoding windows-1252. Menus
                  qui zooment en pinçant. Copyright figé 2016. Un installateur en Île-de-France
                  a aujourd'hui le droit à mieux qu'un formulaire ASP de 2003 pour commander
                  une paire de photocellules.
                </p>
                <p className="border-l-2 border-accent pl-5 font-serif-italic text-[22px] leading-[1.4] text-fg">
                  AcceFerm Pro n'a pas été créé pour faire mieux qu'eux. Il a été créé pour
                  faire <em>autrement</em> — mobile-first, prix HT par défaut, vidéo-assistance,
                  paiement 30j, et quelqu'un qui décroche vraiment le téléphone.
                </p>
                <p>
                  On est un atelier qui a ouvert une centrale. Pas une centrale qui n'a jamais
                  tenu un tournevis. La différence se sent dès le premier SAV.
                </p>
              </div>
            </div>

            {/* Signature bloc */}
            <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                  Signé
                </div>
                <div className="mt-2 font-serif-italic text-[26px] text-fg">
                  L'équipe IEF & Co.
                </div>
                <div className="mt-1 font-mono text-[11px] text-fg-muted">
                  Cormeilles-en-Parisis · 2026
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="/manifeste"
                  className="inline-flex items-center gap-1.5 rounded-full bg-fg px-6 py-3 text-[13px] font-medium text-bg transition hover:bg-accent"
                  data-cursor="hover"
                >
                  Le manifeste complet
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/a-propos"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[13px] text-fg transition hover:border-fg"
                >
                  L'histoire IEF & Co
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
