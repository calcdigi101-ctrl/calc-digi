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

const GUEST_MATRIX = [
  { group: '10 Guests', beerCans: 23, wineBottles: 3, softDrinks: 13, iceLbs: 15, totalDrinks: 50 },
  { group: '25 Guests', beerCans: 56, wineBottles: 8, softDrinks: 31, iceLbs: 38, totalDrinks: 125 },
  { group: '50 Guests', beerCans: 113, wineBottles: 15, softDrinks: 63, iceLbs: 75, totalDrinks: 250 },
  { group: '75 Guests', beerCans: 169, wineBottles: 23, softDrinks: 94, iceLbs: 113, totalDrinks: 375 },
  { group: '100 Guests', beerCans: 225, wineBottles: 30, softDrinks: 125, iceLbs: 150, totalDrinks: 500 },
];

export function PartyDrinksFoodSupplyMatrixChart() {
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
          Party Beverage &amp; Ice Provisioning Matrix (4-Hour Event)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Standard catering formula: 2 drinks in hour 1 + 1 drink each subsequent hour (5 drinks/guest total)
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GUEST_MATRIX} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="group" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.group} (4 Hours)</div>
                      <div className="text-amber-600 font-medium">Beer / Seltzers: ~{data.beerCans} cans</div>
                      <div className="text-rose-600 font-medium">Wine (750ml): ~{data.wineBottles} bottles</div>
                      <div className="text-blue-600 font-medium">Sodas / Waters: ~{data.softDrinks} cans</div>
                      <div className="text-cyan-600 font-medium">Bagged Ice: {data.iceLbs} lbs</div>
                      <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        Total Beverage Servings: {data.totalDrinks}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="beerCans" name="Beer Cans / Bottles" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wineBottles" name="Wine (750ml Bottles)" fill="#e11d48" radius={[4, 4, 0, 0]} />
            <Bar dataKey="softDrinks" name="Soft Drinks & Water" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="iceLbs" name="Bagged Ice (lbs)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Drink Multiplier</span>
          <strong className="text-slate-900 dark:text-white">5 Drinks / Person (4 hrs)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Ice Formula</span>
          <strong className="text-cyan-600 dark:text-cyan-400">1.5 lbs / Guest</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Beer Share</span>
          <strong className="text-amber-600 dark:text-amber-400">45% of Servings</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Wine Bottle Yield</span>
          <strong className="text-rose-600 dark:text-rose-400">5 Glasses / 750ml</strong>
        </div>
      </div>
    </div>
  );
}
