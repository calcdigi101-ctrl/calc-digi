import Calculator from "@/components/calcs/finance/loan-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/loan-calculator";
const DESCRIPTION =
  "Free loan calculator: find the monthly payment, total interest and payoff schedule for any personal, student or business loan, and see how extra payments shorten it.";

export const metadata = calcMetadata(PATH, "Loan Calculator – Monthly Payment & Amortization Schedule | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Loan Calculator"
      intro="Work out the monthly payment and total interest on any fixed-rate loan, then see the full year-by-year amortization schedule."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How loan payments are calculated</h2>
          <p>
            Personal loans, auto loans, student loans and mortgages are usually <strong>amortized</strong>: you pay the
            same amount every month, and each payment covers that month&rsquo;s interest first and the rest reduces the
            balance. Early payments are mostly interest; later ones are mostly principal.
          </p>
          <Formula>M = P × r ÷ [1 − (1 + r)^−n]</Formula>
          <p>
            <strong>M</strong> is the monthly payment, <strong>P</strong> the amount borrowed, <strong>r</strong> the
            monthly rate (APR ÷ 12) and <strong>n</strong> the number of monthly payments.
          </p>
          <h3>Example</h3>
          <p>
            Borrowing $15,000 at 10.5% APR for 5 years gives r = 0.00875 and n = 60, so the payment is{" "}
            <strong>$322.41</strong> a month. Over 60 payments you repay $19,344.51, of which <strong>$4,344.51</strong>{" "}
            is interest.
          </p>
          <h2>How the term changes total cost</h2>
          <p>A longer term lowers the monthly payment but raises the total interest. For $15,000 at 10.5%:</p>
          <DataTable
            head={["Term", "Monthly payment", "Total interest"]}
            rows={[
              ["2 years", "$695.64", "$1,695.37"],
              ["3 years", "$487.54", "$2,551.32"],
              ["5 years", "$322.41", "$4,344.51"],
              ["7 years", "$252.91", "$6,244.45"],
            ]}
          />
          <h2>Ways to pay less interest</h2>
          <ul>
            <li>Improve your credit score before applying; rates for excellent credit can be half those for fair credit.</li>
            <li>Choose the shortest term whose payment fits your budget.</li>
            <li>Make extra principal payments (use the Extra payments option above) and confirm there is no prepayment penalty.</li>
            <li>Compare offers by APR, which includes origination fees, rather than by interest rate alone.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "What is the difference between interest rate and APR?",
          a: "The interest rate is the cost of borrowing the principal. APR adds required fees such as origination charges, so it reflects the true yearly cost and is the better number for comparing lenders.",
        },
        {
          q: "Does paying extra each month really help?",
          a: "Yes. Extra money goes straight to principal, so every following month accrues less interest. On a 5-year, $15,000 loan at 10.5%, an extra $50 a month saves about $770 in interest and ends the loan 10 months early.",
        },
        {
          q: "Is this calculator suitable for interest-only or balloon loans?",
          a: "No. It assumes a fully amortizing fixed-rate loan with equal monthly payments. Interest-only, balloon and variable-rate loans have different payment schedules.",
        },
      ]}
      related={[
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/debt-payoff-calculator", icon: "🧾", name: "Debt Payoff" },
        { href: "/calculators/education/student-loan-calculator", icon: "🎓", name: "Student Loan" },
        { href: "/calculators/business/business-loan-calculator", icon: "🏢", name: "Business Loan" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
