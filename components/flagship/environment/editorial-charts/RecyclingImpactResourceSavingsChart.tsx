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

const RECYCLING_DATA = [
  { material: 'Aluminum Cans', co2Kg: 415, energyKwh: 650, waterGal: 120, treeScore: 0, highlight: '95% energy saved vs virgin mining' },
  { material: 'Paper & Boxes', co2Kg: 95, energyKwh: 180, waterGal: 350, treeScore: 0.85, highlight: 'Saves 17 mature trees per ton' },
  { material: 'Rigid Plastics', co2Kg: 120, energyKwh: 280, waterGal: 80, treeScore: 0, highlight: 'Replaces virgin petrochemical crude' },
  { material: 'Steel / Tin Cans', co2Kg: 70, energyKwh: 140, waterGal: 90, treeScore: 0, highlight: '75% energy reduction vs iron ore' },
  { material: 'Glass Bottles', co2Kg: 15, energyKwh: 15, waterGal: 30, treeScore: 0, highlight: '100% infinitely recyclable closed loop' },
];

export function RecyclingImpactResourceSavingsChart() {
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
          Lifecycle Resource Savings per 100 lbs of Recycled Commodity
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Avoided carbon emissions (kg CO2e) and conserved electrical energy (kWh) compared to virgin extraction
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={RECYCLING_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="material" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.material} (per 100 lbs)</div>
                      <div className="text-slate-600 dark:text-slate-300">Avoided CO2: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{data.co2Kg} kg</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Energy Conserved: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{data.energyKwh} kWh</span></div>
                      <div className="text-slate-600 dark:text-slate-300">Water Saved: <span className="font-mono font-bold">{data.waterGal} gal</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-500 italic">{data.highlight}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Bar dataKey="co2Kg" name="Avoided CO2 (kg / 100 lbs)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="energyKwh" name="Energy Conserved (kWh / 100 lbs)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="waterGal" name="Water Conserved (Gallons)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Source: US EPA WARM (Waste Reduction Model) Lifecycle Analysis</span>
        <span>Aluminum smelting achieves the highest lifecycle energy offset</span>
      </div>
    </div>
  );
}
