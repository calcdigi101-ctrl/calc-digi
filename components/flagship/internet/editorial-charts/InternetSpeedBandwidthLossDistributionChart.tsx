"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { tier: "25 Mbps DSL", advertised: 25, delivered: 19, overhead: 6 },
  { tier: "100 Mbps Cable", advertised: 100, delivered: 84, overhead: 16 },
  { tier: "300 Mbps Cable", advertised: 300, delivered: 252, overhead: 48 },
  { tier: "500 Mbps Fiber", advertised: 500, delivered: 465, overhead: 35 },
  { tier: "1 Gbps Fiber", advertised: 1000, delivered: 940, overhead: 60 },
];

export function InternetSpeedBandwidthLossDistributionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Broadband Speed Delivery: Advertised Capacity vs Real Delivered Throughput (Mbps)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Empirical comparison showing TCP/IP framing, Wi-Fi attenuation, and ISP aggregation loss across standard consumer internet tiers.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="delivered" name="Delivered Throughput (Mbps)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="overhead" name="Protocol & Wi-Fi Deficit (Mbps)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
