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

const APPLIANCE_DATA = [
  { appliance: 'Central AC', kwh: 3600, annualCost: 576, pct: 33 },
  { appliance: 'Water Heater', kwh: 2800, annualCost: 448, pct: 26 },
  { appliance: 'Space Heater', kwh: 1440, annualCost: 230, pct: 13 },
  { appliance: 'Clothes Dryer', kwh: 960, annualCost: 154, pct: 9 },
  { appliance: 'Refrigerator', kwh: 650, annualCost: 104, pct: 6 },
  { appliance: 'Gaming Rig', kwh: 580, annualCost: 93, pct: 5 },
  { appliance: 'Dishwasher', kwh: 380, annualCost: 61, pct: 4 },
  { appliance: 'LED Lighting', kwh: 320, annualCost: 51, pct: 3 },
];

export function EnergyConsumptionByApplianceChart() {
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
          Typical Household Appliance Annual Energy Usage & Electricity Cost
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ranked by annual kilowatt-hour (kWh) demand at US standard $0.16/kWh utility tariff
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={APPLIANCE_DATA} layout="vertical" margin={{ top: 5, right: 15, left: 35, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis dataKey="appliance" type="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.appliance}</div>
                      <div className="text-slate-600 dark:text-slate-300">Annual Energy: <span className="font-mono font-bold">{data.kwh.toLocaleString()} kWh</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Annual Cost: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${data.annualCost}/yr</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-500">{data.pct}% of typical total electric bill</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Bar dataKey="kwh" name="Annual Consumption (kWh)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="annualCost" name="Annual Cost ($)" fill="#10b981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Thermal thermal-cycling loads (HVAC, Water Heating) account for over 59% of electric consumption</span>
        <span>Source: US Energy Information Administration (EIA) RECS</span>
      </div>
    </div>
  );
}
