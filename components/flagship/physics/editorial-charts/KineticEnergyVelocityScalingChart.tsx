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

const KE_SCALING_DATA = [
  { speedKmh: 30, speedMph: 19, sedanKeKJ: 52.1, suvKeKJ: 86.8, truckKeKJ: 173.6 },
  { speedKmh: 50, speedMph: 31, sedanKeKJ: 144.7, suvKeKJ: 241.1, truckKeKJ: 482.3 },
  { speedKmh: 70, speedMph: 43, sedanKeKJ: 283.6, suvKeKJ: 472.6, truckKeKJ: 945.2 },
  { speedKmh: 90, speedMph: 56, sedanKeKJ: 468.8, suvKeKJ: 781.3, truckKeKJ: 1562.5 },
  { speedKmh: 110, speedMph: 68, sedanKeKJ: 699.2, suvKeKJ: 1165.4, truckKeKJ: 2330.9 },
  { speedKmh: 130, speedMph: 81, sedanKeKJ: 975.0, suvKeKJ: 1625.0, truckKeKJ: 3250.0 },
  { speedKmh: 150, speedMph: 93, sedanKeKJ: 1298.1, suvKeKJ: 2163.5, truckKeKJ: 4326.9 },
];

export function KineticEnergyVelocityScalingChart() {
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
          Quadratic Kinetic Energy Escalation vs Speed (KE = ½·m·v²)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Kinetic energy scales quadratically with speed: doubling traveling speed quadruples impact energy across all vehicle weight classes.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={KE_SCALING_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="speedKmh" tick={{ fontSize: 11 }} unit=" km/h" />
            <YAxis tick={{ fontSize: 11 }} unit=" kJ" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.speedKmh} km/h ({data.speedMph} mph)</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Sedan (1,350 kg): {data.sedanKeKJ} kJ</p>
                      <p className="text-amber-600 dark:text-amber-400">SUV (2,250 kg): {data.suvKeKJ} kJ</p>
                      <p className="text-rose-600 dark:text-rose-400">Commercial Van (4,500 kg): {data.truckKeKJ} kJ</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="sedanKeKJ" name="Sedan 1,350kg (kJ)" stroke="#3b82f6" fill="#dbeafe" />
            <Area type="monotone" dataKey="suvKeKJ" name="SUV 2,250kg (kJ)" stroke="#f59e0b" fill="#fef3c7" />
            <Area type="monotone" dataKey="truckKeKJ" name="Van 4,500kg (kJ)" stroke="#ef4444" fill="#fee2e2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
