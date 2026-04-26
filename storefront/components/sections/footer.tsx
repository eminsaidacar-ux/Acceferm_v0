import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { phoneLines } from "@/lib/data";

/**
 * Footer sobre — refonte 2026-04.
 *
 * - 4 numéros de téléphone (validé Emin)
 * - 4 colonnes liens (Catalogue / Espace pro / Ressources / Entreprise)
 * - 1 colonne brand + newsletter
 * - Certifications listées sobrement
 * - Pas de wordmark géant en bas
 */

const COLUMNS = [
  {
    title: "Catalogue",
    links: [
      { label: "Photocellules", href: "/catalogue/photocellules" },
      { label: "Motorisations", href: "/catalogue/motorisation-battant" },
      { label: "Contrôle d'accès", href: "/catalogue/controle-acces" },
      { label: "Récepteurs & télécommandes", href: "/catalogue/recepteurs-radio" },
      { label: "Configurateur", href: "/configurer" },
    ],
  },
  {
    title: "Espace pro",
    links: [
      { label: "Créer un compte", href: "/compte-pro/nouveau" },
      { label: "Grilles HT Silver / Gold", href: "/pro" },
      { label: "Paiement 30 j", href: "/pro" },
      { label: "Vidéo-assistance Assistéo", href: "/pose-idf" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Guides techniques", href: "/ressources" },
      { label: "Normes EN 12453", href: "/normes" },
      { label: "Glossaire", href: "/glossaire" },
      { label: "Gabarits pro", href: "/gabarits" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "IEF & Co", href: "/a-propos" },
      { label: "Manifeste", href: "/manifeste" },
      { label: "Comparatif", href: "/comparatif-centrales-achat" },
      { label: "Contact", href: "/contact" },
      { label: "Mentions légales", href: "/legal/mentions-legales" },
      { label: "CGV", href: "/legal/cgv" },
      { label: "Confidentialité", href: "/legal/confidentialite" },
    ],
  },
] as const;

const CERTIFICATIONS = [
  "EN 12453",
  "EN 13241-1",
  "IP65 · IK08",
  "Directive Machines 2006/42/CE",
  "RGAA 2.2 AA",
];

const PAYMENT = [
  "CB",
  "Apple Pay",
  "Virement SEPA Pro",
  "Alma 3-4×",
  "30 j à terme",
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-elev">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* 4 numéros téléphone */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {phoneLines.map((line) => (
            <a
              key={line.number}
              href={line.href}
              className="group rounded-md border border-border-soft bg-bg p-5 transition hover:border-fg"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                {line.label}
              </p>
              <p className="mt-2 text-base font-semibold tabular text-fg">
                {line.number}
              </p>
              <p className="mt-1 text-xs text-fg-muted">L-V 8 h - 19 h</p>
            </a>
          ))}
        </div>

        {/* Colonnes principales */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="prose-narrow mt-5 text-sm leading-relaxed text-fg-muted">
              Centrale d'achat des installateurs de fermetures automatiques.
              Division e-commerce d'IEF &amp; Co — 15 ans de terrain
              Île-de-France.
            </p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-fg-muted">
              8 Rue René Dubos
              <br />
              95410 Groslay · Île-de-France
              <br />
              SIRET 888 693 981
            </address>
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
                Newsletter pro · 1 / mois
              </p>
              <NewsletterForm variant="pill" source="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-9">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-accent">
                  {col.title}
                </p>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-fg-muted transition hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications + paiements */}
        <div className="mt-12 grid gap-6 border-t border-border-soft pt-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-muted">
              Certifications
            </p>
            <ul className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-border-soft bg-bg px-3 py-1 text-xs font-medium text-fg-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-muted">
              Paiements acceptés
            </p>
            <ul className="flex flex-wrap gap-2">
              {PAYMENT.map((p) => (
                <li
                  key={p}
                  className="rounded-md border border-border-soft bg-bg px-3 py-1 text-xs font-medium text-fg"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border-soft pt-6 text-xs text-fg-muted sm:flex-row sm:items-center">
          <p>© 2026 AcceFerm Pro · IEF &amp; Co · SIREN 888 693 981</p>
          <p>v0.5 · build 2026.04.26</p>
        </div>
      </div>
    </footer>
  );
}
