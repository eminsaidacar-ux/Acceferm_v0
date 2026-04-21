"use client";

import { ArrowUpRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { GateTwin } from "@/components/hero/gate-twin";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/ui/text-reveal";
import { searchSuggestions } from "@/lib/data";

/**
 * Hero V4 — colonne gauche editorial + colonne droite "Digital Gate Twin"
 * (schéma SVG interactif du portail avec 8 hotspots cliquables).
 */
export function Hero() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const shown = q
    ? searchSuggestions.filter((s) => s.q.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : searchSuggestions;

  return (
    <section className="paper-texture relative overflow-hidden border-b border-border-soft bg-gradient-to-br from-bg via-bg to-warm-soft/40">
      <div className="mx-auto max-w-[1440px] px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-warm/30 bg-warm-soft py-1 pl-1 pr-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warm">
              <span className="rounded-full bg-warm px-2 py-0.5 text-[10px] text-warm-fg">
                Nouveau
              </span>
              Digital Gate Twin · inédit
            </div>

            <h1 className="mt-7 font-display text-[44px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg sm:text-[60px] lg:text-[72px]">
              <TextReveal stagger={0.09}>
                <span>Cliquez sur votre</span>
                <span>portail.</span>
                <span className="text-accent">On livre les pièces.</span>
              </TextReveal>
            </h1>

            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-fg-muted">
              Notre schéma interactif recense les 8 composants d'une motorisation. Survolez, cliquez,
              on vous liste les produits compatibles en stock. Zéro lecture de notice, zéro errance
              dans le catalogue.
            </p>

            {/* Search bar — complement to the gate twin */}
            <form action="/recherche" method="get" className="relative mt-8">
              <div
                className={[
                  "flex items-center gap-3 rounded-2xl border bg-bg-elev px-4 py-3 transition",
                  focused
                    ? "border-accent shadow-[0_8px_32px_-12px_rgba(29,41,82,0.25)]"
                    : "border-border",
                ].join(" ")}
              >
                <Search className="h-5 w-5 shrink-0 text-fg-muted" />
                <input
                  type="search"
                  name="q"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 120)}
                  placeholder="… ou cherchez par marque, référence, symptôme"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-fg placeholder:text-fg-subtle focus:outline-none"
                  aria-label="Recherche catalogue"
                />
                <kbd className="hidden shrink-0 rounded-md border border-border bg-bg px-1.5 py-0.5 font-mono text-[11px] text-fg-muted sm:inline-block">
                  ⌘ K
                </kbd>
              </div>

              {focused && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_20px_48px_-16px_rgba(0,0,0,0.2)]">
                  <div className="border-b border-border-soft px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                    {q ? "Suggestions" : "Recherches récentes"}
                  </div>
                  {shown.map((s) => (
                    <a
                      key={s.q}
                      href={`/recherche?q=${encodeURIComponent(s.q)}`}
                      className="flex w-full items-center justify-between px-5 py-2.5 text-left transition hover:bg-bg-elev"
                    >
                      <span className="flex items-center gap-3 text-[14px] text-fg">
                        <Search className="h-3.5 w-3.5 text-fg-subtle" />
                        {s.q}
                      </span>
                      <span className="font-mono text-[11px] text-fg-subtle">{s.count}</span>
                    </a>
                  ))}
                  <div className="border-t border-border-soft bg-bg-elev px-5 py-2.5 font-mono text-[11px] text-fg-muted">
                    <Sparkles className="mr-1.5 inline h-3 w-3 text-accent" />
                    Astuce : collez vos codes dans « Commande éclair » plus bas.
                  </div>
                </div>
              )}
            </form>

            {/* Trust line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-signal-ok" /> Paiement 30j pro
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-signal-ok" /> Livraison 24h IDF
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-signal-ok" /> SAV humain
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.32}>
                <a
                  href="/compte-pro/nouveau"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
                >
                  Créer un compte pro
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href="/configurer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/50 px-6 py-3 text-[13px] text-fg transition hover:border-accent hover:text-accent"
                >
                  Configurer une motorisation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right column: Digital Gate Twin */}
          <div className="lg:col-span-7">
            <GateTwin />
          </div>
        </div>
      </div>
    </section>
  );
}
