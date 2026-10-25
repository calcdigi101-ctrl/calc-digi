"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { discount: "0% Discount", unitPrice: 100, grossProfit: 40, requiredVolume: 100 },
  { discount: "10% Discount", unitPrice: 90, grossProfit: 30, requiredVolume: 133 },
  { discount: "20% Discount", unitPrice: 80, grossProfit: 20, requiredVolume: 200 },
  { discount: "25% Discount", unitPrice: 75, grossProfit: 15, requiredVolume: 267 },
  { discount: "30% Discount", unitPrice: 70, grossProfit: 10, requiredVolume: 400 },
];

export function DiscountMarginErosionCurveChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Discount Margin Erosion & Required Sales Volume Expansion
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          At an initial 40% gross margin, offering a 20% discount cuts unit profit in half, requiring a 100% volume surge to maintain parity.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="discount" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Units / Index", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="grossProfit" name="Unit Gross Profit ($)" fill="#10b981" />
            <Bar dataKey="requiredVolume" name="Sales Volume Index to Break Even" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
