import Calculator from "@/components/calcs/finance/vat-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VatInputOutputTaxDecompositionChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/vat-calculator";
const TITLE = "VAT Calculator – Add or Remove Value-Added Tax / GST | CalcDigi";
const DESCRIPTION =
  "Free VAT / GST calculator: calculate inclusive gross prices or reverse-calculate exclusive net prices across UK, EU, UAE, Saudi Arabia, Canada, Australia, and Pakistan standard, reduced, and zero tax rates.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="VAT Calculator"
      intro="Add Value Added Tax (VAT) or Goods & Services Tax (GST) to a net price, or reverse-extract the tax component and pre-tax price from any gross invoice total across international jurisdictions."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Gross = Net * (1 + VAT_Rate)"
      article={
        <>
          <h2>Direct Answer: What Is Value-Added Tax (VAT) &amp; How Does the Multi-Stage Tax Mechanism Work?</h2>
          <p>
            <strong>Value-Added Tax (VAT)</strong>, also designated in many commonwealth nations as <strong>Goods and Services Tax (GST)</strong>, is an indirect, multi-stage consumption tax assessed on the incremental value added to goods and services at each distinct phase of production, distribution, and ultimate retail sale. Unlike US retail sales tax (which is collected only at the final cash register), VAT is collected incrementally by registered businesses across the entire supply chain. Businesses charge VAT on their output sales (<strong>Output Tax</strong>) and credit the VAT paid on commercial inputs (<strong>Input Tax</strong>), remitting only the net difference to national tax authorities.
          </p>

          <Formula>Gross Price (VAT-Inclusive) = Net Price × (1 + VAT Rate)</Formula>
          <Formula>Net Price (VAT-Exclusive) = Gross Price ÷ (1 + VAT Rate)</Formula>
          <Formula>Embedded VAT Amount = Gross Price × [VAT Rate ÷ (1 + VAT Rate)]</Formula>
          <p>
            For example, with a standard <strong>20.0% VAT rate</strong>, the embedded VAT fraction in any gross price is exactly:
            <br />
            <strong>20 ÷ 120 = 1/6 (16.667%)</strong>. Multiplying a gross total of £120.00 by 1/6 yields the exact £20.00 VAT component.
          </p>

          <VatInputOutputTaxDecompositionChart />

          <h2>Global Standard VAT &amp; GST Rates Across Major Jurisdictions</h2>
          <p>
            The table below reflects current statutory standard VAT and GST rates across prominent global trading economies:
          </p>

          <DataTable
            head={["Country / Jurisdiction", "Tax System Name", "Standard Statutory Rate", "Reduced Rate Categories", "VAT Registration Threshold"]}
            rows={[
              ["United Kingdom (UK)", "VAT", "20.0%", "5.0% (home energy) / 0% (books, food)", "£90,000 annual turnover"],
              ["Germany (DE)", "Umsatzsteuer (MwSt)", "19.0%", "7.0% (groceries, cultural books)", "€22,000 (Kleinunternehmer)"],
              ["France (FR)", "TVA", "20.0%", "10.0%, 5.5% (food, books), 2.1%", "€36,800 (services)"],
              ["United Arab Emirates (UAE)", "VAT", "5.0%", "0% (healthcare, exports)", "AED 375,000 turnover"],
              ["Saudi Arabia (KSA)", "VAT", "15.0%", "0% (international transport)", "SAR 375,000 turnover"],
              ["Australia (AU)", "GST", "10.0%", "0% (fresh food, medical, education)", "AUD $75,000 turnover"],
              ["Pakistan (PK)", "Sales Tax / GST", "18.0%", "1%–10% (concessional items)", "PKR 10,000,000 annual"],
              ["India (IN)", "GST (CGST + SGST)", "18.0% (standard)", "5.0%, 12.0%, 28.0% (luxury tiers)", "₹40 Lakh (goods) / ₹20 Lakh (services)"],
            ]}
          />

          <h2>Input Tax Credits &amp; The Cross-Border B2B Reverse Charge</h2>
          <ul>
            <li>
              <strong>Input Tax Credit Neutrality:</strong> For VAT-registered businesses, VAT is completely expense-neutral. If your business purchases $1,000 of IT equipment plus $200 VAT, that $200 is claimed as an input tax credit on your quarterly VAT return, neutralizing corporate cost.
            </li>
            <li>
              <strong>Cross-Border B2B Reverse Charge:</strong> When purchasing digital software, SaaS tools, or professional services from an international supplier (e.g., a UK business purchasing US software), the supplier invoices at 0% VAT, and the purchasing company self-accounts for both input and output VAT simultaneously on its domestic return.
            </li>
            <li>
              <strong>Zero-Rated vs. Exempt Supplies:</strong> <em>Zero-rated items</em> (0% VAT charged to buyers) allow the seller to reclaim all input VAT spent producing the product. <em>Exempt supplies</em> (like financial services or residential leasing) carry no VAT on sales, but the provider cannot reclaim input VAT paid on their own purchases.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related International Tax &amp; Business Solvers</h3>
            <p>
              Navigating Value Added Tax across domestic and international transactions ensures exact price compliance. Calculate state and local retail taxes with our <a href="/calculators/finance/sales-tax-calculator">Sales Tax Calculator</a>, convert foreign currencies using real-time mid-market rates with the <a href="/calculators/finance/currency-converter">Currency Converter</a>, track commercial operating margins via the <a href="/calculators/finance/business-profit-calculator">Business Profit Calculator</a>, and calculate merchant transaction fees with our <a href="/calculators/finance/paypal-fee-calculator">PayPal Fee Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "How do you calculate 20% VAT backwards from a gross amount?",
          a: "To remove 20% VAT from a gross price, divide the total by 1.20 to find the pre-tax net price. To find the VAT amount directly, multiply the gross price by 0.20 / 1.20 (which simplifies to dividing by 6). For example, £150 / 6 = £25.00 VAT, leaving £125.00 net.",
        },
        {
          q: "Why doesn't the United States have a national Value-Added Tax (VAT)?",
          a: "The US relies on state and local retail sales taxes governed independently by the 50 states. Under the US Constitution, the federal government does not levy a general consumption tax, leaving consumer taxation to state and municipal authorities.",
        },
        {
          q: "What is the difference between VAT-inclusive and VAT-exclusive pricing?",
          a: "VAT-inclusive pricing represents the total gross price including tax, which is legally mandated on consumer-facing retail shelves and e-commerce checkouts across the UK and EU. VAT-exclusive pricing represents the pre-tax net cost, standard on B2B commercial wholesale invoices.",
        },
        {
          q: "Can international tourists reclaim VAT when shopping abroad?",
          a: "Yes. In the European Union and many other VAT jurisdictions, non-resident foreign visitors can obtain a tax-free shopping refund form at retail checkout and receive a refund of the VAT paid (minus processing administration fees) when presenting their purchased goods at airport customs upon departing the country.",
        },
      ]}
      related={[
        { href: "/calculators/finance/sales-tax-calculator", icon: "🛒", name: "US Sales Tax" },
        { href: "/calculators/finance/currency-converter", icon: "💱", name: "Currency Converter" },
        { href: "/calculators/business/markup-calculator", icon: "📈", name: "Markup" },
        { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin" },
        { href: "/calculators/business/invoice-calculator", icon: "📄", name: "Invoice" },
        { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
