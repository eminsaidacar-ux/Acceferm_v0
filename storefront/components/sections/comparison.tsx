import { comparisonRows } from "@/lib/data";

export function Comparison() {
  return (
    <section className="border-t border-border-soft bg-bg-elev py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            La différence honnête
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[0.98] tracking-tight text-fg lg:text-7xl">
            On respecte les incumbents.
            <br />
            <em className="text-fg-muted">On les modernise.</em>
          </h2>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-bg">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-border-soft">
            <div className="p-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Critère
            </div>
            <div className="border-l border-border-soft p-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Incumbent
            </div>
            <div className="border-l border-border-soft p-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
              AcceFerm Pro
            </div>
          </div>

          {comparisonRows.map((row) => (
            <div
              key={row.criterion}
              className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-border-soft"
            >
              <div className="p-6 text-[14px] font-medium text-fg">{row.criterion}</div>
              <div className="flex items-start gap-2 border-l border-border-soft p-6 text-[13px] text-fg-muted">
                <span className="mt-2 inline-block h-px w-3 bg-border" />
                <span>{row.incumbent}</span>
              </div>
              <div className="flex items-start gap-2 border-l border-border-soft p-6 text-[13px] text-fg">
                <span className="mt-2 inline-block h-px w-3 bg-fg" />
                <span>{row.acceferm}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
