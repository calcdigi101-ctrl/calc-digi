import Calculator from "@/components/calcs/finance/crypto-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CryptoProfitLossFeeErosionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/crypto-profit-calculator";
const TITLE = "Crypto Profit Calculator – Bitcoin, Ethereum & Altcoin Gains, Fees & Taxes | CalcDigi";
const DESCRIPTION =
  "Free crypto profit calculator: calculate net profit or loss on Bitcoin, Ethereum, and digital assets. Model centralized exchange maker/taker fees, network gas fees, break-even sell price, and short vs. long-term capital gains tax.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Crypto Profit Calculator"
      intro="Calculate your true net profit or loss on cryptocurrency trades after deducting exchange maker/taker fees, on-chain network gas costs, and IRS short-term vs. long-term capital gains taxes."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="NetProfit = (Units * SellPrice - SellFee) - InitialInvestment - CapitalGainsTax"
      article={
        <>
          <h2>Direct Answer: How Does Cryptocurrency Profit &amp; Break-Even Mathematics Work?</h2>
          <p>
            Calculating net profitability on cryptocurrency trades requires accounting for three distinct layers of financial friction: <strong>exchange transaction fees</strong> (maker/taker fees ranging from 0.1% to 1.5% on both purchase and sale), <strong>on-chain network gas or bridge fees</strong>, and <strong>statutory capital gains taxes</strong>. Because exchange fees reduce the net units acquired at purchase and reduce gross proceeds upon exit, your true <strong>break-even sell price is always higher than your initial purchase price</strong>. Furthermore, under IRS Notice 2014-21, digital assets are classified as property, meaning every sale, swap, or crypto-to-crypto conversion triggers a taxable disposal event.
          </p>

          <Formula>Acquired Token Units = (Total Invested Dollars − Purchase Fee) ÷ Entry Buy Price</Formula>
          <Formula>Gross Sale Proceeds = Acquired Units × Exit Sell Price</Formula>
          <Formula>Break-Even Sell Price = Buy Price × [(1 + Buy Fee Rate) ÷ (1 − Sell Fee Rate)]</Formula>
          <Formula>Net Profit = Gross Proceeds − Exit Fee − Total Invested − Applicable Taxes</Formula>

          <CryptoProfitLossFeeErosionChart />

          <h2>Cryptocurrency Tax Matrix: Short-Term vs. Long-Term Realization</h2>
          <p>
            The table below demonstrates net take-home gains on a $10,000 gross crypto profit across varying taxpayer federal income tax brackets (assuming standard 0.5% exchange fees):
          </p>

          <DataTable
            head={["Federal Tax Bracket Tier", "Short-Term (< 1 Year Holding)", "Net Kept Profit (Short-Term)", "Long-Term (> 1 Year Holding)", "Net Kept Profit (Long-Term)"]}
            rows={[
              ["12% Bracket (Low Income)", "12.0% Ordinary Tax", "$8,700 Net Kept", "0.0% Capital Gains Tax", "$9,900 Net Kept (+$1.2k gain)"],
              ["22% Bracket (Middle Earner)", "22.0% Ordinary Tax", "$7,700 Net Kept", "15.0% Capital Gains Tax", "$8,400 Net Kept (+$700 gain)"],
              ["32% Bracket (High Earner)", "32.0% Ordinary Tax", "$6,700 Net Kept", "15.0% Capital Gains Tax", "$8,400 Net Kept (+$1.7k gain)"],
              ["37% Top Bracket (+3.8% NIIT)", "40.8% Maximum Ordinary", "$5,820 Net Kept", "23.8% (20% + 3.8% NIIT)", "$7,520 Net Kept (+$1.7k gain)"],
            ]}
          />

          <h2>IRS Digital Asset Compliance &amp; Form 1099-DA Rules</h2>
          <ul>
            <li>
              <strong>Crypto-to-Crypto Swaps are Taxable:</strong> Trading Bitcoin directly for Ethereum or a stablecoin (USDC/USDT) is treated by the IRS as a taxable disposition of the first asset at fair market value, triggering immediate capital gain or loss realization.
            </li>
            <li>
              <strong>IRS Form 1099-DA Reporting:</strong> Centralized cryptocurrency exchanges (Coinbase, Kraken, Gemini) are federally mandated to report gross proceeds and unadjusted cost basis directly to the IRS on Form 1099-DA.
            </li>
            <li>
              <strong>Crypto Loss Deductions:</strong> If a digital asset position collapses in value, realizing the loss on Form 8949 allows you to fully offset other crypto and stock capital gains, plus up to $3,000 of ordinary wage income annually.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Asset Trading &amp; Capital Gains Solvers</h3>
            <p>
              Active digital asset trading requires accounting for transaction friction and tax obligations. Benchmark your crypto gains against traditional equities with our <a href="/calculators/finance/stock-return-calculator">Stock Return Calculator</a>, analyze total capital returns via the <a href="/calculators/finance/roi-calculator">ROI Calculator</a>, estimate short-term and long-term tax liabilities using the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, and model long-term portfolio growth with our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why is my break-even price higher than what I bought the coin for?",
          a: "Because transaction fees are deducted twice: first when you purchase the coins (reducing the actual quantity of tokens you receive), and second when you sell (reducing your gross proceeds). To recover the fees from both legs of the trade, the asset price must increase by approximately the sum of both fee percentages.",
        },
        {
          q: "Does transferring crypto between my own hardware wallets trigger taxes?",
          a: "No. Moving cryptocurrency between your own non-custodial wallets or between an exchange and your personal Ledger/Trezor hardware wallet is a non-taxable transfer. However, any network gas or blockchain transaction fees paid cannot be deducted as capital losses.",
        },
        {
          q: "How does the IRS calculate crypto cost basis: FIFO, LIFO, or SpecID?",
          a: "The default IRS accounting method is First-In, First-Out (FIFO), meaning the oldest coins purchased are assumed to be sold first. However, taxpayers can utilize Specific Identification (SpecID) or HIFO (Highest-In, First-Out) to legally minimize capital gains, provided they maintain verifiable records of specific transaction hashes.",
        },
        {
          q: "How are crypto staking rewards and airdrops taxed?",
          a: "Under IRS Revenue Ruling 2023-14, crypto staking rewards and promotional airdrops are taxed as ordinary gross income based on their fair market value on the exact date and time you gain dominion and control over the tokens.",
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
