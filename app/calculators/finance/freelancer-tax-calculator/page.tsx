import Calculator from "@/components/calcs/finance/freelancer-tax-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { Formula } from "@/components/flagship/shell";
import { SS_WAGE_BASE, TAX_YEAR } from "@/lib/tax";

const PATH = "/calculators/finance/freelancer-tax-calculator";
const DESCRIPTION = `Free ${TAX_YEAR} self-employment tax calculator for freelancers and 1099 contractors: estimate SE tax, federal and state income tax, and your quarterly estimated payments.`;

export const metadata = calcMetadata(PATH, `Freelancer Tax Calculator ${TAX_YEAR} – Quarterly Tax | CalcDigi`, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Freelancer Tax Calculator"
      intro="Estimate the taxes on your freelance or 1099 income — self-employment tax plus federal and state income tax — and how much to pay each quarter."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Self-employment tax</h2>
          <p>
            Employees split Social Security and Medicare with their employer. When you&rsquo;re self-employed you pay both
            halves — <strong>15.3%</strong> — on 92.35% of your net profit:
          </p>
          <Formula>SE tax = Net profit × 92.35% × 15.3%</Formula>
          <p>
            The 12.4% Social Security part stops at the ${SS_WAGE_BASE.toLocaleString()} wage base for {TAX_YEAR}; the 2.9%
            Medicare part has no cap. You can deduct half of SE tax when calculating income tax.
          </p>
          <h2>Income tax and the QBI deduction</h2>
          <p>
            Your net profit, minus half of SE tax, retirement contributions and self-employed health insurance, is taxed at
            normal federal rates. Many freelancers also qualify for the 20% qualified business income (QBI) deduction, which
            this calculator applies in simplified form.
          </p>
          <h3>Example</h3>
          <p>
            $80,000 of revenue with $10,000 of expenses leaves $70,000 of profit. SE tax is about $9,891, federal income tax
            about $4,452 after the QBI and standard deductions, and a 5% state tax about $3,253 — roughly{" "}
            <strong>$17,600 in total</strong>, or $4,400 per quarter.
          </p>
          <h2>Quarterly estimated taxes</h2>
          <p>
            No one withholds tax from freelance income, so the IRS expects payments four times a year (Form 1040-ES): April 15,
            June 15, September 15 and January 15. To avoid an underpayment penalty, pay at least 90% of this year&rsquo;s tax
            or 100% of last year&rsquo;s (110% if your AGI was over $150,000).
          </p>
          <h2>Ways to lower your tax</h2>
          <ul>
            <li>Track every business expense: software, equipment, a home office, mileage, and professional fees.</li>
            <li>Contribute to a SEP-IRA or Solo 401(k) — contributions reduce income tax.</li>
            <li>Deduct self-employed health insurance premiums.</li>
          </ul>
        
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Self-Employment & Income Tools</h3>
            <p>
              Navigating 1099 self-employment taxes requires budgeting for federal income and 15.3% SE tax. Calculate exact net after-tax income using our <a href="/calculators/finance/take-home-pay-calculator">Take Home Pay Calculator</a>, evaluate federal tax brackets with the <a href="/calculators/finance/tax-calculator">Tax Calculator</a>, track business operating margins via the <a href="/calculators/finance/business-profit-calculator">Business Profit Calculator</a>, and explore pre-tax Solo 401(k) deductions using our <a href="/calculators/finance/401k-calculator">401k Calculator</a>.
            </p>
          </div>
          </>
      }
      faq={[
        {
          q: "How much should I set aside for taxes as a freelancer?",
          a: "Many freelancers set aside 25–30% of net income. The calculator shows your personal percentage based on your income, deductions and state.",
        },
        {
          q: "Do I pay self-employment tax if I also have a W-2 job?",
          a: "Yes, on your freelance profit. But your W-2 wages count toward the Social Security wage base, so if your combined earnings exceed it, the 12.4% portion stops sooner.",
        },
        {
          q: "When do I have to file?",
          a: "You must file if your net self-employment earnings are $400 or more, even if you owe no income tax.",
        },
      ]}
      related={[
        { href: "/calculators/finance/tax-calculator", icon: "🧾", name: "Income Tax" },
        { href: "/calculators/business/freelance-rate-calculator", icon: "🧑‍💻", name: "Freelance Rate" },
        { href: "/calculators/finance/take-home-pay-calculator", icon: "💵", name: "Take-Home Pay" },
        { href: "/calculators/finance/business-profit-calculator", icon: "📊", name: "Business Profit" },
        { href: "/calculators/business/invoice-calculator", icon: "📄", name: "Invoice" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
