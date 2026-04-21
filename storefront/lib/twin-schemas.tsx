/**
 * Schémas SVG interactifs pour le Digital Twin — multi-familles.
 * Chaque schéma définit :
 * - viewBox (par défaut 900x560)
 * - render() : le SVG de fond (structure visuelle)
 * - hotspots : 6-8 composants interactifs avec produits compatibles
 */

import type { ReactNode } from "react";

export type TwinHotspot = {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
  position: { x: number; y: number };
  anchor: { x: number; y: number };
  description: string;
  productSlugs: string[];
  count: string;
  priceFrom: string;
};

export type TwinSchema = {
  id: string;
  family: string;
  name: string;
  shortName: string;
  glyph: string;
  /** SVG path/shapes du fond (sans hotspots, qui sont rendus par le moteur) */
  renderBackground: () => ReactNode;
  hotspots: TwinHotspot[];
  /** Le hotspot actif par défaut */
  defaultHotspotId: string;
};

// ============================================================================
// SCHEMA 1 — PORTAIL COULISSANT (existant, conservé)
// ============================================================================

const coulissantSchema: TwinSchema = {
  id: "coulissant",
  family: "Portails",
  name: "Portail coulissant",
  shortName: "Coulissant",
  glyph: "⇄",
  defaultHotspotId: "photocells",
  renderBackground: () => (
    <>
      <defs>
        <linearGradient id="cou-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-warm)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--color-warm)" stopOpacity="0" />
        </linearGradient>
        <pattern id="cou-bars" x="0" y="0" width="28" height="1" patternUnits="userSpaceOnUse">
          <line x1="14" y1="0" x2="14" y2="1" stroke="var(--color-fg)" strokeWidth="1.5" />
        </pattern>
      </defs>

      <line x1="0" y1="510" x2="900" y2="510" stroke="var(--color-fg)" strokeWidth="1.5" />
      <g opacity="0.35">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`g-${i}`} x1={i * 50} y1="515" x2={i * 50 + 18} y2="535" stroke="var(--color-fg)" strokeWidth="1" />
        ))}
      </g>
      <rect x="55" y="260" width="40" height="250" fill="var(--color-fg)" />
      <rect x="50" y="255" width="50" height="10" fill="var(--color-fg)" />
      <rect x="820" y="260" width="40" height="250" fill="var(--color-fg)" />
      <rect x="815" y="255" width="50" height="10" fill="var(--color-fg)" />
      <rect x="110" y="330" width="700" height="175" fill="url(#cou-grad)" stroke="var(--color-fg)" strokeWidth="2" />
      <rect x="110" y="330" width="700" height="175" fill="url(#cou-bars)" />
      <line x1="110" y1="345" x2="810" y2="345" stroke="var(--color-fg)" strokeWidth="2.5" />
      <line x1="110" y1="490" x2="810" y2="490" stroke="var(--color-fg)" strokeWidth="2.5" />
      <rect x="740" y="478" width="80" height="32" fill="var(--color-warm)" rx="3" />
      {Array.from({ length: 26 }).map((_, i) => (
        <polygon key={`rack-${i}`} points={`${120 + i * 26},505 ${130 + i * 26},505 ${135 + i * 26},510 ${115 + i * 26},510`} fill="var(--color-fg)" opacity="0.85" />
      ))}
      <rect x="830" y="235" width="20" height="25" fill="var(--color-fg)" />
      <circle cx="840" cy="245" r="8" fill="var(--color-fg)" />
      <rect x="60" y="420" width="14" height="20" fill="var(--color-fg)" />
      <circle cx="95" cy="345" r="4" fill="var(--color-fg)" />
      <circle cx="820" cy="345" r="4" fill="var(--color-fg)" />
    </>
  ),
  hotspots: [
    { id: "motor", number: 1, label: "Motorisation coulissante", shortLabel: "Motorisation", position: { x: 760, y: 458 }, anchor: { x: 820, y: 220 }, description: "Moteur 230 V ou 24 V pour portail coulissant jusqu'à 800 kg.", productSlugs: [], count: "84 réf sur devis", priceFrom: "dès 289 € HT" },
    { id: "photocells", number: 2, label: "Photocellules de sécurité", shortLabel: "Photocellules", position: { x: 75, y: 350 }, anchor: { x: 130, y: 150 }, description: "Paire filaire ou BUS 2easy. Portée 10 à 30 m.", productSlugs: ["v2-sensiva-photocellules-paire", "came-dir10-paire-photocellules"], count: "124 réf en stock", priceFrom: "dès 32 € HT" },
    { id: "flashing", number: 3, label: "Feu clignotant orange", shortLabel: "Feu clignotant", position: { x: 440, y: 225 }, anchor: { x: 560, y: 95 }, description: "LED 230 V ou 24 V, avec antenne intégrée.", productSlugs: ["came-kiaron-feu-clignotant-led", "bft-radius-feu-230v"], count: "47 réf", priceFrom: "dès 28 € HT" },
    { id: "receiver", number: 4, label: "Récepteur radio 433 MHz", shortLabel: "Récepteur", position: { x: 845, y: 335 }, anchor: { x: 870, y: 130 }, description: "Récepteur bi-canal universel rolling-code.", productSlugs: ["faac-xr2-recepteur-433-mhz"], count: "186 réf", priceFrom: "dès 19 € HT" },
    { id: "keypad", number: 5, label: "Clavier à codes IP65", shortLabel: "Clavier codes", position: { x: 75, y: 440 }, anchor: { x: 30, y: 510 }, description: "Sans fil ou filaire 2 relais. IP65.", productSlugs: ["roger-clavier-ip65-2-relais"], count: "58 réf", priceFrom: "dès 42 € HT" },
    { id: "safety-edge", number: 6, label: "Barre palpeuse EN 12453", shortLabel: "Barre palpeuse", position: { x: 440, y: 490 }, anchor: { x: 440, y: 550 }, description: "Sécurité anti-écrasement obligatoire en collectif.", productSlugs: [], count: "43 réf", priceFrom: "dès 89 € HT" },
    { id: "battery", number: 7, label: "Batterie de secours", shortLabel: "Batterie", position: { x: 760, y: 510 }, anchor: { x: 870, y: 460 }, description: "Maintien d'ouverture en cas de coupure secteur.", productSlugs: ["bft-alimentation-24v-5a"], count: "38 réf", priceFrom: "dès 18 € HT" },
    { id: "lock", number: 8, label: "Serrure électrique", shortLabel: "Serrure", position: { x: 160, y: 440 }, anchor: { x: 200, y: 540 }, description: "Verrouillage mécanique motorisé.", productSlugs: ["cisa-serrure-electrique-12v"], count: "43 réf", priceFrom: "dès 48 € HT" },
  ],
};

// ============================================================================
// SCHEMA 2 — PORTAIL BATTANT 2 vantaux
// ============================================================================

const battantSchema: TwinSchema = {
  id: "battant",
  family: "Portails",
  name: "Portail battant 2 vantaux",
  shortName: "Battant",
  glyph: "⦽",
  defaultHotspotId: "verins",
  renderBackground: () => (
    <>
      <line x1="0" y1="510" x2="900" y2="510" stroke="var(--color-fg)" strokeWidth="1.5" />
      <g opacity="0.35">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`g2-${i}`} x1={i * 50} y1="515" x2={i * 50 + 18} y2="535" stroke="var(--color-fg)" strokeWidth="1" />
        ))}
      </g>
      {/* Piliers */}
      <rect x="100" y="220" width="44" height="290" fill="var(--color-fg)" />
      <rect x="95" y="215" width="54" height="10" fill="var(--color-fg)" />
      <rect x="756" y="220" width="44" height="290" fill="var(--color-fg)" />
      <rect x="751" y="215" width="54" height="10" fill="var(--color-fg)" />
      {/* Vantail gauche */}
      <g>
        <rect x="155" y="290" width="290" height="220" stroke="var(--color-fg)" strokeWidth="2" fill="none" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`vl-${i}`} x1={170 + i * 30} y1="300" x2={170 + i * 30} y2="500" stroke="var(--color-fg)" strokeWidth="1.5" />
        ))}
        <line x1="155" y1="305" x2="445" y2="305" stroke="var(--color-fg)" strokeWidth="2" />
        <line x1="155" y1="495" x2="445" y2="495" stroke="var(--color-fg)" strokeWidth="2" />
      </g>
      {/* Vantail droit */}
      <g>
        <rect x="455" y="290" width="290" height="220" stroke="var(--color-fg)" strokeWidth="2" fill="none" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`vr-${i}`} x1={470 + i * 30} y1="300" x2={470 + i * 30} y2="500" stroke="var(--color-fg)" strokeWidth="1.5" />
        ))}
        <line x1="455" y1="305" x2="745" y2="305" stroke="var(--color-fg)" strokeWidth="2" />
        <line x1="455" y1="495" x2="745" y2="495" stroke="var(--color-fg)" strokeWidth="2" />
      </g>
      {/* Vérins */}
      <g>
        <rect x="115" y="395" width="55" height="14" fill="var(--color-warm)" rx="2" />
        <line x1="170" y1="402" x2="220" y2="402" stroke="var(--color-warm)" strokeWidth="3" />
      </g>
      <g>
        <rect x="730" y="395" width="55" height="14" fill="var(--color-warm)" rx="2" />
        <line x1="680" y1="402" x2="730" y2="402" stroke="var(--color-warm)" strokeWidth="3" />
      </g>
      {/* Photocellules sur piliers */}
      <circle cx="135" cy="335" r="5" fill="var(--color-fg)" />
      <circle cx="775" cy="335" r="5" fill="var(--color-fg)" />
      {/* Feu sur pilier */}
      <rect x="765" y="195" width="20" height="25" fill="var(--color-fg)" />
      <circle cx="775" cy="207" r="8" fill="var(--color-fg)" />
      {/* Serrure centrale */}
      <rect x="445" y="395" width="10" height="20" fill="var(--color-fg)" />
    </>
  ),
  hotspots: [
    { id: "verins", number: 1, label: "Vérins ou bras articulés", shortLabel: "Vérins", position: { x: 145, y: 402 }, anchor: { x: 30, y: 200 }, description: "Vérin hydraulique ou bras articulé 24 V / 230 V.", productSlugs: [], count: "62 réf sur devis", priceFrom: "dès 289 € HT" },
    { id: "control-board", number: 2, label: "Armoire de commande", shortLabel: "Armoire", position: { x: 122, y: 250 }, anchor: { x: 30, y: 130 }, description: "Carte électronique avec récepteur radio intégré.", productSlugs: [], count: "84 réf", priceFrom: "dès 169 € HT" },
    { id: "photocells-2", number: 3, label: "Photocellules de sécurité", shortLabel: "Photocellules", position: { x: 135, y: 335 }, anchor: { x: 30, y: 340 }, description: "Paire filaire pour détection véhicule/piéton.", productSlugs: ["v2-sensiva-photocellules-paire"], count: "124 réf", priceFrom: "dès 32 € HT" },
    { id: "lock-center", number: 4, label: "Serrure électrique centrale", shortLabel: "Serrure", position: { x: 450, y: 405 }, anchor: { x: 450, y: 555 }, description: "Verrouillage mécanique motorisé entre les vantaux.", productSlugs: ["cisa-serrure-electrique-12v"], count: "43 réf", priceFrom: "dès 48 € HT" },
    { id: "flashing-2", number: 5, label: "Feu clignotant", shortLabel: "Feu", position: { x: 775, y: 207 }, anchor: { x: 870, y: 100 }, description: "LED 230 V avec antenne intégrée.", productSlugs: ["came-kiaron-feu-clignotant-led"], count: "47 réf", priceFrom: "dès 28 € HT" },
    { id: "telecommande", number: 6, label: "Télécommandes rolling-code", shortLabel: "Télécommandes", position: { x: 775, y: 335 }, anchor: { x: 870, y: 350 }, description: "Rolling-code 433 MHz, 2-4 canaux.", productSlugs: ["bft-mitto-2-telecommande"], count: "186 réf", priceFrom: "dès 19 € HT" },
    { id: "battery-2", number: 7, label: "Batterie de secours", shortLabel: "Batterie", position: { x: 757, y: 402 }, anchor: { x: 870, y: 540 }, description: "12 V 7 Ah pour maintien d'ouverture en cas de coupure.", productSlugs: ["bft-alimentation-24v-5a"], count: "38 réf", priceFrom: "dès 18 € HT" },
    { id: "keypad-2", number: 8, label: "Clavier à codes / interphone", shortLabel: "Clavier", position: { x: 122, y: 460 }, anchor: { x: 30, y: 480 }, description: "Clavier IP65 ou interphone GSM 4G.", productSlugs: ["roger-clavier-ip65-2-relais"], count: "58 réf", priceFrom: "dès 42 € HT" },
  ],
};

// ============================================================================
// SCHEMA 3 — PORTE SECTIONNELLE INDUSTRIELLE
// ============================================================================

const sectionnelleSchema: TwinSchema = {
  id: "sectionnelle",
  family: "Industrie",
  name: "Porte sectionnelle industrielle",
  shortName: "Sectionnelle",
  glyph: "⊟",
  defaultHotspotId: "panneaux",
  renderBackground: () => (
    <>
      <line x1="0" y1="510" x2="900" y2="510" stroke="var(--color-fg)" strokeWidth="1.5" />
      {/* Linteau */}
      <rect x="120" y="80" width="660" height="35" fill="var(--color-fg)" />
      {/* Rails verticaux */}
      <rect x="120" y="115" width="18" height="395" fill="var(--color-fg)" />
      <rect x="762" y="115" width="18" height="395" fill="var(--color-fg)" />
      {/* Rails horizontaux (au plafond) */}
      <line x1="120" y1="100" x2="60" y2="100" stroke="var(--color-fg)" strokeWidth="3" />
      <line x1="780" y1="100" x2="840" y2="100" stroke="var(--color-fg)" strokeWidth="3" />
      {/* Tablier (5 panneaux empilés) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={`pan-${i}`}>
          <rect x="138" y={140 + i * 70} width="624" height="68" fill="var(--color-bg-elev)" stroke="var(--color-fg)" strokeWidth="1.5" />
          {/* Cassettes */}
          {Array.from({ length: 6 }).map((_, j) => (
            <rect key={`c-${i}-${j}`} x={148 + j * 102} y={148 + i * 70} width="92" height="52" fill="none" stroke="var(--color-fg)" strokeWidth="1" opacity="0.6" />
          ))}
        </g>
      ))}
      {/* Hublots panoramiques sur 1 rangée */}
      <g>
        {Array.from({ length: 4 }).map((_, j) => (
          <ellipse key={`h-${j}`} cx={250 + j * 130} cy="245" rx="40" ry="14" fill="var(--color-warm-soft)" stroke="var(--color-warm)" strokeWidth="1.5" />
        ))}
      </g>
      {/* Moteur tubulaire au-dessus */}
      <rect x="430" y="60" width="80" height="22" fill="var(--color-warm)" rx="3" />
      <circle cx="470" cy="71" r="6" fill="var(--color-warm-fg)" />
      {/* Photocellules de seuil */}
      <circle cx="160" cy="495" r="6" fill="var(--color-fg)" />
      <circle cx="740" cy="495" r="6" fill="var(--color-fg)" />
      {/* Boîte à boutons */}
      <rect x="60" y="350" width="22" height="40" fill="var(--color-fg)" />
    </>
  ),
  hotspots: [
    { id: "moteur", number: 1, label: "Motorisation tubulaire ou centrale", shortLabel: "Moteur", position: { x: 470, y: 71 }, anchor: { x: 450, y: 30 }, description: "Moteur tri 400V intégré ou central avec chaîne.", productSlugs: [], count: "28 réf sur devis", priceFrom: "dès 1290 € HT" },
    { id: "panneaux", number: 2, label: "Panneaux 40-80 mm isothermes", shortLabel: "Panneaux", position: { x: 450, y: 280 }, anchor: { x: 870, y: 250 }, description: "Choix d'épaisseur, hublots, finition couleur RAL.", productSlugs: [], count: "Sur mesure", priceFrom: "dès 2890 € HT" },
    { id: "hublots", number: 3, label: "Hublots panoramiques", shortLabel: "Hublots", position: { x: 380, y: 245 }, anchor: { x: 200, y: 30 }, description: "1 à 4 rangées, vitrage acrylique sécurité.", productSlugs: [], count: "Optionnel", priceFrom: "+290 € HT" },
    { id: "rails", number: 4, label: "Rails verticaux + horizontaux", shortLabel: "Rails", position: { x: 130, y: 280 }, anchor: { x: 30, y: 280 }, description: "Système de guidage acier galvanisé.", productSlugs: [], count: "Inclus", priceFrom: "—" },
    { id: "photocells-3", number: 5, label: "Photocellules de seuil", shortLabel: "Photocellules", position: { x: 160, y: 495 }, anchor: { x: 30, y: 540 }, description: "Détection obstacle obligatoire EN 12453.", productSlugs: ["v2-sensiva-photocellules-paire"], count: "124 réf", priceFrom: "dès 32 € HT" },
    { id: "barre-palpeuse", number: 6, label: "Barre palpeuse bord d'attaque", shortLabel: "Barre palpeuse", position: { x: 750, y: 470 }, anchor: { x: 870, y: 470 }, description: "Sécurité anti-écrasement obligatoire EN 12453.", productSlugs: [], count: "16 réf", priceFrom: "dès 89 € HT" },
    { id: "commande", number: 7, label: "Boîte à boutons mort-homme", shortLabel: "Commande", position: { x: 71, y: 370 }, anchor: { x: 30, y: 380 }, description: "Commande filaire, RFID ou télécommande radio.", productSlugs: ["roger-clavier-ip65-2-relais"], count: "32 réf", priceFrom: "dès 65 € HT" },
    { id: "feux-trafic", number: 8, label: "Feux trafic rouge / vert", shortLabel: "Feux trafic", position: { x: 760, y: 100 }, anchor: { x: 870, y: 130 }, description: "Signalisation entrée/sortie pour quai logistique.", productSlugs: [], count: "12 réf", priceFrom: "dès 159 € HT" },
  ],
};

// ============================================================================
// SCHEMA 4 — RIDEAU MÉTALLIQUE
// ============================================================================

const rideauSchema: TwinSchema = {
  id: "rideau-metal",
  family: "Industrie",
  name: "Rideau métallique",
  shortName: "Rideau métal",
  glyph: "▤",
  defaultHotspotId: "tablier",
  renderBackground: () => (
    <>
      <line x1="0" y1="510" x2="900" y2="510" stroke="var(--color-fg)" strokeWidth="1.5" />
      {/* Coulisses latérales */}
      <rect x="100" y="80" width="22" height="430" fill="var(--color-fg)" />
      <rect x="778" y="80" width="22" height="430" fill="var(--color-fg)" />
      {/* Coffre supérieur */}
      <rect x="80" y="60" width="740" height="40" fill="var(--color-warm-soft)" stroke="var(--color-fg)" strokeWidth="2" />
      <rect x="80" y="60" width="740" height="40" fill="none" stroke="var(--color-warm)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      {/* Tablier — 22 lames horizontales */}
      {Array.from({ length: 22 }).map((_, i) => (
        <g key={`l-${i}`}>
          <rect x="122" y={110 + i * 18} width="656" height="16" fill="var(--color-bg-elev)" stroke="var(--color-fg)" strokeWidth="0.8" />
          <line x1="122" y1={118 + i * 18} x2="778" y2={118 + i * 18} stroke="var(--color-fg)" strokeWidth="0.5" opacity="0.4" />
        </g>
      ))}
      {/* Axe tubulaire (visible dans le coffre) */}
      <circle cx="450" cy="80" r="12" fill="none" stroke="var(--color-warm)" strokeWidth="2" />
      <line x1="160" y1="80" x2="740" y2="80" stroke="var(--color-warm)" strokeWidth="3" opacity="0.7" />
      {/* Moteur tubulaire latéral */}
      <rect x="725" y="68" width="60" height="24" fill="var(--color-warm)" rx="3" />
      {/* Boîte à boutons */}
      <rect x="55" y="350" width="22" height="40" fill="var(--color-fg)" />
      {/* Manivelle de secours */}
      <line x1="780" y1="200" x2="830" y2="200" stroke="var(--color-fg)" strokeWidth="2" />
      <circle cx="830" cy="200" r="5" fill="var(--color-fg)" />
      {/* Serrure baïonnette */}
      <circle cx="450" cy="500" r="6" fill="var(--color-fg)" />
    </>
  ),
  hotspots: [
    { id: "tablier", number: 1, label: "Tablier — type de lame", shortLabel: "Tablier", position: { x: 450, y: 250 }, anchor: { x: 880, y: 250 }, description: "Lame pleine, microperforée ou grillée selon visibilité souhaitée.", productSlugs: [], count: "12 finitions", priceFrom: "dès 690 € HT/m²" },
    { id: "axe", number: 2, label: "Axe tubulaire", shortLabel: "Axe", position: { x: 450, y: 80 }, anchor: { x: 450, y: 30 }, description: "Tube acier galvanisé Ø60 à Ø133 mm selon poids tablier.", productSlugs: [], count: "Sur mesure", priceFrom: "—" },
    { id: "moteur-tub", number: 3, label: "Moteur tubulaire ou central", shortLabel: "Motorisation", position: { x: 755, y: 80 }, anchor: { x: 870, y: 30 }, description: "Tubulaire intégré (compact) ou central avec chaîne (gros tabliers).", productSlugs: [], count: "18 réf", priceFrom: "dès 590 € HT" },
    { id: "coulisses", number: 4, label: "Coulisses latérales", shortLabel: "Coulisses", position: { x: 111, y: 280 }, anchor: { x: 30, y: 280 }, description: "Acier galvanisé, profondeur 50-80 mm.", productSlugs: [], count: "Inclus", priceFrom: "—" },
    { id: "boite-boutons", number: 5, label: "Boîte à boutons + clé", shortLabel: "Commande", position: { x: 66, y: 370 }, anchor: { x: 30, y: 380 }, description: "Filaire IP65, option télécommande radio.", productSlugs: ["roger-clavier-ip65-2-relais"], count: "32 réf", priceFrom: "dès 89 € HT" },
    { id: "manivelle", number: 6, label: "Manœuvre de secours", shortLabel: "Secours", position: { x: 805, y: 200 }, anchor: { x: 870, y: 230 }, description: "Manivelle ou chaîne en cas de coupure secteur.", productSlugs: [], count: "Inclus", priceFrom: "—" },
    { id: "serrure-baillonette", number: 7, label: "Serrure baïonnette anti-soulèvement", shortLabel: "Serrure", position: { x: 450, y: 500 }, anchor: { x: 450, y: 555 }, description: "Verrouillage mécanique anti-effraction.", productSlugs: [], count: "8 réf", priceFrom: "dès 89 € HT" },
    { id: "parachute", number: 8, label: "Parachute industriel", shortLabel: "Parachute", position: { x: 110, y: 80 }, anchor: { x: 30, y: 30 }, description: "Sécurité anti-chute en cas de rupture câble (industriel).", productSlugs: [], count: "12 réf", priceFrom: "dès 290 € HT" },
  ],
};

// ============================================================================
// SCHEMA 5 — BARRIÈRE LEVANTE
// ============================================================================

const barriereSchema: TwinSchema = {
  id: "barriere-levante",
  family: "Accès & sécurité",
  name: "Barrière levante",
  shortName: "Barrière",
  glyph: "—",
  defaultHotspotId: "lisse",
  renderBackground: () => (
    <>
      <line x1="0" y1="510" x2="900" y2="510" stroke="var(--color-fg)" strokeWidth="1.5" />
      <g opacity="0.3">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`gb-${i}`} x1={i * 50} y1="515" x2={i * 50 + 18} y2="535" stroke="var(--color-fg)" strokeWidth="1" />
        ))}
      </g>
      {/* Coffre du moteur */}
      <rect x="100" y="280" width="80" height="230" fill="var(--color-fg)" />
      <rect x="92" y="270" width="96" height="14" fill="var(--color-fg)" />
      <circle cx="140" cy="380" r="6" fill="var(--color-warm)" />
      {/* Lisse horizontale */}
      <rect x="180" y="278" width="600" height="14" fill="var(--color-bg-elev)" stroke="var(--color-fg)" strokeWidth="2" />
      {/* Bandes rouge/blanc sur la lisse */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`bd-${i}`} x={185 + i * 50} y="280" width="25" height="10" fill="var(--color-warm)" />
      ))}
      {/* Pied repos lisse */}
      <rect x="780" y="280" width="20" height="60" fill="var(--color-fg)" />
      {/* LED clignotant sur coffre */}
      <circle cx="140" cy="290" r="6" fill="var(--color-warm-soft)" stroke="var(--color-warm)" strokeWidth="1.5" />
      {/* Boucles inductives au sol */}
      <ellipse cx="320" cy="490" rx="55" ry="8" fill="none" stroke="var(--color-fg)" strokeDasharray="3 3" />
      <ellipse cx="560" cy="490" rx="55" ry="8" fill="none" stroke="var(--color-fg)" strokeDasharray="3 3" />
      {/* Photocellule */}
      <circle cx="350" cy="340" r="5" fill="var(--color-fg)" />
      {/* Marquage au sol */}
      <line x1="200" y1="510" x2="780" y2="510" stroke="var(--color-warm)" strokeWidth="3" opacity="0.5" />
      <text x="490" y="540" textAnchor="middle" fontSize="11" fill="var(--color-fg-muted)" fontFamily="var(--font-mono)">STOP</text>
    </>
  ),
  hotspots: [
    { id: "lisse", number: 1, label: "Lisse aluminium", shortLabel: "Lisse", position: { x: 480, y: 285 }, anchor: { x: 870, y: 130 }, description: "Lisse aluminium 2-6 m, peinture rouge/blanc ou personnalisée.", productSlugs: [], count: "8 longueurs", priceFrom: "dès 290 € HT" },
    { id: "coffre-moteur", number: 2, label: "Coffre moteur 24V ou 230V", shortLabel: "Coffre moteur", position: { x: 140, y: 380 }, anchor: { x: 30, y: 380 }, description: "Moteur 24 V DC silencieux ou 230 V AC robuste.", productSlugs: [], count: "12 réf", priceFrom: "dès 1090 € HT" },
    { id: "led-flash", number: 3, label: "Feu clignotant LED intégré", shortLabel: "Flash LED", position: { x: 140, y: 290 }, anchor: { x: 30, y: 230 }, description: "Signalisation lumineuse pendant le mouvement.", productSlugs: [], count: "Intégré", priceFrom: "—" },
    { id: "boucle-entree", number: 4, label: "Boucle inductive d'entrée", shortLabel: "Boucle entrée", position: { x: 320, y: 490 }, anchor: { x: 320, y: 555 }, description: "Détection métallique véhicule pour ouverture automatique.", productSlugs: [], count: "4 réf", priceFrom: "dès 290 € HT" },
    { id: "boucle-sortie", number: 5, label: "Boucle inductive de sortie", shortLabel: "Boucle sortie", position: { x: 560, y: 490 }, anchor: { x: 560, y: 555 }, description: "Détection sortie pour libération automatique.", productSlugs: [], count: "4 réf", priceFrom: "dès 290 € HT" },
    { id: "photocell-barriere", number: 6, label: "Photocellule de sécurité", shortLabel: "Photocellule", position: { x: 350, y: 340 }, anchor: { x: 350, y: 230 }, description: "Sécurité anti-écrasement véhicule pendant la fermeture.", productSlugs: ["v2-sensiva-photocellules-paire"], count: "124 réf", priceFrom: "dès 32 € HT" },
    { id: "lecteur-badge", number: 7, label: "Lecteur badges proximité", shortLabel: "Lecteur badges", position: { x: 95, y: 220 }, anchor: { x: 30, y: 130 }, description: "RFID 125 kHz ou 13.56 MHz pour résidents/abonnés.", productSlugs: [], count: "9 réf", priceFrom: "dès 169 € HT" },
    { id: "armoire-barriere", number: 8, label: "Armoire de commande dédiée", shortLabel: "Armoire", position: { x: 140, y: 470 }, anchor: { x: 30, y: 470 }, description: "Programmable horaire, 4 boucles, badges, télécommandes.", productSlugs: [], count: "Inclus dans coffre", priceFrom: "—" },
  ],
};

// ============================================================================
// SCHEMA 6 — BORNE ESCAMOTABLE
// ============================================================================

const borneSchema: TwinSchema = {
  id: "borne-escamotable",
  family: "Accès & sécurité",
  name: "Borne escamotable",
  shortName: "Borne",
  glyph: "▢",
  defaultHotspotId: "borne",
  renderBackground: () => (
    <>
      {/* Sol */}
      <line x1="0" y1="380" x2="900" y2="380" stroke="var(--color-fg)" strokeWidth="1.5" />
      {/* Marquage chaussée */}
      <line x1="0" y1="375" x2="900" y2="375" stroke="var(--color-warm)" strokeWidth="2" opacity="0.4" />
      {/* Borne sortie de terre */}
      <rect x="380" y="180" width="60" height="200" fill="var(--color-bg-elev)" stroke="var(--color-fg)" strokeWidth="2" />
      <ellipse cx="410" cy="180" rx="30" ry="8" fill="var(--color-fg)" />
      {/* Bandes réfléchissantes blanches */}
      {[0, 1, 2].map((i) => (
        <rect key={`band-${i}`} x="383" y={205 + i * 50} width="54" height="10" fill="var(--color-warm-soft)" />
      ))}
      {/* LED rouge tête */}
      <circle cx="410" cy="190" r="5" fill="var(--color-warm)" />
      {/* Caisson sous-sol (vue coupe) */}
      <rect x="350" y="380" width="120" height="160" fill="var(--color-bg-soft)" stroke="var(--color-fg)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="410" y="460" textAnchor="middle" fontSize="10" fill="var(--color-fg-muted)" fontFamily="var(--font-mono)">CAISSON SOL</text>
      {/* Vérin hydraulique sous la borne */}
      <rect x="395" y="400" width="30" height="120" fill="var(--color-warm)" rx="2" />
      <circle cx="410" cy="400" r="6" fill="var(--color-warm)" />
      {/* Cellules signalisation au sol */}
      <circle cx="200" cy="370" r="6" fill="var(--color-fg)" />
      <circle cx="620" cy="370" r="6" fill="var(--color-fg)" />
      {/* Boucle magnétique au sol */}
      <ellipse cx="200" cy="370" rx="80" ry="10" fill="none" stroke="var(--color-fg)" strokeDasharray="3 3" />
      {/* Coffret commande */}
      <rect x="80" y="220" width="50" height="80" fill="var(--color-fg)" />
      <rect x="85" y="225" width="40" height="70" fill="var(--color-bg)" stroke="var(--color-fg)" strokeWidth="1" />
      {/* Panneau signalétique au-dessus */}
      <rect x="640" y="120" width="100" height="50" fill="var(--color-warm-soft)" stroke="var(--color-fg)" strokeWidth="2" />
      <line x1="640" y1="170" x2="690" y2="220" stroke="var(--color-fg)" strokeWidth="2" />
      <text x="690" y="148" textAnchor="middle" fontSize="11" fill="var(--color-fg)" fontFamily="var(--font-mono)" fontWeight="bold">SAS</text>
    </>
  ),
  hotspots: [
    { id: "borne", number: 1, label: "Borne sortie de terre", shortLabel: "Borne", position: { x: 410, y: 230 }, anchor: { x: 200, y: 130 }, description: "Acier galva ou inox 304/316L. Hauteur 500-1200 mm hors-sol.", productSlugs: [], count: "16 modèles", priceFrom: "dès 490 € HT" },
    { id: "led-tete", number: 2, label: "LED rouge/blanche tête", shortLabel: "LED", position: { x: 410, y: 190 }, anchor: { x: 30, y: 130 }, description: "Signalisation lumineuse intégrée pour visibilité nocturne.", productSlugs: [], count: "Optionnel", priceFrom: "+90 € HT" },
    { id: "verin", number: 3, label: "Vérin hydraulique ou électromécanique", shortLabel: "Vérin", position: { x: 410, y: 460 }, anchor: { x: 870, y: 460 }, description: "Hydraulique pour cycles intensifs, électromécanique pour économie.", productSlugs: [], count: "8 motorisations", priceFrom: "dès 1290 € HT" },
    { id: "caisson-sol", number: 4, label: "Caisson de scellement", shortLabel: "Caisson", position: { x: 350, y: 480 }, anchor: { x: 30, y: 480 }, description: "Étanche, drainage intégré, fixation 6 points.", productSlugs: [], count: "Inclus", priceFrom: "—" },
    { id: "cellule-borne", number: 5, label: "Cellules de sécurité", shortLabel: "Cellules", position: { x: 620, y: 370 }, anchor: { x: 870, y: 350 }, description: "Anti-écrasement véhicule pendant la sortie de terre.", productSlugs: ["v2-sensiva-photocellules-paire"], count: "124 réf", priceFrom: "dès 32 € HT" },
    { id: "boucle-magnetique", number: 6, label: "Boucle magnétique de sortie", shortLabel: "Boucle", position: { x: 200, y: 370 }, anchor: { x: 30, y: 350 }, description: "Détection véhicule pour libération automatique.", productSlugs: [], count: "4 réf", priceFrom: "dès 290 € HT" },
    { id: "coffret-borne", number: 7, label: "Coffret de commande", shortLabel: "Commande", position: { x: 105, y: 260 }, anchor: { x: 30, y: 220 }, description: "Centrale gestion 1-8 bornes, badges, horaires.", productSlugs: [], count: "6 modèles", priceFrom: "dès 590 € HT" },
    { id: "panneau-borne", number: 8, label: "Panneau signalétique", shortLabel: "Panneau", position: { x: 690, y: 145 }, anchor: { x: 870, y: 130 }, description: "Avertissement réglementaire SAS / accès contrôlé.", productSlugs: [], count: "8 modèles", priceFrom: "dès 89 € HT" },
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export const twinSchemas: TwinSchema[] = [
  coulissantSchema,
  battantSchema,
  sectionnelleSchema,
  rideauSchema,
  barriereSchema,
  borneSchema,
];

export function getTwinSchema(id: string): TwinSchema | null {
  return twinSchemas.find((s) => s.id === id) ?? null;
}
