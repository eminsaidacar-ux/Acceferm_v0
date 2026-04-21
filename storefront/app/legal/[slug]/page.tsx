import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { getAllLegalSlugs, getLegalDoc, legalDocs } from "@/lib/legal";

export async function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getLegalDoc(slug);
  if (!d) return { title: "Document introuvable" };
  return { title: d.title, description: d.lede };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-4xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">
              Accueil
            </a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="text-fg-muted">Légal</span>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">{doc.title}</span>
          </div>
        </nav>

        <article className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 lg:grid-cols-[1fr_260px] lg:px-8">
            <div>
              <header className="pb-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  Document juridique · mis à jour le {doc.updatedAt}
                </p>
                <h1 className="mt-4 font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-fg lg:text-[64px]">
                  {doc.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                  {doc.lede}
                </p>
              </header>

              <div className="space-y-10">
                {doc.sections.map((s, i) => (
                  <section key={s.title}>
                    <h2
                      id={`s-${i}`}
                      className="font-display text-[24px] font-semibold tracking-tight text-fg lg:text-[28px]"
                    >
                      {s.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.75] text-fg/85">{s.body}</p>
                  </section>
                ))}
              </div>
            </div>

            {/* Sidebar: other legal docs */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border-soft bg-bg-elev p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  Autres documents
                </div>
                <ul className="mt-3 space-y-1">
                  {legalDocs
                    .filter((d) => d.slug !== slug)
                    .map((d) => (
                      <li key={d.slug}>
                        <a
                          href={`/legal/${d.slug}`}
                          className="flex items-center justify-between rounded-lg px-2 py-2 text-[13px] text-fg-muted transition hover:bg-bg hover:text-fg"
                        >
                          {d.title}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
