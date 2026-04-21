"use client";

import { Clock, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { usePriceMode } from "@/components/price-mode-context";
import { PriceToggle } from "@/components/ui/price-toggle";
import type { ProductDetail } from "@/lib/product-detail";
import { cn, formatPrice } from "@/lib/utils";

export function BuyBox({ product }: { product: ProductDetail }) {
  const { mode } = usePriceMode();
  const [qty, setQty] = useState(1);
  const total = product.priceHT * qty;

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-bg p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[46px] font-semibold leading-none tabular-nums text-fg">
              {formatPrice(product.priceHT, mode)}
            </span>
            <span className="font-mono text-[13px] text-fg-muted">€ {mode}</span>
          </div>
          {product.priceWasHT && (
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-mono text-[13px] tabular-nums text-fg-subtle line-through">
                {formatPrice(product.priceWasHT, mode)} €
              </span>
              <span className="rounded-full bg-signal-err/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-signal-err">
                Économisez {(product.priceWasHT - product.priceHT).toFixed(0)} €
              </span>
            </div>
          )}
          <div className="mt-2 text-[12px] text-fg-muted">
            Prix unitaire · bascule{" "}
            <PriceToggle className="inline-flex align-middle" />
          </div>
        </div>
      </div>

      {/* Stock + delivery */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border-soft">
        <div className="bg-bg-elev p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-ok">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok" />
            En stock
          </div>
          <div className="mt-1 font-mono text-[12px] text-fg">{product.stockLabel}</div>
        </div>
        <div className="bg-bg-elev p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
            <Truck className="h-3 w-3" />
            Expédition
          </div>
          <div className="mt-1 font-mono text-[12px] text-fg">24h IDF · 48h France</div>
        </div>
      </div>

      {/* Quantity + add to cart */}
      <div className="flex items-center gap-3">
        <div className="flex items-center overflow-hidden rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            className="grid h-11 w-11 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-12 border-x border-border bg-transparent text-center font-mono text-[14px] tabular-nums text-fg focus:outline-none"
            aria-label="Quantité"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Augmenter la quantité"
            className="grid h-11 w-11 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <a
          href="/panier"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
        >
          <ShoppingBag className="h-4 w-4" />
          Ajouter — {formatPrice(total, mode)} € {mode}
        </a>
      </div>

      <a
        href="/configurer"
        className="block w-full rounded-full border border-border py-2.5 text-center text-[13px] font-medium text-fg transition hover:border-fg"
      >
        Obtenir un devis pro · réponse 24h
      </a>

      {/* Mini reassurance block */}
      <ul className="space-y-2.5 border-t border-border-soft pt-4 text-[13px] text-fg-muted">
        <Row icon={Clock}>Commande avant 15h47 · livraison IDF demain</Row>
        <Row icon={Truck}>Retrait comptoir Cormeilles (95) possible</Row>
      </ul>
    </div>
  );
}

function Row({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("flex items-center gap-2.5")}>
      <Icon className="h-3.5 w-3.5 text-fg-subtle" />
      <span>{children}</span>
    </li>
  );
}
