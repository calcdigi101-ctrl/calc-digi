"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "slope-calc",
  title: "Slope Calculator (Rise over Run & Line Equation)",
  presets: [
    { label: "Points (2,3) to (6,11) [m=2]", values: { x1: 2, y1: 3, x2: 6, y2: 11 } },
    { label: "Horizontal Line (y=5)", values: { x1: 0, y1: 5, x2: 10, y2: 5 } },
    { label: "Negative Slope m = -1.5", values: { x1: 0, y1: 6, x2: 4, y2: 0 } },
    { label: "45-Degree Line m = 1", values: { x1: 1, y1: 1, x2: 5, y2: 5 } },
  ],
  fields: [
    { kind: "number", key: "x1", label: "Point 1: x₁", default: 2 },
    { kind: "number", key: "y1", label: "Point 1: y₁", default: 3 },
    { kind: "number", key: "x2", label: "Point 2: x₂", default: 6 },
    { kind: "number", key: "y2", label: "Point 2: y₂", default: 11 },
  ],
  compute(values) {
    const x1 = Number(values.x1);
    const y1 = Number(values.y1);
    const x2 = Number(values.x2);
    const y2 = Number(values.y2);

    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0 && dy === 0) {
      return { error: "Both coordinates are identical; at least two distinct points are needed to define a line." };
    }

    if (dx === 0) {
      return {
        hero: { label: "Slope (m)", value: "Undefined (Vertical)" },
        badge: { text: "Vertical Line (90°)", tone: "warn" },
        rows: [
          { label: "Equation of Line", value: `x = ${x1}`, strong: true },
          { label: "Angle of Inclination", value: "90°" },
          { label: "Run (Δx)", value: "0" },
          { label: "Rise (Δy)", value: String(dy) },
        ],
      };
    }

    const m = dy / dx;
    const b = y1 - m * x1;
    const angleRad = Math.atan(m);
    const angleDeg = angleRad * (180 / Math.PI);
    const distance = Math.sqrt(dx * dx + dy * dy);

    let direction = "Positive (Rising / Uphill)";
    let tone: "good" | "info" | "neutral" = "good";
    if (m < 0) {
      direction = "Negative (Falling / Downhill)";
      tone = "info";
    } else if (m === 0) {
      direction = "Zero (Horizontal)";
      tone = "neutral";
    }

    const bSign = b >= 0 ? `+ ${fixed(b, 2)}` : `− ${fixed(Math.abs(b), 2)}`;
    const eq = m === 0 ? `y = ${fixed(b, 2)}` : `y = ${fixed(m, 2)}x ${bSign}`;

    return {
      hero: {
        label: "Line Slope (m = Δy / Δx)",
        value: fixed(m, 4),
        unit: "m",
      },
      badge: {
        text: direction,
        tone,
      },
      rows: [
        { label: "Equation (Slope-Intercept)", value: eq, strong: true },
        { label: "Angle of Inclination (θ)", value: `${fixed(angleDeg, 2)}°` },
        { label: "Y-Intercept (b)", value: fixed(b, 4) },
        { label: "Rise (Δy)", value: fixed(dy, 2) },
        { label: "Run (Δx)", value: fixed(dx, 2) },
        { label: "Segment Distance (d)", value: fixed(distance, 4) },
      ],
      note: {
        text: `Formula: m = (y₂ − y₁) / (x₂ − x₁) = ${dy} / ${dx} = ${fixed(m, 4)}.`,
        tone: "neutral",
      },
    };
  },
};

export default function SlopeCalculator() {
  return <CalcEngine config={config} />;
}
