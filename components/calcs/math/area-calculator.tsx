"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "area-calc",
  title: "Area Calculator (2D Geometric Shapes)",
  fields: [
    {
      kind: "choice",
      key: "shape",
      label: "Select 2D Shape",
      default: "rectangle",
      options: [
        { value: "rectangle", label: "Rectangle (Length × Width)" },
        { value: "circle", label: "Circle (πr²)" },
        { value: "triangle", label: "Triangle (½ × Base × Height)" },
        { value: "trapezoid", label: "Trapezoid (½(a + b) × h)" },
        { value: "ellipse", label: "Ellipse (π × a × b)" },
      ],
    },
    { kind: "number", key: "length", label: "Length (l)", default: 10, min: 0.001, showIf: (v) => v.shape === "rectangle" },
    { kind: "number", key: "width", label: "Width (w)", default: 5, min: 0.001, showIf: (v) => v.shape === "rectangle" },
    { kind: "number", key: "radius", label: "Radius (r)", default: 7, min: 0.001, showIf: (v) => v.shape === "circle" },
    { kind: "number", key: "base", label: "Base (b)", default: 8, min: 0.001, showIf: (v) => v.shape === "triangle" },
    { kind: "number", key: "height", label: "Height (h)", default: 6, min: 0.001, showIf: (v) => v.shape === "triangle" || v.shape === "trapezoid" },
    { kind: "number", key: "base1", label: "Base 1 (a)", default: 8, min: 0.001, showIf: (v) => v.shape === "trapezoid" },
    { kind: "number", key: "base2", label: "Base 2 (b)", default: 12, min: 0.001, showIf: (v) => v.shape === "trapezoid" },
    { kind: "number", key: "semiMajor", label: "Semi-Major Axis (a)", default: 6, min: 0.001, showIf: (v) => v.shape === "ellipse" },
    { kind: "number", key: "semiMinor", label: "Semi-Minor Axis (b)", default: 4, min: 0.001, showIf: (v) => v.shape === "ellipse" },
  ],
  compute(values) {
    const shape = String(values.shape || "rectangle");
    let area = 0;
    let perimeter = 0;
    let formula = "";

    if (shape === "rectangle") {
      const l = Number(values.length);
      const w = Number(values.width);
      area = l * w;
      perimeter = 2 * (l + w);
      formula = "l × w";
    } else if (shape === "circle") {
      const r = Number(values.radius);
      area = Math.PI * r * r;
      perimeter = 2 * Math.PI * r;
      formula = "π × r²";
    } else if (shape === "triangle") {
      const b = Number(values.base);
      const h = Number(values.height);
      area = 0.5 * b * h;
      formula = "½ × b × h";
    } else if (shape === "trapezoid") {
      const a = Number(values.base1);
      const b = Number(values.base2);
      const h = Number(values.height);
      area = 0.5 * (a + b) * h;
      formula = "½(a + b) × h";
    } else if (shape === "ellipse") {
      const a = Number(values.semiMajor);
      const b = Number(values.semiMinor);
      area = Math.PI * a * b;
      // Ramanujan approx perimeter
      perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      formula = "π × a × b";
    }

    return {
      hero: {
        label: "Total Surface Area",
        value: fixed(area, 3),
        unit: "sq units",
      },
      badge: {
        text: `Formula: ${formula}`,
        tone: "good",
      },
      rows: [
        { label: "Computed Area", value: fixed(area, 4), strong: true },
        ...(perimeter > 0 ? [{ label: "Perimeter / Circumference", value: fixed(perimeter, 3) }] : []),
        { label: "Shape Selected", value: shape.toUpperCase() },
      ],
      note: {
        text: `Area calculated in square units according to standard Euclidean geometry rules.`,
        tone: "neutral",
      },
    };
  },
};

export default function AreaCalculator() {
  return <CalcEngine config={config} />;
}
