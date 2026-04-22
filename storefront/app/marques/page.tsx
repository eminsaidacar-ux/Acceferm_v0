import type { Metadata } from "next";
import { ArrowUpRight, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Marques distribuées — Fermetures automatiques pro",
  description:
    "Les 15 marques européennes que nous distribuons : V2/AFCA, Roger Technology, Nice, Came, FAAC, BFT, Intégral Système, Motor Line… Compatibilité testée sur 3 000+ chantiers IEF.",
};

type Brand = {
  name: string;
  shape: string;
  origin: string;
  specialty: string;
  compat: string[];
  noPublicPrice?: boolean;
};

const BRANDS: Brand[] = [
  {
    name: "V2 · AFCA",
    shape: "●",
    origin: "Italie",
    specialty: "Motorisations portails battants & coulissants. Référence distributeur France.",
    compat: ["Armoires CITY1+", "AYROS", "FORTECO", "STARK"],
    noPublicPrice: true,
  },
  {
    name: "Roger Technology",
    shape: "▲",
    origin: "Italie",
    specialty: "Brushless silencieux, haute durée de vie. Idéal copropriétés.",
    compat: ["BE20", "KR210", "H30", "SMARTY", "BR21/4000"],
    noPublicPrice: true,
  },
  {
    name: "Nice",
    shape: "■",
    origin: "Italie",
    specialty: "Catalogue généraliste, rolling-code premium, interphonie résidentielle.",
    compat: ["ROBO 500/1000", "NAKED", "HINT 2", "FLOX2R"],
  },
  {
    name: "Came",
    shape: "◆",
    origin: "Italie",
    specialty: "Robuste 230V, grande diffusion IDF, pièces toujours en stock.",
    compat: ["KRYNO", "BX-243", "BK 1800", "ATI 3000", "DIR10"],
  },
  {
    name: "FAAC",
    shape: "＋",
    origin: "Italie",
    specialty: "Motorisations enterrées haut de gamme, armoires pro.",
    compat: ["C720", "S700H", "844 ER", "415 L", "XR2"],
  },
  {
    name: "BFT",
    shape: "●",
    origin: "Italie",
    specialty: "Opto-isolation native, bornes escamotables, barrières levantes.",
    compat: ["ICARO", "ARES", "PHOBOS", "DEIMOS", "Radius", "Mitto 2"],
  },
  {
    name: "Beninca",
    shape: "▲",
    origin: "Italie",
    specialty: "Entrée de gamme fiable, bon rapport prix-qualité pour résidentiel.",
    compat: ["Bob 50", "Bull 624", "JIM", "VN"],
  },
  {
    name: "Motor Line",
    shape: "■",
    origin: "Portugal",
    specialty: "Fabricant direct, prix agressifs sur volume, gamme 24V.",
    compat: ["TREO", "MONTY", "LINCE", "SPY"],
  },
  {
    name: "Intégral Système",
    shape: "◆",
    origin: "France",
    specialty: "Contrôle d'accès VIGIK, interphonie GSM 4G, centrales multi-portes.",
    compat: ["CS600 1-16 portes", "Interphone GSM", "Badges RFID"],
  },
  {
    name: "Urmet",
    shape: "＋",
    origin: "Italie",
    specialty: "VIGIK professionnel, visiophonie résidentielle et tertiaire.",
    compat: ["VIGIK Pro", "Visiophone 4.3\"", "Centrale multi-sites"],
  },
  {
    name: "Comelit",
    shape: "●",
    origin: "Italie",
    specialty: "Intégration visio + contrôle d'accès poussée, app résidents.",
    compat: ["Access", "Visiophonie Ultra", "Badges multi-techno"],
  },
  {
    name: "Cisa",
    shape: "▲",
    origin: "Italie",
    specialty: "Serrures électriques encastrées, ventouses magnétiques 300 kg.",
    compat: ["Electroserrure 12V", "Ventouse 300 kg", "Gâche"],
  },
  {
    name: "Cardin",
    shape: "■",
    origin: "Italie",
    specialty: "Télécommandes rolling-code, récepteurs externes robustes.",
    compat: ["S435", "S486", "TRQ", "Récepteurs 433 MHz"],
  },
  {
    name: "Ditec Entrematic",
    shape: "◆",
    origin: "Italie",
    specialty: "Portes automatiques, portes industrielles rapides.",
    compat: ["Cross", "Dor", "Valor", "Traffic"],
  },
  {
    name: "Hörmann",
    shape: "＋",
    origin: "Allemagne",
    specialty: "Portes sectionnelles industrielles et résidentielles.",
    compat: ["LPU 42", "SPU 40", "Motorisation ProMatic"],
  },
];

export default function MarquesPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">Accueil</a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Marques distribuées</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-muted">
              {BRANDS.length} fabricants européens · compatibilité testée terrain
            </p>
            <h1 className="mt-6 font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg lg:text-[96px]">
              Les marques qu'on pose
              <br />
              <span className="italic font-medium text-peach">et qu'on dépanne.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[16px] leading-[1.65] text-fg-muted">
              On ne liste pas ce qu'on a dans un catalogue : on liste ce qu'on a validé sur
              chantier. Nos équipes IEF & Co ont posé au moins un exemplaire de chaque référence
              ci-dessous en Île-de-France. Les compatibilités indiquées sont vérifiées, pas
              théoriques.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="/#configurateur"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Trouver un accessoire compatible
              </a>
              <a
                href="/configurer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] text-fg hover:border-fg"
              >
                Configurateur motorisation
              </a>
            </div>
          </div>
        </section>

        {/* Brand cards */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-px overflow-hidden rounded-3xl bg-border-soft sm:grid-cols-2 lg:grid-cols-3">
              {BRANDS.map((b, i) => (
                <article
                  key={b.name}
                  className="group flex flex-col gap-5 bg-bg p-7 transition hover:bg-bg-elev"
                >
                  <header className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[28px] leading-none text-accent">{b.shape}</span>
                        <h2 className="font-display text-[24px] font-semibold tracking-tight text-fg">
                          {b.name}
                        </h2>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                        <MapPin className="h-3 w-3" />
                        {b.origin}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle tabular">
                      — {String(i + 1).padStart(2, "0")} / {String(BRANDS.length).padStart(2, "0")}
                    </span>
                  </header>

                  <p className="text-[14px] leading-relaxed text-fg-muted">{b.specialty}</p>

                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                      Compatibilités testées
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {b.compat.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-border-soft bg-bg-elev px-2.5 py-0.5 font-mono text-[11px] text-fg"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {b.noPublicPrice && (
                    <div className="mt-auto flex items-start gap-2 rounded-xl border border-signal-warn/20 bg-signal-warn/5 p-3">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-warn" />
                      <p className="font-mono text-[11px] leading-relaxed text-fg">
                        Motorisations <strong>sur devis uniquement</strong> — clause contractuelle
                        fabricant. Accessoires et pièces détachées à prix publics.
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[56px]">
              Une marque manquante ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              On ouvre régulièrement de nouveaux comptes fabricant. Si vous avez un parc à
              maintenir avec une marque non listée, écrivez-nous : on évalue en 48h.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Proposer une marque
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/a-propos"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[14px] text-fg hover:border-fg"
              >
                Notre approche IEF & Co
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
