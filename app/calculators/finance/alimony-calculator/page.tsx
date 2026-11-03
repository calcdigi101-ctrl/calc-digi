import Calculator from "@/components/calcs/finance/alimony-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlimonyDurationBenchmarkChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/alimony-calculator";
const TITLE = "Alimony Calculator";
const DESCRIPTION =
  "Free alimony calculator: calculate spousal support maintenance awards, statutory duration benchmarks, income differential caps, and post-2019 TCJA federal.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Alimony Calculator"
      intro="Estimate spousal support maintenance awards and payment durations. Model state guideline formulas (AAMS, California, Texas), income differential caps, and post-2019 TCJA non-deductibility rules."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Alimony} = \min\left[ (I_1 \times 0.33) - (I_2 \times 0.50), \; 0.40(I_1 + I_2) - I_2 \right] \quad \mid \quad \text{Duration} = Y \times f(Y)"
      article={
        <>
          <h2>Direct Answer: How Is Spousal Support (Alimony) Calculated in Family Law?</h2>
          <p>
            <strong>Spousal support (also legally termed alimony or spousal maintenance)</strong> is court-ordered financial assistance paid by a higher-earning spouse to a lower-earning or non-earning spouse during legal separation or following final divorce. Its legal objective is to mitigate the unfair economic effects of divorce by allowing the supported spouse to maintain an approximation of the marital standard of living while pursuing economic self-sufficiency.
          </p>
          <p>
            While family law judges retain broad judicial discretion, most jurisdictions utilize <strong>benchmark guideline formulas</strong> (such as the American Academy of Matrimonial Lawyers &ldquo;AAMS&rdquo; standard or state-specific codes like California Family Code &sect; 4320). Furthermore, under the <strong>2017 Tax Cuts and Jobs Act (TCJA)</strong>, for all divorce agreements executed after December 31, 2018, <strong>alimony is 100% non-deductible for the payer and 100% tax-free for the recipient</strong>.
          </p>

          <AlimonyDurationBenchmarkChart />

          <h2>Actuarial Mathematics: Guideline Support Formulas, Caps &amp; Duration Tiers</h2>
          <p>
            The prominent <strong>AAML (American Academy of Matrimonial Lawyers) Guideline Formula</strong> calculates monthly spousal maintenance as:
          </p>

          <Formula>{"\text{Preliminary Alimony} = (I_{\text{higher}} \times 0.30) - (I_{\text{lower}} \times 0.20)"}</Formula>
          <p>
            Many statutory state guidelines (including New York and Illinois maintenance statutes) utilize a slightly modified formula:
          </p>
          <Formula>{"\text{State Guideline Support} = (I_{\text{higher}} \times 0.333) - (I_{\text{lower}} \times 0.50)"}</Formula>
          <p>
            Where I_higher and I_lower represent respective gross monthly realized incomes.
          </p>
          <p>
            <strong>The 40% Income Equalization Statutory Cap:</strong> To prevent the supported spouse from ending up with more income than the payer, total support is legally capped so that the recipient&rsquo;s combined income plus alimony does not exceed 40% of total marital income:
          </p>
          <Formula>{"\text{Alimony} + I_{\text{lower}} \le 0.40 \times (I_{\text{higher}} + I_{\text{lower}})"}</Formula>
          <Formula>{"\text{Maximum Permissible Alimony} = \left[ 0.40 \times (I_{\text{higher}} + I_{\text{lower}}) \right] - I_{\text{lower}}"}</Formula>
          <p>
            <strong>Support Duration Benchmarks:</strong> Payment length is governed by the length of the marriage:
          </p>
          <Formula>{"\text{Support Duration (Years)} = \text{Marriage Length (Years)} \times D_{\text{tier factor}}"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a divorce following a <strong>12-year marriage</strong> where the <strong>Husband earns $12,000/month gross ($144,000/yr)</strong> and the <strong>Wife earns $4,000/month gross ($48,000/yr)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Step 1: Compute Preliminary Monthly Alimony Award.</strong>
              <br />Using standard guideline: (33.3% of $12,000) &minus; (50% of $4,000).
              <br />33.33% of $12,000 = $4,000.00.
              <br />50% of $4,000 = $2,000.00.
              <br />Preliminary Alimony = $4,000.00 &minus; $2,000.00 = <strong>$2,000.00 / month</strong>.
            </li>
            <li>
              <strong>Step 2: Verify Statutory 40% Equalization Cap.</strong>
              <br />Combined Monthly Income = $12,000 + $4,000 = $16,000/month.
              <br />40% Marital Income Cap = $16,000 &times; 0.40 = $6,400.00.
              <br />Wife&rsquo;s Income with Alimony = $4,000 own income + $2,000 support = $6,000.00.
              <br /><em>Since $6,000 &le; $6,400, the preliminary award is fully within statutory limits. Award = <strong>$2,000.00 / month</strong>.</em>
            </li>
            <li>
              <strong>Step 3: Determine Statutory Support Duration.</strong>
              <br />For marriages between 10 and 15 years, guideline duration factor = <strong>60% of marriage length</strong>.
              <br />Duration = 12 years &times; 0.60 = <strong>7.2 years (86.4 months)</strong>.
            </li>
            <li>
              <strong>Step 4: Analyze Post-2019 TCJA Tax Implications.</strong>
              <br />Husband cannot deduct the $2,000/month on federal taxes (pays support in post-tax dollars).
              <br />Wife receives the $2,000/month 100% tax-free (effectively worth ~$2,600 pre-tax equivalent).
            </li>
          </ol>

          <h2>Marriage Length vs. Alimony Duration Benchmark Matrix</h2>
          <p>
            How marriage duration dictates the expected term of court-ordered spousal maintenance across statutory tiers:
          </p>

          <DataTable
            head={["Marriage Length Tier", "Typical Duration Multiplier", "Expected Support Term", "Alimony Classification", "Primary Legal Objective"]}
            rows={[
              ["Under 5 Years (Short-Term)", "20% – 30% of length", "1 – 1.5 Years", "Rehabilitative / Transitional", "Short bridge to re-establish single-earner independence."],
              ["5 – 9 Years (Moderate Term)", "30% – 50% of length", "2 – 4.5 Years", "Durational Maintenance", "Allows supported spouse to complete education or training."],
              ["10 – 19 Years (Long-Term)", "50% – 70% of length", "5 – 13 Years", "Long-Term Durational", "Compensates for long-term career sacrifice and caretaking."],
              ["20+ Years (Late-Stage Marriage)", "Indefinite / Permanent", "Until Retirement / Death / Remarriage", "Permanent Maintenance", "Full marital standard of living equalization until death/remarriage."]
            ]}
          />

          <h2>The 2017 TCJA Tax Paradigm Shift: Pre-2019 vs. Post-2019 Rules</h2>
          <p>
            The Tax Cuts and Jobs Act revolutionized the tax economics of spousal maintenance:
          </p>

          <DataTable
            head={["Tax Parameter", "Pre-2019 Divorce Decrees (Old Rule)", "Post-2019 Divorce Decrees (Current TCJA Rule)", "Economic Net Impact"]}
            rows={[
              ["Tax Deduction for Payer", "100% Above-the-line tax deduction", "Zero tax deduction (0% write-off)", "Increases real after-tax cost of support by 22% – 37%."],
              ["Tax Liability for Recipient", "Taxable as ordinary gross income", "100% Tax-Free distribution", "Increases real purchasing power of the cash received."],
              ["Divorce Settlement Leverage", "Favored higher alimony awards due to tax arbitrage", "Discourages large alimony awards; shifts focus to asset division", "Family settlement dollars shrink because IRS collects more tax."]
            ]}
          />

          
          <h2>Lump-Sum Alimony Buyouts &amp; Present Value Actuarial Discounting</h2>
          <p>
            In many marital settlement agreements, parties negotiate a <strong>one-time lump-sum alimony buyout</strong> rather than executing monthly transfers over several years. Calculating an equitable cash buyout requires discounting future monthly payments back to present cash value:
          </p>
          <Formula>{"\text{Lump-Sum Present Value } (PV) = \sum_{t=1}^{n} \frac{\text{Monthly Alimony}}{(1 + r_{\text{discount}})^t}"}</Formula>
          <p>
            Discount rates typically mirror safe Treasury yields or municipal bond rates (4.0%&ndash;5.5%). A lump-sum buyout provides immediate financial finality, eliminates future default or non-payment risk, and allows the paying spouse to avoid ongoing balance sheet encumbrances.
          </p>
<h2>Essential Alimony &amp; Family Law Terminology</h2>
          <p>
            Core concepts governing legal divorce and spousal support proceedings:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Pendente Lite:</strong> Temporary spousal support ordered while divorce litigation is actively pending to maintain financial status quo until trial.</li>
            <li><strong>Rehabilitative Alimony:</strong> Short-term maintenance designed specifically to fund vocational retraining or higher education to regain self-sufficiency.</li>
            <li><strong>Durational Support:</strong> Maintenance granted for a set number of years, common in moderate marriages where permanent support is unwarranted.</li>
            <li><strong>Cohabitation Clause:</strong> Statutory rule automatically terminating or reducing alimony if the supported spouse resides continuously with a new romantic partner in a marriage-like relationship.</li>
            <li><strong>Imputed Earning Capacity:</strong> Court determination assigning income to a voluntary non-earning spouse based on vocational evaluations.</li>
          </ul>

          <h3>Related Divorce, Legal &amp; Balance Sheet Solvers</h3>
          <p>
            Audit all financial dimensions of marital dissolution: model parental child support with our <a href="/calculators/finance/child-support-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Child Support Calculator</a>, evaluate post-separation net income using the <a href="/calculators/finance/take-home-pay-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Take-Home Pay Calculator</a>, inventory divided assets via the <a href="/calculators/finance/net-worth-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Net Worth Calculator</a>, and model retirement split assets using our <a href="/calculators/finance/retirement-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Retirement Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the 10-year rule in marriage and how does it affect alimony?",
          a: "In many states (such as California and Texas), a marriage lasting 10 or more years is legally classified as a marriage of long duration. This threshold grants judges statutory authority to order durational or indefinite spousal support rather than capping payments to half the length of the marriage."
        },
        {
          q: "Are alimony payments tax-deductible for the payer under current IRS rules?",
          a: "No. For all divorce agreements finalized on or after January 1, 2019, the Tax Cuts and Jobs Act (TCJA) eliminated the alimony tax deduction for payers. Spousal support is paid using post-tax dollars, and the recipient receives the payments 100% tax-free."
        },
        {
          q: "What happens to alimony payments if the recipient remarries or cohabitates?",
          a: "In almost all US jurisdictions, statutory spousal support automatically terminates upon the legal remarriage of the recipient. Furthermore, if the recipient continuously cohabitates with a new romantic partner in a mutually supportive economic relationship, payers can petition the court to reduce or terminate alimony."
        },
        {
          q: "What is the difference between temporary and permanent alimony?",
          a: "Temporary alimony (pendente lite) is paid only while the divorce proceedings are actively pending to cover immediate living expenses. Permanent or durational alimony is awarded in the final divorce decree and continues for a specific number of years or until death, remarriage, or retirement."
        },
        {
          q: "How does the court determine alimony if one spouse was a stay-at-home parent?",
          a: "Courts evaluate the non-financial marital contributions of stay-at-home parents (childcare, homemaking, career sacrifices). When setting support, judges consider the time and educational expenses required for that spouse to acquire skills and re-enter the workforce, frequently awarding rehabilitative maintenance."
        },
        {
          q: "Can spousal support be modified if the paying spouse loses their job?",
          a: "Yes, provided the alimony was not designated as legally non-modifiable in the divorce decree. An involuntary layoff, severe business downturn, or medical disability represents a 'substantial change in circumstances,' enabling the payer to petition the court for a temporary reduction."
        },
        {
          q: "What is the 40% income cap in spousal maintenance formulas?",
          a: "Most statutory formulas mandate that alimony cannot result in the recipient receiving more than 40% of the combined total gross marital income. This prevents mathematical anomalies where spousal support would leave the recipient wealthier than the paying spouse."
        },
        {
          q: "Can a prenuptial agreement waive or limit spousal support?",
          a: "Yes. Valid prenuptial and postnuptial agreements can specify alimony amounts, durations, or waive spousal support entirely. However, family courts retain authority to invalidate support waivers if enforcing them would render one spouse impoverished and eligible for public assistance."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
