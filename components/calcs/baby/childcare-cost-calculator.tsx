"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd, usd0 } from "@/components/flagship/engine/format";

const CARE_DEFAULTS = {
  daycare_infant: 385,
  daycare_toddler: 310,
  family_home: 235,
  nanny: 950,
  aupair: 475,
};

export const config: CalcConfig = {
  id: "childcare-cost-calc",
  title: "Childcare & Daycare Cost Calculator",
  presets: [
    { label: "Infant Daycare Center ($385/wk)", values: { careType: "daycare_infant", weeklyCost: 385, fsaMax: "yes" } },
    { label: "Toddler Daycare Center ($310/wk)", values: { careType: "daycare_toddler", weeklyCost: 310, fsaMax: "yes" } },
    { label: "Full-Time Private Nanny ($950/wk)", values: { careType: "nanny", weeklyCost: 950, fsaMax: "yes" } },
    { label: "In-Home Family Daycare ($235/wk)", values: { careType: "family_home", weeklyCost: 235, fsaMax: "no" } },
  ],
  fields: [
    {
      kind: "choice",
      key: "careType",
      label: "Childcare Arrangement",
      default: "daycare_infant",
      segmented: false,
      options: [
        { value: "daycare_infant", label: "Licensed Daycare Center (Infant Room)" },
        { value: "daycare_toddler", label: "Licensed Daycare Center (Toddler Room)" },
        { value: "family_home", label: "In-Home Family Childcare Provider" },
        { value: "nanny", label: "Full-Time Private Nanny (40 hrs/wk)" },
        { value: "aupair", label: "Au Pair Program (Stipend + Agency Fees)" },
      ],
    },
    {
      kind: "number",
      key: "weeklyCost",
      label: "Weekly Rate ($)",
      default: 385,
      min: 50,
      max: 3000,
      hint: "Average US infant center is $300–$550/week depending on metro area",
    },
    {
      kind: "number",
      key: "weeksPerYear",
      label: "Enrolled Weeks per Year",
      default: 50,
      min: 10,
      max: 52,
      integer: true,
      hint: "Most daycares charge year-round (50 to 52 weeks)",
    },
    {
      kind: "choice",
      key: "fsaMax",
      label: "Use Dependent Care FSA ($5,000 Tax-Free Limit)?",
      default: "yes",
      segmented: true,
      options: [
        { value: "yes", label: "Yes (Save ~$1,500 Taxes)" },
        { value: "no", label: "No (Pay Post-Tax)" },
      ],
    },
  ],
  compute(values) {
    const weekly = Number(values.weeklyCost) || 385;
    const weeks = Math.min(52, Math.max(1, Number(values.weeksPerYear || 50)));
    const useFsa = values.fsaMax === "yes";

    const grossAnnual = weekly * weeks;
    const grossMonthly = grossAnnual / 12;

    // Dependent Care FSA max is $5,000 pre-tax.
    // Average marginal tax savings: 22% Federal + 7.65% FICA + 5% State ≈ 32%
    const fsaAmount = useFsa ? Math.min(5000, grossAnnual) : 0;
    const estimatedTaxSavings = fsaAmount * 0.32;

    const netAnnual = grossAnnual - estimatedTaxSavings;
    const netMonthly = netAnnual / 12;

    const steps = [
      `Weekly Tuition Rate: ${usd0(weekly)} × ${weeks} weeks per year = ${usd0(grossAnnual)} Gross Annual Childcare`,
      `Gross Monthly Commitment: ${usd0(grossAnnual)} ÷ 12 months = ${usd0(grossMonthly)} per month`,
      useFsa
        ? `Pre-Tax Dependent Care FSA: $5,000 max deduction saves ~32% in combined income & FICA taxes (${usd0(estimatedTaxSavings)})`
        : "No FSA Applied (All payments funded with after-tax dollars)",
      `Net Out-of-Pocket Expense: ${usd0(grossAnnual)} − ${usd0(estimatedTaxSavings)} = ${usd0(netAnnual)} annually (${usd0(netMonthly)} / month)`,
    ];

    return {
      hero: {
        label: "Net Monthly Childcare Cost",
        value: usd0(netMonthly),
        unit: "per month",
      },
      badge: {
        text: `${usd0(netAnnual)} net / year`,
        tone: "good",
      },
      rows: [
        { label: "Net Monthly Cost (After Tax Breaks)", value: `${usd0(netMonthly)} / mo`, strong: true },
        { label: "Net Annual Total Out-of-Pocket", value: `${usd0(netAnnual)} / year`, strong: true },
        { label: "Gross Tuition Before Taxes", value: `${usd0(grossAnnual)} / year` },
        { label: "Weekly Daycare Expense", value: `${usd0(weekly)} / week` },
        ...(estimatedTaxSavings > 0
          ? [{ label: "Estimated FSA Tax Savings", value: `${usd0(estimatedTaxSavings)} saved per year` }]
          : []),
        { label: "Federal Child Care Tax Credit Note", value: "Eligible for non-FSA child expenses up to IRS cap" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Annual Childcare Budget Breakdown",
        data: [
          { name: `Net Care Expense (${usd0(netAnnual)})`, value: Math.max(1, netAnnual), color: "#10b981" },
          ...(estimatedTaxSavings > 0
            ? [{ name: `FSA Tax Savings (${usd0(estimatedTaxSavings)})`, value: Math.max(1, estimatedTaxSavings), color: "#06b6d4" }]
            : []),
        ],
      },
      note: {
        text: "Enrolling in your employer's Dependent Care Flexible Spending Account (DCFSA) lets you set aside up to $5,000 completely pre-tax, delivering immediate payroll tax savings for infant and toddler care.",
        tone: "neutral",
      },
    };
  },
};

export default function ChildcareCostCalculator() {
  return <CalcEngine config={config} />;
}
