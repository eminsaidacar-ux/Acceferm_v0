import { Fraunces, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/**
 * Inter Tight — utilisé comme fallback derrière Clash Display (chargé via Fontshare @import).
 * Variable renommée pour ne pas écraser --font-display contrôlé par Tailwind @theme.
 */
export const display = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tight",
});

export const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
