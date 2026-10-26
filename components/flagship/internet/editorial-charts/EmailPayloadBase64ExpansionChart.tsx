"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { item: "5 MB PDF", rawMb: 5.0, wireMb: 6.67, overheadMb: 1.67 },
  { item: "10 MB Deck", rawMb: 10.0, wireMb: 13.33, overheadMb: 3.33 },
  { item: "15 MB Archive", rawMb: 15.0, wireMb: 20.00, overheadMb: 5.00 },
  { item: "18.5 MB File", rawMb: 18.75, wireMb: 25.00, overheadMb: 6.25 },
  { item: "20 MB Video", rawMb: 20.0, wireMb: 26.67, overheadMb: 6.67 },
];

export function EmailPayloadBase64ExpansionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Email Attachment MIME Expansion: Raw Binary Disk Size vs Encoded Wire Payload (MB)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Demonstrates the +33.33% Base64 expansion ratio showing how an 18.75 MB file reaches the strict 25 MB Gmail/Outlook boundary.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="item" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={[0, 30]} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="rawMb" name="Raw Binary Disk File (MB)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wireMb" name="Transmitted Wire Payload (MB)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
