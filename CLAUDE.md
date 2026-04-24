# CLAUDE.md — Projet AcceFerm Pro & Industrie

> Fichier de contexte permanent pour Claude Code. Lu automatiquement à chaque session.
> **Version 3** — recadrage méthodologique + orchestration super-agents. Remplace la v2 (4 commits : `601f6c6` → `5ce795c`).
> Dernière mise à jour : 25 avril 2026.

---

## 🚨 RÈGLE N°2 — NO FEATURE BEFORE MONEY-PATH (NON-NÉGOCIABLE)

Tant que le flux suivant ne fonctionne pas bout-en-bout, **aucune nouvelle page, section, animation, ou refacto cosmétique** n'est acceptable :

```
Visiteur → Catalogue → Fiche produit → Panier → Checkout →
Paiement Stripe réel → Confirmation →
Commande persistée en DB → Notification email → Facture PDF →
Remontée Odoo
```

**État actuel : 0 % du money-path implémenté.** La maquette est riche (373 pages, 22 sections home, design award-worthy) mais **aucune commande ne peut être encaissée**. BUSINESS_AGENT bloque toute PR qui dévie.

Exception unique : ordre explicite d'Emin documenté dans le PR body.

---

## 🤖 MODE ORCHESTRATEUR — 8 SUPER-AGENTS

Claude n'exécute plus en solo. Face à une demande, Claude délègue via le tool `Agent` au super-agent concerné. Chartes complètes dans `.claude/agents/` :

| Agent | Rôle | Fichier |
|---|---|---|
| ARCHITECT | Cohérence technique Next.js 15 | `.claude/agents/architect.md` |
| SECURITY | Auth, secrets, masquage prix AFCA | `.claude/agents/security.md` |
| INTEGRATION | Stripe, Brevo, Odoo, CMS | `.claude/agents/integration.md` |
| SEO | Schema.org, sitemap, Core Web Vitals | `.claude/agents/seo.md` |
| UX | Parcours achat, mobile-first, WCAG AA | `.claude/agents/ux.md` |
| DEVOPS | Vercel, CI/CD, monitoring | `.claude/agents/devops.md` |
| **BUSINESS** | **Garant Règle n°2 — veto money-path** | `.claude/agents/business.md` |
| COMPLIANCE | AFCA + RGPD + CGV + DGFiP | `.claude/agents/compliance.md` |

Chaque super-agent peut créer des sous-agents pour tâches granulaires.

---

## 🎯 PÉRIMÈTRE DE DÉCISION

### Autonomie totale (Claude + agents décident seuls)

- Architecture technique, patterns Next.js 15
- Choix librairies **non-payantes** (open source, licence permissive)
- Sécurité applicative (auth, validation, chiffrement)
- Performance (SSG, ISR, edge, cache)
- Refactos et dette technique (si pas bloquant money-path)
- Tests, CI/CD, déploiement Vercel preview
- Conventions code, linting, formatting
- Structure DB (Payload/Prisma/schéma Postgres)
- SEO technique (Schema, sitemap, meta)
- Priorisation intra-sprint

### ⚠️ Validation Emin OBLIGATOIRE

- Fonctionnel métier (quoi vendre, comment, à qui)
- Dépenses récurrentes nouvelles > 10 €/mois
- Intégrations tierces payantes (Stripe fees, Brevo, CMS payant)
- Suppression de fonctionnalités existantes
- Changement stack majeur (abandon Next.js, etc.)
- Communication publique, copy commercial
- Prix, marges, promotions
- Données clients pros (RGPD, conservation, partage)
- Relations fournisseurs (AFCA / V2 / Roger / Intégral)
- **Merge dans `main`** + déploiement prod

---

## ⚖️ CONTRAINTES MÉTIER CRITIQUES (vérifiées par COMPLIANCE_AGENT)

1. **Clause AFCA** : aucun prix motorisation affiché public. Prix visibles uniquement dans l'espace pro authentifié. **NON-NÉGOCIABLE.**
2. **`lib/suppliers.ts`** : INTERNE. Jamais exposé sur une route publique.
3. **RGPD** : données clients pros hébergées UE uniquement (Vercel EU, Supabase `eu-west-3`).
4. **E-invoicing DGFiP septembre 2026** : AcceFerm **ne gère PAS** la facture fiscale finale. La commande remonte en Odoo (ERP maître), qui émet la facture conforme via PDP. Champ `odoo_external_id` prévu sur toutes entités synchronisables dès les migrations V0.
5. **Plan de continuité fournisseurs** : anticiper dès mise en prod (contrats directs, alternatives). Escalader à Emin toute alerte commerciale.

---

## 🌐 ÉCOSYSTÈME IEF & CO

AcceFerm = branche digitale d'IEF & CO, pas société distincte.

| Brique | Rôle | État |
|---|---|---|
| **Odoo** | ERP maître : facturation + compta + DGFiP | En place chez IEF |
| **AcceFerm** (ce repo) | E-commerce B2B + lead-gen pose | V0 maquette |
| **IEF CORE** (repo `ief-p1-alpha`) | GMAO boostée IA | V0 monorepo |
| **Assistéo** | Vidéo-assistance technique | Brique future |

**Données à synchroniser avec Odoo à terme** :
- Commandes AcceFerm → devis/factures Odoo
- Clients pros → contacts Odoo CRM
- Leads pose IDF → opportunités CRM pipeline Chantiers
- Produits → catalogue Odoo (source unique à terme)

---

## 📞 COMMUNICATION AVEC EMIN

Emin dirige IEF & CO. Il **n'est pas dev**. Son temps est rare. Il est accompagné ponctuellement (1-2 semaines) par **Mehdi** (ami dev) sur revues architecture/sécurité.

Format attendu des rapports :
- Synthèse courte : **fait / bloqué / décision requise**.
- Détails techniques uniquement si demandé.
- Propositions avec **trade-offs chiffrés** pour décisions métier (coût récurrent, temps dev, maintenance).
- Pas de jargon inutile.
- Captures d'écran / screenshots de l'UI quand pertinent (visuel > texte pour valider UX).

---

## IDENTITÉ DU PROJET

**AcceFerm Pro & Industrie** = plateforme e-commerce française spécialisée en **solutions de fermeture automatique pour professionnels et industries** : installateurs (métalliers, électriciens courant faible, serruriers, ascensoristes, artisans portail), maîtrise d'ouvrage technique (bailleurs sociaux, syndics grande copro, collectivités, industries, logisticiens).

Division e-commerce de **IEF & CO** (SIRET existant, entreprise terrain serrurerie/métallerie/maintenance multi-technique, 15 ans d'expérience Île-de-France).

**Ambition 24-36 mois** : devenir le n°1 digital FR sur le segment fermeture pro/industrie, en capturant la part de marché d'ACCESSO-FERM (incumbent depuis 1978, plateforme Oxatis obsolète).

**Statut juridique actuel** : facturation et encaissement sous IEF & CO, ligne comptable séparée "revente matériel". Bascule vers SASU AcceFerm prévue une fois le CA stabilisé.

**Domaines réservés** : acceferm.fr (actif), acceferm.com, acceferm.store, acceferm.org.

---

## CIBLES CLIENTS (PRIORITÉS)

1. **Installateur pro récurrent** — 60 % du CA cible. Panier 200-800 € HT, fréquence 2-10 commandes/mois. Zone IDF puis régions. Attend : espace pro, re-commande 1-clic, paiement 30j, notices + schémas accessibles chantier, SAV technique joignable.
2. **Maîtrise d'ouvrage technique** — 25 %. Bailleurs sociaux, syndics >50 lots, collectivités, responsables maintenance industriels. Attend : devis par typologie, fiches avec normes explicites (EN 12453, EN 13241-1, IP65, CE), contrats cadres, référent commercial dédié >10k€/an.
3. **Particulier averti** — 15 %. Propriétaire qui cherche référence + compatibilité. Capter via SEO longue traîne, transformer cas complexes en leads pose IEF IDF (double-dip).

---

## VISION STRATÉGIQUE

1. **Capter la rente d'ACCESSO-FERM** par la modernité : responsive mobile-first, Schema.org complet, fiches enrichies (galerie + vidéo + avis + cross-sell), espace pro digne, hub éditorial, paiement pro 30j, vidéo-assistance.
2. **Arme SEO + lead-gen IEF & CO** : chaque page indexée = porte d'entrée lead pose IDF. Double-dip systématique : vente accessoire + lead pose IEF.
3. **Liberté géographique à terme** : réduire la dépendance au terrain physique via le canal digital.

**Objectifs chiffrés** :
- **Court terme (90 j)** : 5-10 k€ HT cumulés, 20+ comptes pro actifs, 10 leads pose IEF via site. *À ré-arbitrer avec Emin.*
- **Moyen terme (6 mois)** : AcceFerm Pro rentable et auto-financé, 500+ SKU, 50+ comptes pro actifs.
- **Long terme (18-36 mois)** : n°1 digital FR fermeture pro/industrie, intégration complète Assistéo, migration headless si CA > 500 k€ annuel.

---

## CONCURRENT PRINCIPAL — ACCESSO-FERM

- **URL** : https://www.accesso-ferm.fr
- **Société** : ACCESSO-FERM SA, 26 rue du Travers des Champs Guillaume, 95240 Cormeilles-en-Parisis.
- **Créé en** : 1978 (48 ans de légitimité métier).
- **Catalogue** : 5 000+ références, distributeur multi-marques (Ditec/Entrematic, Elsamec, CAME, BFT, VIGIK, modèles internes ALIZE/UNIKO/FACIL).
- **Forces** : profondeur catalogue, prix HT par défaut, notices PDF, 4 numéros téléphone dédiés (commercial/expédition/SAV/admin), SAV réel, ancienneté.
- **Faiblesses attaquables** : plateforme Oxatis non responsive, encoding windows-1252, jQuery 2011 (CVE), zéro Schema.org, zéro blog SEO, fiches produit pauvres (1 photo, pas de vidéo, pas d'avis, pas de cross-sell), espace client pro absent, tunnel ASP legacy, copyright figé 2016.
- **Audit complet** : voir échanges session 2026-04-20 + `plan-v0-pro-industrie.md` section 5 (12 attaques frontales).

---

## STACK TECHNIQUE

**Décision V0** : WooCommerce sur IONOS (hybride progressif, migration headless différée à 18 mois si volume le justifie — voir `plan-v0-pro-industrie.md` section 3).

| Composant | Valeur |
|---|---|
| Hébergement | IONOS Web Plus |
| CMS | WordPress 6.9.4 |
| E-commerce | WooCommerce 10.6.2 |
| Paiement | Stripe Gateway 10.5.3 (compte IEF & CO) + Alma 3-4x + virement SEPA pro |
| Thème | Astra 4.12.7 (parent) + **thème enfant AcceFerm** (obligatoire, à créer sprint 1) |
| B2B | Plugin B2B for WooCommerce ou B2BKing (à installer sprint 1) |
| Recherche | Meilisearch self-hosted sur IONOS (sprint 2) |
| SEO | RankMath + JSON-LD Schema.org custom |
| CMP RGPD | Axeptio (gratuit < 10k MTU) |
| Plugins actifs | ultimate-addons-for-gutenberg (Spectra 3.0.0-beta), astra-sites, sureforms, woocommerce, woocommerce-gateway-stripe |
| Version PHP serveur | 8.2.30 |
| WP-CLI serveur | 2.12.0 installé dans ~/bin/wp |
| CDN | Cloudflare |
| SEO monitoring | Google Search Console (sitemap soumis) |
| Emailing | Brevo (<9k envois/mois gratuit) |

---

## ACCÈS SERVEUR SSH (IONOS)

- **Host** : access-5020206686.webspace-host.com
- **Port** : 22
- **Utilisateur** : su244369
- **Protocole** : SFTP + SSH
- **Mot de passe** : Bitwarden entrée "IONOS SSH AcceFerm" — **JAMAIS en clair** dans un fichier, un commit, ou une session partagée.
- **Chemin WordPress** : /home/www/clickandbuilds/AcceFerm/
- **Alias WP-CLI** : `wp` une fois connecté (alias /usr/bin/php8.2 ~/bin/wp).

---

## FOURNISSEURS — VAGUES DE LANCEMENT

### Vague 1 (J0 → J+30) — Accessoires & sécurité
- **AFCA / V2** (Lyon/Genas) — Fabricant automatismes, armoires, accessoires. Livraison J+1 FR. Tarifs négociés.
  - ⚠️ **CLAUSE CRITIQUE** : interdiction de publier les prix des motorisations en ligne. Accessoires = prix visibles OK. Motorisations = devis uniquement.
  - ⚠️ **CLAUSE CRITIQUE** : références fournisseur AFCA jamais exposées publiquement (nomenclature AcceFerm à créer).
- **Roger Technology** (via Doorgate Portugal) — Motorisations résidentielles. **Pas de clause prix** (visibles). Délai ~1 semaine.

### Vague 2 (J+30 → J+60) — Contrôle d'accès & interphonie (cœur du pivot pro/industrie)
- **Intégral Système** (via Batifer) — Contrôle d'accès, VIGIK, interphonie GSM 4G, visiophonie, serrures électriques, ventouses magnétiques. Pas de restriction prix.
- **Trenois-Decamps** — Catalogue généraliste large, levier commercial acquis.

### Vague 3 (J+60 → J+90) — Motorisations & kits
- **Motor Line** (Portugal) — Fabricant, partenariat proposé, à acter.
- **Came** — Compte ouvert, tarifs standards, usage sur niches spécifiques.

### Écarté du lancement
- **Faac, Sommer** : pas de compte ouvert.
- **Foussier** : aucun avantage compétitif.

---

## CATALOGUE — PRINCIPES DE SÉLECTION

- **Marge brute cible** : ≥90 % sur accessoires, ≥120 % sur consommables, 60-80 % sur motorisations Roger (tendu mais volume), ≥100 % sur kits complets.
- **Volumétrie V0 (90 jours)** : 150-250 SKU, réparties sur les 3 vagues ci-dessus.
- **Motorisations AFCA** : demande de devis exclusivement, calculette de pré-qualif ("type portail + dimensions + poids + usage + tension → 3 kits proposés, prix sur devis < 24h").
- **Photos produits** : génération Gemini, fond blanc studio, aucun texte, **aucun visage humain**.
- **Références fournisseur** : jamais exposées publiquement — nomenclature AcceFerm à chaque fiche.
- **Fiches produit obligatoires** : 5 photos min + notice PDF téléchargeable + conseil expert rédigé + Schema.org Product + filtre compatibilité + cross-sell associé.

### Catégories reportées V1 (mois 4+)
- Fabrication sur mesure (nécessite atelier IEF + chaîne devis complexe + métré client).
- Portes industrielles rapides (sourcing, volume unitaire, ROI incertain v0).
- Portes d'ascenseur / ascensoriste (cycle vente long, installation réglementée).

---

## POLITIQUE PRIX & GRILLES TARIFAIRES

- **Prix HT par défaut** (cible pro), bascule HT/TTC persistante côté utilisateur.
- **3 grilles automatiques** selon statut compte pro :
  - **Particulier** — TTC affiché
  - **Pro Silver** — HT -5 % dès inscription avec validation SIRET
  - **Pro Gold** — HT -10 à -15 % sur volume cumulé 12 mois glissants
- **Paiement 30j à terme** : réservé aux Pro Gold pilotes, ouverture progressive après sprint 3 (risque crédit client + gestion encours = coût caché).

---

## CANAUX DE VENTE

| Canal | Statut V0 | Commentaire |
|---|---|---|
| Site acceferm.fr | **Priorité absolue** | Cœur du projet pro/industrie |
| Google Ads B2B | Sprint 2 | Budget test 500 € sur requêtes techniques |
| Emailing installateurs IDF | Sprint 2 | Base CAPEB / réseau IEF / 200 cibles |
| Google Business Profile | Sprint 1 | Validation + lien IEF & CO |
| Newsletter segmentée | Sprint 2 | Brevo, pro vs particulier |
| Leboncoin Pro | Reporté V1+ | Pertinent B2C, faible ROI pour B2B pro |
| eBay Pro / Amazon | **Reporté V1+** | Non cohérent avec positionnement pro spécialisé |

---

## CONTRAINTES OPÉRATIONNELLES

- **Conformité religieuse** : pas de dropshipping, uniquement achat-revente avec stock ou commande fournisseur après vente.
- **Pas de visage humain** dans les contenus marketing (ni fondateur ni conjointe).
- **Trésorerie tendue** : toute dépense > 50 € validée explicitement avant engagement.
- **Règlement fournisseur groupé** : hebdomadaire vendredi (négocié AFCA).
- **Mode accélération actif** : règle du 70 % — MVP fonctionnel, perfection après premières ventes.
- **Validation gate J+30, J+60, J+90** : critères go/no-go définis dans `plan-v0-pro-industrie.md` section 8. À chaque gate : diagnostic avant de continuer.

---

## RÈGLES DE SÉCURITÉ — EXÉCUTION TECHNIQUE

Inchangées de la v1. À respecter sans exception.

1. **Backup avant modification** : avant toute modif DB ou fichier critique (`wp-config.php`, `.htaccess`, thème actif), exporter DB avec `wp db export` et sauvegarder copie fichier ciblé dans `~/backups/` sur le serveur.
2. **Ne jamais toucher `wp-config.php`** sans confirmation explicite dans la session en cours.
3. **Ne jamais désactiver le plugin Stripe** sans confirmation explicite.
4. **Ne jamais modifier les pages 7 (Boutique), 8 (Panier), 9 ou 789 (Validation), 10 (Mon compte)** sans confirmation explicite.
5. **Thème enfant Astra obligatoire** : toute modif de thème dans `wp-content/themes/astra-child/`, jamais dans `wp-content/themes/astra/`.
6. **Mode test avant mode live** : toute nouvelle fonctionnalité commerçante (paiement, expé, email, B2B) testée en scénario minimal avant production.
7. **Pas de modifications nocturnes non supervisées sur le site live**.
8. **Jamais de divulgation du mot de passe SSH** en clair, même dans un fichier local.
9. **Clause AFCA "pas de prix motorisation"** : QA obligatoire sur chaque nouvelle fiche motorisation avant publication (prix affiché = rupture de contrat fournisseur).

---

## CARTOGRAPHIE DES PAGES WORDPRESS

État au 18 avril 2026. À mettre à jour à la fin de chaque sprint.

| ID | Titre | Rôle |
|---|---|---|
| 69 | Home | Page d'accueil (`page_on_front`) |
| 678 | À propos | Page statique |
| 708 | Contactez Nous | Formulaire SureForms ID 912 |
| 888 | CGV | Légal |
| 890 | Mentions légales | Légal |
| 11 | Livraison & Retours | Légal |
| 892 | Guides & FAQ | SEO / support |
| 3 | Politique de confidentialité | Légal |
| 7 | Boutique | WooCommerce shop |
| 8 | Panier | WooCommerce cart |
| 9 | Validation de la commande | WooCommerce checkout |
| 789 | Validation de commande | ⚠️ Doublon — à analyser |
| 10 | Mon compte | WooCommerce account |

**Nouvelles pages à créer sprints 1-3** :
- Espace Pro (dashboard compte pro, grilles HT, historique, factures)
- Hub Ressources (guides, diagnostic, notices, calculateurs, glossaire)
- 4 pages locales IDF (75 / 92 / 93 / 78) pour lead-gen IEF
- Configurateur motorisation (5 questions → 3 kits recommandés)
- 4 formulaires devis typés (motorisation / contrôle accès / fab sur mesure / SAV)

---

## KPIs PILOTAGE (à suivre dès J0)

| KPI | Cible J+90 |
|---|---|
| Sessions site | 3 000 / mois |
| Taux conversion B2B (compte pro) | 4 % |
| Comptes pro validés | 20+ |
| Leads pose IEF via site | 8 / semaine |
| Panier moyen B2B | ≥ 250 € HT |
| Core Web Vitals "Bon" | 80 % des pages |
| Avis Vérifiés note moyenne | > 4,5/5 |
| Position top 10 Google | 5 requêtes cibles |

Détail + KPIs complets : `plan-v0-pro-industrie.md` section 9.

---

## ÉCOSYSTÈME CONNEXE (ne pas mélanger)

- **IEF & CO** : entreprise terrain, ERP Odoo existant sous-utilisé (**NE PAS MÉLANGER** avec AcceFerm), interventions via Kolus. Capital confiance transférable (15 ans IDF, avis Google, chantiers référence).
- **Assistéo** : vidéo-assistance technique à distance, hook V0 dès la fiche motorisation (bon session 20 min offerte dès 300 € achat motorisation).
- **Documents stratégiques IEF & CO** : 4 analyses datées 16 avril 2026 (METAL2000, TOP10 concurrents IDF, opportunités marché, stratégie recommandée). Consulter uniquement sur demande explicite liée à IEF.

---

## LIVRABLES CLEFS EN REPO

- `CLAUDE.md` — ce fichier, contexte permanent (v2 pro/industrie).
- `plan-v0-pro-industrie.md` — plan détaillé V0 en 12 sections (stack, catalogue, roadmap 30/60/90j, KPIs, risques).
- `analyse-concurrence.md` — analyse 10 concurrents pure-players + marketplaces (angle B2C initial, toujours valide pour veille).
- `plan-seo-30-articles.md` — plan éditorial 30 articles longue traîne.
- `articles/` — 12 brouillons rédigés (photocellules, feux, récepteurs, VIGIK, etc.) à recycler mois 1-2.

---

## STYLE DE COLLABORATION ATTENDU

- Réponses directes, concrètes, actionnables.
- Pas de validation complaisante : challenger les décisions si risque technique ou business.
- Chaque proposition de modification inclut : fichiers ciblés, critère de succès mesurable, commande de test post-exécution.
- Mode "70 % maintenant, 100 % plus tard" : refuser le sur-travail en phase de lancement.
- Toujours proposer une action concrète avec délai à la fin d'une réponse.
- **À chaque gate (J+30 / J+60 / J+90)** : diagnostic go/no-go avant de continuer. Si 3/5 KPIs non atteints → revue stratégie avant plus d'investissement.
