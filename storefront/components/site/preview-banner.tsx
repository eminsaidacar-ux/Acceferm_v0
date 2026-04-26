"use client";

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * PreviewBanner — bandeau "maquette interne — preview collaborateurs · v0.6"
 * affiché en haut de page lorsque NEXT_PUBLIC_PREVIEW_MODE === "true".
 *
 * Sticky, fond neutre, fermable (sessionStorage).
 * Désactivé automatiquement en prod (variable absente ou false).
 */
const STORAGE_KEY = "acceferm:preview-banner-dismissed";

export function PreviewBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PREVIEW_MODE !== "true") return;
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 border-b border-border-soft bg-bg-elev"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm lg:px-8">
        <div className="flex items-center gap-2">
          <Info
            className="h-4 w-4 shrink-0 text-fg-muted"
            aria-hidden="true"
          />
          <span className="text-fg">
            <strong className="font-medium">Maquette interne</strong> · preview
            collaborateurs · v0.6 — pas pour diffusion publique
          </span>
        </div>
        <button
          type="button"
          aria-label="Fermer le bandeau preview"
          onClick={() => {
            try {
              sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="grid size-12 place-items-center text-fg-muted transition hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
