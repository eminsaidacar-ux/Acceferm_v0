import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, ChevronRight, ScrollText, Shield } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Normes EN 12453, EN 13241-1, IP65 — le guide pro",
  description:
    "Le guide des normes de sécurité pour portes et portails automatisés : EN 12453, EN 13241-1, IP65, IK08, CE. Ce que dit vraiment le texte, ce qu'il impose en copropriété et en industrie.",
};

const NORMS = [
  {
    code: "EN 12453",
    title: "Sécurité d'usage des portes motorisées",
    scope:
      "Portes industrielles, commerciales et de garage motorisées. Toute porte neuve ou rénovée en 2026 doit s'y conformer.",
    imposed: [
      "Classification en 4 classes d'usage selon utilisateurs et zone (privée/publique).",
      "Mesures anti-écrasement : photocellules + barres palpeuses redondantes en classe 2+.",
      "Valeurs maximales d'effort dynamique et statique mesurables à l'œilleton.",
      "Arrêt d'urgence accessible sans outil.",
    ],
    myth:
      "Le mythe : « si j'ai une photocellule, je suis conforme ». Non — en classe 2+ (copro, entreprise), la barre palpeuse est obligatoire en plus.",
  },
  {
    code: "EN 13241-1",
    title: "Norme produit des portes industrielles",
    scope:
      "Couvre les exigences produit (mécaniques, thermiques, acoustiques, résistance au vent) ET la sécurité. Elle fait référence à EN 12453 pour l'usage motorisé.",
    imposed: [
      "Marquage CE obligatoire sur toute porte industrielle depuis 2005.",
      "Déclaration de Performance (DoP) fournie par le fabricant.",
      "Essais type soufflerie pour portes extérieures > 4 m².",
      "Étiquetage avec classe d'usage et charges admissibles.",
    ],
    myth:
      "Le mythe : « c'est la norme du fabricant, pas mon problème ». Faux — le poseur est tenu de vérifier la DoP avant installation et de la remettre au maître d'ouvrage.",
  },
  {
    code: "IP65",
    title: "Protection contre poussières et projections d'eau",
    scope:
      "Indice de protection mécanique. IP65 = totalement étanche aux poussières (6) + résistant aux jets d'eau toutes directions (5). Standard minimum pour tout équipement extérieur.",
    imposed: [
      "Tests certifiés par laboratoire accrédité (LCIE, TÜV).",
      "Marquage obligatoire sur le produit.",
      "IP65 = extérieur exposé · IP54 = extérieur abrité · IP44 = intérieur humide.",
    ],
    myth:
      "Le mythe : « IP65 garantit 10 ans d'étanchéité ». Non — un joint vieillit, l'étanchéité se dégrade en 3-5 ans selon l'UV. Contrôle visuel annuel obligatoire sur claviers, photocellules, interphones extérieurs.",
  },
  {
    code: "IK08",
    title: "Résistance aux chocs mécaniques",
    scope:
      "Indice de protection contre les chocs. IK08 = résiste à un choc de 5 joules (ex : marteau 500 g tombant de 1 m). Standard pour équipements publics ou accessibles aux mineurs.",
    imposed: [
      "Norme IEC 62262.",
      "Tests pendulaires certifiés.",
      "IK08 = voie publique · IK10 = vandalisme · IK07 = privé surveillé.",
    ],
    myth:
      "Le mythe : « IK = IP ». Non — IP mesure l'étanchéité, IK mesure la résistance aux chocs. Un digicode extérieur public a besoin des deux : IP65 + IK08 minimum.",
  },
  {
    code: "Directive Machines 2006/42/CE",
    title: "Responsabilité du « metteur en service »",
    scope:
      "Tout ensemble motorisé complet (moteur + portail + accessoires) est considéré comme une « machine ». Le poseur qui met en service est légalement responsable.",
    imposed: [
      "Déclaration CE d'incorporation pour chaque composant.",
      "Déclaration CE machine complète à la mise en service (rédigée par le poseur).",
      "Dossier technique archivé 10 ans.",
      "Marquage CE visible sur l'ensemble.",
    ],
    myth:
      "Le mythe : « le CE du moteur suffit ». Faux — c'est l'ensemble qui doit être CE. Le poseur qui ne produit pas sa déclaration engage sa responsabilité civile et pénale en cas d'accident.",
  },
];

const CLASSES = [
  {
    n: "1",
    title: "Utilisateurs formés · zone privée",
    ex: "Pavillon individuel, copropriétaire ayant reçu la notice.",
    req: "Arrêt d'urgence + photocellule recommandée.",
  },
  {
    n: "2",
    title: "Utilisateurs formés · zone publique restreinte",
    ex: "Copropriété fermée, parking entreprise avec badge.",
    req: "Arrêt d'urgence + photocellules + barre palpeuse + feu clignotant.",
  },
  {
    n: "3",
    title: "Utilisateurs non formés · zone publique restreinte",
    ex: "Entreprise sans badge, accès livreur.",
    req: "Redondance complète (2 dispositifs indépendants de sécurité).",
  },
  {
    n: "4",
    title: "Utilisateurs non formés · zone publique ouverte",
    ex: "Centre commercial, hôpital, ERP, gare.",
    req: "Redondance maximale + surveillance continue + audit annuel.",
  },
];

export default function NormesPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">Accueil</a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <a href="/ressources" className="text-fg-muted transition hover:text-fg">Ressources</a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Normes</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-muted">
              Conformité · EN · CE · IP
            </p>
            <h1 className="mt-6 font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg lg:text-[96px]">
              Les normes,
              <br />
              <span className="font-serif-italic text-accent">sans le jargon.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] leading-[1.65] text-fg-muted">
              Ce que dit vraiment le texte pour vous éviter les mauvaises surprises d'un contrôle
              de conformité en copropriété, les procès en responsabilité civile, et les contrats
              d'installation mal ficelés. Rédigé par notre bureau d'études IEF.
            </p>
          </div>
        </section>

        {/* 5 norms */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {NORMS.map((n) => (
                <article
                  key={n.code}
                  className="grid gap-8 rounded-3xl border border-border bg-bg p-8 lg:grid-cols-12 lg:gap-14 lg:p-14"
                >
                  <header className="lg:col-span-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                      <ScrollText className="h-3.5 w-3.5" />
                      {n.code}
                    </div>
                    <h2 className="mt-4 font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[40px]">
                      {n.title}
                    </h2>
                    <p className="mt-5 text-[14px] leading-relaxed text-fg-muted">{n.scope}</p>
                  </header>

                  <div className="space-y-5 lg:col-span-8">
                    <div>
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                        Ce que la norme impose
                      </div>
                      <ul className="space-y-2">
                        {n.imposed.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-fg">
                            <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-signal-ok" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-signal-warn/30 bg-signal-warn/5 p-5">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal-warn" />
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal-warn">
                            Le mythe à démonter
                          </div>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-fg">{n.myth}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Classes d'usage EN 12453 */}
        <section className="border-y border-border-soft bg-bg-elev py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-subtle">
                  Focus · EN 12453
                </p>
                <h2 className="mt-5 font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[60px]">
                  Les 4 classes d'usage
                  <br />
                  <span className="font-serif-italic text-accent">en 1 tableau.</span>
                </h2>
                <p className="mt-6 text-[14px] leading-relaxed text-fg-muted">
                  Identifier la classe de votre installation est la première étape de la conformité.
                  Une erreur de classification = un chantier à refaire.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CLASSES.map((c) => (
                    <div
                      key={c.n}
                      className="rounded-2xl border border-border-soft bg-bg p-6"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif-italic text-[48px] leading-none text-accent">
                          {c.n}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                          Classe
                        </span>
                      </div>
                      <div className="mt-4 font-display text-[17px] font-semibold leading-tight text-fg">
                        {c.title}
                      </div>
                      <div className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                          Exemple ·{" "}
                        </span>
                        {c.ex}
                      </div>
                      <div className="mt-3 border-t border-border-soft pt-3 text-[13px] leading-relaxed text-fg">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                          Requis ·{" "}
                        </span>
                        {c.req}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA bloc */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-soft/80 to-bg-elev p-10 lg:p-16">
              <Shield className="h-8 w-8 text-accent" />
              <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[56px]">
                Audit conformité gratuit,
                <br />
                <span className="font-serif-italic text-accent">pour syndics IDF.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                Notre bureau d'études audite votre installation sur site (75/78/92/93/94/95),
                rédige le rapport de conformité EN 12453 + EN 13241-1, et propose un plan d'action
                chiffré. Audit offert sous 15 jours, rapport livré sous 8 jours.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg hover:bg-accent-hover"
                >
                  Demander l'audit
                </a>
                <a
                  href="/ressources"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[14px] text-fg hover:border-fg"
                >
                  Lire les guides conformité
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
