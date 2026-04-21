import { Star } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { trustMetrics } from "@/lib/data";

export function TrustStrip() {
  return (
    <section aria-label="Chiffres clés" className="border-b border-border-soft bg-bg-elev">
      <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustMetrics.map((m, i) => (
            <div
              key={m.label}
              className={[
                "flex flex-col gap-1",
                i > 0 && "sm:border-l sm:border-border sm:pl-4 lg:pl-6",
              ].join(" ")}
            >
              <div className="flex items-baseline gap-1.5">
                <AnimatedCounter
                  value={m.value}
                  className="font-display text-[28px] font-semibold leading-none tracking-tight tabular-nums text-accent"
                />
                {m.label.includes("Avis") && (
                  <Star className="h-3.5 w-3.5 fill-signal-warn text-signal-warn" />
                )}
              </div>
              <div className="text-[12px] leading-tight text-fg-muted">{m.label}</div>
              {m.note && (
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                  {m.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
