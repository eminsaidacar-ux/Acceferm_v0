import type { Metadata } from "next";
import { ArrowUpRight, ChevronRight, ClipboardList } from "lucide-react";
import { GabaritsFiltersGrid, type Template } from "@/components/gabarits/filters-grid";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Gabarits & templates pro — téléchargement libre",
  description:
    "Les gabarits qu'un installateur pro utilise chaque semaine : devis motorisation, PV mise en service, fiche SAV, check-list entretien, registre maintenance copro.",
};

const TEMPLATES: Template[] = [
  {
    icon: "fileText",
    title: "Devis motorisation portail",
    desc: "Template Word + Excel. Pied-de-page IEF & Co éditable, calcul automatique HT/TTC, clauses légales EN 12453 incluses. Sortie PDF en 2 clics.",
    format: "DOCX + XLSX",
    size: "87 Ko",
    tag: "Commercial",
  },
  {
    icon: "fileCheck2",
    title: "PV de mise en service",
    desc: "Conforme directive Machines 2006/42/CE. Fait office de déclaration CE d'ensemble. Signé par le poseur + maître d'ouvrage. Archivage 10 ans obligatoire.",
    format: "PDF éditable",
    size: "62 Ko",
    tag: "Conformité",
  },
  {
    icon: "wrench",
    title: "Fiche SAV intervention",
    desc: "Check-list 22 points IEF, zones libres pour relevés (intensité, tension, cycles), champ pièces remplacées, signature client, tampon intervenant.",
    format: "PDF A4",
    size: "48 Ko",
    tag: "Maintenance",
  },
  {
    icon: "clipboardList",
    title: "Registre maintenance copro",
    desc: "Livret broché pour syndic, traçabilité des interventions sur 5 ans, colonnes dates/intervenant/actions/pièces. À compléter à chaque passage.",
    format: "PDF + INDD",
    size: "1.2 Mo",
    tag: "Copropriété",
  },
  {
    icon: "receipt",
    title: "Bon de commande fournisseur",
    desc: "Template Excel avec calcul automatique remises volume, colonnes références AcceFerm, nomenclature chantier. Export CSV direct vers notre Commande rapide.",
    format: "XLSX",
    size: "34 Ko",
    tag: "Achat",
  },
  {
    icon: "notebookPen",
    title: "Cahier des charges motorisation",
    desc: "Briefing type à remplir avec le client en 15 minutes : poids vantaux, usage, fréquence, tension disponible, contraintes accès, budget cible.",
    format: "PDF éditable",
    size: "71 Ko",
    tag: "Avant-vente",
  },
  {
    icon: "fileSpreadsheet",
    title: "Tableau amortissement motorisation",
    desc: "Pour convaincre un syndic : coût pose + maintenance sur 10 ans vs. remplacement anticipé. Formules intégrées, graphes inclus.",
    format: "XLSX",
    size: "56 Ko",
    tag: "Argumentaire",
  },
  {
    icon: "clipboardList",
    title: "Audit conformité EN 12453",
    desc: "Grille d'audit 48 points couvrant les 4 classes d'usage. Génération automatique du rapport PDF avec verdict conforme/non-conforme + plan d'action.",
    format: "XLSM",
    size: "128 Ko",
    tag: "Conformité",
  },
];

const CATEGORIES = ["Tout", "Commercial", "Conformité", "Maintenance", "Copropriété", "Achat", "Avant-vente", "Argumentaire"];

export default function GabaritsPage() {
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
            <span className="font-medium text-fg">Gabarits</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-muted">
                  Téléchargement libre · 8 gabarits pro
                </p>
                <h1 className="mt-6 font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg lg:text-[88px]">
                  Les gabarits qu'un
                  <br />
                  <span className="italic font-medium text-peach">pro utilise vraiment.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                  Rédigés par les équipes IEF & Co, testés sur 3 000+ chantiers. Libres
                  d'utilisation et de modification. Un lien vers AcceFerm Pro en pied de page,
                  c'est le seul retour qu'on demande.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                  <ClipboardList className="h-5 w-5 text-accent" />
                  <p className="mt-3 text-[14px] leading-relaxed text-fg">
                    <strong className="font-medium">Pack complet en 1 clic :</strong>{" "}
                    les 8 gabarits zippés, MAJ trimestrielle, 2,8 Mo.
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
                  >
                    Télécharger le pack
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <GabaritsFiltersGrid templates={TEMPLATES} categories={CATEGORIES} />
          </div>
        </section>

        {/* Help band */}
        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[32px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[48px]">
              Besoin d'un gabarit sur mesure ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-fg-muted">
              Contrat cadre, bordereau de prix copropriété, cahier des charges industriel :
              notre bureau d'études rédige à la demande, tarif 150-450 € HT selon complexité.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-fg px-6 py-3 text-[13px] font-medium text-bg transition hover:bg-accent"
            >
              Décrire mon besoin
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
