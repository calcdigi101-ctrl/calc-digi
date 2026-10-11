import type { Metadata } from "next";
import { SearchPalette } from "@/components/flagship/SearchPalette";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT, categoryPath } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Page Not Found | CalcDigi",
  robots: { index: false },
};

const POPULAR: [string, string][] = [
  ["BMI Calculator", "/calculators/health/bmi-calculator"],
  ["Mortgage Calculator", "/calculators/finance/mortgage-calculator"],
  ["Loan Calculator", "/calculators/finance/loan-calculator"],
  ["Calorie Calculator", "/calculators/health/calorie-calculator"],
  ["Percentage Calculator", "/calculators/math/percentage-calculator"],
  ["Age Calculator", "/calculators/datetime/age-calculator"],
  ["Compound Interest", "/calculators/finance/compound-interest-calculator"],
  ["Scientific Calculator", "/calculators/math/scientific-calculator"],
];

export default function NotFound() {
  return (
    <main className="fx bg-slate-50 pb-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">
          The link may be broken or the page may have moved. Search our {TOTAL_CALCULATOR_COUNT} calculators or pick a popular one below.
        </p>
        <div className="mx-auto mt-6 max-w-xl text-left">
          <SearchPalette total={TOTAL_CALCULATOR_COUNT} />
        </div>

        <h2 className="mt-10 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
          Popular calculators
        </h2>
        <ul className="mt-4 grid list-none grid-cols-1 gap-2 pl-0 sm:grid-cols-2">
          {POPULAR.map(([name, href]) => (
            <li key={href}>
              <a
                href={href}
                className="flex min-h-[48px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-800 hover:border-blue-300 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-blue-400"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
          Browse by category
        </h2>
        <ul className="mt-4 flex list-none flex-wrap justify-center gap-2 pl-0">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <a
                href={categoryPath(c.id)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <span aria-hidden>{c.emoji}</span> {c.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <a href="/" className="inline-flex min-h-[48px] items-center rounded-lg bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700">
            Back to the homepage
          </a>
        </p>
      </div>
    </main>
  );
}
