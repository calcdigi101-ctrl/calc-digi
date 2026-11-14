import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { CalculatorPage, Editorial, Faq, JsonLd, RelatedLinks } from "./shell";
import { SITE_URL } from "@/lib/site";
import { MATH_SOLVERS, type MathSolverConfig } from "@/lib/mathSolvers";
import { getCompleteCalculatorFaqs } from "@/lib/calcFaqs";
import { ALL_CALCULATORS } from "@/lib/calculators";

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
  appCategory = "UtilityApplication",
  article,
  html,
  faq = [],
  related = [],
  mathExpression,
  mathSolver,
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
  mathSolver?: MathSolverConfig;
  children: ReactNode;
}) {
  const publisher = {
    "@type": "Organization",
    name: "CalcDigi",
    alternateName: ["CalcDigi", "Calc Digi"],
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://x.com/CalcDigi",
      "https://www.instagram.com/calc.digi",
      "https://www.linkedin.com/in/calc-digi-b684a6449/",
      "https://www.producthunt.com/@calcdigi",
      "https://alternativeto.net/software/calcdigi/"
    ],
  };

  const author = {
    "@type": "Organization",
    name: "CalcDigi Editorial Team",
    url: `${SITE_URL}/pages/about`,
    sameAs: [
      "https://x.com/CalcDigi",
      "https://www.linkedin.com/in/calc-digi-b684a6449/"
    ],
  };

  const allFaqs = getCompleteCalculatorFaqs(title, category.label, faq);

  const resolvedAppCategory = (() => {
    let cat = appCategory;
    if (cat === "UtilitiesApplication") cat = "UtilityApplication";
    if (cat && cat !== "UtilityApplication") return cat;

    const catHref = (category.href || "").toLowerCase();
    const catLabel = (category.label || "").toLowerCase();
    if (catHref.includes("finance") || catHref.includes("business") || catLabel.includes("finance") || catLabel.includes("business")) {
      return "FinanceApplication";
    }
    if (
      catHref.includes("education") ||
      catHref.includes("math") ||
      catHref.includes("science") ||
      catHref.includes("physics") ||
      catLabel.includes("education") ||
      catLabel.includes("math") ||
      catLabel.includes("science") ||
      catLabel.includes("physics")
    ) {
      return "EducationalApplication";
    }
    if (catHref.includes("health") || catHref.includes("baby") || catLabel.includes("health") || catLabel.includes("baby")) {
      return "HealthApplication";
    }
    return "UtilityApplication";
  })();

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
      applicationCategory: resolvedAppCategory,
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      inLanguage: "en-US",
      isAccessibleForFree: true,
      softwareVersion: "2026.1",
      datePublished: "2026-01-01",
      dateModified: "2026-11-03",
      author,
      publisher,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: `How to Calculate Using the ${title}`,
      description: `Step-by-step instructions to calculate and verify results with CalcDigi's ${title}.`,
      inLanguage: "en-US",
      datePublished: "2026-01-01",
      dateModified: "2026-11-03",
      author,
      publisher,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Enter Calculation Inputs",
          text: `Enter your values into the ${title} input fields, choosing appropriate metric or imperial units.`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Review Instant Precision Results",
          text: `Review the instant calculated output, breakdown summaries, and verified benchmarks.`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Export or Share Calculation",
          text: "Print an official calculation summary, save as PDF, or share the pre-filled calculation link.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      inLanguage: "en-US",
      datePublished: "2026-01-01",
      dateModified: "2026-11-03",
      author,
      publisher,
      mainEntity: allFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "") },
      })),
    },
  ];

  if (
    category.label === "Health" ||
    category.label === "Health & Fitness" ||
    appCategory === "HealthApplication"
  ) {
    graph.push({
      "@type": "MedicalWebPage",
      name: title,
      url: `${SITE_URL}${path}`,
      description,
      inLanguage: "en-US",
      datePublished: "2026-01-01",
      dateModified: "2026-11-03",
      author,
      publisher,
      aspect: ["Overview", "Calculation", "Clinical Guidelines", "Reference Ranges"],
      medicalAudience: "Patients and Health Consumers",
    });
  }

  const solverConfig = mathSolver || MATH_SOLVERS[path];
  const mathSolverJsonLd = solverConfig
    ? {
        "@context": "https://schema.org",
        "@type": ["MathSolver", "LearningResource"],
        name: solverConfig.name || title,
        url: `${SITE_URL}${path}`,
        usageInfo: "https://www.calcdigi.com/pages/privacy-policy",
        inLanguage: "en",
        learningResourceType: "Math solver",
        assesses: solverConfig.assesses,
        potentialAction: [
          {
            "@type": "SolveMathAction",
            target: `${SITE_URL}${path}?q={math_expression_string}`,
            "mathExpression-input": "required name=math_expression_string",
            eduQuestionType: solverConfig.eduQuestionType,
          },
        ],
      }
    : null;

  const siblingCalculators = (() => {
    if (related && related.length >= 3) return related.slice(0, 4);
    const catId = category.href.replace("/pages/", "");
    const siblings = ALL_CALCULATORS.filter((c) => c.category === catId && c.href !== path);
    const fallbackList = siblings.slice(0, 4).map((s) => ({
      href: `https://www.calcdigi.com${s.href}`,
      icon: s.icon,
      name: s.name,
    }));
    return [...(related || []), ...fallbackList].slice(0, 4);
  })();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      {mathSolverJsonLd ? <JsonLd data={mathSolverJsonLd} /> : null}
      <CalculatorPage crumbs={[{ href: "/", label: "Home" }, category, { label: title }]} title={title} intro={intro}>
        <Suspense fallback={<div className="mt-6 h-[520px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          {children}
        </Suspense>
        {siblingCalculators.length ? (
          <section className="fx-no-print mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> Related Calculators
              </h2>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
            </div>
            <RelatedLinks links={siblingCalculators} />
          </section>
        ) : null}
        <div className="fx-no-print">
          <Editorial>
            {article}
            {html ? <div className="fx-prose" dangerouslySetInnerHTML={{ __html: html }} /> : null}
            <h2>Frequently asked questions</h2>
            <Faq items={allFaqs} />
          </Editorial>
        </div>
      </CalculatorPage>
    </>
  );
}

export function calcMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: "CalcDigi",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${title} – CalcDigi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
      creator: "@CalcDigi",
      site: "@CalcDigi",
    },
  };
}
