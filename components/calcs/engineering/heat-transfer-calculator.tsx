"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "heat-transfer-calc",
  title: "Heat Transfer Rate, Conduction, Convection & Radiation Calculator",
  presets: [
    { label: "Insulated Wall Conduction (Fiberglass R-13, 15m², ΔT=25°C)", values: { mode: "conduction", areaM2: 15, tempHot: 22, tempCold: -3, thermalK: 0.038, thicknessMm: 100, convH: 15, emissivity: 0.85 } },
    { label: "Electronic Heatsink Convection (CPU Cooler, 0.08m², ΔT=35°C)", values: { mode: "convection", areaM2: 0.08, tempHot: 65, tempCold: 30, thermalK: 205, thicknessMm: 5, convH: 45, emissivity: 0.85 } },
    { label: "High-Temp Radiative Furnace (Refractory Brick, 4m², 700°C)", values: { mode: "radiation", areaM2: 4, tempHot: 700, tempCold: 25, thermalK: 1.2, thicknessMm: 150, convH: 15, emissivity: 0.88 } },
    { label: "Double-Glazed Window Glass (4m², ΔT=20°C)", values: { mode: "conduction", areaM2: 4, tempHot: 21, tempCold: 1, thermalK: 0.026, thicknessMm: 24, convH: 10, emissivity: 0.84 } },
    { label: "Bare Steam Pipe Bare Steel (Convection + Conduction)", values: { mode: "convection", areaM2: 2.5, tempHot: 140, tempCold: 20, thermalK: 50, thicknessMm: 4, convH: 25, emissivity: 0.80 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Thermodynamic Heat Transfer Mode",
      default: "conduction",
      options: [
        { value: "conduction", label: "Conduction (Fourier's Law: Solids / Insulation / Slabs)" },
        { value: "convection", label: "Convection (Newton's Cooling: Fluids / Air Flow / Heatsinks)" },
        { value: "radiation", label: "Radiation (Stefan-Boltzmann: Infrared Thermal Emission)" },
      ],
    },
    {
      kind: "number",
      key: "areaM2",
      label: "Heat Transfer Surface Area A (m²)",
      default: 15,
      min: 0.001,
      max: 100000,
      hint: "Exposed contact surface area in square meters (15 m² ≈ 161.5 sq ft)",
    },
    {
      kind: "number",
      key: "tempHot",
      label: "Hot Surface / Fluid Temperature T_hot (°C)",
      default: 22,
      min: -273.15,
      max: 5000,
      hint: "Higher temperature source in degrees Celsius",
    },
    {
      kind: "number",
      key: "tempCold",
      label: "Cold Surface / Fluid Temperature T_cold (°C)",
      default: -3,
      min: -273.15,
      max: 5000,
      hint: "Lower ambient or sink temperature in degrees Celsius",
    },
    {
      kind: "number",
      key: "thermalK",
      label: "Thermal Conductivity k (W/m·K) [Conduction]",
      default: 0.038,
      min: 0.001,
      max: 5000,
      hint: "Material property: 0.038 for Fiberglass, 0.8 for Concrete, 50 for Steel, 205 for Aluminum",
    },
    {
      kind: "number",
      key: "thicknessMm",
      label: "Layer Thickness / Wall Depth (mm) [Conduction]",
      default: 100,
      min: 0.1,
      max: 10000,
      hint: "Material barrier depth in millimeters (e.g. 100 mm = 0.10 m)",
    },
    {
      kind: "number",
      key: "convH",
      label: "Convective Coefficient h (W/m²·K) [Convection]",
      default: 15,
      min: 0.1,
      max: 100000,
      hint: "Heat transfer coeff: 5–25 for Still Air, 25–250 for Forced Air, 500–10,000 for Water Flow",
    },
    {
      kind: "number",
      key: "emissivity",
      label: "Surface Emissivity ε (0.01 to 1.0) [Radiation]",
      default: 0.85,
      min: 0.01,
      max: 1.0,
      hint: "Surface radiative property: 0.04 for Polished Aluminum, 0.85 for Brick, 0.95 for Matte Black Paint",
    },
  ],
  compute(values) {
    const mode = String(values.mode || "conduction");
    const A = Number(values.areaM2);
    const Th = Number(values.tempHot);
    const Tc = Number(values.tempCold);
    const k = Number(values.thermalK);
    const tMm = Number(values.thicknessMm);
    const h = Number(values.convH);
    const eps = Number(values.emissivity) || 0.85;

    if (isNaN(A) || A <= 0) return { error: "Please enter a valid surface area." };
    if (Th < Tc) return { error: "Hot temperature must be greater than or equal to cold temperature." };

    const deltaT = Th - Tc;
    let Q_Watts = 0;
    let rValueMetric = 0; // m²·K / W
    let modeLabel = "";

    // Stefan-Boltzmann constant: sigma = 5.670374419e-8 W/(m²·K⁴)
    const sigma = 5.670374419e-8;

    if (mode === "conduction") {
      if (isNaN(tMm) || tMm <= 0) return { error: "Please enter a valid thickness for conduction." };
      if (isNaN(k) || k <= 0) return { error: "Please enter a valid thermal conductivity k." };
      const L_m = tMm / 1000;
      // Q = (k * A * deltaT) / L
      Q_Watts = (k * A * deltaT) / L_m;
      rValueMetric = L_m / k;
      modeLabel = "Fourier Conduction (Solid)";
    } else if (mode === "convection") {
      if (isNaN(h) || h <= 0) return { error: "Please enter a valid convection coefficient h." };
      // Q = h * A * deltaT
      Q_Watts = h * A * deltaT;
      rValueMetric = 1 / h;
      modeLabel = "Newton Convective Boundary";
    } else {
      // radiation
      // Temperatures must be converted to Kelvin
      const Th_K = Th + 273.15;
      const Tc_K = Tc + 273.15;
      // Q = eps * sigma * A * (Th^4 - Tc^4)
      Q_Watts = eps * sigma * A * (Math.pow(Th_K, 4) - Math.pow(Tc_K, 4));
      rValueMetric = deltaT / (Q_Watts / A || 1);
      modeLabel = "Stefan-Boltzmann Radiation";
    }

    const Q_BTUh = Q_Watts * 3.412142;
    const heatFlux_Wm2 = Q_Watts / A;
    const heatFlux_BTUhSqFt = heatFlux_Wm2 * 0.316998;

    // Imperial R-value conversion: 1 m²·K/W = 5.678263 h·ft²·°F/BTU
    const rValueImperial = rValueMetric * 5.678263;
    const uValueMetric = 1 / (rValueMetric || 0.0001);

    const steps = [
      `1. Thermal Driving Gradient: ΔT = ${Th}°C - ${Tc}°C = ${deltaT.toFixed(1)} K (${(deltaT * 1.8).toFixed(1)}°F difference)`,
      `2. Governing Equation (${modeLabel}): ${mode === "conduction" ? `Q = k·A·ΔT / L = (${k} × ${A} × ${deltaT.toFixed(1)}) ÷ ${(tMm / 1000).toFixed(3)}m` : mode === "convection" ? `Q = h·A·ΔT = ${h} × ${A} × ${deltaT.toFixed(1)}` : `Q = ε·σ·A·(T_h⁴ - T_c⁴) = ${eps} × 5.67×10⁻⁸ × ${A} × (${(Th + 273.15).toFixed(0)}⁴ - ${(Tc + 273.15).toFixed(0)}⁴)`}`,
      `3. Net Heat Transfer Rate: Q = ${Q_Watts >= 1000 ? `${(Q_Watts / 1000).toFixed(2)} kW` : `${Q_Watts.toFixed(1)} W`} (${Math.round(Q_BTUh).toLocaleString()} BTU/hr)`,
      `4. Surface Heat Flux: q″ = Q ÷ A = ${heatFlux_Wm2.toFixed(1)} W/m² (${heatFlux_BTUhSqFt.toFixed(1)} BTU/h·ft²)`,
      `5. Thermal Resistance: R-Value = R-${rValueImperial.toFixed(1)} (Imperial) | U-factor = ${uValueMetric.toFixed(3)} W/m²·K`,
    ];

    return {
      hero: {
        label: "Heat Transfer Rate (Q)",
        value: `${Q_Watts >= 1000 ? `${(Q_Watts / 1000).toFixed(2)} kW` : `${Q_Watts.toFixed(0)} W`}`,
        unit: `${Math.round(Q_BTUh).toLocaleString()} BTU/h`,
      },
      badge: {
        text: `R-${rValueImperial.toFixed(1)} Thermal Resistance`,
        tone: "good",
      },
      rows: [
        { label: "Net Heat Loss / Gain Rate", value: `${Q_Watts >= 1000 ? `${(Q_Watts / 1000).toFixed(2)} kW` : `${Q_Watts.toFixed(1)} Watts`}`, strong: true },
        { label: "Imperial Heat Capacity", value: `${Math.round(Q_BTUh).toLocaleString()} BTU/hr`, strong: true },
        { label: "Heat Flux (Intensity per Area)", value: `${heatFlux_Wm2.toFixed(1)} W/m² (${heatFlux_BTUhSqFt.toFixed(1)} BTU/h·ft²)`, strong: true },
        { label: "Imperial Thermal Resistance", value: `R-${rValueImperial.toFixed(2)} hr·ft²·°F/BTU` },
        { label: "Metric Overall U-Factor", value: `${uValueMetric.toFixed(3)} W/m²·K` },
        { label: "Temperature Differential", value: `ΔT = ${deltaT.toFixed(1)}°C (${(deltaT * 1.8).toFixed(1)}°F)` },
        { label: "Transfer Mechanism", value: modeLabel },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Heat Rate vs. Surface Flux Distribution",
        data: [
          { name: `Total Heat (W: ${Math.round(Q_Watts)})`, value: Math.max(1, Math.round(Q_Watts)), color: "#ef4444" },
          { name: `Heat Flux (W/m²: ${Math.round(heatFlux_Wm2)})`, value: Math.max(1, Math.round(heatFlux_Wm2)), color: "#f59e0b" },
        ],
      },
      note: {
        text: "Thermal insulation acts as a resistance barrier in series. In combined real-world systems (conduction + convection inside & outside), total thermal resistance equals R_total = 1/h_in + L/k + 1/h_out.",
        tone: "neutral",
      },
    };
  },
};

export default function HeatTransferCalculator() {
  return <CalcEngine config={config} />;
}
