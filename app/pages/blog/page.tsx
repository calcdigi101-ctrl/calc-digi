import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Guides | CalcDigi",
  description:
    "CalcDigi Blog – Guides on health, finance, fitness, tax, and math to help you make smarter decisions with your numbers.",
  openGraph: {
    title: "Blog & Guides | CalcDigi",
    description:
      "CalcDigi Blog – Guides on health, finance, fitness, tax, and math to help you make smarter decisions with your numbers.",
    type: "website",
  },
  alternates: {
    canonical: "/pages/blog",
  },
};

export default async function Page() {
  const articles = await getArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <main>
      <section className="hero" style={{ padding: "60px 0 48px" }}>
        <div className="container">
          <div className="hero-badge">📖 Learning Center</div>
          <h1 style={{ fontSize: "clamp(30px,4vw,52px)" }}>
            Guides &amp; <em>Articles</em>
          </h1>
          <p className="hero-sub">
            In-depth guides on health, finance, fitness, tax, and math to help you make smarter decisions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!articles.length && (
            <p style={{ color: "var(--c-ink3)" }}>No articles published yet — check back soon.</p>
          )}

          {featured && (
            <Link
              href={`/pages/blog/${featured.slug}`}
              style={{
                background: "var(--c-accent-lt)",
                border: "1.5px solid var(--c-rule)",
                borderRadius: "var(--radius-xl)",
                padding: "36px",
                marginBottom: "40px",
                display: "grid",
                gridTemplateColumns: "1fr 200px",
                gap: "32px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: "12px" }}>
                  ⭐ Featured Article
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(22px,3vw,34px)",
                    letterSpacing: "-0.4px",
                    marginBottom: "12px",
                  }}
                >
                  {featured.title}
                </h2>
                <p style={{ color: "var(--c-ink2)", fontSize: "15px", lineHeight: 1.7, marginBottom: "20px" }}>
                  {featured.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontSize: "13px",
                    color: "var(--c-ink3)",
                    marginBottom: "20px",
                  }}
                >
                  <span>{featured.read_minutes} min read</span>
                  <span>·</span>
                  <span>{featured.category}</span>
                </div>
                <span className="btn btn-primary">Read Article →</span>
              </div>
              <div style={{ fontSize: "80px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {featured.cover_emoji}
              </div>
            </Link>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "24px" }}>
            {rest.map((article) => (
              <Link href={`/pages/blog/${article.slug}`} className="blog-card" key={article.id}>
                <div className="blog-card-img">{article.cover_emoji}</div>
                <div className="blog-card-body">
                  <div className="blog-card-cat">{article.category}</div>
                  <div className="blog-card-title">{article.title}</div>
                  <div className="blog-card-desc">{article.excerpt}</div>
                  <div className="blog-card-meta">
                    <span>{article.read_minutes} min</span>
                    <span>·</span>
                    <span>{article.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
