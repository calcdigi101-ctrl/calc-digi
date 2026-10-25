"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const foodCostConfig: CalcConfig = {
  id: "food-cost-calculator",
  title: "Commercial Food Cost, Portion Yield and Menu Pricing Margin Calculator",
  fields: [
    {
      kind: "number",
      key: "totalIngredientCost",
      label: "Total Recipe Batch Ingredient Cost ($)",
      default: 28.50,
      min: 0.50,
      max: 10000.0,
    },
    {
      kind: "number",
      key: "servingsYielded",
      label: "Recipe Portions / Servings Yielded",
      default: 8,
      min: 1,
      max: 500,
    },
    {
      kind: "number",
      key: "targetFoodCostPct",
      label: "Target Food Cost Percentage (% of Menu Price)",
      default: 30.0,
      min: 10.0,
      max: 75.0,
    },
    {
      kind: "number",
      key: "laborOverheadPct",
      label: "Labor and Operational Overhead Rate (% of Menu Price)",
      default: 45.0,
      min: 5.0,
      max: 80.0,
    },
  ],
  compute: (vals) => {
    const totalCost = Number(vals.totalIngredientCost) || 28.50;
    const servings = Math.max(1, Number(vals.servingsYielded) || 8);
    const targetFcPct = Math.max(5, Number(vals.targetFoodCostPct) || 30.0);
    const laborPct = Number(vals.laborOverheadPct) || 45.0;

    const costPerPortion = totalCost / servings;
    const suggestedPrice = costPerPortion / (targetFcPct / 100);
    const grossMargin = suggestedPrice - costPerPortion;
    const grossMarginPct = (grossMargin / suggestedPrice) * 100;
    const laborCost = suggestedPrice * (laborPct / 100);
    const netProfitPerPortion = suggestedPrice - (costPerPortion + laborCost);
    const netProfitPct = (netProfitPerPortion / suggestedPrice) * 100;

    return {
      hero: {
        label: "Food Cost Per Portion",
        value: `$${costPerPortion.toFixed(2)}`,
      },
      badge: {
        text: `Target Menu Price: $${suggestedPrice.toFixed(2)} (${targetFcPct.toFixed(1)}% Food Cost)`,
        tone: targetFcPct <= 32 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Suggested Menu Retail Price",
          value: `$${suggestedPrice.toFixed(2)}`,
        },
        {
          label: "Gross Contribution Margin",
          value: `$${grossMargin.toFixed(2)} (${grossMarginPct.toFixed(1)}%)`,
        },
        {
          label: "Prime Cost (Food + Labor)",
          value: `$${(costPerPortion + laborCost).toFixed(2)} / portion`,
        },
        {
          label: "Net Operating Profit Per Portion",
          value: `$${netProfitPerPortion.toFixed(2)} (${netProfitPct.toFixed(1)}%)`,
        },
      ],
      steps: [
        `Portion Cost = Total Batch Cost ($${totalCost.toFixed(2)}) / Portions (${servings}) = $${costPerPortion.toFixed(2)}`,
        `Suggested Menu Price = Portion Cost ($${costPerPortion.toFixed(2)}) / Target FC (${(targetFcPct / 100).toFixed(2)}) = $${suggestedPrice.toFixed(2)}`,
        `Gross Contribution Margin = Menu Price ($${suggestedPrice.toFixed(2)}) - Food Cost ($${costPerPortion.toFixed(2)}) = $${grossMargin.toFixed(2)}`,
        `Net Operating Margin = Menu Price - (Food Cost + Labor & Overhead $${laborCost.toFixed(2)}) = $${netProfitPerPortion.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Menu Revenue Dollar Allocation",
        format: "usd0",
        data: [
          { name: "Ingredient Food Cost", value: Math.round(costPerPortion * 100), color: "#0284c7" },
          { name: "Labor & Overhead Burden", value: Math.round(laborCost * 100), color: "#f59e0b" },
          { name: "Net Operating Profit", value: Math.max(0, Math.round(netProfitPerPortion * 100)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function FoodCostCalculatorComponent() {
  return <CalcEngine config={foodCostConfig} />;
}
