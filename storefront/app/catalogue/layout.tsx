import { FloatingHelpButton } from "@/components/floating-help-button";

/**
 * Layout dédié /catalogue (v0.8).
 *
 * Enveloppe automatiquement /catalogue (page hub) et toutes les pages
 * /catalogue/[slug]/*. Sert UNIQUEMENT à monter le bouton flottant
 * d'aide vers l'assistant diagnostic — invisible partout ailleurs sur
 * le site (home, /sur-mesure, /assisteo-maintenance, /pro, /contact,
 * fiches produits, etc.).
 */
export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingHelpButton />
    </>
  );
}
