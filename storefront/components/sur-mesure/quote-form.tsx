"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { DELAI_OPTIONS, SUR_MESURE_TYPES } from "@/lib/sur-mesure";

const MAILTO_TARGET = "contact@iefandco.com";

type FormState = {
  type: string;
  quantity: number;
  width: string;
  height: string;
  postalCode: string;
  city: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  siret: string;
  description: string;
  delai: string;
  consent: boolean;
};

const INITIAL: FormState = {
  type: "",
  quantity: 1,
  width: "",
  height: "",
  postalCode: "",
  city: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  siret: "",
  description: "",
  delai: "",
  consent: false,
};

/**
 * Formulaire devis sur-mesure (anchor #devis).
 *
 * Pré-remplissage du type via `?type=…` (lu au mount, fallback sur hash
 * `#devis?type=…` si présent).
 * Soumission mailto en V0.8 (intégration backend plus tard).
 * Upload : max 5 fichiers, 5 Mo chacun. Les noms sont envoyés dans le
 * mail-body ; les fichiers eux-mêmes sont joints manuellement par
 * l'utilisateur après ouverture de son client mail.
 */
export function QuoteForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Pré-sélection du type via ?type= ou hash #devis?type=
  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = new URLSearchParams(window.location.search);
    let type = search.get("type");
    if (!type && window.location.hash.includes("?type=")) {
      type = decodeURIComponent(window.location.hash.split("?type=")[1] ?? "");
    }
    if (type && SUR_MESURE_TYPES.some((t) => t.id === type)) {
      setData((d) => ({ ...d, type }));
    }
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (error) setError(null);
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const sel = Array.from(e.target.files ?? []);
    const valid = sel.filter((f) => f.size <= 5 * 1024 * 1024).slice(0, 5);
    if (sel.length > valid.length) {
      setError("Certains fichiers dépassaient 5 Mo, ils ont été ignorés.");
    }
    setFiles(valid);
  }

  function removeFile(idx: number) {
    setFiles((arr) => arr.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data.type || !data.consent) {
      setError("Type de fermeture et consentement RGPD obligatoires.");
      return;
    }
    const typeName =
      SUR_MESURE_TYPES.find((t) => t.id === data.type)?.name ?? data.type;
    const subject = `[Devis sur-mesure] — ${typeName} — ${data.company || data.name}`;
    const body = buildEmailBody(data, files, typeName);
    window.location.href = `mailto:${MAILTO_TARGET}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-border-soft bg-bg p-6 lg:p-8"
    >
      <Field label="Type de fermeture" required>
        <select
          value={data.type}
          onChange={(e) => update("type", e.target.value)}
          required
          className="block min-h-12 w-full rounded-md border border-border bg-bg px-3 text-[15px] text-fg focus:border-accent focus:outline-none"
        >
          <option value="">— Sélectionnez —</option>
          {SUR_MESURE_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Quantité" required>
          <Input
            type="number"
            min={1}
            value={data.quantity}
            onChange={(v) =>
              update("quantity", Math.max(1, Number(v) || 1))
            }
            required
          />
        </Field>
        <Field label="Largeur (mm)" optional>
          <Input value={data.width} onChange={(v) => update("width", v)} />
        </Field>
        <Field label="Hauteur (mm)" optional>
          <Input value={data.height} onChange={(v) => update("height", v)} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Code postal" required>
          <Input
            value={data.postalCode}
            onChange={(v) => update("postalCode", v)}
            required
            inputMode="numeric"
            pattern="[0-9]{5}"
          />
        </Field>
        <Field label="Ville" required>
          <Input value={data.city} onChange={(v) => update("city", v)} required />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nom" required>
          <Input value={data.name} onChange={(v) => update("name", v)} required />
        </Field>
        <Field label="Société" required>
          <Input
            value={data.company}
            onChange={(v) => update("company", v)}
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Email" required>
          <Input
            type="email"
            value={data.email}
            onChange={(v) => update("email", v)}
            required
          />
        </Field>
        <Field label="Téléphone" required>
          <Input
            type="tel"
            value={data.phone}
            onChange={(v) => update("phone", v)}
            required
          />
        </Field>
        <Field label="SIRET" optional>
          <Input value={data.siret} onChange={(v) => update("siret", v)} />
        </Field>
      </div>

      <Field label="Description du besoin" required>
        <textarea
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          required
          rows={4}
          className="block w-full rounded-md border border-border bg-bg px-3 py-2 text-[15px] text-fg focus:border-accent focus:outline-none"
        />
      </Field>

      <Field label="Délai souhaité" required>
        <select
          value={data.delai}
          onChange={(e) => update("delai", e.target.value)}
          required
          className="block min-h-12 w-full rounded-md border border-border bg-bg px-3 text-[15px] text-fg focus:border-accent focus:outline-none"
        >
          <option value="">— Sélectionnez —</option>
          {DELAI_OPTIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </Field>

      <UploadZone files={files} onChange={handleFiles} onRemove={removeFile} />

      {error && (
        <p
          role="alert"
          className="rounded-md border border-signal-err/40 bg-bg-elev p-3 text-[13px] text-signal-err"
        >
          {error}
        </p>
      )}

      <label className="flex items-start gap-2 text-[13px] text-fg-muted">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update("consent", e.target.checked)}
          required
          className="mt-1 h-4 w-4"
        />
        <span>
          J'accepte que mes données soient traitées pour répondre à ma demande
          de devis. Aucun envoi commercial sans accord. Suppression sur simple
          demande à {MAILTO_TARGET}.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
      >
        Envoyer ma demande de devis
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-fg">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
        {optional && (
          <span className="ml-1 text-[11px] font-normal text-fg-subtle">
            (optionnel)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  ...rest
}: {
  value: string | number;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block min-h-12 w-full rounded-md border border-border bg-bg px-3 text-[15px] text-fg focus:border-accent focus:outline-none"
    />
  );
}

function UploadZone({
  files,
  onChange,
  onRemove,
}: {
  files: File[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[13px] font-medium text-fg">
        <Paperclip className="h-4 w-4" aria-hidden="true" />
        Plans, photos, documents
        <span className="text-[11px] font-normal text-fg-subtle">
          (optionnel · max 5 fichiers · 5 Mo chacun)
        </span>
      </label>
      <input
        type="file"
        multiple
        accept="image/*,application/pdf,.dwg,.dxf"
        onChange={onChange}
        className="block text-[13px] text-fg-muted file:mr-3 file:min-h-12 file:cursor-pointer file:rounded-md file:border file:border-border file:bg-bg-elev file:px-4 file:text-[13px] file:font-medium file:text-fg hover:file:border-fg"
      />
      {files.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-bg-elev px-3 py-1 text-[12px] text-fg-muted"
            >
              {f.name}
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Retirer ${f.name}`}
                className="grid h-4 w-4 place-items-center rounded-full hover:bg-bg"
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildEmailBody(d: FormState, files: File[], typeName: string): string {
  const lines = [
    `Type de fermeture : ${typeName}`,
    `Quantité : ${d.quantity}`,
    d.width || d.height
      ? `Dimensions approximatives : ${d.width || "?"} × ${d.height || "?"} mm`
      : null,
    "",
    `Adresse chantier : ${d.postalCode} ${d.city}`,
    "",
    `Contact : ${d.name}${d.company ? ` (${d.company})` : ""}`,
    `Email : ${d.email}`,
    `Téléphone : ${d.phone}`,
    d.siret ? `SIRET : ${d.siret}` : null,
    "",
    `Délai souhaité : ${
      DELAI_OPTIONS.find((o) => o.id === d.delai)?.label ?? d.delai
    }`,
    "",
    "Description du besoin :",
    d.description,
    "",
    files.length > 0
      ? `Pièces jointes mentionnées (à joindre manuellement) : ${files
          .map((f) => f.name)
          .join(", ")}`
      : null,
    "",
    "— Demande envoyée depuis acceferm.fr/sur-mesure",
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}
