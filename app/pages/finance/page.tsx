import type { Metadata } from "next";
import { FinanceCategoryHub } from "@/components/site/FinanceCategoryHub";
import { FINANCE_FAQS, FINANCE_TOOLS } from "@/lib/financeTools";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Finance & Money Calculators (40 Free Financial Tools) | CalcDigi",
  description:
    "40 free financial calculators: Mortgage, Loan, Compound Interest, 401(k), Retirement, Tax, Auto Loan, and Debt Payoff. Instant calculations with zero sign-up.",
  openGraph: {
    title: "Finance & Money Calculators (40 Free Financial Tools) | CalcDigi",
    description:
      "40 free financial calculators: Mortgage, Loan, Compound Interest, 401(k), Retirement, Tax, Auto Loan, and Debt Payoff. Instant calculations with zero sign-up.",
    type: "website",
    url: `${SITE_URL}/pages/finance`,
  },
  alternates: {
    canonical: `${SITE_URL}/pages/finance`,
  },
};

export default function FinanceCategoryPage() {
  const pageUrl = `${SITE_URL}/pages/finance`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Finance & Money Calculators", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Finance & Money Calculators",
        description:
          "Explore 40 evidence-based financial calculators for mortgage amortization, installment loan payoff, compound interest wealth projection, retirement planning, and 2026 tax liability.",
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          name: "40 Free Financial Calculators",
          numberOfItems: FINANCE_TOOLS.length,
          itemListElement: FINANCE_TOOLS.map((t, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: t.name,
            url: `${SITE_URL}${t.href}`,
            description: t.shortDesc,
          })),
        },
      },
      {
        "@type": "ItemList",
        name: "40 Free Financial Calculators",
        numberOfItems: FINANCE_TOOLS.length,
        itemListElement: FINANCE_TOOLS.map((t, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: t.name,
          url: `${SITE_URL}${t.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FINANCE_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <FinanceCategoryHub />
      </main>
    </>
  );
}
