import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { CalculatorPage, Editorial, Faq, JsonLd, RelatedLinks } from "./shell";
import { SITE_URL } from "@/lib/site";

/**
 * Shared server-rendered frame for every redesigned calculator: JSON-LD,
 * breadcrumb + H1, the interactive tool (children), then the SEO article.
 */
export function CalcPage({
  path,
  category,
  title,
  intro,
  description,
  appCategory = "UtilitiesApplication",
  article,
  html,
  faq = [],
  related = [],
  mathExpression,
  children,
}: {
  path: string;
  category: { href: string; label: string };
  title: string;
  intro: string;
  description: string;
  appCategory?: string;
  /** Hand-written article, rendered below the tool. */
  article?: ReactNode;
  /** Article body (sanitized legacy content), rendered below the tool. */
  html?: string;
  faq?: { q: string; a: string }[];
  related?: { href: string; icon: string; name: string }[];
  mathExpression?: string;
  children: ReactNode;
}) {
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: `${category.label} Calculators`, item: `${SITE_URL}${category.href}` },
        { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@type": "WebApplication",
      name: title,
      url: `${SITE_URL}${path}`,
      description,
      applicationCategory: appCategory,
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];
  if (
    category.label === "Finance" ||
    category.label === "Math" ||
    category.label === "Housing" ||
    category.label === "Housing & Building" ||
    appCategory === "FinanceApplication"
  ) {
    graph.push({
      "@type": "MathSolver",
      name: title,
      url: `${SITE_URL}${path}`,
      description,
      potentialAction: [
        {
          "@type": "SolveAction",
          target: `${SITE_URL}${path}`,
          ...(mathExpression ? { mathExpression } : {}),
          eduQuestionType:
            category.label === "Finance"
              ? "Financial Mathematics"
              : category.label === "Housing" || category.label === "Housing & Building"
              ? "Applied Engineering & Construction Mathematics"
              : "Mathematics",
        },
      ],
    });
  }
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <CalculatorPage crumbs={[{ href: "/", label: "Home" }, category, { label: title }]} title={title} intro={intro}>
        <Suspense fallback={<div className="mt-6 h-[520px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          {children}
        </Suspense>
        {related.length ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> Related Calculators
              </h2>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
            </div>
            <RelatedLinks links={related} />
          </section>
        ) : null}
        {article || html || faq.length ? (
          <Editorial>
            {article}
            {html ? <div className="fx-prose" dangerouslySetInnerHTML={{ __html: html }} /> : null}
            {faq.length ? (
              <>
                <h2>Frequently asked questions</h2>
                <Faq items={faq} />
              </>
            ) : null}
          </Editorial>
        ) : null}
      </CalculatorPage>
    </>
  );
}

export function calcMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: "website", url: path },
  };
}
