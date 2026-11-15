import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { BlogDirectory } from "@/components/BlogDirectory";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Learning Center: Precision Guides",
  description:
    "In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.",
  openGraph: {
    title: "Blog & Learning Center: Precision Guides",
    description:
      "In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.",
    type: "website",
    url: `${SITE_URL}/pages/blog`,
    siteName: "CalcDigi",
    images: [
      {
        url: "https://www.calcdigi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalcDigi Blog & Learning Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Learning Center: Precision Guides",
    description:
      "In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.",
    images: ["https://www.calcdigi.com/og-image.png"],
    creator: "@CalcDigi",
    site: "@CalcDigi",
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
      <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 pb-28">
        {/* Breadcrumb Navigation Bar */}
        <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md">
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

        {/* Hero Section with Vibrant Green Ambient Light & Grid */}
        <section className="hero-bg-glow relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800 pt-16 pb-16 sm:pt-20 sm:pb-20">
          {/* Glowing Green Light Spotlights (Behind Title) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1100px] h-[380px] sm:h-[450px] bg-gradient-to-tr from-emerald-400/30 via-emerald-300/35 to-teal-400/25 dark:from-emerald-600/30 dark:via-emerald-500/25 dark:to-teal-500/20 blur-[120px] rounded-full -z-10"
          />

          {/* Subtle Grid Texture */}
          <div className="hero-grid-bg pointer-events-none opacity-60 dark:opacity-40" />

          <div className="relative text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#eefbf4] dark:bg-emerald-950/70 border border-[#c6f0dc] dark:border-emerald-800/80 text-[#065f46] dark:text-emerald-300 shadow-xs">
              <span>📖</span>
              <span>CALCDIGI LEARNING CENTER</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              In-Depth Guides &amp; <span className="text-[#18533b] dark:text-emerald-400">Calculations</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Authoritative guides on finance, health, real estate, taxes, and math to help you make smarter decisions with your numbers.
            </p>
          </div>
        </section>

        {/* Blog Directory & Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <BlogDirectory articles={articles} />
        </section>
      </main>
    </>
  );
}
