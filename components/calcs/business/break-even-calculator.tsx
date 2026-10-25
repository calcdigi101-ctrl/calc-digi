"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const breakEvenConfig: CalcConfig = {
  id: "break-even-calculator",
  title: "Break-Even Point & Contribution Margin Calculator",
  fields: [
    {
      kind: "number",
      key: "fixedCosts",
      label: "Total Fixed Overhead Costs ($ / Period)",
      default: 45000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "sellingPrice",
      label: "Unit Selling Price ($)",
      default: 120,
      min: 0.01,
      max: 10000000,
    },
    {
      kind: "number",
      key: "variableCost",
      label: "Unit Variable Direct Cost ($)",
      default: 48,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "currentSalesUnits",
      label: "Current / Forecasted Sales Volume (Units)",
      default: 850,
      min: 0,
      max: 10000000,
    },
  ],
  compute(vals) {
    const fixed = Number(vals.fixedCosts) || 45000;
    const price = Number(vals.sellingPrice) || 120;
    const varCost = Number(vals.variableCost) || 48;
    const actualUnits = Number(vals.currentSalesUnits) || 850;

    if (price <= varCost) {
      return {
        error: "Unit selling price must be strictly greater than unit variable cost to generate positive contribution margin.",
      };
    }

    const cm = price - varCost;
    const cmRatio = cm / price;
    const breakEvenUnits = Math.ceil(fixed / cm);
    const breakEvenRevenue = breakEvenUnits * price;

    const actualRevenue = actualUnits * price;
    const actualTotalCost = fixed + (actualUnits * varCost);
    const actualOperatingIncome = actualRevenue - actualTotalCost;

    const marginOfSafetyUnits = actualUnits - breakEvenUnits;
    const marginOfSafetyPct = actualUnits > 0 ? (marginOfSafetyUnits / actualUnits) * 100 : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let statusText = `Profitable (+${marginOfSafetyUnits.toLocaleString()} Units Above BEP)`;
    if (actualUnits < breakEvenUnits) {
      statusText = `Operating at a Loss (${Math.abs(marginOfSafetyUnits).toLocaleString()} Units Below BEP)`;
      tone = "bad";
    } else if (actualUnits === breakEvenUnits) {
      statusText = "Exact Break-Even (Zero Net Operating Income)";
      tone = "warn";
    }

    return {
      hero: {
        label: "Break-Even Sales Volume",
        value: `${breakEvenUnits.toLocaleString()} Units`,
      },
      badge: {
        text: statusText,
        tone,
      },
      rows: [
        { label: "Break-Even Revenue", value: `$${Math.round(breakEvenRevenue).toLocaleString()}` },
        { label: "Unit Contribution Margin (CM)", value: `$${cm.toFixed(2)} (${(cmRatio * 100).toFixed(1)}% Ratio)` },
        { label: "Fixed Overhead Burden", value: `$${Math.round(fixed).toLocaleString()}` },
        { label: "Total Variable Cost at BEP", value: `$${Math.round(breakEvenUnits * varCost).toLocaleString()}` },
        { label: "Margin of Safety (%)", value: `${marginOfSafetyPct >= 0 ? "+" : ""}${marginOfSafetyPct.toFixed(1)}%` },
        { label: "Net Operating Income at Forecast", value: `$${Math.round(actualOperatingIncome).toLocaleString()}` },
      ],
      steps: [
        `Contribution Margin per Unit = Price ($${price.toFixed(2)}) - Variable Cost ($${varCost.toFixed(2)}) = $${cm.toFixed(2)}`,
        `Contribution Margin Ratio = $${cm.toFixed(2)} / $${price.toFixed(2)} = ${(cmRatio * 100).toFixed(2)}%`,
        `Break-Even Units = Total Fixed Costs ($${fixed.toLocaleString()}) / Unit CM ($${cm.toFixed(2)}) = ${breakEvenUnits.toLocaleString()} units`,
        `Break-Even Revenue = ${breakEvenUnits.toLocaleString()} units × $${price.toFixed(2)} = $${Math.round(breakEvenRevenue).toLocaleString()}`,
        `Current Operating Position: ${actualUnits.toLocaleString()} units yields $${Math.round(actualRevenue).toLocaleString()} revenue against $${Math.round(actualTotalCost).toLocaleString()} total costs, resulting in $${Math.round(actualOperatingIncome).toLocaleString()} net income.`,
      ],
      chart: {
        type: "donut",
        title: "Break-Even Cost Structure (Fixed vs Variable at BEP)",
        format: "usd0",
        data: [
          { name: "Fixed Overhead Costs", value: Math.round(fixed), color: "#0284c7" },
          { name: "Variable Operating Costs", value: Math.round(breakEvenUnits * varCost), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function BreakEvenCalculatorComponent() {
  return <CalcEngine config={breakEvenConfig} />;
}
