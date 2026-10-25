"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "gear-ratio-calc",
  title: "Gear Ratio, Speed & Torque Multiplier Calculator",
  presets: [
    { label: "Industrial Speed Reducer (45T / 15T – 3.0:1)", values: { teethDrive: 15, teethDriven: 45, rpmIn: 1750, torqueIn: 25, efficiency: 95 } },
    { label: "Automotive Differential (41T / 10T – 4.10:1)", values: { teethDrive: 10, teethDriven: 41, rpmIn: 3000, torqueIn: 250, efficiency: 96 } },
    { label: "Bicycle High Sprint Gear (50T / 11T – 0.22:1 Overdrive)", values: { teethDrive: 50, teethDriven: 11, rpmIn: 90, torqueIn: 70, efficiency: 98 } },
    { label: "Bicycle Climbing Gear (34T / 34T – 1.0:1 Direct)", values: { teethDrive: 34, teethDriven: 34, rpmIn: 85, torqueIn: 80, efficiency: 98 } },
    { label: "Robotic Servo Actuator (80T / 16T – 5.0:1)", values: { teethDrive: 16, teethDriven: 80, rpmIn: 2400, torqueIn: 5, efficiency: 92 } },
  ],
  fields: [
    {
      kind: "number",
      key: "teethDrive",
      label: "Driver Gear Tooth Count (T₁ / Pinion)",
      default: 15,
      min: 1,
      max: 1000,
      hint: "Number of teeth on the input driving gear connected to the motor or crank",
    },
    {
      kind: "number",
      key: "teethDriven",
      label: "Driven Gear Tooth Count (T₂ / Output)",
      default: 45,
      min: 1,
      max: 1000,
      hint: "Number of teeth on the output driven gear connected to the wheel or load",
    },
    {
      kind: "number",
      key: "rpmIn",
      label: "Input Angular Velocity (RPM)",
      default: 1750,
      min: 0.1,
      max: 100000,
      hint: "Input motor or shaft rotational speed in revolutions per minute",
    },
    {
      kind: "number",
      key: "torqueIn",
      label: "Input Torque (N·m)",
      default: 25,
      min: 0.01,
      max: 100000,
      hint: "Input motor torque in Newton-meters (e.g., 25 N·m = 18.4 lb-ft)",
    },
    {
      kind: "number",
      key: "efficiency",
      label: "Mechanical Efficiency (%)",
      default: 95,
      min: 50,
      max: 100,
      hint: "Mesh efficiency accounting for friction (typically 95–98% for spur gears, 85–90% for worm drives)",
    },
  ],
  compute(values) {
    const T1 = Number(values.teethDrive);
    const T2 = Number(values.teethDriven);
    const n1 = Number(values.rpmIn);
    const tau1 = Number(values.torqueIn);
    const eff = Number(values.efficiency) || 95;

    if (isNaN(T1) || T1 <= 0 || isNaN(T2) || T2 <= 0) {
      return { error: "Please enter positive tooth counts for both gears." };
    }
    if (isNaN(n1) || n1 <= 0) return { error: "Please enter a valid input RPM." };
    if (isNaN(tau1) || tau1 <= 0) return { error: "Please enter a valid input torque." };

    // Gear Ratio R = T2 / T1
    const R = T2 / T1;
    // Output RPM: n2 = n1 / R
    const n2 = n1 / R;

    // Output Torque: tau2 = tau1 * R * (efficiency / 100)
    const tau2 = tau1 * R * (eff / 100);
    const tau2_lbft = tau2 * 0.737562;
    const tau1_lbft = tau1 * 0.737562;

    // Mechanical Power P = 2 * pi * N * tau / 60 (Watts)
    const P_in_kW = (2 * Math.PI * n1 * tau1) / 60000;
    const P_out_kW = (2 * Math.PI * n2 * tau2) / 60000;
    const P_out_HP = P_out_kW * 1.34102;

    let gearType = "Direct 1:1 Drive";
    let gearTone: "good" | "info" | "warn" = "info";

    if (R > 1.05) {
      gearType = "Speed Reduction / Torque Multiplier (Underdrive)";
      gearTone = "good";
    } else if (R < 0.95) {
      gearType = "Speed Multiplier / Overdrive (Torque Reduction)";
      gearTone = "warn";
    } else {
      gearType = "Direct Drive (1:1 Ratio)";
      gearTone = "info";
    }

    const steps = [
      `1. Exact Gear Ratio: R = T₂ ÷ T₁ = ${T2} ÷ ${T1} = ${R.toFixed(3)} : 1 (or 1 : ${(1 / R).toFixed(3)})`,
      `2. Output Rotational Velocity: N₂ = N₁ ÷ R = ${n1} RPM ÷ ${R.toFixed(3)} = ${n2.toFixed(1)} RPM`,
      `3. Output Shaft Torque: τ₂ = τ₁ × R × η = ${tau1} N·m × ${R.toFixed(3)} × ${(eff / 100).toFixed(2)} = ${tau2.toFixed(2)} N·m (${tau2_lbft.toFixed(1)} lb·ft)`,
      `4. Transmitted Mechanical Power: P = 2π·N·τ / 60 = ${P_out_kW.toFixed(2)} kW (${P_out_HP.toFixed(2)} HP) with ${eff}% efficiency`,
      `5. Transmission Regime: ${gearType}`,
    ];

    return {
      hero: {
        label: "Output Rotational Speed",
        value: `${n2.toFixed(1)} RPM`,
        unit: `Ratio ${R.toFixed(2)}:1`,
      },
      badge: {
        text: `${tau2.toFixed(1)} N·m Output Torque`,
        tone: gearTone,
      },
      rows: [
        { label: "Gear Ratio (T₂ / T₁)", value: `${R.toFixed(3)} : 1 (${T2}T to ${T1}T)`, strong: true },
        { label: "Output Shaft Velocity", value: `${n2.toFixed(2)} RPM (${(n1 / n2).toFixed(2)}x speed change)`, strong: true },
        { label: "Output Delivered Torque", value: `${tau2.toFixed(2)} N·m (${tau2_lbft.toFixed(1)} lb·ft)`, strong: true },
        { label: "Input Motor Torque", value: `${tau1.toFixed(2)} N·m (${tau1_lbft.toFixed(1)} lb·ft)` },
        { label: "Mechanical Power Out", value: `${P_out_kW.toFixed(2)} kW (${P_out_HP.toFixed(2)} HP)` },
        { label: "Drive Configuration", value: gearType },
        { label: "Transmission Efficiency", value: `${eff}% (${((1 - eff / 100) * P_in_kW * 1000).toFixed(0)} W thermal friction loss)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Input vs. Output Angular Velocity (RPM)",
        data: [
          { name: `Input Speed (${Math.round(n1)} RPM)`, value: Math.max(0.1, n1), color: "#3b82f6" },
          { name: `Output Speed (${Math.round(n2)} RPM)`, value: Math.max(0.1, n2), color: "#10b981" },
        ],
      },
      note: {
        text: "The law of conservation of energy dictates that torque and speed trade off inversely: an increase in output torque results in a proportional reduction in shaft RPM, less mechanical friction.",
        tone: "neutral",
      },
    };
  },
};

export default function GearRatioCalculator() {
  return <CalcEngine config={config} />;
}
