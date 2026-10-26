"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const volumeConverterConfig: CalcConfig = {
  id: "volume-converter",
  title: "Volume & Fluid Capacity Converter",
  fields: [
    { kind: "number", key: "value", label: "Volume Value", default: 5, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "l",
      options: [
        { label: "Liters (L)", value: "l" },
        { label: "Milliliters (mL)", value: "ml" },
        { label: "Gallons US (gal)", value: "gal" },
        { label: "Cubic Meters (m³)", value: "m3" },
        { label: "Fluid Ounces US (fl oz)", value: "floz" },
        { label: "Cups US (cup)", value: "cup" },
        { label: "Quarts US (qt)", value: "qt" },
        { label: "Pints US (pt)", value: "pt" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "gal",
      options: [
        { label: "Liters (L)", value: "l" },
        { label: "Milliliters (mL)", value: "ml" },
        { label: "Gallons US (gal)", value: "gal" },
        { label: "Cubic Meters (m³)", value: "m3" },
        { label: "Fluid Ounces US (fl oz)", value: "floz" },
        { label: "Cups US (cup)", value: "cup" },
        { label: "Quarts US (qt)", value: "qt" },
        { label: "Pints US (pt)", value: "pt" },
      ],
    },
  ],
  presets: [
    { label: "5 Liters to US Gallons (Automotive Fluid)", values: { value: 5, fromUnit: "l", toUnit: "gal" } },
    { label: "1 Gallon to Liters (Fuel Measure)", values: { value: 1, fromUnit: "gal", toUnit: "l" } },
    { label: "750 mL to Fluid Ounces (Beverage)", values: { value: 750, fromUnit: "ml", toUnit: "floz" } },
    { label: "1 Cubic Meter to Liters (Storage)", values: { value: 1, fromUnit: "m3", toUnit: "l" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 5);
    const from = String(vals.fromUnit || "l");
    const to = String(vals.toUnit || "gal");

    const TO_LITERS: Record<string, number> = {
      l: 1,
      ml: 0.001,
      gal: 3.785411784,
      m3: 1000,
      floz: 0.0295735295625,
      cup: 0.2365882365,
      qt: 0.946352946,
      pt: 0.473176473,
    };

    const liters = val * (TO_LITERS[from] || 1);
    const converted = liters / (TO_LITERS[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Volume (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Capacity", value: `${val} ${from}` },
        { label: "Metric Liters (L)", value: `${liters.toLocaleString("en-US", { maximumFractionDigits: 3 })} L` },
        { label: "Converted Target Volume", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Gallons US", value: `${(liters / 3.78541).toFixed(3)} gal` },
        { label: "Equivalent in Fluid Ounces", value: `${(liters / 0.0295735).toFixed(1)} fl oz` },
        { label: "Equivalent in Cubic Meters", value: `${(liters / 1000).toFixed(6)} m³` },
      ],
      steps: [
        `Convert to reference metric liters: ${val} × ${TO_LITERS[from]} = ${liters.toFixed(4)} L.`,
        `Divide by target volumetric factor: ${liters.toFixed(4)} ÷ ${TO_LITERS[to]} = ${converted.toFixed(4)} ${to}.`,
      ],
      chart: {
        type: "donut",
        title: "Volumetric Capacity Distribution",
        format: "pct",
        data: [
          { name: "Active Liquid Volume", value: 68, color: "#06b6d4" },
          { name: "Reservoir Ullage Headroom", value: 32, color: "#64748b" },
        ],
      },
    };
  },
};

export default function VolumeConverterComponent() {
  return <CalcEngine config={volumeConverterConfig} />;
}
