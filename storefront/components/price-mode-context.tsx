"use client";

import { createContext, useContext, useMemo, useState } from "react";

type PriceMode = "HT" | "TTC";

type Ctx = {
  mode: PriceMode;
  setMode: (m: PriceMode) => void;
  toggle: () => void;
};

const PriceModeCtx = createContext<Ctx | null>(null);

export function PriceModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PriceMode>("HT");

  const value = useMemo<Ctx>(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((m) => (m === "HT" ? "TTC" : "HT")),
    }),
    [mode],
  );

  return <PriceModeCtx.Provider value={value}>{children}</PriceModeCtx.Provider>;
}

export function usePriceMode() {
  const ctx = useContext(PriceModeCtx);
  if (!ctx) throw new Error("usePriceMode must be used inside PriceModeProvider");
  return ctx;
}
