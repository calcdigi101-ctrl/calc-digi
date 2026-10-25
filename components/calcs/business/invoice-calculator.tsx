"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const invoiceConfig: CalcConfig = {
  id: "invoice-calculator",
  title: "Commercial Invoice & Early Payment Terms Calculator",
  fields: [
    {
      kind: "number",
      key: "servicesSubtotal",
      label: "Labor & Professional Services Subtotal ($)",
      default: 4800,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "materialsExpenses",
      label: "Materials, Parts & Reimbursable Expenses ($)",
      default: 1650,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "taxRatePct",
      label: "Applicable Sales / Service Tax Rate (%)",
      default: 7.5,
      min: 0,
      max: 50,
    },
    {
      kind: "number",
      key: "earlyDiscountPct",
      label: "Early Settlement Discount (e.g. 2/10 Net 30) (%)",
      default: 2.0,
      min: 0,
      max: 20,
    },
    {
      kind: "number",
      key: "lateFeeMonthlyPct",
      label: "Late Payment Penalty Fee (% / Month)",
      default: 1.5,
      min: 0,
      max: 25,
    },
  ],
  compute(vals) {
    const services = Number(vals.servicesSubtotal) || 4800;
    const materials = Number(vals.materialsExpenses) || 1650;
    const taxRate = Number(vals.taxRatePct) || 7.5;
    const earlyPct = Number(vals.earlyDiscountPct) || 2.0;
    const latePct = Number(vals.lateFeeMonthlyPct) || 1.5;

    const subtotal = services + materials;
    const salesTax = subtotal * (taxRate / 100);
    const invoiceTotal = subtotal + salesTax;

    const earlyDiscountDollar = invoiceTotal * (earlyPct / 100);
    const earlySettlementAmount = invoiceTotal - earlyDiscountDollar;
    const lateFeeDollarMonthly = invoiceTotal * (latePct / 100);

    return {
      hero: {
        label: "Total Invoice Amount Due",
        value: `$${invoiceTotal.toFixed(2)}`,
      },
      badge: {
        text: `Early Settlement: $${earlySettlementAmount.toFixed(2)} (${earlyPct}% Discount)`,
        tone: "good",
      },
      rows: [
        { label: "Pre-Tax Invoice Subtotal", value: `$${subtotal.toFixed(2)}` },
        { label: "Sales / Service Tax", value: `+$${salesTax.toFixed(2)} (${taxRate}%)` },
        { label: "Early Settlement Savings (10 Days)", value: `-$${earlyDiscountDollar.toFixed(2)} (Save ${earlyPct}%)` },
        { label: "Discounted Payment Amount", value: `$${earlySettlementAmount.toFixed(2)}` },
        { label: "Monthly Late Fee (Overdue 30+ Days)", value: `+$${lateFeeDollarMonthly.toFixed(2)} / month (${latePct}%)` },
        { label: "Annualized Trade Credit Value", value: `${((earlyPct / (100 - earlyPct)) * (365 / 20)).toFixed(1)}% Implied APR` },
      ],
      steps: [
        `Pre-Tax Subtotal = Labor ($${services.toFixed(2)}) + Materials ($${materials.toFixed(2)}) = $${subtotal.toFixed(2)}`,
        `Sales Tax (${taxRate}%) = $${subtotal.toFixed(2)} × ${taxRate / 100} = $${salesTax.toFixed(2)}`,
        `Gross Invoice Balance Due = $${subtotal.toFixed(2)} + $${salesTax.toFixed(2)} = $${invoiceTotal.toFixed(2)}`,
        `Early Payment Option: Pay within 10 days to save $${earlyDiscountDollar.toFixed(2)} ($${earlySettlementAmount.toFixed(2)} total)`,
        `Late Fee Policy: Outstanding balances past 30 days accrue $${lateFeeDollarMonthly.toFixed(2)} per month (${latePct}% monthly).`,
      ],
      chart: {
        type: "donut",
        title: "Commercial Invoice Amount Composition",
        format: "usd0",
        data: [
          { name: "Professional Services / Labor", value: Math.round(services), color: "#0284c7" },
          { name: "Materials & Expenses", value: Math.round(materials), color: "#10b981" },
          { name: "Sales / Service Tax", value: Math.round(salesTax), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function InvoiceCalculatorComponent() {
  return <CalcEngine config={invoiceConfig} />;
}
