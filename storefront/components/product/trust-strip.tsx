import { CreditCard, Headset, RotateCcw, ShieldCheck, Truck, Video } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Livraison 24h IDF", sub: "Cut-off 15h47" },
  { icon: ShieldCheck, title: "Garantie 2+1 an", sub: "Fabricant + AcceFerm Pro" },
  { icon: RotateCcw, title: "Retour 30 jours", sub: "Sans question" },
  { icon: CreditCard, title: "Paiement 30j pro", sub: "Compte Gold validé" },
  { icon: Headset, title: "SAV technique", sub: "Anciens poseurs · 8h-19h" },
  { icon: Video, title: "Vidéo-assistance", sub: "Offerte dès 300 € HT moto" },
] as const;

export function ProductTrustStrip() {
  return (
    <section aria-label="Garanties" className="border-b border-border-soft bg-bg-elev">
      <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-bg text-fg">
                <item.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-fg">{item.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
