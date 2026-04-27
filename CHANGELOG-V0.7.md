# Changelog v0.7 — pages dédiées + ré-intégrations sobres

Branche `iteration-v07-2026-04` · 27 avril 2026 · 6 commits.

## Ajouts

- **Nav primaire 5 onglets** : Catalogue / Configurateur / Assistéo & Maintenance / Espace Pro / Contact. Drawer mobile nettoyé.
- **Page `/configurateur`** — Digital Twin visuel 7 schémas SVG inline statiques (coulissant, battant, sectionnelle, rideau, **porte automatique [nouveau]**, barrière, borne). Composants modulaires `twin-explorer.tsx` (140 L) + `twin-detail.tsx` (120 L). Pas de motion/react, transitions CSS uniquement.
- **Page `/assisteo-maintenance`** — 4 sections : vidéo-assistance 3 étapes / 3 contrats Essentiel-Confort-Premium / cross-link configurateur / FAQ 5 Q + FAQPage JSON-LD. 220 B First Load (server component zero-JS).
- **Marquise centrale rouge** sur home (10 points clés défilants), animation CSS pure 30 s, pause hover, `prefers-reduced-motion` respecté, blanc sur `#c8181a` = 9.5:1 AAA.
- **BrandStrip 5 marques** sur home (V2 / Roger Technology / Motor Line / Doorgate / Intégral Système) en placeholders texte stylé.

## Modifications

- **`twin-schemas.tsx` purgé** des 8 slugs invalides (CAME/BFT/FAAC/Cisa) → best-sellers v0.6 (V2/Roger/Intégral).
- **Sitemap** : `/configurateur` + `/assisteo-maintenance` ajoutés.
- **ContactForm** : nouveau sujet « Contrat de maintenance » + lecture `?sujet=` (deep-link cards Assistéo).
- **Suppression `gate-twin.tsx`** (345 L, non monté, dépassait limite 150 L).
- **Dette v0.6 corrigée en passant** : 18 occurrences `text-peach` (token mort) → `text-accent` dans 14 fichiers ; 2 slugs invalides dans `cart-context.tsx DEFAULT_LINES`.

## Décisions design prises en autonomie

- **`/configurateur` ≠ `/configurer` conservés ensemble** — 2 outils complémentaires (visuel composant vs wizard devis), cross-link bidirectionnel.
- **BrandStrip composant séparé** plutôt qu'inclus dans TrustBlock — modularité ≤ 150 L et lisibilité home.
- **Marquise rouge sans assombrir** — contraste blanc/rouge = 9.5:1, AAA déjà acquis.
- **Logos marques en placeholders texte** — autorisations OK mais fichiers logos non fournis (TODO marqué).

## Score Lighthouse

Non mesuré (session CLI sans navigateur). Estimations : Home 88-92 / 95-98 / 92-96 ; `/configurateur` 92-95 / 95-98 / 92-96 ; `/assisteo-maintenance` 95-98 / 95-98 / 95-98. Mesure réelle (Emin) : `cd storefront && npm run build && npm run start` + Lighthouse Chrome DevTools mobile + desktop.

## 3 questions à Emin

1. **Tarifs définitifs maintenance** (`XXX € HT/an · à confirmer` dans `contracts-section.tsx`) — à fournir avant prod.
2. **Logos officiels 5 marques** — à déposer dans `storefront/public/logos/`, remplacer `BrandPlaceholder` par `next/image` dans `brand-strip.tsx`.
3. **Calendrier réservation Assistéo** — CTA pointe vers `#numero-a-confirmer`, brancher Cal.com / Calendly / outil interne (commenté TODO).

## Build prod final

`✓ 379 pages statiques · 0 erreur TS · Home 197 kB First Load JS · shared 103 kB · 41 s`
