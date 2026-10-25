"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const tipConfig: CalcConfig = {
  id: "tip-calculator",
  title: "Hospitality Gratuity, Sales Tax and Fair Bill Split Calculator",
  fields: [
    {
      kind: "number",
      key: "billSubtotal",
      label: "Food and Beverage Subtotal ($)",
      default: 85.00,
      min: 1.0,
      max: 25000.0,
    },
    {
      kind: "number",
      key: "tipPercent",
      label: "Gratuity / Tip Percentage (% on Pre-Tax)",
      default: 20.0,
      min: 0.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "taxPercent",
      label: "Applicable Local Sales Tax Rate (%)",
      default: 8.875,
      min: 0.0,
      max: 30.0,
    },
    {
      kind: "number",
      key: "splitCount",
      label: "Diners Splitting the Bill (Persons)",
      default: 3,
      min: 1,
      max: 50,
    },
  ],
  compute: (vals) => {
    const subtotal = Math.max(0.01, Number(vals.billSubtotal) || 85.00);
    const tipPct = Number(vals.tipPercent) || 20.0;
    const taxPct = Number(vals.taxPercent) || 8.875;
    const people = Math.max(1, Number(vals.splitCount) || 3);

    const tipAmount = subtotal * (tipPct / 100);
    const taxAmount = subtotal * (taxPct / 100);
    const grandTotal = subtotal + tipAmount + taxAmount;

    const perPersonTotal = grandTotal / people;
    const perPersonSubtotal = subtotal / people;
    const perPersonTip = tipAmount / people;
    const perPersonTax = taxAmount / people;

    return {
      hero: {
        label: "Total Amount Per Diner",
        value: `$${perPersonTotal.toFixed(2)}`,
      },
      badge: {
        text: `Grand Total: $${grandTotal.toFixed(2)} (${people} Diners)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Total Gratuity / Tip Amount",
          value: `$${tipAmount.toFixed(2)} ($${perPersonTip.toFixed(2)} / diner)`,
        },
        {
          label: "Sales Tax Burden",
          value: `$${taxAmount.toFixed(2)} ($${perPersonTax.toFixed(2)} / diner)`,
        },
        {
          label: "Original F&B Subtotal",
          value: `$${subtotal.toFixed(2)} ($${perPersonSubtotal.toFixed(2)} / diner)`,
        },
        {
          label: "Effective Gratuity Rate",
          value: `${tipPct.toFixed(1)}% of pre-tax subtotal`,
        },
      ],
      steps: [
        `Pre-Tax Gratuity = Subtotal ($${subtotal.toFixed(2)}) * (${tipPct}% / 100) = $${tipAmount.toFixed(2)}`,
        `Applicable Sales Tax = Subtotal ($${subtotal.toFixed(2)}) * (${taxPct}% / 100) = $${taxAmount.toFixed(2)}`,
        `Combined Grand Total = Subtotal ($${subtotal.toFixed(2)}) + Tip ($${tipAmount.toFixed(2)}) + Tax ($${taxAmount.toFixed(2)}) = $${grandTotal.toFixed(2)}`,
        `Equal Split (${people} Diners) = Grand Total ($${grandTotal.toFixed(2)}) / ${people} = $${perPersonTotal.toFixed(2)} per person`,
      ],
      chart: {
        type: "donut",
        title: "Guest Check Bill Composition",
        format: "usd0",
        data: [
          { name: "Food & Beverage Subtotal", value: Math.round(subtotal), color: "#0284c7" },
          { name: "Staff Service Gratuity", value: Math.round(tipAmount), color: "#10b981" },
          { name: "Government Sales Tax", value: Math.round(taxAmount), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function TipCalculatorComponent() {
  return <CalcEngine config={tipConfig} />;
}
