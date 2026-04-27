"use client";

import { useMemo, useState } from "react";
import { twinSchemas } from "@/lib/twin-schemas";
import { TwinDetail } from "./twin-detail";

/**
 * Digital Twin Explorer — page /assistant-diagnostic (renommé v0.8).
 *
 * 7 schémas SVG interactifs (coulissant, battant, sectionnelle, rideau,
 * porte auto, barrière, borne).
 *
 * Performance :
 * - SVG inline statiques (rendus dans twin-schemas.tsx)
 * - Interactions au clic + clavier (Enter/Espace), pas de hover déclenchant sur mobile
 * - Pas de motion/react, transitions CSS uniquement
 * - prefers-reduced-motion respecté via globals.css
 */
export function TwinExplorer() {
  const [activeSchemaId, setActiveSchemaId] = useState<string>(twinSchemas[0].id);
  const schema = useMemo(
    () => twinSchemas.find((s) => s.id === activeSchemaId) ?? twinSchemas[0],
    [activeSchemaId],
  );
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    schema.defaultHotspotId,
  );

  const switchSchema = (id: string) => {
    setActiveSchemaId(id);
    const next = twinSchemas.find((s) => s.id === id);
    setActiveHotspotId(next?.defaultHotspotId ?? null);
  };

  const active = activeHotspotId
    ? schema.hotspots.find((h) => h.id === activeHotspotId) ?? null
    : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg-elev">
      {/* Sélecteur de type de fermeture — boutons radio (rôle tablist) */}
      <div className="border-b border-border-soft bg-bg/60 px-4 py-3">
        <div
          role="tablist"
          aria-label="Type de fermeture"
          className="-mx-1 flex gap-1 overflow-x-auto scroll-smooth px-1"
        >
          {twinSchemas.map((s) => {
            const selected = activeSchemaId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => switchSchema(s.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition min-h-12 ${
                  selected
                    ? "bg-accent text-accent-fg"
                    : "bg-bg text-fg-muted hover:text-fg"
                }`}
              >
                <span aria-hidden="true" className="font-display text-base leading-none">
                  {s.glyph}
                </span>
                {s.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout : SVG + détail */}
      <div className="grid gap-0 lg:grid-cols-12">
        {/* SVG viewport */}
        <div className="relative lg:col-span-7 xl:col-span-8">
          <div className="aspect-[9/6] w-full bg-gradient-to-b from-bg-elev via-bg to-bg-soft">
            <svg
              viewBox="0 0 900 560"
              className="h-full w-full"
              role="img"
              aria-label={`Schéma interactif ${schema.name}`}
            >
              {schema.renderBackground()}

              {schema.hotspots.map((part) => {
                const isActive = active?.id === part.id;
                return (
                  <g
                    key={part.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Composant ${part.number} : ${part.label}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveHotspotId(part.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveHotspotId(part.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <circle
                      cx={part.position.x}
                      cy={part.position.y}
                      r={isActive ? 16 : 13}
                      fill={isActive ? "var(--color-accent)" : "var(--color-bg)"}
                      stroke={isActive ? "var(--color-accent)" : "var(--color-fg)"}
                      strokeWidth="2"
                      className="transition-[r,fill,stroke] duration-200"
                    />
                    <text
                      x={part.position.x}
                      y={part.position.y + 4}
                      fontSize="12"
                      fontWeight="600"
                      textAnchor="middle"
                      fill={isActive ? "var(--color-accent-fg)" : "var(--color-fg)"}
                      pointerEvents="none"
                    >
                      {part.number}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="border-t border-border-soft bg-bg/80 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            Cliquez sur un numéro pour identifier le composant
          </p>
        </div>

        {/* Panneau détail */}
        <div className="border-t border-border-soft p-4 lg:col-span-5 lg:border-l lg:border-t-0 xl:col-span-4">
          {active ? (
            <TwinDetail part={active} onClose={() => setActiveHotspotId(null)} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border-soft p-8 text-center">
              <p className="text-[13px] text-fg-muted">
                Sélectionnez un composant numéroté sur le schéma pour voir les
                références compatibles en stock.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
