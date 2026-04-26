"use client";

import { Check, Clock, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { usePriceMode } from "@/components/price-mode-context";
import { PriceToggle } from "@/components/ui/price-toggle";
import type { ProductDetail } from "@/lib/product-detail";
import { cn, formatPrice } from "@/lib/utils";

/**
 * BuyBox connecté au CartContext.
 *
 * Fix critique audit UX 2026-04 : avant la refonte, le bouton "Ajouter" était
 * un `<a href="/panier">` qui n'ajoutait rien au panier. Désormais il appelle
 * `useCart().add(slug, qty)` et affiche un état "Ajouté" pendant 2 s.
 */
export function BuyBox({ product }: { product: ProductDetail }) {
  const { mode } = usePriceMode();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const total = product.priceHT * qty;

  function handleAdd() {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-5 rounded-md border border-border-soft bg-bg p-6">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold tabular text-fg">
            {formatPrice(product.priceHT, mode)} €
          </span>
          <span className="text-sm text-fg-muted">{mode}</span>
        </div>
        {product.priceWasHT && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm tabular text-fg-muted line-through">
              {formatPrice(product.priceWasHT, mode)} €
            </span>
            <span className="rounded bg-signal-err/10 px-2 py-0.5 text-xs font-medium text-signal-err">
              Économisez {(product.priceWasHT - product.priceHT).toFixed(0)} €
            </span>
          </div>
        )}
        <div className="mt-2 text-sm text-fg-muted">
          Prix unitaire · <PriceToggle className="inline-flex align-middle" />
        </div>
      </div>

      {/* Stock + delivery */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md bg-bg-elev p-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-signal-ok">
            <Check className="h-3 w-3" aria-hidden="true" />
            En stock
          </div>
          <div className="mt-1 text-sm text-fg">{product.stockLabel}</div>
        </div>
        <div className="rounded-md bg-bg-elev p-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <Truck className="h-3 w-3" aria-hidden="true" />
            Expédition
          </div>
          <div className="mt-1 text-sm text-fg">24 h IDF · 48 h France</div>
        </div>
      </div>

      {/* Quantity + add to cart */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className="flex items-center overflow-hidden rounded-md border border-border-soft"
          role="group"
          aria-label="Quantité"
        >
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            className="grid h-12 w-12 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-12 w-14 border-x border-border-soft bg-transparent text-center text-base tabular text-fg focus:outline-none"
            aria-label="Quantité"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Augmenter la quantité"
            className="grid h-12 w-12 place-items-center text-fg-muted transition hover:bg-bg-elev hover:text-fg"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          aria-live="polite"
          className={cn(
            "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md px-4 text-base font-medium transition btn-soft",
            added
              ? "bg-signal-ok text-bg"
              : "bg-accent text-accent-fg hover:bg-accent-hover",
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Ajouté au panier
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Ajouter — {formatPrice(total, mode)} € {mode}
            </>
          )}
        </button>
      </div>

      <a
        href="/configurer"
        className="block w-full rounded-md border border-border-soft py-3 text-center text-sm font-medium text-fg transition hover:border-fg"
      >
        Obtenir un devis pro · réponse 24 h
      </a>

      <ul className="space-y-2 border-t border-border-soft pt-4 text-sm text-fg-muted">
        <li className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-fg" aria-hidden="true" />
          <span>Commande avant 16 h · livraison IDF demain</span>
        </li>
        <li className="flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-fg" aria-hidden="true" />
          <span>Retrait comptoir Groslay (95) possible</span>
        </li>
      </ul>
    </div>
  );
}
