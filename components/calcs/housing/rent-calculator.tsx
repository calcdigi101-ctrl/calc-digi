"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "rent",
  title: "Rent Affordability Calculator",
  fields: [
    { kind: "number", key: "income", label: "Annual gross household income", prefix: "$", default: 78000, min: 10000, max: 2000000 },
    { kind: "number", key: "debts", label: "Monthly debt obligations (Loans, cards)", prefix: "$", default: 400, min: 0, max: 20000 },
    {
      kind: "choice",
      key: "rule",
      label: "Affordability rule / framework",
      default: "30pct",
      options: [
        { value: "30pct", label: "30% Gross Income Rule (HUD Standard)" },
        { value: "40x", label: "40x Rent Rule (NYC, SF, Boston Metro Landlords)" },
        { value: "503020", label: "50/30/20 Budget Rule (Conservative Needs Allocation)" },
      ],
    },
    { kind: "number", key: "utilities", label: "Estimated monthly utilities & wifi", prefix: "$", default: 220, min: 0, max: 2000, optional: true },
  ],
  compute: (v) => {
    const annualIncome = Number(v.income || 78000);
    const monthlyIncome = annualIncome / 12;
    const monthlyDebts = Number(v.debts || 0);
    const utils = Number(v.utilities || 220);
    const rule = v.rule || "30pct";

    if (annualIncome <= 0) {
      return { error: "Please enter a valid annual income greater than zero." };
    }

    let maxRent = 0;
    if (rule === "40x") {
      // Landlord requirement: Annual income must be at least 40x monthly rent
      maxRent = annualIncome / 40;
    } else if (rule === "503020") {
      // 50% for all Needs (Rent + Utilities + Groceries + Debts)
      // Assuming groceries/health take ~15% of income
      const maxNeeds = monthlyIncome * 0.50;
      maxRent = Math.max(0, maxNeeds - monthlyDebts - utils - (monthlyIncome * 0.10));
    } else {
      // 30% HUD rule
      maxRent = monthlyIncome * 0.30;
    }

    const totalShelterCost = maxRent + utils;
    const rentPctOfIncome = (maxRent / monthlyIncome) * 100;
    const remainingIncome = Math.max(0, monthlyIncome - maxRent - utils - monthlyDebts);
    const incomeNeeded40x = maxRent * 40;

    return {
      hero: {
        label: "Maximum affordable rent",
        value: `${usd0(maxRent)}/mo`,
        unit: `(Total Shelter: ${usd0(totalShelterCost)}/mo)`,
        sub: `Based on ${usd0(monthlyIncome)}/mo gross earnings under ${rule === "40x" ? "the 40x Landlord Rule" : rule === "503020" ? "50/30/20 Budget Framework" : "the 30% HUD Benchmark"}`,
      },
      badge: {
        text: rentPctOfIncome <= 30 ? "Affordable & Sustainable (<30% Income)" : "Moderate Rent Burden (Over 30%)",
        tone: rentPctOfIncome <= 30 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Rent Allocation", value: Number(maxRent.toFixed(0)), color: "#2563eb" },
          { name: "Monthly Utilities & Internet", value: Number(utils.toFixed(0)), color: "#06b6d4" },
          { name: "Existing Debt Payments", value: Number(monthlyDebts.toFixed(0)), color: "#f59e0b" },
          { name: "Remaining Living & Savings Cash", value: Number(remainingIncome.toFixed(0)), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Maximum Recommended Monthly Rent", value: `${usd0(maxRent)}/mo`, strong: true },
        { label: "Total Shelter Cost (Rent + Utilities)", value: `${usd0(totalShelterCost)}/mo`, strong: true },
        { label: "Share of Gross Income for Rent", value: `${rentPctOfIncome.toFixed(1)}%` },
        { label: "Annual Income Required (40x Rule)", value: usd0(incomeNeeded40x) },
        { label: "Remaining Monthly Net Cash Flow", value: usd0(remainingIncome) },
        { label: "Estimated Upfront Move-In Cash", value: `${usd0(maxRent * 3)} (1st mo + Security + Broker/Last)` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Upfront Move-In Cost Rule:</strong> Most landlords require first month&rsquo;s rent plus a security deposit (often 1 to 1.5 months&rsquo; rent). In major competitive metros, broker fees can add another 10% to 15% of annual rent.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function RentCalculator() {
  return <CalcEngine config={config} />;
}
