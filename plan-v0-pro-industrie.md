# Plan V0 — AcceFerm Pro & Industrie

> Fondation stratégique et technique pour la future boutique e-commerce
> n°1 des solutions de fermeture pour professionnels & industries.
>
> **Concurrent principal audité** : ACCESSO-FERM SA (Cormeilles-en-Parisis, 95 — depuis 1978)
> **Date** : 19 avril 2026
> **Statut** : ébauche fondation — à valider par Emin avant sprint d'implémentation.

---

## 0. CADRAGE — pourquoi ce pivot, pourquoi maintenant

### L'opportunité en une phrase
**ACCESSO-FERM est le leader historique d'un marché (fermetures automatiques pro/industrie) mais vit sur une plateforme Oxatis figée en 2016, non responsive, sans schema.org, sans contenu, sans vrai B2B digital. Un entrant moderne peut capter une part significative sans avoir à inventer le marché — il est déjà là.**

### Ce qu'on garde du projet AcceFerm existant (CLAUDE.md actuel)
- IEF & CO comme cœur opérationnel (SIRET, 15 ans de terrain IDF, SAV réel, réseau installateurs).
- Fournisseurs déjà négociés : AFCA/V2 (vague 1), Roger Technology (vague 1), Trenois-Decamps et Intégral Système (vague 2), Motor Line et Came (vague 3).
- Contrainte AFCA : pas de prix motorisation en ligne (traité en devis).
- Contrainte religieuse : pas de dropshipping.
- Règle du 70 % : MVP d'abord, raffinage après premières ventes.

### Ce qui pivote
- **Cible principale** : on quitte le B2C grand public casual pour cibler **l'installateur pro récurrent** (métallier, électricien, serrurier, ascensoriste) et la **maîtrise d'ouvrage technique** (bailleurs sociaux, syndics de grande copro, collectivités, DAF industrielles).
- **Positionnement** : de "boutique d'accessoires portail" → "plateforme d'approvisionnement + expertise fermeture automatique pro/industrie".
- **Ambition** : devenir en 24-36 mois le n°1 digital FR sur ce segment.

### Question bloquante à trancher avant d'aller plus loin
**CLAUDE.md doit-il être réécrit en mode pro/industrie ?** Plusieurs lignes actuelles (B2C Leboncoin Pro, eBay Pro, Amazon FBM) deviennent secondaires. La cartographie fournisseurs et les règles de sécurité techniques restent valides — mais la vision, les objectifs CA, et les canaux de vente doivent basculer. Propose une session de 20 min pour refaire CLAUDE.md v2 (pilier n°1 du sprint 1).

---

## 1. CIBLES CLIENTS — priorités et personae

### Priorité 1 — L'installateur pro récurrent (60 % du revenu cible)

**Profil** : métallier, électricien courant faible, serrurier industriel, ascensoriste, artisan portail. 1 à 15 salariés. Panier moyen 200-800 € HT. Fréquence : 2 à 10 commandes/mois. Zone principale IDF + régions par extension.

**Douleurs observées chez ACCESSO-FERM** :
- Pas d'espace pro digne : pas de re-commande 1-clic, pas d'historique factures, pas de paiement 30j visible.
- Tunnel de commande ASP legacy sans mobile.
- Pas de grille HT différenciée par volume.
- Pas d'accès rapide aux notices et schémas de câblage pendant un chantier.

**Ce que AcceFerm Pro doit offrir** :
- Compte pro validé SIRET < 2h ouvrées.
- Commande rapide par **collage de codes** ou **import CSV**.
- Historique de chantier (archiver un panier par référence chantier).
- Paiement 30j à terme dès 3e commande, encours géré.
- Notices PDF + schémas de câblage accessibles sans login.
- Disponibilité stock **temps réel** + délai expédition garanti.
- SAV technique IEF & CO joignable de 8h à 19h + vidéo-assistance Assistéo.

### Priorité 2 — Maîtrise d'ouvrage technique (25 % du revenu cible)

**Profil** : responsable patrimoine bailleur social, syndic grande copro (>50 lots), technicien collectivité, responsable maintenance site industriel/logistique.

**Douleurs** : pas d'interlocuteur unique, cycles d'achat long avec validation budgétaire, besoin de fiches conformes (EN 12453, EN 13241-1), garanties étendues, SAV contractualisé.

**Ce qu'on doit offrir** :
- Demande de devis par typologie de projet (pas un formulaire générique).
- Fiches produit avec **normes explicites** (EN 12453, IP, CE).
- Contrats cadres annualisés pour rénovation de parc.
- Formulaires d'appel d'offres simplifiés avec téléchargement fiches techniques groupées.
- Référent commercial IDF dédié pour les comptes > 10k € HT/an.

### Priorité 3 — Particulier averti (15 % du revenu cible)

**Profil** : propriétaire de maison individuelle motorisée qui veut remplacer un accessoire précis sans passer par installateur. Utilisateur qui cherche "référence exacte + compatibilité".

**Rôle stratégique** : capter via SEO longue traîne ("remplacer photocellule portail Nice", "panne photocellule ne se ferme plus") **et transformer les cas complexes en leads pose IEF IDF** (double-dip). Faible panier moyen mais volume possible.

---

## 2. CATALOGUE V0 — quoi vendre, dans quel ordre

### Logique : attaquer là où ACCESSO-FERM est profond, on est au moins aussi bon sur les catégories cœur

ACCESSO-FERM annonce 5 000+ références. V0 AcceFerm Pro vise **150-250 SKU** lancés en 90 jours, couvrant 80 % des besoins installateurs récurrents. On complète à 500-1000 SKU d'ici la fin d'année 1.

### Prioritisation en 3 vagues

**Vague 1 (J0 → J+30) — 80 SKU "commodités installateur"**
- Accessoires sécurité : photocellules filaires 12/24V (V2, équivalents génériques), barres palpeuses filaires EN 12453 (3 longueurs), feux clignotants 230V et 24V LED, sélecteurs à clé encastrés et saillie.
- Commande : récepteurs radio 433 MHz 2/4 canaux, télécommandes rolling-code universelles, claviers à codes IP65 filaires et sans fil.
- Alimentation & armoires : alimentations 24V DC, batteries de secours, fusibles.
- Pièces détachées les plus demandées AFCA/V2 et Roger Technology.

**Vague 2 (J+30 → J+60) — +70 SKU "contrôle d'accès & interphonie"**
- Via Intégral Système (fournisseur vague 2 CLAUDE.md) : interphonie GSM 4G sans abonnement, visiophonie filaire, centrales VIGIK, lecteurs badges RFID, serrures électriques encastrées 12V, ventouses magnétiques.
- Gisement : ACCESSO-FERM a cette catégorie mais elle est moyennement traitée (pages pauvres, sans comparatif). Opportunité SEO + conversion.

**Vague 3 (J+60 → J+90) — +80 SKU "motorisation et kits complets"**
- Motorisations Roger Technology (prix visibles, prix de vague 1 fournisseur).
- Motorisations AFCA/V2 en **devis uniquement** (clause contractuelle) avec calculette de pré-qualif : "portail coulissant, 400 kg, usage intensif → 3 kits proposés, prix sur devis < 24h".
- Kits complets portail battant / coulissant / porte de garage assemblés (marge kit > 100 %).

### Catégories **reportées en V1** (mois 4+)
- Fabrication sur mesure (portails, grilles, portes rapides) — nécessite atelier IEF, chaîne devis complexe, métré client, pas un MVP.
- Portes industrielles rapides (Hörmann, Ditec) — sourcing complexe, volume unitaire élevé, ROI incertain en v0.
- Ascensoriste / portes d'ascenseur — niche à forte valeur mais cycle de vente long et installation réglementée.

### Politique prix
- **Prix HT par défaut** (cible pro) avec bascule HT/TTC persistante côté user.
- Marge cible : **90 % minimum** sur accessoires (cohérent CLAUDE.md), **120 %+** sur petits consommables, **60-80 %** sur motorisations Roger (plus tendu mais volume), kits complets visés **100 %+**.
- **3 grilles tarifaires automatiques** selon statut compte pro : Particulier (TTC) / Pro Silver (HT -5 %) / Pro Gold (HT -10-15 %) selon volume cumulé 12 mois glissants.

---

## 3. DÉCISION STACK TECHNIQUE — la vraie question du sprint 1

### Deux chemins opposés

| Critère | **Option A — WooCommerce sur IONOS (CLAUDE.md actuel)** | **Option B — Headless Next.js + Medusa/Saleor (audit recommandation)** |
|---|---|---|
| Time-to-market v0 | **30-60 jours** (stack installée, commandes passent dès J+14) | 120-180 jours (réécriture from scratch) |
| Coût v0 | ~500 € (plugins B2B, cache, SEO) | 20-40 k€ (dev + infra Vercel/Cloudflare + PIM + CMS headless) |
| Performance Core Web Vitals | LCP 2-3 s atteignable avec LiteSpeed + Cloudflare, **insuffisant pour battre un site optimisé** | LCP < 1,5 s atteignable, **cible optimale** |
| Ecosystème B2B | **B2B for WooCommerce / B2BKing** (plugins matures, compte pro + grilles + devis en natif) | À construire / intégrer (Medusa a un module B2B récent mais moins mature) |
| SEO avancé (Schema.org, ISR) | Plugins SEO + RankMath = bon mais bridé | **Contrôle total** : JSON-LD partout, ISR par produit |
| IA / configurateur / recherche | Algolia/Meilisearch intégrables mais lourds en WP | Natif, architecture prévue pour |
| Risque de re-plateforming à 18 mois | Élevé si volume explose | Faible |
| Compétence équipe | PHP / WP existant, connu d'Emin | Next.js / Node.js — compétence à acquérir ou à externaliser |

### Recommandation — **Stratégie "WooCommerce maintenant, headless demain" (hybride progressif)**

1. **v0 MVP en WooCommerce IONOS** pour ouvrir la boutique en 60 jours, valider le marché, générer du CA.
2. **Architecture de contenu propre dès j1** : structure de catégories, taxonomies ACF, schemas enrichis, URLs canoniques — pensée pour migrer headless sans casser les permaliens.
3. **Découplage progressif** : au mois 6, ajouter une couche frontale Next.js **uniquement sur les pages stratégiques SEO** (catégories piliers, guides) en consommant l'API REST WooCommerce. Le tunnel d'achat reste WP.
4. **Full headless au mois 18** si CA > 500 k€ annuels et besoin de performance/configurateur complexe.

### Exceptions qui feraient basculer vers l'Option B immédiatement
- Budget dev disponible > 30 k€ dès maintenant : va direct en headless, on gagne 18 mois.
- Entrée d'un associé ou d'un business angel tech : idem.
- Contrat industriel signé à 200k€/an dès démarrage justifiant la stack premium.

**À trancher par Emin** : lequel des 3 scénarios ci-dessus s'applique ? Si aucun → Option A hybride, décision prise, on avance.

---

## 4. CE QU'ON DOIT ÉGALER SUR ACCESSO-FERM (forces à neutraliser)

Ne pas sous-estimer l'incumbent. Voici ce qu'ils font **bien** et qu'on doit avoir au lancement :

1. **Profondeur catalogue perçue** : 5 000+ réf, on part à 150-250. **Compensation** : structurer les 150 SKU en storytelling catégorie + "sur commande sous 48-72h" pour les réf non stockées (drop fournisseur).
2. **Prix HT par défaut** : cible pro respectée. À conserver.
3. **Notices PDF sur fiches** : basique mais présent. Rendre obligatoire sur chaque fiche AcceFerm.
4. **Catalogue Calaméo téléchargeable** : génère des téléchargements. On fera mieux avec **catalogue PDF généré dynamiquement** + version filtrable en ligne.
5. **4 numéros de téléphone dédiés** (commercial, expédition, SAV, admin) : rassurant. Copier : 3 numéros (commercial/pose IEF / SAV technique / compta).
6. **47 ans d'ancienneté affichés** : on n'en a pas. **Compensation** : capitaliser sur les 15 ans d'IEF & CO ("IEF & CO, 15 ans de terrain en IDF, lance AcceFerm Pro") + référentiel client IEF existant (photos chantiers, devis anonymisés, avis Google IEF).
7. **SAV réel avec humains joignables** : AcceFerm doit s'aligner dès j1 — standard téléphonique 8h-19h Lundi-Vendredi.

---

## 5. LES 12 ATTAQUES FRONTALES — où ACCESSO-FERM est faible

Classement par ROI (impact/effort) décroissant.

| # | Attaque | Faiblesse ACCESSO-FERM | Implémentation v0 (WooCommerce) |
|---|---|---|---|
| 1 | **Mobile-first responsive** | Site non responsive, pinch-zoom obligatoire | Thème Astra + Spectra déjà en place — validation RGAA AA |
| 2 | **Schema.org JSON-LD complet** | Zero structured data | Plugin RankMath + code custom Product/Offer/Organization/BreadcrumbList/FAQ/HowTo |
| 3 | **Fiches produit enrichies** | Photo unique fond blanc, pas de vidéo, pas d'avis, pas de cross-sell | Galerie 5-8 photos + vidéo YouTube embed + onglets (Caractéristiques / Compatibilité / Notice / Avis) + Avis Vérifiés |
| 4 | **Hub éditorial SEO** | Zero blog, zero guide | 30 articles piliers (plan SEO déjà rédigé en repo) : guides achat, symptômes, tutos |
| 5 | **Espace pro complet** | Pas d'espace client chantier | Plugin B2B for WooCommerce : grilles HT, historique, factures PDF, re-commande 1-clic |
| 6 | **Recherche instantanée à facettes** | Recherche basique sans autocomplétion | Meilisearch (self-hosted IONOS) + filtres puissance/tension/marque/usage |
| 7 | **Devis structuré par typologie** | Formulaire contact générique | 4 formulaires SureForms dédiés : motorisation / contrôle accès / fab sur mesure / SAV |
| 8 | **Configurateur kit portail** | Absent | v0 simple : 5 questions (type portail, dimensions, poids, usage, tension) → 3 kits recommandés |
| 9 | **Paiement moderne + 30j pro** | CB uniquement, pas de virement pro pas de 30j | Stripe + virement SEPA pro + **Alma 3-4x** + 30j à terme compte pro validé |
| 10 | **Vidéo-assistance pose Assistéo** | Totalement absent | Bon offert dès 300 € achat motorisation (hook CLAUDE.md Assistéo) |
| 11 | **IA diagnostic panne** | Inimaginable chez eux | v0 différé mois 3-6 : upload photo armoire → suggestion modèle + pièces compatibles |
| 12 | **Copyright / dates récents** | Copyright 2016 = signal de mort | Footer dynamique + actu "dernière commande expédiée il y a X min" |

**Principe directeur** : sur les 7 premières attaques (#1 à #7), AcceFerm doit être **supérieur dès j+60**. Les 5 suivantes (#8 à #12) sont des différenciateurs progressifs mois 3-6.

---

## 6. ARCHITECTURE DE L'INFORMATION — arbo v0

### Silos principaux (menu primaire, inspiré ACCESSO-FERM + améliorations)

```
Menu primaire (7 entrées, alignement concurrent + prise de position Pro/Industrie)

1. Motorisation
   ├── Portails battants        (Roger visibles / AFCA en devis)
   ├── Portails coulissants     (idem)
   ├── Portes de garage         (sectionnelles, basculantes)
   ├── Portes rapides           (mois 6+)
   └── Rideaux métalliques      (mois 6+)

2. Accessoires & Sécurité        [ANGLE FORT V0]
   ├── Photocellules & barres palpeuses
   ├── Feux & signalisations
   ├── Commandes radio          (récepteurs, émetteurs, antennes)
   ├── Claviers & sélecteurs
   └── Alimentation & batteries de secours

3. Contrôle d'accès              [ANGLE FORT V0 via Intégral Système]
   ├── Interphonie GSM & filaire
   ├── Visiophonie
   ├── VIGIK & badges
   ├── Serrures électriques
   └── Centrales & lecteurs

4. Pièces détachées              [ANGLE FORT V0 — moat SEO]
   └── Par marque (AFCA/V2, Roger, Came, Nice, FAAC, BFT, Somfy, Ditec, Sommer)

5. Fabrication sur mesure       [Différé V1 — placeholder "bientôt disponible"]

6. Ressources                    [HUB ÉDITORIAL]
   ├── Guides d'installation
   ├── Symptômes & diagnostic
   ├── Notices & schémas
   ├── Calculateurs (dimensionnement moteur)
   └── Glossaire technique

7. Espace Pro                    [DIFFÉRENCIATEUR CLÉ]
   ├── Grilles tarifaires HT
   ├── Commande rapide (codes / CSV)
   ├── Historique de chantiers
   ├── Factures & devis
   └── Paiement 30j
```

### Filtres à facettes (sur chaque catégorie)
- Marque
- Tension (12V, 24V, 230V)
- Puissance / poids vantail max
- Usage (résidentiel, collectif, industriel intensif)
- Stock (en stock / sous 48-72h / sur commande)
- Certification (EN 12453, IP65, CE)
- Gamme prix
- **Filtre "compatible avec mon moteur"** (unique, différenciant — saisie modèle moteur existant)

### Pages piliers SEO (silos de contenu)
- `/guide-achat/motorisation-portail-battant/`
- `/guide-achat/motorisation-portail-coulissant/`
- `/comment-faire/remplacer-photocellule-portail/` (déjà rédigé en repo)
- `/comment-faire/installer-feu-clignotant/`
- `/diagnostic/portail-ne-ferme-plus/`
- `/installateur-motorisation-portail/paris-75/`
- `/installateur-motorisation-portail/hauts-de-seine-92/`
- `/installateur-motorisation-portail/seine-saint-denis-93/`
- `/installateur-motorisation-portail/yvelines-78/`

Les pages géolocalisées sont des **portes d'entrée lead IEF** (double-dip déjà théorisé dans `analyse-concurrence.md`).

---

## 7. FEATURES V0 — ce qui est dans le MVP, ce qui attend

### MUST-HAVE dès j+60 (V0 launchable)

- Catalogue 150 SKU vague 1 importé avec fiches enrichies (galerie 5 photos min + notice PDF + conseil expert).
- Thème enfant Astra (règle CLAUDE.md).
- Plugin B2B for WooCommerce ou B2BKing : 3 grilles tarifaires, comptes pro SIRET.
- Stripe + virement SEPA pro + Alma 3-4x.
- Schema.org JSON-LD sur Product, Organization, LocalBusiness, Breadcrumb.
- Core Web Vitals : LCP < 2,5s, CLS < 0,1, INP < 300ms (via LiteSpeed + Cloudflare + images AVIF).
- 10 articles de blog SEO piliers publiés (recyclage des brouillons déjà dans `articles/`).
- 4 formulaires devis dédiés (motorisation, contrôle accès, fab, SAV).
- Espace pro basique (historique, re-commande, facture PDF).
- Avis Vérifiés activé dès j+30 pour capter les premières preuves sociales.
- CMP RGPD Axeptio (gratuit jusqu'à 10k MTU) ou Tarteaucitron auto-hébergé.
- Google Business Profile AcceFerm Pro validé + lien IEF & CO.

### NICE-TO-HAVE mois 3-6

- Configurateur simple portail (5 questions → 3 kits).
- Meilisearch recherche instantanée à facettes.
- Paiement 30j à terme compte pro validé (pilote 5 comptes puis ouverture).
- Vidéo-assistance Assistéo v0 (Google Meet + Cal.com).
- PWA (manifest + service worker offline pour notices).
- Programme de parrainage installateurs (code promo 5 % + 5 %).
- Newsletter segmentée (Brevo / Mailjet) : pro vs particulier.
- 20 autres articles SEO publiés (plan déjà en repo).

### NEVER-IN-V0 (refus assumé, à revisiter après validation marché)

- IA diagnostic panne (cher, faux départ si volume < 500 tickets/mois).
- Recherche visuelle (reconnaissance photo moteur) — même raison.
- Fabrication sur mesure en configurateur interactif (métré, calcul prix live).
- Plateforme de formation e-learning certifiante pour installateurs (différé an 2).
- App native iOS/Android (PWA suffit, coût >> ROI).

---

## 8. ROADMAP 30 / 60 / 90 JOURS

### Sprint 1 — J0 à J+30 : fondation technique + B2B

**Objectif** : boutique fonctionnelle, 50 SKU en ligne, 5 comptes pro en test, première commande réelle.

| Semaine | Livrables |
|---|---|
| S1 | CLAUDE.md v2 (pivot pro/industrie) — thème enfant Astra créé — audit Stripe + test paiement 1 € — backup DB — plugin B2B for WooCommerce installé |
| S2 | Import 50 SKU vague 1 (photocellules, feux, récepteurs, claviers) — fiches enrichies manuellement — Schema.org Product/Breadcrumb |
| S3 | Compte pro SIRET + grille HT — page "Espace Pro" — 3 formulaires devis SureForms — Avis Vérifiés — GBP validé |
| S4 | Core Web Vitals audit + fix (LiteSpeed, Cloudflare, AVIF) — 5 articles SEO publiés — première commande test pro réelle |

### Sprint 2 — J+30 à J+60 : contenu + contrôle d'accès + conversion

**Objectif** : doubler le catalogue, pousser le SEO, ouvrir le canal IEF IDF en vidéo-assistance.

| Semaine | Livrables |
|---|---|
| S5 | Intégration fournisseur Intégral Système (vague 2) — import 70 SKU contrôle d'accès |
| S6 | Configurateur v0 (5 questions) — recherche Meilisearch — filtres facettes sur 3 catégories |
| S7 | 10 articles SEO additionnels — 4 pages locales IDF (75, 92, 93, 78) — Google Ads lancement 500 € budget test |
| S8 | Vidéo-assistance Assistéo v0 — bon offert sur fiche motorisation — première campagne emailing 200 installateurs IDF |

### Sprint 3 — J+60 à J+90 : motorisation + paiement pro + preuve sociale

**Objectif** : catalogue complet v0 (200+ SKU), ouverture paiement 30j, 20 comptes pro actifs, 10 leads IEF via site.

| Semaine | Livrables |
|---|---|
| S9 | Motorisations Roger Technology (prix visibles) importées — calculette devis motorisation AFCA |
| S10 | 5 kits complets assemblés (marge > 100 %) — cross-sell automatique — comparateur produits |
| S11 | Paiement 30j à terme pour 5 comptes pro pilotes — intégration Axonaut/Sellsy pour factu et encours |
| S12 | 10 études de cas chantiers IEF (photos, sans visage — CLAUDE.md) — compteur dynamique home (années d'expérience + commandes livrées + avis moyen) |

### Gate de validation fin J+90

- CA > 5 k€ HT cumulés ? ✅/❌ → continuer ou pivoter.
- 20+ comptes pro actifs ? ✅/❌
- Top 10 Google sur 5 requêtes SEO cibles ? ✅/❌
- Core Web Vitals "Bon" sur 80 % pages ? ✅/❌
- Panier moyen pro > 200 € HT ? ✅/❌

Si 3/5 validés → passage sprint 4 (mois 4-6) : fabrication sur mesure, paiement 30j ouvert, sister-brand éventuelle.
Si < 3/5 → revue CLAUDE.md, diagnostic racine, itération avant plus d'investissement.

---

## 9. KPIs À SUIVRE DÈS J0

| KPI | Fréquence | Cible J+90 | Outil |
|---|---|---|---|
| Sessions site | hebdo | 3 000/mois | GA4 + Plausible |
| Taux de conversion B2C | hebdo | 1,5 % | GA4 |
| Taux de conversion B2B (compte pro) | hebdo | 4 % | Plugin B2B + GA4 |
| Panier moyen B2C / B2B | hebdo | 80 € / 250 € HT | WooCommerce |
| Nombre de comptes pro validés | hebdo | 20 | Plugin B2B |
| Leads IEF générés via site | hebdo | 8 | SureForms + notif Emin |
| Position moyenne 20 mots-clés cibles | mensuel | top 10 sur 5 / top 20 sur 15 | Search Console + Ahrefs trial |
| Core Web Vitals (75 %) | hebdo | LCP < 2,5s sur 80 % | PSI + Cloudflare Web Analytics |
| Avis Vérifiés note moyenne | mensuel | > 4,5/5 | Avis Vérifiés |
| CAC / LTV estimé | mensuel | CAC < 40 €, LTV estimée > 300 € | calcul manuel |

---

## 10. RISQUES & MITIGATIONS

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Sous-estimation charge éditoriale (30 articles SEO en 90 j) | haute | haut | Recycler brouillons déjà en repo, externaliser rédaction tech à rédacteur spécialisé 0,05 €/mot si budget |
| Clause AFCA mal respectée (prix motorisation exposé) | moyenne | **très haut** (rupture contrat) | Review légal + test QA sur chaque nouvelle fiche motorisation avant publication |
| Performance WooCommerce insuffisante (Core Web Vitals) | moyenne | moyen | Budget headless mis en réserve pour bascule mois 12-18 si nécessaire |
| Concurrence directe de ACCESSO-FERM qui modernise | faible | haut | Suivi veille trimestriel. Avantage du premier entrant sur le mobile et le pro digital |
| Trésorerie tendue CLAUDE.md → sprint ralenti | haute | moyen | Priorisation stricte must-have / nice-to-have, validation Emin toute dépense > 50 € |
| Saturation capacité IEF pose si leads IDF affluent | moyenne | moyen | Seuil d'alerte à 10 leads pose actifs/semaine → recruter sous-traitant pose validé ou fermer le CTA |
| Oxatis améliore ACCESSO-FERM avant qu'on soit prêt | faible | haut | Accélérer time-to-market, ne pas dépasser 90 j pour le V0 |

---

## 11. BESOINS HUMAINS & BUDGET V0

### Équipe 90 jours

- **Emin** : direction produit + commercial pro + pilotage IEF (100 %).
- **Claude (agent)** : configuration tech WordPress, import SKU, rédaction SEO, Schema.org, intégrations plugins, QA (tâches déléguées).
- **Rédacteur SEO externe** (optionnel) : 15 articles × 1 500 mots × 0,05 €/mot = 1 125 €. Accélère S5-S8.
- **Intégrateur WordPress freelance** (optionnel) : 5-10 j × 400 €/j = 2-4 k€ pour features custom (configurateur, calculette, intégration facturation).
- **Photographe produit** (1 session) : 500-800 € pour 50 photos studio fond blanc (ou IA Gemini comme prévu CLAUDE.md — gratuit).

### Coûts tech récurrents 90 jours

| Poste | Coût | Notes |
|---|---|---|
| IONOS Web Plus | ~15 €/mois | Déjà payé |
| Plugin B2B for WooCommerce | 149 €/an | |
| Avis Vérifiés | ~30 €/mois | |
| Meilisearch (self-hosted IONOS) | 0 € | |
| Axeptio CMP | 0 € jusqu'à 10k MTU | |
| Alma paiement | 0 € installation + commission par transaction | |
| Google Ads test | 500 € lot unique | Sprint 2 |
| Cloudflare Pro (optionnel) | 20 €/mois | Si besoin images massives |
| Emailing Brevo | 0 € jusqu'à 9k envois/mois | |

**Total tech 90 j** : ~600 € (sans dev externe) à ~5 000 € (avec dev externe + rédacteur).
**Cohérent avec CLAUDE.md trésorerie tendue** : démarrer sans externe, recruter seulement si validation gate J+30.

---

## 12. QUESTIONS OUVERTES POUR EMIN

À trancher avant d'ouvrir le sprint 1.

1. **CLAUDE.md v2** : je le réécris dans la foulée en mode pro/industrie ? Ou tu préfères partir de ce plan et mettre à jour CLAUDE.md plus tard ?
2. **Stack** : tu valides l'Option A hybride (WooCommerce maintenant, headless progressif) ? Ou tu as un budget/partenaire tech qui permet l'Option B directement ?
3. **Marque** : on garde le nom "AcceFerm" en repositionnant en "AcceFerm Pro & Industrie" ? Ou on crée une sister-brand dédiée (ex : `AcceFerm-Pro.fr`, `AcceFerm-Industrie.com`) qui éviterait la confusion avec un éventuel vrai B2C futur ?
4. **Périmètre géo SAV/pose IEF** : IDF uniquement (cohérent capacité IEF actuelle) ou ouverture France entière dès j0 avec sous-traitance ?
5. **Paiement 30j à terme** : risque crédit client + gestion encours = coût caché. On l'offre pour 5 pilotes ou on attend mois 6 ?
6. **Gestion ACCESSO-FERM en veille** : est-ce qu'on monitore activement ? (bon angle : screenshot trimestriel + diff — 15 min tous les 3 mois)
7. **CA cible v0 (J+90)** : CLAUDE.md mentionnait 10k€ à 2 mois pour l'ancienne stratégie B2C. Quel objectif réaliste pour la version pro/industrie ?

---

**Fin du document.**

Prochaine action que je propose dès validation :
- Si tu valides le plan → je crée les 3 issues GitHub "Sprint 1 semaine 1-2-3-4" avec les livrables décomposés, et je réécris CLAUDE.md en v2 pro/industrie.
- Si tu veux d'abord discuter / ajuster → dis-moi les sections à creuser et je les développe.
