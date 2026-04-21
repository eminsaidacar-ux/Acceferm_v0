import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "AcceFerm Pro vs Accesso-Ferm : le comparatif honnête",
  description:
    "48 ans d'héritage Accesso-Ferm face à la plateforme moderne d'AcceFerm Pro. Catalogue, prix pro, SAV, mobile, SEO — comparaison ligne par ligne.",
};

type Row = {
  criterion: string;
  acceferm: string;
  incumbent: string;
  winner: "acceferm" | "incumbent" | "tie";
};

const ROWS: Row[] = [
  {
    criterion: "Ancienneté & légitimité",
    acceferm: "15 ans IEF & Co terrain IDF · AcceFerm lancée 2026",
    incumbent: "48 ans depuis 1978 · acteur historique",
    winner: "incumbent",
  },
  {
    criterion: "Profondeur catalogue",
    acceferm: "~200 réf V0 · 500+ réf fin 2026",
    incumbent: "5 000+ références multi-marques",
    winner: "incumbent",
  },
  {
    criterion: "Mobile-first & responsive",
    acceferm: "Mobile-first · RGAA 2.2 AA · Core Web Vitals verts",
    incumbent: "Non responsive · zoom manuel obligatoire",
    winner: "acceferm",
  },
  {
    criterion: "Stack technique",
    acceferm: "Next.js 15 · React 19 · Tailwind v4 · 2026",
    incumbent: "Oxatis SaaS · jQuery 1.6.1 (2011)",
    winner: "acceferm",
  },
  {
    criterion: "SEO Schema.org",
    acceferm: "Product · Organization · LocalBusiness · FAQ · HowTo",
    incumbent: "Aucun schema structuré détecté",
    winner: "acceferm",
  },
  {
    criterion: "Prix HT par défaut",
    acceferm: "Oui · bascule HT/TTC persistante",
    incumbent: "Oui · TTC en tunnel d'achat",
    winner: "tie",
  },
  {
    criterion: "Espace pro digital",
    acceferm: "Historique chantiers · factures PDF · re-commande 1-clic · paliers auto",
    incumbent: "Formulaire contact générique · pas d'espace client pro",
    winner: "acceferm",
  },
  {
    criterion: "Paiement 30j à terme",
    acceferm: "Compte Pro Gold validé · automatisé",
    incumbent: "Non documenté publiquement",
    winner: "acceferm",
  },
  {
    criterion: "Fiche produit",
    acceferm: "Galerie · avis vérifiés · tabs · compatibilités · notices PDF",
    incumbent: "Photo unique · description courte · notice PDF",
    winner: "acceferm",
  },
  {
    criterion: "Configurateur motorisation",
    acceferm: "Oui · 5 questions · 3 kits · devis 24h",
    incumbent: "Non · formulaire générique",
    winner: "acceferm",
  },
  {
    criterion: "Vidéo-assistance pose",
    acceferm: "Offerte dès 300 € HT · 20 min visio technicien IEF",
    incumbent: "Absent",
    winner: "acceferm",
  },
  {
    criterion: "Hub éditorial SEO",
    acceferm: "9 ressources · guides + diagnostics + pages locales IDF",
    incumbent: "Zéro blog structuré",
    winner: "acceferm",
  },
  {
    criterion: "SAV téléphonique",
    acceferm: "4 lignes dédiées · 8h-19h · anciens poseurs",
    incumbent: "4 lignes dédiées · 8h-17h30 · équipe dédiée",
    winner: "tie",
  },
  {
    criterion: "Fabrication sur mesure",
    acceferm: "Reportée V1 · atelier IEF en montée en charge",
    incumbent: "Portails, portes rapides, sur-mesure dispo",
    winner: "incumbent",
  },
];

const SCORE = {
  acceferm: ROWS.filter((r) => r.winner === "acceferm").length,
  incumbent: ROWS.filter((r) => r.winner === "incumbent").length,
  tie: ROWS.filter((r) => r.winner === "tie").length,
};

export default function VsAccessoFerm() {
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
            <span className="font-medium text-fg">AcceFerm vs Accesso-Ferm</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Comparatif ligne par ligne · sans gaslighting
            </p>
            <h1 className="mt-5 font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg lg:text-[88px]">
              AcceFerm Pro
              <br />
              <span className="text-fg-muted">vs Accesso-Ferm.</span>
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              Accesso-Ferm est un acteur sérieux du marché français depuis 1978. On le respecte —
              et on le compare honnêtement. Voici ce qu'on fait mieux, ce qu'ils font mieux, et
              les critères où on est à égalité.
            </p>

            <div className="mt-12 grid gap-2 sm:grid-cols-3">
              <ScoreCard
                label="Points AcceFerm"
                value={SCORE.acceferm}
                total={ROWS.length}
                accent
              />
              <ScoreCard label="Points Accesso-Ferm" value={SCORE.incumbent} total={ROWS.length} />
              <ScoreCard label="À égalité" value={SCORE.tie} total={ROWS.length} />
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-0 border-b border-border-soft bg-bg-elev">
                <div className="p-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Critère
                </div>
                <div className="border-l border-border-soft p-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  AcceFerm Pro
                </div>
                <div className="border-l border-border-soft p-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Accesso-Ferm
                </div>
              </div>
              {ROWS.map((row) => (
                <div
                  key={row.criterion}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-border-soft"
                >
                  <div className="bg-bg p-5 text-[14px] font-medium text-fg">
                    {row.criterion}
                  </div>
                  <div
                    className={[
                      "flex items-start gap-2 border-l border-border-soft p-5 text-[13px]",
                      row.winner === "acceferm" ? "bg-accent-soft" : "bg-bg",
                    ].join(" ")}
                  >
                    {row.winner === "acceferm" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : row.winner === "incumbent" ? (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint" />
                    ) : (
                      <span className="mt-2 inline-block h-px w-3 shrink-0 bg-fg-subtle" />
                    )}
                    <span className="text-fg">{row.acceferm}</span>
                  </div>
                  <div
                    className={[
                      "flex items-start gap-2 border-l border-border-soft p-5 text-[13px]",
                      row.winner === "incumbent" ? "bg-bg-elev" : "bg-bg",
                    ].join(" ")}
                  >
                    {row.winner === "incumbent" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-fg" />
                    ) : row.winner === "acceferm" ? (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint" />
                    ) : (
                      <span className="mt-2 inline-block h-px w-3 shrink-0 bg-fg-subtle" />
                    )}
                    <span className="text-fg-muted">{row.incumbent}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-[13px] text-fg-subtle">
              Comparaison basée sur audit technique du site accesso-ferm.fr · avril 2026. Les
              données évoluent, ce tableau est révisé trimestriellement.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border-soft bg-bg-elev py-14 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[36px] font-semibold leading-tight tracking-tight text-fg lg:text-[56px]">
              Essayez pendant une semaine.
              <br />
              <span className="text-accent">Sans engagement.</span>
            </h2>
            <p className="mt-5 text-[15px] text-fg-muted">
              Compte pro gratuit · −5 % HT immédiat · expédition IDF 24h · SAV humain. Si vous
              revenez à l'ancien monde, on prend ça comme un feedback — et on itère.
            </p>
            <a
              href="/compte-pro/nouveau"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg hover:bg-accent-hover"
            >
              Créer un compte pro en 3 minutes
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ScoreCard({
  label,
  value,
  total,
  accent,
}: {
  label: string;
  value: number;
  total: number;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5",
        accent ? "border-accent bg-accent-soft" : "border-border-soft bg-bg",
      ].join(" ")}
    >
      <div className="font-display text-[40px] font-semibold leading-none tracking-tight text-fg">
        {value}
        <span className="text-[18px] text-fg-muted"> / {total}</span>
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
        {label}
      </div>
    </div>
  );
}
