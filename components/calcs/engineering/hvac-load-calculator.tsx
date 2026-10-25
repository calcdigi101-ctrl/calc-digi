"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "hvac-load-calc",
  title: "HVAC Cooling & Heating Load Sizing Calculator (Manual J)",
  presets: [
    { label: "Suburban Home (2,000 sq ft, Zone 4 Moderate)", values: { areaSqFt: 2000, ceilingHeight: 8, climateZone: "zone4", insulation: "average", occupants: 4, windows: "double" } },
    { label: "Hot Sunbelt Villa (2,800 sq ft, Zone 2 Phoenix/Texas)", values: { areaSqFt: 2800, ceilingHeight: 9, climateZone: "zone2", insulation: "average", occupants: 5, windows: "double" } },
    { label: "Cold Northern House (2,400 sq ft, Zone 6 Chicago/MN)", values: { areaSqFt: 2400, ceilingHeight: 8, climateZone: "zone6", insulation: "average", occupants: 4, windows: "double" } },
    { label: "Modern High-Efficiency Flat (1,000 sq ft, Zone 4)", values: { areaSqFt: 1000, ceilingHeight: 9, climateZone: "zone4", insulation: "high", occupants: 2, windows: "triple" } },
    { label: "Older Uninsulated Home (1,600 sq ft, Zone 5 Drafty)", values: { areaSqFt: 1600, ceilingHeight: 8, climateZone: "zone5", insulation: "poor", occupants: 3, windows: "single" } },
  ],
  fields: [
    {
      kind: "number",
      key: "areaSqFt",
      label: "Conditioned Floor Area (sq ft)",
      default: 2000,
      min: 100,
      max: 50000,
      hint: "Total interior conditioned living space in square feet (e.g. 2,000 sq ft ≈ 186 m²)",
    },
    {
      kind: "number",
      key: "ceilingHeight",
      label: "Average Ceiling Height (feet)",
      default: 8,
      min: 7,
      max: 30,
      hint: "Vertical wall height (standard residential is 8 or 9 feet)",
    },
    {
      kind: "choice",
      key: "climateZone",
      label: "ASHRAE Geographic Climate Zone",
      default: "zone4",
      options: [
        { value: "zone1", label: "Zone 1–2: Very Hot & Humid (Miami, Houston, Phoenix)" },
        { value: "zone3", label: "Zone 3: Warm / Mild Winter (Atlanta, Dallas, Los Angeles)" },
        { value: "zone4", label: "Zone 4: Moderate Temperate (Washington DC, St. Louis, Seattle)" },
        { value: "zone5", label: "Zone 5: Cold Winter (Denver, Boston, Philadelphia)" },
        { value: "zone6", label: "Zone 6–7: Severe Cold (Chicago, Minneapolis, Minneapolis)" },
      ],
    },
    {
      kind: "choice",
      key: "insulation",
      label: "Building Thermal Envelope & Air Sealing",
      default: "average",
      options: [
        { value: "poor", label: "Poor / Pre-1980 Construction (Minimal insulation, drafty)" },
        { value: "average", label: "Average / Modern Standard Code (R-13 walls, R-38 attic)" },
        { value: "high", label: "High-Performance / Spray Foam (R-21+ walls, R-60 attic)" },
      ],
    },
    {
      kind: "choice",
      key: "windows",
      label: "Fenestration / Window Glazing Type",
      default: "double",
      options: [
        { value: "single", label: "Single Pane Clear Glass (High U-value ~ 1.1)" },
        { value: "double", label: "Double Pane Low-E Argon-Filled (Standard U ~ 0.30)" },
        { value: "triple", label: "Triple Pane High-Performance (U-value < 0.20)" },
      ],
    },
    {
      kind: "number",
      key: "occupants",
      label: "Regular Room Occupants",
      default: 4,
      min: 1,
      max: 100,
      hint: "Typical number of full-time residents (each body generates ~400 BTU/h of heat)",
    },
  ],
  compute(values) {
    const area = Number(values.areaSqFt);
    const height = Number(values.ceilingHeight) || 8;
    const zone = String(values.climateZone || "zone4");
    const ins = String(values.insulation || "average");
    const win = String(values.windows || "double");
    const people = Number(values.occupants) || 4;

    if (isNaN(area) || area <= 0) {
      return { error: "Please enter a valid conditioned floor area." };
    }

    // Base cooling BTU per sq ft based on climate zone (Manual J baseline)
    let baseBtuPerSqFt = 24;
    let heatingMultiplier = 35; // BTU/sq ft for winter heating design

    if (zone === "zone1") {
      baseBtuPerSqFt = 32;
      heatingMultiplier = 15;
    } else if (zone === "zone3") {
      baseBtuPerSqFt = 28;
      heatingMultiplier = 25;
    } else if (zone === "zone4") {
      baseBtuPerSqFt = 24;
      heatingMultiplier = 35;
    } else if (zone === "zone5") {
      baseBtuPerSqFt = 20;
      heatingMultiplier = 45;
    } else if (zone === "zone6") {
      baseBtuPerSqFt = 17;
      heatingMultiplier = 55;
    }

    // Insulation modifier
    let insMod = 1.0;
    if (ins === "poor") insMod = 1.25;
    else if (ins === "high") insMod = 0.82;

    // Window modifier
    let winMod = 1.0;
    if (win === "single") winMod = 1.20;
    else if (win === "triple") winMod = 0.90;

    // Ceiling height adjustment (standard is 8 ft)
    const heightMod = height / 8;

    // Envelope cooling load
    const envelopeCoolingBtu = area * baseBtuPerSqFt * insMod * winMod * heightMod;

    // Internal heat gains: 400 BTU/h per person + 1,200 BTU/h for kitchen/appliances
    const internalGainsBtu = people * 400 + 1200;

    const totalCoolingBtu = envelopeCoolingBtu + internalGainsBtu;
    // 1 Ton of refrigeration = 12,000 BTU/hr
    const coolingTonsRaw = totalCoolingBtu / 12000;

    // Round to standard nominal condenser half-ton increments (1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0 Tons)
    const standardTons = Math.ceil(coolingTonsRaw * 2) / 2;

    // Total Heating load
    const totalHeatingBtu = area * heatingMultiplier * insMod * winMod * heightMod;
    const heatingKW = (totalHeatingBtu * 0.293071) / 1000;

    // Recommended airflow: standard 400 CFM per ton of cooling capacity
    const supplyAirflowCFM = Math.round(standardTons * 400);

    const steps = [
      `1. Climate Baseline Load (${zone}): ${baseBtuPerSqFt} BTU/sq ft base cooling rating`,
      `2. Envelope Thermal Factoring: Floor Area (${area} sq ft) × Height Factor (${heightMod.toFixed(2)}) × Insulation (${insMod}) × Windows (${winMod}) = ${Math.round(envelopeCoolingBtu).toLocaleString()} BTU/h`,
      `3. Internal Sensible Gains: (${people} occupants × 400 BTU/h) + 1,200 BTU/h plug loads = ${internalGainsBtu.toLocaleString()} BTU/h`,
      `4. Total Required Cooling Capacity: ${Math.round(totalCoolingBtu).toLocaleString()} BTU/h ÷ 12,000 BTU/ton = ${coolingTonsRaw.toFixed(2)} Tons (Nominal size: ${standardTons} Tons)`,
      `5. Design Heating Load: ${Math.round(totalHeatingBtu).toLocaleString()} BTU/h (${heatingKW.toFixed(1)} kW) | Required Supply Airflow: ${supplyAirflowCFM} CFM`,
    ];

    return {
      hero: {
        label: "Recommended Cooling Capacity",
        value: `${standardTons} Tons`,
        unit: `${Math.round(totalCoolingBtu).toLocaleString()} BTU/h`,
      },
      badge: {
        text: `${standardTons} Ton AC / Heat Pump (${supplyAirflowCFM} CFM)`,
        tone: "good",
      },
      rows: [
        { label: "Nominal Condenser Sizing", value: `${standardTons} Tons of Refrigeration`, strong: true },
        { label: "Calculated Cooling Load", value: `${Math.round(totalCoolingBtu).toLocaleString()} BTU/hr (${(totalCoolingBtu / 3412.142).toFixed(2)} kW)`, strong: true },
        { label: "Estimated Winter Heating Load", value: `${Math.round(totalHeatingBtu).toLocaleString()} BTU/hr (${heatingKW.toFixed(1)} kW)`, strong: true },
        { label: "Supply Airflow Requirement", value: `${supplyAirflowCFM} CFM (~400 CFM / Ton)` },
        { label: "Floor Surface Intensity", value: `${(totalCoolingBtu / area).toFixed(1)} BTU/h per sq ft` },
        { label: "Climate Design Baseline", value: `${baseBtuPerSqFt} BTU/sq ft (${zone.toUpperCase()})` },
        { label: "Conditioned Interior Volume", value: `${(area * height).toLocaleString()} cubic feet (~${Math.round(area * height * 0.028317)} m³)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Cooling Load Breakdown by Source (BTU/h)",
        data: [
          { name: `Envelope Conduction & Glass (${Math.round(envelopeCoolingBtu)} BTU/h)`, value: Math.max(1, Math.round(envelopeCoolingBtu)), color: "#3b82f6" },
          { name: `Occupants & Internal Appliances (${Math.round(internalGainsBtu)} BTU/h)`, value: Math.max(1, Math.round(internalGainsBtu)), color: "#f59e0b" },
        ],
      },
      note: {
        text: "Based on ACCA Manual J principles. Avoid gross oversizing: an oversized AC will short-cycle rapidly, failing to dehumidify the air and leading to clammy indoor conditions and premature compressor failure.",
        tone: "neutral",
      },
    };
  },
};

export default function HvacLoadCalculator() {
  return <CalcEngine config={config} />;
}
