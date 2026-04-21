"use client";

import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { img, imagery, type ImageKey } from "@/lib/images";

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
      {/* Thumbnails column */}
      <div className="hidden w-16 shrink-0 flex-col gap-2 sm:flex">
        {items.map((k, i) => (
          <button
            type="button"
            key={`${k}-${i}`}
            onClick={() => setActive(i)}
            aria-label={`Vue ${i + 1}`}
            className={[
              "relative overflow-hidden rounded-lg border transition",
              active === i ? "border-accent" : "border-border hover:border-fg",
            ].join(" ")}
          >
            {/* biome-ignore lint/performance/noImgElement: hotlinked Unsplash */}
            <img
              src={img(imagery[k], 160, 160)}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-border-soft bg-bg-soft">
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={img(imagery[current], 1200, 1200)}
          alt={alt}
          loading="eager"
          className="aspect-square w-full object-cover"
        />
        <button
          type="button"
          aria-label="Agrandir"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-bg/90 text-fg shadow-sm backdrop-blur transition hover:bg-bg"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <div className="absolute bottom-4 left-4 rounded-full bg-bg/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg backdrop-blur">
          {active + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}
