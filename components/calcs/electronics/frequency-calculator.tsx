"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const frequencyConfig: CalcConfig = {
  id: "frequency-calculator",
  title: "RF Frequency, Wave Period, Wavelength & Antenna Length Calculator",
  fields: [
    { kind: "number", key: "frequency", label: "Frequency (MHz)", default: 100, min: 0.001, max: 100000 },
    { kind: "number", key: "velocityFactor", label: "Conductor Velocity Factor (%)", default: 95, min: 50, max: 100 },
  ],
  presets: [
    { label: "FM Radio Broadcast (100 MHz)", values: { frequency: 100, velocityFactor: 95 } },
    { label: "Wi-Fi 2.4 GHz Band (2400 MHz)", values: { frequency: 2400, velocityFactor: 95 } },
    { label: "5G Mid-Band Spectrum (3500 MHz)", values: { frequency: 3500, velocityFactor: 95 } },
    { label: "Aircraft Emergency Guard (121.5 MHz)", values: { frequency: 121.5, velocityFactor: 95 } },
  ],
  compute: (vals) => {
    const fMhz = Math.max(0.0001, Number(vals.frequency) || 100);
    const vf = Math.min(100, Math.max(50, Number(vals.velocityFactor) || 95)) / 100;

    const fHz = fMhz * 1000000;
    const periodSeconds = 1 / fHz;
    const periodNanoseconds = periodSeconds * 1000000000;
    const c = 299792458; // m/s in vacuum
    const wavelengthMeters = (c * vf) / fHz;
    const quarterWaveCm = (wavelengthMeters / 4) * 100;
    const quarterWaveInches = quarterWaveCm / 2.54;
    const angularFreq = 2 * Math.PI * fHz;

    return {
      hero: {
        label: "Free-Space Wavelength (λ)",
        value: wavelengthMeters >= 1 ? `${wavelengthMeters.toFixed(3)} m` : `${(wavelengthMeters * 100).toFixed(2)} cm`,
      },
      badge: {
        text: `Quarter-Wave (λ/4) Element: ${quarterWaveCm.toFixed(1)} cm (${quarterWaveInches.toFixed(1)} in)`,
        tone: "good",
      },
      rows: [
        { label: "Operating Frequency", value: `${fMhz.toLocaleString()} MHz (${(fHz/1000).toLocaleString()} kHz)` },
        { label: "Wave Period (T)", value: `${periodNanoseconds.toFixed(3)} ns` },
        { label: "Full Wavelength (λ)", value: `${wavelengthMeters.toFixed(4)} m`, strong: true },
        { label: "Quarter-Wave Monopole Length", value: `${quarterWaveCm.toFixed(2)} cm (${quarterWaveInches.toFixed(2)} in)` },
        { label: "Half-Wave Dipole Antenna Length", value: `${(quarterWaveCm * 2).toFixed(2)} cm` },
        { label: "Angular Frequency (ω)", value: `${(angularFreq / 1000000).toFixed(2)} Mrad/s` },
      ],
      steps: [
        `Wave Period (T) = 1 / Frequency = 1 / (${fMhz} × 10⁶ Hz) = ${periodNanoseconds.toFixed(3)} ns`,
        `Full Wavelength (λ) = (c × VF) / f = (299,792,458 × ${vf.toFixed(2)}) / (${fMhz} × 10⁶) = ${wavelengthMeters.toFixed(4)} m`,
        `Quarter-Wave Antenna Element = λ / 4 = ${(wavelengthMeters / 4).toFixed(4)} m = ${quarterWaveCm.toFixed(2)} cm`,
      ],
      chart: {
        type: "donut",
        title: "Quarter-Wave Antenna vs Full Wave Cycle",
        format: "pct",
        data: [
          { name: "Quarter-Wave Radiator (λ/4)", value: 25, color: "#10b981" },
          { name: "Remaining Wave Cycle", value: 75, color: "#6366f1" },
        ],
      },
    };
  },
};

export default function FrequencyCalculatorComponent() {
  return <CalcEngine config={frequencyConfig} />;
}
