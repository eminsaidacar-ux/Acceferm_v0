/**
 * Mock dashboard data pour l'Espace Pro.
 */

export type ProOrder = {
  ref: string;
  date: string;
  chantier: string;
  city: string;
  items: number;
  total: number;
  status: "expedie" | "preparation" | "livre" | "facture-due";
  trackingEta?: string;
};

export const proOrders: ProOrder[] = [
  {
    ref: "AF-2026-0472",
    date: "19 avr. · 14h22",
    chantier: "Copro Voltaire · syndic Foncia",
    city: "Puteaux 92",
    items: 14,
    total: 1248.6,
    status: "preparation",
    trackingEta: "Expédition demain 10h",
  },
  {
    ref: "AF-2026-0471",
    date: "18 avr. · 09h11",
    chantier: "Résidence Lumière · bâtiment B",
    city: "Nanterre 92",
    items: 6,
    total: 432.4,
    status: "expedie",
    trackingEta: "Livré demain avant 12h",
  },
  {
    ref: "AF-2026-0468",
    date: "16 avr. · 16h45",
    chantier: "Maison particulière · devis n°478",
    city: "Rueil 92",
    items: 3,
    total: 186.9,
    status: "livre",
  },
  {
    ref: "AF-2026-0464",
    date: "12 avr. · 11h03",
    chantier: "Entrepôt logistique Gefco",
    city: "Gonesse 95",
    items: 22,
    total: 4389.0,
    status: "facture-due",
    trackingEta: "Facture échéance 12 mai",
  },
];

export const proMetrics = {
  mtdSpend: 6256.9,
  mtdOrders: 9,
  ytdSpend: 48290.4,
  tierProgress: 72, // %
  nextTierLabel: "Pro Gold (-12 % HT)",
  nextTierThreshold: 60000,
  currentTierLabel: "Pro Silver (-5 %)",
  openQuotes: 3,
  pendingInvoices: 2,
  pendingInvoicesAmount: 4821.6,
};

export type ReorderItem = {
  slug: string;
  code: string;
  brand: string;
  name: string;
  lastQty: number;
  lastOrdered: string;
  frequency: string;
};

export const reorderList: ReorderItem[] = [
  {
    slug: "v2-sensiva-photocellules-paire",
    code: "V2-SE3",
    brand: "V2",
    name: "Sensiva photocellules filaires paire",
    lastQty: 4,
    lastOrdered: "18 avr.",
    frequency: "toutes les 2 semaines",
  },
  {
    slug: "roger-rx22a-recepteur-433-mhz",
    code: "ROGER-RX22A",
    brand: "Roger Technology",
    name: "RX22A récepteur 433 MHz bi-canal",
    lastQty: 2,
    lastOrdered: "16 avr.",
    frequency: "1× par mois",
  },
  {
    slug: "v2-flash-feu-clignotant-led",
    code: "V2-FLASH",
    brand: "V2",
    name: "Flash feu clignotant LED 230 V",
    lastQty: 3,
    lastOrdered: "12 avr.",
    frequency: "2× par mois",
  },
];

export type Invoice = {
  ref: string;
  date: string;
  amount: number;
  dueDate: string;
  status: "paid" | "due" | "overdue";
  chantier: string;
};

export const invoices: Invoice[] = [
  {
    ref: "F-2026-0092",
    date: "16 avr. 2026",
    amount: 4389.0,
    dueDate: "12 mai 2026",
    status: "due",
    chantier: "Entrepôt Gefco · Gonesse 95",
  },
  {
    ref: "F-2026-0088",
    date: "02 avr. 2026",
    amount: 1567.4,
    dueDate: "02 mai 2026",
    status: "due",
    chantier: "Copro Voltaire · Puteaux 92",
  },
  {
    ref: "F-2026-0074",
    date: "18 mars 2026",
    amount: 892.0,
    dueDate: "18 avr. 2026",
    status: "overdue",
    chantier: "Résidence Lumière · Nanterre 92",
  },
  {
    ref: "F-2026-0061",
    date: "04 mars 2026",
    amount: 2340.5,
    dueDate: "04 avr. 2026",
    status: "paid",
    chantier: "Immeuble Haussmann · Paris 17e",
  },
];

export type Chantier = {
  ref: string;
  name: string;
  city: string;
  opened: string;
  lastActivity: string;
  orders: number;
  spend: number;
};

export const chantiers: Chantier[] = [
  { ref: "CH-247", name: "Copro Voltaire · 86 lots", city: "Puteaux 92", opened: "12 janv.", lastActivity: "il y a 3h", orders: 14, spend: 12480 },
  { ref: "CH-234", name: "Résidence Lumière · bât A+B", city: "Nanterre 92", opened: "04 févr.", lastActivity: "hier", orders: 8, spend: 6420 },
  { ref: "CH-226", name: "Entrepôt logistique Gefco", city: "Gonesse 95", opened: "22 févr.", lastActivity: "il y a 4 jours", orders: 3, spend: 4389 },
  { ref: "CH-219", name: "Immeuble haussmannien", city: "Paris 17e", opened: "10 mars", lastActivity: "il y a 6 jours", orders: 5, spend: 2340 },
];
