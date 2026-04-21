import { ArrowUpRight, Phone } from "lucide-react";

export function FinalCta() {
  return (
    <section className="border-t border-border-soft py-28 lg:py-40">
      <div className="reveal mx-auto max-w-5xl px-6 text-center lg:px-8">
        <h2 className="font-display text-[64px] font-semibold leading-[0.92] tracking-[-0.02em] text-fg sm:text-[96px] lg:text-[140px]">
          Ouvrez votre compte pro
          <br />
          <span className="text-accent">en deux minutes.</span>
        </h2>
        <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-fg-muted">
          Validation SIRET automatique. Première commande expédiée sous 24h IDF. SAV technique par
          téléphone. Tarifs HT dès le premier panier.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/compte-pro/nouveau"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-7 py-3.5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
          >
            Créer mon compte pro
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+33184000018"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[14px] text-fg transition hover:border-fg"
          >
            <Phone className="h-3.5 w-3.5" />
            01 84 XX XX 18
          </a>
        </div>
      </div>
    </section>
  );
}
