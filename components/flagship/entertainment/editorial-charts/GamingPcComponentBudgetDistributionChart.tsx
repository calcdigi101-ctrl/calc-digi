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

const TIER_DATA = [
  { tier: '1080p Esports ($850)', gpu: 320, cpu: 160, memoryStorage: 120, moboPsu: 150, caseCooler: 100, total: 850, gpuPct: '37.6%' },
  { tier: '1440p High FPS ($1,450)', gpu: 580, cpu: 260, memoryStorage: 180, moboPsu: 240, caseCooler: 190, total: 1450, gpuPct: '40.0%' },
  { tier: '4K Ultra Enthusiast ($2,600)', gpu: 1150, cpu: 420, memoryStorage: 300, moboPsu: 420, caseCooler: 310, total: 2600, gpuPct: '44.2%' },
];

export function GamingPcComponentBudgetDistributionChart() {
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
          Optimal Gaming PC Component Budget Distribution ($ USD)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Recommended component dollar allocation across 1080p, 1440p, and 4K gaming performance tiers
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TIER_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="tier" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.tier}</div>
                      <div className="text-blue-600 font-bold">Graphics Card (GPU): ${data.gpu} ({data.gpuPct})</div>
                      <div className="text-indigo-600">Processor (CPU): ${data.cpu}</div>
                      <div className="text-emerald-600">RAM &amp; NVMe Storage: ${data.memoryStorage}</div>
                      <div className="text-amber-600">Motherboard &amp; PSU: ${data.moboPsu}</div>
                      <div className="text-violet-600">Chassis &amp; Cooler: ${data.caseCooler}</div>
                      <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        Total System Cost: ${data.total}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="gpu" name="Graphics Card (GPU)" stackId="a" fill="#3b82f6" />
            <Bar dataKey="cpu" name="Processor (CPU)" stackId="a" fill="#6366f1" />
            <Bar dataKey="memoryStorage" name="RAM & NVMe SSD" stackId="a" fill="#10b981" />
            <Bar dataKey="moboPsu" name="Motherboard & PSU" stackId="a" fill="#f59e0b" />
            <Bar dataKey="caseCooler" name="Case & Cooling" stackId="a" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">GPU Golden Ratio</span>
          <strong className="text-blue-600 dark:text-blue-400">38% - 44% of Budget</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">1440p Sweet Spot</span>
          <strong className="text-slate-900 dark:text-white">$1,450 Rig (~650W PSU)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Memory Standard</span>
          <strong className="text-emerald-600 dark:text-emerald-400">32GB DDR5 + 2TB NVMe</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">4K Power Sizing</span>
          <strong className="text-amber-600 dark:text-amber-400">850W–1000W 80+ Gold</strong>
        </div>
      </div>
    </div>
  );
}
