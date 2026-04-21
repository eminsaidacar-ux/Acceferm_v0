"use client";

import { ArrowUpRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { GateTwin } from "@/components/hero/gate-twin";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { TextReveal } from "@/components/ui/text-reveal";
import { searchSuggestions } from "@/lib/data";

const TECH_KEYWORDS = [
  "VIGIK 4G",
  "EN 12453",
  "IP65",
  "rolling-code 433 MHz",
  "barre palpeuse",
  "armoire 24V",
  "photocellule",
  "visio-interphone",
  "sectionnelle industrielle",
  "ventouse 300 kg",
  "carte électronique",
  "norme EN 13241-1",
  "clavier codé",
  "batterie secours",
  "motorisation enterrée",
];

/**
 * Hero V5 — editorial magazine layout.
 * Mix serif/sans dans le titre, kinetic marquee technique, index stamp,
 * colonne droite = Digital Gate Twin (interactive).
 */
export function Hero() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const shown = q
    ? searchSuggestions.filter((s) => s.q.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : searchSuggestions;

  return (
    <section className="paper-texture grain relative overflow-hidden border-b border-border-soft bg-gradient-to-br from-bg via-bg to-warm-soft/40">
      {/* Index stamp — top right, editorial magazine style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 z-10 hidden select-none md:block lg:right-10 lg:top-10"
      >
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
            ISSUE · 01 — Pro & Industrie
          </span>
          <span className="chapter-num text-[84px] lg:text-[140px]">N°01</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-muted">
            Printemps 2026
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 pt-14 pb-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column — editorial */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-warm/30 bg-warm-soft py-1 pl-1 pr-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warm">
              <span className="rounded-full bg-warm px-2 py-0.5 text-[10px] text-warm-fg">
                Nouveau
              </span>
              Digital Gate Twin · inédit
            </div>

            <h1 className="mt-7 font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.028em] text-fg sm:text-[76px] lg:text-[96px]">
              <TextReveal stagger={0.09}>
                <span>Cliquez sur votre</span>
                <span>
                  portail.{" "}
                  <span className="font-serif-italic font-medium text-accent">
                    On livre
                  </span>
                </span>
                <span>
                  <span className="font-serif-italic font-medium text-accent">
                    les pièces.
                  </span>
                </span>
              </TextReveal>
            </h1>

            <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-fg-muted">
              Un schéma interactif qui recense les 8 composants d'une motorisation. Survolez,
              cliquez, on liste les pièces compatibles — en stock, à votre adresse demain. Zéro
              lecture de notice, zéro errance catalogue.
            </p>

            {/* Search bar */}
            <form action="/recherche" method="get" className="relative mt-8">
              <div
                className={[
                  "flex items-center gap-3 rounded-2xl border bg-bg-elev px-4 py-3 transition",
                  focused
                    ? "border-accent shadow-[0_8px_32px_-12px_rgba(168,62,30,0.25)]"
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-7 py-3.5 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
                >
                  Créer un compte pro
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href="/configurer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/50 px-7 py-3.5 text-[13px] text-fg transition hover:border-accent hover:text-accent"
                >
                  Configurer une motorisation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right column — Digital Gate Twin */}
          <div className="lg:col-span-6">
            <GateTwin />
          </div>
        </div>
      </div>

      {/* Kinetic marquee — technical vocabulary */}
      <div className="relative mt-2 border-t border-border-soft bg-bg-elev/50 py-6 lg:py-8">
        <Marquee speed="slow" fade>
          {TECH_KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="kinetic-word font-serif-italic text-[40px] font-medium leading-none text-fg-muted lg:text-[64px]"
            >
              {kw}
              <span className="mx-6 text-accent">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
