import { Logo } from "@/components/ui/logo";
import { phoneLines } from "@/lib/data";

const COLUMNS = [
  {
    title: "Catalogue",
    links: [
      { label: "Motorisation portail battant", href: "/catalogue/motorisation-battant" },
      { label: "Motorisation portail coulissant", href: "/catalogue/motorisation-coulissant" },
      { label: "Photocellules & barres palpeuses", href: "/catalogue/photocellules" },
      { label: "Récepteurs & télécommandes", href: "/catalogue/recepteurs-radio" },
      { label: "Claviers & sélecteurs IP65", href: "/catalogue/claviers-selecteurs" },
      { label: "Contrôle d'accès VIGIK", href: "/catalogue/controle-acces" },
      { label: "Interphonie GSM", href: "/catalogue/interphonie" },
      { label: "Serrures & ventouses", href: "/catalogue/serrures-electriques" },
      { label: "Alimentation & batteries", href: "/catalogue/alimentation-batteries" },
      { label: "Pièces détachées", href: "/catalogue/pieces-detachees" },
      { label: "Kits complets", href: "/catalogue/kits-complets" },
    ],
  },
  {
    title: "Espace Pro",
    links: [
      { label: "Créer un compte", href: "/compte-pro/nouveau" },
      { label: "Grilles tarifaires", href: "/pro" },
      { label: "Commande rapide", href: "/pro" },
      { label: "Commande par CSV", href: "/pro" },
      { label: "Paiement 30j", href: "/pro" },
      { label: "Mes factures & devis", href: "/pro" },
      { label: "Mes chantiers", href: "/pro" },
      { label: "Parrainage installateur", href: "/pro" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Devis gratuit < 24h", href: "/contact" },
      { label: "Conseiller technique", href: "/contact" },
      { label: "Vidéo-assistance Assistéo", href: "/pose-idf" },
      { label: "SAV ticketing", href: "/contact" },
      { label: "Catalogue papier 2026", href: "/ressources" },
      { label: "Formation e-learning", href: "/ressources" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Guides d'installation", href: "/ressources" },
      { label: "Diagnostic panne", href: "/ressources" },
      { label: "Gabarits & templates", href: "/gabarits" },
      { label: "Normes EN 12453 / 13241", href: "/normes" },
      { label: "Glossaire technique", href: "/glossaire" },
      { label: "Manifeste", href: "/manifeste" },
      { label: "Blog pro", href: "/ressources" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "IEF & Co", href: "/a-propos" },
      { label: "Nos engagements", href: "/manifeste" },
      { label: "vs. incumbents", href: "/vs/accesso-ferm" },
      { label: "Pose IDF", href: "/pose-idf" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
] as const;

const PAYMENT = ["CB", "Apple Pay", "Google Pay", "Virement SEPA Pro", "Alma 3-4x", "30j à terme"];
const LABELS = ["Avis Vérifiés 4,8/5", "RGAA 2.2 AA", "Stock France", "SIRET IEF & Co"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-soft bg-bg-elev">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8 lg:py-20">
        {/* Top: 4 phones */}
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

        {/* Main columns */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-fg-muted">
              La centrale d'achat des installateurs de fermetures automatiques. Opérée par IEF & Co,
              15 ans de terrain Île-de-France.
            </p>
            <div className="mt-6 space-y-1 font-mono text-[11px] text-fg-muted">
              <div>26 rue du Travers des Champs Guillaume</div>
              <div>95240 Cormeilles-en-Parisis</div>
              <div className="pt-2">SIRET · TVA intra FR XX XXX XXX XXX</div>
            </div>
            <form className="mt-8 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                Newsletter pro · 1/mois, sans spam
              </label>
              <div className="flex items-center gap-2 rounded-full border border-border bg-bg px-1 py-1">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-medium text-accent-fg transition hover:bg-accent-hover"
                >
                  Je m'inscris
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
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
        </div>

        {/* Labels + payment */}
        <div className="mt-14 grid gap-6 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              Labels & conformité
            </div>
            <div className="flex flex-wrap gap-2">
              {LABELS.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-[11px] text-fg-muted"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              Paiements acceptés
            </div>
            <div className="flex flex-wrap gap-2">
              {PAYMENT.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-[11px] text-fg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border-soft pt-6 font-mono text-[11px] text-fg-subtle sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 AcceFerm Pro · IEF & Co</span>
            <a href="/legal/cgv" className="hover:text-fg">CGV</a>
            <a href="/legal/mentions-legales" className="hover:text-fg">Mentions légales</a>
            <a href="/legal/confidentialite" className="hover:text-fg">Confidentialité</a>
            <a href="/legal/cookies" className="hover:text-fg">Cookies</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok halo" />
              Système opérationnel
            </span>
            <span>v0.4 · build 2026.04.21</span>
          </div>
        </div>
      </div>

      {/* Giant wordmark — closes the site with an editorial full-bleed signature */}
      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-t border-border-soft"
      >
        <div className="mx-auto max-w-[1920px] px-2">
          <div className="wordmark -mb-[0.06em] pt-6 text-fg/10 lg:pt-8">
            AcceFerm<span className="font-serif-italic font-light text-accent/30">.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
