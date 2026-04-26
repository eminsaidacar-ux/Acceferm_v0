import type { Metadata } from "next";
import { ArrowRight, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Marques distribuées",
  description:
    "5 fabricants européens distribués par AcceFerm Pro avec contrat fournisseur confirmé : V2 (groupe AFCA), Roger Technology, Motor Line, Doorgate, Intégral Système. Compatibilité testée par IEF & Co.",
  alternates: { canonical: "https://acceferm.fr/marques" },
};

type Brand = {
  name: string;
  origin: string;
  specialty: string;
  compat: string[];
  noPublicPrice?: boolean;
};

/**
 * 5 marques avec contrat fournisseur confirmé (avril 2026).
 * Toute autre marque mentionnée auparavant a été retirée — voir CLAUDE.md.
 */
const BRANDS: Brand[] = [
  {
    name: "V2 (groupe AFCA)",
    origin: "Italie",
    specialty:
      "Motorisations portails battants et coulissants. Photocellules, télécommandes, feux. Distribution exclusive France via AFCA.",
    compat: ["CITY1+", "AYROS", "FORTECO", "STARK", "SENSIVA"],
    noPublicPrice: true,
  },
  {
    name: "Roger Technology",
    origin: "Italie",
    specialty:
      "Motorisations brushless silencieuses haute durée de vie, claviers IP65, récepteurs radio rolling-code. Idéal copropriétés et usage intensif.",
    compat: ["BE20", "KR210", "H30", "SMARTY", "RX22A", "BR21/4000"],
    noPublicPrice: true,
  },
  {
    name: "Motor Line",
    origin: "Portugal",
    specialty:
      "Fabricant portugais — motorisations résidentielles, kits coulissants, accessoires radio. Très bon rapport qualité-prix sur les pavillons.",
    compat: ["LINCE", "JAGUAR", "MERCURY", "FLOX2R"],
  },
  {
    name: "Doorgate",
    origin: "Portugal",
    specialty:
      "Importateur officiel France de Roger Technology et Motor Line. Logistique IDF, délais d'environ une semaine, support technique francophone.",
    compat: ["DG-RES-300", "DG-IND-1000", "DG-COUL-600"],
  },
  {
    name: "Intégral Système",
    origin: "France",
    specialty:
      "Centrales VIGIK, claviers, badges, interphonie GSM 4G, ventouses magnétiques, serrures électriques. Cœur du pivot pro/industrie d'AcceFerm.",
    compat: [
      "CS600 1-16 portes",
      "Interphone GSM 4G",
      "Badges RFID",
      "Ventouse 300 kg",
    ],
  },
];

export default function MarquesPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <nav
          aria-label="Fil d'Ariane"
          className="border-b border-border-soft bg-bg-elev"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-sm lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-muted" aria-hidden="true" />
            <span className="font-medium text-fg">Marques distribuées</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {BRANDS.length} fabricants partenaires confirmés
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              Les marques qu'on pose et qu'on dépanne.
            </h1>
            <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
              On ne liste pas ce qu'on a dans un catalogue : on liste ce qu'on a
              validé sur chantier. Nos équipes IEF &amp; Co ont posé au moins un
              exemplaire de chaque référence ci-dessous en Île-de-France. Les
              compatibilités indiquées sont vérifiées, pas théoriques.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/configurer"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 text-base font-medium text-accent-fg btn-soft"
              >
                Configurateur compatibilité
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/catalogue/photocellules"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border-soft bg-bg px-6 text-base font-medium text-fg transition hover:border-fg"
              >
                Voir le catalogue
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ul className="grid gap-6 lg:grid-cols-2">
              {BRANDS.map((b) => (
                <li key={b.name}>
                  <article className="flex h-full flex-col gap-5 rounded-md border border-border-soft bg-bg p-6">
                    <header>
                      <h2 className="font-display text-2xl font-semibold text-fg">
                        {b.name}
                      </h2>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-fg-muted">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {b.origin}
                      </p>
                    </header>

                    <p className="prose-narrow text-base leading-relaxed text-fg-muted">
                      {b.specialty}
                    </p>

                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
                        Compatibilités testées
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {b.compat.map((c) => (
                          <li
                            key={c}
                            className="rounded border border-border-soft bg-bg-elev px-2.5 py-1 text-xs font-medium text-fg"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {b.noPublicPrice && (
                      <div className="mt-auto flex items-start gap-2 rounded-md border border-signal-warn/30 bg-signal-warn/5 p-3 text-sm">
                        <ShieldCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-signal-warn"
                          aria-hidden="true"
                        />
                        <p className="text-fg">
                          Motorisations <strong>sur devis uniquement</strong> —
                          clause contractuelle fabricant. Accessoires à prix
                          publics.
                        </p>
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-md border border-border-soft bg-bg-elev p-5 text-sm text-fg-muted">
              Catalogue en cours d'enrichissement — nouveaux partenariats
              fabricants à venir. Si votre parc utilise une marque non listée,
              <a
                href="/contact"
                className="ml-1 font-medium text-accent link-underline"
              >
                écrivez-nous
              </a>
              , on évalue les compatibilités sous 48 h.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
