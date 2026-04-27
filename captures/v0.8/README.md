# Captures v0.8 — instructions de prise

> Cette session Claude Code a tourné en CLI sans navigateur disponible.
> Les captures avant/après doivent être prises par Emin en local.
> Format attendu : PNG, viewport 1440 × 900 (desktop) et 375 × 812 (mobile).

## Avant (référence v0.7.1)

```bash
git switch iteration-v07-2026-04
cd storefront && npm run build && npm run start
```

À capturer :

1. `nav-v07-desktop.png` — Nav primaire 5 onglets v0.7 (Catalogue / Configurateur / Assistéo / Pro / Contact)
2. `catalogue-v07-photocellues.png` — atterrissage par défaut sur `/catalogue/photocellules` (bug UX v0.7)
3. `configurateur-v07.png` — page `/configurateur` v0.7

## Après (cette branche v0.8)

```bash
git switch iteration-v08-2026-04
cd storefront && npm run build && npm run start
```

À capturer :

### Nouvelle nav

4. `nav-v08-desktop.png` — Nav 5 onglets v0.8 (Catalogue / **Sur-mesure & Fabrication** / Assistéo / Pro / Contact)

### Page hub /catalogue

5. `catalogue-hub-desktop.png` — `/catalogue`, vue desktop (10 familles + best-sellers + promos + cross-link)
6. `catalogue-hub-mobile.png` — idem, mobile 375 px (grille 2 cols)
7. `catalogue-floating-button.png` — bouton flottant en bas à droite (icône loupe + texte « Aide à identifier »)
8. `catalogue-floating-compact.png` — après scroll > 200 px, le texte se rétracte (icône seule)

### Page catégorie /catalogue/[slug]

9. `catalogue-organes-securite-desktop.png` — `/catalogue/organes-securite` avec FamilySelector tabs en haut
10. `catalogue-organes-securite-bottom.png` — bandeau DiagnosticCta variant=category en bas
11. `catalogue-mobile-tabs-scroll.png` — tabs FamilySelector scrollables horizontalement sur mobile

### Nouvelle page /sur-mesure

12. `sur-mesure-hero-desktop.png` — Hero + 3 items confiance + CTA #devis
13. `sur-mesure-types-grid.png` — Grille 9 types (3 cols desktop)
14. `sur-mesure-process.png` — Process 4 étapes
15. `sur-mesure-form-desktop.png` — Formulaire devis avec tous les champs visibles
16. `sur-mesure-form-prefill.png` — `/sur-mesure?type=portail-coulissant-sur-mesure#devis` → champ Type pré-rempli

### Renommage assistant-diagnostic

17. `assistant-diagnostic-desktop.png` — page `/assistant-diagnostic` (nouveau nom + nouveau title H1 + sous-titre)
18. `redirect-301.png` — taper `/configurateur` dans la barre URL → redirection 301 vers `/assistant-diagnostic`
    Capture du Network tab DevTools montrant le 301.

## Prefers-reduced-motion

Captures recommandées en activant `prefers-reduced-motion: reduce` (Chrome
DevTools → Rendering → Emulate CSS media feature) pour vérifier que :
- Le bouton flottant ne fait plus de transition smooth (rétraction instantanée)
- Le sélecteur de familles tabs ne fait plus de scroll-smooth

## Lighthouse à lancer

```bash
# Desktop
npx lighthouse http://localhost:3000/catalogue --view --preset=desktop
npx lighthouse http://localhost:3000/sur-mesure --view --preset=desktop
npx lighthouse http://localhost:3000/assistant-diagnostic --view --preset=desktop

# Mobile (default)
npx lighthouse http://localhost:3000/catalogue --view
```

Recoller les scores réels dans `CHANGELOG-V0.8.md` section « Score Lighthouse ».

## Tests interactifs à valider

- [ ] Click sur card famille `/catalogue` → navigue vers `/catalogue/[slug]` correspondant
- [ ] Click sur tab FamilySelector → navigue entre familles
- [ ] Bouton flottant `/catalogue` → click navigue vers `/assistant-diagnostic`
- [ ] Bouton flottant `× fermer` → disparaît, ne réapparaît pas dans la session courante
- [ ] Reload onglet → bouton flottant disparu (sessionStorage)
- [ ] Nouvel onglet du même domaine → bouton flottant réapparaît (session différente)
- [ ] Bouton flottant invisible sur `/`, `/sur-mesure`, `/assisteo-maintenance`, `/pro`, `/contact`, `/produit/...`
- [ ] CTA card sur-mesure → ouvre `/sur-mesure#devis?type=...` et le champ Type est pré-rempli au formulaire
- [ ] Submit formulaire devis → ouvre client mail avec subject `[Devis sur-mesure] — [type] — [société]`
- [ ] `/configurateur` (URL directe) → redirect 301 vers `/assistant-diagnostic`

---

**Note** : si une session Claude Code ultérieure a accès à Chrome MCP /
Playwright, ces captures pourront être automatisées. Actuellement scope
manuel pour Emin.
