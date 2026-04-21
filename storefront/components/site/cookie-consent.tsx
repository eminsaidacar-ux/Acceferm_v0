"use client";

import { AnimatePresence, motion } from "motion/react";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "acceferm.cmp.v1";

type Consent = "accept-all" | "reject-all" | "custom";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (c: Consent, data?: typeof prefs) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ choice: c, prefs: data ?? prefs, date: new Date().toISOString() }),
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-2xl rounded-2xl border border-border bg-bg p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] sm:left-6 sm:right-auto"
          role="dialog"
          aria-label="Préférences cookies"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              <Cookie className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-fg">Cookies & confidentialité</h2>
                <button
                  type="button"
                  onClick={() => save("reject-all", { necessary: true, analytics: false, marketing: false })}
                  aria-label="Fermer et refuser"
                  className="rounded-md p-1 text-fg-subtle transition hover:bg-bg-elev hover:text-fg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
                On utilise des cookies essentiels (panier, session) et des cookies analytics pour
                améliorer la plateforme. Rien d'envoyé à des réseaux publicitaires. Modifiable à
                tout moment depuis{" "}
                <a href="/legal/cookies" className="underline hover:text-fg">
                  la page Cookies
                </a>
                .
              </p>

              {expanded && (
                <div className="mt-4 space-y-2 border-t border-border-soft pt-4">
                  <ConsentRow
                    label="Cookies essentiels"
                    sub="Panier, session, CMP — toujours actifs"
                    checked={prefs.necessary}
                    disabled
                    onChange={() => {}}
                  />
                  <ConsentRow
                    label="Mesure d'audience"
                    sub="Analytics anonymisé (Plausible)"
                    checked={prefs.analytics}
                    onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                  />
                  <ConsentRow
                    label="Marketing"
                    sub="Aucun partenaire tiers activé pour l'instant"
                    checked={prefs.marketing}
                    onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                  />
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => save("accept-all", { necessary: true, analytics: true, marketing: true })}
                  className="rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
                >
                  Tout accepter
                </button>
                <button
                  type="button"
                  onClick={() => save("reject-all", { necessary: true, analytics: false, marketing: false })}
                  className="rounded-full border border-border px-4 py-2 text-[13px] text-fg transition hover:border-fg"
                >
                  Essentiels uniquement
                </button>
                {expanded ? (
                  <button
                    type="button"
                    onClick={() => save("custom", prefs)}
                    className="rounded-full border border-accent px-4 py-2 text-[13px] font-medium text-accent transition hover:bg-accent-soft"
                  >
                    Enregistrer mes choix
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-[12px] text-fg-muted underline underline-offset-2 hover:text-fg"
                  >
                    Personnaliser
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConsentRow({
  label,
  sub,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-[13px] transition hover:bg-bg-elev">
      <div className="min-w-0">
        <div className="font-medium text-fg">{label}</div>
        <div className="font-mono text-[11px] text-fg-subtle">{sub}</div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 accent-accent"
      />
    </label>
  );
}
