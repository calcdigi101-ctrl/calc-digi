"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const burnRateConfig: CalcConfig = {
  id: "burn-rate-calculator",
  title: "Startup Burn Rate & Cash Runway Calculator",
  fields: [
    {
      kind: "number",
      key: "cashBalance",
      label: "Current Liquid Cash Reserves ($)",
      default: 750000,
      min: 0,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "grossBurn",
      label: "Monthly Gross Operating Outflows ($ / Month)",
      default: 85000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "monthlyRevenue",
      label: "Monthly Cash Receipts / Revenue ($ / Month)",
      default: 25000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "burnGrowthPct",
      label: "Projected Monthly Burn Expansion Rate (%)",
      default: 2.0,
      min: -50,
      max: 100,
    },
  ],
  compute(vals) {
    const cash = Number(vals.cashBalance) || 750000;
    const gross = Number(vals.grossBurn) || 85000;
    const rev = Number(vals.monthlyRevenue) || 25000;
    const expansion = Number(vals.burnGrowthPct) || 2.0;

    const netBurn = Math.max(0, gross - rev);
    const isDefaultAlive = rev >= gross;

    let runwayMonths = 0;
    if (isDefaultAlive) {
      runwayMonths = 999;
    } else if (netBurn > 0) {
      runwayMonths = cash / netBurn;
    }

    let tone: "good" | "warn" | "bad" = "good";
    let runwayBadge = `${runwayMonths.toFixed(1)} Months Runway`;
    if (isDefaultAlive) {
      runwayBadge = "Default Alive (Cash Flow Positive)";
      tone = "good";
    } else if (runwayMonths < 6) {
      runwayBadge = `Critical Danger: ${runwayMonths.toFixed(1)} Mo Runway (< 6 Mo)`;
      tone = "bad";
    } else if (runwayMonths < 12) {
      runwayBadge = `Fundraising Window: ${runwayMonths.toFixed(1)} Mo Runway (6–12 Mo)`;
      tone = "warn";
    } else {
      runwayBadge = `Healthy Runway: ${runwayMonths.toFixed(1)} Months (> 12 Mo)`;
      tone = "good";
    }

    return {
      hero: {
        label: "Estimated Cash Runway",
        value: isDefaultAlive ? "Infinite (Positive Cashflow)" : `${runwayMonths.toFixed(1)} Months`,
      },
      badge: {
        text: runwayBadge,
        tone,
      },
      rows: [
        { label: "Net Monthly Cash Burn", value: isDefaultAlive ? "$0 (Net +$" + Math.round(rev - gross).toLocaleString() + "/mo)" : `-$${Math.round(netBurn).toLocaleString()} / month` },
        { label: "Gross Monthly Burn (Outflows)", value: `$${Math.round(gross).toLocaleString()} / month` },
        { label: "Monthly Operating Inflows", value: `$${Math.round(rev).toLocaleString()} / month` },
        { label: "Current Cash Reserves", value: `$${Math.round(cash).toLocaleString()}` },
        { label: "Annualized Net Burn", value: isDefaultAlive ? "$0" : `$${Math.round(netBurn * 12).toLocaleString()} / year` },
        { label: "Recommended Series Extension Target", value: `$${Math.round(netBurn * 18).toLocaleString()} (18-Month Buffer)` },
      ],
      steps: [
        `Net Monthly Burn = Gross Operating Outflows ($${gross.toLocaleString()}) - Cash Inflows ($${rev.toLocaleString()}) = $${netBurn.toLocaleString()}/month`,
        isDefaultAlive
          ? `Because monthly cash receipts exceed gross outflows by $${Math.round(rev - gross).toLocaleString()}, the enterprise is Default Alive with no immediate dilution horizon.`
          : `Static Runway = Current Cash ($${cash.toLocaleString()}) / Net Monthly Burn ($${netBurn.toLocaleString()}) = ${runwayMonths.toFixed(1)} months`,
        `Capital Preservation Rule: Venture-backed startups should initiate their next equity funding round when runway drops below 9 to 12 months to avoid distress liquidation.`,
      ],
      chart: {
        type: "donut",
        title: "Monthly Cash Flow Proportions (Net Burn vs Inflow)",
        format: "usd0",
        data: isDefaultAlive
          ? [
              { name: "Monthly Gross Expenses", value: Math.round(gross), color: "#0284c7" },
              { name: "Retained Net Cash Surplus", value: Math.round(rev - gross), color: "#10b981" },
            ]
          : [
              { name: "Customer Revenue Offset", value: Math.round(rev), color: "#10b981" },
              { name: "Net Cash Depletion (Net Burn)", value: Math.round(netBurn), color: "#ef4444" },
            ],
      },
    };
  },
};

export default function BurnRateCalculatorComponent() {
  return <CalcEngine config={burnRateConfig} />;
}
