"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const bikePaceConfig: CalcConfig = {
  id: "bike-pace-calculator",
  title: "Cycling Velocity, Aerodynamic Power, Pace and Mechanical Drag Calculator",
  fields: [
    {
      kind: "number",
      key: "distanceMiles",
      label: "Cycling Course Distance (Miles)",
      default: 20.0,
      min: 0.5,
      max: 500.0,
    },
    {
      kind: "number",
      key: "timeHours",
      label: "Elapsed Time - Hours",
      default: 1,
      min: 0,
      max: 48,
    },
    {
      kind: "number",
      key: "timeMinutes",
      label: "Elapsed Time - Minutes",
      default: 15,
      min: 0,
      max: 59,
    },
    {
      kind: "number",
      key: "riderWeightKg",
      label: "Combined Rider & Bicycle Mass (kg)",
      default: 80.0,
      min: 30.0,
      max: 200.0,
    },
    {
      kind: "choice",
      key: "roadGradient",
      label: "Course Elevation Profile / Road Incline",
      default: "flat",
      options: [
        { label: "Flat Course (0% Average Gradient)", value: "flat" },
        { label: "Rolling Terrain (2% Average Gradient)", value: "rolling" },
        { label: "Moderate Climb (4% Average Gradient)", value: "moderate" },
        { label: "Steep Mountain Pass (7% Average Gradient)", value: "steep" },
      ],
    },
  ],
  compute: (vals) => {
    const distMiles = Math.max(0.1, Number(vals.distanceMiles) || 20.0);
    const hrs = Number(vals.timeHours) || 0;
    const mins = Number(vals.timeMinutes) || 0;
    const totalHours = Math.max(0.01, hrs + mins / 60);
    const weightKg = Number(vals.riderWeightKg) || 80.0;
    const gradient = String(vals.roadGradient || "flat");

    const gradMap: Record<string, number> = {
      flat: 0.0,
      rolling: 0.02,
      moderate: 0.04,
      steep: 0.07,
    };
    const s = gradMap[gradient] || 0.0;

    // Velocity calculations
    const speedMph = distMiles / totalHours;
    const speedKmh = speedMph * 1.60934;
    const speedMs = speedKmh / 3.6;

    // Pace: minutes per mile
    const paceMinPerMile = (totalHours * 60) / distMiles;
    const paceMinPerKm = paceMinPerMile / 1.60934;
    const paceMinutes = Math.floor(paceMinPerMile);
    const paceSeconds = Math.round((paceMinPerMile - paceMinutes) * 60);
    const paceStr = `${paceMinutes}:${paceSeconds < 10 ? "0" : ""}${paceSeconds} min/mi`;

    // Cycling Physics Model:
    // Power = P_aero + P_rolling + P_gravity
    // P_aero = 0.5 * rho * CdA * v^3 (rho = 1.225, CdA ~ 0.32 m^2 for road cyclist)
    const rho = 1.225;
    const cdA = 0.32;
    const pAero = 0.5 * rho * cdA * Math.pow(speedMs, 3);

    // P_rolling = Crr * m * g * v (Crr ~ 0.005 for road tires)
    const crr = 0.005;
    const g = 9.80665;
    const pRolling = crr * weightKg * g * speedMs;

    // P_gravity = m * g * s * v
    const pGravity = weightKg * g * s * speedMs;

    // Mechanical Drivetrain loss ~ 3% (efficiency 97%)
    const mechanicalWatts = (pAero + pRolling + pGravity) / 0.97;

    // Metabolic energy expenditure: human gross mechanical efficiency ~ 23%
    // 1 Watt-second = 1 Joule. 1 kcal = 4,184 Joules.
    // kcal/hr = (Watts / 0.23) * 3600 / 4184 = Watts * 3.74
    const totalKcal = Math.round(mechanicalWatts * 3.74 * totalHours);

    return {
      hero: {
        label: "Average Cycling Speed",
        value: `${speedMph.toFixed(1)} mph (${speedKmh.toFixed(1)} km/h)`,
      },
      badge: {
        text: `Cycling Pace: ${paceStr} (~${Math.round(mechanicalWatts)} Watts)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Pace Per Kilometer",
          value: `${Math.floor(paceMinPerKm)}:${Math.round((paceMinPerKm % 1) * 60).toString().padStart(2, "0")} min/km`,
        },
        {
          label: "Estimated Mechanical Power Output",
          value: `${Math.round(mechanicalWatts)} Watts (${(mechanicalWatts / weightKg).toFixed(2)} W/kg)`,
        },
        {
          label: "Aerodynamic Drag Resistance Share",
          value: `${Math.round(pAero)} Watts (${Math.round((pAero / Math.max(1, pAero + pRolling + pGravity)) * 100)}%)`,
        },
        {
          label: "Total Metabolic Energy Expended",
          value: `${totalKcal.toLocaleString()} kcal (${Math.round(totalKcal / totalHours)} kcal/hr)`,
        },
      ],
      steps: [
        `Average Velocity = ${distMiles.toFixed(1)} miles / ${totalHours.toFixed(2)} hours = ${speedMph.toFixed(2)} mph (${speedKmh.toFixed(2)} km/h)`,
        `Aerodynamic Air Drag (0.5 * 1.225 * 0.32 * v^3) = ${pAero.toFixed(1)} Watts`,
        `Tire Rolling Friction Resistance (Crr 0.005 * m * g * v) = ${pRolling.toFixed(1)} Watts`,
        `Gravitational Elevation Climbing Power (m * g * s * v) = ${pGravity.toFixed(1)} Watts`,
        `Mechanical Power (97% drivetrain efficiency) = ${(mechanicalWatts).toFixed(1)} Watts (${(mechanicalWatts / weightKg).toFixed(2)} W/kg)`,
      ],
      chart: {
        type: "donut",
        title: "Mechanical Cycling Resistance Power Distribution",
        format: "num",
        data: [
          { name: "Aerodynamic Air Drag (Watts)", value: Math.max(1, Math.round(pAero)), color: "#0ea5e9" },
          { name: "Tire Rolling Resistance (Watts)", value: Math.max(1, Math.round(pRolling)), color: "#f59e0b" },
          { name: "Gravitational Climbing Work (Watts)", value: Math.max(0, Math.round(pGravity)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function BikePaceCalculatorComponent() {
  return <CalcEngine config={bikePaceConfig} />;
}
