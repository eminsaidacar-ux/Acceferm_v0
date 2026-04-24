import type { CollectionConfig } from "payload";

/**
 * Collection Media — images produit + documents PDF (notices, fiches techniques).
 *
 * Stockage V0 : local `./public/media` (dev) ou Vercel Blob en prod (sprint 2).
 * Pas d'upload visages humains (contrainte CLAUDE.md).
 *
 * Formats produit recommandés : fond blanc, 1200×1200 min, JPG/WebP.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Média",
    plural: "Médias",
  },
  admin: {
    group: "Catalogue",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: "public/media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
      { name: "hero", width: 1600, height: 1200, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Texte alternatif (a11y + SEO)",
    },
    {
      name: "caption",
      type: "text",
      label: "Légende (optionnel)",
    },
  ],
};
