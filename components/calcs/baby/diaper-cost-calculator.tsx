"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd, usd0, num } from "@/components/flagship/engine/format";

const PRICES = {
  budget: 0.18,
  standard: 0.28,
  premium: 0.42,
  cloth: 0.05,
};

export const config: CalcConfig = {
  id: "diaper-cost-calc",
  title: "Baby Diaper Cost Calculator",
  presets: [
    { label: "Newborn First Year (Store Brand, 10/day)", values: { diaperType: "budget", ageMonths: 0, diapersPerDay: 10 } },
    { label: "Infant Name Brand (Huggies/Pampers, 8/day)", values: { diaperType: "standard", ageMonths: 4, diapersPerDay: 8 } },
    { label: "Premium Eco-Friendly (Coterie/Honest, 7/day)", values: { diaperType: "premium", ageMonths: 6, diapersPerDay: 7 } },
    { label: "Cloth Diapering (Reusable System)", values: { diaperType: "cloth", ageMonths: 0, diapersPerDay: 8 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "diaperType",
      label: "Diaper Type / Brand Tier",
      default: "standard",
      segmented: false,
      options: [
        { value: "budget", label: "Store Brand / Budget (~$0.18 each: Kirkland, Up&Up, Luvs)" },
        { value: "standard", label: "Popular Name Brand (~$0.28 each: Pampers, Huggies)" },
        { value: "premium", label: "Premium / Eco-Friendly (~$0.42 each: Honest, Coterie, Dyper)" },
        { value: "cloth", label: "Cloth Diaper System (Reusable One-Size + Laundry)" },
      ],
    },
    {
      kind: "number",
      key: "ageMonths",
      label: "Baby's Current Age (Months)",
      default: 2,
      min: 0,
      max: 36,
      integer: true,
      hint: "Average potty training age is 30 months (2.5 years)",
    },
    {
      kind: "number",
      key: "diapersPerDay",
      label: "Average Diapers Used Per Day",
      default: 8,
      min: 4,
      max: 15,
      integer: true,
      hint: "Newborns use 10–12; 6-month infants use 7–8; toddlers use 5–6",
    },
  ],
  compute(values) {
    const type = String(values.diaperType || "standard") as keyof typeof PRICES;
    const age = Math.min(36, Math.max(0, Math.floor(Number(values.ageMonths || 0))));
    const dpd = Math.max(4, Math.floor(Number(values.diapersPerDay || 8)));
    const price = PRICES[type] ?? 0.28;

    const remainingMonths = Math.max(1, 30 - age);

    let monthlyCost = 0;
    let annualCost = 0;
    let lifetimeRemainingCost = 0;
    let totalDiapersRemaining = 0;
    let clothSavings = 0;

    if (type === "cloth") {
      const initialClothSet = 350;
      const monthlyLaundry = 15;
      monthlyCost = monthlyLaundry;
      annualCost = monthlyLaundry * 12;
      lifetimeRemainingCost = (age < 3 ? initialClothSet : 0) + monthlyLaundry * remainingMonths;
      totalDiapersRemaining = dpd * 30 * remainingMonths;
    } else {
      monthlyCost = dpd * 30.4 * price;
      annualCost = monthlyCost * 12;
      lifetimeRemainingCost = monthlyCost * remainingMonths;
      totalDiapersRemaining = Math.round(dpd * 30.4 * remainingMonths);

      const clothComparableCost = 350 + 15 * remainingMonths;
      if (lifetimeRemainingCost > clothComparableCost) {
        clothSavings = lifetimeRemainingCost - clothComparableCost;
      }
    }

    const steps = [
      `Daily Usage Rate: ${dpd} diapers/day × $${price.toFixed(2)} unit cost = ${usd(dpd * price)} daily expense`,
      `Monthly Projection (30.4 days avg): ${usd(monthlyCost)} per month`,
      `Annual Budget: ${usd0(annualCost)} per year`,
      `Potty Training Timeline: ${remainingMonths} months remaining until typical 30-month milestone`,
      `Cumulative Remaining Diapers: ~${num(totalDiapersRemaining)} total diaper changes ahead`,
    ];

    return {
      hero: {
        label: "Monthly Diaper Cost",
        value: usd(monthlyCost),
        unit: "per month",
      },
      badge: {
        text: `${usd0(annualCost)} per year`,
        tone: "good",
      },
      rows: [
        { label: "Estimated Monthly Spend", value: `${usd(monthlyCost)} / mo`, strong: true },
        { label: "Annual Projected Cost", value: `${usd0(annualCost)} / year`, strong: true },
        { label: "Cost Until Potty Training (30 mo)", value: usd0(lifetimeRemainingCost), strong: true },
        { label: "Remaining Diapers Needed", value: `~${num(totalDiapersRemaining)} diapers` },
        { label: "Months to Potty Training", value: `${remainingMonths} months remaining` },
        ...(clothSavings > 0 ? [{ label: "Potential Cloth Diaper Savings", value: `${usd0(clothSavings)} total savings` }] : []),
      ],
      steps,
      chart: {
        type: "donut",
        title: "Annual Parenting Diapering Budget",
        data: [
          { name: `Diapers Only (${usd0(annualCost)})`, value: Math.max(1, annualCost), color: "#10b981" },
          { name: `Baby Wipes & Rash Creams (${usd0(annualCost * 0.22)})`, value: Math.max(1, annualCost * 0.22), color: "#06b6d4" },
        ],
      },
      note: {
        text: "Wholesale club buying (Costco Kirkland or Sam's Club Member's Mark) saves an average of $350–$600 per year compared to supermarket premium packaging without sacrificing leak protection.",
        tone: "neutral",
      },
    };
  },
};

export default function DiaperCostCalculator() {
  return <CalcEngine config={config} />;
}
