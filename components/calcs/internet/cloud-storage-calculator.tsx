"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cloudStorageConfig: CalcConfig = {
  id: "cloud-storage-calculator",
  title: "Cloud Object Storage, Growth Rate & Multi-Year Budget Calculator",
  fields: [
    { kind: "number", key: "initialTb", label: "Initial Stored Data Volume (TB)", default: 5, min: 0.1, max: 1000 },
    { kind: "number", key: "growthPct", label: "Annual Data Growth Rate (%)", default: 25, min: 0, max: 200 },
    { kind: "number", key: "retentionYears", label: "Forecast Horizon (Years)", default: 3, min: 1, max: 10 },
    { kind: "number", key: "costPerTbMonth", label: "Storage Cost ($/TB/Month)", default: 23, min: 1, max: 100 },
    { kind: "number", key: "egressTbMonth", label: "Monthly Data Egress / Download (TB)", default: 1, min: 0, max: 500 },
  ],
  presets: [
    { label: "AWS S3 Standard (5 TB, 25% Growth, $23/TB)", values: { initialTb: 5, growthPct: 25, retentionYears: 3, costPerTbMonth: 23, egressTbMonth: 1 } },
    { label: "Wasabi / Backblaze B2 ($6/TB Hot Storage)", values: { initialTb: 10, growthPct: 35, retentionYears: 3, costPerTbMonth: 6, egressTbMonth: 0 } },
    { label: "Enterprise Data Lake (50 TB, 40% Growth)", values: { initialTb: 50, growthPct: 40, retentionYears: 4, costPerTbMonth: 21, egressTbMonth: 8 } },
    { label: "Small Business Archive (1 TB, 15% Growth)", values: { initialTb: 1, growthPct: 15, retentionYears: 2, costPerTbMonth: 20, egressTbMonth: 0.2 } },
  ],
  compute: (vals) => {
    const init = Math.max(0.1, Number(vals.initialTb) || 5);
    const growth = Math.max(0, Number(vals.growthPct) || 25);
    const yrs = Math.min(10, Math.max(1, Number(vals.retentionYears) || 3));
    const tbCost = Math.max(1, Number(vals.costPerTbMonth) || 23);
    const egress = Math.max(0, Number(vals.egressTbMonth) || 1);

    const egressCostPerTb = 90.0;
    const monthlyEgressCost = egress * egressCostPerTb;

    let totalStorageSpend = 0;
    let currentTb = init;
    for (let y = 1; y <= yrs; y++) {
      const yearAvgTb = currentTb * (1 + (growth / 100.0) / 2.0);
      const yearStorageCost = yearAvgTb * tbCost * 12.0;
      const yearEgressCost = monthlyEgressCost * 12.0;
      totalStorageSpend += yearStorageCost + yearEgressCost;
      currentTb = currentTb * (1 + growth / 100.0);
    }

    const finalTb = init * Math.pow(1 + growth / 100.0, yrs);
    const finalMonthlyCost = (finalTb * tbCost) + monthlyEgressCost;

    return {
      hero: {
        label: `Cumulative ${yrs}-Year Total Cloud Spend`,
        value: `$${Math.round(totalStorageSpend).toLocaleString()}`,
      },
      badge: {
        text: `Final Volume: ${finalTb.toFixed(1)} TB`,
        tone: "good",
      },
      rows: [
        { label: "Initial Data Volume", value: `${init.toFixed(1)} TB` },
        { label: `Projected Volume at Year ${yrs}`, value: `${finalTb.toFixed(1)} TB (+${((finalTb / init - 1) * 100).toFixed(0)}%)` },
        { label: "Baseline Monthly Storage (Month 1)", value: `$${Math.round(init * tbCost).toLocaleString()}/mo` },
        { label: "Monthly Egress Bandwidth Cost", value: `$${Math.round(monthlyEgressCost).toLocaleString()}/mo (${egress} TB @ $90/TB)` },
        { label: `Final Monthly Cost (Year ${yrs})`, value: `$${Math.round(finalMonthlyCost).toLocaleString()}/mo` },
        { label: `Cumulative ${yrs}-Year Total Spend`, value: `$${Math.round(totalStorageSpend).toLocaleString()}`, strong: true },
      ],
      steps: [
        `Compounded Final Volume = ${init} TB * (1 + ${(growth / 100).toFixed(2)})^${yrs} = ${finalTb.toFixed(2)} TB`,
        `Year ${yrs} Monthly Storage = ${finalTb.toFixed(2)} TB * $${tbCost}/TB = $${(finalTb * tbCost).toFixed(0)}/mo`,
        `Cumulative ${yrs}-Year Total (Storage + Egress) = $${Math.round(totalStorageSpend).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Cumulative Cloud Spend: At-Rest Storage vs Egress Bandwidth",
        format: "usd0",
        data: [
          { name: "At-Rest Storage Cost", value: Math.round(totalStorageSpend - (monthlyEgressCost * 12 * yrs)), color: "#3b82f6" },
          { name: "Outbound Egress Transfer", value: Math.max(1, Math.round(monthlyEgressCost * 12 * yrs)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CloudStorageCalculatorComponent() {
  return <CalcEngine config={cloudStorageConfig} />;
}
