import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Download,
  FileClock,
  FileText,
  Package,
  Plus,
  RotateCcw,
  Settings,
  TrendingUp,
} from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { cn } from "@/lib/utils";
import {
  chantiers,
  invoices,
  proMetrics,
  proOrders,
  reorderList,
} from "@/lib/pro-data";

export const metadata: Metadata = {
  title: "Espace Pro — Tableau de bord",
  description: "Historique chantiers, commandes, factures, re-commande 1-clic, paiement 30j.",
};

const EUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);

export default function ProDashboardPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        {/* Hero bar */}
        <section className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-fg">
                    Pro Silver
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    SIRET validé · compte ouvert depuis janv. 2026
                  </span>
                </div>
                <h1 className="mt-4 font-display text-[40px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[56px]">
                  Bonjour Lucas,
                  <br />
                  <span className="text-fg-muted">prêt pour le chantier ?</span>
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#commande-rapide"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition hover:bg-accent-hover"
                >
                  Commande éclair
                  <Plus className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/catalogue/photocellules"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] text-fg transition hover:border-fg"
                >
                  Ouvrir le catalogue
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* KPI strip */}
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
              <KPI
                label="Dépense du mois"
                value={`${EUR(proMetrics.mtdSpend)} €`}
                sub={`${proMetrics.mtdOrders} commandes · HT`}
                icon={TrendingUp}
              />
              <KPI
                label="Cumul 12 mois"
                value={`${EUR(proMetrics.ytdSpend)} €`}
                sub={`Palier ${proMetrics.nextTierLabel} à ${EUR(proMetrics.nextTierThreshold)} €`}
                progress={proMetrics.tierProgress}
              />
              <KPI
                label="Devis en attente"
                value={`${proMetrics.openQuotes}`}
                sub="Réponse AcceFerm sous 24h"
                icon={FileText}
              />
              <KPI
                label="Factures à régler"
                value={`${EUR(proMetrics.pendingInvoicesAmount)} €`}
                sub={`${proMetrics.pendingInvoices} échéances · paiement 30j`}
                icon={FileClock}
                warn
              />
            </div>
          </div>
        </section>

        {/* Main grid: quick actions + orders */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left column */}
              <div className="space-y-8 lg:col-span-8">
                {/* Recent orders */}
                <section aria-labelledby="orders-h">
                  <div className="mb-4 flex items-center justify-between">
                    <h2
                      id="orders-h"
                      className="font-display text-[24px] font-semibold tracking-tight text-fg"
                    >
                      Commandes récentes
                    </h2>
                    <a
                      href="#"
                      className="text-[13px] text-fg-muted transition hover:text-fg"
                    >
                      Toutes les commandes →
                    </a>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-border-soft bg-bg">
                    <table className="w-full text-left text-[13px]">
                      <thead>
                        <tr className="border-b border-border-soft bg-bg-elev font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                          <th className="px-4 py-3">Référence</th>
                          <th className="px-4 py-3 hidden md:table-cell">Chantier</th>
                          <th className="px-4 py-3">Articles</th>
                          <th className="px-4 py-3 text-right">Total HT</th>
                          <th className="px-4 py-3 text-right">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proOrders.map((o) => (
                          <tr
                            key={o.ref}
                            className="border-b border-border-soft last:border-b-0 transition hover:bg-bg-elev"
                          >
                            <td className="px-4 py-4 align-top">
                              <div className="font-mono text-[12px] font-semibold text-fg">
                                {o.ref}
                              </div>
                              <div className="mt-1 font-mono text-[11px] text-fg-subtle">
                                {o.date}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top hidden md:table-cell">
                              <div className="text-fg">{o.chantier}</div>
                              <div className="mt-1 font-mono text-[11px] text-fg-subtle">
                                {o.city}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <div className="inline-flex items-center gap-1.5">
                                <Package className="h-3.5 w-3.5 text-fg-subtle" />
                                <span className="font-mono tabular-nums text-fg">{o.items}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right align-top">
                              <div className="font-display text-[16px] font-semibold tabular-nums text-fg">
                                {EUR(o.total)} €
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top text-right">
                              <StatusBadge status={o.status} />
                              {o.trackingEta && (
                                <div className="mt-1 font-mono text-[10px] text-fg-subtle">
                                  {o.trackingEta}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Quick reorder */}
                <section aria-labelledby="reorder-h">
                  <div className="mb-4 flex items-center justify-between">
                    <h2
                      id="reorder-h"
                      className="font-display text-[24px] font-semibold tracking-tight text-fg"
                    >
                      Re-commander en 1 clic
                    </h2>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                      Basé sur votre historique 90j
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {reorderList.map((r) => (
                      <div
                        key={r.code}
                        className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-bg p-4"
                      >
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                            {r.brand} · {r.code}
                          </div>
                          <div className="mt-1.5 text-[14px] font-medium text-fg">
                            {r.name}
                          </div>
                        </div>
                        <div className="space-y-1 font-mono text-[11px] text-fg-muted">
                          <div>Dernière commande · {r.lastOrdered}</div>
                          <div>Fréquence · {r.frequency}</div>
                          <div className="text-fg">Quantité habituelle · ×{r.lastQty}</div>
                        </div>
                        <button
                          type="button"
                          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-fg py-2 text-[12px] font-medium text-accent-fg transition hover:bg-accent"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Re-commander ×{r.lastQty}
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Invoices */}
                <section aria-labelledby="invoices-h">
                  <div className="mb-4 flex items-center justify-between">
                    <h2
                      id="invoices-h"
                      className="font-display text-[24px] font-semibold tracking-tight text-fg"
                    >
                      Factures
                    </h2>
                    <a
                      href="#"
                      className="text-[13px] text-fg-muted transition hover:text-fg"
                    >
                      Exporter CSV →
                    </a>
                  </div>

                  <div className="space-y-2">
                    {invoices.map((inv) => (
                      <div
                        key={inv.ref}
                        className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-bg p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-bg-elev text-fg">
                            <FileText className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="font-mono text-[13px] font-semibold text-fg">
                              {inv.ref}
                            </div>
                            <div className="font-mono text-[11px] text-fg-subtle">
                              {inv.chantier} · émise le {inv.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <div className="text-right">
                            <div className="font-display text-[18px] font-semibold tabular-nums text-fg">
                              {EUR(inv.amount)} €
                            </div>
                            <InvoiceStatus inv={inv} />
                          </div>
                          <button
                            type="button"
                            aria-label={`Télécharger ${inv.ref}`}
                            className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg-muted transition hover:border-fg hover:text-fg"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <aside className="space-y-6 lg:col-span-4">
                {/* Tier progress card */}
                <section className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    Progression palier
                  </div>
                  <div className="mt-2 font-display text-[28px] font-semibold leading-tight text-fg">
                    {proMetrics.tierProgress}%
                  </div>
                  <p className="mt-1 text-[13px] text-fg-muted">
                    Plus que{" "}
                    <strong className="text-fg">
                      {EUR(proMetrics.nextTierThreshold - proMetrics.ytdSpend)} €
                    </strong>{" "}
                    avant {proMetrics.nextTierLabel}
                  </p>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-bg">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${proMetrics.tierProgress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-subtle">
                    <span>0 €</span>
                    <span>{EUR(proMetrics.nextTierThreshold)} €</span>
                  </div>
                </section>

                {/* Chantiers */}
                <section className="rounded-2xl border border-border-soft bg-bg p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[18px] font-semibold text-fg">
                      Mes chantiers
                    </h3>
                    <a href="#" className="font-mono text-[11px] text-fg-muted hover:text-fg">
                      + ajouter
                    </a>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {chantiers.slice(0, 4).map((c) => (
                      <li
                        key={c.ref}
                        className="rounded-xl border border-border-soft bg-bg-elev p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-medium text-fg">
                              {c.name}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                              {c.city} · ouvert {c.opened}
                            </div>
                          </div>
                          <div className="text-right font-mono text-[11px] tabular-nums text-fg">
                            {EUR(c.spend)} €
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                          <span className="inline-flex items-center gap-1">
                            <Package className="h-3 w-3" /> {c.orders} cmd
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {c.lastActivity}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Settings shortcuts */}
                <section className="rounded-2xl border border-border-soft bg-bg p-6">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-fg-muted" />
                    <h3 className="font-display text-[18px] font-semibold text-fg">
                      Raccourcis compte
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-1">
                    {[
                      "Adresses de livraison",
                      "Moyens de paiement",
                      "Utilisateurs de l'entreprise",
                      "Facturation & TVA",
                      "Notifications email",
                    ].map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="flex items-center justify-between rounded-lg px-2 py-2 text-[13px] text-fg-muted transition hover:bg-bg-elev hover:text-fg"
                        >
                          {l}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function KPI({
  label,
  value,
  sub,
  icon: Icon,
  progress,
  warn,
}: {
  label: string;
  value: string;
  sub: string;
  icon?: React.ComponentType<{ className?: string }>;
  progress?: number;
  warn?: boolean;
}) {
  return (
    <div className="bg-bg p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
          {label}
        </span>
        {Icon && <Icon className={cn("h-3.5 w-3.5", warn ? "text-signal-warn" : "text-fg-muted")} />}
      </div>
      <div className="mt-2 font-display text-[28px] font-semibold tabular-nums leading-none tracking-tight text-fg">
        {value}
      </div>
      <div className="mt-2 font-mono text-[11px] text-fg-muted">{sub}</div>
      {progress !== undefined && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-bg-elev">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    expedie: { label: "Expédiée", cls: "bg-signal-ok/10 text-signal-ok" },
    preparation: { label: "En préparation", cls: "bg-accent/10 text-accent" },
    livre: { label: "Livrée", cls: "bg-fg/10 text-fg" },
    "facture-due": { label: "Facture à régler", cls: "bg-signal-warn/10 text-signal-warn" },
  };
  const s = map[status] ?? { label: status, cls: "bg-bg-elev text-fg" };
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em]",
        s.cls,
      )}
    >
      {s.label}
    </span>
  );
}

function InvoiceStatus({ inv }: { inv: { status: string; dueDate: string } }) {
  const map: Record<string, { label: string; cls: string }> = {
    paid: { label: "Réglée", cls: "text-signal-ok" },
    due: { label: `Échéance ${inv.dueDate}`, cls: "text-fg-muted" },
    overdue: { label: `En retard · ${inv.dueDate}`, cls: "text-signal-err" },
  };
  const s = map[inv.status] ?? { label: inv.status, cls: "text-fg" };
  return (
    <div className={cn("mt-1 font-mono text-[10px] uppercase tracking-[0.15em]", s.cls)}>
      {s.label}
    </div>
  );
}
