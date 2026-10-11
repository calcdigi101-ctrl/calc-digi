import Calculator from "@/components/calcs/finance/roi-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/roi-calculator";
const DESCRIPTION = "Free ROI calculator: return on investment as a percentage and an annualized rate, plus gain, return multiple and doubling time.";

export const metadata = calcMetadata(PATH, "ROI Calculator – Return on Investment | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="ROI Calculator"
      intro="Measure the return on any investment — a stock, a property, a marketing campaign or a business project — as a total and as a yearly rate."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>ROI formula</h2>
          <Formula>ROI = (Amount returned − Amount invested) ÷ Amount invested × 100%</Formula>
          <p>
            If you invest $10,000 and get back $14,500, the ROI is <strong>45%</strong>.
          </p>
          <h2>Annualized ROI</h2>
          <p>
            A 45% return is impressive over 3 years but ordinary over 10. Annualizing puts investments of different lengths on
            the same footing:
          </p>
          <Formula>Annualized ROI = (Returned ÷ Invested)^(1 ÷ years) − 1</Formula>
          <p>
            $10,000 to $14,500 in 3 years is <strong>13.19% a year</strong>. At that rate, money doubles in about 5.6 years.
          </p>
          <h2>Getting ROI right</h2>
          <ul>
            <li>
              Include all costs in &ldquo;amount invested&rdquo; — fees, commissions, closing costs, renovation and ongoing
              expenses.
            </li>
            <li>Include all money received in &ldquo;amount returned&rdquo; — sale proceeds plus dividends, rent or interest collected.</li>
            <li>
              For investments with multiple cash flows over time, an internal rate of return (IRR) calculation is more
              accurate than simple ROI.
            </li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What is a good ROI?",
          a: "It depends on risk and time. The long-run US stock market has returned roughly 10% a year before inflation; safer investments return less. Compare annualized ROI with what you could earn elsewhere at similar risk.",
        },
        {
          q: "Can ROI be negative?",
          a: "Yes. If you get back less than you invested, ROI is negative — for example $10,000 returning $8,000 is −20%.",
        },
        {
          q: "How is marketing ROI calculated?",
          a: "Use the profit attributed to the campaign (not revenue) as the gain, and the full campaign cost as the investment: (profit − cost) ÷ cost.",
        },
      ]}
      related={[
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/business/roi-calculator", icon: "🏢", name: "Business ROI" },
        { href: "/calculators/finance/break-even-calculator", icon: "⚖️", name: "Break-Even" },
        { href: "/calculators/finance/crypto-profit-calculator", icon: "🪙", name: "Crypto Profit" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
