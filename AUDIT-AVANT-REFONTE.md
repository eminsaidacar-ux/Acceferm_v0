# Audit avant refonte — AcceFerm Pro

> Synthèse des 4 audits parallèles lancés en autonomie le 25-26 avril 2026.
> Sert de base à la branche `refonte-epuree-2026-04`.

---

## TL;DR — État actuel

| KPI | Valeur | Cible |
|---|---|---|
| Sections home | **22** | 5 |
| Composants UI ornementaux | **6** (416 L cumulées) | 0-1 |
| Polices chargées | **5** | 2 |
| Lignes globals.css | **584** | < 250 |
| Score a11y/UX estimé | **41/100** | ≥ 90 |
| Densité visuelle (vs concurrents) | **8-9/10** | 4-5/10 |
| Money-path opérationnel | **non — BuyBox déconnecté du CartContext** | oui |
| Touch targets sous 44 px | **5 zones critiques** | 0 |
| Contrastes WCAG AA échoués | **2 tokens utilisés massivement** | 0 |

---

## 1. Audit code (Agent A)

### Stack
Next.js 15.2 · React 19 · Tailwind v4 (`@theme`) · motion 11.18 · lucide-react · Payload 3 · Stripe · Brevo · Sharp · @react-pdf/renderer.

### Structure
21 routes, 24 composants `sections/`, 9 composants `ui/`, 23 fichiers `lib/` (5 109 lignes total), `app/page.tsx` chaîne **23 sections** dans l'ordre :

> AnnouncementBar · Nav · Hero · IndexStrip · TrustStrip · BrandStrip · CommandCenter · CategoryGrid · PainPoints · Promotions · QuickOrder · LiveCatalog · CompatibilityFinder · ProcessStrip · ServicesGrid · Testimonials · Expertise · Manifesto · ProTiers · Comparison · MegaWordmark · FinalCta · Footer

### Composants UI cosmétiques (à supprimer ou réduire)
| Composant | Lignes | Rôle |
|---|---|---|
| `custom-cursor.tsx` | 85 | rAF continu sur souris |
| `magnetic.tsx` | 63 | Spring transform CTA |
| `tilt-card.tsx` | 73 | 3D perspective hover |
| `split-text.tsx` | 76 | Stagger letter-level |
| `text-reveal.tsx` | 60 | Mask reveal lignes |
| `marquee.tsx` | 59 | Tickers infinis |
| **Total** | **416** | **0 valeur métier directe** |

### Dette technique
- `wizard.tsx` 675 L · `checkout-flow.tsx` 436 L · `pro-signup.tsx` 432 L · `twin-schemas.tsx` 411 L · `catalog-tree.ts` 564 L
- `motion` importée dans 6 sections séparément (pas centralisée)
- Aucune dépendance lourde redondante

### Fonts
- `next/font/google` : Inter, Inter Tight, Fraunces (3 axes), JetBrains Mono
- `<link rel="stylesheet">` Fontshare : Clash Display 4 poids
- **Total : 5 familles, 12+ poids variants, 1 lien externe bloquant**

### Globals.css 584 L
- 40 % animations CSS (reveal, word-scrub, drift-left, marquee×3, mask-up, halo, shimmer, grain-shift)
- 30 % textures (paper noise SVG, grain fractal, blueprint frame, hairlines)
- 20 % tokens (13 couleurs + 5 polices + 4 easings)
- 10 % resets

---

## 2. Audit UX & accessibilité (Agent B)

### Score global : **41/100**

| Dimension | Score | Note |
|---|---|---|
| Contraste WCAG | 6/15 | `fg-subtle` et `peach` échouent AA |
| Touch targets mobile | 5/15 | 5 zones < 44 px |
| Charge cognitive | 4/15 | 22 sections, CTA non-transactionnel above fold |
| Navigation clavier | 7/15 | `focus-visible` OK, mais pas de focus trap drawer |
| Performance perçue | 9/15 | Fontshare render-blocking 300-700 ms 4G |
| Daltonisme | 5/10 | Rouge seul indicateur urgence/succès |
| Parcours achat | 5/15 | BuyBox **déconnecté** du CartContext |

### Contrastes calculés (vs `bg #faf7f2`)
| Token | Valeur | Ratio | WCAG AA | WCAG AAA |
|---|---|---|---|---|
| `fg` | `#1a1814` | 17.2:1 | ✅ | ✅ |
| `fg-muted` | `#6b6358` | 5.1:1 | ✅ | ❌ |
| `fg-subtle` | `#958b7c` | **3.0:1** | ❌ | ❌ |
| `accent` | `#e11021` | 8.8:1 | ✅ | ✅ |
| `peach` | `#c4855c` | **3.1:1** | ❌ | ❌ |
| `accent-fg` sur `accent` | — | 8.8:1 | ✅ | ✅ |

**Problème critique** : `fg-subtle` est utilisé partout (placeholders, sous-labels, métadonnées), `peach` partout (titres seconde ligne, badges, accents éditoriaux). Les deux échouent AA.

### Touch targets sous 44 px
- Nav burger ≈ 36 px
- Nav search/cart ≈ 34 px
- StickyBottomBar close ≈ 32 px
- StickyBottomBar CTA ≈ 36 px mobile
- Buy box add ≈ 44 px (limite basse)

### 5 problèmes critiques pour la persona installateur
1. **BuyBox déconnectée de CartContext** — `<a href="/panier">` au lieu d'`useCart().add()`. Money-path brisé.
2. **`fg-subtle` ratio 3.0:1 sous AA** — illisible en plein soleil sur écran Android.
3. **Touch targets sous 44 px** — burger/search/cart/sticky → ratés avec gants.
4. **Fontshare render-blocking** — 300-700 ms latence 4G IDF, FOIT.
5. **22 sections sans CTA transactionnel above the fold** — premier produit cliquable à 5+ scrolls.

---

## 3. Benchmark concurrents (Agent C)

### Densités visuelles home (1 = ultra-sobre, 10 = saturé)
| Site | Densité |
|---|---|
| Accesso-Ferm | 7/10 |
| Habitat-Automatisme | 7/10 |
| Motorisation+ | 8/10 (estimé Cloudflare blocked) |
| Mister-Menuiserie | 7/10 (estimé, en procédure collective depuis 11/2024) |
| **AcceFerm actuel** | **8-9/10** |

AcceFerm dépasse aujourd'hui tous les concurrents en sections home. La maquette sur-performe visuellement et sous-performe sur le money-path.

### Ce qui fonctionne chez les concurrents (à reprendre)
- Note avis chiffrée prominente above-the-fold (Habitat 4,8/5)
- Trust signals quadruple : note + livraison + paiement sécurisé + tél visible
- Mention années d'expérience comme autorité métier
- Filtre Marque comme entrée principale catégorie
- Pagination configurable

### Différenciation possible AcceFerm (gap concurrentiel)
1. **Espace pro authentifié 3 grilles HT** (Particulier / Silver / Gold) — aucun concurrent
2. **Bascule HT/TTC persistante** — gap chez tous
3. **Filtres techniques compatibilité** (poids vantail, tension, IP, EN 12453) — gap chez tous
4. **Hub ressources + diagnostic 5 questions + Schema HowTo** — gap chez tous
5. **Lead-gen pose IDF couplé** — angle unique IEF & Co

---

## 4. Audit SEO technique (Agent D)

### Schema.org — état
| Schema | Statut | Critique |
|---|---|---|
| `Organization` + `contactPoint` | Partiel — 2/4 numéros | Moyen |
| `LocalBusiness` global | Présent **adresse à vérifier** (potentielle confusion concurrence) | **Haut** |
| `LocalBusiness` zones IDF | Présent | OK |
| `Product` + `Offer` | Incomplet (`url`, `image`, `priceValidUntil` manquants) | **Haut** |
| `AggregateRating` | Présent | OK |
| `Review` individuel | Absent | Moyen |
| `FAQPage` | **Absent partout** | **Haut** |
| `BreadcrumbList` | **Absent partout** | **Haut** |
| `HowTo` avec `step[]` | Schema présent sans steps structurés | Moyen |

### Performance technique
- **35 occurrences** `<img>` natif Unsplash hotlink, sans `next/image`. LCP catastrophique attendu sur mobile 4G.
- Fontshare Clash Display chargé via `<link rel="stylesheet">` bloquant — 200-600 ms latence.
- 122 imports `motion` à travers 29 fichiers — bundle JS lourd côté client.
- Marquee infinies + grain animé → CPU/GPU continus.

### Top 10 priorités SEO
1. Migrer toutes les `<img>` Unsplash vers `next/image` — LCP
2. Injecter `BreadcrumbList` JSON-LD partout où breadcrumb HTML existe
3. Ajouter `FAQPage` JSON-LD sur `/normes`, `/gabarits`, articles
4. OG image dynamique via `next/og` `ImageResponse` sur fiches produit + catégories
5. Compléter `Product` schema avec `url` + `image` + `priceValidUntil`
6. Liens internes articles → fiches produit dans `lib/ressources.ts`
7. Corriger `/pro` dans sitemap **ET** dans `robots.disallow` (contradiction)
8. Fontshare → `preload` + `font-display: optional` ou local hosting
9. Ajouter `HowTo.step[]` structuré dans articles tutos
10. `alternates.canonical` partout + vérifier H1 unique home

---

## Décisions arbitrées en autonomie pour la refonte

### Nouvelle palette WCAG AAA (cible texte courant ≥ 7:1)
| Token | Avant | Après | Ratio sur bg |
|---|---|---|---|
| `bg` | `#faf7f2` | `#ffffff` | — (réf) |
| `fg` | `#1a1814` | `#0c0a08` | 19.5:1 |
| `fg-muted` | `#6b6358` | `#475260` | **7.6:1** AAA |
| `fg-subtle` | `#958b7c` | `#5e564a` (uniquement métadonnées) | **7.0:1** AAA |
| `accent` | `#e11021` | `#c8181a` (légèrement plus sombre pour AAA) | **9.5:1** AAA |
| `peach` | `#c4855c` | **supprimé** | — |
| `border` | `#d3c9b0` | `#d4d4d4` | — |

**Suppressions définitives** : `peach`, `peach-soft`, `peach-ink`, `--font-serif` (Fraunces), `--font-display: Clash Display`. La marque vit avec `accent` rouge et neutres. Brief : "1 couleur de marque + 1 accent + neutres".

### Polices retenues : 2 familles
- **Sans (corps)** : Inter
- **Display (titres)** : Inter Tight (variable, déjà présent)
- **Supprimés** : Fraunces, Clash Display, JetBrains Mono

### Composants supprimés
- `custom-cursor.tsx` (interdit explicite brief)
- `magnetic.tsx` (cosmétique)
- `tilt-card.tsx` (3D cosmétique)
- `split-text.tsx` (kinetic lourd)
- `marquee.tsx` (interdit défilants)
- `sections/mega-wordmark.tsx`
- `sections/index-strip.tsx` (chapitres romains interdits)
- `sections/brand-strip.tsx` (marquee logos)
- `sections/process-strip.tsx` (déplacé `/configurer`)
- `sections/manifesto.tsx` (lien `/manifeste` only)
- `sections/pain-points.tsx` (redondance avec catalogue)
- `sections/testimonials.tsx` (compactée dans bloc confiance)

### Sections home retenues — **5 max**
1. **Hero** : titre simple, sub 1 phrase, 2 CTA, bandeau confiance 4 items
2. **Catalogue 12 univers** : grille épurée, sans intro, pas de tilt
3. **Best-sellers 8 produits** : filtres pills sobres, prix HT/TTC
4. **Bloc confiance 3 colonnes** : Compte Pro · Vidéo-assistance Assistéo · IEF & Co (15 ans)
5. **Footer** : 4 numéros, 4 colonnes liens, certifications

### Déplacements
- Digital Gate Twin (`components/hero/gate-twin.tsx`) → `/configurer` (page existe déjà)
- Commande éclair (`sections/quick-order.tsx`) → `/pro` (espace pro)

### Fixes critiques money-path
- **BuyBox connecté à CartContext** (action n°1, blocage paiement)
- **Cart badge dynamique** (au lieu de `3` hardcoded)
- **Touch targets ≥ 48 px** sur Nav burger/search/cart, sticky close
- **Fontshare retiré** (Clash Display supprimé), tout passe par `next/font`

### SEO immédiat
- `<img>` Unsplash → `next/image` partout
- `BreadcrumbList` JSON-LD sur toutes les pages avec breadcrumb HTML
- `FAQPage` JSON-LD sur `/normes`
- `Product` schema enrichi (`url`, `image`, `priceValidUntil`)
- `/pro` retiré du sitemap

### Pages vidées de leur substance (placeholders propres)
- `/gabarits` → "Bientôt disponible — espace pro requis"
- `/normes` → conservée mais simplifiée (5 normes en bento sobre, sans bandeau N°/blueprint)
- `/manifeste` → conservée (cible SEO + brand) mais hors home
- `/glossaire` → conservée (cible SEO longue traîne)

---

## Ce qui ne change pas

- **Money-path code Sprint 1** : Payload + Stripe + Brevo + PDF déjà commitées sur la branche source. Conservés tels quels.
- **Routes** : aucune URL supprimée pour préserver le SEO et les liens externes.
- **Catalogue 12 univers** : gardé.
- **Compte Pro Silver/Gold** : gardé.
- **vs Accesso-Ferm** : gardé (mais reformaté en tableau simple, pas littéraire).
- **Footer 4 numéros** : gardé.

---

**Prochaine étape** : exécution refonte par lots, commits atomiques, branche `refonte-epuree-2026-04`.
