import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Comparatif des centrales d'achat fermetures pro",
  description:
    "Critères techniques pour choisir une centrale d'achat de fermetures automatiques en 2026 : responsive, Schema.org, SAV, paiement 30 j, vidéo-assistance, fiches produit.",
  alternates: { canonical: "https://acceferm.fr/comparatif-centrales-achat" },
};

type Row = {
  criterion: string;
  acceferm: string;
  legacy: string;
  advantageAcceferm: boolean;
};

/**
 * Comparatif neutre — sans nommer de concurrent par marque.
 *
 * Formulations génériques :
 * - "Plateformes installées depuis les années 80"
 * - "Centrales d'achat historiques"
 * - "Acteurs e-commerce de génération antérieure"
 *
 * Pas de dénigrement. Faits techniques uniquement.
 */
const ROWS: Row[] = [
  {
    criterion: "Mobile-first & responsive",
    acceferm: "Mobile-first natif · RGAA 2.2 AA visé",
    legacy: "Souvent fixed-width desktop · zoom manuel mobile",
    advantageAcceferm: true,
  },
  {
    criterion: "Stack technique",
    acceferm: "Next.js 15, React 19, Tailwind v4 (2026)",
    legacy: "CMS e-commerce SaaS années 2010, jQuery legacy fréquent",
    advantageAcceferm: true,
  },
  {
    criterion: "SEO Schema.org",
    acceferm: "Product · Organization · LocalBusiness · BreadcrumbList · FAQPage",
    legacy: "Données structurées partielles ou absentes",
    advantageAcceferm: true,
  },
  {
    criterion: "Prix HT par défaut",
    acceferm: "HT par défaut · bascule HT/TTC persistante côté utilisateur",
    legacy: "Variable selon plateforme — souvent TTC en tunnel d'achat",
    advantageAcceferm: true,
  },
  {
    criterion: "Espace pro digital",
    acceferm: "Historique chantiers · factures PDF · re-commande 1-clic",
    legacy: "Souvent un simple formulaire de devis générique",
    advantageAcceferm: true,
  },
  {
    criterion: "Paiement 30 jours à terme",
    acceferm: "Compte Pro Gold validé · automatisé",
    legacy: "Rare en self-service, généralement sur demande commerciale",
    advantageAcceferm: true,
  },
  {
    criterion: "Fiche produit",
    acceferm: "Galerie · spécifications · compatibilités · notices PDF",
    legacy: "Photo unique fréquente, description courte",
    advantageAcceferm: true,
  },
  {
    criterion: "Configurateur motorisation",
    acceferm: "5 questions guidées · 3 kits chiffrés · devis 24 h",
    legacy: "Formulaire de demande de devis générique",
    advantageAcceferm: true,
  },
  {
    criterion: "Vidéo-assistance pose",
    acceferm: "Offerte au-delà d'un seuil · 20 min visio technicien",
    legacy: "Service rare sur ce segment",
    advantageAcceferm: true,
  },
  {
    criterion: "Hub éditorial SEO",
    acceferm: "Guides techniques · diagnostics · pages locales IDF",
    legacy: "Contenu éditorial souvent absent ou figé",
    advantageAcceferm: true,
  },
  {
    criterion: "Profondeur catalogue",
    acceferm: "~200 références au lancement, montée à 1 500 en 12 mois",
    legacy: "Souvent 5 000+ références multi-marques (héritage long)",
    advantageAcceferm: false,
  },
  {
    criterion: "Ancienneté de la marque",
    acceferm: "AcceFerm Pro lancé en 2026 · adossé à IEF & Co (15 ans)",
    legacy: "Acteurs historiques fondés dans les années 70-80",
    advantageAcceferm: false,
  },
];

const ADV_COUNT = ROWS.filter((r) => r.advantageAcceferm).length;

export default function ComparatifPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav
          aria-label="Fil d'Ariane"
          className="border-b border-border-soft bg-bg-elev"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-sm lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <span className="font-medium text-fg">Comparatif</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Critères techniques · sans dénigrement
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              AcceFerm Pro vs centrales d'achat historiques
            </h1>
            <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
              Comparaison factuelle d'une plateforme moderne (AcceFerm Pro,
              lancée en 2026) face aux centrales d'achat historiques du secteur
              fermeture automatique en France. Les chiffres concernent la
              technologie, pas les personnes — les acteurs en place ont notre
              respect, ils ont construit ce marché.
            </p>

            <p className="mt-8 inline-flex items-center gap-2 rounded-md bg-bg-elev px-4 py-2 text-sm text-fg">
              <strong className="font-semibold tabular text-accent">
                {ADV_COUNT} / {ROWS.length}
              </strong>
              critères en faveur de la modernisation
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-md border border-border-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg-elev">
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-border-soft px-4 py-3 text-xs font-semibold uppercase tracking-wide text-fg-muted"
                    >
                      Critère
                    </th>
                    <th
                      scope="col"
                      className="border-b border-l border-border-soft px-4 py-3 text-xs font-semibold uppercase tracking-wide text-accent"
                    >
                      AcceFerm Pro (2026)
                    </th>
                    <th
                      scope="col"
                      className="border-b border-l border-border-soft px-4 py-3 text-xs font-semibold uppercase tracking-wide text-fg-muted"
                    >
                      Plateformes historiques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr
                      key={r.criterion}
                      className="border-b border-border-soft last:border-0"
                    >
                      <td className="px-4 py-4 align-top font-medium text-fg">
                        {r.criterion}
                      </td>
                      <td
                        className={
                          r.advantageAcceferm
                            ? "border-l border-border-soft bg-accent/5 px-4 py-4 align-top"
                            : "border-l border-border-soft px-4 py-4 align-top"
                        }
                      >
                        <div className="flex items-start gap-2">
                          {r.advantageAcceferm ? (
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-px w-3 bg-fg-muted"
                            />
                          )}
                          <span className="text-fg">{r.acceferm}</span>
                        </div>
                      </td>
                      <td className="border-l border-border-soft px-4 py-4 align-top">
                        <div className="flex items-start gap-2">
                          {!r.advantageAcceferm ? (
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-fg"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-px w-3 bg-fg-muted"
                            />
                          )}
                          <span className="text-fg-muted">{r.legacy}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-center text-sm text-fg-muted">
              Comparatif basé sur l'observation technique du marché français —
              avril 2026. Les plateformes évoluent, ce tableau est révisé
              trimestriellement.
            </p>
          </div>
        </section>

        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Essayez sans engagement
            </h2>
            <p className="prose-narrow mx-auto mt-4 text-base text-fg-muted">
              Compte pro gratuit, validation SIRET en 2 h, prix HT visibles dès
              connexion, expédition 24 h IDF, SAV humain. Si vous repassez à
              l'ancien monde, on prend ça comme un feedback constructif.
            </p>
            <a
              href="/compte-pro/nouveau"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg btn-soft"
            >
              Créer un compte pro
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
