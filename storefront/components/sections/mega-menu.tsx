"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { catalogTree, type Family } from "@/lib/catalog-tree";
import { cn } from "@/lib/utils";

/**
 * Mega-menu desktop raja-grade :
 * - 5 familles "primary" visibles + 1 trigger "Plus"
 * - Hover bridge robuste (cancel sur button + panel, timeout 280ms, pointer events)
 * - Panel plein-largeur 1440 px avec catégories + sous-catégories enrichies
 */
export function MegaMenu() {
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const primaries = catalogTree.filter((f) => f.primary);
  const others = catalogTree.filter((f) => !f.primary);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openFamily = useCallback(
    (slug: string) => {
      cancelClose();
      setActive(slug);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActive(null), 280);
  }, [cancelClose]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const activeFamily = active
    ? active === "__more__"
      ? null
      : catalogTree.find((f) => f.slug === active)
    : null;
  const showMore = active === "__more__";

  return (
    <nav
      aria-label="Catalogue complet"
      className="relative hidden lg:flex"
      onPointerLeave={scheduleClose}
    >
      <ul className="flex items-center gap-6 text-[13px] text-fg-muted">
        {primaries.map((f) => (
          <li key={f.slug} onPointerEnter={() => openFamily(f.slug)}>
            <button
              type="button"
              onClick={() => setActive((a) => (a === f.slug ? null : f.slug))}
              aria-expanded={active === f.slug}
              className={cn(
                "inline-flex items-center gap-1 py-2 transition",
                active === f.slug ? "text-fg" : "hover:text-fg",
              )}
            >
              {f.name}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition", active === f.slug && "rotate-180")}
              />
            </button>
          </li>
        ))}
        {others.length > 0 && (
          <li onPointerEnter={() => openFamily("__more__")}>
            <button
              type="button"
              onClick={() => setActive((a) => (a === "__more__" ? null : "__more__"))}
              aria-expanded={active === "__more__"}
              className={cn(
                "inline-flex items-center gap-1 py-2 transition",
                active === "__more__" ? "text-fg" : "hover:text-fg",
              )}
            >
              Plus
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition", active === "__more__" && "rotate-180")}
              />
            </button>
          </li>
        )}
      </ul>

      <AnimatePresence>
        {activeFamily && (
          <FamilyPanel
            key={activeFamily.slug}
            family={activeFamily}
            onClose={() => setActive(null)}
            onEnter={cancelClose}
            onLeave={scheduleClose}
          />
        )}
        {showMore && (
          <MorePanel
            key="more"
            families={others}
            onClose={() => setActive(null)}
            onEnter={cancelClose}
            onLeave={scheduleClose}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function FamilyPanel({
  family,
  onClose,
  onEnter,
  onLeave,
}: {
  family: Family;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute left-1/2 top-full z-30 mt-3 w-[min(92vw,1440px)] -translate-x-1/2"
    >
      {/* Invisible bridge above panel to connect with nav buttons */}
      <div aria-hidden className="absolute -top-4 inset-x-0 h-5" />
      <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_28px_72px_-24px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between gap-4 border-b border-border-soft bg-bg-elev px-6 py-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              Famille
            </div>
            <div className="mt-0.5 font-display text-[20px] font-semibold tracking-tight text-fg">
              {family.name}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              {family.tagline}
            </div>
            <a
              href={`/catalogue/${family.categories[0]?.slug ?? "photocellules"}`}
              onClick={onClose}
              className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:text-accent-hover"
            >
              Voir la famille entière
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-4 border-r border-border-soft bg-bg-elev/40">
            <ul className="p-3">
              {family.categories.slice(0, 10).map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/catalogue/${c.slug}`}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between rounded-lg px-3 py-2.5 transition hover:bg-bg",
                      c.featured && "bg-accent-soft",
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[13px] font-medium text-fg">
                        {c.name}
                        {c.featured && <Sparkles className="h-3 w-3 text-accent" />}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                        {c.subs.length} sous-catégories
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-8 p-6">
            <div className="grid grid-cols-3 gap-x-6 gap-y-5">
              {family.categories
                .flatMap((c) =>
                  c.subs.slice(0, 2).map((s) => ({ cat: c, sub: s })),
                )
                .slice(0, 12)
                .map(({ cat, sub }) => (
                  <a
                    key={`${cat.slug}-${sub.slug}`}
                    href={`/catalogue/${cat.slug}`}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      {cat.name}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <div className="text-[13px] font-medium text-fg group-hover:text-accent">
                        {sub.name}
                      </div>
                      <div className="font-mono text-[11px] tabular-nums text-fg-subtle">
                        {sub.productCount} réf
                      </div>
                    </div>
                    {sub.priceFromHT && (
                      <div className="mt-0.5 font-mono text-[10px] text-fg-subtle">
                        dès {sub.priceFromHT} € HT
                      </div>
                    )}
                  </a>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-border-soft bg-bg-elev/60 p-4">
              <div className="font-mono text-[11px] text-fg-muted">
                Pas sûr du modèle ? Le Digital Gate Twin vous guide par composant.
              </div>
              <a
                href="/configurer"
                onClick={onClose}
                className="shrink-0 rounded-full bg-fg px-3.5 py-1.5 text-[12px] font-medium text-accent-fg hover:bg-accent"
              >
                Ouvrir le configurateur
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MorePanel({
  families,
  onClose,
  onEnter,
  onLeave,
}: {
  families: Family[];
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute right-0 top-full z-30 mt-3 w-[min(80vw,640px)]"
    >
      <div aria-hidden className="absolute -top-4 inset-x-0 h-5" />
      <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_28px_72px_-24px_rgba(0,0,0,0.18)]">
        <div className="border-b border-border-soft bg-bg-elev px-5 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
            Autres familles
          </div>
          <div className="mt-0.5 text-[13px] text-fg-muted">
            Volets tubulaires, goulottes, signalisation — utiles mais moins volumineux
          </div>
        </div>
        <ul className="grid grid-cols-1 divide-y divide-border-soft sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          {families.map((f) => (
            <li key={f.slug}>
              <a
                href={`/catalogue/${f.categories[0]?.slug ?? ""}`}
                onClick={onClose}
                className="group flex h-full flex-col gap-2 p-5 transition hover:bg-bg-elev"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-semibold text-fg group-hover:text-accent">
                    {f.name}
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <div className="text-[12px] text-fg-muted">{f.tagline}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                  {f.categories.length} catégories
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
