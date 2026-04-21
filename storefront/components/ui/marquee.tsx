import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — pure CSS infinite ticker. Duplicate children internally.
 * Options: direction, speed (slow/medium/fast), pauseOnHover.
 */
export function Marquee({
  children,
  direction = "left",
  speed = "medium",
  pauseOnHover = true,
  className,
  fade = true,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean;
}) {
  const animClass =
    speed === "slow" ? "marquee-slow" : speed === "fast" ? "marquee" : "marquee";
  const styleSpeed =
    speed === "fast" ? { animationDuration: "35s" } : undefined;
  const dirClass = direction === "right" ? "marquee-reverse" : animClass;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "marquee-pause",
        className,
      )}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={cn("flex w-max items-center gap-12", dirClass)}
        style={styleSpeed}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
