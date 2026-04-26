import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Normes EN 12453, EN 13241-1, IP65 — guide pro",
  description:
    "Le guide des normes pour portes et portails automatisés : EN 12453, EN 13241-1, IP65, IK08, Directive Machines. Ce que dit le texte, ce qu'il impose en copropriété et industrie.",
  alternates: { canonical: "https://acceferm.fr/normes" },
};

const NORMS = [
  {
    code: "EN 12453",
    title: "Sécurité d'usage des portes motorisées",
    scope:
      "Portes industrielles, commerciales et de garage motorisées. Toute porte neuve ou rénovée en 2026 doit s'y conformer.",
    imposed: [
      "Classification en 4 classes d'usage selon utilisateurs et zone.",
      "Photocellules + barres palpeuses redondantes en classe 2+.",
      "Valeurs maximales d'effort mesurables à l'œilleton.",
      "Arrêt d'urgence accessible sans outil.",
    ],
    myth:
      "« Si j'ai une photocellule, je suis conforme. » Non — en classe 2+ (copro, entreprise), la barre palpeuse est obligatoire en plus.",
  },
  {
    code: "EN 13241-1",
    title: "Norme produit des portes industrielles",
    scope:
      "Exigences produit (mécaniques, thermiques, acoustiques, vent) et sécurité. Référence à EN 12453 pour l'usage motorisé.",
    imposed: [
      "Marquage CE obligatoire depuis 2005.",
      "Déclaration de Performance (DoP) fournie par le fabricant.",
      "Essais soufflerie pour portes extérieures > 4 m².",
    ],
    myth:
      "« C'est la norme du fabricant, pas mon problème. » Faux — le poseur vérifie la DoP avant installation et la remet au MOA.",
  },
  {
    code: "IP65",
    title: "Protection contre poussières et eau",
    scope:
      "IP65 = totalement étanche aux poussières + résistant aux jets d'eau. Minimum pour tout équipement extérieur.",
    imposed: [
      "Tests certifiés par laboratoire accrédité (LCIE, TÜV).",
      "Marquage obligatoire sur le produit.",
      "IP65 extérieur exposé · IP54 abrité · IP44 intérieur humide.",
    ],
    myth:
      "« IP65 garantit 10 ans d'étanchéité. » Non — joints vieillissants, contrôle visuel annuel obligatoire.",
  },
  {
    code: "IK08",
    title: "Résistance aux chocs mécaniques",
    scope:
      "IK08 = résiste à un choc de 5 joules. Standard pour équipements publics ou accessibles aux mineurs.",
    imposed: [
      "Norme IEC 62262, tests pendulaires certifiés.",
      "IK08 voie publique · IK10 anti-vandalisme · IK07 privé surveillé.",
    ],
    myth:
      "« IK = IP. » Non — IP étanchéité, IK chocs. Digicode extérieur public = IP65 + IK08 minimum.",
  },
  {
    code: "Directive Machines 2006/42/CE",
    title: "Responsabilité du metteur en service",
    scope:
      "Tout ensemble motorisé complet est une « machine ». Le poseur qui met en service est légalement responsable.",
    imposed: [
      "Déclaration CE d'incorporation pour chaque composant.",
      "Déclaration CE machine complète à la mise en service.",
      "Dossier technique archivé 10 ans.",
    ],
    myth:
      "« Le CE du moteur suffit. » Faux — c'est l'ensemble qui doit être CE. Sans déclaration, responsabilité civile et pénale du poseur.",
  },
];

const CLASSES = [
  { n: "1", title: "Utilisateurs formés · zone privée", req: "Arrêt d'urgence + photocellule recommandée." },
  { n: "2", title: "Utilisateurs formés · zone publique restreinte", req: "Arrêt d'urgence + photocellules + barre palpeuse + feu clignotant." },
  { n: "3", title: "Utilisateurs non formés · zone publique restreinte", req: "Redondance complète (2 dispositifs indépendants)." },
  { n: "4", title: "Utilisateurs non formés · zone publique ouverte", req: "Redondance maximale + audit annuel." },
];

export default function NormesPage() {
  // FAQPage JSON-LD — chaque norme = 1 paire question/réponse
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NORMS.map((n) => ({
      "@type": "Question",
      name: `${n.code} — ${n.title} ?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${n.scope} Mythe à démonter : ${n.myth}`,
      },
    })),
  } as const;

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://acceferm.fr" },
      { "@type": "ListItem", position: 2, name: "Ressources", item: "https://acceferm.fr/ressources" },
      { "@type": "ListItem", position: 3, name: "Normes", item: "https://acceferm.fr/normes" },
    ],
  } as const;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-sm lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <a
              href="/ressources"
              className="text-fg-muted transition hover:text-fg"
            >
              Ressources
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <span className="font-medium text-fg">Normes</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Conformité · EN · CE · IP
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              Les normes, sans le jargon.
            </h1>
            <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
              Ce que dit vraiment le texte pour vous éviter les contrôles de
              conformité ratés en copropriété, les procès en responsabilité, et
              les contrats d'installation mal ficelés. Rédigé par notre bureau
              d'études IEF.
            </p>
          </div>
        </section>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <ol className="space-y-12">
              {NORMS.map((n) => (
                <li
                  key={n.code}
                  className="border-l-2 border-accent pl-6"
                >
                  <p className="text-sm font-medium uppercase tracking-wide text-accent">
                    {n.code}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-fg">
                    {n.title}
                  </h2>
                  <p className="prose-narrow mt-3 text-base leading-relaxed text-fg-muted">
                    {n.scope}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-fg-muted">
                      Ce que la norme impose
                    </p>
                    <ul className="mt-3 space-y-2">
                      {n.imposed.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-base text-fg"
                        >
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-signal-ok"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-md border border-signal-warn/30 bg-signal-warn/5 p-4">
                    <p className="flex items-start gap-2 text-sm text-fg">
                      <AlertTriangle
                        className="mt-0.5 h-4 w-4 shrink-0 text-signal-warn"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-medium">Mythe à démonter :</strong>{" "}
                        {n.myth}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border-soft bg-bg-elev py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              EN 12453 — les 4 classes d'usage en 1 tableau
            </h2>
            <div className="mt-8 overflow-hidden rounded-md border border-border-soft bg-bg">
              <table className="w-full text-left text-base">
                <thead className="bg-bg-elev">
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-border-soft px-4 py-3 text-sm font-semibold text-fg"
                    >
                      Classe
                    </th>
                    <th
                      scope="col"
                      className="border-b border-border-soft px-4 py-3 text-sm font-semibold text-fg"
                    >
                      Usage
                    </th>
                    <th
                      scope="col"
                      className="border-b border-border-soft px-4 py-3 text-sm font-semibold text-fg"
                    >
                      Requis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CLASSES.map((c) => (
                    <tr key={c.n} className="border-b border-border-soft last:border-0">
                      <td className="px-4 py-3 font-display text-xl font-semibold text-accent">
                        {c.n}
                      </td>
                      <td className="px-4 py-3 text-fg">{c.title}</td>
                      <td className="px-4 py-3 text-sm text-fg-muted">
                        {c.req}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              Audit conformité gratuit pour syndics IDF
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-base text-fg-muted">
              Notre bureau d'études audite votre installation sur site
              (75/78/92/93/94/95), rédige le rapport EN 12453 + EN 13241-1, et
              propose un plan d'action chiffré. Audit offert sous 15 jours.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg btn-soft"
            >
              Demander l'audit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
