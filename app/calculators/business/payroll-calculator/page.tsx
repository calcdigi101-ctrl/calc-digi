import type { Metadata } from "next";
import Link from "next/link";
import PayrollCalculatorComponent from "@/components/calcs/business/payroll-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PayrollTaxDeductionSplitChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/payroll-calculator";
const TITLE = "Payroll Calculator | Net Pay, Federal Withholding & FICA Taxes";
const DESCRIPTION =
  "Calculate employee net pay, employer payroll tax liabilities, federal and state income tax withholding, Social Security, Medicare, and pre-tax deductions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/business/employee-cost-calculator", icon: "👥", name: "Employee Cost" },
  { href: "/calculators/business/freelance-rate-calculator", icon: "💼", name: "Freelance Rate" },
  { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Burn Rate" },
  { href: "/calculators/business/business-loan-calculator", icon: "🏦", name: "Business Loans" },
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS Solver" },
  { href: "/calculators/business/sales-tax-calculator", icon: "🏛️", name: "Sales Tax" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between employee payroll withholdings and employer payroll taxes?",
    a: "Employee withholdings are deducted directly from the worker's gross earnings and remitted to tax authorities on their behalf (federal income tax, state income tax, and the employee half of FICA). Employer payroll taxes are separate mandatory expenses paid directly out of company funds (the employer matching half of FICA, plus federal and state unemployment taxes).",
  },
  {
    q: "What are the exact statutory rates for FICA taxes under federal law?",
    a: "Under the Federal Insurance Contributions Act (FICA), the total tax rate is 15.30%, split evenly between employee and employer (7.65% each). Social Security comprises 6.2% on wages up to the annual statutory wage cap, while Medicare comprises 1.45% on all earnings without any cap. High earners are also subject to an Additional Medicare Tax of 0.9% paid solely by the employee.",
  },
  {
    q: "How do pre-tax deductions reduce both employee and employer tax obligations?",
    a: "Section 125 cafeteria plans (health insurance premiums, HSA, FSA) and traditional 401(k) retirement contributions are deducted before income taxes are calculated. Section 125 deductions also bypass FICA taxes, directly saving the employer 7.65% in matching payroll tax liabilities.",
  },
  {
    q: "What is the difference between FUTA and SUTA unemployment taxes?",
    a: "FUTA (Federal Unemployment Tax Act) carries a standard net effective rate of 0.6% on the first $7,000 of employee wages for employers receiving full state credit. SUTA (State Unemployment Tax Act) rates vary widely by state and an employer's individual experience rating, typically taxing between 1.5% and 8.0% of wages up to state-specific taxable wage bases.",
  },
  {
    q: "What legal risks arise from misclassifying W-2 employees as 1099 independent contractors?",
    a: "Worker misclassification violates IRS Common Law Rules and Department of Labor guidelines. Penalties include retroactive assessment of all unwithheld FICA and income taxes, substantial failure-to-file penalties, interest charges, and statutory wage penalties under the Fair Labor Standards Act (FLSA).",
  },
  {
    q: "How does periodic payroll liability affect small business cash reserves?",
    a: "Payroll is an unforgiving fixed cash drain. Failing to remit federal payroll tax trust funds exposes business owners to the IRS Trust Fund Recovery Penalty, where owners become personally liable for corporate tax debts.",
  },
];

export default function PayrollCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Corporate Payroll & Tax Withholding Calculator"
      intro="Compute employee net take-home pay, federal and state tax withholding, FICA contributions, Section 125 pre-tax deductions, and total employer payroll burden."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Corporate Payroll is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              To calculate employee net pay, subtract pre-tax deductions (health insurance, 401k), employee FICA taxes (6.2% Social Security + 1.45% Medicare), and federal/state income tax withholdings from gross salary: Net Pay = Gross Pay - Pre-Tax Deductions - FICA - Income Tax - Post-Tax Deductions. Concurrently, employers fund matching FICA (7.65%) and unemployment taxes (FUTA/SUTA). Model fully burdened staffing overhead with the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link> and track burn velocity via the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: Employee Net Pay vs Statutory Deductions & Employer Burden</h2>
          <p>
            The chart below visualizes the distribution of gross salary into employee net cash, statutory employee withholdings, and mandatory employer payroll tax contributions.
          </p>

          <PayrollTaxDeductionSplitChart />

          <h2>First-Principles Payroll Formulations & Statutory Tax Mechanics</h2>
          <p>
            Payroll accounting governs two distinct balance sheets: the employee withholding remittance and the employer statutory tax liability. Under Internal Revenue Code (IRC) Section 3402, taxable wages for federal withholding evaluate to:
          </p>
          <Formula>
            {"\\text{Taxable Wages (Income)} = \\text{Gross Wages} - \\text{Section 125 Pre-Tax} - \\text{Traditional 401(k)}"}
          </Formula>
          <p>
            For Federal Insurance Contributions Act (FICA) taxes, 401(k) contributions remain taxable, whereas qualified Section 125 cafeteria benefits are fully exempt:
          </p>
          <Formula>
            {"\\text{FICA Wages} = \\text{Gross Wages} - \\text{Section 125 Pre-Tax}"}
          </Formula>
          <Formula>
            {"\\text{Employee FICA} = (\\text{FICA Wages} \\times 0.062) + (\\text{FICA Wages} \\times 0.0145)"}
          </Formula>
          <p>
            The resulting net take-home pay delivered to the employee&apos;s bank account on pay date is:
          </p>
          <Formula>
            {"\\text{Net Take-Home Pay} = \\text{Gross Pay} - \\text{Pre-Tax Deductions} - \\text{Employee FICA} - \\text{FIT Withholding} - \\text{SIT Withholding}"}
          </Formula>
          <p>
            Concurrently, the employer must disburse mandatory matching taxes from corporate operational capital:
          </p>
          <Formula>
            {"\\text{Total Employer Outlay} = \\text{Gross Pay} + \\text{Employer FICA (7.65\\%)} + \\text{FUTA (0.6\\%)} + \\text{SUTA (Rate\\%)}"}
          </Formula>
          <p>
            Operating executives evaluate staffing capacity by calibrating project rates with the <Link href="/calculators/business/freelance-rate-calculator">freelance rate calculator</Link>, assessing commercial debt coverage via the <Link href="/calculators/business/business-loan-calculator">business loan calculator</Link>, and balancing corporate profit margins in the <Link href="/calculators/business/profit-margin-calculator">profit margin solver</Link>.
          </p>

          <h2>Standard Payroll Tax Deductions & Statutory Contribution Limits</h2>
          <p>
            The table below summarizes standard federal and state payroll tax tiers, statutory employer matching rules, wage base limits, and administrative remittance schedules.
          </p>

          <DataTable
            head={["Payroll Tax Category", "Statutory Tax Rate", "Paid By", "Wage Base Cap", "Statutory Purpose"]}
            rows={[
              ["Social Security (OASDI)", "6.20%", "Split 50/50 (Employee & Employer)", "Annual statutory wage cap", "Federal retirement & disability trust funds"],
              ["Medicare Hospital Insurance (HI)", "1.45%", "Split 50/50 (Employee & Employer)", "No wage limit (uncapped)", "Federal Medicare hospital insurance trust"],
              ["Additional Medicare Tax", "0.90%", "100% Employee", "Threshold over $200k single / $250k joint", "Affordable Care Act funding provision"],
              ["Federal Unemployment Tax (FUTA)", "0.60% (Net effective)", "100% Employer", "First $7,000 of annual wages per worker", "Federal unemployment administration & loans"],
              ["State Unemployment Tax (SUTA)", "1.50% - 7.50% (Variable)", "100% Employer", "State-specific wage base limits", "State unemployment insurance trust funds"],
              ["Workers' Comp Insurance", "0.50% - 9.00% (By Risk)", "100% Employer", "Total gross payroll wages", "Mandatory workplace injury insurance coverage"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Salaried Technology Engineer Semi-Monthly Payroll</h3>
          <p>
            A high-growth enterprise SaaS company compensates a senior cloud engineer with an annual base salary of $132,000.00 distributed across 24 semi-monthly payroll cycles ($5,500.00 gross per pay period). The engineer elects $300.00 per pay period in pre-tax Section 125 health and dental coverage, plus a 6.0% ($330.00) traditional 401(k) retirement contribution. Federal income tax withholding averages 15.0%, state income tax is 4.5%, and the employer&apos;s state unemployment (SUTA) experience rating is 2.8%:
          </p>
          <ol>
            <li>
              <strong>Calculate taxable wage baselines:</strong>
              <br />
              FICA Taxable Base = $5,500.00 - $300.00 (Section 125) = $5,200.00.
              <br />
              Income Tax Taxable Base = $5,200.00 - $330.00 (401k) = $4,870.00.
            </li>
            <li>
              <strong>Compute employee statutory withholdings:</strong>
              <br />
              Social Security (6.2%) = $5,200.00 &times; 0.062 = $322.40.
              <br />
              Medicare (1.45%) = $5,200.00 &times; 0.0145 = $75.40.
              <br />
              Federal Withholding (15%) = $4,870.00 &times; 0.15 = $730.50.
              <br />
              State Withholding (4.5%) = $4,870.00 &times; 0.045 = $219.15.
              <br />
              Total Employee Withholdings = $322.40 + $75.40 + $730.50 + $219.15 = $1,347.45.
            </li>
            <li>
              <strong>Determine employee net take-home pay:</strong>
              <br />
              Net Pay = $5,500.00 - $630.00 (Pre-tax) - $1,347.45 (Taxes) = $3,522.55.
            </li>
            <li>
              <strong>Calculate total employer cash disbursement:</strong>
              <br />
              Employer FICA Match = $322.40 + $75.40 = $397.80.
              <br />
              Employer Unemployment Taxes (FUTA + SUTA = 3.4%) = $5,500.00 &times; 0.034 = $187.00.
              <br />
              Total Employer Cost = $5,500.00 (Gross) + $397.80 (FICA) + $187.00 (SUTA) = $6,084.80.
            </li>
            <li>
              <strong>Corporate Budget Alignment:</strong> Management audits engineering payroll allocation within the <Link href="/calculators/business/cogs-calculator">COGS solver</Link> and projects quarterly runway in the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Hourly Light Manufacturing Assembly Shift</h3>
          <p>
            An electronics assembly contractor employs 10 hourly technicians at $22.00/hour working standard 80-hour bi-weekly shifts ($1,760.00 gross wages each). Each employee has $50.00 deducted for pre-tax group health insurance. Federal withholding averages 10.0%, state withholding is 3.5%, and worker compensation premiums run at 3.2% of gross payroll:
          </p>
          <ol>
            <li>
              <strong>Determine per-employee net take-home:</strong>
              <br />
              FICA Base = $1,760.00 - $50.00 = $1,710.00.
              <br />
              FICA Deduction (7.65%) = $1,710.00 &times; 0.0765 = $130.82.
              <br />
              Income Tax Base = $1,710.00. FIT + SIT (13.5%) = $1,710.00 &times; 0.135 = $230.85.
              <br />
              Net Pay = $1,760.00 - $50.00 - $130.82 - $230.85 = $1,348.33.
            </li>
            <li>
              <strong>Evaluate total 10-person employer payroll burden:</strong>
              <br />
              Gross Shift Payroll = 10 &times; $1,760.00 = $17,600.00.
              <br />
              Employer FICA (7.65% on $17,100) = $1,308.15.
              <br />
              Workers&apos; Comp (3.2% on $17,600) = $563.20.
              <br />
              Unemployment Taxes (SUTA + FUTA @ 3.5%) = $616.00.
              <br />
              Total Employer Disbursement = $17,600 + $1,308.15 + $563.20 + $616.00 = $20,087.35.
            </li>
            <li>
              <strong>Contract Pricing Verification:</strong> The contractor integrates factory labor into job quotes with the <Link href="/calculators/business/invoice-calculator">commercial invoice calculator</Link> and verifies markup buffers via the <Link href="/calculators/business/markup-calculator">markup calculator</Link>.
            </li>
          </ol>

          <h2>IRS Fiduciary Compliance: Trust Fund Recovery Penalties & Audits</h2>
          <p>
            Payroll taxes withheld from employee paychecks represent statutory trust funds held in fiduciary escrow for the federal and state governments. Under Internal Revenue Code Section 6672, failure to remit withheld payroll taxes triggers the Trust Fund Recovery Penalty (TFRP), assessing a 100% personal liability penalty against any corporate officer, director, or payroll manager deemed a &quot;responsible person.&quot; This liability pierces corporate limited liability protections and cannot be discharged in personal bankruptcy.
          </p>
          <p>
            Employers must deposit payroll liabilities electronically via the Electronic Federal Tax Payment System (EFTPS) according to strict monthly or semi-weekly schedules, filing quarterly IRS Form 941 reconciliations to verify compliance.
          </p>
          <p>
            Furthermore, multi-state employers must adhere to reciprocal state tax agreements. In metropolitan areas spanning state borders, remote worker payroll systems must accurately apportion state income withholding across primary physical work locations and home residences to avoid cross-jurisdictional tax audit penalties.
          </p>


          <p>
            In modern corporate human resource management, automated payroll platforms continuously synchronize with corporate general ledgers and employee benefit carriers. When employees adjust voluntary 401(k) percentage allocations, health savings account (HSA) contributions, or commuter transit passes, automated payroll rules recalculate statutory FICA and income tax withholding thresholds in real time. This automated synchronization prevents manual spreadsheet calculation errors and ensures compliance with annual IRS benefit contribution limits.
          </p>

          <h2>Operational Pitfalls in Corporate Payroll Administration</h2>
          <ol>
            <li>
              <strong>Worker Misclassification (W-2 vs. 1099):</strong> Improperly treating regular employees as independent contractors to bypass FICA and unemployment taxes invites severe Department of Labor audits, back-tax assessments, and statutory wage penalties.
            </li>
            <li>
              <strong>Overlooking State Multi-Nexus Withholding:</strong> In remote workforces, employers must register and withhold income taxes in every state where employees physically perform services, not merely the employer&apos;s corporate headquarters state.
            </li>
            <li>
              <strong>Failing to Track Annual FICA Wage Caps:</strong> Once an employee&apos;s cumulative annual wages surpass the Social Security statutory cap, withholding the 6.2% tax must immediately cease, while the 1.45% Medicare tax continues indefinitely.
            </li>
            <li>
              <strong>Mismanaging Pre-Tax Benefit Exclusions:</strong> Deducting non-qualifying voluntary fringe benefits on a pre-tax basis triggers payroll tax underpayment penalties and employee tax revisions during audit reviews.
            </li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why does an employee cost significantly more than their gross salary?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Beyond gross salary, employers are legally required to fund matching FICA taxes (7.65%), federal and state unemployment insurance (1.5% - 8.0%), and workers&apos; compensation insurance (0.5% - 5.0%), plus elective benefits like health insurance and retirement matches, creating an overall employer burden multiplier of 1.25x to 1.40x gross compensation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does Section 125 benefit both the employee and the employer?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Section 125 cafeteria plans permit employees to pay for health insurance premiums, HSA contributions, and FSA accounts using pre-tax dollars. This reduces the employee&apos;s taxable income for both income taxes and FICA, while simultaneously reducing the employer&apos;s matching 7.65% FICA tax liability dollar-for-dollar.
              </p>
            </div>
          </div>


          <p>
            Furthermore, human resource directors evaluate employer contribution matching schedules for corporate retirement plans. Structuring tiered safe-harbor 401(k) matches satisfies non-discrimination testing requirements while optimizing business tax deductions under federal retirement guidelines.
          </p>

          <h2>Authoritative Regulatory Citations & Statutory Standards</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Internal Revenue Service (IRS Publication 15 - Circular E):</strong> Employer&apos;s Tax Guide for federal income withholding, Social Security, Medicare, and FUTA taxes.
            </li>
            <li>
              <strong>Federal Insurance Contributions Act (26 U.S. Code Chapter 21):</strong> Statutory provisions governing FICA tax rates, withholding duties, and trust fund liabilities.
            </li>
            <li>
              <strong>Fair Labor Standards Act (FLSA - 29 U.S.C. 201):</strong> Federal overtime rules, non-exempt hourly tracking, and minimum wage compliance standards.
            </li>
            <li>
              <strong>Department of Labor (DOL Rule 29 CFR Part 795):</strong> Standards for determining independent contractor versus employee status under federal law.
            </li>
          </ul>
        </>
      }
    >
      <PayrollCalculatorComponent />
    </CalcPage>
  );
}
