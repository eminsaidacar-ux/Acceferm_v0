# Changelog v0.7 — pages dédiées + ré-intégrations sobres

## v0.7.1 — Patch grille tarifaire maintenance (27 avril 2026)

Correction ciblée `/assisteo-maintenance` après remontée de la vraie grille IEF & CO (validée par 2 contrats clients réels : HFC Technics, UNIVAR Solutions).

- **Renommage Premium → Sérénité** (libellé carte, query param `?sujet=maintenance-serenite`, ContactForm couvre déjà via `startsWith("maintenance")`).
- **Section B — Cadre réglementaire** ajoutée entre vidéo-assistance et formules : Arrêté du 21/12/1993 art. 9, Code du travail R4224-12, Norme EN 13241, Norme EN 13269.
- **Vraie grille tarifaire** intégrée dans 3 cartes formules : Essentiel dès 147 €, Confort dès 268 € (badge ★ Recommandé), Sérénité dès 537 €. Sous-titres, bullets exacts, footer exclusions.
- **Section D — Calculateur tarifaire interactif** : 9 équipements × 3 formules avec recalcul live, gestion `null` (formule indispo), dégressivité multi-équipements (−5 % à partir de 2 unités, −10 % à partir de 4). Données + helpers extraits dans `lib/maintenance-pricing.ts`.
- **Section E — Déroulement du contrat** : 4 étapes (audit / QR Code Confort+Sérénité / 2ᵉ visite / suivi).
- **Question 1 d'arbitrage v0.7 résolue** (tarifs définitifs maintenance fournis). Restent 2 questions ouvertes : logos officiels marques + calendrier Assistéo.
- **Composants ajoutés** : `regulatory-section.tsx` (97 L), `pricing-calculator.tsx` (143 L), `calc-result-card.tsx` (80 L), `process-section.tsx` (75 L). `lib/maintenance-pricing.ts` (85 L).
- **Build prod** : `✓ 379 pages · 0 erreur TS · /assisteo-maintenance 2.38 kB / 166 kB First Load · 18.5 s`.

---

## v0.7 — pages dédiées + ré-intégrations sobres

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

## 2 questions ouvertes à Emin (3ᵉ résolue par v0.7.1)

1. **Logos officiels 5 marques** — à déposer dans `storefront/public/logos/`, remplacer `BrandPlaceholder` par `next/image` dans `brand-strip.tsx`.
2. **Calendrier réservation Assistéo** — CTA pointe vers `#numero-a-confirmer`, brancher Cal.com / Calendly / outil interne (commenté TODO).

~~Tarifs définitifs maintenance~~ — **résolu en v0.7.1** (vraie grille IEF & CO intégrée).

## Build prod final

`✓ 379 pages statiques · 0 erreur TS · Home 197 kB First Load JS · shared 103 kB · 41 s`
