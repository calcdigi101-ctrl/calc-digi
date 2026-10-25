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

const STOPPING_DIST_DATA = [
  { speedKmh: 30, speedMph: 19, perceptionDistM: 8.3, brakingDistM: 4.5, totalStopM: 12.8 },
  { speedKmh: 50, speedMph: 31, perceptionDistM: 13.9, brakingDistM: 12.5, totalStopM: 26.4 },
  { speedKmh: 70, speedMph: 43, perceptionDistM: 19.4, brakingDistM: 24.5, totalStopM: 43.9 },
  { speedKmh: 90, speedMph: 56, perceptionDistM: 25.0, brakingDistM: 40.5, totalStopM: 65.5 },
  { speedKmh: 110, speedMph: 68, perceptionDistM: 30.6, brakingDistM: 60.5, totalStopM: 91.1 },
  { speedKmh: 130, speedMph: 81, perceptionDistM: 36.1, brakingDistM: 84.5, totalStopM: 120.6 },
  { speedKmh: 150, speedMph: 93, perceptionDistM: 41.7, brakingDistM: 112.5, totalStopM: 154.2 },
];

export function VelocityDecelerationStoppingChart() {
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
          Velocity vs Quadratic Stopping Distance (1.0s Reaction + 0.8g Braking)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Braking distance scales quadratically with velocity (d = v² / 2a), while perception reaction scales linearly.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={STOPPING_DIST_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="speedKmh" tick={{ fontSize: 11 }} unit=" km/h" />
            <YAxis tick={{ fontSize: 11 }} unit=" m" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.speedKmh} km/h ({data.speedMph} mph)</p>
                      <p className="mt-1 text-amber-600 dark:text-amber-400">Reaction Distance: {data.perceptionDistM} m</p>
                      <p className="text-rose-600 dark:text-rose-400">Braking Distance (v²/2a): {data.brakingDistM} m</p>
                      <p className="font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 mt-1">Total Emergency Stop: {data.totalStopM} m</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="perceptionDistM" name="Perception Distance (1s delay)" stackId="1" stroke="#f59e0b" fill="#fef3c7" />
            <Area type="monotone" dataKey="brakingDistM" name="Kinetic Braking Distance (0.8g)" stackId="1" stroke="#ef4444" fill="#fee2e2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
