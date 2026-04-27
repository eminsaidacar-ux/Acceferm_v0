"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "floating-help-dismissed";

/**
 * Bouton flottant d'aide vers l'assistant diagnostic (v0.8).
 *
 * Affichage : monté uniquement par `app/catalogue/layout.tsx` — donc
 * visible UNIQUEMENT sur /catalogue et /catalogue/[slug]/*.
 *
 * Comportement :
 * - Initialement pill avec icône loupe + texte « Aide à identifier ».
 * - Au scroll > 200px (desktop ≥ lg) : le texte se rétracte (transition CSS
 *   smooth), seule l'icône reste. Au scroll vers le haut : le texte
 *   réapparaît. `prefers-reduced-motion` désactive la transition.
 * - Mobile : icône seule en permanence (gain d'espace).
 * - Bouton « × » à côté pour masquer ; préférence stockée en sessionStorage
 *   (réapparaît à la session suivante, pas localStorage).
 * - Touch targets ≥ 48 × 48 px sur les 2 boutons.
 * - Position : bottom-20 sur mobile (anti-collision CTAs panier),
 *   bottom-6 sur desktop ; right-6 partout.
 */
export function FloatingHelpButton() {
  const [dismissed, setDismissed] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage may throw in private mode — ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setCompact(window.scrollY > 200);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  // Évite un flash pendant l'hydratation
  if (!hydrated || dismissed) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-20 right-6 z-30 flex items-center gap-2 lg:bottom-6"
      // Inline style pour respecter prefers-reduced-motion sans surcharger Tailwind
      role="region"
      aria-label="Aide contextuelle catalogue"
    >
      <a
        href="/assistant-diagnostic"
        aria-label="Lancer l'assistant diagnostic pour identifier une pièce"
        className="pointer-events-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-4 text-[14px] font-medium text-accent-fg shadow-lg transition hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
        {/* Texte rétractable : caché sur mobile + au scroll desktop */}
        <span
          className={`hidden overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 motion-reduce:transition-none lg:inline-block ${
            compact ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
          }`}
        >
          Aide à identifier
        </span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Masquer l'aide à identifier pour cette session"
        className="pointer-events-auto grid size-12 place-items-center rounded-full border border-border bg-bg text-fg-muted shadow-md transition hover:bg-bg-elev hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
