"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ClipboardList,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  NotebookPen,
  Receipt,
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

export type Template = {
  icon: TemplateIcon;
  title: string;
  desc: string;
  format: string;
  size: string;
  tag: string;
};

/**
 * GabaritsFiltersGrid — client, filtres par catégorie + état download (mock).
 */
export function GabaritsFiltersGrid({
  templates,
  categories,
}: {
  templates: Template[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>(categories[0] ?? "Tout");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (active === "Tout") return templates;
    return templates.filter((t) => t.tag === active);
  }, [active, templates]);

  async function handleDownload(title: string) {
    setDownloading(title);
    await new Promise((r) => setTimeout(r, 700));
    setDownloading(null);
    setDownloaded((s) => new Set(s).add(title));
  }

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center gap-2 text-[13px]">
        {categories.map((c) => {
          const on = active === c;
          const count =
            c === "Tout" ? templates.length : templates.filter((t) => t.tag === c).length;
          return (
            <button
              type="button"
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                on
                  ? "bg-accent font-medium text-accent-fg"
                  : "border border-border text-fg-muted hover:border-fg hover:text-fg",
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

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {filtered.map((t) => {
            const Icon = ICONS[t.icon];
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
                className="card group flex flex-col gap-5 rounded-2xl border border-border-soft bg-bg p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-bg-elev text-fg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-bg-elev px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                    {t.tag}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-[22px] font-semibold leading-tight text-fg">
                    {t.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{t.desc}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  <span>
                    {t.format} · {t.size}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(t.title)}
                    disabled={isDownloading}
                    className={cn(
                      "inline-flex items-center gap-1.5 font-medium transition",
                      isDone ? "text-signal-ok" : "text-accent group-hover:translate-x-0.5",
                    )}
                    data-cursor="hover"
                  >
                    {isDownloading ? (
                      <>
                        <Download className="h-3.5 w-3.5 animate-pulse" />
                        …
                      </>
                    ) : isDone ? (
                      "Téléchargé ✓"
                    ) : (
                      <>
                        Télécharger
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
