import type { Metadata } from "next";
import { CheckCircle2, Package, Phone, Truck } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description: "Votre commande AcceFerm Pro a bien été reçue.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ order?: string; session?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;
  const orderNumber = order ?? "AF-XXXX-XXXX";

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <section className="paper-texture relative overflow-hidden border-b border-border-soft py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="rounded-3xl border border-signal-ok/30 bg-signal-ok/5 p-8 lg:p-12">
              <CheckCircle2 className="h-12 w-12 text-signal-ok" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-signal-ok">
                ● Commande confirmée
              </p>
              <h1 className="mt-4 font-display text-[40px] font-semibold leading-[0.95] tracking-[-0.025em] text-fg lg:text-[64px]">
                Merci pour votre commande.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                Votre paiement a été reçu. Numéro de commande :{" "}
                <strong className="font-mono tabular text-fg">{orderNumber}</strong>. Un email de
                confirmation vient de vous être envoyé.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <Package className="h-5 w-5 text-accent" />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Préparation
                </div>
                <div className="mt-1 text-[14px] font-medium text-fg">Atelier 95 — aujourd'hui</div>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <Truck className="h-5 w-5 text-accent" />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Livraison
                </div>
                <div className="mt-1 text-[14px] font-medium text-fg">J+1 Île-de-France</div>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg p-5">
                <Phone className="h-5 w-5 text-accent" />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Besoin d'aide ?
                </div>
                <a
                  href="#numero-a-confirmer"
                  className="mt-1 block font-mono text-[14px] font-semibold text-fg"
                >
                  01 XX XX XX XX
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
              >
                Retour à l'accueil
              </a>
              <a
                href="/pro"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[13px] text-fg transition hover:border-fg"
              >
                Voir mes commandes
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
