import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/cart/cart-context";
import { CookieConsent } from "@/components/site/cookie-consent";
import { PreviewBanner } from "@/components/site/preview-banner";
import { PriceModeProvider } from "@/components/price-mode-context";
import { display, sans } from "./fonts";
import "./globals.css";

const PREVIEW_MODE = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://acceferm.fr"),
  title: {
    default: "AcceFerm Pro — Fermetures automatiques pour pros & industries",
    template: "%s · AcceFerm Pro",
  },
  description:
    "Plateforme d'approvisionnement pour installateurs de fermetures automatiques. Catalogue pro, prix HT, livraison 24h Île-de-France, SAV technique. Par IEF & Co, 15 ans de terrain.",
  keywords: [
    "motorisation portail",
    "photocellule portail",
    "contrôle d'accès",
    "VIGIK",
    "installateur portail automatique",
    "pièces détachées portail",
    "barre palpeuse EN 12453",
  ],
  authors: [{ name: "AcceFerm Pro", url: "https://acceferm.fr" }],
  creator: "IEF & Co",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AcceFerm Pro",
    title: "AcceFerm Pro — Fermetures automatiques pour pros & industries",
    description:
      "Catalogue pro, prix HT, livraison 24h IDF, SAV technique. Par les équipes IEF & Co — 15 ans de terrain.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcceFerm Pro",
    description:
      "Plateforme d'approvisionnement pour installateurs de fermetures automatiques.",
  },
  // En mode preview collaborateurs : noindex,nofollow strict pour éviter
  // l'indexation accidentelle Google. Switch via NEXT_PUBLIC_PREVIEW_MODE.
  robots: PREVIEW_MODE
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AcceFerm Pro",
  alternateName: "AcceFerm",
  url: "https://acceferm.fr",
  logo: "https://acceferm.fr/logo.png",
  parentOrganization: {
    "@type": "Organization",
    name: "IEF & Co",
  },
  sameAs: [],
  // TODO: numéros SAV/sales définitifs avant prod — placeholders pour preview
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+33-1-XX-XX-XX-XX",
      contactType: "technical support",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+33-1-XX-XX-XX-XX",
      contactType: "sales",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
  ],
} as const;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AcceFerm Pro",
  image: "https://acceferm.fr/og-image.png",
  url: "https://acceferm.fr",
  telephone: "+33-1-XX-XX-XX-XX", // TODO: numéro SAV définitif avant prod
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 Rue René Dubos",
    addressLocality: "Groslay",
    postalCode: "95410",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.0067,
    longitude: 2.3598,
  },
  priceRange: "€€",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    { "@type": "AdministrativeArea", name: "France" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
} as const;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        <PreviewBanner />
        <PriceModeProvider>
          <CartProvider>
            {children}
            <CookieConsent />
          </CartProvider>
        </PriceModeProvider>
      </body>
    </html>
  );
}
