"use client";

import { motion } from "motion/react";
import { Download, FileText, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import type { ProductDetail } from "@/lib/product-detail";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Caractéristiques" },
  { id: "compat", label: "Compatibilité" },
  { id: "docs", label: "Notices & docs" },
  { id: "reviews", label: "Avis pros" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductTabs({ product }: { product: ProductDetail }) {
  const [active, setActive] = useState<TabId>("description");

  return (
    <section className="border-t border-border-soft py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Tab nav — sticky ish */}
        <div className="sticky top-[9.6rem] z-10 -mx-2 mb-10 overflow-x-auto bg-bg px-2 lg:top-14">
          <div className="flex min-w-max gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-3 text-[13px] font-medium transition",
                  active === t.id ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {t.label}
                {active === t.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            {active === "description" && <Description product={product} />}
            {active === "specs" && <Specs product={product} />}
            {active === "compat" && <Compat product={product} />}
            {active === "docs" && <Docs product={product} />}
            {active === "reviews" && <Reviews product={product} />}
          </div>

          {/* Right: expert note always visible */}
          <aside className="lg:col-span-4">
            <div className="sticky top-44 rounded-2xl border border-accent/30 bg-accent-soft p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Note d'expert AcceFerm
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-fg">{product.expertNote}</p>
              <a
                href="#assisteo"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:text-accent-hover"
              >
                Réserver 20 min vidéo-assistance →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Description({ product }: { product: ProductDetail }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-fg/85">
      <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
        Pourquoi les pros choisissent ce produit
      </h2>
      <p>
        {product.brand} {product.name.toLowerCase()} — référence installée sur nos chantiers depuis
        des années. On l'a sélectionné pour son rapport qualité/prix, sa compatibilité large et sa
        fiabilité terrain. <strong className="text-fg">Zéro rétrocommission fabricant</strong> :
        c'est un choix technique, pas marketing.
      </p>
      <p>
        Fabriqué en {product.origin}, livré en emballage d'origine avec notice multilingue. Compatible
        avec les armoires de commande listées dans l'onglet « Compatibilité ». Pour toute question
        de câblage ou de programmation, nos techniciens IEF & Co sont joignables au 01 XX XX XX XX
        du lundi au vendredi 8h-19h.
      </p>
      <p>
        <strong className="text-fg">Garantie </strong>
        {product.warranty.toLowerCase()}. Retour 30 jours sans question.
      </p>

      <div className="grid grid-cols-2 gap-3 border-t border-border-soft pt-5">
        {product.norms.map((n) => (
          <div key={n} className="rounded-lg border border-border-soft bg-bg-elev px-3 py-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
              Conformité
            </div>
            <div className="mt-0.5 font-medium text-fg">{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Specs({ product }: { product: ProductDetail }) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
        Caractéristiques techniques
      </h2>
      <dl className="mt-6 overflow-hidden rounded-2xl border border-border-soft">
        {Object.entries(product.specs).map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              "grid grid-cols-[180px_1fr] gap-4 px-5 py-3.5 text-[14px]",
              i % 2 === 0 ? "bg-bg" : "bg-bg-elev",
            )}
          >
            <dt className="font-mono text-[12px] uppercase tracking-[0.15em] text-fg-muted">{k}</dt>
            <dd className="text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Compat({ product }: { product: ProductDetail }) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
        Compatibilités testées par nos poseurs
      </h2>
      <p className="mt-2 text-[14px] text-fg-muted">
        Liste non exhaustive. En cas de doute, contactez le SAV au 01 XX XX XX XX.
      </p>
      <div className="mt-6 space-y-3">
        {product.compatibility.map((row) => (
          <div
            key={row.brand}
            className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-bg p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="font-display text-[22px] font-semibold text-fg">{row.brand}</div>
            <div className="flex flex-wrap gap-2">
              {row.models.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-border bg-bg-elev px-3 py-1 font-mono text-[11px] text-fg"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Docs({ product }: { product: ProductDetail }) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
        Notices & documents
      </h2>
      <p className="mt-2 text-[14px] text-fg-muted">
        Accès libre, sans formulaire. Téléchargez ce dont vous avez besoin pour le chantier.
      </p>
      <div className="mt-6 grid gap-2">
        {product.documents.map((d) => (
          <a
            key={d.label}
            href="#"
            className="group flex items-center justify-between rounded-xl border border-border-soft bg-bg px-5 py-4 transition hover:border-fg"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-bg-elev text-fg">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[14px] font-medium text-fg">{d.label}</div>
                <div className="font-mono text-[11px] text-fg-subtle">
                  {d.format} · {d.size}
                </div>
              </div>
            </div>
            <Download className="h-4 w-4 text-fg-muted transition group-hover:text-accent" />
          </a>
        ))}
      </div>
    </div>
  );
}

function Reviews({ product }: { product: ProductDetail }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
            {product.rating.count} avis vérifiés
          </h2>
          <div className="mt-2 flex items-center gap-2 text-[13px] text-fg-muted">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(product.rating.average)
                      ? "h-4 w-4 fill-signal-warn text-signal-warn"
                      : "h-4 w-4 text-fg-faint"
                  }
                />
              ))}
            </div>
            <span className="font-mono tabular-nums">{product.rating.average}/5</span>
            <span>·</span>
            <span>Note moyenne pondérée</span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-[13px] text-fg transition hover:border-fg"
        >
          Trier par pertinence
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {product.reviews.map((r, i) => (
          <article
            key={i}
            className="rounded-2xl border border-border-soft bg-bg p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[14px] font-medium text-fg">{r.author}</div>
                <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                  {r.role} · {r.date}
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < r.rating
                        ? "h-3.5 w-3.5 fill-signal-warn text-signal-warn"
                        : "h-3.5 w-3.5 text-fg-faint"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-fg/90">{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
