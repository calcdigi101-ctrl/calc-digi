"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { res: "720p HD", h264: 3.5, hevc: 2.2, av1: 1.6 },
  { res: "1080p FHD (30 fps)", h264: 6.0, hevc: 3.8, av1: 2.8 },
  { res: "1080p FHD (60 fps)", h264: 9.0, hevc: 5.6, av1: 4.2 },
  { res: "1440p QHD (60 fps)", h264: 16.0, hevc: 10.2, av1: 7.5 },
  { res: "4K UHD (60 fps)", h264: 35.0, hevc: 22.5, av1: 16.0 },
];

export function StreamingBitrateCodecEfficiencyChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Video Compression Codec Bandwidth Demands by Resolution (Mbps)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparative required transmission bitrates across legacy H.264 (AVC), modern HEVC (H.265), and next-generation AV1 video codecs.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="res" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} label={{ value: "Mbps", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="h264" name="H.264 / AVC (Legacy)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="hevc" name="HEVC / H.265 (Modern)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="av1" name="AV1 (Next-Gen Open)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
