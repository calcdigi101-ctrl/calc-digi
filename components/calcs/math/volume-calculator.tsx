"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "volume-calc",
  title: "Volume Calculator (3D Geometric Solids)",
  fields: [
    {
      kind: "choice",
      key: "shape",
      label: "Select 3D Solid",
      default: "box",
      options: [
        { value: "box", label: "Rectangular Prism (Box)" },
        { value: "cube", label: "Cube" },
        { value: "cylinder", label: "Cylinder" },
        { value: "sphere", label: "Sphere" },
        { value: "cone", label: "Cone" },
        { value: "pyramid", label: "Rectangular Pyramid" },
      ],
    },
    { kind: "number", key: "length", label: "Length (l)", default: 10, min: 0.001, showIf: (v) => v.shape === "box" || v.shape === "pyramid" },
    { kind: "number", key: "width", label: "Width (w)", default: 6, min: 0.001, showIf: (v) => v.shape === "box" || v.shape === "pyramid" },
    { kind: "number", key: "height", label: "Height (h)", default: 4, min: 0.001, showIf: (v) => v.shape === "box" || v.shape === "cylinder" || v.shape === "cone" || v.shape === "pyramid" },
    { kind: "number", key: "side", label: "Side Length (s)", default: 5, min: 0.001, showIf: (v) => v.shape === "cube" },
    { kind: "number", key: "radius", label: "Radius (r)", default: 4, min: 0.001, showIf: (v) => v.shape === "cylinder" || v.shape === "sphere" || v.shape === "cone" },
  ],
  compute(values) {
    const shape = String(values.shape || "box");
    let vol = 0;
    let surfaceArea = 0;

    if (shape === "box") {
      const l = Number(values.length);
      const w = Number(values.width);
      const h = Number(values.height);
      vol = l * w * h;
      surfaceArea = 2 * (l * w + l * h + w * h);
    } else if (shape === "cube") {
      const s = Number(values.side);
      vol = s * s * s;
      surfaceArea = 6 * s * s;
    } else if (shape === "cylinder") {
      const r = Number(values.radius);
      const h = Number(values.height);
      vol = Math.PI * r * r * h;
      surfaceArea = 2 * Math.PI * r * (r + h);
    } else if (shape === "sphere") {
      const r = Number(values.radius);
      vol = (4 / 3) * Math.PI * r * r * r;
      surfaceArea = 4 * Math.PI * r * r;
    } else if (shape === "cone") {
      const r = Number(values.radius);
      const h = Number(values.height);
      vol = (1 / 3) * Math.PI * r * r * h;
      const s = Math.sqrt(r * r + h * h);
      surfaceArea = Math.PI * r * (r + s);
    } else if (shape === "pyramid") {
      const l = Number(values.length);
      const w = Number(values.width);
      const h = Number(values.height);
      vol = (l * w * h) / 3;
    }

    return {
      hero: {
        label: "Internal Volume",
        value: fixed(vol, 3),
        unit: "cubic units",
      },
      badge: {
        text: shape.toUpperCase(),
        tone: "good",
      },
      rows: [
        { label: "Computed Volume", value: fixed(vol, 3), strong: true },
        ...(surfaceArea > 0 ? [{ label: "Surface Area", value: fixed(surfaceArea, 3) }] : []),
      ],
      note: {
        text: "Volume measures total 3-dimensional space contained within the boundary faces.",
        tone: "neutral",
      },
    };
  },
};

export default function VolumeCalculator() {
  return <CalcEngine config={config} />;
}
