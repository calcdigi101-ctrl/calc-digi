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

const POWER_CONVERSION_DATA = [
  { motorClass: '1.5 kW Workshop Tool', powerKW: 1.5, hp: 2.0, amps120V: 12.5, amps240V: 6.3 },
  { motorClass: '3.7 kW HVAC Compressor', powerKW: 3.7, hp: 5.0, amps120V: 30.8, amps240V: 15.4 },
  { motorClass: '7.5 kW Industrial Pump', powerKW: 7.5, hp: 10.1, amps120V: 62.5, amps240V: 31.3 },
  { motorClass: '15 kW Machining Spindle', powerKW: 15.0, hp: 20.1, amps120V: 125.0, amps240V: 62.5 },
  { motorClass: '37 kW Factory Conveyor', powerKW: 37.0, hp: 49.6, amps120V: 308.3, amps240V: 154.2 },
  { motorClass: '75 kW Heavy Agitator', powerKW: 75.0, hp: 100.6, amps120V: 625.0, amps240V: 312.5 },
];

export function PowerHorsepowerCurrentChart() {
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
          Motor Rating Comparison: Kilowatts, Brake Horsepower & Current Draw
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Mechanical power conversion across international units (1 HP = 745.7 Watts) and electrical line current at 240V single-phase.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={POWER_CONVERSION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="motorClass" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" tick={{ fontSize: 11 }} unit=" kW" />
            <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fontSize: 11 }} unit=" HP" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.motorClass}</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Kilowatts: {data.powerKW} kW</p>
                      <p className="text-amber-600 dark:text-amber-400">Horsepower: {data.hp} HP</p>
                      <p className="text-slate-500">240V Current: {data.amps240V} Amperes</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar yAxisId="left" dataKey="powerKW" name="Power (kW)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="hp" name="Horsepower (HP)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
