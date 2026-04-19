# Photocellule portail qui clignote : diagnostic

> **Article P1**
> Destination : acceferm.fr/blog/photocellule-portail-clignote/
> Statut : brouillon v1 — à compléter
> Longueur actuelle : ~1 100 mots / cible 1 200 mots
>
> **Méta** :
> Photocellule de portail qui clignote rouge ou vert ? Signification des LED, diagnostic 3 étapes et solution immédiate.
>
> **Slug** : photocellule-portail-clignote
> **Schema** : Article + HowTo + FAQPage

---

## Introduction

Une photocellule qui clignote est **un message, pas une panne**. Selon la
couleur, la fréquence et le côté (émetteur ou récepteur), elle vous dit
exactement ce qui ne va pas. Encore faut-il savoir lire le message.

Ce guide vous aide à interpréter les LED de vos cellules en 5 minutes, et
à régler le problème dans 80 % des cas sans outil spécifique.

---

## Les LED d'une photocellule : quoi observer

Une paire de photocellules a toujours deux boîtiers face à face :

- **L'émetteur** (TX) : envoie un faisceau infrarouge. Sa LED est souvent
  simplement un témoin d'alimentation.
- **Le récepteur** (RX) : reçoit le faisceau. Sa LED est **plus bavarde**,
  elle indique l'état du faisceau.

Quand on parle d'une « cellule qui clignote », dans 95 % des cas on parle
du **récepteur**.

### Code couleur général (vérifier dans la notice)

La plupart des fabricants suivent une logique proche :

| État LED récepteur | Signification |
|---|---|
| **Vert fixe** | Faisceau reçu, tout va bien |
| **Vert clignotant** | Signal faible (pollution, alignement limite) |
| **Rouge fixe** | Faisceau interrompu (obstacle ou désalignement total) |
| **Rouge clignotant** | Défaut d'alimentation ou composant HS |
| **Orange fixe/clignotant** | Dépend du fabricant — voir notice |
| **Éteinte** | Cellule non alimentée ou morte |

> **[À COMPLÉTER PAR FAYCAL — Bloc #1]**
>
> **Ce qu'il faut ajouter ici** : nuancer ce tableau — certains modèles
> inversent rouge/vert, ou utilisent une LED bicolore qui change selon
> état. Précision « Ce tableau est une convention majoritaire. Toujours
> vérifier la notice du modèle installé. ».
>
> **Pourquoi c'est nécessaire** : éviter plaintes lecteurs dont le modèle
> est différent.
>
> **Format attendu** : 1 phrase de nuance + éventuellement image d'une
> notice générique annotée.

---

## LED rouge fixe : le faisceau est coupé

Trois causes classiques, dans l'ordre de probabilité :

### 1. Obstacle physique

- Branchage d'arbuste qui a poussé pendant l'été.
- Feuilles mortes à la base.
- Jouet, carton, pot de fleurs déplacé.
- Toile d'araignée (oui, vraiment — les araignées adorent les
  infrarouges).

Passer une main doucement entre les deux cellules : si la LED revient
verte et repasse rouge en coupant le faisceau, c'est normal. Sinon,
problème ailleurs.

### 2. Désalignement

Même 1° de désalignement vertical peut suffire à perdre le faisceau. Causes
fréquentes :
- **Vis du support mural desserrée** par les vibrations.
- **Choc** (ballon, véhicule qui a frôlé la cellule).
- **Tassement du support** (pilier qui bouge, platine qui s'est décollée).

Réaligner en pivotant doucement le boîtier récepteur jusqu'à stabiliser
le vert. Resserrer. Vérifier que le vert tient 10 secondes continues.

### 3. Lentille encrassée

La lentille plastique est **sensible à tout** :
- Poussière + humidité → film gras.
- Calcaire des arrosages automatiques.
- Insectes morts collés.
- Résidus de bombe anti-insectes, de graisse, de pulvérisation
  herbicide.

Nettoyer à la **microfibre légèrement humide**, sans produit. Sécher à
sec. Jamais d'alcool ménager qui peut abîmer le revêtement anti-UV.

---

## LED rouge clignotante : défaut d'alimentation ou composant

Symptôme différent du rouge fixe : une **panne interne**, pas un obstacle.

Causes :
- **Tension d'alimentation instable** (fil mal serré sur la borne, humidité
  dans le câblage).
- **Composant interne HS** (diode, transistor) → remplacement nécessaire.
- **Eau infiltrée** dans le boîtier par un presse-étoupe défaillant.

Vérifier la tension à la borne avec un multimètre (doit être stable, du
12 V ou 24 V selon modèle, et pas fluctuant). Si la tension est bonne,
la cellule elle-même est en cause.

Remplacement recommandé — voir notre [guide de remplacement](/blog/remplacer-photocellules-portail/).

---

## LED verte clignotante : signal faible

Moins connu mais fréquent : la LED est **verte mais clignote**, ce qui
signifie que le faisceau est reçu mais affaibli.

Causes :
- **Pluie ou brouillard** temporaire — attendre que ça passe, normal.
- **Alignement limite** qui fonctionnait au moment de la pose et qui
  est maintenant en bord de plage → réaligner.
- **Vieillissement** de l'émetteur — signal moins puissant avec les
  années.
- **Pollution atmosphérique** (pollen massif, fumée proche).

Si le problème persiste par temps sec, refaire l'alignement. Si le
vieillissement est suspecté (cellules > 7-10 ans), remplacement préventif.

---

## Et si ce n'est pas la cellule ?

Point important qu'on **oublie souvent** : si votre portail refuse la
fermeture alors que vos cellules sont vertes et stables, ne passez pas
3 heures à les démonter. **Allez voir la barre palpeuse**.

La palpeuse, fixée sur le chant du vantail ou sur le nez du coulissant,
tombe en panne **plus souvent que les cellules** — surtout les modèles
sans fil avec pile. Ses symptômes se mélangent à ceux des cellules dans
le diagnostic courant.

Voir le [diagnostic complet portail qui ne ferme plus](/blog/portail-automatique-ne-ferme-plus/).

---

## Méthode d'alignement du « faisceau stable 10 secondes »

Pour un réalignement propre :

1. Desserrer légèrement les vis du support récepteur (juste ce qu'il
   faut pour qu'il pivote sans jeu).
2. Orienter franchement vers l'émetteur.
3. Pivoter **par quart de tour** jusqu'à obtenir la LED verte.
4. Une fois verte, pivoter encore très légèrement à droite et à gauche
   pour trouver le **centre de la plage verte** (et non le bord).
5. **Attendre 10 secondes** sans toucher pour vérifier la stabilité.
6. Resserrer les vis en maintenant l'orientation.
7. Retester la fermeture complète du portail.

Un alignement trop « limite » tiendra par temps sec mais lâchera à la
première pluie.

---

## Et en Île-de-France ?

> **[À COMPLÉTER PAR FAYCAL — Bloc #2]**
>
> **Ce qu'il faut ajouter ici** : mention intervention IEF pour
> dépannage rapide cellule.
>
> **Format attendu** : 3 puces avec délai d'intervention.

**[CTA — Dépannage cellule en IDF]** → formulaire IEF & CO

---

## FAQ — Photocellule qui clignote

**Mes deux cellules clignotent en même temps, rouge. C'est normal ?**
Les deux LED qui suivent le même rythme signifient que les deux cellules
ont le même problème → très souvent un défaut d'alim commune. Vérifier
le disjoncteur et les fusibles de l'armoire.

**La cellule clignote seulement le matin, dès le lever du soleil. Bizarre ?**
Oui mais classique : le soleil rasant frappe la lentille sous un angle
qui éblouit le récepteur. Il « voit » trop de lumière et n'identifie plus
le signal IR. Repositionner le récepteur à l'ombre ou installer une
casquette anti-soleil.

**Ma cellule neuve clignote dès l'installation, que faire ?**
Vérifier : polarité (si modèle polarisé), emplacement émetteur/récepteur
(beaucoup de modèles sont non interchangeables), alignement. Si tous OK,
défaut de fabrication → retour SAV.

> **[À COMPLÉTER PAR FAYCAL — Bloc #3]**
>
> **Ce qu'il faut ajouter ici** : 2 questions complémentaires.
>
> **Angle suggéré** : (1) temps entre pose et premier souci (pour rassurer
> sur la durée de vie) ; (2) cellules qui clignotent ET portail qui fait
> du bruit = combien de pannes simultanées possibles.

---

## Conclusion

Une LED qui clignote est rarement une panne définitive. Dans l'ordre :
nettoyer, aligner, vérifier l'alim. Et si toujours rouge après ces trois
gestes, remplacer.

**Voir les photocellules AcceFerm** → [Boutique](/categorie-produit/photocellules/)
**Dépannage rapide en IDF** → [Demander un devis](/devis-depannage/)

---

## Maillage interne

- Article #1 — « Remplacer les photocellules »
- Article #6 — « Portail automatique qui ne ferme plus »
- Article #11 — « Comment choisir ses photocellules »
- Article #29 — « Entretien portail automatique »

---

## Images à générer

1. **Hero** : gros plan sur LED d'une photocellule rouge, reflet sur lentille.
2. **Illustration 1** : tableau code couleur LED (infographie).
3. **Illustration 2** : main qui nettoie une lentille avec microfibre.
4. **Illustration 3** : photocellule mal alignée (vue de dessus schématique).

---

## Checklist avant publication

- [ ] Blocs complétés
- [ ] Méta + slug OK
- [ ] Schema activés
- [ ] Images générées
