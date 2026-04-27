import { Search } from "lucide-react";

type Variant = "hub" | "category";

const COPY = {
  hub: {
    title: "Vous ne savez pas quel produit choisir ?",
    body: "Notre assistant diagnostic vous aide à identifier la pièce exacte à remplacer ou compatible avec votre installation. Cliquez sur votre type d'équipement, identifiez le composant en panne, recevez les références compatibles en stock.",
    cta: "Lancer l'assistant diagnostic",
  },
  category: {
    title: "Vous cherchez une pièce mais ne savez pas laquelle ?",
    body: "Notre assistant diagnostic vous guide en 3 clics jusqu'aux références compatibles avec votre installation.",
    cta: "Lancer l'assistant diagnostic",
  },
} as const;

/**
 * Bandeau cross-link vers /assistant-diagnostic.
 *
 * Variant `hub` (page /catalogue) : encart pleine largeur, texte long.
 * Variant `category` (pages /catalogue/[slug]) : bandeau compact bas de page.
 */
export function DiagnosticCta({ variant }: { variant: Variant }) {
  const copy = COPY[variant];
  const isHub = variant === "hub";
  return (
    <section
      aria-label="Aide à l'identification"
      className={
        isHub
          ? "border-b border-border-soft bg-bg-elev py-14 lg:py-20"
          : "border-t border-border-soft bg-bg-elev py-12 lg:py-14"
      }
    >
      <div
        className={`mx-auto px-6 lg:px-8 ${isHub ? "max-w-7xl" : "max-w-5xl"}`}
      >
        <div
          className={`rounded-2xl border border-accent/30 bg-bg p-6 lg:p-8 ${
            isHub ? "" : "sm:flex sm:items-center sm:justify-between sm:gap-6"
          }`}
        >
          <div className={isHub ? "max-w-3xl" : "max-w-xl"}>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-fg"
              >
                <Search className="h-4 w-4" />
              </span>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-fg lg:text-[24px]">
                {copy.title}
              </h2>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-fg-muted lg:text-[15px]">
              {copy.body}
            </p>
          </div>
          <a
            href="/assistant-diagnostic"
            className={`mt-5 inline-flex min-h-12 items-center rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover ${
              isHub ? "" : "sm:mt-0 sm:shrink-0"
            }`}
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
