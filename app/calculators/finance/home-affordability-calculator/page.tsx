import Calculator from "@/components/calcs/finance/home-affordability-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/home-affordability-calculator";
const DESCRIPTION =
  "Free home affordability calculator: how much house you can afford based on income, debts, down payment, mortgage rate, property tax and insurance, using lender debt-to-income limits.";

export const metadata = calcMetadata(PATH, "Home Affordability Calculator – Budget a Home | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Home Affordability Calculator"
      intro="Find the most expensive home you can likely qualify for, based on your income, existing debts, down payment and today's mortgage rates."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How lenders decide what you can afford</h2>
          <p>Mortgage lenders look at two debt-to-income (DTI) ratios:</p>
          <Formula>Front-end DTI = Housing payment ÷ Gross monthly income</Formula>
          <Formula>Back-end DTI = (Housing payment + Other debts) ÷ Gross monthly income</Formula>
          <p>
            The classic conservative rule is <strong>28% / 36%</strong>. Conventional and FHA loans often allow more —
            around 31% / 43%, and higher with strong credit and savings. Your housing payment includes principal, interest,
            property tax, insurance and HOA dues.
          </p>
          <p>
            The calculator takes the lower of the two limits, subtracts insurance and HOA, and solves for the home price whose
            mortgage payment plus property tax fits exactly.
          </p>
          <h3>Example</h3>
          <p>
            With a $100,000 income, $500 of monthly debts, $60,000 down and a 6.5% 30-year rate, the 28% limit allows a $2,333
            housing payment — enough for a home of about <strong>$354,000</strong> after property tax and insurance.
          </p>
          <h2>Qualifying vs. comfortable</h2>
          <p>
            The amount a lender approves isn&rsquo;t necessarily what&rsquo;s comfortable. Leave room for maintenance (often 1–2%
            of the home&rsquo;s value a year), retirement saving and an emergency fund. Many buyers aim below their maximum.
          </p>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Homeownership & Underwriting Tools</h3>
            <p>
              Determining your conservative purchase ceiling protects against becoming house-poor. Model exact monthly PITI payments with our <a href="/calculators/finance/mortgage-calculator">Mortgage Calculator</a>, calculate upfront equity requirements using the <a href="/calculators/finance/down-payment-calculator">Down Payment Calculator</a>, compare real estate equity building to renting via the <a href="/calculators/finance/rent-vs-buy-calculator">Rent vs Buy Calculator</a>, and lower your debt-to-income (DTI) ratio with our <a href="/calculators/finance/debt-payoff-calculator">Debt Payoff Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "How much house can I afford on $100,000 a year?",
          a: "Roughly $300,000–$450,000 depending on your debts, down payment, interest rate and local property taxes. Enter your own numbers above for a personal estimate.",
        },
        {
          q: "Does a bigger down payment let me afford more?",
          a: "Yes. Every extra dollar down adds a dollar to the price you can afford without raising your payment, and reaching 20% removes PMI.",
        },
        {
          q: "How do interest rates affect affordability?",
          a: "Higher rates mean more of each payment goes to interest. A one-point rise in rates typically cuts buying power by around 10%.",
        },
      ]}
      related={[
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/down-payment-calculator", icon: "💰", name: "Down Payment" },
        { href: "/calculators/finance/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
        { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
