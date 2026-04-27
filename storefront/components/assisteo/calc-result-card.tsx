import {
  type CalcResult,
  fmtPrice,
} from "@/lib/maintenance-pricing";

/**
 * Card résultat live du calculateur tarifaire (Section D, v0.7.1).
 *
 * Affiche soit l'estimation chiffrée, soit un message d'indisponibilité
 * quand la formule sélectionnée n'existe pas pour l'équipement.
 */
export function CalcResultCard({ result }: { result: CalcResult }) {
  if (!result.available) {
    return (
      <div
        className="rounded-2xl border border-signal-warn/40 bg-bg-elev p-6 lg:col-span-5"
        aria-live="polite"
      >
        <p className="text-[12px] font-medium uppercase tracking-wide text-signal-warn">
          Formule non applicable
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-fg">
          La formule sélectionnée n'est pas disponible pour cet équipement.
          Choisissez la formule <strong>Essentiel</strong> ou contactez-nous
          pour étudier votre cas.
        </p>
      </div>
    );
  }
  return (
    <div
      className="rounded-2xl border border-accent/30 bg-accent-soft p-6 lg:col-span-5"
      aria-live="polite"
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
        Estimation
      </p>
      <dl className="mt-4 space-y-2 text-[14px] text-fg">
        <Row label="Prix unitaire HT/an" value={`${fmtPrice(result.unit)} €`} />
        <Row label="Sous-total" value={`${fmtPrice(result.subtotal)} €`} />
        {result.rate > 0 && (
          <Row
            label="Remise multi-équipements"
            value={`−${Math.round(result.rate * 100)} %`}
            tone="ok"
          />
        )}
        <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-accent/30 pt-3">
          <dt className="font-medium text-fg">Total HT/an</dt>
          <dd className="font-display text-[24px] font-semibold tabular-nums text-fg">
            {fmtPrice(result.total)} €
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-fg-muted">{label}</dt>
      <dd
        className={`font-display font-semibold tabular-nums ${
          tone === "ok" ? "text-signal-ok" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
