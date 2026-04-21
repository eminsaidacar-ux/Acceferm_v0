"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useRef } from "react";

/**
 * Wrap any element to give it a subtle magnetic-cursor attraction.
 * Used on primary CTAs for that "premium tactile" feel.
 *
 * Usage :
 *   <Magnetic strength={0.35}>
 *     <button>Primary CTA</button>
 *   </Magnetic>
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: ReactNode;
  /** 0 = no movement, 1 = follows cursor 1:1 (subtle = 0.2 to 0.5) */
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.6 });

  const handleMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
