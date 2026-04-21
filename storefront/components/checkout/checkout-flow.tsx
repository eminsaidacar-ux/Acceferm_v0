"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Truck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const STEPS = [
  { id: 1, label: "Livraison" },
  { id: 2, label: "Paiement" },
  { id: 3, label: "Confirmation" },
] as const;

const PAYMENTS = [
  { id: "cb", label: "Carte bancaire", sub: "Visa · Mastercard · Apple Pay", icon: CreditCard, recommended: true },
  { id: "30j", label: "Paiement 30j à terme", sub: "Compte Pro Gold validé", icon: FileText, pro: true },
  { id: "sepa", label: "Virement SEPA pro", sub: "Envoi confirmation sous 48h", icon: Building2 },
  { id: "alma", label: "Alma 3 ou 4x sans frais", sub: "Panier ≥ 150 € HT", icon: Wallet },
] as const;

export function CheckoutFlow() {
  const [step, setStep] = useState<Step>(1);
  const [customer, setCustomer] = useState<"pro" | "particulier">("pro");
  const [payment, setPayment] = useState<string>("cb");
  const [orderRef] = useState(() => `AF-2026-${String(Math.floor(Math.random() * 900) + 100)}`);

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Steps panel */}
      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-bg">
          {/* Progress */}
          <ol className="flex items-center border-b border-border-soft">
            {STEPS.map((s, i) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <li
                  key={s.id}
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
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.id}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait">
            {/* STEP 1 — Shipping */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                {/* Customer type tabs */}
                <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border-soft">
                  {(["pro", "particulier"] as const).map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCustomer(c)}
                      className={cn(
                        "px-4 py-3 text-left text-[13px] font-medium transition",
                        customer === c ? "bg-accent text-accent-fg" : "bg-bg text-fg-muted hover:bg-bg-elev",
                      )}
                    >
                      <div>{c === "pro" ? "Je commande pour ma société" : "Je commande en particulier"}</div>
                      <div className={cn("mt-1 font-mono text-[10px] uppercase tracking-[0.15em]", customer === c ? "text-accent-fg/80" : "text-fg-subtle")}>
                        {c === "pro" ? "Facture pro HT · 30j possible" : "TTC · rétractation 14j"}
                      </div>
                    </button>
                  ))}
                </div>

                {customer === "pro" && (
                  <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    <Field label="Raison sociale" placeholder="IEF & Co" defaultValue="IEF & Co" />
                    <Field label="SIRET" placeholder="812 345 678 00012" defaultValue="812 345 678 00012" />
                  </div>
                )}

                <h2 className="mb-4 font-display text-[22px] font-semibold tracking-tight text-fg">
                  Adresse de livraison
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Prénom" />
                  <Field label="Nom" />
                  <Field className="sm:col-span-2" label="Adresse" placeholder="N°, rue…" />
                  <Field label="Code postal" placeholder="95240" />
                  <Field label="Ville" placeholder="Cormeilles-en-Parisis" />
                  <Field label="Téléphone chantier" placeholder="+33 6 12 34 56 78" />
                  <Field label="Email" placeholder="contact@exemple.fr" />
                  {customer === "pro" && (
                    <Field
                      className="sm:col-span-2"
                      label="Chantier / référence interne"
                      placeholder="Copro Voltaire · bât B · lot 4"
                    />
                  )}
                </div>

                <h3 className="mt-8 mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Mode de livraison
                </h3>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { id: "idf24", icon: Truck, title: "24h IDF", sub: "Demain avant 12h", cost: "14,90 €" },
                    { id: "std", icon: Truck, title: "48h France", sub: "Chronopost", cost: "9,90 €" },
                    { id: "pickup", icon: MapPin, title: "Retrait 95", sub: "Dès demain 10h", cost: "Gratuit" },
                  ].map((o) => (
                    <label
                      key={o.id}
                      htmlFor={`ship-${o.id}`}
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-4 transition",
                        o.id === "idf24"
                          ? "border-accent bg-accent-soft"
                          : "border-border-soft hover:border-fg",
                      )}
                    >
                      <input
                        type="radio"
                        id={`ship-${o.id}`}
                        name="ship"
                        defaultChecked={o.id === "idf24"}
                        className="sr-only"
                      />
                      <o.icon className="mt-0.5 h-4 w-4 shrink-0 text-fg-muted" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-medium text-fg">{o.title}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">{o.sub}</div>
                        <div className="mt-2 font-mono text-[12px] tabular-nums text-fg">
                          {o.cost}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Payment */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <h2 className="mb-4 font-display text-[22px] font-semibold tracking-tight text-fg">
                  Mode de paiement
                </h2>

                <div className="space-y-2">
                  {PAYMENTS.map((p) => (
                    <label
                      key={p.id}
                      htmlFor={`pay-${p.id}`}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
                        payment === p.id
                          ? "border-accent bg-accent-soft"
                          : "border-border-soft hover:border-fg",
                      )}
                    >
                      <input
                        type="radio"
                        id={`pay-${p.id}`}
                        name="pay"
                        checked={payment === p.id}
                        onChange={() => setPayment(p.id)}
                        className="sr-only"
                      />
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-bg text-fg">
                        <p.icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-medium text-fg">{p.label}</span>
                          {p.recommended && (
                            <span className="rounded-full bg-signal-ok/15 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-signal-ok">
                              Recommandé
                            </span>
                          )}
                          {p.pro && (
                            <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-accent">
                              Pro Gold
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">{p.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {payment === "cb" && (
                  <div className="mt-6 grid gap-3 rounded-2xl border border-border-soft bg-bg-elev p-5 sm:grid-cols-2">
                    <Field className="sm:col-span-2" label="Numéro de carte" placeholder="•••• •••• •••• ••••" />
                    <Field label="Expiration" placeholder="MM / AA" />
                    <Field label="CVC" placeholder="123" />
                    <div className="sm:col-span-2 flex items-center gap-2 font-mono text-[11px] text-fg-muted">
                      <CheckCircle2 className="h-3.5 w-3.5 text-signal-ok" />
                      Paiement sécurisé 3D Secure · Stripe
                    </div>
                  </div>
                )}

                <label
                  htmlFor="cgv"
                  className="mt-6 flex cursor-pointer items-start gap-3 text-[12px] text-fg-muted"
                >
                  <input id="cgv" type="checkbox" defaultChecked className="mt-1 accent-accent" />
                  <span>
                    J'accepte les{" "}
                    <a href="#" className="underline">
                      conditions générales de vente
                    </a>{" "}
                    et confirme que les informations sont exactes.
                  </span>
                </label>
              </motion.div>
            )}

            {/* STEP 3 — Confirmation */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <div className="text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal-ok/10 text-signal-ok">
                    <CheckCircle2 className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 font-display text-[36px] font-semibold leading-tight tracking-tight text-fg lg:text-[48px]">
                    Commande confirmée.
                  </h2>
                  <p className="mt-2 text-[14px] text-fg-muted">
                    Référence <span className="font-mono text-fg">{orderRef}</span> — un email de
                    confirmation arrive dans votre boîte.
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Clock, title: "Expédition", sub: "Demain avant 12h · IDF" },
                    { icon: Truck, title: "Transporteur", sub: "Chronopost · lien de suivi par email" },
                    { icon: FileText, title: "Facture", sub: "Disponible en Espace Pro" },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-border-soft bg-bg-elev p-5"
                    >
                      <b.icon className="h-4 w-4 text-fg-muted" />
                      <div className="mt-3 text-[14px] font-medium text-fg">{b.title}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">{b.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/pro"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
                  >
                    Ouvrir l'Espace Pro
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] text-fg hover:border-fg"
                  >
                    Continuer mes achats
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer actions */}
          {step < 3 && (
            <div className="flex items-center justify-between gap-3 border-t border-border-soft bg-bg-elev px-6 py-4">
              <button
                type="button"
                onClick={step > 1 ? back : undefined}
                disabled={step === 1}
                className={cn(
                  "inline-flex items-center gap-1.5 text-[13px] transition",
                  step === 1
                    ? "cursor-not-allowed text-fg-subtle"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                ← {step === 2 ? "Livraison" : ""}
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                {step === 1 ? "Paiement" : "Valider la commande"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order summary */}
      <aside className="lg:col-span-4">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-2xl border border-border-soft bg-bg p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Votre commande
            </div>
            <dl className="mt-4 space-y-2.5 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-fg-muted">Sous-total HT</dt>
                <dd className="font-mono tabular-nums text-fg">472,00 €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-muted">Remise Pro Silver</dt>
                <dd className="font-mono tabular-nums text-signal-ok">− 23,60 €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-muted">Livraison 24h IDF</dt>
                <dd className="font-mono tabular-nums text-fg">14,90 €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-muted">TVA 20 %</dt>
                <dd className="font-mono tabular-nums text-fg">92,66 €</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-baseline justify-between border-t border-border-soft pt-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Total TTC
              </div>
              <div className="font-display text-[32px] font-semibold tabular-nums leading-none text-fg">
                555,96 €
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-bg-elev p-5 text-[12px] text-fg-muted">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
              Qui vous livre
            </div>
            <p className="leading-relaxed">
              Expédition depuis notre atelier IEF & Co à <strong className="text-fg">95240
              Cormeilles-en-Parisis</strong>. Pour toute question pendant la préparation : SAV
              technique au <span className="font-mono text-fg">01 84 XX XX 17</span>.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  placeholder,
  defaultValue,
  className,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none"
      />
    </label>
  );
}
