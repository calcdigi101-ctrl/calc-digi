"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "one-rep-max",
  title: "One Rep Max (1RM) Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "lbs",
      segmented: true,
      options: [
        { value: "lbs", label: "Pounds (lbs)" },
        { value: "kg", label: "Kilograms (kg)" },
      ],
    },
    {
      kind: "choice",
      key: "exercise",
      label: "Target exercise",
      default: "bench",
      options: [
        { value: "bench", label: "Barbell Bench Press" },
        { value: "squat", label: "Barbell Back Squat" },
        { value: "deadlift", label: "Conventional Deadlift" },
        { value: "overhead", label: "Overhead / Military Press" },
        { value: "other", label: "Other Multi-Joint Exercise" },
      ],
    },
    {
      kind: "number",
      key: "weight",
      label: "Weight lifted",
      suffix: "lbs",
      default: 185,
      min: 10,
      max: 1500,
    },
    {
      kind: "number",
      key: "reps",
      label: "Repetitions completed to failure",
      suffix: "reps",
      default: 5,
      min: 1,
      max: 30,
      integer: true,
      hint: "Formula accuracy is highest between 2 and 10 repetitions.",
    },
  ],
  compute: (v) => {
    const unit = v.unit === "kg" ? "kg" : "lbs";
    const w = Number(v.weight || 185);
    const r = Math.min(Math.max(Number(v.reps || 5), 1), 30);

    if (w <= 0) {
      return {
        hero: { label: "Estimated 1RM", value: "0", unit },
        rows: [],
      };
    }

    if (r === 1) {
      const avg = Math.round(w);
      return {
        hero: {
          label: "Single-Rep Maximum (Tested 1RM)",
          value: `${avg}`,
          unit,
          sub: "Actual empirical 1-rep load performed without estimation error",
        },
        badge: { text: "Tested 1RM", tone: "good" },
        chart: {
          type: "donut",
          format: "num",
          data: [
            { name: "Max Strength (85-100%)", value: Math.round(avg * 0.92), color: "#ef4444" },
            { name: "Explosive Power (75-90%)", value: Math.round(avg * 0.82), color: "#f59e0b" },
            { name: "Optimal Hypertrophy (70-85%)", value: Math.round(avg * 0.77), color: "#10b981" },
            { name: "Endurance (50-65%)", value: Math.round(avg * 0.57), color: "#3b82f6" },
          ],
        },
        rows: [
          { label: "1 Rep (100% 1RM)", value: `${avg} ${unit}`, strong: true },
          { label: "2 Reps (95% 1RM)", value: `${Math.round(avg * 0.95)} ${unit}` },
          { label: "3 Reps (93% 1RM)", value: `${Math.round(avg * 0.93)} ${unit}` },
          { label: "5 Reps (87% 1RM)", value: `${Math.round(avg * 0.87)} ${unit}`, strong: true },
          { label: "8 Reps (80% 1RM)", value: `${Math.round(avg * 0.80)} ${unit}` },
          { label: "10 Reps (75% 1RM)", value: `${Math.round(avg * 0.75)} ${unit}`, strong: true },
          { label: "12 Reps (70% 1RM)", value: `${Math.round(avg * 0.70)} ${unit}` },
          { label: "15 Reps (65% 1RM)", value: `${Math.round(avg * 0.65)} ${unit}` },
        ],
      };
    }

    // Formulas:
    const epley = w * (1 + r / 30);
    const brzycki = w * (36 / (37 - r));
    const lander = (100 * w) / (101.3 - 2.67123 * r);
    const lombardi = w * Math.pow(r, 0.10);
    const mayhew = (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));

    // Consensus average of the 3 most validated formulas:
    const avg = Math.round((epley + brzycki + lander) / 3);

    return {
      hero: {
        label: "Estimated 1-Repetition Maximum (1RM)",
        value: `${avg}`,
        unit,
        sub: `NSCA composite standard of Epley (${Math.round(epley)}), Brzycki (${Math.round(brzycki)}), and Lander (${Math.round(lander)})`,
      },
      badge: { text: "NSCA Tri-Formula Average", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Max Strength (85-100%)", value: Math.round(avg * 0.92), color: "#ef4444" },
          { name: "Explosive Power (75-90%)", value: Math.round(avg * 0.82), color: "#f59e0b" },
          { name: "Optimal Hypertrophy (70-85%)", value: Math.round(avg * 0.77), color: "#10b981" },
          { name: "Endurance (50-65%)", value: Math.round(avg * 0.57), color: "#3b82f6" },
        ],
      },
      rows: [
        { label: "Recommended Composite 1RM", value: `${avg} ${unit}`, strong: true },
        { label: "Epley Formula (1985)", value: `${Math.round(epley)} ${unit}` },
        { label: "Brzycki Formula (1993)", value: `${Math.round(brzycki)} ${unit}` },
        { label: "Lander Formula (1985)", value: `${Math.round(lander)} ${unit}` },
        { label: "Lombardi Exponential", value: `${Math.round(lombardi)} ${unit}` },
        { label: "Mayhew et al. Formula", value: `${Math.round(mayhew)} ${unit}` },
        { label: "3 Rep Max Load (93%)", value: `${Math.round(avg * 0.93)} ${unit}` },
        { label: "5 Rep Max Load (87%)", value: `${Math.round(avg * 0.87)} ${unit}`, strong: true },
        { label: "8 Rep Max Load (80% - Hypertrophy)", value: `${Math.round(avg * 0.80)} ${unit}`, strong: true },
        { label: "10 Rep Max Load (75%)", value: `${Math.round(avg * 0.75)} ${unit}` },
        { label: "12 Rep Max Load (70%)", value: `${Math.round(avg * 0.70)} ${unit}` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Training Prescription:</strong> For maximal muscle hypertrophy, program working sets of 6–10 reps using <strong>{Math.round(avg * 0.75)} – {Math.round(avg * 0.85)} {unit}</strong> (75%–85% of 1RM) with 1 to 2 repetitions in reserve (RIR 1–2).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function OneRepMaxCalculator() {
  return <CalcEngine config={config} />;
}
