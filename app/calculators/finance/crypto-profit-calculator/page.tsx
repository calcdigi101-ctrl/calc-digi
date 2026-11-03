import Calculator from "@/components/calcs/finance/crypto-profit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CryptoProfitLossFeeErosionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/crypto-profit-calculator";
const TITLE = "Crypto Profit Calculator";
const DESCRIPTION =
  "Free crypto profit calculator: calculate net crypto profit and loss (PnL), exchange maker/taker fee deductions, network gas fee drag, and IRS capital gains.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Crypto Profit Calculator"
      intro="Calculate your true net cryptocurrency profit and loss. Deduct exchange maker/taker commissions, network blockchain gas fees, and statutory short-term versus long-term capital gains tax liabilities."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Net Crypto Profit} = (V_{\text{exit}} - \text{Fees}_{\text{exit}} - \text{Gas}_{\text{out}}) - (V_{\text{entry}} + \text{Fees}_{\text{entry}} + \text{Gas}_{\text{in}}) - \text{Taxes}"
      article={
        <>
          <h2>Direct Answer: How Are Net Crypto Profit &amp; Capital Gains Calculated?</h2>
          <p>
            Calculating true net profit from cryptocurrency trading involves far more than subtracting your buy price from your sell price. Cryptocurrency transactions incur <strong>layered transaction friction</strong>: centralized exchange maker/taker fees (0.10%&ndash;0.60%), blockchain on-chain network gas fees (Ethereum/Bitcoin transfer costs), and mandatory <strong>IRS capital gains taxation</strong>.
          </p>
          <p>
            Under IRS Notice 2014-21 and subsequent rulings, the IRS treats cryptocurrency as <strong>property, not currency</strong>. Every crypto-to-fiat sale, crypto-to-crypto trade (e.g., swapping BTC for ETH), or purchase of goods using cryptocurrency is a <strong>taxable realization event</strong> that triggers capital gains or deductible capital losses.
          </p>

          <CryptoProfitLossFeeErosionChart />

          <h2>Actuarial Mathematics: Cost Basis, Fee Drag &amp; Tax Realization</h2>
          <p>
            Your <strong>Adjusted Cost Basis</strong> incorporates the purchase price plus all acquisition fees and network gas costs:
          </p>

          <Formula>{"\text{Adjusted Cost Basis} = (P_{\text{buy}} \times Q) + \text{Fee}_{\text{exchange, in}} + \text{Gas}_{\text{blockchain, in}}"}</Formula>
          <p>
            Your <strong>Net Sales Proceeds</strong> represent the liquidation gross value minus exit trading fees and gas costs:
          </p>
          <Formula>{"\text{Net Proceeds} = (P_{\text{sell}} \times Q) - \text{Fee}_{\text{exchange, out}} - \text{Gas}_{\text{blockchain, out}}"}</Formula>
          <p>
            The <strong>Pre-Tax Realized Profit (Capital Gain)</strong> is:
          </p>
          <Formula>{"\text{Realized Capital Gain} = \text{Net Proceeds} - \text{Adjusted Cost Basis}"}</Formula>
          <p>
            Finally, <strong>After-Tax Net Profit</strong> accounts for the investor&rsquo;s holding period tax classification:
          </p>
          <Formula>{"\text{After-Tax Profit} = \text{Realized Capital Gain} \times (1 - t_{\text{effective}}) \quad \text{where } t \in \{t_{\text{short-term}}, t_{\text{long-term}}\}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an investor purchasing <strong>2.0 Ethereum (ETH) at $2,500.00 each ($5,000 baseline)</strong> and selling them <strong>14 months later at $4,000.00 each ($8,000 gross)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Adjusted Cost Basis (Entry).</strong>
              <br />Gross Buy = 2.0 ETH &times; $2,500.00 = $5,000.00.
              <br />Exchange Maker Fee (0.40%) = $20.00.
              <br />On-chain wallet transfer gas = $15.00.
              <br /><em>Adjusted Cost Basis = $5,000.00 + $20.00 + $15.00 = <strong>$5,035.00</strong>.</em>
            </li>
            <li>
              <strong>Step 2: Compute Net Proceeds (Exit).</strong>
              <br />Gross Sell = 2.0 ETH &times; $4,000.00 = $8,000.00.
              <br />Exchange Taker Fee (0.50%) = $40.00.
              <br />Blockchain exit gas fee = $25.00.
              <br /><em>Net Proceeds = $8,000.00 &minus; $40.00 &minus; $25.00 = <strong>$7,935.00</strong>.</em>
            </li>
            <li>
              <strong>Step 3: Derive Pre-Tax Capital Gain.</strong>
              <br />Pre-Tax Profit = $7,935.00 &minus; $5,035.00 = <strong>$2,900.00</strong> (Nominal Return: +57.60%).
            </li>
            <li>
              <strong>Step 4: Calculate IRS Tax Liability.</strong>
              <br />Because the asset was held for 14 months (&gt; 365 days), it qualifies for <strong>Long-Term Capital Gains</strong> (assumed 15% rate).
              <br />Tax Due = $2,900.00 &times; 15% = <strong>$435.00</strong>.
              <br /><em>Final After-Tax Net Profit = $2,900.00 &minus; $435.00 = <strong>$2,465.00</strong>.</em>
              <br /><em>(If sold under 12 months in a 32% short-term tax bracket, tax would be $928, reducing profit to $1,972).</em>
            </li>
          </ol>

          <h2>Tax Drag Matrix: Short-Term vs. Long-Term Capital Gains</h2>
          <p>
            Holding cryptocurrency for 366 days versus 364 days can mean the difference between ordinary income tax rates and preferential long-term capital gains rates:
          </p>

          <DataTable
            head={["Taxable Income Bracket", "Short-Term Rate (< 1 Yr)", "Long-Term Rate (> 1 Yr)", "Tax Drag on $10,000 Profit", "Net Profit Difference"]}
            rows={[
              ["$0 – $47,025", "10% – 12%", "0.0%", "$1,200 vs $0", "+$1,200 retained via long-term"],
              ["$47,026 – $100,525", "22%", "15.0%", "$2,200 vs $1,500", "+$700 retained via long-term"],
              ["$100,526 – $191,950", "24%", "15.0%", "$2,400 vs $1,500", "+$900 retained via long-term"],
              ["$191,951 – $243,725", "32%", "15.0%", "$3,200 vs $1,500", "+$1,700 retained via long-term"],
              ["$243,726 – $609,350", "35%", "15.0% – 18.8% (w/ NIIT)", "$3,500 vs $1,880", "+$1,620 retained via long-term"],
              ["Over $609,350", "37%", "20.0% + 3.8% NIIT = 23.8%", "$3,700 vs $2,380", "+$1,320 retained via long-term"]
            ]}
          />

          <h2>Cost Basis Accounting: FIFO vs. LIFO vs. HIFO</h2>
          <p>
            When trading cryptocurrency purchased at multiple different price levels, your choice of cost basis accounting significantly impacts your tax bill:
          </p>

          <DataTable
            head={["Accounting Method", "Full Name", "Operational Logic", "Tax Implication", "Best Used When"]}
            rows={[
              ["FIFO (Default)", "First-In, First-Out", "Oldest coins bought are treated as sold first.", "Often triggers higher gains in bull markets.", "IRS default if records are incomplete."],
              ["LIFO", "Last-In, First-Out", "Most recently acquired coins sold first.", "Reduces taxable gains during parabolic bull runs.", "When recent coin purchase prices were high."],
              ["HIFO", "Highest-In, First-Out", "Coins with the highest purchase cost sold first.", "Minimizes taxable gains or maximizes tax losses.", "Optimal for aggressive tax-loss harvesting."]
            ]}
          />

          
          <h2>DeFi Yield Farming, Liquidity Pools &amp; Impermanent Loss</h2>
          <p>
            Decentralized Finance (DeFi) protocols introduce additional layers of profit calculation and tax realization:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Automated Market Maker (AMM) Liquidity Provision:</strong> Depositing paired crypto assets (e.g., ETH/USDC) into decentralized liquidity pools earns trading fee yields, but exposes capital to <strong>Impermanent Loss</strong> when the relative price of the volatile asset diverges from the pegged asset.
            </li>
            <li>
              <strong>Staking Rewards Taxation (IRS Rev. Rul. 2023-14):</strong> The IRS explicitly ruled that validation staking rewards are taxable as ordinary gross income in the tax year the taxpayer acquires dominion and control over the validation tokens, regardless of whether they are unstaked or liquidated into fiat.
            </li>
            <li>
              <strong>Bridge Fees &amp; Cross-Chain Friction:</strong> Moving liquidity across layer-1 and layer-2 protocols (Arbitrum, Optimism, Polygon) incurs smart contract bridge fees that must be capitalized into adjusted transaction cost basis.
            </li>
          </ul>
<h2>Essential Crypto Profit Terminology</h2>
          <p>
            Key concepts required to navigate crypto accounting:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Maker vs. Taker Fee:</strong> Makers add liquidity to the order book (lower fee: 0.1%&ndash;0.2%); Takers remove liquidity by filling existing orders immediately (higher fee: 0.4%&ndash;0.6%).</li>
            <li><strong>Gas Fee:</strong> The computational execution fee paid to blockchain validators (miners/stakers) in Gwei or satoshis to process transactions on Ethereum or Bitcoin.</li>
            <li><strong>Tax-Loss Harvesting:</strong> Strategically selling underwater crypto assets at a loss to offset realized capital gains plus up to $3,000 of ordinary income.</li>
            <li><strong>Slippage:</strong> The difference between the expected price of a decentralized exchange (DEX) trade and the executed price due to liquidity pool dynamics.</li>
            <li><strong>Wash Sale Rule:</strong> In the US, IRS wash-sale rules currently apply to securities (stocks); pending legislative updates may extend these rules to cryptocurrency.</li>
          </ul>

          <h3>Related Trading, Tax &amp; Wealth Solvers</h3>
          <p>
            Protect your trading capital: model stock equity performance using the <a href="/calculators/finance/stock-return-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Stock Return Calculator</a>, estimate self-employment and freelance taxes with our <a href="/calculators/finance/freelancer-tax-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Freelancer Tax Calculator</a>, verify annualized returns via the <a href="/calculators/business/roi-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">ROI Calculator</a>, and audit your balance sheet with the <a href="/calculators/finance/net-worth-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Net Worth Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "Is swapping one cryptocurrency for another (e.g., BTC to ETH) a taxable event?",
          a: "Yes. Under IRS regulations, trading one cryptocurrency directly for another is a taxable disposition event. You must calculate the fair market value of the coin disposed of in USD, deduct your cost basis, and report the realized capital gain or loss on IRS Form 8949."
        },
        {
          q: "What is the holding period threshold for long-term crypto capital gains?",
          a: "To qualify for preferential long-term capital gains tax rates (0%, 15%, or 20%), you must hold the cryptocurrency for more than one full year (at least 366 days). Assets held 365 days or fewer are taxed as short-term capital gains at ordinary income rates up to 37%."
        },
        {
          q: "Are blockchain network gas fees tax-deductible when buying or selling crypto?",
          a: "Yes. Gas fees incurred to acquire cryptocurrency can be added to your cost basis, increasing your tax baseline. Gas fees paid to transfer or sell cryptocurrency can be deducted directly from your gross sales proceeds, legally reducing your taxable capital gain."
        },
        {
          q: "What is HIFO accounting and why do cryptocurrency traders prefer it?",
          a: "HIFO stands for Highest-In, First-Out. It selectively sells the specific coins you purchased at the highest prices first. This minimizes your reported taxable capital gains during profitable periods or maximizes harvestable capital losses."
        },
        {
          q: "Can I deduct cryptocurrency losses on my federal tax return?",
          a: "Yes. Realized capital losses on cryptocurrency can offset unlimited capital gains across stocks, real estate, and crypto. If total net losses exceed total gains, you can deduct up to $3,000 of excess losses against ordinary income per tax year, carrying forward the remainder."
        },
        {
          q: "How does the IRS track cryptocurrency transactions and wallet addresses?",
          a: "Centralized US exchanges (Coinbase, Kraken, Gemini) issue IRS Form 1099-DA reporting user transactions. Furthermore, the IRS uses advanced blockchain analytics tools to correlate on-chain public ledger wallet transactions directly with taxpayer identities."
        },
        {
          q: "What is the difference between an exchange trading fee and network slippage?",
          a: "Exchange trading fees are explicit commissions (e.g., 0.50%) charged by the platform to match orders. Slippage is the implicit price degradation that occurs when an order is too large for the available liquidity, moving the market price against you before execution."
        },
        {
          q: "How are crypto staking rewards and airdrops taxed?",
          a: "Staking rewards and airdrops are taxed as ordinary gross income at their fair market dollar value on the exact day and time you gain dominion and control over the tokens. When you subsequently sell those tokens, your cost basis is established at that fair market value."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
