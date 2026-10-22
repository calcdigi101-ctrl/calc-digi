"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "surface-area-calc",
  title: "Surface Area Calculator (3D Geometric Solids)",
  presets: [
    { label: "Box 6 \u00d7 4 \u00d7 5", values: { shape: "box", length: 6, width: 4, height: 5 } },
    { label: "Cube Side 5", values: { shape: "cube", side: 5 } },
    { label: "Cylinder r=3, h=7", values: { shape: "cylinder", radius: 3, height: 7 } },
    { label: "Sphere Radius 4", values: { shape: "sphere", radius: 4 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "shape",
      label: "3D Geometric Solid",
      default: "box",
      options: [
        { value: "box", label: "Rectangular Prism (Box)" },
        { value: "cube", label: "Cube" },
        { value: "cylinder", label: "Cylinder" },
        { value: "sphere", label: "Sphere" },
        { value: "cone", label: "Cone" },
      ],
    },
    { kind: "number", key: "length", label: "Length (l)", default: 6, min: 0.001, showIf: (v) => v.shape === "box" },
    { kind: "number", key: "width", label: "Width (w)", default: 4, min: 0.001, showIf: (v) => v.shape === "box" },
    { kind: "number", key: "height", label: "Height (h)", default: 5, min: 0.001, showIf: (v) => v.shape === "box" || v.shape === "cylinder" || v.shape === "cone" },
    { kind: "number", key: "side", label: "Side Length (s)", default: 5, min: 0.001, showIf: (v) => v.shape === "cube" },
    { kind: "number", key: "radius", label: "Radius (r)", default: 3, min: 0.001, showIf: (v) => v.shape === "cylinder" || v.shape === "sphere" || v.shape === "cone" },
  ],
  compute(values) {
    const shape = String(values.shape || "box");
    let totalArea = 0;
    let lateralArea = 0;
    let volume = 0;

    if (shape === "box") {
      const l = Number(values.length);
      const w = Number(values.width);
      const h = Number(values.height);
      totalArea = 2 * (l * w + l * h + w * h);
      lateralArea = 2 * h * (l + w);
      volume = l * w * h;
    } else if (shape === "cube") {
      const s = Number(values.side);
      totalArea = 6 * s * s;
      lateralArea = 4 * s * s;
      volume = s * s * s;
    } else if (shape === "cylinder") {
      const r = Number(values.radius);
      const h = Number(values.height);
      const baseArea = 2 * Math.PI * r * r;
      lateralArea = 2 * Math.PI * r * h;
      totalArea = baseArea + lateralArea;
      volume = Math.PI * r * r * h;
    } else if (shape === "sphere") {
      const r = Number(values.radius);
      totalArea = 4 * Math.PI * r * r;
      volume = (4 / 3) * Math.PI * r * r * r;
    } else if (shape === "cone") {
      const r = Number(values.radius);
      const h = Number(values.height);
      const slant = Math.sqrt(r * r + h * h);
      lateralArea = Math.PI * r * slant;
      totalArea = Math.PI * r * (r + slant);
      volume = (1 / 3) * Math.PI * r * r * h;
    }

    return {
      hero: {
        label: "Total Surface Area",
        value: fixed(totalArea, 3),
        unit: "sq units",
      },
      badge: {
        text: shape.toUpperCase(),
        tone: "good",
      },
      rows: [
        { label: "Total Surface Area", value: fixed(totalArea, 3), strong: true },
        ...(lateralArea > 0 ? [{ label: "Lateral Surface Area", value: fixed(lateralArea, 3) }] : []),
        { label: "Internal Volume", value: fixed(volume, 3) },
      ],
      chart: {
        type: "donut",
        title: "Surface Area Facet Distribution",
        data:
          lateralArea > 0 && totalArea - lateralArea > 0
            ? [
                { name: `Lateral Area (${fixed(lateralArea, 2)})`, value: Math.max(0.01, lateralArea), color: "#10b981" },
                { name: `Base Area (${fixed(totalArea - lateralArea, 2)})`, value: Math.max(0.01, totalArea - lateralArea), color: "#06b6d4" },
              ]
            : [{ name: `Total Surface Area (${fixed(totalArea, 2)})`, value: Math.max(0.01, totalArea), color: "#10b981" }],
      },
      note: {
        text: "Surface area encompasses the sum of all exposed external boundary faces.",
        tone: "neutral",
      },
    };
  },
};

export default function SurfaceAreaCalculator() {
  return <CalcEngine config={config} />;
}
