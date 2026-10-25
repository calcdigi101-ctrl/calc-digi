'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const TREE_SEQUESTRATION_DATA = [
  { year: 'Yr 1', fastGrowing: 0.3, mixedHardwood: 0.1, coniferPine: 0.1 },
  { year: 'Yr 5', fastGrowing: 3.8, mixedHardwood: 1.8, coniferPine: 1.5 },
  { year: 'Yr 10', fastGrowing: 14.5, mixedHardwood: 7.2, coniferPine: 5.8 },
  { year: 'Yr 15', fastGrowing: 26.0, mixedHardwood: 16.5, coniferPine: 12.5 },
  { year: 'Yr 20', fastGrowing: 38.0, mixedHardwood: 28.0, coniferPine: 21.0 },
  { year: 'Yr 25', fastGrowing: 46.5, mixedHardwood: 41.5, coniferPine: 30.5 },
  { year: 'Yr 30', fastGrowing: 52.0, mixedHardwood: 55.0, coniferPine: 41.0 },
];

export function TreePlantingCarbonSequestrationTimelineChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          30-Year Cumulative Carbon Sequestration (Metric Tons CO2e per 100 Trees)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Biological sigmoidal growth curve comparing Mixed Hardwood, Fast-Growing Deciduous, and Conifer Pine
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TREE_SEQUESTRATION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="hardwoodColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fastColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" MT" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.year} Cumulative Sequestration</div>
                      <div className="text-emerald-600 dark:text-emerald-400">Mixed Hardwood: <span className="font-mono font-bold">{data.mixedHardwood} MT CO2e</span></div>
                      <div className="text-blue-600 dark:text-blue-400">Fast-Growing Poplar: <span className="font-mono font-bold">{data.fastGrowing} MT CO2e</span></div>
                      <div className="text-purple-600 dark:text-purple-400">Conifer Pine: <span className="font-mono font-bold">{data.coniferPine} MT CO2e</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-500 italic">
                        Values modeled per 100 surviving mature trees
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Area type="monotone" dataKey="mixedHardwood" name="Mixed Hardwood (Oak / Maple)" stroke="#10b981" strokeWidth={2.2} fillOpacity={1} fill="url(#hardwoodColor)" />
            <Area type="monotone" dataKey="fastGrowing" name="Fast Deciduous (Poplar / Birch)" stroke="#3b82f6" strokeWidth={2.0} fillOpacity={1} fill="url(#fastColor)" />
            <Area type="monotone" dataKey="coniferPine" name="Conifer Pine (Fir / Pine)" stroke="#8b5cf6" strokeWidth={2.0} fillOpacity={1} fill="url(#pineColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Hardwoods overtake fast-growing species in Year 28+ due to timber wood density and crown volume</span>
        <span>Source: USFS Forest Inventory and Analysis (FIA) & IPCC AFOLU</span>
      </div>
    </div>
  );
}
