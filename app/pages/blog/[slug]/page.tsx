import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { CalculatorPage, Editorial, JsonLd } from "@/components/flagship/shell";
import { getArticles, getArticleBySlug } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;
// Only slugs from generateStaticParams exist; anything else is a real 404
// (not a soft 404 rendered behind the root loading.tsx with a 200 status).
export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const path = `/pages/blog/${article.slug}`;
  return {
    title: `${article.title} | CalcDigi Guides`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${SITE_URL}${path}`,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
    },
    alternates: { canonical: path },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const url = `${SITE_URL}/pages/blog/${article.slug}`;

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
                { "@type": "ListItem", position: 2, name: "Blog & Guides", item: `${SITE_URL}/pages/blog` },
                { "@type": "ListItem", position: 3, name: article.title, item: url },
              ],
            },
            {
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.published_at,
              dateModified: article.updated_at,
              mainEntityOfPage: url,
              author: { "@type": "Organization", name: "CalcDigi Editorial Team" },
              publisher: { "@type": "Organization", name: "CalcDigi" },
            },
          ],
        }}
      />
      <CalculatorPage
        crumbs={[{ href: "/", label: "Home" }, { href: "/pages/blog", label: "Blog & Guides" }, { label: article.title }]}
        title={article.title}
        intro={
          <span className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">{article.category}</span>
            <span>·</span>
            <span>{article.read_minutes} min read</span>
            <span>·</span>
            <span>
              Updated <time dateTime={article.updated_at}>{fmt(article.updated_at)}</time>
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="size-3.5" />
              Reviewed by Editorial Team
            </span>
          </span>
        }
      >
        <div className="max-w-3xl space-y-8">
          <Editorial>
            <div className="fx-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
          </Editorial>

          {/* Related Calculator Highlight Card */}
          {article.related_calculator_url && (
            <div className="rounded-2xl border border-emerald-200/90 dark:border-emerald-800/60 bg-gradient-to-br from-[#f2f9f5] via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <Calculator className="size-4 text-emerald-600" />
                    Put These Numbers to Work
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Run Your Exact Scenario in Our Calculator
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Test your custom numbers, compare scenarios, and export instant calculations with 100% accuracy.
                  </p>
                </div>
                <a
                  href={article.related_calculator_url}
                  className="whitespace-nowrap px-5 py-3 rounded-xl bg-[#18533b] hover:bg-[#13422f] text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md inline-flex items-center gap-2 cursor-pointer self-stretch sm:self-center justify-center"
                >
                  Open Calculator
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          )}

          {/* Back to Guides Navigation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/pages/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to All Guides &amp; Articles
            </Link>
            <Link
              href="/calculators"
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Browse 341+ Calculators →
            </Link>
          </div>
        </div>
      </CalculatorPage>
    </>
  );
}
