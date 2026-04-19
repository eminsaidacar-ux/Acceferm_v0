# Installer un feu clignotant de portail automatique

> **Article P1**
> Destination : acceferm.fr/blog/installer-feu-clignotant-portail/
> Statut : brouillon v1 — à compléter
> Longueur actuelle : ~1 100 mots / cible 1 200 mots
>
> **Méta** :
> Installation pas à pas d'un feu clignotant de portail : hauteur, câblage 24 V, sortie carte, test. Obligatoire selon EN 13241. Moins d'une heure.
>
> **Slug** : installer-feu-clignotant-portail
> **Schema** : HowTo + FAQPage

---

## Introduction

Un portail automatique qui se déclenche **sans signal lumineux** n'est pas
conforme. La norme **EN 13241** impose un **feu clignotant orange** visible
avant et pendant chaque mouvement. L'installation prend moins d'une heure,
demande très peu de matériel, et peut se faire soi-même sur la quasi-totalité
des armoires.

Ce guide vous détaille le choix du feu (LED vs halogène, 24 V vs 230 V), la
hauteur de pose, le câblage à la sortie FLASH ou équivalente, et les tests
de bonne cadence.

---

## Pourquoi le feu clignotant est obligatoire

Le feu orange sert d'**avertissement visuel aux piétons et véhicules** avant
et pendant le mouvement du portail. Il doit être :

- **Visible** depuis l'extérieur comme depuis l'intérieur.
- **Allumé avant démarrage** (avertissement préventif de 2-3 secondes)
  et **maintenu allumé pendant toute la course**.
- **Couleur orange** (la réglementation est stricte : pas de rouge,
  pas de blanc).

C'est, avec les photocellules et la barre palpeuse, l'un des trois
équipements de sécurité qui composent le **triptyque de conformité**
EN 13241.

---

## Choisir son feu clignotant

### LED ou halogène ?

- **LED** : durée de vie 30 000 à 50 000 heures, consommation négligeable,
  pas de chauffe. C'est le choix par défaut en 2026.
- **Halogène** : encore fabriqué, moins cher à l'achat, mais durée de vie
  3-5 fois plus courte et consommation plus élevée. À éviter sauf
  remplacement à l'identique dans une configuration ancienne.

### 24 V ou 230 V ?

La tension dépend de votre armoire :
- La majorité des armoires résidentielles ont une **sortie FLASH en 24 V DC**
  (ou parfois AC). Le feu doit donc être en 24 V.
- Certaines configurations plus anciennes ou industrielles sortent en
  **230 V**. Vérifiez la notice de votre armoire avant achat.

Un feu 24 V branché sur 230 V = grillé en 2 secondes. Un feu 230 V
branché sur 24 V = il reste éteint. Dans les deux cas, erreur frustrante.

### Avec ou sans cadenceur intégré ?

- **Feu avec cadenceur intégré** : le feu clignote tout seul dès qu'il
  reçoit du courant. Idéal pour les armoires anciennes qui sortent du
  courant fixe (pas de clignotement géré par la carte).
- **Feu sans cadenceur** : c'est la carte qui gère la cadence du
  clignotement via une sortie pulsée. Plus courant sur les armoires
  récentes.

En cas de doute, un **feu à cadenceur intégré est compatible avec tout**.

---

## La hauteur et l'emplacement

La règle d'or : le feu doit être **visible à la fois du côté extérieur et
du côté intérieur**. Hauteur typique : **2 à 2,5 m du sol**, fixé sur un
pilier ou sur une platine murale.

Évitez :
- **Derrière un arbre** ou un mur qui bloque la visibilité.
- **Trop près du portail** : le feu doit alerter un véhicule qui arrive,
  pas juste quelqu'un déjà au pied du portail.
- **Orienté plein soleil** : la LED paraît éteinte en contre-jour. Préférez
  une orientation ombragée si possible.

---

## Le matériel nécessaire

- **1 feu clignotant** (compatible avec la tension de votre armoire)
- **Visseuse + chevilles adaptées au support** (brique, enduit, alu)
- **Câble 2 × 1,5 mm²** de longueur suffisante jusqu'à l'armoire
- **Gaine ICTA** si passage extérieur
- **Domino ou connecteurs Wago**
- **Tournevis testeur**

---

## Étape 1 : couper l'alimentation et préparer

Coupez le disjoncteur du portail. Testez l'absence de courant.

Fixez le support mural du feu à la hauteur retenue. Faites passer le câble
dans une gaine extérieure jusqu'à l'armoire. Passez les presse-étoupes pour
l'étanchéité.

---

## Étape 2 : raccorder à la sortie FLASH de la carte

Ouvrez le capot de l'armoire de commande. Repérez la sortie dédiée au feu,
souvent notée :
- **FLASH**
- **LAMP**
- **SPIA**
- **BLINK**

Ou simplement deux bornes 24 V avec une pictogramme ampoule.

Raccordez vos deux fils (pas de polarité stricte sur un feu à cadenceur
intégré ; respect de la polarité sur certaines LED).

> **[À COMPLÉTER PAR FAYCAL — Bloc #1]**
>
> **Ce qu'il faut ajouter ici** : un rappel sur les sorties contact sec
> vs sorties alimentées. Certaines vieilles armoires ont une sortie
> « contact » qui ouvre/ferme un relais, pas une sortie alimentée — dans
> ce cas il faut câbler avec un transformateur séparé ou utiliser un feu
> à cadenceur autonome.
>
> **Pourquoi c'est nécessaire** : évite le SAV téléphonique.
>
> **Format attendu** : encart « Attention : sortie contact sec » 60-80 mots.

---

## Étape 3 : tester le clignotement

Rebranchez le courant. Lancez une commande d'ouverture.

- Le feu doit **s'allumer avant le démarrage du moteur** (en général
  2-3 secondes de pré-annonce).
- Il doit **rester clignotant pendant toute la course** du portail.
- Cadence typique : 1 flash par seconde (60 Hz visible).
- Il doit **s'éteindre à la fin du mouvement**.

Si le feu reste fixe (pas de clignotement), la cadence vient de la carte
et votre feu attend des impulsions — il faut soit un feu à cadenceur
intégré, soit vérifier le paramétrage de la carte.

Si le feu clignote trop vite ou trop lentement, c'est parfois un paramètre
dans la carte (dipswitch ou menu).

---

## Cas particulier : armoire sans sortie FLASH dédiée

Sur certaines armoires entrée de gamme, il n'existe pas de sortie feu. Deux
options :

1. **Brancher le feu en parallèle sur la sortie alim moteur** (avec un
   feu autonome à cadenceur). Le feu s'allumera dès que le moteur tourne.
   Fonctionne, mais pas de pré-annonce avant démarrage.
2. **Utiliser un module relais externe** piloté par la carte pour créer
   une sortie dédiée. Solution plus propre mais plus chère.

---

## Et en Île-de-France ?

Si votre portail est ancien et que **la mise en conformité EN 13241** est
le vrai objectif (feu + cellules + barre palpeuse + marquage CE), un
prestataire peut tout faire en une demi-journée.

> **[À COMPLÉTER PAR FAYCAL — Bloc #2]**
>
> **Ce qu'il faut ajouter ici** : mention courte du **pack mise en
> conformité** proposé par IEF & CO (feu + cellules + palpeuse +
> contrôle + attestation).
>
> **Format attendu** : 3-4 puces.

**[CTA — Pack conformité portail en IDF]** → formulaire IEF & CO

---

## FAQ — Feu clignotant de portail

**Mon feu clignote en continu même portail fermé. Normal ?**
Non. C'est soit un défaut de câblage (sortie alim continue branchée en
lieu et place d'une sortie FLASH pulsée), soit un relais collé dans
l'armoire. Coupez le courant et revérifiez le câblage.

**Peut-on remplacer un feu halogène par une LED sans rien changer ?**
Oui dans 90 % des cas, tant qu'on respecte la tension et la polarité
(si indiquée). Le LED consomme bien moins, aucun risque pour l'armoire.

**Existe-t-il des feux solaires autonomes ?**
Oui, avec panneau intégré et batterie. Utile quand on n'a pas d'alim
jusqu'au pilier. Durée de vie batterie : 3-5 ans.

> **[À COMPLÉTER PAR FAYCAL — Bloc #3]**
>
> **Ce qu'il faut ajouter ici** : 2 questions complémentaires issues du
> terrain.
>
> **Angle suggéré** : (1) question sur un feu cassé par vandalisme →
> quelle robustesse IP65 IK08 ; (2) question sur le volume sonore (non :
> le feu n'a jamais de son, c'est le buzzer interne qui sonne parfois).

---

## Conclusion

Un feu clignotant, c'est **1 heure et moins de 40 €** pour se mettre en
conformité et sécuriser ses visiteurs. C'est l'intervention la plus simple
de la sécurité portail, et souvent la première à faire quand on audite
une installation ancienne.

**Voir les feux clignotants AcceFerm** → [Catégorie feux](/categorie-produit/feux-clignotants/)
**Mise en conformité en IDF par IEF & CO** → [Demander un devis](/devis-conformite/)

---

## Maillage interne

- Article #1 — « Remplacer les photocellules »
- Article #4 — « Poser une barre palpeuse »
- Article #21 — « Norme EN 13241 portail automatique »
- Article #29 — « Entretien portail automatique »

---

## Images à générer

1. **Hero** : feu clignotant orange seul sur fond blanc, câble 2 fils visible.
2. **Illustration 1** : feu fixé sur pilier de portail, vue extérieure neutre.
3. **Illustration 2** : gros plan sortie FLASH d'une carte électronique (sans marque).

---

## Checklist avant publication

- [ ] Blocs complétés
- [ ] Méta + slug OK
- [ ] Schema HowTo + FAQPage activés
- [ ] Images générées et optimisées
- [ ] Lien interne vers article palpeuse et cellules (quand publiés)
