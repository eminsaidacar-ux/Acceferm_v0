import { Logo } from "@/components/ui/logo";
import { phoneLines } from "@/lib/data";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Catalogue pro", href: "/catalogue/photocellules" },
      { label: "Configurateur motorisation", href: "/configurer" },
      { label: "Espace Pro & grilles HT", href: "/pro" },
      { label: "Commande éclair", href: "/pro" },
      { label: "Paiement 30j à terme", href: "/pro" },
      { label: "Vidéo-assistance Assistéo", href: "/pose-idf" },
      { label: "Pose IDF · IEF & Co", href: "/pose-idf" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Guides techniques", href: "/ressources" },
      { label: "Diagnostic panne", href: "/ressources" },
      { label: "Gabarits & templates", href: "/gabarits" },
      { label: "Normes EN 12453 / 13241", href: "/normes" },
      { label: "Glossaire technique", href: "/glossaire" },
      { label: "Manifeste AcceFerm", href: "/manifeste" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "IEF & Co · histoire", href: "/a-propos" },
      { label: "Marques distribuées", href: "/marques" },
      { label: "vs. incumbents", href: "/vs/accesso-ferm" },
      { label: "Nous contacter", href: "/contact" },
      { label: "Créer un compte pro", href: "/compte-pro/nouveau" },
      { label: "Mentions légales", href: "/legal/mentions-legales" },
      { label: "CGV", href: "/legal/cgv" },
      { label: "Confidentialité", href: "/legal/confidentialite" },
    ],
  },
] as const;

const CERTIFICATIONS = [
  "EN 12453 · Sécurité portes motorisées",
  "EN 13241-1 · Portes industrielles",
  "IP65 · IK08 · Équipements extérieurs",
  "Directive Machines 2006/42/CE",
  "RGAA 2.2 AA · Accessibilité",
];

const PAYMENT = ["CB", "Apple Pay", "Google Pay", "Virement SEPA Pro", "Alma 3-4x", "30j à terme"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-soft bg-bg-elev">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8 lg:py-20">
        {/* Top: 4 phones (blueprint style) */}
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
          {phoneLines.map((line) => (
            <a
              key={line.number}
              href={line.href}
              className="bg-bg p-5 transition hover:bg-bg-elev"
              data-cursor="hover"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                {line.label}
              </div>
              <div className="mt-2 font-mono text-[15px] font-semibold text-fg">{line.number}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                L-V 8h-19h
              </div>
            </a>
          ))}
        </div>

        {/* Main columns — 4 col IEF style */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-fg-muted">
              La centrale d'achat des installateurs de fermetures automatiques. Division
              e-commerce d'IEF & Co, 15 ans de terrain Île-de-France.
            </p>
            <div className="mt-6 space-y-1 font-mono text-[11px] text-fg-muted">
              <div>8 Rue René Dubos</div>
              <div>95410 Groslay · Île-de-France</div>
              <div className="pt-2">SIRET 888 693 981 · TVA intra FR XX XXX XXX XXX</div>
            </div>
            <form className="mt-8 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                Newsletter pro · 1/mois, sans spam
              </label>
              <div className="flex items-center gap-2 rounded-full border border-border bg-bg px-1 py-1">
                <input
                  type="email"
                  placeholder="vous@entreprise.fr"
                  className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-medium text-accent-fg transition hover:bg-accent-hover"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {col.title}
                </div>
                <ul className="space-y-2.5 text-[13px] text-fg-muted">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="link-swipe transition hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications column — IEF signature */}
          <div className="lg:col-span-3">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Certifications
            </div>
            <ul className="space-y-2.5 text-[13px] text-fg-muted">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-[7px] h-px w-4 shrink-0 bg-fg-subtle" />
                  <span className="font-mono text-[11px] tabular uppercase tracking-[0.12em] leading-relaxed">
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border-soft bg-bg p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                Paiements acceptés
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {PAYMENT.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-bg-elev px-2.5 py-0.5 font-mono text-[10px] text-fg"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-soft pt-6 font-mono text-[11px] tabular text-fg-subtle sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 AcceFerm Pro · IEF & Co</span>
            <span className="hidden sm:inline">·</span>
            <span>SIREN 888 693 981</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok halo" />
              Système opérationnel
            </span>
            <span>v0.5 · build 2026.04.21</span>
          </div>
        </div>
      </div>

      {/* Giant wordmark — editorial full-bleed signature, IEF family */}
      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-t border-border-soft"
      >
        <div className="mx-auto max-w-[1920px] px-2">
          <div className="wordmark -mb-[0.06em] pt-6 text-fg/10 lg:pt-8">
            AcceFerm<span className="italic font-light text-accent/40">&amp;</span>Co
          </div>
        </div>
      </div>
    </footer>
  );
}
