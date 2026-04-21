import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/cart/cart-context";
import { CookieConsent } from "@/components/site/cookie-consent";
import { PriceModeProvider } from "@/components/price-mode-context";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { display, mono, sans, serif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://acceferm.fr"),
  title: {
    default: "AcceFerm Pro — Fermetures automatiques pour pros & industries",
    template: "%s · AcceFerm Pro",
  },
  description:
    "Plateforme d'approvisionnement pour installateurs de fermetures automatiques. Catalogue pro, prix HT, livraison 24h Île-de-France, SAV technique, vidéo-assistance Assistéo. Opérée par IEF & Co, 15 ans de terrain.",
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
      "La plateforme d'approvisionnement pour installateurs de fermetures automatiques.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f3e9",
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+33-1-84-00-00-17",
      contactType: "technical support",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+33-1-84-00-00-18",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "26 rue du Travers des Champs Guillaume",
    addressLocality: "Cormeilles-en-Parisis",
    postalCode: "95240",
    addressCountry: "FR",
  },
  priceRange: "€€",
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
    <html
      lang="fr"
      className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
    >
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
        <CustomCursor />
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
