import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { FeedbackForm } from "@/components/site/feedback-form";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Vos retours sur la maquette",
  description:
    "Formulaire de retours pour la preview collaborateurs d'AcceFerm Pro. Vos remarques sont envoyées par email à l'équipe IEF & Co.",
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
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
            <span className="font-medium text-fg">Vos retours</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Preview collaborateurs · v0.6
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl">
              Vos retours sur la maquette
            </h1>
            <p className="prose-narrow mt-6 text-lg leading-relaxed text-fg-muted">
              Vous testez la preview AcceFerm Pro. Tous les retours sont utiles —
              ce qui choque, ce qui manque, ce qui est confus, ce qui marche
              bien. Quelques lignes suffisent.
            </p>
            <p className="prose-narrow mt-3 text-sm text-fg-muted">
              Le formulaire ouvre votre application mail (mailto) et envoie
              directement à <code className="rounded bg-bg-elev px-1 py-0.5 text-xs">contact@iefandco.com</code>.
              Pas de backend, pas de tracking.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <FeedbackForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
