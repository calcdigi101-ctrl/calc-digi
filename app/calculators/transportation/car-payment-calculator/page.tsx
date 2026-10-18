import Calculator from "@/components/calcs/finance/auto-loan-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/transportation/car-payment-calculator";
const TITLE = "Car Payment Calculator – Monthly Auto Loan & Total Cost | CalcDigi";
const DESCRIPTION =
  "Free car payment calculator. Calculate monthly auto loan payments, sales tax, total interest, dealer fees, down payment, trade-in value, and full amortization schedule.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const TERMS_TABLE = [
  ["36 Months (3 Years)", "Highest monthly payment", "Lowest total interest", "Fastest equity build"],
  ["48 Months (4 Years)", "High monthly payment", "Low total interest", "Recommended sweet spot"],
  ["60 Months (5 Years)", "Moderate monthly payment", "Moderate interest", "Most common US auto loan"],
  ["72 Months (6 Years)", "Low monthly payment", "High total interest", "Risk of negative equity (underwater)"],
  ["84 Months (7 Years)", "Lowest monthly payment", "Highest total interest", "Not recommended by financial advisors"],
];

const FAQ_ITEMS = [
  {
    q: "How do I calculate my monthly car payment?",
    a: "Monthly payment = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where P is the total financed amount (vehicle price + taxes + fees − down payment − trade-in), r is the monthly interest rate (annual APR ÷ 12), and n is the total number of months. For example, financing $25,000 at 6.5% APR for 60 months results in a monthly payment of $489.15.",
  },
  {
    q: "What is a healthy monthly car payment percentage?",
    a: "Financial planners recommend adhering to the 20/4/10 rule: put down at least 20%, finance for no more than 4 years (48 months), and ensure that total vehicle transportation costs (monthly payment + auto insurance + fuel + maintenance) do not exceed 10% to 15% of your gross monthly income.",
  },
  {
    q: "Is a 72-month or 84-month car loan a bad idea?",
    a: "While extended 72- and 84-month loans reduce monthly cash flow payments, they dramatically increase the total interest paid and leave you 'underwater' (owing more than the car's depreciated market value) for years. If the car is totaled or traded in early, you would owe thousands out-of-pocket without GAP insurance.",
  },
  {
    q: "What credit score is needed for the lowest auto loan rate?",
    a: "Super-prime borrowers with credit scores of 780 or above receive the lowest promotional APR rates (often 4.5% to 6.5% on new cars). Prime borrowers (660–779) generally receive 7% to 9%, while non-prime and subprime borrowers (below 660) face double-digit rates of 12% to 20%+.",
  },
  {
    q: "How does trading in a car reduce sales tax?",
    a: "In most US states, sales tax is assessed only on the difference between the new vehicle purchase price and your trade-in allowance. For example, buying a $30,000 vehicle with a $10,000 trade-in means you pay sales tax only on $20,000, saving hundreds of dollars in immediate taxes.",
  },
];

const RELATED = [
  { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/ev-savings-calculator", icon: "🔋", name: "EV Savings Calculator" },
  { href: "/calculators/finance/loan-calculator", icon: "💳", name: "Loan Calculator" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🛣️", name: "Commute Cost" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/transportation", label: "Transportation" }}
      title="Car Payment Calculator"
      intro="Estimate your exact monthly car payment, total loan interest, and true out-the-door cost with sales tax, dealer documentation fees, down payment, trade-in equity, and a complete amortization schedule."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How Monthly Car Payments Are Calculated (GEO Quick Answer)</h2>
          <p>
            An auto loan monthly payment is determined by three variables: the <strong>principal financed amount</strong> (vehicle purchase price plus state sales tax, title, and registration fees minus down payment and trade-in allowance), the <strong>annual percentage rate (APR)</strong>, and the <strong>loan term length</strong> (in months).
          </p>
          <p>
            Because car loans use standard fixed-rate amortization, early monthly payments consist primarily of interest, while later payments pay down vehicle principal.
          </p>

          <h2>Standard Auto Loan Amortization Formula</h2>
          <Formula>Monthly Payment = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1]</Formula>
          <p>
            Where:
            <br />
            <strong>P</strong> = Principal amount financed (Total out-the-door cost − Down payment − Trade-in credit)
            <br />
            <strong>r</strong> = Monthly interest rate (Annual APR ÷ 12 ÷ 100)
            <br />
            <strong>n</strong> = Loan term in months (e.g., 36, 48, 60, 72)
          </p>

          <h3>Worked Example</h3>
          <p>
            Suppose you purchase a new SUV for $32,000 with 7% state sales tax ($2,240), put down $5,000 in cash, and trade in your old sedan for $4,000. Your net financed amount is:
            <br />
            $32,000 + $2,240 − $5,000 − $4,000 = <strong>$25,240</strong>.
            <br />
            At a 6.0% APR for 60 months, your monthly payment is <strong>$488.08</strong>, and total interest paid across the 5 years is <strong>$4,044.80</strong>.
          </p>

          <h2>Loan Term Length Comparison</h2>
          <p>
            Choosing the right term balance between manageable monthly cash flow and total interest expense is vital:
          </p>
          <DataTable
            head={["Loan Term", "Monthly Payment Impact", "Total Interest Impact", "Equity Risk"]}
            rows={TERMS_TABLE}
            highlight={1}
          />

          <h2>Smart Auto Financing Strategies</h2>
          <ul>
            <li>
              <strong>Get Pre-Approved First:</strong> Secure a pre-approved auto loan quote from your local credit union or bank before stepping into a dealership showroom to avoid marked-up dealer APR financing.
            </li>
            <li>
              <strong>Separate Negotiations:</strong> Negotiate the vehicle purchase price, the trade-in allowance, and the financing rate as three distinct transactions.
            </li>
            <li>
              <strong>Mind the Out-the-Door Price:</strong> Dealers frequently bundle documentation fees, paint protection, and extended warranties into the loan principal, increasing interest over the entire term.
            </li>
            <li>
              <strong>Consider GAP Insurance Wisely:</strong> If your down payment is under 20% or your loan exceeds 48 months, buy Guaranteed Asset Protection (GAP) through your primary auto insurer rather than at the dealer finance office to save 70% or more.
            </li>
          </ul>
        </>
      }
      faq={FAQ_ITEMS}
      related={RELATED}
    >
      <Calculator />
    </CalcPage>
  );
}
