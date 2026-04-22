type Tier = {
  name: string;
  price: string;
  sub: string;
  features: readonly string[];
  cta: string | null;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    name: "Particulier",
    price: "TTC",
    sub: "Prix public affiché",
    features: ["Paiement CB, Apple Pay, Alma 3-4x", "Livraison standard", "SAV par email"],
    cta: null,
  },
  {
    name: "Pro Silver",
    price: "HT −5 %",
    sub: "Dès inscription SIRET validée",
    features: [
      "Prix HT par défaut · bascule HT/TTC",
      "Historique chantier + facture PDF",
      "Re-commande 1-clic · import CSV",
      "Livraison 24h IDF garantie",
      "SAV technique téléphonique",
    ],
    cta: "Créer mon compte pro",
    featured: true,
  },
  {
    name: "Pro Gold",
    price: "HT −10 à −15 %",
    sub: "Sur volume cumulé 12 mois",
    features: [
      "Tout Pro Silver",
      "Paiement 30j à terme",
      "Référent commercial dédié",
      "Contrats cadres annualisés",
      "Vidéo-assistance Assistéo illimitée",
    ],
    cta: null,
  },
] as const;

export function ProTiers() {
  return (
    <section id="pro" className="border-t border-border-soft py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Compte Pro
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[0.98] tracking-tight text-fg lg:text-7xl">
            Des remises qui suivent
            <br />
            <em className="text-fg-muted">votre volume.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Validation SIRET en moins de 2h ouvrées. Historique chantier, facture PDF, re-commande
            1-clic, paiement 30j sur compte validé.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border-soft lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.featured
                  ? "relative flex flex-col bg-gradient-to-br from-warm to-warm-hover p-10 text-warm-fg"
                  : "flex flex-col bg-bg p-10"
              }
            >
              <div
                className={
                  tier.featured
                    ? "font-mono text-[11px] uppercase tracking-[0.22em] text-warm-fg/80"
                    : "font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted"
                }
              >
                {tier.name}
              </div>
              <div className="mt-5 font-display text-4xl tracking-tight lg:text-5xl">
                {tier.price}
              </div>
              <div
                className={
                  tier.featured
                    ? "mt-2 text-[13px] text-warm-fg/70"
                    : "mt-2 text-[13px] text-fg-muted"
                }
              >
                {tier.sub}
              </div>

              <ul
                className={
                  tier.featured
                    ? "mt-8 space-y-3.5 text-[14px] text-warm-fg/95"
                    : "mt-8 space-y-3.5 text-[14px] text-fg-muted"
                }
              >
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={
                        tier.featured ? "mt-2 inline-block h-px w-3 bg-warm-fg/50" : "mt-2 inline-block h-px w-3 bg-border"
                      }
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {tier.cta && (
                <a
                  href="/compte-pro/nouveau"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-warm-fg py-3 text-[14px] font-medium text-warm transition hover:bg-warm-fg/95 btn-soft"
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
