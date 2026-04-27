const FAQ = [
  {
    q: "Comment se déroule une session Assistéo ?",
    a: "Vous réservez un créneau de 20 min, vous recevez un lien visio par SMS et email 10 min avant. Le technicien IEF & Co prend l'appel, vous montrez le boîtier ou le composant en panne, on diagnostique en direct avec captures d'écran et schémas annotés.",
  },
  {
    q: "Que se passe-t-il si le problème nécessite une intervention sur site ?",
    a: "Si le diagnostic dépasse ce qu'on peut résoudre en visio (panne mécanique, câblage à reprendre), on bascule vers un devis pose IEF & Co (Île-de-France). Vous recevez un chiffrage précis sous 24 h ouvrées et la session Assistéo reste offerte.",
  },
  {
    q: "Puis-je reporter ou annuler un créneau ?",
    a: "Oui, jusqu'à 2 h avant le créneau via le lien dans l'email de confirmation. Au-delà, contactez-nous au numéro SAV pour reprogrammer. Aucune pénalité, le bon reste valable 6 mois.",
  },
  {
    q: "Quelles sont les marques compatibles ?",
    a: "Toutes les marques courantes du marché français : V2, Roger Technology, Motor Line, Doorgate, Intégral Système (nos 5 partenaires distribués) ainsi que les installations existantes d'autres fabricants. Le diagnostic est indépendant de la marque.",
  },
  {
    q: "L'Assistéo est-elle vraiment offerte au-delà de 300 € HT ?",
    a: "Oui. Tout achat de motorisation pour 300 € HT minimum sur acceferm.fr déclenche un bon Assistéo de 20 min, valable 6 mois sur l'installation concernée. Le bon est envoyé par email avec votre confirmation de commande.",
  },
] as const;

/**
 * Section D — FAQ Assistéo.
 *
 * 5 questions courantes + injection FAQPage JSON-LD pour SEO.
 * Format <details> natif, accessibilité clavier built-in.
 */
export function AssisteoFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-border-soft bg-bg-elev py-16 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
          Questions fréquentes
        </p>
        <h2
          id="faq-title"
          className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[52px]"
        >
          FAQ Assistéo
        </h2>

        <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-fg">
                {q}
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-fg-muted transition group-open:rotate-45 group-open:border-accent group-open:text-accent"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-muted">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
