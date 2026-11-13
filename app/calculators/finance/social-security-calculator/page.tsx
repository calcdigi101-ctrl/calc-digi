import Calculator from "@/components/calcs/finance/social-security-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SocialSecurityClaimingAgeBenefitChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/social-security-calculator";
const TITLE = "Social Security Calculator";
const DESCRIPTION =
  "Free Social Security calculator: compare monthly benefit payouts across claiming ages 62, Full Retirement Age (FRA 67), and age 70. Calculate Primary.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Social Security Calculator"
      intro="Analyze your estimated Social Security retirement benefits across claiming ages 62 to 70. Model lifetime cumulative payouts, delayed retirement credits, and actuarial break-even ages under current Social Security Administration formulas."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Benefit} = \text{PIA} \times (1 - \text{Reduction}_{<\text{FRA}}) \quad \text{or} \quad \text{Benefit} = \text{PIA} \times (1 + 0.08 \times (\text{Age} - \text{FRA}))"
      article={
        <>
          <h2>Direct Answer: How Claiming Age Transforms Social Security Benefits</h2>
          <p>
            Your monthly <strong>Social Security retirement benefit</strong> is anchored to your <strong>Primary Insurance Amount (PIA)</strong>—the monthly check you receive if you claim at your statutory <strong>Full Retirement Age (FRA)</strong>, which is <strong>age 67</strong> for all workers born in 1960 or later. While workers can claim as early as age 62 or delay as late as age 70, the timing of your claim permanently alters your monthly benefit check for life.
          </p>
          <p>
            Claiming early at age 62 inflicts a permanent <strong>30% lifetime reduction</strong> in your monthly benefit. Conversely, delaying past FRA earns <strong>Delayed Retirement Credits (DRCs)</strong> of 8.0% per year up to age 70, yielding a permanent <strong>24% monthly benefit bonus</strong>. Comparing age 62 against age 70, waiting increases monthly payout checks by <strong>76% to 77%</strong> for life.
          </p>

          <SocialSecurityClaimingAgeBenefitChart />

          <h2>Actuarial Mathematics of Primary Insurance Amount (PIA) &amp; Claiming Multipliers</h2>
          <p>
            The Social Security Administration (SSA) derives your baseline PIA by indexing your top 35 earning years to wage growth, calculating your <strong>Average Indexed Monthly Earnings (AIME)</strong>, and applying three progressive actuarial &ldquo;bend points&rdquo;:
          </p>

          <Formula>{"\text{PIA} = 0.90 \times \min(\text{AIME}, b_1) + 0.32 \times \max(0, \min(\text{AIME}, b_2) - b_1) + 0.15 \times \max(0, \text{AIME} - b_2)"}</Formula>
          <p>
            For tax year 2024, the statutory bend points are <Formula>{"b_1 = \$1{,}174"}</Formula> and <Formula>{"b_2 = \$7{,}078"}</Formula>.
          </p>
          <p>
            Depending on your elected claiming age relative to Full Retirement Age (FRA = 67), the SSA applies exact actuarial percentage adjustments:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Claiming at Age 62 (Early):</strong> <Formula>{"\text{Benefit} = \text{PIA} \times 0.700 \text{ (30.0\% permanent reduction)}"}</Formula></li>
            <li><strong>Claiming at Age 65 (Mid-Early):</strong> <Formula>{"\text{Benefit} = \text{PIA} \times 0.867 \text{ (13.3\% permanent reduction)}"}</Formula></li>
            <li><strong>Claiming at Age 67 (FRA):</strong> <Formula>{"\text{Benefit} = \text{PIA} \times 1.000 \text{ (100.0\% base benefit)}"}</Formula></li>
            <li><strong>Claiming at Age 70 (Delayed Maximum):</strong> <Formula>{"\text{Benefit} = \text{PIA} \times 1.240 \text{ (24.0\% permanent increase)}"}</Formula></li>
          </ul>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a worker reaching Full Retirement Age (age 67) with a calculated <strong>Primary Insurance Amount (PIA) of $2,500 per month</strong>, evaluating lifetime payouts across claiming ages 62, 67, and 70:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Option A: Claim at Age 62.</strong> Applying the early claiming formula:
              <Formula>{"\text{Monthly Check} = \$2{,}500 \times 0.70 = \$1{,}750.00 \text{ / month (\$21,000 / year)}"}</Formula>
            </li>
            <li>
              <strong>Option B: Claim at FRA (Age 67).</strong> Baseline entitlement:
              <Formula>{"\text{Monthly Check} = \$2{,}500 \times 1.00 = \$2{,}500.00 \text{ / month (\$30,000 / year)}"}</Formula>
            </li>
            <li>
              <strong>Option C: Delay to Age 70.</strong> Applying delayed retirement credits:
              <Formula>{"\text{Monthly Check} = \$2{,}500 \times 1.24 = \$3{,}100.00 \text{ / month (\$37,200 / year)}"}</Formula>
            </li>
            <li>
              <strong>Step 4: Solve for Actuarial Break-Even Age (62 vs 67).</strong> At age 67, the age 62 claimer has collected 60 checks totaling <Formula>{"\$1{,}750 \times 60 = \$105{,}000"}</Formula>. The age 67 check is $750/month larger. Dividing head start by monthly premium:
              <Formula>{"\text{Break-Even Months} = \frac{\$105{,}000}{\$750} = 140 \text{ months (11.67 years)} \rightarrow \text{Break-Even Age} = 78.7 \text{ years}"}</Formula>
            </li>
            <li>
              <strong>Step 5: Solve for Break-Even Age (62 vs 70).</strong> Between ages 62 and 70, the early claimer collects $168,000. The age 70 check is $1,350/month higher ($3,100 vs $1,750). Break-even occurs in 124.4 months, at <strong>age 80.4</strong>. Living past age 80.4 makes delaying to 70 overwhelmingly more lucrative.
            </li>
          </ol>

          <h2>Cumulative Lifetime Payout Matrix Across Longevity Horizons</h2>
          <p>
            The table below reveals total cumulative Social Security dollars collected for a $2,500/month PIA worker based on lifespan:
          </p>

          <DataTable
            head={["Lifespan Longevity Horizon", "Claim at Age 62 ($1,750/mo)", "Claim at Age 67 ($2,500/mo)", "Claim at Age 70 ($3,100/mo)", "Optimal Actuarial Decision"]}
            rows={[
              ["Dies at Age 75", "$273,000 total", "$240,000 total", "$186,000 total", "Age 62 wins (collected 8 more years)"],
              ["Dies at Age 80", "$378,000 total", "$390,000 total", "$372,000 total", "All ages approximately equal"],
              ["Dies at Age 85", "$483,000 total", "$540,000 total", "$558,000 total", "Age 70 wins (+ $75k over age 62)"],
              ["Dies at Age 90", "$588,000 total", "$690,000 total", "$744,000 total", "Age 70 wins (+ $156k over age 62)"],
              ["Dies at Age 95", "$693,000 total", "$840,000 total", "$930,000 total", "Age 70 wins (+ $237k over age 62)"],
            ]}
          />

          <h2>Spousal Benefits, Survivor Rights &amp; Dual-Earner Coordination</h2>
          <p>
            Married couples must coordinate claiming strategies to maximize cumulative survivor protection:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Spousal Benefit Cap:</strong> A spouse is eligible to receive up to 50% of the primary earner&rsquo;s PIA if claimed at full retirement age, provided the primary spouse has already filed for benefits.</li>
            <li><strong>Survivor Benefit Maximization:</strong> When a spouse passes away, the surviving spouse inherits the larger of the two monthly benefit checks. The higher-earning spouse delaying to age 70 locks in the highest possible survivor benefit for the widow/widower for the rest of their life.</li>
          </ul>

          <h2>The Social Security Retirement Earnings Test (RET)</h2>
          <p>
            If you claim benefits before Full Retirement Age while continuing to work, the SSA withholds benefits if earnings exceed statutory caps:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Under FRA:</strong> The SSA withholds $1 of benefits for every $2 earned above the annual earnings limit ($22,320 in 2024).</li>
            <li><strong>Year Reaching FRA:</strong> The limit increases to $59,520, withholding $1 for every $3 earned above the limit.</li>
            <li><strong>Benefit Recalculation:</strong> Withheld benefits are not permanently lost; upon reaching FRA, the SSA recalculates your monthly check upward to credit the withheld months.</li>
          </ul>

          <h2>Essential Social Security Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Full Retirement Age (FRA):</strong> The statutory age (66 to 67 depending on birth year) at which an individual qualifies for 100% of their unreduced PIA.</li>
            <li><strong>Delayed Retirement Credits (DRCs):</strong> A 2/3 of 1% monthly benefit increase (8% annually) awarded for each month a worker postpones claiming past FRA up to age 70.</li>
            <li><strong>COLA (Cost-of-Living Adjustment):</strong> Annual percentage adjustments to Social Security benefits based on third-quarter CPI-W inflation metrics.</li>
            <li><strong>Windfall Elimination Provision (WEP):</strong> A statutory formula reducing Social Security benefits for individuals who receive pensions from non-covered employment (e.g. state teachers).</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Retirement &amp; Longevity Solvers</h3>
            <p>
              Integrate Social Security into your overall plan via our <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, model workplace retirement savings with the <a href="/calculators/finance/401k-calculator">401(k) Calculator</a>, evaluate tax-sheltered accounts using the <a href="/calculators/finance/roth-ira-calculator">Roth IRA Calculator</a>, and calculate exact chronological age using our <a href="/calculators/datetime/age-calculator">Exact Age Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the best age to claim Social Security?",
          a: "The optimal age depends on health, longevity expectations, and financial need. If you have average or above-average life expectancy (surviving past age 80), delaying to age 70 maximizes cumulative lifetime benefits. If facing serious health issues or urgent financial necessity, claiming at age 62 provides immediate liquidity.",
        },
        {
          q: "Are Social Security benefits taxable by the IRS?",
          a: "Yes, for many retirees. If your combined income (adjusted gross income + non-taxable interest + 50% of your Social Security benefit) exceeds $25,000 for single filers ($32,000 for married couples), up to 50% of benefits are taxable. If combined income exceeds $34,000 ($44,000 married), up to 85% of benefits are subject to federal income tax.",
        },
        {
          q: "Can I collect Social Security from an ex-spouse?",
          a: "Yes, if your marriage lasted at least 10 consecutive years, you are currently unmarried, you are age 62 or older, and your ex-spouse is entitled to benefits. Collecting on an ex-spouse does not impact their benefits or their current spouse's benefits.",
        },
        {
          q: "What happens if I continue working after claiming Social Security?",
          a: "If you are younger than Full Retirement Age, earning above the annual limit ($22,320 in 2024) triggers temporary benefit withholding ($1 for every $2 over the cap). Once you reach Full Retirement Age, the earnings test disappears and you can earn unlimited income with zero benefit reductions.",
        },
        {
          q: "Does my monthly benefit increase if I wait past age 70?",
          a: "No. Delayed Retirement Credits stop accumulating at age 70. There is zero financial incentive to postpone claiming past your 70th birthday.",
        },
        {
          q: "How does Social Security calculate my 35 highest earning years?",
          a: "The SSA indexes your historic annual earnings to national wage inflation and selects your 35 highest-earning years. If you worked fewer than 35 years, zero-income years ($0) are factored into the average, lowering your Primary Insurance Amount.",
        },
        {
          q: "Can I suspend my Social Security benefits after claiming?",
          a: "If you reach Full Retirement Age but wish to pause payments to accrue Delayed Retirement Credits, you can voluntarily suspend your benefits until age 70, allowing your future monthly checks to grow by 8% per year during the suspension.",
        },
        {
          q: "Will Social Security run out of money?",
          a: "Social Security cannot go bankrupt because it is funded by ongoing payroll taxes from current workers. While the trust funds face projected depletion by the mid-2030s without congressional reform, incoming payroll taxes would still fund approximately 80% to 83% of scheduled benefits.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement Savings Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/401k-calculator", icon: "🏛️", name: "401(k) Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/roth-ira-calculator", icon: "💎", name: "Roth IRA Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/tax-calculator", icon: "📑", name: "Tax Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
