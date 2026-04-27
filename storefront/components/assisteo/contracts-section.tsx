import { Check, Star } from "lucide-react";

type Formule = {
  id: "essentiel" | "confort" | "serenite";
  name: string;
  subtitle: string;
  bullets: string[];
  exclusions: string;
  priceFrom: string;
  badge?: string;
};

// Vraie grille tarifaire IEF & CO (v0.7.1) — validée par 2 contrats
// clients réels (HFC Technics, UNIVAR Solutions). Tarifs HT/an
// minimums (équipements de base), affinés par le calculateur ci-dessous.
const FORMULES: Formule[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    subtitle: "Le minimum réglementaire",
    bullets: [
      "Durée 1 an renouvelable par tacite reconduction",
      "2 visites de contrôle par an (périodicité semestrielle)",
      "Audit initial = 1ʳᵉ visite semestrielle",
      "Vérification complète mécanique + organes de sécurité + commande",
      "Entretien : dégrippage, nettoyage, graissage, contrôle isolation",
      "Rapport détaillé opposable assurance après chaque visite",
      "Livret d'entretien tenu à jour",
      "Assistance vidéo Assistéo en cas de panne",
    ],
    exclusions:
      "Exclusions : MO dépannage, pièces, frais de déplacement → sur devis",
    priceFrom: "147",
  },
  {
    id: "confort",
    name: "Confort",
    subtitle: "Le meilleur rapport qualité/service",
    badge: "Recommandé",
    bullets: [
      "Tout l'Essentiel +",
      "Prise en charge de la demande sous 1 heure",
      "Assistance vidéo Assistéo sous 3 heures",
      "Intervention physique prioritaire sous 48 heures ouvrées",
      "QR Code Assistéo posé sur chaque équipement (assistance IA 24/7)",
      "Remise de 10 % sur les pièces détachées en cas de dépannage",
    ],
    exclusions:
      "Exclusions : MO et déplacement sur devis (pièces −10 %)",
    priceFrom: "268",
  },
  {
    id: "serenite",
    name: "Sérénité",
    subtitle: "Tout inclus, zéro surprise",
    bullets: [
      "Engagement 3 ans",
      "Tout le Confort +",
      "Dépannage main-d'œuvre incluse (lun-ven 8 h – 17 h)",
      "Pièces détachées d'usure normale incluses",
      "Déplacement offert",
      "Idéal pour installations neuves",
    ],
    exclusions: "Exclusions : vandalisme, sinistre tiers, intempéries",
    priceFrom: "537",
  },
];

/**
 * Section C — 3 formules de contrats de maintenance (v0.7.1).
 *
 * Tarifs minimums HT/an par équipement (vraie grille IEF & CO).
 * Détail multi-équipement + dégressivité dans le calculateur (Section D).
 * CTA "Demander un devis" deep-link vers /contact?sujet=maintenance-[id].
 */
export function ContractsSection() {
  return (
    <section id="contrats" className="border-t border-border-soft py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
            Section C · contrats de maintenance
          </p>
          <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[52px]">
            Trois formules, une obligation tenue
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
            Pour syndics, property managers, facility managers, collectivités et
            entreprises avec parc de fermetures motorisées. Tarifs HT/an minimums
            par équipement — calculez le vôtre dans la section suivante.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FORMULES.map((f) => (
            <FormulaCard key={f.id} formule={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FormulaCard({ formule: f }: { formule: Formule }) {
  const highlighted = !!f.badge;
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-6 transition ${
        highlighted ? "border-accent bg-accent-soft" : "border-border-soft bg-bg"
      }`}
    >
      {f.badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-fg shadow-sm">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          {f.badge}
        </span>
      )}

      <h3 className="font-display text-[26px] font-semibold tracking-tight text-fg">
        {f.name}
      </h3>
      <p className="mt-1 text-[14px] text-fg-muted">{f.subtitle}</p>

      <div className="mt-5 border-y border-border-soft py-4">
        <p className="text-[11px] uppercase tracking-wide text-fg-subtle">
          À partir de
        </p>
        <p className="mt-0.5 font-display text-[28px] font-semibold tabular-nums text-fg">
          {f.priceFrom} € HT
          <span className="ml-1 text-[14px] font-normal text-fg-muted">/ an</span>
        </p>
        <p className="text-[11px] text-fg-subtle">par équipement</p>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {f.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-fg">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[11px] leading-relaxed text-fg-subtle">
        {f.exclusions}
      </p>

      <a
        href={`/contact?sujet=maintenance-${f.id}`}
        className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md px-4 text-[14px] font-medium transition ${
          highlighted
            ? "bg-accent text-accent-fg hover:bg-accent-hover"
            : "border border-border bg-bg text-fg hover:border-fg"
        }`}
      >
        Demander un devis
      </a>
    </article>
  );
}
