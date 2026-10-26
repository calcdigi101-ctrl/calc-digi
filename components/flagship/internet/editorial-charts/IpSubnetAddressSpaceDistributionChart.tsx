"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { cidr: "/24", total: 256, usable: 254, mask: "255.255.255.0" },
  { cidr: "/25", total: 128, usable: 126, mask: "255.255.255.128" },
  { cidr: "/26", total: 64, usable: 62, mask: "255.255.255.192" },
  { cidr: "/27", total: 32, usable: 30, mask: "255.255.255.224" },
  { cidr: "/28", total: 16, usable: 14, mask: "255.255.255.240" },
  { cidr: "/29", total: 8, usable: 6, mask: "255.255.255.248" },
  { cidr: "/30", total: 4, usable: 2, mask: "255.255.255.252" },
];

export function IpSubnetAddressSpaceDistributionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        IPv4 CIDR Subnet Scaling: Usable Host Address Capacity
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Binary geometric progression of usable IPv4 host capacity from /24 enterprise departmental LANs down to /30 point-to-point router links.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="cidr" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="usable" name="Usable Host Capacity" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="Total IP Block Size" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
