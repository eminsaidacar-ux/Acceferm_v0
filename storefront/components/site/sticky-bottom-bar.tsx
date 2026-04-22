"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock, Phone, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * StickyBottomBar — barre de conversion persistante.
 * - Visible après scroll > 300px
 * - Desktop : promo + timer + phone + CTA
 * - Mobile : compact avec swipe
 * - Fermable (sessionStorage, réapparaît à la prochaine visite)
 */

function nextCutoff(): Date {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setHours(16, 0, 0, 0);
  if (now.getTime() > cutoff.getTime()) {
    // Demain 16h
    cutoff.setDate(cutoff.getDate() + 1);
  }
  // Skip weekend
  const day = cutoff.getDay();
  if (day === 6) cutoff.setDate(cutoff.getDate() + 2); // samedi → lundi
  if (day === 0) cutoff.setDate(cutoff.getDate() + 1); // dimanche → lundi
  return cutoff;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00h 00m";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

export function StickyBottomBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState("—");

  useEffect(() => {
    // Respect previous dismissal in this session
    if (sessionStorage.getItem("acceferm:sticky-dismissed") === "1") {
      setDismissed(true);
      return;
    }

    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Countdown live
    const updateCountdown = () => {
      const now = Date.now();
      const cutoff = nextCutoff().getTime();
      setCountdown(formatCountdown(cutoff - now));
    };
    updateCountdown();
    const id = setInterval(updateCountdown, 30_000); // tick toutes 30s

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  function close() {
    setDismissed(true);
    try {
      sessionStorage.setItem("acceferm:sticky-dismissed", "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          key="sticky"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-3 md:px-6 md:pb-5"
          aria-label="Barre promotionnelle"
        >
          <div className="pointer-events-auto mx-auto flex max-w-[1440px] items-center gap-3 overflow-hidden rounded-full border border-border bg-bg-ink text-bg shadow-[0_18px_48px_-14px_rgba(0,0,0,0.35)] lg:gap-4">
            {/* Urgency timer — desktop only */}
            <div className="hidden min-w-0 flex-1 items-center gap-3 py-2 pl-5 md:flex">
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <Clock className="h-4 w-4 shrink-0 text-bg/70" />
              <span className="truncate text-[13px]">
                Commandez avant{" "}
                <span className="font-mono tabular font-semibold text-accent">
                  16h00
                </span>{" "}
                · livraison IDF demain ·{" "}
                <span className="font-mono tabular text-bg/70">{countdown} restants</span>
              </span>
            </div>

            {/* Mobile compact */}
            <div className="flex min-w-0 flex-1 items-center gap-2 py-2 pl-4 md:hidden">
              <Truck className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span className="truncate text-[12px]">
                Livraison <span className="font-semibold">IDF demain</span> · avant{" "}
                <span className="font-mono tabular text-accent">16h</span>
              </span>
            </div>

            {/* CTA phone */}
            <a
              href="tel:+33184000017"
              className="group hidden shrink-0 items-center gap-2 border-l border-border-soft/20 px-4 py-2.5 text-[13px] transition hover:bg-bg/10 sm:inline-flex"
              aria-label="Appeler le SAV technique"
            >
              <Phone className="h-3.5 w-3.5 text-accent transition group-hover:scale-110" />
              <span className="font-mono tabular font-semibold">01 84 XX XX 17</span>
            </a>

            {/* Primary CTA */}
            <a
              href="/configurer"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover md:px-5 md:py-2.5"
              data-cursor="hover"
            >
              <span className="hidden md:inline">Devis 24h</span>
              <span className="md:hidden">Devis</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Fermer la bannière"
              className="mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-bg/60 transition hover:bg-bg/10 hover:text-bg md:mr-3"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
