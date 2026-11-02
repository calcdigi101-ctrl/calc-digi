import Calculator from "@/components/calcs/finance/currency-converter";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { getRates } from "@/lib/fx";
import { ForexSpreadCostComparisonChart } from "@/components/flagship/finance/editorial-charts";

// Rebuild the page (and refresh exchange rates) at most once a day.
export const revalidate = 86400;

const PATH = "/calculators/finance/currency-converter";
const TITLE = "Currency Converter – Live Mid-Market Exchange Rates (160+ Currencies) | CalcDigi";
const DESCRIPTION =
  "Free foreign exchange currency converter: live mid-market daily exchange rates for 160+ global fiat currencies including USD, EUR, GBP, PKR, INR, CAD, AUD, JPY, AED, and SAR. Calculate hidden bank FX markups and spread costs.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default async function Page() {
  const { rates, updated, live } = await getRates();
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Currency Converter"
      intro="Convert between more than 160 global currencies using daily-refreshed mid-market wholesale exchange rates. Identify hidden bank currency markups and calculate true foreign transaction costs."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Amount_B = Amount_A * (Rate_B / Rate_A)"
      article={
        <>
          <h2>Direct Answer: What Is the Mid-Market Rate &amp; How Does Foreign Currency Conversion Work?</h2>
          <p>
            The <strong>mid-market exchange rate</strong> (also called the interbank or wholesale rate) is the exact mathematical midpoint between the &ldquo;buy&rdquo; (bid) and &ldquo;sell&rdquo; (ask) prices at which global investment banks trade currencies on wholesale forex markets. Because retail consumers rarely trade in wholesale multi-million dollar lots, retail commercial banks, wire transfer providers, credit card issuers, and airport currency exchange kiosks alter the mid-market rate by adding an undisclosed <strong>exchange rate markup or spread (typically 1.5% to 12.0%)</strong>, charging you a hidden fee built directly into the exchange rate.
          </p>

          <Formula>Triangular Cross-Rate: Amount in Currency B = Amount in Currency A × (BaseRate_B ÷ BaseRate_A)</Formula>
          <Formula>Hidden Bank Markup (%) = [(Bank Quoted Rate − True Mid-Market Rate) ÷ True Mid-Market Rate] × 100</Formula>

          <ForexSpreadCostComparisonChart />

          <h2>Forex Transfer Channel Benchmark: Cost to Exchange $5,000 USD to Euros (€)</h2>
          <p>
            The table below reveals the total fee friction (upfront wire fee + hidden FX exchange rate spread) when converting and transferring $5,000 USD into Euros across common banking channels:
          </p>

          <DataTable
            head={["Provider Channel", "Typical FX Spread Markup", "Fixed Upfront Fee", "Total Transaction Cost", "Net Foreign Amount Received (€)"]}
            rows={[
              ["Mid-Market Benchmark", "0.00% (No Markup)", "$0.00", "$0.00", "€4,630 (100% Value)"],
              ["Modern Fintech (Wise / Revolut)", "0.40% to 0.50%", "$2.50 – $5.00", "$22.50 to $27.50", "€4,605 (99.5% Value)"],
              ["No-FTF Travel Credit Card", "0.20% (Card Network)", "$0.00", "$10.00", "€4,620 (99.8% Value)"],
              ["Standard Credit Card (3% FTF)", "0.20% + 3.0% Foreign Fee", "$0.00", "$160.00", "€4,482 (96.8% Value)"],
              ["Major Retail Bank International Wire", "2.50% to 3.50% Markup", "$35.00 – $45.00", "$175.00 to $220.00", "€4,435 (95.8% Value)"],
              ["Airport Currency Exchange Kiosk", "10.0% to 14.0% Spread", "$0.00 ('No Commission')", "$550.00 to $700.00", "€3,980 (86.0% Value)"],
            ]}
          />

          <h2>Core Currency Conversion Guidelines &amp; Avoiding Traps</h2>
          <ul>
            <li>
              <strong>Beware the &ldquo;Zero Commission&rdquo; Myth:</strong> Retail kiosks advertising &ldquo;0% Commission&rdquo; or &ldquo;No Fees&rdquo; compensate by inflating the exchange rate spread by 10%–15%, making them the most expensive method to exchange currency.
            </li>
            <li>
              <strong>Never Accept Dynamic Currency Conversion (DCC):</strong> When paying by credit card at an overseas merchant terminal or foreign ATM, the screen will often ask: <em>&ldquo;Charge in USD or local currency?&rdquo;</em>. <strong>Always choose the local foreign currency!</strong> Selecting USD triggers DCC, enabling the merchant&rsquo;s terminal bank to apply their own arbitrary 5%–8% markup on top of normal card fees.
            </li>
            <li>
              <strong>Cross-Currency Triangular Arbitrage:</strong> In international trade, non-major currency pairs (e.g., converting Pakistani Rupee [PKR] directly to Japanese Yen [JPY]) are executed through a base vehicle currency—predominantly the US Dollar (USD)—which serves as the global reserve unit.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related International Commerce &amp; Inflation Solvers</h3>
            <p>
              Cross-border transactions and global travel require real-time currency conversion awareness. Evaluate purchasing power parity shifts with our <a href="/calculators/finance/inflation-calculator">Inflation Calculator</a>, calculate overseas value-added tax with the <a href="/calculators/finance/vat-calculator">VAT Calculator</a>, account for international payment processor margins using the <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>, and determine domestic retail tax via our <a href="/calculators/finance/sales-tax-calculator">Sales Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between buy (bid) and sell (ask) exchange rates?",
          a: "The 'bid' price is the rate a bank or dealer is willing to pay to buy foreign currency from you. The 'ask' price is the rate at which they will sell foreign currency to you. The gap between the two is the 'bid-ask spread'—the dealer's built-in profit margin.",
        },
        {
          q: "Why do daily reference exchange rates differ from live forex trading quotes?",
          a: "Live institutional foreign exchange markets operate 24 hours a day with currency pairs fluctuating thousands of times per minute based on continuous high-frequency interbank trading. Daily reference rates represent the official closing mid-market consensus rate, ideal for accounting, billing, and traveler estimates.",
        },
        {
          q: "What is a Foreign Transaction Fee (FTF) on credit cards?",
          a: "An FTF is a fee (typically 1% to 3%) assessed by credit card issuing banks on any transaction processed through a foreign merchant or bank outside your home country. Many travel-focused credit cards now waive foreign transaction fees entirely.",
        },
        {
          q: "How does inflation affect a country's currency exchange rate?",
          a: "Under the economic theory of Purchasing Power Parity (PPP), countries experiencing persistently high domestic inflation see their currency depreciate over time relative to currencies of nations with lower inflation rates, as high prices erode international export competitiveness.",
        },
      ]}
      related={[
        { href: "/calculators/finance/inflation-calculator", icon: "🎈", name: "Inflation" },
        { href: "/calculators/finance/vat-calculator", icon: "🧾", name: "VAT Calculator" },
        { href: "/calculators/finance/paypal-fee-calculator", icon: "💳", name: "PayPal Fees" },
        { href: "/calculators/finance/crypto-profit-calculator", icon: "🪙", name: "Crypto Profit" },
        { href: "/calculators/finance/sales-tax-calculator", icon: "🛒", name: "Sales Tax" },
        { href: "/calculators/transportation/road-trip-cost-calculator", icon: "🚗", name: "Trip Cost" },
      ]}
    >
      <Calculator rates={rates} updated={updated} live={live} />
    </CalcPage>
  );
}
