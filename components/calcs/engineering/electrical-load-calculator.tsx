"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "electrical-load-calc",
  title: "Electrical Service Load & Panel Sizing Calculator (NEC 220)",
  presets: [
    { label: "Modern All-Electric Home + EV (200A Panel Target)", values: { systemVoltage: "240", lightingWatts: 3500, kitchenWatts: 4500, hvacWatts: 7200, waterHeaterWatts: 4500, evWatts: 7680, dryerWatts: 5000 } },
    { label: "Standard Suburban Home (Gas Heat / 100A Panel)", values: { systemVoltage: "240", lightingWatts: 2500, kitchenWatts: 3000, hvacWatts: 3500, waterHeaterWatts: 0, evWatts: 0, dryerWatts: 0 } },
    { label: "Luxury Estate + Dual EV & Heat Pump (400A Panel)", values: { systemVoltage: "240", lightingWatts: 6000, kitchenWatts: 8000, hvacWatts: 14000, waterHeaterWatts: 9000, evWatts: 15360, dryerWatts: 5000 } },
    { label: "Small Commercial Light Industrial (208V 3-Phase)", values: { systemVoltage: "208_3p", lightingWatts: 4000, kitchenWatts: 2000, hvacWatts: 12000, waterHeaterWatts: 3000, evWatts: 7680, dryerWatts: 0 } },
    { label: "Urban Apartment / Flat (100A Service)", values: { systemVoltage: "240", lightingWatts: 1500, kitchenWatts: 3500, hvacWatts: 2800, waterHeaterWatts: 3000, evWatts: 0, dryerWatts: 3000 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "systemVoltage",
      label: "Electrical Service Supply Configuration",
      default: "240",
      options: [
        { value: "240", label: "Single-Phase 120/240V (Standard Residential USA/Canada)" },
        { value: "208_3p", label: "Three-Phase 120/208V (Light Commercial / Multi-Family)" },
        { value: "480_3p", label: "Three-Phase 277/480V (Industrial Commercial Facility)" },
        { value: "230", label: "Single-Phase 230V (Standard UK / European Residential)" },
      ],
    },
    {
      kind: "number",
      key: "lightingWatts",
      label: "General Lighting & Small Receptacles (Watts)",
      default: 3500,
      min: 0,
      max: 100000,
      hint: "Continuous base lighting and convenience wall outlets (NEC: 33 W per m² of living space)",
    },
    {
      kind: "number",
      key: "kitchenWatts",
      label: "Kitchen Small Appliances & Cooking (Watts)",
      default: 4500,
      min: 0,
      max: 50000,
      hint: "Range/oven, cooktop, microwave, dishwasher, and dedicated counter branch circuits",
    },
    {
      kind: "number",
      key: "hvacWatts",
      label: "Air Conditioning / Heat Pump (Watts)",
      default: 7200,
      min: 0,
      max: 100000,
      hint: "Peak central AC compressor or heat pump auxiliary electric heat strip wattage",
    },
    {
      kind: "number",
      key: "waterHeaterWatts",
      label: "Electric Domestic Water Heater (Watts)",
      default: 4500,
      min: 0,
      max: 30000,
      hint: "Storage tank heating element (typically 4,500W) or instantaneous tankless unit",
    },
    {
      kind: "number",
      key: "evWatts",
      label: "Electric Vehicle (EV) Level 2 Charger (Watts)",
      default: 7680,
      min: 0,
      max: 40000,
      hint: "Continuous vehicle charging station (e.g., 32A @ 240V = 7,680W; 48A @ 240V = 11,520W)",
    },
    {
      kind: "number",
      key: "dryerWatts",
      label: "Electric Clothes Dryer (Watts)",
      default: 5000,
      min: 0,
      max: 15000,
      hint: "Electric laundry heating element (NEC minimum rating is 5,000 W)",
    },
  ],
  compute(values) {
    const voltConfig = String(values.systemVoltage || "240");
    const lightW = Number(values.lightingWatts) || 0;
    const kitchenW = Number(values.kitchenWatts) || 0;
    const hvacW = Number(values.hvacWatts) || 0;
    const waterW = Number(values.waterHeaterWatts) || 0;
    const evW = Number(values.evWatts) || 0;
    const dryerW = Number(values.dryerWatts) || 0;

    const totalConnectedWatts = lightW + kitchenW + hvacW + waterW + evW + dryerW;
    if (totalConnectedWatts <= 0) {
      return { error: "Please enter connected wattage loads greater than zero." };
    }

    // NEC Article 220 Standard Demand Calculations:
    // 1. General lighting + small appliance circuits: First 3,000 W @ 100%, balance @ 35%
    const baseLightKitchen = lightW + kitchenW;
    const demandLighting = Math.min(3000, baseLightKitchen) + Math.max(0, baseLightKitchen - 3000) * 0.35;

    // 2. Fixed appliances (water heater, dryer): standard demand factor
    const demandAppliances = waterW + dryerW;

    // 3. HVAC: 100% of the largest continuous space conditioning load
    const demandHvac = hvacW;

    // 4. EV Charger: NEC Article 625 mandates 125% continuous duty multiplier
    const demandEV = evW * 1.25;

    const totalDemandWatts = demandLighting + demandAppliances + demandHvac + demandEV;
    const totalDemandKW = totalDemandWatts / 1000;

    // Calculate Amperes based on electrical supply configuration
    let lineVoltage = 240;
    let isThreePhase = false;

    if (voltConfig === "208_3p") {
      lineVoltage = 208;
      isThreePhase = true;
    } else if (voltConfig === "480_3p") {
      lineVoltage = 480;
      isThreePhase = true;
    } else if (voltConfig === "230") {
      lineVoltage = 230;
      isThreePhase = false;
    }

    let calculatedAmps = 0;
    if (isThreePhase) {
      // I = P / (sqrt(3) * V)
      calculatedAmps = totalDemandWatts / (Math.sqrt(3) * lineVoltage);
    } else {
      // I = P / V
      calculatedAmps = totalDemandWatts / lineVoltage;
    }

    // Standard NEC Breaker / Service Panel Tiers
    const standardPanels = [60, 100, 125, 150, 200, 225, 400, 600, 800];
    let recommendedPanel = standardPanels.find((p) => p >= calculatedAmps) || 800;

    // Wire gauge guideline for service entrance copper
    let wireGauge = "2/0 AWG Copper";
    if (recommendedPanel <= 100) wireGauge = "#4 AWG Copper";
    else if (recommendedPanel <= 125) wireGauge = "#2 AWG Copper";
    else if (recommendedPanel <= 150) wireGauge = "#1 AWG Copper";
    else if (recommendedPanel <= 200) wireGauge = "2/0 AWG Copper (or 4/0 Al)";
    else if (recommendedPanel <= 400) wireGauge = "Parallel 2× 2/0 Copper or 500 kcmil";
    else wireGauge = "Parallel Multi-Conductor Busbar";

    const utilizationPct = (calculatedAmps / recommendedPanel) * 100;

    const steps = [
      `1. Total Connected Nameplate Load: ${(totalConnectedWatts / 1000).toFixed(2)} kW (${totalConnectedWatts.toLocaleString()} Watts)`,
      `2. NEC Demand Factoring: Lighting/Outlets = ${Math.round(demandLighting)} W | Appliances = ${Math.round(demandAppliances)} W | HVAC = ${Math.round(demandHvac)} W | EV Charger (+125% continuous) = ${Math.round(demandEV)} W`,
      `3. Total Calculated Demand Load: ${totalDemandKW.toFixed(2)} kW (${Math.round(totalDemandWatts).toLocaleString()} W)`,
      `4. Service Current Draw: I = ${totalDemandWatts.toFixed(0)} W ÷ ${isThreePhase ? `(√3 × ${lineVoltage} V)` : `${lineVoltage} V`} = ${calculatedAmps.toFixed(1)} Amperes`,
      `5. NEC Code Sizing Recommendation: ${recommendedPanel}A Main Distribution Panel (${utilizationPct.toFixed(1)}% loaded) with ${wireGauge}`,
    ];

    return {
      hero: {
        label: "Required Service Current",
        value: `${calculatedAmps.toFixed(1)} A`,
        unit: `${recommendedPanel}A Panel Rating`,
      },
      badge: {
        text: `${recommendedPanel} Amp Main Service Required`,
        tone: utilizationPct > 80 ? "warn" : "good",
      },
      rows: [
        { label: "Calculated Design Load", value: `${calculatedAmps.toFixed(1)} Amperes (${totalDemandKW.toFixed(2)} kW demand)`, strong: true },
        { label: "Recommended Panel Rating", value: `${recommendedPanel} Amps (Standard NEC Enclosure)`, strong: true },
        { label: "Service Entrance Conductor", value: wireGauge, strong: true },
        { label: "Total Connected Nameplate Load", value: `${(totalConnectedWatts / 1000).toFixed(2)} kW (${totalConnectedWatts.toLocaleString()} W)` },
        { label: "NEC Factored Demand Load", value: `${totalDemandKW.toFixed(2)} kW (${Math.round(totalDemandWatts).toLocaleString()} W)` },
        { label: "Service Panel Utilization", value: `${utilizationPct.toFixed(1)}% of ${recommendedPanel}A capacity` },
        { label: "Supply System Format", value: `${lineVoltage}V ${isThreePhase ? "3-Phase Wye" : "Single-Phase 3-Wire"}` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Major Branch Circuit Load Distribution (Watts)",
        data: [
          { name: `EV Charging (${Math.round(demandEV)}W)`, value: Math.max(1, demandEV), color: "#10b981" },
          { name: `HVAC Cooling/Heat (${Math.round(demandHvac)}W)`, value: Math.max(1, demandHvac), color: "#3b82f6" },
          { name: `Water Heater (${Math.round(waterW)}W)`, value: Math.max(1, waterW), color: "#f59e0b" },
          { name: `Kitchen & Appliances (${Math.round(kitchenW + dryerW)}W)`, value: Math.max(1, kitchenW + dryerW), color: "#8b5cf6" },
          { name: `General Lighting (${Math.round(lightW)}W)`, value: Math.max(1, lightW), color: "#06b6d4" },
        ],
      },
      note: {
        text: "Calculated per National Electrical Code (NEC Article 220) standard method. EV chargers must be rated at 125% of continuous current. Always consult a licensed master electrician for municipal permitting.",
        tone: "neutral",
      },
    };
  },
};

export default function ElectricalLoadCalculator() {
  return <CalcEngine config={config} />;
}
