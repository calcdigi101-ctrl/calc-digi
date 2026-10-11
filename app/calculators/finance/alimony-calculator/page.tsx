import Calculator from "@/components/calcs/finance/alimony-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/alimony-calculator";
const DESCRIPTION =
  "Free alimony calculator: estimate spousal support and how long it may last using the widely cited AAML guideline formula, based on both spouses' incomes and the length of the marriage.";

export const metadata = calcMetadata(PATH, "Alimony Calculator – Spousal Support Estimate | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Alimony Calculator"
      intro="Get a rough estimate of spousal support and its likely duration from both spouses' incomes and the length of the marriage."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>The guideline formula used here</h2>
          <p>
            There is no national alimony formula in the US. This calculator uses the guideline proposed by the American Academy
            of Matrimonial Lawyers (AAML), which many practitioners use as a starting point:
          </p>
          <Formula>Annual support = 30% of payer&rsquo;s gross income − 20% of payee&rsquo;s gross income</Formula>
          <p>
            The result is capped so the lower earner&rsquo;s income plus support doesn&rsquo;t exceed 40% of the couple&rsquo;s
            combined income.
          </p>
          <h3>Example</h3>
          <p>
            With incomes of $90,000 and $40,000, the formula gives $19,000 a year, but the 40% cap limits it to{" "}
            <strong>$12,000 a year ($1,000 a month)</strong>. After a 12-year marriage, the guideline suggests about 7.2 years
            of support.
          </p>
          <h2>How long alimony lasts</h2>
          <DataTable
            head={["Length of marriage", "Guideline duration"]}
            rows={[
              ["0–3 years", "30% of the marriage length"],
              ["3–10 years", "40%"],
              ["10–20 years", "60%"],
              ["20+ years", "Often indefinite"],
            ]}
          />
          <h2>What courts consider</h2>
          <ul>
            <li>Each spouse&rsquo;s income, earning capacity and job prospects</li>
            <li>The standard of living during the marriage</li>
            <li>Age, health, and contributions as a homemaker or caregiver</li>
            <li>Child custody arrangements and child support</li>
            <li>Prenuptial agreements and, in some states, marital misconduct</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Is alimony taxable?",
          a: "For divorces finalized after 2018, alimony is not deductible by the payer and not taxable income for the recipient under federal law. Older agreements may follow the previous rules.",
        },
        {
          q: "Can alimony be changed later?",
          a: "Often yes, if circumstances change substantially — such as job loss, a large income change, or the recipient remarrying — unless the agreement says it's non-modifiable.",
        },
        {
          q: "Do all states use this formula?",
          a: "No. Some states, counties and courts have their own formulas; others leave it entirely to the judge's discretion. Treat this as a ballpark figure.",
        },
      ]}
      related={[
        { href: "/calculators/finance/child-support-calculator", icon: "👨‍👧", name: "Child Support" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/net-worth-calculator", icon: "💼", name: "Net Worth" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛟", name: "Emergency Fund" },
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
