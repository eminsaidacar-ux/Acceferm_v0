# Remplacer un récepteur radio de portail automatique

> **Article P1**
> Destination : acceferm.fr/blog/remplacer-recepteur-radio-portail/
> Statut : brouillon v1 — à compléter
> Longueur actuelle : ~1 400 mots / cible 1 500 mots
>
> **Méta** :
> Récepteur radio de portail mort ou changement de télécommandes ? Guide pour choisir et installer un récepteur universel 433 ou 868 MHz.
>
> **Slug** : remplacer-recepteur-radio-portail
> **Schema** : HowTo + FAQPage

---

## Introduction

Votre télécommande ne déclenche plus l'ouverture, même avec une pile neuve
et alors qu'elle s'allume bien quand on appuie. Ou vous avez perdu toutes
vos télécommandes et vous voulez repartir sur un système récent. Dans les
deux cas, changer le **récepteur radio** est la solution la plus rapide et
la moins chère.

Ce guide vous explique comment diagnostiquer la mort du récepteur, choisir
un modèle compatible avec votre installation (fréquence, canaux, rolling
code), l'installer, et réapprendre toutes vos télécommandes en 5 minutes.

---

## Rôle du récepteur : ne pas le confondre avec la carte

Beaucoup de bricoleurs confondent trois éléments distincts :

- **La télécommande** (émetteur radio de poche).
- **Le récepteur radio** (petit module qui capte le signal et l'envoie à
  la carte). **Séparé de la carte** sur la majorité des installations
  résidentielles.
- **La carte électronique** de l'armoire (qui reçoit l'ordre et pilote
  le moteur).

Le récepteur est un **intermédiaire** : il décode le signal radio en
contact sec (un relais qui se ferme quelques secondes), et ce contact est
lu par la carte comme un ordre d'ouverture.

Un récepteur se remplace **indépendamment de la carte**. C'est
réconfortant : pas besoin de tout changer quand une télécommande ne
fonctionne plus.

---

## Comment savoir que c'est bien le récepteur qui est HS

Série de tests à faire dans l'ordre :

1. **Tester plusieurs télécommandes** : si aucune ne fonctionne alors
   qu'elles s'allument toutes, c'est clairement le récepteur.
2. **Déclencher via un sélecteur à clé ou bouton filaire** : si le portail
   bouge, la carte et le moteur sont OK → le problème est bien côté radio.
3. **Vérifier l'antenne** : un fil cassé ou mal serti = perte totale de
   signal. Inspecter visuellement.
4. **Ouvrir le récepteur** : une mémoire saturée (trop de télécommandes
   mémorisées) peut bloquer la réception. Un reset matériel (bouton
   appuyé 10 secondes) résout parfois le problème. Si rien, remplacement.

---

## Choisir un récepteur universel

### Fréquence : 433 MHz ou 868 MHz

C'est **le point critique** — ne pas se tromper :

- **433,92 MHz** : la fréquence historique, encore majoritaire sur le parc
  existant. Toutes les télécommandes courantes sont en 433 MHz.
- **868 MHz** : fréquence plus récente, portée plus longue, moins
  d'interférences. Certains fabricants premium y sont passés.

**Règle simple** : regardez la fréquence marquée sur votre télécommande
actuelle (dos, avec la référence). Prenez un récepteur dans la même
fréquence.

Un récepteur en **bibande (433 + 868)** est le choix universel, un peu
plus cher mais compatible avec tout.

### Nombre de canaux

- **1 canal** : un seul contact de sortie, pour une commande unique
  (ouverture/fermeture sur la même).
- **2 canaux** : deux contacts indépendants, utiles pour commander
  séparément **portail + portillon**, ou **portail total + piéton**.
- **4 canaux** : pour les configurations complexes (portail + garage +
  éclairage + portillon).

Pour un usage standard résidentiel, **2 canaux suffisent** et couvrent
90 % des évolutions futures.

### Rolling code vs code fixe

- **Code fixe** : ancienne technologie, télécommandes facilement clonables
  par un scanner radio. **À proscrire sur installation neuve**.
- **Rolling code** : le code change à chaque appui (algorithme synchronisé
  entre télécommande et récepteur). Impossible à cloner. **Standard
  obligatoire** depuis le milieu des années 2010.

Choisir systématiquement rolling code. Les télécommandes associées sont
au même prix aujourd'hui.

### Capacité mémoire

Le récepteur stocke l'identifiant unique de chaque télécommande autorisée.
Capacités typiques :
- **Entrée de gamme** : 20-30 télécommandes max → suffit pour une maison.
- **Milieu de gamme** : 100-200 télécommandes → résidence, petit immeuble.
- **Pro** : 500-1 000+ → copropriété, entreprise.

Pour une maison individuelle, pas besoin de surcapacité. En copropriété,
compter large (10-15 % de marge au-dessus du nombre de résidents).

### Alimentation

Vérifier que le récepteur accepte la tension de votre armoire :
- **12 V AC/DC** : très répandu sur les petites armoires.
- **24 V AC/DC** : le plus fréquent.
- Certains modèles **multi-tension 12-24 V AC/DC** — ce sont les plus
  pratiques.

> **[À COMPLÉTER PAR FAYCAL — Bloc #1]**
>
> **Ce qu'il faut ajouter ici** : tableau de recommandation AcceFerm par
> profil utilisateur (maison, copro, pro), avec renvoi vers produit de la
> catégorie récepteurs (sans nommer de marque).
>
> **Pourquoi c'est nécessaire** : transforme le guide en CTA direct vers
> boutique sur 3 profils distincts.
>
> **Format attendu** : tableau 3 lignes × 4 colonnes (profil / canaux /
> mémoire / lien produit).

---

## Étapes de remplacement

### 1. Couper le courant

Disjoncteur OFF. Vérifier au testeur.

### 2. Démonter l'ancien récepteur

Photographier le câblage avant de débrancher. Noter quels fils vont sur
quelles bornes.

Bornes typiques sur un récepteur :
- **+ et −** : alimentation.
- **Antenne** : fil rigide vertical sorti du boîtier.
- **NO + COM (canal 1)** : contact sec qui sort vers la carte.
- **NO + COM (canal 2)** : idem pour le 2ᵉ canal.

### 3. Monter le nouveau récepteur

Fixer à l'intérieur du coffret de l'armoire (à l'abri de l'humidité).

Rebrancher selon votre photo :
- Alim vers + / −
- Antenne sortie verticale (ne pas la couper, ne pas la lover)
- Canal 1 → entrée **START** de la carte (ou équivalent)
- Canal 2 → entrée **PIÉTON** (ou **PED**) si usage double

### 4. Remettre le courant

La LED d'alimentation du récepteur doit s'allumer.

---

## Apprendre les télécommandes

Chaque récepteur a sa propre procédure d'apprentissage. Schéma général :

1. Appuyer sur le **bouton PRG** (ou **LEARN**) du récepteur pendant
   1-2 secondes.
2. Une LED clignote, indiquant l'attente.
3. Appuyer sur le **bouton à enregistrer** de la télécommande (ne pas
   relâcher trop vite).
4. La LED du récepteur confirme (1 ou 2 clignotements rapides).
5. Répéter pour chaque télécommande.

Tester immédiatement après apprentissage.

### Cas d'une ancienne télécommande rolling code d'un autre fabricant

Un récepteur universel de 2024+ gère généralement plusieurs protocoles
rolling code des grandes marques. Vérifier sur la fiche produit avant
achat.

Si incompatibilité : il faut racheter des télécommandes neuves. Leur prix
reste faible.

---

## Compatibilité avec d'anciennes télécommandes (dipswitch)

Certains parcs très anciens utilisent des télécommandes à **code fixe
programmable par dipswitch** (petits interrupteurs à l'intérieur de la
télécommande). Un récepteur moderne rolling code **ne lira pas ces
télécommandes**.

Deux choix :
1. Remplacer les télécommandes par du rolling code neuf — recommandé, plus
   sûr et pas plus cher aujourd'hui.
2. Prendre un récepteur spécifiquement marqué **compatible code fixe
   dipswitch** — se fait encore en rénovation.

> **[À COMPLÉTER PAR FAYCAL — Bloc #2]**
>
> **Ce qu'il faut ajouter ici** : mention pratique sur les dépannages
> « mon voisin peut ouvrir mon portail avec sa télécommande » → signe
> de code fixe → intervention recommandée. Angle sécurité.
>
> **Format attendu** : encart 80 mots.

---

## Et en Île-de-France ?

Le remplacement du récepteur est accessible en bricolage si vous êtes
à l'aise avec le câblage d'une armoire. En cas de doute, une intervention
pro dure 30-45 minutes sur place.

**[CTA — Intervention récepteur radio en IDF]** → formulaire IEF & CO

> **[À COMPLÉTER PAR FAYCAL — Bloc #3]**
>
> **Ce qu'il faut ajouter ici** : préciser si IEF propose le
> **remplacement par récepteur + 2 télécommandes** comme forfait simple.
> Délai intervention.
>
> **Format attendu** : 3 puces.

---

## FAQ — Récepteur radio de portail

**Mon récepteur a une mémoire pleine, comment faire ?**
Deux options : effacer toutes les télécommandes (reset usine, bouton
PRG maintenu 10+ secondes) puis réapprendre celles encore utilisées ;
ou changer pour un récepteur à plus grande capacité.

**Puis-je mettre 2 récepteurs en parallèle sur la même carte ?**
Techniquement oui, en branchant les 2 sorties NO en parallèle sur la même
entrée START. Utile quand on veut garder un parc ancien de télécommandes
tout en ajoutant un nouveau système en parallèle.

**Le récepteur capte mal, que faire ?**
Vérifier l'antenne (déroulée verticalement, pas coupée). Déplacer le
récepteur loin des éléments métalliques et des alimentations à découpage.
Un câble d'antenne déporté (avec connecteur SMA) peut aider.

> **[À COMPLÉTER PAR FAYCAL — Bloc #4]**
>
> **Ce qu'il faut ajouter ici** : 2 questions supplémentaires du terrain.
>
> **Angle suggéré** : question sur pare-foudre pour récepteur ; question
> sur récepteur + smartphone (passerelle Wi-Fi).

---

## Conclusion

Remplacer un récepteur, c'est **45 minutes** et l'occasion de passer à
du rolling code sécurisé si ce n'était pas déjà le cas.

**Voir les récepteurs AcceFerm** → [Catégorie récepteurs](/categorie-produit/recepteurs-radio/)
**Faire poser en IDF** → [Demander un devis](/devis-installation/)

---

## Maillage interne

- Article #7 — « Télécommande de portail HS »
- Article #10 — « Portail qui s'ouvre tout seul »
- Article #12 — « Récepteur radio universel : lequel choisir »

---

## Images à générer

1. **Hero** : récepteur 2 canaux seul sur fond blanc, antenne visible.
2. **Illustration 1** : intérieur de coffret d'armoire avec récepteur fixé.
3. **Illustration 2** : bornes de câblage en gros plan.

---

## Checklist avant publication

- [ ] Blocs complétés
- [ ] Aucune référence fabricant nommée
- [ ] Méta + slug OK
- [ ] Images générées
- [ ] Maillage vérifié
