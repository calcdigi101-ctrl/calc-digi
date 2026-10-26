"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { profile: "Single User", streaming: 25, conferencing: 6, gaming: 4, cloud: 15, headroom: 15 },
  { profile: "Couple (WFH)", streaming: 35, conferencing: 12, gaming: 8, cloud: 30, headroom: 25 },
  { profile: "Family of 4", streaming: 75, conferencing: 18, gaming: 12, cloud: 30, headroom: 40 },
  { profile: "Smart Home Power", streaming: 100, conferencing: 24, gaming: 16, cloud: 60, headroom: 60 },
];

export function ConcurrentBandwidthAllocationChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Concurrent Bandwidth Allocation by Household Profile (Mbps Stack)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Stacked bandwidth consumption demonstrating peak simultaneous network load across 4K media, Zoom video, gaming, and QoS headroom.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="profile" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="streaming" name="4K Video Streaming" stackId="a" fill="#ef4444" />
            <Bar dataKey="conferencing" name="Video Conferencing" stackId="a" fill="#3b82f6" />
            <Bar dataKey="gaming" name="Gaming Low Latency" stackId="a" fill="#10b981" />
            <Bar dataKey="cloud" name="Cloud Backups" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="headroom" name="QoS Buffer (30%)" stackId="a" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
