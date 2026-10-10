import Calculator from "@/components/calcs/finance/paypal-fee-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/finance/paypal-fee-calculator";
const DESCRIPTION =
  "Free PayPal fee calculator: see how much you receive after PayPal fees, or how much to charge to receive an exact amount, for goods & services, Checkout, international and friends & family payments.";

export const metadata = calcMetadata(PATH, "PayPal Fee Calculator – Fees, Amount Received & What to Charge | CalcDigi", DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="PayPal Fee Calculator"
      intro="Find out how much PayPal takes from a payment and what you'll receive — or how much to invoice so you end up with an exact amount."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>Typical US PayPal fees</h2>
          <DataTable
            head={["Transaction", "Fee"]}
            rows={[
              ["Goods & services (personal account)", "2.99% + $0.49"],
              ["PayPal Checkout & invoices (business)", "3.49% + $0.49"],
              ["International payment", "+1.5% on top"],
              ["Friends & family, funded by card", "2.9% + $0.30 (paid by sender)"],
              ["Friends & family, bank or balance", "Free (domestic)"],
            ]}
          />
          <p>PayPal adjusts fees from time to time and some business accounts get different rates, so confirm on PayPal&rsquo;s fee page.</p>
          <h2>How to charge enough to cover the fee</h2>
          <p>Because the percentage applies to the whole payment, you can&rsquo;t just add the fee on top. Solve for the charge instead:</p>
          <Formula>Charge = (Amount you want + fixed fee) ÷ (1 − percentage fee)</Formula>
          <p>
            To receive $100 on a goods-and-services payment, ask for <strong>$103.59</strong>: (100 + 0.49) ÷ (1 − 0.0299).
          </p>
          <h2>Tips to pay less in fees</h2>
          <ul>
            <li>Small payments are hit hardest by the fixed fee — combine invoices where you can.</li>
            <li>Bank transfers (ACH) or other processors may be cheaper for large B2B invoices.</li>
            <li>Never use friends & family for purchases: it&rsquo;s against PayPal&rsquo;s terms and removes buyer and seller protection.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Who pays the PayPal fee?",
          a: "For goods and services, the seller (recipient) pays. For friends & family payments funded by a card, the sender pays.",
        },
        {
          q: "Are PayPal fees refunded if I refund a buyer?",
          a: "For most commercial transactions, PayPal keeps the fixed fee and returns the percentage portion when you issue a refund.",
        },
        {
          q: "Can I pass the fee on to customers?",
          a: "It depends on your local laws and card network rules; some places restrict surcharging. Many sellers simply build the fee into their prices instead.",
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
