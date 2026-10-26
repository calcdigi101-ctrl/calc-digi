"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const shoeSizeConverterConfig: CalcConfig = {
  id: "shoe-size-converter",
  title: "International Shoe Size Converter",
  fields: [
    { kind: "number", key: "size", label: "Shoe Size Value", default: 9.5, min: 1, max: 55 },
    {
      kind: "choice",
      key: "gender",
      label: "Category / Gender",
      default: "men",
      options: [
        { label: "Men's Sizes", value: "men" },
        { label: "Women's Sizes", value: "women" },
        { label: "Kids / Youth Sizes", value: "kids" },
      ],
    },
    {
      kind: "choice",
      key: "system",
      label: "Input System",
      default: "us",
      options: [
        { label: "US / Canada", value: "us" },
        { label: "Europe (EU)", value: "eu" },
        { label: "United Kingdom (UK)", value: "uk" },
        { label: "Japan / Mondopoint (cm)", value: "jp" },
      ],
    },
  ],
  presets: [
    { label: "Men's US 9.5 (Typical Global Fit)", values: { size: 9.5, gender: "men", system: "us" } },
    { label: "Women's US 8.0 (Average Women's)", values: { size: 8, gender: "women", system: "us" } },
    { label: "Europe EU 43 (Men's Continental)", values: { size: 43, gender: "men", system: "eu" } },
    { label: "Mondopoint 27.5 cm (Foot Length)", values: { size: 27.5, gender: "men", system: "jp" } },
  ],
  compute: (vals) => {
    const size = Math.max(1, Number(vals.size) || 9.5);
    const gender = String(vals.gender || "men");
    const sys = String(vals.system || "us");

    // Standardize to Foot Length in cm (Mondopoint)
    let footCm = 27.5;
    if (sys === "us") {
      if (gender === "women") footCm = (size - 1) * 0.846 + 21;
      else footCm = size * 0.846 + 19.5;
    } else if (sys === "eu") {
      footCm = (size - 2) * 0.667;
    } else if (sys === "uk") {
      footCm = (size + 0.5) * 0.846 + 19.5;
    } else if (sys === "jp") {
      footCm = size;
    }

    const usMen = Math.max(1, (footCm - 19.5) / 0.846);
    const usWomen = usMen + 1.5;
    const uk = Math.max(0.5, usMen - 0.5);
    const eu = Math.round(footCm * 1.5 + 2);
    const inches = footCm / 2.54;

    return {
      hero: {
        value: `EU ${eu} | US ${gender === "women" ? usWomen.toFixed(1) : usMen.toFixed(1)}`,
        label: `International Shoe Fit (${footCm.toFixed(1)} cm Mondopoint)`,
      },
      breakdown: [
        { label: "Input Reference Size", value: `${size} (${sys.toUpperCase()})` },
        { label: "Foot Length (Mondopoint)", value: `${footCm.toFixed(1)} cm` },
        { label: "US Men's Size", value: `${usMen.toFixed(1)}` },
        { label: "US Women's Size", value: `${usWomen.toFixed(1)}` },
        { label: "United Kingdom (UK)", value: `${uk.toFixed(1)}` },
        { label: "European Union (EU)", value: `${eu}` },
        { label: "Foot Length in Inches", value: `${inches.toFixed(2)} in` },
      ],
      steps: [
        `Harmonize to Mondopoint foot length: ${footCm.toFixed(1)} cm.`,
        `Paris point European formula: EU = (Foot Length in cm × 1.5) + 2 = ${eu}.`,
        `Barleycorn Imperial sizing: US = 3 × Foot Length (in) - constant = ${usMen.toFixed(1)}.`,
      ],
      chart: {
        type: "donut",
        title: "Foot Bed Insole Proportion",
        format: "pct",
        data: [
          { name: "Anatomical Foot Length", value: 90, color: "#10b981" },
          { name: "Toe Box Clearance Allowance", value: 10, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function ShoeSizeConverterComponent() {
  return <CalcEngine config={shoeSizeConverterConfig} />;
}
