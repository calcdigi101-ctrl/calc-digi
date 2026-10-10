"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearRow } from "@/lib/mortgage";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compact = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });

const tooltipStyle = {
  contentStyle: { borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 },
  labelStyle: { fontWeight: 600, color: "#0f172a" },
};

/** Monthly payment proportions (P&I vs taxes vs insurance vs PMI vs HOA). */
export function BreakdownDonut({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  return (
    <div className="mx-auto h-[180px] w-[180px]" role="img" aria-label={data.map((d) => `${d.name} ${Math.round((d.value / total) * 100)}%`).join(", ")}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={data.length > 1 ? 2 : 0}
            stroke="none"
            isAnimationActive
            animationDuration={500}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            {...tooltipStyle}
            formatter={(v) => [`${usd(Number(v))}/mo · ${Math.round((Number(v) / total) * 100)}%`]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Remaining balance with cumulative principal and interest paid, by year. */
export function BalanceChart({ years, startYear, loan }: { years: YearRow[]; startYear: number; loan: number }) {
  let cumInterest = 0;
  let cumPrincipal = 0;
  const data = [
    { year: startYear, Balance: loan, "Principal paid": 0, "Interest paid": 0 },
    ...years.map((y) => {
      cumInterest += y.interest;
      cumPrincipal += y.principal;
      return { year: y.year + 1, Balance: y.balance, "Principal paid": cumPrincipal, "Interest paid": cumInterest };
    }),
  ];
  return (
    <div className="h-[300px] w-full" role="img" aria-label="Chart of remaining loan balance, cumulative principal and cumulative interest by year">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="mc-bal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.25} vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} minTickGap={24} />
          <YAxis tickFormatter={compact} tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} width={64} />
          <Tooltip {...tooltipStyle} formatter={(v) => usd(Number(v))} labelFormatter={(l) => `Start of ${l}`} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
          <Area type="monotone" dataKey="Balance" stroke="#2563eb" strokeWidth={2.5} fill="url(#mc-bal)" />
          <Area type="monotone" dataKey="Principal paid" stroke="#10b981" strokeWidth={2} fill="none" />
          <Area type="monotone" dataKey="Interest paid" stroke="#f59e0b" strokeWidth={2} fill="none" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
