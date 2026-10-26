"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { pair: "EUR/USD", nominalRate: 1.08, pppRate: 1.15, valuationPct: -6.1 },
  { pair: "GBP/USD", nominalRate: 1.28, pppRate: 1.35, valuationPct: -5.2 },
  { pair: "JPY/USD", nominalRate: 0.0064, pppRate: 0.0092, valuationPct: -30.4 },
  { pair: "CAD/USD", nominalRate: 0.72, pppRate: 0.81, valuationPct: -11.1 },
  { pair: "CHF/USD", nominalRate: 1.11, pppRate: 0.95, valuationPct: 16.8 },
];

export function CurrencyPurchasingPowerParityBasketChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Nominal Exchange Rate vs Purchasing Power Parity (PPP) Benchmark Valuation
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Comparative divergence between interbank spot foreign exchange quotations and real purchasing power consumer basket parities.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="pair" />
            <YAxis label={{ value: "Relative Valuation Gap (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="valuationPct" name="PPP Valuation Gap (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
