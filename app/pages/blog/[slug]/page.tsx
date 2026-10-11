import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: `${article.title} | CalcDigi`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article", url: path, publishedTime: article.published_at, modifiedTime: article.updated_at },
    alternates: { canonical: path },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
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
                { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/pages/blog` },
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
              author: { "@type": "Organization", name: "CalcDigi" },
              publisher: { "@type": "Organization", name: "CalcDigi" },
            },
          ],
        }}
      />
      <CalculatorPage
        crumbs={[{ href: "/", label: "Home" }, { href: "/pages/blog", label: "Blog" }, { label: article.title }]}
        title={article.title}
        intro={
          <span>
            {article.category} · {article.read_minutes} min read · Updated <time dateTime={article.updated_at}>{fmt(article.updated_at)}</time>
          </span>
        }
      >
        <div className="max-w-3xl">
          <Editorial>
            <div className="fx-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
          </Editorial>
          {article.related_calculator_url ? (
            <a
              href={article.related_calculator_url}
              className="mt-6 inline-flex min-h-[48px] items-center rounded-lg bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
            >
              Try the related calculator →
            </a>
          ) : null}
        </div>
      </CalculatorPage>
    </>
  );
}
