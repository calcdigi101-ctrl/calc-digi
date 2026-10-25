'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const EM_SPECTRUM_DATA = [
  { band: 'AM Radio (1 MHz)', logFreqHz: 6, wavelengthM: 300.0, photonEV: 4.14e-9 },
  { band: 'FM Radio (100 MHz)', logFreqHz: 8, wavelengthM: 3.0, photonEV: 4.14e-7 },
  { band: 'Wi-Fi / 5G (2.4 GHz)', logFreqHz: 9.38, wavelengthM: 0.125, photonEV: 9.93e-6 },
  { band: 'Infrared (30 THz)', logFreqHz: 13.48, wavelengthM: 1e-5, photonEV: 0.124 },
  { band: 'Visible Green (560 THz)', logFreqHz: 14.75, wavelengthM: 5.35e-7, photonEV: 2.32 },
  { band: 'Ultraviolet (1.5 PHz)', logFreqHz: 15.18, wavelengthM: 2e-7, photonEV: 6.20 },
  { band: 'Medical X-Ray (30 EHz)', logFreqHz: 19.48, wavelengthM: 1e-11, photonEV: 124000.0 },
];

export function ElectromagneticSpectrumWavelengthChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Electromagnetic Spectrum Frequency Log Scale (Hz) vs Quantum Photon Energy (eV)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Wavelength and frequency are inversely proportional (c = f·λ), with photon energy scaling directly via Planck's constant (E = h·f).
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={EM_SPECTRUM_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="band" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
            <YAxis tick={{ fontSize: 11 }} label={{ value: 'Log₁₀(Frequency in Hz)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.band}</p>
                      <p className="mt-1 text-purple-600 dark:text-purple-400">Log Frequency: 10^{data.logFreqHz} Hz</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Wavelength: {data.wavelengthM} m</p>
                      <p className="text-slate-500">Photon Energy: {data.photonEV} eV</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar dataKey="logFreqHz" name="Log₁₀ Frequency (Hz)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
