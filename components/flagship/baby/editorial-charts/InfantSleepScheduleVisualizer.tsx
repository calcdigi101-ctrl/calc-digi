'use client';

import React, { useState } from 'react';

interface SleepTier {
  ageLabel: string;
  wakeWindow: string;
  nightHours: number;
  napHours: number;
  napCount: string;
  targetBedtime: string;
  clinicalNote: string;
}

const SLEEP_TIERS: SleepTier[] = [
  {
    ageLabel: '0–6 Weeks',
    wakeWindow: '45–60 min',
    nightHours: 8.5,
    napHours: 7.5,
    napCount: '4–6 naps',
    targetBedtime: '9:00 PM – 10:30 PM (late newborn rhythm)',
    clinicalNote: 'Absence of circadian melatonin; day/night confusion common; frequent feeding wakings every 2–3 hrs.',
  },
  {
    ageLabel: '2–3 Months',
    wakeWindow: '60–90 min',
    nightHours: 9.5,
    napHours: 5.5,
    napCount: '3–4 naps',
    targetBedtime: '8:00 PM – 9:30 PM',
    clinicalNote: 'Suprachiasmatic nucleus matures; nocturnal melatonin synthesis begins; longest sleep stretch extends to 4–6 hrs.',
  },
  {
    ageLabel: '4–5 Months',
    wakeWindow: '1.5–2.25 hrs',
    nightHours: 10.5,
    napHours: 3.5,
    napCount: '3 naps',
    targetBedtime: '7:00 PM – 8:00 PM',
    clinicalNote: '4-month sleep regression window; sleep transitions to 4-stage adult cycle; independent self-soothing critical.',
  },
  {
    ageLabel: '6–8 Months',
    wakeWindow: '2.0–3.0 hrs',
    nightHours: 11.0,
    napHours: 3.0,
    napCount: '2–3 naps',
    targetBedtime: '7:00 PM – 7:45 PM',
    clinicalNote: 'Nap consolidation; 2 solid restorative naps emerge (morning and afternoon); night feeds typically reduce to 0–1.',
  },
  {
    ageLabel: '9–12 Months',
    wakeWindow: '2.75–3.75 hrs',
    nightHours: 11.5,
    napHours: 2.5,
    napCount: '2 naps',
    targetBedtime: '7:00 PM – 7:30 PM',
    clinicalNote: 'Predictable 2-nap schedule; separation anxiety may cause brief bedtime resistance; 11–12 hours uninterrupted night sleep.',
  },
  {
    ageLabel: '13–18 Months',
    wakeWindow: '3.5–4.5 hrs',
    nightHours: 11.5,
    napHours: 2.0,
    napCount: '1–2 naps',
    targetBedtime: '7:15 PM – 7:45 PM',
    clinicalNote: 'Transition from 2 naps down to 1 midday nap (usually around 14–15 months); requires slightly earlier bedtime during transition.',
  },
  {
    ageLabel: '19–36 Months',
    wakeWindow: '5.0–6.0 hrs',
    nightHours: 11.0,
    napHours: 1.5,
    napCount: '1 afternoon nap',
    targetBedtime: '7:30 PM – 8:15 PM',
    clinicalNote: 'Toddler bedtime boundaries essential; single afternoon nap capped at 2 hours to protect night sleep drive.',
  },
];

export function InfantSleepScheduleVisualizer() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // 4-5 Months default
  const cur = SLEEP_TIERS[activeIdx];

  const totalSleep = cur.nightHours + cur.napHours;
  const awakeHours = 24 - totalSleep;

  const nightPct = Math.round((cur.nightHours / 24) * 100);
  const napPct = Math.round((cur.napHours / 24) * 100);
  const awakePct = 100 - nightPct - napPct;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌙</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Circadian 24-Hour Sleep &amp; Wake Window Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AAP and AASM pediatric benchmarks: 24-hour sleep architecture, nap consolidation, and target bedtimes
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 ring-1 ring-inset ring-indigo-600/20">
          AASM Clinical Standard
        </span>
      </div>

      {/* Touch-Friendly Age Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Age Window:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {SLEEP_TIERS.map((t, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={t.ageLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-[1.02] dark:bg-indigo-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{t.ageLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 24-Hour Circadian Split Bar */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
          <span>24-Hour Circadian Budget ({cur.ageLabel})</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{totalSleep} hrs total sleep</span>
        </div>

        {/* 3-Color Stacked Bar */}
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${nightPct}%` }}
            title={`Night Sleep: ${cur.nightHours}h`}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${napPct}%` }}
            title={`Daytime Naps: ${cur.napHours}h`}
          />
          <div
            className="h-full bg-slate-300 dark:bg-slate-600 transition-all duration-300"
            style={{ width: `${awakePct}%` }}
            title={`Awake Hours: ${awakeHours}h`}
          />
        </div>

        {/* Legend */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs gap-y-1">
          <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-medium">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600" />
            Night: {cur.nightHours} hrs ({nightPct}%)
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-medium">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
            Day Naps: {cur.napHours} hrs ({napPct}%)
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-400" />
            Awake: {awakeHours.toFixed(1)} hrs ({awakePct}%)
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Wake Window Limit</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 leading-tight">{cur.wakeWindow}</span>
            <span className="text-xs text-slate-400 block font-normal">between sleep sessions</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Daytime Nap Count</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 leading-tight">{cur.napCount}</span>
            <span className="text-xs text-slate-400 block font-normal">{cur.napHours} hrs total nap time</span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Target Bedtime Window</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.targetBedtime}</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Card */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/20">
        <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
          <span>🧠</span>
          <span>Sleep Neurobiology Note ({cur.ageLabel}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
