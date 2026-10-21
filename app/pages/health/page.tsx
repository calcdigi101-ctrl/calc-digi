import type { Metadata } from "next";
import { HealthCategoryHub } from "@/components/site/HealthCategoryHub";
import { HEALTH_FAQS, HEALTH_TOOLS } from "@/lib/healthTools";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Health & Fitness Calculators (35 Free Clinical Tools) | CalcDigi",
  description:
    "35 free clinical health & fitness calculators: BMI, Calorie, TDEE, BMR, Body Fat, Macros, VO2 Max, Heart Rate Zones, and Pregnancy. Instant dual-chart results with zero sign-up.",
  openGraph: {
    title: "Health & Fitness Calculators (35 Free Clinical Tools) | CalcDigi",
    description:
      "35 free clinical health & fitness calculators: BMI, Calorie, TDEE, BMR, Body Fat, Macros, VO2 Max, Heart Rate Zones, and Pregnancy. Instant dual-chart results with zero sign-up.",
    type: "website",
    url: `${SITE_URL}/pages/health`,
  },
  alternates: {
    canonical: `${SITE_URL}/pages/health`,
  },
};

export default function HealthCategoryPage() {
  const pageUrl = `${SITE_URL}/pages/health`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Health & Fitness Calculators", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Health & Fitness Calculators",
        description:
          "Explore 35 evidence-based health and fitness calculators for body composition, metabolic expenditure, endurance conditioning, prenatal care, and longevity.",
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          name: "35 Clinical Health & Fitness Calculators",
          numberOfItems: HEALTH_TOOLS.length,
          itemListElement: HEALTH_TOOLS.map((t, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: t.name,
            url: `${SITE_URL}${t.href}`,
            description: t.shortDesc,
          })),
        },
      },
      {
        "@type": "ItemList",
        name: "35 Free Health & Fitness Calculators",
        numberOfItems: HEALTH_TOOLS.length,
        itemListElement: HEALTH_TOOLS.map((t, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: t.name,
          url: `${SITE_URL}${t.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: HEALTH_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <HealthCategoryHub />
      </main>
    </>
  );
}
