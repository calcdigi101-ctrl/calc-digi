import Calculator from "@/components/calcs/finance/crypto-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/crypto-profit-calculator";
const DESCRIPTION =
  "Free crypto profit calculator: profit or loss on Bitcoin, Ethereum or any coin after exchange fees and taxes, with coins bought and your break-even sell price.";

export const metadata = calcMetadata(PATH, "Crypto Profit Calculator – Profit, Fees & Break-Even Price | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Crypto Profit Calculator"
      intro="Work out the profit or loss on a cryptocurrency trade after exchange fees and taxes, and the price you need to sell at to break even."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How crypto profit is calculated</h2>
          <Formula>Coins = (Investment − Buy fee) ÷ Buy price</Formula>
          <Formula>Profit = Coins × Sell price − Sell fee − Investment − Tax</Formula>
          <h3>Example</h3>
          <p>
            Investing $5,000 at $60,000 per coin with a 0.5% fee buys 0.0829 coins. Selling at $90,000 with another 0.5% fee
            returns $7,425 — a profit of <strong>$2,425 (+48.5%)</strong>. The break-even sell price is{" "}
            <strong>$60,605</strong>, slightly above the buy price because of fees.
          </p>
          <h2>Fees add up</h2>
          <p>
            Exchanges charge trading fees (often 0.1–1.5%), and some add a spread between buy and sell prices. Network
            (withdrawal) fees can also apply. Frequent trading multiplies these costs.
          </p>
          <h2>How crypto is taxed in the US</h2>
          <ul>
            <li>The IRS treats crypto as property: selling, trading one coin for another, or spending it is a taxable event.</li>
            <li>Held one year or less: gains are taxed as ordinary income. Held longer: long-term capital gains rates (0%, 15% or 20%).</li>
            <li>Losses can offset gains and up to $3,000 of ordinary income a year.</li>
            <li>Brokers now report crypto sales to the IRS on Form 1099-DA.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Why is my break-even price higher than my buy price?",
          a: "Because fees are taken on both the buy and the sell. You need a small price rise just to recover them.",
        },
        {
          q: "Does this work for partial sells?",
          a: "Enter the amount you originally paid for the portion you're selling as the investment. For several purchases at different prices, use your average cost per coin as the buy price.",
        },
        {
          q: "Are crypto profits guaranteed?",
          a: "No. Crypto prices are extremely volatile and can fall sharply. Only invest money you can afford to lose.",
        },
      ]}
      related={[
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI Calculator" },
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/currency-converter", icon: "💱", name: "Currency Converter" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
