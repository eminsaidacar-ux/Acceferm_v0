# Changelog v0.6 — preview collaborateurs

Branche : `refonte-epuree-2026-04` · 26 avril 2026 · 9 commits.

- **5 marques validées uniquement** (V2 / Roger Technology / Motor Line / Doorgate / Intégral Système). 12 marques retirées des mock data, search, filtres, fiches, articles, glossaire.
- **Numéros téléphone placeholder** (`01 XX XX XX XX · à confirmer`) + `TODO: numéro SAV définitif avant prod` partout.
- **Adresse Groslay 95410 + GPS** dans `LocalBusiness` schema. SIRET 888 693 981 corrigé dans tout le code.
- **`/vs/accesso-ferm` → `/comparatif-centrales-achat`** : route renommée, redirect 301 dans `next.config.ts`, contenu reformulé en termes neutres ("plateformes installées depuis les années 80"). Aucun nom de concurrent dans le contenu.
- **Manifeste retiré du Nav header** — accessible uniquement par footer (colonne Entreprise) et URL directe.
- **Migration `<img>` → `next/image`** : Hero, CategoryGrid, LiveCatalog, ProductGallery, /catalogue/[slug] hero (pages prioritaires preview).
- **Mode preview anti-indexation** : `NEXT_PUBLIC_PREVIEW_MODE=true` → robots.txt `Disallow: /`, meta `noindex,nofollow`, bandeau preview sticky fermable.
- **`/feedback` (mailto)** : page accessible par URL (pas dans le menu), form 3 champs, ouvre client mail vers `contact@iefandco.com`.
- **Build prod vert** : 374 pages statiques OK, Home 197 kB first load JS.
- **Lighthouse réel non mesuré** (autonomie nocturne, pas d'accès Vercel) — voir `RAPPORT-LIGHTHOUSE.md` pour les estimations + commandes pour mesurer après déploiement preview.
