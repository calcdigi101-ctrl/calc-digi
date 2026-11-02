import Calculator from "@/components/calcs/finance/rent-vs-buy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RentVsBuyNetWorthHorizonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/rent-vs-buy-calculator";
const TITLE = "Rent vs. Buy Calculator – Total Wealth Horizon, Opportunity Cost & Break-Even | CalcDigi";
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
      mathExpression="NetWealth_Buyer = HomeValue - RemainingDebt - SellingCosts; NetWealth_Renter = InvestedSavings"
      article={
        <>
          <h2>Direct Answer: How Does the Rent vs. Buy Opportunity Cost Decision Model Work?</h2>
          <p>
            The financial decision to buy a home versus continue renting is <strong>not a simple comparison of monthly mortgage payments against monthly rent</strong>. True financial comparison evaluates <strong>terminal net wealth at the end of your holding horizon</strong>. Homeownership involves major unrecoverable costs—mortgage interest, property taxes, homeowners insurance, HOA dues, ongoing maintenance (1%–2% of home value annually), and 8%–10% in cumulative round-trip closing and Realtor commissions. Conversely, renting incurs 100% unrecoverable rent payments, but frees up down payment capital and monthly cash savings to compound inside diversified, liquid stock market index funds.
          </p>

          <Formula>Buyer Net Wealth = Future Market Value − Remaining Mortgage Debt − Broker Selling Costs (6%–8%)</Formula>
          <Formula>Renter Net Wealth = Down Payment &amp; Closing Costs Invested + Monthly Cash Savings Invested at r_market</Formula>
          <p>
            The &ldquo;5% Rule of Unrecoverable Costs&rdquo;:
            <br />
            To quickly compare a home purchase with renting, multiply the home value by 5% and divide by 12:
            <br />
            <strong>(Home Price × 5%) ÷ 12 = Breakeven Monthly Rent</strong>.
            <br />
            A $400,000 home has roughly $20,000/year ($1,667/month) in pure unrecoverable ownership costs (1% property tax + 1% maintenance + 3% cost of equity capital). If you can rent a comparable home for less than $1,667/mo, renting and investing the difference mathematically beats buying.
          </p>

          <RentVsBuyNetWorthHorizonChart />

          <h2>Price-to-Rent Ratio Benchmarks by Housing Market</h2>
          <p>
            The <strong>Price-to-Rent Ratio</strong> (Median Home Price ÷ Annual Rent for a Comparable Property) is the primary economic indicator used by real estate economists to identify whether a metropolitan market favors owning or renting:
          </p>

          <DataTable
            head={["Price-to-Rent Ratio Range", "Economic Valuation", "Recommended Strategy", "Typical Metros"]}
            rows={[
              ["1 to 15 (Low Ratio)", "Buying is Significantly Cheaper", "Strongly Favors Homeownership", "Midwest & Rust Belt (Cleveland, Detroit, St. Louis)"],
              ["16 to 20 (Moderate Ratio)", "Balanced Market", "Neutral / Depends on Length of Stay (>5 yrs favors buying)", "Sunbelt & Mid-Tier Cities (Atlanta, Dallas, Charlotte)"],
              ["21 to 25 (High Ratio)", "Renting is Significantly Cheaper", "Favors Renting & Stock Investing", "Tech & Coastal Hubs (Denver, Seattle, Austin)"],
              ["26+ (Extremely High Ratio)", "Severe Real Estate Price Premium", "Renting Strongly Outperforms Buying", "Superstar Metros (San Francisco, NYC, Los Angeles)"],
            ]}
          />

          <h2>Core Decision Drivers: Duration of Tenancy &amp; Transaction Friction</h2>
          <ul>
            <li>
              <strong>The 5-Year Horizon Rule:</strong> Upfront closing costs (2%–4% when buying) and broker commissions (5%–6% when selling) create a 7%–10% transaction friction hurdle. Moving in less than 4 to 5 years almost universally makes renting more profitable than buying.
            </li>
            <li>
              <strong>Forced Savings vs. Disciplined Investing:</strong> The principal portion of a mortgage payment acts as an automatic &ldquo;forced savings plan&rdquo;. If a renter spends their monthly cash flow difference on lifestyle consumption rather than investing it, the homeowner will inevitably win by default.
            </li>
            <li>
              <strong>Inflation Hedge:</strong> A 30-year fixed-rate mortgage locks in your principal and interest debt payment in nominal terms for three decades, while residential rent increases with general inflation every year.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Housing Economics &amp; Wealth Solvers</h3>
            <p>
              Evaluating the financial trade-offs between renting and homeownership requires net present value modeling. Calculate 30-year amortization and tax deductions with our <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, check your underwriting qualification ceiling using the <a href="/calculators/finance/home-affordability-calculator">Home Affordability Calculator</a>, calculate required down payment cash with the <a href="/calculators/finance/down-payment-calculator">Down Payment Calculator</a>, and model alternative portfolio gains using our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Isn't renting simply 'throwing money away'?",
          a: "No. Rent pays for shelter, flexibility, and absolute insulation from financial liability. Homeowners also throw away massive sums of money each month on 'unrecoverable ownership costs'—including mortgage interest, property taxes, HOA fees, homeowners insurance, and non-negotiable maintenance repairs (such as replacing roofs or HVAC units).",
        },
        {
          q: "What is the 1% home maintenance rule?",
          a: "Homeowners should budget 1% to 2% of their home's total market value every year for maintenance and capital reserves. On a $450,000 home, that equals $4,500 to $9,000 per year ($375 to $750 per month) set aside strictly for structural upkeep, painting, plumbing, and appliance replacement.",
        },
        {
          q: "Does the mortgage interest deduction make buying automatically better?",
          a: "Following the Tax Cuts and Jobs Act (TCJA), the federal standard deduction is high enough ($15,000 single / $30,000 married) that over 90% of US taxpayers do not itemize deductions on Schedule A. Unless your mortgage interest, state/local taxes, and charitable gifts exceed the standard deduction, you receive zero tax benefit from owning a home.",
        },
        {
          q: "How does the stock market return compare to residential home appreciation?",
          a: "Historically (over the last 100 years), US residential real estate has appreciated at an average rate of 3.5% to 4.5% per year (roughly 1% above general inflation). Over the same period, diversified equities (S&P 500) have returned approximately 10.0% nominal annualized return. However, real estate offers 4x to 5x leverage through mortgage borrowing.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/housing/rent-calculator", icon: "🏢", name: "Rent Affordability" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
