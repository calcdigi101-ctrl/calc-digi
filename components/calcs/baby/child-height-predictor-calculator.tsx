"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

function cmToFtIn(cm: number): string {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round(totalIn % 12);
  return `${ft}' ${inch}"`;
}

export const config: CalcConfig = {
  id: "child-height-predictor-calc",
  title: "Child Adult Height Predictor Calculator",
  presets: [
    { label: "Average Parents (Dad 5'10\", Mom 5'4\") → Boy", values: { childSex: "boy", dadHeight: 178, momHeight: 163 } },
    { label: "Average Parents (Dad 5'10\", Mom 5'4\") → Girl", values: { childSex: "girl", dadHeight: 178, momHeight: 163 } },
    { label: "Tall Parents (Dad 6'2\" [188cm], Mom 5'8\" [173cm])", values: { childSex: "boy", dadHeight: 188, momHeight: 173 } },
    { label: "Petite Parents (Dad 5'6\" [168cm], Mom 5'1\" [155cm])", values: { childSex: "girl", dadHeight: 168, momHeight: 155 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "childSex",
      label: "Child's Biological Sex",
      default: "boy",
      segmented: true,
      options: [
        { value: "boy", label: "Boy (Male)" },
        { value: "girl", label: "Girl (Female)" },
      ],
    },
    {
      kind: "number",
      key: "dadHeight",
      label: "Father's Height (cm)",
      default: 178,
      min: 120,
      max: 230,
      hint: "e.g. 178 cm (5' 10\"), 183 cm (6' 0\")",
    },
    {
      kind: "number",
      key: "momHeight",
      label: "Mother's Height (cm)",
      default: 163,
      min: 120,
      max: 230,
      hint: "e.g. 163 cm (5' 4\"), 170 cm (5' 7\")",
    },
  ],
  compute(values) {
    const sex = String(values.childSex || "boy");
    const dad = Number(values.dadHeight) || 178;
    const mom = Number(values.momHeight) || 163;

    // Mid-parental Tanner method (clinical gold standard):
    // For boy: (Dad + Mom + 13cm) / 2
    // For girl: (Dad + Mom - 13cm) / 2
    const genderOffset = sex === "boy" ? 13 : -13;
    const predictedCm = (dad + mom + genderOffset) / 2;
    const lowCm = predictedCm - 6.5; // -2.5 inches
    const highCm = predictedCm + 6.5; // +2.5 inches

    const predictedFt = cmToFtIn(predictedCm);
    const lowFt = cmToFtIn(lowCm);
    const highFt = cmToFtIn(highCm);

    const steps = [
      `Father's Adult Height: ${dad} cm (${cmToFtIn(dad)})`,
      `Mother's Adult Height: ${mom} cm (${cmToFtIn(mom)})`,
      `Mid-Parental Formula (${sex === "boy" ? "Male +13 cm offset" : "Female −13 cm offset"}): (${dad} + ${mom} ${genderOffset >= 0 ? "+" : "−"} ${Math.abs(genderOffset)}) ÷ 2`,
      `Estimated Mid-Parental Height: ${fixed(predictedCm, 1)} cm (${predictedFt})`,
      `95% Statistical Confidence Span (±6.5 cm / 2.5 inches): ${lowFt} to ${highFt}`,
    ];

    return {
      hero: {
        label: "Predicted Adult Height",
        value: predictedFt,
        unit: `${fixed(predictedCm, 1)} cm`,
      },
      badge: {
        text: `Target Window: ${lowFt} – ${highFt}`,
        tone: "good",
      },
      rows: [
        { label: "Predicted Mid-Parental Height", value: `${predictedFt} (${fixed(predictedCm, 1)} cm)`, strong: true },
        { label: "Expected 95% Normal Range", value: `${lowFt} to ${highFt} (${fixed(lowCm, 1)}–${fixed(highCm, 1)} cm)`, strong: true },
        { label: "Father's Recorded Height", value: `${cmToFtIn(dad)} (${dad} cm)` },
        { label: "Mother's Recorded Height", value: `${cmToFtIn(mom)} (${mom} cm)` },
        { label: "Mid-Parental Baseline Mean", value: `${fixed((dad + mom) / 2, 1)} cm (${cmToFtIn((dad + mom) / 2)})` },
        { label: "Scientific Methodology", value: "Tanner Mid-Parental Target Height Formula" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Parental Genetic Height Composition",
        data: [
          { name: `Paternal Share (${cmToFtIn(dad)})`, value: dad, color: "#10b981" },
          { name: `Maternal Share (${cmToFtIn(mom)})`, value: mom, color: "#06b6d4" },
        ],
      },
      note: {
        text: "Genetics account for 60%–80% of final adult stature, while childhood nutrition, quality sleep (growth hormone surges during deep sleep), physical activity, and overall health determine whether a child reaches their full genetic ceiling.",
        tone: "neutral",
      },
    };
  },
};

export default function ChildHeightPredictorCalculator() {
  return <CalcEngine config={config} />;
}
