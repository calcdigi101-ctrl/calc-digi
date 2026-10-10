"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PALETTE, type Chart } from "./types";
import { axisBy, formatBy } from "./format";

const tooltipStyle = {
  contentStyle: { borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 },
  labelStyle: { fontWeight: 600, color: "#0f172a" },
};
const tick = { fontSize: 12, fill: "#64748b" };

export function DonutChart({ chart }: { chart: Extract<Chart, { type: "donut" }> }) {
  const data = chart.data.filter((d) => d.value > 0);
  const total = data.reduce((a, d) => a + d.value, 0);
  return (
    <div className="mx-auto h-[180px] w-[180px]" role="img" aria-label={data.map((d) => `${d.name} ${Math.round((d.value / total) * 100)}%`).join(", ")}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={data.length > 1 ? 2 : 0} stroke="none" animationDuration={500}>
            {data.map((d, i) => (
              <Cell key={d.name} fill={d.color ?? PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v) => [`${formatBy(chart.format, Number(v))} · ${Math.round((Number(v) / total) * 100)}%`]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SeriesChart({ chart }: { chart: Exclude<Chart, { type: "donut" }> }) {
  const color = (i: number, c?: string) => c ?? PALETTE[i % PALETTE.length];
  const common = { data: chart.data, margin: { top: 8, right: 8, bottom: 0, left: 0 } };
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.25} vertical={false} />
      <XAxis dataKey={chart.x} tick={tick} tickLine={false} axisLine={false} minTickGap={20} />
      <YAxis tickFormatter={(n) => axisBy(chart.format, Number(n))} tick={tick} tickLine={false} axisLine={false} width={64} />
      <Tooltip {...tooltipStyle} formatter={(v) => formatBy(chart.format, Number(v))} cursor={{ fill: "rgba(148,163,184,0.12)" }} />
      {chart.series.length > 1 ? <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} /> : null}
    </>
  );
  return (
    <div className="h-[300px] w-full" role="img" aria-label={chart.title ?? chart.series.map((s) => s.name).join(", ")}>
      <ResponsiveContainer width="100%" height="100%">
        {chart.type === "line" ? (
          <LineChart {...common}>
            {axes}
            {chart.series.map((s, i) => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={color(i, s.color)} strokeWidth={2.5} dot={false} />
            ))}
          </LineChart>
        ) : chart.type === "area" ? (
          <AreaChart {...common}>
            {axes}
            {chart.series.map((s, i) => (
              <Area key={s.key} type="monotone" dataKey={s.key} name={s.name} stackId="a" stroke={color(i, s.color)} fill={color(i, s.color)} fillOpacity={0.25} strokeWidth={2} />
            ))}
          </AreaChart>
        ) : (
          <BarChart {...common}>
            {axes}
            {chart.series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                stackId={chart.type === "stacked-bar" ? "a" : undefined}
                fill={color(i, s.color)}
                radius={chart.type === "stacked-bar" && i < chart.series.length - 1 ? 0 : [4, 4, 0, 0]}
                maxBarSize={48}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

/** Remaining balance (filled) with cumulative principal and interest paid, by year. */
export function AmortizationChart({ data }: { data: { label: string; Balance: number; "Principal paid": number; "Interest paid": number }[] }) {
  return (
    <div className="h-[300px] w-full" role="img" aria-label="Chart of remaining loan balance, cumulative principal and cumulative interest by year">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="amort-bal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.25} vertical={false} />
          <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} minTickGap={20} />
          <YAxis tickFormatter={(n) => axisBy("usd0", Number(n))} tick={tick} tickLine={false} axisLine={false} width={64} />
          <Tooltip {...tooltipStyle} formatter={(v) => formatBy("usd0", Number(v))} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
          <Area type="monotone" dataKey="Balance" stroke="#2563eb" strokeWidth={2.5} fill="url(#amort-bal)" />
          <Area type="monotone" dataKey="Principal paid" stroke="#10b981" strokeWidth={2} fill="none" />
          <Area type="monotone" dataKey="Interest paid" stroke="#f59e0b" strokeWidth={2} fill="none" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
