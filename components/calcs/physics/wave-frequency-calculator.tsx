'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "wave-frequency-calculator",
  title: "Wave Frequency & Wavelength Calculator",
  fields: [
    {
      kind: "number",
      key: "frequency",
      label: "Wave Frequency f (Hertz)",
      default: 2400000000,
      min: 0.000001,
      max: 1e25,
      hint: "Oscillations per second (2.4 GHz = 2,400,000,000 Hz Wi-Fi; 440 Hz = Concert A; 5.6 × 10¹⁴ Hz = Green Light)",
    },
    {
      kind: "number",
      key: "velocity",
      label: "Wave Propagation Velocity v (m/s)",
      default: 299792458,
      min: 0.1,
      max: 299792458,
      hint: "Speed of wave in medium (Light in vacuum = 299,792,458 m/s; Sound in air @ 20°C = 343 m/s)",
    },
  ],
  presets: [
    {
      label: "2.4 GHz Wi-Fi Microwave Signal",
      values: { frequency: 2400000000, velocity: 299792458 },
    },
    {
      label: "Green Laser Light (532 nm)",
      values: { frequency: 5.635e14, velocity: 299792458 },
    },
    {
      label: "Concert Pitch A4 Sound in Air (440 Hz)",
      values: { frequency: 440, velocity: 343 },
    },
  ],
  compute: (vals) => {
    const f = Math.max(0.000001, Number(vals.frequency) || 1);
    const v = Math.max(0.001, Number(vals.velocity) || 299792458);

    const lambdaMeters = v / f;
    const periodSeconds = 1 / f;
    const omegaRadS = 2 * Math.PI * f;
    const waveNumberK = (2 * Math.PI) / lambdaMeters;

    // Quantum photon energy E = h * f
    const hPlank = 6.62607015e-34; // J·s
    const energyJoules = hPlank * f;
    const energyEV = energyJoules / 1.602176634e-19;

    let lambdaDisplay = `${lambdaMeters.toFixed(3)} m`;
    if (lambdaMeters < 1e-6) {
      lambdaDisplay = `${(lambdaMeters * 1e9).toFixed(2)} nm`;
    } else if (lambdaMeters < 1e-3) {
      lambdaDisplay = `${(lambdaMeters * 1e6).toFixed(2)} µm`;
    } else if (lambdaMeters < 1) {
      lambdaDisplay = `${(lambdaMeters * 100).toFixed(2)} cm (${(lambdaMeters * 1000).toFixed(1)} mm)`;
    } else if (lambdaMeters >= 1000) {
      lambdaDisplay = `${(lambdaMeters / 1000).toFixed(2)} km`;
    }

    let freqDisplay = `${f.toLocaleString()} Hz`;
    if (f >= 1e12) freqDisplay = `${(f / 1e12).toFixed(2)} THz`;
    else if (f >= 1e9) freqDisplay = `${(f / 1e9).toFixed(2)} GHz`;
    else if (f >= 1e6) freqDisplay = `${(f / 1e6).toFixed(2)} MHz`;
    else if (f >= 1e3) freqDisplay = `${(f / 1e3).toFixed(2)} kHz`;

    return {
      hero: {
        value: lambdaDisplay,
        label: `Frequency: ${freqDisplay} | Period: ${periodSeconds.toExponential(3)} s | Photon: ${energyEV.toExponential(2)} eV`,
      },
      badge: {
        text: `λ = ${lambdaDisplay}`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Wave Cycle Temporal Symmetry (%)",
        data: [
          { name: "Positive Half-Cycle (50%)", value: 50, color: "#3b82f6" },
          { name: "Negative Half-Cycle (50%)", value: 50, color: "#10b981" },
        ],
        format: "pct",
      },
      rows: [
        { label: "Wavelength (λ = v/f)", value: lambdaDisplay },
        { label: "Wave Oscillation Period (T = 1/f)", value: `${periodSeconds.toExponential(4)} seconds` },
        { label: "Angular Frequency (ω = 2πf)", value: `${omegaRadS.toExponential(4)} rad/s` },
        { label: "Spatial Wave Number (k = 2π/λ)", value: `${waveNumberK.toExponential(4)} rad/m` },
        { label: "Quantum Photon Energy (E = hf)", value: `${energyEV.toExponential(3)} eV (${energyJoules.toExponential(3)} J)` },
        { label: "Propagation Wave Velocity (v)", value: `${v.toLocaleString()} m/s (${(v * 3.6).toExponential(3)} km/h)` },
      ],
      steps: [
        `Apply wave velocity equation: λ = v ÷ f = ${v.toLocaleString()} m/s ÷ ${f.toExponential(3)} Hz = ${lambdaDisplay}.`,
        `Calculate temporal wave period: T = 1 ÷ f = 1 ÷ ${f.toExponential(3)} = ${periodSeconds.toExponential(4)} seconds.`,
        `Compute angular frequency: ω = 2π × f = 2 × 3.14159 × ${f.toExponential(3)} = ${omegaRadS.toExponential(4)} rad/s.`,
        `Calculate photon quantum energy: E = h × f = 6.626×10⁻³⁴ × ${f.toExponential(3)} = ${energyEV.toExponential(3)} eV.`,
      ],
      note: { text: "Wavelength and frequency are inversely proportional: multiplying frequency by ten compresses wavelength to one-tenth of its original length." },
    };
  },
};

export default function WaveFrequencyCalculator() {
  return <CalcEngine config={config} />;
}
