import Calculator from "@/components/calcs/finance/currency-converter";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";
import { getRates } from "@/lib/fx";

// Rebuild the page (and refresh exchange rates) at most once a day.
export const revalidate = 86400;

const PATH = "/calculators/finance/currency-converter";
const DESCRIPTION =
  "Free currency converter with daily-updated exchange rates for 160+ currencies, including USD, EUR, GBP, PKR, INR, JPY, CAD and AUD.";

export const metadata = calcMetadata(PATH, "Currency Converter – 160+ Currencies, Daily Rates | CalcDigi", DESCRIPTION);

export default async function Page() {
  const { rates, updated, live } = await getRates();
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Currency Converter"
      intro="Convert between more than 160 world currencies using reference exchange rates that are refreshed every day."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How currency conversion works</h2>
          <p>All rates are stored against the US dollar, so any pair is converted through USD:</p>
          <Formula>Amount in B = Amount in A × (rate of B ÷ rate of A)</Formula>
          <p>
            The rates are <strong>mid-market</strong> reference rates — the midpoint between what banks pay to buy and sell
            a currency. They&rsquo;re the fairest benchmark, but not usually what consumers are offered.
          </p>
          <h2>Getting a better exchange rate</h2>
          <ul>
            <li>
              Compare the rate you&rsquo;re offered with the mid-market rate here; the difference is the provider&rsquo;s
              markup, often 2–5% at banks and airports.
            </li>
            <li>When paying by card abroad, choose to be charged in the local currency to avoid dynamic currency conversion fees.</li>
            <li>For international transfers, specialist services usually charge less than traditional wire transfers.</li>
            <li>Use a card with no foreign transaction fee when you travel.</li>
          </ul>
          <h2>Why exchange rates change</h2>
          <p>
            Rates move with interest-rate differences between countries, inflation, trade balances, economic news and
            investor demand for safe-haven currencies. Major pairs can move 1% or more in a day.
          </p>
        </>
      }
      faq={[
        {
          q: "How often are the rates updated?",
          a: "Once a day. They're suitable for planning and estimates, not for trading, where prices change every second.",
        },
        {
          q: "Why does my bank give a different rate?",
          a: "Banks and exchange services add a margin to the mid-market rate and sometimes a fixed fee. Ask for the total amount you'll receive to compare offers.",
        },
        {
          q: "Can I convert cryptocurrencies?",
          a: "Not here — this converter covers government-issued currencies. Use the crypto profit calculator for coin trades.",
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
