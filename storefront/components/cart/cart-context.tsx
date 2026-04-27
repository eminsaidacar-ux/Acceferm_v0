"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { promotions, topProducts, type Product } from "@/lib/data";

export type CartLine = {
  slug: string;
  qty: number;
};

type Ctx = {
  lines: CartLine[];
  itemCount: number;
  add: (slug: string, qty?: number) => void;
  update: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  lookup: (slug: string) => Product | undefined;
};

const CartCtx = createContext<Ctx | null>(null);

const KEY = "acceferm.cart.v1";

const BY_SLUG = Object.fromEntries(
  [...topProducts, ...promotions].map((p) => [p.slug, p]),
);

/**
 * Lignes par défaut si rien en localStorage (démo).
 * Slugs valides v0.6 (5 marques distribuées : V2 / Roger Technology /
 * Motor Line / Doorgate / Intégral Système). Ne PAS ré-introduire les
 * 12 marques retirees (Nice, Came, FAAC, BFT, etc.).
 */
const DEFAULT_LINES: CartLine[] = [
  { slug: "v2-sensiva-photocellules-paire", qty: 4 },
  { slug: "roger-rx22a-recepteur-433-mhz", qty: 1 },
  { slug: "v2-flash-feu-clignotant-led", qty: 3 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(DEFAULT_LINES);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on change after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      // ignore quota errors
    }
  }, [lines, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      itemCount: lines.reduce((acc, l) => acc + l.qty, 0),
      add: (slug, qty = 1) =>
        setLines((ls) => {
          const existing = ls.find((l) => l.slug === slug);
          if (existing) {
            return ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          }
          return [...ls, { slug, qty }];
        }),
      update: (slug, qty) =>
        setLines((ls) =>
          ls.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      remove: (slug) => setLines((ls) => ls.filter((l) => l.slug !== slug)),
      clear: () => setLines([]),
      lookup: (slug) => BY_SLUG[slug],
    }),
    [lines],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
