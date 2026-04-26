# Handoff — session Claude Code suivante

> Document de transition entre la session courante (v0.6 livrée) et la
> prochaine session (v0.7 à recevoir).
> **À lire EN PREMIER** par la nouvelle instance Claude Code, avant tout code.
>
> Date de création : 26 avril 2026
> Auteur : Claude Code (session v0.6 finale)

---

## A — État actuel du projet

| Champ | Valeur |
|---|---|
| **Repo GitHub** | `https://github.com/eminsaidacar-ux/Acceferm_v0` |
| **Branche active** | `refonte-epuree-2026-04` |
| **Branche distante** | sync OK (0 ahead, 0 behind) |
| **Dernier commit** | `3d5dfd0` — `feat(v0.6): finalisation preview collaborateurs` |
| **Build status** | ✅ green (374 pages statiques, 0 erreur TypeScript, Home 197 kB first load JS) |
| **Working tree** | propre (aucun fichier non committé) |
| **PR** | https://github.com/eminsaidacar-ux/Acceferm_v0/compare/main...refonte-epuree-2026-04 |
| **Worktree local** | `C:/Users/Utilisateur/acceferm-claude-code/.claude/worktrees/priceless-curie-fef692/` |

### Livrables disponibles à la racine du repo

| Document | Rôle |
|---|---|
| `AUDIT-AVANT-REFONTE.md` | Synthèse des 4 audits sous-agents (code, UX/a11y, concurrents, SEO) |
| `RAPPORT-REFONTE.md` | Rapport de la refonte initiale (lots 1-6) |
| `RAPPORT-LIGHTHOUSE.md` | Optimisations livrées + estimations + commandes mesure |
| `CHANGELOG-V0.6.md` | Changelog synthétique 10 lignes |
| `HANDOFF-SESSION-NEXT.md` | Ce document |
| `CLAUDE.md` | Contexte permanent v3 — orchestrateur 8 super-agents + Règle n°2 |

### 10 derniers commits

```
3d5dfd0  feat(v0.6): finalisation preview collaborateurs
11eca19  docs: RAPPORT-REFONTE.md (livrable final mission autonome)
c6c1f6e  refactor: lots 5-6 SEO + placeholders propres
6112110  refactor: lots 1-4 refonte epuree (tokens AAA + 2 polices + cleanup + Hero + BuyBox cart)
2cd0982  docs: AUDIT-AVANT-REFONTE.md (synthèse 4 audits parallèles)
691545f  feat(sprint1-phase2-5): money-path complet — Stripe + Brevo + PDF facture
50da411  feat(sprint1-phase1): Payload CMS 3 + 5 collections + seed 20 SKU + guide Emin
503092b  feat(methodo): orchestrateur 8 super-agents + Regle n2 money-path persistee
5ce795c  feat: conversion optimization 190% — sticky bar, pain points, testimonials, 3-tier gabarits
916ba86  fix: rendre tous les formulaires et filtres reellement fonctionnels
```

---

## B — Ce qui a été fait (résumé condensé)

### Refonte v0.6 livrée
- **22 → 5 sections home** : Hero / Catalogue 12 univers / Best-sellers 8 / Bloc confiance 3 cols / Footer
- **5 → 2 polices** : Inter (corps) + Inter Tight (titres). Suppression Fraunces, Clash Display, JetBrains Mono.
- **BuyBox connecté à `useCart()`** : avant la refonte le bouton "Ajouter" était un `<a href="/panier">` qui n'ajoutait rien — money-path enfin fonctionnel.
- **WCAG AAA sur texte courant** : `fg-subtle` 3.0:1 → 7.0:1, `fg-muted` 5.1:1 → 7.6:1, accent 8.8:1 → 9.5:1, peach supprimé (échouait AA).
- **5 marques distribuées uniquement** : V2 (groupe AFCA), Roger Technology, Motor Line, Doorgate, Intégral Système. 12 marques retirées : Nice, Came, FAAC, BFT, Beninca, Cardin, Ditec, Sommer, Cisa, Hörmann, Urmet, Somfy, Comelit.
- **Anti-indexation active** via `NEXT_PUBLIC_PREVIEW_MODE=true` : robots.txt `Disallow: /` + meta `noindex,nofollow,nocache` + bandeau preview sticky fermable.
- **Touch targets ≥ 48 × 48 px** partout (Nav burger/search/cart, BuyBox, drawer mobile, feedback form, preview banner).
- **Schema.org enrichi** : `Product` complet (`url`, `image`, `priceValidUntil`, `bestRating`), `BreadcrumbList`, `FAQPage` sur `/normes`, `LocalBusiness` avec `geo` + `areaServed`.

### 5 arbitrages Emin appliqués (v0.6)

| # | Arbitrage | Action |
|---|---|---|
| 1 | Adresse `LocalBusiness` confirmée | 8 Rue René Dubos, 95410 Groslay · GPS (49.0067, 2.3598) injecté · ancienne adresse Cormeilles purgée |
| 2 | Numéros SAV en placeholder | `01 XX XX XX XX · à confirmer` partout · `href="#numero-a-confirmer"` · 4 commits `TODO: numéro SAV définitif avant prod` |
| 3 | Page comparatif renommée | `/vs/accesso-ferm` supprimée → `/comparatif-centrales-achat` · redirect 301 dans `next.config.ts` · contenu reformulé sans nommer le concurrent ("plateformes installées depuis les années 80") |
| 4 | Filtre 5 marques validées | `lib/data.ts brands`, `topProducts`, `promotions`, `finderModels`, `catalog-codes`, `pro-data`, `search-results FACETS`, `/marques`, articles `ressources.ts`, glossaire — tout aligné sur les 5 marques |
| 5 | `/manifeste` hors Nav header | Plus dans `PRIMARY` ni `SECONDARY` du Nav · déplacé dans la colonne "Entreprise" du footer |

### Composants ajoutés en v0.6
- `components/sections/trust-block.tsx` (3 colonnes Compte Pro / Assistéo / IEF & Co)
- `components/site/preview-banner.tsx` (bandeau sticky preview)
- `components/site/feedback-form.tsx` (form mailto)
- `app/feedback/page.tsx` (page accessible URL only)
- `app/comparatif-centrales-achat/page.tsx` (route renommée)

### Fichiers de configuration touchés
- `app/layout.tsx` : meta robots conditionnel + skip-link + suppression CustomCursor + StickyBottomBar
- `app/fonts.ts` : 5 → 2 polices
- `app/globals.css` : 584 L → 165 L (–71 %)
- `app/robots.ts` : conditionnel `NEXT_PUBLIC_PREVIEW_MODE`
- `app/sitemap.ts` : `/pro` retiré, `/comparatif-centrales-achat` ajouté
- `next.config.ts` : redirect 301 `/vs/:path*` → `/comparatif-centrales-achat`

---

## C — Décisions de design FIGÉES (NE PAS REVENIR DESSUS)

> Ces règles ont été validées par Emin en autonomie nocturne. La nouvelle
> session ne doit pas les remettre en cause — uniquement Emin via un nouveau
> brief peut le faire.

### Règles UI/UX permanentes
1. **Pas de cursor custom** — utiliser le curseur natif du navigateur. Composant `custom-cursor.tsx` supprimé.
2. **Pas de WebGL, pas de Three.js, pas de Lottie** — animations interdites au-delà de transitions CSS simples (`< 300 ms`).
3. **Pas d'animations lourdes scroll** : pas de parallax, pas de canvas, pas de scroll-driven `animation-timeline` complexe.
4. **Pas de chapitres romains, pas de "Issue N°01", pas de stamps blueprint pseudo-techniques** ("REV.04 · ECH 1:100", "EN 12453 · EXC2"). C'était identifié comme bruit visuel pseudo-technique.
5. **Pas de marquees défilantes ornementales** — interdit pour le défilement infini de keywords. Une bannière marquise centrale UTILE est OK pour v0.7 (contenu réel, pas ornement vide).
6. **Pas de manifeste en home** ni dans la **nav primaire** — page `/manifeste` reste accessible par URL et par le footer (colonne "Entreprise") uniquement.
7. **Pas de Digital Twin en home** — réservé à `/configurateur` uniquement (réactivation prévue v0.7).
8. **Pas de mega wordmark géant** (style ACCEFERM 20vw) — composant supprimé.
9. **Pas de chapter numbers** numérotés type "N°01 / N°02 / Chapitre I-VIII".
10. **Maximum 2 polices** — Inter + Inter Tight. Aucune autre famille (Fraunces, Clash Display, Geist, etc.) sans validation Emin.

### Règles fournisseurs / commerce
11. **5 marques fournisseurs UNIQUEMENT** — V2 (groupe AFCA), Roger Technology, Motor Line, Doorgate, Intégral Système. **NE JAMAIS ré-introduire** Nice, Came, FAAC, BFT, Beninca, Cardin, Ditec, Sommer, Cisa, Hörmann, Urmet, Somfy, Comelit dans aucun fichier mock data, articles, glossaire ou fiche produit.
12. **Numéros téléphone = placeholders** `01 XX XX XX XX · à confirmer`. Le vrai numéro sera fourni par Emin avant prod. `href="#numero-a-confirmer"` (pas de `tel:+33...` actif).
13. **Adresse fixée** : 8 Rue René Dubos, 95410 Groslay. Pas Cormeilles-en-Parisis (héritage faux).
14. **SIRET fixé** : 888 693 981. Pas 812 345 678 (héritage faux).
15. **Clause AFCA** : motorisations sans prix public (déjà appliqué dans `seed/seed-pilots.ts isMotorisation=true`).

### Règles techniques permanentes
16. **TypeScript strict** — aucun `any` introduit, `noUncheckedIndexedAccess` actif via `tsconfig.json`.
17. **Composants ≤ 150 lignes** — sauf `nav.tsx` ~195 L à cause du drawer mobile complet (acceptable).
18. **WCAG 2.2 niveau AA minimum, AAA cible sur texte courant**. Contraste vérifié sur tous les tokens couleur.
19. **Mobile-first 48 × 48 px** — tout bouton tactile, tout lien icône.
20. **`prefers-reduced-motion` respecté** dans `globals.css`.
21. **`NEXT_PUBLIC_PREVIEW_MODE=true`** reste actif sur Vercel preview tant qu'on n'est pas en prod.

### Règles éditoriales
22. **Pas de dénigrement de concurrents par leur marque** — page `/comparatif-centrales-achat` utilise des termes neutres ("plateformes historiques", "centrales d'achat installées depuis les années 80").
23. **Pas de pseudo-éditorial littéraire** ("L'art du métal", "L'équipe IEF & Co") en home — gardé dans `/manifeste` et `/a-propos`.
24. **Captures d'écran sans visage humain** (contrainte CLAUDE.md).

---

## D — Composants ornementaux supprimés (NE PAS RECRÉER)

> Liste exhaustive des **13 composants** supprimés en v0.6.
> La nouvelle session **ne doit PAS** les recréer ni en réintroduire des
> équivalents fonctionnels (même reformulés).

| Composant supprimé | Raison | Équivalent acceptable v0.7+ |
|---|---|---|
| `components/ui/custom-cursor.tsx` | Interdit explicite brief — curseur natif uniquement | aucun |
| `components/ui/magnetic.tsx` | Cosmétique, gêne navigation clavier | aucun |
| `components/ui/tilt-card.tsx` | 3D cosmétique | aucun |
| `components/ui/split-text.tsx` | Animation kinetic letter-level | aucun |
| `components/ui/marquee.tsx` (ancien, lourd) | Marquees défilantes ornementales | bannière marquise utile possible v0.7 (contenu réel uniquement) |
| `components/ui/text-reveal.tsx` | Mask-reveal stagger | aucun |
| `components/sections/mega-wordmark.tsx` | Wordmark géant 20vw | aucun |
| `components/sections/index-strip.tsx` | Numérotation romaine I-VIII | aucun |
| `components/sections/brand-strip.tsx` (ancien, marquee logos) | Marquee logos défilante | défilement marques v0.7 OK si discret + 5 marques validées uniquement |
| `components/sections/process-strip.tsx` | 5 étapes scroll vertical | aucun en home — éventuellement /configurateur v0.7 |
| `components/sections/manifesto.tsx` | Bloc texte littéraire en home | aucun en home |
| `components/sections/pain-points.tsx` | Section "4 cas d'urgence" redondante | aucun |
| `components/sections/testimonials.tsx` | 3 avis avec quote géante | possible mais sobre (sans Quote icon décoratif géant) |
| `components/site/sticky-bottom-bar.tsx` | Bottom bar promo timer fake | aucun |
| `components/sections/final-cta.tsx` | CTA déjà dans Hero | aucun |

### Tokens / utilitaires CSS supprimés (`globals.css`)
- `peach`, `peach-soft`, `peach-ink` (couleurs)
- `--font-serif` (Fraunces), `--font-display` ancienne valeur Clash Display, `--font-mono` (JetBrains Mono via next/font)
- `.font-serif-italic`, `.chapter-num`, `.paper-texture`, `.grain`, `.wordmark`, `.kinetic-word`, `.blueprint-frame`, `.blueprint-tag`, `.display-italic`, `.text-peach`, `.bg-peach`, `.cursor-dot`, `.cursor-ring`, `.halo` (sauf usage discret signal-live)

---

## E — Architecture clé du repo

### Stack
- **Framework** : Next.js 15.5 App Router + React 19 + TypeScript strict
- **Styling** : Tailwind CSS v4 (tokens via `@theme` dans `globals.css`, **pas** de `tailwind.config.ts`)
- **Animation** : `motion` (anciennement framer-motion) — usage limité aux composants critiques (configurer wizard, checkout, drawer mobile)
- **CMS** : Payload CMS 3.84 sous route group `app/(payload)/admin/`
- **Paiement** : Stripe SDK 17 (mode test uniquement, clés non configurées)
- **Email** : Brevo SDK 2 (mode test uniquement)
- **PDF** : `@react-pdf/renderer` 4
- **Images** : `next/image` avec `unoptimized: true` (Vercel free tier — retirer en Pro)
- **Icônes** : `lucide-react`
- **Polices** : `next/font/google` Inter + Inter Tight uniquement
- **Lint/format** : Biome
- **Validation** : Zod (forms + checkout)
- **DB cible** : Postgres via Supabase EU (`eu-west-3`) — non actif (mode preview)

### Localisation des fichiers clés

| Domaine | Fichier(s) |
|---|---|
| Tokens design (couleurs, polices, easings) | `storefront/app/globals.css` (165 L, `@theme` block) |
| Polices `next/font` | `storefront/app/fonts.ts` |
| Metadata + JSON-LD globaux | `storefront/app/layout.tsx` |
| Robots conditionnel | `storefront/app/robots.ts` |
| Sitemap | `storefront/app/sitemap.ts` |
| Redirections | `storefront/next.config.ts` (`async redirects()`) |
| Mock data produits | `storefront/lib/data.ts` (brands, topProducts, promotions, ticker, finderModels, comparisonRows, searchSuggestions) |
| Détail produit + cross-sell | `storefront/lib/product-detail.ts` |
| Filters catalogue | `storefront/lib/catalogue.ts` |
| Codes Commande éclair | `storefront/lib/catalog-codes.ts` |
| Articles ressources | `storefront/lib/ressources.ts` |
| Pages légales | `storefront/lib/legal.ts` |
| Mock dashboard pro | `storefront/lib/pro-data.ts` |
| Catalogue AFCA-V2 (PDF extrait) | `storefront/lib/afca-catalog.ts` |
| Suppliers (INTERNE — ne pas exposer) | `storefront/lib/suppliers.ts` |
| Schémas Twin (motorisé) | `storefront/lib/twin-schemas.tsx` |
| Hero | `storefront/components/sections/hero.tsx` |
| Nav (touch targets 48px, cart dynamique) | `storefront/components/sections/nav.tsx` |
| Footer (4 phones + 4 cols + certif) | `storefront/components/sections/footer.tsx` |
| Trust block (3 cols Compte Pro / Assistéo / IEF) | `storefront/components/sections/trust-block.tsx` |
| BuyBox connecté CartContext | `storefront/components/product/buy-box.tsx` |
| ProductGallery (next/image) | `storefront/components/product/gallery.tsx` |
| Cart context (localStorage) | `storefront/components/cart/cart-context.tsx` |
| PreviewBanner | `storefront/components/site/preview-banner.tsx` |
| FeedbackForm | `storefront/components/site/feedback-form.tsx` |

### Variables d'environnement utilisées

| Variable | Mode | Usage |
|---|---|---|
| `NEXT_PUBLIC_PREVIEW_MODE` | client | `=true` → robots.txt Disallow + meta noindex + bandeau preview |
| `PAYLOAD_SECRET` | server | Payload CMS |
| `DATABASE_URI` | server | Supabase Postgres (non utilisé en mode preview) |
| `STRIPE_SECRET_KEY` | server | Stripe API (non utilisé en mode preview) |
| `STRIPE_WEBHOOK_SECRET` | server | Stripe webhook (non utilisé en mode preview) |
| `BREVO_API_KEY` | server | Brevo email (non utilisé en mode preview) |
| `NEXT_PUBLIC_SITE_URL` | client | URL canonique |

Toutes documentées dans `storefront/.env.example`.

### Routes principales

| Route | Type | Notes |
|---|---|---|
| `/` | Static | Home 5 sections |
| `/catalogue/[slug]` | SSG | 12 catégories + sous-cats |
| `/produit/[slug]` | SSG | 12 produits seed (5 marques validées) |
| `/configurer` | Static | Wizard 12 types (utilise `motion`, à optimiser v0.7) |
| `/pro` | Static | Dashboard mock |
| `/comparatif-centrales-achat` | Static | Comparatif neutre (renommé) |
| `/manifeste` | Static | Hors nav primaire (footer only) |
| `/normes` | Static | EN 12453 + FAQPage JSON-LD |
| `/gabarits` | Static | Placeholder "Bientôt disponible" |
| `/glossaire` | Static | 46 termes |
| `/marques` | Static | 5 marques validées + bandeau enrichissement |
| `/feedback` | Static | Form mailto, hors nav |
| `/recherche` | Dynamic | Search cross-entity |
| `/installateur-motorisation-portail/[zone]` | SSG | 4 zones IDF |
| `/legal/[slug]` | SSG | 6 docs légaux |
| `/ressources/[slug]` | SSG | 11 articles |
| `/api/checkout/create` | Server | Stripe Checkout (test mode) |
| `/api/webhooks/stripe` | Server | Webhook Stripe |
| `/admin/[[...segments]]` | Dynamic | Payload admin |

### Routes redirigées 301
- `/vs/accesso-ferm` → `/comparatif-centrales-achat`
- `/vs/:path*` → `/comparatif-centrales-achat`

---

## F — Travail à venir (prompt v0.7 en attente)

> **Ne pas exécuter v0.7 dans la session actuelle.** Le prompt complet sera
> fourni à la nouvelle session par Emin.

### Branche à créer
```bash
git checkout refonte-epuree-2026-04
git pull
git checkout -b iteration-v07-2026-04
```

### Objectifs v0.7 (résumés, à valider avec le prompt complet)

1. **Nouvelle nav primaire** (5 entrées) :
   - Catalogue
   - Configurateur
   - Assistéo & Maintenance
   - Espace Pro
   - Contact
   (Actuellement `Catalogue / Configurateur / Ressources / Espace Pro` — à mettre à jour)

2. **Page `/configurateur`** :
   - Réactiver le Digital Twin multi-fermetures (composant `components/hero/gate-twin.tsx` existe encore, plus monté nulle part)
   - Performance optimisée : pas d'animations lourdes, lazy-load des schémas SVG
   - Le composant a été conservé en v0.6 mais retiré de la home

3. **Page `/assisteo-maintenance`** :
   - Vidéo-assistance (offerte au-delà d'un seuil motorisation)
   - **3 formules de contrat de maintenance** à définir (probablement Bronze / Argent / Or) — attendre brief Emin

4. **Bannière marquise centrale** (réintégration) :
   - Contenu **utile** (pas ornement) : ex. promotion semaine, message saisonnier
   - Probablement un seul composant `<TopBanner>` ou réutilisation de `AnnouncementBar` existant
   - **Pas** de marquee infinie de keywords techniques (interdit, voir section C)

5. **Défilement marques fournisseurs** (réintégration) :
   - 5 marques validées uniquement (V2/AFCA, Roger Technology, Motor Line, Doorgate, Intégral Système)
   - **Logos officiels** à intégrer dès qu'Emin les fournit (autorisations OK selon le prompt v0.7)
   - Composant à recréer **en sobre** (pas le `brand-strip.tsx` ancien avec marquee défilante infinie)

### Points d'attention v0.7
- Garder Home à 5 sections max (sauf si Emin valide explicitement +1).
- Si "Assistéo & Maintenance" remplace "Ressources" dans le Nav primaire, ne PAS supprimer la route `/ressources` (SEO + maillage).
- Les 3 formules de contrat = nouveau contenu commercial, donc validation Emin obligatoire (cf. CLAUDE.md "Validation Emin OBLIGATOIRE").

---

## G — Questions ouvertes / TODO non bloquants

| Item | Owner | Bloquant prod ? |
|---|---|---|
| Numéros téléphone définitifs (4 lignes) | Emin | 🟢 oui prod, 🟡 non preview |
| Logos officiels marques fournisseurs (autorisations confirmées) | Emin | 🟡 non preview (placeholders OK) |
| Lighthouse réel à mesurer post-déploiement Vercel | Emin (commandes dans `RAPPORT-LIGHTHOUSE.md`) | 🟡 non preview |
| Migration `<img>` → `next/image` partielle (pages restantes : `/installateur-motorisation-portail/[zone]`, `/ressources/[slug]`, `/a-propos`, `/pose-idf`) | Dev (next session) | 🟡 non preview |
| Tests E2E Playwright à écrire | Dev (sprint suivant après money-path live) | 🟡 non preview |
| OG images dynamiques `next/og` ImageResponse à créer | Dev (prochaine itération) | 🟡 non preview |
| Compte Vercel à connecter au repo | Emin | 🔴 oui — bloque preview collab |
| Compte Supabase EU à provisionner | Emin | 🔴 oui — bloque admin Payload |
| Compte Stripe en mode test | Emin | 🟡 non preview, oui prod |
| Compte Brevo + DNS SPF/DKIM | Emin | 🟡 non preview, oui prod |
| Sentry pour monitoring prod | Dev (post-prod) | 🟢 non |

---

## H — Comment reprendre la prochaine session

### Étape 1 — Cloner / synchroniser le repo

```bash
# Première fois sur la machine
git clone https://github.com/eminsaidacar-ux/Acceferm_v0.git
cd Acceferm_v0

# Ou si déjà cloné :
cd Acceferm_v0
git fetch --all
git checkout refonte-epuree-2026-04
git pull
```

### Étape 2 — Installer les dépendances

```bash
cd storefront
npm install --legacy-peer-deps
```

### Étape 3 — Vérifier que tout tourne

```bash
# Build production (doit être green)
npm run build

# Dev server en mode preview (anti-indexation active + bandeau visible)
NEXT_PUBLIC_PREVIEW_MODE=true npm run dev
# → http://localhost:3000
```

### Étape 4 — Lire le contexte AVANT d'écrire le moindre code

```bash
# Lecture obligatoire (dans cet ordre)
cat HANDOFF-SESSION-NEXT.md       # ce document — vue d'ensemble + règles
cat CLAUDE.md                     # contexte projet permanent
cat AUDIT-AVANT-REFONTE.md        # 4 audits sous-agents (état avant refonte)
cat RAPPORT-REFONTE.md            # rapport de la refonte initiale
cat CHANGELOG-V0.6.md             # changelog 10 lignes v0.6
cat RAPPORT-LIGHTHOUSE.md         # estimations + commandes mesure Lighthouse
```

### Étape 5 — Attendre le prompt v0.7 d'Emin

Ne **pas** lancer de travaux sans le prompt complet de v0.7.
Quand le prompt arrive :

```bash
# Créer la branche v0.7
git checkout refonte-epuree-2026-04
git pull
git checkout -b iteration-v07-2026-04
```

### Étape 6 — Pendant le développement v0.7

- Appliquer les **règles de design figées** (section C de ce document).
- **Ne PAS recréer** les composants ornementaux supprimés (section D).
- **Ne JAMAIS ré-introduire** les 12 marques retirées (section C, règle 11).
- **Build green obligatoire** avant chaque push.
- **Commits atomiques** avec messages clairs (`feat:`, `refactor:`, `fix:`, `docs:`).
- **TypeScript strict, composants ≤ 150 L, WCAG AA min / AAA cible**.

### Commandes utiles pendant la session

```bash
# Build prod (test final)
npm run build

# Dev server (mode preview anti-indexation)
NEXT_PUBLIC_PREVIEW_MODE=true npm run dev

# Typecheck seul
npx tsc --noEmit

# Lint
npm run lint   # via biome

# Stop dev server background
# (utiliser TaskStop avec l'ID si lancé en background)
```

### En cas de doute

- Re-lire **section C** de ce document (règles figées) avant toute décision design.
- Re-lire **CLAUDE.md** pour le contexte business + clauses fournisseurs.
- Si une règle empêche d'avancer : **demander à Emin**, ne pas trancher seul.
- Si Lighthouse réel descend sous les seuils (Perf 90 / A11y 95 / SEO 95) après mesure : corriger avant merge.

---

## Fin de handoff

Le projet est en état stable. Tous les commits sont poussés. Build green.
La nouvelle session peut prendre le relais en lisant ce document.

**Bonne continuation.** — Session v0.6 finale, 26 avril 2026.
