import Calculator from "@/components/calcs/finance/tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";
import { BRACKETS, STANDARD_DEDUCTION, TAX_YEAR } from "@/lib/tax";

const PATH = "/calculators/finance/tax-calculator";
const DESCRIPTION = `Free ${TAX_YEAR} federal income tax calculator: estimate your tax, effective and marginal rate, and refund or balance due using the latest IRS brackets and standard deductions.`;

export const metadata = calcMetadata(PATH, `Income Tax Calculator ${TAX_YEAR} – Federal Tax, Brackets & Refund | CalcDigi`, DESCRIPTION);

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
      intro={`Estimate your ${TAX_YEAR} federal income tax, see how much falls in each bracket, and check whether you're likely to get a refund.`}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How federal income tax is calculated</h2>
          <ol>
            <li>
              <strong>Gross income</strong> minus pre-tax contributions and adjustments gives your adjusted gross income (AGI).
            </li>
            <li>
              Subtract the <strong>standard deduction</strong> or your itemized deductions, whichever is larger, to get{" "}
              <strong>taxable income</strong>.
            </li>
            <li>Apply the tax brackets to taxable income, then subtract any tax credits.</li>
          </ol>
          <h2>{TAX_YEAR} standard deduction</h2>
          <DataTable
            head={["Filing status", "Standard deduction"]}
            rows={[
              ["Single / Married filing separately", fmt(STANDARD_DEDUCTION.single)],
              ["Married filing jointly", fmt(STANDARD_DEDUCTION.mfj)],
              ["Head of household", fmt(STANDARD_DEDUCTION.hoh)],
            ]}
          />
          <h2>{TAX_YEAR} federal tax brackets</h2>
          <DataTable head={["Rate", "Single", "Married filing jointly", "Head of household"]} rows={single.map((s, i) => [s.split(":")[0], s.split(": ")[1], mfj[i].split(": ")[1], hoh[i].split(": ")[1]])} />
          <p>
            Brackets are <strong>marginal</strong>: each rate applies only to the income inside that band. Moving into a
            higher bracket never makes your total tax go down — only the extra dollars are taxed at the higher rate.
          </p>
          <h3>Example</h3>
          <p>
            A single filer earning $75,000 with no other deductions has $58,900 of taxable income after the{" "}
            {fmt(STANDARD_DEDUCTION.single)} standard deduction. Tax is 10% on the first $12,400 ($1,240), 12% on the next
            $38,000 ($4,560) and 22% on the last $8,500 ($1,870) — <strong>$7,670</strong> in total, an effective rate of
            about 10.2%.
          </p>
          <h2>Effective vs. marginal rate</h2>
          <p>
            Your <strong>marginal rate</strong> is the rate on your next dollar of income — useful for judging a raise or a
            401(k) contribution. Your <strong>effective rate</strong> is total tax divided by income, which is always lower.
          </p>
        </>
      }
      faq={[
        {
          q: "Should I itemize or take the standard deduction?",
          a: "Itemize only if your deductible expenses — mortgage interest, state and local taxes (up to the SALT cap), and charitable gifts — add up to more than your standard deduction. Most households take the standard deduction.",
        },
        {
          q: "Why is my refund different from this estimate?",
          a: "Refunds depend on how much was withheld from your paychecks, credits you qualify for, and income or deductions not entered here. Enter your year-to-date withholding to compare.",
        },
        {
          q: "Does this include state tax?",
          a: "No. It estimates federal income tax only. Nine states have no wage income tax; others range from flat rates around 3–5% to progressive rates above 10%.",
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
