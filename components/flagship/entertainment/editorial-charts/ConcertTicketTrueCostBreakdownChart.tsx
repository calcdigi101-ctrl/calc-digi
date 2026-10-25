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

const VENUE_DATA = [
  { venue: 'Club / Small Hall', faceValue: 35, platformFees: 8, parkingTransit: 15, concessionsMerch: 30, total: 88 },
  { venue: 'Historic Theater', faceValue: 85, platformFees: 18, parkingTransit: 25, concessionsMerch: 35, total: 163 },
  { venue: 'Sports Arena Tour', faceValue: 165, platformFees: 45, parkingTransit: 45, concessionsMerch: 90, total: 345 },
  { venue: 'Mega Stadium Pop', faceValue: 240, platformFees: 68, parkingTransit: 60, concessionsMerch: 120, total: 488 },
  { venue: '3-Day Music Festival', faceValue: 380, platformFees: 85, parkingTransit: 90, concessionsMerch: 160, total: 715 },
];

export function ConcertTicketTrueCostBreakdownChart() {
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
          True All-In Concert Night Out Spend by Venue Type ($ USD)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing advertised base ticket face value against hidden platform fees, parking, drinks, and merchandise
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VENUE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="venue" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const feePct = ((data.platformFees / data.faceValue) * 100).toFixed(0);
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.venue}</div>
                      <div className="text-blue-600 font-medium">Face Value: ${data.faceValue}</div>
                      <div className="text-amber-600 font-medium">Platform Fees: ${data.platformFees} (+{feePct}%)</div>
                      <div className="text-indigo-600 font-medium">Parking &amp; Transit: ${data.parkingTransit}</div>
                      <div className="text-emerald-600 font-medium">Concessions &amp; Merch: ${data.concessionsMerch}</div>
                      <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        True Night Total: ${data.total}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="faceValue" name="Ticket Face Value" stackId="a" fill="#3b82f6" />
            <Bar dataKey="platformFees" name="Platform Service Fees" stackId="a" fill="#f59e0b" />
            <Bar dataKey="parkingTransit" name="Parking & Transit" stackId="a" fill="#6366f1" />
            <Bar dataKey="concessionsMerch" name="Food, Drinks & Merch" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Avg Platform Fee</span>
          <strong className="text-amber-600 dark:text-amber-400">24% - 32% Markup</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Arena Night Out</span>
          <strong className="text-slate-900 dark:text-white">$345 Total / Person</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Extras vs Ticket</span>
          <strong className="text-blue-600 dark:text-blue-400">Adds 100%–110%</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Club Gig Value</span>
          <strong className="text-emerald-600 dark:text-emerald-400">&lt; $90 All-In</strong>
        </div>
      </div>
    </div>
  );
}
