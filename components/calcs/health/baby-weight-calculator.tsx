"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

// WHO Multicentre Growth Reference Study Medians & SDs (0 to 24 months)
const WHO_BENCHMARKS: Record<string, { m: number; p3: number; p97: number }[]> = {
  boy: [
    { m: 3.3, p3: 2.5, p97: 4.4 }, // 0m
    { m: 4.5, p3: 3.4, p97: 5.8 }, // 1m
    { m: 5.6, p3: 4.3, p97: 7.1 }, // 2m
    { m: 6.4, p3: 5.0, p97: 8.0 }, // 3m
    { m: 7.0, p3: 5.6, p97: 8.7 }, // 4m
    { m: 7.5, p3: 6.0, p97: 9.3 }, // 5m
    { m: 7.9, p3: 6.4, p97: 9.8 }, // 6m
    { m: 8.3, p3: 6.7, p97: 10.3 }, // 7m
    { m: 8.6, p3: 6.9, p97: 10.7 }, // 8m
    { m: 8.9, p3: 7.1, p97: 11.0 }, // 9m
    { m: 9.2, p3: 7.4, p97: 11.4 }, // 10m
    { m: 9.4, p3: 7.6, p97: 11.7 }, // 11m
    { m: 9.6, p3: 7.7, p97: 12.0 }, // 12m
    { m: 10.1, p3: 8.1, p97: 12.5 }, // 14m
    { m: 10.5, p3: 8.4, p97: 13.1 }, // 16m
    { m: 10.9, p3: 8.8, p97: 13.7 }, // 18m
    { m: 11.3, p3: 9.1, p97: 14.2 }, // 20m
    { m: 11.8, p3: 9.4, p97: 14.7 }, // 22m
    { m: 12.2, p3: 9.7, p97: 15.3 }, // 24m
  ],
  girl: [
    { m: 3.2, p3: 2.4, p97: 4.2 }, // 0m
    { m: 4.2, p3: 3.2, p97: 5.5 }, // 1m
    { m: 5.1, p3: 3.9, p97: 6.6 }, // 2m
    { m: 5.8, p3: 4.5, p97: 7.5 }, // 3m
    { m: 6.4, p3: 5.0, p97: 8.2 }, // 4m
    { m: 6.9, p3: 5.4, p97: 8.8 }, // 5m
    { m: 7.3, p3: 5.7, p97: 9.3 }, // 6m
    { m: 7.6, p3: 6.0, p97: 9.8 }, // 7m
    { m: 7.9, p3: 6.3, p97: 10.2 }, // 8m
    { m: 8.2, p3: 6.5, p97: 10.5 }, // 9m
    { m: 8.5, p3: 6.7, p97: 10.9 }, // 10m
    { m: 8.7, p3: 6.9, p97: 11.2 }, // 11m
    { m: 8.9, p3: 7.0, p97: 11.5 }, // 12m
    { m: 9.4, p3: 7.4, p97: 12.1 }, // 14m
    { m: 9.8, p3: 7.7, p97: 12.7 }, // 16m
    { m: 10.2, p3: 8.1, p97: 13.2 }, // 18m
    { m: 10.6, p3: 8.4, p97: 13.8 }, // 20m
    { m: 11.0, p3: 8.7, p97: 14.3 }, // 22m
    { m: 11.5, p3: 9.0, p97: 14.8 }, // 24m
  ],
};

export const config: CalcConfig = {
  id: "baby-weight",
  title: "Baby Weight Percentile Calculator",
  fields: [
    {
      kind: "choice",
      key: "sex",
      label: "Infant biological sex",
      default: "boy",
      segmented: true,
      options: [
        { value: "boy", label: "Boy" },
        { value: "girl", label: "Girl" },
      ],
    },
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (lbs & oz)" },
        { value: "metric", label: "Metric (kg)" },
      ],
    },
    {
      kind: "number",
      key: "ageMonths",
      label: "Infant age",
      suffix: "months",
      default: 6,
      min: 0,
      max: 24,
      integer: true,
      hint: "Completed months since birth (0 to 24 months).",
    },
    { kind: "number", key: "weightLbs", label: "Weight (pounds)", suffix: "lbs", default: 17, min: 3, max: 45, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightOz", label: "Weight (ounces)", suffix: "oz", default: 8, min: 0, max: 15, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Weight", suffix: "kg", default: 7.9, min: 1.5, max: 22, showIf: (v) => v.unit === "metric" },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "girl" ? "girl" : "boy";
    const age = Math.min(24, Math.max(0, Number(v.ageMonths || 6)));

    const rawKg = isMetric
      ? Number(v.weightKg || 7.9)
      : (Number(v.weightLbs || 17) + Number(v.weightOz || 8) / 16) / 2.20462;

    const table = WHO_BENCHMARKS[sex];
    // Closest index
    const idx = Math.min(table.length - 1, Math.max(0, age <= 12 ? age : 12 + Math.round((age - 12) / 2)));
    const ref = table[idx];

    // Estimated standard deviation: (P97 - P3) / 3.76
    const sd = (ref.p97 - ref.p3) / 3.76;
    const z = (rawKg - ref.m) / Math.max(0.1, sd);

    // Cumulative normal distribution approximation
    const normalCdf = (val: number) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(val));
      const d = 0.3989423 * Math.exp((-val * val) / 2);
      const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return val > 0 ? 1 - prob : prob;
    };

    const percentile = Math.min(99.9, Math.max(0.1, normalCdf(z) * 100));

    let category = "Optimal Healthy Growth (15th–85th Percentile)";
    let badgeTone: "good" | "warn" | "neutral" = "good";

    if (percentile < 3) {
      category = "Below 3rd Percentile (Growth Faltering / FTT Risk)";
      badgeTone = "warn";
    } else if (percentile < 15) {
      category = "Lower Normal Boundary (3rd–15th Percentile)";
      badgeTone = "neutral";
    } else if (percentile <= 85) {
      category = "Optimal Healthy Growth (15th–85th Percentile)";
      badgeTone = "good";
    } else if (percentile <= 97) {
      category = "Upper Normal Boundary (85th–97th Percentile)";
      badgeTone = "neutral";
    } else {
      category = "Above 97th Percentile (High Weight-for-Age)";
      badgeTone = "warn";
    }

    const fmtDisplay = (kg: number) => {
      if (isMetric) return `${kg.toFixed(2)} kg`;
      const totLbs = kg * 2.20462;
      const l = Math.floor(totLbs);
      const o = Math.round((totLbs - l) * 16);
      return `${l} lbs ${o} oz (${kg.toFixed(2)} kg)`;
    };

    return {
      hero: {
        label: "WHO Weight-for-Age Percentile",
        value: `${percentile.toFixed(1)}%`,
        unit: "",
        sub: `Classification: ${category.split("(")[0].trim()} | WHO 50th Median for ${age}-Mo ${sex === "boy" ? "Boy" : "Girl"}: ${fmtDisplay(ref.m)}`,
      },
      badge: { text: `${percentile.toFixed(1)}th Percentile (${sex === "boy" ? "Boy" : "Girl"}, ${age}m)`, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Current Weight", value: Math.round(rawKg * 10) / 10, color: "#10b981" },
          { name: "WHO 50th Median Reference", value: Math.round(ref.m * 10) / 10, color: "#0ea5e9" },
        ],
      },
      rows: [
        { label: "Weight-for-Age Percentile", value: `${percentile.toFixed(1)}th Percentile`, strong: true },
        { label: "WHO Clinical Growth Tier", value: category, strong: true },
        { label: "Current Measured Infant Weight", value: fmtDisplay(rawKg), strong: true },
        { label: `WHO 50th Percentile Target (${age}m ${sex})`, value: fmtDisplay(ref.m) },
        { label: "Normal Range (3rd to 97th Percentile)", value: `${fmtDisplay(ref.p3)} – ${fmtDisplay(ref.p97)}` },
        { label: "Standard Deviation Score (Z-Score)", value: `${z > 0 ? "+" : ""}${z.toFixed(2)} SD` },
        { label: "Standard Growth Standards Used", value: "WHO Child Growth Standards (Multicentre Study, MGRS)" },
      ],
      note: {
        text: (
          <span>
            👶 <strong>Trajectory Over Snapshot:</strong> In pediatric medicine, a single percentile snapshot is far less important than growth consistency over time. As long as an infant tracks smoothly along their established percentile curve without crossing two major centile lines downward, growth is typically healthy.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function BabyWeightCalculator() {
  return <CalcEngine config={config} />;
}
