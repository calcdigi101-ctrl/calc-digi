import Calculator from "@/components/calcs/finance/paypal-fee-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PaymentProcessingFeeTierChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/paypal-fee-calculator";
const TITLE = "PayPal Fee Calculator";
const DESCRIPTION =
  "Free PayPal fee calculator: calculate domestic and international merchant transaction fees, invoice gross-up amounts, cross-border surcharges, and net payout.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="PayPal Fee Calculator"
      intro="Calculate exact commercial payment processing fees for PayPal transactions. Compute invoice gross-up pricing to receive your desired net payout, and model international surcharges."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{Fee} = (\text{Gross} \times r) + F \quad \mid \quad \text{Invoice Amount} = \frac{\text{Net Desired} + F}{1 - r}"
      article={
        <>
          <h2>Direct Answer: How Are PayPal Commercial Merchant Fees Calculated?</h2>
          <p>
            When receiving commercial payments for goods and services through PayPal, sellers do not receive 100% of the invoiced balance. PayPal automatically deducts a <strong>blended processing fee</strong> consisting of a variable percentage rate (ranging from 1.90% to 3.49%) plus a fixed transaction fee (typically $0.49 for USD transactions).
          </p>
          <p>
            For standard domestic US online transactions, the baseline rate is <strong>2.99% + $0.49</strong>. If a customer sends you $100, PayPal retains $3.48 in processing fees ($2.99 variable + $0.49 fixed), depositing $96.52 into your merchant balance. To receive an exact net amount of $100, you must <strong>reverse-calculate (gross up)</strong> your invoice to $103.49.
          </p>

          <PaymentProcessingFeeTierChart />

          <h2>Actuarial Mathematics: Forward Deductions vs. Reverse Invoicing Math</h2>
          <p>
            The standard forward deduction formula to determine net payout from a known gross transaction amount is:
          </p>

          <Formula>{"\text{Processing Fee} = (\text{Gross Amount} \times r) + F"}</Formula>
          <Formula>{"\text{Net Payout} = \text{Gross Amount} - \text{Processing Fee} = \text{Gross Amount} \times (1 - r) - F"}</Formula>
          <p>
            Where:
            <br />&bull; <strong>Gross Amount:</strong> Total payment sent by the customer or client ($)
            <br />&bull; <strong>r:</strong> Variable transaction percentage rate as a decimal (e.g., 2.99% = 0.0299)
            <br />&bull; <strong>F:</strong> Currency-specific fixed flat fee ($0.49 for USD, &pound;0.39 for GBP, &euro;0.39 for EUR)
          </p>
          <p>
            When freelancers, contractors, or merchants want to ensure they receive a specific <strong>Target Net Payout</strong> after processing deductions, they must apply the <strong>Reverse Invoice Gross-Up Formula</strong>:
          </p>
          <Formula>{"\text{Required Invoice (Gross)} = \frac{\text{Target Net Payout} + F}{1 - r}"}</Formula>
          <p>
            <em>Common Pitfall:</em> Simply adding 2.99% + $0.49 to your target invoice will leave you short. If you charge $103.48 on a $100 net target, PayPal applies 2.99% to the total $103.48 ($3.09 + $0.49 = $3.58), leaving you with only $99.90. The algebraic denominator <code>(1 &minus; r)</code> correctly factors in the fee levied on the grossed-up total.
          </p>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a professional web agency billing a client <strong>$1,500 for development services</strong> under domestic standard US PayPal processing (2.99% + $0.49):
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Scenario A: Forward Fee on $1,500 Invoice.</strong>
              <br />Variable Fee = $1,500 &times; 0.0299 = $44.85.
              <br />Fixed Fee = $0.49.
              <br />Total PayPal Fee = $44.85 + $0.49 = <strong>$45.34</strong>.
              <br />Net Deposited to Merchant = $1,500 &minus; $45.34 = <strong>$1,454.66</strong> (Effective Fee: 3.02%).
            </li>
            <li>
              <strong>Scenario B: Reverse Gross-Up to Net Exactly $1,500.00.</strong>
              <br />Target Net = $1,500.00. Fixed Fee F = $0.49. Variable Rate r = 0.0299.
              <br />Numerator = $1,500.00 + $0.49 = $1,500.49.
              <br />Denominator = 1 &minus; 0.0299 = 0.9701.
              <br />Required Gross Invoice = $1,500.49 / 0.9701 = <strong>$1,546.74</strong>.
              <br /><em>Verification:</em> $1,546.74 &times; 2.99% = $46.25 + $0.49 = $46.74 fee. $1,546.74 &minus; $46.74 = <strong>$1,500.00 exact net</strong>.
            </li>
          </ol>

          <h2>PayPal Merchant Fee Schedules by Transaction Channel</h2>
          <p>
            PayPal structures pricing tiers according to payment instrument, settlement method, and geography:
          </p>

          <DataTable
            head={["Transaction Channel / Payment Type", "Percentage Rate (r)", "Fixed Flat Fee (USD)", "Fee on $100 Payment", "Fee on $1,000 Payment"]}
            rows={[
              ["Online Checkout (Standard Commercial)", "2.99%", "$0.49", "$3.48", "$30.39"],
              ["Invoicing &amp; Payment Requests", "3.49%", "$0.49", "$3.98", "$35.39"],
              ["Credit / Debit Card (Guest Checkout)", "2.59%", "$0.49", "$3.08", "$26.39"],
              ["PayPal Zettle In-Person (Card Present)", "2.29%", "$0.09", "$2.38", "$22.99"],
              ["QR Code Transactions ($10.01 and above)", "1.90%", "$0.10", "$2.00", "$19.10"],
              ["Micropayments (< $10.00 volume)", "4.99%", "$0.09", "$5.08", "$50.00 (Unfavorable)"],
              ["Charity / 501(c)(3) Verified Non-Profit", "1.99%", "$0.49", "$2.48", "$20.39"]
            ]}
          />

          <h2>International &amp; Cross-Border Payment Friction</h2>
          <p>
            When transacting with international clients or customers using foreign cards, additional surcharges apply:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Cross-Border Surcharge:</strong> An additional <strong>1.50%</strong> is added to standard rates for all cross-border commercial transactions sent from non-US accounts.
            </li>
            <li>
              <strong>Currency Conversion Spread:</strong> If a payment requires foreign exchange currency conversion, PayPal levies a <strong>3.0% to 4.0% exchange rate margin</strong> above the wholesale interbank mid-market rate.
            </li>
            <li>
              <strong>Dispute &amp; Chargeback Fees:</strong> When a buyer files a formal credit card chargeback, PayPal charges the merchant a flat <strong>$20.00 standard chargeback fee</strong> ($15.00 for disputed transactions settled under dispute mediation).
            </li>
          </ul>

          <h2>Payment Gateway Comparison Matrix: PayPal vs. Competitors</h2>
          <p>
            Comparing leading merchant processing gateways for digital businesses and online commerce:
          </p>

          <DataTable
            head={["Payment Processor", "Standard Domestic Fee", "Invoicing Fee", "ACH Bank Transfer Fee", "Key Strength"]}
            rows={[
              ["PayPal Commercial", "2.99% + $0.49", "3.49% + $0.49", "Free standard transfer", "Massive global consumer brand recognition &amp; trust."],
              ["Stripe Payments", "2.90% + $0.30", "0.4% – 0.5% add-on", "0.80% (Capped at $5.00)", "Superior developer API &amp; recurring subscription logic."],
              ["Square", "2.90% + $0.30", "3.30% + $0.30", "1.00% (Min $1.00)", "Seamless integrated hardware POS for retail &amp; pop-ups."],
              ["Direct ACH Bank Wire", "0.00% – 1.00%", "Flat $0 – $15 wire", "Flat $0 – $5.00", "Zero percentage drag on high-ticket B2B invoices ($5k+)."]
            ]}
          />

          
          <h2>Micropayments vs. High-Volume Merchant Optimization</h2>
          <p>
            For merchants processing digital goods under $10.00 (such as software assets, game microtransactions, or digital downloads), PayPal offers an alternative <strong>Micropayments Pricing Tier</strong> (typically 4.99% + $0.09). On a $5.00 transaction, the standard 2.99% + $0.49 fee consumes $0.64 (12.8% effective rate), whereas the micropayment fee consumes only $0.34 (6.8% effective rate), saving $0.30 per sale. Conversely, for transaction sizes above $12.00, standard commercial pricing is strictly superior.
          </p>
<h2>Essential Payment Processing Terminology</h2>
          <p>
            Key concepts required to audit merchant processing fees and protect profit margins:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Effective Processing Rate:</strong> The total fees paid divided by total gross sales volume. On small transactions ($10), the $0.49 fixed fee elevates the effective rate to over 7.8%.</li>
            <li><strong>Interchange Fee:</strong> The wholesale baseline fee collected by the cardholder&rsquo;s issuing bank (Visa, Mastercard) before processor markups.</li>
            <li><strong>Friends and Family (P2P):</strong> Personal domestic transfers between individuals with no fee if funded via bank account or PayPal balance; prohibited for commercial sales.</li>
            <li><strong>Tax Deductibility (IRS Section 162):</strong> All merchant processing fees paid to PayPal, Stripe, and credit card processors are 100% tax-deductible as ordinary business expenses on IRS Schedule C or corporate returns.</li>
          </ul>

          <h3>Related Business, Tax &amp; Profit Solvers</h3>
          <p>
            Optimize your commercial operations and unit economics: calculate operating profitability with our <a href="/calculators/finance/business-profit-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Business Profit Calculator</a>, find minimum volume targets using the <a href="/calculators/finance/break-even-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Break-Even Calculator</a>, audit self-employment obligations via the <a href="/calculators/finance/freelancer-tax-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Freelancer Tax Calculator</a>, and model investment yield using the <a href="/calculators/finance/roi-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">ROI Calculator</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "Why does simply adding 2.99% to an invoice result in receiving less than your target net?",
          a: "Because PayPal levies its percentage fee against the total gross payment received, not your original net target. If you invoice $102.99 on a $100 target, PayPal charges 2.99% on $102.99 ($3.08) plus $0.49 ($3.57 total fee), leaving you with only $99.42. The proper formula requires dividing by (1 - 0.0299)."
        },
        {
          q: "What is the standard PayPal fee for domestic US goods and services payments?",
          a: "The standard merchant fee for domestic online checkout transactions is 2.99% plus a $0.49 fixed fee. If you send a formal PayPal invoice directly from your dashboard, PayPal charges 3.49% plus $0.49."
        },
        {
          q: "Are PayPal transaction processing fees tax-deductible for businesses?",
          a: "Yes. Payment processing fees are fully tax-deductible business operating expenses under IRS Section 162. Sole proprietors report total gross sales and deduct payment processing fees on IRS Schedule C under Line 10 (Commissions and fees) or Line 27a (Other expenses)."
        },
        {
          q: "Can a seller legally pass PayPal fees onto the customer as a surcharge?",
          a: "In many jurisdictions, yes, provided you disclose the surcharge clearly prior to checkout. However, credit card brand rules (Visa, Mastercard) and state consumer protection statutes in states like California, New York, and Connecticut impose strict limits on payment surcharging."
        },
        {
          q: "What is the fee difference between PayPal Invoicing and PayPal Online Checkout?",
          a: "PayPal Online Checkout charges 2.99% + $0.49 for standard commercial transactions. PayPal Invoicing charges 3.49% + $0.49. On a $1,000 transaction, an invoice costs $35.39 in fees, whereas an integrated online checkout costs $30.39."
        },
        {
          q: "How do international payments affect the total processing fee on PayPal?",
          a: "International transactions sent from accounts outside your domestic country incur an additional 1.50% cross-border surcharge. If the sender pays in a foreign currency requiring currency conversion, PayPal applies an additional 3.0% to 4.0% foreign exchange spread."
        },
        {
          q: "What is the fee for receiving money through Friends and Family?",
          a: "Domestic Friends and Family payments are completely free for both sender and recipient when funded by a linked bank account or existing PayPal balance. However, using Friends and Family for commercial goods and services violates PayPal terms and forfeits Purchase Protection."
        },
        {
          q: "When does it make sense to switch from PayPal to ACH bank transfers?",
          a: "For B2B invoices exceeding $3,000 to $5,000, paying a 3% credit card fee results in hundreds of dollars in lost profit. ACH bank transfers typically cost flat fees ($0 to $5) or capped percentages (0.80% capped at $5), saving 90%+ in transaction friction on large invoices."
        }
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
