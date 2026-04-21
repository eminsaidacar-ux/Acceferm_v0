"use client";

import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Mask reveal pour titres : chaque ligne révèle son contenu
 * en glissant depuis le bas avec mask-overflow.
 *
 * Usage :
 *   <TextReveal>
 *     <span>Première ligne</span>
 *     <span>Deuxième ligne</span>
 *   </TextReveal>
 */
export function TextReveal({
  children,
  className,
  stagger = 0.08,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Wrap children to extract lines
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {items.map((child, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-1 leading-[inherit]"
          style={{ marginTop: i > 0 ? "-0.05em" : undefined }}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {child}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
