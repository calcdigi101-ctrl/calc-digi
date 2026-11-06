"use client";

import { CATEGORIES, categoryPath, type CategoryId } from "@/lib/calculators";

const POPULAR_TOOLS: [string, string][] = [
  ["Mortgage Calculator", "/calculators/finance/mortgage-calculator"],
  ["Compound Interest", "/calculators/finance/compound-interest-calculator"],
  ["BMI & Ideal Weight", "/calculators/health/bmi-calculator"],
  ["Auto Loan Amortization", "/calculators/finance/auto-loan-calculator"],
  ["Salary & Take-Home", "/calculators/finance/take-home-pay-calculator"],
  ["Unit Converter", "/calculators/measurements/length-converter"],
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
                <span className="text-xs sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  Verified
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

              {/* Official Social Profiles */}
              <div className="pt-2 flex items-center gap-2 sm:gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">Follow:</span>
                <a
                  href="https://x.com/CalcDigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  aria-label="CalcDigi on X (Twitter)"
                  title="CalcDigi on X (Twitter)"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/calc-digi-b684a6449/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  aria-label="CalcDigi on LinkedIn"
                  title="CalcDigi on LinkedIn"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/calc.digi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  aria-label="CalcDigi on Instagram"
                  title="CalcDigi on Instagram"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.producthunt.com/@calcdigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#da552f] hover:text-[#da552f] hover:border-[#da552f] flex items-center justify-center transition-all shadow-2xs font-extrabold text-sm hover:scale-105"
                  aria-label="CalcDigi on Product Hunt"
                  title="CalcDigi on Product Hunt"
                >
                  P
                </a>
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
