"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Trash2, Upload } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { usePriceMode } from "@/components/price-mode-context";
import { parseOrderInput, sampleOrderInput, type CatalogSku } from "@/lib/catalog-codes";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Commande éclair — module interactif UNIQUE sur la home.
 * Le pro colle ses codes, voit le panier parsé en direct avec stock, total,
 * et peut ajouter tout en un clic. Aucun concurrent ne le propose sur leur home.
 */
export function QuickOrder() {
  const [raw, setRaw] = useState<string>(sampleOrderInput);
  const { mode } = usePriceMode();
  const textareaId = useId();

  const { items, unknown, totalHT } = useMemo(() => {
    const { items, unknown } = parseOrderInput(raw);
    const totalHT = items.reduce((acc, it) => acc + it.sku.priceHT * it.qty, 0);
    return { items, unknown, totalHT };
  }, [raw]);

  const removeCode = (code: string) => {
    const lines = raw.split(/\n/);
    const kept = lines.filter((line) => {
      const m = line.trim().match(/^([A-Za-z0-9._-]+)/);
      return !m || m[1].toUpperCase() !== code;
    });
    setRaw(kept.join("\n"));
  };

  return (
    <section id="commande-eclair" className="border-t border-border-soft py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left: editorial pitch */}
          <div className="lg:col-span-5 reveal">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Outil pro · exclusif
            </p>
            <h2 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-fg lg:text-6xl">
              Commande éclair.
              <br />
              <span className="text-fg-muted">Dix secondes, pas trois clics.</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg-muted">
              Collez vos codes séparés par une virgule ou un retour à la ligne. On parse, on
              recalcule le total en direct, on vérifie le stock. Aucun concurrent ne le fait sur
              leur page d'accueil.
            </p>

            <ul className="mt-10 space-y-4 text-[14px] text-fg-muted">
              <FeatureLine>Parsing instantané · code × quantité</FeatureLine>
              <FeatureLine>Stock temps réel par référence</FeatureLine>
              <FeatureLine>Import CSV pour lots {">"} 20 lignes</FeatureLine>
              <FeatureLine>Panier pré-rempli · bascule compte pro</FeatureLine>
            </ul>
          </div>

          {/* Right: interactive parser */}
          <div className="lg:col-span-7 reveal">
            <div className="overflow-hidden rounded-3xl border border-border bg-bg-elev">
              <div className="flex items-center justify-between border-b border-border-soft px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    Live · parsing
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-[12px] text-fg-muted transition hover:text-fg"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Importer un CSV
                </button>
              </div>

              <div className="grid lg:grid-cols-5">
                {/* Textarea */}
                <div className="lg:col-span-2 border-b border-border-soft lg:border-b-0 lg:border-r">
                  <label htmlFor={textareaId} className="sr-only">
                    Codes produit à parser
                  </label>
                  <textarea
                    id={textareaId}
                    value={raw}
                    onChange={(e) => setRaw(e.target.value)}
                    spellCheck={false}
                    rows={11}
                    className="h-full w-full resize-none bg-transparent px-6 py-5 font-mono text-[13px] leading-[1.9] text-fg placeholder:text-fg-subtle focus:outline-none"
                    placeholder={"V2-SE3 x2\nFAAC-XR2\nCAME-KIARON x3"}
                  />
                </div>

                {/* Parsed cart */}
                <div className="lg:col-span-3">
                  <div className="max-h-[420px] overflow-y-auto">
                    <AnimatePresence initial={false}>
                      {items.map((it) => (
                        <motion.div
                          key={it.sku.code}
                          layout
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="group flex items-center gap-4 border-b border-border-soft px-6 py-4 last:border-b-0"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-fg-subtle">
                                {it.sku.code}
                              </span>
                              <StockBadge stock={it.sku.stock} note={it.sku.stockNote} />
                            </div>
                            <div className="mt-1 truncate text-[14px] font-medium text-fg">
                              {it.sku.name}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                              {it.sku.brand}
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="font-display text-[18px] font-semibold tabular-nums text-fg">
                              ×{it.qty}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] tabular-nums text-fg-muted">
                              {formatPrice(it.sku.priceHT * it.qty, mode)} €
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeCode(it.sku.code)}
                            aria-label={`Retirer ${it.sku.code}`}
                            className="shrink-0 rounded-md p-1.5 text-fg-subtle opacity-0 transition group-hover:opacity-100 hover:bg-bg hover:text-fg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {unknown.length > 0 && (
                      <div className="border-t border-signal-warn/30 bg-signal-warn/5 px-6 py-3">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-warn">
                          {unknown.length} code{unknown.length > 1 ? "s" : ""} non reconnu
                          {unknown.length > 1 ? "s" : ""}
                        </div>
                        <div className="mt-1 font-mono text-[12px] text-fg-muted">
                          {unknown.slice(0, 3).join(" · ")}
                          {unknown.length > 3 && " …"}
                        </div>
                      </div>
                    )}

                    {items.length === 0 && unknown.length === 0 && (
                      <div className="px-6 py-16 text-center font-mono text-[12px] text-fg-subtle">
                        Collez vos codes pour commencer
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer: totals + CTA */}
              <div className="flex items-center justify-between gap-4 border-t border-border-soft bg-bg px-6 py-4">
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                      {items.length} article{items.length > 1 ? "s" : ""}
                    </div>
                    <div className="mt-1 font-display text-3xl font-semibold tabular-nums leading-none text-fg">
                      {formatPrice(totalHT, mode)}
                      <span className="ml-1 text-[16px] font-normal text-fg-muted">€ {mode}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={items.length === 0}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-medium transition",
                    items.length === 0
                      ? "cursor-not-allowed bg-bg-soft text-fg-subtle"
                      : "bg-accent text-accent-fg hover:bg-accent-hover",
                  )}
                >
                  Ajouter au panier
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4">
      <span className="inline-block h-px w-8 bg-border" />
      <span>{children}</span>
    </li>
  );
}

function StockBadge({ stock, note }: { stock: CatalogSku["stock"]; note: string }) {
  const cls = {
    ok: "bg-signal-ok/10 text-signal-ok",
    low: "bg-signal-warn/10 text-signal-warn",
    backorder: "bg-fg-subtle/10 text-fg-muted",
    out: "bg-signal-err/10 text-signal-err",
  }[stock];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]",
        cls,
      )}
    >
      {note}
    </span>
  );
}
