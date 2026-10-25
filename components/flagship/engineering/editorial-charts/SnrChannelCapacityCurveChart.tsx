'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BandwidthTier {
  id: string;
  name: string;
  bandwidthMhz: number;
  capacityAt20dbMbps: number;
  capacityAt30dbMbps: number;
  standardTech: string;
}

const BANDWIDTH_TIERS: BandwidthTier[] = [
  {
    id: 'bw5',
    name: '5 MHz (Narrowband / IoT)',
    bandwidthMhz: 5,
    capacityAt20dbMbps: 33.2,
    capacityAt30dbMbps: 49.8,
    standardTech: 'Narrowband IoT, emergency communications, SCADA radio telemetry.',
  },
  {
    id: 'bw20',
    name: '20 MHz (4G LTE / Wi-Fi Base)',
    bandwidthMhz: 20,
    capacityAt20dbMbps: 132.9,
    capacityAt30dbMbps: 199.3,
    standardTech: '4G LTE carrier, Wi-Fi 2.4 GHz legacy channel, DVB-T2 digital television.',
  },
  {
    id: 'bw80',
    name: '80 MHz (Wi-Fi 6 / 5G Mid-Band)',
    bandwidthMhz: 80,
    capacityAt20dbMbps: 531.5,
    capacityAt30dbMbps: 797.3,
    standardTech: 'Wi-Fi 5 / Wi-Fi 6 5GHz wide channels, 5G NR C-band (n77/n78).',
  },
  {
    id: 'bw160',
    name: '160 MHz (Wi-Fi 6E / 7 Ultra)',
    bandwidthMhz: 160,
    capacityAt20dbMbps: 1063.0,
    capacityAt30dbMbps: 1594.6,
    standardTech: 'Wi-Fi 6E / Wi-Fi 7 6GHz ultra-wide channel for multi-gigabit wireless links.',
  },
];

export function SnrChannelCapacityCurveChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('bw80');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = BANDWIDTH_TIERS.find((b) => b.id === selectedId) || BANDWIDTH_TIERS[2];

  // Shannon capacity: C = B * log2(1 + 10^(SNR/10))
  const snrPoints = [0, 5, 10, 15, 20, 25, 30, 35, 40];
  const chartData = snrPoints.map((snr) => {
    const snrLinear = Math.pow(10, snr / 10);
    const spectralEff = Math.log(1 + snrLinear) / Math.LN2;
    const capacityMbps = active.bandwidthMhz * spectralEff;
    return {
      snrLabel: `${snr} dB`,
      snrNum: snr,
      capacityMbps: Number(capacityMbps.toFixed(1)),
      spectralEff: Number(spectralEff.toFixed(2)),
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
            Shannon-Hartley Channel Capacity vs. Signal-to-Noise Ratio (SNR)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Theoretical maximum error-free throughput limit (Mbps) as a function of SNR (dB) across RF bandwidths
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-300">
          IEEE 802.11 &amp; 3GPP Standards
        </span>
      </div>

      {/* Bandwidth Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {BANDWIDTH_TIERS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedId(b.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedId === b.id
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="snrLabel" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" Mbps" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">SNR: {d.snrLabel}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Shannon Capacity: {d.capacityMbps} Mbps ({(d.capacityMbps / 1000).toFixed(2)} Gbps)
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        Spectral Efficiency: {d.spectralEff} bits/s/Hz
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="capacityMbps"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#capacityGradient)"
              name="Shannon Capacity (Mbps)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stat Metric Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Capacity at 30 dB (Wi-Fi)</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.capacityAt30dbMbps.toFixed(0)} Mbps
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Capacity at 20 dB (Cellular)</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.capacityAt20dbMbps.toFixed(0)} Mbps
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Channel Bandwidth (B)</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.bandwidthMhz} MHz
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Peak Spectral Density</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            9.97 bits/s/Hz
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Standard Wireless Application:</strong> {active.standardTech}
      </p>
    </div>
  );
}
