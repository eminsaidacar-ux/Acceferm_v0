# CLAUDE.md — Projet AcceFerm

> Fichier de contexte permanent pour Claude Code. Lu automatiquement à chaque session.
> Dernière mise à jour : 19 avril 2026.

---

## IDENTITÉ DU PROJET

**AcceFerm** = boutique en ligne de matériel de contrôle d'accès, automatismes de portail et sécurité périmétrique.

Division e-commerce de **IEF & CO** (SIRET existant, entreprise terrain en serrurerie/métallerie/maintenance multi-technique, 15+ ans d'expérience, Île-de-France).

**Statut juridique actuel** : facturation et encaissement sous IEF & CO, ligne comptable séparée "revente matériel". Bascule vers SASU AcceFerm prévue une fois le CA stabilisé.

**Domaines réservés** : acceferm.fr (actif), acceferm.com, acceferm.store, acceferm.org.

---

## VISION STRATÉGIQUE

1. **Revenu semi-passif** : buy & resell (pas de dropshipping, choix structurel non négociable).
2. **Arme SEO pour IEF & CO** : chaque page AcceFerm référencée = porte d'entrée potentielle pour un lead installation IEF.
3. **Liberté géographique à terme** : réduire la dépendance au terrain physique.

**Objectifs** :
- Court terme (2 mois) : 10 000 € CA cumulés.
- Moyen terme (6 mois) : AcceFerm rentable et auto-financé.
- Long terme (12 mois+) : marque établie, intégration Assistéo (vidéo-assistance), lead-gen structuré IEF.

---

## STACK TECHNIQUE

| Composant | Valeur |
|---|---|
| Hébergement | IONOS Web Plus |
| CMS | WordPress 6.9.4 |
| E-commerce | WooCommerce 10.6.2 |
| Paiement | WooCommerce Stripe Gateway 10.5.3 (compte Stripe IEF & CO) |
| Thème | Astra 4.12.7 (parent, pas de thème enfant à ce jour — à créer) |
| Plugins actifs | ultimate-addons-for-gutenberg (Spectra 3.0.0-beta), astra-sites, sureforms, woocommerce, woocommerce-gateway-stripe |
| Version PHP serveur | 8.2.30 |
| WP-CLI serveur | 2.12.0 installé dans ~/bin/wp |
| CDN | Cloudflare |
| SEO | Google Search Console (sitemap soumis) |

---

## ACCÈS SERVEUR SSH (IONOS)

- **Host** : access-5020206686.webspace-host.com
- **Port** : 22
- **Utilisateur** : su244369
- **Protocole** : SFTP + SSH
- **Mot de passe** : stocké dans Bitwarden sous l'entrée "IONOS SSH AcceFerm" — NE JAMAIS écrire le mot de passe en clair dans un fichier, un commit, ou une session partagée.
- **Chemin WordPress** : /home/www/clickandbuilds/AcceFerm/
- **Alias WP-CLI** : `wp` disponible une fois connecté (alias vers /usr/bin/php8.2 ~/bin/wp).

---

## FOURNISSEURS — VAGUES DE LANCEMENT

### Vague 1 (actif — priorité 1)
- **AFCA / V2** (Lyon/Genas) — Fabricant-distributeur automatismes portails, armoires de commande, accessoires. Livraison J+1 France. Bons tarifs négociés.
  - ⚠️ **CLAUSE CRITIQUE** : interdiction de publier les prix des motorisations en ligne. Les accessoires peuvent être vendus avec prix affiché. Les motorisations AFCA sont traitées uniquement en demande de devis (formulaire), jamais avec prix visible.
  - ⚠️ **CLAUSE CRITIQUE** : les références produit AFCA ne doivent pas apparaître telles quelles sur le site public.
- **Roger Technology** (via Doorgate Portugal) — Motorisations résidentielles. Pas de clause prix, délai ~1 semaine.

### Vague 2 (mois 2)
- **Trenois-Decamps** — Levier commercial acquis. Catalogue large généraliste.
- **Intégral Système** (via Batifer) — Contrôle d'accès, courant faible, vidéosurveillance, alarme. Pas de restriction prix.

### Vague 3 (mois 3+)
- **Motor Line** (Portugal) — Fabricant, partenariat proposé, à acter.
- **Came** — Compte ouvert mais tarifs standards, pas d'avantage compétitif, à utiliser uniquement sur niches spécifiques.

### Écarté du lancement
- Faac, Sommer : pas de compte ouvert.
- Foussier : aucun avantage compétitif.

---

## CATALOGUE — PRINCIPES DE SÉLECTION

- **Marge brute cible minimale** : 90 % (120 % visée sur accessoires).
- **Catégories prioritaires vague 1** : accessoires & sécurité (photocellules, émetteurs, récepteurs, feux clignotants, barres palpeuses, sélecteurs) + armoires de commande & électronique.
- **Motorisations** : traitées en demande de devis uniquement (clause AFCA) ou avec prix visible si fournisseur Portugal.
- **Photos produits** : génération Gemini, fond blanc studio, aucun texte, aucun visage humain.
- **Références fournisseur** : jamais exposées publiquement (reformuler en nomenclature AcceFerm).

---

## CANAUX DE VENTE

| Canal | Statut | Commentaire |
|---|---|---|
| Site acceferm.fr | En construction | Priorité 1 |
| Leboncoin Pro | Compte créé | À activer vague 1 |
| eBay Pro | Bloqué | En attente validation bancaire Faycal. ⚠️ eBay compte perso interdit (risque URSSAF + gel Stripe). |
| Amazon FBM | Non actif | Phase 4 (mois 3-6) |

---

## CONTRAINTES OPÉRATIONNELLES

- **Conformité religieuse** : pas de dropshipping, uniquement achat-revente avec stock ou commande fournisseur après vente.
- **Pas de visage humain** dans les contenus marketing (ni fondateur ni conjointe).
- **Trésorerie tendue** : toute dépense > 50 € à valider explicitement avant engagement.
- **Règlement fournisseur groupé hebdomadaire** (vendredi) négocié avec AFCA.
- **Mode accélération actif** : règle du 70 % — on livre un MVP fonctionnel, on perfectionne après les premières ventes.

---

## RÈGLES DE SÉCURITÉ — EXÉCUTION TECHNIQUE

Claude Code doit respecter ces règles en toutes circonstances.

1. **Backup avant modification** : avant toute modification de base de données ou de fichier critique (wp-config.php, .htaccess, thème actif), effectuer un export DB avec `wp db export` et sauvegarder une copie du fichier ciblé dans `~/backups/` sur le serveur.
2. **Ne jamais toucher wp-config.php** sans confirmation explicite dans la session en cours.
3. **Ne jamais désactiver le plugin Stripe** sans confirmation explicite.
4. **Ne jamais modifier les pages 7 (Boutique), 8 (Panier), 9 ou 789 (Validation de commande), 10 (Mon compte)** sans confirmation explicite.
5. **Thème enfant Astra obligatoire** : toute modif de thème se fait dans `wp-content/themes/astra-child/`, jamais dans `wp-content/themes/astra/`.
6. **Mode test avant mode live** : toute nouvelle fonctionnalité commerçante (paiement, expé, email) doit être testée avec un vrai scénario minimal avant mise en production.
7. **Pas de modifications nocturnes non supervisées sur le site live**.
8. **Jamais de divulgation du mot de passe SSH** en clair, même dans un fichier local.

---

## CARTOGRAPHIE DES PAGES WORDPRESS

| ID | Titre | Rôle |
|---|---|---|
| 69 | Home | Page d'accueil (définie dans `page_on_front`) |
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
| 789 | Validation de commande | ⚠️ Doublon à analyser — une des deux est orpheline |
| 10 | Mon compte | WooCommerce account |

---

## ÉCOSYSTÈME CONNEXE (ne pas mélanger)

- **IEF & CO** : entreprise terrain séparée, ERP Odoo existant (sous-utilisé, NE PAS mélanger avec AcceFerm), interventions terrain gérées via Kolus.
- **Documents stratégiques IEF & CO** (hors scope AcceFerm) : 4 analyses concurrentielles/stratégiques datées du 16 avril 2026 (METAL2000, TOP10 concurrents IDF, opportunités marché, stratégie recommandée) — à consulter uniquement si demande explicite liée à IEF & CO.
- **Assistéo** : service de vidéo-assistance technique à distance, à intégrer sur AcceFerm en phase ultérieure (hooks à prévoir dès maintenant sur fiches motorisation).

---

## PRIORITÉS TECHNIQUES — PROCHAINES SESSIONS

1. Création thème enfant Astra (obligatoire avant toute modif CSS/PHP).
2. Audit complet Stripe + test paiement 1 € en conditions réelles.
3. Installation Sendcloud + configuration Mondial Relay / Colissimo.
4. Import catalogue CSV 30 SKU avec validation marge > 90 %.
5. Mise en cache (LiteSpeed Cache) + compression images (ShortPixel).
6. Email transactionnels (commande, expédition, livraison) + relance panier abandonné.

---

## STYLE DE COLLABORATION ATTENDU

- Réponses directes, concrètes, actionnables.
- Pas de validation complaisante : challenger les décisions si risque technique ou business.
- Chaque proposition de modification inclut : fichiers ciblés, critère de succès mesurable, commande de test post-exécution.
- Mode "70 % maintenant, 100 % plus tard" : refuser le sur-travail en phase de lancement.
- Toujours proposer une action concrète avec délai à la fin d'une réponse.
