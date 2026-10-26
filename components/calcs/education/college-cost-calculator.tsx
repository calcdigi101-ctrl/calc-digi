"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const collegeCostConfig: CalcConfig = {
  id: "college-cost-calculator",
  title: "College Cost of Attendance (COA) & Net Price Calculator",
  fields: [
    { kind: "number", key: "annualTuitionFees", label: "Annual Tuition & Mandatory Fees ($)", default: 18500, min: 0, max: 90000 },
    { kind: "number", key: "roomAndBoard", label: "Annual Housing, Room & Meal Plan ($)", default: 12500, min: 0, max: 35000 },
    { kind: "number", key: "booksSuppliesMisc", label: "Annual Books, Travel & Personal ($)", default: 3500, min: 0, max: 15000 },
    { kind: "number", key: "annualScholarshipsGrants", label: "Annual Grants & Gift Aid (Non-Repayable) ($)", default: 11000, min: 0, max: 90000 },
    { kind: "number", key: "projectedInflationRate", label: "Projected Annual Tuition Inflation (%)", default: 3.5, min: 0, max: 10 },
  ],
  presets: [
    { label: "In-State Public University ($26k COA)", values: { annualTuitionFees: 11200, roomAndBoard: 11800, booksSuppliesMisc: 3200, annualScholarshipsGrants: 8500, projectedInflationRate: 3.2 } },
    { label: "Out-of-State Public Flagship ($48k COA)", values: { annualTuitionFees: 28500, roomAndBoard: 14500, booksSuppliesMisc: 4500, annualScholarshipsGrants: 12000, projectedInflationRate: 3.5 } },
    { label: "Private Non-Profit University ($75k COA)", values: { annualTuitionFees: 48000, roomAndBoard: 17500, booksSuppliesMisc: 5500, annualScholarshipsGrants: 32000, projectedInflationRate: 4.0 } },
    { label: "Community College Transfer Track ($14k COA)", values: { annualTuitionFees: 4200, roomAndBoard: 7500, booksSuppliesMisc: 2500, annualScholarshipsGrants: 5000, projectedInflationRate: 2.5 } },
  ],
  compute: (vals) => {
    const tuition = Math.max(0, Number(vals.annualTuitionFees) || 18500);
    const room = Math.max(0, Number(vals.roomAndBoard) || 12500);
    const misc = Math.max(0, Number(vals.booksSuppliesMisc) || 3500);
    const aid = Math.max(0, Number(vals.annualScholarshipsGrants) || 11000);
    const infRate = Math.max(0, Number(vals.projectedInflationRate) || 3.5) / 100.0;

    const baseCoaYear1 = tuition + room + misc;
    const baseNetPriceYear1 = Math.max(0, baseCoaYear1 - aid);

    // 4-year cumulative calculation with compounding inflation
    let cumulativeCoa4Yr = 0;
    let cumulativeNet4Yr = 0;
    for (let yr = 0; yr < 4; yr++) {
      const inflationFactor = Math.pow(1 + infRate, yr);
      const yrCoa = baseCoaYear1 * inflationFactor;
      const yrNet = Math.max(0, yrCoa - aid);
      cumulativeCoa4Yr += yrCoa;
      cumulativeNet4Yr += yrNet;
    }

    let affordability = "Moderate Out-of-Pocket Family Obligation";
    let tone: "good" | "warn" | "bad" = "good";

    if (baseNetPriceYear1 <= 10000) {
      affordability = "High Affordability (Low Debt Obligation)";
      tone = "good";
    } else if (baseNetPriceYear1 <= 25000) {
      affordability = "Moderate Cost (Standard Student Loan Range)";
      tone = "good";
    } else if (baseNetPriceYear1 <= 40000) {
      affordability = "High Family Burden (Parent PLUS / Private Loan Risk)";
      tone = "warn";
    } else {
      affordability = "Extreme Financial Strain (Major Debt Exposure)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Year 1 Net Price (After Grants)",
        value: `$${Math.round(baseNetPriceYear1).toLocaleString()} / year`,
      },
      badge: {
        text: affordability,
        tone: tone,
      },
      rows: [
        { label: "Year 1 Total Cost of Attendance (COA)", value: `$${Math.round(baseCoaYear1).toLocaleString()} ($${Math.round(tuition).toLocaleString()} tuition)` },
        { label: "Total 4-Year Projected Net Price", value: `$${Math.round(cumulativeNet4Yr).toLocaleString()} (with ${((infRate) * 100).toFixed(1)}% inflation)` },
        { label: "4-Year Gross Cost of Attendance", value: `$${Math.round(cumulativeCoa4Yr).toLocaleString()}` },
        { label: "Total 4-Year Gift Aid Subsidy", value: `$${Math.round(aid * 4).toLocaleString()} in free non-repayable aid` },
      ],
      steps: [
        `Year 1 Gross COA = $${tuition.toLocaleString()} (Tuition) + $${room.toLocaleString()} (Housing) + $${misc.toLocaleString()} (Misc) = $${baseCoaYear1.toLocaleString()}`,
        `Year 1 Net Price = $${baseCoaYear1.toLocaleString()} - $${aid.toLocaleString()} (Gift Aid) = $${baseNetPriceYear1.toLocaleString()}`,
        `Apply ${(infRate * 100).toFixed(1)}% Annual Inflation over 4 Years`,
        `4-Year Total Projected Out-of-Pocket Net Expense = $${Math.round(cumulativeNet4Yr).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Year 1 Cost of Attendance Composition",
        format: "usd0",
        data: [
          { name: "Tuition & Fees", value: Math.round(tuition), color: "#3b82f6" },
          { name: "Housing & Dining", value: Math.round(room), color: "#10b981" },
          { name: "Books & Living Expenses", value: Math.round(misc), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CollegeCostCalculatorComponent() {
  return <CalcEngine config={collegeCostConfig} />;
}
