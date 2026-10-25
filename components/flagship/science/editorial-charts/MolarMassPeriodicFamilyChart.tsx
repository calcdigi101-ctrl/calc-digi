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
  Cell
} from "recharts";

const data = [
  { compound: "Water (H₂O)", mw: 18.015, bp: 100.0, category: "Hydrogen Bonded Hydride" },
  { compound: "Ethanol (C₂H₆O)", mw: 46.068, bp: 78.4, category: "Primary Alcohol" },
  { compound: "Acetic Acid (C₂H₄O₂)", mw: 60.052, bp: 117.9, category: "Carboxylic Acid" },
  { compound: "Benzene (C₆H₆)", mw: 78.112, bp: 80.1, category: "Aromatic Ring" },
  { compound: "Sulfuric Acid (H₂SO₄)", mw: 98.078, bp: 337.0, category: "Mineral Strong Acid" },
  { compound: "Octane (C₈H₁₈)", mw: 114.229, bp: 125.6, category: "Aliphatic Hydrocarbon" },
  { compound: "Aspirin (C₉H₈O₄)", mw: 180.157, bp: 140.0, category: "Pharmaceutical Analgesic" },
  { compound: "Glucose (C₆H₁₂O₆)", mw: 180.156, bp: 146.0, category: "Hexose Monosaccharide" },
  { compound: "Sucrose (C₁₂H₂₂O₁₁)", mw: 342.297, bp: 186.0, category: "Disaccharide Sugar" }
];

export function MolarMassPeriodicFamilyChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Molar Mass Distribution Across Representative Organic & Inorganic Compounds (g/mol)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparative molecular weight benchmarks from simple hydrides to complex disaccharides.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="compound"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" g/mol" />
            <Tooltip
              formatter={(val, name, item) => [`${val} g/mol`, item.payload.category]}
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Bar dataKey="mw" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.mw > 200 ? "#7c3aed" : entry.mw > 80 ? "#2563eb" : "#06b6d4"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
