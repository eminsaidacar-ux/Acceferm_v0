# AcceFerm Pro — Storefront

Vitrine e-commerce state-of-the-art pour AcceFerm Pro & Industrie. Concept "Command Center pour installateurs" — **pas** une boutique e-commerce classique.

## Stack

- **Next.js 15** (App Router, React 19, Turbopack, PPR incrémental, React Compiler, View Transitions)
- **Tailwind CSS v4** (configuration CSS-native via `@theme`)
- **TypeScript strict**
- **motion/react** pour les animations complexes (ticker, stepper)
- **lucide-react** pour les icônes
- **Biome** pour lint + format (plus rapide qu'ESLint)
- **next/font** avec Inter, Instrument Serif, JetBrains Mono

## Architecture

```
storefront/
├── app/
│   ├── layout.tsx           # Metadata + JSON-LD Organization & LocalBusiness
│   ├── page.tsx             # Composition homepage
│   ├── globals.css          # Tailwind v4 + design tokens
│   └── fonts.ts             # Google Fonts via next/font
├── components/
│   ├── price-mode-context.tsx   # Client — HT/TTC toggle persistant
│   ├── sections/                # Server Components (sauf ticker + finder)
│   │   ├── announcement-bar.tsx
│   │   ├── nav.tsx
│   │   ├── hero.tsx
│   │   ├── command-center.tsx   # Client — ticker + countdown live
│   │   ├── phone-grid.tsx
│   │   ├── compatibility-finder.tsx  # Client — 3-step stepper
│   │   ├── live-catalog.tsx          # Client — dépend HT/TTC
│   │   ├── expertise.tsx
│   │   ├── pro-tiers.tsx
│   │   ├── comparison.tsx
│   │   ├── final-cta.tsx
│   │   └── footer.tsx
│   └── ui/
│       ├── logo.tsx
│       └── price-toggle.tsx
└── lib/
    ├── data.ts      # Mock data (produits, ticker, comparaison, marques)
    └── utils.ts     # cn() helper + formatPrice()
```

**Principe d'isolation client** : seuls 4 composants sont `"use client"` (price context, price toggle, command-center, compatibility-finder, live-catalog). Tout le reste est Server Component pour un bundle JS minimal.

## Lancer en local

```bash
cd storefront
npm install          # ou pnpm i / bun i
npm run dev          # http://localhost:3000
```

**Prérequis** : Node.js ≥ 20.

## Sections de la homepage (concept unique)

1. **Announcement bar** — countdown cutoff expédition 15h47 + numéros SAV/Commercial
2. **Hero "Triage chantier"** — 3 cartes : panne / configurer / préparer chantier (pas un CTA générique "Voir catalogue")
3. **Command Center live** (colonne droite du hero) — KPIs, ticker commandes IDF temps réel, countdown, **4 numéros de téléphone dédiés** (force ACCESSO-FERM copiée + modernisée)
4. **Compatibility Finder** — stepper 3 étapes marque → modèle → besoin (différenciateur ingénieur absent ailleurs)
5. **Live Catalog** "Ce que les pros commandent ce matin" — badges stock live, activité par produit, toggle HT/TTC
6. **Expertise IEF** — 15 ans, 3 000+ installations, barre de cut-off 24h visuelle, **Assistéo** CTA, zéro photo humaine (contrainte `CLAUDE.md`)
7. **Pro Tiers** — Particulier / Silver −5 % / Gold −10-15 % + 30j
8. **Comparison** vs incumbent — 8 points où AcceFerm gagne
9. **Final CTA** — ouverture compte pro 2 minutes
10. **Footer** — IEF & Co, 4 colonnes, statut système live

## Design tokens

- **Palette** : `ink` (950-500 warm dark), `paper`, `muted`, `copper` (300-700), `lime`
- **Typo** : Instrument Serif (display), Inter (body), JetBrains Mono (tech)
- **Motion** : scroll-driven `animation-timeline: view()` (progressive enhancement), `motion/react` pour le ticker et le stepper, `prefers-reduced-motion` respecté partout

## À faire ensuite (hors homepage)

Cette homepage est la fondation visuelle V0. Les sprints suivants ajoutent :
- Catalogue `/catalogue/[...slug]/` avec filtres à facettes (Meilisearch)
- Fiche produit `/produit/[slug]` avec onglets (caract. / compat. / notice / avis)
- Configurateur motorisation 5 questions → 3 kits (`/configurer/`)
- Espace Pro `/pro/` (compte, commandes, factures, paiement 30j)
- Hub Ressources (guides + diagnostic + pages locales IDF)

Voir `../plan-v0-pro-industrie.md` section 6 pour l'architecture complète.

## Déploiement recommandé

- **Dev** : Vercel preview sur chaque branche
- **Prod V0 court terme** : Vercel (gratuit jusqu'à 100 GB bande passante)
- **Prod V1 (migration headless complète)** : Vercel Enterprise ou Cloudflare Pages, PIM Akeneo, Saleor/Medusa en backend commerce, Sanity pour le contenu éditorial

## Notes de conformité `CLAUDE.md`

- **Aucune photo humaine** — catalogue utilise des glyphes typographiques (placeholder), prêt pour photos Gemini fond blanc
- **Prix HT par défaut** — respecté (cible pro)
- **Clause AFCA** — aucun prix motorisation affiché dans la homepage ; les CTAs motorisation renvoient vers `/configurer/` (devis sous 24h)
- **Marge 90 %+** — le tableau de prix est mock, les vrais SKU seront importés depuis AFCA/V2/Roger après audit tarifaire
