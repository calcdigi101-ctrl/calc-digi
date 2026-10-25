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
  { category: "Department Stores", shoplift: 38, internal: 28, admin: 22, vendor: 12 },
  { category: "Consumer Electronics", shoplift: 52, internal: 24, admin: 14, vendor: 10 },
  { category: "Supermarkets & Grocery", shoplift: 34, internal: 22, admin: 28, vendor: 16 },
  { category: "Apparel & Accessories", shoplift: 44, internal: 30, admin: 16, vendor: 10 },
  { category: "Home Improvement", shoplift: 36, internal: 32, admin: 18, vendor: 14 },
];

export function InventoryShrinkageLossBreakdownChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Retail Inventory Shrinkage Cause Distribution by Merchandising Sector (%)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        National Retail Security Survey benchmark allocations across external theft, employee dishonesty, and paperwork errors.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
            <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value}%`]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="shoplift" name="External Shoplifting (%)" fill="#ef4444" stackId="loss" />
            <Bar dataKey="internal" name="Internal Employee Theft (%)" fill="#f97316" stackId="loss" />
            <Bar dataKey="admin" name="Admin & Scanning Errors (%)" fill="#3b82f6" stackId="loss" />
            <Bar dataKey="vendor" name="Vendor Fraud & Spoilage (%)" fill="#8b5cf6" stackId="loss" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
