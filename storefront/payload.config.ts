import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import { Categories } from "./collections/Categories";
import { Customers } from "./collections/Customers";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Products } from "./collections/Products";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Config Payload CMS — AcceFerm Pro
 *
 * Admin : /admin (protégé auth Payload)
 * API Payload : /api/payload (distinct de /api/checkout, /api/webhooks, /api/cart)
 *
 * DB : Postgres (Supabase eu-west-3 en prod, local ou Supabase free en dev).
 * Config via env var DATABASE_URI.
 */
export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — AcceFerm Admin",
    },
  },
  collections: [
    // Catalogue
    Categories,
    Products,
    Media,
    // Ventes
    Customers,
    Orders,
    // Users (admin internes Emin + équipe)
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
        group: "Admin",
      },
      fields: [
        { name: "name", type: "text" },
        {
          name: "role",
          type: "select",
          defaultValue: "admin",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Éditeur catalogue", value: "editor" },
            { label: "Support SAV", value: "support" },
          ],
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp: undefined, // activera sharp automatiquement si présent
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 Mo
    },
  },
  cors: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://acceferm.fr",
  ],
});
