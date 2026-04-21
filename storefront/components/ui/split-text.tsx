"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * SplitText — letter-level kinetic reveal.
 * Each character stagger-slides up from below with a blur deflate.
 * Use for hero sub-lines or section titles.
 */
export function SplitText({
  text,
  className,
  stagger = 0.025,
  duration = 0.9,
  delay = 0,
  blur = true,
}: {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  blur?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from(word).map((ch, ci) => (
            <span
              key={`${ch}-${ci}`}
              className="inline-block overflow-hidden"
              style={{ lineHeight: "inherit" }}
            >
              <motion.span
                className="inline-block"
                initial={
                  blur
                    ? { y: "105%", opacity: 0, filter: "blur(6px)" }
                    : { y: "105%", opacity: 0 }
                }
                animate={
                  inView
                    ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                    : blur
                      ? { y: "105%", opacity: 0, filter: "blur(6px)" }
                      : { y: "105%", opacity: 0 }
                }
                transition={{
                  duration,
                  delay:
                    delay + (wi * word.length + ci) * stagger * 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
