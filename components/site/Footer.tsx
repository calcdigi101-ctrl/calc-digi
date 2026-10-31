"use client";

import { CATEGORIES, categoryPath, type CategoryId } from "@/lib/calculators";

const POPULAR_TOOLS: [string, string][] = [
  ["Mortgage Calculator", "/calculators/finance/mortgage-calculator"],
  ["Compound Interest", "/calculators/finance/compound-interest-calculator"],
  ["BMI & Ideal Weight", "/calculators/health/bmi-calculator"],
  ["Auto Loan Amortization", "/calculators/finance/auto-loan-calculator"],
  ["Salary & Take-Home", "/calculators/finance/take-home-pay-calculator"],
  ["Unit & Currency Converter", "/calculators/conversion/length-converter"],
];

const PLATFORM_LINKS: [string, string][] = [
  ["All 20 Categories (341+ Tools)", "/calculators"],
  ["Ask CalcDigi AI Assistant", "/#ai-assistant"],
  ["Learning Center & Guides", "/pages/blog"],
  ["Frequently Asked Questions", "/#faq"],
  ["Calculation Methodology", "/pages/about#methodology"],
  ["2026 Standards Update", "/pages/about#standards"],
];

const TRUST_LINKS: [string, string][] = [
  ["About Us", "/pages/about"],
  ["Contact & Support", "/pages/contact"],
  ["Privacy Policy", "/pages/privacy-policy"],
  ["Terms of Service", "/pages/terms-of-service"],
  ["Medical & Financial Disclaimer", "/pages/disclaimer"],
  ["Sitemap", "/sitemap.xml"],
];

/**
 * Google-compliant, clean, user-friendly footer with complete E-E-A-T trust signals.
 */
export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="bg-slate-50 dark:bg-[#05080f] border-t border-slate-200/90 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 transition-colors pt-8 sm:pt-16 pb-8 sm:pb-12 px-3.5 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Grid: 2-col on mobile, 5-col on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-8 pb-8 sm:pb-12 border-b border-slate-200/80 dark:border-slate-800">
            
            {/* Col 1 & 2: Brand, Purpose & Compliance Trust Signals (Spans 2 cols on mobile & lg) */}
            <div className="col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="size-8 sm:size-9 rounded-xl bg-gradient-to-tr from-[#18533b] to-emerald-500 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-xs">
                  ∑
                </div>
                <span className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  Calc<span className="text-emerald-700 dark:text-emerald-400">Digi</span>
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                CalcDigi is a privacy-first calculation platform engineered to deliver instant, high-precision results across finance, health, science, and everyday math. All algorithms are benchmarked against official IRS, WHO, and NIST standards.
              </p>

              {/* Google / User Trust Badges: compact wrapping row on mobile */}
              <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[11px] font-medium">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <span className="text-emerald-600 dark:text-emerald-400">✓</span> 100% Free &amp; Open
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <span className="text-emerald-600 dark:text-emerald-400">🔒</span> Client-Side Privacy
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <span className="text-emerald-600 dark:text-emerald-400">🛡️</span> Zero Tracking
                </span>
              </div>
            </div>

            {/* Col 3: Popular Calculators */}
            <div className="col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 sm:mb-4">
                Popular Tools
              </h4>
              <ul className="space-y-1 sm:space-y-2.5 text-xs list-none p-0 m-0">
                {POPULAR_TOOLS.map(([title, href]) => (
                  <li key={title}>
                    <a href={href} className="min-h-[32px] inline-flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-0.5 sm:py-0">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Platform & Resources */}
            <div className="col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 sm:mb-4">
                Platform &amp; Guides
              </h4>
              <ul className="space-y-1 sm:space-y-2.5 text-xs list-none p-0 m-0">
                {PLATFORM_LINKS.map(([title, href]) => (
                  <li key={title}>
                    <a href={href} className="min-h-[32px] inline-flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-0.5 sm:py-0">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Trust, Legal & Google Requirements */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 sm:mb-4">
                Trust &amp; Legal
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 space-y-1 sm:space-y-2.5 text-xs list-none p-0 m-0">
                {TRUST_LINKS.map(([title, href]) => (
                  <li key={title}>
                    <a 
                      href={href} 
                      className={`min-h-[32px] inline-flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-0.5 sm:py-0 ${
                        title.includes("Privacy") || title.includes("Terms") ? "font-semibold text-slate-800 dark:text-slate-200" : ""
                      }`}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Essential Google Compliance Disclaimer Notice: Collapsed behind toggle on mobile (<640px), open on desktop */}
          <div className="py-4 sm:py-6 border-b border-slate-200/80 dark:border-slate-800 text-xs sm:text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
            <details className="group">
              <summary className="sm:hidden text-xs font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer min-h-[32px] flex items-center justify-between select-none">
                <span>Read Important Disclaimer &amp; Compliance Notice</span>
                <span className="text-xs transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="hidden sm:block group-open:block mt-2 sm:mt-0 text-xs sm:text-[11px]">
                <p>
                  <strong className="font-semibold text-slate-600 dark:text-slate-400">Important Disclaimer:</strong>{" "}
                  All calculations, formulas, estimations, and content provided by CalcDigi are designed strictly for educational and general informational purposes. While algorithms are rigorously audited against authoritative sources (including IRS tax brackets, WHO growth standards, and NIST constants), results do not constitute formal medical diagnosis, legal counsel, mortgage lending approval, or certified financial advice. Always verify critical figures with a licensed healthcare provider, certified accountant (CPA), or certified financial advisor before making decisions.
                </p>
              </div>
            </details>
          </div>

          {/* Bottom Bar: Copyright & Quick Links */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} CalcDigi. All rights reserved. Zero tracking, client-side precision.
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-xs sm:text-[11px]">
              <a href="/pages/privacy-policy" className="inline-flex items-center min-h-[32px] py-1 hover:underline">Privacy</a>
              <span>•</span>
              <a href="/pages/terms-of-service" className="inline-flex items-center min-h-[32px] py-1 hover:underline">Terms</a>
              <span>•</span>
              <a href="/pages/disclaimer" className="inline-flex items-center min-h-[32px] py-1 hover:underline">Disclaimer</a>
              <span>•</span>
              <a href="/pages/contact" className="inline-flex items-center min-h-[32px] py-1 hover:underline">Contact</a>
              <span>•</span>
              <button 
                type="button"
                id="back-top" 
                onClick={scrollToTop}
                className="min-h-[32px] border-0 bg-transparent p-0 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Back to top</span>
                <span>↑</span>
              </button>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
