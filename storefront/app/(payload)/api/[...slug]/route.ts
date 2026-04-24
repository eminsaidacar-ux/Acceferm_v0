/* API Payload — /api/payload/*
 * Expose l'API REST + GraphQL de Payload.
 * Distinct de /api/checkout, /api/webhooks, /api/cart (routes business custom).
 */
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import config from "@/payload.config";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
export const OPTIONS = REST_OPTIONS(config);
