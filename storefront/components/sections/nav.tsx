"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MegaMenu } from "@/components/sections/mega-menu";
import { Logo } from "@/components/ui/logo";
import { PriceToggle } from "@/components/ui/price-toggle";
import { catalogTree } from "@/lib/catalog-tree";

const SECONDARY = [
  { label: "Configurateur motorisation", href: "/configurer" },
  { label: "Espace Pro", href: "/pro" },
  { label: "Créer un compte pro", href: "/compte-pro/nouveau" },
  { label: "Marques distribuées", href: "/marques" },
  { label: "Installateur IDF", href: "/installateur-motorisation-portail/paris-75" },
  { label: "Manifeste", href: "/manifeste" },
  { label: "Normes EN", href: "/normes" },
  { label: "Gabarits pro", href: "/gabarits" },
  { label: "Glossaire technique", href: "/glossaire" },
  { label: "À propos IEF & Co", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border-soft bg-bg/85 backdrop-blur-xl shadow-[0_2px_24px_-18px_rgba(42,36,30,0.25)]"
          : "border-transparent bg-bg/60 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div
          className={[
            "flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-12" : "h-16",
          ].join(" ")}
        >
          <a
            href="/"
            aria-label="AcceFerm Pro — retour accueil"
            className="group flex items-center gap-3"
          >
            <Logo />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle md:inline">
              · Pro & Industrie
            </span>
          </a>

          <MegaMenu />

          <div className="flex items-center gap-1">
            <PriceToggle className="hidden sm:flex" />
            <a
              href="/recherche"
              aria-label="Recherche"
              className="p-2 text-fg-muted transition hover:text-fg"
            >
              <Search className="h-[18px] w-[18px]" />
            </a>
            <a
              href="/panier"
              aria-label="Panier"
              className="relative p-2 text-fg-muted transition hover:text-fg"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-fg font-semibold text-[10px] text-accent-fg">
                3
              </span>
            </a>
            <a
              href="/pro"
              className="ml-2 hidden items-center rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover sm:inline-flex"
            >
              Espace Pro
            </a>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="p-2 text-fg-muted transition hover:text-fg lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 z-40 bg-fg/30 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-14 bottom-0 z-50 w-full max-w-sm overflow-y-auto border-l border-border-soft bg-bg lg:hidden"
            aria-label="Menu mobile"
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <PriceToggle />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Basculer HT / TTC
                </span>
              </div>

              <div className="mt-8">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Catalogue · {catalogTree.length} familles
                </div>
                <ul className="space-y-1">
                  {catalogTree.map((family) => (
                    <li key={family.slug}>
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-fg transition hover:bg-bg-elev">
                          <div className="flex flex-col">
                            <span>{family.name}</span>
                            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                              {family.categories.length} catégories
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-fg-subtle transition group-open:rotate-90" />
                        </summary>
                        <ul className="mb-1 mt-1 space-y-0.5 border-l border-border-soft pl-3">
                          {family.categories.map((cat) => (
                            <li key={cat.slug}>
                              <a
                                href={`/catalogue/${cat.slug}`}
                                className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                                onClick={() => setOpen(false)}
                              >
                                <span>{cat.name}</span>
                                <span className="font-mono text-[10px] text-fg-subtle">
                                  {cat.subs.length}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Services pro
                </div>
                <ul className="space-y-1">
                  {SECONDARY.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-[14px] text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                        <span className="font-mono text-fg-subtle">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl border border-border-soft bg-bg-elev p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  SAV technique
                </div>
                <a
                  href="tel:+33184000017"
                  className="mt-2 block font-mono text-[16px] font-semibold text-fg"
                >
                  01 84 XX XX 17
                </a>
                <div className="mt-1 font-mono text-[11px] text-fg-muted">
                  Lundi-vendredi 8h-19h
                </div>
              </div>

              <a
                href="/compte-pro/nouveau"
                onClick={() => setOpen(false)}
                className="mt-8 flex w-full items-center justify-center rounded-full bg-accent py-3 text-[14px] font-medium text-accent-fg"
              >
                Créer un compte pro
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
