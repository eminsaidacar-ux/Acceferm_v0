"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { usePriceMode } from "@/components/price-mode-context";
import { topProducts, promotions } from "@/lib/data";
import { img, imagery } from "@/lib/images";
import { twinSchemas, type TwinHotspot, type TwinSchema } from "@/lib/twin-schemas";
import { formatPrice } from "@/lib/utils";

const PRODUCT_BY_SLUG = Object.fromEntries(
  [...topProducts, ...promotions].map((p) => [p.slug, p]),
);

/**
 * Digital Twin — moteur multi-familles.
 * Selector en haut pour basculer entre coulissant, battant, sectionnelle,
 * rideau métal, barrière, borne. Chaque schéma a son SVG + ses 6-8 hotspots.
 */
export function GateTwin() {
  const [activeSchemaId, setActiveSchemaId] = useState<string>(twinSchemas[0].id);
  const schema = useMemo(
    () => twinSchemas.find((s) => s.id === activeSchemaId) ?? twinSchemas[0],
    [activeSchemaId],
  );
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(schema.defaultHotspotId);
  const [hover, setHover] = useState<string | null>(null);
  const { mode } = usePriceMode();

  // Reset hotspot when schema changes
  const switchSchema = (id: string) => {
    setActiveSchemaId(id);
    const newSchema = twinSchemas.find((s) => s.id === id);
    setActiveHotspotId(newSchema?.defaultHotspotId ?? null);
    setHover(null);
  };

  const active = activeHotspotId
    ? schema.hotspots.find((h) => h.id === activeHotspotId)
    : null;
  const hovered = hover ? schema.hotspots.find((h) => h.id === hover) : null;
  const displayed = hovered ?? active;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg-elev shadow-[0_8px_24px_-12px_rgba(42,36,30,0.12)]">
      {/* Header — selector */}
      <div className="border-b border-border-soft bg-bg/60 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-block h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-warm" />
              <span className="absolute inset-0 animate-ping rounded-full bg-warm" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Digital Twin · {schema.name}
            </span>
          </div>
          <span className="hidden font-mono text-[11px] text-fg-subtle sm:inline">
            {schema.hotspots.length} composants · cliquez
          </span>
        </div>

        {/* Schema selector tabs */}
        <div className="overflow-x-auto border-t border-border-soft">
          <div className="flex min-w-fit items-center gap-1 px-3 py-2">
            {twinSchemas.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => switchSchema(s.id)}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium transition",
                  activeSchemaId === s.id
                    ? "bg-warm text-warm-fg"
                    : "text-fg-muted hover:bg-bg hover:text-fg",
                ].join(" ")}
                aria-pressed={activeSchemaId === s.id}
              >
                <span className="font-display text-base leading-none">{s.glyph}</span>
                {s.shortName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG viewport */}
      <div className="relative aspect-[9/6] w-full bg-gradient-to-b from-bg-elev via-bg to-bg-soft">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-soft) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <svg
          viewBox="0 0 900 560"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Schéma interactif ${schema.name}`}
        >
          {schema.renderBackground()}

          {/* Hotspots */}
          {schema.hotspots.map((part) => {
            const isActive = active?.id === part.id;
            const isHovered = hover === part.id;
            const highlight = isActive || isHovered;

            return (
              <g key={part.id}>
                {/* Leader line */}
                {highlight && (
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    x1={part.position.x}
                    y1={part.position.y}
                    x2={part.anchor.x}
                    y2={part.anchor.y}
                    stroke="var(--color-warm)"
                    strokeWidth="1.25"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Label tag */}
                {highlight && (
                  <motion.g
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <rect
                      x={part.anchor.x - 78}
                      y={part.anchor.y - 14}
                      width={156}
                      height={28}
                      rx={14}
                      fill="var(--color-fg)"
                    />
                    <text
                      x={part.anchor.x}
                      y={part.anchor.y + 5}
                      fontFamily="var(--font-sans)"
                      fontSize="12"
                      fontWeight="500"
                      fill="var(--color-bg)"
                      textAnchor="middle"
                    >
                      {part.shortLabel}
                    </text>
                  </motion.g>
                )}

                {/* Hotspot */}
                <g
                  onMouseEnter={() => setHover(part.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setActiveHotspotId(part.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveHotspotId(part.id);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={part.label}
                  className="cursor-pointer focus:outline-none"
                >
                  {isActive && (
                    <motion.circle
                      cx={part.position.x}
                      cy={part.position.y}
                      r="14"
                      fill="none"
                      stroke="var(--color-warm)"
                      strokeWidth="1"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
                      style={{ transformOrigin: `${part.position.x}px ${part.position.y}px` }}
                    />
                  )}
                  <circle
                    cx={part.position.x}
                    cy={part.position.y}
                    r={highlight ? 14 : 12}
                    fill={highlight ? "var(--color-warm)" : "var(--color-bg)"}
                    stroke={highlight ? "var(--color-warm)" : "var(--color-fg)"}
                    strokeWidth="2"
                  />
                  <text
                    x={part.position.x}
                    y={part.position.y + 4}
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    fill={highlight ? "var(--color-warm-fg)" : "var(--color-fg)"}
                    pointerEvents="none"
                  >
                    {part.number}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 rounded-full border border-border bg-bg/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted backdrop-blur">
          Cliquez sur un composant ↑
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence mode="wait">
        {displayed && (
          <DetailDrawer
            key={`${schema.id}-${displayed.id}`}
            part={displayed}
            mode={mode}
            onClose={() => setActiveHotspotId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailDrawer({
  part,
  mode,
  onClose,
}: {
  part: TwinHotspot;
  mode: "HT" | "TTC";
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="relative border-t border-border-soft bg-bg p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-warm font-mono text-[12px] font-semibold text-warm-fg">
              {part.number}
            </span>
            <h3 className="font-display text-[20px] font-semibold tracking-tight text-fg">
              {part.label}
            </h3>
          </div>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-fg-muted">
            {part.description}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
            {part.count}
          </div>
          <div className="mt-1 font-mono text-[13px] font-medium tabular-nums text-fg">
            {part.priceFrom}
          </div>
        </div>
      </div>

      {part.productSlugs.length > 0 ? (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {part.productSlugs.slice(0, 2).map((slug) => {
            const p = PRODUCT_BY_SLUG[slug];
            if (!p) return null;
            return (
              <a
                key={slug}
                href={`/produit/${p.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border-soft bg-bg-elev p-3 transition hover:border-warm"
              >
                <div className="relative aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-bg">
                  {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                  <img
                    src={img(imagery[p.image], 120, 120)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                    {p.brand}
                  </div>
                  <div className="truncate text-[13px] font-medium text-fg">{p.name}</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="font-display text-[14px] font-semibold tabular-nums text-warm">
                      {formatPrice(p.priceHT, mode)} €
                    </span>
                    <span className="font-mono text-[10px] text-fg-subtle">{mode}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-warm" />
              </a>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-warm/30 bg-warm-soft p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm">
                Sur devis — clause fabricant
              </div>
              <p className="mt-1.5 text-[13px] text-fg">
                Ce composant nécessite un dimensionnement. Recevez un devis chiffré sous 24h
                ouvrées.
              </p>
            </div>
            <a
              href="/configurer"
              className="shrink-0 rounded-full bg-warm px-4 py-2 text-[12px] font-medium text-warm-fg transition hover:bg-warm-hover btn-soft"
            >
              Demander un devis
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-border text-fg-muted transition hover:border-fg hover:text-fg"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
