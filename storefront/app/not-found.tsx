import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main className="py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            Erreur 404 · page introuvable
          </p>
          <h1 className="mt-6 font-display text-[80px] font-semibold leading-[0.92] tracking-[-0.03em] text-fg lg:text-[140px]">
            Ça ne s'ouvre
            <br />
            <span className="italic font-medium text-peach">pas non plus.</span>
          </h1>
          <p className="mt-8 text-[16px] leading-relaxed text-fg-muted">
            La page que vous cherchez a peut-être été déplacée, ou elle n'existe tout simplement
            pas. Comme un portail qui refuse de bouger — on diagnostique, et on vous renvoie vers
            ce qui fonctionne.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-fg transition hover:bg-accent-hover"
            >
              Retour à l'accueil
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/recherche"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-[14px] text-fg transition hover:border-fg"
            >
              Ouvrir la recherche
            </a>
          </div>
          <div className="mt-16 grid gap-3 text-left sm:grid-cols-3">
            {[
              { label: "Catalogue", href: "/#categories" },
              { label: "Configurateur", href: "/configurer" },
              { label: "Ressources", href: "/ressources" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group flex items-center justify-between rounded-2xl border border-border-soft bg-bg p-5 transition hover:border-fg"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted group-hover:text-fg">
                  {l.label}
                </span>
                <ArrowRight className="h-4 w-4 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
