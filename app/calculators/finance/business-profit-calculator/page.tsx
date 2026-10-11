import Calculator from "@/components/calcs/finance/business-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/business-profit-calculator";
const DESCRIPTION =
  "Free business profit calculator: gross profit, EBITDA, operating profit and net profit with margins, from revenue, cost of goods sold, operating expenses, interest and tax.";

export const metadata = calcMetadata(PATH, "Business Profit Calculator – Profit Margins | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Business Profit Calculator"
      intro="Turn revenue and costs into gross profit, EBITDA, operating profit and net profit — with the margin at each level."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>The profit ladder</h2>
          <DataTable
            head={["Measure", "Formula", "Tells you"]}
            rows={[
              ["Gross profit", "Revenue − COGS", "How profitable the product itself is"],
              ["EBITDA", "Gross profit − Operating expenses", "Cash profit from operations"],
              ["Operating profit (EBIT)", "EBITDA − Depreciation & amortization", "Profit from running the business"],
              ["Pre-tax profit", "EBIT − Interest", "Profit after financing costs"],
              ["Net profit", "Pre-tax profit − Tax", "The bottom line"],
            ]}
          />
          <p>Each margin is that profit divided by revenue.</p>
          <h3>Example</h3>
          <p>
            $100,000 of revenue, $40,000 of COGS and $30,000 of operating expenses gives $60,000 gross profit (60% margin) and
            $30,000 operating profit. After 21% corporate tax, net profit is <strong>$23,700</strong> — a 23.7% net margin.
          </p>
          <h2>What is a good profit margin?</h2>
          <p>
            It varies enormously by industry. Grocery stores often run net margins of 1–3%, restaurants 3–6%, while software
            companies can exceed 20%. Compare your margins with businesses in the same industry and track the trend over time.
          </p>
          <h2>Ways to improve profit</h2>
          <ul>
            <li>Raise prices or shift the mix toward higher-margin products.</li>
            <li>Cut COGS through supplier negotiation, less waste or better processes.</li>
            <li>Keep operating expenses growing slower than revenue.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What's the difference between gross and net profit?",
          a: "Gross profit only subtracts the direct cost of what you sold. Net profit subtracts everything — overheads, interest and taxes — so it's what's actually left for the owners.",
        },
        {
          q: "What tax rate should I use?",
          a: "US C-corporations pay a flat 21% federal rate plus any state tax. Pass-through businesses (sole proprietors, LLCs, S-corps) are taxed on the owners' personal returns, so use your personal marginal rate.",
        },
        {
          q: "Why is EBITDA useful?",
          a: "It strips out financing and accounting choices, making it easier to compare the operating performance of different companies.",
        },
      ]}
      related={[
        { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin" },
        { href: "/calculators/finance/break-even-calculator", icon: "⚖️", name: "Break-Even" },
        { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS" },
        { href: "/calculators/business/business-revenue-calculator", icon: "💵", name: "Business Revenue" },
        { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Burn Rate" },
        { href: "/calculators/finance/roi-calculator", icon: "💹", name: "ROI" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
