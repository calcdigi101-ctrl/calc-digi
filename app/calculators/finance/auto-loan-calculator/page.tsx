import Calculator from "@/components/calcs/finance/auto-loan-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/auto-loan-calculator";
const DESCRIPTION =
  "Free auto loan calculator: estimate your monthly car payment with sales tax, fees, down payment and trade-in, plus total interest and a yearly payoff schedule.";

export const metadata = calcMetadata(PATH, "Auto Loan Calculator – Car Payment with Tax | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Auto Loan Calculator"
      intro="Estimate your monthly car payment including sales tax, dealer fees, your down payment and trade-in, and see how much interest the loan costs."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How your car payment is calculated</h2>
          <p>The amount you finance is the out-the-door price minus what you pay up front:</p>
          <Formula>Amount financed = Price + Sales tax + Fees + Trade-in payoff − Down payment − Trade-in value</Formula>
          <p>That amount is then amortized over the term like any fixed-rate loan:</p>
          <Formula>Payment = A × r ÷ [1 − (1 + r)^−n]</Formula>
          <p>
            where <strong>A</strong> is the amount financed, <strong>r</strong> the monthly rate (APR ÷ 12) and{" "}
            <strong>n</strong> the term in months. Most states charge sales tax on the price after subtracting the trade-in,
            which is how this calculator works; a few states tax the full price.
          </p>
          <h3>Example</h3>
          <p>
            A $35,000 car with 8% sales tax and $5,000 down leaves <strong>$32,800</strong> to finance. At 6.5% for 60
            months, the payment is <strong>$641.77</strong> and total interest is about <strong>$5,706</strong>.
          </p>
          <h2>Tips for a cheaper car loan</h2>
          <ul>
            <li>Get pre-approved by a bank or credit union before visiting the dealer so you can compare their financing.</li>
            <li>Negotiate the price of the car first, then the trade-in, then financing — separately.</li>
            <li>Keep the term to 60 months or less; 72–84 month loans often leave you owing more than the car is worth.</li>
            <li>The 20/4/10 rule of thumb: 20% down, no more than 4 years, and total car costs under 10% of gross income.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Should I roll taxes and fees into the loan?",
          a: "You can, but you'll pay interest on them for the whole term and start the loan owing more than the car's value. Paying tax and fees in cash is cheaper if you can afford it.",
        },
        {
          q: "What if I owe more on my trade-in than it's worth?",
          a: "That negative equity is added to the new loan. Enter the amount owed under “Taxes, fees & trade-in” to see its effect; it raises both the payment and the interest.",
        },
        {
          q: "What is a good auto loan rate?",
          a: "Rates depend mostly on credit score and whether the car is new or used. Borrowers with excellent credit typically get the lowest new-car rates, while used-car and subprime loans can cost several times more. Always compare at least two lenders.",
        },
      ]}
      related={[
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/sales-tax-calculator", icon: "🧾", name: "Sales Tax" },
        { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
        { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
