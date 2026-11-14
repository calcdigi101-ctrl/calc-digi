"use client";

import React, { useCallback } from "react";

interface MatrixRow {
  amount: number;
  amountLabel: string;
  threeYr: string;
  fiveYr: string;
  sevenYr: string;
  tenYr: string;
  fiveYrInterest: string;
}

const MATRIX_DATA: MatrixRow[] = [
  { amount: 5000, amountLabel: "$5,000", threeYr: "$154.39 / mo", fiveYr: "$99.01 / mo", sevenYr: "$75.53 / mo", tenYr: "$58.05 / mo", fiveYrInterest: "$940.36" },
  { amount: 10000, amountLabel: "$10,000", threeYr: "$308.77 / mo", fiveYr: "$198.01 / mo", sevenYr: "$151.06 / mo", tenYr: "$116.11 / mo", fiveYrInterest: "$1,880.72" },
  { amount: 20000, amountLabel: "$20,000", threeYr: "$617.54 / mo", fiveYr: "$396.02 / mo", sevenYr: "$302.11 / mo", tenYr: "$232.22 / mo", fiveYrInterest: "$3,761.44" },
  { amount: 30000, amountLabel: "$30,000", threeYr: "$926.31 / mo", fiveYr: "$594.04 / mo", sevenYr: "$453.17 / mo", tenYr: "$348.33 / mo", fiveYrInterest: "$5,642.16" },
  { amount: 50000, amountLabel: "$50,000", threeYr: "$1,543.85 / mo", fiveYr: "$990.06 / mo", sevenYr: "$755.28 / mo", tenYr: "$580.54 / mo", fiveYrInterest: "$9,403.60" },
  { amount: 100000, amountLabel: "$100,000", threeYr: "$3,087.71 / mo", fiveYr: "$1,980.12 / mo", sevenYr: "$1,510.57 / mo", tenYr: "$1,161.08 / mo", fiveYrInterest: "$18,807.20" },
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

export function CommonLoanPaymentMatrix() {
  const handleCellClick = useCallback((amount: number, years: number) => {
    const amountInput = document.getElementById("loan-amount") as HTMLInputElement | null;
    const rateInput = document.getElementById("loan-rate") as HTMLInputElement | null;
    const termInput = document.getElementById("loan-term") as HTMLInputElement | null;

    if (amountInput) setNativeInputValue(amountInput, amount);
    if (rateInput) setNativeInputValue(rateInput, 7.0);
    if (termInput) setNativeInputValue(termInput, years);

    // Smooth scroll to calculator
    if (amountInput) {
      amountInput.scrollIntoView({ behavior: "smooth", block: "center" });
      amountInput.focus();
    }
  }, []);

  return (
    <section className="my-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡</span> Common Loan Amounts &amp; Monthly Payment Matrix
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Fast reference table showing estimated monthly installment payments across common borrowing amounts at an average <strong>7.0% APR</strong> benchmark. Click any cell to test that scenario in the calculator above.
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[680px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-slate-100 dark:bg-slate-800 px-3.5 py-3 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-700 whitespace-nowrap"
              >
                Loan Amount
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                3 Years (36 Mo)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                5 Years (60 Mo)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                7 Years (84 Mo)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap">
                10 Years (120 Mo)
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 text-center whitespace-nowrap bg-emerald-50/60 dark:bg-emerald-950/20">
                Total Interest (5-Yr)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MATRIX_DATA.map((row) => (
              <tr key={row.amount} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap"
                >
                  {row.amountLabel}
                </th>
                <td className="px-1.5 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleCellClick(row.amount, 3)}
                    title={`Load ${row.amountLabel} for 3 Years at 7.0% APR`}
                    className="group w-full min-w-[100px] rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 px-2 py-1.5 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {row.threeYr}
                    </span>
                  </button>
                </td>
                <td className="px-1.5 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleCellClick(row.amount, 5)}
                    title={`Load ${row.amountLabel} for 5 Years at 7.0% APR`}
                    className="group w-full min-w-[100px] rounded-lg border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 px-2 py-1.5 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                  >
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                      {row.fiveYr}
                    </span>
                  </button>
                </td>
                <td className="px-1.5 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleCellClick(row.amount, 7)}
                    title={`Load ${row.amountLabel} for 7 Years at 7.0% APR`}
                    className="group w-full min-w-[100px] rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 px-2 py-1.5 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {row.sevenYr}
                    </span>
                  </button>
                </td>
                <td className="px-1.5 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleCellClick(row.amount, 10)}
                    title={`Load ${row.amountLabel} for 10 Years at 7.0% APR`}
                    className="group w-full min-w-[100px] rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-emerald-50 px-2 py-1.5 text-center transition-all hover:border-emerald-500 hover:shadow-xs active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-emerald-950/40 dark:hover:border-emerald-500 cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {row.tenYr}
                    </span>
                  </button>
                </td>
                <td className="px-3 py-2 text-center font-medium text-slate-700 dark:text-slate-300 bg-emerald-50/30 dark:bg-emerald-950/10">
                  {row.fiveYrInterest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Benchmark: <strong className="text-emerald-600 dark:text-emerald-400">7.0% Fixed APR</strong> &bull; Standard Monthly Installment Amortization</span>
        <span className="italic">💡 Click any monthly payment cell to simulate early payoffs or adjust interest rates in the calculator</span>
      </div>
    </section>
  );
}
