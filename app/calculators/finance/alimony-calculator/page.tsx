import Calculator from "@/components/calcs/finance/alimony-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlimonyDurationBenchmarkChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/alimony-calculator";
const TITLE = "Alimony Calculator – Spousal Support Guidelines, AAML Formula & Duration | CalcDigi";
const DESCRIPTION =
  "Free alimony calculator: estimate spousal support payments and statutory duration using the American Academy of Matrimonial Lawyers (AAML) formula. Model gross income splits, the 40% combined cap, marriage duration guidelines, and post-TCJA tax rules.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Alimony Calculator"
      intro="Estimate statutory spousal support (maintenance) and payment duration benchmarks based on spousal gross incomes and length of marriage using the American Academy of Matrimonial Lawyers (AAML) formula."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="AnnualSupport = Min(0.30*PayerGross - 0.20*PayeeGross, 0.40*CombinedGross - PayeeGross)"
      article={
        <>
          <h2>Direct Answer: What Is Alimony &amp; How Does the AAML Spousal Support Guideline Formula Work?</h2>
          <p>
            <strong>Alimony</strong> (also legally designated as spousal maintenance or spousal support) is a court-ordered or contractually agreed periodic financial payment made by the higher-earning former spouse to the lower-earning or non-earning former spouse following a legal separation or divorce. Its primary legal purpose is to mitigate unfair economic disparities, provide rehabilitative support while a spouse gains job skills, and enable both parties to maintain a standard of living reasonably approximating the marital baseline. Because federal law does not dictate a national alimony schedule, family law judges and matrimonial attorneys nationwide benchmark support negotiations using the <strong>American Academy of Matrimonial Lawyers (AAML) Guideline Formula</strong>.
          </p>

          <Formula>Base Annual Support = (30% of Higher Earner Gross Income) − (20% of Lower Earner Gross Income)</Formula>
          <Formula>Statutory Combined Cap: (Payee Gross Income + Annual Support) ≤ 40% of Combined Gross Income</Formula>

          <AlimonyDurationBenchmarkChart />

          <h2>AAML Spousal Support Payout &amp; Duration Matrix</h2>
          <p>
            The table below illustrates monthly spousal support payouts and recommended payment durations across common income differentials and marriage lengths under the AAML national model:
          </p>

          <DataTable
            head={["Payer Gross Income", "Payee Gross Income", "Length of Marriage", "Calculated Monthly Support", "Guideline Support Duration"]}
            rows={[
              ["$75,000 / year", "$25,000 / year", "4 Years (Short-Term)", "$1,042 / month (capped)", "1.2 to 1.6 Years (30%–40%)"],
              ["$110,000 / year", "$35,000 / year", "8 Years (Mid-Length)", "$1,917 / month (capped)", "2.4 to 3.2 Years (30%–40%)"],
              ["$150,000 / year", "$40,000 / year", "14 Years (Long-Term)", "$3,083 / month (capped)", "7.0 to 8.4 Years (50%–60%)"],
              ["$220,000 / year", "$50,000 / year", "18 Years (Long-Term)", "$4,833 / month (capped)", "12.6 to 14.4 Years (70%–80%)"],
              ["$300,000 / year", "$60,000 / year", "22+ Years (Permanent Tier)", "$7,000 / month (capped)", "Indefinite / Permanent Duration"],
            ]}
          />

          <h2>The 4 Primary Classifications of Spousal Support</h2>
          <ul>
            <li>
              <strong>1. Temporary Alimony (Pendente Lite):</strong> Awarded during the ongoing divorce litigation proceedings to ensure the lower-earning spouse can maintain household living expenses and retain legal counsel until the final decree.
            </li>
            <li>
              <strong>2. Rehabilitative Alimony (Most Common):</strong> Awarded for a specific predetermined period to allow a dependent spouse to finish a college degree, obtain professional licensure, or re-enter the workforce after years as a stay-at-home parent.
            </li>
            <li>
              <strong>3. Reimbursement Alimony:</strong> Compensates a spouse who worked full-time to financially support the other spouse through medical school, law school, or an executive MBA program.
            </li>
            <li>
              <strong>4. Permanent / Indefinite Alimony:</strong> Reserved almost exclusively for long-term marriages (typically 20+ years) where significant age, health, or disability barriers make economic self-sufficiency impossible. Terminates upon the recipient&rsquo;s remarriage, cohabitation in a marriage-like relationship, or either party&rsquo;s death.
            </li>
          </ul>

          <h2>Federal Tax Reform Changes (Tax Cuts and Jobs Act)</h2>
          <p>
            Under the landmark federal <em>Tax Cuts and Jobs Act (TCJA)</em>, the tax treatment of alimony was permanently reversed:
          </p>
          <ul>
            <li>
              <strong>Divorces Finalized After Dec 31, 2018:</strong> Alimony payments are <strong>not tax-deductible</strong> by the paying spouse, and are <strong>not taxable gross income</strong> for the recipient spouse on federal tax returns.
            </li>
            <li>
              <strong>Pre-2019 Legacy Agreements:</strong> Grandfathered under the old rules: payments remain 100% tax-deductible for the payer on Schedule 1 and fully taxable as ordinary income for the recipient.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Family &amp; Household Financial Solvers</h3>
            <p>
              Managing spousal support obligations requires careful post-divorce cash flow structuring. Calculate statutory parental responsibilities with our <a href="/calculators/finance/child-support-calculator">Child Support Calculator</a>, build a sustainable single-income spending plan using the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>, determine after-tax cash flow via the <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, and evaluate tax brackets using the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What factors do family court judges consider when determining alimony awards?",
          a: "Judges evaluate statutory factors including: duration of the marriage, age and physical/emotional health of each party, standard of living established during the marriage, comparative earning capacities and marketable skills, time needed for education/training, contributions as a homemaker/caregiver, and separate property and liquid assets.",
        },
        {
          q: "What causes court-ordered alimony to automatically terminate?",
          a: "Unless explicitly stated otherwise in a non-modifiable separation agreement, alimony terminates automatically upon: 1) the death of either spouse; 2) the remarriage of the recipient spouse; or 3) continuous romantic cohabitation by the recipient spouse with a partner who provides economic support.",
        },
        {
          q: "Can an alimony obligation be modified if the paying spouse loses their job?",
          a: "Yes, provided the settlement agreement is modifiable. A paying spouse who suffers an involuntary, substantial change in financial circumstances (e.g., corporate layoff, permanent medical disability) can petition the court for a downward modification. However, payments cannot be unilaterally halted without a formal court order.",
        },
        {
          q: "Does a Prenuptial Agreement override statutory alimony guidelines?",
          a: "Yes. Valid prenuptial and postnuptial agreements that waive or specify predetermined spousal support are legally enforceable in family court, provided both parties made full financial disclosures, were represented by independent legal counsel, and the terms are not deemed unconscionable at the time of enforcement.",
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
