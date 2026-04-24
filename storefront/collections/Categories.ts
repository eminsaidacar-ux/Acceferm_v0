import type { CollectionConfig } from "payload";

/**
 * Collection Categories — univers catalogue (motorisation battant, photocellules,
 * VIGIK, etc.). Arborescence plate à 2 niveaux en V0 : Category > Subcategory via
 * `parent`.
 */
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Catégorie",
    plural: "Catégories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "parent", "order", "active"],
    group: "Catalogue",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    { name: "description", type: "textarea" },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      label: "Catégorie parente (optionnel)",
    },
    {
      name: "icon",
      type: "text",
      label: "Glyphe / icône (ex. ⦽, ⇄, ◉)",
      maxLength: 4,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image de couverture",
    },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
  timestamps: true,
};
