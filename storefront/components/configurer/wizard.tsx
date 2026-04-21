"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Minus, Pencil, Plus, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import {
  computeDetailsExtra,
  detailQuestionsByType,
  type ProductTypeId,
} from "@/lib/configurator-details";
import { cn } from "@/lib/utils";

// ============================================================================
// PRODUCT CATALOG (12 types)
// ============================================================================

type Usage = "res" | "coll" | "ind";

type Answers = {
  type: ProductTypeId | null;
  size: number;
  weight: number;
  usage: Usage | null;
  voltage: "230" | "24" | "auto" | null;
  details: Record<string, string | number | boolean>;
};

const initial: Answers = {
  type: null,
  size: 3.5,
  weight: 280,
  usage: null,
  voltage: null,
  details: {},
};

const STEPS = ["Produit", "Dimensions", "Usage", "Réglage", "Options", "Récap"] as const;

type ProductType = {
  id: ProductTypeId;
  family: "Portails" | "Garage" | "Industrie" | "Accès & sécurité";
  name: string;
  sub: string;
  glyph: string;
  sizeLabel: string;
  sizeUnit: string;
  sizeMin: number;
  sizeMax: number;
  sizeStep: number;
  weightLabel: string;
  weightUnit: string;
  weightMin: number;
  weightMax: number;
  weightStep: number;
  needsVoltage: boolean;
  basePrices: [number, number, number];
  intensiveExtra: number;
};

const PRODUCTS: ProductType[] = [
  { id: "battant-2", family: "Portails", name: "Portail battant", sub: "2 vantaux", glyph: "⦽", sizeLabel: "Largeur totale baie", sizeUnit: "m", sizeMin: 2, sizeMax: 8, sizeStep: 0.1, weightLabel: "Poids estimé par vantail", weightUnit: "kg", weightMin: 80, weightMax: 800, weightStep: 10, needsVoltage: true, basePrices: [549, 849, 2290], intensiveExtra: 350 },
  { id: "battant-1", family: "Portails", name: "Portail battant", sub: "1 vantail", glyph: "◐", sizeLabel: "Largeur vantail", sizeUnit: "m", sizeMin: 1.2, sizeMax: 4.5, sizeStep: 0.1, weightLabel: "Poids estimé", weightUnit: "kg", weightMin: 60, weightMax: 400, weightStep: 10, needsVoltage: true, basePrices: [449, 689, 1690], intensiveExtra: 290 },
  { id: "coulissant", family: "Portails", name: "Portail coulissant", sub: "Autoportant ou sur rail", glyph: "⇄", sizeLabel: "Largeur passage", sizeUnit: "m", sizeMin: 2.5, sizeMax: 12, sizeStep: 0.1, weightLabel: "Poids du portail", weightUnit: "kg", weightMin: 200, weightMax: 2500, weightStep: 50, needsVoltage: true, basePrices: [689, 1049, 2490], intensiveExtra: 590 },
  { id: "garage-sectionnelle", family: "Garage", name: "Porte de garage", sub: "Sectionnelle", glyph: "⬢", sizeLabel: "Largeur tablier", sizeUnit: "m", sizeMin: 2, sizeMax: 5, sizeStep: 0.1, weightLabel: "Hauteur tablier", weightUnit: "cm", weightMin: 180, weightMax: 280, weightStep: 10, needsVoltage: false, basePrices: [389, 589, 1290], intensiveExtra: 200 },
  { id: "garage-basculante", family: "Garage", name: "Porte de garage", sub: "Basculante", glyph: "⊓", sizeLabel: "Largeur tablier", sizeUnit: "m", sizeMin: 2, sizeMax: 4.5, sizeStep: 0.1, weightLabel: "Hauteur tablier", weightUnit: "cm", weightMin: 180, weightMax: 250, weightStep: 10, needsVoltage: false, basePrices: [349, 549, 1190], intensiveExtra: 180 },
  { id: "rideau-metal-commerce", family: "Industrie", name: "Rideau métallique", sub: "Commerce / boutique", glyph: "▤", sizeLabel: "Largeur baie", sizeUnit: "m", sizeMin: 1.5, sizeMax: 6, sizeStep: 0.1, weightLabel: "Hauteur tablier", weightUnit: "m", weightMin: 2, weightMax: 5, weightStep: 0.1, needsVoltage: true, basePrices: [1490, 2490, 4990], intensiveExtra: 590 },
  { id: "rideau-metal-industriel", family: "Industrie", name: "Rideau métallique", sub: "Industriel · entrepôt", glyph: "▩", sizeLabel: "Largeur baie", sizeUnit: "m", sizeMin: 3, sizeMax: 12, sizeStep: 0.5, weightLabel: "Hauteur tablier", weightUnit: "m", weightMin: 3, weightMax: 8, weightStep: 0.1, needsVoltage: true, basePrices: [2890, 4990, 8990], intensiveExtra: 1290 },
  { id: "sectionnelle-industrielle", family: "Industrie", name: "Porte sectionnelle industrielle", sub: "Logistique · ateliers", glyph: "⊟", sizeLabel: "Largeur baie", sizeUnit: "m", sizeMin: 3, sizeMax: 10, sizeStep: 0.5, weightLabel: "Hauteur baie", weightUnit: "m", weightMin: 2.5, weightMax: 8, weightStep: 0.1, needsVoltage: true, basePrices: [2890, 4490, 7990], intensiveExtra: 990 },
  { id: "porte-rapide-souple", family: "Industrie", name: "Porte rapide souple", sub: "PVC / spirale auto-réparante", glyph: "≋", sizeLabel: "Largeur passage", sizeUnit: "m", sizeMin: 2, sizeMax: 8, sizeStep: 0.5, weightLabel: "Cycles par jour", weightUnit: "cycles", weightMin: 50, weightMax: 1500, weightStep: 50, needsVoltage: false, basePrices: [3990, 5990, 9990], intensiveExtra: 1590 },
  { id: "barriere-levante", family: "Accès & sécurité", name: "Barrière levante", sub: "Parking · résidence · industrie", glyph: "—", sizeLabel: "Longueur lisse", sizeUnit: "m", sizeMin: 2, sizeMax: 6, sizeStep: 0.5, weightLabel: "Cycles par heure", weightUnit: "cycles/h", weightMin: 50, weightMax: 500, weightStep: 25, needsVoltage: true, basePrices: [1890, 2990, 4990], intensiveExtra: 690 },
  { id: "borne-escamotable", family: "Accès & sécurité", name: "Borne escamotable", sub: "Hydraulique · semi-auto · anti-bélier", glyph: "▢", sizeLabel: "Hauteur hors-sol", sizeUnit: "mm", sizeMin: 500, sizeMax: 1200, sizeStep: 50, weightLabel: "Cycles par jour", weightUnit: "cycles", weightMin: 5, weightMax: 3000, weightStep: 50, needsVoltage: true, basePrices: [1490, 2890, 6990], intensiveExtra: 890 },
  { id: "portique-limitation", family: "Accès & sécurité", name: "Portique limitation hauteur", sub: "Anti-poids lourds parking", glyph: "⊓", sizeLabel: "Largeur libre", sizeUnit: "m", sizeMin: 2, sizeMax: 8, sizeStep: 0.5, weightLabel: "Hauteur utile", weightUnit: "m", weightMin: 1.8, weightMax: 4, weightStep: 0.1, needsVoltage: false, basePrices: [1890, 2490, 3990], intensiveExtra: 590 },
];

const FAMILIES = ["Portails", "Garage", "Industrie", "Accès & sécurité"] as const;

const USAGE_OPTIONS: { id: Usage; title: string; sub: string; cycles: string }[] = [
  { id: "res", title: "Résidentiel", sub: "Maison individuelle, faible trafic", cycles: "20-40 cycles/j" },
  { id: "coll", title: "Collectif", sub: "Copro, syndic, bailleur", cycles: "80-200 cycles/j" },
  { id: "ind", title: "Industriel", sub: "Logistique, dépôt, parking 24/7", cycles: "300-1500 cycles/j" },
];

const VOLTAGE_OPTIONS: { id: "230" | "24" | "auto"; title: string; sub: string }[] = [
  { id: "24", title: "24 V DC", sub: "Silencieux, batterie secours native" },
  { id: "230", title: "230 V AC", sub: "Classique, robuste, prix contenu" },
  { id: "auto", title: "Laissez-nous choisir", sub: "Dimensionnement par nos techniciens" },
];

// ============================================================================
// RECOMMENDATION
// ============================================================================

function recommend(answers: Answers, product: ProductType) {
  const isIntensive = answers.usage === "ind" || (answers.usage === "coll" && answers.weight > 400);
  const baseExtra = isIntensive ? product.intensiveExtra : 0;
  const detailsExtra = computeDetailsExtra(product.id, answers.details);

  const baseFeatures = (() => {
    switch (product.id) {
      case "battant-2":
      case "battant-1":
      case "coulissant":
        return ["Moteur dimensionné", "Carte électronique + récepteur 433 MHz", "Paire photocellules filaires", "Feu clignotant LED", "2 télécommandes rolling-code"];
      case "garage-sectionnelle":
      case "garage-basculante":
        return ["Moteur plafond ou latéral", "Rail télescopique 2,5-3 m", "2 télécommandes + récepteur intégré", "Photocellules de seuil"];
      case "rideau-metal-commerce":
      case "rideau-metal-industriel":
        return ["Tablier acier galvanisé", "Moteur tubulaire ou central", "Coffre arrière + caisson", "Boîte à boutons commande", "Manœuvre de secours intégrée"];
      case "sectionnelle-industrielle":
        return ["Tablier panneaux 40 mm isothermes", "Moteur tri 400V intégré", "Photocellules de seuil + barre palpeuse EN 12453", "Boîte à boutons mort-homme"];
      case "porte-rapide-souple":
        return ["Tablier PVC 900 g/m²", "Moteur tri 400V variateur", "Cellules synchronisées", "Boîtier de commande tactile"];
      case "barriere-levante":
        return ["Lisse alu peinture rouge/blanc", "Moteur 24V DC ou 230V", "Détection inductive intégrée", "Récepteur radio bi-canal"];
      case "borne-escamotable":
        return ["Borne acier galva ou inox", "Caisson de scellement", "Coffret de commande", "Boucle de détection optionnelle"];
      case "portique-limitation":
        return ["Structure tubulaire acier galva", "Bandes de signalisation rouge/blanc", "Panneau signalétique B12", "Massifs béton inclus"];
      default:
        return [];
    }
  })();

  const proExtras = (() => {
    switch (product.id) {
      case "battant-2":
      case "battant-1":
      case "coulissant":
        return ["Tout Essentiel +", "Barre palpeuse EN 12453", "Batterie de secours 12 V 7 Ah", "Clavier à codes IP65", "Vidéo-assistance Assistéo offerte"];
      case "garage-sectionnelle":
      case "garage-basculante":
        return ["Tout Essentiel +", "4 télécommandes additionnelles", "Clavier à codes extérieur IP65", "Batterie de secours intégrée"];
      case "rideau-metal-commerce":
      case "rideau-metal-industriel":
        return ["Tout Essentiel +", "Coffret programmable WiFi", "Cellules de sécurité bord d'attaque", "Sirène effraction intégrée"];
      case "sectionnelle-industrielle":
        return ["Tout Essentiel +", "Hublots panoramiques 4 rangées", "Quai d'accostage compatible", "Contrat maintenance 1 an inclus"];
      case "porte-rapide-souple":
        return ["Tout Essentiel +", "Self-repair anti-crash", "Double bord palpeur sécurité", "Hublot transparent intégré"];
      case "barriere-levante":
        return ["Tout Essentiel +", "Bornes inductives entrée/sortie", "Détecteur 4 boucles intégré", "Lecteur badges proximité"];
      case "borne-escamotable":
        return ["Tout Essentiel +", "Tête LED rouge/blanche", "Boucle magnétique sortie", "Pictogramme d'avertissement"];
      case "portique-limitation":
        return ["Tout Essentiel +", "Lampes clignotantes solaires", "Capteur d'impact + alerte", "Signalisation au sol incluse"];
      default:
        return [];
    }
  })();

  const intensiveExtras = (() => {
    switch (product.id) {
      case "battant-2":
      case "battant-1":
      case "coulissant":
        return ["Tout Pro IEF +", "Carte opto-isolée haute fréquence", "Double paire photocellules synchronisées", "Système VIGIK compatible", "Contrat SAV 2 ans inclus"];
      case "garage-sectionnelle":
      case "garage-basculante":
        return ["Tout Pro IEF +", "Moteur 24V silencieux brushless", "Domotique compatible KNX", "Garantie étendue 5 ans"];
      case "rideau-metal-commerce":
      case "rideau-metal-industriel":
        return ["Tout Pro IEF +", "Tablier double-paroi isolé", "Moteur frein + parachute industriel", "Surveillance à distance GSM"];
      case "sectionnelle-industrielle":
        return ["Tout Pro IEF +", "Panneaux 80 mm renforcés", "Moteur haute cadence 1500 cycles/j", "Quai compatible accostage rapide"];
      case "porte-rapide-souple":
        return ["Tout Pro IEF +", "Tablier renforcé 1 200 g/m²", "Moteur cadence 2 m/s", "Système d'alerte intrusion"];
      case "barriere-levante":
        return ["Tout Pro IEF +", "Lisse 6 m articulée", "Détection radar 360°", "Synchronisation entrée/sortie"];
      case "borne-escamotable":
        return ["Tout Pro IEF +", "Certification anti-bélier K4/K8", "Caisson renforcé inox 316L", "Centrale gestion 8 bornes"];
      case "portique-limitation":
        return ["Tout Pro IEF +", "Hauteur réglable 2-4 m", "Renforts angulaires", "Pose béton + signalisation incluse"];
      default:
        return [];
    }
  })();

  return [
    {
      tier: "Essentiel",
      label: `${product.name} · Essentiel`,
      suited: isIntensive ? "Limite haute pour usage intensif" : "Idéal résidentiel ou faible trafic",
      features: baseFeatures,
      priceFrom: product.basePrices[0] + baseExtra + detailsExtra,
      highlight: false,
    },
    {
      tier: "Pro IEF",
      label: `${product.name} · Pro IEF`,
      suited: "Recommandé pour votre configuration",
      features: proExtras,
      priceFrom: product.basePrices[1] + baseExtra + detailsExtra,
      highlight: true,
    },
    {
      tier: "Intensif",
      label: `${product.name} · Intensif`,
      suited: isIntensive ? "Cohérent avec un usage intensif 24/7" : "Surdimensionné pour votre usage",
      features: intensiveExtras,
      priceFrom: product.basePrices[2] + baseExtra + detailsExtra,
      highlight: false,
    },
  ];
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ConfiguratorWizard() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [a, setA] = useState<Answers>(initial);

  const product = a.type ? PRODUCTS.find((p) => p.id === a.type) : null;
  const recs = useMemo(() => (product ? recommend(a, product) : []), [a, product]);
  const detailQuestions = product ? detailQuestionsByType[product.id] ?? [] : [];
  const done = step === 5;

  // Navigation : skip voltage step si pas nécessaire
  const goNext = () =>
    setStep((s) => {
      if (s === 2 && product && !product.needsVoltage) return 4 as 4;
      return Math.min(5, s + 1) as 0 | 1 | 2 | 3 | 4 | 5;
    });
  const goBack = () =>
    setStep((s) => {
      if (s === 4 && product && !product.needsVoltage) return 2 as 2;
      return Math.max(0, s - 1) as 0 | 1 | 2 | 3 | 4 | 5;
    });

  const requiredDetailsOk = detailQuestions
    .filter((q) => q.required)
    .every((q) => a.details[q.id] !== undefined && a.details[q.id] !== "");

  const canNext =
    (step === 0 && a.type !== null) ||
    step === 1 ||
    (step === 2 && a.usage !== null) ||
    (step === 3 && a.voltage !== null) ||
    (step === 4 && requiredDetailsOk) ||
    step === 5;

  const setDetail = (id: string, value: string | number | boolean) =>
    setA((s) => ({ ...s, details: { ...s.details, [id]: value } }));

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg shadow-[0_8px_24px_-12px_rgba(42,36,30,0.1)]">
      {/* Progress */}
      <div className="flex items-center border-b border-border-soft bg-bg-elev/50 overflow-x-auto">
        {STEPS.map((label, i) => {
          const passed = step > i;
          const active = step === i;
          const isVoltageStep = i === 3;
          const skipVoltage = product && !product.needsVoltage && isVoltageStep;
          return (
            <div
              key={label}
              className={cn(
                "flex flex-1 items-center gap-2.5 px-4 py-3.5 min-w-fit",
                i > 0 && "border-l border-border-soft",
                passed || active ? "text-fg" : "text-fg-subtle",
                skipVoltage && "opacity-40",
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-semibold",
                  passed
                    ? "bg-warm text-warm-fg"
                    : active
                      ? "border border-warm text-warm"
                      : "border border-border text-fg-subtle",
                )}
              >
                {passed ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] sm:inline">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[520px] p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {/* ───────── STEP 0 — TYPE ───────── */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <StepTitle index="01" title="Que voulez-vous configurer ?" sub="Douze familles couvrant tout le contrôle d'accès extérieur. Nos techniciens dimensionnent ensuite chaque kit en fonction de votre projet." />
              <div className="mt-8 space-y-7">
                {FAMILIES.map((family) => {
                  const items = PRODUCTS.filter((p) => p.family === family);
                  return (
                    <div key={family}>
                      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-warm">{family}</div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {items.map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => {
                              setA((s) => ({ ...s, type: opt.id, details: {} }));
                              setTimeout(goNext, 200);
                            }}
                            className={cn(
                              "card group flex flex-col gap-3 rounded-2xl border bg-bg p-4 text-left transition",
                              a.type === opt.id ? "border-warm bg-warm-soft" : "border-border-soft hover:border-warm",
                            )}
                          >
                            <span className="font-display text-4xl leading-none text-fg">{opt.glyph}</span>
                            <div>
                              <div className="text-[14px] font-semibold leading-tight text-fg">{opt.name}</div>
                              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">{opt.sub}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 1 — DIMENSIONS ───────── */}
          {step === 1 && product && (
            <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <StepTitle index="02" title="Dimensions de votre projet" sub={`Pour votre ${product.name.toLowerCase()} ${product.sub.toLowerCase()}. Approximation suffisante — on confirme au devis.`} />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <SliderField label={product.sizeLabel} value={a.size} onChange={(v) => setA((s) => ({ ...s, size: v }))} min={product.sizeMin} max={product.sizeMax} step={product.sizeStep} unit={product.sizeUnit} display={(v) => (product.sizeStep < 1 ? `${v.toFixed(1)} ${product.sizeUnit}` : `${v} ${product.sizeUnit}`)} />
                <SliderField label={product.weightLabel} value={a.weight} onChange={(v) => setA((s) => ({ ...s, weight: v }))} min={product.weightMin} max={product.weightMax} step={product.weightStep} unit={product.weightUnit} display={(v) => (product.weightStep < 1 ? `${v.toFixed(1)} ${product.weightUnit}` : `${v} ${product.weightUnit}`)} />
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 2 — USAGE ───────── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <StepTitle index="03" title="Quel usage ?" sub="Détermine la classe d'usage EN 12453 et le surdimensionnement nécessaire." />
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {USAGE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setA((s) => ({ ...s, usage: opt.id }));
                      setTimeout(goNext, 200);
                    }}
                    className={cn("card rounded-2xl border bg-bg p-5 text-left transition", a.usage === opt.id ? "border-warm bg-warm-soft" : "border-border-soft hover:border-warm")}
                  >
                    <div className="font-display text-[22px] font-semibold text-fg">{opt.title}</div>
                    <div className="mt-1 text-[13px] text-fg-muted">{opt.sub}</div>
                    <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warm">{opt.cycles}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 3 — VOLTAGE ───────── */}
          {step === 3 && product?.needsVoltage && (
            <motion.div key="s3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <StepTitle index="04" title="Alimentation" sub="24 V = silencieux + batterie native. 230 V = robuste & économique. Si doute, on choisit pour vous." />
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {VOLTAGE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setA((s) => ({ ...s, voltage: opt.id }));
                      setTimeout(goNext, 200);
                    }}
                    className={cn("card rounded-2xl border bg-bg p-5 text-left transition", a.voltage === opt.id ? "border-warm bg-warm-soft" : "border-border-soft hover:border-warm")}
                  >
                    <div className="font-display text-[22px] font-semibold text-fg">{opt.title}</div>
                    <div className="mt-2 text-[13px] text-fg-muted">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 4 — DETAILS / OPTIONS ───────── */}
          {step === 4 && product && (
            <motion.div key="s4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <StepTitle index="05" title={`Options techniques · ${product.name.toLowerCase()}`} sub={`Choix spécifiques à votre ${product.name.toLowerCase()}. Les surcoûts éventuels sont intégrés au devis final.`} />

              {detailQuestions.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-border-soft bg-bg-elev p-6 text-center">
                  <p className="text-[14px] text-fg-muted">
                    Aucune option supplémentaire pour ce produit. Passez au récapitulatif.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-7">
                  {detailQuestions.map((q) => (
                    <DetailField
                      key={q.id}
                      question={q}
                      value={a.details[q.id]}
                      onChange={(v) => setDetail(q.id, v)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ───────── STEP 5 — RECAP ───────── */}
          {step === 5 && product && (
            <motion.div key="s5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div className="flex items-start justify-between gap-4">
                <StepTitle index="06" title="Trois kits recommandés" sub={`Pré-sélection AcceFerm pour votre ${product.name.toLowerCase()}. Devis chiffré envoyé sous 24h ouvrées.`} />
                <button
                  type="button"
                  onClick={() => {
                    setA(initial);
                    setStep(0);
                  }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] text-fg-muted transition hover:border-warm hover:text-warm"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Recommencer
                </button>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border-soft lg:grid-cols-3">
                {recs.map((r) => (
                  <div key={r.tier} className={cn("flex flex-col gap-5 p-6", r.highlight ? "bg-gradient-to-br from-warm to-warm-hover text-warm-fg" : "bg-bg")}>
                    <div>
                      <div className={cn("font-mono text-[10px] uppercase tracking-[0.22em]", r.highlight ? "text-warm-fg/80" : "text-fg-muted")}>{r.tier}</div>
                      <div className="mt-1.5 text-[14px] font-semibold">{r.label}</div>
                    </div>
                    <div className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", r.highlight ? "text-warm-fg/70" : "text-fg-subtle")}>{r.suited}</div>
                    <ul className="space-y-2.5 text-[13px]">
                      {r.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", r.highlight ? "text-warm-fg" : "text-warm")} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <div className={cn("font-mono text-[10px] uppercase tracking-[0.22em]", r.highlight ? "text-warm-fg/70" : "text-fg-subtle")}>À partir de</div>
                      <div className="mt-1 font-display text-[32px] font-semibold leading-none tabular-nums">{r.priceFrom} € <span className="text-[14px] font-normal opacity-70">HT</span></div>
                    </div>
                    <a href="#devis" className={cn("mt-2 inline-flex items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-medium transition btn-soft", r.highlight ? "bg-warm-fg text-warm hover:bg-warm-fg/95" : "bg-accent text-accent-fg hover:bg-accent-hover")}>
                      Demander le devis chiffré
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Recap */}
              <div className="mt-8 rounded-2xl border border-border-soft bg-bg-elev p-5">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">Récapitulatif de vos réponses</div>
                  <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-muted hover:text-warm">
                    <Pencil className="h-3 w-3" />
                    Modifier
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Tag label="Produit" value={`${product.name} · ${product.sub}`} />
                  <Tag label="Dimensions" value={`${product.sizeStep < 1 ? a.size.toFixed(1) : a.size} ${product.sizeUnit} · ${product.weightStep < 1 ? a.weight.toFixed(1) : a.weight} ${product.weightUnit}`} />
                  <Tag label="Usage" value={USAGE_OPTIONS.find((u) => u.id === a.usage)?.title ?? "—"} />
                  <Tag label="Alimentation" value={product.needsVoltage ? VOLTAGE_OPTIONS.find((v) => v.id === a.voltage)?.title ?? "—" : "Non applicable"} />
                </div>
                {/* Show selected details */}
                {detailQuestions.length > 0 && Object.keys(a.details).length > 0 && (
                  <div className="mt-5 border-t border-border-soft pt-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">Options techniques sélectionnées</div>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {detailQuestions.map((q) => {
                        const v = a.details[q.id];
                        if (v === undefined || v === false || v === "") return null;
                        let display = "";
                        if (q.type === "boolean") display = "Oui";
                        else if (q.type === "count") display = String(v);
                        else {
                          const opt = q.options?.find((o) => o.id === v);
                          display = opt?.label ?? String(v);
                        }
                        return <Tag key={q.id} label={q.label} value={display} />;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <div className="flex items-center justify-between gap-3 border-t border-border-soft bg-bg-elev/50 px-6 py-4">
          <button type="button" onClick={goBack} disabled={step === 0} className={cn("inline-flex items-center gap-1.5 text-[13px] transition", step === 0 ? "cursor-not-allowed text-fg-subtle" : "text-fg-muted hover:text-warm")}>
            ← Retour
          </button>
          <button type="button" onClick={goNext} disabled={!canNext} className={cn("inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-medium transition btn-soft", canNext ? "bg-accent text-accent-fg hover:bg-accent-hover" : "cursor-not-allowed bg-bg-soft text-fg-subtle")}>
            {step === 4 ? "Voir les kits" : "Continuer"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function StepTitle({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-warm">Étape {index}</p>
      <h2 className="mt-3 font-display text-[32px] font-semibold leading-[1.05] tracking-[-0.015em] text-fg lg:text-[40px]">{title}</h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fg-muted">{sub}</p>
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, step, unit, display }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; unit: string; display: (v: number) => string }) {
  return (
    <div className="rounded-2xl border border-border-soft bg-bg p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">{label}</span>
        <span className="font-display text-[28px] font-semibold tabular-nums leading-none text-warm">{display(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-warm" aria-label={label} />
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-fg-subtle">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

function Tag({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">{label}</div>
      <div className="mt-1 text-[14px] font-medium text-fg">{value}</div>
    </div>
  );
}

// ───────── Detail field component ─────────
function DetailField({
  question,
  value,
  onChange,
}: {
  question: import("@/lib/configurator-details").DetailQuestion;
  value: string | number | boolean | undefined;
  onChange: (v: string | number | boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-border-soft bg-bg p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[15px] font-semibold text-fg">
            {question.label}
            {question.required && <span className="ml-1 text-warm">*</span>}
          </div>
          {question.hint && (
            <div className="mt-1 text-[12px] text-fg-muted">{question.hint}</div>
          )}
        </div>
      </div>

      {question.type === "chip" && question.options && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {question.options.map((opt) => {
            const selected = value === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => onChange(opt.id)}
                className={cn(
                  "card flex flex-col gap-1 rounded-xl border p-3 text-left transition",
                  selected ? "border-warm bg-warm-soft" : "border-border-soft hover:border-warm",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-medium text-fg">{opt.label}</div>
                  {opt.priceDelta !== undefined && opt.priceDelta !== 0 && (
                    <span
                      className={cn(
                        "font-mono text-[10px] tabular-nums",
                        opt.priceDelta > 0 ? "text-warm" : "text-signal-ok",
                      )}
                    >
                      {opt.priceDelta > 0 ? `+${opt.priceDelta}` : opt.priceDelta} €
                    </span>
                  )}
                </div>
                {opt.sub && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
                    {opt.sub}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "boolean" && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-3 text-[14px] font-medium transition",
              value === true ? "border-warm bg-warm text-warm-fg" : "border-border-soft hover:border-warm",
            )}
          >
            Oui (+90 € HT)
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-3 text-[14px] font-medium transition",
              value === false ? "border-fg bg-fg text-bg" : "border-border-soft hover:border-fg",
            )}
          >
            Non
          </button>
        </div>
      )}

      {question.type === "count" && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border-soft bg-bg-elev p-2">
          <div className="px-3 text-[13px] text-fg-muted">
            {typeof value === "number" && value > 0 ? `+${value * 35} € HT` : "Aucun"}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const cur = typeof value === "number" ? value : 0;
                onChange(Math.max(question.min ?? 0, cur - 1));
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-bg text-fg-muted transition hover:border-warm hover:text-warm"
              aria-label="Diminuer"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-display text-[20px] font-semibold tabular-nums text-fg">
              {typeof value === "number" ? value : 0}
            </span>
            <button
              type="button"
              onClick={() => {
                const cur = typeof value === "number" ? value : 0;
                onChange(Math.min(question.max ?? 99, cur + 1));
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-bg text-fg-muted transition hover:border-warm hover:text-warm"
              aria-label="Augmenter"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
