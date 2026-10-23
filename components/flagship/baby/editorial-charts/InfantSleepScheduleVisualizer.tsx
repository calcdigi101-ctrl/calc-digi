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

interface SleepTier {
  ageLabel: string;
  shortLabel: string;
  wakeWindow: string;
  nightHours: number;
  napHours: number;
  awakeHours: number;
  napCount: string;
  targetBedtime: string;
  clinicalNote: string;
}

const SLEEP_DATA: SleepTier[] = [
  {
    ageLabel: '0–6 Weeks',
    shortLabel: '0–6 Wks',
    wakeWindow: '45–60 min',
    nightHours: 8.5,
    napHours: 7.5,
    awakeHours: 8.0,
    napCount: '4–6 naps',
    targetBedtime: '9:00 PM – 10:30 PM (newborn)',
    clinicalNote: 'Absence of circadian melatonin; day/night confusion common; frequent feeding wakings every 2–3 hrs.',
  },
  {
    ageLabel: '2–3 Months',
    shortLabel: '2–3 Mo',
    wakeWindow: '60–90 min',
    nightHours: 9.5,
    napHours: 5.5,
    awakeHours: 9.0,
    napCount: '3–4 naps',
    targetBedtime: '8:00 PM – 9:30 PM',
    clinicalNote: 'Suprachiasmatic nucleus matures; nocturnal melatonin synthesis begins; longest sleep stretch reaches 4–6 hrs.',
  },
  {
    ageLabel: '4–5 Months',
    shortLabel: '4–5 Mo',
    wakeWindow: '1.5–2.25 hrs',
    nightHours: 10.5,
    napHours: 3.5,
    awakeHours: 10.0,
    napCount: '3 naps',
    targetBedtime: '7:00 PM – 8:00 PM',
    clinicalNote: '4-month sleep regression window; sleep transitions to 4-stage adult cycle; independent self-soothing critical.',
  },
  {
    ageLabel: '6–8 Months',
    shortLabel: '6–8 Mo',
    wakeWindow: '2.0–3.0 hrs',
    nightHours: 11.0,
    napHours: 3.0,
    awakeHours: 10.0,
    napCount: '2–3 naps',
    targetBedtime: '7:00 PM – 7:45 PM',
    clinicalNote: 'Nap consolidation; 2 solid restorative naps emerge (morning and afternoon); night feeds typically reduce to 0–1.',
  },
  {
    ageLabel: '9–12 Months',
    shortLabel: '9–12 Mo',
    wakeWindow: '2.75–3.75 hrs',
    nightHours: 11.5,
    napHours: 2.5,
    awakeHours: 10.0,
    napCount: '2 naps',
    targetBedtime: '7:00 PM – 7:30 PM',
    clinicalNote: 'Predictable 2-nap schedule; separation anxiety may cause brief bedtime resistance; 11–12 hours uninterrupted night sleep.',
  },
  {
    ageLabel: '13–18 Months',
    shortLabel: '13–18 Mo',
    wakeWindow: '3.5–4.5 hrs',
    nightHours: 11.5,
    napHours: 2.0,
    awakeHours: 10.5,
    napCount: '1–2 naps',
    targetBedtime: '7:15 PM – 7:45 PM',
    clinicalNote: 'Transition from 2 naps down to 1 midday nap (usually around 14–15 months); requires slightly earlier bedtime.',
  },
  {
    ageLabel: '19–36 Months',
    shortLabel: '19–36 Mo',
    wakeWindow: '5.0–6.0 hrs',
    nightHours: 11.0,
    napHours: 1.5,
    awakeHours: 11.5,
    napCount: '1 afternoon nap',
    targetBedtime: '7:30 PM – 8:15 PM',
    clinicalNote: 'Toddler bedtime boundaries essential; single afternoon nap capped at 2 hours to protect night sleep drive.',
  },
];

const tooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '12px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
};

export function InfantSleepScheduleVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(2); // 4-5 Mo default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = SLEEP_DATA[activeIdx];
  const totalSleep = cur.nightHours + cur.napHours;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌙</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              24-Hour Circadian Sleep &amp; Nap Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AAP and AASM pediatric standards: 24-hour stacked breakdown (Night Sleep vs Daytime Naps vs Awake Hours)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 ring-1 ring-inset ring-indigo-600/20">
          AASM Pediatric Consensus
        </span>
      </div>

      {/* Age Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Age Window:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {SLEEP_DATA.map((t, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={t.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-[1.02] dark:bg-indigo-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{t.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Stacked Bar Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SLEEP_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}h`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={45}
                domain={[0, 24]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name) => [`${val} hours`, name === 'nightHours' ? 'Night Sleep' : name === 'napHours' ? 'Daytime Naps' : 'Awake Time']}
                labelFormatter={(label) => `Age: ${label}`}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Bar dataKey="nightHours" name="Night Sleep" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} />
              <Bar dataKey="napHours" name="Day Naps" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="awakeHours" name="Awake Time" stackId="a" fill="#94a3b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Total 24-Hr Sleep</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{totalSleep} hours</span>
            <span className="text-xs text-slate-400 block font-normal">night + naps</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Wake Window Limit</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 leading-tight block">{cur.wakeWindow}</span>
            <span className="text-xs text-slate-400 block font-normal">between sleep periods</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Nap Frequency</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">{cur.napCount}</span>
            <span className="text-xs text-slate-400 block font-normal">{cur.napHours} hrs total nap time</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Target Bedtime</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block">{cur.targetBedtime}</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/20">
        <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
          <span>🧠</span>
          <span>Sleep Neurobiology Insight ({cur.ageLabel}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
