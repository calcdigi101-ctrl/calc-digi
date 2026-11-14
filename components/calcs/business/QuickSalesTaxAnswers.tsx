"use client";

import React, { useCallback } from "react";

const RATES = [5, 6, 7, 7.25, 8.25] as const;

interface LookupRow {
  amount: number;
  amountLabel: string;
  rates: Record<number, { tax: string; total: string }>;
}

const LOOKUP_DATA: LookupRow[] = [
  {
    amount: 20,
    amountLabel: "$20.00",
    rates: {
      5: { tax: "$1.00", total: "$21.00" },
      6: { tax: "$1.20", total: "$21.20" },
      7: { tax: "$1.40", total: "$21.40" },
      7.25: { tax: "$1.45", total: "$21.45" },
      8.25: { tax: "$1.65", total: "$21.65" },
    },
  },
  {
    amount: 35,
    amountLabel: "$35.00",
    rates: {
      5: { tax: "$1.75", total: "$36.75" },
      6: { tax: "$2.10", total: "$37.10" },
      7: { tax: "$2.45", total: "$37.45" },
      7.25: { tax: "$2.54", total: "$37.54" },
      8.25: { tax: "$2.89", total: "$37.89" },
    },
  },
  {
    amount: 50,
    amountLabel: "$50.00",
    rates: {
      5: { tax: "$2.50", total: "$52.50" },
      6: { tax: "$3.00", total: "$53.00" },
      7: { tax: "$3.50", total: "$53.50" },
      7.25: { tax: "$3.63", total: "$53.63" },
      8.25: { tax: "$4.13", total: "$54.13" },
    },
  },
  {
    amount: 100,
    amountLabel: "$100.00",
    rates: {
      5: { tax: "$5.00", total: "$105.00" },
      6: { tax: "$6.00", total: "$106.00" },
      7: { tax: "$7.00", total: "$107.00" },
      7.25: { tax: "$7.25", total: "$107.25" },
      8.25: { tax: "$8.25", total: "$108.25" },
    },
  },
  {
    amount: 250,
    amountLabel: "$250.00",
    rates: {
      5: { tax: "$12.50", total: "$262.50" },
      6: { tax: "$15.00", total: "$265.00" },
      7: { tax: "$17.50", total: "$267.50" },
      7.25: { tax: "$18.13", total: "$268.13" },
      8.25: { tax: "$20.63", total: "$270.63" },
    },
  },
  {
    amount: 500,
    amountLabel: "$500.00",
    rates: {
      5: { tax: "$25.00", total: "$525.00" },
      6: { tax: "$30.00", total: "$530.00" },
      7: { tax: "$35.00", total: "$535.00" },
      7.25: { tax: "$36.25", total: "$536.25" },
      8.25: { tax: "$41.25", total: "$541.25" },
    },
  },
  {
    amount: 1000,
    amountLabel: "$1,000.00",
    rates: {
      5: { tax: "$50.00", total: "$1,050.00" },
      6: { tax: "$60.00", total: "$1,060.00" },
      7: { tax: "$70.00", total: "$1,070.00" },
      7.25: { tax: "$72.50", total: "$1,072.50" },
      8.25: { tax: "$82.50", total: "$1,082.50" },
    },
  },
  {
    amount: 20000,
    amountLabel: "$20,000.00",
    rates: {
      5: { tax: "$1,000", total: "$21,000" },
      6: { tax: "$1,200", total: "$21,200" },
      7: { tax: "$1,400", total: "$21,400" },
      7.25: { tax: "$1,450", total: "$21,450" },
      8.25: { tax: "$1,650", total: "$21,650" },
    },
  },
];

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

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡</span> Common Sales Tax Rates &amp; Quick Calculations
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Quick-reference sales tax lookup table for standard US state rates (5%, 6%, 7%, 7.25%, 8.25%).
          Click any cell to load those exact purchase numbers directly into the calculator above.
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-slate-100 dark:bg-slate-800 px-3.5 py-3 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-700 whitespace-nowrap"
              >
                Purchase Amount
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                5% Tax (Total)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                6% Tax (Total)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                7% Tax (Total)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                7.25% Tax (Total)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                8.25% Tax (Total)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {LOOKUP_DATA.map((row) => (
              <tr key={row.amount} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap"
                >
                  {row.amountLabel}
                </th>
                {RATES.map((rate) => {
                  const cell = row.rates[rate];
                  return (
                    <td key={rate} className="px-1.5 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleCellClick(row.amount, rate)}
                        aria-label={`Calculate ${rate}% sales tax on ${row.amountLabel}: tax ${cell.tax}, total ${cell.total}`}
                        title={`Click to fill: ${row.amountLabel} at ${rate}%`}
                        className="group w-full min-w-[110px] rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 px-2.5 py-2 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                      >
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {cell.tax}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 font-normal ml-1">
                          ({cell.total})
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
        <span>Format: <strong className="text-emerald-600 dark:text-emerald-400">Tax Due</strong> <span className="text-slate-500">(Gross Total)</span> &bull; Tax-Exclusive Retail Pricing</span>
        <span className="italic">💡 Click any cell to test custom scenarios or adjust local surcharges in the calculator above</span>
      </div>
    </section>
  );
}
