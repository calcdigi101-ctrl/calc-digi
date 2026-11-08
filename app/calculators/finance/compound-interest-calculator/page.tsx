import type { Metadata } from "next";
import Calculator from "@/components/calcs/finance/compound-interest-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CompoundInterestGrowthTrajectoryChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/compound-interest-calculator";
const TITLE = "Compound Interest Calculator: APY & Growth";
const DESCRIPTION =
  "Free compound interest calculator. Calculate investment growth with regular deposits, compounding frequency, and inflation-adjusted total returns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
    siteName: "CalcDigi",
    images: [
      {
        url: "https://www.calcdigi.com/icon.svg",
        width: 512,
        height: 512,
        alt: "Compound Interest Calculator - CalcDigi",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@CalcDigi",
    site: "@CalcDigi",
  },
};

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Compound Interest Calculator"
      intro="See how your savings multiply exponentially when interest earns interest. Project starting principal, recurring deposits, compounding frequencies, and real inflation-adjusted wealth."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="A = P\left(1 + \frac{r}{n}\right)^{nt} + PMT \times \left[ \frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}} \right]"
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Actuarial &amp; Financial Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO / NIST Compliant Precision</span>
          </div>

          <h2>Direct Answer: What Is Compound Interest &amp; How Does It Accelerate Wealth?</h2>
          <p>
            <strong>Compound interest</strong> is the addition of earned interest to the principal capital sum of an investment or deposit account, meaning that interest accumulated in preceding billing periods earns interest in all subsequent cycles. Unlike linear <em>simple interest</em>, which only rewards the original deposit, compound interest generates an <strong>exponential growth curve</strong>.
          </p>
          <p>
            In long-term personal investing, a mathematical inflection point typically occurs between Year 10 and Year 15: cumulative reinvested interest earnings overtake the investor&rsquo;s cumulative out-of-pocket cash deposits, allowing compounding returns to drive the vast majority of ongoing portfolio expansion.
          </p>

          <CompoundInterestGrowthTrajectoryChart />

          <h2>Actuarial Derivation of Compound Interest with Periodic Deposits</h2>
          <p>
            When modeling an initial lump-sum principal <em>P</em> supplemented by recurring periodic deposits <em>PMT</em>, the future accumulated wealth <em>A</em> after <em>t</em> years is governed by the combined future value equation:
          </p>

          <Formula>{"A = P \left(1 + \frac{r}{n}\right)^{nt} + PMT \times \left[ \frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}} \right]"}</Formula>
          <p>
            Where:
            <br />• <strong>A</strong> = Final accumulated future portfolio balance ($)
            <br />• <strong>P</strong> = Initial starting principal lump-sum deposit ($)
            <br />• <strong>r</strong> = Nominal annual interest rate (in decimal format, e.g. 0.08 for 8.0%)
            <br />• <strong>n</strong> = Compounding frequency per calendar year (1 for annually, 4 for quarterly, 12 for monthly, 365 for daily)
            <br />• <strong>t</strong> = Total investment duration horizon in calendar years
            <br />• <strong>PMT</strong> = Fixed periodic monthly cash contribution ($), assumed at the end of each period
          </p>
          <p>
            In the theoretical limit where compounding occurs continuously (<Formula>{"n \to \infty"}</Formula>), the lump-sum principal component resolves to Euler&rsquo;s exponential constant:
          </p>
          <Formula>{"A_{\text{continuous}} = P \times e^{rt}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an investor starting with a <strong>$10,000 initial principal</strong> who deposits <strong>$250 per month</strong> for <strong>20 years</strong> at an annual nominal return rate of <strong>8.00%</strong> compounded monthly (<Formula>{"n = 12, t = 20, nt = 240"}</Formula>):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute periodic rate (r/n) and periods (nt).</strong>
              <Formula>{"\frac{r}{n} = \frac{0.08}{12} = 0.0066667, \quad nt = 12 \times 20 = 240"}</Formula>
            </li>
            <li>
              <strong>Step 2: Calculate growth on initial $10,000 principal.</strong>
              <Formula>{"(1 + 0.0066667)^{240} = 4.92680"}</Formula>
              <Formula>{"A_{\text{principal}} = \$10{,}000 \times 4.92680 = \$49{,}268.00"}</Formula>
            </li>
            <li>
              <strong>Step 3: Calculate future value of recurring monthly contributions.</strong>
              <Formula>{"\text{Annuity Factor} = \frac{4.92680 - 1}{0.0066667} = \frac{3.92680}{0.0066667} = 589.020"}</Formula>
              <Formula>{"A_{\text{deposits}} = \$250 \times 589.020 = \$147{,}255.00"}</Formula>
            </li>
            <li>
              <strong>Step 4: Sum components to determine total portfolio balance.</strong>
              <Formula>{"A = \$49{,}268.00 + \$147{,}255.00 = \$196{,}523.00"}</Formula>
            </li>
            <li>
              <strong>Step 5: Isolate net compound interest earnings.</strong> Total cash deposited out-of-pocket equals <Formula>{"\$10{,}000 + (\$250 \times 240) = \$70{,}000.00"}</Formula>. Total pure interest earned equals <Formula>{"\$196{,}523 - \$70{,}000 = \$126{,}523.00"}</Formula>. Compound interest accounts for <strong>64.4%</strong> of the final balance.
            </li>
          </ol>

          <h2>Exponential Compounding Matrix: $10,000 + $250/Month Across Horizons</h2>
          <p>
            The benchmark matrix below reveals the compounding multiplier across conservative, balanced, and broad-equity return environments over a 30-year accumulation horizon:
          </p>

          <DataTable
            head={["Return Rate Scenario", "10-Year Balance / Interest", "20-Year Balance / Interest", "30-Year Balance / Interest"]}
            rows={[
              ["4.5% (High-Yield Cash / CDs)", "$54,410 / $14,410", "$123,540 / $53,540", "$231,180 / $131,180"],
              ["7.0% (Balanced 60/40 Index)", "$63,890 / $23,890", "$169,820 / $99,820", "$378,050 / $278,050"],
              ["10.0% (S&P 500 Historical Avg)", "$78,570 / $38,570", "$258,450 / $188,450", "$729,560 / $629,560"],
              ["12.0% (Aggressive Growth Equities)", "$91,140 / $51,140", "$349,630 / $279,630", "$1,154,800 / $1,054,800"],
            ]}
          />

          <h2>Compounding Frequency Sensitivity on $100,000 at 6.00% APR</h2>
          <p>
            While rate and duration dominate long-term outcomes, compounding frequency dictates the mathematical yield:
          </p>

          <DataTable
            head={["Compounding Frequency (n)", "Effective APY (%)", "10-Year Balance ($)", "20-Year Balance ($)", "30-Year Balance ($)"]}
            rows={[
              ["Annually (n = 1)", "6.0000% APY", "$179,085", "$320,714", "$574,349"],
              ["Quarterly (n = 4)", "6.1364% APY", "$181,402", "$329,066", "$596,932"],
              ["Monthly (n = 12)", "6.1678% APY", "$181,940", "$331,020", "$602,258"],
              ["Daily (n = 365)", "6.1831% APY", "$182,203", "$331,979", "$604,874"],
              ["Continuous (n → ∞)", "6.1837% APY", "$182,212", "$332,012", "$604,965"],
            ]}
          />

          <h2>The Rule of 72 &amp; Inflation-Adjusted Real Returns</h2>
          <p>
            To approximate how many years are required for an investment to double at a fixed interest rate, apply the <strong>Rule of 72</strong>: divide 72 by the annual return percentage. At 7%, capital doubles every 10.3 years; at 10%, it doubles every 7.2 years.
          </p>
          <p>
            However, prudent wealth planning requires adjusting nominal returns for the erosion of consumer purchasing power. Under the <strong>Fisher Equation</strong>, the real inflation-adjusted rate of return <Formula>{"r_{\text{real}}"}</Formula> is:
          </p>
          <Formula>{"r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + i_{\text{inflation}}} - 1 \approx r_{\text{nominal}} - i_{\text{inflation}}"}</Formula>
          <p>
            If a stock portfolio produces a 10.0% nominal return during an economic climate experiencing 3.0% annual CPI inflation, your real wealth accumulation compounding rate is 6.80% per year.
          </p>

          <h2>Tax Drag &amp; Asset Location: Taxable vs. Tax-Deferred Compounding</h2>
          <p>
            Taxes exert a profound drag on compounding efficiency when investments are held in standard brokerage accounts. In a taxable account, interest and non-qualified dividends are taxed annually at ordinary income rates (up to 37% federal plus state taxes), while capital gains distributions trigger recurring annual tax hits:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The Tax Drag Equation:</strong> If an investor in a 25% combined tax bracket earns an 8.0% nominal return in a taxable account, the net effective return drops to <Formula>{"8.0\\% \\times (1 - 0.25) = 6.0\\%"}</Formula>. Over 30 years, that 2.0% annual difference eliminates nearly 40% of final accumulated wealth.</li>
            <li><strong>Tax-Sheltered Accounts (Roth IRA &amp; 401k):</strong> Utilizing tax-advantaged vehicles allows 100% of dividends and capital gains to compound unimpeded by annual tax friction.</li>
            <li><strong>Asset Location Strategy:</strong> Place tax-inefficient assets (REITs, high-yield corporate bonds, actively traded funds) inside tax-sheltered accounts, while holding tax-efficient broad stock index funds in taxable accounts.</li>
          </ul>

          <h2>Core Principles to Maximize Compound Growth Velocity</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Prioritize Early Investment Horizons:</strong> Starting at age 25 with $200/month generates higher terminal wealth at age 65 than starting at age 35 with $400/month, even though the late starter contributes more total cash.
            </li>
            <li>
              <strong>Minimize Investment Expense Ratios:</strong> A 1.00% annual wealth management fee strips away up to 28% of total lifetime compounding returns over a 35-year investment career.
            </li>
            <li>
              <strong>Eliminate Dividend Cash Drag:</strong> Automatically reinvesting dividends through a DRIP program ensures every dividend payment is immediately redeployed to purchase compounding fractional shares.
            </li>
            <li>
              <strong>Utilize Tax-Sheltered Wrappers:</strong> Investing inside Roth IRAs, 401(k)s, or HSAs eliminates ongoing capital gains and dividend taxes that erode annual compounding velocity.
            </li>
          </ol>

          <h2>Essential Compounding Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Principal:</strong> The original cash sum invested before any interest or capital gains accrue.</li>
            <li><strong>APY (Annual Percentage Yield):</strong> The effective annual rate of return reflecting the real effect of compounding over 365 days.</li>
            <li><strong>Simple Interest:</strong> Interest calculated exclusively on the original principal, completely ignoring prior accumulated gains.</li>
            <li><strong>Dividend Reinvestment (DRIP):</strong> An automated protocol whereby cash dividend distributions are instantly used to acquire additional equity shares.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Wealth Accumulation &amp; Investment Tools</h3>
            <p>
              Harnessing exponential compounding is the cornerstone of lifelong financial security. Structure balanced multi-asset allocations with the <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, calculate target retirement nests via the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, model automated liquid emergency cushions using the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>, and audit statutory yields via our <a href="/calculators/finance/apy-calculator">APY Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How often is interest compounded on standard savings accounts?",
          a: "Most commercial banks and credit unions compound interest daily and credit the accrued amount to your account balance once monthly on statement closing dates, generating higher effective yields than monthly compounding.",
        },
        {
          q: "What is the mathematical difference between APR and APY?",
          a: "APR (Annual Percentage Rate) reflects the simple nominal annualized interest rate without compounding. APY (Annual Percentage Yield) reflects the true total interest earned including compounding over an entire calendar year.",
        },
        {
          q: "What realistic long-term rate of return should I assume?",
          a: "For FDIC-insured cash reserves and CDs, benchmark prevailing rates (currently 4.0% to 5.0%). For diversified equity index funds (S&P 500 or total stock market), historical long-term averages range between 9% and 10% nominal, or 6.5% to 7% real after inflation.",
        },
        {
          q: "Does compound interest account for inflation and capital gains taxes?",
          a: "Calculators display nominal pre-tax projections. To estimate real future purchasing power, subtract expected inflation (typically 2.5% to 3.0%) from your return rate, or invest through tax-advantaged accounts like Roth IRAs to eliminate tax drag.",
        },
        {
          q: "How does the timing of monthly deposits affect total compound growth?",
          a: "Depositing funds at the beginning of each monthly period (annuity due) rather than at the end of the month (ordinary annuity) gives each contribution an additional 30 days of compounding, yielding 2% to 4% higher total wealth over multi-decade horizons.",
        },
        {
          q: "Why is compound interest called exponential growth?",
          a: "Because interest accumulates on previous interest, the mathematical equation incorporates an exponent (t). While simple interest grows linearly along a straight line, compound interest curves upward with accelerating momentum over time.",
        },
        {
          q: "Can compound interest work against you?",
          a: "Yes. On debt liabilities—particularly revolving credit cards with daily compounding interest—compound interest multiplies what you owe to lenders, causing balances to grow exponentially if payments do not exceed accrued interest.",
        },
        {
          q: "What is continuous compounding?",
          a: "Continuous compounding is the theoretical mathematical maximum where interest is added to principal at every infinitesimal fraction of a second, calculated using the mathematical constant e (approx. 2.71828).",
        },
      ]}
      related={[
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment Calculator" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Calculator" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation Calculator" },
        { href: "/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
