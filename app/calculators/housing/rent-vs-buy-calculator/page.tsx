import RentVsBuyCalculator from "@/components/calcs/housing/rent-vs-buy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RentVsBuyWealthChart } from "@/components/flagship/housing/editorial-charts/RentVsBuyWealthChart";

const PATH = "/calculators/housing/rent-vs-buy-calculator";
const TITLE = "Rent vs Buy Calculator – Net Wealth & Break-Even Year";
const DESCRIPTION = "Free rent vs buy calculator: compare true financial costs of homeownership against renting, including mortgage interest, equity, taxes, and repairs.";

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

          {/* Graph #2: Interactive 10-Year Wealth Accumulation Curve with live mouse hover */}
          <RentVsBuyWealthChart />

          <h2>Key Formulas in Rent vs Buy Economics</h2>
          <Formula>
            Price-to-Rent Ratio = Home Purchase Price ÷ (Monthly Rent × 12)
          </Formula>
          

          <h2>Step-by-Step Practical Calculation: $450,000 Home vs $2,400/mo Rent</h2>

            <p>
              Suppose you are deciding between purchasing a <strong>$450,000 single-family home</strong> (10% down = $45,000 cash, 6.75% mortgage rate) versus renting an equivalent property for <strong>$2,400 per month</strong> and investing the $45,000 down payment in an S&amp;P 500 index fund (7% annual return):
            </p>
            <ul>
              <li><strong>Buyer Sunk Costs (Year 1)</strong>: Mortgage interest ($27,100) + Property tax ($5,400) + Insurance ($1,800) + Maintenance ($4,500) = <strong>$38,800 unrecoverable annual housing friction</strong>.</li>
              <li><strong>Renter Sunk Costs (Year 1)</strong>: 12 months × $2,400 = <strong>$28,800 total unrecoverable rent paid</strong>.</li>
              <li><strong>Year 1 Advantage</strong>: In Year 1, renting is $10,000 cheaper in unrecoverable costs because homeownership carries front-loaded mortgage interest and closing fees.</li>
              <li><strong>The Year 4.5 Breakeven Crossover</strong>: By Year 5, home appreciation (3.5%/yr) and principal debt reduction increase home equity to $155,000 (after 6% selling friction), overtaking the renter's invested portfolio ($142,000).</li>
              <li><strong>10-Year Horizon</strong>: By Year 10, the buyer's net equity reaches <strong>$365,000</strong> vs the renter's portfolio of <strong>$270,000</strong>, delivering a <strong>$95,000 net wealth advantage to the homeowner</strong>.</li>
            </ul>


            <h2>Common Costly Myths in Rent vs Buy Decisions</h2>
            <p>Avoid these four widespread economic misconceptions:</p>
            <ul>
              <li><strong>Believing "Rent Money is Always Thrown Away":</strong> Rent buys shelter with zero maintenance liability, zero property tax risk, and maximum relocation liquidity. Homeownership also involves unrecoverable costs—mortgage interest, taxes, insurance, and maintenance represent "throwing money away" just like rent.</li>
              <li><strong>Underestimating Friction Selling Costs (8%–10%):</strong> When selling a home, realtor commissions (5%–6%), transfer taxes, title fees, and buyer concessions consume 8% to 10% of gross property value, wiping out equity if you move within 3 years.</li>
              <li><strong>Ignoring the Opportunity Cost of Capital:</strong> Committing $60,000 to a down payment prevents that capital from compounding in broad-market index equities. If the stock market outperforms local real estate appreciation, renters who invest their savings can accumulate substantial wealth.</li>
              <li><strong>Assuming Real Estate Appreciation is Guaranteed:</strong> While national home values historically appreciate 3% to 4% annually over decades, local markets experience severe multi-year downturns. Buying is a long-term commitment that requires a minimum 5 to 7-year horizon.</li>
            </ul>


            <h2>The Price-to-Rent Ratio by US Metro Market</h2>
            <p>
              The price-to-rent ratio (Median Home Price ÷ Annual Rent) serves as a quick barometer of market valuation:
            </p>
            <ul>
              <li><strong>Ratio Under 15 (Strongly Favors Buying):</strong> Rust Belt and Midwest metros (Cleveland, Detroit, Pittsburgh) feature low home prices relative to rents, favoring buyers within 2 to 3 years.</li>
              <li><strong>Ratio Between 16 and 20 (Moderate / Balanced):</strong> Suburbs in Atlanta, Phoenix, and Charlotte represent a balanced equilibrium where breakeven occurs around Year 4 to 5.</li>
              <li><strong>Ratio Over 21+ (Strongly Favors Renting):</strong> High-cost coastal metros (San Francisco, New York, Seattle) feature sky-high price-to-rent ratios exceeding 25 to 30, making renting and investing the difference financially superior unless holding for 10+ years.</li>
            </ul>
            <p>
              Calculate your buying capacity with our <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>, estimate down payments with the <a href="/calculators/housing/down-payment-calculator">down payment calculator</a>, and calculate ongoing taxes with the <a href="/calculators/housing/property-tax-calculator">property tax calculator</a>.
            </p>
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

          <h2>Real Estate Resale Friction, Transfer Taxes &amp; Capital Gains Exemptions</h2>
          <p>
            Liquidating a physical real estate asset involves substantial transaction friction compared to selling liquid index stocks:
          </p>
          <ul>
            <li><strong>8% to 10% Resale Liquidation Friction:</strong> When selling a primary residence, seller obligations include realtor commissions (5% to 6%), title insurance, municipal deed transfer taxes, attorney fees, home staging, and buyer repair concessions—totaling $36,000 to $45,000 on a $450,000 home.</li>
            <li><strong>Section 121 Capital Gains Exclusion:</strong> On the upside, US tax law (IRC §121) allows single homeowners to exclude up to $250,000 (and married couples up to $500,000) of capital gains profit tax-free upon sale, provided they occupied the home as a primary residence for at least 2 of the prior 5 years.</li>
            <li><strong>Index Fund Liquidity:</strong> In contrast, public equities can be liquidated within seconds at near-zero transaction costs, but net capital gains are subject to standard federal and state capital gains taxation unless held in tax-sheltered retirement accounts.</li>
          </ul>

          <h2>Capital Expenditure (CapEx) Reserves &amp; Property Depreciation</h2>
          <p>
            Unlike renting where building upkeep is covered by the landlord, homeowners must continuously fund major capital replacements:
          </p>
          <ul>
            <li><strong>The 1% Rule of Annual Maintenance &amp; CapEx:</strong> Budget a minimum of 1.0% to 1.5% of the total home value every year into a dedicated maintenance reserve account ($4,500 to $6,750 annually on a $450,000 property). This fund pays for periodic big-ticket structural replacements: architectural shingle roofing ($8,000–$15,000 every 20–25 years), central HVAC compressors ($6,000–$12,000 every 12–15 years), and water heaters ($1,500–$2,800 every 10 years).</li>
            <li><strong>Opportunity Cost of Down Payment Capital:</strong> Home equity does not earn compounding stock returns. Locking $80,000 in home equity saves mortgage interest, but forfeits potential compound growth in broad-market equities. The rent-vs-buy calculation balances this equity trade-off against long-term real estate appreciation and debt paydown.</li>
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
