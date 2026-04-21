import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Panier",
  description: "Votre panier AcceFerm Pro. Remise Pro Silver automatique, livraison 24h IDF.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Panier</span>
          </div>
        </nav>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Panier · Pro Silver actif
                </p>
                <h1 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
                  Votre commande.
                </h1>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
                Remise auto −5 % sur tous les articles
              </div>
            </div>

            <CartView />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
