"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode, MouseEventHandler } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card avec léger 3D tilt suivant la souris. Award-winning subtle.
 * Maximum 8° de rotation pour rester chic, jamais gimmicky.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
  scale = 1.01,
}: {
  children: ReactNode;
  className?: string;
  /** Max degrees of tilt */
  intensity?: number;
  /** Scale on hover */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 240,
    damping: 22,
  });
  const rotY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 240,
    damping: 22,
  });
  const sc = useSpring(1, { stiffness: 280, damping: 22 });

  const handleMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onEnter = () => sc.set(scale);
  const onLeave = () => {
    sc.set(1);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        scale: sc,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
