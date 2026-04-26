import type { ImageKey } from "./images";

export type ResourceCategory = "guide" | "diagnostic" | "tuto" | "conformite" | "local";

export type Resource = {
  slug: string;
  title: string;
  lede: string;
  category: ResourceCategory;
  readMinutes: number;
  updatedAt: string;
  author: string;
  image: ImageKey;
  featured?: boolean;
  sections?: { heading: string; body: string }[];
};

export const categoryLabel: Record<ResourceCategory, string> = {
  guide: "Guide d'achat",
  diagnostic: "Diagnostic panne",
  tuto: "Tutoriel d'installation",
  conformite: "Conformité & normes",
  local: "Installateur IDF",
};

export const resources: Resource[] = [
  {
    slug: "remplacer-photocellule-portail",
    title: "Remplacer la photocellule d'un portail automatique",
    lede:
      "Diagnostic visuel, coupure secteur, bornage filaire ou BUS 2easy, contrôle de l'alignement. 20 minutes chrono.",
    category: "tuto",
    readMinutes: 9,
    updatedAt: "18 avr. 2026",
    author: "Techniciens IEF & Co",
    image: "photocell",
    featured: true,
    sections: [
      {
        heading: "Diagnostic : est-ce bien la photocellule ?",
        body:
          "Avant de démonter, on vérifie trois choses : le clignotement de l'armoire (3 flashes = obstacle détecté), l'alignement visuel des deux cellules, et la tension 12-24 V aux bornes. Dans 8 cas sur 10, c'est un encrassement de lentille, pas la cellule. Souffler à l'air sec et tester. Si persistant : passage à l'étape 2.",
      },
      {
        heading: "Couper le courant · bon sens de pro",
        body:
          "Disjoncteur de l'armoire coupé, cadenas LOTO si copro. On ne travaille jamais sous tension sur une carte 230 V. Le ticket SAV d'un installateur qui a grillé une armoire 230 V vaut 380 € de carte — et deux semaines d'arrêt copro. Ne pas lésiner.",
      },
      {
        heading: "Bornage filaire classique ou BUS 2easy ?",
        body:
          "Si 4 fils par cellule (TX + / TX − / RX + / RX −) : filaire. Si 2 fils reliés au bornier BUS de l'armoire : BUS 2easy. Pour le filaire, respecter la polarité et tester à la LED témoin côté récepteur. Pour le 2easy, le bornage est inversé sans drame (bi-directionnel) — mais l'armoire doit détecter la cellule au reboot.",
      },
      {
        heading: "Compatibilités testées AcceFerm Pro",
        body:
          "V2 Sensiva 13C001 : universelle 12-24 V NO/NF, compatible avec la majorité des armoires européennes. V2 Easy : protocole 2easy natif. Roger E80/B70/2C : filaire 12-24 V. Nos fiches produit listent les moteurs compatibles testés sur chantiers IEF.",
      },
      {
        heading: "Test final + signature chantier",
        body:
          "Une fois remise en service : reboot armoire, cycle complet ouverture/fermeture, test obstacle à la main (pas de balai, risque de rayer la lentille), vérification de la reprise automatique. Pour une copro : signature du registre de maintenance, photo des nouvelles cellules, archivage en espace pro AcceFerm (onglet Chantier).",
      },
    ],
  },
  {
    slug: "choisir-motorisation-portail-battant",
    title: "Choisir sa motorisation de portail battant : le guide ingénieur",
    lede:
      "Poids vantail, fréquence d'usage, fréquence d'arrêts intensifs, tension 230 V ou 24 V : la vérité technique.",
    category: "guide",
    readMinutes: 12,
    updatedAt: "12 avr. 2026",
    author: "Techniciens IEF & Co",
    image: "factory",
    sections: [
      {
        heading: "Mesurer avant d'acheter — les trois chiffres qui comptent",
        body:
          "Poids par vantail (pas le total des deux), longueur de vantail depuis la charnière, fréquence estimée (cycles par jour). Sans ces trois chiffres, toute recommandation est à l'aveugle. Règle de terrain : multipliez le poids annoncé par 1,3 pour le vent, la rouille, les gonds qui fatiguent.",
      },
      {
        heading: "Bras articulé vs vérin — vrai choix technique",
        body:
          "Bras articulé : installation facile sur piliers épais (>30 cm), cycle rapide, mais sensible au vent au-delà de 2,5 m de vantail. Vérin : plus robuste, meilleur pour les vantaux lourds >400 kg, plus silencieux, mais nécessite un dégagement de pilier. Sur chantier IEF : 70 % bras, 30 % vérin.",
      },
      {
        heading: "230 V AC ou 24 V DC ?",
        body:
          "230 V = économique, robuste, maintenance simple. 24 V = silencieux, batterie de secours native, compatible solaire, plus doux sur les vantaux bois. Surcoût 24 V : +150 à 300 € HT sur le kit. Pour une copro ou un portail bois : 24 V obligatoire à notre sens.",
      },
      {
        heading: "Usage résidentiel, collectif ou industriel",
        body:
          "EN 12453 classe les usages en 4 niveaux. Résidentiel domestique : classe 1, 20-40 cycles/j, moteur standard. Collectif 10-50 lots : classe 2, 80-200 cycles/j, moteur renforcé + opto-isolation. Industriel/logistique : classe 3-4, 300-1000 cycles/j, moteur brushless + armoire haute fréquence.",
      },
      {
        heading: "Notre top 3 chantier",
        body:
          "V2 AYROS 24 V DC : ratio prix/fiabilité imbattable jusqu.à 400 kg. Roger BE20 : haut de gamme brushless silencieux, 10 ans sans souci. Motor Line LINCE : entrée de gamme fiable pour pavillons. Utilisez le configurateur pour un chiffrage précis.",
      },
    ],
  },
  {
    slug: "portail-ne-ferme-plus",
    title: "Portail automatique qui ne ferme plus : arbre de décision",
    lede: "Symptôme par symptôme, la bonne action en 3 minutes.",
    category: "diagnostic",
    readMinutes: 7,
    updatedAt: "05 avr. 2026",
    author: "SAV AcceFerm Pro",
    image: "gate",
    sections: [
      {
        heading: "Observez avant d'appeler — le clignotement raconte tout",
        body:
          "Regardez le feu orange ou la LED de l'armoire : 1 flash = obstacle, 2 = photocellule en défaut, 3 = butée non atteinte, 4 = ampérage anormal, 5 = moteur déconnecté. La notice de votre armoire a le tableau exact — téléchargeable gratuit depuis nos fiches produit.",
      },
      {
        heading: "Photocellule obstruée ou mal alignée (60 % des cas)",
        body:
          "Essuyez les deux lentilles. Un voile de gras ou une toile d'araignée suffit. Alignez à l'œil : le voyant rouge du récepteur doit s'éteindre quand l'émetteur est actif. Si impossible à aligner, les supports se sont détendus — resserrez les 4 vis de fixation.",
      },
      {
        heading: "Butée de fermeture déréglée (20 %)",
        body:
          "La butée sol s'est affaissée ou la butée mécanique du moteur a glissé. Résultat : le portail ne 'voit' plus qu'il doit s'arrêter et clignote en détection obstacle. Régler la butée mécanique dans le moteur (vis de fin de course) ou remettre la butée sol en place.",
      },
      {
        heading: "Carte électronique grillée (15 %)",
        body:
          "Symptômes : aucun clignotement, pas de bruit moteur, tension 230 V présente en amont. La carte est probablement morte (foudre, humidité, surtension). Remplacement neuf ou d'occasion. Notre compte pro dispose de cartes V2 et Roger Technology en stock J+1.",
      },
      {
        heading: "Moteur en fin de vie (5 %)",
        body:
          "Bruit anormal, chauffe rapide, cycle plus lent qu'avant, huile qui fuit au niveau du réducteur. Les moteurs durent 8-15 ans en résidentiel. Si le vôtre approche, utilisez notre configurateur pour remplacer le kit entier — plus économique qu'une réparation.",
      },
    ],
  },
  {
    slug: "norme-en-12453-copropriete",
    title: "EN 12453 en copropriété : ce que dit vraiment la norme",
    lede: "Les exigences de sécurité, les classes d'usage, la mise en conformité des parcs existants.",
    category: "conformite",
    readMinutes: 14,
    updatedAt: "28 mars 2026",
    author: "Bureau d'études IEF",
    image: "engineering",
    sections: [
      {
        heading: "Ce que la norme impose vraiment",
        body:
          "EN 12453 définit les exigences minimales pour la sécurité d'usage des portes industrielles, commerciales et de garage motorisées. En copropriété : dispositifs de sécurité anti-écrasement (photocellules + barre palpeuse), signalisation lumineuse, arrêt d'urgence accessible. Le syndic est responsable.",
      },
      {
        heading: "Les 4 classes d'usage",
        body:
          "Classe 1 : utilisateurs formés, zone privée (ex. pavillon). Classe 2 : utilisateurs formés, zone publique restreinte (copro fermée). Classe 3 : utilisateurs non formés, zone publique restreinte (entreprise). Classe 4 : utilisateurs non formés, zone ouverte (centre commercial). Plus la classe monte, plus les exigences de redondance augmentent.",
      },
      {
        heading: "Sécurité anti-écrasement obligatoire",
        body:
          "Barre palpeuse EN 12453 sur le bord de fermeture du vantail + photocellules sur piliers. Les photocellules seules ne suffisent pas en classe 2+. Barre palpeuse filaire ou radio : radio plus simple à installer mais attention à la charge batterie.",
      },
      {
        heading: "Mise en conformité d'un parc existant",
        body:
          "Audit sur site : type de portail, usage, équipements actuels. Rapport de conformité : liste des écarts + plan d'action. Travaux : barre palpeuse + photocellules + feu + marquage au sol. Coût moyen d'une remise aux normes sur portail collectif : 1 200-2 400 € HT. IEF & Co propose un forfait audit gratuit IDF.",
      },
      {
        heading: "Documents à garder",
        body:
          "Déclaration CE constructeur du moteur, procès-verbal de mise en service avec signature du poseur, registre de maintenance tenu à jour, certificat EN 12453 des barres palpeuses. Le syndic doit pouvoir produire ces pièces en cas d'accident — sinon sa responsabilité est engagée.",
      },
    ],
  },
  {
    slug: "installer-feu-clignotant",
    title: "Installer un feu clignotant 230 V en 15 minutes",
    lede: "Câblage, antenne, positionnement visuel, reprise après coupure. Tutoriel avec photos.",
    category: "tuto",
    readMinutes: 6,
    updatedAt: "22 mars 2026",
    author: "Techniciens IEF & Co",
    image: "light",
    sections: [
      {
        heading: "Où placer le feu",
        body:
          "Hauteur 2-2,20 m minimum, visible depuis la rue et l'intérieur de la propriété. Sur un pilier maçonné de préférence, pas directement sur le vantail (vibrations). En copropriété : respecter la signalisation imposée par le règlement.",
      },
      {
        heading: "Câblage 3 fils vers l'armoire",
        body:
          "Phase + neutre (secteur) + commande depuis la sortie clignotant de l'armoire. Gaine ICTA enterrée 60 cm minimum jusqu'au pilier. Serre-câble obligatoire à l'entrée du boîtier feu. Pas d'épissure sous terre — toujours dans un boîtier de dérivation IP67.",
      },
      {
        heading: "Antenne intégrée : bien l'orienter",
        body:
          "La plupart des feux modernes (V2 Flash, Motor Line Radius) intègrent l.antenne 433 MHz du récepteur. Orienter verticalement, éviter de la coller contre du métal (pilier en acier = cage de Faraday). Portée télécommandes améliorée de 30-50 %.",
      },
      {
        heading: "Reprise après coupure secteur",
        body:
          "Un feu LED bien câblé se relance automatiquement dès que la commande arrive. Si votre feu reste éteint après une coupure, vérifiez : fusible dans le boîtier, sortie clignotant de l'armoire, paramètre CLI du menu (certaines cartes désactivent la pré-signalisation par défaut).",
      },
    ],
  },
  {
    slug: "installateur-motorisation-portail-paris",
    title: "Trouver un installateur motorisation portail à Paris intra-muros",
    lede: "Critères de sélection, garanties, tarifs 2026 observés, pièges à éviter en copropriété.",
    category: "local",
    readMinutes: 8,
    updatedAt: "18 mars 2026",
    author: "Équipe terrain IEF · Paris 75",
    image: "industrial",
    sections: [
      {
        heading: "Les 4 critères non négociables",
        body:
          "1) SIRET actif + assurance décennale (demander l'attestation). 2) Compétence électrique à jour (habilitation B1V/B2V). 3) Formation fabricant sur les marques qu'ils posent (certificats). 4) Réalisations vérifiables à proximité (photos + références syndics).",
      },
      {
        heading: "Tarifs observés Paris intra-muros 2026",
        body:
          "Pose motorisation standard portail battant : 690-990 € HT. Pose remise en conformité EN 12453 complète : 1 200-1 800 € HT. Dépannage SAV photocellule : 180-280 € HT déplacement + MO. Prix au-delà : méfiance — négociez sur devis comparatif.",
      },
      {
        heading: "Pièges à éviter en copropriété",
        body:
          "Installateur sans contrat cadre : risque de changements d'intervenants. Devis unilatéral sans mise en concurrence : exigez 3 devis (règle ARC). Pièces 'équivalentes' non validées par le fabricant : la garantie saute. Absence de PV de mise en service signé : en cas d'accident, le syndic porte seul la responsabilité.",
      },
      {
        heading: "Pourquoi choisir IEF & Co",
        body:
          "15 ans de terrain Paris intra + IDF, contrats avec 38+ copropriétés, SIRET 888 693 981, formations V2 / Roger Technology / Motor Line à jour, SAV téléphonique par d'anciens poseurs. Devis sous 24h ouvrées, gratuits, sans engagement. Formulaire : /contact.",
      },
    ],
  },
  {
    slug: "remplacer-recepteur-radio-portail",
    title: "Remplacer un récepteur radio 433 MHz rolling-code",
    lede: "Effacer les anciennes télécommandes, mémoriser les nouvelles, bornage 3 fils classique.",
    category: "tuto",
    readMinutes: 5,
    updatedAt: "10 mars 2026",
    author: "Techniciens IEF & Co",
    image: "receiver",
    sections: [
      {
        heading: "Identifier le type de récepteur",
        body:
          "Interne à l'armoire (carte fille à enficher) ou externe (boîtier indépendant câblé 3 fils + antenne). La plupart des armoires modernes acceptent une carte enfichable au format RX22A (Roger), HRRX (V2), FLOX2R (Motor Line). Vérifiez la compatibilité avant achat.",
      },
      {
        heading: "Effacer la mémoire existante",
        body:
          "Procédure universelle : appui long (5-10 s) sur le bouton du récepteur jusqu'à ce que la LED de mémoire change de couleur ou clignote rapidement. Résultat : toutes les télécommandes existantes sont effacées. Obligatoire si vous changez de jeu complet.",
      },
      {
        heading: "Mémoriser les nouvelles télécommandes",
        body:
          "Appui court sur le bouton récepteur, LED qui s'allume fixe. Dans les 10 secondes, appui sur le bouton de la télécommande que vous voulez enregistrer. La LED clignote 2 fois = mémorisée. Répéter pour chaque télécommande. Limite usuelle : 100-1000 télécommandes selon la carte.",
      },
      {
        heading: "Portée faible ? 3 causes possibles",
        body:
          "Antenne trop proche d'une masse métallique. Pile de télécommande faible (remplacer même si elle semble marcher). Interférences WiFi 2,4 GHz (inutiles à 433 MHz mais certains récepteurs de mauvaise qualité sont sensibles). Repositionner l'antenne, remplacer les piles, tester.",
      },
    ],
  },
  {
    slug: "vigik-pmr-acces-immeuble",
    title: "VIGIK + PMR : la conformité d'un accès immeuble en 2026",
    lede: "Ouverture pour livreurs, accès PMR, logs RGPD, protocoles de renouvellement des badges.",
    category: "conformite",
    readMinutes: 11,
    updatedAt: "02 mars 2026",
    author: "Bureau d'études IEF",
    image: "industrial",
    sections: [
      {
        heading: "VIGIK : le standard français imposé aux bailleurs",
        body:
          "Le système VIGIK La Poste + services publics est le standard d'accès immeuble pour livreurs, facteurs, pompiers, EDF, éboueurs. Obligatoire en pratique en immeuble collectif neuf. Renouvellement des autorisations tous les 84h côté pass livreur — le résident n'a rien à faire, c'est la centrale qui gère.",
      },
      {
        heading: "Exigences PMR : accès adapté",
        body:
          "Loi 2005-102 + arrêtés 2006/2011/2017 : toute installation neuve ou rénovée doit permettre l'accès aux personnes à mobilité réduite. Bouton d'appel à hauteur 0,9-1,3 m, contraste visuel, durée d'ouverture minimum 30 secondes, signal sonore pour malvoyants. Audit ERP obligatoire.",
      },
      {
        heading: "Centrales VIGIK compatibles 2026",
        body:
          "Intégral Système CS600 : 1-16 portes, mise à jour en ligne, compatible app résidents. Notre fournisseur historique pour la rénovation parc copro. Nos fiches listent le protocole de mise à jour mensuel (nouvelles clés VIGIK publiées par La Poste).",
      },
      {
        heading: "RGPD : logs d'accès, attention !",
        body:
          "Enregistrer les passages de badges résidents = traitement de données personnelles. Durée de conservation légale recommandée : 6 mois maximum. Le syndic doit informer les résidents (registre des traitements + affichage). Export CSV sur demande d'un résident : obligatoire en 30 jours.",
      },
      {
        heading: "Renouvellement badges résidents",
        body:
          "Protocole recommandé : inventaire annuel des badges actifs, révocation des badges de résidents partis, émission de nouveaux badges en AG annuelle. Conserver un registre papier ou numérique. Prévoir un budget de 8-15 € HT par badge en provision copro.",
      },
    ],
  },
  {
    slug: "dimensionner-motorisation-portail-industriel",
    title: "Dimensionner une motorisation de portail industriel : la méthode en 6 étapes",
    lede:
      "Poids + vent + fréquence + classe EN 12453 + tension disponible + marge de sécurité. La méthode d'un bureau d'études, appliquée.",
    category: "guide",
    readMinutes: 14,
    updatedAt: "19 avr. 2026",
    author: "Bureau d'études IEF",
    image: "industrial",
    sections: [
      {
        heading: "Étape 1 — Mesurer le poids vantail réel",
        body:
          "Le poids fabricant est souvent théorique (vantail nu, sans peinture, sans décor). Pesez en conditions réelles avec un dynamomètre tractant — ou calculez : surface × densité matériau × épaisseur. Acier plein 7,85 g/cm³, aluminium 2,7, bois dur 0,8. Ajoutez la quincaillerie (serrure, boulonnerie) et la peinture (env. 3-5 kg/m²). Multipliez par 1,15 pour tenir compte de la condensation et du gel.",
      },
      {
        heading: "Étape 2 — Calculer la prise au vent",
        body:
          "Un portail industriel plein de 6 m × 2 m subit 300-500 N/m² de pression par vent de 100 km/h selon les règles NV65. Soit 3 600 à 6 000 N répartis sur le portail. La motorisation doit compenser ces efforts sur toute la longueur du vantail. Formule simplifiée : couple requis = force × longueur levier × coefficient friction (1,2). Vantail ajouré divise la charge par 2 à 3.",
      },
      {
        heading: "Étape 3 — Fréquence et classification EN 12453",
        body:
          "Logistique/industrie = classe 3 ou 4, soit 200 à 1 000 cycles/j. Un moteur résidentiel classe 1 (20-40 cycles/j) surchauffe sous 200 cycles. Règle bureau d'études IEF : diviser par 4 le cycle nominal fabricant pour la durée de vie réelle en continu. Un moteur annoncé 50 000 cycles tient 12 500 en usage industriel agressif.",
      },
      {
        heading: "Étape 4 — Choisir 230 V AC ou 24 V DC",
        body:
          "230 V AC : couple élevé constant, convient aux portails très lourds >800 kg. Inconvénient : pas de batterie secours native, arrêts brutaux. 24 V DC : rampes d'accélération/décélération configurables, moins de casse mécanique, batterie secours native 4-12h. Pour logistique en 24/7, le 24 V avec contrôleur d'obstacle opto-isolé est la norme 2026.",
      },
      {
        heading: "Étape 5 — Dimensionner l'armoire et les protections",
        body:
          "Intensité nominale × 1,5 = calibre du disjoncteur amont. Parafoudre Type 2 obligatoire en zone rurale/industrielle. Alimentation séparée pour les accessoires (photocellules, feux) sur circuit 24 V opto-isolé — évite qu'une cellule en défaut ne fasse tomber l'armoire entière. Armoire en coffret IP55 minimum avec ventilation si usage >300 cycles/j.",
      },
      {
        heading: "Étape 6 — Valider la marge de sécurité",
        body:
          "Règle de bureau d'études : la motorisation choisie doit fournir au moins 30 % de couple en plus que le couple calculé au pire cas. Sinon, dérive en 2-3 ans (charnières qui fatiguent, peinture qui s'alourdit). Documentez le calcul dans le cahier des charges, archivage 10 ans. Les moteurs AFCA V2 FORTECO 24 V et Roger Technology BR21/4000 sont nos références testées en logistique.",
      },
    ],
  },
  {
    slug: "guide-complet-vigik-centrale-acces",
    title: "VIGIK de A à Z : installer, maintenir, renouveler une centrale d'accès immeuble",
    lede:
      "Norme La Poste, clés résidents, clés prestataires, mise à jour 84h, RGPD. Le guide complet pour syndics et installateurs.",
    category: "conformite",
    readMinutes: 16,
    updatedAt: "15 avr. 2026",
    author: "Bureau d'études IEF",
    image: "industrial",
    sections: [
      {
        heading: "VIGIK, qu'est-ce que c'est exactement ?",
        body:
          "VIGIK est un système d'accès sans contact développé par La Poste dans les années 1990 pour permettre aux facteurs d'entrer dans les halls d'immeubles collectifs. Depuis, il s'est étendu à tous les services de livraison et d'urgence : pompiers, EDF, éboueurs, Bouygues Telecom, Orange, ENEDIS. Aujourd'hui, c'est le standard de fait en immeuble collectif français — obligatoire en pratique en construction neuve collective.",
      },
      {
        heading: "Les deux types de clés : résidents et prestataires",
        body:
          "Clés résidents (badges personnels) : fournies par le bailleur ou le syndic, attribuées nominativement, révocables individuellement. Clés prestataires VIGIK : portées par les agents (La Poste, pompiers, etc.), renouvellement automatique de leur autorisation toutes les 84h via une base centrale. Le syndic ou bailleur choisit quelles catégories de prestataires il autorise — service par service, horaire par horaire.",
      },
      {
        heading: "Anatomie d'une installation VIGIK en 2026",
        body:
          "1 centrale par immeuble ou par cage (selon topologie), 1 lecteur par porte extérieure + porte de cave + local vélos + ascenseurs étages supérieurs. Centrales Intégral CS600 (1 à 16 portes, standard IDF). Plus simple à maintenir avec un seul fournisseur référencé. Alimentation 12-24 V DC redondée par batterie 4h minimum. Câblage bus BUS ou Ethernet selon centrale. Prévoir 180-380 € HT par porte en matériel + 1-2h de pose par porte.",
      },
      {
        heading: "Mise à jour des clés prestataires : obligatoire",
        body:
          "Les clés VIGIK prestataires sont cryptées et régénérées toutes les 84h par La Poste. La centrale doit donc être connectée à Internet (4G ou Ethernet) ou mise à jour physiquement par un technicien chaque semaine. Sans cette mise à jour : les facteurs ne peuvent plus entrer au bout de 84h. En panne réseau >5 jours : l'immeuble devient inaccessible aux services publics. Budget annuel : abonnement 4G 60-120 €/an.",
      },
      {
        heading: "Renouvellement des badges résidents : la procédure",
        body:
          "Inventaire annuel en AG : liste des badges actifs, liste des résidents partis (à révoquer), liste des nouveaux résidents (à émettre). Révocation sur centrale en 30 secondes, émission de nouveau badge en 2 min, tarif syndic 8-15 € HT le badge. Conserver un registre papier ou numérique — en cas de perte de badge non révoqué, responsabilité du syndic engagée.",
      },
      {
        heading: "RGPD : ce que peu de syndics savent",
        body:
          "Enregistrer les passages de badges (horodatage + identifiant badge) constitue un traitement de données personnelles au sens du RGPD. Obligations : (1) registre des traitements tenu par le syndic, (2) affichage informant les résidents dans le hall, (3) durée de conservation limitée à 6 mois par défaut (ou 13 mois avec consentement explicite), (4) droit d'accès et d'effacement des résidents dans un délai de 30 jours. Une AG votant la surveillance caméra + badges sans mention RGPD peut être attaquée.",
      },
      {
        heading: "Les 4 pannes VIGIK les plus fréquentes",
        body:
          "1) Carte centrale morte après foudre (20 % des pannes) — parafoudre Type 2 obligatoire. 2) Lecteur de porte encrassé (18 %) — nettoyage trimestriel recommandé, tissu microfibre sec. 3) Câble BUS dénudé par un rongeur ou une intempérie (15 %) — passage en gaine ICTA IP67 et point de dérivation étanche. 4) Mise à jour 4G bloquée (12 %) — vérifier antenne, forfait SIM actif, et autorisations SIM. IEF & Co propose un contrat de maintenance annuel 380 € HT tout inclus.",
      },
      {
        heading: "Notre recommandation matériel 2026",
        body:
          "Centrale 1-4 portes : Intégral CS600 classique, 480-620 € HT + lecteurs 95-130 € HT. Centrale >5 portes : CS600 maître + satellites BUS. Pour rénovation de parc bailleur (>50 cages) : Intégral CS600 maître + satellites BUS, supervision centralisée multi-sites. Nos fiches produit listent les compatibilités lecteurs testées sur chantiers IDF.",
      },
    ],
  },
  {
    slug: "entretien-annuel-portail-automatique",
    title: "Entretien annuel d'un portail automatique : la check-list du pro",
    lede: "22 points à vérifier, fréquence recommandée, pièces d'usure à stocker en permanence.",
    category: "guide",
    readMinutes: 10,
    updatedAt: "24 févr. 2026",
    author: "SAV AcceFerm Pro",
    image: "tools",
    sections: [
      {
        heading: "Pourquoi un entretien annuel change tout",
        body:
          "Un portail bien entretenu dure 12-15 ans. Mal entretenu : 6-8 ans, et ce sont les copros qui trinquent avec des charges imprévues. Coût annuel moyen d'un contrat de maintenance IEF : 340-480 € HT — à comparer au 2 500 € HT d'un remplacement moteur anticipé.",
      },
      {
        heading: "Les 22 points de la check-list IEF",
        body:
          "Mécanique : 1) serrage visserie pivots, 2) graissage charnières, 3) tension chaîne/courroie, 4) jeu latéral vantail, 5) alignement gonds, 6) butée de fermeture, 7) butée d'ouverture, 8) état rail coulissant. Électrique : 9) serrage bornier armoire, 10) tension alimentation, 11) isolement terre, 12) protection fusible. Sécurité : 13) test photocellules, 14) test barre palpeuse, 15) test arrêt d'urgence, 16) test feu clignotant. Radio : 17) inventaire télécommandes, 18) portée, 19) antenne. Environnement : 20) caisson étanchéité, 21) évacuation eau, 22) végétation à dégager.",
      },
      {
        heading: "Pièces d'usure à anticiper",
        body:
          "Courroie de transmission : remplacement tous les 5-7 ans. Roulements de vérin : 8-10 ans. Fins de course mécaniques : 5 ans. Photocellules (joints lentille) : 6-8 ans. Batterie de secours 12 V : 3-4 ans. Stock minimum à garder pour un installateur : 3 jeux photocellules, 2 récepteurs, 1 carte de chaque grande marque.",
      },
      {
        heading: "Fréquence selon l'usage",
        body:
          "Résidentiel individuel : 1 visite tous les 18 mois. Copropriété <50 lots : 1 visite/an. Copropriété >50 lots : 2 visites/an (printemps + automne). Industriel/logistique : 4 visites/an + télémaintenance. Notre contrat cadre IEF inclut la fréquence adaptée selon classe EN 12453.",
      },
      {
        heading: "Le compte-rendu écrit, toujours",
        body:
          "Chaque visite donne lieu à un rapport PDF : points contrôlés, relevés (tension, intensité, nombre de cycles), pièces changées, alertes. Le syndic doit archiver. AcceFerm Pro produit ce rapport automatiquement depuis l'Espace Pro, historique accessible dès le 2e passage.",
      },
    ],
  },
];

export function getResource(slug: string): Resource | null {
  return resources.find((r) => r.slug === slug) ?? null;
}

export function getAllResourceSlugs(): string[] {
  return resources.map((r) => r.slug);
}

export function getRelatedResources(slug: string, category: ResourceCategory): Resource[] {
  return resources.filter((r) => r.slug !== slug && r.category === category).slice(0, 3);
}
