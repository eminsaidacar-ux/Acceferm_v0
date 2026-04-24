import type { CollectionConfig } from "payload";

/**
 * Collection Customers — comptes pros validés SIRET.
 *
 * Auth SPRINT 2 : NextAuth + validation SIRET via API INSEE publique +
 * approbation manuelle par Emin via Payload admin (`approved = true`).
 *
 * Lien Odoo CRM : chaque customer devient un contact Odoo à terme
 * (sprint 2+). Champ `odooExternalId` prévu.
 *
 * Grille tarifaire : `proTier` détermine les remises automatiques appliquées
 * (Silver -5 %, Gold -10 à -15 %).
 */
export const Customers: CollectionConfig = {
  slug: "customers",
  auth: false, // auth sera géré par NextAuth côté app (sprint 2)
  labels: {
    singular: "Compte pro",
    plural: "Comptes pros",
  },
  admin: {
    useAsTitle: "companyName",
    defaultColumns: [
      "companyName",
      "siret",
      "proTier",
      "approved",
      "email",
      "createdAt",
    ],
    group: "Ventes",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // ─────────── Identité ───────────
    {
      type: "row",
      fields: [
        { name: "firstName", type: "text", required: true, admin: { width: "50%" } },
        { name: "lastName", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    { name: "email", type: "email", required: true, unique: true },
    { name: "phone", type: "text" },
    // ─────────── Société ───────────
    { name: "companyName", type: "text", required: true },
    {
      name: "siret",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "14 chiffres. Validation API INSEE à l'inscription." },
    },
    { name: "vatNumber", type: "text", label: "N° TVA intracommunautaire" },
    {
      name: "role",
      type: "select",
      label: "Métier",
      options: [
        { label: "Métallier / serrurier", value: "metallier" },
        { label: "Électricien courant faible", value: "electricien" },
        { label: "Artisan portail", value: "artisan-portail" },
        { label: "Ascensoriste", value: "ascensoriste" },
        { label: "Syndic / gestionnaire copro", value: "syndic" },
        { label: "Bureau d'études", value: "bureau-etudes" },
        { label: "Bailleur social", value: "bailleur" },
        { label: "Collectivité", value: "collectivite" },
        { label: "Industriel", value: "industriel" },
        { label: "Autre", value: "autre" },
      ],
    },
    // ─────────── Statut pro ───────────
    {
      name: "approved",
      type: "checkbox",
      label: "Validé par Emin",
      defaultValue: false,
      admin: {
        description:
          "À cocher manuellement après vérification SIRET. Débloque les prix pro + paiement 30j.",
      },
    },
    {
      name: "proTier",
      type: "select",
      label: "Niveau pro",
      defaultValue: "silver",
      options: [
        { label: "Particulier (TTC)", value: "particulier" },
        { label: "Pro Silver (HT -5 %)", value: "silver" },
        { label: "Pro Gold (HT -10 à -15 %)", value: "gold" },
      ],
    },
    {
      name: "creditLimitHT",
      type: "number",
      label: "Plafond encours 30j (€ HT)",
      admin: {
        description: "0 = pas de paiement 30j autorisé. Gold only généralement.",
      },
    },
    // ─────────── Adresses ───────────
    {
      name: "defaultShippingAddress",
      type: "group",
      label: "Adresse livraison par défaut",
      fields: [
        { name: "line1", type: "text" },
        { name: "line2", type: "text" },
        { name: "city", type: "text" },
        { name: "postalCode", type: "text" },
        { name: "country", type: "text", defaultValue: "FR" },
      ],
    },
    {
      name: "defaultBillingAddress",
      type: "group",
      label: "Adresse facturation par défaut",
      fields: [
        { name: "line1", type: "text" },
        { name: "line2", type: "text" },
        { name: "city", type: "text" },
        { name: "postalCode", type: "text" },
        { name: "country", type: "text", defaultValue: "FR" },
      ],
    },
    // ─────────── Sync Odoo ───────────
    {
      name: "odooExternalId",
      type: "text",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "internalNotes",
      type: "textarea",
      admin: { description: "Notes internes (non visibles client)." },
    },
  ],
  timestamps: true,
};
