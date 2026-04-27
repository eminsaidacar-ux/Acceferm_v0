const ITEMS = [
  "AcceFerm Pro",
  "Centrale d'achat installateurs",
  "Livraison 24 h IDF",
  "Paiement 30 j compte pro",
  "Vidéo-assistance Assistéo",
  "2 341 références en stock",
  "124 installateurs actifs",
  "Atelier IEF & Co",
  "Groslay 95410",
  "15 ans de terrain",
];

/**
 * Marquise centrale rouge — réintégration v0.7.
 *
 * Bandeau horizontal défilant placé entre Best-sellers et Trust block.
 * Contenu utile (pas ornement) : 10 points clés AcceFerm Pro.
 *
 * - Animation CSS pure (@keyframes marquee dans globals.css)
 * - Pause au hover desktop
 * - prefers-reduced-motion : animation arrêtée, contenu visible static
 * - Contraste WCAG AAA : blanc #fff sur accent #c8181a = 9.5:1
 * - Liste dupliquée 2× pour boucle seamless ; le 2e jeu est aria-hidden
 *   pour éviter la double lecture au lecteur d'écran.
 */
export function ScrollingBanner() {
  return (
    <section
      aria-label="Points clés AcceFerm Pro — centrale d'achat installateurs"
      className="relative isolate flex h-[60px] items-center overflow-hidden bg-accent text-accent-fg lg:h-[80px]"
    >
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap pl-12 lg:gap-16 lg:pl-16">
        <ul className="flex shrink-0 items-center gap-12 lg:gap-16">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="font-display text-[16px] font-semibold tracking-tight lg:text-[18px]"
            >
              {item}
              <span aria-hidden="true" className="ml-12 opacity-60 lg:ml-16">
                ·
              </span>
            </li>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="flex shrink-0 items-center gap-12 lg:gap-16"
        >
          {ITEMS.map((item) => (
            <li
              key={`dup-${item}`}
              className="font-display text-[16px] font-semibold tracking-tight lg:text-[18px]"
            >
              {item}
              <span className="ml-12 opacity-60 lg:ml-16">·</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
