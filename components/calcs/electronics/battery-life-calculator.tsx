"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const batteryLifeConfig: CalcConfig = {
  id: "battery-life-calculator",
  title: "Battery Runtime, Capacity (mAh) & Current Draw Calculator",
  fields: [
    { kind: "number", key: "capacity", label: "Battery Capacity (mAh)", default: 3000, min: 1, max: 1000000 },
    { kind: "number", key: "currentDraw", label: "Device Current Consumption (mA)", default: 150, min: 0.1, max: 100000 },
    { kind: "number", key: "efficiency", label: "Discharge Efficiency (%)", default: 85, min: 50, max: 100 },
    { kind: "number", key: "voltage", label: "Cell Nominal Voltage (V)", default: 3.7, min: 1, max: 100 },
  ],
  presets: [
    { label: "Smartphone (3,500 mAh @ 180 mA)", values: { capacity: 3500, currentDraw: 180, efficiency: 85, voltage: 3.7 } },
    { label: "IoT Sensor Node (2,400 mAh @ 2 mA)", values: { capacity: 2400, currentDraw: 2, efficiency: 90, voltage: 3.3 } },
    { label: "Drone LiPo Battery (5,000 mAh @ 15,000 mA)", values: { capacity: 5000, currentDraw: 15000, efficiency: 80, voltage: 14.8 } },
    { label: "Bluetooth Beacon (220 mAh CR2032 @ 0.05 mA)", values: { capacity: 220, currentDraw: 0.05, efficiency: 85, voltage: 3.0 } },
  ],
  compute: (vals) => {
    const cap = Math.max(1, Number(vals.capacity) || 3000);
    const draw = Math.max(0.001, Number(vals.currentDraw) || 150);
    const eff = Math.min(100, Math.max(50, Number(vals.efficiency) || 85));
    const volt = Math.max(0.5, Number(vals.voltage) || 3.7);

    const theoreticalHours = cap / draw;
    const effectiveHours = theoreticalHours * (eff / 100);
    const totalWattHours = (cap * volt) / 1000;
    const effectiveWattHours = totalWattHours * (eff / 100);

    const days = (effectiveHours / 24).toFixed(1);

    return {
      hero: {
        label: "Estimated Usable Runtime",
        value: effectiveHours >= 24 ? `${days} Days (${effectiveHours.toFixed(1)} hrs)` : `${effectiveHours.toFixed(1)} Hours`,
      },
      badge: {
        text: effectiveHours > 48 ? "Exceptional Multi-Day Autonomy" : "Standard Daily Recharge Cycle",
        tone: effectiveHours > 20 ? "good" : "warn",
      },
      rows: [
        { label: "Rated Nominal Capacity", value: `${cap.toLocaleString()} mAh` },
        { label: "Device Average Current Draw", value: `${draw.toLocaleString()} mA` },
        { label: "Theoretical Maximum Runtime", value: `${theoreticalHours.toFixed(1)} Hours` },
        { label: "Effective Operating Runtime", value: `${effectiveHours.toFixed(1)} Hours`, strong: true },
        { label: "Stored Energy (Watt-Hours)", value: `${totalWattHours.toFixed(2)} Wh` },
        { label: "Usable Delivered Energy", value: `${effectiveWattHours.toFixed(2)} Wh` },
      ],
      steps: [
        `Theoretical Runtime = Capacity / Current = ${cap} mAh / ${draw} mA = ${theoreticalHours.toFixed(1)} Hours`,
        `Effective Usable Runtime = ${theoreticalHours.toFixed(1)} × (${eff}% / 100) = ${effectiveHours.toFixed(1)} Hours`,
        `Battery Energy Storage = (${cap} mAh × ${volt} V) / 1000 = ${totalWattHours.toFixed(2)} Wh`,
      ],
      chart: {
        type: "donut",
        title: "Battery Usable Energy vs Dissipation Loss",
        format: "pct",
        data: [
          { name: "Usable Energy Delivery", value: Math.round(eff), color: "#10b981" },
          { name: "Thermal & Chemistry Loss", value: Math.round(100 - eff), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function BatteryLifeCalculatorComponent() {
  return <CalcEngine config={batteryLifeConfig} />;
}
