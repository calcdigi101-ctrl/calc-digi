import Calculator from "@/components/calcs/finance/stock-return-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/stock-return-calculator";
const DESCRIPTION =
  "Free stock return calculator: total return and annualized return (CAGR) on a stock including dividends, fees and capital gains tax.";

export const metadata = calcMetadata(PATH, "Stock Return Calculator – Total & Annualized Return with Dividends | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Stock Return Calculator"
      intro="Calculate the total and annualized return on a stock you bought, including dividends, trading costs and taxes."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Total return</h2>
          <Formula>Total return = (Sale value − Cost − Fees + Dividends − Tax) ÷ Cost</Formula>
          <p>Price change alone understates performance for dividend-paying stocks, so dividends are included.</p>
          <h2>Annualized return (CAGR)</h2>
          <Formula>CAGR = (Ending value ÷ Starting value)^(1 ÷ years) − 1</Formula>
          <p>
            CAGR converts a total return into the steady yearly rate that would produce it, so you can compare holdings
            owned for different lengths of time.
          </p>
          <h3>Example</h3>
          <p>
            50 shares bought at $100 and sold at $145 after 3 years, with $150 of dividends, return{" "}
            <strong>+48%</strong> in total ($2,400) — an annualized <strong>13.96%</strong>.
          </p>
          <h2>Capital gains tax basics</h2>
          <ul>
            <li>
              <strong>Held one year or less:</strong> short-term gains are taxed as ordinary income.
            </li>
            <li>
              <strong>Held more than one year:</strong> long-term gains are taxed at 0%, 15% or 20% depending on taxable
              income, plus 3.8% net investment income tax for high earners.
            </li>
            <li>Losses can offset gains, and up to $3,000 a year of net losses can offset ordinary income.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What's the difference between ROI and CAGR?",
          a: "ROI is the total percentage gain over the whole period. CAGR spreads it into a yearly rate. A 48% gain over 3 years is a 13.96% CAGR.",
        },
        {
          q: "Should I include reinvested dividends?",
          a: "If dividends were reinvested, the extra shares are already in your share count and sale value — don't add those dividends again. Only enter dividends you received as cash.",
        },
        {
          q: "How do stock splits affect this?",
          a: "Use split-adjusted numbers: after a 2-for-1 split, double your share count and halve your purchase price. The total cost stays the same.",
        },
      ]}
      related={[
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI Calculator" },
        { href: "/calculators/finance/dividend-calculator", icon: "💵", name: "Dividend" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/crypto-profit-calculator", icon: "🪙", name: "Crypto Profit" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
