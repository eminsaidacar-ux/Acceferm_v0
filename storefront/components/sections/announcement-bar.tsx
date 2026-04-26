export function AnnouncementBar() {
  return (
    <div className="border-b border-border-soft bg-bg-elev text-[12px] text-fg-muted">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok" />
          <span>
            Commandez avant <span className="text-fg">15h47</span> · livraison IDF demain
          </span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#numero-a-confirmer" className="transition hover:text-fg">
            SAV · 01 XX XX XX XX
          </a>
        </div>
      </div>
    </div>
  );
}
