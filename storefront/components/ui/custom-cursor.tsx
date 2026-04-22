"use client";

import { useEffect } from "react";

/**
 * Custom cursor — desktop-only, accent dot + halo ring.
 * Grows on interactive elements (a, button, [data-cursor="hover"]).
 * Respects prefers-reduced-motion and coarse pointers automatically (CSS).
 */
export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rm.matches) return;

    const root = document.documentElement;
    document.body.classList.add("cursor-ready");
    root.style.setProperty("--cursor-opacity", "0");

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isOverInteractive = false;
    let appeared = false;

    const INTERACTIVE_SEL = "a, button, input, textarea, select, [role='button'], [data-cursor='hover']";

    const tick = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      root.style.setProperty("--cursor-x", `${currentX}px`);
      root.style.setProperty("--cursor-y", `${currentY}px`);
      rafId = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!appeared) {
        currentX = e.clientX;
        currentY = e.clientY;
        appeared = true;
        root.style.setProperty("--cursor-opacity", "1");
      }
      const target = e.target as HTMLElement | null;
      const hover = !!target?.closest(INTERACTIVE_SEL);
      if (hover !== isOverInteractive) {
        isOverInteractive = hover;
        root.style.setProperty("--cursor-scale", hover ? "2.4" : "1");
      }
    };

    const handleLeave = () => {
      root.style.setProperty("--cursor-opacity", "0");
    };
    const handleEnter = () => {
      if (appeared) root.style.setProperty("--cursor-opacity", "1");
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.body.classList.remove("cursor-ready");
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="cursor-ring" />
      <div aria-hidden="true" className="cursor-dot" />
    </>
  );
}
