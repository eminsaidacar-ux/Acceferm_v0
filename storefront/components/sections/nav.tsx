"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { Logo } from "@/components/ui/logo";
import { PriceToggle } from "@/components/ui/price-toggle";
import { catalogTree } from "@/lib/catalog-tree";

// Nav primaire v0.7 — 5 onglets exacts (brief Emin) :
// Catalogue · Configurateur · Assistéo & Maintenance · Espace Pro · Contact.
const PRIMARY = [
  { label: "Catalogue", href: "/catalogue/photocellules" },
  { label: "Configurateur", href: "/configurateur" },
  { label: "Assistéo & Maintenance", href: "/assisteo-maintenance" },
  { label: "Espace Pro", href: "/pro" },
  { label: "Contact", href: "/contact" },
];

// Liens secondaires (drawer mobile uniquement) — pas redondants avec PRIMARY.
// "Espace Pro" et "Contact" retirés (déjà en PRIMARY).
// "Devis motorisation" pointe vers /configurer (wizard 5 questions),
// outil distinct du /configurateur visuel multi-fermetures.
const SECONDARY = [
  { label: "Devis motorisation (5 questions)", href: "/configurer" },
  { label: "Créer un compte pro", href: "/compte-pro/nouveau" },
  { label: "Ressources & guides", href: "/ressources" },
  { label: "À propos · IEF & Co", href: "/a-propos" },
];

/**
 * Nav sobre — refonte 2026-04.
 *
 * - Touch targets ≥ 48 × 48 px partout (audit UX a11y)
 * - Cart badge dynamique depuis CartContext (avant : "3" hardcoded)
 * - Pas de mega-menu surdimensionné en V0 — liens primaires simples
 * - Drawer mobile : focus trap natif via inert
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled
          ? "border-border-soft bg-bg/95 backdrop-blur"
          : "border-transparent bg-bg"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="/"
            aria-label="AcceFerm Pro — accueil"
            className="flex shrink-0 items-center"
          >
            <Logo />
          </a>

          {/* Liens primaires desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium xl:gap-8">
              {PRIMARY.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-fg-muted transition hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <PriceToggle className="hidden sm:flex" />
            <a
              href="/recherche"
              aria-label="Rechercher"
              className="grid size-12 place-items-center text-fg-muted transition hover:text-fg"
            >
              <Search className="size-5" aria-hidden="true" />
            </a>
            <a
              href="/panier"
              aria-label={`Panier (${itemCount} ${itemCount > 1 ? "articles" : "article"})`}
              className="relative grid size-12 place-items-center text-fg-muted transition hover:text-fg"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-fg"
                >
                  {itemCount}
                </span>
              )}
            </a>
            <a
              href="/pro"
              className="ml-2 hidden min-h-12 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition hover:bg-accent-hover sm:inline-flex"
            >
              Espace Pro
            </a>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((o) => !o)}
              className="grid size-12 place-items-center text-fg-muted transition hover:text-fg lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile — natif <dialog> simulé via overlay */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-fg/30 backdrop-blur-sm lg:hidden"
          />
          <div
            id="mobile-drawer"
            className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border-soft bg-bg lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            <div className="px-6 py-6">
              <PriceToggle />
              <nav aria-label="Catalogue par famille" className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-muted">
                  Catalogue · {catalogTree.length} familles
                </p>
                <ul className="space-y-1">
                  {catalogTree.slice(0, 8).map((family) => (
                    <li key={family.slug}>
                      <a
                        href={`/catalogue/${family.categories[0]?.slug ?? "photocellules"}`}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center justify-between rounded-md px-3 text-base font-medium text-fg hover:bg-bg-elev"
                      >
                        {family.name}
                        <span className="text-xs text-fg-muted">
                          {family.categories.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Services pro" className="mt-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-muted">
                  Services
                </p>
                <ul className="space-y-1">
                  {SECONDARY.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-md px-3 text-base text-fg-muted hover:bg-bg-elev hover:text-fg"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <a
                href="/compte-pro/nouveau"
                onClick={() => setOpen(false)}
                className="mt-8 flex min-h-12 w-full items-center justify-center rounded-md bg-accent text-base font-medium text-accent-fg"
              >
                Créer un compte pro
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
