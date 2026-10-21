"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "vo2-max",
  title: "VO2 Max Calculator",
  fields: [
    {
      kind: "choice",
      key: "method",
      label: "Assessment protocol",
      default: "rockport",
      options: [
        { value: "rockport", label: "Rockport 1-Mile Walk Test (Low Impact)" },
        { value: "cooper", label: "Cooper 12-Minute Run Test (Runners)" },
        { value: "uth", label: "Resting Heart Rate Ratio (Uth Formula)" },
        { value: "run15", label: "George 1.5-Mile Run/Walk (Military)" },
      ],
    },
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
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 32, min: 15, max: 90, integer: true },
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (lbs)" },
        { value: "metric", label: "Metric (kg)" },
      ],
    },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 165, min: 60, max: 450, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 75, min: 30, max: 200, showIf: (v) => v.unit === "metric" },

    // Rockport inputs
    { kind: "number", key: "walkMin", label: "1-Mile walk time (minutes)", suffix: "min", default: 14, min: 7, max: 35, integer: true, showIf: (v) => v.method === "rockport" },
    { kind: "number", key: "walkSec", label: "Seconds", suffix: "sec", default: 30, min: 0, max: 59, integer: true, showIf: (v) => v.method === "rockport" },
    { kind: "number", key: "finishHr", label: "Heart rate at 1-mile finish", suffix: "bpm", default: 132, min: 60, max: 220, integer: true, showIf: (v) => v.method === "rockport" },

    // Cooper inputs
    { kind: "number", key: "distanceMeters", label: "Distance covered in 12 minutes", suffix: "meters", default: 2400, min: 600, max: 5000, integer: true, showIf: (v) => v.method === "cooper" },

    // Uth inputs
    { kind: "number", key: "restingHr", label: "Morning resting heart rate", suffix: "bpm", default: 62, min: 35, max: 110, integer: true, showIf: (v) => v.method === "uth" },

    // 1.5-mile inputs
    { kind: "number", key: "runMin", label: "1.5-Mile run time (minutes)", suffix: "min", default: 11, min: 6, max: 35, integer: true, showIf: (v) => v.method === "run15" },
    { kind: "number", key: "runSec", label: "Seconds", suffix: "sec", default: 45, min: 0, max: 59, integer: true, showIf: (v) => v.method === "run15" },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const age = Number(v.age || 32);
    const wKg = isMetric ? Number(v.weightKg || 75) : Number(v.weightLbs || 165) / 2.20462;
    const wLbs = isMetric ? wKg * 2.20462 : Number(v.weightLbs || 165);

    let vo2 = 0;

    if (v.method === "rockport") {
      const walkTime = Number(v.walkMin || 14) + Number(v.walkSec || 30) / 60;
      const hr = Number(v.finishHr || 132);
      const sexTerm = sex === "male" ? 6.315 : 0;
      vo2 = 132.853 - 0.0769 * wLbs - 0.3877 * age + sexTerm - 3.2649 * walkTime - 0.1565 * hr;
    } else if (v.method === "cooper") {
      const d = Number(v.distanceMeters || 2400);
      vo2 = (d - 504.9) / 44.73;
    } else if (v.method === "uth") {
      const rHr = Number(v.restingHr || 62);
      const maxHr = 208 - 0.7 * age;
      vo2 = 15.3 * (maxHr / Math.max(35, rHr));
    } else {
      const runTime = Number(v.runMin || 11) + Number(v.runSec || 45) / 60;
      const sexTerm = sex === "male" ? 3.716 : 0;
      vo2 = 88.02 - 0.1656 * wKg - 2.76 * runTime + sexTerm;
    }

    const roundedVo2 = Math.max(12, Math.min(88, Math.round(vo2 * 10) / 10));

    // Category determination based on ACSM norms:
    const baseOffset = sex === "male" ? 0 : -6;
    const ageDegradation = Math.max(0, (age - 25) * 0.35);

    let category = "Good";
    let catColor = "#10b981";
    let percentile = 70;

    if (roundedVo2 < 31 + baseOffset - ageDegradation) {
      category = "Very Poor (<20th percentile)";
      catColor = "#ef4444";
      percentile = 15;
    } else if (roundedVo2 < 36 + baseOffset - ageDegradation) {
      category = "Poor (20th–40th percentile)";
      catColor = "#f97316";
      percentile = 30;
    } else if (roundedVo2 < 42 + baseOffset - ageDegradation) {
      category = "Fair (40th–60th percentile)";
      catColor = "#f59e0b";
      percentile = 50;
    } else if (roundedVo2 < 48 + baseOffset - ageDegradation) {
      category = "Good (60th–80th percentile)";
      catColor = "#10b981";
      percentile = 70;
    } else if (roundedVo2 < 54 + baseOffset - ageDegradation) {
      category = "Excellent (80th–95th percentile)";
      catColor = "#06b6d4";
      percentile = 88;
    } else {
      category = "Superior / Elite (>95th percentile)";
      catColor = "#8b5cf6";
      percentile = 97;
    }

    const peakVo2 = sex === "male" ? 47 : 41;
    const estimatedFitnessAge = Math.max(18, Math.min(85, Math.round(25 + (peakVo2 - roundedVo2) / 0.4)));
    const est5kMin = Math.max(14, Math.min(65, Math.round((1150 / roundedVo2) * 1.05)));

    return {
      hero: {
        label: "Estimated VO2 Max (Aerobic Capacity)",
        value: `${roundedVo2}`,
        unit: "mL/kg/min",
        sub: `ACSM Tier: ${category}`,
      },
      badge: { text: `ACSM Tier: ${category}`, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Aerobic Capacity Percentile", value: percentile, color: catColor },
          { name: "Unrealized Aerobic Ceiling", value: 100 - percentile, color: "#94a3b8" },
        ],
      },
      rows: [
        { label: "Maximal Oxygen Uptake", value: `${roundedVo2} mL/kg/min`, strong: true },
        { label: "ACSM Clinical Classification", value: category, strong: true },
        { label: "Biological Aerobic Fitness Age", value: `${estimatedFitnessAge} years`, strong: true },
        { label: "Projected 5K Finish Potential", value: `~${est5kMin}:00 minutes` },
        { label: "Equivalent Metabolic Multiplier", value: `${(roundedVo2 / 3.5).toFixed(1)} METs` },
      ],
      note: {
        text: (
          <span>
            🫁 <strong>Cardiorespiratory Longevity:</strong> According to landmark JAMA Cardiology research, every 1 MET increase in VO2 max (~3.5 mL/kg/min) is associated with an 11% to 17% reduction in all-cause cardiovascular mortality.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function Vo2MaxCalculator() {
  return <CalcEngine config={config} />;
}
