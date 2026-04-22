import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  ShieldAlert,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * PainPoints — section "symptômes → solution" style emergency playbook.
 * Repère les cas de figure critiques d'un installateur et dirige vers la bonne action.
 * Inspiré des playbooks Screwfix « fix it today » et du SAV d'IEF & Co.
 */
const CASES = [
  {
    badge: "Urgence",
    kicker: "Vendredi 18h, portail bloqué",
    icon: AlertTriangle,
    title: "Panne un vendredi soir ?",
    body: "Diagnostiquez en 2 min avec notre arbre de décision. Si pièce en stock : expédition samedi matin IDF.",
    cta: "Ouvrir le diagnostic",
    href: "/ressources/portail-ne-ferme-plus",
    tone: "alert" as const,
  },
  {
    badge: "Compatibilité",
    kicker: "Moteur ancien, pièce introuvable",
    icon: Search,
    title: "Référence perdue chantier hérité ?",
    body: "Notre Digital Gate Twin + configurateur compatibilité 3 clics identifient la pièce depuis la marque + modèle.",
    cta: "Trouver la pièce",
    href: "/#configurateur",
    tone: "default" as const,
  },
  {
    badge: "Conformité",
    kicker: "Contrôle APAVE annoncé",
    icon: ShieldAlert,
    title: "Audit conformité EN 12453 demain ?",
    body: "Grille d'audit 48 points téléchargeable + rapport-type. Si besoin : bureau d'études IEF disponible sous 15 jours.",
    cta: "Télécharger la grille",
    href: "/gabarits",
    tone: "default" as const,
  },
  {
    badge: "Devis",
    kicker: "Réponse syndic attendue",
    icon: Wrench,
    title: "Cahier des charges à rendre ?",
    body: "5 questions dans le configurateur, 3 kits chiffrés HT, devis signé + PDF sous 24h ouvrées. Pose IDF en option.",
    cta: "Configurer + devis",
    href: "/configurer",
    tone: "default" as const,
  },
];

export function PainPoints() {
  return (
    <section
      aria-labelledby="pain-h"
      className="border-t border-border-soft bg-bg-elev py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Urgences chantier · playbook
            </p>
            <h2
              id="pain-h"
              className="mt-4 font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[56px]"
            >
              Quatre situations réelles,
              <br />
              <span className="italic font-medium text-peach">une action par cas.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              Cliquez la situation qui correspond à votre semaine — on vous emmène directement
              sur l'outil, la pièce, ou la personne qui résout.
            </p>
          </div>

          <a
            href="tel:+33184000017"
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-bg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition hover:bg-accent hover:text-accent-fg"
          >
            <Phone className="h-3.5 w-3.5" />
            SAV 01 84 XX XX 17
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            const alert = c.tone === "alert";
            return (
              <a
                key={c.title}
                href={c.href}
                data-cursor="hover"
                className={
                  alert
                    ? "group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-soft via-bg to-bg p-7 transition hover:border-accent lg:p-10"
                    : "group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border-soft bg-bg p-7 transition hover:border-fg lg:p-10"
                }
              >
                {/* Number badge */}
                <div className="flex items-start justify-between">
                  <span
                    className={
                      alert
                        ? "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent"
                        : "inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-fg"
                    }
                  >
                    {alert && (
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                      </span>
                    )}
                    {c.badge}
                  </span>
                  <span
                    className={
                      alert
                        ? "font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70"
                        : "font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle"
                    }
                  >
                    Cas {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <span
                    className={
                      alert
                        ? "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-fg"
                        : "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-bg-elev text-fg"
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p
                      className={
                        alert
                          ? "font-serif-italic text-[15px] text-accent"
                          : "font-serif-italic text-[15px] text-peach"
                      }
                    >
                      « {c.kicker} »
                    </p>
                    <h3 className="mt-1 font-display text-[22px] font-semibold leading-tight tracking-tight text-fg lg:text-[28px]">
                      {c.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[14px] leading-relaxed text-fg-muted lg:text-[15px]">
                  {c.body}
                </p>

                <div className="mt-auto inline-flex items-center gap-1.5 border-b border-fg pb-1 text-[13px] font-medium text-fg transition self-start group-hover:gap-2.5 group-hover:border-accent group-hover:text-accent">
                  {c.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
