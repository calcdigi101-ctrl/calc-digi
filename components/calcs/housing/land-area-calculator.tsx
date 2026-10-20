"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "land",
  title: "Land Area Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Measurement input mode",
      default: "dimensions",
      options: [
        { value: "dimensions", label: "Rectangular Lot Dimensions (Feet)" },
        { value: "four_sided", label: "Irregular 4-Sided Lot (Avg Sides)" },
        { value: "acres", label: "Direct Acreage Conversion" },
      ],
    },
    // Mode 1: Standard Feet
    { kind: "number", key: "length", label: "Lot depth / length", suffix: "ft", default: 200, min: 1, max: 50000, showIf: (v) => v.mode === "dimensions" },
    { kind: "number", key: "width", label: "Lot frontage / width", suffix: "ft", default: 100, min: 1, max: 50000, showIf: (v) => v.mode === "dimensions" },

    // Mode 2: 4-Sided
    { kind: "number", key: "s1", label: "Front boundary (Side 1)", suffix: "ft", default: 120, min: 1, max: 50000, showIf: (v) => v.mode === "four_sided" },
    { kind: "number", key: "s2", label: "Rear boundary (Side 2)", suffix: "ft", default: 110, min: 1, max: 50000, showIf: (v) => v.mode === "four_sided" },
    { kind: "number", key: "s3", label: "Left boundary (Side 3)", suffix: "ft", default: 180, min: 1, max: 50000, showIf: (v) => v.mode === "four_sided" },
    { kind: "number", key: "s4", label: "Right boundary (Side 4)", suffix: "ft", default: 190, min: 1, max: 50000, showIf: (v) => v.mode === "four_sided" },

    // Mode 3: Direct Acres
    { kind: "number", key: "acresInput", label: "Total acreage", suffix: "acres", default: 1.5, min: 0.01, max: 100000, showIf: (v) => v.mode === "acres" },

    { kind: "number", key: "pricePerAcre", label: "Price per acre (Optional)", prefix: "$", default: 75000, min: 0, max: 10000000, optional: true },
  ],
  compute: (v) => {
    let sqFt = 0;
    let perimeterFt = 0;

    if (v.mode === "acres") {
      const a = Number(v.acresInput || 1);
      sqFt = a * 43560;
      // Approximate square parcel perimeter
      const side = Math.sqrt(sqFt);
      perimeterFt = 4 * side;
    } else if (v.mode === "four_sided") {
      const avgW = (Number(v.s1 || 0) + Number(v.s2 || 0)) / 2;
      const avgL = (Number(v.s3 || 0) + Number(v.s4 || 0)) / 2;
      sqFt = avgW * avgL;
      perimeterFt = Number(v.s1 || 0) + Number(v.s2 || 0) + Number(v.s3 || 0) + Number(v.s4 || 0);
    } else {
      const l = Number(v.length || 0);
      const w = Number(v.width || 0);
      sqFt = l * w;
      perimeterFt = 2 * (l + w);
    }

    if (sqFt <= 0) {
      return { error: "Please enter valid lot dimensions greater than zero." };
    }

    const acres = sqFt / 43560;
    const hectares = sqFt / 107639;
    const sqMeters = sqFt * 0.092903;
    const priceAcre = Number(v.pricePerAcre || 0);
    const totalValuation = priceAcre > 0 ? acres * priceAcre : 0;

    // Typical residential zoning: 35% max building footprint, 30% setbacks, 35% open green yard
    const buildingEnvelopeSqFt = sqFt * 0.35;
    const setbacksSqFt = sqFt * 0.30;
    const greenYardSqFt = sqFt * 0.35;

    return {
      hero: {
        label: "Total land area",
        value: `${num(acres, 3)} acres`,
        unit: `(${num(sqFt, 0)} sq ft)`,
        sub: `${num(hectares, 3)} hectares | ${num(sqMeters, 0)} m² | Perimeter: ${num(perimeterFt, 0)} linear ft`,
      },
      badge: {
        text: `1 Acre = 43,560 sq ft`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "Max Allowable Building Footprint (35%)", value: Number(buildingEnvelopeSqFt.toFixed(0)), color: "#2563eb" },
          { name: "Zoning Setbacks (Front/Rear/Side) (30%)", value: Number(setbacksSqFt.toFixed(0)), color: "#f59e0b" },
          { name: "Open Landscape & Yard (35%)", value: Number(greenYardSqFt.toFixed(0)), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Total Square Footage", value: `${num(sqFt, 0)} sq ft`, strong: true },
        { label: "Total Acreage", value: `${num(acres, 3)} acres`, strong: true },
        { label: "Metric Area", value: `${num(hectares, 3)} hectares (${num(sqMeters, 0)} m²)` },
        { label: "Boundary Perimeter (For Fencing)", value: `${num(perimeterFt, 0)} linear ft` },
        ...(totalValuation > 0 ? [{ label: "Estimated Land Valuation", value: usd0(totalValuation), strong: true }] : []),
        { label: "Max 35% Lot Coverage Footprint", value: `${num(buildingEnvelopeSqFt, 0)} sq ft ground slab` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Historic Acre Fact:</strong> One acre was historically defined as the amount of land a yoke of oxen could plow in one day (one furlong of 660 ft by one chain of 66 ft = exactly 43,560 square feet).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function LandAreaCalculator() {
  return <CalcEngine config={config} />;
}
