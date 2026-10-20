"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "flooring",
  title: "Flooring Calculator",
  fields: [
    {
      kind: "choice",
      key: "material",
      label: "Flooring material type",
      default: "lvp",
      options: [
        { value: "lvp", label: "Luxury Vinyl Plank (LVP / SPC)" },
        { value: "hardwood", label: "Solid / Engineered Hardwood" },
        { value: "tile", label: "Ceramic / Porcelain Tile" },
        { value: "laminate", label: "Laminate Flooring" },
        { value: "carpet", label: "Broadloom Carpet" },
      ],
    },
    { kind: "number", key: "length", label: "Room length", suffix: "ft", default: 16, min: 1, max: 200 },
    { kind: "number", key: "width", label: "Room width", suffix: "ft", default: 12, min: 1, max: 200 },
    {
      kind: "choice",
      key: "pattern",
      label: "Installation layout & waste factor",
      default: "10",
      segmented: true,
      options: [
        { value: "5", label: "5% (Simple rect)" },
        { value: "10", label: "10% (Standard lay)" },
        { value: "15", label: "15% (Diagonal 45°)" },
        { value: "20", label: "20% (Herringbone)" },
      ],
    },
    { kind: "number", key: "boxSize", label: "Square feet per box", suffix: "sq ft/box", default: 20, min: 5, max: 100 },
    { kind: "number", key: "pricePerSqFt", label: "Material price per sq ft", prefix: "$", default: 3.5, min: 0.1, max: 100 },
  ],
  compute: (v) => {
    const l = Number(v.length || 0);
    const w = Number(v.width || 0);
    const wastePct = Number(v.pattern || 10);
    const boxSqFt = Number(v.boxSize || 20);
    const priceSqFt = Number(v.pricePerSqFt || 0);

    if (l <= 0 || w <= 0 || boxSqFt <= 0) {
      return { error: "Please enter valid room dimensions and box size greater than zero." };
    }

    const netSqFt = l * w;
    const wasteSqFt = netSqFt * (wastePct / 100);
    const totalSqFtNeeded = netSqFt + wasteSqFt;

    const boxesNeeded = Math.ceil(totalSqFtNeeded / boxSqFt);
    const totalPurchasedSqFt = boxesNeeded * boxSqFt;
    const overageSqFt = totalPurchasedSqFt - totalSqFtNeeded;

    const materialCost = totalPurchasedSqFt * priceSqFt;
    const underlaymentRolls = Math.ceil(netSqFt / 100); // Standard roll = 100 sq ft
    const perimeterFt = 2 * (l + w); // for baseboards / quarter round

    return {
      hero: {
        label: "Flooring required",
        value: `${boxesNeeded} boxes`,
        unit: `(${num(totalPurchasedSqFt, 1)} sq ft purchased)`,
        sub: `Room net: ${num(netSqFt, 1)} sq ft + ${wastePct}% waste (${num(wasteSqFt, 1)} sq ft)`,
      },
      badge: {
        text: `Covers ${num(totalPurchasedSqFt, 1)} sq ft total`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "Net Floor Coverage (sq ft)", value: Number(netSqFt.toFixed(1)), color: "#2563eb" },
          { name: `Pattern Waste Margin ${wastePct}% (sq ft)`, value: Number(wasteSqFt.toFixed(1)), color: "#f59e0b" },
          { name: "Unused Box Surplus (sq ft)", value: Number(overageSqFt.toFixed(1)), color: "#94a3b8" },
        ],
      },
      rows: [
        { label: "Whole Boxes to Purchase", value: `${boxesNeeded} boxes (@ ${boxSqFt} sq ft/box)`, strong: true },
        { label: "Estimated Material Cost", value: usd0(materialCost), strong: true },
        { label: "Actual Coverage Purchased", value: `${num(totalPurchasedSqFt, 1)} sq ft` },
        { label: "Net Room Floor Area", value: `${num(netSqFt, 1)} sq ft` },
        { label: "Recommended Waste Buffer", value: `+${num(wasteSqFt, 1)} sq ft (${wastePct}%)` },
        { label: "Underlayment Rolls (100 sq ft each)", value: `${underlaymentRolls} rolls` },
        { label: "Quarter-Round / Baseboard Length", value: `${num(perimeterFt, 1)} linear ft` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Attic Stock Advice:</strong> Never return the last partial or leftover box! Keep 1 to 2 spare boxes stored flat in a closet for future board replacements in case of water leaks or heavy furniture gouges.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function FlooringCalculator() {
  return <CalcEngine config={config} />;
}
