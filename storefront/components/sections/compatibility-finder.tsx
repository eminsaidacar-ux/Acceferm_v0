"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { brands, finderCategories, finderModels } from "@/lib/data";
import { cn } from "@/lib/utils";

const STEPS = ["Marque", "Modèle", "Besoin"] as const;

export function CompatibilityFinder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const models = brand ? finderModels[brand] ?? ["Modèle A", "Modèle B", "Modèle C"] : [];

  return (
    <section
      id="configurateur"
      className="border-t border-border-soft bg-bg-elev py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="max-w-2xl reveal">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Compatibilité
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[0.98] tracking-tight text-fg lg:text-7xl">
            Votre moteur existant,
            <br />
            <em className="text-fg-muted">en trois clics.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Marque, modèle, besoin. Nous listons instantanément les accessoires compatibles, les
            pièces détachées en stock, et les notices techniques.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-bg reveal">
          {/* Progress */}
          <div className="flex items-center border-b border-border-soft">
            {STEPS.map((s, i) => {
              const n = (i + 1) as 1 | 2 | 3;
              const active = step === n;
              const done = step > n;
              return (
                <div
                  key={s}
                  className={cn(
                    "flex flex-1 items-center gap-3 px-6 py-5",
                    active || done ? "text-fg" : "text-fg-subtle",
                    i > 0 && "border-l border-border-soft",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full font-mono text-[10px]",
                      done
                        ? "bg-accent text-accent-fg"
                        : active
                          ? "border border-accent text-accent"
                          : "border border-border text-fg-subtle",
                    )}
                  >
                    {done ? "✓" : n}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{s}</span>
                </div>
              );
            })}
          </div>

          <div className="min-h-[360px] p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    Sélectionnez la marque
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                    {brands.map((b) => (
                      <button
                        type="button"
                        key={b.slug}
                        onClick={() => {
                          setBrand(b.name);
                          setStep(2);
                        }}
                        className="rounded-xl border border-border-soft bg-bg px-4 py-6 text-left transition hover:border-fg"
                      >
                        <div className="font-display text-[20px] leading-none text-fg">
                          {b.name}
                        </div>
                        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                          {b.origin}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                      Modèle · <span className="text-fg">{brand}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setBrand("");
                      }}
                      className="text-[13px] text-fg-muted hover:text-fg"
                    >
                      ← Retour
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {models.map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => {
                          setModel(m);
                          setStep(3);
                        }}
                        className="rounded-xl border border-border-soft bg-bg px-4 py-5 text-left transition hover:border-fg"
                      >
                        <div className="text-[15px] font-medium text-fg">{m}</div>
                        <div className="mt-1 font-mono text-[10px] tabular-nums text-fg-subtle">
                          En stock · 48h
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                      <span className="text-fg">{brand}</span> {model} · de quoi avez-vous besoin ?
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[13px] text-fg-muted hover:text-fg"
                    >
                      ← Retour
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {finderCategories.map((c) => (
                      <button
                        type="button"
                        key={c.title}
                        className="group flex items-center justify-between rounded-xl border border-border-soft bg-bg px-5 py-4 text-left transition hover:border-fg"
                      >
                        <div>
                          <div className="text-[15px] font-medium text-fg">{c.title}</div>
                          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                            {c.count} · {c.priceFrom}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-fg" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
