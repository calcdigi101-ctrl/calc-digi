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

interface GearStage {
  ratioLabel: string;
  ratioNum: number;
  outputSpeedRpm: number;
  outputTorqueNm: number;
  mechanicalAdvantage: string;
  application: string;
}

const GEAR_DATA: GearStage[] = [
  {
    ratioLabel: '0.22:1 (Overdrive)',
    ratioNum: 0.22,
    outputSpeedRpm: 8000,
    outputTorqueNm: 5.2,
    mechanicalAdvantage: '0.22× (High Speed / Low Torque)',
    application: 'Automotive 6th gear freeway cruising, racing bicycle sprint cog (50T:11T).',
  },
  {
    ratioLabel: '0.50:1 (2× Overdrive)',
    ratioNum: 0.5,
    outputSpeedRpm: 3500,
    outputTorqueNm: 11.9,
    mechanicalAdvantage: '0.50× (Speed Multiplier)',
    application: 'Centrifugal blower impeller drives, high-speed dental turbine heads.',
  },
  {
    ratioLabel: '1.00:1 (Direct Drive)',
    ratioNum: 1.0,
    outputSpeedRpm: 1750,
    outputTorqueNm: 23.8,
    mechanicalAdvantage: '1.00× (100% Direct Transfer)',
    application: 'Automotive 4th gear transmission, direct motor shaft couplings.',
  },
  {
    ratioLabel: '2.50:1 (Light Reducer)',
    ratioNum: 2.5,
    outputSpeedRpm: 700,
    outputTorqueNm: 59.4,
    mechanicalAdvantage: '2.50× (Torque Boost)',
    application: 'Machine shop lathe headstock, electric vehicle single-speed reduction.',
  },
  {
    ratioLabel: '4.10:1 (Differential)',
    ratioNum: 4.1,
    outputSpeedRpm: 427,
    outputTorqueNm: 97.4,
    mechanicalAdvantage: '4.10× (Axle Multiplication)',
    application: 'Automotive rear-wheel drive ring and pinion final drive differential.',
  },
  {
    ratioLabel: '6.00:1 (Worm / Planetary)',
    ratioNum: 6.0,
    outputSpeedRpm: 292,
    outputTorqueNm: 142.5,
    mechanicalAdvantage: '6.00× (Heavy Torque Multiplier)',
    application: 'Conveyor belt drive motors, industrial robotic joint planetary gearbox.',
  },
];

export function GearSpeedTorqueTradeoffChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState('4.10:1 (Differential)');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = GEAR_DATA.find((g) => g.ratioLabel === selectedRatio) || GEAR_DATA[4];

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
            Gear Ratio Angular Speed vs. Output Torque Trade-Off
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inverse relationship between delivered shaft RPM and output torque across common gear sets (1,750 RPM base)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300">
          AGMA &amp; ISO 6336 Gear Design
        </span>
      </div>

      {/* Ratio Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {GEAR_DATA.map((g) => (
          <button
            key={g.ratioLabel}
            type="button"
            onClick={() => setSelectedRatio(g.ratioLabel)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedRatio === g.ratioLabel
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {g.ratioLabel}
          </button>
        ))}
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GEAR_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="ratioLabel" tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as GearStage;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.ratioLabel}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Output Speed: {d.outputSpeedRpm.toLocaleString()} RPM
                      </p>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold">
                        Output Torque: {d.outputTorqueNm} N·m ({(d.outputTorqueNm * 0.7376).toFixed(1)} lb·ft)
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                        Advantage: {d.mechanicalAdvantage}
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
            <Bar dataKey="outputSpeedRpm" name="Output Velocity (RPM)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outputTorqueNm" name="Delivered Torque (N·m)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Ratio Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Delivered Shaft Torque</p>
          <p className="mt-1 text-base font-bold text-amber-600 dark:text-amber-400">
            {active.outputTorqueNm} N·m
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Output Rotational Speed</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.outputSpeedRpm.toLocaleString()} RPM
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Mechanical Advantage</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.ratioNum.toFixed(2)}×
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Standard Efficiency</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            95% – 98%
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Typical Machine Application:</strong> {active.application}
      </p>
    </div>
  );
}
