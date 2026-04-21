import type { Metadata } from "next";
import { Building2, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { phoneLines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — AcceFerm Pro",
  description: "Devis sous 24h, SAV technique joignable au 01 84 XX XX 17, atelier 95240 Cormeilles-en-Parisis.",
};

const SUBJECTS = [
  "Devis motorisation",
  "Devis accessoires / commande groupée",
  "Question SAV · panne",
  "Création de compte pro / grilles tarifaires",
  "Partenariat fabricant / distribution",
  "Demande presse",
  "Autre",
];

export default function ContactPage() {
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
            <span className="font-medium text-fg">Contact</span>
          </div>
        </nav>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Contact direct · réponse {"<"} 24h ouvrées
              </p>
              <h1 className="mt-4 font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg lg:text-[88px]">
                Un humain répond.
                <br />
                <span className="text-accent">Pas un bot.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                Téléphone pour l'urgence, email pour la réflexion, visite d'atelier sur rendez-vous.
                On décroche avant la 3e sonnerie en journée.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-7">
                <form className="space-y-5 rounded-2xl border border-border bg-bg p-6 lg:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Prénom" placeholder="Lucas" />
                    <Field label="Nom" placeholder="Martin" />
                    <Field label="Email" type="email" placeholder="contact@votre-societe.fr" />
                    <Field label="Téléphone" placeholder="+33 6 12 34 56 78" />
                    <Field className="sm:col-span-2" label="Société" placeholder="IEF & Co" />
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      Sujet
                    </span>
                    <select className="rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg focus:border-accent focus:outline-none">
                      <option value="">Sélectionnez…</option>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      Votre message
                    </span>
                    <textarea
                      rows={6}
                      placeholder="Décrivez votre besoin : chantier, marque moteur existante, symptôme panne, dimensions portail…"
                      className="rounded-xl border border-border-soft bg-bg px-3.5 py-3 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none"
                    />
                  </label>

                  <label
                    htmlFor="cgu-contact"
                    className="flex cursor-pointer items-start gap-3 text-[12px] text-fg-muted"
                  >
                    <input id="cgu-contact" type="checkbox" defaultChecked className="mt-1 accent-accent" />
                    <span>
                      J'accepte le traitement de mes données pour la réponse à ma demande
                      (politique de confidentialité).
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>

              {/* Contact info */}
              <aside className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-border-soft bg-bg-elev p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    <Phone className="h-3.5 w-3.5" />
                    Téléphones dédiés
                  </div>
                  <ul className="mt-4 space-y-3">
                    {phoneLines.map((l) => (
                      <li key={l.number}>
                        <a
                          href={l.href}
                          className="flex items-center justify-between rounded-xl bg-bg p-3 transition hover:bg-bg-soft"
                        >
                          <div>
                            <div className="text-[13px] font-medium text-fg">{l.label}</div>
                            <div className="font-mono text-[11px] text-fg-subtle">L-V 8h-19h</div>
                          </div>
                          <div className="font-mono text-[14px] font-semibold tabular-nums text-fg">
                            {l.number}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border-soft bg-bg p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    <Mail className="h-3.5 w-3.5" />
                    Emails
                  </div>
                  <ul className="mt-3 space-y-2 text-[13px]">
                    <li>
                      <a href="mailto:contact@acceferm.fr" className="text-fg hover:text-accent">
                        contact@acceferm.fr
                      </a>{" "}
                      <span className="text-fg-subtle">· commercial</span>
                    </li>
                    <li>
                      <a href="mailto:sav@acceferm.fr" className="text-fg hover:text-accent">
                        sav@acceferm.fr
                      </a>{" "}
                      <span className="text-fg-subtle">· SAV technique</span>
                    </li>
                    <li>
                      <a href="mailto:compta@acceferm.fr" className="text-fg hover:text-accent">
                        compta@acceferm.fr
                      </a>{" "}
                      <span className="text-fg-subtle">· factures pro</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border-soft bg-bg p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    Atelier
                  </div>
                  <p className="mt-3 text-[14px] text-fg">
                    26 rue du Travers des Champs Guillaume
                    <br />
                    95240 Cormeilles-en-Parisis
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
                    <Clock className="h-3 w-3" />
                    L-J 8h-12h / 13h30-17h30 · V 8h-12h / 13h30-17h
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
                    <Building2 className="h-3 w-3" />
                    Retrait comptoir gratuit sur rendez-vous
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-border-soft bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-subtle transition focus:border-accent focus:outline-none"
      />
    </label>
  );
}
