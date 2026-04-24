import { getPayload as getPayloadInstance } from "payload";
import config from "@/payload.config";

/**
 * Helper pour obtenir l'instance Payload côté server.
 * Cache-safe, lazy-init. À utiliser dans les Server Components et route handlers.
 */
let cached: Awaited<ReturnType<typeof getPayloadInstance>> | null = null;

export async function getPayload() {
  if (cached) return cached;
  cached = await getPayloadInstance({ config });
  return cached;
}
