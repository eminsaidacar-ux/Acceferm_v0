import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Commande · Paiement sécurisé",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
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
            <a href="/panier" className="text-fg-muted transition hover:text-fg">
              Panier
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Commande</span>
          </div>
        </nav>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Commande sécurisée · SSL · Stripe 3DS
              </p>
              <h1 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[60px]">
                Finalisez en trois étapes.
              </h1>
            </div>

            <CheckoutFlow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
