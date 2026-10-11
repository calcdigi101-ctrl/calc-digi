import Calculator from "@/components/calcs/finance/apr-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/apr-calculator";
const DESCRIPTION =
  "Free APR calculator: find the real annual percentage rate of a loan once origination fees, points and closing costs are included, and compare it with the stated interest rate.";

export const metadata = calcMetadata(PATH, "APR Calculator – Real Cost of a Loan with Fees | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="APR Calculator"
      intro="Find the true annual cost of a loan once upfront fees are included, so you can compare offers with different rates and fees side by side."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>What APR tells you</h2>
          <p>
            A loan&rsquo;s <strong>interest rate</strong> sets your monthly payment. Its <strong>annual percentage rate
            (APR)</strong> also accounts for fees you pay to get the loan, such as origination fees, discount points and
            some closing costs. Because fees reduce the cash you actually receive while the payments stay the same, the APR
            is always at least as high as the interest rate. The federal Truth in Lending Act requires lenders to disclose
            it.
          </p>
          <h2>How APR is calculated</h2>
          <p>First the payment is calculated on the full loan amount at the stated rate. APR is then the rate that makes those same payments equal to the amount you receive after fees:</p>
          <Formula>Loan − Fees = Σ Payment ÷ (1 + APR/12)^k, for k = 1 … n</Formula>
          <p>There is no closed-form solution, so the calculator solves it numerically.</p>
          <h3>Example</h3>
          <p>
            A $20,000 five-year loan at 6.5% has a payment of $391.32. With $500 in fees you only receive $19,500, which
            pushes the APR to <strong>7.563%</strong> — more than a full point higher than the advertised rate.
          </p>
          <h2>Using APR to compare loans</h2>
          <ul>
            <li>Compare APRs for loans with the same term; fees have a bigger effect on short loans than long ones.</li>
            <li>A low-rate loan with high fees can cost more than a slightly higher-rate loan with none.</li>
            <li>If you&rsquo;ll repay or refinance early, upfront fees are spread over fewer months and the effective cost is even higher than the APR suggests.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Why is my APR higher than my interest rate?",
          a: "Because APR includes the fees you paid to get the loan. If a loan has no fees, the APR and the interest rate are the same.",
        },
        {
          q: "What's the difference between APR and APY?",
          a: "APR is used for loans and doesn't include compounding within the year. APY is used for savings and includes compounding, so it shows what you actually earn.",
        },
        {
          q: "Which fees should I include?",
          a: "Include charges you must pay to get the loan: origination or underwriting fees, discount points and lender-required closing costs. Don't include costs you'd pay anyway, like a home appraisal you ordered yourself or property taxes.",
        },
      ]}
      related={[
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
        { href: "/calculators/finance/apy-calculator", icon: "💹", name: "APY Calculator" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage" },
        { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan" },
        { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance" },
        { href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
