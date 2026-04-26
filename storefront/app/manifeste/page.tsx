import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Manifeste — pourquoi AcceFerm Pro existe",
  description:
    "Le manifeste d'une plateforme d'approvisionnement créée par un atelier terrain pour les installateurs de fermetures automatiques. 7 convictions, pas de slogans.",
};

const CONVICTIONS = [
  {
    n: "1",
    title: "Un atelier qui ouvre une centrale.",
    body:
      "AcceFerm Pro n'a pas été lancé par un marketeur qui a identifié un marché. Il a été lancé par un atelier qui, depuis 15 ans, commandait chez des plateformes obsolètes et se disait chaque soir : si on ne fait pas mieux, personne ne le fera.",
  },
  {
    n: "2",
    title: "Prix HT par défaut, sans honte.",
    body:
      "Nos visiteurs sont des installateurs professionnels. Leur TVA se récupère. Afficher TTC est une concession au B2C qui coûte à tout le monde. Bascule TTC en un clic pour les particuliers.",
  },
  {
    n: "3",
    title: "Un numéro qui décroche, pas un formulaire.",
    body:
      "Quatre numéros distincts : SAV technique, commercial, pose IDF, comptes pros. Chacun répond sous 3 sonneries, 8 h-19 h. Un ancien poseur au bout du fil, pas un call-center offshore.",
  },
  {
    n: "4",
    title: "Pas de dropshipping, pas de slogans creux.",
    body:
      "Tout ce qui est en stock est physiquement dans notre atelier du 95 ou chez nos trois fournisseurs européens référencés. Délais honnêtes. Achat-revente avec stock ou commande fournisseur après vente, jamais de chaîne dropship.",
  },
  {
    n: "5",
    title: "Chaque fiche produit = un conseil d'atelier.",
    body:
      "On ne copie-colle pas la notice fabricant. Chaque fiche inclut les marques compatibles testées, les pièges d'installation vus en chantier, la vraie durée de vie, les pièces de rechange à anticiper.",
  },
  {
    n: "6",
    title: "La modernité technique est une question de respect.",
    body:
      "Site responsive, Core Web Vitals bons, Schema.org partout, paiement 30 jours, vidéo-assistance, ticketing SAV. C'est le minimum décent en 2026 pour respecter le temps d'un professionnel.",
  },
  {
    n: "7",
    title: "On rend visible ce qui doit l'être.",
    body:
      "Numéro SIRET, adresse réelle, équipe, chantiers référencés, avis vérifiés, comptabilité traçable. Un B2B sérieux n'a rien à cacher.",
  },
];

export default function ManifestePage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-sm lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <span className="font-medium text-fg">Manifeste</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Lettre ouverte aux installateurs IDF
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              Sept convictions, aucun slogan.
            </h1>
            <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
              On ne fonde pas une plateforme e-commerce B2B en 2026 sans
              s'expliquer. Voici ce qu'on pense du métier, de ceux qui le font, et
              de ce qu'on doit aux installateurs qui décrochent un rideau
              métallique à sept heures.
            </p>
          </div>
        </section>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <ol className="space-y-12">
              {CONVICTIONS.map((c) => (
                <li key={c.n} className="border-l-2 border-accent pl-6">
                  <p className="text-sm font-medium uppercase tracking-wide text-accent">
                    Conviction {c.n}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-fg">
                    {c.title}
                  </h2>
                  <p className="prose-narrow mt-3 text-base leading-relaxed text-fg-muted">
                    {c.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-16 border-t border-border-soft pt-8">
              <p className="text-sm text-fg-muted">
                Signé · L'équipe IEF &amp; Co — Groslay (95) — 2026
              </p>
              <a
                href="/compte-pro/nouveau"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg btn-soft"
              >
                Créer un compte pro
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
