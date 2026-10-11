import Calculator from "@/components/calcs/finance/rent-vs-buy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/finance/rent-vs-buy-calculator";
const DESCRIPTION =
  "Free rent vs. buy calculator: compare your net wealth from buying a home versus renting and investing the difference, including appreciation, rent increases, taxes, maintenance and selling costs.";

export const metadata = calcMetadata(PATH, "Rent vs. Buy Calculator – Should You Rent or Buy? | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Rent vs. Buy Calculator"
      intro="Compare where you'd end up financially if you bought a home versus renting and investing the money you'd otherwise put into it."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How the comparison works</h2>
          <p>Instead of comparing monthly payments, the calculator compares <strong>net wealth</strong> at the end of your stay:</p>
          <ul>
            <li>
              <strong>Buyer:</strong> the home&rsquo;s value after appreciation, minus selling costs and the remaining
              mortgage, plus anything invested in months when owning cost less than renting.
            </li>
            <li>
              <strong>Renter:</strong> the down payment and closing costs they didn&rsquo;t spend, invested, plus the monthly
              difference whenever renting is cheaper than owning.
            </li>
          </ul>
          <p>
            Owning costs include principal and interest, property tax, and maintenance and insurance. Rent rises each year by
            the rent-increase rate.
          </p>
          <h3>Example</h3>
          <p>
            For a $400,000 home with 20% down at 6.5% versus $2,200 rent, staying 7 years leaves the renter about $15,000 ahead
            under the default assumptions — mostly because buying and selling costs about 9% of the price. Stay longer, or
            assume faster appreciation, and buying usually pulls ahead.
          </p>
          <h2>When buying tends to win</h2>
          <ul>
            <li>You&rsquo;ll stay at least 5–7 years, giving appreciation and equity time to outrun transaction costs.</li>
            <li>Local rents are high relative to prices (a low price-to-rent ratio).</li>
            <li>You can get a competitive mortgage rate.</li>
          </ul>
          <h2>When renting tends to win</h2>
          <ul>
            <li>You may move within a few years.</li>
            <li>Home prices are very high relative to rents.</li>
            <li>You&rsquo;ll actually invest the money you save — the renter&rsquo;s advantage depends on it.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What is the price-to-rent ratio?",
          a: "Home price divided by a year's rent for a similar home. Below about 15 generally favors buying; above about 20 often favors renting.",
        },
        {
          q: "Does this include the mortgage interest tax deduction?",
          a: "No. With the higher standard deduction, most homeowners no longer itemize, so the deduction often provides little benefit. Leaving it out keeps the comparison conservative.",
        },
        {
          q: "Isn't rent just throwing money away?",
          a: "Not exactly. Owners also have unrecoverable costs — interest, property tax, maintenance, insurance and transaction fees. The real question is which unrecoverable costs are lower for you.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/housing/rent-calculator", icon: "🏢", name: "Rent Affordability" },
        { href: "/calculators/finance/investment-calculator", icon: "📈", name: "Investment" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
