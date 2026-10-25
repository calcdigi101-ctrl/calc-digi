"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const startupValuationConfig: CalcConfig = {
  id: "startup-valuation-calculator",
  title: "Startup Valuation & Cap Table Dilution Calculator",
  fields: [
    {
      kind: "number",
      key: "preMoneyValuation",
      label: "Pre-Money Valuation ($)",
      default: 8000000,
      min: 10000,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "investmentAmount",
      label: "New Investment Capital Round ($)",
      default: 2000000,
      min: 1000,
      max: 500000000,
    },
    {
      kind: "number",
      key: "optionPoolPercent",
      label: "Unallocated ESOP Option Pool (%)",
      default: 10.0,
      min: 0,
      max: 30,
    },
    {
      kind: "choice",
      key: "roundType",
      label: "Financing Round",
      default: "seed",
      options: [
        { label: "Pre-Seed ($2M - $5M Pre)", value: "pre_seed" },
        { label: "Seed Stage ($6M - $12M Pre)", value: "seed" },
        { label: "Series A ($15M - $35M Pre)", value: "series_a" },
        { label: "Series B ($40M - $100M Pre)", value: "series_b" },
      ],
    },
  ],
  compute(vals) {
    const preMoney = Math.max(1000, Number(vals.preMoneyValuation) || 8000000);
    const investment = Math.max(0, Number(vals.investmentAmount) || 2000000);
    const optionPoolPct = Math.max(0, Math.min(35, Number(vals.optionPoolPercent) || 0));

    const postMoney = preMoney + investment;
    const investorEquityPct = (investment / postMoney) * 100;
    
    const availablePrePoolPct = 100 - optionPoolPct;
    const founderEquityPct = (preMoney / postMoney) * (availablePrePoolPct / 100) * 100;
    const effectiveOptionPoolPct = 100 - investorEquityPct - founderEquityPct;

    const dilutionFactor = (investment / postMoney) * 100;

    return {
      hero: {
        label: "Post-Money Valuation",
        value: `$${postMoney.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      },
      badge: {
        text: `${investorEquityPct.toFixed(1)}% Round Dilution`,
        tone: investorEquityPct > 25 ? "warn" : "good",
      },
      secondary: [
        {
          label: "New Investor Ownership",
          value: `${investorEquityPct.toFixed(2)}%`,
        },
        {
          label: "Founder & Common Ownership",
          value: `${founderEquityPct.toFixed(2)}%`,
        },
        {
          label: "Employee Option Pool (ESOP)",
          value: `${effectiveOptionPoolPct.toFixed(2)}%`,
        },
        {
          label: "Founder Round Dilution",
          value: `${dilutionFactor.toFixed(2)}%`,
        },
      ],
      steps: [
        `Post-Money Valuation = $${preMoney.toLocaleString()} (Pre-Money) + $${investment.toLocaleString()} (New Cash) = $${postMoney.toLocaleString()}`,
        `Investor Equity Ownership = ($${investment.toLocaleString()} / $${postMoney.toLocaleString()}) * 100 = ${investorEquityPct.toFixed(2)}%`,
        `Pre-Round Option Pool Sizing = ${optionPoolPct.toFixed(1)}% pre-money pool carveout`,
        `Retained Founder Common Equity = ${founderEquityPct.toFixed(2)}% post-financing ownership`,
      ],
      chart: {
        type: "donut",
        title: "Post-Money Cap Table Ownership Structure (%)",
        format: "pct",
        data: [
          { name: "Founders & Existing Common", value: parseFloat(founderEquityPct.toFixed(2)), color: "#10b981" },
          { name: "Incoming Preferred Investors", value: parseFloat(investorEquityPct.toFixed(2)), color: "#0ea5e9" },
          { name: "Employee Option Pool (ESOP)", value: parseFloat(effectiveOptionPoolPct.toFixed(2)), color: "#6366f1" },
        ],
      },
    };
  },
};

export default function StartupValuationCalculatorComponent() {
  return <CalcEngine config={startupValuationConfig} />;
}
