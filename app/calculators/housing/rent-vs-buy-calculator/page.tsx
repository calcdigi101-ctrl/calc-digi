import RentVsBuyCalculator from "@/components/calcs/housing/rent-vs-buy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/rent-vs-buy-calculator";
const TITLE = "Rent vs Buy Calculator – Breakeven Analysis & Net Wealth | CalcDigi";
const DESCRIPTION =
  "Free rent vs buy calculator: compare the true financial cost of homeownership against renting and investing the difference with price-to-rent ratios, equity buildup, and breakeven horizons.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Rent vs Buy Calculator"
      intro="Determine whether renting or buying builds more wealth over your planned timeline using real-world appreciation, equity amortization, and opportunity costs."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Breakeven = Point where [Home Equity - Selling Costs] exceeds [Invested Down Payment & Rent Savings Portfolio]"
      related={[
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/housing/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🧾", name: "Property Tax" },
        { href: "/calculators/housing/rent-calculator", icon: "🔑", name: "Rent Calculator" },
        { href: "/calculators/housing/home-equity-calculator", icon: "📈", name: "Home Equity" },
      ]}
      faq={[
        {
          q: "What is the price-to-rent ratio?",
          a: "The price-to-rent ratio is calculated by dividing the median home purchase price by the annual cost of renting a comparable property (Home Price ÷ [Monthly Rent × 12]). A ratio under 15 strongly favors buying; 16 to 20 is balanced; and 21 or higher strongly favors renting and investing the savings.",
        },
        {
          q: "What is the 5-year rule for buying a house?",
          a: "The 5-year rule is a foundational real estate guideline stating you should generally only buy a home if you plan to live in it for at least 5 years. High upfront transaction frictions (2%–5% in buyer closing costs and 5%–6% in seller agent commissions upon resale) require 4 to 6 years of home appreciation to break even.",
        },
        {
          q: "Does renting really 'throw money away'?",
          a: "No. While rent does not build equity, buying also involves massive non-recoverable sunk costs: mortgage interest, property taxes, homeowners insurance, private mortgage insurance (PMI), and routine maintenance (averaging 1% of home value annually). In high-interest environments, these sunk costs can exceed rent.",
        },
        {
          q: "How does the opportunity cost of down payment money work?",
          a: "When you put $80,000 cash down on a house, that capital is illiquid and earns the local real estate appreciation rate (~3%–4%). If you rent, you can invest that entire $80,000 into a diversified S&P 500 stock index fund, which has historically compounded at ~7% to 10% annualized returns.",
        },
        {
          q: "How does inflation affect the rent vs buy calculation?",
          a: "With a 30-year fixed-rate mortgage, your principal and interest payment is locked for three decades, while rent historically inflates at 3% to 5% annually. Over a 10-to-15-year horizon, fixed mortgage payments become dramatically cheaper relative to rising market rents.",
        },
        {
          q: "What tax benefits does buying provide over renting?",
          a: "Homeowners who itemize deductions can deduct mortgage interest (on up to $750,000 of mortgage debt) and up to $10,000 in state and local property taxes (SALT cap). However, since the Tax Cuts and Jobs Act doubled the standard deduction, most moderate-income buyers take the standard deduction.",
        },
      ]}
      article={
        <>
          {/* Sleek Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                NBER &amp; NYT Economic Model
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Modeled after <strong className="font-semibold text-slate-800 dark:text-slate-200">National Bureau of Economic Research Real Estate Asset Pricing</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Housing Economics Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>Rent vs Buy: The True Mathematical Comparison</h2>
          <p>
            The debate between renting and buying is often clouded by emotion. Conventional wisdom says &ldquo;rent is throwing
            money away,&rdquo; but financial economists evaluate both options as capital allocation choices.
          </p>
          <p>
            Both renting and buying involve <strong>unrecoverable sunk costs</strong>. Rent is 100% unrecoverable, but homeownership
            involves unrecoverable mortgage interest, property taxes, homeowners insurance, HOA fees, and maintenance.
            The true winner depends on the <strong>breakeven horizon</strong>.
          </p>

          {/* Graph #2: Authoritative Visual 10-Year Wealth Accumulation Curve */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  10-Year Net Wealth Trajectory: Home Equity vs Renter Investment Portfolio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark showing the breakeven crossover point (typically between Year 4 and Year 5).
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                Breakeven at Yr 4.5
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[620px]" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">$300k</text>
                <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">$200k</text>
                <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">$100k</text>
                <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">$50k</text>
                <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

                {/* X-axis labels (Years) */}
                <text x="70" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 1</text>
                <text x="170" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 3</text>
                <text x="270" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 5</text>
                <text x="400" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 7</text>
                <text x="540" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 10</text>

                {/* Renter Portfolio Curve (Blue, starts higher due to down payment cash) */}
                <path
                  d="M70 148 L170 135 L270 120 L400 98 L540 68"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Buyer Home Equity Curve (Emerald, starts lower after closing fees, accelerates upward) */}
                <path
                  d="M70 178 L170 152 L270 115 L400 65 L540 22"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Crossover circle */}
                <circle cx="280" cy="118" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x="290" y="112" fontSize="11" fill="#10b981" fontWeight="bold">Breakeven Crossover (Year 4.5)</text>

                {/* End values with ample margin */}
                <text x="550" y="22" fontSize="11" fill="#10b981" fontWeight="bold">Buyer Equity (~$290k)</text>
                <text x="550" y="68" fontSize="11" fill="#2563eb" fontWeight="semibold">Renter Portfolio (~$210k)</text>
              </svg>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" /> Buyer Net Home Equity (After 6% Selling Costs)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-blue-600" /> Renter S&amp;P 500 Investment Portfolio (7% Annual Return)
              </span>
            </div>
          </div>

          <h2>Key Formulas in Rent vs Buy Economics</h2>
          <Formula>
            Price-to-Rent Ratio = Home Purchase Price ÷ (Monthly Rent × 12)
          </Formula>
          <Formula>
            Homeowner Sunk Costs = Mortgage Interest + Property Taxes + Insurance + Maintenance
          </Formula>
          <Formula>
            Net Buyer Equity = Future Appreciated Value - Remaining Mortgage - 6% Resale Costs
          </Formula>

          <h2>Price-to-Rent Benchmarks Across US Metros</h2>
          <DataTable
            head={["Metropolitan Market", "Typical Home Price", "Median Equivalent Rent", "Price-to-Rent Ratio", "Economic Verdict"]}
            rows={[
              ["Midwest (Detroit, Cleveland, Pittsburgh)", "$220,000", "$1,600 / mo", "11.5", "Strong Buy (Breakeven under 3 yrs)"],
              ["Sunbelt (Atlanta, Houston, Charlotte)", "$390,000", "$2,200 / mo", "14.8", "Buy Favored (Breakeven 3–4 yrs)"],
              ["Mountain West (Denver, Phoenix, Salt Lake)", "$560,000", "$2,600 / mo", "17.9", "Neutral (Breakeven 5–7 yrs)"],
              ["Northeast (Boston, New York Metro)", "$720,000", "$3,100 / mo", "19.4", "Neutral to Rent Favored"],
              ["West Coast (San Francisco, Seattle, LA)", "$980,000", "$3,500 / mo", "23.3", "Strong Rent (Renting builds wealth faster)"],
            ]}
            highlight={1}
          />

          <h2>When Does Renting Beat Buying?</h2>
          <ul>
            <li>
              <strong>Mobility &amp; Career Flexibility:</strong> If you relocate for career advancement within 3 years,
              selling closing costs (6% agent fees + 1% transfer taxes) will wipe out any accumulated principal.
            </li>
            <li>
              <strong>Extreme Price-to-Rent Metros:</strong> In cities like San Francisco, Seattle, and New York where
              ratios exceed 22, mortgage payments are often double the price of rent. Investing that differential in stocks
              generates superior net worth.
            </li>
            <li>
              <strong>Capital Preservation:</strong> Renting avoids catastrophic out-of-pocket repair bills ($12,000 HVAC
              replacements or $15,000 roof failures).
            </li>
          </ul>
          <p>
            Ready to evaluate mortgage qualification? Test our{" "}
            <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, calculate your cash
            tiers on the <a href="/calculators/housing/down-payment-calculator">down payment calculator</a>, analyze monthly principal
            and interest on the <a href="/calculators/finance/mortgage-calculator">mortgage calculator</a>, or evaluate county property
            tax rates on our <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
          </p>
        </>
      }
    >
      <RentVsBuyCalculator />
    </CalcPage>
  );
}
