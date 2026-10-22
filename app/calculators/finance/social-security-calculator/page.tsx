import Calculator from "@/components/calcs/finance/social-security-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/social-security-calculator";
const DESCRIPTION =
  "Free Social Security calculator: see your monthly benefit at every claiming age from 62 to 70, your full retirement age by birth year, and lifetime benefits.";

export const metadata = calcMetadata(PATH, "Social Security Calculator – Benefits by Age | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Social Security Calculator"
      intro="See how your Social Security retirement benefit changes depending on when you claim, from age 62 to 70."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Full retirement age</h2>
          <DataTable
            head={["Year of birth", "Full retirement age (FRA)"]}
            rows={[
              ["1943–1954", "66"],
              ["1955", "66 and 2 months"],
              ["1956", "66 and 4 months"],
              ["1957", "66 and 6 months"],
              ["1958", "66 and 8 months"],
              ["1959", "66 and 10 months"],
              ["1960 or later", "67"],
            ]}
          />
          <h2>How claiming age changes your benefit</h2>
          <ul>
            <li>
              <strong>Claiming early:</strong> benefits are cut by 5/9 of 1% for each of the first 36 months before FRA, and
              5/12 of 1% for each additional month. At 62 with an FRA of 67, that&rsquo;s a 30% reduction — permanently.
            </li>
            <li>
              <strong>Delaying:</strong> you earn delayed retirement credits of 2/3 of 1% per month (8% a year) after FRA, up
              to age 70. With an FRA of 67, claiming at 70 pays 124%.
            </li>
          </ul>
          <h3>Example</h3>
          <p>
            A $2,000 benefit at FRA 67 becomes <strong>$1,400</strong> at 62 or <strong>$2,480</strong> at 70. Waiting from 62
            to 70 increases the monthly check by about 77%.
          </p>
          <h2>Which age is best?</h2>
          <p>
            Delaying usually pays off if you expect to live past your early 80s, since the larger checks eventually make up for
            the years you waited. Claiming earlier can make sense with health concerns, an immediate need for income, or as
            part of a married couple&rsquo;s strategy where the higher earner delays to maximize the survivor benefit.
          </p>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement Income & Longevity Tools</h3>
            <p>
              Deciding when to claim Social Security between ages 62 and 70 significantly alters lifetime retirement income. Integrate your benefits into a complete nest egg model with our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, optimize employer-sponsored retirement savings using the <a href="/calculators/finance/401k-calculator">401k Calculator</a>, build tax-free private reserves via the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, and adjust future income for purchasing power loss with our <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "Where do I find my benefit at full retirement age?",
          a: "Sign in to your my Social Security account at ssa.gov. Your statement shows your estimated benefit at 62, at full retirement age and at 70 based on your actual earnings record.",
        },
        {
          q: "Are Social Security benefits taxed?",
          a: "Up to 85% of benefits can be subject to federal income tax if your combined income exceeds certain thresholds. Some states also tax benefits.",
        },
        {
          q: "Do benefits increase with inflation?",
          a: "Yes. Benefits receive an annual cost-of-living adjustment (COLA) based on inflation — 2.8% for 2026. This calculator shows figures in today's dollars.",
        },
      ]}
      related={[
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
        { href: "/calculators/finance/roth-ira-calculator", icon: "🌱", name: "Roth IRA" },
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
