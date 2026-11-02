"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, CheckCircle2, Clock, Search, Sparkles, X } from "lucide-react";
import type { Article } from "@/lib/articles";

export function BlogDirectory({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Clean distinct category list
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category));
    return ["All", ...Array.from(set)];
  }, [articles]);

  // Filter articles based on active category and query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featured = useMemo(() => {
    return articles.find((a) => a.featured) ?? articles[0];
  }, [articles]);

  const showFeaturedHero = selectedCategory === "All" && !searchQuery.trim() && featured;
  const gridArticles = showFeaturedHero
    ? filteredArticles.filter((a) => a.slug !== featured?.slug)
    : filteredArticles;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* 1. Search & Category Filter Toolbar */}
      <div
        style={{
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          padding: "24px 28px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
        className="dark:bg-slate-900 dark:border-slate-800"
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          {/* Search Input Box */}
          <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
            <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#94a3b8" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, formulas, or topics..."
              style={{
                width: "100%",
                paddingLeft: "42px",
                paddingRight: "36px",
                paddingTop: "11px",
                paddingBottom: "11px",
                borderRadius: "14px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                fontSize: "14px",
                outline: "none",
                color: "#0f172a",
                boxSizing: "border-box",
              }}
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "4px",
                }}
                aria-label="Clear search"
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            )}
          </div>

          {/* Result Count Indicator */}
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#64748b" }} className="dark:text-slate-400">
            Showing <strong style={{ color: "#0f172a" }} className="dark:text-white">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? "Guide" : "Guides"}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
            paddingTop: "14px",
            borderTop: "1px solid #f1f5f9",
          }}
          className="dark:border-slate-800"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  backgroundColor: isActive ? "#18533b" : "#f8fafc",
                  color: isActive ? "#ffffff" : "#475569",
                  border: isActive ? "1px solid #18533b" : "1px solid #e2e8f0",
                  boxShadow: isActive ? "0 2px 6px rgba(24,83,59,0.25)" : "none",
                }}
                className={isActive ? "" : "hover:bg-emerald-50 hover:text-emerald-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}
              >
                {cat === "All" ? `All Guides (${articles.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Featured Editorial Hero Card (Default View) */}
      {showFeaturedHero && (
        <div
          style={{
            borderRadius: "32px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            padding: "40px 44px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
          className="dark:bg-slate-900 dark:border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    backgroundColor: "#eefbf4",
                    color: "#065f46",
                    border: "1px solid #c6f0dc",
                  }}
                >
                  {featured.category}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#d97706" }}>
                  ⭐ FEATURED EDITORIAL
                </span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#64748b", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <Clock style={{ width: "13px", height: "13px", color: "#059669" }} />
                  {featured.read_minutes} min read
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif, "DM Serif Display", serif)',
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: "-0.5px",
                  color: "#0f172a",
                  margin: "8px 0",
                }}
                className="dark:text-white"
              >
                <Link href={`/pages/blog/${featured.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {featured.title}
                </Link>
              </h2>

              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.65, maxWidth: "580px", margin: "10px 0" }} className="dark:text-slate-300">
                {featured.excerpt}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 600, color: "#059669", paddingTop: "4px" }}>
                <CheckCircle2 style={{ width: "15px", height: "15px" }} />
                <span>Reviewed by CalcDigi Actuarial Team • Updated for 2026 Guidelines</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", paddingTop: "14px" }}>
                <Link
                  href={`/pages/blog/${featured.slug}`}
                  style={{
                    backgroundColor: "#18533b",
                    color: "#ffffff",
                    padding: "13px 26px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(24,83,59,0.25)",
                  }}
                  className="hover:bg-[#13422f] transition-all"
                >
                  Read Complete Guide
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </Link>

                {featured.related_calculator_url && (
                  <Link
                    href={featured.related_calculator_url}
                    style={{
                      backgroundColor: "#f8fafc",
                      color: "#334155",
                      padding: "13px 22px",
                      borderRadius: "14px",
                      border: "1px solid #cbd5e1",
                      fontWeight: 600,
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                    className="hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 transition-all"
                  >
                    <Calculator style={{ width: "16px", height: "16px", color: "#059669" }} />
                    Open Calculator ↗
                  </Link>
                )}
              </div>
            </div>

            {/* Right Benchmark Graphic Box */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #f2f9f5 0%, #f8fafc 100%)",
                  border: "1px solid #c6f0dc",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
                className="dark:bg-slate-800/90 dark:border-slate-700"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b" }}>
                    Standard Banking Benchmark
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#065f46", backgroundColor: "#d1fae5", padding: "2px 8px", borderRadius: "6px" }}>
                    Fannie Mae
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }} className="dark:bg-slate-900 dark:border-slate-700">
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", marginBottom: "4px" }}>Front-End DTI</div>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: "#18533b" }} className="dark:text-emerald-400">28%</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Max Housing Cap</div>
                  </div>
                  <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }} className="dark:bg-slate-900 dark:border-slate-700">
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", marginBottom: "4px" }}>Back-End DTI</div>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: "#18533b" }} className="dark:text-emerald-400">36%</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Total Debt Ceiling</div>
                  </div>
                </div>

                <div style={{ fontSize: "12px", color: "#475569", lineHeight: 1.55, backgroundColor: "#ffffff", padding: "12px 14px", borderRadius: "12px", border: "1px solid #e2e8f0" }} className="dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
                  💡 <strong>Rule of Thumb:</strong> Limit your monthly housing expenses to 28% of gross income to protect an emergency reserve and keep investing.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Grid of Article Cards */}
      {gridArticles.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
          {gridArticles.map((article) => (
            <article
              key={article.slug}
              style={{
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 dark:bg-slate-900 dark:border-slate-800 group"
            >
              <div>
                {/* Visual Header Banner */}
                <div
                  style={{
                    height: "150px",
                    background: "linear-gradient(135deg, #e8f5ed 0%, #f4fbf7 50%, #e0f2fe 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                  className="dark:border-slate-800"
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "18px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "30px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                    }}
                    className="group-hover:scale-105 transition-transform dark:bg-slate-800 dark:border-slate-700"
                  >
                    {article.cover_emoji}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#475569",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    className="dark:bg-slate-800/90 dark:border-slate-700 dark:text-slate-300"
                  >
                    <Clock style={{ width: "11px", height: "11px", color: "#059669" }} />
                    <span>{article.read_minutes} min read</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "24px 26px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        backgroundColor: "#eefbf4",
                        color: "#065f46",
                        border: "1px solid #c6f0dc",
                      }}
                      className="dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60"
                    >
                      {article.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif, "DM Serif Display", serif)',
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: "#0f172a",
                      margin: "4px 0",
                    }}
                    className="dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    <Link href={`/pages/blog/${article.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {article.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      lineHeight: 1.6,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    className="dark:text-slate-400"
                  >
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer with Clean Border & Generous Padding */}
              <div
                style={{
                  padding: "16px 26px 22px",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginTop: "auto",
                }}
                className="dark:border-slate-800/80"
              >
                <Link
                  href={`/pages/blog/${article.slug}`}
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#18533b",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    textDecoration: "none",
                  }}
                  className="hover:underline dark:text-emerald-400"
                >
                  Read Guide
                  <ArrowRight style={{ width: "13px", height: "13px" }} />
                </Link>

                {article.related_calculator_url && (
                  <Link
                    href={article.related_calculator_url}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#475569",
                      backgroundColor: "#f8fafc",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                    className="hover:bg-emerald-50 hover:text-emerald-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 transition-all"
                  >
                    <Calculator style={{ width: "12px", height: "12px", color: "#059669" }} />
                    Calculator
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            backgroundColor: "#ffffff",
            borderRadius: "32px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
          className="dark:bg-slate-900 dark:border-slate-800"
        >
          <BookOpen style={{ width: "48px", height: "48px", color: "#cbd5e1" }} />
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }} className="dark:text-white">
            No guides found
          </h3>
          <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "420px", margin: 0 }} className="dark:text-slate-400">
            We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try searching for mortgage, compound interest, BMI, or tax.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              fontWeight: 600,
              color: "#334155",
              cursor: "pointer",
              marginTop: "8px",
            }}
            className="hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
          >
            Clear Filters &amp; Reset
          </button>
        </div>
      )}

      {/* 4. AI Assistant CTA Banner */}
      <div
        style={{
          borderRadius: "32px",
          background: "linear-gradient(135deg, #064e3b 0%, #18533b 60%, #042f2e 100%)",
          color: "#ffffff",
          padding: "44px 48px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div style={{ textAlign: "left", maxWidth: "620px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#a7f3d0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                marginBottom: "12px",
              }}
            >
              <Sparkles style={{ width: "13px", height: "13px", color: "#6ee7b7" }} />
              Need Help With Your Specific Numbers?
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif, "DM Serif Display", serif)', fontSize: "28px", fontWeight: 700, margin: "6px 0 10px", color: "#ffffff" }}>
              Ask the CalcDigi AI Assistant
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(240, 253, 244, 0.9)", lineHeight: 1.6, margin: 0 }}>
              Not sure which calculator fits your exact scenario or want an instant walkthrough of a formula? Our assistant is ready to help 24/7.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
            <Link
              href="/#ai-assistant"
              style={{
                backgroundColor: "#ffffff",
                color: "#18533b",
                padding: "13px 26px",
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
              }}
              className="hover:bg-emerald-50 transition-all"
            >
              Try AI Assistant →
            </Link>
            <Link
              href="/calculators"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                padding: "13px 22px",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
              className="hover:bg-white/20 transition-all"
            >
              All 341+ Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
