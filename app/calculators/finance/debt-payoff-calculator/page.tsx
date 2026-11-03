import Calculator from "@/components/calcs/finance/debt-payoff-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DebtSnowballVsAvalancheChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/debt-payoff-calculator";
const TITLE = "Debt Payoff Calculator";
const DESCRIPTION =
  "Free debt payoff calculator: compare the Debt Snowball vs. Debt Avalanche methods across multiple loans and credit cards. Calculate total interest saved.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Debt Payoff Calculator"
      intro="Model accelerated debt elimination across multiple balances, loans, and credit cards. Compare the mathematical interest savings of the Debt Avalanche against the behavioral momentum of the Debt Snowball."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="C_{\text{target}} = m_{\text{target}} + \sum m_{\text{cleared}} + E_{\text{extra}}"
      article={
        <>
          <h2>Direct Answer: Debt Avalanche vs. Debt Snowball Methodologies</h2>
          <p>
            When managing multiple liabilities—credit cards, auto loans, medical bills, and personal notes—accelerated debt elimination relies on two structured mathematical strategies: the <strong>Debt Avalanche</strong> and the <strong>Debt Snowball</strong>. Both frameworks require maintaining mandatory minimum monthly payments on all accounts to protect credit ratings, while concentrating all surplus monthly cash into a single target debt. Once that target debt balance reaches zero, its entire monthly payment &ldquo;rolls over&rdquo; into the next target.
          </p>
          <p>
            The difference between both frameworks lies in their targeting hierarchy: the <strong>Debt Avalanche</strong> prioritizes the account with the <em>highest interest rate (APR)</em> to minimize cumulative lifetime interest charges, whereas the <strong>Debt Snowball</strong> targets the account with the <em>smallest dollar balance</em> to secure quick psychological wins and build behavioral momentum.
          </p>

          <DebtSnowballVsAvalancheChart />

          <h2>The Mathematical Engine of Payment Stacking &amp; Rollovers</h2>
          <p>
            Let a borrower manage a portfolio of <em>K</em> separate debts, where each liability <em>i</em> possesses an outstanding balance <Formula>{"B_i"}</Formula>, a contract interest rate <Formula>{"r_i"}</Formula>, and a minimum monthly payment requirement <Formula>{"m_i"}</Formula>. The borrower commits a total monthly cash pool <Formula>{"C_{\\text{total}}"}</Formula>:
          </p>

          <Formula>{"C_{\\text{total}} = \\sum_{i=1}^{K} m_i + E"}</Formula>
          <p>
            Where:
            <br />• <strong>m_i</strong> = Contractual minimum monthly payment on account <em>i</em> ($)
            <br />• <strong>E</strong> = Discretionary extra monthly cash allocated to accelerated debt reduction ($)
            <br />• <strong>C_total</strong> = Fixed total monthly debt elimination budget maintained constant until all debts reach $0
          </p>
          <p>
            Each month, every non-target debt receives its contractual minimum payment <Formula>{"m_i"}</Formula>. The designated priority target debt receives the entire remaining budget balance:
          </p>
          <Formula>{"P_{\\text{target}} = m_{\\text{target}} + E + \\sum_{j \\in \\text{Retired}} m_j"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a household managing three debts with a <strong>$400 monthly extra debt budget</strong> (<Formula>{"E = \\$400"}</Formula>):
            <br />• <strong>Debt 1 (Retail Store Card):</strong> Balance = $1,500, APR = 27.00%, Minimum = $50 / mo
            <br />• <strong>Debt 2 (Bank Credit Card):</strong> Balance = $5,000, APR = 21.00%, Minimum = $130 / mo
            <br />• <strong>Debt 3 (Personal Consolidation Note):</strong> Balance = $9,500, APR = 9.50%, Minimum = $220 / mo
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute baseline monthly budget commitment.</strong> Total minimums equal <Formula>{"\\$50 + \\$130 + \\$220 = \\$400"}</Formula>. Adding the extra $400 creates a total fixed monthly cash pool of <Formula>{"C_{\\text{total}} = \\$400 + \\$400 = \\$800.00 \\text{ / month}"}</Formula>.
            </li>
            <li>
              <strong>Step 2: Deploy Phase 1 targeting (Debt 1).</strong> Under both Snowball and Avalanche, Debt 1 is the first target (smallest balance and highest APR). Debt 1 receives <Formula>{"\\$50 + \\$400 = \\$450 / \\text{mo}"}</Formula>, while Debts 2 and 3 receive their minimums ($130 and $220). Debt 1 is eliminated in <strong>3.7 months</strong>.
            </li>
            <li>
              <strong>Step 3: Execute Phase 2 Rollover (Debt 2).</strong> Month 4 liberates Debt 1&rsquo;s $50 payment. That payment rolls over, increasing Debt 2&rsquo;s allocation to:
              <Formula>{"P_2 = \\$130 \\text{ (Minimum)} + \\$450 \\text{ (Rollover Cash)} = \\$580.00 \\text{ / month}"}</Formula>
              Debt 2 is completely wiped out in Month 13.
            </li>
            <li>
              <strong>Step 4: Execute Phase 3 Final Rollover (Debt 3).</strong> Month 14 directs all cash toward Debt 3:
              <Formula>{"P_3 = \\$220 + \\$580 = \\$800.00 \\text{ / month}"}</Formula>
              Debt 3 reaches a zero balance in Month 25.
            </li>
            <li>
              <strong>Step 5: Compare accelerated payoff vs. minimum payments.</strong> Paying only minimums would require <strong>92 billing cycles (7.7 years)</strong> and incur <strong>$7,420 in interest</strong>. The rollover protocol extinguishes all debt in <strong>25 months (2.1 years)</strong> with only <strong>$2,140 in interest</strong>, delivering <strong>$5,280 in net wealth savings</strong>.
            </li>
          </ol>

          <h2>Direct Comparison: Mathematical Avalanche vs. Behavioral Snowball</h2>
          <p>
            Choosing between Avalanche and Snowball depends on whether your household prioritizes pure mathematical interest reduction or behavioral reinforcement:
          </p>

          <DataTable
            head={["Metric / Feature", "Debt Avalanche (Mathematical)", "Debt Snowball (Behavioral)", "Strategic Recommendation"]}
            rows={[
              ["Targeting Hierarchy", "Highest APR % to Lowest APR %", "Smallest Balance ($) to Largest ($)", "Avalanche maximizes dollar savings"],
              ["Interest Paid", "Mathematically minimal lifetime interest", "Slightly higher interest ($300–$1,500+)", "Avalanche wins on total cost"],
              ["Time to First Win", "Can take 6–18 months for large balances", "Often 1–4 months on small cards", "Snowball wins on psychological momentum"],
              ["Drop-Out / Fatigue Risk", "Higher risk if first debt is very large", "Lowest risk due to quick account closures", "Snowball recommended for unmotivated debtors"],
              ["Best Suited For", "Analytical budgeters with steady cash flow", "Debtors needing quick wins to stay focused", "Hybrid: kill smallest card, then switch to APR"],
            ]}
          />

          <h2>Multi-Debt Acceleration Portfolio Benchmark ($25,000 Across 4 Debts)</h2>
          <p>
            The comparative matrix below illustrates four distinct repayment methodologies applied to a $25,000 multi-card debt portfolio with a $350 monthly extra payment:
          </p>

          <DataTable
            head={["Repayment Strategy", "Monthly Cash Commitment", "Debt-Free Horizon", "Total Lifetime Interest", "Net Cash Savings"]}
            rows={[
              ["Minimum Payments Only", "$540 / mo (declining)", "14 Years, 2 Months", "$14,820", "Baseline Trap ($0 saved)"],
              ["Debt Snowball ($350 extra)", "$890 / mo fixed", "2 Years, 8 Months", "$4,410", "+$10,410 Saved"],
              ["Debt Avalanche ($350 extra)", "$890 / mo fixed", "2 Years, 6 Months", "$3,980", "+$10,840 Saved (Max Efficiency)"],
              ["Consolidation Loan (10.5%)", "$812 / mo fixed", "3 Years, 0 Months", "$4,232", "+$10,588 Saved (Single Payment)"],
            ]}
          />

          <h2>Behavioral Psychology: The Harvard Research Behind the Snowball</h2>
          <p>
            While financial purists champion the Debt Avalanche for its mathematical precision, empirical research published by the <em>Harvard Business Review</em> and behavioral economists demonstrates that borrowers utilizing the <strong>Debt Snowball</strong> achieve higher completion rates.
          </p>
          <p>
            This behavioral advantage stems from the <strong>goal gradient effect</strong>: human motivation accelerates as individuals perceive tangible progress toward a finish line. Eradicating a small $800 medical bill or $1,200 department store card within 90 days eliminates monthly billing statements, reduces mental cognitive overload, and provides an immediate emotional win that reinforces sustained budget discipline.
          </p>

          <h2>4 Dangerous Multi-Debt Elimination Pitfalls to Avoid</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Raiding Retirement Accounts (401k / IRA):</strong> Withdrawing qualified retirement funds incurs income taxes, a 10% IRS early withdrawal penalty, and forfeits decades of tax-sheltered compounding wealth.
            </li>
            <li>
              <strong>Closing Paid-Off Credit Cards:</strong> Canceling credit card accounts reduces your total available credit limit and shortens average account history, which can lower your FICO credit score by 20 to 50 points.
            </li>
            <li>
              <strong>Neglecting a Starter Emergency Cushion:</strong> Channeling 100% of cash into debt without maintaining a $1,000 to $2,000 liquid buffer forces households back into credit card borrowing when minor car repairs occur.
            </li>
            <li>
              <strong>Consolidating Without Budgetary Reform:</strong> Securing a debt consolidation loan without addressing underlying overspending often results in maxing out newly cleared credit cards alongside the loan.
            </li>
          </ol>

          <h2>Essential Debt Payoff Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Payment Rollover:</strong> The technique of reallocating cash from a paid-off account directly into the next priority target debt without altering overall monthly spending.</li>
            <li><strong>Debt-to-Income (DTI) Ratio:</strong> Total recurring monthly debt obligations divided by gross monthly income, evaluated by mortgage lenders for creditworthiness.</li>
            <li><strong>Hybrid Payoff Strategy:</strong> Eliminating 1 or 2 small accounts first using the Debt Snowball for emotional traction, then transitioning remaining debts to the Avalanche for mathematical savings.</li>
            <li><strong>Negative Amortization:</strong> A situation where monthly loan payments are insufficient to cover accrued interest, causing the outstanding balance to increase over time.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Debt Elimination &amp; Budget Solvers</h3>
            <p>
              Analyze single credit card payoffs with the <a href="/calculators/finance/credit-card-payoff-calculator">Credit Card Payoff Calculator</a>, evaluate personal consolidation notes with the <a href="/calculators/finance/loan-calculator">Loan Calculator</a>, establish emergency liquidity via the <a href="/calculators/finance/emergency-fund-calculator">Emergency Fund Calculator</a>, and organize net cash flow using the <a href="/calculators/finance/budget-calculator">Budget Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Which method is better: Debt Snowball or Debt Avalanche?",
          a: "The Debt Avalanche is mathematically optimal because targeting the highest APR first minimizes cumulative interest expenses. However, the Debt Snowball offers superior behavioral adherence because closing small balances rapidly provides psychological momentum that prevents program abandonment.",
        },
        {
          q: "What should I do if a creditor offers a debt settlement discount?",
          a: "Debt settlement requires allowing accounts to become delinquent, which severely damages your credit score and generates taxable cancellation-of-debt income on IRS Form 1099-C. For solvent borrowers, structured acceleration (Snowball or Avalanche) is far safer.",
        },
        {
          q: "Should I build an emergency fund while paying off high-interest debt?",
          a: "Yes. Maintaining a starter emergency buffer of $1,000 to one month of basic living expenses is essential. Without a liquid cash cushion, unexpected car repairs or medical bills will force you to rely on credit cards, derailing your debt payoff.",
        },
        {
          q: "Can I switch from the Debt Snowball to the Debt Avalanche halfway through?",
          a: "Yes. Many successful borrowers use a Hybrid strategy: eliminate the two smallest balance accounts first to gain momentum and simplify bill payments, then switch all remaining balances to the Avalanche to maximize long-term interest savings.",
        },
        {
          q: "How does debt acceleration affect my FICO credit score?",
          a: "As revolving credit card balances decrease, your credit utilization ratio drops dramatically. Lowering overall utilization below 30%—and ultimately below 10%—typically boosts FICO scores by 40 to 80 points within a few months.",
        },
        {
          q: "Should I pay off a low-interest auto loan early or invest in the stock market?",
          a: "If your auto loan APR is below 5%, investing surplus funds in a broad index fund or high-yield savings account typically yields a higher expected return. If your loan rate exceeds 7%, early payoff provides a guaranteed, risk-free return.",
        },
        {
          q: "Does making bi-weekly payments accelerate multi-debt elimination?",
          a: "Yes. Making half-payments every two weeks results in 26 half-payments per year (equal to 13 full monthly payments). That extra full payment applied directly to your priority target account compresses payoff timelines by several months.",
        },
        {
          q: "What happens to my payment rollover when a debt is cleared?",
          a: "When an account balance reaches zero, its entire monthly payment does not become disposable income. Instead, you immediately roll that exact cash amount into the payment for your next target account, keeping your total monthly commitment identical.",
        },
      ]}
      related={[
        { href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", name: "Credit Card Payoff" },
        { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Personal Loan" },
        { href: "/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
        { href: "/calculators/finance/budget-calculator", icon: "📋", name: "Budget Calculator" },
        { href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", name: "Emergency Fund" },
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}