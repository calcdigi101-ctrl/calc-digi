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

interface PumpDutyPoint {
  id: string;
  name: string;
  dutyFlowLps: number;
  dutyHeadM: number;
  staticLiftM: number;
  bepEfficiencyPct: number;
  motorKw: number;
  application: string;
}

const PUMP_DUTIES: PumpDutyPoint[] = [
  {
    id: 'booster',
    name: 'Commercial Booster (15 L/s @ 45m)',
    dutyFlowLps: 15,
    dutyHeadM: 45,
    staticLiftM: 25,
    bepEfficiencyPct: 78,
    motorKw: 11.0,
    application: 'Multi-story commercial office building domestic water booster system.',
  },
  {
    id: 'irrigation',
    name: 'Agricultural Pivot (40 L/s @ 65m)',
    dutyFlowLps: 40,
    dutyHeadM: 65,
    staticLiftM: 35,
    bepEfficiencyPct: 82,
    motorKw: 37.0,
    application: 'Center-pivot farm irrigation pumping from deep groundwater well.',
  },
  {
    id: 'hvac',
    name: 'HVAC Circulation Loop (25 L/s @ 20m)',
    dutyFlowLps: 25,
    dutyHeadM: 20,
    staticLiftM: 0, // closed loop has 0 static head!
    bepEfficiencyPct: 84,
    motorKw: 7.5,
    application: 'Closed-loop chilled water distribution across district cooling network.',
  },
];

export function PumpSystemHeadCurveChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('booster');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = PUMP_DUTIES.find((p) => p.id === selectedId) || PUMP_DUTIES[0];

  // Generate H-Q Pump curve and System Resistance curve
  // Flow points from 0 to 1.6x of duty flow
  const maxFlow = active.dutyFlowLps * 1.6;
  const flowSteps = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5].map((factor) => factor * active.dutyFlowLps);

  // Pump shutoff head ~ 1.25x duty head; drops parabolically
  const shutoffHead = active.dutyHeadM * 1.25;
  const k_pump = (shutoffHead - active.dutyHeadM) / Math.pow(active.dutyFlowLps, 2);

  // System curve: H_sys = H_static + k_sys * Q^2
  const k_sys = (active.dutyHeadM - active.staticLiftM) / Math.pow(active.dutyFlowLps, 2);

  const chartData = flowSteps.map((q) => {
    const pumpHead = Math.max(0, shutoffHead - k_pump * Math.pow(q, 2));
    const systemHead = active.staticLiftM + k_sys * Math.pow(q, 2);
    return {
      flowLabel: `${q.toFixed(0)} L/s`,
      flowNum: q,
      pumpHeadM: Number(pumpHead.toFixed(1)),
      systemHeadM: Number(systemHead.toFixed(1)),
    };
  });

  if (!mounted) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-64 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/50" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Centrifugal Pump H-Q Curve vs. System Resistance Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intersection marks the Best Efficiency Operating Point (BEP) where pump output matches pipe friction
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-300">
          Hydraulic Institute (HI 14.6)
        </span>
      </div>

      {/* Scenario Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PUMP_DUTIES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedId === p.id
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Recharts Line Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="flowLabel" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" m" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload;
                  const isDuty = Math.abs(d.flowNum - active.dutyFlowLps) < 1;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">Flow: {d.flowLabel}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Pump Generated Head: {d.pumpHeadM} meters
                      </p>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold">
                        System Required Head: {d.systemHeadM} meters
                      </p>
                      {isDuty && (
                        <p className="mt-1 text-emerald-600 font-bold">
                          ★ Duty Operating Point (BEP Intersection)
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => <span className="text-slate-600 dark:text-slate-400">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="pumpHeadM"
              name="Pump Characteristic Curve (H-Q)"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="systemHeadM"
              name="System Resistance Curve (H_static + kQ²)"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stat Metric Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">BEP Operating Flow</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.dutyFlowLps} L/s ({(active.dutyFlowLps * 3.6).toFixed(1)} m³/h)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total Dynamic Head</p>
          <p className="mt-1 text-base font-bold text-amber-600 dark:text-amber-400">
            {active.dutyHeadM} meters ({(active.dutyHeadM * 1.422).toFixed(1)} psi)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Best Efficiency Point</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.bepEfficiencyPct}% Peak Efficiency
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Motor Specification</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.motorKw} kW ({(active.motorKw * 1.341).toFixed(1)} HP)
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Pumping Station Context:</strong> {active.application}
      </p>
    </div>
  );
}
