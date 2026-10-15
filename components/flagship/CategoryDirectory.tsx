import { ArrowRight, Calculator, Dumbbell, Landmark, Wrench, Sparkles } from "lucide-react";
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
      ["Percentage Calculator", "/calculators/math/percentage-calculator"],
      ["Fraction Calculator", "/calculators/math/fraction-calculator"],
      ["Scientific Calculator", "/calculators/math/scientific-calculator"],
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
      ["Time Zone Calculator", "/calculators/datetime/time-zone-calculator"],
      ["Unit Converter", "/calculators/conversion/length-converter"],
      ["Date Difference", "/calculators/datetime/date-difference-calculator"],
    ],
  },
];

/**
 * Most Popular Calculators Section with Integrated "Ask CalcDigi AI" Card
 */
export function CategoryDirectory() {
  return (
    <div id="popular-calculators">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            Top Trending
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Most Popular Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            The mathematical tools people rely on every single day.
          </p>
        </div>
        <a 
          href="/calculators" 
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Explore all 341+ tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* 4 Standard Category Cards */}
        {GROUPS.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 p-6 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-2xl ${g.accent} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {g.title}
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
                  {g.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block py-0.5">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={g.more}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>More {g.title.toLowerCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}

        {/* 5th Integrated AI Card: Ask CalcDigi AI */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 dark:from-slate-900 dark:to-emerald-950/30 rounded-[28px] border-2 border-emerald-500/40 dark:border-emerald-500/30 p-6 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#046a38] text-white flex items-center justify-center text-sm shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  AI ASSISTANT
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                  Ask CalcDigi AI
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Not sure which calculator to pick or how to interpret a formula? Ask our assistant in plain English.
            </p>

            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-slate-600 dark:text-slate-300 italic mb-4">
              &quot;Which calculator should I use for a side-hustle tax estimate?&quot;
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              data-open-ai
              className="w-full py-2.5 px-4 rounded-xl bg-[#046a38] hover:bg-[#03542c] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Try AI Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
