import type { Metadata } from "next";
import { Suspense } from "react";
import { MortgageCalculator } from "./MortgageCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";

const TITLE = "Mortgage Calculator (2026) – Payment with Taxes, PMI & Amortization | CalcDigi";
const DESCRIPTION =
  "Free 2026 mortgage calculator: estimate monthly payments with taxes, insurance & PMI. Features interactive sliders, bi-weekly payments, amortization schedule & CSV export.";

export function mortgageMetadata(path: string): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: path },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: path },
  };
}

const FAQ = [
  {
    q: "What is included in a monthly mortgage payment?",
    a: "Most payments are PITI: principal, interest, property taxes and homeowners insurance. Taxes and insurance are usually collected into an escrow account by your lender. PMI and HOA dues are added on top when they apply.",
  },
  {
    q: "How does an accelerated bi-weekly mortgage save money?",
    a: "Paying half your monthly mortgage payment every two weeks results in 26 half-payments (13 full monthly payments per year). That single extra payment each year goes directly to the loan principal, shaving 4 to 8 years off a 30-year mortgage and saving tens of thousands in interest.",
  },
  {
    q: "Can I download or export my mortgage amortization schedule?",
    a: "Yes! Use the 'Download CSV' button above the amortization table to export your full month-by-month and year-by-year payment schedule with principal, interest, PMI, and remaining balance into Microsoft Excel, Google Sheets, or Apple Numbers.",
  },
  {
    q: "How much should I put down on a house?",
    a: "Putting 20% down on a conventional loan avoids PMI and lowers your monthly payment. Many conventional loans allow as little as 3% down, and FHA loans 3.5%, but you will pay mortgage insurance and more total interest.",
  },
  {
    q: "When does PMI go away?",
    a: "On conventional loans you can ask your lender to cancel PMI once your balance reaches 80% of the home's original value, and it must be cancelled automatically at 78% if you are current on payments. This calculator stops PMI at 78% loan-to-value.",
  },
  {
    q: "Is it better to choose a 15-year or 30-year mortgage?",
    a: "A 15-year loan usually has a lower rate and costs far less interest overall, but its monthly payment is much higher. A 30-year loan keeps payments lower and more flexible; you can still make extra principal payments to pay it off faster.",
  },
  {
    q: "Do extra payments really save money?",
    a: "Yes. Every extra dollar goes straight to principal, so less interest accrues in every following month. Even one extra payment a year can cut several years off a 30-year mortgage. Check that your loan has no prepayment penalty first.",
  },
];

export function MortgagePage({ path, category }: { path: string; category: { href: string; label: string } }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: `${category.label} Calculators`, item: `${SITE_URL}${category.href}` },
                { "@type": "ListItem", position: 3, name: "Mortgage Calculator", item: `${SITE_URL}${path}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Mortgage Calculator",
              url: `${SITE_URL}${path}`,
              description: DESCRIPTION,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <CalculatorPage
        crumbs={[{ href: "/", label: "Home" }, category, { label: "Mortgage Calculator" }]}
        title="Mortgage Calculator"
        intro="Estimate your monthly house payment including property tax, insurance, PMI and HOA dues, then see exactly how your loan is paid down over time."
      >
        <Suspense fallback={<div className="mt-6 h-[720px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <MortgageCalculator />
        </Suspense>

        <Editorial>
          <h2>How a fixed-rate mortgage works</h2>
          <p>
            With a fixed-rate mortgage, your interest rate and your principal-and-interest payment stay the same for the
            whole loan, usually 15 or 30 years. What changes is the split inside each payment. Early on, most of it is
            interest because the balance is large. As the balance falls, less interest accrues and more of each payment
            goes to principal. This process is called <strong>amortization</strong>, and the schedule above shows it month
            by month.
          </p>
          <h3>Monthly payment formula</h3>
          <Formula>M = P × r(1 + r)ⁿ ÷ [(1 + r)ⁿ − 1]</Formula>
          <ul>
            <li>
              <strong>M</strong>: monthly principal and interest payment
            </li>
            <li>
              <strong>P</strong>: loan amount (home price minus down payment)
            </li>
            <li>
              <strong>r</strong>: monthly interest rate (annual rate ÷ 12)
            </li>
            <li>
              <strong>n</strong>: number of payments (years × 12)
            </li>
          </ul>
          <p>
            Example: a $320,000 loan at 6.5% for 30 years gives r = 0.065 ÷ 12 ≈ 0.005417 and n = 360, so M ≈{" "}
            <strong>$2,022.62</strong> per month before taxes and insurance.
          </p>

          <h2>What goes into your monthly payment (PITI)</h2>
          <DataTable
            head={["Component", "What it is", "Typical cost"]}
            rows={[
              ["Principal", "Repays the amount you borrowed", "Grows each month"],
              ["Interest", "The lender's charge for the loan", "Shrinks each month"],
              ["Property tax", "Local tax on the home's assessed value", "≈ 0.3% – 2.2% of value per year"],
              ["Homeowners insurance", "Covers damage to the home and liability", "≈ $1,000 – $3,000 per year"],
              ["PMI", "Protects the lender when you put less than 20% down", "≈ 0.3% – 1.5% of the loan per year"],
              ["HOA fees", "Dues for condos and planned communities", "$0 – $500+ per month"],
            ]}
          />

          <h2>Private mortgage insurance (PMI) and how to remove it</h2>
          <p>
            Conventional lenders usually require PMI when your down payment is under 20%. It protects the lender, not you,
            but it lets you buy with less cash up front. Under the federal Homeowners Protection Act:
          </p>
          <ul>
            <li>
              You can <strong>request cancellation</strong> once your balance is scheduled to reach 80% of the home&rsquo;s
              original value, or reaches it sooner through extra payments, provided you have a good payment history.
            </li>
            <li>
              PMI must be <strong>cancelled automatically</strong> when the balance is scheduled to reach 78% of the
              original value, if you are current on payments.
            </li>
            <li>
              It must also end at the <strong>midpoint of the loan term</strong> (for example, after 15 years on a 30-year
              loan) even if you have not reached 78%.
            </li>
            <li>
              FHA loans use a different mortgage insurance premium (MIP), which often lasts for the life of the loan unless
              you refinance.
            </li>
          </ul>

          <h2>Extra payments: paying off early vs. investing</h2>
          <p>
            Extra principal payments reduce your balance immediately, so every later payment carries less interest. Use
            the <strong>Extra payments</strong> section above to see the effect. Before prepaying, weigh these trade-offs:
          </p>
          <ul>
            <li>
              <strong>Guaranteed return:</strong> prepaying earns exactly your mortgage rate, risk-free. At 6–7%, that is
              competitive with many investments.
            </li>
            <li>
              <strong>Liquidity:</strong> money put into your home is hard to get back without selling or borrowing. Build
              an emergency fund of 3–6 months of expenses first.
            </li>
            <li>
              <strong>Higher-interest debt first:</strong> paying off credit cards or car loans usually beats prepaying a
              mortgage.
            </li>
            <li>
              <strong>Retirement match:</strong> an employer 401(k) match is an instant 50–100% return; don&rsquo;t give
              it up to prepay.
            </li>
            <li>
              <strong>Prepayment penalties and taxes:</strong> check your loan terms, and note that prepaying reduces the
              mortgage interest you can deduct if you itemize.
            </li>
          </ul>

          <h2>Tips to lower your mortgage payment</h2>
          <ol>
            <li>Raise your credit score before applying; even 0.25% lower rate saves thousands.</li>
            <li>Put 20% down to avoid PMI, or plan to reach 80% LTV quickly.</li>
            <li>Compare quotes from at least three lenders on the same day.</li>
            <li>Consider buying discount points if you plan to stay in the home long-term.</li>
            <li>Shop homeowners insurance every year and appeal a high property tax assessment.</li>
          </ol>

          <h2>Frequently asked questions</h2>
          <Faq items={FAQ} />

          <h2>Related calculators</h2>
          <RelatedLinks
            links={[
              { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
              { href: "/calculators/housing/refinance-calculator", icon: "🔄", name: "Refinance Calculator" },
              { href: "/calculators/finance/loan-calculator", icon: "💰", name: "Loan Calculator" },
              { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
              { href: "/calculators/housing/rent-vs-buy-calculator", icon: "⚖️", name: "Rent vs Buy" },
              { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
            ]}
          />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
