import { ArrowRight, Building2, ShieldCheck, Video } from "lucide-react";

/**
 * Bloc confiance — 3 colonnes : Compte Pro · Vidéo-assistance · IEF & Co.
 * Remplace l'ancienne combo Expertise + ProTiers + Testimonials + ServicesGrid.
 */
const BLOCKS = [
  {
    icon: ShieldCheck,
    title: "Compte Pro Silver / Gold",
    desc: "Validation SIRET 2 h ouvrées. Prix HT par défaut, remises automatiques selon volume, paiement 30 jours pour Pro Gold.",
    cta: { label: "Créer un compte", href: "/compte-pro/nouveau" },
  },
  {
    icon: Video,
    title: "Vidéo-assistance Assistéo",
    desc: "Un technicien IEF en visio pour vous guider sur le chantier. Offerte dès 300 € HT de motorisation. Zéro trajet perdu.",
    cta: { label: "Réserver un créneau", href: "/pose-idf" },
  },
  {
    icon: Building2,
    title: "IEF & Co — 15 ans de terrain IDF",
    desc: "Atelier serrurerie-métallerie à Groslay (95). 3 000+ installations posées, 4,9 / 5 sur Google. On vend ce qu'on pose.",
    cta: { label: "L'histoire IEF", href: "/a-propos" },
  },
];

export function TrustBlock() {
  return (
    <section
      aria-labelledby="trust-title"
      className="border-b border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          id="trust-title"
          className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
        >
          Pourquoi les installateurs commandent ici
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {BLOCKS.map(({ icon: Icon, title, desc, cta }) => (
            <article
              key={title}
              className="flex flex-col gap-4 rounded-md border border-border-soft bg-bg p-6"
            >
              <Icon
                className="h-7 w-7 text-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-semibold text-fg">
                {title}
              </h3>
              <p className="prose-narrow text-base leading-relaxed text-fg-muted">
                {desc}
              </p>
              <a
                href={cta.href}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent link-underline"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
