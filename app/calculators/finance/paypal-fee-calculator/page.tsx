import Calculator from "@/components/calcs/finance/paypal-fee-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PaymentProcessingFeeTierChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/paypal-fee-calculator";
const TITLE = "PayPal Fee Calculator – Merchant Processing, Invoicing & Reverse Calculator | CalcDigi";
const DESCRIPTION =
  "Free PayPal fee calculator: calculate exact merchant deduction fees and net payout received, or reverse-calculate how much to invoice a client to receive an exact target net amount across domestic and international transactions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="PayPal Fee Calculator"
      intro="Calculate exact commercial processing fees, net proceeds received, or reverse-solve how much to invoice clients so you receive an exact net amount after merchant deductions."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="InvoiceAmount = (DesiredNet + FixedFee) / (1 - FeeRate)"
      article={
        <>
          <h2>Direct Answer: How Does the PayPal Commercial Processing Fee &amp; Reverse Invoicing Formula Work?</h2>
          <p>
            When a merchant, business, or freelancer accepts a commercial payment through PayPal for goods or services, PayPal deducts a two-part processing fee: a <strong>percentage-based variable rate</strong> (typically 2.99% for standard digital payments or 3.49% for integrated PayPal Checkout/Invoicing) plus a <strong>fixed transactional fee</strong> ($0.49 for US Dollar transactions). Because the variable percentage is assessed against the <em>gross incoming payment total</em>, simply adding 2.99% + $0.49 to your target invoice leaves you short. You must use the algebraic <strong>Reverse Invoicing Formula</strong> to ensure you receive 100% of your desired net revenue.
          </p>

          <Formula>Deducted Merchant Fee = (Gross Payment × Variable Rate) + Fixed Transaction Fee</Formula>
          <Formula>Net Payout Received = Gross Payment − Deducted Merchant Fee</Formula>
          <Formula>Required Invoice to Receive Exact Net = (Desired Net Payout + Fixed Fee) ÷ (1 − Variable Rate)</Formula>
          <p>
            Example:
            <br />
            To net exactly <strong>$100.00</strong> on a standard Goods &amp; Services transaction (2.99% + $0.49):
            <br />
            <strong>($100.00 + $0.49) ÷ (1 − 0.0299) = $100.49 ÷ 0.9701 = $103.59</strong>.
            <br />
            When the client pays $103.59, PayPal deducts ($103.59 × 2.99%) + $0.49 = $3.59 in fees, depositing exactly $100.00 into your account.
          </p>

          <PaymentProcessingFeeTierChart />

          <h2>Standard US Merchant Processing Fee Schedule Matrix</h2>
          <p>
            The table below reflects current statutory published fee schedules across major digital payment methods and merchant transaction types:
          </p>

          <DataTable
            head={["Payment Method / Transaction Type", "Domestic Fee Structure", "International Add-On", "Net Payout on $100 Sale", "Net Payout on $1,000 Sale"]}
            rows={[
              ["PayPal Standard Goods & Services", "2.99% + $0.49", "+1.50% cross-border", "$96.52", "$969.61"],
              ["PayPal Invoicing & Checkout", "3.49% + $0.49", "+1.50% cross-border", "$96.02", "$964.61"],
              ["Stripe Standard Card Processing", "2.90% + $0.30", "+1.50% intl / +1.0% FX", "$96.80", "$970.70"],
              ["PayPal In-Person QR Code (> $10)", "1.90% + $0.10", "Not Applicable", "$98.00", "$980.90"],
              ["PayPal Payouts (Mass Pay API)", "2.00% (capped at $1.00)", "Capped at $20.00", "$99.00", "$999.00 (capped fee)"],
              ["Friends & Family (Personal Balance)", "0.00% (Free)", "+5.00% intl ($0.99–$4.99 cap)", "$100.00", "$100.00"],
            ]}
          />

          <h2>Core Merchant Fee Optimization Guidelines</h2>
          <ul>
            <li>
              <strong>Micro-Transaction Drag:</strong> On small transactions (e.g., $5.00), the $0.49 fixed fee represents nearly 10% of gross revenue by itself, pushing the total effective fee above 12.8%. For low-ticket digital sales, batch invoices or utilize micro-payment fee structures (5.0% + $0.05).
            </li>
            <li>
              <strong>Cross-Border Surcharges &amp; FX Spread:</strong> International payments incur an extra 1.50% cross-border assessment, plus a 3.0%–4.0% foreign exchange spread if currency conversion is required.
            </li>
            <li>
              <strong>Merchant Surcharging Legality:</strong> Passing credit card processing fees directly to customers as a checkout surcharge is permitted in most US states under card network rules (capped at your actual processing cost or 4%), but is restricted by statute in select jurisdictions (such as Connecticut and Massachusetts).
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Freelance &amp; Merchant Fee Solvers</h3>
            <p>
              Factoring digital payment processor fees into client invoices ensures you receive full compensation. Calculate estimated self-employment quarterly taxes with our <a href="/calculators/finance/freelancer-tax-calculator">Freelancer Tax Calculator</a>, track corporate operating margins via the <a href="/calculators/finance/business-profit-calculator">Business Profit Calculator</a>, model foreign currency exchange using the <a href="/calculators/finance/currency-converter">Currency Converter</a>, and find required sales volume with our <a href="/calculators/finance/break-even-calculator">Break Even Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Who pays the fee on PayPal Goods and Services transactions?",
          a: "The seller (payment recipient) always pays the processing fee. The fee is automatically deducted from the gross incoming payment before the remaining net balance is credited to the seller's PayPal balance.",
        },
        {
          q: "Can I use PayPal Friends and Family to sell merchandise or freelance services?",
          a: "No. Using 'Friends & Family' for commercial transactions violates PayPal's User Agreement and terms of service. It also forfeits all PayPal Seller Protection and Buyer Purchase Protection, meaning you have zero dispute recourse in cases of non-delivery, fraud, or chargebacks.",
        },
        {
          q: "Does PayPal refund merchant processing fees when I issue a refund to a customer?",
          a: "No. Since PayPal updated its commercial refund policy, the company retains the fixed fee ($0.49) and does not refund original processing fees when a merchant issues a full or partial refund to a buyer.",
        },
        {
          q: "Are PayPal transaction processing fees tax-deductible?",
          a: "Yes. For freelancers, independent contractors, and business owners, payment processing fees deducted by PayPal, Stripe, Square, or credit card merchant processors are 100% tax-deductible ordinary business expenses reported on Schedule C or corporate tax returns.",
        },
      ]}
      related={[
        { href: "/calculators/business/invoice-calculator", icon: "📄", name: "Invoice" },
        { href: "/calculators/business/freelance-rate-calculator", icon: "🧑‍💻", name: "Freelance Rate" },
        { href: "/calculators/finance/currency-converter", icon: "💱", name: "Currency Converter" },
        { href: "/calculators/business/ecommerce-profit-calculator", icon: "🛍️", name: "E-commerce Profit" },
        { href: "/calculators/business/profit-margin-calculator", icon: "📊", name: "Profit Margin" },
        { href: "/calculators/finance/freelancer-tax-calculator", icon: "🧾", name: "Freelancer Tax" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
