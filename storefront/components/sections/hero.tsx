import { ArrowRight, CheckCircle2, Phone, Star, Truck } from "lucide-react";

/**
 * Hero épuré — refonte 2026-04.
 *
 * Cible : un installateur sur chantier doit comprendre la valeur, voir le CTA
 * principal et le bandeau confiance en moins de 2 secondes sur mobile 4G.
 *
 * Structure : titre 1 ligne · sub 1 phrase · 2 CTA · bandeau confiance 4 items.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative border-b border-border-soft bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Catalogue pro · 1 500 références
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl lg:text-6xl"
          >
            Le matériel de fermeture automatique,
            <br />
            <span className="text-accent">livré en 24 h en Île-de-France.</span>
          </h1>
          <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
            Photocellules, motorisations, contrôle d'accès, VIGIK. Catalogue
            sélectionné par les équipes IEF &amp; Co — 15 ans d'installation
            terrain. Prix HT, paiement 30 jours pour les comptes pros validés.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/catalogue/photocellules"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
            >
              Voir le catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/compte-pro/nouveau"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border-soft bg-bg px-6 text-base font-medium text-fg transition hover:border-fg"
            >
              Créer un compte pro
            </a>
          </div>
        </div>
      </div>

      {/* Bandeau confiance — 4 items max */}
      <div className="border-t border-border-soft bg-bg-elev">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-fg-muted lg:grid-cols-4">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0 text-fg" aria-hidden="true" />
              <span>
                Livraison <strong className="font-medium text-fg">24 h IDF</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-fg"
                aria-hidden="true"
              />
              <span>
                Paiement <strong className="font-medium text-fg">30 j pro</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-fg" aria-hidden="true" />
              <span>
                SAV humain — <strong className="font-medium text-fg">01 34 05 87 03</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Star
                className="h-4 w-4 shrink-0 fill-signal-warn text-signal-warn"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-fg">4,9 / 5</strong> · 487 avis Google
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
