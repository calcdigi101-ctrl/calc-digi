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

interface ZoneCorridor {
  pair: string;
  shortLabel: string;
  tzOrigin: string;
  tzDest: string;
  hourDiff: number;
  overlapHours: number;
  meetingWindow: string;
  viabilityTier: string;
  circadianNote: string;
}

const CORRIDORS_DATA: ZoneCorridor[] = [
  {
    pair: 'London (UTC+0) ↔ Paris / Berlin (UTC+1)',
    shortLabel: 'LON–BER',
    tzOrigin: 'UTC+0',
    tzDest: 'UTC+1',
    hourDiff: 1,
    overlapHours: 7,
    meetingWindow: '9:00 AM – 4:00 PM London (10:00 AM – 5:00 PM Berlin)',
    viabilityTier: 'Seamless Intracontinental',
    circadianNote: 'Near-identical circadian rhythms; full 7-hour common working window across European financial capitals.',
  },
  {
    pair: 'New York (UTC-5) ↔ London (UTC+0)',
    shortLabel: 'NYC–LON',
    tzOrigin: 'UTC-5',
    tzDest: 'UTC+0',
    hourDiff: 5,
    overlapHours: 3,
    meetingWindow: '9:00 AM – 12:00 PM NYC (2:00 PM – 5:00 PM London)',
    viabilityTier: 'Prime Transatlantic Hub',
    circadianNote: 'The world\'s highest-volume financial trading overlap window; morning in New York aligns with afternoon in London.',
  },
  {
    pair: 'London (UTC+0) ↔ Dubai (UTC+4)',
    shortLabel: 'LON–DXB',
    tzOrigin: 'UTC+0',
    tzDest: 'UTC+4',
    hourDiff: 4,
    overlapHours: 4,
    meetingWindow: '9:00 AM – 1:00 PM London (1:00 PM – 5:00 PM Dubai)',
    viabilityTier: 'Strong Euro-Gulf Alignment',
    circadianNote: 'Solid 4-hour bilateral working window; enables real-time corporate governance and energy trading coordination.',
  },
  {
    pair: 'London (UTC+0) ↔ Mumbai (UTC+5.5)',
    shortLabel: 'LON–BOM',
    tzOrigin: 'UTC+0',
    tzDest: 'UTC+5.5',
    hourDiff: 5.5,
    overlapHours: 2.5,
    meetingWindow: '9:00 AM – 11:30 AM London (2:30 PM – 5:00 PM India)',
    viabilityTier: 'Moderate Working Overlap',
    circadianNote: 'Standard UK-to-India IT/tech collaboration window; half-hour offset requires deliberate calendar synchronizing.',
  },
  {
    pair: 'New York (UTC-5) ↔ San Francisco (UTC-8)',
    shortLabel: 'NYC–SFO',
    tzOrigin: 'UTC-5',
    tzDest: 'UTC-8',
    hourDiff: 3,
    overlapHours: 5,
    meetingWindow: '12:00 PM – 5:00 PM NYC (9:00 AM – 2:00 PM SF)',
    viabilityTier: 'Broad US Coast-to-Coast',
    circadianNote: '5 hours of mutual daytime work; New York teams handle early tasks while West Coast comes online mid-morning.',
  },
  {
    pair: 'Singapore (UTC+8) ↔ Tokyo (UTC+9)',
    shortLabel: 'SIN–TYO',
    tzOrigin: 'UTC+8',
    tzDest: 'UTC+9',
    hourDiff: 1,
    overlapHours: 7,
    meetingWindow: '9:00 AM – 4:00 PM Singapore (10:00 AM – 5:00 PM Tokyo)',
    viabilityTier: 'Seamless Pan-Asian Market',
    circadianNote: 'Single-hour delta unifies East Asian financial exchanges (SGX, HKEX, TSE) during common high-liquidity morning hours.',
  },
  {
    pair: 'San Francisco (UTC-8) ↔ Tokyo (UTC+9)',
    shortLabel: 'SFO–TYO',
    tzOrigin: 'UTC-8',
    tzDest: 'UTC+9',
    hourDiff: 17,
    overlapHours: 1,
    meetingWindow: '4:00 PM – 5:00 PM SF (9:00 AM – 10:00 AM Next Day Tokyo)',
    viabilityTier: 'Extreme Narrow Window (+1 Day)',
    circadianNote: 'Traverses the International Date Line; late afternoon in California syncs with the start of the next business morning in Japan.',
  },
  {
    pair: 'New York (UTC-5) ↔ Sydney (UTC+10)',
    shortLabel: 'NYC–SYD',
    tzOrigin: 'UTC-5',
    tzDest: 'UTC+10',
    hourDiff: 15,
    overlapHours: 0,
    meetingWindow: 'Zero Standard Overlap (Requires 7am / 8pm call)',
    viabilityTier: 'Asynchronous Collaboration Mandatory',
    circadianNote: 'Complete circadian opposition; teams typically operate asynchronous sprint handoffs with one side sleeping while other works.',
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

export function WorldTimeZoneCircadianSpectrumChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(1); // NYC-LON default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = CORRIDORS_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🕐</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              International Working Hours Overlap Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mutual business collaboration windows (9:00 AM to 5:00 PM standard) across global financial corridors
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 ring-1 ring-inset ring-violet-600/20">
          IERS / UTC Standard
        </span>
      </div>

      {/* Corridor Selector Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select International City Pair:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {CORRIDORS_DATA.map((c, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={c.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20 scale-[1.02] dark:bg-violet-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>🌍</span>
                <span>{c.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CORRIDORS_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}h`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={36}
                domain={[0, 8]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name, props) => [
                  `${val} common working hours`,
                  props.payload.pair,
                ]}
                labelFormatter={(label) => `Corridor: ${label}`}
              />
              <Bar
                dataKey="overlapHours"
                name="Overlap Hours"
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Shared Working Window</span>
          <div className="mt-1">
            <span className="text-base font-bold text-violet-600 dark:text-violet-400">
              {cur.overlapHours} hours
            </span>
            <span className="text-xs text-slate-400 block font-normal">9am–5pm overlap</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">UTC Offset Difference</span>
          <div className="mt-1">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {cur.hourDiff} hrs
            </span>
            <span className="text-[10px] text-slate-400 block">{cur.tzOrigin} ↔ {cur.tzDest}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Collaboration Tier</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block truncate">
              {cur.viabilityTier.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 block truncate">{cur.viabilityTier}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Peak Meeting Window</span>
          <div className="mt-1">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 leading-tight block">
              {cur.overlapHours > 0 ? 'Synchronous OK' : 'Async Only'}
            </span>
            <span className="text-[10px] text-slate-400 block truncate">{cur.meetingWindow}</span>
          </div>
        </div>
      </div>

      {/* Global Collaboration Callout Card */}
      <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-violet-900/30 dark:bg-violet-950/20 dark:text-slate-300">
        <strong className="font-semibold text-violet-800 dark:text-violet-300">
          International Coordination &amp; Circadian Dynamics ({cur.shortLabel}):
        </strong>{' '}
        {cur.circadianNote}
      </div>
    </div>
  );
}
