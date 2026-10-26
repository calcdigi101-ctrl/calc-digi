"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const scholarshipConfig: CalcConfig = {
  id: "scholarship-calculator",
  title: "Scholarship Coverage, 4-Year Value & Net Tuition Gap Calculator",
  fields: [
    { kind: "number", key: "totalAnnualTuition", label: "Annual Full Tuition & Fees ($)", default: 32000, min: 1000, max: 95000 },
    { kind: "number", key: "institutionalMeritAid", label: "University Merit Scholarship ($/year)", default: 12000, min: 0, max: 95000 },
    { kind: "number", key: "externalGrants", label: "Private / Foundation Grants ($/year)", default: 3500, min: 0, max: 50000 },
    { kind: "number", key: "minGpaRetention", label: "Minimum GPA Required for Annual Renewal", default: 3.25, min: 2.0, max: 4.0 },
    { kind: "number", key: "renewalYears", label: "Scholarship Renewal Term (Years)", default: 4, min: 1, max: 5 },
  ],
  presets: [
    { label: "Presidential Honors (75% Tuition Covered)", values: { totalAnnualTuition: 36000, institutionalMeritAid: 24000, externalGrants: 3000, minGpaRetention: 3.50, renewalYears: 4 } },
    { label: "Dean's Excellence Award (50% Covered)", values: { totalAnnualTuition: 30000, institutionalMeritAid: 12000, externalGrants: 3000, minGpaRetention: 3.00, renewalYears: 4 } },
    { label: "Full Tuition Fellowship (100% Free)", values: { totalAnnualTuition: 42000, institutionalMeritAid: 40000, externalGrants: 2000, minGpaRetention: 3.40, renewalYears: 4 } },
    { label: "Modest Community Grant (20% Offset)", values: { totalAnnualTuition: 24000, institutionalMeritAid: 3000, externalGrants: 2000, minGpaRetention: 2.75, renewalYears: 4 } },
  ],
  compute: (vals) => {
    const tuition = Math.max(1, Number(vals.totalAnnualTuition) || 32000);
    const merit = Math.max(0, Number(vals.institutionalMeritAid) || 12000);
    const external = Math.max(0, Number(vals.externalGrants) || 3500);
    const minGpa = Number(vals.minGpaRetention) || 3.25;
    const years = Math.max(1, Number(vals.renewalYears) || 4);

    const totalAnnualScholarship = merit + external;
    const coveragePct = Math.min(100.0, (totalAnnualScholarship / tuition) * 100.0);
    const annualNetGap = Math.max(0, tuition - totalAnnualScholarship);
    const lifetimeScholarshipValue = totalAnnualScholarship * years;
    const lifetimeNetTuitionGap = annualNetGap * years;

    let tier = "Substantial Tuition Offset";
    let tone: "good" | "warn" | "bad" = "good";

    if (coveragePct >= 95) {
      tier = "Full Ride / Comprehensive Tuition Coverage";
      tone = "good";
    } else if (coveragePct >= 60) {
      tier = "Major Merit Fellow (60%+ Tuition Offset)";
      tone = "good";
    } else if (coveragePct >= 30) {
      tier = "Solid Partial Coverage (Supplement with Work-Study)";
      tone = "good";
    } else {
      tier = "Modest Subsidy (Significant Unmet Gap Remaining)";
      tone = "warn";
    }

    return {
      hero: {
        label: "Total Annual Scholarship Award",
        value: `$${Math.round(totalAnnualScholarship).toLocaleString()} / year`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Tuition Coverage Percentage", value: `${coveragePct.toFixed(1)}% of annual tuition funded` },
        { label: "Annual Remaining Unmet Tuition Gap", value: `$${Math.round(annualNetGap).toLocaleString()} out-of-pocket` },
        { label: "Total Lifetime Scholarship Value (4 Yrs)", value: `$${Math.round(lifetimeScholarshipValue).toLocaleString()} in gift aid` },
        { label: "Academic Retention Requirement", value: `Maintain >= ${minGpa.toFixed(2)} Cumulative GPA` },
      ],
      steps: [
        `Annual Institutional Award = $${merit.toLocaleString()}`,
        `Annual External Foundation Grants = $${external.toLocaleString()}`,
        `Total Annual Scholarship Aid = $${merit.toLocaleString()} + $${external.toLocaleString()} = $${totalAnnualScholarship.toLocaleString()}`,
        `Tuition Coverage Ratio = ($${totalAnnualScholarship.toLocaleString()} / $${tuition.toLocaleString()}) * 100 = ${coveragePct.toFixed(1)}%`,
        `4-Year Cumulative Aid Benefit = $${totalAnnualScholarship.toLocaleString()} * ${years} years = $${lifetimeScholarshipValue.toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Annual Tuition Coverage Partition",
        format: "usd0",
        data: [
          { name: "University Merit Award", value: Math.round(merit), color: "#10b981" },
          { name: "Private / External Grants", value: Math.round(external), color: "#3b82f6" },
          { name: "Unmet Tuition Gap", value: Math.max(0, Math.round(annualNetGap)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function ScholarshipCalculatorComponent() {
  return <CalcEngine config={scholarshipConfig} />;
}
