"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "distance-formula-calc",
  title: "Distance Formula Calculator (2D & 3D Euclidean)",
  presets: [
    { label: "2D Points (1,2) to (4,6)", values: { dim: "2d", x1: 1, y1: 2, x2: 4, y2: 6 } },
    { label: "2D Origin to (5,12)", values: { dim: "2d", x1: 0, y1: 0, x2: 5, y2: 12 } },
    { label: "3D Points (1,2,0) to (4,6,5)", values: { dim: "3d", x1: 1, y1: 2, z1: 0, x2: 4, y2: 6, z2: 5 } },
    { label: "3D Diagonal (0,0,0) to (10,10,10)", values: { dim: "3d", x1: 0, y1: 0, z1: 0, x2: 10, y2: 10, z2: 10 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "dim",
      label: "Coordinate Dimensions",
      default: "2d",
      segmented: true,
      options: [
        { value: "2d", label: "2D Cartesian (x, y)" },
        { value: "3d", label: "3D Space (x, y, z)" },
      ],
    },
    { kind: "number", key: "x1", label: "Point 1: x₁", default: 1 },
    { kind: "number", key: "y1", label: "Point 1: y₁", default: 2 },
    { kind: "number", key: "z1", label: "Point 1: z₁", default: 0, showIf: (v) => v.dim === "3d" },
    { kind: "number", key: "x2", label: "Point 2: x₂", default: 4 },
    { kind: "number", key: "y2", label: "Point 2: y₂", default: 6 },
    { kind: "number", key: "z2", label: "Point 2: z₂", default: 5, showIf: (v) => v.dim === "3d" },
  ],
  compute(values) {
    const is3d = values.dim === "3d";
    const x1 = Number(values.x1);
    const y1 = Number(values.y1);
    const z1 = is3d ? Number(values.z1) : 0;
    const x2 = Number(values.x2);
    const y2 = Number(values.y2);
    const z2 = is3d ? Number(values.z2) : 0;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;

    const sumSq = dx * dx + dy * dy + (is3d ? dz * dz : 0);
    const distance = Math.sqrt(sumSq);

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;

    const slope2d = dx !== 0 ? dy / dx : null;

    return {
      hero: {
        label: is3d ? "3D Euclidean Distance (d)" : "2D Euclidean Distance (d)",
        value: fixed(distance, 4),
        unit: "units",
      },
      badge: {
        text: is3d ? "3-Dimensional Coordinates" : "2D Cartesian Plane",
        tone: "good",
      },
      rows: [
        { label: "Euclidean Distance (d)", value: fixed(distance, 4), strong: true },
        { label: "Radical Form", value: `√${fixed(sumSq, 2)}` },
        { label: "Midpoint M", value: is3d ? `(${fixed(midX, 2)}, ${fixed(midY, 2)}, ${fixed(midZ, 2)})` : `(${fixed(midX, 2)}, ${fixed(midY, 2)})` },
        { label: "Δx (Horizontal Run)", value: fixed(dx, 2) },
        { label: "Δy (Vertical Rise)", value: fixed(dy, 2) },
        ...(is3d ? [{ label: "Δz (Depth Span)", value: fixed(dz, 2) }] : []),
        ...(!is3d && slope2d !== null ? [{ label: "2D Line Slope (m)", value: fixed(slope2d, 4) }] : []),
      ],
      chart: {
        type: "donut",
        title: "Squared Coordinate Spans (Δx² + Δy²)",
        data: [
          { name: `Δx² Span (${fixed(dx * dx, 2)})`, value: Math.max(0.01, dx * dx), color: "#10b981" },
          { name: `Δy² Span (${fixed(dy * dy, 2)})`, value: Math.max(0.01, dy * dy), color: "#06b6d4" },
          ...(is3d ? [{ name: `Δz² Span (${fixed(dz * dz, 2)})`, value: Math.max(0.01, dz * dz), color: "#8b5cf6" }] : []),
        ],
      },
      note: {
        text: is3d
          ? "Formula: d = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)."
          : "Formula: d = √((x₂ − x₁)² + (y₂ − y₁)²).",
        tone: "neutral",
      },
    };
  },
};

export default function DistanceFormulaCalculator() {
  return <CalcEngine config={config} />;
}
