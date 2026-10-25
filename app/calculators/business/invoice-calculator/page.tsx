import type { Metadata } from "next";
import Link from "next/link";
import InvoiceCalculatorComponent from "@/components/calcs/business/invoice-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InvoiceAgingCashFlowChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/invoice-calculator";
const TITLE = "Invoice Calculator | Commercial Billing, Discounts & Sales Tax";
const DESCRIPTION =
  "Compute commercial invoice totals, trade discounts, freight additions, and sales tax across line items with automated payment terms and cash flow tracking.";

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
  { href: "/calculators/business/freelance-rate-calculator", icon: "💼", name: "Freelance Rate" },
  { href: "/calculators/business/sales-tax-calculator", icon: "🏛️", name: "Sales Tax" },
  { href: "/calculators/business/discount-calculator", icon: "🏷️", name: "Discount Engine" },
  { href: "/calculators/business/cogs-calculator", icon: "📦", name: "COGS Solver" },
  { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margins" },
  { href: "/calculators/business/markup-calculator", icon: "📈", name: "Markup Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard legal formula for commercial invoice reconciliation?",
    a: "The standard commercial billing formula computes gross billable billings (services plus materials), applies trade or prompt-payment discounts, calculates destination sales tax on qualifying taxable subcomponents, and incorporates non-taxable freight delivery surcharges to determine the final legally binding net payable balance.",
  },
  {
    q: "How do early payment terms such as 2/10 Net 30 function mathematically?",
    a: "Under 2/10 Net 30 payment terms, the client receives an immediate 2.0% cash discount if the invoice is remitted in full within 10 calendar days; otherwise, the full face balance becomes legally mature within 30 days. Foregoing this 2% discount to hold cash for an extra 20 days equates to an annualized borrowing cost of 36.73%.",
  },
  {
    q: "Are freight delivery charges subject to commercial sales tax?",
    a: "Sales tax treatment on shipping and freight depends strictly on state and municipal jurisdiction nexus rules. In many states, if freight is separately stated on the invoice and delivered via a common carrier (e.g., FedEx or UPS), it remains tax-exempt. However, if shipping is bundled or combined with handling labor, it is frequently classified as fully taxable.",
  },
  {
    q: "What mandatory compliance elements must every valid B2B invoice contain?",
    a: "A legally enforceable B2B invoice must clearly display a unique sequential invoice number, vendor legal entity name and physical address, client legal billing entity, transaction date, formal payment due date, detailed line-item service or deliverable descriptions, itemized units and unit rates, applicable tax nexus registrations, and banking wire instructions.",
  },
  {
    q: "How does invoice aging impact small business working capital cycles?",
    a: "Invoices remaining uncollected past Net 30 or Net 60 days degrade cash conversion efficiency, forcing businesses to rely on expensive commercial credit lines or invoice factoring facilities. Statistical collection probability declines from 95% at 30 days to 73% at 90 days and below 25% past 180 days.",
  },
  {
    q: "How does this invoice calculator interact with corporate payroll and expense budgets?",
    a: "Commercial invoices bill direct project costs that fund corporate payroll obligations and operational overhead. Integrating accurate line-item billing ensures client billable rates sufficiently absorb employee burden multipliers and enterprise software subscriptions.",
  },
];

export default function InvoiceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Commercial Invoice & Billing Calculator"
      intro="Compute commercial invoice totals, trade discounts, shipping additions, and sales tax across line items with automated payment terms and aging tracking."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Commercial Invoices are Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              To calculate an invoice total, sum all billable labor and itemized material line items to establish the gross subtotal. Apply any contractual trade or prompt-payment discounts, calculate applicable destination sales tax on taxable merchandise, and add flat non-taxable shipping or freight fees: Total Due = (Gross Subtotal - Discount) + Tax + Shipping. Independent consultants calibrate hourly service rates with the <Link href="/calculators/business/freelance-rate-calculator">freelance rate calculator</Link> and verify statutory state withholding via the <Link href="/calculators/business/sales-tax-calculator">sales tax calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: Commercial Invoice Aging & Receivables Recovery Curve</h2>
          <p>
            The chart below visualizes the empirical collection probability curve as outstanding commercial trade receivables age past contractual Net 30, Net 60, and Net 90 payment horizons.
          </p>

          <InvoiceAgingCashFlowChart />

          <h2>First-Principles Invoicing Derivations & Cash Flow Mathematics</h2>
          <p>
            Under the Uniform Commercial Code (UCC Section 2-201) and international trade conventions, a valid invoice represents a binding settlement instrument. Line items decompose into billable consulting hours and physical merchandise units:
          </p>
          <Formula>
            {"\\text{Subtotal} = \\sum_{i=1}^{m} (\\text{Hours}_i \\times \\text{Rate}_i) + \\sum_{j=1}^{k} (\\text{Quantity}_j \\times \\text{Unit Price}_j)"}
          </Formula>
          <p>
            When volume trade discounts or prompt-settlement terms are applied, the taxable subtotal is adjusted before statutory local levies are assessed:
          </p>
          <Formula>
            {"\\text{Discounted Subtotal} = \\text{Subtotal} \\times (1 - d), \\quad \\text{Tax Amount} = (\\text{Discounted Subtotal} - \\text{Exempt Labor}) \\times t_{\\text{tax}}"}
          </Formula>
          <p>
            The final net remittance balance legally payable by the client incorporates non-taxable freight and logistics additions:
          </p>
          <Formula>
            {"\\text{Total Due} = \\text{Discounted Subtotal} + \\text{Tax Amount} + \\text{Freight Delivery Surcharge}"}
          </Formula>
          <p>
            When offering early settlement incentives like 2/10 Net 30, financial officers quantify the annualized cost of capital implied by client forfeiture using the standard trade credit formula:
          </p>
          <Formula>
            {"\\text{APR} = \\left( \\frac{d}{1 - d} \\right) \\times \\left( \\frac{365}{\\text{Credit Period} - \\text{Discount Period}} \\right)"}
          </Formula>
          <p>
            For a standard 2/10 Net 30 agreement, holding cash for an extra 20 days costs the customer an effective APR of 37.24%. Business controllers cross-reference wholesale product margins with the <Link href="/calculators/business/wholesale-price-calculator">wholesale price calculator</Link>, track inventory markups via the <Link href="/calculators/business/markup-calculator">markup calculator</Link>, and balance manufacturing outlays with the <Link href="/calculators/business/cogs-calculator">COGS solver</Link>.
          </p>

          <h2>Standard Commercial Billing Terms & Working Capital Metrics</h2>
          <p>
            The table below outlines standard B2B payment terms, default collection probabilities, cash conversion cycle impacts, and average bad debt allowances across major industrial sectors.
          </p>

          <DataTable
            head={["Payment Credit Term", "Collection Window", "Effective Annual APR", "Default Risk Rate", "Standard Industry Application"]}
            rows={[
              ["Due on Receipt / Net 7", "1 - 7 calendar days", "0.0% (Immediate)", "< 0.8%", "Freelance creative & emergency technical dispatch"],
              ["2/10 Net 30 (Prompt Discount)", "10 calendar days", "37.24% APR (if forfeited)", "1.2%", "Wholesale building materials & electronic distribution"],
              ["Net 30 (Commercial Standard)", "30 calendar days", "Cost of capital baseline", "2.5%", "Enterprise software licensing & corporate consulting"],
              ["Net 60 (Extended Enterprise)", "60 calendar days", "High working capital drag", "5.8%", "Big-box retail merchandising & tier-1 automotive"],
              ["Net 90 / Net 120 (Government)", "90 - 120 calendar days", "Severe liquidity strain", "9.4%", "Federal defense contracting & municipal infrastructure"],
              ["Milestone Retainer (50/50)", "50% upfront / 50% delivery", "Negative working capital", "< 0.5%", "Custom software development & architectural build"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Enterprise Systems Integration Milestone Billing</h3>
          <p>
            A technology consulting practice completes a Phase II cloud infrastructure migration for an enterprise healthcare client. The milestone billing includes 120 senior architect hours at $185.00/hour ($22,200 total), 8 enterprise server appliance licenses at $1,250.00 each ($10,000 total), an agreed 5.0% enterprise master service agreement (MSA) discount, an 8.25% state sales tax assessed exclusively on physical hardware appliances, and $350.00 in secure courier shipping:
          </p>
          <ol>
            <li>
              <strong>Calculate gross milestone subtotal:</strong>
              <br />
              Gross Subtotal = $22,200 (Architecture Services) + $10,000 (Hardware Licenses) = $32,200.00.
            </li>
            <li>
              <strong>Apply contractual enterprise discount:</strong>
              <br />
              Discount Amount = $32,200.00 &times; 5.0% = $1,610.00.
              <br />
              Discounted Net Subtotal = $32,200.00 - $1,610.00 = $30,590.00.
            </li>
            <li>
              <strong>Segregate taxable tangible property and assess local nexus tax:</strong>
              <br />
              Discounted Hardware Base = $10,000.00 &times; (1 - 0.05) = $9,500.00.
              <br />
              Sales Tax Due = $9,500.00 &times; 8.25% = $783.75 (Professional services remain tax-exempt).
            </li>
            <li>
              <strong>Calculate final legally binding remittance total:</strong>
              <br />
              Total Due = $30,590.00 (Net Subtotal) + $783.75 (Sales Tax) + $350.00 (Freight) = $31,723.75.
            </li>
            <li>
              <strong>Downstream Treasury Management:</strong> Corporate finance monitors receivables collection velocity with the <Link href="/calculators/business/business-loan-calculator">commercial loan calculator</Link> and verifies operating margins through the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Commercial Print Production Run with Prompt Discount</h3>
          <p>
            An industrial packaging fabricator prints 50,000 custom retail folding cartons for an e-commerce cosmetics brand. The invoice lists $12,500 in custom cardboard stock, $4,200 in 6-color offset press run labor, and $850 in freight delivery under 2/10 Net 30 terms. If the cosmetics client pays within 10 days, they capture the prompt 2.0% discount:
          </p>
          <ol>
            <li>
              <strong>Calculate base production charges before freight:</strong>
              <br />
              Base Manufacturing Subtotal = $12,500 + $4,200 = $16,700.00.
            </li>
            <li>
              <strong>Evaluate prompt payment discount deduction:</strong>
              <br />
              Prompt Discount (2.0%) = $16,700.00 &times; 0.02 = $334.00.
              <br />
              Discounted Manufacturing Net = $16,700.00 - $334.00 = $16,366.00.
            </li>
            <li>
              <strong>Add non-discountable freight logistics:</strong>
              <br />
              Final Prompt Payment Remittance = $16,366.00 + $850.00 = $17,216.00.
              <br />
              Full Maturity Payment (after 10 days) = $16,700.00 + $850.00 = $17,550.00.
            </li>
            <li>
              <strong>E-Commerce Working Capital Alignment:</strong> The cosmetics brand evaluates marketing payback via the <Link href="/calculators/business/cac-calculator">customer acquisition cost tool</Link> and balances monthly cash burn in the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>.
            </li>
          </ol>

          <h2>Corporate Treasury Working Capital & Receivables Factoring Dynamics</h2>
          <p>
            In advanced corporate treasury management, companies track Days Sales Outstanding (DSO) alongside Days Payable Outstanding (DPO) to optimize their Cash Conversion Cycle (CCC). When customer payments lag behind vendor liabilities, enterprises often deploy invoice factoring facilities or asset-based accounts receivable lending. While factoring provides immediate liquidity by advancing 80% to 90% of face invoice value, discount fees ranging from 1.5% to 3.5% per month rapidly compress net operating margins.
          </p>
          <p>
            Furthermore, implementing automated accounts receivable collections software with predictive payment reminders and digital customer payment portals dramatically compresses payment cycle latency. Automated dispute escalation workflows identify billing discrepancies within hours of invoice transmission rather than at the 30-day maturity mark, eliminating payment delays and securing working capital stability.
          </p>
          <p>
            Treasury officers evaluate the liquidity trade-off between factoring fees and commercial lines of credit, ensuring credit costs remain below the incremental return on capital reinvested into production or sales distribution.
          </p>

          <h2>Operational Pitfalls, Cash Conversion Drag & Audit Controls</h2>
          <ol>
            <li>
              <strong>Unenforceable Payment Terms & Missing Disclosures:</strong> Invoices issued without clear, legally explicit payment deadlines (&quot;Net 30 from invoice receipt date&quot;) or lacking contractual late fee disclosures cannot support statutory interest claims during commercial arbitration or collection litigation.
            </li>
            <li>
              <strong>Improper Commingling of Taxable and Exempt Line Items:</strong> Bundling taxable hardware with tax-exempt professional labor under a generic &quot;Turnkey Implementation&quot; line item triggers full sales tax assessments across the entire contract value during state sales tax audits.
            </li>
            <li>
              <strong>Days Sales Outstanding (DSO) Cash Drag:</strong> Allowing average collection cycles to drift from 30 days to 65 days ties up hundreds of thousands of dollars in illiquid accounts receivable, impairing routine bi-weekly payroll obligations modeled in the <Link href="/calculators/business/payroll-calculator">payroll calculator</Link>.
            </li>
            <li>
              <strong>Disputed Change Order Creep:</strong> Invoicing unauthorized project out-of-scope work without signed contractual addendums results in immediate invoice rejection by enterprise accounts payable portals, halting payment on undisputed line items.
            </li>
          </ol>

          <h2>Electronic Invoicing Protocols & Enterprise ERP Integration</h2>
          <p>
            Modern international commerce relies increasingly on standardized electronic invoicing (e-invoicing) frameworks. In the European Union, Directive 2014/55/EU mandates that public sector entities accept structured XML invoices conforming to the European standard EN 16931 and Peppol BIS Billing 3.0 protocols. In Latin America and Asia, government tax portals enforce mandatory real-time electronic invoice validation before goods can legally clear customs.
          </p>
          <p>
            Enterprise resource planning (ERP) suites like SAP S/4HANA and NetSuite automatically ingest structured invoice files, performing automated 3-way matching between purchase orders, receiving inspection dock receipts, and vendor invoices. By eliminating manual data entry, automated billing networks compress dispute resolution times, accelerate vendor early payment discounts, and stabilize corporate working capital cycles.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between a proforma invoice and a commercial tax invoice?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A proforma invoice is an advance preliminary quotation indicating estimated quantities, values, and specifications. It serves as an informational document for customs valuation or financing applications but does not create an accounting liability. In contrast, a commercial tax invoice is an official legal demand for payment that triggers formal accounts payable and accounts receivable entries on corporate general ledgers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do progressive milestone invoices protect long-term project cash flow?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Progressive milestone invoicing ties billing disbursements to verifiable project completion deliverables (such as architectural schematic approval, prototype delivery, or final system commissioning). This prevents contractors from financing client projects out of pocket, drastically reducing counterparty credit risk and default exposures.
              </p>
            </div>
          </div>

          <h2>Authoritative International Standards & Statutory Citations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Uniform Commercial Code (UCC Article 2 - Sales):</strong> Legal requirements for commercial invoice confirmations, acceptance of goods, and enforceable trade credit terms.
            </li>
            <li>
              <strong>European Commission Directive 2014/55/EU:</strong> Electronic invoicing standards in public procurement and cross-border digital VAT compliance.
            </li>
            <li>
              <strong>Financial Accounting Standards Board (FASB ASC 606):</strong> Revenue from Contracts with Customers and timing of accounts receivable recognition.
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 583):</strong> Recordkeeping and documentation guidelines for business billing and tax audits.
            </li>
          </ul>
        </>
      }
    >
      <InvoiceCalculatorComponent />
    </CalcPage>
  );
}
