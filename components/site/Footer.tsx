import { CATEGORIES, categoryPath, getCategory, type CategoryId } from "@/lib/calculators";

const COLUMNS: { id: CategoryId; title: string; links: [string, string][] }[] = [
  {
    id: "health",
    title: "Health",
    links: [
      ["BMI Calculator", "/calculators/health/bmi-calculator"],
      ["Calorie Calculator", "/calculators/health/calorie-calculator"],
      ["TDEE Calculator", "/calculators/health/tdee-calculator"],
      ["Macro Calculator", "/calculators/health/macro-calculator"],
      ["BMR Calculator", "/calculators/health/bmr-calculator"],
      ["Body Fat Calculator", "/calculators/health/body-fat-calculator"],
    ],
  },
  {
    id: "finance",
    title: "Finance",
    links: [
      ["Mortgage Calculator", "/calculators/finance/mortgage-calculator"],
      ["Loan Calculator", "/calculators/finance/loan-calculator"],
      ["Tax Calculator", "/calculators/finance/tax-calculator"],
      ["Compound Interest", "/calculators/finance/compound-interest-calculator"],
      ["Retirement Calculator", "/calculators/finance/retirement-calculator"],
      ["Salary Calculator", "/calculators/finance/salary-calculator"],
    ],
  },
  {
    id: "math",
    title: "Math",
    links: [
      ["Percentage Calculator", "/calculators/math/percentage-calculator"],
      ["Fraction Calculator", "/calculators/math/fraction-calculator"],
      ["Scientific Calculator", "/calculators/math/scientific-calculator"],
      ["Average Calculator", "/calculators/math/average-calculator"],
      ["Probability Calculator", "/calculators/math/probability-calculator"],
    ],
  },
];

/** Site footer, server-rendered so every category and policy page is linked in the HTML. */
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-mark" style={{ color: "#fff" }}>
                  CalcDigi<span className="logo-dot" />
                </span>
              </div>
              <p>Free, accurate calculators for health, finance, math and everyday life, with an optional AI assistant.</p>
              <div className="footer-brand-links">
                <a href="/pages/about">About</a>
                <a href="/pages/contact">Contact</a>
                <a href="/sitemap.xml">Sitemap</a>
              </div>
            </div>
            {COLUMNS.map((col) => (
              <div key={col.id}>
                <h2 className="footer-h">{col.title}</h2>
                <ul>
                  {col.links.map(([name, href]) => (
                    <li key={href}>
                      <a href={href}>{name}</a>
                    </li>
                  ))}
                  <li>
                    <a href={categoryPath(col.id)}>
                      → All {getCategory(col.id).calculators.length} {col.title} Calculators
                    </a>
                  </li>
                </ul>
              </div>
            ))}
            <div>
              <h2 className="footer-h">Company</h2>
              <ul>
                <li><a href="/pages/about">About Us</a></li>
                <li><a href="/pages/contact">Contact</a></li>
                <li><a href="/pages/blog">Blog</a></li>
                <li><a href="/pages/privacy-policy">Privacy Policy</a></li>
                <li><a href="/pages/terms-of-service">Terms of Service</a></li>
                <li><a href="/pages/disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <nav className="footer-cats" aria-label="All calculator categories">
            <h2 className="footer-h">All categories</h2>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a href={categoryPath(c.id)}>
                    {c.label} <span>({c.calculators.length})</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} CalcDigi. All rights reserved. Results are for informational purposes only.</p>
            <div className="footer-bottom-links">
              <a href="/pages/privacy-policy">Privacy</a>
              <a href="/pages/terms-of-service">Terms</a>
              <a href="/pages/disclaimer">Disclaimer</a>
              <a href="/pages/contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <button type="button" className="back-top" id="back-top" aria-label="Back to top">
        ↑
      </button>
    </>
  );
}
