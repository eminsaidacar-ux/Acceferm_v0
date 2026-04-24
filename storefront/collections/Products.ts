import type { CollectionConfig } from "payload";

/**
 * Collection Products — catalogue AcceFerm Pro.
 *
 * Contrainte COMPLIANCE (clause AFCA) :
 * - Les produits avec `isMotorisation = true` ne doivent JAMAIS exposer `priceHT`
 *   sur une route publique.
 * - Côté fiche produit publique : si isMotorisation → afficher "Prix sur devis".
 * - Côté espace pro authentifié : priceHT autorisé + grille pro (-5% Silver / -10-15% Gold).
 *
 * Sync Odoo : champ `odooExternalId` rempli après remontée par INTEGRATION_AGENT
 * (sprint 2+). Pas de sync au sprint 1.
 */
export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Produit",
    plural: "Produits",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "brand",
      "category",
      "priceHT",
      "stock",
      "isMotorisation",
      "active",
    ],
    group: "Catalogue",
    description:
      "Catalogue produits pro. Pour les motorisations, ne pas afficher le prix en public (clause AFCA).",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nom du produit",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly. Généré depuis le nom si vide.",
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return String(data.name)
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Description technique",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Description courte (listing)",
      maxLength: 220,
    },
    {
      type: "row",
      fields: [
        {
          name: "brand",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "reference",
          type: "text",
          label: "Référence AcceFerm",
          admin: {
            width: "50%",
            description:
              "Nomenclature interne (PAS la ref fabricant — clause confidentialité).",
          },
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    // ─────────── Prix & stock ───────────
    {
      type: "row",
      fields: [
        {
          name: "priceHT",
          type: "number",
          label: "Prix HT (€)",
          admin: { width: "33%", step: 0.01 },
        },
        {
          name: "priceWasHT",
          type: "number",
          label: "Prix HT barré (promo)",
          admin: { width: "33%", step: 0.01 },
        },
        {
          name: "vatRate",
          type: "number",
          label: "TVA (décimal)",
          defaultValue: 0.2,
          admin: { width: "34%", step: 0.01 },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "stock",
          type: "number",
          label: "Stock disponible",
          defaultValue: 0,
          admin: { width: "50%" },
        },
        {
          name: "stockLabel",
          type: "text",
          label: "Label stock affiché",
          admin: {
            width: "50%",
            description: "Ex. « 142 en stock », « Stock limité », « Sur commande 5-7j ».",
          },
        },
      ],
    },
    // ─────────── Clause AFCA ───────────
    {
      name: "isMotorisation",
      type: "checkbox",
      label: "Motorisation (clause AFCA — prix masqué public)",
      defaultValue: false,
      admin: {
        description:
          "Si coché : le prix n'apparaît PAS sur la fiche publique. Affichage « Prix sur devis ».",
      },
    },
    {
      name: "requiresProAccount",
      type: "checkbox",
      label: "Prix visible uniquement compte pro validé",
      defaultValue: false,
    },
    // ─────────── Visuels ───────────
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Image principale",
    },
    {
      name: "gallery",
      type: "array",
      label: "Galerie (jusqu'à 6 images)",
      maxRows: 6,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "alt", type: "text" },
      ],
    },
    // ─────────── Métadonnées techniques ───────────
    {
      name: "technicalSpecs",
      type: "array",
      label: "Spécifications techniques",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "compatibleBrands",
      type: "array",
      label: "Compatible avec marques",
      fields: [{ name: "brand", type: "text", required: true }],
    },
    {
      name: "norms",
      type: "array",
      label: "Normes & certifications",
      fields: [
        {
          name: "code",
          type: "text",
          required: true,
          admin: { description: "Ex. EN 12453, IP65, IK08, CE" },
        },
      ],
    },
    {
      name: "documents",
      type: "array",
      label: "Documents attachés (notices PDF)",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    // ─────────── Statut ───────────
    {
      name: "active",
      type: "checkbox",
      label: "Actif (publié)",
      defaultValue: true,
    },
    {
      name: "badge",
      type: "select",
      label: "Badge mis en avant",
      options: [
        { label: "Aucun", value: "none" },
        { label: "Top vente", value: "top" },
        { label: "Nouveau", value: "new" },
        { label: "Promo", value: "promo" },
        { label: "Stock limité", value: "limited" },
      ],
      defaultValue: "none",
    },
    // ─────────── Sync Odoo (sprint 2+) ───────────
    {
      name: "odooExternalId",
      type: "text",
      label: "ID Odoo (sync ERP)",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Rempli automatiquement après remontée Odoo (sprint 2+).",
      },
    },
  ],
  timestamps: true,
};
