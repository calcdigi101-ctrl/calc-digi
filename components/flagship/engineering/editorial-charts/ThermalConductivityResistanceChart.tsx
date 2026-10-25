'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ThermalMaterial {
  name: string;
  category: string;
  conductivityK: number; // W/m·K
  rValuePer100mm: number; // Imperial R per 100mm
  heatFluxAt20cDelta: number; // W/m² for 100mm at ΔT=20°C
  application: string;
}

const MATERIALS: ThermalMaterial[] = [
  {
    name: 'Aerogel Blanket',
    category: 'Super-Insulation',
    conductivityK: 0.015,
    rValuePer100mm: 37.8,
    heatFluxAt20cDelta: 3.0,
    application: 'Cryogenic pipe insulation, aerospace spacecraft thermal shields, sub-zero logistics.',
  },
  {
    name: 'Polyurethane Foam',
    category: 'Rigid Foam Board',
    conductivityK: 0.024,
    rValuePer100mm: 23.6,
    heatFluxAt20cDelta: 4.8,
    application: 'Commercial roof insulation, cold storage refrigeration panels, spray foam envelope.',
  },
  {
    name: 'Fiberglass Batt',
    category: 'Building Insulation',
    conductivityK: 0.038,
    rValuePer100mm: 14.9,
    heatFluxAt20cDelta: 7.6,
    application: 'Standard residential stud wall cavities, attic insulation blankets.',
  },
  {
    name: 'Structural Timber',
    category: 'Construction Wood',
    conductivityK: 0.13,
    rValuePer100mm: 4.4,
    heatFluxAt20cDelta: 26.0,
    application: 'Douglas fir framing lumber, mass timber CLT floor slabs, architectural posts.',
  },
  {
    name: 'Dense Concrete',
    category: 'Mineral Structural',
    conductivityK: 1.4,
    rValuePer100mm: 0.4,
    heatFluxAt20cDelta: 280.0,
    application: 'Foundation stem walls, precast facade panels (acts as thermal bridge without insulation).',
  },
  {
    name: 'Carbon Steel',
    category: 'Structural Metal',
    conductivityK: 50.0,
    rValuePer100mm: 0.01,
    heatFluxAt20cDelta: 10000.0,
    application: 'Steam piping, structural beams, boiler heat exchanger firetubes.',
  },
  {
    name: 'Aluminum 6061',
    category: 'High-Conduction Metal',
    conductivityK: 205.0,
    rValuePer100mm: 0.003,
    heatFluxAt20cDelta: 41000.0,
    application: 'Electronic heatsinks, CPU cooling fin stacks, automotive radiators.',
  },
  {
    name: 'Pure Copper',
    category: 'Maximum Conductor',
    conductivityK: 398.0,
    rValuePer100mm: 0.001,
    heatFluxAt20cDelta: 79600.0,
    application: 'Heat pipes, high-performance vapor chambers, heat exchanger tubes.',
  },
];

export function ThermalConductivityResistanceChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedName, setSelectedName] = useState('Fiberglass Batt');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = MATERIALS.find((m) => m.name === selectedName) || MATERIALS[2];

  if (!mounted) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-64 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/50" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Material Thermal Conductivity &amp; Insulating Resistance Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Thermal conductivity k (W/m·K) vs. Imperial R-value per 100mm thickness across materials
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-950/40 dark:text-red-300">
          ASTM C177 &amp; ISO 10456
        </span>
      </div>

      {/* Material Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {MATERIALS.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setSelectedName(m.name)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedName === m.name
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Recharts Bar Chart (Showing R-value per 100mm) */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MATERIALS.slice(0, 5)} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis unit=" R" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as ThermalMaterial;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        Thermal Resistance: R-{d.rValuePer100mm.toFixed(1)} per 100mm
                      </p>
                      <p className="text-blue-600 dark:text-blue-400">
                        Conductivity (k): {d.conductivityK} W/m·K
                      </p>
                      <p className="text-slate-500">
                        Heat Loss (ΔT=20°C): {d.heatFluxAt20cDelta} W/m²
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="rValuePer100mm" name="Thermal Resistance (R per 100mm)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Material Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Conductivity (k)</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.conductivityK} W/m·K
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">R-Value per 100mm</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            R-{active.rValuePer100mm.toFixed(1)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Heat Flux (ΔT=20°C)</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.heatFluxAt20cDelta >= 1000 ? `${(active.heatFluxAt20cDelta / 1000).toFixed(1)} kW/m²` : `${active.heatFluxAt20cDelta.toFixed(1)} W/m²`}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Material Category</p>
          <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white truncate" title={active.category}>
            {active.category}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Typical Engineering Application:</strong> {active.application}
      </p>
    </div>
  );
}
