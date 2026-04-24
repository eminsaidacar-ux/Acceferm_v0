# Guide Emin — démarrer AcceFerm Pro en prod

> Dernière mise à jour : 25 avril 2026.
> Ce guide liste les **4 comptes à créer** + **les env vars à plugger** pour
> activer le money-path. Temps total : **~30 minutes**.

---

## 0. Pré-requis

- Un ordinateur avec Node.js 20+ installé.
- Une carte bancaire (pour l'activation Stripe — aucun prélèvement avant transaction réelle).
- Votre SIRET IEF & Co à portée de main.

---

## 1. Créer le compte Vercel + connecter le repo

### Étapes

1. Aller sur **https://vercel.com/signup** → "Continuer avec GitHub".
2. Autoriser Vercel à accéder au repo `eminsaidacar-ux/Acceferm_v0`.
3. "Add New Project" → sélectionner `Acceferm_v0` → **Import**.
4. Dans "Configure Project" :
   - **Framework Preset** : Next.js (détecté automatiquement).
   - **Root Directory** : cliquer "Edit" → choisir `storefront`.
   - **Build Command** : laisser défaut (`next build`).
   - **Install Command** : `npm install --legacy-peer-deps`
5. Ne pas encore cliquer "Deploy" — d'abord configurer les env vars (étape 5).
6. **Production Branch** : `claude/priceless-curie-fef692` en attendant le merge main.

### Pricing

- **Vercel Hobby** : gratuit jusqu'à 100 GB bandwidth/mois. Suffisant pour sprint 1-2.
- **Vercel Pro** : 20 $/mois — à activer quand le site est en live pour les collaborateurs d'équipe et le support prod.

---

## 2. Créer la base de données Supabase EU

### Étapes

1. Aller sur **https://supabase.com/dashboard** → créer un compte (gratuit).
2. "New Project" :
   - **Name** : `acceferm-prod`
   - **Database Password** : générer un mot de passe solide → **enregistrer dans Bitwarden entrée "Supabase AcceFerm"**.
   - **Region** : `Central EU (Frankfurt) eu-central-1` **OU** `West EU (Paris) eu-west-3` selon disponibilité. RGPD : UE obligatoire.
   - **Pricing Plan** : Free.
3. Attendre ~2 minutes que le projet soit provisionné.
4. Dans **Project Settings → Database → Connection string**, onglet **"URI" / "Transaction pooler"** :
   - Copier l'URL type :
     ```
     postgres://postgres.xxx:[PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:6543/postgres
     ```
   - Remplacer `[PASSWORD]` par le mot de passe enregistré.
5. Enregistrer cette URL comme **`DATABASE_URI`** (voir étape 5).

### Pricing

- **Free tier** : 500 MB DB + 1 GB storage. Suffisant pour sprint 1-2 (≤ 1 000 commandes).
- **Pro** : 25 $/mois — à activer si on dépasse.

---

## 3. Créer le compte Stripe en mode test

### Étapes

1. Aller sur **https://dashboard.stripe.com/register** → créer compte.
2. Renseigner :
   - **Nom légal** : IEF & Co.
   - **SIRET** : 888 693 981.
   - **RIB** : à remplir plus tard avant passage en live.
3. **Le compte est créé par défaut en mode test** (toggle "Viewing test data" en haut à droite). Ne PAS l'activer en live pour l'instant.
4. Dans **Developers → API keys**, copier :
   - **Publishable key** (commence par `pk_test_...`) → **`STRIPE_PUBLISHABLE_KEY`**.
   - **Secret key** (commence par `sk_test_...`) → **`STRIPE_SECRET_KEY`**.
5. Dans **Developers → Webhooks**, créer un endpoint :
   - URL : `https://<vercel-preview-url>.vercel.app/api/webhooks/stripe` (à mettre à jour après déploiement).
   - Events : `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`.
   - Copier le **Signing secret** (commence par `whsec_...`) → **`STRIPE_WEBHOOK_SECRET`**.

### Cartes de test à utiliser

- ✅ **Paiement qui réussit** : `4242 4242 4242 4242` (n'importe quelle date future + CVC).
- ❌ **Paiement refusé** : `4000 0000 0000 0002`.
- 🔒 **3D Secure** : `4000 0025 0000 3155`.

### Pricing

- **Mode test** : gratuit, illimité.
- **Mode live** : 1,4 % + 0,25 € par transaction CB européenne (sprint 2+).

---

## 4. Créer le compte Brevo (email transactionnel)

### Étapes

1. Aller sur **https://onboarding.brevo.com/account/register** → créer compte (gratuit).
2. Renseigner la société IEF & Co, SIRET.
3. Dans **Settings → API keys → Create new API key** :
   - **Name** : `acceferm-prod`.
   - Copier la clé → **`BREVO_API_KEY`**.
4. Dans **Senders & IP → Senders → Add a sender** :
   - **Email** : `noreply@acceferm.fr`.
   - **Nom** : "AcceFerm Pro".
   - Vérifier l'email (Brevo enverra un lien de confirmation).
5. **Configuration DNS** (critique pour déliverabilité) — à faire chez votre registrar de `acceferm.fr` :
   - **SPF** : ajouter `include:spf.brevo.com` dans votre TXT record.
   - **DKIM** : Brevo fournit 2 CNAME records à ajouter.
   - **DMARC** : ajouter `v=DMARC1; p=quarantine; rua=mailto:dmarc@acceferm.fr`.

### Pricing

- **Free tier** : 300 emails transactionnels/jour. Suffisant pour sprint 1-2.
- **Starter** : 8 €/mois pour 20 000 emails/mois.

---

## 5. Configurer les env vars dans Vercel

### Étapes

1. Retour sur **Vercel → Project → Settings → Environment Variables**.
2. Ajouter une à une les variables suivantes, **pour chaque environnement** (Production + Preview + Development) :

| Variable | Valeur | Source |
|---|---|---|
| `PAYLOAD_SECRET` | Générer avec `openssl rand -hex 32` | Commande locale |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://<vercel-preview-url>.vercel.app` | Vercel |
| `DATABASE_URI` | `postgres://postgres.xxx:[PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:6543/postgres` | Étape 2 |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Étape 3 |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Étape 3 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Étape 3 |
| `BREVO_API_KEY` | `xkeysib-...` | Étape 4 |
| `BREVO_SENDER_EMAIL` | `noreply@acceferm.fr` | Étape 4 |
| `BREVO_SENDER_NAME` | `AcceFerm Pro` | — |
| `NEXT_PUBLIC_SITE_URL` | `https://<vercel-preview-url>.vercel.app` | Vercel |
| `NEXT_PUBLIC_SITE_NAME` | `AcceFerm Pro` | — |

3. Cliquer **"Save"** pour chaque variable.
4. Retourner sur **Deployments → Deploy**.

---

## 6. Première connexion admin Payload

1. Après déploiement, ouvrir `https://<vercel-preview-url>.vercel.app/admin`.
2. Payload affiche le formulaire "Create first user" :
   - **Email** : `emin@iefandco.com` (ou autre).
   - **Password** : solide, enregistrer dans Bitwarden.
   - **Role** : Admin.
3. Vous êtes connecté. Menu à gauche :
   - **Catalogue** : Catégories, Produits, Médias.
   - **Ventes** : Comptes pros, Commandes.
   - **Admin** : Users.

### Workflow ajout produit

1. Menu **Catalogue → Produits → Create New**.
2. Remplir :
   - Nom : "V2 Sensiva photocellules paire".
   - Slug : auto-généré (ou manuel).
   - Description : rich text.
   - Marque : "V2".
   - Catégorie : sélectionner "Photocellules".
   - Prix HT : `48`.
   - Stock : `142`.
   - Image principale : **drag & drop**.
   - `isMotorisation` : décoché (c'est un accessoire, prix OK).
3. **Save**. Le produit est instantanément visible sur `/produit/<slug>` côté public.

### ⚠️ Clause AFCA — Motorisations

Pour toute motorisation (moteur, kit complet, armoire…) :
- **Cocher `isMotorisation`** dans la fiche produit.
- Le prix ne s'affichera PAS publiquement ("Prix sur devis" à la place).
- Il reste visible dans l'admin et dans l'espace pro après login.
- Le configurateur redirige automatiquement vers `/contact`.

---

## 7. Checklist finale avant partage aux collaborateurs

- [ ] URL Vercel preview fonctionne (HTTP 200 sur `/`, `/admin`, `/produit/[slug]`).
- [ ] Login admin Payload OK.
- [ ] Au moins 20 produits pilotes créés via admin.
- [ ] Test achat complet avec carte `4242 4242 4242 4242` → email reçu + commande visible dans admin.
- [ ] URL Stripe webhook mise à jour avec la vraie preview URL.
- [ ] SPF/DKIM/DMARC validés côté Brevo (sinon les emails finissent en spam).

---

## FAQ

**Q : Je peux ajouter un collaborateur au projet Vercel ?**
R : Oui, plan Pro (20 $/mois) requis pour ajouter des membres d'équipe. Sprint 1 = vous seul. À upgrader sprint 2+.

**Q : Je peux ajouter un éditeur catalogue Payload ?**
R : Oui, gratuit. Dans admin → Users → Create New avec role "Éditeur catalogue". Il pourra créer/modifier les produits mais pas les commandes.

**Q : Comment remettre à zéro la DB en cas de problème ?**
R : Dans Supabase → Database → Tables → supprimer les tables Payload (commencent par `users`, `products`, etc.). Au prochain démarrage, Payload recrée les tables automatiquement. **Les données sont perdues** — à ne faire qu'en dev.

**Q : Comment passer Stripe en mode live ?**
R : Sprint 2. Il faudra renseigner le RIB IEF & Co chez Stripe + soumettre une vérification KYC (24-48h Stripe). Puis remplacer les clés `sk_test_` par `sk_live_` dans Vercel.

**Q : Quand brancher Odoo ?**
R : Sprint 2. Un endpoint `POST /api/odoo/sync-order/:id` appellera Odoo XML-RPC pour remonter la commande. En attendant, un bouton "Exporter vers Odoo" sera disponible dans l'admin Payload.

---

## En cas de blocage

- Logs Vercel : **Deployments → [latest] → Logs**.
- Logs Supabase : **Database → Logs**.
- Logs Stripe : **Dashboard → Developers → Logs**.
- Logs Brevo : **Transactional → Email activity**.

Contactez-moi en session Claude Code avec un screenshot de l'erreur — on résout ensemble.
