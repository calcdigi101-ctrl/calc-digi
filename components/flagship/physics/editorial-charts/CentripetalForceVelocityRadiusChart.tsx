'use client';

import React, { useState, useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CENTRIPETAL_DATA = [
  { speedKmh: 30, speedMps: 8.3, r25mKN: 3.89, r50mKN: 1.94, r100mKN: 0.97 },
  { speedKmh: 50, speedMps: 13.9, r25mKN: 10.80, r50mKN: 5.40, r100mKN: 2.70 },
  { speedKmh: 70, speedMps: 19.4, r25mKN: 21.17, r50mKN: 10.58, r100mKN: 5.29 },
  { speedKmh: 90, speedMps: 25.0, r25mKN: 35.00, r50mKN: 17.50, r100mKN: 8.75 },
  { speedKmh: 110, speedMps: 30.6, r25mKN: 52.36, r50mKN: 26.18, r100mKN: 13.09 },
  { speedKmh: 130, speedMps: 36.1, r25mKN: 73.34, r50mKN: 36.67, r100mKN: 18.33 },
];

export function CentripetalForceVelocityRadiusChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Cornering Centripetal Force vs Speed by Curve Radius (Mass = 1,400 kg)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Centripetal cornering force scales with velocity squared (v²/r): doubling vehicle speed quadruples lateral tire grip demand.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={CENTRIPETAL_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="speedKmh" tick={{ fontSize: 11 }} unit=" km/h" />
            <YAxis tick={{ fontSize: 11 }} unit=" kN" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Speed: {data.speedKmh} km/h</p>
                      <p className="mt-1 text-rose-600 dark:text-rose-400">Tight Curve (r=25m): {data.r25mKN} kN</p>
                      <p className="text-amber-600 dark:text-amber-400">Medium Ramp (r=50m): {data.r50mKN} kN</p>
                      <p className="text-blue-600 dark:text-blue-400">Highway Sweeper (r=100m): {data.r100mKN} kN</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="r25mKN" name="Radius 25m (kN)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="r50mKN" name="Radius 50m (kN)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="r100mKN" name="Radius 100m (kN)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
