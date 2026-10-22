import Calculator from "@/components/calcs/finance/retirement-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/retirement-calculator";
const DESCRIPTION =
  "Free retirement calculator: project your savings at retirement, the nest egg you need for your target income, and whether your money lasts, with Social Security and inflation included.";

export const metadata = calcMetadata(PATH, "Retirement Calculator – Am I Saving Enough? | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Retirement Calculator"
      intro="See what your savings could grow to by retirement, how big a nest egg your target income needs, and how long your money will last."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How this retirement calculator works</h2>
          <ol>
            <li>
              <strong>Saving years:</strong> your current savings grow at the pre-retirement return, and your monthly
              contribution is added each month until your retirement age.
            </li>
            <li>
              <strong>Income gap:</strong> the monthly income you want, minus Social Security and pensions, is the amount your
              savings must cover. It is raised by inflation every year, both before and during retirement.
            </li>
            <li>
              <strong>Spending years:</strong> from retirement until your planning age, that gap is withdrawn each month
              while the remaining balance earns the (usually lower) in-retirement return.
            </li>
          </ol>
          <p>The nest egg needed is the present value of those rising withdrawals at retirement:</p>
          <Formula>Needed = W × [1 − ((1 + g) ÷ (1 + r))^n] ÷ (r − g)</Formula>
          <p>
            where <strong>W</strong> is the first monthly withdrawal, <strong>g</strong> monthly inflation,{" "}
            <strong>r</strong> the monthly return in retirement and <strong>n</strong> the number of months.
          </p>
          <h3>Example</h3>
          <p>
            A 35-year-old with $50,000 saved who adds $500 a month at 7% will have about <strong>$965,000</strong> at 65.
            Wanting $5,000 a month in today&rsquo;s money with $1,800 from Social Security leaves a $3,200 gap — about
            $7,770 a month by age 65 after 30 years of 3% inflation. Funding that to age 90 needs roughly $1.84 million, so
            this plan runs short around age 76.
          </p>
          <h2>The 4% rule</h2>
          <p>
            A popular rule of thumb says you can withdraw 4% of your savings in the first year of retirement, then adjust
            for inflation, with a high chance the money lasts 30 years. Divided by 12, that&rsquo;s the &ldquo;4% rule
            income&rdquo; shown above. Put the other way, you need about <strong>25 times</strong> your yearly spending gap.
          </p>
          <h2>How to close a shortfall</h2>
          <ul>
            <li>Increase contributions, especially to capture any 401(k) employer match.</li>
            <li>Work a few years longer: you save more, savings grow longer and you withdraw for fewer years.</li>
            <li>Delay Social Security — benefits rise about 8% for each year you wait past full retirement age, up to 70.</li>
            <li>Plan for lower spending in retirement, such as a paid-off mortgage.</li>
          </ul>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement Planning & Tax-Advantaged Tools</h3>
            <p>
              Achieving financial independence requires establishing a target nest egg based on the 4% safe withdrawal rule. Maximize company match contributions with our <a href="/calculators/finance/401k-calculator">401k Calculator</a>, model tax-free retirement growth using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, project government benefit entitlements with the <a href="/calculators/finance/social-security-calculator">Social Security Calculator</a>, and track compound portfolio growth using our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "How much do I need to retire?",
          a: "A common starting point is 70–80% of your pre-retirement income. Subtract expected Social Security and pensions, and multiply the remaining yearly amount by about 25 for a rough nest-egg target.",
        },
        {
          q: "What return should I assume?",
          a: "Many planners use 6–7% before retirement for a stock-heavy portfolio and 4–5% in retirement as the mix shifts toward bonds. Lower assumptions give a safer plan.",
        },
        {
          q: "Where can I find my Social Security estimate?",
          a: "Create a my Social Security account at ssa.gov to see your personalized benefit estimates at ages 62, full retirement age and 70.",
        },
      ]}
      related={[
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k) Calculator" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/social-security-calculator", icon: "🏛️", name: "Social Security" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
