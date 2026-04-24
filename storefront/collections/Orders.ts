import type { CollectionConfig } from "payload";

/**
 * Collection Orders — commandes AcceFerm Pro.
 *
 * Règle n°2 : cette collection EST le money-path. Chaque ligne représente une
 * transaction encaissable.
 *
 * Compliance DGFiP : AcceFerm n'émet PAS la facture fiscale finale. La commande
 * remonte en Odoo via connecteur XML-RPC (sprint 2+) qui émet la facture PDP.
 * Le numéro de commande AcceFerm (`orderNumber`) est distinct du numéro facture Odoo.
 *
 * Source de vérité du statut paiement = Stripe webhook (pas l'UI front).
 */
export const Orders: CollectionConfig = {
  slug: "orders",
  labels: {
    singular: "Commande",
    plural: "Commandes",
  },
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: [
      "orderNumber",
      "status",
      "customer",
      "totalTTC",
      "paidAt",
      "createdAt",
    ],
    group: "Ventes",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // API /api/checkout/create peut créer sans auth user
    update: ({ req: { user } }) => Boolean(user),
    delete: () => false, // Aucune commande n'est supprimée (10 ans rétention fiscale)
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: "Numérotation AF-YYYY-XXXX. Distinct du n° facture Odoo.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "En attente paiement", value: "pending" },
        { label: "Payée", value: "paid" },
        { label: "En préparation", value: "preparing" },
        { label: "Expédiée", value: "shipped" },
        { label: "Livrée", value: "delivered" },
        { label: "Annulée", value: "cancelled" },
        { label: "Remboursée", value: "refunded" },
      ],
    },
    // ─────────── Customer ───────────
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      admin: {
        description: "Lié si compte pro. Vide si invité (voir contactEmail).",
      },
    },
    {
      name: "contactEmail",
      type: "email",
      required: true,
    },
    {
      name: "contactPhone",
      type: "text",
    },
    {
      name: "contactName",
      type: "text",
      required: true,
    },
    {
      name: "contactCompany",
      type: "text",
    },
    // ─────────── Lignes ───────────
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: "unitPriceHT",
          type: "number",
          required: true,
          admin: {
            description: "Snapshot au moment du paiement (prix peut changer après).",
          },
        },
        {
          name: "productName",
          type: "text",
          required: true,
          admin: { description: "Snapshot du nom (archive)." },
        },
      ],
    },
    // ─────────── Totaux ───────────
    {
      type: "row",
      fields: [
        { name: "subtotalHT", type: "number", required: true, admin: { width: "25%" } },
        { name: "shippingHT", type: "number", defaultValue: 0, admin: { width: "25%" } },
        { name: "vatAmount", type: "number", required: true, admin: { width: "25%" } },
        { name: "totalTTC", type: "number", required: true, admin: { width: "25%" } },
      ],
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "EUR",
      admin: { readOnly: true },
    },
    // ─────────── Adresses ───────────
    {
      name: "shippingAddress",
      type: "group",
      label: "Adresse livraison",
      fields: [
        { name: "line1", type: "text", required: true },
        { name: "line2", type: "text" },
        { name: "city", type: "text", required: true },
        { name: "postalCode", type: "text", required: true },
        { name: "country", type: "text", defaultValue: "FR" },
      ],
    },
    {
      name: "billingAddress",
      type: "group",
      label: "Adresse facturation",
      fields: [
        { name: "line1", type: "text" },
        { name: "line2", type: "text" },
        { name: "city", type: "text" },
        { name: "postalCode", type: "text" },
        { name: "country", type: "text", defaultValue: "FR" },
        { name: "sameAsShipping", type: "checkbox", defaultValue: true },
      ],
    },
    // ─────────── Stripe ───────────
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "stripePaymentIntentId",
      type: "text",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "paidAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    // ─────────── Facture PDF ───────────
    {
      name: "invoice",
      type: "upload",
      relationTo: "media",
      label: "Facture PDF générée",
      admin: { readOnly: true },
    },
    // ─────────── Sync Odoo ───────────
    {
      name: "odooExternalId",
      type: "text",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "odooSyncedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "internalNotes",
      type: "textarea",
      label: "Notes internes (non visibles client)",
    },
  ],
  timestamps: true,
};
