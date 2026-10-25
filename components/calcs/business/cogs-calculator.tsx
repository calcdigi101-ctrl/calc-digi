"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cogsConfig: CalcConfig = {
  id: "cogs-calculator",
  title: "Cost of Goods Sold (COGS) & Gross Margin Calculator",
  fields: [
    {
      kind: "number",
      key: "directMaterials",
      label: "Direct Raw Materials Cost ($)",
      default: 48000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "directLabor",
      label: "Direct Production Labor ($)",
      default: 32000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "mfgOverhead",
      label: "Manufacturing Overhead & Freight-In ($)",
      default: 18000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "beginningInventory",
      label: "Beginning Inventory Value ($)",
      default: 25000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "endingInventory",
      label: "Ending Inventory Value ($)",
      default: 22000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "totalRevenue",
      label: "Total Sales Revenue Generated ($)",
      default: 185000,
      min: 0,
      max: 1000000000,
    },
  ],
  compute(vals) {
    const materials = Number(vals.directMaterials) || 48000;
    const labor = Number(vals.directLabor) || 32000;
    const overhead = Number(vals.mfgOverhead) || 18000;
    const begInv = Number(vals.beginningInventory) || 25000;
    const endInv = Number(vals.endingInventory) || 22000;
    const revenue = Number(vals.totalRevenue) || 185000;

    // Total production purchases/costs
    const totalProduction = materials + labor + overhead;
    // Standard COGS = Beginning Inventory + Total Purchases/Production - Ending Inventory
    const cogs = Math.max(0, begInv + totalProduction - endInv);
    const grossProfit = revenue - cogs;
    const grossMarginPct = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const cogsRatioPct = revenue > 0 ? (cogs / revenue) * 100 : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let marginStatus = `Strong Gross Margin (${grossMarginPct.toFixed(1)}%)`;
    if (grossMarginPct < 25) {
      marginStatus = `Thin Margin (< 25%): High COGS Pressure`;
      tone = "bad";
    } else if (grossMarginPct < 45) {
      marginStatus = `Moderate Gross Margin (${grossMarginPct.toFixed(1)}%)`;
      tone = "warn";
    }

    return {
      hero: {
        label: "Cost of Goods Sold (COGS)",
        value: `$${Math.round(cogs).toLocaleString()}`,
      },
      badge: {
        text: marginStatus,
        tone,
      },
      rows: [
        { label: "Gross Profit", value: `$${Math.round(grossProfit).toLocaleString()}` },
        { label: "Gross Profit Margin", value: `${grossMarginPct.toFixed(2)}%` },
        { label: "COGS Revenue Ratio", value: `${cogsRatioPct.toFixed(2)}% of Revenue` },
        { label: "Current Period Production Cost", value: `$${Math.round(totalProduction).toLocaleString()}` },
        { label: "Inventory Change (Ending - Beginning)", value: `${endInv >= begInv ? "+" : ""}$${Math.round(endInv - begInv).toLocaleString()}` },
        { label: "Gross Markup Over COGS", value: `${cogs > 0 ? ((grossProfit / cogs) * 100).toFixed(1) : "0.0"}%` },
      ],
      steps: [
        `Total Current Production Cost = Materials ($${materials.toLocaleString()}) + Labor ($${labor.toLocaleString()}) + Overhead ($${overhead.toLocaleString()}) = $${totalProduction.toLocaleString()}`,
        `Standard Inventory Accounting: COGS = Beginning Inventory ($${begInv.toLocaleString()}) + Production ($${totalProduction.toLocaleString()}) - Ending Inventory ($${endInv.toLocaleString()}) = $${Math.round(cogs).toLocaleString()}`,
        `Gross Profit = Total Revenue ($${revenue.toLocaleString()}) - COGS ($${Math.round(cogs).toLocaleString()}) = $${Math.round(grossProfit).toLocaleString()}`,
        `Gross Margin Percentage = ($${Math.round(grossProfit).toLocaleString()} / $${revenue.toLocaleString()}) × 100 = ${grossMarginPct.toFixed(2)}%`,
      ],
      chart: {
        type: "donut",
        title: "Cost of Goods Sold Component Breakdown",
        format: "usd0",
        data: [
          { name: "Direct Raw Materials", value: Math.round(materials), color: "#0284c7" },
          { name: "Direct Production Labor", value: Math.round(labor), color: "#10b981" },
          { name: "Manufacturing Overhead", value: Math.round(overhead), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CogsCalculatorComponent() {
  return <CalcEngine config={cogsConfig} />;
}
