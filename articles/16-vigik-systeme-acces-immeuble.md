# Vigik : comprendre le système d'accès immeuble

> **Article QW3 — Quick Win n°3**
> Destination : acceferm.fr/blog/vigik-systeme-acces-immeuble/
> Statut : brouillon v1 — à compléter puis valider avant publication
> Longueur actuelle : ~1 900 mots / cible 2 500 mots (après complétion)
>
> **Méta-description** :
> Vigik, le système d'accès des immeubles en France : fonctionnement, badges, durée 96h, installation en copropriété. Guide complet 2026.
>
> **Slug** : vigik-systeme-acces-immeuble
> **Schema** : Article + FAQPage (pilier)

---

## Introduction

Chaque matin, votre facteur pousse la porte de votre immeuble sans sonner.
Chaque semaine, un agent Enedis relève votre compteur sans appeler. Chaque
été, un technicien Orange intervient dans les parties communes sans jamais
déranger personne. Le point commun ? **Vigik**.

Vigik est le système d'accès normalisé qui permet à une centaine de
services d'État ou privés d'entrer dans les immeubles français **sans
double des clés**, tout en restant traçable et sécurisé. Ce guide répond
à toutes les questions que se posent un copropriétaire, un syndic ou un
gardien qui entend parler de Vigik pour la première fois — ou qui veut
enfin comprendre comment ça marche vraiment.

---

## Vigik, c'est quoi au juste ?

Vigik est un **système d'accès par badges à durée limitée**, inventé par
**La Poste** dans les années 1990 et devenu aujourd'hui un quasi-standard
en France pour les immeubles collectifs.

Son principe est simple : chaque service autorisé (postier, releveur,
livreur, services d'urgence, etc.) possède un badge qui est
**valide uniquement pendant 96 heures (4 jours)**. Au-delà, il faut le
« recharger » sur une borne dédiée — ce qui oblige l'agent à repasser
par son siège pour continuer à exercer, et empêche un badge volé ou
perdu d'être utilisé longtemps.

Aujourd'hui, plus de **250 000 immeubles** en France sont équipés Vigik,
avec des dizaines de services habilités.

---

## Qui peut entrer avec un badge Vigik ?

La liste des services autorisés est définie par l'**Observatoire de la
sécurité Vigik** et mise à jour régulièrement. On y retrouve notamment :

- **La Poste** (facteur, collecte)
- **Enedis** (anciennement ERDF, relevé compteurs et interventions)
- **GRDF** (gaz)
- **Orange, SFR, Free, Bouygues** (interventions techniques)
- **Services d'urgence** (SAMU, pompiers, police en intervention)
- **Bailleurs sociaux** pour leurs propres parcs
- **Livraison presse, publicité distribuée**
- **EDF, Engie, fournisseurs énergie**
- Divers prestataires techniques (ascensoriste, chauffagiste, etc.)

Chaque service dispose de sa propre « classe » de badge, avec des plages
horaires spécifiques. Un facteur ne pourra pas entrer à 2 h du matin, par
exemple.

---

## Comment fonctionne concrètement un accès Vigik ?

Imaginons le parcours d'un postier qui entre dans votre immeuble :

1. **Avant sa tournée**, il passe son badge sur une **borne de rechargement**
   située dans son centre de tri. Son badge reçoit alors un « ticket »
   cryptographique valable 96 h.
2. **Devant votre immeuble**, il pose le badge sur le **lecteur Vigik**
   fixé près de la porte.
3. Le lecteur vérifie : le badge est-il d'un service autorisé par cette
   copropriété ? Le ticket est-il encore valide ? L'heure est-elle dans
   la plage autorisée ?
4. Si tout est OK, la **gâche électrique ou la ventouse** est déclenchée,
   la porte s'ouvre.
5. L'**historique** des entrées est conservé dans le lecteur pour
   traçabilité.

L'astuce brillante de Vigik : aucun badge n'est stocké en base dans vos
lecteurs. C'est le ticket cryptographique, émis par la borne du service,
qui prouve l'habilitation. **Pas de fichier à mettre à jour** dans votre
immeuble quand un nouveau facteur arrive ou part.

> **[À COMPLÉTER PAR FAYCAL — Bloc #1]**
>
> **Ce qu'il faut ajouter ici** : un schéma simple du trajet d'un badge
> (borne de rechargement → tournée → lecteur immeuble), ou une infographie
> visuelle des étapes.
>
> **Pourquoi c'est nécessaire** : c'est l'article pilier du site sur
> Vigik, le schéma aide à rankér et à capter des backlinks (sites de
> syndics ou blogs copro qui vont citer l'infographie).
>
> **Format attendu** : image horizontale 1 200 × 600 px, fond blanc,
> pictogrammes simples, aucune marque.

---

## Badge Vigik vs badge résident : deux systèmes qui cohabitent

Point important qui embrouille souvent : **Vigik ne remplace pas le badge
des résidents**. Les deux systèmes coexistent sur le même lecteur.

- **Le badge résident** est programmé **dans** le lecteur de l'immeuble (ou
  dans une centrale centralisée). Il fonctionne tout le temps, 24/7,
  jusqu'à être désactivé par le syndic ou le gardien. Format typique :
  porte-clé RFID ou carte plastique.
- **Le badge Vigik** est un badge externe, rechargé ailleurs, valide 96 h,
  limité aux services autorisés et à leurs plages horaires.

Un lecteur d'immeuble moderne lit les deux technologies sans difficulté.
C'est ce qui permet à un même bouton / lecteur de servir facteur et
résident.

---

## Équiper une copropriété en Vigik : ce qu'il faut

Vous êtes syndic ou membre du conseil syndical, et vous envisagez
d'équiper votre immeuble. Voici les éléments nécessaires :

### Matériel minimum

- **Un lecteur Vigik** par accès à contrôler (porte piétonne, porte parking,
  service).
- **Une centrale de contrôle d'accès** (parfois intégrée au lecteur, parfois
  déportée).
- **Un dispositif de condamnation** : gâche électrique (porte légère) ou
  ventouse (porte lourde anti-incendie).
- **Alimentation secourue** (batterie, pour éviter le portail ouvert en
  cas de coupure).

### Démarches administratives

- **Délibération en assemblée générale** : le vote doit être inscrit à
  l'ordre du jour, avec devis. La majorité dépend de la nature de la
  copro et du règlement.
- **Demande de clé de site Vigik** : indispensable. C'est la signature
  cryptographique qui identifie votre immeuble auprès du système.
  Démarche dématérialisée via le portail Vigik.
- **Notification des services** concernés (La Poste notamment pour le
  passage du facteur).

> **[À COMPLÉTER PAR FAYCAL — Bloc #2]**
>
> **Ce qu'il faut ajouter ici** : un retour d'expérience IEF & CO sur
> un projet de pose Vigik en copropriété (anonymisé) : taille de
> l'immeuble, nombre de lecteurs posés, durée du chantier, difficulté
> principale rencontrée.
>
> **Pourquoi c'est nécessaire** : dépose une preuve concrète d'expertise
> IEF sur ce chantier précis. Cible syndics prospects.
>
> **Format attendu** : encart 120-160 mots, sans chiffres exacts de
> facture (mais on peut donner la durée : « 2 jours d'intervention »,
> « 3 semaines entre devis et pose »).

---

## Coût et temps d'installation (ordre de grandeur)

La pose d'un système Vigik dépend de plusieurs facteurs :

- **Nombre d'accès** à équiper (porte piéton, parking, service).
- **Filaire existant** : si la copropriété a déjà une centrale d'interphone
  moderne, l'ajout Vigik est simple. Sur un système ancien, il faut
  souvent remplacer la centrale.
- **Gâche ou ventouse** à poser ou à remplacer.
- **Paramétrage et clé de site** : démarche administrative qui prend
  1-2 semaines.

Pour une copropriété classique (1 à 2 lecteurs), comptez **1 à 2 jours
de pose**, étalés sur **3 à 4 semaines** à cause des délais Vigik
côté administratif.

Nous ne donnons pas de prix ici car il varie trop selon la situation.
Un devis précis demande toujours une visite sur site.

---

## Ajouter Vigik sur une copropriété existante

Vous avez déjà un interphone et un système de badges résidents, et vous
voulez juste **ajouter Vigik** ? C'est le cas le plus fréquent en
copropriété moderne.

Trois scénarios possibles :

1. **Votre centrale actuelle supporte le Vigik natif** (cas des centrales
   récentes, post-2015). Il suffit d'ajouter un lecteur compatible et la
   clé de site. Installation rapide.
2. **Votre centrale ne supporte que les badges propriétaires**. Il faut
   ajouter une **centrale Vigik déportée** en parallèle, connectée à la
   même gâche. Plus long, plus cher, mais possible sans tout refaire.
3. **Votre centrale est en fin de vie**. C'est l'occasion de tout renouveler
   en une fois. Plus cher mais plus propre à moyen terme.

Un audit technique sur site permet de trancher en 30 minutes.

---

## Maintenance et renouvellement de la clé de site

La clé de site Vigik a une **durée de validité** (typiquement plusieurs
années). Avant expiration, le syndic doit procéder au renouvellement via
le portail Vigik. **Si c'est oublié**, les badges cessent progressivement
d'être reconnus → les services ne peuvent plus entrer → appels énervés
au syndic.

**Bonne pratique** : mettre la date d'expiration dans l'agenda du syndic
et du conseil syndical, avec rappel 3 mois avant.

Un contrat d'entretien avec un prestataire local inclut en général ce
suivi.

---

## Et en Île-de-France ? Faire auditer ou installer par IEF & CO

**IEF & CO** accompagne les syndics et conseils syndicaux franciliens
sur :
- **Audit Vigik** d'un système existant (fonctionnement, conformité,
  renouvellement clé de site)
- **Pose ou remplacement** de lecteurs et centrales
- **Gestion des badges** résidents et démarche Vigik auprès du centralisateur
- **Contrat d'entretien annuel** incluant le suivi de la clé de site

> **[À COMPLÉTER PAR FAYCAL — Bloc #3]**
>
> **Ce qu'il faut ajouter ici** : offre concrète « audit Vigik copropriété
> en IDF ». Délai de prise de rendez-vous, contenu exact de l'audit,
> document de sortie (rapport PDF ? courrier au syndic ?), zones couvertes
> en priorité (peut-on annoncer une spécialisation 92/93/94 par exemple ?).
>
> **Pourquoi c'est nécessaire** : sur cet article pilier, l'audit est
> l'**entrée commerciale** idéale. Un audit à 0 € ou à prix symbolique
> peut amorcer une relation avec un syndic et débloquer des chantiers
> bien plus gros.
>
> **Format attendu** : puces avec chiffres en gras.

**[CTA — Demander un audit Vigik en IDF]** → formulaire IEF & CO

---

## FAQ — Vigik en copropriété

**Peut-on refuser Vigik dans son immeuble ?**
Oui. Vigik n'est pas obligatoire. Mais le refuser, c'est obliger les
services (facteur, techniciens) à sonner à chaque visite, ou à détenir
des clés classiques — ce qui pose des problèmes de sécurité et de
traçabilité bien plus importants.

**Un badge Vigik volé met-il mon immeuble en danger ?**
Très peu. Le badge se désactive tout seul au bout de 96 h et les
services alertés bloquent en amont les badges signalés volés. Le risque
réel est marginal comparé au vol d'un trousseau de clés.

**Pourquoi mon facteur n'arrive-t-il plus à entrer ?**
Trois causes classiques : (1) sa clé de site est expirée côté service,
(2) votre lecteur a perdu son paramétrage, (3) la batterie de la
centrale est HS. Un audit rapide permet de trancher.

**Combien de badges Vigik existe-t-il en France ?**
Plusieurs millions, tous services confondus. C'est pour ça qu'on parle
d'un standard de facto.

> **[À COMPLÉTER PAR FAYCAL — Bloc #4]**
>
> **Ce qu'il faut ajouter ici** : 3 questions de plus issues de vrais
> échanges avec des syndics ou gardiens en IDF.
>
> **Format attendu** : Q/R 40-60 mots.
>
> **Suggestions d'angle** : (1) question sur le coût d'un renouvellement
> de clé de site ; (2) différence entre Vigik et BatiBadge ou autre
> système concurrent ; (3) question sur l'historique consultable.

---

## Conclusion

Vigik est un système mature, fiable et bien pensé. En tant que copropriétaire
ou syndic, la seule chose à garder en tête est : **la clé de site à
renouveler en temps et en heure**, et **la centrale à entretenir**. Le
reste fonctionne tout seul depuis plus de 20 ans.

En résumé :
- **Badge 96 h rechargeable** pour les services, pas besoin de gérer une
  liste en interne.
- **Coexiste avec les badges résidents** sans conflit.
- **Ajoutable** sur la plupart des copropriétés existantes.

**Syndic ou conseil syndical en IDF ?** → [Demander un audit Vigik](/devis-audit-vigik/)
**Gardien ou résident qui cherche un badge ?** → [Voir les badges et lecteurs](/categorie-produit/controle-acces/)

---

## Maillage interne

- Article #17 — « Programmer un badge de copropriété »
- Article #18 — « Interphone vidéo copropriété : guide 2026 »
- Article #22 — « Portail en copropriété : obligations légales »
- Article #24 — « Automatiser l'entrée de votre copropriété »

---

## Images à générer

1. **Hero** : lecteur Vigik carré noir fixé sur mur en pierre d'immeuble
   haussmannien, main floue s'approchant avec un badge.
2. **Illustration 1** : pictogrammes des services autorisés (postier,
   technicien, etc.) disposés en cercle — ou l'infographie du bloc #1.
3. **Illustration 2** : gros plan sur un badge RFID bleu type Vigik (sans
   marque) sur fond blanc.
4. **Illustration 3** : vue d'une centrale d'interphone ouverte (sans
   marque) avec câblage visible.

---

## Checklist avant publication

- [ ] Tous les blocs [À COMPLÉTER] remplis
- [ ] Méta et slug OK dans Rank Math
- [ ] Schema Article + FAQPage activés
- [ ] 4 images générées, alt rempli, < 150 Ko
- [ ] CTA audit IEF testé (formulaire fonctionnel)
- [ ] Pousser sur LinkedIn Faycal + 2 groupes Facebook syndics IDF le
      jour de la publication (accélération indexation)
- [ ] Vérifier présence d'un lien naturel vers le site Vigik officiel
      (autorité externe → meilleur signal SEO)
