import {
  BatteryCharging,
  CircuitBoard,
  Cog,
  DoorOpen,
  KeyRound,
  Lightbulb,
  Phone,
  Radio,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { CATALOGUE_FAMILIES } from "@/lib/catalogue-families";
import type { CatalogueFamily } from "@/lib/catalogue-families";

const ICONS = {
  ShieldCheck,
  Radio,
  Cog,
  DoorOpen,
  CircuitBoard,
  Lightbulb,
  BatteryCharging,
  KeyRound,
  Phone,
  Wrench,
} as const;

/**
 * Grille des 10 familles catalogue (page hub /catalogue).
 *
 * Responsive : 2 cols mobile, 3 tablette, 5 desktop.
 * Chaque card : icône + nom + description courte + 4 sous-thèmes preview
 * + count références. Cliquable sur toute la surface.
 */
export function FamilyGrid() {
  return (
    <section
      aria-labelledby="families-title"
      className="border-b border-border-soft py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
            Catalogue · 10 familles
          </p>
          <h2
            id="families-title"
            className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[52px]"
          >
            Trouvez votre produit par famille
          </h2>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {CATALOGUE_FAMILIES.map((f) => (
            <li key={f.id}>
              <FamilyCard family={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FamilyCard({ family }: { family: CatalogueFamily }) {
  const Icon = ICONS[family.icon];
  return (
    <a
      href={`/catalogue/${family.id}`}
      className="group flex h-full flex-col rounded-2xl border border-border-soft bg-bg p-5 transition hover:border-fg focus-visible:border-accent"
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-md border border-border bg-bg-elev text-fg-muted transition group-hover:bg-accent group-hover:text-accent-fg group-hover:border-accent"
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-[18px] font-semibold leading-tight tracking-tight text-fg">
        {family.name}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
        {family.description}
      </p>
      <ul className="mt-3 space-y-1 text-[12px] text-fg-subtle">
        {family.themesPreview.map((t) => (
          <li key={t}>· {t}</li>
        ))}
      </ul>
      <div className="mt-auto pt-4 text-[11px] uppercase tracking-wide text-accent">
        {family.count} références →
      </div>
    </a>
  );
}
