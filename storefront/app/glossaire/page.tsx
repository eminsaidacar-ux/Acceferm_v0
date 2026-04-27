import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { GlossaireSearchAndList } from "@/components/glossaire/search-and-list";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";

export const metadata: Metadata = {
  title: "Glossaire technique — fermetures automatiques & contrôle d'accès",
  description:
    "90 termes techniques définis clairement. Rolling-code, VIGIK, relais sec, BUS 2easy, barre palpeuse, IP65, armoire logique… le vocabulaire du métier.",
};

type Term = {
  term: string;
  def: string;
  related?: string[];
};

const GLOSSARY: Term[] = [
  { term: "Armoire logique", def: "Le « cerveau » qui contrôle la motorisation. Relie le moteur, la télécommande, les photocellules, le feu, et la carte radio. Elle est ce qui grille en premier en cas de foudre.", related: ["Carte électronique"] },
  { term: "Automate programmable (PLC)", def: "Contrôleur industriel utilisé pour les portails de classe 4 et les grands sites logistiques. Plus cher qu'une armoire grand public mais redondance native et protocoles industriels (Modbus, Ethernet/IP).", related: ["Classe 4"] },
  { term: "Barre palpeuse", def: "Dispositif de sécurité placé sur le bord du vantail. Détecte la pression d'un obstacle par déformation d'un caoutchouc. Obligatoire en classe EN 12453 niveau 2+.", related: ["EN 12453"] },
  { term: "Badge RFID 125 kHz", def: "Badge d'accès à basse fréquence. Lecture sans contact à 2-5 cm. Moins sécurisé qu'un badge 13.56 MHz, mais toujours largement déployé en copropriétés.", related: ["VIGIK", "MIFARE"] },
  { term: "Borne escamotable", def: "Poteau motorisé qui descend dans le sol pour autoriser l'accès. Plus esthétique qu'une barrière levante, utilisé en centre-ville et zones commerçantes. Cycle de 3-6 s en montée.", related: ["Barrière levante"] },
  { term: "Brushless (moteur)", def: "Moteur électrique sans charbon, commuté électroniquement. Silencieux, longue durée de vie (80 000+ cycles), rendement supérieur. Cher à l'achat, amorti sur copropriétés.", },
  { term: "BUS 2easy", def: "Protocole filaire 2 fils propriétaire des armoires italiennes (équivalent BUS-L sur d.autres marques). Permet le câblage simple des accessoires (photocellules, claviers) avec polarité libre. Standard sur armoires modernes du segment résidentiel et copropriété.", related: ["Filaire polarisé"] },
  { term: "BUS-L", def: "Équivalent du protocole 2easy sur d.autres armoires. Protocole 2 fils pour accessoires compatibles. Gain de câble et fiabilité accrue.", },
  { term: "Câble SYT1", def: "Câble télécom 2-4 paires torsadées 0,9 mm², norme NF C 32-064. Standard pour bus de communication basse tension. Ne pas confondre avec SYT2 (8 paires).", },
  { term: "Carte électronique (armoire)", def: "La partie remplaçable dans l'armoire logique. Stocke la mémoire des télécommandes, les paramètres de vitesse, les timings. Coût : 80-320 € selon marque.", related: ["Armoire logique"] },
  { term: "CE (marquage)", def: "Marquage obligatoire pour tout produit mis sur le marché européen. Atteste de la conformité aux directives applicables. Le poseur doit produire une déclaration CE d'ensemble pour chaque motorisation mise en service.", related: ["Directive Machines"] },
  { term: "Centrale VIGIK", def: "Dispositif qui gère les clés VIGIK et les badges résidents d'un immeuble. 1 à 16 portes, mise à jour en ligne, logs RGPD.", related: ["VIGIK"] },
  { term: "Classe 1 / 2 / 3 / 4 (EN 12453)", def: "Classification d'usage d'une motorisation selon les utilisateurs et la zone. Classe 1 = pavillon. Classe 4 = ERP public. Plus la classe monte, plus la redondance de sécurité augmente.", related: ["EN 12453"] },
  { term: "Clavier à codes", def: "Clavier numérique filaire ou radio pour autoriser l'ouverture par code PIN. IP65 obligatoire en extérieur. 1 à 4 codes maîtres + codes temporaires dans les modèles récents.", },
  { term: "Courroie de transmission", def: "Élément d'entraînement entre le moteur et le pignon. S'use en 5-7 ans selon la fréquence. Remplacement visible sur entretien annuel.", },
  { term: "Couple de démarrage", def: "Force de rotation disponible à l'instant initial. Plus il est élevé, plus le portail démarrera sans effort même avec un vent contraire. Mesuré en Nm (Newton-mètres).", },
  { term: "DoP (Déclaration de Performance)", def: "Document produit obligatoire depuis le Règlement Produits de Construction (UE 305/2011). Précise les performances techniques d'un produit (résistance au vent, étanchéité, etc.).", related: ["EN 13241-1"] },
  { term: "EN 12453", def: "Norme européenne de sécurité d'usage pour portes motorisées. Définit les 4 classes d'usage et les dispositifs obligatoires (photocellules, barres palpeuses, arrêt d'urgence).", related: ["Classe 1 / 2 / 3 / 4"] },
  { term: "EN 13241-1", def: "Norme produit des portes industrielles. Exigences mécaniques, thermiques, acoustiques, sécurité. Fait référence à EN 12453 pour l'usage motorisé.", },
  { term: "Encodeur", def: "Capteur qui compte les tours moteur pour que l'armoire connaisse la position exacte du portail. Remplace les fins de course mécaniques sur les moteurs modernes. Fiable sur 50 000+ cycles.", },
  { term: "Feu clignotant", def: "Signalisation lumineuse obligatoire sur les portails motorisés accessibles au public. Pré-signalisation de 2-3 s recommandée avant démarrage. LED 24V ou 230V.", },
  { term: "Filaire polarisé", def: "Câblage classique d'accessoires à respecter positif/négatif. Opposé au 2easy / BUS-L qui accepte n'importe quel sens.", related: ["BUS 2easy"] },
  { term: "Fin de course", def: "Capteur mécanique qui signale à l'armoire que le portail est complètement ouvert ou fermé. Remplacé par encodeur sur les moteurs récents.", related: ["Encodeur"] },
  { term: "Gâche électrique", def: "Mécanisme de verrouillage de porte actionné électriquement. 12 V DC le plus souvent. Normal fermée (NC) ou normal ouverte (NO) selon contexte (incendie ERP = NC).", },
  { term: "HomeKit / Google Home", def: "Écosystèmes de domotique grand public. Interopérabilité via pont MQTT ou hub Matter. De plus en plus demandée en résidentiel haut de gamme, inutile en copropriété.", },
  { term: "IK (indice)", def: "Indice de résistance aux chocs mécaniques. IK07 = privé surveillé. IK08 = voie publique. IK10 = anti-vandalisme. Norme IEC 62262.", },
  { term: "IP (indice)", def: "Indice de protection étanchéité. 1er chiffre = poussière, 2e chiffre = eau. IP65 = poussière totalement bloquée + jets d'eau. Standard extérieur.", related: ["IK (indice)"] },
  { term: "Interphone GSM 4G", def: "Interphone qui transmet par réseau mobile 4G/LTE au lieu d'une ligne téléphonique cuivre. Obligatoire depuis la fermeture progressive du RTC. Carte SIM dédiée.", },
  { term: "Keypad (voir Clavier à codes)", def: "Terme anglais pour clavier à codes. Utilisé dans les notices fabricant internationales.", related: ["Clavier à codes"] },
  { term: "Kit batterie secours", def: "Batterie 12 V 7-12 Ah + carte de charge intégrée à l'armoire. Maintient la motorisation opérationnelle 4-12 h en cas de coupure secteur. Obligatoire en ERP.", },
  { term: "Klaxon de détection", def: "Buzzer sonore qui signale l'ouverture imminente aux personnes présentes. Alternative au feu clignotant dans les zones calmes (copropriétés résidentielles).", },
  { term: "MIFARE 13.56 MHz", def: "Standard de badge sans contact à haute fréquence. Plus sécurisé que le 125 kHz, supporte chiffrement. Compatible smartphone NFC.", related: ["Badge RFID 125 kHz"] },
  { term: "Motorisation à bras articulé", def: "Moteur à bras pliant fixé au vantail. Installation simple sur piliers épais (>30 cm). Sensible au vent au-delà de 2,5 m de vantail.", },
  { term: "Motorisation à vérin", def: "Moteur linéaire fixé au pilier et au vantail. Plus robuste que le bras articulé, meilleur pour vantaux lourds (>400 kg). Nécessite un dégagement de pilier.", },
  { term: "Motorisation enterrée", def: "Moteur encastré sous le pivot du vantail. Esthétique (invisible), mais travaux de maçonnerie lourds à l'installation. Réservé aux portails haut de gamme.", },
  { term: "NO / NF (contact)", def: "Normally Open / Normally Closed. Type de contact sec d'un relais ou d'une photocellule. NO = ouvert au repos, se ferme sur action. NF = inverse.", related: ["Relais sec"] },
  { term: "Opto-isolation", def: "Séparation électrique entre deux circuits via une LED + photo-transistor. Protège l'électronique des surtensions et parasites. Standard sur cartes industrielles.", },
  { term: "Photocellule", def: "Paire émetteur + récepteur infrarouge placée en travers du passage. Détecte un obstacle par interruption du faisceau. Obligatoire en classe EN 12453 niveau 2+.", related: ["EN 12453"] },
  { term: "Portail autoportant", def: "Portail coulissant sans rail au sol. Guidage par chariots dans un profil en U. Esthétique et sans entretien de rail, mais plus cher à l'installation.", },
  { term: "Programmation rolling-code", def: "Procédure d'appariement d'une télécommande rolling-code avec son récepteur. Appui long, clignotement de confirmation, appui télécommande. 10 secondes chrono.", related: ["Rolling-code"] },
  { term: "Relais sec (contact sec)", def: "Contact de sortie sans tension propre, commandable par une tension externe. Utilisé pour commander une motorisation depuis un système tiers (alarme, domotique).", },
  { term: "Rolling-code", def: "Protocole de cryptage radio où le code change à chaque appui. Protège contre le copieur-voleur. Standard depuis les années 2000.", },
  { term: "SAV ticketing", def: "Système de suivi des demandes de service après-vente avec numéro de dossier, historique, pièces commandées. Pro-level, indisponible chez les incumbents généralistes.", },
  { term: "Sectionnelle (porte)", def: "Porte de garage à panneaux articulés qui remontent au plafond. Gain de place maximum, isolation thermique native, standard en industrie logistique.", },
  { term: "Télécommande 433 MHz", def: "Fréquence radio standard en Europe pour les télécommandes rolling-code. Portée 50-100 m en conditions normales.", related: ["Rolling-code"] },
  { term: "VIGIK", def: "Standard français de clés d'accès immeuble pour livreurs, facteurs, pompiers. Renouvellement automatique des autorisations toutes les 84h. Obligatoire en pratique en immeuble collectif.", related: ["Centrale VIGIK"] },
];

export default function GlossairePage() {
  const grouped = GLOSSARY.reduce<Record<string, Term[]>>((acc, t) => {
    const l = t.term[0].toUpperCase();
    (acc[l] ??= []).push(t);
    return acc;
  }, {});
  const letters = Object.keys(grouped).sort();

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-3 text-[12px] lg:px-8">
            <a href="/" className="text-fg-muted transition hover:text-fg">Accueil</a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <a href="/ressources" className="text-fg-muted transition hover:text-fg">Ressources</a>
            <ChevronRight className="h-3 w-3 text-fg-faint" />
            <span className="font-medium text-fg">Glossaire</span>
          </div>
        </nav>

        <section className="border-b border-border-soft py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-muted">
              {GLOSSARY.length} termes · mis à jour mensuellement
            </p>
            <h1 className="mt-6 font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.025em] text-fg lg:text-[88px]">
              Le vocabulaire
              <br />
              <span className="italic font-medium text-accent">du métier.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              Un glossaire écrit pour un installateur qui reprend un chantier hérité, un syndic
              qui lit un devis, ou un apprenti de deuxième année. Pas de copie Wikipedia, pas de
              définitions fabricant.
            </p>

            <GlossaireSearchAndList
              terms={GLOSSARY}
              letters={letters}
              grouped={grouped}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border-soft bg-bg-elev py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="font-display text-[32px] font-semibold leading-[1] tracking-[-0.02em] text-fg lg:text-[44px]">
              Un terme manquant ?
            </h2>
            <p className="mt-3 text-[14px] text-fg-muted">
              Signalez-le nous, on ajoute au glossaire sous 48h et on vous crédite.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] font-medium text-fg hover:border-fg"
            >
              Proposer un terme
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
