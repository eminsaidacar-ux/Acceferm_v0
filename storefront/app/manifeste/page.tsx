import type { Metadata } from "next";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { SplitText } from "@/components/ui/split-text";

export const metadata: Metadata = {
  title: "Manifeste — pourquoi AcceFerm Pro existe",
  description:
    "Le manifeste d'une plateforme d'approvisionnement créée par un atelier terrain pour les installateurs de fermetures automatiques. 7 convictions, pas de slogans.",
};

const CONVICTIONS = [
  {
    n: "I",
    title: "Un atelier qui ouvre une centrale.",
    body:
      "AcceFerm Pro n'a pas été lancé par un marketeur qui a identifié un marché. Il a été lancé par un atelier qui, depuis 15 ans, commandait chez des plateformes obsolètes et se disait chaque soir : si on ne fait pas mieux, personne ne le fera. La différence se sent dès le premier SAV.",
  },
  {
    n: "II",
    title: "Prix HT par défaut, sans honte.",
    body:
      "Nos visiteurs sont des installateurs professionnels. Leur TVA se récupère. Afficher TTC est une concession au B2C qui coûte à tout le monde. Nous affichons HT par défaut, bascule TTC en un clic. Les particuliers suffisamment sérieux comprennent instantanément à qui ils ont affaire.",
  },
  {
    n: "III",
    title: "Un numéro qui décroche, pas un formulaire.",
    body:
      "Quatre numéros distincts : SAV technique, commercial, pose IDF, comptes pro. Chacun répond sous 3 sonneries, 8h-19h. Un ancien poseur au bout du fil, pas un call-center offshore. Un ticket ouvert c'est un chantier bloqué — on le traite comme tel.",
  },
  {
    n: "IV",
    title: "Pas de dropshipping, pas de slogans écologiques creux.",
    body:
      "Tout ce qui est en stock est physiquement dans notre atelier du 95 ou chez nos trois fournisseurs européens référencés. Délais honnêtes, pas de miracle chinois. Conformité religieuse : achat-revente avec stock ou commande fournisseur après vente, jamais de chaîne dropship.",
  },
  {
    n: "V",
    title: "Chaque fiche produit = un conseil d'atelier.",
    body:
      "On ne copie-colle pas la notice fabricant. Chaque fiche inclut ce qu'un installateur veut vraiment : les marques compatibles testées, les pièges d'installation vus en chantier, la vraie durée de vie, les pièces de rechange à anticiper. Si la fiche n'apporte rien qu'une brochure, elle n'existe pas.",
  },
  {
    n: "VI",
    title: "La modernité technique est une question de respect.",
    body:
      "Un site responsive, Core Web Vitals bon, Schema.org partout, paiement 30j, vidéo-assistance, ticketing SAV : ce ne sont pas des gadgets. C'est le minimum décent en 2026 pour respecter le temps d'un professionnel. Les incumbents qui ne bougent pas depuis 2011 ne respectent pas leurs propres clients.",
  },
  {
    n: "VII",
    title: "On rend visible ce qui doit l'être.",
    body:
      "Numéro SIRET, adresse réelle, équipe, chantiers référencés, avis vérifiés, comptabilité traçable. Un B2B sérieux n'a rien à cacher. Les « marques blanches » anonymes qui vendent du matériel critique pour la sécurité d'un immeuble ne devraient pas exister.",
  },
];

export default function ManifestePage() {
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
            <span className="font-medium text-fg">Manifeste</span>
          </div>
        </nav>

        {/* Hero — editorial cover */}
        <section className="paper-texture grain relative overflow-hidden border-b border-border-soft py-20 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <aside className="lg:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                  Issue · 01 · Printemps 2026
                </div>
                <div className="mt-4 chapter-num text-[120px] leading-none lg:text-[180px]">
                  N°08
                </div>
                <div className="mt-4 font-serif-italic text-[16px] text-fg-muted">
                  Le manifeste.
                </div>
              </aside>

              <div className="lg:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  Lettre ouverte aux installateurs IDF
                </p>
                <h1 className="mt-6 font-display text-[60px] font-semibold leading-[0.9] tracking-[-0.028em] text-fg sm:text-[92px] lg:text-[128px]">
                  <SplitText text="Sept convictions," stagger={0.025} />
                  <br />
                  <span className="font-serif-italic text-accent">
                    <SplitText text="aucun slogan." stagger={0.025} delay={0.25} />
                  </span>
                </h1>
                <p className="mt-10 max-w-2xl text-[18px] leading-[1.55] text-fg-muted">
                  On ne fonde pas une plateforme e-commerce B2B en 2026 sans s'expliquer. Voici
                  ce qu'on pense du métier, de ceux qui le font, et de ce qu'on doit à ces
                  installateurs qui, chaque matin, décrochent un rideau métallique à sept heures
                  et repartent chez le suivant en klaxonnant doucement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kinetic band */}
        <Marquee speed="slow" fade={false} className="bg-bg-elev py-5 border-b border-border-soft">
          {[
            "Prix HT par défaut",
            "SAV qui décroche",
            "Stock réel 95",
            "Paiement 30j pro",
            "Vidéo-assistance",
            "Sans dropshipping",
            "Sans marques blanches",
            "Sans formulaires ASP 2003",
          ].map((k) => (
            <span
              key={k}
              className="font-serif-italic text-[28px] text-fg lg:text-[40px]"
            >
              {k}
              <span className="mx-5 text-accent">·</span>
            </span>
          ))}
        </Marquee>

        {/* Convictions — numbered editorial list */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            <ol className="grid gap-px bg-border-soft lg:grid-cols-2">
              {CONVICTIONS.map((c) => (
                <li
                  key={c.n}
                  className="reveal group flex flex-col gap-5 bg-bg p-8 lg:p-14"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-serif-italic text-[48px] leading-none text-accent lg:text-[72px]">
                      {c.n}.
                    </span>
                    <h2 className="font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg lg:text-[36px]">
                      {c.title}
                    </h2>
                  </div>
                  <p className="max-w-prose text-[15px] leading-[1.65] text-fg-muted lg:text-[16px]">
                    {c.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pull-quote band */}
        <section className="border-y border-border-soft bg-bg-elev py-24 lg:py-36">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-subtle">
              Épilogue
            </p>
            <blockquote className="mt-8 font-serif-italic text-[40px] font-medium leading-[1.1] tracking-[-0.015em] text-fg lg:text-[72px]">
              « Si tout cela paraît{" "}
              <span className="italic font-medium text-peach">évident</span>, tant mieux.
              C'est que le métier a bougé. »
            </blockquote>
            <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-fg-muted">
              L'équipe IEF & Co · Cormeilles-en-Parisis · 2026
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[64px]">
              Rejoignez-nous côté pros.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              Validation SIRET &lt; 2h ouvrées. Première commande 24h. Pas d'engagement, pas d'abonnement.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.3}>
                <a
                  href="/compte-pro/nouveau"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-7 py-3.5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
                >
                  Créer un compte pro
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-7 py-3.5 text-[14px] text-fg transition hover:border-fg"
              >
                Parler à l'équipe
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
