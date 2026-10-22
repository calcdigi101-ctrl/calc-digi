"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "triangle-calc",
  title: "Triangle Calculator (Sides, Angles & Area)",
  presets: [
    { label: "Scalene 5, 6, 7", values: { a: 5, b: 6, c: 7 } },
    { label: "Right Triangle 3, 4, 5", values: { a: 3, b: 4, c: 5 } },
    { label: "Equilateral 6, 6, 6", values: { a: 6, b: 6, c: 6 } },
    { label: "Isosceles 8, 8, 5", values: { a: 8, b: 8, c: 5 } },
  ],
  fields: [
    { kind: "number", key: "a", label: "Side a", default: 5, min: 0.0001 },
    { kind: "number", key: "b", label: "Side b", default: 6, min: 0.0001 },
    { kind: "number", key: "c", label: "Side c", default: 7, min: 0.0001 },
  ],
  compute(values) {
    const a = Number(values.a);
    const b = Number(values.b);
    const c = Number(values.c);

    // Triangle inequality theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
      return { error: "Invalid triangle: the sum of any two sides must be strictly greater than the third side." };
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = a + b + c;

    // Law of cosines for angles (in degrees)
    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const cosB = (a * a + c * c - b * b) / (2 * a * c);
    const cosC = (a * a + b * b - c * c) / (2 * a * b);

    const degA = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
    const degB = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
    const degC = 180 - degA - degB;

    let sideType = "Scalene";
    if (Math.abs(a - b) < 1e-4 && Math.abs(b - c) < 1e-4) sideType = "Equilateral";
    else if (Math.abs(a - b) < 1e-4 || Math.abs(b - c) < 1e-4 || Math.abs(a - c) < 1e-4) sideType = "Isosceles";

    const maxAngle = Math.max(degA, degB, degC);
    let angleType = "Acute";
    if (Math.abs(maxAngle - 90) < 0.01) angleType = "Right";
    else if (maxAngle > 90) angleType = "Obtuse";

    const inradius = area / s;
    const circumradius = (a * b * c) / (4 * area);

    return {
      hero: {
        label: "Triangle Area (Heron's Formula)",
        value: fixed(area, 3),
        unit: "sq units",
      },
      badge: {
        text: `${sideType} · ${angleType}`,
        tone: "good",
      },
      rows: [
        { label: "Perimeter", value: fixed(perimeter, 3), strong: true },
        { label: "Angle A (opposite a)", value: `${fixed(degA, 2)}°` },
        { label: "Angle B (opposite b)", value: `${fixed(degB, 2)}°` },
        { label: "Angle C (opposite c)", value: `${fixed(degC, 2)}°` },
        { label: "Semiperimeter (s)", value: fixed(s, 3) },
        { label: "Inradius (r)", value: fixed(inradius, 3) },
        { label: "Circumradius (R)", value: fixed(circumradius, 3) },
      ],
      chart: {
        type: "donut",
        title: "Interior Angles Distribution (180° Total)",
        data: [
          { name: `Angle α (${fixed(degA, 1)}°)`, value: Math.max(0.1, degA), color: "#10b981" },
          { name: `Angle β (${fixed(degB, 1)}°)`, value: Math.max(0.1, degB), color: "#06b6d4" },
          { name: `Angle γ (${fixed(degC, 1)}°)`, value: Math.max(0.1, degC), color: "#8b5cf6" },
        ],
      },
      note: {
        text: `Sum of angles: ${fixed(degA + degB + degC, 1)}°. Semiperimeter s = ${fixed(s, 2)}.`,
        tone: "neutral",
      },
    };
  },
};

export default function TriangleCalculator() {
  return <CalcEngine config={config} />;
}
