"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ltvConfig: CalcConfig = {
  id: "ltv-calculator",
  title: "Customer Lifetime Value (LTV / CLV) Calculator",
  fields: [
    {
      kind: "number",
      key: "averagePurchaseValue",
      label: "Average Purchase / Order Value (AOV) ($)",
      default: 85,
      min: 0.01,
      max: 1000000,
    },
    {
      kind: "number",
      key: "purchaseFrequencyYear",
      label: "Purchase Frequency (Orders per Year)",
      default: 4.5,
      min: 0.1,
      max: 365,
    },
    {
      kind: "number",
      key: "customerLifespanYears",
      label: "Average Customer Lifespan Duration (Years)",
      default: 3.2,
      min: 0.1,
      max: 50,
    },
    {
      kind: "number",
      key: "grossMarginPct",
      label: "Gross Profit Margin (%)",
      default: 68,
      min: 1,
      max: 100,
    },
    {
      kind: "number",
      key: "cacBenchmark",
      label: "Customer Acquisition Cost (CAC) ($)",
      default: 65,
      min: 0.01,
      max: 1000000,
    },
  ],
  compute(vals) {
    const aov = Number(vals.averagePurchaseValue) || 85;
    const freq = Number(vals.purchaseFrequencyYear) || 4.5;
    const lifespan = Number(vals.customerLifespanYears) || 3.2;
    const margin = Number(vals.grossMarginPct) || 68;
    const cac = Number(vals.cacBenchmark) || 65;

    const annualCustomerValue = aov * freq;
    const grossLtv = annualCustomerValue * lifespan;
    const netLtvProfit = grossLtv * (margin / 100);
    const ltvCacRatio = cac > 0 ? netLtvProfit / cac : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let ratioStatus = `Elite Unit Economics (${ltvCacRatio.toFixed(1)}x LTV:CAC)`;
    if (ltvCacRatio < 1.5) {
      ratioStatus = `Unprofitable Unit Economics (${ltvCacRatio.toFixed(1)}x LTV:CAC < 1.5x)`;
      tone = "bad";
    } else if (ltvCacRatio < 3.0) {
      ratioStatus = `Moderate Efficiency (${ltvCacRatio.toFixed(1)}x LTV:CAC)`;
      tone = "warn";
    }

    return {
      hero: {
        label: "Customer Lifetime Value (Net Margin)",
        value: `$${Math.round(netLtvProfit).toLocaleString()}`,
      },
      badge: {
        text: ratioStatus,
        tone,
      },
      rows: [
        { label: "Gross Lifetime Revenue", value: `$${Math.round(grossLtv).toLocaleString()}` },
        { label: "LTV-to-CAC Ratio", value: `${ltvCacRatio.toFixed(2)}x (Target: ≥ 3.0x)` },
        { label: "Annual Customer Value", value: `$${Math.round(annualCustomerValue).toLocaleString()} / year` },
        { label: "Gross Margin Realization", value: `${margin}% ($${((aov * margin) / 100).toFixed(2)} profit/order)` },
        { label: "Customer Acquisition Cost (CAC)", value: `$${Math.round(cac).toLocaleString()}` },
        { label: "Net Lifetime Profit After CAC", value: `$${Math.round(netLtvProfit - cac).toLocaleString()}` },
      ],
      steps: [
        `Annual Revenue per Customer = AOV ($${aov.toFixed(2)}) × Frequency (${freq}/yr) = $${Math.round(annualCustomerValue).toLocaleString()}/year`,
        `Gross Lifetime Revenue = $${Math.round(annualCustomerValue).toLocaleString()} × ${lifespan} years = $${Math.round(grossLtv).toLocaleString()}`,
        `Margin-Adjusted Net LTV = Gross LTV ($${Math.round(grossLtv).toLocaleString()}) × ${margin}% Gross Margin = $${Math.round(netLtvProfit).toLocaleString()}`,
        `LTV-to-CAC Ratio = Net LTV ($${Math.round(netLtvProfit).toLocaleString()}) / CAC ($${cac.toLocaleString()}) = ${ltvCacRatio.toFixed(2)}×`,
        `Venture Benchmark: An LTV:CAC ratio of 3.0× or higher indicates sustainable unit economics that warrant aggressive marketing expansion.`,
      ],
      chart: {
        type: "donut",
        title: "Lifetime Customer Value vs Sourcing and Acquisition",
        format: "usd0",
        data: [
          { name: "Net Lifetime Operating Profit", value: Math.max(1, Math.round(netLtvProfit - cac)), color: "#10b981" },
          { name: "Cost of Goods Sold (COGS)", value: Math.round(grossLtv * (1 - margin / 100)), color: "#0284c7" },
          { name: "Customer Acquisition Cost (CAC)", value: Math.round(cac), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function LtvCalculatorComponent() {
  return <CalcEngine config={ltvConfig} />;
}
