"use client";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counter qui s'anime de 0 vers la valeur cible quand entre dans le viewport.
 * Si la valeur contient du texte (ex "3 000+", "4,8/5", "24h"), on extrait le
 * nombre et on conserve le suffixe.
 */
export function AnimatedCounter({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Parse "3 000+" → number = 3000, prefix = "", suffix = "+"
  const parsed = parseValue(value);
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => formatNumber(v, parsed));
  const [text, setText] = useState(formatNumber(0, parsed));

  useEffect(() => {
    const unsub = display.on("change", (latest) => setText(latest));
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!inView || parsed.number === null) return;
    const controls = animate(mv, parsed.number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, parsed.number, duration, mv]);

  // If we couldn't parse a number, just show the value
  if (parsed.number === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

type Parsed = {
  number: number | null;
  prefix: string;
  suffix: string;
  decimal: boolean;
  groupingSep: string;
};

function parseValue(raw: string): Parsed {
  // Match: optional prefix non-digit, number with optional decimal (FR comma or .), suffix
  const m = raw.match(/^([^\d-]*)(-?\d[\d\s,.]*)(.*)$/);
  if (!m) return { number: null, prefix: "", suffix: raw, decimal: false, groupingSep: " " };

  const prefix = m[1];
  const numRaw = m[2];
  const suffix = m[3];

  // Detect FR thousand separator (space) and decimal (comma or dot)
  const groupingSep = numRaw.includes(" ") ? " " : "";
  const hasComma = numRaw.includes(",");
  const decimal = hasComma || (numRaw.includes(".") && !groupingSep);
  const cleaned = numRaw.replace(/\s/g, "").replace(",", ".");
  const number = Number(cleaned);
  if (Number.isNaN(number)) return { number: null, prefix, suffix, decimal, groupingSep };

  return { number, prefix, suffix, decimal, groupingSep };
}

function formatNumber(n: number, p: Parsed): string {
  if (p.number === null) return "";
  let val: string;
  if (p.decimal) {
    val = n.toFixed(1).replace(".", ",");
  } else if (p.groupingSep === " ") {
    val = Math.round(n).toLocaleString("fr-FR");
  } else {
    val = String(Math.round(n));
  }
  return `${p.prefix}${val}${p.suffix}`;
}
