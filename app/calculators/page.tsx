import type { Metadata } from "next";
import CalculatorsExplorer from "@/components/CalculatorsExplorer";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { SITE_URL } from "@/lib/site";

const TITLE = `All Calculators – ${TOTAL_CALCULATOR_COUNT}+ Free Calculators | CalcDigi`;
const DESCRIPTION = `Browse all ${TOTAL_CALCULATOR_COUNT} free calculators on CalcDigi across health, finance, math, and ${
  CATEGORIES.length - 3
} more categories. Filter by category, no sign-up required.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  alternates: {
    canonical: "/calculators",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "All Calculators", item: `${SITE_URL}/calculators` },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "All Calculators",
      description: DESCRIPTION,
      url: `${SITE_URL}/calculators`,
    },
  ],
};

export default function CalculatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="hero calc-page-hero">
          <div className="hero-grid-bg"></div>
          <div className="container">
            <nav className="calc-breadcrumb" style={{ justifyContent: "center", marginBottom: 12 }}>
              <a href="/">Home</a>
              <span className="bc-sep"> / </span>
              <span aria-current="page">All Calculators</span>
            </nav>
            <div className="hero-badge hero-anim" style={{ animationDelay: ".05s", marginBottom: 12 }}>
              🧮 {TOTAL_CALCULATOR_COUNT} Free Calculators · {CATEGORIES.length} Categories · No Sign-Up
            </div>
            <h1 className="hero-anim calc-page-h1" style={{ animationDelay: ".15s" }}>
              All CalcDigi <em>Calculators</em>
            </h1>
            <p className="hero-sub hero-anim calc-page-sub" style={{ animationDelay: ".25s" }}>
              Browse the entire CalcDigi library — {TOTAL_CALCULATOR_COUNT} free calculators for
              health, finance, math, and {CATEGORIES.length - 3} more categories.
            </p>
            <div className="hero-stats-row hero-anim calc-page-stats" style={{ animationDelay: ".35s" }}>
              <div className="hero-stat">
                <div className="hero-stat-num">{TOTAL_CALCULATOR_COUNT}</div>
                <div className="hero-stat-label">Calculators</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">{CATEGORIES.length}</div>
                <div className="hero-stat-label">Categories</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Free</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">0</div>
                <div className="hero-stat-label">Sign-Up</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section calc-page-section">
          <div className="container">
            <CalculatorsExplorer categories={CATEGORIES} />
          </div>
        </section>
      </main>
    </>
  );
}
