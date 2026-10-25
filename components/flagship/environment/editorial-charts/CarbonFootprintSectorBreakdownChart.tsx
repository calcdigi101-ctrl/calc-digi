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

const LIFESTYLE_DATA = [
  { profile: 'Eco Urbanite', vehicle: 1.4, aviation: 0.2, homePower: 1.6, gasHeat: 1.3, diet: 1.6, waste: 0.3, total: 6.4 },
  { profile: 'Solar Suburban', vehicle: 3.1, aviation: 1.4, homePower: 0.9, gasHeat: 2.2, diet: 1.9, waste: 0.5, total: 10.0 },
  { profile: 'US National Avg', vehicle: 4.6, aviation: 1.6, homePower: 4.1, gasHeat: 3.2, diet: 2.5, waste: 0.6, total: 16.6 },
  { profile: 'Frequent Flyer', vehicle: 6.8, aviation: 6.5, homePower: 6.5, gasHeat: 5.4, diet: 3.3, waste: 1.1, total: 29.6 },
  { profile: 'Global Citizen Avg', vehicle: 0.8, aviation: 0.1, homePower: 1.2, gasHeat: 0.8, diet: 1.5, waste: 0.3, total: 4.7 },
];

export function CarbonFootprintSectorBreakdownChart() {
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
          Annual Carbon Footprint by Sector & Lifestyle (Metric Tons CO2e)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Stacked emissions breakdown comparing transportation, home utilities, aviation, and nutrition
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={LIFESTYLE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="profile" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" MT" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.profile}</div>
                      <div className="text-slate-600 dark:text-slate-300">Vehicle: <span className="font-mono font-semibold">{data.vehicle} MT</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Aviation: <span className="font-mono font-semibold">{data.aviation} MT</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Electricity: <span className="font-mono font-semibold">{data.homePower} MT</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Gas Heating: <span className="font-mono font-semibold">{data.gasHeat} MT</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Dietary Food: <span className="font-mono font-semibold">{data.diet} MT</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Waste: <span className="font-mono font-semibold">{data.waste} MT</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 font-bold text-emerald-600 dark:text-emerald-400">
                        Total: {data.total} MT CO2e/year
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Bar dataKey="vehicle" name="Vehicle Fuel" stackId="a" fill="#ef4444" />
            <Bar dataKey="aviation" name="Flights" stackId="a" fill="#f59e0b" />
            <Bar dataKey="homePower" name="Grid Electricity" stackId="a" fill="#3b82f6" />
            <Bar dataKey="gasHeat" name="Gas Heating" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="diet" name="Diet & Food" stackId="a" fill="#10b981" />
            <Bar dataKey="waste" name="Waste" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Source: EPA GHG Inventory & IPCC Working Group III</span>
        <span>Target for 1.5°C Paris Agreement: &lt; 2.5 MT/person by 2030</span>
      </div>
    </div>
  );
}
