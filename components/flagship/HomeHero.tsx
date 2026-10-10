import { Check } from "lucide-react";
import { TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { CategoryDirectory } from "./CategoryDirectory";
import { ScientificCalculator } from "./ScientificCalculator";
import { SearchPalette } from "./SearchPalette";

const POPULAR: [string, string][] = [
  ["BMI", "/calculators/health/bmi-calculator"],
  ["Mortgage", "/calculators/finance/mortgage-calculator"],
  ["Loan", "/calculators/finance/loan-calculator"],
  ["Calorie", "/calculators/health/calorie-calculator"],
  ["Percentage", "/calculators/math/percentage-calculator"],
  ["Age", "/calculators/datetime/age-calculator"],
];

/**
 * Homepage hero: headline, search and popular links on the left, the
 * scientific calculator beside them on desktop; the 4-category directory below.
 */
export function HomeHero() {
  return (
    <section className="fx bg-slate-50 pb-12 pt-8 sm:pt-10 dark:bg-slate-950">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="text-center lg:col-span-5 lg:text-left">
            <h1
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.1] dark:text-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Free Online Calculators
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-400">
              {TOTAL_CALCULATOR_COUNT}+ fast, accurate calculators for finance, health, math and everyday life.
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-700 lg:justify-start dark:text-slate-300">
              {["100% free", "No sign-up", "Nothing stored"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-6 max-w-xl lg:mx-0">
              <SearchPalette total={TOTAL_CALCULATOR_COUNT} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Popular:</span>
              {POPULAR.map(([name, href]) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-3xl lg:col-span-7 lg:max-w-none">
            <ScientificCalculator />
          </div>
        </div>
        <div className="mt-12">
          <CategoryDirectory />
        </div>
      </div>
    </section>
  );
}
