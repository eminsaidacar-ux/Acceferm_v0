"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Devis motorisation",
  "Devis accessoires / commande groupée",
  "Question SAV · panne",
  "Création de compte pro / grilles tarifaires",
  "Partenariat fabricant / distribution",
  "Demande presse",
  "Autre",
] as const;

type Status = "idle" | "loading" | "ok" | "error";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  consent: true,
};

export function ContactForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [attachments, setAttachments] = useState<string[]>([]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!data.firstName.trim()) next.firstName = "Obligatoire";
    if (!data.lastName.trim()) next.lastName = "Obligatoire";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Email invalide";
    if (!data.subject) next.subject = "Sélectionnez un sujet";
    if (data.message.trim().length < 15) next.message = "Décrivez en 15 caractères minimum";
    if (!data.consent) next.consent = "Consentement requis";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Fake API call
    await new Promise((r) => setTimeout(r, 1100));
    // Persist request reference locally
    const ref = `AF-CT-${Math.floor(Math.random() * 9000) + 1000}`;
    try {
      localStorage.setItem(
        "acceferm:contact-last",
        JSON.stringify({ ref, data, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setStatus("ok");
    setData(INITIAL);
    setAttachments([]);
  }

  function onAttach(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const names = files.map((f) => f.name);
    setAttachments((a) => [...a, ...names].slice(0, 4));
    e.target.value = "";
  }

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-signal-ok/30 bg-signal-ok/5 p-8 lg:p-10"
      >
        <CheckCircle2 className="h-8 w-8 text-signal-ok" />
        <h2 className="mt-5 font-display text-[28px] font-semibold leading-tight text-fg lg:text-[36px]">
          Message bien reçu.
        </h2>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-fg-muted">
          Un humain de l'équipe AcceFerm / IEF & Co vous répond sous{" "}
          <strong className="text-fg">24 heures ouvrées</strong>. Si c'est urgent, privilégiez
          le téléphone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] text-fg transition hover:border-fg"
          >
            Envoyer un autre message
          </button>
          <a
            href="tel:+33184000017"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
          >
            Ou appeler le 01 84 XX XX 17
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-bg p-6 lg:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Prénom"
          value={data.firstName}
          onChange={(v) => update("firstName", v)}
          placeholder="Lucas"
          error={errors.firstName}
          required
        />
        <Field
          label="Nom"
          value={data.lastName}
          onChange={(v) => update("lastName", v)}
          placeholder="Martin"
          error={errors.lastName}
          required
        />
        <Field
          type="email"
          label="Email"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="contact@votre-societe.fr"
          error={errors.email}
          required
        />
        <Field
          type="tel"
          label="Téléphone"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+33 6 12 34 56 78"
        />
        <Field
          className="sm:col-span-2"
          label="Société"
          value={data.company}
          onChange={(v) => update("company", v)}
          placeholder="IEF & Co"
        />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          Sujet <span className="text-accent">*</span>
        </span>
        <select
          required
          value={data.subject}
          onChange={(e) => update("subject", e.target.value)}
          aria-invalid={!!errors.subject}
          className={cn(
            "rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg focus:border-accent focus:outline-none",
            errors.subject && "border-signal-err",
          )}
        >
          <option value="">Sélectionnez…</option>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {errors.subject && (
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-signal-err">
            {errors.subject}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          Votre message <span className="text-accent">*</span>
        </span>
        <textarea
          required
          rows={6}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Décrivez votre besoin : chantier, marque moteur existante, symptôme panne, dimensions portail…"
          aria-invalid={!!errors.message}
          className={cn(
            "rounded-xl border border-border-soft bg-bg px-3.5 py-3 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none",
            errors.message && "border-signal-err",
          )}
        />
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
          {errors.message ? (
            <span className="text-signal-err">{errors.message}</span>
          ) : (
            <span>{data.message.length} caractères</span>
          )}
          <span>Max 2 000</span>
        </div>
      </label>

      {/* Attachments */}
      <div>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
          Pièces jointes (optionnel, 4 max)
        </div>
        <label
          htmlFor="contact-attach"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-[13px] text-fg-muted transition hover:border-accent hover:text-accent"
        >
          <Paperclip className="h-3.5 w-3.5" />
          Joindre photo chantier, PV, devis…
          <input
            id="contact-attach"
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={onAttach}
            className="sr-only"
          />
        </label>
        {attachments.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {attachments.map((a, i) => (
              <li
                key={`${a}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elev px-3 py-1 font-mono text-[11px] text-fg"
              >
                <Paperclip className="h-3 w-3 text-fg-subtle" />
                {a}
                <button
                  type="button"
                  onClick={() => setAttachments((a) => a.filter((_, j) => j !== i))}
                  className="text-fg-subtle transition hover:text-signal-err"
                  aria-label={`Retirer ${a}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label
        htmlFor="cgu-contact"
        className="flex cursor-pointer items-start gap-3 text-[12px] text-fg-muted"
      >
        <input
          id="cgu-contact"
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 accent-accent"
        />
        <span>
          J'accepte le traitement de mes données pour la réponse à ma demande (
          <a href="/legal/confidentialite" className="underline">
            politique de confidentialité
          </a>
          ).
        </span>
      </label>
      {errors.consent && (
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-signal-err">
          {errors.consent}
        </span>
      )}

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-signal-err/30 bg-signal-err/5 px-4 py-3 text-[13px] text-signal-err"
          >
            Merci de corriger les champs signalés avant d'envoyer.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  className,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        className={cn(
          "rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none",
          error && "border-signal-err",
        )}
      />
      {error && (
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-signal-err">
          {error}
        </span>
      )}
    </label>
  );
}
