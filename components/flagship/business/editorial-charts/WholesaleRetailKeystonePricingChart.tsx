"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { tier: "$10 COGS", cogs: 10, wholesaleMargin: 6.67, retailMargin: 16.67, msrp: 33.34 },
  { tier: "$25 COGS", cogs: 25, wholesaleMargin: 16.67, retailMargin: 41.67, msrp: 83.34 },
  { tier: "$50 COGS", cogs: 50, wholesaleMargin: 33.33, retailMargin: 83.34, msrp: 166.67 },
  { tier: "$100 COGS", cogs: 100, wholesaleMargin: 66.67, retailMargin: 166.67, msrp: 333.34 },
];

export function WholesaleRetailKeystonePricingChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Supply Chain Price Stacking: Landed COGS to Wholesale & Retail Keystone MSRP ($)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Visualizing unit cost escalation as brand wholesale margin (40% margin) and retailer keystone markup (100% markup / 50% margin) are compounded.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="tier" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit="$" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`$${Number(value).toFixed(2)}`]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="cogs" name="Landed Factory COGS ($)" fill="#64748b" stackId="price" />
            <Bar dataKey="wholesaleMargin" name="Brand Wholesale Margin ($)" fill="#0ea5e9" stackId="price" />
            <Bar dataKey="retailMargin" name="Retailer Keystone Margin ($)" fill="#10b981" stackId="price" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
