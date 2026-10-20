"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "concrete",
  title: "Concrete Calculator",
  fields: [
    {
      kind: "choice",
      key: "climateGrade",
      label: "Regional Climate & Compressive Strength Tier",
      default: "standard_3000",
      options: [
        { value: "standard_3000", label: "Moderate Sunbelt (3,000 PSI · Patios & Walkways)" },
        { value: "driveway_4000", label: "Heavy Vehicle / Cold (4,000 PSI · Driveways & Garages)" },
        { value: "freeze_4500", label: "Northern Freeze-Thaw (4,500 PSI · Air-Entrained)" },
        { value: "structural_5000", label: "Commercial Structural (5,000 PSI · High-Early)" },
      ],
    },
    {
      kind: "choice",
      key: "type",
      label: "Project structure type",
      default: "slab",
      options: [
        { value: "slab", label: "Slab / Patio / Driveway (Rectangular)" },
        { value: "footing", label: "Footing / Foundation Trench" },
        { value: "column", label: "Cylindrical Column / Pier / Post Hole" },
      ],
    },
    { kind: "number", key: "length", label: "Length", suffix: "ft", default: 12, min: 0.5, max: 500, showIf: (v) => v.type !== "column" },
    { kind: "number", key: "width", label: "Width", suffix: "ft", default: 10, min: 0.5, max: 500, showIf: (v) => v.type !== "column" },
    { kind: "number", key: "depth", label: "Thickness / Depth", suffix: "inches", default: 4, min: 1, max: 60, showIf: (v) => v.type !== "column" },
    { kind: "number", key: "diameter", label: "Column diameter", suffix: "inches", default: 12, min: 4, max: 72, showIf: (v) => v.type === "column" },
    { kind: "number", key: "height", label: "Column depth / height", suffix: "ft", default: 4, min: 0.5, max: 40, showIf: (v) => v.type === "column" },
    { kind: "number", key: "quantity", label: "Quantity of columns/piers", default: 1, min: 1, max: 100, integer: true, showIf: (v) => v.type === "column" },
    {
      kind: "choice",
      key: "waste",
      label: "Waste allowance",
      default: "10",
      segmented: true,
      options: [
        { value: "5", label: "5% (Clean formwork)" },
        { value: "10", label: "10% (Standard)" },
        { value: "15", label: "15% (Rough ground)" },
      ],
    },
  ],
  compute: (v) => {
    const wasteFactor = 1 + Number(v.waste || 10) / 100;
    let netCubicFeet = 0;
    let areaSqFt = 0;

    if (v.type === "column") {
      const radiusFt = (Number(v.diameter || 12) / 2) / 12;
      const heightFt = Number(v.height || 4);
      const qty = Number(v.quantity || 1);
      const singleVol = Math.PI * radiusFt * radiusFt * heightFt;
      netCubicFeet = singleVol * qty;
      areaSqFt = Math.PI * radiusFt * radiusFt * qty;
    } else {
      const len = Number(v.length || 0);
      const wid = Number(v.width || 0);
      const thickFt = Number(v.depth || 4) / 12;
      areaSqFt = len * wid;
      netCubicFeet = areaSqFt * thickFt;
    }

    if (netCubicFeet <= 0) {
      return { error: "Please enter valid project dimensions greater than zero." };
    }

    const grossCubicFeet = netCubicFeet * wasteFactor;
    const grossCubicYards = grossCubicFeet / 27;
    const netCubicYards = netCubicFeet / 27;
    const wasteCubicYards = grossCubicYards - netCubicYards;

    // 60-lb premix bag yields ~0.45 cu ft; 80-lb bag yields ~0.60 cu ft
    const bags60 = Math.ceil(grossCubicFeet / 0.45);
    const bags80 = Math.ceil(grossCubicFeet / 0.60);

    // Cost estimations: Ready-mix truck avg $145/yd; Bagged concrete avg $6.20/80-lb bag
    const estimatedTruckCost = grossCubicYards * 145;
    const estimatedBagCost = bags80 * 6.5;

    return {
      hero: {
        label: "Concrete volume needed",
        value: `${num(grossCubicYards, 2)} cu yd`,
        unit: `(${num(grossCubicFeet, 1)} cu ft)`,
        sub: `Includes ${v.waste}% safety margin for spillage & uneven subgrade`,
      },
      badge: {
        text: grossCubicYards >= 1 ? "Ready-Mix Truck Recommended" : "Bagged Mix Feasible",
        tone: grossCubicYards >= 1 ? "info" : "good",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "Net Structure Volume (cu yd)", value: Number(netCubicYards.toFixed(2)), color: "#2563eb" },
          { name: `Waste Margin ${v.waste}% (cu yd)`, value: Number(wasteCubicYards.toFixed(2)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "80-lb Bags Needed", value: `${bags80} bags (0.60 cu ft yield)`, strong: true },
        { label: "60-lb Bags Needed", value: `${bags60} bags (0.45 cu ft yield)` },
        { label: "Surface Footprint", value: `${num(areaSqFt, 1)} sq ft` },
        { label: "Gross Volume (Cubic Feet)", value: `${num(grossCubicFeet, 2)} cu ft` },
        {
          label: "Design Compressive Strength",
          value: {
            standard_3000: "3,000 PSI (ASTM C39 Standard)",
            driveway_4000: "4,000 PSI (ASTM C39 High-Durability)",
            freeze_4500: "4,500 PSI (Air-Entrained 5-7%)",
            structural_5000: "5,000 PSI (High-Early Structural)",
          }[String(v.climateGrade || "standard_3000")] || "3,000 PSI",
        },
        { label: "Est. Ready-Mix Truck Material", value: usd0(estimatedTruckCost) },
        { label: "Est. Bagged Material Cost (80-lb)", value: usd0(estimatedBagCost) },
      ],
      note: {
        text: grossCubicYards > 3 ? (
          <span>
            💡 For projects over 3 cubic yards, ordering a <strong>Ready-Mix Concrete delivery truck</strong> is significantly faster, structurally uniform, and usually cheaper than hand-mixing {bags80} bags.
          </span>
        ) : (
          <span>
            💡 For small DIY jobs under 1–2 cubic yards, <strong>80-lb bagged concrete</strong> mixed with a portable drum mixer is standard and cost-effective.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function ConcreteCalculator() {
  return <CalcEngine config={config} />;
}
