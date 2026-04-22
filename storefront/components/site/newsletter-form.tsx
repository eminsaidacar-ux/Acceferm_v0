"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "pill" | "row";
type Status = "idle" | "loading" | "ok" | "error";

/**
 * NewsletterForm — client, mocké.
 * Validation regex basique + feedback visuel. Pas d'API ici.
 */
export function NewsletterForm({
  variant = "pill",
  className,
  placeholder = "vous@entreprise.fr",
  cta = "S'inscrire",
  source,
}: {
  variant?: Variant;
  className?: string;
  placeholder?: string;
  cta?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simule API call
    await new Promise((r) => setTimeout(r, 900));
    // Signal source for future backend wiring
    if (source && typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "acceferm:newsletter",
          JSON.stringify({ email, source, at: new Date().toISOString() }),
        );
      } catch {
        /* ignore */
      }
    }
    setStatus("ok");
  }

  const inputCls =
    variant === "pill"
      ? "min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
      : "min-w-0 flex-1 rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none";

  const wrapCls =
    variant === "pill"
      ? "flex items-center gap-2 rounded-full border border-border bg-bg px-1 py-1"
      : "flex flex-col gap-2 sm:flex-row sm:items-center";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-full border border-signal-ok/30 bg-signal-ok/10 px-4 py-2 text-[13px] text-signal-ok"
          >
            <CheckCircle2 className="h-4 w-4" />
            Inscrit · premier envoi sous 30 jours.
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={false}
            animate={{ opacity: 1 }}
            className={wrapCls}
          >
            <input
              type="email"
              required
              name="email"
              autoComplete="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
              className={cn(
                inputCls,
                status === "error" && "text-signal-err placeholder:text-signal-err/60",
              )}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                variant === "pill"
                  ? "shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-medium text-accent-fg transition hover:bg-accent-hover disabled:opacity-60"
                  : "shrink-0 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover disabled:opacity-60",
              )}
            >
              {status === "loading" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Envoi…
                </span>
              ) : (
                cta
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p
          id="newsletter-error"
          className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-signal-err"
        >
          Email invalide — vérifiez le format.
        </p>
      )}
    </form>
  );
}
