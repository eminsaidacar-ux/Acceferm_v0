export default function Loading() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-8 lg:py-40" role="status" aria-label="Chargement">
      <div className="animate-pulse space-y-10">
        <div className="h-3 w-40 rounded-full bg-bg-soft" />
        <div className="space-y-3">
          <div className="h-14 w-3/4 rounded-lg bg-bg-soft" />
          <div className="h-14 w-1/2 rounded-lg bg-bg-soft" />
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`c-${i}`} className="h-40 bg-bg" />
          ))}
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border-soft sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`p-${i}`} className="h-[280px] bg-bg" />
          ))}
        </div>
      </div>
      <span className="sr-only">Chargement en cours…</span>
    </div>
  );
}
