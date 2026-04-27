type Step = {
  title: string;
  body: string;
  optional?: string;
};

const STEPS: Step[] = [
  {
    title: "Audit initial",
    body: "Visite des installations, état des lieux, premières préconisations. Compte comme la 1ʳᵉ visite semestrielle.",
  },
  {
    title: "Pose QR Code Assistéo",
    optional: "formules Confort et Sérénité",
    body: "Sur chaque équipement, accès assistance IA 24/7 et contact direct IEF & Co.",
  },
  {
    title: "2ᵉ visite semestrielle",
    body: "Dans les 6 mois suivant l'audit. Vérification complète, entretien, rapport opposable.",
  },
  {
    title: "Suivi continu",
    body: "Renouvellement automatique, rapports transmis après chaque visite, livret d'entretien à jour.",
  },
];

/**
 * Section E — Déroulement du contrat (v0.7.1).
 *
 * 4 étapes en cartes parallèles desktop / liste verticale mobile.
 * Étape 2 (QR Code) marquée "optional" pour signaler les formules concernées.
 */
export function ProcessSection() {
  return (
    <section
      id="deroulement"
      aria-labelledby="process-title"
      className="border-t border-border-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted">
          Section E · déroulement
        </p>
        <h2
          id="process-title"
          className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-fg lg:text-[44px]"
        >
          Comment se déroule votre contrat
        </h2>

        <ol className="mt-10 grid gap-4 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border-soft bg-bg-elev p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[14px] font-semibold text-accent-fg">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-[18px] font-semibold tracking-tight text-fg">
                {step.title}
              </h3>
              {step.optional && (
                <p className="mt-1 text-[11px] uppercase tracking-wide text-accent">
                  {step.optional}
                </p>
              )}
              <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
