"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const salesTaxConfig: CalcConfig = {
  id: "sales-tax-calculator",
  title: "Commercial Sales Tax Calculator",
  fields: [
    {
      kind: "number",
      key: "amount",
      label: "Transaction Amount ($)",
      default: 1250,
      min: 0.01,
      max: 100000000,
    },
    {
      kind: "number",
      key: "stateRate",
      label: "State Sales Tax Rate (%)",
      default: 6.25,
      min: 0,
      max: 20,
    },
    {
      kind: "number",
      key: "localRate",
      label: "County & Municipal Local Tax (%)",
      default: 2.0,
      min: 0,
      max: 15,
    },
    {
      kind: "choice",
      key: "taxType",
      label: "Tax Treatment",
      default: "exclusive",
      options: [
        { label: "Tax Exclusive (Tax Added to Amount)", value: "exclusive" },
        { label: "Tax Inclusive (Tax Included in Amount)", value: "inclusive" },
      ],
    },
  ],
  compute(vals) {
    const amt = Math.max(0, Number(vals.amount) || 1250);
    const stateR = Math.max(0, Number(vals.stateRate) || 0) / 100;
    const localR = Math.max(0, Number(vals.localRate) || 0) / 100;
    const combinedR = stateR + localR;
    const isInclusive = vals.taxType === "inclusive";

    let preTaxBase = 0;
    let stateTax = 0;
    let localTax = 0;
    let totalTax = 0;
    let grossTotal = 0;

    if (isInclusive) {
      grossTotal = amt;
      preTaxBase = combinedR > 0 ? amt / (1 + combinedR) : amt;
      totalTax = grossTotal - preTaxBase;
      stateTax = combinedR > 0 ? (stateR / combinedR) * totalTax : 0;
      localTax = combinedR > 0 ? (localR / combinedR) * totalTax : 0;
    } else {
      preTaxBase = amt;
      stateTax = preTaxBase * stateR;
      localTax = preTaxBase * localR;
      totalTax = stateTax + localTax;
      grossTotal = preTaxBase + totalTax;
    }

    const effectiveRatePct = combinedR * 100;

    return {
      hero: {
        label: isInclusive ? "Net Pre-Tax Base" : "Total Transaction Amount",
        value: `$${(isInclusive ? preTaxBase : grossTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      badge: {
        text: `${effectiveRatePct.toFixed(2)}% Combined Sales Tax`,
        tone: effectiveRatePct > 8 ? "warn" : "info",
      },
      secondary: [
        {
          label: "Total Sales Tax Due",
          value: `$${totalTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "State Tax Portion",
          value: `$${stateTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "Local / City Tax Portion",
          value: `$${localTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "Combined Tax Rate",
          value: `${effectiveRatePct.toFixed(2)}%`,
        },
      ],
      steps: [
        `Combined Tax Rate = ${(stateR * 100).toFixed(2)}% (State) + ${(localR * 100).toFixed(2)}% (Local) = ${effectiveRatePct.toFixed(2)}%`,
        isInclusive
          ? `Pre-Tax Base = $${grossTotal.toFixed(2)} / (1 + ${(combinedR).toFixed(4)}) = $${preTaxBase.toFixed(2)}`
          : `Total Sales Tax = $${preTaxBase.toFixed(2)} * ${(combinedR).toFixed(4)} = $${totalTax.toFixed(2)}`,
        `State Share = $${stateTax.toFixed(2)} | Municipal/County Share = $${localTax.toFixed(2)}`,
        `Final Reconciled Gross Total = $${grossTotal.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Transaction & Tax Decomposition",
        format: "usd0",
        data: [
          { name: "Net Merchandise / Services", value: Math.round(preTaxBase), color: "#0284c7" },
          { name: "State Sales Tax Levy", value: Math.round(stateTax), color: "#10b981" },
          { name: "Local / Municipal Surcharge", value: Math.round(localTax), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function SalesTaxCalculatorComponent() {
  return <CalcEngine config={salesTaxConfig} />;
}
