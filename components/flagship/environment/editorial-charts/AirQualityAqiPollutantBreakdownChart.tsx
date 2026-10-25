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

const AQI_TIER_DATA = [
  { tier: 'Good (0-50)', aqiMax: 50, pm25Max: 9.0, ozoneMax: 54, no2Max: 53, color: '#10b981', healthRisk: 'Air quality is satisfactory; zero risk' },
  { tier: 'Moderate (51-100)', aqiMax: 100, pm25Max: 35.4, ozoneMax: 70, no2Max: 100, color: '#eab308', healthRisk: 'Sensitive people monitor symptoms' },
  { tier: 'Sensitive (101-150)', aqiMax: 150, pm25Max: 55.4, ozoneMax: 85, no2Max: 360, color: '#f97316', healthRisk: 'Asthmatics and elderly reduce exertion' },
  { tier: 'Unhealthy (151-200)', aqiMax: 200, pm25Max: 125.4, ozoneMax: 105, no2Max: 649, color: '#ef4444', healthRisk: 'General public experiences irritation' },
  { tier: 'Very Unhealthy (201-300)', aqiMax: 300, pm25Max: 225.4, ozoneMax: 200, no2Max: 1249, color: '#a855f7', healthRisk: 'Health alert: serious population risk' },
  { tier: 'Hazardous (301-500)', aqiMax: 500, pm25Max: 500.0, ozoneMax: 300, no2Max: 2049, color: '#881337', healthRisk: 'Emergency conditions: stay indoors' },
];

export function AirQualityAqiPollutantBreakdownChart() {
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
          EPA AQI Index Ranges & Upper Concentration Thresholds
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Standardized AQI score boundaries mapped against PM2.5 (ug/m3) and Ground-Level Ozone (ppb)
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={AQI_TIER_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="tier" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.tier}</div>
                      <div className="text-slate-600 dark:text-slate-300">Max AQI: <span className="font-mono font-bold">{data.aqiMax}</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Max PM2.5: <span className="font-mono font-bold">{data.pm25Max} ug/m3</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Max Ozone: <span className="font-mono font-bold">{data.ozoneMax} ppb</span></div>
                      <div className="mt-1 text-slate-500 italic border-t border-slate-100 pt-1 dark:border-slate-800">{data.healthRisk}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Bar dataKey="aqiMax" name="Max AQI Score" fill="#0284c7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pm25Max" name="PM2.5 Threshold (ug/m3)" fill="#f97316" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ozoneMax" name="O3 Threshold (ppb)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Source: US EPA 40 CFR Part 58 (2024 PM2.5 Revision)</span>
        <span>Standard AQI Scale: 0 to 500</span>
      </div>
    </div>
  );
}
