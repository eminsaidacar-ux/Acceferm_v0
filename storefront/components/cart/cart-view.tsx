"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, FileText, Minus, Plus, ShieldCheck, Tag, Trash2, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { usePriceMode } from "@/components/price-mode-context";
import { PriceToggle } from "@/components/ui/price-toggle";
import { img, imagery } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Livraison standard", time: "48h France", priceHT: 9.9 },
  { id: "express", label: "Livraison 24h IDF", time: "Demain avant 12h", priceHT: 14.9 },
  { id: "pickup", label: "Retrait comptoir Groslay (95)", time: "Dès demain 10h", priceHT: 0 },
];

export function CartView() {
  const { mode } = usePriceMode();
  const { lines, update, remove, lookup } = useCart();
  const [shipping, setShipping] = useState(SHIPPING_OPTIONS[1].id);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const enriched = useMemo(
    () =>
      lines
        .map((l) => {
          const p = lookup(l.slug);
          return p ? { ...p, qty: l.qty } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines, lookup],
  );

  const subtotalHT = useMemo(
    () => enriched.reduce((acc, l) => acc + l.priceHT * l.qty, 0),
    [enriched],
  );
  const savings = useMemo(
    () =>
      enriched.reduce(
        (acc, l) => acc + (l.priceWasHT ? (l.priceWasHT - l.priceHT) * l.qty : 0),
        0,
      ),
    [enriched],
  );
  const silverDiscount = subtotalHT * 0.05;
  const promoDiscount = promoApplied ? subtotalHT * 0.1 : 0;
  const shippingCostHT = SHIPPING_OPTIONS.find((s) => s.id === shipping)?.priceHT ?? 0;
  const totalHT = subtotalHT - silverDiscount - promoDiscount + shippingCostHT;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Lines */}
      <div className="lg:col-span-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            {enriched.length} article{enriched.length > 1 ? "s" : ""} dans votre panier
          </div>
          <PriceToggle />
        </div>

        {enriched.length === 0 ? (
          <div className="rounded-2xl border border-border-soft bg-bg p-10 text-center">
            <p className="font-display text-[22px] font-semibold text-fg">Panier vide</p>
            <p className="mt-2 text-[13px] text-fg-muted">
              Ouvrez la home et cliquez sur un composant du Digital Gate Twin.
            </p>
            <a
              href="/"
              className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
            >
              Revenir à la boutique
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {enriched.map((l) => (
                <motion.article
                  key={l.slug}
                  layout
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 rounded-2xl border border-border-soft bg-bg p-4"
                >
                  <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-bg-soft sm:h-28 sm:w-28">
                    {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
                    <img
                      src={img(imagery[l.image], 240, 240)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                          {l.brand}
                        </div>
                        <a
                          href={`/produit/${l.slug}`}
                          className="mt-1 block truncate text-[14px] font-medium text-fg transition hover:text-accent"
                        >
                          {l.name}
                        </a>
                        <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted">
                          <span className="inline-block h-1 w-1 rounded-full bg-signal-ok" />
                          {l.stockLabel}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.slug)}
                        aria-label="Retirer du panier"
                        className="rounded-md p-1.5 text-fg-subtle transition hover:bg-bg-elev hover:text-signal-err"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => update(l.slug, l.qty - 1)}
                          aria-label="Diminuer"
                          className="grid h-9 w-9 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={l.qty}
                          onChange={(e) => update(l.slug, Number(e.target.value) || 1)}
                          className="h-9 w-10 border-x border-border bg-transparent text-center font-mono text-[13px] tabular-nums text-fg focus:outline-none"
                          aria-label="Quantité"
                        />
                        <button
                          type="button"
                          onClick={() => update(l.slug, l.qty + 1)}
                          aria-label="Augmenter"
                          className="grid h-9 w-9 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-display text-[20px] font-semibold tabular-nums leading-none text-fg">
                          {formatPrice(l.priceHT * l.qty, mode)} €
                        </div>
                        <div className="mt-1 font-mono text-[10px] text-fg-subtle">
                          {formatPrice(l.priceHT, mode)} € × {l.qty} · {mode}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Shipping */}
        <div className="mt-8 rounded-2xl border border-border-soft bg-bg p-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Mode de livraison
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {SHIPPING_OPTIONS.map((s) => (
              <label
                key={s.id}
                htmlFor={`ship-${s.id}`}
                className={[
                  "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition",
                  shipping === s.id ? "border-accent bg-accent-soft" : "border-border-soft hover:border-fg",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <input
                    id={`ship-${s.id}`}
                    type="radio"
                    name="shipping"
                    value={s.id}
                    checked={shipping === s.id}
                    onChange={() => setShipping(s.id)}
                    className="sr-only"
                  />
                  <span className="text-[13px] font-medium text-fg">{s.label}</span>
                  <span className="font-mono text-[12px] tabular-nums text-fg">
                    {s.priceHT === 0 ? "Gratuit" : `${s.priceHT.toFixed(2)} €`}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-fg-subtle">{s.time}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-4">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-2xl border border-border bg-bg p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Récapitulatif
            </div>

            <dl className="mt-4 space-y-2.5 text-[14px]">
              <Line label="Sous-total" value={`${formatPrice(subtotalHT, mode)} €`} />
              {savings > 0 && (
                <Line
                  label="Économies promo fournisseur"
                  value={`− ${formatPrice(savings, mode)} €`}
                  positive
                />
              )}
              <Line
                label="Remise Pro Silver (−5 %)"
                value={`− ${formatPrice(silverDiscount, mode)} €`}
                positive
              />
              {promoApplied && (
                <Line
                  label="Code promo INSTALLATEUR10"
                  value={`− ${formatPrice(promoDiscount, mode)} €`}
                  positive
                />
              )}
              <Line label="Livraison" value={`${formatPrice(shippingCostHT, mode)} €`} />
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-border-soft pt-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Total {mode}
              </div>
              <div className="font-display text-[32px] font-semibold tabular-nums leading-none text-fg">
                {formatPrice(totalHT, mode)} €
              </div>
            </div>

            <a
              href="/commande"
              className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
            >
              Passer commande
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/configurer"
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border py-2.5 text-[13px] font-medium text-fg transition hover:border-fg"
            >
              <FileText className="h-3.5 w-3.5" />
              Convertir en devis pro
            </a>
          </div>

          <div className="rounded-2xl border border-border-soft bg-bg-elev p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              <Tag className="h-3.5 w-3.5" />
              Code promo
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-bg px-1 py-1">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="INSTALLATEUR10"
                className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPromoApplied(Boolean(promo))}
                className="shrink-0 rounded-full bg-fg px-3.5 py-1.5 text-[12px] font-medium text-accent-fg transition hover:bg-accent"
              >
                Appliquer
              </button>
            </div>
          </div>

          <ul className="space-y-2 rounded-2xl border border-border-soft bg-bg p-4 text-[12px] text-fg-muted">
            <li className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-fg-subtle" /> Commande avant 15h47 · expédition J+1
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-fg-subtle" /> Retour 30 jours sans question
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-fg-subtle" /> Paiement 30j disponible en compte Gold
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Line({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-fg-muted">{label}</dt>
      <dd
        className={[
          "font-mono tabular-nums",
          positive ? "text-signal-ok" : "text-fg",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
