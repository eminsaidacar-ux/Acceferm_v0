"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { img, imagery, type ImageKey } from "@/lib/images";

/**
 * Galerie produit — refonte 2026-04.
 * Migration <img> → next/image, suppression motion (cosmétique).
 */
export function ProductGallery({
  items,
  alt,
}: {
  items: ImageKey[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="hidden w-16 shrink-0 flex-col gap-2 sm:flex">
        {items.map((k, i) => (
          <button
            type="button"
            key={`${k}-${i}`}
            onClick={() => setActive(i)}
            aria-label={`Vue ${i + 1}`}
            aria-pressed={active === i}
            className={`relative aspect-square overflow-hidden rounded-md border transition ${
              active === i
                ? "border-accent"
                : "border-border-soft hover:border-fg"
            }`}
          >
            <Image
              src={img(imagery[k], 160, 160)}
              alt=""
              width={160}
              height={160}
              className="h-full w-full object-cover"
              loading="lazy"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="relative aspect-square flex-1 overflow-hidden rounded-md border border-border-soft bg-bg-elev">
        <Image
          key={current}
          src={img(imagery[current], 1200, 1200)}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          unoptimized
        />
        <button
          type="button"
          aria-label="Agrandir l'image"
          className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-bg/90 text-fg shadow-sm backdrop-blur transition hover:bg-bg"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="absolute bottom-4 left-4 rounded bg-bg/95 px-2 py-1 text-xs font-medium tabular text-fg backdrop-blur">
          {active + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}
