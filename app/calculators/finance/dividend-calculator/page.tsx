import Calculator from "@/components/calcs/finance/dividend-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/dividend-calculator";
const DESCRIPTION =
  "Free dividend calculator: project dividend income and portfolio value with dividend reinvestment (DRIP), dividend growth, share price growth and taxes.";

export const metadata = calcMetadata(PATH, "Dividend Calculator – DRIP, Dividend Income & Growth | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Dividend Calculator"
      intro="Project your dividend income and portfolio value over time, with or without reinvesting dividends."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Dividend yield</h2>
          <Formula>Dividend yield = Annual dividends per share ÷ Share price</Formula>
          <p>
            A $50 stock paying $2 a year in dividends yields 4%. A $10,000 position in it pays $400 a year before tax.
          </p>
          <h2>How reinvesting (DRIP) compounds</h2>
          <p>
            With a dividend reinvestment plan, each dividend buys more shares, and those shares pay dividends of their own.
            If the company also raises its dividend each year, income grows on two fronts.
          </p>
          <h3>Example</h3>
          <p>
            $10,000 at a 4% yield with 5% annual dividend growth, 3% share price growth, 15% dividend tax and reinvestment
            grows to about <strong>$19,150</strong> in 10 years. Annual after-tax income rises from $340 to about{" "}
            <strong>$789</strong> — a 7.9% yield on the original cost.
          </p>
          <h2>Taxes on dividends</h2>
          <ul>
            <li>
              <strong>Qualified dividends</strong> (most US stocks held more than 60 days around the ex-dividend date) are
              taxed at 0%, 15% or 20% depending on income.
            </li>
            <li>
              <strong>Ordinary dividends</strong> — including most REIT and money-market distributions — are taxed as regular
              income.
            </li>
            <li>Dividends inside IRAs and 401(k)s aren&rsquo;t taxed each year.</li>
          </ul>
          <h2>Beware of very high yields</h2>
          <p>
            An unusually high yield can mean the share price has fallen because investors expect a dividend cut. Look at the
            payout ratio (dividends ÷ earnings) and the company&rsquo;s history of raising dividends.
          </p>
        </>
      }
      faq={[
        {
          q: "How often are dividends paid?",
          a: "Most US companies pay quarterly. Some funds pay monthly, and many international companies pay semi-annually. This calculator works with annual totals.",
        },
        {
          q: "What is a good dividend yield?",
          a: "For broad US stock indexes it's been roughly 1–2% in recent years. Established dividend payers often yield 2–5%. Much higher yields deserve extra scrutiny.",
        },
        {
          q: "Should I reinvest dividends?",
          a: "If you don't need the income yet, reinvesting maximizes long-term growth. In retirement, many investors switch to taking dividends as cash to cover spending.",
        },
      ]}
      related={[
        { href: "/calculators/finance/stock-return-calculator", icon: "📊", name: "Stock Return" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "🧮", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
