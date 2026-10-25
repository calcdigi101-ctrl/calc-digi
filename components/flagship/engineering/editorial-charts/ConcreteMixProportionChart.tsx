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

interface ConcreteGrade {
  grade: string;
  name: string;
  ratio: string;
  strengthMpa: number;
  strengthPsi: number;
  cementKg: number;
  sandKg: number;
  gravelKg: number;
  waterLiters: number;
  bags50kg: number;
  application: string;
}

const GRADES_DATA: ConcreteGrade[] = [
  {
    grade: 'M10',
    name: 'M10 (1:3:6)',
    ratio: '1 : 3 : 6',
    strengthMpa: 10,
    strengthPsi: 1450,
    cementKg: 220,
    sandKg: 660,
    gravelKg: 1320,
    waterLiters: 132,
    bags50kg: 4.4,
    application: 'Non-structural leveling course, trench bedding, mass blinding foundation.',
  },
  {
    grade: 'M15',
    name: 'M15 (1:2:4)',
    ratio: '1 : 2 : 4',
    strengthMpa: 15,
    strengthPsi: 2175,
    cementKg: 320,
    sandKg: 640,
    gravelKg: 1280,
    waterLiters: 160,
    bags50kg: 6.4,
    application: 'Walkways, patio pavers, garden curb retaining walls, unreinforced slabs.',
  },
  {
    grade: 'M20',
    name: 'M20 (1:1.5:3)',
    ratio: '1 : 1.5 : 3',
    strengthMpa: 20,
    strengthPsi: 2900,
    cementKg: 400,
    sandKg: 600,
    gravelKg: 1200,
    waterLiters: 180,
    bags50kg: 8.0,
    application: 'Standard residential concrete slabs, driveways, garage floors, light foundations.',
  },
  {
    grade: 'M25',
    name: 'M25 (1:1:2)',
    ratio: '1 : 1 : 2',
    strengthMpa: 25,
    strengthPsi: 3625,
    cementKg: 510,
    sandKg: 510,
    gravelKg: 1020,
    waterLiters: 204,
    bags50kg: 10.2,
    application: 'Heavy structural reinforced concrete: foundation footings, loadbearing columns, beams.',
  },
  {
    grade: 'M30',
    name: 'M30 (Design Mix)',
    ratio: 'Design Mix (1:0.8:1.8)',
    strengthMpa: 30,
    strengthPsi: 4350,
    cementKg: 560,
    sandKg: 460,
    gravelKg: 1010,
    waterLiters: 210,
    bags50kg: 11.2,
    application: 'Commercial high-rise columns, water retaining tanks, highway bridge decks.',
  },
];

export function ConcreteMixProportionChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('M20');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = GRADES_DATA.find((g) => g.grade === selectedGrade) || GRADES_DATA[2];

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
            Standard Concrete Mix Design &amp; Weight Yield Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Batch proportions of Portland cement, sharp sand, and coarse gravel per cubic meter (m³)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          ACI 211.1 &amp; IS 456 Standards
        </span>
      </div>

      {/* Grade Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GRADES_DATA.map((g) => (
          <button
            key={g.grade}
            type="button"
            onClick={() => setSelectedGrade(g.grade)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedGrade === g.grade
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {g.grade} ({g.strengthMpa} MPa)
          </button>
        ))}
      </div>

      {/* Recharts Stacked / Grouped Bar Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GRADES_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" kg" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as ConcreteGrade;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {d.name} – {d.ratio}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 mt-1">
                        Cement: {d.cementKg} kg ({d.bags50kg} bags of 50kg)
                      </p>
                      <p className="text-amber-600 dark:text-amber-400">Sand: {d.sandKg} kg</p>
                      <p className="text-slate-600 dark:text-slate-300">Coarse Stone: {d.gravelKg} kg</p>
                      <p className="text-cyan-600 dark:text-cyan-400">Water: {d.waterLiters} Liters</p>
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
            <Bar dataKey="cementKg" name="Cement (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sandKg" name="Fine Sand (kg)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gravelKg" name="Coarse Gravel (kg)" fill="#64748b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Grade Metrics */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">28-Day Strength</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.strengthMpa} MPa ({active.strengthPsi.toLocaleString()} psi)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Cement per m³</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.cementKg} kg ({active.bags50kg} bags)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Nominal Mix Ratio</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.ratio}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Batch Mixing Water</p>
          <p className="mt-1 text-base font-bold text-cyan-600 dark:text-cyan-400">
            {active.waterLiters} Liters
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Typical Civil Application:</strong> {active.application}
      </p>
    </div>
  );
}
