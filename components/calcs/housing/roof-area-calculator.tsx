"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "roof",
  title: "Roof Area Calculator",
  fields: [
    { kind: "number", key: "length", label: "Building base length", suffix: "ft", default: 40, min: 5, max: 500 },
    { kind: "number", key: "width", label: "Building base width", suffix: "ft", default: 30, min: 5, max: 500 },
    {
      kind: "choice",
      key: "pitch",
      label: "Roof pitch (rise over 12″ run)",
      default: "6",
      options: [
        { value: "3", label: "3/12 Low Slope (1.031 multiplier - 14.0°)" },
        { value: "4", label: "4/12 Standard Ranch (1.054 multiplier - 18.4°)" },
        { value: "6", label: "6/12 Standard Gable (1.118 multiplier - 26.6°)" },
        { value: "8", label: "8/12 Moderate Steep (1.202 multiplier - 33.7°)" },
        { value: "10", label: "10/12 Steep Pitch (1.302 multiplier - 39.8°)" },
        { value: "12", label: "12/12 45-Degree Steep (1.414 multiplier - 45.0°)" },
      ],
    },
    { kind: "number", key: "overhang", label: "Eave / Rake overhang", suffix: "inches", default: 12, min: 0, max: 48 },
    {
      kind: "choice",
      key: "waste",
      label: "Roof complexity & waste margin",
      default: "10",
      segmented: true,
      options: [
        { value: "10", label: "10% (Simple Gable)" },
        { value: "15", label: "15% (Hip & Valley)" },
        { value: "20", label: "20% (Complex Dormers)" },
      ],
    },
    { kind: "number", key: "costPerSquare", label: "Material cost per roofing square", prefix: "$", default: 125, min: 50, max: 800 },
  ],
  compute: (v) => {
    const baseLen = Number(v.length || 40);
    const baseWid = Number(v.width || 30);
    const overhangFt = Number(v.overhang || 12) / 12;
    const wastePct = Number(v.waste || 10);
    const costPerSq = Number(v.costPerSquare || 125);

    if (baseLen <= 0 || baseWid <= 0) {
      return { error: "Please enter valid building footprint dimensions." };
    }

    // Footprint with 2-sided overhangs
    const totalFootprintLen = baseLen + (2 * overhangFt);
    const totalFootprintWid = baseWid + (2 * overhangFt);
    const flatRoofFootprintSqFt = totalFootprintLen * totalFootprintWid;

    // Pitch multiplier: sqrt(1 + (rise / 12)^2)
    const rise = Number(v.pitch || 6);
    const slopeMultiplier = Math.sqrt(1 + Math.pow(rise / 12, 2));

    const netSlopedSqFt = flatRoofFootprintSqFt * slopeMultiplier;
    const wasteSqFt = netSlopedSqFt * (wastePct / 100);
    const totalSqFtWithWaste = netSlopedSqFt + wasteSqFt;

    // Roofing Squares (1 square = 100 sq ft)
    const totalSquares = totalSqFtWithWaste / 100;
    const wholeSquares = Math.ceil(totalSquares);

    // Standard architectural shingles: 3 bundles per square
    const bundlesNeeded = Math.ceil(totalSquares * 3);

    // Synthetic felt underlayment (typically 400 sq ft per roll with overlaps)
    const underlaymentRolls = Math.ceil(totalSqFtWithWaste / 400);

    const estimatedMaterialCost = wholeSquares * costPerSq;

    return {
      hero: {
        label: "Total roof area",
        value: `${num(totalSqFtWithWaste, 0)} sq ft`,
        unit: `(${num(totalSquares, 1)} squares)`,
        sub: `Includes ${num(netSlopedSqFt, 0)} sq ft sloped area + ${wastePct}% waste (${num(wasteSqFt, 0)} sq ft)`,
      },
      badge: {
        text: `${bundlesNeeded} Shingle Bundles Needed`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "Ground Footprint (Flat)", value: Number(flatRoofFootprintSqFt.toFixed(0)), color: "#2563eb" },
          { name: "Pitch Slope Expansion", value: Number((netSlopedSqFt - flatRoofFootprintSqFt).toFixed(0)), color: "#10b981" },
          { name: `Waste Allowance (${wastePct}%)`, value: Number(wasteSqFt.toFixed(0)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Roofing Squares to Order", value: `${wholeSquares} squares (100 sq ft each)`, strong: true },
        { label: "Shingle Bundles (3 per square)", value: `${bundlesNeeded} bundles`, strong: true },
        { label: "Estimated Shingle Material Cost", value: usd0(estimatedMaterialCost), strong: true },
        { label: "Sloped Surface Footprint", value: `${num(netSlopedSqFt, 0)} sq ft (Pitch factor ${slopeMultiplier.toFixed(3)})` },
        { label: "Flat Base Area with Overhangs", value: `${num(flatRoofFootprintSqFt, 0)} sq ft` },
        { label: "Synthetic Underlayment Rolls (400 sq ft)", value: `${underlaymentRolls} rolls` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Roofing Square Definition:</strong> In construction, 1 &ldquo;Square&rdquo; equals exactly 100 square feet of roof surface. Standard laminated architectural shingles are packaged at 3 bundles per square (each bundle weighs ~65–80 lbs).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function RoofAreaCalculator() {
  return <CalcEngine config={config} />;
}
