"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Lock,
  NotebookPen,
  Receipt,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type TemplateIcon =
  | "fileText"
  | "fileCheck2"
  | "wrench"
  | "clipboardList"
  | "receipt"
  | "notebookPen"
  | "fileSpreadsheet";

const ICONS = {
  fileText: FileText,
  fileCheck2: FileCheck2,
  wrench: Wrench,
  clipboardList: ClipboardList,
  receipt: Receipt,
  notebookPen: NotebookPen,
  fileSpreadsheet: FileSpreadsheet,
} as const;

export type AccessTier = "free" | "pro" | "studio";
export type Template = {
  icon: TemplateIcon;
  title: string;
  desc: string;
  format: string;
  size: string;
  tag: string;
  tier: AccessTier;
  /** Optionnel : prix HT quand tier === "studio" */
  priceHT?: number;
};

const TIER_META: Record<
  AccessTier,
  {
    label: string;
    colorClass: string;
    pillClass: string;
    icon: typeof CheckCircle2;
    cta: string;
    note: string;
  }
> = {
  free: {
    label: "Gratuit · téléchargement immédiat",
    colorClass: "text-signal-ok",
    pillClass: "bg-signal-ok/10 text-signal-ok border-signal-ok/30",
    icon: CheckCircle2,
    cta: "Télécharger",
    note: "Aucun compte requis · mise à jour trimestrielle.",
  },
  pro: {
    label: "Réservé compte pro",
    colorClass: "text-accent",
    pillClass: "bg-accent-soft text-accent border-accent/30",
    icon: UserCheck,
    cta: "Créer un compte pro",
    note: "Validation SIRET en 2h · gratuit à vie.",
  },
  studio: {
    label: "Sur mesure · bureau d'études",
    colorClass: "text-peach",
    pillClass: "bg-peach-soft text-peach-ink border-peach/30",
    icon: Lock,
    cta: "Demander un devis",
    note: "Rédaction par notre bureau d'études IEF, 150-450 € HT selon complexité.",
  },
};

const TIER_FILTERS: Array<{ id: AccessTier | "all"; label: string }> = [
  { id: "all", label: "Tous les gabarits" },
  { id: "free", label: "Gratuits immédiats" },
  { id: "pro", label: "Compte pro" },
  { id: "studio", label: "Bureau d'études" },
];

/**
 * GabaritsFiltersGrid — client, 3 tiers d'accès + filtre par catégorie.
 * - free : download immédiat avec état done
 * - pro : CTA vers /compte-pro/nouveau
 * - studio : CTA vers /contact
 */
export function GabaritsFiltersGrid({
  templates,
  categories,
}: {
  templates: Template[];
  categories: string[];
}) {
  const [tier, setTier] = useState<AccessTier | "all">("all");
  const [category, setCategory] = useState<string>(categories[0] ?? "Tout");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = templates;
    if (tier !== "all") list = list.filter((t) => t.tier === tier);
    if (category !== "Tout") list = list.filter((t) => t.tag === category);
    return list;
  }, [tier, category, templates]);

  async function handleDownload(title: string) {
    setDownloading(title);
    await new Promise((r) => setTimeout(r, 700));
    setDownloading(null);
    setDownloaded((s) => new Set(s).add(title));
  }

  const counts = {
    all: templates.length,
    free: templates.filter((t) => t.tier === "free").length,
    pro: templates.filter((t) => t.tier === "pro").length,
    studio: templates.filter((t) => t.tier === "studio").length,
  };

  return (
    <>
      {/* Tier filter — 3 blocs visuellement distincts */}
      <div className="mt-12">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
          Accès
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {TIER_FILTERS.map((f) => {
            const on = tier === f.id;
            const count = counts[f.id];
            const meta = f.id === "all" ? null : TIER_META[f.id];
            const Icon = meta?.icon ?? CheckCircle2;
            return (
              <button
                type="button"
                key={f.id}
                onClick={() => setTier(f.id)}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                  on
                    ? "border-fg bg-fg text-bg"
                    : "border-border-soft bg-bg text-fg hover:border-fg",
                )}
              >
                {meta && (
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border",
                      on ? "border-bg/20 bg-bg/10 text-bg" : meta.pillClass,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="text-[13px] font-medium leading-tight">{f.label}</div>
                  <div
                    className={cn(
                      "mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em]",
                      on ? "text-bg/70" : "text-fg-subtle",
                    )}
                  >
                    {count} {count > 1 ? "gabarits" : "gabarit"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category filter — pills */}
      <div className="mt-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
          Thème
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          {categories.map((c) => {
            const on = category === c;
            const count =
              c === "Tout" ? templates.length : templates.filter((t) => t.tag === c).length;
            return (
              <button
                type="button"
                key={c}
                onClick={() => setCategory(c)}
                disabled={count === 0}
                className={cn(
                  "rounded-full px-4 py-1.5 transition",
                  on
                    ? "bg-accent font-medium text-accent-fg"
                    : "border border-border text-fg-muted hover:border-fg hover:text-fg disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg-muted",
                )}
              >
                {c}
                <span
                  className={cn(
                    "ml-1.5 font-mono text-[11px]",
                    on ? "text-accent-fg/80" : "text-fg-subtle",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-border-soft bg-bg-elev p-10 text-center">
            <p className="font-display text-[22px] font-semibold text-fg">
              Aucun gabarit pour cette combinaison.
            </p>
            <p className="mt-2 text-[14px] text-fg-muted">
              Essayez de changer de tier ou de thème, ou{" "}
              <a href="/contact" className="underline">
                demandez un gabarit sur-mesure
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {filtered.map((t) => {
                const Icon = ICONS[t.icon];
                const meta = TIER_META[t.tier];
                const MetaIcon = meta.icon;
                const isDownloading = downloading === t.title;
                const isDone = downloaded.has(t.title);
                return (
                  <motion.article
                    key={t.title}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="card group relative flex flex-col gap-5 rounded-2xl border border-border-soft bg-bg p-7"
                  >
                    {/* Tier pill top-right */}
                    <span
                      className={cn(
                        "absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
                        meta.pillClass,
                      )}
                    >
                      <MetaIcon className="h-3 w-3" />
                      {t.tier === "free"
                        ? "Gratuit"
                        : t.tier === "pro"
                          ? "Compte pro"
                          : "Sur devis"}
                    </span>

                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-bg-elev text-fg">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <h2 className="font-display text-[22px] font-semibold leading-tight text-fg">
                        {t.title}
                      </h2>
                      <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                        {t.desc}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-soft pt-4">
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                          {t.format} · {t.size}
                        </div>
                        {t.priceHT && (
                          <div className="mt-0.5 font-mono text-[11px] tabular text-peach">
                            dès {t.priceHT} € HT
                          </div>
                        )}
                      </div>
                      {t.tier === "free" ? (
                        <button
                          type="button"
                          onClick={() => handleDownload(t.title)}
                          disabled={isDownloading}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] transition",
                            isDone
                              ? "bg-signal-ok/15 text-signal-ok"
                              : "bg-fg text-bg hover:bg-accent",
                          )}
                          data-cursor="hover"
                        >
                          {isDownloading ? (
                            <>
                              <Download className="h-3 w-3 animate-pulse" />
                              …
                            </>
                          ) : isDone ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Téléchargé
                            </>
                          ) : (
                            <>
                              <Download className="h-3 w-3" />
                              {meta.cta}
                            </>
                          )}
                        </button>
                      ) : (
                        <a
                          href={t.tier === "pro" ? "/compte-pro/nouveau" : "/contact"}
                          className="inline-flex items-center gap-1.5 rounded-full border border-fg bg-bg px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-fg transition hover:bg-fg hover:text-bg"
                          data-cursor="hover"
                        >
                          {meta.cta}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-start gap-1.5 font-mono text-[10px] leading-relaxed text-fg-subtle">
                      <MetaIcon className={cn("mt-[2px] h-2.5 w-2.5 shrink-0", meta.colorClass)} />
                      <span>{meta.note}</span>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Helper footer */}
        <div className="mt-10 grid gap-3 rounded-3xl border border-border-soft bg-bg-elev p-6 lg:grid-cols-3 lg:p-8">
          {(["free", "pro", "studio"] as const).map((t) => {
            const meta = TIER_META[t];
            const Icon = meta.icon;
            return (
              <div key={t} className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border",
                    meta.pillClass,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-fg">{meta.label}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-fg-muted">
                    {meta.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
