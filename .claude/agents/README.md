# Super-agents AcceFerm Pro

Ce dossier contient les chartes des 8 super-agents qui orchestrent le développement d'AcceFerm Pro. Chaque agent a un rôle précis, des pouvoirs, des limites, des triggers, et une escalade définie.

## Principe d'orchestration

Claude n'exécute plus en solo. Face à une demande, Claude :

1. Identifie le(s) super-agent(s) concerné(s) via leur description.
2. Délègue la tâche via le tool `Agent` avec `subagent_type: architect|security|integration|seo|ux|devops|business|compliance`.
3. Les agents peuvent eux-mêmes créer des sous-agents pour des tâches granulaires.
4. **BUSINESS_AGENT** a un droit de veto absolu sur tout ce qui n'est pas money-path.

## Liste des super-agents

| Agent | Rôle central | Invocation typique |
|---|---|---|
| [architect](./architect.md) | Cohérence technique Next.js 15, patterns, ADRs | Avant tout changement structurant |
| [security](./security.md) | Auth, secrets, validation, masquage prix AFCA | Avant toute route sensible |
| [integration](./integration.md) | Stripe, Brevo, Odoo, Meilisearch, CMS | Pour toute brique tierce |
| [seo](./seo.md) | Schema.org, sitemap, Core Web Vitals | Après chaque page publique |
| [ux](./ux.md) | Parcours achat, mobile-first, WCAG AA | Pour tout composant interactif |
| [devops](./devops.md) | Vercel, CI/CD, Sentry, analytics | Pour toute modif infra |
| [business](./business.md) | Garant Règle n°2 (money-path first) | Avant chaque merge |
| [compliance](./compliance.md) | Clauses AFCA + RGPD + CGV + DGFiP | Avant chaque merge, trimestriel |

## Règle d'or — la Règle n°2

> **NO FEATURE BEFORE MONEY-PATH.**
>
> Tant que le flux `Visiteur → Panier → Checkout → Stripe → Order en DB → Email confirmation → Facture PDF → Odoo` n'est pas fonctionnel bout-en-bout, aucune nouvelle page, section, animation, ou refacto cosmétique n'est acceptable.

BUSINESS_AGENT bloque toute PR qui viole cette règle sauf exception explicite d'Emin.

## Périmètre de décision

### Autonomie totale (agents décident seuls)

- Architecture technique, patterns Next.js 15
- Choix librairies non-payantes
- Sécurité applicative (auth, validation, chiffrement)
- Performance (SSG, ISR, edge, cache)
- Refactos et dette technique
- Tests, CI/CD, déploiement Vercel
- Conventions code, linting, formatting
- Structure DB (Payload/Prisma/schéma Postgres)
- SEO technique (Schema, sitemap, meta)
- Priorisation intra-sprint

### Validation Emin obligatoire

- Fonctionnel métier (quoi vendre, comment, à qui)
- Dépenses récurrentes nouvelles > 10€/mois
- Intégrations tierces payantes (Stripe fees, Brevo, CMS)
- Suppression de fonctionnalités existantes
- Changement stack majeur (abandon Next.js, etc.)
- Communication publique, copy commercial
- Prix, marges, promotions
- Données clients pros (RGPD, conservation, partage)
- Relations fournisseurs (AFCA/V2/Roger/Intégral)
- Merge dans main + déploiement prod

## Comment ajouter un sous-agent

Un super-agent peut créer un sous-agent pour une tâche spécialisée (ex : `stripe-webhook-handler` sous INTEGRATION). Le sous-agent hérite des limites du parent. Créer un nouveau fichier `.md` avec frontmatter et mentionner le parent dans la section "Parent".
