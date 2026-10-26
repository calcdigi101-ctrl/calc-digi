"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { band: "FM Radio (100 MHz)", wavelengthMeters: 3.0, quarterWaveCm: 75.0 },
  { band: "Aviation VHF (125 MHz)", wavelengthMeters: 2.4, quarterWaveCm: 60.0 },
  { band: "UHF Walkie (440 MHz)", wavelengthMeters: 0.68, quarterWaveCm: 17.0 },
  { band: "Cellular 4G (850 MHz)", wavelengthMeters: 0.35, quarterWaveCm: 8.8 },
  { band: "Wi-Fi (2400 MHz)", wavelengthMeters: 0.125, quarterWaveCm: 3.1 },
];

export function FrequencyWavelengthAntennaSpectrumChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        RF Wavelength & Quarter-Wave Antenna Element Sizing (cm)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Physical dimensions of resonant quarter-wave monopole antenna elements across commercial frequency bands.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="band" />
            <YAxis label={{ value: "Length (cm)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="quarterWaveCm" name="Quarter-Wave Element (cm)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
