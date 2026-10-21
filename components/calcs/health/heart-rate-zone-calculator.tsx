"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "hr-zones",
  title: "Heart Rate Zone Calculator",
  fields: [
    { kind: "number", key: "age", label: "Your age", suffix: "yrs", default: 35, min: 15, max: 95, integer: true },
    { kind: "number", key: "rhr", label: "Resting Heart Rate (RHR)", suffix: "bpm", default: 62, min: 35, max: 120, integer: true, hint: "Measure upon waking before getting out of bed." },
    {
      kind: "choice",
      key: "formula",
      label: "HRmax calculation formula",
      default: "tanaka",
      options: [
        { value: "tanaka", label: "Tanaka Equation: 208 - (0.7 × Age) [Recommended]" },
        { value: "fox", label: "Traditional Fox Formula: 220 - Age" },
        { value: "gelish", label: "Gellish Clinical Formula: 207 - (0.7 × Age)" },
      ],
    },
    {
      kind: "choice",
      key: "method",
      label: "Zone calculation method",
      default: "karvonen",
      segmented: true,
      options: [
        { value: "karvonen", label: "Karvonen (HR Reserve + RHR)" },
        { value: "standard", label: "Standard (% of Max HR)" },
      ],
    },
  ],
  compute: (v) => {
    const age = Number(v.age || 35);
    const rhr = Number(v.rhr || 62);

    if (age <= 0 || rhr <= 0) {
      return { error: "Please enter valid age and resting heart rate." };
    }

    // HRmax formulas
    let hrMax = 220 - age;
    if (v.formula === "tanaka") {
      hrMax = Math.round(208 - (0.7 * age));
    } else if (v.formula === "gelish") {
      hrMax = Math.round(207 - (0.7 * age));
    }

    const hrr = Math.max(0, hrMax - rhr);
    const isKarvonen = v.method === "karvonen";

    // 5 Training Zones
    const calcBpm = (pct: number) => {
      if (isKarvonen) {
        return Math.round((hrr * pct) + rhr);
      }
      return Math.round(hrMax * pct);
    };

    const z1Min = calcBpm(0.50);
    const z1Max = calcBpm(0.60);

    const z2Min = calcBpm(0.60);
    const z2Max = calcBpm(0.70);

    const z3Min = calcBpm(0.70);
    const z3Max = calcBpm(0.80);

    const z4Min = calcBpm(0.80);
    const z4Max = calcBpm(0.90);

    const z5Min = calcBpm(0.90);
    const z5Max = hrMax;

    return {
      hero: {
        label: "Estimated Maximum Heart Rate (HRmax)",
        value: `${hrMax}`,
        unit: "beats / min",
        sub: `Cardiovascular ceiling with resting baseline of ${rhr} bpm (Heart Rate Reserve: ${hrr} bpm).`,
      },
      badge: {
        text: `Zone 2 Aerobic Base: ${z2Min} – ${z2Max} bpm (Optimal Fat Oxidation)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: `Zone 1 Recovery (${z1Min}-${z1Max} bpm)`, value: 10, color: "#94a3b8" },
          { name: `Zone 2 Aerobic Fat Burn (${z2Min}-${z2Max} bpm)`, value: 35, color: "#10b981" },
          { name: `Zone 3 Tempo Aerobic (${z3Min}-${z3Max} bpm)`, value: 25, color: "#3b82f6" },
          { name: `Zone 4 Lactate Threshold (${z4Min}-${z4Max} bpm)`, value: 20, color: "#f59e0b" },
          { name: `Zone 5 VO2 Max Anaerobic (${z5Min}-${z5Max} bpm)`, value: 10, color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Zone 1: Active Recovery (50% – 60%)", value: `${z1Min} – ${z1Max} bpm (Warm-up, recovery days)` },
        { label: "Zone 2: Aerobic Base (60% – 70%)", value: `${z2Min} – ${z2Max} bpm (Mitochondrial density & fat burn)`, strong: true },
        { label: "Zone 3: Tempo Aerobic (70% – 80%)", value: `${z3Min} – ${z3Max} bpm (Cardiovascular endurance)` },
        { label: "Zone 4: Lactate Threshold (80% – 90%)", value: `${z4Min} – ${z4Max} bpm (Anaerobic stamina, muscle burn)`, strong: true },
        { label: "Zone 5: VO2 Max Peak (90% – 100%)", value: `${z5Min} – ${z5Max} bpm (Maximum sprint / HIIT intervals)` },
        { label: "Resting Heart Rate (RHR)", value: `${rhr} bpm` },
        { label: "Heart Rate Reserve (HRR)", value: `${hrr} bpm (Dynamic aerobic span)` },
        { label: "Selected Formula", value: v.formula === "tanaka" ? "Tanaka (208 - 0.7×Age)" : v.formula === "gelish" ? "Gellish (207 - 0.7×Age)" : "Fox (220 - Age)" },
      ],
      note: {
        text: (
          <span>
            ❤️ <strong>Zone 2 Endurance Training:</strong> Clinical research by sports cardiologists highlights Zone 2 (60%–70% HRR) as the sweet spot for mitochondrial biogenesis, metabolic flexibility, and lactate clearance. In Zone 2, you should be able to hold a conversation without gasping for air.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function HeartRateZoneCalculator() {
  return <CalcEngine config={config} />;
}
