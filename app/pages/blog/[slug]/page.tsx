import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/supabase";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | CalcDigi Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
    alternates: {
      canonical: `/pages/blog/${article.slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const publishedDate = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main style={{ padding: "60px 0 80px" }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <nav className="calc-breadcrumb">
          <Link href="/">Home</Link>
          <span className="bc-sep"> / </span>
          <Link href="/pages/blog">Blog</Link>
          <span className="bc-sep"> / </span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <div style={{ fontSize: "60px", margin: "24px 0 8px" }}>{article.cover_emoji}</div>
        <h1 style={{ fontFamily: "var(--font-serif)", marginBottom: "8px" }}>{article.title}</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "13px",
            color: "var(--c-ink3)",
            marginBottom: "32px",
          }}
        >
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.read_minutes} min read</span>
          <span>·</span>
          <span>{publishedDate}</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.related_calculator_url && (
          <div className="content-section">
            <Link href={article.related_calculator_url} className="btn btn-primary">
              Try the Related Calculator →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
