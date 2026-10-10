import { TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { CategoryDirectory } from "./CategoryDirectory";
import { ScientificCalculator } from "./ScientificCalculator";
import { SearchPalette } from "./SearchPalette";

/** Homepage hero: scientific calculator, instant search, and the 4-category directory. */
export function HomeHero() {
  return (
    <section className="fx bg-slate-50 pb-12 pt-8 sm:pt-10 dark:bg-slate-950">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
            Free Online Calculators
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            {TOTAL_CALCULATOR_COUNT}+ fast, accurate calculators for finance, health, math and everyday life. No sign-up, nothing
            stored.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          <ScientificCalculator />
          <div className="mt-4">
            <SearchPalette total={TOTAL_CALCULATOR_COUNT} />
          </div>
        </div>
        <div className="mt-10">
          <CategoryDirectory />
        </div>
      </div>
    </section>
  );
}
