import Calculator from "@/components/calcs/finance/rent-vs-buy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RentVsBuyNetWorthHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/rent-vs-buy-calculator";
const TITLE = "Rent vs. Buy Calculator — Total Wealth Horizon, Opportunity Cost & Break-Even | CalcDigi";
const DESCRIPTION =
  "Free rent vs. buy calculator: compare long-term cumulative net wealth between purchasing residential real estate vs. renting and investing cash in index funds. Model 30-year home appreciation, mortgage interest, property taxes, maintenance, and opportunity cost.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Rent vs. Buy Calculator"
      intro="Compare 30-year cumulative net wealth between buying a home versus renting and investing the down payment and monthly cash flow difference into the stock market. Model real transaction friction and opportunity costs."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Wealth}_{\text{Buyer}} = \text{Home Value} - \text{Debt} - \text{Selling Costs} \quad \mid \quad \text{Net Wealth}_{\text{Renter}} = \text{Invested Savings}"
      article={
        <>
          <h2>Direct Answer: How Does the Rent vs. Buy Opportunity Cost Decision Model Work?</h2>
          <p>
            The financial decision to buy a home versus continue renting is <strong>not a simple comparison of monthly mortgage payments against monthly rent</strong>. True financial comparison evaluates <strong>terminal net wealth at the end of your holding horizon</strong>. Homeownership involves major unrecoverable costs&mdash;mortgage interest, property taxes, homeowners insurance, HOA dues, ongoing maintenance (1%&ndash;2% of home value annually), and 8%&ndash;10% in cumulative round-trip closing and Realtor commissions. Conversely, renting incurs 100% unrecoverable rent payments, but frees up down payment capital and monthly cash savings to compound inside diversified, liquid stock market index funds.
          </p>
          <p>
            Neither option is universally superior. Over short holding horizons under 5 years, renting almost always wins due to massive upfront loan closing costs (2%&ndash;4%) and back-end seller agent commissions (5%&ndash;6%). Over horizons exceeding 10 years, leveraged equity appreciation and principal amortization often enable homeownership to surpass renting, provided property values outpace inflation.
          </p>

          <RentVsBuyNetWorthHorizonChart />

          <h2>Actuarial Mathematics: The 5% Rule &amp; Terminal Wealth Horizon</h2>
          <p>
            Developed by portfolio manager Ben Felix, the <strong>5% Rule of Unrecoverable Costs</strong> provides a rigorous quick test to compare housing decisions:
          </p>
          <Formula>{"\text{Breakeven Monthly Rent} = \frac{\text{Home Purchase Price} \times 5.0\%}{12}"}</Formula>
          <p>
            The 5% unrecoverable cost breaks into three components:
            <br />&bull; <strong>1.0% Property Taxes:</strong> Annual municipal property taxes.
            <br />&bull; <strong>1.0% Maintenance:</strong> Ongoing repairs, roof and HVAC upkeep.
            <br />&bull; <strong>3.0% Opportunity Cost of Capital:</strong> Historical equity spread between stocks (~7% real) and housing (~4% real).
          </p>
          <p>
            For a $400,000 home, the annual unrecoverable cost is $20,000 ($1,667 per month). If you can rent a comparable home for less than $1,667 per month, renting and investing the financial difference will yield higher terminal net wealth.
          </p>

          <Formula>{"\text{Terminal Net Wealth}_{\text{Buyer}} = V_n - B_n - (V_n \times c_{\text{sell}})"}</Formula>
          <Formula>{"\text{Terminal Net Wealth}_{\text{Renter}} = \text{DownPayment}_0 \times (1 + r_m)^n + \sum_{t=1}^{n} \Delta C_t \times (1 + r_m)^{n-t}"}</Formula>
          <p>
            Where:
            <br />&bull; <strong>V_n:</strong> Home market value at year n under compound appreciation (1 + g)^n
            <br />&bull; <strong>B_n:</strong> Outstanding mortgage principal amortization balance at year n
            <br />&bull; <strong>c_sell:</strong> Disposition transaction costs (realtor fees, title transfer, transfer taxes: 6%&ndash;8%)
            <br />&bull; <strong>r_m:</strong> Expected annual return on diversified stock market index funds (e.g., 8.0%)
            <br />&bull; <strong>&Delta;C_t:</strong> Monthly cash flow delta invested by the renter when renting is cheaper than total ownership outflow
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a prospective homebuyer deciding between <strong>buying a $400,000 property with 20% down ($80,000)</strong> at 6.5% interest on a 30-year fixed mortgage versus <strong>renting an equivalent home for $1,800/month</strong> over a <strong>10-year horizon</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Homebuyer Monthly Outflow.</strong>
              <br />Mortgage Principal &amp; Interest (P&amp;I on $320k debt at 6.5%): $2,023/month.
              <br />Property Tax (1.2%): $400/month.
              <br />Homeowners Insurance: $125/month.
              <br />Maintenance Reserve (1.0%): $333/month.
              <br /><em>Total Buyer Monthly Cash Outflow = $2,881/month.</em>
            </li>
            <li>
              <strong>Step 2: Compute Buyer 10-Year Equity.</strong>
              <br />Assuming 3.5% annual home appreciation, the $400,000 property grows to:
              <br />$400,000 &times; (1.035)^10 = $564,240.
              <br />Remaining mortgage balance after 120 amortizing payments: $270,890.
              <br />Gross Equity = $564,240 &minus; $270,890 = $293,350.
              <br />Deducting 7% broker selling fees and closing friction ($39,497):
              <br /><em>Buyer Terminal Net Wealth = <strong>$253,853</strong>.</em>
            </li>
            <li>
              <strong>Step 3: Compute Renter 10-Year Portfolio.</strong>
              <br />Renter invests the $80,000 down payment + $6,000 initial closing costs ($86,000 total) at an 8.0% expected market return.
              <br />Initial lump sum growth: $86,000 &times; (1.08)^10 = $185,671.
              <br />Initial monthly cash savings = $2,881 (buyer cost) &minus; $1,800 (rent) = $1,081/month invested.
              <br />Compounding monthly savings at 8% (factoring in 3% annual rent inflation): accumulates to approximately $162,400.
              <br /><em>Renter Terminal Net Wealth = $185,671 + $162,400 = <strong>$348,071</strong>.</em>
            </li>
            <li>
              <strong>Step 4: Strategic Verdict.</strong>
              <br />In this market environment, <strong>renting and investing the difference yields $94,218 more in liquid wealth (+37.1%)</strong> due to high mortgage rates and strong market compounding.
            </li>
          </ol>

          <h2>10-Year Financial Horizon Comparison Matrix</h2>
          <p>
            Structural 10-year holding comparison for a $400,000 home vs. renting an identical property:
          </p>

          <DataTable
            head={["Metric / Balance Sheet Category", "Homebuyer (20% Down)", "Disciplined Renter (Index Investor)", "Financial Advantage Analysis"]}
            rows={[
              ["Initial Capital Outlay", "$80,000 down + $6,000 closing", "$0 (Retained $86,000 cash)", "Renter retains $86k liquid portfolio immediately."],
              ["Average Monthly Outflow (Yr 1)", "$2,881 / month", "$1,800 / month", "Renter saves $1,081/month in immediate cash flow."],
              ["Cumulative Outflow (10 Yrs)", "$354,800 total paid", "$247,600 total rent paid", "Buyer pays $107,200 more in cumulative cash."],
              ["Unrecoverable Outflow (10 Yrs)", "$205,690 (Interest, Tax, Ins, Maint)", "$247,600 (Pure Rent)", "Buyer unrecoverable costs are lower than pure rent."],
              ["Amortized Principal Forced Savings", "$49,110 principal paid down", "$0 mortgage amortization", "Buyer forced savings builds locked-in home equity."],
              ["Terminal Net Wealth (Year 10)", "$253,853 (Net Home Equity)", "$348,071 (Liquid Stock Portfolio)", "Renter leads by $94,218 due to 8% equity returns."]
            ]}
          />

          <h2>The Breakeven Horizon: Transaction Friction &amp; Realtor Drag</h2>
          <p>
            Initial mortgage payments are heavily skewed toward unrecoverable interest, and transaction costs create early equity drag:
          </p>

          <DataTable
            head={["Holding Period Horizon", "Typical Financial Winner", "Key Economic Driver", "Strategic Recommendation"]}
            rows={[
              ["1 – 3 Years", "Renting (By Far)", "Closing costs (3%) + Selling fees (6%) wipe out equity", "Always rent if relocation within 36 months is possible."],
              ["4 – 6 Years", "Toss-Up / Market Dependent", "Equity amortization begins offsetting round-trip friction", "Buy only if local price-to-rent ratio is below 15."],
              ["7 – 10 Years", "Buying (Moderate Advantage)", "Compounding appreciation &amp; mortgage paydown gain momentum", "Strong case for homeownership if career is geographically rooted."],
              ["15+ Years", "Buying (Significant Advantage)", "Inflation erodes debt; fixed mortgage payment remains static", "Long-term homeownership provides housing cost stability."]
            ]}
          />

          <h2>Essential Rent vs. Buy Terminology</h2>
          <p>
            Core concepts required to evaluate residential property purchases:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Price-to-Rent Ratio:</strong> Median home price divided by annual median rent. A ratio below 15 favors buying; a ratio above 20 strongly favors renting.</li>
            <li><strong>Opportunity Cost of Capital:</strong> Forgone investment gains from locking equity in physical property rather than diversified index equities.</li>
            <li><strong>Unrecoverable Cost:</strong> Expenses that build zero net equity (mortgage interest, property taxes, HOA fees, maintenance, rent).</li>
            <li><strong>Amortization Front-Loading:</strong> Early mortgage payments are overwhelmingly interest, delaying principal equity growth.</li>
            <li><strong>Liquidity Premium:</strong> The advantage of holding capital in liquid securities that trade instantly without real estate commission drag.</li>
          </ul>

          <h3>Related Housing, Borrowing &amp; Wealth Solvers</h3>
          <p>
            Model loans with the <a href="/calculators/finance/mortgage-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Mortgage Calculator</a>, verify borrowing limits via the <a href="/calculators/finance/home-affordability-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Home Affordability Calculator</a>, analyze down payments with the <a href="/calculators/finance/down-payment-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Down Payment Calculator</a>, and model index returns using the <a href="/calculators/finance/investment-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Investment Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the 5% Rule when deciding between renting and buying a house?",
          a: "The 5% Rule, created by portfolio manager Ben Felix, estimates the unrecoverable annual costs of homeownership: 1% for property taxes, 1% for maintenance, and 3% for the opportunity cost of equity capital. Multiplying home value by 5% and dividing by 12 gives your breakeven monthly rent. If you can rent for less, renting is financially superior."
        },
        {
          q: "Why does renting beat buying over short holding periods under 5 years?",
          a: "Purchasing real estate incurs 2% to 4% in upfront loan origination and title fees, and selling incurs 5% to 6% in broker commissions and transfer taxes. Over a 3-year horizon, home price appreciation and early principal paydown are rarely sufficient to offset these 8% to 10% round-trip transaction costs."
        },
        {
          q: "Is paying rent really 'throwing money away'?",
          a: "No. Rent pays for shelter, mobility, and complete freedom from financial maintenance liabilities, roof replacements, property tax hikes, and interest charges. Furthermore, renting frees up tens of thousands of dollars in down payment capital that can be invested in higher-returning liquid index funds."
        },
        {
          q: "What is the Price-to-Rent ratio and how do I interpret it?",
          a: "The Price-to-Rent ratio is calculated by dividing the median home purchase price by the annual cost of renting a comparable home. A ratio under 15 indicates purchasing is favorable; 16 to 20 indicates a neutral balance; and a ratio above 20 strongly signals that renting and investing the difference is mathematically superior."
        },
        {
          q: "How does the opportunity cost of a down payment impact net worth?",
          a: "An $80,000 cash down payment locked in real estate earns only real estate appreciation (historically 3% to 4% annually). If invested in a diversified S&P 500 index fund averaging 8% to 10% nominal return, that $80,000 would grow to over $172,000 in 10 years. Forgoing this stock market growth is a massive hidden cost of buying."
        },
        {
          q: "How do property taxes and HOA fees affect the rent vs buy calculation?",
          a: "Property taxes (1% to 2.5% annually) and HOA dues are 100% unrecoverable costs that permanently increase with local reassessments and inflation. Unlike fixed-rate mortgage principal and interest, taxes and HOA fees never end, even after the 30-year mortgage is paid in full."
        },
        {
          q: "Does homeownership offer substantial tax deductions under current IRS rules?",
          a: "For most taxpayers, no. Since the 2017 TCJA nearly doubled the standard deduction, over 90% of homeowners no longer itemize. Mortgage interest and property taxes yield zero tax savings unless total deductions exceed standard thresholds."
        },
        {
          q: "What psychological or non-financial factors should influence the rent vs buy decision?",
          a: "Buying offers stability, control over personal living spaces, and immunity from landlord lease terminations. Renting provides career mobility, geographic flexibility, zero maintenance stress, and the ability to downsize or relocate quickly when job opportunities arise."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
