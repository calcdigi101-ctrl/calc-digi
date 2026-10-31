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

interface ClimateZone {
  zone: string;
  name: string;
  cityExample: string;
  coolingBtuSqFt: number;
  heatingBtuSqFt: number;
  home2000CoolingTons: number;
  home2000HeatingKw: number;
  summerDesignTempF: number;
  winterDesignTempF: number;
  climateProfile: string;
}

const ZONES_DATA: ClimateZone[] = [
  {
    zone: 'Zone 1',
    name: 'Zone 1: Very Hot & Humid',
    cityExample: 'Miami, FL / Honolulu, HI',
    coolingBtuSqFt: 34,
    heatingBtuSqFt: 10,
    home2000CoolingTons: 5.0,
    home2000HeatingKw: 5.9,
    summerDesignTempF: 92,
    winterDesignTempF: 48,
    climateProfile: 'Tropical maritime; continuous cooling demand year-round with high latent dehumidification.',
  },
  {
    zone: 'Zone 2',
    name: 'Zone 2: Hot & Arid / Humid',
    cityExample: 'Phoenix, AZ / Houston, TX',
    coolingBtuSqFt: 30,
    heatingBtuSqFt: 18,
    home2000CoolingTons: 4.5,
    home2000HeatingKw: 10.5,
    summerDesignTempF: 108,
    winterDesignTempF: 34,
    climateProfile: 'Extreme peak summer dry-bulb temperatures exceeding 105°F; heavy afternoon sensible heat loads.',
  },
  {
    zone: 'Zone 3',
    name: 'Zone 3: Warm / Mild Winter',
    cityExample: 'Atlanta, GA / Dallas, TX',
    coolingBtuSqFt: 27,
    heatingBtuSqFt: 26,
    home2000CoolingTons: 4.0,
    home2000HeatingKw: 15.2,
    summerDesignTempF: 95,
    winterDesignTempF: 22,
    climateProfile: 'Balanced humid subtropical; substantial summer air conditioning with moderate winter heating.',
  },
  {
    zone: 'Zone 4',
    name: 'Zone 4: Moderate Temperate',
    cityExample: 'St. Louis, MO / Washington DC',
    coolingBtuSqFt: 23,
    heatingBtuSqFt: 36,
    home2000CoolingTons: 3.5,
    home2000HeatingKw: 21.1,
    summerDesignTempF: 93,
    winterDesignTempF: 10,
    climateProfile: 'Four distinct seasons; balanced cooling and heating capacities; ideal for cold-climate heat pumps.',
  },
  {
    zone: 'Zone 5',
    name: 'Zone 5: Cold Winter',
    cityExample: 'Denver, CO / Boston, MA',
    coolingBtuSqFt: 19,
    heatingBtuSqFt: 46,
    home2000CoolingTons: 3.0,
    home2000HeatingKw: 27.0,
    summerDesignTempF: 90,
    winterDesignTempF: -2,
    climateProfile: 'Heating dominated; freezing winter design conditions with moderate summer cooling requirements.',
  },
  {
    zone: 'Zone 6',
    name: 'Zone 6: Very Cold',
    cityExample: 'Chicago, IL / Minneapolis, MN',
    coolingBtuSqFt: 16,
    heatingBtuSqFt: 58,
    home2000CoolingTons: 2.5,
    home2000HeatingKw: 34.0,
    summerDesignTempF: 89,
    winterDesignTempF: -15,
    climateProfile: 'Severe sub-zero winter blasts; high-capacity multi-stage furnaces or dual-fuel systems required.',
  },
];

export function HvacCoolingCapacityZoneChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedZone, setSelectedZone] = useState('Zone 4');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = ZONES_DATA.find((z) => z.zone === selectedZone) || ZONES_DATA[3];

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
            HVAC Thermal Intensity Across ASHRAE Climate Zones
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cooling vs. Heating load requirements in BTU/h per square foot of floor space (Manual J)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-300">
          ACCA Manual J &amp; ASHRAE 90.1
        </span>
      </div>

      {/* Zone Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ZONES_DATA.map((z) => (
          <button
            key={z.zone}
            type="button"
            onClick={() => setSelectedZone(z.zone)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedZone === z.zone
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {z.zone}
          </button>
        ))}
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ZONES_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="zone" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" BTU" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as ClimateZone;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-slate-500 dark:text-slate-400">{d.cityExample}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Cooling: {d.coolingBtuSqFt} BTU/sq ft ({d.home2000CoolingTons} Tons for 2,000 sq ft)
                      </p>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold">
                        Heating: {d.heatingBtuSqFt} BTU/sq ft ({d.home2000HeatingKw.toFixed(1)} kW)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Design Temps: {d.summerDesignTempF}°F Summer / {d.winterDesignTempF}°F Winter
                      </p>
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
            <Bar dataKey="coolingBtuSqFt" name="Cooling Load (BTU/sq ft)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="heatingBtuSqFt" name="Heating Load (BTU/sq ft)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Zone Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Cooling for 2,000 sq ft</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.home2000CoolingTons} Tons ({active.coolingBtuSqFt * 2000} BTU/h)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Heating for 2,000 sq ft</p>
          <p className="mt-1 text-base font-bold text-amber-600 dark:text-amber-400">
            {active.home2000HeatingKw.toFixed(1)} kW ({active.heatingBtuSqFt * 2000} BTU/h)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Representative Cities</p>
          <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white break-words" title={active.cityExample}>
            {active.cityExample}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Design Temperatures</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.summerDesignTempF}°F / {active.winterDesignTempF}°F
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Regional Climate Profile:</strong> {active.climateProfile}
      </p>
    </div>
  );
}
