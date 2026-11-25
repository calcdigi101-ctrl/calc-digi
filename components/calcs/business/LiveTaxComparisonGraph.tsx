"use client";

import React, { useState, useId } from "react";

interface StateTaxData {
  name: string;
  shortName: string;
  base: number;
  local: number;
  combined: number;
  zeroTax?: boolean;
}

const STATES_DATA: StateTaxData[] = [
  { name: "California", shortName: "CA", base: 7.25, local: 3.50, combined: 10.75 },
  { name: "Illinois", shortName: "IL", base: 6.25, local: 4.00, combined: 10.25 },
  { name: "Missouri", shortName: "MO", base: 4.225, local: 5.875, combined: 10.10 },
  { name: "Tennessee", shortName: "TN", base: 7.00, local: 2.75, combined: 9.75 },
  { name: "New York", shortName: "NY", base: 4.00, local: 4.875, combined: 8.875 },
  { name: "Texas", shortName: "TX", base: 6.25, local: 2.00, combined: 8.25 },
  {
    name: "Delaware, Montana, New Hampshire, Oregon",
    shortName: "Tax-Free States",
    base: 0,
    local: 0,
    combined: 0,
    zeroTax: true,
  },
];

const PRESET_AMOUNTS = [100, 500, 1000, 2500];
const MAX_COMBINED_SCALE = 11.5;

export function LiveTaxComparisonGraph() {
  const [amount, setAmount] = useState<number>(1000);
  const [viewMode, setViewMode] = useState<"rate" | "dollar">("rate");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const inputId = useId();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) || val < 0 ? 0 : val);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="w-full my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 transition-all">
      {/* Header and Title */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 mb-2 border border-emerald-200/50 dark:border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Interactive Live Chart
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Visual Analysis: State Base Rate vs Local Municipal Surcharge Stacking
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Comparing statewide statutory base rates versus average local city, county, and transit surcharges across primary US commercial markets.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-600"></span> State Base Rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Local Surcharge
          </span>
        </div>
      </div>

      {/* Live Interactive Controls */}
      <div className="my-5 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Purchase Amount Input & Quick Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Test Purchase:
          </label>
          <div className="relative inline-flex items-center">
            <span className="absolute left-2.5 text-xs text-slate-400 font-semibold">$</span>
            <input
              id={inputId}
              type="number"
              min="1"
              max="1000000"
              value={amount || ""}
              onChange={handleAmountChange}
              placeholder="1000"
              className="w-24 pl-6 pr-2 py-1 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-1">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`text-[11px] px-2 py-1 rounded-md transition-colors ${
                  amount === preset
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("rate")}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              viewMode === "rate"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Tax Rates (%)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("dollar")}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              viewMode === "dollar"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Dollar Tax ($)
          </button>
        </div>
      </div>

      {/* Dynamic Stacked Bar Rows */}
      <div className="space-y-4 pt-1">
        {STATES_DATA.map((state) => {
          const isZero = state.zeroTax || state.combined === 0;
          const totalBarWidth = isZero ? 0 : (state.combined / MAX_COMBINED_SCALE) * 100;
          const basePortionPct = isZero ? 0 : (state.base / state.combined) * 100;
          const localPortionPct = isZero ? 0 : (state.local / state.combined) * 100;

          const stateTaxDollar = (amount * state.base) / 100;
          const localTaxDollar = (amount * state.local) / 100;
          const totalTaxDollar = (amount * state.combined) / 100;

          const isHovered = hoveredState === state.name;

          return (
            <div
              key={state.name}
              onMouseEnter={() => setHoveredState(state.name)}
              onMouseLeave={() => setHoveredState(null)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isHovered
                  ? "bg-slate-50 dark:bg-slate-800/60 shadow-xs ring-1 ring-slate-200 dark:ring-slate-700"
                  : "bg-transparent"
              }`}
            >
              {/* Row Header with State Name and Calculated Totals */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium mb-1.5 gap-1 text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {state.name}{" "}
                  {!isZero && (
                    <span className="text-slate-500 dark:text-slate-400 font-normal">
                      (Max Combined: {state.combined.toFixed(state.combined % 1 === 0 ? 1 : 2)}%)
                    </span>
                  )}
                </span>

                <div className="text-right">
                  {isZero ? (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      0.00% (Completely Tax-Free) - {formatCurrency(0)} Due
                    </span>
                  ) : viewMode === "dollar" ? (
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Total Tax: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(totalTaxDollar)}</span>{" "}
                      <span className="text-slate-500 dark:text-slate-400 font-normal text-[11px]">
                        ({formatCurrency(stateTaxDollar)} State + {formatCurrency(localTaxDollar)} Local)
                      </span>
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {state.base.toFixed(state.base % 1 === 0 ? 1 : 3)}% Base + {state.local.toFixed(state.local % 1 === 0 ? 1 : 3)}% Local
                    </span>
                  )}
                </div>
              </div>

              {/* Bar track */}
              {isZero ? (
                <div className="w-full h-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 overflow-hidden flex items-center px-3">
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide">
                    Zero State and Local Surcharge: Save {formatCurrency((amount * 10.75) / 100)} compared to California
                  </span>
                </div>
              ) : (
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/90 rounded-full overflow-hidden flex items-center">
                  <div
                    style={{ width: `${totalBarWidth}%` }}
                    className="h-full flex rounded-full overflow-hidden transition-all duration-300"
                  >
                    <div
                      style={{ width: `${basePortionPct}%` }}
                      className="h-full bg-blue-600 transition-all duration-300 hover:brightness-110"
                      title={`${state.name} State Base: ${state.base}% (${formatCurrency(stateTaxDollar)})`}
                    ></div>
                    <div
                      style={{ width: `${localPortionPct}%` }}
                      className="h-full bg-emerald-500 transition-all duration-300 hover:brightness-110"
                      title={`${state.name} Local Surcharge: ${state.local}% (${formatCurrency(localTaxDollar)})`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Contextual Summary Box */}
      <div className="mt-5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p>
          <strong>Live Purchase Analysis ({formatCurrency(amount)}):</strong> Purchasing in a 10.75% combined district costs{" "}
          <strong>{formatCurrency((amount * 10.75) / 100)}</strong> in sales tax, while an 8.25% district charges{" "}
          <strong>{formatCurrency((amount * 8.25) / 100)}</strong>, and tax-free states charge <strong>$0.00</strong>.
        </p>
      </div>
    </div>
  );
}
