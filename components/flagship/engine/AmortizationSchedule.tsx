"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Segmented } from "@/components/ui/segmented";
import { usd } from "./format";
import { cn } from "@/lib/cn";

const AmortizationChart = dynamic(() => import("./Charts").then((m) => m.AmortizationChart), {
  ssr: false,
  loading: () => <div className="h-[300px] rounded-lg bg-slate-50 dark:bg-slate-800/40" />,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Row = { period: number; interest: number; principal: number; balance: number };

/** Payment dates start next month, matching how a new loan's first payment is usually due. */
function dateOf(period: number) {
  const d = new Date();
  const m = d.getMonth() + period;
  return `${MONTHS[m % 12]} ${d.getFullYear() + Math.floor(m / 12)}`;
}

/** Same schedule view as the mortgage calculator: balance chart plus a yearly/monthly table. */
export function AmortizationSchedule({ title, principal, rows }: { title: string; principal: number; rows: Row[] }) {
  const [mode, setMode] = useState<"annual" | "monthly">("annual");

  const years: { year: number; interest: number; principal: number; balance: number }[] = [];
  for (const r of rows) {
    const y = Math.ceil(r.period / 12);
    const row = (years[y - 1] ??= { year: y, interest: 0, principal: 0, balance: 0 });
    row.interest += r.interest;
    row.principal += r.principal;
    row.balance = r.balance;
  }
  let cumI = 0;
  let cumP = 0;
  const chart = [
    { label: "Start", Balance: Math.round(principal), "Principal paid": 0, "Interest paid": 0 },
    ...years.map((y) => {
      cumI += y.interest;
      cumP += y.principal;
      return { label: `Yr ${y.year}`, Balance: Math.round(y.balance), "Principal paid": Math.round(cumP), "Interest paid": Math.round(cumI) };
    }),
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <Segmented
          label="Schedule view"
          value={mode}
          onChange={setMode}
          options={[
            { value: "annual", label: "Yearly" },
            { value: "monthly", label: "Monthly" },
          ]}
          className="fx-no-print w-56"
        />
      </div>
      <div className="mt-4">
        <AmortizationChart data={chart} />
      </div>
      <div className="mt-6 max-h-[560px] overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[560px] text-right text-sm tabular-nums">
          <thead className="sticky top-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <tr>
              <th scope="col" className="px-4 py-2.5 text-left font-semibold">
                {mode === "annual" ? "Year" : "Payment"}
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Interest</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Principal</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Ending balance</th>
            </tr>
          </thead>
          <tbody>
            {mode === "annual"
              ? years.map((y) => (
                  <tr key={y.year} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-4 py-2 text-left font-medium">{y.year}</td>
                    <td className="px-4 py-2">{usd(y.interest)}</td>
                    <td className="px-4 py-2">{usd(y.principal)}</td>
                    <td className="px-4 py-2">{usd(y.balance)}</td>
                  </tr>
                ))
              : rows.map((r) => (
                  <tr
                    key={r.period}
                    className={cn("border-t border-slate-200 dark:border-slate-800", r.period % 12 === 0 && "border-b-2 border-b-slate-300 dark:border-b-slate-700")}
                  >
                    <td className="px-4 py-2 text-left font-medium">
                      {r.period}. {dateOf(r.period)}
                    </td>
                    <td className="px-4 py-2">{usd(r.interest)}</td>
                    <td className="px-4 py-2">{usd(r.principal)}</td>
                    <td className="px-4 py-2">{usd(r.balance)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
