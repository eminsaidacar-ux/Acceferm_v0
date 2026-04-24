/* eslint-disable react/no-unknown-property */
import {
  Document,
  Font,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";

/**
 * Facture PDF AcceFerm Pro — sprint 1.
 *
 * ⚠️ Ce document N'EST PAS la facture fiscale finale (DGFiP e-invoicing).
 * La facture fiscale est émise par Odoo via PDP dès sprint 2+. Ce PDF est
 * un "bon de commande valorisé" à but informatif pour le client.
 *
 * Format : A4 portrait, PDF/A compatible, hash SHA-256 sur bon de commande
 * inclus dans le footer pour traçabilité.
 */

type Props = {
  orderNumber: string;
  issuedAt: Date;
  customer: {
    name: string;
    company?: string | null;
    email: string;
    phone?: string | null;
  };
  billingAddress: {
    line1: string;
    line2?: string | null;
    city: string;
    postalCode: string;
    country?: string | null;
  };
  items: Array<{
    productName: string;
    quantity: number;
    unitPriceHT: number;
    vatRate: number;
  }>;
  subtotalHT: number;
  shippingHT: number;
  vatAmount: number;
  totalTTC: number;
  hash?: string;
};

const colors = {
  bg: "#faf7f2",
  fg: "#1a1814",
  fgMuted: "#6b6358",
  fgSubtle: "#958b7c",
  accent: "#e11021",
  peach: "#c4855c",
  border: "#d3c9b0",
  borderSoft: "#e5dcc6",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colors.fg,
    backgroundColor: colors.bg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  brand: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
  },
  brandAccent: { color: colors.peach, fontStyle: "italic" },
  docLabel: {
    fontSize: 8,
    letterSpacing: 1.5,
    color: colors.fgMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  docNumber: { fontSize: 18, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  docDate: { fontSize: 9, color: colors.fgMuted, marginTop: 4 },
  infoGrid: { flexDirection: "row", gap: 24, marginBottom: 32 },
  infoBlock: { flex: 1 },
  infoLabel: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: colors.fgSubtle,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  infoLine: { fontSize: 10, lineHeight: 1.45 },
  infoStrong: { fontFamily: "Helvetica-Bold" },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1.2,
    borderBottomColor: colors.fg,
    paddingBottom: 8,
    marginBottom: 8,
  },
  th: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: colors.fgMuted,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  thDesc: { flex: 3 },
  thQty: { flex: 0.6, textAlign: "right" },
  thUnit: { flex: 1, textAlign: "right" },
  thTotal: { flex: 1, textAlign: "right" },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderSoft,
  },
  tdDesc: { flex: 3, paddingRight: 12 },
  tdQty: { flex: 0.6, textAlign: "right", fontVariant: ["tabular-nums"] },
  tdUnit: { flex: 1, textAlign: "right", fontVariant: ["tabular-nums"] },
  tdTotal: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    fontVariant: ["tabular-nums"],
  },
  totalsBlock: { marginLeft: "auto", width: 240, marginTop: 24 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  totalsLabel: { color: colors.fgMuted, fontSize: 10 },
  totalsValue: { fontVariant: ["tabular-nums"], fontSize: 10 },
  totalsTtc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: 1.2,
    borderTopColor: colors.fg,
    fontFamily: "Helvetica-Bold",
  },
  ttcValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    fontVariant: ["tabular-nums"],
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 7.5,
    color: colors.fgSubtle,
    lineHeight: 1.5,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderSoft,
    paddingTop: 10,
  },
  hashLine: {
    fontFamily: "Courier",
    fontSize: 7,
    color: colors.fgSubtle,
    marginTop: 4,
  },
  disclaimer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: colors.borderSoft,
    fontSize: 9,
    lineHeight: 1.45,
    color: colors.fgMuted,
  },
});

export function Invoice(props: Props) {
  return (
    <Document
      title={`Bon de commande ${props.orderNumber}`}
      author="AcceFerm Pro"
      creator="AcceFerm Pro"
      producer="AcceFerm Pro · IEF & Co"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>
              AcceFerm <Text style={styles.brandAccent}>Pro</Text>
            </Text>
            <Text style={{ fontSize: 8, color: colors.fgMuted, marginTop: 2 }}>
              Division e-commerce IEF & Co
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.docLabel}>Bon de commande valorisé</Text>
            <Text style={styles.docNumber}>{props.orderNumber}</Text>
            <Text style={styles.docDate}>
              Émis le {formatDateFR(props.issuedAt)}
            </Text>
          </View>
        </View>

        {/* Émetteur / Client */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Émetteur</Text>
            <Text style={[styles.infoLine, styles.infoStrong]}>IEF & Co</Text>
            <Text style={styles.infoLine}>8 Rue René Dubos</Text>
            <Text style={styles.infoLine}>95410 Groslay</Text>
            <Text style={[styles.infoLine, { marginTop: 6, color: colors.fgMuted }]}>
              SIRET 888 693 981
            </Text>
            <Text style={[styles.infoLine, { color: colors.fgMuted }]}>
              contact@iefandco.com
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Client</Text>
            {props.customer.company ? (
              <Text style={[styles.infoLine, styles.infoStrong]}>{props.customer.company}</Text>
            ) : null}
            <Text style={styles.infoLine}>{props.customer.name}</Text>
            <Text style={styles.infoLine}>{props.billingAddress.line1}</Text>
            {props.billingAddress.line2 ? (
              <Text style={styles.infoLine}>{props.billingAddress.line2}</Text>
            ) : null}
            <Text style={styles.infoLine}>
              {props.billingAddress.postalCode} {props.billingAddress.city}
            </Text>
            <Text style={[styles.infoLine, { marginTop: 6, color: colors.fgMuted }]}>
              {props.customer.email}
            </Text>
          </View>
        </View>

        {/* Table items */}
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thDesc]}>Désignation</Text>
          <Text style={[styles.th, styles.thQty]}>Qté</Text>
          <Text style={[styles.th, styles.thUnit]}>PU HT</Text>
          <Text style={[styles.th, styles.thTotal]}>Total HT</Text>
        </View>

        {props.items.map((item, i) => (
          <View key={i} style={styles.row} wrap={false}>
            <Text style={styles.tdDesc}>{item.productName}</Text>
            <Text style={styles.tdQty}>{item.quantity}</Text>
            <Text style={styles.tdUnit}>{fmt(item.unitPriceHT)} €</Text>
            <Text style={styles.tdTotal}>
              {fmt(item.unitPriceHT * item.quantity)} €
            </Text>
          </View>
        ))}

        {/* Totaux */}
        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Sous-total HT</Text>
            <Text style={styles.totalsValue}>{fmt(props.subtotalHT)} €</Text>
          </View>
          {props.shippingHT > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Livraison HT</Text>
              <Text style={styles.totalsValue}>{fmt(props.shippingHT)} €</Text>
            </View>
          ) : null}
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>TVA</Text>
            <Text style={styles.totalsValue}>{fmt(props.vatAmount)} €</Text>
          </View>
          <View style={styles.totalsTtc}>
            <Text>Total TTC</Text>
            <Text style={styles.ttcValue}>{fmt(props.totalTTC)} €</Text>
          </View>
        </View>

        {/* Disclaimer DGFiP */}
        <View style={styles.disclaimer}>
          <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
            Ce document n'est pas une facture fiscale.
          </Text>
          <Text>
            Il s'agit d'un bon de commande valorisé. La facture fiscale finale, conforme à la
            réforme e-invoicing DGFiP (septembre 2026), sera émise et transmise par IEF & Co via
            sa Plateforme de Dématérialisation Partenaire (PDP) sous 5 jours ouvrés après
            expédition.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>
            AcceFerm Pro — division e-commerce IEF & Co · SIRET 888 693 981 · TVA intra FR XX XXX
            XXX XXX · RCS Pontoise · www.acceferm.fr
          </Text>
          <Text style={{ marginTop: 2 }}>
            Paiement : CB Stripe · virement SEPA pro · Alma 3-4x · 30j à terme pour comptes pro
            Gold validés. SAV technique : 01 84 XX XX 17.
          </Text>
          {props.hash ? (
            <Text style={styles.hashLine}>
              SHA-256: {props.hash.slice(0, 32)}…{props.hash.slice(-16)}
            </Text>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDateFR(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
