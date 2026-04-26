import { Inter, Inter_Tight } from "next/font/google";

/**
 * Polices retenues pour la refonte épurée — 2 familles maximum.
 *
 * - Inter (corps) : sans-serif lisible, optimisée pour écran, supportée par
 *   Google Fonts en variable.
 * - Inter Tight (titres) : variante plus serrée pour les hiérarchies.
 *
 * Supprimé : Fraunces, Clash Display (Fontshare bloquant), JetBrains Mono.
 */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const display = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
