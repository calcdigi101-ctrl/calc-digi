"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const markupConfig: CalcConfig = {
  id: "markup-calculator",
  title: "Markup & Gross Profit Margin Calculator",
  fields: [
    {
      kind: "number",
      key: "costPrice",
      label: "Unit Product Cost ($)",
      default: 40.0,
      min: 0.01,
      max: 10000000,
    },
    {
      kind: "number",
      key: "markupPct",
      label: "Desired Markup on Cost (%)",
      default: 75.0,
      min: 0,
      max: 10000,
    },
    {
      kind: "number",
      key: "salesVolume",
      label: "Projected Sales Volume (Units / Month)",
      default: 500,
      min: 1,
      max: 10000000,
    },
  ],
  compute(vals) {
    const cost = Number(vals.costPrice) || 40.0;
    const markup = Number(vals.markupPct) || 75.0;
    const volume = Number(vals.salesVolume) || 500;

    const dollarProfit = cost * (markup / 100);
    const sellingPrice = cost + dollarProfit;
    const grossMarginPct = sellingPrice > 0 ? (dollarProfit / sellingPrice) * 100 : 0;
    const totalMonthlyProfit = dollarProfit * volume;
    const totalMonthlyRevenue = sellingPrice * volume;

    return {
      hero: {
        label: "Recommended Selling Price",
        value: `$${sellingPrice.toFixed(2)}`,
      },
      badge: {
        text: `Gross Margin: ${grossMarginPct.toFixed(1)}% (${markup}% Markup)`,
        tone: "good",
      },
      rows: [
        { label: "Gross Profit per Unit", value: `$${dollarProfit.toFixed(2)}` },
        { label: "Gross Profit Margin", value: `${grossMarginPct.toFixed(2)}% of Price` },
        { label: "Original Unit Cost", value: `$${cost.toFixed(2)}` },
        { label: "Markup vs Margin Spread", value: `+${(markup - grossMarginPct).toFixed(1)}% Spread Delta` },
        { label: "Projected Monthly Revenue", value: `$${Math.round(totalMonthlyRevenue).toLocaleString()} (${volume} units)` },
        { label: "Projected Monthly Gross Profit", value: `$${Math.round(totalMonthlyProfit).toLocaleString()}` },
      ],
      steps: [
        `Dollar Profit = Unit Cost ($${cost.toFixed(2)}) × Markup (${markup}%) = $${dollarProfit.toFixed(2)}`,
        `Selling Price = Cost ($${cost.toFixed(2)}) + Profit ($${dollarProfit.toFixed(2)}) = $${sellingPrice.toFixed(2)}`,
        `Gross Margin Percentage = (Dollar Profit / Selling Price) × 100 = ($${dollarProfit.toFixed(2)} / $${sellingPrice.toFixed(2)}) × 100 = ${grossMarginPct.toFixed(2)}%`,
        `Conversion Rule: Margin % = Markup % / (1 + Markup %) = ${(markup / 100).toFixed(2)} / ${(1 + markup / 100).toFixed(2)} = ${grossMarginPct.toFixed(2)}%`,
        `Total Monthly Gross Profit = ${volume.toLocaleString()} units × $${dollarProfit.toFixed(2)} = $${Math.round(totalMonthlyProfit).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Unit Selling Price Decomposition (Cost vs Markup)",
        format: "usd0",
        data: [
          { name: "Product Unit Cost", value: Number(cost.toFixed(2)), color: "#0284c7" },
          { name: "Gross Dollar Profit", value: Number(dollarProfit.toFixed(2)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function MarkupCalculatorComponent() {
  return <CalcEngine config={markupConfig} />;
}
