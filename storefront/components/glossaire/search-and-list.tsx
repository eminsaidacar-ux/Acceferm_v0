"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export type GlossaryTerm = { term: string; def: string; related?: string[] };

/**
 * GlossaireSearchAndList — client, recherche live sur les termes + ancres A-Z.
 * Si une query est active et match un seul groupe, on masque les autres.
 */
export function GlossaireSearchAndList({
  terms,
  letters,
  grouped,
}: {
  terms: GlossaryTerm[];
  letters: string[];
  grouped: Record<string, GlossaryTerm[]>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return terms.filter((t) => {
      const hay = `${t.term} ${t.def} ${t.related?.join(" ") ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, terms]);

  return (
    <>
      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-border bg-bg-elev px-4 py-3">
        <Search className="h-5 w-5 text-fg-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un terme — ex : VIGIK, 2easy, IP65…"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted hover:text-fg"
          >
            Effacer
          </button>
        )}
      </div>

      {filtered === null ? (
        <div className="mt-8 flex flex-wrap gap-1.5 text-[12px]">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="grid h-8 w-8 place-items-center rounded-full border border-border bg-bg font-mono text-fg-muted transition hover:border-accent hover:bg-accent hover:text-accent-fg"
              data-cursor="hover"
            >
              {l}
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""} pour « {query} »
        </div>
      )}

      {/* Results */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-5xl">
          {filtered === null ? (
            letters.map((l) => (
              <div
                key={l}
                id={`letter-${l}`}
                className="mb-16 scroll-mt-24 border-t border-border pt-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="chapter-num text-[72px] leading-none lg:text-[120px]">
                    {l}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                    {grouped[l].length} termes
                  </span>
                </div>

                <dl className="mt-10 grid gap-px bg-border-soft sm:grid-cols-2">
                  {grouped[l].map((t) => (
                    <TermCard key={t.term} t={t} />
                  ))}
                </dl>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-border-soft bg-bg-elev p-10 text-center">
              <p className="font-display text-[22px] font-semibold text-fg">
                Aucun terme ne correspond.
              </p>
              <p className="mt-2 text-[14px] text-fg-muted">
                Essayez « VIGIK », « photocellule » ou « EN 12453 ».
              </p>
            </div>
          ) : (
            <dl className="grid gap-px bg-border-soft sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {filtered.map((t) => (
                  <motion.div
                    key={t.term}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TermCard t={t} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          )}
        </div>
      </section>
    </>
  );
}

function TermCard({ t }: { t: GlossaryTerm }) {
  return (
    <div className="flex h-full flex-col gap-3 bg-bg p-6 transition hover:bg-bg-elev">
      <dt className="font-display text-[18px] font-semibold leading-tight text-fg">{t.term}</dt>
      <dd className="text-[14px] leading-relaxed text-fg-muted">{t.def}</dd>
      {t.related && t.related.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
          <span>Voir aussi ·</span>
          {t.related.map((r) => (
            <span
              key={r}
              className="rounded-full border border-border-soft bg-bg px-2 py-0.5"
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
