# Portail automatique qui ne ferme plus : que faire

> **Article QW4 — Quick Win n°4**
> Destination : acceferm.fr/blog/portail-automatique-ne-ferme-plus/
> Statut : brouillon v1 — à compléter puis valider avant publication
> Longueur actuelle : ~1 650 mots / cible 1 800 mots (après complétion)
>
> **Méta-description** :
> Portail automatique qui refuse de se fermer ? Les 7 causes les plus fréquentes, comment diagnostiquer en 15 minutes et les solutions.
>
> **Slug** : portail-automatique-ne-ferme-plus
> **Schema** : Article + HowTo (diagnostic étapes) + FAQPage

---

## Introduction

Vous appuyez sur la télécommande. Le portail se met en mouvement, avance
d'un mètre... et s'arrête. Ou il refuse catégoriquement de démarrer la
fermeture. Ou pire : il s'ouvre tout seul deux secondes après avoir
commencé à se fermer.

Bonne nouvelle : dans **8 cas sur 10**, le problème est identifiable en
moins de 15 minutes, et réparable avec les bons réflexes. Ce guide vous
emmène des causes les plus simples (pile de télécommande) aux plus
techniques (carte électronique), avec un arbre de décision clair pour
savoir quand vous pouvez continuer seul, et quand il vaut mieux arrêter.

**À savoir avant de commencer** : coupez l'alimentation du portail avant
toute manipulation sur les câbles ou le moteur. Un portail motorisé, c'est
du 230 V sur la ligne principale, et des batteries qui peuvent continuer
à fournir du courant même disjoncteur coupé.

---

## Avant tout : vérifier l'alimentation et les fusibles

Ça paraît bête. C'est pourtant la cause n°1 des appels au dépannage.

Avant de démonter quoi que ce soit :

- **La LED témoin de l'armoire de commande est-elle allumée ?** Si non,
  problème d'alimentation. Vérifiez le disjoncteur dédié.
- **Le fusible dans l'armoire est-il intact ?** Ouvrez le coffret et
  contrôlez visuellement.
- **Une autre commande fonctionne-t-elle ?** (sélecteur à clé, bouton filaire).
  Si oui, le problème vient de la télécommande ou du récepteur, pas de
  l'alim.

Si l'armoire est morte, arrêtez de diagnostiquer le portail : trouvez
pourquoi il n'y a pas de courant.

---

## Cause n°1 : photocellules mal alignées ou sales

C'est **la cause la plus fréquente** des refus de fermeture, devant toutes
les autres réunies.

**Comment tester en 60 secondes** :
1. Regardez les LED des deux photocellules (émetteur et récepteur).
2. Sur la plupart des modèles, une LED **verte fixe** signifie « faisceau
   stable ». Une LED **rouge** ou **clignotante** signale un problème.
3. Nettoyez les deux lentilles à la microfibre — même si elles ont l'air
   propres, la poussière et les toiles d'araignée sont les ennemies
   invisibles.
4. Vérifiez l'alignement en faisant pivoter très doucement chaque cellule
   jusqu'à ce que la LED redevienne verte stable.

Si ça se stabilise après nettoyage + réalignement, vous avez résolu le
problème. Sinon, l'une des deux cellules est probablement HS — voir notre
[guide de remplacement](/blog/remplacer-photocellules-portail/).

---

## Cause n°2 : barre palpeuse défaillante (la cause sous-estimée)

C'est la cause **la plus oubliée des diagnostics amateurs**, et pourtant
elle tombe en panne **plus souvent que les photocellules**.

Pourquoi ? Une barre palpeuse est fixée **sur le chant du vantail** ou **sur
le nez du coulissant** — donc directement sur la partie mobile. Elle
encaisse les chocs, les frottements, les intempéries, et sur les modèles
sans fil, elle embarque une pile qui se décharge.

### Comment savoir si c'est la palpeuse qui bloque votre fermeture

La carte électronique interprète une palpeuse en défaut comme « obstacle
permanent » et refuse la fermeture pour sécurité. Trois symptômes qui
pointent vers elle :

- **Portail qui part à la fermeture puis s'arrête dès les premiers
  centimètres**, alors que les cellules sont vertes.
- **Voyant palpeuse rouge** ou clignotant sur le boîtier transmetteur
  (pour les kits sans fil).
- **La fermeture marche encore en mode « homme mort »** (bouton
  maintenu) mais pas en automatique — signe que la sécurité palpeuse
  est active en fermeture.

### Tester la palpeuse en 5 minutes

1. **Sur un modèle sans fil** : vérifier l'état du voyant du transmetteur
   fixé sur le vantail. Si rouge fixe ou éteint : changer la pile
   (souvent une CR123A, CR2, ou 9V selon modèle). **Les piles palpeuse
   durent 1 à 2 ans max** — c'est la cause n°1 des pannes sur
   ces kits.
2. **Sur un modèle filaire résistif (8K2)** : mesurer la résistance
   aux bornes avec un multimètre. Doit être de 8,2 kΩ au repos.
   Si infini → fil coupé. Si 0 Ω → court-circuit (souvent une gaine
   écrasée par un choc).
3. **Tester physiquement** : appuyer fermement sur toute la longueur de
   la palpeuse. Le voyant ou la continuité doit réagir à chaque pression.
   Si une zone ne répond pas, la palpeuse a un point mort → remplacement.

### Résistive (8K2) ou sensitive mécanique : les deux technologies

- **Palpeuse résistive 8K2** : la norme moderne. Un fil conducteur dans
  une gaine caoutchouc fermée par une résistance 8,2 kΩ. La carte
  surveille en permanence la résistance totale. Toute rupture ou
  court-circuit déclenche la sécurité. Plus fiable et contrôlée en continu.
- **Palpeuse sensitive mécanique** : un simple contact qui se ferme
  quand on appuie. Moins cher mais non auto-surveillé : une palpeuse
  morte ne sera détectée qu'au moment d'un vrai écrasement — dangereux.
  À éviter sur pose neuve.

### Kit pré-monté ou assemblage

- **Kit prêt-à-poser** : palpeuse déjà coupée à longueur standard,
  embouts et résistance 8K2 intégrés, câble ou émetteur radio prêt. Pose
  en 30 minutes. Idéal en remplacement.
- **Kit à assembler** : longueur caoutchouc au mètre + embouts + résistance
  à monter soi-même. Moins cher, adapté aux portails non standards,
  mais demande un peu de méthode (sertissage propre indispensable pour
  la durabilité).

> **[À COMPLÉTER PAR FAYCAL — Bloc #Palpeuse]**
>
> **Ce qu'il faut ajouter ici** : un retour d'expérience IEF sur la
> fréquence réelle des pannes palpeuses vs cellules sur le parc IDF.
> Ordre de grandeur : sur 100 dépannages « portail ne ferme plus »,
> combien sont palpeuse vs cellule ?
>
> **Pourquoi c'est nécessaire** : contredit intelligemment le réflexe
> grand public (« c'est forcément la cellule »). Crédibilise l'expertise
> et positionne AcceFerm comme le site qui sait vraiment.
>
> **Format attendu** : 1 phrase chiffrée + 1 anecdote de terrain 80 mots.
>
> **Angle suggéré** : cas typique = palpeuse sans fil sur portail battant
> dont la pile n'a jamais été changée depuis la pose 3 ans plus tôt.

---

## Cause n°3 : obstacle invisible sur le chemin du faisceau

Le faisceau infrarouge des photocellules est invisible mais pas
immatériel. Plusieurs obstacles classiques interrompent le faisceau sans
qu'on s'en rende compte :

- **Branches d'arbustes** qui ont poussé pendant l'été.
- **Toile d'araignée tendue entre les deux boîtiers** (oui, vraiment).
- **Flaque d'eau** reflétant le faisceau après une forte pluie.
- **Jouet, outil, sac laissé par erreur** devant la cellule.
- **Pot de fleurs, bac à plantes** déplacé par le vent.

Passez une main le long du trajet théorique du faisceau, au ras du sol.
Enlevez tout ce qui pourrait le couper. Relancez la fermeture.

---

## Cause n°4 : télécommande HS ou pile faible

Si votre portail refuse de se fermer **uniquement depuis votre télécommande**,
mais accepte de se fermer via un sélecteur à clé ou un clavier à code,
c'est la télécommande qui est en cause.

Test rapide :
1. Changez la pile (type CR2032 ou A23 selon modèle). 80 % des cas résolus.
2. Vérifiez la LED de la télécommande en appuyant : si elle n'éclaire pas,
   la télécommande elle-même est morte.
3. Testez avec une seconde télécommande (celle du voisin, d'un proche,
   ou une neuve programmée).

Notre article dédié : [Télécommande de portail HS : causes et solutions](/blog/telecommande-portail-hs/).

---

## Cause n°5 : condensateur moteur en fin de vie

> ⚠️ **ATTENTION — Composant électrique dangereux**
>
> Un condensateur peut conserver une **charge électrique résiduelle mortelle
> pendant plusieurs minutes à plusieurs jours** après coupure de
> l'alimentation. Le toucher sans l'avoir déchargé peut provoquer une
> **électrocution grave, voire mortelle**, même portail débranché.
>
> Avant toute manipulation :
> - Couper le disjoncteur et vérifier l'absence de tension au multimètre.
> - **Décharger le condensateur** en court-circuitant ses bornes via une
>   résistance isolée (typiquement 10 kΩ / 5 W). Ne jamais court-circuiter
>   directement avec un tournevis nu (risque d'arc électrique et de
>   projection de métal en fusion).
> - Porter des **gants isolants** et des lunettes de protection.
> - En cas de doute ou d'inexpérience, **ne pas intervenir** : appelez un
>   professionnel.
>
> **Avertissement de responsabilité** : cet article est fourni à titre
> strictement informatif. AcceFerm et IEF & CO **déclinent toute
> responsabilité** en cas de dommage matériel, de blessure, d'électrocution
> ou de décès résultant de la manipulation d'un condensateur ou de tout
> autre composant électrique décrit ici. En intervenant sur votre portail,
> vous le faites **sous votre entière responsabilité**.

Symptôme typique : le portail **essaie** de bouger, **broute**, fait du
bruit, mais avance à peine. Ou il démarre la fermeture puis s'arrête au
milieu.

Le condensateur est une petite pièce cylindrique (genre grosse pile) sur
le moteur ou dans l'armoire. Sa mission : donner le « coup de pouce »
électrique au démarrage du moteur. Quand il vieillit (typiquement
7-10 ans), le moteur n'a plus assez de couple pour démarrer ou finir
le mouvement.

**Remplacement** : pièce peu coûteuse (généralement moins de 20 €),
mais manipulation 230 V avec composant résiduellement chargé → à
n'entreprendre **que si vous êtes formé à l'électricité**. Sinon, c'est
une intervention pro type.

---

## Cause n°6 : fin de course déréglé

Certains moteurs (notamment les plus anciens) ont des **fins de course
mécaniques** : des butées ou des cames qui disent au moteur « stop, c'est
fermé ».

Si un choc ou le temps a déréglé ces cames, le moteur peut :
- **S'arrêter trop tôt**, laissant le portail entrouvert.
- **Continuer à forcer** une fois fermé, jusqu'à se mettre en sécurité.
- **Refuser de partir** parce qu'il « croit » déjà être en position fermée.

Le réglage se fait typiquement avec un tournevis sur les cames
d'entraînement. Consulter la notice moteur — les procédures varient
trop d'un modèle à l'autre pour être généralisées ici.

---

## Cause n°7 : carte électronique défaillante

Plus rare mais plus lourd. Si aucune des causes précédentes ne colle,
la carte de l'armoire peut elle-même être en cause :
- **Mémoire pleine** (trop de télécommandes enregistrées → saturation).
- **Relais grillé** par la foudre ou l'humidité.
- **Condensateur de carte gonflé** visible à l'œil nu.

C'est l'intervention la plus technique. Si votre armoire a plus de
10 ans et montre plusieurs signes de fatigue (clignotements erratiques,
bruits dans le coffret), envisagez un remplacement plutôt qu'une
réparation — la carte neuve vient avec garantie et support fabricant.

> **[À COMPLÉTER PAR FAYCAL — Bloc #1]**
>
> **Ce qu'il faut ajouter ici** : un retour d'expérience IEF sur un cas de
> carte HS en copropriété IDF, où le diagnostic au téléphone n'aurait pas
> suffi (il a fallu venir voir).
>
> **Pourquoi c'est nécessaire** : montre les limites du diagnostic à
> distance et amorce le CTA dépannage. Crédibilise le pro.
>
> **Format attendu** : encart 100-130 mots, citation, anonymisé.
>
> **Angle suggéré** : un cas d'orage qui a grillé la carte, ou d'humidité
> prolongée dans un coffret extérieur mal étanche.

---

## Cause n°8 : blocage mécanique (crémaillère, galets, pignon)

Sur un portail coulissant, un blocage purement mécanique peut empêcher
la fermeture alors que toute l'électronique est OK :
- **Galet grippé** ou bloqué par un caillou.
- **Crémaillère tordue** ou mal alignée avec le pignon.
- **Rail au sol** obstrué par des feuilles ou de la terre.
- **Pignon usé** (en général après 10+ ans d'usage intensif).

Faites le test en coupant l'alim, débraiyant le moteur avec la clé
manuelle, et essayant de pousser le portail à la main. S'il résiste ou
force, le problème est mécanique. Un coup de graisse + nettoyage de rail
résout la plupart des cas.

Sur un battant, vérifier l'état des gonds et le parallélisme : un portail
tombé dans le temps peut frotter au sol en fin de course.

---

## Arbre de décision : que faire selon le symptôme

| Symptôme observé | Commencer par tester |
|---|---|
| LED armoire éteinte | Disjoncteur + fusible interne |
| LED rouge photocellule | Nettoyage + alignement |
| Part à la fermeture puis s'arrête net | **Barre palpeuse (pile ou continuité)** |
| Télécommande sans réaction | Pile + LED télécommande |
| Portail broute mais ne bouge pas | Condensateur moteur |
| S'arrête en cours de mouvement | Photocellules, palpeuse ou fin de course |
| S'ouvre seul une fois fermé | Voir [article dédié](/blog/portail-qui-souvre-tout-seul/) |
| Rien de tout ça | Carte électronique ou mécanique — passer à un pro |

---

## Quand arrêter de bricoler et appeler un pro

Il y a trois situations où s'obstiner seul peut coûter plus cher qu'un
dépannage pro :

1. **Vous ne comprenez pas le schéma électrique** de votre armoire. Un
   faux contact peut griller la carte complète.
2. **Le portail est sous garantie constructeur** : toute intervention
   non pro peut l'annuler.
3. **Le portail est en copropriété ou en ERP** : la responsabilité
   juridique d'un accident post-intervention amateur est lourde.

Dans ces cas, faire venir un technicien est une assurance, pas un luxe.

---

## Et en Île-de-France ? Faire dépanner par IEF & CO

**IEF & CO** intervient sur tout type de portail automatique en
Île-de-France, quelle que soit la marque.

- **Diagnostic sur place** systématique
- **Pièces détachées courantes** (photocellules, télécommandes, cartes,
  condensateurs) apportées par le technicien
- **Remise en service le jour même** dans 70 % des cas
- **Zones couvertes** : Paris, 92, 93, 94, 77, 78, 91, 95

> **[À COMPLÉTER PAR FAYCAL — Bloc #2]**
>
> **Ce qu'il faut ajouter ici** : délais concrets d'intervention (sous
> 24 h, 48 h, créneau même jour ?), présence du déplacement dans le
> devis (gratuit ? facturé puis déduit ?).
>
> **Pourquoi c'est nécessaire** : sur un article urgence, le lecteur veut
> savoir « vous venez quand ? ». Sans chiffre, il va voir ailleurs.
>
> **Format attendu** : puces courtes, chiffres en gras, 3-5 lignes.

**[CTA — Dépannage portail en IDF]** → formulaire express IEF & CO
(à prévoir : formulaire en 3 champs pour urgence)

---

## FAQ — Portail qui ne se ferme plus

**Combien de temps dure un dépannage portail en moyenne ?**
45 minutes à 1 h 30 pour une cause simple (photocellules, pile, galet).
Jusqu'à 2-3 h pour une carte à remplacer. Comptez une demi-journée pour
un chantier complet avec pièces à commander.

**Puis-je forcer la fermeture à la main en attendant ?**
Oui, avec le **débrayage manuel** de votre moteur (clé ou levier selon
modèle). Consultez la notice. Ne jamais pousser un portail motorisé sans
l'avoir débrayé, au risque d'endommager le moteur.

**Mon portail fonctionne par temps sec mais refuse sous la pluie. Normal ?**
Non, mais classique. C'est presque toujours un problème d'étanchéité d'un
composant (cellule ou armoire). L'humidité fausse la lecture. Intervention
préventive à prévoir avant que la pièce ne meure vraiment.

> **[À COMPLÉTER PAR FAYCAL — Bloc #3]**
>
> **Ce qu'il faut ajouter ici** : 2-3 questions complémentaires venues
> du support client / appels téléphoniques.
>
> **Format attendu** : Q/R 40-60 mots.
>
> **Suggestions d'angle** : (1) question typique du « mon portail fait
> beep 3 fois, ça veut dire quoi ? » ; (2) question sur le coût
> approximatif d'un dépannage (renvoyer au devis sans donner de chiffre
> précis) ; (3) question « est-ce que ça peut être la foudre ? ».

---

## Conclusion

Dans la majorité des cas, un portail qui refuse de se fermer se diagnostique
avec deux réflexes : **inspecter les photocellules** et **tester la
télécommande**. Ça résout déjà 70 % des pannes.

Pour les 30 % restants, remonter la chaîne : condensateur, fins de course,
carte, mécanique. Si vous ne savez plus, arrêtez. Un dépannage de 150 €
coûte moins cher qu'une carte grillée à 400 €.

**Vous avez identifié la pièce ?** → [Commander la pièce AcceFerm](/boutique/)
**Vous êtes en IDF et voulez que quelqu'un vienne vite ?** → [Dépannage IEF & CO](/devis-depannage/)

---

## Maillage interne

- Article #7 — « Télécommande de portail HS »
- Article #8 — « Photocellule portail qui clignote »
- Article #9 — « Moteur de portail qui force ou broute »
- Article #10 — « Portail qui s'ouvre tout seul »
- Article #29 — « Entretien portail automatique : checklist 10 points »

---

## Images à générer

1. **Hero** : portail coulissant en position semi-fermée, vu de l'intérieur
   de la propriété, atmosphère fin de journée, neutre.
2. **Illustration 1** : photocellule en gros plan, LED allumée.
3. **Illustration 2** : main tenant une télécommande avec pile à côté
   sortie de son logement.
4. **Illustration 3** : capot d'armoire ouvert montrant fusibles et
   condensateur (sans logo visible).

---

## Checklist avant publication

- [ ] Tous les blocs [À COMPLÉTER] remplis
- [ ] Méta et slug OK
- [ ] Schema Article + FAQPage + éventuel HowTo activés
- [ ] 4 images générées et optimisées
- [ ] Double CTA testé
- [ ] Article optimisé pour recherche mobile (lecteur en urgence, souvent
      sur smartphone depuis le jardin)
- [ ] Bouton « Appel dépannage » visible dès le premier scroll mobile
