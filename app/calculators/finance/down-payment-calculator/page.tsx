import Calculator from "@/components/calcs/finance/down-payment-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/finance/down-payment-calculator";
const DESCRIPTION =
  "Free down payment calculator: how much you need for a 3%, 3.5%, 10% or 20% down payment plus closing costs, and how long it will take to save it.";

export const metadata = calcMetadata(PATH, "Down Payment Calculator – How Much to Save for a House | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Down Payment Calculator"
      intro="See how much cash you need to buy a home — down payment plus closing costs — and how long it will take to save it."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Minimum down payments by loan type</h2>
          <DataTable
            head={["Loan", "Minimum down", "Notes"]}
            rows={[
              ["Conventional", "3%", "PMI required below 20%; removable later"],
              ["FHA", "3.5%", "Needs a 580+ credit score; mortgage insurance premiums"],
              ["VA", "0%", "For eligible veterans and service members; funding fee"],
              ["USDA", "0%", "Eligible rural areas and income limits"],
              ["Jumbo", "10–20%", "Loans above the conforming limit"],
            ]}
          />
          <h3>Example</h3>
          <p>
            A 20% down payment on a $400,000 home is <strong>$80,000</strong>, and closing costs of about 3% add $12,000 — so
            you need roughly $92,000 in cash. With $20,000 saved and $1,500 a month going into a 4% account, that takes about 3
            years 7 months.
          </p>
          <h2>Is 20% down worth waiting for?</h2>
          <p>
            Putting 20% down avoids private mortgage insurance, lowers your monthly payment and saves interest. But waiting
            years to save can cost you if home prices and rents keep rising. A smaller down payment with PMI lets you buy
            sooner; you can ask to cancel PMI once you reach 20% equity.
          </p>
          <h2>Ways to reach your down payment faster</h2>
          <ul>
            <li>Keep the fund in a high-yield savings account or CDs, not the stock market, if you&rsquo;ll buy within a few years.</li>
            <li>Look for state and local first-time buyer down payment assistance programs.</li>
            <li>Family gifts are allowed for most loans with a signed gift letter.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What are closing costs?",
          a: "Fees to finalize the purchase and mortgage — lender fees, appraisal, title insurance, recording fees and prepaid taxes and insurance — typically 2–5% of the price.",
        },
        {
          q: "How much is PMI?",
          a: "Usually about 0.3% to 1.5% of the loan amount per year, depending on your credit score and down payment. This calculator uses 0.75% as a typical estimate.",
        },
        {
          q: "Can I use retirement savings for a down payment?",
          a: "First-time buyers can withdraw up to $10,000 from an IRA without the early-withdrawal penalty, though income tax may apply. 401(k) loans are another option, with risks if you leave your job.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
