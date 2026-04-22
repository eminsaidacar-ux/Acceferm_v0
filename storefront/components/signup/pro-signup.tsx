"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileUp,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BENEFITS = [
  "Prix HT par défaut · bascule HT/TTC",
  "Remise Pro Silver −5 % immédiate",
  "Historique chantier + facture PDF",
  "Re-commande 1-clic · import CSV",
  "Livraison 24h IDF garantie",
  "SAV technique téléphonique dédié",
];

const METIERS = [
  "Métallier / serrurier",
  "Électricien courant faible",
  "Artisan portail / menuisier",
  "Ascensoriste",
  "Entreprise générale / TCE",
  "Syndic / bailleur social",
  "Collectivité / bureau technique",
  "Autre pro du bâtiment",
];

const STEPS = ["Entreprise", "Contact", "Documents", "Fait"] as const;

export function ProSignup() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [siretState, setSiretState] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [uploaded, setUploaded] = useState<string | null>(null);

  const simulateSiretCheck = (value: string) => {
    setSiretState("checking");
    setTimeout(() => {
      if (value.replace(/\s/g, "").length >= 14) setSiretState("valid");
      else setSiretState("invalid");
    }, 700);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-3xl border border-border bg-bg">
          {/* Progress */}
          <ol className="flex items-center border-b border-border-soft">
            {STEPS.map((s, i) => {
              const active = step === i;
              const done = step > i;
              return (
                <li
                  key={s}
                  className={cn(
                    "flex flex-1 items-center gap-3 px-4 py-4",
                    i > 0 && "border-l border-border-soft",
                    active || done ? "text-fg" : "text-fg-subtle",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full font-mono text-[11px] font-semibold",
                      done
                        ? "bg-accent text-accent-fg"
                        : active
                          ? "border border-accent text-accent"
                          : "border border-border text-fg-subtle",
                    )}
                  >
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em]">{s}</span>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
                  Votre société
                </h2>
                <p className="mt-2 text-[13px] text-fg-muted">
                  On vérifie automatiquement votre SIRET contre la base INSEE pour valider le statut
                  pro en moins de 2h ouvrées.
                </p>

                <div className="mt-8 space-y-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      SIRET
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="812 345 678 00012"
                        onChange={(e) => simulateSiretCheck(e.target.value)}
                        className="w-full rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 pr-10 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none"
                      />
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        {siretState === "checking" && (
                          <Loader2 className="h-4 w-4 animate-spin text-fg-muted" />
                        )}
                        {siretState === "valid" && (
                          <CheckCircle2 className="h-4 w-4 text-signal-ok" />
                        )}
                        {siretState === "invalid" && (
                          <span className="font-mono text-[10px] font-semibold text-signal-err">
                            14 chiffres
                          </span>
                        )}
                      </div>
                    </div>
                    {siretState === "valid" && (
                      <div className="mt-2 rounded-lg bg-signal-ok/10 px-3 py-2 font-mono text-[11px] text-signal-ok">
                        ✓ INSEE · IEF & CO · 95240 Cormeilles-en-Parisis · NAF 43.21A
                      </div>
                    )}
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Raison sociale" placeholder="IEF & Co" />
                    <Field label="TVA intra" placeholder="FR 12 345678901" />
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      Métier principal
                    </span>
                    <select className="rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg focus:border-accent focus:outline-none">
                      <option value="">Sélectionnez…</option>
                      {METIERS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Salariés" placeholder="1-5" />
                    <Field label="CA annuel estimé" placeholder="250 k€" />
                    <Field label="Zone d'intervention" placeholder="IDF 75/92/95" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
                  Contact dirigeant
                </h2>
                <p className="mt-2 text-[13px] text-fg-muted">
                  Cette personne sera le contact commercial principal et recevra les factures.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field label="Prénom" placeholder="Lucas" />
                  <Field label="Nom" placeholder="Martin" />
                  <Field label="Fonction" placeholder="Gérant" />
                  <Field label="Téléphone mobile" placeholder="+33 6 12 34 56 78" />
                  <Field
                    className="sm:col-span-2"
                    label="Email professionnel"
                    placeholder="contact@votre-societe.fr"
                    type="email"
                  />
                  <Field className="sm:col-span-2" label="Mot de passe" placeholder="Min. 10 caractères" type="password" />
                </div>

                <div className="mt-8 rounded-2xl border border-border-soft bg-bg-elev p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Protection des données
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                    Vos données sont hébergées en France, chiffrées AES-256, jamais revendues. Vous
                    pouvez supprimer votre compte à tout moment depuis votre espace.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <h2 className="font-display text-[28px] font-semibold tracking-tight text-fg">
                  Pièces justificatives
                </h2>
                <p className="mt-2 text-[13px] text-fg-muted">
                  Optionnel pour Pro Silver · obligatoire pour activer Pro Gold + paiement 30j.
                </p>

                <div className="mt-8 space-y-3">
                  <FileDrop
                    label="K-bis (moins de 3 mois)"
                    uploaded={uploaded === "kbis"}
                    onUpload={() => setUploaded("kbis")}
                  />
                  <FileDrop label="Attestation URSSAF" uploaded={false} onUpload={() => {}} />
                  <FileDrop label="RIB pour prélèvement SEPA" uploaded={false} onUpload={() => {}} />
                </div>

                <label
                  htmlFor="cgv-pro"
                  className="mt-8 flex cursor-pointer items-start gap-3 text-[12px] text-fg-muted"
                >
                  <input id="cgv-pro" type="checkbox" defaultChecked className="mt-1 accent-accent" />
                  <span>
                    J'accepte les{" "}
                    <a href="/legal/cgv" className="underline">
                      CGV pro AcceFerm
                    </a>{" "}
                    et la politique de confidentialité. Je confirme agir au nom de la société
                    indiquée.
                  </span>
                </label>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-10 text-center"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal-ok/10 text-signal-ok">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-[36px] font-semibold leading-tight tracking-tight text-fg lg:text-[44px]">
                  Compte créé.
                </h2>
                <p className="mt-3 text-[14px] text-fg-muted">
                  Validation SIRET en cours (2h ouvrées max). Dès validation, votre compte Pro
                  Silver est actif avec remise −5 % automatique.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/pro"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
                  >
                    Ouvrir l'Espace Pro
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/catalogue/photocellules"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] text-fg hover:border-fg"
                  >
                    Ouvrir le catalogue
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          {step < 3 && (
            <div className="flex items-center justify-between gap-3 border-t border-border-soft bg-bg-elev px-6 py-4">
              <button
                type="button"
                onClick={() => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s))}
                disabled={step === 0}
                className={cn(
                  "inline-flex items-center gap-1.5 text-[13px] transition",
                  step === 0 ? "cursor-not-allowed text-fg-subtle" : "text-fg-muted hover:text-fg",
                )}
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => ((s + 1) as 1 | 2 | 3))}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                {step === 2 ? "Créer mon compte" : "Continuer"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: benefits */}
      <aside className="lg:col-span-5">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Pro Silver · gratuit
              </span>
            </div>
            <div className="mt-3 font-display text-[32px] font-semibold leading-tight tracking-tight text-fg">
              −5 % HT sur <em>tout</em> le catalogue.
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
              Pas d'engagement, pas de minimum commande, pas de frais cachés. Vous pouvez passer en
              Pro Gold dès <strong className="text-fg">60 000 € HT</strong> de cumul annuel.
            </p>
            <ul className="mt-5 space-y-2.5 text-[13px] text-fg/90">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border-soft bg-bg-elev p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              Ils nous font déjà confiance
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Metric value="124" label="pros actifs" />
              <Metric value="4,8/5" label="Avis Vérifiés" />
              <Metric value="< 2h" label="validation SIRET" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none"
      />
    </label>
  );
}

function FileDrop({
  label,
  uploaded,
  onUpload,
}: {
  label: string;
  uploaded: boolean;
  onUpload: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border border-dashed p-4 text-left transition",
        uploaded
          ? "border-signal-ok bg-signal-ok/5"
          : "border-border-soft hover:border-fg",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-lg",
          uploaded ? "bg-signal-ok/10 text-signal-ok" : "bg-bg-elev text-fg-muted",
        )}
      >
        {uploaded ? <CheckCircle2 className="h-4 w-4" /> : <FileUp className="h-4 w-4" />}
      </span>
      <div className="flex-1">
        <div className="text-[14px] font-medium text-fg">{label}</div>
        <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
          {uploaded ? "kbis-2026-04.pdf · téléversé" : "Glissez un PDF ou cliquez pour parcourir"}
        </div>
      </div>
    </button>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[22px] font-semibold tabular-nums leading-none text-fg">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
        {label}
      </div>
    </div>
  );
}
