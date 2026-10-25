'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SteelProfile {
  name: string;
  weightKgM: number;
  weightLbsFt: number;
  areaCm2: number;
  sectionModulusCm3: number;
  momentCapacityKNm: number;
  axial4mCapacityKN: number;
  depthMm: number;
  primaryRole: string;
}

const PROFILES: SteelProfile[] = [
  {
    name: 'W8×24',
    weightKgM: 35.7,
    weightLbsFt: 24,
    areaCm2: 45.5,
    sectionModulusCm3: 342,
    momentCapacityKNm: 118,
    axial4mCapacityKN: 480,
    depthMm: 201,
    primaryRole: 'Light residential floor beam, roof purlin girder, equipment base rail.',
  },
  {
    name: 'W8×31',
    weightKgM: 46.1,
    weightLbsFt: 31,
    areaCm2: 58.7,
    sectionModulusCm3: 449,
    momentCapacityKNm: 155,
    axial4mCapacityKN: 660,
    depthMm: 203,
    primaryRole: 'Standard commercial intermediate column and mezzanine floor beam.',
  },
  {
    name: 'W10×45',
    weightKgM: 67.0,
    weightLbsFt: 45,
    areaCm2: 85.2,
    sectionModulusCm3: 805,
    momentCapacityKNm: 278,
    axial4mCapacityKN: 1040,
    depthMm: 257,
    primaryRole: 'Multi-story office building column and medium-span transfer girder.',
  },
  {
    name: 'W12×50',
    weightKgM: 74.4,
    weightLbsFt: 50,
    areaCm2: 94.2,
    sectionModulusCm3: 1055,
    momentCapacityKNm: 364,
    axial4mCapacityKN: 1180,
    depthMm: 310,
    primaryRole: 'Heavy floor beam, open-span retail girder, building structural core column.',
  },
  {
    name: 'W14×68',
    weightKgM: 101.2,
    weightLbsFt: 68,
    areaCm2: 129.0,
    sectionModulusCm3: 1690,
    momentCapacityKNm: 583,
    axial4mCapacityKN: 1720,
    depthMm: 356,
    primaryRole: 'High-load commercial building primary moment frame column.',
  },
  {
    name: 'W16×77',
    weightKgM: 114.6,
    weightLbsFt: 77,
    areaCm2: 146.0,
    sectionModulusCm3: 2200,
    momentCapacityKNm: 759,
    axial4mCapacityKN: 1980,
    depthMm: 419,
    primaryRole: 'Heavy industrial crane runway beam and clear-span warehouse girder.',
  },
];

export function SteelSectionStrengthWeightSpectrumChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedName, setSelectedName] = useState('W12×50');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = PROFILES.find((p) => p.name === selectedName) || PROFILES[3];

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
            AISC Structural Steel Wide-Flange (W-Beam) Capacity Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plastic bending moment capacity (kN·m) vs. member mass density (kg/m) across ASTM A992 sections
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300">
          AISC Steel Manual (15th Ed.)
        </span>
      </div>

      {/* Profile Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PROFILES.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setSelectedName(p.name)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedName === p.name
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {p.name} ({p.weightKgM} kg/m)
          </button>
        ))}
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PROFILES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="momentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" kNm" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as SteelProfile;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {d.name} ({d.weightLbsFt} lbs/ft | {d.weightKgM} kg/m)
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Moment Capacity: {d.momentCapacityKNm} kN·m ({(d.momentCapacityKNm * 0.7376).toFixed(0)} kip·ft)
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400">
                        Axial 4m Column Capacity: {d.axial4mCapacityKN} kN ({(d.axial4mCapacityKN * 0.2248).toFixed(0)} kips)
                      </p>
                      <p className="text-slate-500">Section Modulus: {d.sectionModulusCm3} cm³</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="momentCapacityKNm"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#momentGradient)"
              name="Moment Capacity (kN·m)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Profile Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Plastic Moment (Mp)</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.momentCapacityKNm} kN·m
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Axial 4m Capacity</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.axial4mCapacityKN} kN ({(active.axial4mCapacityKN * 0.2248).toFixed(0)} kips)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Member Linear Mass</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.weightKgM} kg/m ({active.weightLbsFt} lb/ft)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Section Modulus (Sx)</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.sectionModulusCm3} cm³
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Structural Engineering Application:</strong> {active.primaryRole}
      </p>
    </div>
  );
}
