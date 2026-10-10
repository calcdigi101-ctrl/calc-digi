import Calculator from "@/components/calcs/finance/vat-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/vat-calculator";
const DESCRIPTION =
  "Free VAT calculator: add VAT to a net price or remove VAT from a gross price, with standard rates for the UK, EU countries, UAE, Saudi Arabia, India, Pakistan, Australia and more.";

export const metadata = calcMetadata(PATH, "VAT Calculator – Add or Remove VAT / GST at Any Rate | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="VAT Calculator"
      intro="Add VAT to a net price or extract the VAT from a gross price, using common country rates or your own."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>VAT formulas</h2>
          <Formula>Gross = Net × (1 + VAT rate)</Formula>
          <Formula>Net = Gross ÷ (1 + VAT rate)</Formula>
          <Formula>VAT in a gross price = Gross × rate ÷ (1 + rate)</Formula>
          <p>
            At 20%, VAT is 1/6 (16.67%) of a VAT-inclusive price — so £120 contains £20 of VAT. Simply taking 20% off £120
            would give the wrong answer (£96).
          </p>
          <h2>What is VAT?</h2>
          <p>
            Value-added tax is a consumption tax charged at each stage of production and sale. Businesses charge VAT on their
            sales (output tax) and reclaim the VAT they paid on purchases (input tax), so the full burden falls on the final
            consumer. More than 170 countries use VAT or a similar goods and services tax (GST). The United States uses state
            sales taxes instead.
          </p>
          <h2>Reduced and zero rates</h2>
          <p>
            The rates in the calculator are standard rates. Many countries apply reduced rates to food, books, children&rsquo;s
            clothing, public transport or energy, and zero-rate exports. Check the rules for the specific product.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I calculate 20% VAT?",
          a: "Multiply the net price by 1.2 to get the gross price. To find the VAT in a gross price, divide by 6 (or multiply by 0.2 ÷ 1.2).",
        },
        {
          q: "Do I need to register for VAT?",
          a: "Businesses must register once taxable sales exceed the country's threshold — for example £90,000 a year in the UK. Below it, registration is optional.",
        },
        {
          q: "Is VAT the same as sales tax?",
          a: "Both are paid by consumers, but sales tax is collected once at the final sale, while VAT is collected in stages throughout the supply chain.",
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
