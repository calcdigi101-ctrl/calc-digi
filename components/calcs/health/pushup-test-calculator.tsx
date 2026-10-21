"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "pushup-test",
  title: "Pushup Test Calculator",
  fields: [
    {
      kind: "choice",
      key: "sex",
      label: "Biological sex",
      default: "male",
      segmented: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 30, min: 15, max: 80, integer: true },
    {
      kind: "number",
      key: "reps",
      label: "Pushups completed to failure",
      suffix: "reps",
      default: 28,
      min: 0,
      max: 120,
      integer: true,
      hint: "Continuous repetitions without pausing for rest in the up or down position.",
    },
  ],
  compute: (v) => {
    const sex = v.sex === "female" ? "female" : "male";
    const age = Number(v.age || 30);
    const reps = Math.max(0, Number(v.reps || 0));

    // ACSM Push-Up Norms (Reps)
    // Age bands: 20-29, 30-39, 40-49, 50-59, 60+
    let band = "30-39";
    if (age < 30) band = "20-29";
    else if (age < 40) band = "30-39";
    else if (age < 50) band = "40-49";
    else if (age < 60) band = "50-59";
    else band = "60+";

    const norms: Record<string, Record<string, { exc: number; vg: number; g: number; f: number }>> = {
      male: {
        "20-29": { exc: 36, vg: 29, g: 22, f: 17 },
        "30-39": { exc: 30, vg: 22, g: 17, f: 12 },
        "40-49": { exc: 25, vg: 17, g: 13, f: 10 },
        "50-59": { exc: 21, vg: 13, g: 10, f: 7 },
        "60+": { exc: 18, vg: 11, g: 8, f: 5 },
      },
      female: {
        "20-29": { exc: 30, vg: 21, g: 15, f: 10 },
        "30-39": { exc: 27, vg: 20, g: 13, f: 8 },
        "40-49": { exc: 24, vg: 15, g: 11, f: 5 },
        "50-59": { exc: 21, vg: 11, g: 7, f: 4 },
        "60+": { exc: 17, vg: 12, g: 5, f: 2 },
      },
    };

    const thresholds = norms[sex][band];
    let rating = "Good";
    let color = "#10b981";
    let percentile = 65;

    if (reps >= thresholds.exc) {
      rating = "Excellent (Top 10%)";
      color = "#8b5cf6";
      percentile = 92;
    } else if (reps >= thresholds.vg) {
      rating = "Very Good";
      color = "#06b6d4";
      percentile = 78;
    } else if (reps >= thresholds.g) {
      rating = "Good (Average / Healthy)";
      color = "#10b981";
      percentile = 60;
    } else if (reps >= thresholds.f) {
      rating = "Fair";
      color = "#f59e0b";
      percentile = 38;
    } else {
      rating = "Needs Improvement (<20th percentile)";
      color = "#ef4444";
      percentile = 18;
    }

    const harvardRiskText =
      reps >= 40
        ? "✓ Harvard 40+ Tier: Associated with a 96% reduction in 10-year incident cardiovascular events."
        : reps >= 21
        ? "✓ Moderate Protection Tier: Substantially lower cardiometabolic disease risk."
        : reps < 10
        ? "⚠️ Elevated Risk Tier: Baseline endurance associated with higher 10-year CVD events (Harvard Cohort Study)."
        : "Standard functional endurance profile.";

    return {
      hero: {
        label: "ACSM Muscular Endurance Rating",
        value: rating.split(" ")[0],
        sub: `Completed ${reps} continuous standard pushups (${percentile}th percentile for ${sex}s aged ${band})`,
      },
      badge: { text: `ACSM Tier: ${rating.split(" ")[0]}`, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Endurance Capacity Percentile", value: percentile, color },
          { name: "Target Growth Potential", value: 100 - percentile, color: "#94a3b8" },
        ],
      },
      rows: [
        { label: "Pushup Repetitions", value: `${reps} reps`, strong: true },
        { label: "ACSM Clinical Classification", value: rating, strong: true },
        { label: "Cardiovascular Longevity Index", value: harvardRiskText },
        { label: "Age & Sex Norm Bracket", value: `${sex === "male" ? "Men" : "Women"} aged ${band}` },
        { label: "Target for Next Tier", value: reps < thresholds.exc ? `${thresholds.exc} reps (Excellent)` : "Superior Athlete Max" },
      ],
      note: {
        text: (
          <span>
            🔬 <strong>Harvard Medical Finding:</strong> A landmark 10-year longitudinal study published in <em>JAMA Network Open</em> (Yang et al., 2019) demonstrated that adult males able to complete <strong>&ge; 40 pushups</strong> had a <strong>96% reduction</strong> in cardiovascular disease events compared to those able to complete fewer than 10 pushups.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PushupTestCalculator() {
  return <CalcEngine config={config} />;
}
