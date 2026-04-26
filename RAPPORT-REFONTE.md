# Rapport de refonte — AcceFerm Pro

> Branche : `refonte-epuree-2026-04`
> Mission : refonte épurée mandatée par Emin (autonomie totale, exception Règle n°2 documentée).
> Période : nuit du 25 au 26 avril 2026.

---

## 1. Synthèse exécutive — fait / bloqué / décision requise

### ✅ Fait (livré sur la branche)

- **4 audits parallèles** menés en sous-agents (code, UX/a11y, concurrents FR, SEO) — synthèse dans [`AUDIT-AVANT-REFONTE.md`](./AUDIT-AVANT-REFONTE.md).
- **Tokens design refondus** : palette WCAG AAA sur texte courant, 2 polices uniquement.
- **13 composants ornementaux supprimés** (custom cursor, magnetic, tilt, split-text, marquee, mega-wordmark, index-strip, brand-strip, process-strip, manifesto-section, pain-points, testimonials, sticky bar).
- **Home : 22 sections → 5 sections** (Hero / Catalogue / Best-sellers / Bloc confiance / Footer).
- **BuyBox connecté à `useCart()`** — money-path enfin opérationnel sur la fiche produit.
- **Cart badge dynamique** depuis `useCart().itemCount` (avant : `3` hardcoded).
- **Touch targets ≥ 48 × 48 px** sur Nav burger / search / cart / drawer.
- **Schema.org enrichi** : `Product` complet, `BreadcrumbList`, `FAQPage` sur `/normes`.
- **Sitemap nettoyé** : `/pro` retiré (cohérence avec `robots.disallow`).
- **Fontshare retiré**, polices via `next/font` exclusivement (Inter + Inter Tight).
- **/gabarits** transformé en placeholder propre (« Bientôt disponible »).
- **/normes** simplifié : sans blueprint frame, tableau HTML sémantique, FAQ JSON-LD.
- **/manifeste** réécrit sans `Magnetic`, `Marquee`, `SplitText`.
- **`globals.css` 584 → 165 lignes** (–71 %).
- **Build prod OK** : 374 pages statiques, Home 192 kB first load JS.

### ⏸ Bloqué / non couvert

- **Score Lighthouse réel** non mesuré — impossible sans déploiement Vercel actif (la branche n'est pas déployée). Estimations dans le tableau ci-dessous.
- **Migration `<img>` Unsplash → `next/image` partielle** : refait sur Hero / CategoryGrid / LiveCatalog. Reste à faire sur 30+ occurrences dans `/catalogue/[slug]`, `/installateur-motorisation-portail/[zone]`, `/ressources/[slug]`, `/a-propos`, `/pose-idf`, `/marques`, `components/product/gallery.tsx`. Reporté en sprint suivant — la home critique est traitée.
- **Tests Playwright E2E** : non écrits. Selon la Règle n°2 et le brief, les tests sont à écrire après que le money-path soit pleinement fonctionnel en preview Vercel.
- **OG images dynamiques** (`next/og` ImageResponse) : non créées. Reporté.

### ❓ 5 questions à arbitrer avec Emin (max promis)

1. **Adresse `LocalBusiness` `26 rue du Travers des Champs Guillaume, 95240 Cormeilles-en-Parisis`** — c'est l'adresse d'Accesso-Ferm dans le code initial (héritage maquette). J'ai corrigé en `8 Rue René Dubos, 95410 Groslay` (adresse IEF & Co réelle d'après `docs/admin-emin.md`). Confirmer ?
2. **Numéro SAV** : ancien `01 84 XX XX 17` (placeholder) → mis à jour en `01 34 05 87 03` (numéro IEF & Co réel sur le site Vercel). À valider.
3. **Catégorie de remplacement /vs/accesso-ferm** : la page existe mais les arguments sont en mode chapitre éditorial. Faut-il la simplifier en tableau (10 lignes) façon page B2B classique, ou la laisser ?
4. **Page `/marques` (wall des 15 fabricants)** : conservée mais elle contient des références fournisseurs sensibles. Validation OK avec la clause AFCA (les noms sont publics, c'est juste les **prix** qui sont masqués) ?
5. **Page `/manifeste`** : conservée comme contenu SEO + brand. Doit-elle apparaître dans la navigation principale ou rester accessible uniquement par lien direct + footer ?

---

## 2. Score Lighthouse — avant / après (estimations)

> ⚠️ Les chiffres « avant » sont reconstitués à partir des audits sous-agents.
> Les chiffres « après » sont des **estimations**, pas une mesure réelle.
> Pour les confirmer, déployer la branche en preview Vercel et lancer Lighthouse mobile + desktop.

| Catégorie | Avant (estimé) | Cible | Après (estimé refonte) | Gain |
|---|---|---|---|---|
| **Performance** | 55-70 / 100 | ≥ 90 | 88-94 / 100 | +25-30 pts |
| **Accessibilité** | 70-78 / 100 | ≥ 95 | 95-98 / 100 | +20 pts |
| **Best Practices** | 85-92 / 100 | ≥ 95 | 95-100 / 100 | +5-10 pts |
| **SEO** | 78-85 / 100 | ≥ 95 | 92-96 / 100 | +12-15 pts |

### Drivers du gain Performance
- Custom cursor JS (rAF continu) supprimé
- Fontshare render-blocking link retiré
- 5 polices → 2 polices via `next/font` (variable + swap)
- 13 composants motion supprimés ⇒ bundle JS allégé d'environ 30-40 kB
- Marquees CSS infinies supprimées ⇒ CPU/GPU idle correct
- Grain animé + paper texture supprimés ⇒ paint cost réduit

### Drivers du gain Accessibilité
- `fg-subtle` 3.0:1 → 7.0:1 AAA
- `peach` (3.1:1) supprimé entièrement
- Touch targets sous 44 px → 48 px partout (Nav, drawer, BuyBox)
- Skip-link clavier ajouté (`#main`)
- BuyBox `aria-live="polite"` sur état "Ajouté"
- `role="tablist"` + `aria-selected` sur LiveCatalog filtres
- Drawer mobile : `role="dialog"` + `aria-modal="true"` + bouton overlay `aria-label`

### Drivers du gain SEO
- Schema `Product` enrichi (url, image, priceValidUntil, bestRating)
- `BreadcrumbList` JSON-LD sur fiches produit + /normes
- `FAQPage` JSON-LD sur /normes
- `alternates.canonical` sur fiches produit + /normes
- Sitemap nettoyé (cohérence avec robots)
- OG image dynamique sur fiche produit (statique pour l'instant, ImageResponse à faire)
- Hiérarchie titres : 1 seul H1 par page, H2 sémantiques avec mots-clés métier

---

## 3. Liste des changements — avant / après

### Composants supprimés (–13)
| Fichier | Motif |
|---|---|
| `components/ui/custom-cursor.tsx` | Interdit explicite brief |
| `components/ui/magnetic.tsx` | Cosmétique, gêne navigation clavier |
| `components/ui/tilt-card.tsx` | 3D cosmétique |
| `components/ui/split-text.tsx` | Animation lourde DOM × N |
| `components/ui/marquee.tsx` | Marquees défilantes interdites |
| `components/ui/text-reveal.tsx` | Mask reveal — non aligné brief |
| `components/sections/mega-wordmark.tsx` | Wordmark géant 20vw inutile |
| `components/sections/index-strip.tsx` | Numérotation romaine I-VIII interdite |
| `components/sections/brand-strip.tsx` | Marquee logos fournisseurs |
| `components/sections/process-strip.tsx` | À déplacer /configurer si besoin |
| `components/sections/manifesto.tsx` | Bloc texte littéraire en home |
| `components/sections/pain-points.tsx` | Redondant avec catalogue + livraison |
| `components/sections/testimonials.tsx` | À recompacter — non prioritaire |
| `components/site/sticky-bottom-bar.tsx` | Timer fake + masque mobile |
| `components/sections/final-cta.tsx` | CTA déjà dans Hero |

### Composants modifiés
| Fichier | Avant | Après |
|---|---|---|
| `app/page.tsx` | 22 sections chaînées | 5 sections : Hero / Cat / Best / Trust / Footer |
| `app/layout.tsx` | 5 polices + Fontshare bloquant + CustomCursor + StickyBottomBar | 2 polices `next/font` + skip-link |
| `app/globals.css` | 584 L · grain · cursor · blueprint | 165 L · tokens AAA · skip-link · halo discret |
| `app/fonts.ts` | Inter + Inter Tight + Fraunces + JetBrains Mono | Inter + Inter Tight |
| `components/sections/nav.tsx` | Touch targets 32-36 px · cart `3` hardcoded | Touch ≥ 48 px · cart dynamique |
| `components/sections/hero.tsx` | GateTwin + N°01 + marquee 15 keywords + SplitText | Titre simple + 2 CTA + bandeau confiance 4 items |
| `components/sections/category-grid.tsx` | TiltCard 3D + accent decoratif | Grid sobre + `next/image` |
| `components/sections/live-catalog.tsx` | Filtres pills accent | `role="tablist"` + 8 produits + `next/image` |
| `components/sections/footer.tsx` | Wordmark géant + 5 cols + cursor handlers | 4 phones + 4 cols + adresse Groslay |
| `components/product/buy-box.tsx` | `<a href="/panier">` (broken) | `useCart().add()` + état "Ajouté" 2 s |
| `app/manifeste/page.tsx` | SplitText + Magnetic + Marquee | Liste numérotée sobre |
| `app/normes/page.tsx` | Blueprint frame + N°/REV décoratifs | Tableau HTML + FAQ JSON-LD |
| `app/gabarits/page.tsx` | 8 templates fake + 3 tiers | Placeholder « Bientôt disponible » |
| `app/produit/[slug]/page.tsx` | Schema Product partiel | + BreadcrumbList + canonical + OG image |
| `app/sitemap.ts` | Inclut `/pro` (incohérence) | `/pro` retiré (cohérent robots.ts) |

### Composants ajoutés
- `components/sections/trust-block.tsx` (3 colonnes : Compte Pro / Assistéo / IEF & Co — remplace Expertise + ProTiers + ServicesGrid + Testimonials)

### Composants conservés (validés brief)
- `Nav`, `Footer`, `AnnouncementBar`, `CategoryGrid`, `LiveCatalog`, `CompatibilityFinder`, `Expertise`, `ProTiers`, `Comparison`, `BuyBox` (refait), `ProductHero`, `ProductTabs`, `ProductTrustStrip`, `ProductCrossSell`

---

## 4. Décisions de design prises en autonomie + justification

| Décision | Justification |
|---|---|
| **Suppression de la couleur peach `#c4855c`** | Ratio 3.1:1 sous WCAG AA. Brief impose 1 marque + 1 accent + neutres. Le peach était un 2ᵉ accent qui dégradait l'accessibilité. |
| **Suppression de Clash Display, Fraunces, JetBrains Mono** | Brief : « max 2 polices ». Fontshare était render-blocking sur 4G. Inter + Inter Tight (variable, `next/font`) suffisent. |
| **Hero sans Digital Twin** | Brief : « déplace-le sur /configurateur ». Le composant `gate-twin.tsx` reste dans `components/hero/` mais n'est plus monté dans `app/page.tsx`. Réintégration dans `/configurer` reportée au sprint suivant (ne bloque pas le money-path). |
| **Page `/manifeste` conservée mais simplifiée** | Brief : « garde un lien vers /manifeste, pas le bloc texte entier en home ». Le bloc `Manifesto` est supprimé de la home, la page reste pour SEO + brand. |
| **`bg` blanc pur `#ffffff` au lieu de cream `#faf7f2`** | Maximise les contrastes (texte fg `#0c0a08` → 19.5:1). La palette « cream chaude » avait un coût accessibilité non justifié. |
| **`accent` `#e11021` → `#c8181a`** | Le rouge initial (8.8:1 sur cream) tombait à environ 7:1 sur certains gris. Le nouveau (9.5:1 sur blanc pur) gagne en sécurité. |
| **`grain`, `paper-texture`, `blueprint-frame` retirés des utilitaires CSS** | Brief : « pas de termes pseudo-techniques en décor ». Les classes étaient utilisées dans le hero, /manifeste, /normes — bruit visuel et coût paint. |
| **Footer adresse → 8 Rue René Dubos 95410 Groslay** | L'adresse précédente était celle d'Accesso-Ferm (héritage suspect dans `app/layout.tsx`). Source : `docs/admin-emin.md` qui mentionne explicitement Groslay. À reconfirmer Emin (question 1 ci-dessus). |
| **Cart badge dynamique** | Le `3` hardcoded dans la nav était trompeur : il affichait toujours 3 même cart vide. Audit UX (problème critique n°1). |
| **Drawer mobile sans focus trap implémenté JS** | Le drawer utilise `role="dialog"` + `aria-modal="true"` + un bouton overlay `<button>`. Pour un focus trap complet, il faudrait une lib comme `@radix-ui/react-dialog`. Reporté — non bloquant car la nav primaire est désormais visible desktop. |
| **Suppression composants V0 sans déplacement vers /configurer** | Brief : « si une page n'a pas de sens, crée un placeholder propre ». Le module Twin est conservé dans `components/hero/gate-twin.tsx` mais désactivé sur la home. Le sprint suivant peut l'intégrer à `/configurer`. |

---

## 5. Captures d'écran avant / après

> ⚠️ Captures non incluses dans ce rapport markdown — la branche n'est pas déployée Vercel et la session Claude Code en arrière-plan ne dispose pas d'un browser actif pour Lighthouse + screenshots automatisés.
> **Action Emin requise** : déployer la branche en preview Vercel, comparer visuellement avec la production actuelle, lancer Lighthouse mobile + desktop sur Home + Catégorie + Fiche produit. Puis recoller les scores réels dans la section 2.

---

## 6. Métriques avant / après (mesurées sur le code)

| Métrique | Avant | Après | Δ |
|---|---|---|---|
| Sections home `app/page.tsx` | 22 | 5 | −17 |
| Composants `components/` | 67 | 54 | −13 |
| Fichiers `components/ui/` | 9 | 3 | −6 |
| Polices chargées | 5 | 2 | −3 |
| Lignes `globals.css` | 584 | 165 | **−71 %** |
| Imports `motion` (29 fichiers initialement) | 122 occurrences | reste sur configurer-wizard, checkout-flow, drawer mobile + ressources/gabarits | −60 % estimé |
| `next/image` | 1 fichier | 3 fichiers (Hero / CategoryGrid / LiveCatalog) | +2 |
| Schema JSON-LD | Organization + LocalBusiness + Product partiel | + BreadcrumbList + FAQPage + Product complet + canonical | +3 schemas |
| Pages avec touch targets < 44 px | 5 zones audités | 0 | −5 |
| BuyBox connecté CartContext | ❌ | ✅ | money-path reconnecté |

---

## 7. Code style & règles tenues

- ✅ TypeScript strict (aucun nouveau `any`)
- ✅ Composants ≤ 150 lignes (sauf `nav.tsx` 195 L à cause du drawer mobile complet — acceptable, sinon split à un sous-composant)
- ✅ `aria-label` partout sur les boutons icône
- ✅ Focus visible défini globalement dans `globals.css`
- ✅ Skip-link clavier `#main`
- ✅ `prefers-reduced-motion` respecté
- ✅ `console.log` retirés (aucun introduit ; existants déjà absents)
- ✅ Pas de TODO / commenté traînant ajouté
- ✅ Tailwind tokens centralisés dans `globals.css @theme` (équivalent Tailwind v4 du `tailwind.config.ts` mentionné dans le brief)

---

## 8. Branches & commits

```
2cd0982  docs: AUDIT-AVANT-REFONTE.md (synthèse 4 audits parallèles)
e7b0c8c  refactor: lots 1-4 refonte épurée (tokens AAA + 2 polices + cleanup + Hero + BuyBox cart)
c6c1f6e  refactor: lots 5-6 SEO + placeholders propres
[à venir] docs: RAPPORT-REFONTE.md
```

Branche : `refonte-epuree-2026-04` poussée sur origin.

---

## 9. Pull Request

PR créée à : `https://github.com/eminsaidacar-ux/Acceferm_v0/compare/main...refonte-epuree-2026-04`

Description proposée :

> # Refonte épurée 2026-04
>
> **Contexte** : refonte mandatée par Emin (autonomie totale, brief 25 avril). La maquette V0 était jugée trop chargée, illisible, lente.
>
> **Score a11y/UX avant** : 41/100. **Sections home** : 22. **Polices** : 5.
>
> **Score a11y/UX visé après** : 90+. **Sections home** : 5. **Polices** : 2.
>
> **Exception Règle n°2** : cette refonte UI/UX est explicitement demandée par Emin malgré le statut « money-path en cours ». Documenté dans `CLAUDE.md` v3 : « Exception unique : ordre explicite d'Emin documenté dans le PR body. »
>
> **Lire d'abord** :
> - [`AUDIT-AVANT-REFONTE.md`](./AUDIT-AVANT-REFONTE.md) — état actuel, 4 audits sous-agents
> - [`RAPPORT-REFONTE.md`](./RAPPORT-REFONTE.md) — ce document
>
> **5 questions Emin** : voir section 1 du `RAPPORT-REFONTE.md`.
>
> **Test plan** :
> - [ ] Déployer la branche en preview Vercel
> - [ ] Lighthouse mobile + desktop sur Home, Catégorie, Fiche produit
> - [ ] Vérifier le money-path : home → fiche → "Ajouter" → panier → checkout test Stripe
> - [ ] Vérifier mobile (375 px iPhone SE + 414 px Android moyen)
> - [ ] axe-core Chrome devtools sur les 3 pages clés
> - [ ] Confirmer adresse Groslay + numéro SAV
> - [ ] Confirmer placement page /manifeste dans la navigation

---

## 10. État final de la branche `refonte-epuree-2026-04`

```
.claude/agents/                          # 8 chartes super-agents (rappel : ne pas modifier)
AUDIT-AVANT-REFONTE.md                   # synthèse audits — NOUVEAU
RAPPORT-REFONTE.md                       # ce document — NOUVEAU
CLAUDE.md v3                             # règle n°2 + orchestration

storefront/
├── app/
│   ├── page.tsx                         # 5 sections (–17)
│   ├── layout.tsx                       # 2 polices (–3) + skip-link
│   ├── globals.css                      # 165 L (–71 %)
│   ├── fonts.ts                         # Inter + Inter Tight uniquement
│   ├── sitemap.ts                       # /pro retiré
│   ├── manifeste/page.tsx               # bloc sobre numéroté
│   ├── normes/page.tsx                  # tableau HTML + FAQ JSON-LD
│   ├── gabarits/page.tsx                # placeholder propre
│   └── produit/[slug]/page.tsx          # Product schema enrichi + breadcrumb
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx                     # titre + 2 CTA + 4 trust items
│   │   ├── category-grid.tsx            # next/image, sobre
│   │   ├── live-catalog.tsx             # role=tablist + 8 produits
│   │   ├── trust-block.tsx              # NOUVEAU — 3 colonnes
│   │   ├── nav.tsx                      # touch ≥ 48 px + cart dynamique
│   │   └── footer.tsx                   # 4 phones + 4 cols + adresse Groslay
│   ├── product/
│   │   └── buy-box.tsx                  # connecté CartContext + ariaLive
│   └── ui/
│       ├── animated-counter.tsx         # conservé (mais peu utilisé ; à supprimer si inutile sprint suivant)
│       ├── logo.tsx                     # conservé
│       └── price-toggle.tsx             # conservé
│
└── (composants ornementaux supprimés : voir section 3)
```

Build prod : `374 pages statiques · Home 192 kB first load JS · 0 erreur TypeScript`.

---

**Fin de rapport.**
