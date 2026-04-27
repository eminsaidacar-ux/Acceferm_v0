# Captures v0.7 — instructions de prise

> Cette session Claude Code a tourné en CLI sans navigateur disponible.
> Les captures avant/après doivent être prises par Emin en local.
> Format attendu : PNG, viewport 1440 × 900 (desktop) et 375 × 812 (mobile).

## Avant (référence v0.6)

La home v0.6 (avant cette itération) est récupérable via :

```bash
git switch refonte-epuree-2026-04
cd storefront && npm run build && npm run start
```

Ouvrir `http://localhost:3000/` puis capturer :

1. `home-v06-desktop-fold.png` — au-dessus de la ligne de flottaison desktop
2. `home-v06-desktop-bottom.png` — section TrustBlock + Footer en bas
3. `home-v06-mobile.png` — page entière sur 375 px

## Après (cette branche v0.7)

```bash
git switch iteration-v07-2026-04
cd storefront && npm run build && npm run start
```

Ouvrir `http://localhost:3000/` puis capturer (mêmes viewports) :

1. `home-v07-desktop-fold.png` — au-dessus du fold (Hero inchangé)
2. `home-v07-desktop-marquise.png` — la **marquise centrale rouge** (entre LiveCatalog et TrustBlock) en plein milieu de viewport
3. `home-v07-desktop-brandstrip.png` — le **BrandStrip 5 marques fournisseurs** juste après la marquise
4. `home-v07-mobile.png` — page entière sur 375 px (marquise hauteur 60 px + BrandStrip)

## Pages nouvelles à capturer (cible publication PR)

5. `configurateur-desktop.png` — `http://localhost:3000/configurateur`
   (sélecteur 7 onglets + SVG hotspots numérotés + panneau détail à droite)
6. `assisteo-maintenance-desktop.png` — `http://localhost:3000/assisteo-maintenance`
   (Section A vidéo-assistance + Section B 3 contrats côte à côte)

## Prefers-reduced-motion

Captures recommandées en activant `prefers-reduced-motion: reduce` (Chrome
DevTools → Rendering → Emulate CSS media feature) pour vérifier que la
marquise et le BrandStrip restent visibles statiques (animation arrêtée).

## Lighthouse à lancer en parallèle

```bash
# Desktop
npx lighthouse http://localhost:3000/ --view --preset=desktop
npx lighthouse http://localhost:3000/configurateur --view --preset=desktop
npx lighthouse http://localhost:3000/assisteo-maintenance --view --preset=desktop

# Mobile (default)
npx lighthouse http://localhost:3000/ --view
```

Recoller les scores réels dans `CHANGELOG-V0.7.md` section « Score Lighthouse ».

---

**Note** : si une session Claude Code ultérieure a accès à Chrome MCP /
Playwright, ces captures pourront être automatisées. Actuellement scope
manuel pour Emin.
