"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const profitMarginConfig: CalcConfig = {
  id: "profit-margin-calculator",
  title: "Commercial Profit Margin & Net Income Calculator",
  fields: [
    {
      kind: "number",
      key: "grossRevenue",
      label: "Gross Business Revenue ($)",
      default: 500000,
      min: 1,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "cogs",
      label: "Cost of Goods Sold (COGS) ($)",
      default: 180000,
      min: 0,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "operatingExpenses",
      label: "Operating Overhead & SG&A ($)",
      default: 195000,
      min: 0,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "taxesAndInterest",
      label: "Corporate Income Taxes & Debt Interest ($)",
      default: 28000,
      min: 0,
      max: 1000000000,
    },
  ],
  compute(vals) {
    const rev = Number(vals.grossRevenue) || 500000;
    const cogsVal = Number(vals.cogs) || 180000;
    const opex = Number(vals.operatingExpenses) || 195000;
    const taxes = Number(vals.taxesAndInterest) || 28000;

    const grossProfit = rev - cogsVal;
    const grossMarginPct = rev > 0 ? (grossProfit / rev) * 100 : 0;

    const operatingIncome = grossProfit - opex; // EBIT
    const operatingMarginPct = rev > 0 ? (operatingIncome / rev) * 100 : 0;

    const netIncome = operatingIncome - taxes;
    const netMarginPct = rev > 0 ? (netIncome / rev) * 100 : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let statusText = `Strong Profitability (${netMarginPct.toFixed(1)}% Net Margin)`;
    if (netIncome < 0) {
      statusText = `Operating at a Net Loss (-$${Math.round(Math.abs(netIncome)).toLocaleString()})`;
      tone = "bad";
    } else if (netMarginPct < 8.0) {
      statusText = `Low Margin (${netMarginPct.toFixed(1)}% Net Margin)`;
      tone = "warn";
    }

    return {
      hero: {
        label: "Net Profit Margin",
        value: `${netMarginPct.toFixed(2)}%`,
      },
      badge: {
        text: statusText,
        tone,
      },
      rows: [
        { label: "Net Operating Income (Bottom Line)", value: `$${Math.round(netIncome).toLocaleString()}` },
        { label: "Gross Profit", value: `$${Math.round(grossProfit).toLocaleString()} (${grossMarginPct.toFixed(2)}% Margin)` },
        { label: "Operating Income (EBIT)", value: `$${Math.round(operatingIncome).toLocaleString()} (${operatingMarginPct.toFixed(2)}% Margin)` },
        { label: "Total Cost of Goods Sold", value: `$${Math.round(cogsVal).toLocaleString()}` },
        { label: "SG&A Operating Expenses", value: `$${Math.round(opex).toLocaleString()}` },
        { label: "Corporate Taxes & Interest", value: `$${Math.round(taxes).toLocaleString()}` },
      ],
      steps: [
        `Gross Profit = Revenue ($${rev.toLocaleString()}) - COGS ($${cogsVal.toLocaleString()}) = $${grossProfit.toLocaleString()}`,
        `Gross Margin = ($${grossProfit.toLocaleString()} / $${rev.toLocaleString()}) × 100 = ${grossMarginPct.toFixed(2)}%`,
        `Operating Income (EBIT) = Gross Profit ($${grossProfit.toLocaleString()}) - Operating Expenses ($${opex.toLocaleString()}) = $${operatingIncome.toLocaleString()}`,
        `Operating Margin = ($${operatingIncome.toLocaleString()} / $${rev.toLocaleString()}) × 100 = ${operatingMarginPct.toFixed(2)}%`,
        `Net Income = Operating Income ($${operatingIncome.toLocaleString()}) - Taxes/Interest ($${taxes.toLocaleString()}) = $${netIncome.toLocaleString()}`,
        `Net Profit Margin = ($${netIncome.toLocaleString()} / $${rev.toLocaleString()}) × 100 = ${netMarginPct.toFixed(2)}%`,
      ],
      chart: {
        type: "donut",
        title: "Total Revenue Allocation Waterfall",
        format: "usd0",
        data: [
          { name: "Retained Net Profit", value: Math.max(0, Math.round(netIncome)), color: "#10b981" },
          { name: "Cost of Goods Sold (COGS)", value: Math.round(cogsVal), color: "#0284c7" },
          { name: "Operating Overhead (SG&A)", value: Math.round(opex), color: "#f59e0b" },
          { name: "Taxes & Debt Interest", value: Math.round(taxes), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function ProfitMarginCalculatorComponent() {
  return <CalcEngine config={profitMarginConfig} />;
}
