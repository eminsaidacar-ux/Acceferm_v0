import type { Metadata } from "next";
import { Building2, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { ContactForm } from "@/components/site/contact-form";
import { phoneLines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — AcceFerm Pro",
  description: "Devis sous 24h, SAV technique joignable au 01 XX XX XX XX, atelier 95410 Groslay.",
};

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
                <span className="italic font-medium text-accent">Pas un bot.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
                Téléphone pour l'urgence, email pour la réflexion, visite d'atelier sur rendez-vous.
                On décroche avant la 3e sonnerie en journée.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-7">
                <ContactForm />
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
                    8 Rue René Dubos
                    <br />
                    95410 Groslay
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
