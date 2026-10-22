"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, pct } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "probability-calc",
  title: "Probability Calculator (Single & Multi-Event)",
  presets: [
    { label: "Roll a 6 on Die (1 in 6)", values: { favorable: 1, total: 6, trials: 3 } },
    { label: "Coin Toss Heads (1 in 2)", values: { favorable: 1, total: 2, trials: 5 } },
    { label: "Draw an Ace (4 in 52)", values: { favorable: 4, total: 52, trials: 1 } },
    { label: "Roulette Red (18 in 38)", values: { favorable: 18, total: 38, trials: 4 } },
  ],
  fields: [
    { kind: "number", key: "favorable", label: "Favorable Outcomes (A)", default: 1, min: 0 },
    { kind: "number", key: "total", label: "Total Possible Outcomes (S)", default: 6, min: 1 },
    { kind: "number", key: "trials", label: "Independent Trials (n)", default: 3, integer: true, min: 1, max: 50 },
  ],
  compute(values) {
    const a = Number(values.favorable);
    const s = Number(values.total);
    const n = Number(values.trials || 1);

    if (a > s) return { error: "Favorable outcomes cannot exceed total possible outcomes." };
    if (s <= 0) return { error: "Total outcomes must be strictly positive." };

    const p = a / s;
    const pNot = 1 - p;
    const pAll = Math.pow(p, n);
    const pAtLeastOnce = 1 - Math.pow(pNot, n);

    const oddsFor = `${a} : ${s - a}`;
    const oddsAgainst = `${s - a} : ${a}`;

    return {
      hero: {
        label: "Single Event Probability P(A)",
        value: pct(p * 100, 2),
        unit: "chance",
      },
      badge: {
        text: `Odds: ${oddsFor}`,
        tone: "good",
      },
      rows: [
        { label: "Probability P(A)", value: fixed(p, 4), strong: true },
        { label: "Complement P(not A)", value: fixed(pNot, 4) },
        { label: "Odds in Favor", value: oddsFor },
        { label: "Odds Against", value: oddsAgainst },
        { label: `At Least Once in ${n} Trials`, value: pct(pAtLeastOnce * 100, 2), strong: true },
        { label: `All ${n} Times in a Row`, value: pct(pAll * 100, 3) },
      ],
      chart: {
        type: "donut",
        title: "Single Outcome Distribution",
        data: [
          { name: "Favorable (P)", value: p * 100 },
          { name: "Unfavorable (1 - P)", value: pNot * 100 },
        ],
      },
      note: {
        text: `Probability is ${fixed(p, 4)} (${(p * 100).toFixed(1)}%). Across ${n} independent trials, the chance of occurring at least once is ${(pAtLeastOnce * 100).toFixed(1)}%.`,
        tone: "neutral",
      },
    };
  },
};

export default function ProbabilityCalculator() {
  return <CalcEngine config={config} />;
}
