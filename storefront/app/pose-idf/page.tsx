import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ChevronRight, Clock, Phone, Video } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { img, imagery } from "@/lib/images";
import { localZones } from "@/lib/local-zones";

export const metadata: Metadata = {
  title: "Pose IDF & vidéo-assistance Assistéo",
  description:
    "Installation motorisation portail en Île-de-France par IEF & Co. Vidéo-assistance Assistéo offerte dès 300 € HT achat.",
};

const PACKAGES = [
  {
    title: "Pose motorisation standard",
    price: "dès 690 €",
    sub: "HT, main d'œuvre incluse, matériel en sus",
    features: [
      "Dépose de l'ancien moteur",
      "Pose du nouveau kit configuré",
      "Câblage + raccordement 230 V",
      "Programmation 2 télécommandes",
      "Test cycles + mise en service",
    ],
  },
  {
    title: "Pose + remise en conformité EN 12453",
    price: "dès 1 190 €",
    sub: "Pour copropriétés et bailleurs",
    features: [
      "Tout Pose standard +",
      "Photocellules 2easy + barre palpeuse",
      "Feu clignotant + signalétique",
      "Remise du PV conformité",
      "Contrat maintenance 1 an inclus",
    ],
    featured: true,
  },
  {
    title: "Contrat maintenance annuel",
    price: "dès 340 €",
    sub: "Visite + pièces d'usure",
    features: [
      "1 visite d'entretien annuelle",
      "Graissage chaîne / vérin / rail",
      "Remplacement pièces d'usure",
      "SLA 48h ouvrées sur dépannage",
      "Remise −10 % sur nouvelles commandes",
    ],
  },
];

const ASSISTEO_STEPS = [
  {
    n: "01",
    title: "Vous achetez une motorisation ≥ 300 € HT",
    body: "Le bon Assistéo est inclus dans votre confirmation de commande.",
  },
  {
    n: "02",
    title: "Vous réservez un créneau de 20 min",
    body: "Calendly intégré à l'Espace Pro. Disponibilités L-V 8h-19h, créneaux sous 48h.",
  },
  {
    n: "03",
    title: "Un technicien IEF se connecte en visio",
    body: "Il regarde votre armoire, valide le branchement, confirme le sens de cycle.",
  },
  {
    n: "04",
    title: "Vous finissez la pose, seul, sans galère",
    body: "Compte-rendu écrit envoyé en PDF après la session. SAV tel. ouvert si besoin.",
  },
];

export default function PoseIdfPage() {
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
            <span className="font-medium text-fg">Pose IDF & Assistéo</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border-soft">
          <div className="absolute inset-0">
            {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
            <img
              src={img(imagery.workshop, 1800, 800)}
              alt=""
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/30" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Pose & SAV · Île-de-France
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.025em] text-fg lg:text-[88px]">
              Des techniciens qui
              <br />
              <span className="italic font-medium text-peach">posent, pas qui récitent.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg-muted">
              IEF & Co, 15 ans de terrain Île-de-France. On pose le matériel qu'on vend. On
              dépanne le matériel qu'on a posé. Et on partage tout ça en visio via Assistéo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg hover:bg-accent-hover"
              >
                Demander un devis pose
              </a>
              <a
                href="tel:+33184000019"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[14px] text-fg hover:border-fg"
              >
                <Phone className="h-4 w-4" />
                01 84 XX XX 19
              </a>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                Forfaits pose
              </p>
              <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[56px]">
                Trois formules, un devis sous 24h.
              </h2>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border-soft lg:grid-cols-3">
              {PACKAGES.map((p) => (
                <div
                  key={p.title}
                  className={[
                    "flex flex-col gap-5 p-7",
                    p.featured ? "bg-accent text-accent-fg" : "bg-bg",
                  ].join(" ")}
                >
                  <div>
                    <div
                      className={[
                        "font-mono text-[11px] uppercase tracking-[0.22em]",
                        p.featured ? "text-accent-fg/70" : "text-fg-muted",
                      ].join(" ")}
                    >
                      {p.title}
                    </div>
                    <div className="mt-3 font-display text-[32px] font-semibold leading-none tracking-tight">
                      {p.price}
                    </div>
                    <div
                      className={[
                        "mt-1 text-[13px]",
                        p.featured ? "text-accent-fg/70" : "text-fg-muted",
                      ].join(" ")}
                    >
                      {p.sub}
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-[13px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={[
                            "mt-0.5 h-3.5 w-3.5 shrink-0",
                            p.featured ? "text-accent-fg" : "text-accent",
                          ].join(" ")}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={[
                      "mt-auto inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] font-medium transition",
                      p.featured
                        ? "bg-accent-fg text-accent hover:bg-accent-fg/90"
                        : "bg-fg text-accent-fg hover:bg-accent",
                    ].join(" ")}
                  >
                    Demander ce forfait
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assistéo */}
        <section id="assisteo" className="border-t border-border-soft bg-bg-elev py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  <Video className="h-3 w-3" />
                  Assistéo · exclusif AcceFerm
                </div>
                <h2 className="mt-5 font-display text-[40px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[56px]">
                  Vidéo-assistance
                  <br />
                  <span className="italic font-medium text-peach">offerte</span> sur les moto
                  <br />
                  ≥ 300 € HT.
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
                  Vous posez vous-même, mais on veut s'assurer que ça marche. 20 minutes en visio
                  avec un ancien poseur IEF, sans surcoût, sans commercial.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 text-[13px]">
                  <div className="rounded-xl border border-border-soft bg-bg p-4">
                    <Clock className="h-4 w-4 text-accent" />
                    <div className="mt-3 font-semibold text-fg">20 min</div>
                    <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                      par session
                    </div>
                  </div>
                  <div className="rounded-xl border border-border-soft bg-bg p-4">
                    <Video className="h-4 w-4 text-accent" />
                    <div className="mt-3 font-semibold text-fg">Google Meet</div>
                    <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                      aucun app à installer
                    </div>
                  </div>
                </div>
              </div>
              <ol className="lg:col-span-7 space-y-4">
                {ASSISTEO_STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="rounded-2xl border border-border-soft bg-bg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[32px] font-semibold text-accent tabular-nums leading-none">
                        {s.n}
                      </span>
                      <div>
                        <div className="text-[16px] font-semibold text-fg">{s.title}</div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-fg lg:text-[44px]">
              Où nos poseurs interviennent
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {localZones.map((z) => (
                <a
                  key={z.slug}
                  href={`/installateur-motorisation-portail/${z.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-border-soft bg-bg p-5 transition hover:border-fg"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                    Département {z.department_num}
                  </div>
                  <div className="font-display text-[22px] font-semibold text-fg">
                    {z.department}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-fg group-hover:text-accent">
                    Voir la page
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
