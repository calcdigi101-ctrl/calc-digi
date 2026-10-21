"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "sqft",
  title: "Square Footage Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Room / Layout configuration",
      default: "single",
      options: [
        { value: "single", label: "Single Rectangular Room / Space" },
        { value: "triangle", label: "Triangular Space / Bay Alcove" },
        { value: "multi", label: "Multi-Room House Aggregator (3 Rooms)" },
        { value: "lshape", label: "L-Shaped Room (Two Rectangles)" },
        { value: "circle", label: "Circular / Curved Space" },
      ],
    },
    // Single Rectangle
    { kind: "number", key: "length", label: "Length", suffix: "ft", default: 15, min: 0.5, max: 1000, showIf: (v) => v.mode === "single" },
    { kind: "number", key: "width", label: "Width", suffix: "ft", default: 12, min: 0.5, max: 1000, showIf: (v) => v.mode === "single" },

    // Triangular Space
    { kind: "number", key: "base", label: "Triangle Base Length", suffix: "ft", default: 16, min: 0.5, max: 500, showIf: (v) => v.mode === "triangle" },
    { kind: "number", key: "height", label: "Perpendicular Height", suffix: "ft", default: 12, min: 0.5, max: 500, showIf: (v) => v.mode === "triangle" },

    // L-Shaped Room (Section A + Section B)
    { kind: "number", key: "l1", label: "Section A Length", suffix: "ft", default: 16, min: 0.5, max: 500, showIf: (v) => v.mode === "lshape" },
    { kind: "number", key: "w1", label: "Section A Width", suffix: "ft", default: 12, min: 0.5, max: 500, showIf: (v) => v.mode === "lshape" },
    { kind: "number", key: "l2", label: "Section B Length", suffix: "ft", default: 10, min: 0.5, max: 500, showIf: (v) => v.mode === "lshape" },
    { kind: "number", key: "w2", label: "Section B Width", suffix: "ft", default: 8, min: 0.5, max: 500, showIf: (v) => v.mode === "lshape" },

    // Multi-Room Aggregator
    { kind: "number", key: "r1_l", label: "Room 1 (Living) Length", suffix: "ft", default: 18, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },
    { kind: "number", key: "r1_w", label: "Room 1 (Living) Width", suffix: "ft", default: 14, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },
    { kind: "number", key: "r2_l", label: "Room 2 (Master Bed) Length", suffix: "ft", default: 14, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },
    { kind: "number", key: "r2_w", label: "Room 2 (Master Bed) Width", suffix: "ft", default: 12, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },
    { kind: "number", key: "r3_l", label: "Room 3 (Kitchen/Dining) Length", suffix: "ft", default: 12, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },
    { kind: "number", key: "r3_w", label: "Room 3 (Kitchen/Dining) Width", suffix: "ft", default: 10, min: 0.5, max: 500, showIf: (v) => v.mode === "multi" },

    // Circle
    { kind: "number", key: "diameter", label: "Diameter", suffix: "ft", default: 14, min: 1, max: 500, showIf: (v) => v.mode === "circle" },

    // Pricing & Waste (Collapsible / Optional)
    {
      kind: "choice",
      key: "waste",
      label: "Flooring / Tile waste allowance",
      default: "10",
      segmented: true,
      options: [
        { value: "0", label: "0% (Exact)" },
        { value: "10", label: "10% (Standard)" },
        { value: "15", label: "15% (Diagonal/Tile)" },
      ],
    },
    { kind: "number", key: "unitPrice", label: "Cost per sq ft (Optional)", prefix: "$", default: 0, min: 0, max: 1000, optional: true },
  ],
  compute: (v) => {
    let netSqFt = 0;
    let perimeterFt = 0;
    const chartData: { name: string; value: number; color?: string }[] = [];

    if (v.mode === "circle") {
      const radius = Number(v.diameter || 14) / 2;
      netSqFt = Math.PI * radius * radius;
      perimeterFt = 2 * Math.PI * radius;
      chartData.push({ name: "Circle Floor Area", value: Number(netSqFt.toFixed(1)), color: "#2563eb" });
    } else if (v.mode === "triangle") {
      const b = Number(v.base || 16);
      const h = Number(v.height || 12);
      netSqFt = 0.5 * b * h;
      const hyp = Math.sqrt(Math.pow(b / 2, 2) + Math.pow(h, 2));
      perimeterFt = b + (2 * hyp);
      chartData.push({ name: "Triangular Floor Space", value: Number(netSqFt.toFixed(1)), color: "#2563eb" });
    } else if (v.mode === "lshape") {
      const a = Number(v.l1 || 0) * Number(v.w1 || 0);
      const b = Number(v.l2 || 0) * Number(v.w2 || 0);
      netSqFt = a + b;
      perimeterFt = 2 * (Number(v.l1 || 0) + Number(v.w1 || 0)) + 2 * (Number(v.l2 || 0) + Number(v.w2 || 0));
      chartData.push(
        { name: "Section A", value: Number(a.toFixed(1)), color: "#2563eb" },
        { name: "Section B", value: Number(b.toFixed(1)), color: "#10b981" }
      );
    } else if (v.mode === "multi") {
      const r1 = Number(v.r1_l || 0) * Number(v.r1_w || 0);
      const r2 = Number(v.r2_l || 0) * Number(v.r2_w || 0);
      const r3 = Number(v.r3_l || 0) * Number(v.r3_w || 0);
      netSqFt = r1 + r2 + r3;
      perimeterFt = 2 * (Number(v.r1_l || 0) + Number(v.r1_w || 0) + Number(v.r2_l || 0) + Number(v.r2_w || 0) + Number(v.r3_l || 0) + Number(v.r3_w || 0));
      chartData.push(
        { name: "Living Room", value: Number(r1.toFixed(1)), color: "#2563eb" },
        { name: "Master Bedroom", value: Number(r2.toFixed(1)), color: "#10b981" },
        { name: "Kitchen / Dining", value: Number(r3.toFixed(1)), color: "#f59e0b" }
      );
    } else {
      const l = Number(v.length || 0);
      const w = Number(v.width || 0);
      netSqFt = l * w;
      perimeterFt = 2 * (l + w);
      chartData.push({ name: "Net Floor Space", value: Number(netSqFt.toFixed(1)), color: "#2563eb" });
    }

    if (netSqFt <= 0) {
      return { error: "Please enter dimensions greater than zero." };
    }

    const wastePct = Number(v.waste || 0);
    const wasteSqFt = netSqFt * (wastePct / 100);
    const grossSqFt = netSqFt + wasteSqFt;
    const sqMeters = netSqFt * 0.092903;
    const unitCost = Number(v.unitPrice || 0);
    const totalCost = grossSqFt * unitCost;

    if (wastePct > 0) {
      chartData.push({ name: `Waste Allowance (${wastePct}%)`, value: Number(wasteSqFt.toFixed(1)), color: "#94a3b8" });
    }

    // Material requirements:
    // Standard drywall sheet (4x8) = 32 sq ft
    const drywallSheets4x8 = Math.ceil(grossSqFt / 32);
    // Standard paint gallon covers ~350 sq ft
    const paintGallons = (grossSqFt / 350).toFixed(1);

    return {
      hero: {
        label: "Total area",
        value: `${num(grossSqFt, 1)} sq ft`,
        unit: `(${num(sqMeters, 2)} m²)`,
        sub: wastePct > 0 ? `Net: ${num(netSqFt, 1)} sq ft + ${wastePct}% waste (${num(wasteSqFt, 1)} sq ft)` : `Exact net surface area`,
      },
      chart: {
        type: "donut",
        format: "plain",
        data: chartData,
      },
      rows: [
        { label: "Net Surface Area", value: `${num(netSqFt, 1)} sq ft (${num(sqMeters, 2)} m²)`, strong: true },
        { label: "Total Room Perimeter", value: `${num(perimeterFt, 1)} linear ft` },
        ...(wastePct > 0 ? [{ label: `Material Needed (with ${wastePct}% waste)`, value: `${num(grossSqFt, 1)} sq ft` }] : []),
        ...(unitCost > 0 ? [{ label: `Estimated Total Material Cost (@ $${unitCost}/sq ft)`, value: usd0(totalCost), strong: true }] : []),
        { label: "4ft × 8ft Drywall Sheets Equivalent", value: `${drywallSheets4x8} sheets (32 sq ft each)` },
        { label: "Paint Gallons Equivalent (1 Coat)", value: `${paintGallons} gal (350 sq ft/gal)` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>ANSI Z765 Standard Tip:</strong> For finished residential square footage, appraisers require minimum ceiling heights of 7 feet (or 5 feet under sloped ceilings with at least half the room at 7+ feet).
          </span>
        ),
        tone: "good",
      },
    };
  },
};

export default function SquareFootageCalculator() {
  return <CalcEngine config={config} />;
}
