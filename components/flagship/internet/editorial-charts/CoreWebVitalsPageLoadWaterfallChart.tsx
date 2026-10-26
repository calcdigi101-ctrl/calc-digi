"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { site: "Optimized Next.js", ttfb: 80, download: 350, domParse: 180, total: 610 },
  { site: "Modern SPA", ttfb: 150, download: 720, domParse: 450, total: 1320 },
  { site: "Average E-Commerce", ttfb: 280, download: 1450, domParse: 850, total: 2580 },
  { site: "Heavy Media Portal", ttfb: 550, download: 2600, domParse: 1600, total: 4750 },
];

export function CoreWebVitalsPageLoadWaterfallChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Page Load Latency Waterfall: TTFB vs Asset Download vs DOM Render (ms)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Component loading phases mapped against Google Core Web Vitals Largest Contentful Paint (LCP 2,500 ms threshold).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="site" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="ttfb" name="Server TTFB (ms)" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="download" name="Asset Network Download (ms)" stackId="a" fill="#3b82f6" />
            <Bar dataKey="domParse" name="Client DOM Parse & Script Execution (ms)" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
