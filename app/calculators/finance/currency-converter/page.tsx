import { getRates } from "@/lib/fx";
import Calculator from "@/components/calcs/finance/currency-converter";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ForexSpreadCostComparisonChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/currency-converter";
const TITLE = "Currency Converter";
const DESCRIPTION =
  "Free currency converter: convert foreign exchange rates with live mid-market valuations, retail bank spread markup calculations, wire transfer fees.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default async function Page() {
  const fx = await getRates();
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Currency Converter"
      intro="Convert world currencies using real-time mid-market interbank exchange rates. Calculate hidden bank markup spreads, international wire transfer fees, and cross-rate triangulation."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Converted Amount} = \text{Source Amount} \times S_{\text{mid}} \quad \mid \quad \text{Spread Cost} = \text{Amount} \times \left| 1 - \frac{S_{\text{retail}}}{S_{\text{mid}}} \right|"
      article={
        <>
          <h2>Direct Answer: What Is the Mid-Market Rate &amp; Why Do Banks Charge Hidden Markups?</h2>
          <p>
            The <strong>mid-market exchange rate</strong> (also called the interbank spot rate) is the midpoint between global buy and sell prices in wholesale currency markets. It represents the true, unbiased fair market valuation of one currency relative to another without retail markups.
          </p>
          <p>
            When traditional retail banks and airport kiosks advertise &ldquo;0% Commission Currency Exchange,&rdquo; they almost invariably embed a <strong>hidden exchange rate markup spread</strong> ranging from 2.0% to 5.0% above the mid-market rate. If the mid-market EUR/USD rate is 1.0800, a bank might sell Euros at 1.0450 while simultaneously charging a $35 international wire fee, eroding hundreds of dollars on routine cross-border transfers.
          </p>

          <ForexSpreadCostComparisonChart />

          <h2>Actuarial Mathematics: Bid-Ask Spreads, Cross-Rates &amp; Transfer Friction</h2>
          <p>
            The interbank mid-market rate is derived from live institutional bid (buy) and ask (sell) quotes:
          </p>

          <Formula>{"S_{\text{mid}} = \frac{S_{\text{bid}} + S_{\text{ask}}}{2}"}</Formula>
          <p>
            The <strong>Hidden Retail Spread Cost</strong> extracted by currency brokers and banks is calculated as:
          </p>
          <Formula>{"\text{Spread Cost} = \text{Source Amount} \times \left| 1 - \frac{S_{\text{retail}}}{S_{\text{mid}}} \right|"}</Formula>
          <p>
            Total international transfer friction incorporates both fixed wire fees and proportional spread drag:
          </p>
          <Formula>{"\text{Total Remittance Cost} = \text{Fixed Wire Fee} + \left( \text{Amount} \times \text{Spread \%} \right)"}</Formula>
          <p>
            When trading between two secondary currencies that lack a direct high-volume market pair, currency desks calculate <strong>Cross-Rate Triangulation</strong> using the US Dollar (USD) as an intermediary vehicle currency:
          </p>
          <Formula>{"S_{\text{Base/Quote}} = S_{\text{Base/USD}} \times S_{\text{USD/Quote}} = \frac{S_{\text{Base/USD}}}{S_{\text{Quote/USD}}}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider an individual transferring <strong>$5,000 USD to a European recipient in Euros (EUR)</strong> comparing a traditional retail bank against a transparent fintech provider:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Determine Baseline Mid-Market Conversion.</strong>
              <br />Assume the live mid-market exchange rate is: 1 USD = 0.9200 EUR (EUR/USD = 1.0870).
              <br />True Fair Market Value = $5,000 &times; 0.9200 = <strong>&euro;4,600.00 EUR</strong>.
            </li>
            <li>
              <strong>Step 2: Calculate Traditional Bank Execution.</strong>
              <br />The bank advertises &ldquo;no fee,&rdquo; but offers an exchange rate of 1 USD = 0.8924 EUR (a 3.0% hidden markup spread).
              <br />In addition, the bank levies a $30.00 outgoing wire fee deducted from principal.
              <br />Converted Principal = $5,000 &minus; $30 = $4,970.
              <br />Recipient Receives = $4,970 &times; 0.8924 = <strong>&euro;4,435.23 EUR</strong>.
              <br /><em>Total Bank Friction = &euro;4,600.00 &minus; &euro;4,435.23 = &euro;164.77 EUR ($179.10 USD lost).</em>
            </li>
            <li>
              <strong>Step 3: Calculate Transparent Fintech Execution (Wise/Revolut).</strong>
              <br />The fintech converts at the exact mid-market rate (0.9200) and charges a transparent 0.42% fee ($21.00 USD).
              <br />Converted Principal = $5,000 &minus; $21 = $4,979.
              <br />Recipient Receives = $4,979 &times; 0.9200 = <strong>&euro;4,580.68 EUR</strong>.
            </li>
            <li>
              <strong>Step 4: Financial Comparison.</strong>
              <br />The recipient receives <strong>&euro;145.45 more (+3.28% more money)</strong> by bypassing traditional bank markup spreads.
            </li>
          </ol>

          <h2>International Money Transfer Cost Comparison Matrix</h2>
          <p>
            Comparing typical fee friction across major international transfer channels on a $5,000 USD to EUR remittance:
          </p>

          <DataTable
            head={["Provider Category", "Upfront Wire Fee", "Exchange Rate Markup", "Total Real Cost ($5k)", "Recipient Receives"]}
            rows={[
              ["Mid-Market Benchmark (Zero Fee)", "$0.00", "0.00% (Pure Interbank)", "$0.00", "&euro;4,600.00"],
              ["Modern Fintech (Wise, OFX)", "$18 – $22", "0.00% – 0.20%", "$21.00 (0.42%)", "&euro;4,580.68"],
              ["Digital Wallets (PayPal/Xoom)", "$0 – $4.99", "3.00% – 4.00%", "$180.00 (3.60%)", "&euro;4,434.40"],
              ["Traditional Major Retail Bank", "$30 – $45", "2.50% – 3.50%", "$195.00 (3.90%)", "&euro;4,420.60"],
              ["Airport Currency Exchange Kiosk", "$0 – $10", "8.00% – 14.00%", "$550.00 (11.0%)", "&euro;4,094.00"]
            ]}
          />

          <h2>G10 Currency Volatility &amp; Monetary Policy Matrix</h2>
          <p>
            Central bank interest rate differentials drive long-term foreign exchange currency pricing and forward hedging rates:
          </p>

          <DataTable
            head={["Currency Pair", "Common Nickname", "Global FX Volume Share", "Primary Central Bank Driver", "Historical 1-Yr Volatility Range"]}
            rows={[
              ["EUR / USD", "The Euro / Fiber", "22.7% (Most Traded)", "Fed vs. European Central Bank (ECB) rate gap", "6.5% – 9.0%"],
              ["USD / JPY", "The Gopher / Yen", "13.5%", "Bank of Japan (BOJ) yield curve control vs. Fed", "9.0% – 13.5%"],
              ["GBP / USD", "Cable / British Pound", "9.5%", "Bank of England (BOE) inflation targeting", "8.0% – 11.5%"],
              ["USD / CAD", "The Loonie", "5.5%", "Bank of Canada &amp; WTI crude oil correlation", "5.5% – 7.5%"],
              ["AUD / USD", "The Aussie", "5.1%", "Reserve Bank of Australia &amp; Chinese commodity demand", "8.5% – 12.0%"],
              ["USD / CHF", "The Swissie", "3.9%", "Swiss National Bank safe-haven capital flows", "6.0% – 8.5%"]
            ]}
          />

          
          <h2>Purchasing Power Parity (PPP) &amp; The Big Mac Index</h2>
          <p>
            Economists evaluate long-term currency valuation equilibrium using <strong>Purchasing Power Parity (PPP)</strong> theory, which states that exchange rates between currencies should adjust until identical market baskets of goods cost the exact same amount in both nations:
          </p>
          <Formula>{"S_{\text{PPP}} = \frac{P_{\text{domestic}}}{P_{\text{foreign}}}"}</Formula>
          <p>
            Popularized by <em>The Economist</em>, the <strong>Big Mac Index</strong> uses McDonald&rsquo;s Big Mac hamburger as a standardized global consumer basket to measure currency overvaluation or undervaluation. If a burger costs $5.80 in the United States and &yen;580 in Japan while the spot exchange rate is 150 JPY/USD, the implied PPP rate is 100 JPY/USD, indicating that the Japanese Yen is significantly undervalued relative to fair market purchasing parity.
          </p>
<h2>Essential Foreign Exchange Terminology</h2>
          <p>
            Key concepts required to navigate foreign exchange transactions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Base Currency vs. Quote Currency:</strong> In EUR/USD = 1.08, EUR is the Base currency (always 1 unit) and USD is the Quote currency.</li>
            <li><strong>Pip (Percentage in Point):</strong> The standard unit of FX movement, equal to 0.0001 (1/100th of 1%) for most major currency pairs (0.01 for JPY pairs).</li>
            <li><strong>Spread:</strong> The mathematical difference between the price at which a broker buys a currency and the price at which they sell it.</li>
            <li><strong>SWIFT Transfer:</strong> The global financial messaging network used to transfer funds between international bank accounts, often incurring intermediary correspondent bank fees ($15&ndash;$25).</li>
            <li><strong>Forward Contract:</strong> A binding financial contract that locks in a specific exchange rate for a future transaction date to hedge currency volatility.</li>
          </ul>

          <h3>Related Global Business &amp; Cash Flow Solvers</h3>
          <p>
            Optimize your international operations: model commercial transaction expenses using the <a href="/calculators/finance/paypal-fee-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">PayPal Fee Calculator</a>, calculate inflation purchasing power changes via the <a href="/calculators/finance/inflation-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Inflation Calculator</a>, evaluate sales tax with our <a href="/calculators/finance/sales-tax-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Sales Tax Calculator</a>, and audit company margins via the <a href="/calculators/finance/business-profit-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Business Profit Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the mid-market exchange rate and where does it come from?",
          a: "The mid-market rate is the real exchange rate between two currencies, calculated as the precise midpoint between global supply (bid) and demand (ask) in the wholesale interbank market. It is the rate displayed on financial news networks like Reuters, Bloomberg, and Google."
        },
        {
          q: "Why do banks claim '0% commission' but give a worse exchange rate?",
          a: "Advertising 0% commission is a marketing tactic. Instead of charging an explicit upfront service fee, traditional banks bake their profit margin directly into an unfavorable exchange rate spread, taking 2% to 4% of your money silently."
        },
        {
          q: "What are intermediary or correspondent bank fees on international wires?",
          a: "When your domestic bank lacks a direct financial relationship with the recipient bank abroad, the wire travels through intermediary correspondent banks within the SWIFT network. Each intermediary bank routinely deducts $15 to $30 from the wire balance during transit."
        },
        {
          q: "When is the best time of day or week to exchange foreign currency?",
          a: "Foreign exchange markets are most liquid when the London and New York financial sessions overlap (8:00 AM to 12:00 PM EST, Monday through Friday). Trading during this window provides the narrowest bid-ask spreads and optimal pricing."
        },
        {
          q: "Should I pay in local currency or my home currency when using a credit card abroad?",
          a: "Always choose to pay in the local foreign currency. If you choose your home currency, the foreign card terminal uses Dynamic Currency Conversion (DCC), applying an exorbitant 5% to 8% markup spread. Selecting local currency lets your card issuer convert at the favorable Visa/Mastercard wholesale rate."
        },
        {
          q: "What is a currency cross rate and how is it calculated?",
          a: "A cross rate is an exchange rate between two currencies that does not involve the US Dollar (such as EUR/GBP or AUD/CAD). It is calculated by triangulating both currencies against their respective US Dollar exchange rates."
        },
        {
          q: "How do central bank interest rates influence currency values?",
          a: "Higher interest rates attract foreign capital seeking higher yields on sovereign debt, which increases demand and strengthens the domestic currency. Conversely, central bank interest rate cuts reduce foreign investment demand, typically depreciating the currency."
        },
        {
          q: "What is the cheapest way to send money internationally?",
          a: "Digital international transfer providers like Wise and OFX that convert money at the true mid-market rate with transparent, low percentage fees (0.3% to 0.6%) are consistently 70% to 90% cheaper than traditional bank wires and airport kiosks."
        }
      ]}
    >
      <Calculator {...fx} />
    </CalcPage>
  );
}
