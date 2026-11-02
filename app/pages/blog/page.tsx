import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { BlogDirectory } from "@/components/BlogDirectory";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Learning Center: Financial, Health & Math Guides",
  description:
    "In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.",
  openGraph: {
    title: "Blog & Learning Center | CalcDigi",
    description:
      "In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.",
    type: "website",
    url: `${SITE_URL}/pages/blog`,
  },
  alternates: {
    canonical: "/pages/blog",
  },
};

export default async function Page() {
  const articles = await getArticles();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog & Guides", item: `${SITE_URL}/pages/blog` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "CalcDigi Blog & Learning Center",
        url: `${SITE_URL}/pages/blog`,
        description:
          "In-depth actuarial, financial, health, and everyday math guides with verified formulas and calculation examples.",
        publisher: {
          "@type": "Organization",
          name: "CalcDigi",
          url: `${SITE_URL}/`,
        },
        hasPart: articles.map((article) => ({
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          url: `${SITE_URL}/pages/blog/${article.slug}`,
          datePublished: article.published_at,
          dateModified: article.updated_at,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 pb-24">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Blog &amp; Guides</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#eefbf4] dark:bg-emerald-950/70 border border-[#c6f0dc] dark:border-emerald-800/80 text-[#065f46] dark:text-emerald-300">
              <span>📖</span>
              <span>CALCDIGI LEARNING CENTER</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              In-Depth Guides &amp; <span className="text-[#18533b] dark:text-emerald-400">Calculations</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Authoritative guides on finance, health, real estate, taxes, and math to help you make smarter decisions with your numbers.
            </p>
          </div>
        </section>

        {/* Blog Directory & Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogDirectory articles={articles} />
        </section>
      </main>
    </>
  );
}
