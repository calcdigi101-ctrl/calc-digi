import Calculator from "@/components/calcs/finance/tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BRACKETS, STANDARD_DEDUCTION, TAX_YEAR } from "@/lib/tax";
import { FederalTaxBracketProgressiveCurveChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/tax-calculator";
const DESCRIPTION = `Free ${TAX_YEAR} federal income tax calculator: estimate your tax, effective and marginal rate, and refund or balance due using the latest IRS brackets and standard deductions.`;

export const metadata = calcMetadata(PATH, `Income Tax Calculator ${TAX_YEAR} – Federal Tax & Refund | CalcDigi`, DESCRIPTION);

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
const rows = (s: "single" | "mfj" | "hoh") =>
  BRACKETS[s].map(([limit, rate], i, arr) => {
    const from = i === 0 ? 0 : arr[i - 1][0] + 1;
    return `${Math.round(rate * 100)}%: ${fmt(from)}${limit === Infinity ? "+" : ` – ${fmt(limit)}`}`;
  });

export default function Page() {
  const single = rows("single");
  const mfj = rows("mfj");
  const hoh = rows("hoh");
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Income Tax Calculator"
      intro={`Estimate your ${TAX_YEAR} federal income tax liability, marginal vs. effective tax rates, and projected tax refund or payment due under the latest statutory IRS tax brackets.`}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="TaxLiability = Sum(BracketRate_i * TaxableIncomeInBracket_i) - Credits"
      article={
        <>
          <h2>Direct Answer: How Does the US Progressive Federal Income Tax System Work?</h2>
          <p>
            The United States operates a <strong>graduated progressive federal income tax structure</strong> under the Internal Revenue Code. Taxable income is segmented into sequential mathematical tiers called <strong>marginal brackets</strong> (10%, 12%, 22%, 24%, 32%, 35%, and 37%). Income falling within each lower tier is taxed strictly at that tier&rsquo;s statutory rate; only dollars that exceed the bracket threshold are assessed at the higher percentage. Therefore, earning additional income and entering a higher bracket <strong>never reduces your total net take-home earnings</strong>.
          </p>

          <Formula>Taxable Income = Gross Income − Above-the-Line Adjustments − Standard/Itemized Deduction</Formula>
          <Formula>Effective Tax Rate = (Total Federal Tax Liability ÷ Total Gross Income) × 100</Formula>

          <FederalTaxBracketProgressiveCurveChart />

          <h2>Statutory {TAX_YEAR} Standard Deductions by Filing Status</h2>
          <p>
            Taxpayers may choose between claiming itemized deductions (Schedule A) or the IRS standard deduction, which reduces gross taxable income on a dollar-for-dollar basis:
          </p>

          <DataTable
            head={["Filing Status", `${TAX_YEAR} Standard Deduction`, "Age 65+ / Blind Additional Addition"]}
            rows={[
              ["Single / Married Filing Separately", fmt(STANDARD_DEDUCTION.single), "+$1,950 / qualifying condition"],
              ["Married Filing Jointly / Qualifying Surviving Spouse", fmt(STANDARD_DEDUCTION.mfj), "+$1,550 per qualifying spouse"],
              ["Head of Household (Unmarried with Dependent)", fmt(STANDARD_DEDUCTION.hoh), "+$1,950 / qualifying condition"],
            ]}
          />

          <h2>{TAX_YEAR} Federal Income Tax Bracket Thresholds</h2>
          <DataTable
            head={["Marginal Rate", "Single Filer", "Married Filing Jointly", "Head of Household"]}
            rows={single.map((s, i) => [s.split(":")[0], s.split(": ")[1], mfj[i].split(": ")[1], hoh[i].split(": ")[1]])}
          />

          <h2>Tax Deductions vs. Tax Credits: The Key Distinction</h2>
          <ul>
            <li>
              <strong>Tax Deductions:</strong> Reduce your <em>taxable income</em> before rates are applied. A $1,000 deduction saves you $220 in cash if you are in the 22% marginal tax bracket.
            </li>
            <li>
              <strong>Tax Credits:</strong> Reduce your <em>tax liability dollar-for-dollar</em> directly off the bottom line. A $1,000 tax credit (such as the Child Tax Credit or EV Credit) saves you a full $1,000 in cash regardless of your marginal tax bracket.
            </li>
            <li>
              <strong>Refundable vs. Non-Refundable Credits:</strong> Non-refundable credits can only reduce your tax bill to $0. Refundable credits (such as the Earned Income Tax Credit) send you the excess amount as a cash refund check even if your tax liability is zero.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Income Tax &amp; Paycheck Solvers</h3>
            <p>
              Understanding your federal marginal and effective tax rates allows strategic tax-advantaged planning. Calculate net paycheck earnings after withholdings with our <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, convert annual and hourly compensation using the <a href="/calculators/finance/salary-calculator">Salary Calculator</a>, calculate self-employment obligations via the <a href="/calculators/finance/freelancer-tax-calculator">Freelancer Tax Calculator</a>, and reduce taxable income using pre-tax contributions in our <a href="/calculators/finance/401k-calculator">401k Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between marginal tax rate and effective tax rate?",
          a: "Your marginal tax rate is the highest bracket applied to your last dollar of income. Your effective tax rate is your total actual tax paid divided by your total income—which is always significantly lower because of lower introductory brackets and the standard deduction.",
        },
        {
          q: "Does getting a raise ever result in less take-home pay due to tax brackets?",
          a: "No. This is a common misconception. In a progressive tax system, entering a higher bracket only causes the dollars above the threshold to be taxed at the higher rate. Every single dollar below the threshold is still taxed at the lower previous rates.",
        },
        {
          q: "When should I itemize deductions instead of taking the standard deduction?",
          a: "You should only itemize on Schedule A if the sum of your qualified deductible expenses—including state and local taxes (SALT capped at $10,000), mortgage interest, charitable donations, and unreimbursed medical expenses exceeding 7.5% of AGI—exceeds your statutory standard deduction.",
        },
        {
          q: "Why do some people receive large tax refunds while others owe taxes?",
          a: "A tax refund represents an interest-free loan you gave to the federal government by over-withholding on your Form W-4 throughout the calendar year. Owing a small amount or breaking even at tax time means your withholding was accurately calibrated.",
        },
      ]}
      related={[
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/salary-calculator", icon: "💼", name: "Salary" },
        { href: "/calculators/finance/freelancer-tax-calculator", icon: "🧑‍💻", name: "Freelancer Tax" },
        { href: "/calculators/finance/401k-calculator", icon: "🏦", name: "401(k)" },
        { href: "/calculators/finance/sales-tax-calculator", icon: "🧾", name: "Sales Tax" },
        { href: "/calculators/finance/hourly-to-salary-calculator", icon: "⏱️", name: "Hourly to Salary" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
