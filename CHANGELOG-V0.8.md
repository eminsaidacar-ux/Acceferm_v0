# Changelog v0.8 — refonte architecturale catalogue + sur-mesure

Branche `iteration-v08-2026-04` · 27 avril 2026 · 5 commits.

## Restructurations

- **Nav primaire 5 onglets v0.8** : Catalogue / **Sur-mesure & Fabrication** (nouveau) / Assistéo & Maintenance / Espace Pro / Contact. Onglet Configurateur retiré.
- **Renommage `/configurateur` → `/assistant-diagnostic`** : repositionné comme outil secondaire contextuel pour visiteurs novices, plus comme onglet principal. Composants `components/configurateur/*` → `components/assistant-diagnostic/*` (git mv, historique préservé). Redirect 301 dans `next.config.ts`. Title + sous-titre adaptés.
- **`/catalogue/photocellules` n'est plus l'atterrissage par défaut** : la nav pointe maintenant vers `/catalogue` (vraie page hub).

## Ajouts

- **Page hub `/catalogue`** (3.52 kB / 173 kB First Load) : 4 blocs — grille 10 familles produits / Best-sellers (réutilise `LiveCatalog` v0.6) / Promotions (réutilise `Promotions` v0.6) / Bandeau cross-link assistant diagnostic.
- **10 familles produits** créées dans `lib/catalogue-families.ts` avec icônes lucide, descriptions, count, 4 sous-thèmes preview : organes-securite / organes-commande / motorisations-portails / motorisations-portes / coffrets-cartes / signalisation / alimentation-secours / controle-acces / interphonie / pieces-detachees.
- **Sélecteur de familles en tabs scrollables** sur toutes les pages `/catalogue/[slug]` (`components/catalogue/family-selector.tsx`).
- **Bandeau cross-link `DiagnosticCta`** : variant "hub" (page catalogue) ou "category" (sous-pages catalogue).
- **Page `/sur-mesure`** (Modèle B fabrication) : Hero + grille 9 types (rideau métallique, porte sectionnelle, porte rapide, porte battante, portail coulissant SM, portail battant SM, portillon, clôture, portique limitation hauteur) + Process 4 étapes + Formulaire devis spécialisé (13 champs + upload 5 fichiers + pré-remplissage `?type=`, soumission mailto `contact@iefandco.com`).
- **Bouton flottant assistant diagnostic** (`components/floating-help-button.tsx`) : monté uniquement par `app/catalogue/layout.tsx`, donc visible sur `/catalogue` et `/catalogue/[slug]/*` exclusivement. Texte rétractable au scroll > 200 px (raf-throttled), bouton « × » de fermeture (sessionStorage, pas localStorage), `prefers-reduced-motion` respecté, touch targets ≥ 48 px, anti-collision mobile (`bottom-20`).
- **Sitemap.ts** mis à jour : `/catalogue` + `/sur-mesure` + 10 familles (priorité 0.8). 12 catégories historiques rétrogradées à 0.6 (rétro-compat).

## Décisions design en autonomie

- **`getCategory()` priorise les 10 familles v0.8** puis fallback aux 12 catégories historiques + catalog-tree → rétro-compat assurée, anciens slugs `/catalogue/photocellules` etc. continuent de répondre.
- **Photos types sur-mesure en placeholder texte** plutôt que stock photos génériques — plus honnête, attente photos atelier IEF réelles.
- **`mailto` pour formulaire devis** : noms des fichiers listés dans le body, l'utilisateur joint manuellement à l'ouverture du client mail. Limitation V0.8 acceptée (intégration backend = scope futur).
- **Bouton flottant via `app/catalogue/layout.tsx`** plutôt que via `usePathname` global — arch plus propre, le composant n'existe pas dans le bundle JS des autres pages.
- **`bottom-20` mobile** appliqué préventivement sur le bouton flottant pour éviter conflit CTAs `BuyBox` / panier (anti-collision proactive, pas réactive).

## Score Lighthouse

Non mesuré (session CLI sans navigateur). Estimations basées sur l'analyse statique :

| Page | Perf estimé | A11y estimé | SEO estimé |
|---|---|---|---|
| `/` (home, inchangée v0.7.1) | 88-92 | 95-98 | 92-96 |
| `/catalogue` (hub server, 3.52 kB) | 92-95 | 95-98 | 95-98 |
| `/catalogue/[slug]` (server, 3.87 kB) | 90-94 | 95-98 | 92-95 |
| `/sur-mesure` (form client, ~5 kB) | 88-92 | 95-98 | 92-96 |
| `/assistant-diagnostic` (inchangé v0.7) | 92-95 | 95-98 | 92-96 |

Mesure réelle (Emin) : `cd storefront && npm run build && npm run start` + Lighthouse Chrome DevTools mobile + desktop sur les 4 nouvelles routes.

## 3 questions à Emin

1. **Photos atelier IEF & Co** pour les 9 cards `/sur-mesure` — placeholders texte en V0.8, à remplacer par photos réelles atelier Groslay quand fournies.
2. **Adresse email devis sur-mesure** : le brief impose `contact@iefandco.com` mais la page `/contact` utilise `contact@acceferm.fr`. Confirmer la cohérence (les deux ? un seul ? alias ?).
3. **Footer colonne Catalogue** : le lien « Configurateur → /configurer » (wizard 5 questions) reste pointé vers `/configurer`. Faut-il le renommer en « Devis motorisation » ou pointer vers `/sur-mesure` à la place ?

## Build prod final

`✓ Compiled successfully · 388 pages statiques · 0 erreur TS · /catalogue 3.52 kB / 173 kB · /sur-mesure ~5 kB / ~170 kB · 41 s`

7 questions ouvertes héritées (v0.7 + v0.8) → 5 résolues + 2 nouvelles ouvertes. Voir CHANGELOG-V0.7.md pour les questions v0.7 toujours actives (logos officiels marques, calendrier Assistéo).
