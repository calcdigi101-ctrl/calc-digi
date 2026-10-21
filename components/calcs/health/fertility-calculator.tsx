"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "fertility",
  title: "Fertility & Conception Odds Calculator",
  fields: [
    {
      kind: "number",
      key: "age",
      label: "Female biological age",
      suffix: "years",
      default: 30,
      min: 18,
      max: 50,
      integer: true,
      hint: "Maternal age is the primary predictor of oocyte quantity and chromosomal competence.",
    },
    {
      kind: "number",
      key: "monthsTrying",
      label: "Months actively trying to conceive",
      suffix: "months",
      default: 4,
      min: 0,
      max: 60,
      integer: true,
      hint: "Consecutive months of regular unprotected intercourse during the fertile window.",
    },
    {
      kind: "choice",
      key: "cycleRegularity",
      label: "Menstrual cycle consistency",
      default: "regular",
      options: [
        { value: "regular", label: "Regular Cycles (Predictable within 24–35 days)" },
        { value: "irregular", label: "Irregular Cycles (Varies by > 7–10 days)" },
        { value: "infrequent", label: "Infrequent / Oligomenorrhea (> 38 days between periods)" },
      ],
    },
  ],
  compute: (v) => {
    const age = Number(v.age || 30);
    const months = Number(v.monthsTrying || 4);
    const regularity = (v.cycleRegularity as string) || "regular";

    // Baseline monthly fecundability by age:
    let baseFecund = 0.20;
    let amhExpected = "2.2 – 3.0 ng/mL";
    let aneuploidy = "18% – 22%";

    if (age < 25) {
      baseFecund = 0.25;
      amhExpected = "3.0 – 4.5 ng/mL";
      aneuploidy = "10% – 15%";
    } else if (age < 30) {
      baseFecund = 0.22;
      amhExpected = "2.5 – 3.5 ng/mL";
      aneuploidy = "15% – 20%";
    } else if (age < 35) {
      baseFecund = 0.18;
      amhExpected = "1.8 – 2.5 ng/mL";
      aneuploidy = "20% – 28%";
    } else if (age < 38) {
      baseFecund = 0.12;
      amhExpected = "1.2 – 1.8 ng/mL";
      aneuploidy = "35% – 45%";
    } else if (age < 40) {
      baseFecund = 0.08;
      amhExpected = "0.8 – 1.2 ng/mL";
      aneuploidy = "50% – 60%";
    } else if (age < 42) {
      baseFecund = 0.04;
      amhExpected = "0.4 – 0.8 ng/mL";
      aneuploidy = "65% – 75%";
    } else {
      baseFecund = 0.015;
      amhExpected = "< 0.4 ng/mL";
      aneuploidy = "> 80%";
    }

    // Regularity penalty
    const regMult = regularity === "infrequent" ? 0.35 : regularity === "irregular" ? 0.65 : 1.0;
    const adjFecund = baseFecund * regMult;

    // Cumulative probability: 1 - (1 - f)^N
    const p6 = Math.round((1 - Math.pow(1 - adjFecund, 6)) * 100);
    const p12 = Math.round((1 - Math.pow(1 - adjFecund, 12)) * 100);

    // ASRM clinical evaluation timing:
    let asrmGuideline = "Evaluate after 12 months of unsuccessful attempts";
    let badgeTone: "good" | "warn" | "neutral" = "good";

    if (age >= 40) {
      asrmGuideline = "Immediate reproductive endocrinologist (REI) consultation advised";
      badgeTone = "warn";
    } else if (age >= 35) {
      asrmGuideline = months >= 6
        ? "Evaluation Recommended: 6+ months without conception reached (ASRM standard)"
        : "Evaluate after 6 months of attempts (ASRM age 35+ standard)";
      badgeTone = months >= 6 ? "warn" : "neutral";
    } else {
      if (months >= 12) {
        asrmGuideline = "Evaluation Recommended: 12+ months threshold reached";
        badgeTone = "warn";
      }
    }

    const monthlyPctStr = `${(adjFecund * 100).toFixed(1)}%`;

    return {
      hero: {
        label: "Estimated Monthly Fecundability",
        value: monthlyPctStr,
        unit: "/ cycle",
        sub: `12-Month Cumulative Projection: ~${p12}% | ASRM Status: ${asrmGuideline.split("(")[0].trim()}`,
      },
      badge: { text: `Age ${age}: ${p12}% 1-Year Cumulative Odds`, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "12-Month Cumulative Probability", value: p12, color: "#10b981" },
          { name: "Unassisted Remainder", value: Math.max(0, 100 - p12), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Per-Cycle Conception Probability", value: monthlyPctStr, strong: true },
        { label: "6-Month Cumulative Conception Odds", value: `~${p6}%`, strong: true },
        { label: "12-Month Cumulative Conception Odds", value: `~${p12}%`, strong: true },
        { label: "ASRM Clinical Action Threshold", value: asrmGuideline },
        { label: "Age-Specific Ovarian Reserve (AMH)", value: amhExpected },
        { label: "Estimated Oocyte Aneuploidy Rate", value: aneuploidy },
        { label: "Consecutive Months Attempted", value: `${months} months` },
        { label: "Ovulatory Regularity Multiplier", value: `${(regMult * 100).toFixed(0)}% of baseline` },
      ],
      note: {
        text: (
          <span>
            🩺 <strong>ASRM Clinical Thresholds:</strong> The American Society for Reproductive Medicine guidelines state that women aged 35 and older should seek fertility evaluation after 6 months of unsuccessful timed intercourse, whereas women under 35 should complete 12 months. Women aged 40 or older should receive immediate assessment.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function FertilityCalculator() {
  return <CalcEngine config={config} />;
}
