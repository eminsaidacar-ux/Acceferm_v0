# Session handoff — AcceFerm Pro

> État du projet à la fin de la session du 20 avril 2026.
> À lire en début de nouvelle session avec CLAUDE.md + `plan-v0-pro-industrie.md`.

---

## 🎯 Position actuelle

Maquette interactive Next.js 15 complète sous `storefront/`. **19 routes publiques, toutes en HTTP 200 OK.**

**Identité visuelle** : palette warm (fond crème #f7f3e9, texte graphite chaud, **accent terracotta deep #a83e1e unique** — le navy a été retiré).

**Configurateur** : 12 types de produits × 6 étapes (Type → Dimensions → Usage → Réglage → Options techniques spécifiques au type → Récap avec 3 kits chiffrés).

**Digital Twin** : 6 schémas SVG interactifs avec sélecteur (portail coulissant / battant / sectionnelle industrielle / rideau métallique / barrière levante / borne escamotable). 6-8 hotspots par schéma.

**Animations award-winning** :
- Mask-reveal sur H1 du hero (stagger 90 ms)
- Magnetic cursor sur CTAs principaux
- Animated counters scroll-driven sur le TrustStrip
- Tilt 3D sur les 12 tuiles CategoryGrid

---

## 🛠️ Stack

- **Next.js 15** App Router · React 19 · TypeScript strict
- **Tailwind CSS v4** (tokens CSS-native via `@theme` dans `globals.css`)
- **motion/react** pour les animations complexes
- **lucide-react** pour les icônes
- Fonts : Inter (body) / Inter Tight (display) / JetBrains Mono
- **Biome** pour lint + format

Aucune BDD, aucune auth, aucun paiement réel — c'est une maquette haute-fidélité.

---

## 🗺️ Architecture fichiers clés

```
storefront/
├── app/
│   ├── page.tsx                             # Home (14 sections composées)
│   ├── layout.tsx                           # Metadata + JSON-LD Organization
│   ├── globals.css                          # Design tokens @theme + animations CSS
│   ├── loading.tsx / not-found.tsx          # États vides
│   ├── sitemap.ts / robots.ts               # SEO
│   ├── configurer/page.tsx                  # Configurateur 12 types × 6 étapes
│   ├── produit/[slug]/page.tsx              # Fiche produit (SSG sur 12 slugs seed)
│   ├── catalogue/[slug]/page.tsx            # Catégorie + filtres sidebar
│   ├── pro/page.tsx                         # Dashboard Espace Pro
│   ├── panier/page.tsx                      # Cart (persistant localStorage)
│   ├── commande/page.tsx                    # Checkout 3 étapes
│   ├── compte-pro/nouveau/page.tsx          # Signup 4 étapes SIRET
│   ├── recherche/page.tsx                   # Search results (catégories+produits+guides)
│   ├── ressources/page.tsx                  # Hub 9 articles
│   ├── ressources/[slug]/page.tsx           # Articles complets
│   ├── installateur-motorisation-portail/[zone]/page.tsx  # 4 pages locales IDF 75/92/93/78
│   ├── vs/accesso-ferm/page.tsx             # Landing comparative 14 critères
│   ├── legal/[slug]/page.tsx                # 6 pages légales (CGV, mentions, confidentialité…)
│   ├── pose-idf/page.tsx                    # Landing pose + Assistéo
│   ├── contact/page.tsx                     # Formulaire contact
│   └── a-propos/page.tsx                    # IEF & Co timeline
│
├── components/
│   ├── cart/
│   │   ├── cart-context.tsx                 # Context panier localStorage
│   │   └── cart-view.tsx
│   ├── checkout/checkout-flow.tsx           # Multi-step checkout
│   ├── configurer/wizard.tsx                # Wizard 12 types + options techniques
│   ├── hero/gate-twin.tsx                   # Moteur Digital Twin multi-schémas
│   ├── product/                             # Hero produit + gallery + tabs + cross-sell
│   ├── sections/                            # Toutes les sections de la home
│   ├── signup/pro-signup.tsx
│   ├── search/search-results.tsx
│   ├── catalogue/                           # Filters sidebar + product grid + toolbar
│   ├── ui/
│   │   ├── magnetic.tsx                     # Magnetic cursor (physique ressort)
│   │   ├── tilt-card.tsx                    # 3D tilt hover
│   │   ├── animated-counter.tsx             # Counter scroll-driven
│   │   ├── text-reveal.tsx                  # Mask reveal stagger
│   │   ├── logo.tsx
│   │   └── price-toggle.tsx                 # HT/TTC toggle
│   └── site/cookie-consent.tsx              # CMP 3 catégories
│
└── lib/
    ├── afca-catalog.ts                      # Référentiel AFCA-V2 extrait du PDF 275 p.
    ├── catalog-tree.ts                      # Arborescence 12 familles + fallback subs (140+)
    ├── catalog-codes.ts                     # Catalogue code fournisseur pour Commande éclair
    ├── configurator-details.ts              # Questions techniques spécifiques par type
    ├── twin-schemas.tsx                     # 6 schémas SVG Digital Twin
    ├── pricing.ts                           # Moteur fournisseur→client (marges 60-120%)
    ├── suppliers.ts                         # INTERNE — 12 fournisseurs (ne pas exposer)
    ├── suppliers-products.ts                # Seed produits nouvelles familles
    ├── product-detail.ts                    # Enrichissement fiches produit
    ├── data.ts                              # Products, categories, phones, etc.
    ├── images.ts                            # Catalogue Unsplash hotlinks (16 URLs 200 OK)
    ├── ressources.ts                        # 9 articles avec bodies
    ├── local-zones.ts                       # 4 zones IDF
    ├── legal.ts                             # 6 docs légaux
    ├── pro-data.ts                          # Mock dashboard Espace Pro
    ├── gate-parts.ts                        # (legacy) remplacé par twin-schemas.tsx
    └── utils.ts
```

---

## 🚀 Reprendre le travail — commandes

```bash
cd storefront
npm install      # si node_modules absent (1er clone)
npm run dev      # → http://localhost:3000
```

Prérequis : Node ≥ 20.

---

## ⚠️ Règles importantes (CLAUDE.md v2)

1. **Ne JAMAIS exposer publiquement la liste des fournisseurs** (clause commerciale : pourquoi le client passerait par IEF si les sources sont visibles ?). `lib/suppliers.ts` est **interne uniquement**, pas de page `/marque/[slug]` publique.
2. **Clause AFCA** : prix des motorisations jamais affichés publiquement. Le configurateur renvoie vers devis.
3. **Aucun visage humain** dans les images (contrainte CLAUDE.md).
4. **Prix HT par défaut** (cible pro).
5. **Nomenclature AcceFerm** : ne pas exposer les codes fabricant AFCA directement, usage de slugs propres.

---

## 📋 Ce qui reste / priorités suggérées

### 🔴 Finitions en cours (interrompues ici)
- **Design** : Emin mentionne que certains états sélectionnés peuvent encore être améliorés. Toujours vérifier que le mix couleur est cohérent (un seul accent terracotta).
- **Catalog routes** : les pages `/catalogue/[slug]` fonctionnent pour les anciennes catégories (`photocellules`, `motorisation-battant`...) mais pas forcément pour les nouveaux slugs ajoutés dans `catalog-tree.ts` (`portes-sectionnelles-industrielles`, `bornes-escamotables`, `portiques-limitation`, etc.). À tester + router proprement.

### 🟡 Prochaines grosses étapes du plan
- **Photos produits réelles** (générées Gemini fond blanc, zéro visage) — remplace les placeholders Unsplash
- **Prisma + Postgres** → ingestion du catalogue AFCA complet (1500 refs depuis l'index PDF)
- **Auth NextAuth + Stripe + Brevo** → passer du mockup à une vraie app qui encaisse
- **Pricing engine câblé partout** (actuellement les prix sont hardcodés dans `data.ts` et `suppliers-products.ts`)

### 🟢 Plus tard
- Extension Digital Twin à portique limitation hauteur + schéma plus détaillé pour contrôle d'accès VIGIK
- Tests E2E Playwright sur parcours commande
- CMS pour les articles ressources (actuellement TS hardcodé)

---

## 🐛 Points connus

- Dev server peut mettre 30-45s à compile à froid (Turbopack + Tailwind v4 + tous les composants)
- Unsplash hotlink parfois rate-limit en dev
- Quelques warnings lint mineurs dans `wizard.tsx` (imports non utilisés occasionnels)

---

## 🔗 Liens externes

- Repo : https://github.com/eminsaidacar-ux/Acceferm_v0.git
- Concurrent audité : https://www.accesso-ferm.fr

---

Bonne reprise. Tout est dans `storefront/` — le reste (analyse concurrentielle, plan V0, prompts GPT-image, articles, guides SEO) est à la racine.
