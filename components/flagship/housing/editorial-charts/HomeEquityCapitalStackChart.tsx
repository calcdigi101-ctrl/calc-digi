"use client";

import { useState } from "react";

interface Layer {
  id: string;
  name: string;
  amount: number;
  pctOfHome: number;
  cltvRange: string;
  color: string;
  desc: string;
}

const LAYERS: Layer[] = [
  { id: "first", name: "1. Senior Lien (Primary Mortgage)", amount: 280000, pctOfHome: 58.3, cltvRange: "0% – 58.3% CLTV", color: "#3b82f6", desc: "First-position mortgage lien. Lowest interest rate, lowest risk tier." },
  { id: "heloc", name: "2. Available HELOC / Home Equity Loan", amount: 128000, pctOfHome: 26.7, cltvRange: "58.3% – 85.0% CLTV", color: "#10b981", desc: "Borrowable liquidity up to standard 85% lender combined loan-to-value cap." },
  { id: "cushion", name: "3. Mandatory Lender Equity Buffer", amount: 72000, pctOfHome: 15.0, cltvRange: "85.0% – 100.0% CLTV", color: "#94a3b8", desc: "Untouchable equity reserve required to protect lender against market declines." },
];

export function HomeEquityCapitalStackChart() {
  const [active, setActive] = useState<Layer | null>(null);
  const display = active || LAYERS[1]; // Default to HELOC layer
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            The Home Equity Capital Stack ($480,000 Property Value at 85% CLTV)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — $${display.amount.toLocaleString()} (${display.pctOfHome}% of property value)`
              : "Visual breakdown of primary lien, borrowable equity, and the mandatory 15% protective equity cushion. Hover layers to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name.split("(")[0].trim()}: ${display.amount.toLocaleString()} ({display.pctOfHome}%)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {LAYERS.map((layer) => {
          const isSel = display.id === layer.id;
          return (
            <div
              key={layer.id}
              className={`cursor-pointer rounded-xl p-3.5 transition-all border ${
                isSel
                  ? "border-emerald-500 bg-slate-50 shadow-sm ring-1 ring-emerald-500/30 dark:bg-slate-800 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/40"
              }`}
              onMouseEnter={() => setActive(layer)}
              onTouchStart={() => setActive(layer)}
            >
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ backgroundColor: layer.color }} />
                  {layer.name}
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                  ${layer.amount.toLocaleString()} ({layer.pctOfHome}%)
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${layer.pctOfHome * 1.6}%`,
                    backgroundColor: layer.color,
                  }}
                />
              </div>
              {isSel && (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between">
                  <span>{layer.desc}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{layer.cltvRange}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
