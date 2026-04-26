"use client";

import { ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "collab-ief", label: "Collaborateur IEF & Co" },
  { value: "ami", label: "Ami / proche d'Emin" },
  { value: "pro-exterieur", label: "Pro extérieur (installateur, syndic…)" },
  { value: "autre", label: "Autre" },
];

const TARGET = "contact@iefandco.com";

/**
 * Formulaire de feedback minimal.
 *
 * Pas de backend : ouvre le client mail de l'utilisateur (mailto) avec un
 * sujet et un body pré-remplis. L'utilisateur clique "Envoyer" dans son
 * client mail.
 */
export function FeedbackForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>(ROLES[0].value);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Indiquez votre nom (ou pseudo).";
    if (message.trim().length < 10)
      next.message = "Au moins 10 caractères, on prend tout — même court.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const roleLabel = ROLES.find((r) => r.value === role)?.label ?? role;
    const subject = `[Preview AcceFerm v0.6] retour de ${name}`;
    const body = `Nom : ${name}
Rôle : ${roleLabel}

Retour :
${message}

—
Envoyé depuis /feedback de la preview AcceFerm Pro v0.6.`;
    const url = `mailto:${TARGET}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-md border border-border-soft bg-bg p-6 lg:p-8"
    >
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-fg">
          Votre nom <span className="text-accent">*</span>
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
          }}
          aria-invalid={!!errors.name}
          className={cn(
            "min-h-12 rounded-md border bg-bg px-4 text-base text-fg placeholder:text-fg-muted focus:outline-none",
            errors.name ? "border-signal-err" : "border-border-soft focus:border-accent",
          )}
          placeholder="Lucas, Sophie…"
        />
        {errors.name && (
          <span className="text-sm text-signal-err">{errors.name}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-fg">Vous êtes…</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="min-h-12 rounded-md border border-border-soft bg-bg px-4 text-base text-fg focus:border-accent focus:outline-none"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-fg">
          Votre retour <span className="text-accent">*</span>
        </span>
        <textarea
          required
          rows={8}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((s) => ({ ...s, message: undefined }));
          }}
          aria-invalid={!!errors.message}
          placeholder="Ce qui marche, ce qui choque, ce qui manque… Soyez direct."
          className={cn(
            "rounded-md border bg-bg px-4 py-3 text-base text-fg placeholder:text-fg-muted focus:outline-none",
            errors.message
              ? "border-signal-err"
              : "border-border-soft focus:border-accent",
          )}
        />
        <div className="flex items-center justify-between text-sm text-fg-muted">
          {errors.message ? (
            <span className="text-signal-err">{errors.message}</span>
          ) : (
            <span>{message.length} caractères</span>
          )}
          <span>Min 10</span>
        </div>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg transition hover:bg-accent-hover btn-soft"
      >
        Ouvrir mon client mail
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="text-sm text-fg-muted">
        Le bouton ouvre une fenêtre pré-remplie de votre application mail
        (Gmail, Outlook, Apple Mail…) avec votre retour et l'adresse{" "}
        <code className="rounded bg-bg-elev px-1 py-0.5 text-xs">
          {TARGET}
        </code>
        . Vous cliquez « Envoyer » dans votre client.
      </p>
    </form>
  );
}
