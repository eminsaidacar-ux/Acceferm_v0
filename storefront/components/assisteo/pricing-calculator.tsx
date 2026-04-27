"use client";

import { useMemo, useState } from "react";
import {
  computeMaintenance,
  EQUIPMENTS,
  FORMULES,
  type EquipmentId,
  type Formule,
} from "@/lib/maintenance-pricing";
import { CalcResultCard } from "./calc-result-card";

/**
 * Section D — Calculateur tarifaire interactif (v0.7.1).
 *
 * Recalcul live à chaque changement, pas de submit.
 * Données + helpers extraits dans lib/maintenance-pricing.ts pour
 * respecter la limite ≤ 150 L par composant.
 */
export function PricingCalculator() {
  const [equipment, setEquipment] = useState<EquipmentId>(
    "rideau-metallique-motorise",
  );
  const [qty, setQty] = useState<number>(1);
  const [formule, setFormule] = useState<Formule>("confort");

  const result = useMemo(
    () => computeMaintenance(equipment, qty, formule),
    [equipment, qty, formule],
  );

  return (
    <section
      id="calculateur"
      aria-labelledby="calc-title"
      className="border-t border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
          Section D · estimation
        </p>
        <h2
          id="calc-title"
          className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[44px]"
        >
          Estimez votre contrat en 30 secondes
        </h2>
        <p className="mt-3 text-[15px] text-fg-muted">
          Tarifs indicatifs pour votre installation.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <label
                htmlFor="calc-equipment"
                className="mb-2 block text-[13px] font-medium text-fg"
              >
                Type d'équipement
              </label>
              <select
                id="calc-equipment"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as EquipmentId)}
                className="block min-h-12 w-full rounded-md border border-border bg-bg px-3 text-[15px] text-fg focus:border-accent focus:outline-none"
              >
                {EQUIPMENTS.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="calc-qty"
                className="mb-2 block text-[13px] font-medium text-fg"
              >
                Quantité (1 – 20)
              </label>
              <input
                id="calc-qty"
                type="number"
                min={1}
                max={20}
                value={qty}
                onChange={(e) =>
                  setQty(Math.min(20, Math.max(1, Number(e.target.value) || 1)))
                }
                className="block min-h-12 w-full rounded-md border border-border bg-bg px-3 text-[15px] text-fg focus:border-accent focus:outline-none"
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-[13px] font-medium text-fg">
                Formule
              </legend>
              <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
                {FORMULES.map((f) => {
                  const sel = formule === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      onClick={() => setFormule(f.id)}
                      className={`min-h-12 rounded-md border px-3 text-[14px] font-medium transition ${
                        sel
                          ? "border-accent bg-accent text-accent-fg"
                          : "border-border bg-bg text-fg hover:border-fg"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <CalcResultCard result={result} />
        </div>

        <p className="mt-8 max-w-3xl text-[12px] leading-relaxed text-fg-subtle">
          Tarifs indicatifs HT par équipement, ajustables au cas par cas.
          Paiement en une seule fois à la signature. Plage standard d'intervention
          lundi-vendredi 8 h – 17 h. Zone d'intervention : Île-de-France. Devis
          ferme sur demande après audit initial.
        </p>

        <a
          href="/contact?sujet=maintenance-devis"
          className="mt-6 inline-flex min-h-12 items-center rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
        >
          Demander un devis personnalisé
        </a>
      </div>
    </section>
  );
}

