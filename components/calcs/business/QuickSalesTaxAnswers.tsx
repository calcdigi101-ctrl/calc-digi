"use client";

import React, { useCallback, useEffect } from "react";

const AMOUNTS = [50, 100, 250, 350, 500, 1000, 2500, 3000, 5000];
const RATES = [5, 6, 6.5, 7, 7.25, 8.25, 8.875, 10];

function calculateCell(amount: number, ratePct: number) {
  const tax = Math.round(amount * (ratePct / 100) * 100) / 100;
  const total = Math.round((amount + tax) * 100) / 100;
  return {
    taxStr: `$${tax.toFixed(2)}`,
    totalStr: `$${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    display: `$${tax.toFixed(2)} → $${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };
}

function setNativeInputValue(element: HTMLInputElement, value: string | number) {
  const stringVal = String(value);
  const proto = Object.getPrototypeOf(element);
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (setter) {
    setter.call(element, stringVal);
  } else {
    element.value = stringVal;
  }
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

export function QuickSalesTaxAnswers() {
  const handleCellClick = useCallback((amount: number, rate: number) => {
    const amountInput = document.getElementById("sales-tax-calculator-amount") as HTMLInputElement | null;
    const stateRateInput = document.getElementById("sales-tax-calculator-stateRate") as HTMLInputElement | null;
    const localRateInput = document.getElementById("sales-tax-calculator-localRate") as HTMLInputElement | null;

    if (amountInput) setNativeInputValue(amountInput, amount);
    if (stateRateInput) setNativeInputValue(stateRateInput, rate);
    if (localRateInput) setNativeInputValue(localRateInput, 0);

    // Sync query params in address bar without reload
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("amount", String(amount));
      url.searchParams.set("stateRate", String(rate));
      url.searchParams.set("localRate", "0");
      window.history.replaceState({}, "", url.toString());
    } catch {}

    // Smooth scroll to top of calculator
    if (amountInput) {
      amountInput.scrollIntoView({ behavior: "smooth", block: "center" });
      amountInput.focus();
    }
  }, []);

  // Handle direct URL query param if user lands with ?rate=X instead of ?stateRate=X
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const rateParam = params.get("rate");
    if (rateParam && !params.get("stateRate")) {
      const stateRateInput = document.getElementById("sales-tax-calculator-stateRate") as HTMLInputElement | null;
      const localRateInput = document.getElementById("sales-tax-calculator-localRate") as HTMLInputElement | null;
      if (stateRateInput) setNativeInputValue(stateRateInput, rateParam);
      if (localRateInput) setNativeInputValue(localRateInput, 0);
    }
  }, []);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡</span> Quick Sales Tax Answers
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Precomputed tax and gross totals for common purchase amounts and statutory sales tax rates.
          Click any cell to automatically load that calculation into the tool above.
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-slate-100 dark:bg-slate-800 px-3 py-2.5 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-700 whitespace-nowrap"
              >
                Purchase Amount
              </th>
              {RATES.map((rate) => (
                <th
                  key={rate}
                  scope="col"
                  className="px-2.5 py-2.5 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap"
                >
                  {rate}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {AMOUNTS.map((amt) => (
              <tr key={amt} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-900 px-3 py-2 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap"
                >
                  ${amt.toLocaleString("en-US")}
                </th>
                {RATES.map((rate) => {
                  const cell = calculateCell(amt, rate);
                  return (
                    <td key={rate} className="px-1.5 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleCellClick(amt, rate)}
                        aria-label={`Calculate ${rate}% sales tax on $${amt}: tax $${cell.taxStr}, total $${cell.totalStr}`}
                        title={`Click to fill: $${amt.toLocaleString("en-US")} at ${rate}%`}
                        className="group w-full min-w-[84px] rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 px-2 py-1.5 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                      >
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {cell.taxStr}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 mx-1">→</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {cell.totalStr}
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Format: <strong className="text-emerald-600 dark:text-emerald-400">Tax Due</strong> → <strong className="text-slate-700 dark:text-slate-300">Gross Total</strong> (Tax-Exclusive)</span>
        <span className="italic">💡 Click any cell to test custom scenarios or adjust local surcharges</span>
      </div>
    </section>
  );
}
