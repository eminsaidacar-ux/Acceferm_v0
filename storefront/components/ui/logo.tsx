import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="font-display text-[22px] leading-none tracking-tight text-fg">
        AcceFerm
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
        Pro
      </span>
    </span>
  );
}
