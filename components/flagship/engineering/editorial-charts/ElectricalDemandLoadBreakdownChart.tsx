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

interface PropertyArchetype {
  id: string;
  name: string;
  panelAmps: number;
  totalDemandKw: number;
  calculatedAmps: number;
  wireGauge: string;
  hvacW: number;
  evW: number;
  waterHeaterW: number;
  kitchenW: number;
  lightingW: number;
  description: string;
}

const PROPERTIES: PropertyArchetype[] = [
  {
    id: 'studio60',
    name: 'Urban Apartment (60A)',
    panelAmps: 60,
    totalDemandKw: 11.5,
    calculatedAmps: 47.9,
    wireGauge: '#4 AWG Copper',
    hvacW: 2800,
    evW: 0,
    waterHeaterW: 3000,
    kitchenW: 3500,
    lightingW: 2200,
    description: 'Compact 1-bedroom flat with central gas heating and shared building services.',
  },
  {
    id: 'suburban100',
    name: 'Gas Heated Home (100A)',
    panelAmps: 100,
    totalDemandKw: 18.2,
    calculatedAmps: 75.8,
    wireGauge: '#4 AWG Copper',
    hvacW: 4500,
    evW: 0,
    waterHeaterW: 0,
    kitchenW: 7500,
    lightingW: 6200,
    description: 'Traditional suburban home with natural gas furnace, water heater, and 100A service.',
  },
  {
    id: 'electric200',
    name: 'All-Electric + EV (200A)',
    panelAmps: 200,
    totalDemandKw: 38.6,
    calculatedAmps: 160.8,
    wireGauge: '2/0 AWG Copper',
    hvacW: 9600,
    evW: 9600,
    waterHeaterW: 4500,
    kitchenW: 8500,
    lightingW: 6400,
    description: 'Modern 4-bedroom home with heat pump, Level 2 EV charger, and induction cooktop.',
  },
  {
    id: 'estate400',
    name: 'Luxury Estate (400A)',
    panelAmps: 400,
    totalDemandKw: 68.4,
    calculatedAmps: 285.0,
    wireGauge: '500 kcmil Copper',
    hvacW: 21000,
    evW: 19200,
    waterHeaterW: 9000,
    kitchenW: 11000,
    lightingW: 8200,
    description: 'Large residential estate with dual Level 2 EV chargers, pool equipment, and multi-zone HVAC.',
  },
];

export function ElectricalDemandLoadBreakdownChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('electric200');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = PROPERTIES.find((p) => p.id === selectedId) || PROPERTIES[2];

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
            Residential Electrical Demand Load Spectrum (NEC Article 220)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connected wattage distribution and required service entrance panel ratings (240V Single-Phase)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-300">
          NFPA 70 / NEC Standard
        </span>
      </div>

      {/* Property Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PROPERTIES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedId === p.id
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Stacked Bar Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PROPERTIES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis unit=" W" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as PropertyArchetype;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Service Panel: {d.panelAmps}A (Calculated: {d.calculatedAmps.toFixed(1)}A)
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">Total Demand: {d.totalDemandKw.toFixed(1)} kW</p>
                      <div className="mt-2 space-y-0.5 text-slate-500">
                        <p>• EV Charging: {d.evW.toLocaleString()} W</p>
                        <p>• HVAC Heating/Cooling: {d.hvacW.toLocaleString()} W</p>
                        <p>• Water Heater: {d.waterHeaterW.toLocaleString()} W</p>
                        <p>• Kitchen &amp; Laundry: {d.kitchenW.toLocaleString()} W</p>
                        <p>• General Lighting: {d.lightingW.toLocaleString()} W</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => <span className="text-slate-600 dark:text-slate-400">{value}</span>}
            />
            <Bar dataKey="evW" name="EV Charging" stackId="a" fill="#10b981" />
            <Bar dataKey="hvacW" name="HVAC Heat/Cool" stackId="a" fill="#3b82f6" />
            <Bar dataKey="waterHeaterW" name="Water Heater" stackId="a" fill="#f59e0b" />
            <Bar dataKey="kitchenW" name="Kitchen & Laundry" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="lightingW" name="General Lighting" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Property Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Main Service Panel</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.panelAmps} Amps
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Calculated Current Draw</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.calculatedAmps.toFixed(1)} A
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Factored Demand Load</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.totalDemandKw.toFixed(1)} kW
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Service Conductor</p>
          <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200 break-words" title={active.wireGauge}>
            {active.wireGauge}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Building Archetype Context:</strong> {active.description}
      </p>
    </div>
  );
}
