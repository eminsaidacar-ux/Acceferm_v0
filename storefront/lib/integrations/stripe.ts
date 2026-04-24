import Stripe from "stripe";

/**
 * Singleton Stripe server-side.
 * La clé STRIPE_SECRET_KEY est requise runtime (pas build-time).
 * Utilisation : `const stripe = getStripe(); await stripe.checkout.sessions.create(...)`.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante. Configurer dans Vercel env vars (voir docs/admin-emin.md).",
    );
  }
  cached = new Stripe(key, {
    apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion,
    typescript: true,
    appInfo: {
      name: "AcceFerm Pro",
      version: "0.1.0",
    },
  });
  return cached;
}

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
