import { ArrowRight, Calculator, Dumbbell, Landmark, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Group = { title: string; icon: LucideIcon; accent: string; more: string; links: [string, string][] };

const GROUPS: Group[] = [
  {
    title: "Financial",
    icon: Landmark,
    accent: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/60",
    more: "/pages/finance",
    links: [
      ["Mortgage Calculator", "/calculators/finance/mortgage-calculator"],
      ["Loan Calculator", "/calculators/finance/loan-calculator"],
      ["Auto Loan Calculator", "/calculators/finance/auto-loan-calculator"],
      ["Compound Interest", "/calculators/finance/compound-interest-calculator"],
      ["Salary Calculator", "/calculators/finance/salary-calculator"],
    ],
  },
  {
    title: "Fitness & Health",
    icon: Dumbbell,
    accent: "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60",
    more: "/pages/health",
    links: [
      ["BMI Calculator", "/calculators/health/bmi-calculator"],
      ["Calorie Calculator", "/calculators/health/calorie-calculator"],
      ["Body Fat Calculator", "/calculators/health/body-fat-calculator"],
      ["BMR Calculator", "/calculators/health/bmr-calculator"],
      ["Ideal Weight Calculator", "/calculators/health/ideal-weight-calculator"],
    ],
  },
  {
    title: "Math",
    icon: Calculator,
    accent: "text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/60",
    more: "/pages/math",
    links: [
      ["Scientific Calculator", "/calculators/math/scientific-calculator"],
      ["Percentage Calculator", "/calculators/math/percentage-calculator"],
      ["Fraction Calculator", "/calculators/math/fraction-calculator"],
      ["Triangle Calculator", "/calculators/math/triangle-calculator"],
    ],
  },
  {
    title: "General Utility",
    icon: Wrench,
    accent: "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/60",
    more: "/calculators",
    links: [
      ["Age Calculator", "/calculators/datetime/age-calculator"],
      ["Date Calculator", "/calculators/datetime/date-difference-calculator"],
      ["Time Duration Calculator", "/calculators/datetime/time-duration-calculator"],
      ["GPA Calculator", "/calculators/education/gpa-calculator"],
    ],
  },
];

/** calculator.net-style 4-column directory of the most-used tools. */
export function CategoryDirectory() {
  return (
    <div className="fx grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {GROUPS.map((g) => (
        <section
          key={g.title}
          aria-labelledby={`dir-${g.title}`}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-3">
            <span className={`flex size-10 items-center justify-center rounded-xl ${g.accent}`}>
              <g.icon aria-hidden className="size-5" />
            </span>
            <h2 id={`dir-${g.title}`} className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
              {g.title}
            </h2>
          </div>
          <ul className="mt-4 flex-1 list-none pl-0">
            {g.links.map(([name, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex min-h-[44px] items-center rounded-md px-2 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={g.more}
            className="mt-3 inline-flex min-h-[44px] items-center gap-1 px-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
          >
            More {g.title === "General Utility" ? "calculators" : g.title.toLowerCase()} <ArrowRight aria-hidden className="size-4" />
          </a>
        </section>
      ))}
    </div>
  );
}
