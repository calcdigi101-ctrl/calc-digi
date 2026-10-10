import Calculator from "@/components/calcs/finance/sales-tax-calculator";
import { STATE_RATES } from "@/lib/salesTax";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/sales-tax-calculator";
const DESCRIPTION =
  "Free sales tax calculator with every US state rate: add sales tax to a price or work out the pre-tax price from a total, including local city and county tax.";

export const metadata = calcMetadata(PATH, "Sales Tax Calculator – Add or Remove Tax for Any US State | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Sales Tax Calculator"
      intro="Add sales tax to a price, or back it out of a receipt total, using any US state's rate plus your local tax."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Sales tax formulas</h2>
          <Formula>Total = Price × (1 + rate)</Formula>
          <Formula>Price before tax = Total ÷ (1 + rate)</Formula>
          <p>
            For example, $100 at 8.25% is $108.25. Going the other way, a $108.25 receipt at 8.25% was $100 before tax —
            not $108.25 − 8.25%, which would give $99.32.
          </p>
          <h2>State and local sales tax</h2>
          <p>
            Sales tax in the US is set by states, and most allow counties, cities and special districts to add their own. The
            rate you pay is the sum, so two stores a few miles apart can charge different totals. Five states — Alaska,
            Delaware, Montana, New Hampshire and Oregon — have no statewide sales tax, though some Alaska towns levy a local one.
          </p>
          <h2>Statewide base rates</h2>
          <DataTable head={["State", "State rate"]} rows={STATE_RATES.map(([, name, rate]) => [name, `${rate}%`])} />
          <p>Check your state revenue department or a receipt for your exact combined rate. Rates can change, often on January 1 or July 1.</p>
        </>
      }
      faq={[
        {
          q: "Which state has the highest sales tax?",
          a: "California has the highest statewide base rate at 7.25%. Combined with local taxes, Louisiana, Tennessee, Arkansas, Washington and Alabama have some of the highest average total rates, around 9–10%.",
        },
        {
          q: "Is sales tax charged on everything?",
          a: "No. Many states exempt groceries, prescription drugs or clothing, or tax them at a lower rate. Services are often exempt too, though rules vary widely.",
        },
        {
          q: "Do I owe sales tax on online purchases?",
          a: "Generally yes. Since the 2018 Wayfair decision, large online sellers collect sales tax based on the delivery address in every state that has one.",
        },
      ]}
      related={[
        { href: "/calculators/finance/vat-calculator", icon: "🌍", name: "VAT Calculator" },
        { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount" },
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/business/sales-tax-calculator", icon: "🏢", name: "Business Sales Tax" },
        { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
