"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { link: "Local Metro (250 km)", fiber: 2.4, hops: 5.0, buffer: 2.0, lastMile: 8.0, total: 17.4 },
  { link: "Regional (1,200 km)", fiber: 11.8, hops: 8.0, buffer: 4.0, lastMile: 10.0, total: 33.8 },
  { link: "Cross Country (3,900 km)", fiber: 38.2, hops: 12.0, buffer: 6.0, lastMile: 12.0, total: 68.2 },
  { link: "Transatlantic (5,500 km)", fiber: 53.9, hops: 14.0, buffer: 8.0, lastMile: 10.0, total: 85.9 },
  { link: "Transpacific (8,200 km)", fiber: 80.3, hops: 16.0, buffer: 12.0, lastMile: 14.0, total: 122.3 },
];

export function NetworkLatencyComponentBreakdownChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Round-Trip Latency (RTT) Component Waterfall by Geographical Distance (ms)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Stack breakdown isolating optical fiber speed of light propagation, router hop switching, bufferbloat queuing, and Wi-Fi last-mile access.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="link" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="fiber" name="Fiber Optical Propagation" stackId="a" fill="#3b82f6" />
            <Bar dataKey="hops" name="Router Hop Switching" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="buffer" name="Queueing & Bufferbloat" stackId="a" fill="#ef4444" />
            <Bar dataKey="lastMile" name="Last-Mile Local Wi-Fi" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
