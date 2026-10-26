import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverterComponent from "@/components/calcs/measurements/currency-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CurrencyPurchasingPowerParityBasketChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/currency-converter";
const TITLE = "Currency Converter | Multi-Currency Benchmark & FX Spreads";
const DESCRIPTION =
  "Convert global currencies with interbank benchmark exchange rates, bank margin spread fee deductions, and purchasing power parity (PPP) modeling.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/calculators/education/gpa-calculator", icon: "🎓", name: "GPA Calculator" },
  { href: "/calculators/measurements/number-system-converter", icon: "🔢", name: "Number System" },
  { href: "/pages/measurements", icon: "💱", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between the mid-market exchange rate and retail bank rates?",
    a: "The mid-market rate (interbank rate) is the real-time midpoint between wholesale buy and sell prices on global foreign exchange markets where central banks and major financial institutions trade. Retail commercial banks and credit card issuers add a hidden markup spread (typically 1.5% to 4.5% over mid-market) alongside foreign transaction fees, delivering fewer target units to consumers.",
  },
  {
    q: "What is Purchasing Power Parity (PPP) and how does it differ from market FX rates?",
    a: "Purchasing Power Parity (PPP) is an economic metric based on the Law of One Price: exchange rates between currencies are in equilibrium when their purchasing power is identical for an equivalent basket of consumer goods. Market spot FX rates fluctuate dynamically due to interest rate differentials and speculative capital flows, frequently diverging from real purchasing power parity by 20% to 50%.",
  },
  {
    q: "Why are certain currencies pegged to the US Dollar rather than floating freely?",
    a: "Several economies—such as the UAE (AED pegged at 3.6725 per USD), Saudi Arabia (SAR at 3.75), and Hong Kong (HKD in a narrow 7.75-7.85 band)—maintain fixed currency pegs to eliminate foreign exchange volatility for vital commodities exports (petroleum) and stabilize international investment capital.",
  },
  {
    q: "How does currency inflation erode international purchasing power over time?",
    a: "Under the macroeconomic Fisher effect and relative purchasing power parity, countries with sustained higher domestic consumer price inflation experience steady downward depreciation of their nominal exchange rates relative to low-inflation currencies, maintaining equilibrium in international goods trade over multi-year horizons.",
  },
];

export default function CurrencyConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Financial Guidance:</strong> Foreign exchange rates govern international monetary purchasing parity. In cross-border e-commerce, international business travel, and corporate treasury management, cross-reference transaction fees in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and calculate financial ratios using our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Macroeconomic Foreign Exchange Foundations: Floating Regimes & Trilemma
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Foreign exchange (forex or FX) markets constitute the largest, most liquid financial asset market in the world, with daily global turnover exceeding \$7.5 trillion according to the Bank for International Settlements (BIS) triennial survey. In modern international economics, sovereign currencies serve as standardized units of account, stores of value, and mediums of exchange within national jurisdictions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Following the collapse of the post-WWII Bretton Woods gold-standard agreement in 1971, major world economies transitioned to floating exchange rate regimes governed by supply and demand. According to the Mundell-Fleming &apos;Impossible Trinity&apos; (trilemma), no national central bank can simultaneously maintain all three policy objectives: a fixed foreign exchange rate, free international capital movement, and sovereign monetary policy autonomy.
          </p>

          <CurrencyPurchasingPowerParityBasketChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation of FX Triangulation & Retail Spread Deductions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global foreign exchange trading, non-USD currency pairs (cross-currency pairs such as EUR/GBP or AUD/JPY) are priced mathematically through triangular arbitrage against the US Dollar vehicle currency:
          </p>
          <Formula>{"\\text{Rate}(A \\to B) = \\frac{\\text{Rate}(A \\to \\text{USD})}{\\text{Rate}(B \\to \\text{USD})} = \\frac{R_B}{R_A}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When converting a nominal gross amount M_source into a target currency, commercial retail intermediaries apply a percentage margin spread fee f_pct (typically 1.0% to 3.5%):
          </p>
          <Formula>{"M_{\\text{nominal}} = M_{\\text{source}} \\times \\text{Rate}(A \\to B)"}</Formula>
          <Formula>{"M_{\\text{net}} = M_{\\text{nominal}} \\times \\left( 1 - \\frac{f_{\\text{pct}}}{100} \\right) = M_{\\text{nominal}} - \\text{Fee}_{\\text{deduction}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The effective consumer exchange rate is: Rate_eff = M_net / M_source. When planning global business travel or cross-border payroll, evaluating true transaction spreads prevents surprise financial charges; cross-reference fee percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and calculate transmission runtimes in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Currency Benchmark Pegs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles representative mid-market benchmark reference rates, ISO 4217 alphabetic codes, and typical retail transaction spreads:
          </p>
          <DataTable
            head={["Currency Name", "ISO Code", "Symbol", "Units per 1 USD (Ref)", "Typical Bank FX Spread"]}
            rows={[
              ["United States Dollar", "USD", "$", "1.0000", "0.0% (Base Anchor)"],
              ["Eurozone Euro", "EUR", "€", "0.9250", "1.5% - 2.5%"],
              ["British Pound Sterling", "GBP", "£", "0.7820", "1.5% - 2.5%"],
              ["Japanese Yen", "JPY", "¥", "154.80", "1.8% - 3.0%"],
              ["Canadian Dollar", "CAD", "C$", "1.3850", "1.5% - 2.8%"],
              ["Australian Dollar", "AUD", "A$", "1.5240", "1.5% - 2.8%"],
              ["Swiss Franc", "CHF", "CHF", "0.9020", "1.5% - 2.5%"],
              ["Chinese Yuan Renminbi", "CNY", "¥", "7.2450", "2.0% - 3.5%"],
              ["Indian Rupee", "INR", "₹", "83.55", "2.0% - 3.8%"],
              ["UAE Dirham (Pegged)", "AED", "د.إ", "3.6725", "1.0% - 2.0%"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Case Study: Cross-Border SaaS Enterprise Procurement
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a British technology firm procuring enterprise cloud hosting software from an American vendor. The annual subscription invoice totals \$85,000 USD. The British company&apos;s corporate treasury bank charges a 2.2% foreign transaction fee spread over the interbank mid-market exchange rate of 1 GBP = 1.2820 USD (or 1 USD = 0.7800 GBP):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Compute Mid-Market Base Cost in GBP):</strong> \$85,000 USD ÷ 1.2820 USD/GBP = £66,302.65 GBP.</li>
            <li><strong>Step 2 (Apply 2.2% Bank Markup Spread):</strong> Bank fee deduction = £66,302.65 × 0.022 = £1,458.66 GBP.</li>
            <li><strong>Step 3 (Calculate Net Delivered Payment Outlay):</strong> Total cash outlay = £66,302.65 + £1,458.66 = £67,761.31 GBP.</li>
            <li><strong>Step 4 (Effective Exchange Rate Verification):</strong> Effective rate achieved = \$85,000 ÷ £67,761.31 = 1.2544 USD/GBP (compared to 1.2820 interbank), illustrating the £1,458 hidden banking fee spread. Cross-reference fee ratios in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Balassa-Samuelson Effect & Real Effective Exchange Rates (REER)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international trade economics, the Balassa-Samuelson hypothesis explains why market exchange rates consistently deviate from purchasing power parity across developing versus developed nations. Productivity growth in developing economies is heavily concentrated in tradable manufactured goods (e.g., electronics, automobiles) rather than non-tradable local services (haircuts, restaurant meals, local housing).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because higher manufacturing wages pull up service wages throughout the economy, developed nations with high productivity exhibit systematically higher domestic price levels. Consequently, converting USD or EUR into currencies of emerging economies yields vastly greater real purchasing power than indicated by nominal spot FX rates, a principle captured popularized by The Economist&apos;s &apos;Big Mac Index&apos;.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Central Bank Interest Rate Parity & FX Forward Hedging
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international treasury risk management, Covered Interest Rate Parity (CIRP) establishes that the forward exchange rate premium or discount between two currencies must equal the nominal interest rate differential between their respective central banks (such as the US Federal Reserve, European Central Bank, or Bank of England):
          </p>
          <Formula>{"F = S \\times \\left( \\frac{1 + r_{\\text{quote}}}{1 + r_{\\text{base}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where F is the forward exchange rate, S is the current spot rate, and r represents annualized money market risk-free interest rates. If interest rate parity fails to hold, multinational currency traders execute riskless forward arbitrage until pricing equilibrium is restored across interbank foreign exchange swap desks.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in International Travel, Expatriate Remittances & Wire Transfers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For individual travelers and expatriate workers sending international remittances to families abroad, currency conversion is an essential recurring task. Airport physical currency exchange booths frequently levy hidden spreads exceeding 8% to 12%, making ATM debit withdrawals or digital multi-currency fintech cards dramatically more cost-effective.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In academic coursework, finance students analyze international monetary economics and foreign direct investment (FDI). For student performance tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and track test percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Triangular Foreign Exchange Arbitrage & Algorithmic Market Liquidity
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In high-frequency quantitative trading, triangular currency arbitrage represents the programmatic exploitation of pricing discrepancies among three cross-currency pairs. Suppose the market quotes EUR/USD at 1.0800, GBP/USD at 1.2800, and EUR/GBP at 0.8450. A trader can compute the theoretical synthetic cross-rate: EUR/GBP_synth = (EUR/USD) ÷ (GBP/USD) = 1.0800 ÷ 1.2800 = 0.84375.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because the quoted market rate (0.8450) exceeds the synthetic rate (0.84375), an automated arbitrage algorithm instantly converts USD to EUR, sells EUR for GBP, and converts GBP back to USD, locking in a risk-free profit margin. In modern interbank electronic communication networks (ECNs), algorithmic market makers execute millions of these triangular checks per second, compressing pricing anomalies down to fractions of a basis point (0.0001 or 1 pip) and ensuring seamless global currency liquidity.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            SWIFT Banking Architecture: Nostro/Vostro Accounts & ISO 20022 Messaging
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When international commercial wire transfers move capital across borders, physical currency does not travel on airplanes. Cross-border capital settlement relies on the Society for Worldwide Interbank Financial Telecommunication (SWIFT) network connecting over 11,000 banking institutions across 200 countries.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Correspondent banking relationships operate via bilateral Nostro (&apos;our money at your bank&apos;) and Vostro (&apos;your money at our bank&apos;) ledger accounts. When a US bank transfers funds to a European supplier, it debits the client&apos;s domestic USD account and credits the European correspondent bank&apos;s USD Nostro account in New York, while the European bank simultaneously credits the recipient in Euros from its Frankfurt ECB reserve account. Modern banking is currently migrating from legacy MT103 text telegrams to rich XML-based ISO 20022 MX messages, embedding rich invoice metadata and automated sanctions compliance screening.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Bretton Woods System & The Triffin Dilemma of Reserve Currencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The modern foreign exchange regime traces its lineage to the 1944 Bretton Woods conference in New Hampshire, where 44 allied nations established the International Monetary Fund (IMF) and the World Bank. Under Bretton Woods, the US Dollar was fixed to gold at \$35 per ounce, and all other member currencies maintained fixed exchange rates pegged to the Dollar.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, Belgian-American economist Robert Triffin identified a fundamental structural paradox known as the Triffin Dilemma: to supply sufficient global liquidity for expanding post-war world trade, the United States had to run continuous balance-of-payments current account deficits. Yet, as foreign central banks accumulated vast dollar reserves, foreign dollar claims eventually exceeded total US Fort Knox gold reserves, undermining confidence in gold convertibility.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On August 15, 1971, President Richard Nixon unilaterally suspended the dollar&apos;s gold convertibility (&apos;the Nixon Shock&apos;), dissolving the Bretton Woods parities and ushering in the modern era of floating fiat exchange rates governed by free-market foreign exchange dynamics.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In international trade finance and cross-border commercial invoicing, corporations mitigate currency exchange risk using currency futures and options contracts traded on organized exchanges like the Chicago Mercantile Exchange (CME). Hedging currency volatility allows multinational exporters to stabilize profit margins regardless of macroeconomic foreign exchange fluctuations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, global central banks hold foreign exchange reserves denominated in major currencies to intervene in currency markets and defend national currency stability during periods of international economic turbulence.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial travel and overseas tourism, credit cards offering zero foreign transaction fees eliminate traditional 3% bank currency conversion markups. Understanding wholesale interbank mid-market exchange rates allows consumers to avoid dynamic currency conversion (DCC) markups at foreign merchant point-of-sale terminals.
          </p>
        </>
      }
    >
      <CurrencyConverterComponent />
    </CalcPage>
  );
}
