"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const roiConfig: CalcConfig = {
  id: "roi-calculator",
  title: "Return on Investment (ROI) Calculator",
  fields: [
    {
      kind: "number",
      key: "initialInvestment",
      label: "Initial Investment Capital ($)",
      default: 50000,
      min: 100,
      max: 100000000,
    },
    {
      kind: "number",
      key: "finalValue",
      label: "Final Asset / Exit Value ($)",
      default: 95000,
      min: 0,
      max: 1000000000,
    },
    {
      kind: "number",
      key: "investmentLength",
      label: "Holding Period (Years)",
      default: 3,
      min: 0.1,
      max: 50,
    },
    {
      kind: "number",
      key: "additionalIncome",
      label: "Dividends / Cash Flow Received ($)",
      default: 6000,
      min: 0,
      max: 100000000,
    },
  ],
  compute(vals) {
    const initial = Math.max(1, Number(vals.initialInvestment) || 50000);
    const finalVal = Math.max(0, Number(vals.finalValue) || 0);
    const years = Math.max(0.083, Number(vals.investmentLength) || 1);
    const income = Math.max(0, Number(vals.additionalIncome) || 0);

    const totalReturnDollars = (finalVal + income) - initial;
    const totalRoiPercent = (totalReturnDollars / initial) * 100;

    const totalYieldMultiple = (finalVal + income) / initial;
    let annualizedRoiPercent = 0;
    if (totalYieldMultiple > 0) {
      annualizedRoiPercent = (Math.pow(totalYieldMultiple, 1 / years) - 1) * 100;
    } else {
      annualizedRoiPercent = -100;
    }

    const capitalGain = Math.max(0, finalVal - initial);

    return {
      hero: {
        label: "Total ROI (%)",
        value: `${totalRoiPercent >= 0 ? "+" : ""}${totalRoiPercent.toFixed(2)}%`,
      },
      badge: {
        text: totalRoiPercent >= 20 ? "High Yield" : totalRoiPercent >= 0 ? "Profitable Investment" : "Capital Loss",
        tone: totalRoiPercent >= 20 ? "good" : totalRoiPercent >= 0 ? "info" : "bad",
      },
      secondary: [
        {
          label: "Annualized ROI (CAGR)",
          value: `${annualizedRoiPercent >= 0 ? "+" : ""}${annualizedRoiPercent.toFixed(2)}%/yr`,
        },
        {
          label: "Total Net Profit",
          value: `$${totalReturnDollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "Gross Capital Realized",
          value: `$${(finalVal + income).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "Investment Multiple (MOIC)",
          value: `${totalYieldMultiple.toFixed(2)}x`,
        },
      ],
      steps: [
        `Net Total Profit = ($${finalVal.toLocaleString()} + $${income.toLocaleString()}) - $${initial.toLocaleString()} = $${totalReturnDollars.toLocaleString()}`,
        `Total Cumulative ROI = ($${totalReturnDollars.toLocaleString()} / $${initial.toLocaleString()}) * 100 = ${totalRoiPercent.toFixed(2)}%`,
        `Multiple on Invested Capital (MOIC) = ($${(finalVal + income).toLocaleString()} / $${initial.toLocaleString()}) = ${totalYieldMultiple.toFixed(2)}x`,
        `Annualized Return (CAGR) = (${totalYieldMultiple.toFixed(4)})^(1 / ${years}) - 1 = ${annualizedRoiPercent.toFixed(2)}% per year`,
      ],
      chart: {
        type: "donut",
        title: "Capital Return & Value Decomposition",
        format: "usd0",
        data: [
          { name: "Original Capital Invested", value: Math.round(initial), color: "#64748b" },
          { name: "Capital Appreciation", value: Math.round(capitalGain), color: "#10b981" },
          { name: "Cumulative Dividends / Yield", value: Math.round(income), color: "#0ea5e9" },
        ],
      },
    };
  },
};

export default function RoiCalculatorComponent() {
  return <CalcEngine config={roiConfig} />;
}
