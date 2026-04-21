import { Fraunces, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

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
