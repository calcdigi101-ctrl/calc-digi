"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "pump-power-calc",
  title: "Pump Power, Hydraulic Head & Operating Cost Calculator",
  presets: [
    { label: "Commercial Building Booster Pump (15 L/s @ 45m Head)", values: { flowLps: 15, headM: 45, pumpEff: 75, motorEff: 92, sg: 1.0, powerCost: 0.15 } },
    { label: "Agricultural Irrigation Deep Well (40 L/s @ 70m Head)", values: { flowLps: 40, headM: 70, pumpEff: 78, motorEff: 93, sg: 1.0, powerCost: 0.12 } },
    { label: "Municipal Wastewater Lift Station (25 L/s @ 16m Head)", values: { flowLps: 25, headM: 16, pumpEff: 68, motorEff: 90, sg: 1.05, powerCost: 0.14 } },
    { label: "HVAC Hydronic Chilled Water Loop (30 L/s @ 22m Head)", values: { flowLps: 30, headM: 22, pumpEff: 80, motorEff: 94, sg: 1.0, powerCost: 0.16 } },
    { label: "Boiler Feed High-Pressure Pump (6 L/s @ 120m Head)", values: { flowLps: 6, headM: 120, pumpEff: 72, motorEff: 91, sg: 0.98, powerCost: 0.15 } },
  ],
  fields: [
    {
      kind: "number",
      key: "flowLps",
      label: "Volumetric Discharge Flow Rate (L/s)",
      default: 15,
      min: 0.1,
      max: 10000,
      hint: "Pump volumetric capacity in liters per second (15 L/s = 54 m³/h = 237.8 GPM)",
    },
    {
      kind: "number",
      key: "headM",
      label: "Total Dynamic Head – TDH (meters)",
      default: 45,
      min: 1,
      max: 2000,
      hint: "Total head: static elevation lift + friction pipe losses + pressure head (45m ≈ 64 psi)",
    },
    {
      kind: "number",
      key: "pumpEff",
      label: "Pump Hydraulic Efficiency (%)",
      default: 75,
      min: 20,
      max: 95,
      hint: "Impeller and casing hydraulic efficiency (typically 70–82% for centrifugal pumps)",
    },
    {
      kind: "number",
      key: "motorEff",
      label: "Electric Motor Efficiency (%)",
      default: 92,
      min: 50,
      max: 98,
      hint: "Premium efficiency NEMA/IE3 induction motor efficiency (typically 90–95%)",
    },
    {
      kind: "number",
      key: "sg",
      label: "Fluid Specific Gravity (Water = 1.0)",
      default: 1.0,
      min: 0.5,
      max: 3.0,
      hint: "Relative density compared to pure water (1.0 for fresh water, 1.03 for seawater)",
    },
    {
      kind: "number",
      key: "powerCost",
      label: "Electricity Utility Tariff ($/kWh)",
      default: 0.15,
      min: 0.01,
      max: 2.0,
      hint: "Commercial electric rate per kilowatt-hour for annual lifecycle cost",
    },
  ],
  compute(values) {
    const Q_Lps = Number(values.flowLps);
    const H = Number(values.headM);
    const pumpEffPct = Number(values.pumpEff) || 75;
    const motorEffPct = Number(values.motorEff) || 92;
    const sg = Number(values.sg) || 1.0;
    const costKWh = Number(values.powerCost) || 0.15;

    if (isNaN(Q_Lps) || Q_Lps <= 0) return { error: "Please enter a valid flow rate." };
    if (isNaN(H) || H <= 0) return { error: "Please enter a valid total dynamic head." };

    const g = 9.80665;
    const rho = 1000 * sg; // kg/m³
    const Q_m3s = Q_Lps / 1000;
    const Q_m3h = Q_Lps * 3.6;
    const Q_gpm = Q_Lps * 15.8503;
    const H_ft = H * 3.28084;
    const pressurePsi = (H * sg * 1.42233);

    // 1. Hydraulic Water Power: P_hyd = rho * g * Q * H (Watts)
    const P_hyd_W = rho * g * Q_m3s * H;
    const P_hyd_kW = P_hyd_W / 1000;
    const WHP = P_hyd_kW * 1.34102; // Water Horsepower

    // 2. Shaft Brake Power: P_shaft = P_hyd / eta_pump (Watts)
    const eta_pump = pumpEffPct / 100;
    const P_shaft_kW = P_hyd_kW / eta_pump;
    const BHP = P_shaft_kW * 1.34102; // Brake Horsepower

    // 3. Electrical Motor Input Power: P_elec = P_shaft / eta_motor (Watts)
    const eta_motor = motorEffPct / 100;
    const P_elec_kW = P_shaft_kW / eta_motor;

    // Standard motor sizing selection (HP ratings: 1, 1.5, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150)
    const standardMotorsHP = [1, 1.5, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250];
    const recommendedMotorHP = standardMotorsHP.find((hp) => hp >= BHP * 1.15) || Math.ceil(BHP * 1.2);

    // Annual Operating Cost (assuming 16 hours/day, 365 days)
    const dailyKWh = P_elec_kW * 16;
    const annualKWh = dailyKWh * 365;
    const annualEnergyCost = annualKWh * costKWh;

    const steps = [
      `1. Volumetric Discharge: ${Q_Lps} L/s = ${Q_m3h.toFixed(1)} m³/h = ${Q_gpm.toFixed(1)} GPM (Total Head = ${H} m / ${H_ft.toFixed(1)} ft)`,
      `2. Hydraulic Fluid Power (Water HP): P_hyd = (ρ·g·Q·H) ÷ 1000 = (1000 × 9.81 × ${Q_m3s.toFixed(3)} × ${H}) ÷ 1000 = ${P_hyd_kW.toFixed(2)} kW (${WHP.toFixed(2)} WHP)`,
      `3. Shaft Brake Horsepower: P_shaft = P_hyd ÷ η_pump = ${P_hyd_kW.toFixed(2)} kW ÷ ${(eta_pump).toFixed(2)} = ${P_shaft_kW.toFixed(2)} kW (${BHP.toFixed(2)} BHP)`,
      `4. Electrical Power Consumption: P_elec = P_shaft ÷ η_motor = ${P_shaft_kW.toFixed(2)} kW ÷ ${(eta_motor).toFixed(2)} = ${P_elec_kW.toFixed(2)} kW`,
      `5. Recommended Motor Size (+15% service factor): ${recommendedMotorHP} HP Induction Motor | Annual Cost (16h/day @ $${costKWh}/kWh): $${Math.round(annualEnergyCost).toLocaleString()}/year`,
    ];

    return {
      hero: {
        label: "Brake Shaft Power (BHP)",
        value: `${BHP.toFixed(1)} HP`,
        unit: `${P_shaft_kW.toFixed(1)} kW Shaft`,
      },
      badge: {
        text: `Install ${recommendedMotorHP} HP Motor (${P_elec_kW.toFixed(1)} kW Input)`,
        tone: "good",
      },
      rows: [
        { label: "Brake Shaft Horsepower (BHP)", value: `${BHP.toFixed(2)} HP (${P_shaft_kW.toFixed(2)} kW)`, strong: true },
        { label: "Nominal Motor Specification", value: `${recommendedMotorHP} HP (NEMA Premium / IE3)`, strong: true },
        { label: "Hydraulic Fluid Power (WHP)", value: `${WHP.toFixed(2)} WHP (${P_hyd_kW.toFixed(2)} kW water power)`, strong: true },
        { label: "Electrical Power Draw", value: `${P_elec_kW.toFixed(2)} kW input (${(P_elec_kW * 1.341).toFixed(2)} kVA)` },
        { label: "Discharge Capacity", value: `${Q_Lps} L/s (${Q_m3h.toFixed(1)} m³/hr | ${Q_gpm.toFixed(1)} GPM)` },
        { label: "Total Dynamic Head (TDH)", value: `${H} meters (${H_ft.toFixed(1)} ft | ${pressurePsi.toFixed(1)} psi)` },
        { label: "Estimated Annual Operating Cost", value: `$${Math.round(annualEnergyCost).toLocaleString()} / year (16h/day)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Pump Power Transmission Efficiency Losses (kW)",
        data: [
          { name: `Useful Hydraulic Power (${P_hyd_kW.toFixed(1)} kW)`, value: Math.max(0.1, P_hyd_kW), color: "#10b981" },
          { name: `Pump Hydraulic Friction Loss (${(P_shaft_kW - P_hyd_kW).toFixed(1)} kW)`, value: Math.max(0.1, P_shaft_kW - P_hyd_kW), color: "#f59e0b" },
          { name: `Motor Electrical Heat Loss (${(P_elec_kW - P_shaft_kW).toFixed(1)} kW)`, value: Math.max(0.1, P_elec_kW - P_shaft_kW), color: "#ef4444" },
        ],
      },
      note: {
        text: "Calculated based on standard affinity laws. Always select a motor rating with a minimum 15% to 20% service margin above calculated BHP to prevent overload during end-of-curve operation.",
        tone: "neutral",
      },
    };
  },
};

export default function PumpCalculator() {
  return <CalcEngine config={config} />;
}
