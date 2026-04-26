export type LegalSection = { title: string; body: string };
export type LegalDoc = {
  slug: string;
  title: string;
  updatedAt: string;
  lede: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "cgv",
    title: "Conditions générales de vente",
    updatedAt: "20 avril 2026",
    lede:
      "Les règles qui encadrent la relation commerciale entre AcceFerm Pro et vous. Rédigées simplement, lues par un juriste.",
    sections: [
      {
        title: "1. Identité du vendeur",
        body:
          "AcceFerm Pro est opérée par IEF & Co, société immatriculée au RCS de Pontoise, SIRET 888 693 981, TVA intra FR 12 812345678, siège social 8 Rue René Dubos, 95410 Groslay. Directeur de la publication : Emin Saidacar. Contact : contact@acceferm.fr · 01 XX XX XX XX.",
      },
      {
        title: "2. Produits et stock",
        body:
          "Les produits proposés sont neufs, d'origine fabricant, stockés à l'atelier de Groslay. Le stock affiché est mis à jour toutes les 5 minutes. Certaines références de motorisation sont vendues uniquement sur devis, conformément aux clauses de nos partenaires fabricants.",
      },
      {
        title: "3. Prix & taxes",
        body:
          "Les prix sont affichés en HT par défaut pour les comptes pro validés SIRET, TTC pour les particuliers. TVA française 20 % sauf cas d'autoliquidation (BTP, UE). Les remises compte pro Silver (−5 %) et Gold (−10 à −15 %) sont appliquées automatiquement au panier.",
      },
      {
        title: "4. Commande",
        body:
          "La validation du panier et le paiement valent acceptation des présentes CGV. Un email de confirmation est envoyé immédiatement. Un devis peut être émis sur demande via le configurateur motorisation : le devis est valable 30 jours.",
      },
      {
        title: "5. Paiement",
        body:
          "Moyens acceptés : carte bancaire (Stripe 3DS), Apple Pay, Google Pay, virement SEPA pro, Alma 3-4x sans frais (dès 150 € HT), paiement 30j à terme pour les comptes Pro Gold validés.",
      },
      {
        title: "6. Livraison",
        body:
          "Expédition sous 24h ouvrées pour les commandes validées avant 15h47. Livraison 24h Île-de-France (Chronopost Express), 48h France métropole (Chronopost Classic), retrait gratuit à l'atelier 95240. Les délais hors IDF hors métropole sont annoncés au panier.",
      },
      {
        title: "7. Droit de rétractation",
        body:
          "Les particuliers disposent d'un droit de rétractation de 14 jours calendaires à compter de la livraison. Les professionnels en disposent aussi à titre commercial pendant 30 jours, sauf produits personnalisés ou sur-mesure. Formulaire de rétractation disponible à /legal/retractation.",
      },
      {
        title: "8. Garanties",
        body:
          "Garantie légale de conformité (2 ans), garantie contre les vices cachés, et garantie commerciale AcceFerm Pro de 1 an supplémentaire sur les accessoires électroniques. Détails à /legal/garanties.",
      },
      {
        title: "9. SAV & médiation",
        body:
          "SAV technique joignable au 01 XX XX XX XX du lundi au vendredi 8h-19h. En cas de litige non résolu amiablement : Médiateur du e-commerce, 60 rue La Boétie 75008 Paris (www.mediateurfevad.fr).",
      },
      {
        title: "10. Loi applicable",
        body:
          "Les présentes CGV sont soumises au droit français. Les tribunaux de Pontoise sont compétents en cas de litige B2B non résolu à l'amiable.",
      },
    ],
  },
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    updatedAt: "20 avril 2026",
    lede: "Qui édite ce site, qui l'héberge, qui en répond.",
    sections: [
      {
        title: "Éditeur",
        body:
          "AcceFerm Pro — marque exploitée par IEF & Co SARL, capital 50 000 €, RCS Pontoise 812 345 678, siège 8 Rue René Dubos, 95410 Groslay. Directeur de la publication : Emin Saidacar.",
      },
      {
        title: "Hébergement",
        body:
          "Hébergeur initial : IONOS SARL, 7 place de la Gare, 57200 Sarreguemines. Hébergeur edge : Vercel Inc., 440 N Barranca Ave #4133, Covina CA 91723, USA.",
      },
      {
        title: "Propriété intellectuelle",
        body:
          "L'ensemble des contenus (textes, photos, fiches produit, illustrations, code source) est la propriété d'IEF & Co ou de ses partenaires fabricants. Toute reproduction partielle ou totale sans autorisation écrite est interdite.",
      },
      {
        title: "Contact",
        body:
          "Pour toute question relative aux présentes mentions : legal@acceferm.fr. Pour toute demande RGPD : dpo@acceferm.fr.",
      },
    ],
  },
  {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    updatedAt: "20 avril 2026",
    lede:
      "Vos données restent en France, chiffrées, jamais revendues. On vous doit la transparence la plus stricte.",
    sections: [
      {
        title: "Données collectées",
        body:
          "Compte pro : raison sociale, SIRET, TVA intra, nom + prénom + email du dirigeant, téléphone. Commande : adresse de livraison + facturation, historique commande. Navigation : pages visitées (analytics anonymisé Plausible, opt-in CMP).",
      },
      {
        title: "Finalités du traitement",
        body:
          "Traitement des commandes, facturation, SAV technique, amélioration de la plateforme (analytics agrégé), communication commerciale (newsletter opt-in uniquement).",
      },
      {
        title: "Bases légales",
        body:
          "Contrat de vente (commande, facture), intérêt légitime (sécurité, lutte fraude), consentement (newsletter, cookies analytics).",
      },
      {
        title: "Durée de conservation",
        body:
          "Comptes actifs : durée de la relation commerciale + 3 ans. Factures : 10 ans (obligation comptable française). Logs sécurité : 1 an. Newsletter : jusqu'au désabonnement.",
      },
      {
        title: "Vos droits",
        body:
          "Accès, rectification, suppression, portabilité, opposition, retrait du consentement : écrire à dpo@acceferm.fr. Délai de réponse : 30 jours max. Droit de recours auprès de la CNIL (www.cnil.fr).",
      },
      {
        title: "Sous-traitants",
        body:
          "Stripe (paiement, hébergé en Irlande), Brevo (email transactionnel + newsletter, France), Axeptio (CMP, France), Plausible (analytics, Allemagne). Aucun transfert hors UE sans garantie contractuelle.",
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookies & traceurs",
    updatedAt: "20 avril 2026",
    lede: "Ce qu'on stocke, pourquoi, et comment le désactiver.",
    sections: [
      {
        title: "Catégorie 1 · cookies essentiels",
        body:
          "Panier (acceferm.cart.v1 · localStorage · 1 an), préférence HT/TTC (session), CMP (acceferm.cmp.v1 · localStorage · 13 mois max). Toujours actifs car indispensables au fonctionnement.",
      },
      {
        title: "Catégorie 2 · mesure d'audience",
        body:
          "Plausible Analytics, cookieless par défaut, pages vues anonymisées. Désactivable à tout moment via le bandeau CMP ou votre navigateur.",
      },
      {
        title: "Catégorie 3 · marketing",
        body:
          "Aucun cookie marketing tiers activé à ce jour. Si un jour nous en ajoutons (Google Ads, Meta), votre consentement explicite sera requis.",
      },
      {
        title: "Comment modifier mes choix",
        body:
          "Cliquez sur « Cookies » en pied de page pour rouvrir le bandeau CMP. Vous pouvez aussi bloquer les cookies directement depuis les paramètres de votre navigateur.",
      },
    ],
  },
  {
    slug: "retractation",
    title: "Formulaire de rétractation",
    updatedAt: "20 avril 2026",
    lede:
      "14 jours pour les particuliers, 30 jours commerciaux pour les pros. Zéro question, zéro justification.",
    sections: [
      {
        title: "À qui adresser ce formulaire",
        body:
          "AcceFerm Pro — Service rétractation, 8 Rue René Dubos, 95410 Groslay. Email : retractation@acceferm.fr. Téléphone : 01 XX XX XX XX.",
      },
      {
        title: "Délai",
        body:
          "Particulier : 14 jours calendaires à compter de la réception du colis (articles R221-1 et suivants du Code de la consommation). Pro : 30 jours commerciaux à titre commercial (sauf produits personnalisés ou sur-mesure).",
      },
      {
        title: "Modalités de retour",
        body:
          "Produit neuf, dans son emballage d'origine, accompagné des accessoires et de la notice. Les frais de retour sont à la charge du client sauf défaut constaté. Remboursement sous 14 jours après réception en bon état.",
      },
      {
        title: "Formulaire type",
        body:
          "Je soussigné [Nom / Raison sociale], demeurant [adresse], notifie par la présente ma rétractation du contrat portant sur la commande [référence commande] reçue le [date]. Signature et date.",
      },
    ],
  },
  {
    slug: "garanties",
    title: "Garanties",
    updatedAt: "20 avril 2026",
    lede:
      "Garantie légale + garantie fabricant + 1 an AcceFerm Pro additionnel. Échange sans question en cas de défaut.",
    sections: [
      {
        title: "Garantie légale de conformité (2 ans)",
        body:
          "Articles L217-4 et suivants du Code de la consommation. S'applique à tout défaut de conformité existant lors de la délivrance. Vous pouvez demander la réparation, le remplacement ou le remboursement sans avance de frais.",
      },
      {
        title: "Garantie des vices cachés",
        body:
          "Articles 1641 et suivants du Code civil. S'applique aux vices cachés rendant le produit impropre à l'usage auquel il est destiné. Délai : 2 ans à compter de la découverte du vice.",
      },
      {
        title: "Garantie fabricant (1 à 5 ans selon produit)",
        body:
          "Les garanties fabricant (V2, Nice, FAAC, Came, Roger, BFT…) s'appliquent selon les conditions propres à chaque marque. Durée usuelle : 2 ans pour les motorisations, 1 an pour les accessoires électroniques. Détails en fiche produit.",
      },
      {
        title: "Garantie commerciale AcceFerm Pro (+1 an)",
        body:
          "Nous ajoutons 1 an de garantie commerciale après la fin de la garantie fabricant, sur les références électroniques achetées neuves. Échange sans question du produit identique si disponible, ou équivalent.",
      },
      {
        title: "Comment activer la garantie",
        body:
          "1. Appelez le SAV au 01 XX XX XX XX ou ouvrez un ticket depuis votre Espace Pro. 2. Nous vous envoyons un numéro de retour prépayé. 3. Produit reçu + diagnostiqué sous 48h. 4. Remplacement ou remboursement sous 7 jours ouvrés.",
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | null {
  return legalDocs.find((d) => d.slug === slug) ?? null;
}

export function getAllLegalSlugs(): string[] {
  return legalDocs.map((d) => d.slug);
}
