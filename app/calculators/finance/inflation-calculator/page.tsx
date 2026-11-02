import Calculator from "@/components/calcs/finance/inflation-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InflationPurchasingPowerDecayChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/inflation-calculator";
const TITLE = "Inflation Calculator — CPI Purchasing Power Decay & Future Cost | CalcDigi";
const DESCRIPTION =
  "Free inflation calculator: model purchasing power decay, historical CPI rate compounding, future equivalent cost of living, and the Fisher equation real return on investments.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Inflation Calculator"
      intro="Measure how price inflation degrades your fiat purchasing power over time. Project future living costs, compute historical equivalent basket values, and calculate real purchasing power."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="FV = PV \times (1 + i)^n \quad \mid \quad \text{Purchasing Power} = \frac{PV}{(1 + i)^n}"
      article={
        <>
          <h2>Direct Answer: What Is Inflation &amp; How Does It Erode Purchasing Power?</h2>
          <p>
            <strong>Monetary inflation</strong> is the general, progressive increase in consumer prices and the corresponding decline in the purchasing power of money over time. When inflation averages 3.0% annually, an identical market basket of consumer goods that costs $100 today will cost $103 next year, $134 in ten years, and $243 in thirty years.
          </p>
          <p>
            Holding static cash in physical currency or non-interest-bearing checking accounts guarantees real financial loss. To maintain standard of living, household earnings and investment portfolios must grow at a rate strictly exceeding the cumulative rate of price inflation after statutory taxes.
          </p>

          <InflationPurchasingPowerDecayChart />

          <h2>Actuarial Mathematics of Inflation Compounding &amp; Future Cost Projections</h2>
          <p>
            Inflation acts as negative compound interest against cash purchasing power. The future dollar cost of an item subject to constant annual inflation is governed by the compound growth equation:
          </p>

          <Formula>{"FV = PV \times (1 + i)^n"}</Formula>
          <p>
            Conversely, the <strong>future purchasing power (PP)</strong> of today&rsquo;s nominal dollars over time is given by:
          </p>
          <Formula>{"\text{Purchasing Power } (PP) = \frac{PV}{(1 + i)^n} = PV \times (1 + i)^{-n}"}</Formula>
          <p>
            Where:
            <br />&bull; <strong>PV:</strong> Present purchasing value or initial baseline cash amount ($)
            <br />&bull; <strong>FV:</strong> Future nominal cost required to buy the identical market basket ($)
            <br />&bull; <strong>i:</strong> Annual inflation rate expressed as a decimal (e.g., 3.5% = 0.035)
            <br />&bull; <strong>n:</strong> Number of compounding years elapsed
          </p>
          <p>
            In economics, the <strong>Fisher Equation</strong> determines the exact <em>Real Interest Rate</em> earned on capital after discounting for inflation:
          </p>
          <Formula>{"r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + i} - 1 \approx r_{\text{nominal}} - i"}</Formula>
          <p>
            The <strong>Rule of 72</strong> provides a swift mental approximation for purchasing power halving: dividing 72 by the annual inflation rate yields the number of years required for prices to double and purchasing power to be cut in half:
          </p>
          <Formula>{"\text{Years to Halve Purchasing Power} \approx \frac{72}{100 \times i}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a household holding <strong>$10,000 in uninvested cash</strong> evaluating purchasing power loss over <strong>10 years at a 3.5% average annual inflation rate</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute the 10-year inflation compound factor.</strong>
              <br />Inflation factor = (1 + 0.035)^10 = (1.035)^10 &asymp; 1.4106.
            </li>
            <li>
              <strong>Step 2: Calculate future equivalent basket cost.</strong>
              <br />To purchase what $10,000 buys today, the household will require:
              <br />FV = $10,000 &times; 1.4106 = <strong>$14,106</strong> in nominal cash.
            </li>
            <li>
              <strong>Step 3: Calculate degraded purchasing power of the $10,000 cash.</strong>
              <br />Purchasing Power = $10,000 / 1.4106 = <strong>$7,089</strong>.
              <br /><em>The cash lost $2,911 (-29.11%) of its real purchasing utility despite no physical dollars vanishing.</em>
            </li>
            <li>
              <strong>Step 4: Verify via Rule of 72.</strong>
              <br />Time to halve purchasing power = 72 / 3.5 &asymp; <strong>20.57 years</strong>.
            </li>
          </ol>

          <h2>Purchasing Power Decay Matrix: $10,000 Cash Across Time &amp; Inflation Rates</h2>
          <p>
            The following actuarial matrix models how $10,000 in physical cash degrades across various macroeconomic inflationary regimes:
          </p>

          <DataTable
            head={["Annual Inflation Rate", "Purchasing Power in 5 Yrs", "Purchasing Power in 10 Yrs", "Purchasing Power in 20 Yrs", "Purchasing Power in 30 Yrs"]}
            rows={[
              ["2.0% (Fed Target)", "$9,057", "$8,203", "$6,730", "$5,521"],
              ["3.0% (Historical Avg)", "$8,626", "$7,441", "$5,537", "$4,120"],
              ["4.0% (Elevated)", "$8,219", "$6,756", "$4,564", "$3,083"],
              ["5.0% (High Inflation)", "$7,835", "$6,139", "$3,769", "$2,314"],
              ["7.0% (Severe Inflation)", "$7,130", "$5,083", "$2,584", "$1,314"],
              ["10.0% (Hyper-regime)", "$6,209", "$3,855", "$1,486", "$573"]
            ]}
          />

          <h2>Consumer Price Index (CPI-U) vs. Personal Inflation Rates</h2>
          <p>
            The Bureau of Labor Statistics (BLS) measures inflation using the <strong>Consumer Price Index for All Urban Consumers (CPI-U)</strong>, tracking eight major expenditure categories: Housing (44.4%), Transportation (16.7%), Food &amp; Beverages (14.3%), Medical Care (8.5%), Recreation (5.4%), Apparel (2.8%), Education &amp; Communication (5.8%), and Other Goods (2.1%).
          </p>
          <p>
            However, your <strong>personal inflation rate</strong> deviates from headline CPI depending on your household spending profile. Families with high college tuition, daycare, and healthcare costs experience far higher realized inflation than debt-free retirees with paid-off homes.
          </p>

          <h2>Proven Asset Classes That Historically Outpace Inflation</h2>
          <p>
            Evaluating historical capital preservation across economic cycles:
          </p>

          <DataTable
            head={["Asset Class", "Nominal 30-Yr Return", "Real After-Inflation Return", "Inflation Beta / Correlation", "Mechanics of Inflation Protection"]}
            rows={[
              ["Broad Equities (S&P 500)", "10.2%", "7.1%", "Moderate / High Long-Term", "Firms pass rising input costs directly to consumers, expanding revenue."],
              ["Real Estate (Direct/REIT)", "8.8%", "5.7%", "High", "Property replacement costs escalate; contractual leases adjust rents upward."],
              ["Treasury Inflation-Protected (TIPS)", "4.5%", "1.5% – 2.0%", "Direct / 1.0 (Exact)", "Principal balance adjusts semi-annually based on non-seasonally adjusted CPI-U."],
              ["Gold &amp; Commodities", "6.2%", "3.1%", "High during spikes / Volatile", "Finite physical supply offsets fiat currency supply debasement."],
              ["Cash HYSA / T-Bills", "3.2%", "0.2% (Often Negative)", "Low / Lagging", "Central bank rate hikes eventually lift yields, but trail inflation surges."]
            ]}
          />

          <h2>Essential Inflation Terminology</h2>
          <p>
            Mastering key macroeconomic and wealth preservation concepts:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Core CPI:</strong> Inflation index that excludes volatile food and energy commodities to track persistent structural price trends.</li>
            <li><strong>Shrinkflation:</strong> Practice of reducing product size or volume while maintaining the same sticker price to conceal price hikes.</li>
            <li><strong>Skimpflation:</strong> Degraded service quality, staffing cuts, or cheaper product reformulations implemented to preserve manufacturer margins.</li>
            <li><strong>Bracket Creep:</strong> Taxation phenomenon where inflation pushes nominal incomes into higher tax brackets without any increase in real purchasing power.</li>
            <li><strong>Stagflation:</strong> Destructive economic condition characterized by stagnant economic growth, high unemployment, and persistently elevated inflation.</li>
          </ul>

          <h3>Related Wealth &amp; Purchasing Power Solvers</h3>
          <p>
            Safeguard your multi-decade savings against monetary dilution: calculate forward compound growth with the <a href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Compound Interest Calculator</a>, model real retirement runway via the <a href="/calculators/finance/retirement-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Retirement Calculator</a>, plan salary adjustments with our <a href="/calculators/finance/salary-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Salary Calculator</a>, and audit your personal balance sheet solvency using the <a href="/calculators/finance/net-worth-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Net Worth Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the difference between headline CPI-U and Core CPI?",
          a: "Headline CPI-U measures price changes across the entire consumer basket including food and energy. Core CPI strips out food and energy commodities because their spot prices fluctuate wildly due to weather events and geopolitical shocks. Central banks and economists monitor Core CPI to identify persistent underlying structural inflation trends."
        },
        {
          q: "How does the Rule of 72 calculate purchasing power halving?",
          a: "Dividing 72 by the annual inflation rate yields the approximate number of years required for the general price level to double, which cuts the purchasing power of static cash in half. For example, at a 3.0% inflation rate, purchasing power is halved in approximately 72 / 3 = 24 years."
        },
        {
          q: "What is the Fisher Equation and why does real interest rate matter?",
          a: "The Fisher Equation states that the real interest rate equals (1 + Nominal Rate) / (1 + Inflation Rate) - 1, roughly approximated as Nominal Rate minus Inflation Rate. If a bond pays 4% nominal interest but annual inflation is 5%, your real return is -1%, meaning your purchasing power shrinks despite earning interest."
        },
        {
          q: "Can cash held in a high-yield savings account (HYSA) beat inflation?",
          a: "Rarely over multi-decade cycles. While HYSAs offer high yields when the Federal Reserve raises interest rates, interest income is subject to ordinary federal and state income taxes. After factoring in a 24% or 32% marginal tax bracket, after-tax HYSA yields typically trail inflation, resulting in slow purchasing power erosion."
        },
        {
          q: "How does inflation benefit fixed-rate mortgage borrowers?",
          a: "Inflation benefits fixed-rate borrowers by depreciating the real economic value of their debt. While your monthly mortgage principal and interest payment remains frozen for 30 years, nominal wages and property market values rise with inflation. Over time, servicing the fixed monthly payment consumes an ever-smaller percentage of your income."
        },
        {
          q: "What is shrinkflation versus skimpflation?",
          a: "Shrinkflation occurs when manufacturers downsize product packaging (e.g., reducing a cereal box from 16 oz to 14 oz) while keeping the retail price unchanged. Skimpflation occurs when service providers downgrade operational quality, such as eliminating daily hotel housekeeping or replacing human customer service with automated chatbots."
        },
        {
          q: "What asset classes have historically provided the most reliable inflation hedge?",
          a: "Broad diversified equities (S&P 500) and real estate have historically provided the strongest multi-decade inflation hedges because corporations raise prices to preserve margins, and landlords raise rents. For short-term guaranteed capital preservation, Treasury Inflation-Protected Securities (TIPS) adjust principal values directly with the CPI."
        },
        {
          q: "How does inflation compound over a 30-year retirement horizon?",
          a: "At a mild 2.5% annual inflation rate, prices increase by 110% over 30 years, meaning a retiree spending $60,000 in year one will need $125,850 in year thirty just to maintain the same standard of living. Retirement plans must incorporate equity growth rather than relying entirely on fixed-income annuities."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
