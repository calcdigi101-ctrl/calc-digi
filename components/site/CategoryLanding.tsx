import type { Metadata } from "next";
import type { ReactNode } from "react";
import { categoryPath, getCategory, type CategoryId } from "@/lib/calculators";
import { SITE_URL } from "@/lib/site";

/** Short topic list per category; counts and names always come from lib/calculators. */
const TOPICS: Record<CategoryId, string> = {
  health: "BMI, calorie, TDEE, BMR, body fat, macros, pregnancy, ovulation, sleep, pace and more",
  finance: "mortgage, loan, compound interest, retirement, tax, investment and more",
  math: "percentage, algebra, statistics, geometry and more",
  datetime: "age, date difference, time zone, countdown and more",
  housing: "rent, square footage, paint, flooring, home improvement and more",
  conversion: "length, weight, temperature, volume and more",
  electronics: "Ohm's law, resistor, capacitor, LED, PCB trace and more",
  internet: "bandwidth, download time, IP subnet and more",
  education: "GPA, grade, test score, scholarship and more",
  weather: "wind chill, heat index, dew point, UV index and more",
  transportation: "fuel cost, road trip, flight time and more",
  food: "recipe scaling, cooking conversions, calories and more",
  business: "ROI, profit margin, break-even, payroll, CAC, LTV and more",
  science: "molecular weight, pH, molarity, ideal gas law and more",
  physics: "velocity, force, energy, momentum, projectile motion and more",
  environment: "carbon footprint, solar savings, water usage, recycling, EV savings and air quality",
  entertainment: "movie tickets, streaming costs, gaming PC builds, concerts, party planning and more",
  engineering: "beam load, concrete mix, pipe flow, gear ratio, HVAC BTU, bolt torque and more",
  geography: "city distances, coordinates, time zones, map scale, elevation grade and country statistics",
  baby: "due date, baby weight percentile, feeding amounts, sleep schedule, childcare costs and more",
};

function copy(id: CategoryId) {
  const cat = getCategory(id);
  const count = cat.calculators.length;
  const noun = cat.label.split(" & ")[0].toLowerCase();
  const description = `${count} free ${noun} calculators: ${TOPICS[id]}. Instant results, no sign-up.`;
  const long = `${cat.label} Calculators (${count} Free) | CalcDigi`;
  const title = long.length <= 60 ? long : `${cat.label} Calculators | CalcDigi`;
  return { cat, count, description, title };
}

export function categoryMetadata(id: CategoryId): Metadata {
  const { title, description } = copy(id);
  const path = categoryPath(id);
  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: path },
    alternates: { canonical: path },
  };
}

/** Landing page for one calculator category, generated from the calculator data. */
export function CategoryLanding({ id, children }: { id: CategoryId; children?: ReactNode }) {
  const { cat, count, description } = copy(id);
  const [first, ...rest] = cat.label.split(" ");
  const url = `${SITE_URL}${categoryPath(id)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: `${cat.label} Calculators`, item: url },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${cat.label} Calculators`,
        description,
        url,
        hasPart: cat.calculators.map((c) => ({ "@type": "WebApplication", name: c.name, url: `${SITE_URL}${c.href}` })),
      },
    ],
  };

  return (
    <main className="cat-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="cat-page-hero">
        <div className="container">
          <nav className="calc-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center", marginBottom: 20 }}>
            <a href="/">Home</a>
            <span className="bc-sep"> / </span>
            <span aria-current="page">{cat.label} Calculators</span>
          </nav>
          <div className="cat-page-badge">
            {cat.emoji} {count} Free Calculators · No Sign-Up
          </div>
          <h1>
            {first} {rest.join(" ")}
            <br />
            <em>Calculators</em>
          </h1>
          <p className="cat-page-sub">{description}</p>
        </div>
      </section>

      {children}

      <section className="section">
        <div className="container">
          <h2 className="cat-section-title">All {cat.label} Calculators</h2>
          <p className="cat-section-sub">Pick a calculator to get started. No registration required.</p>
          <div className="calc-grid">
            {cat.calculators.map((c) => (
              <a key={c.href} href={c.href} className="cat-card">
                <div className="cat-card-icon" aria-hidden>
                  {c.icon}
                </div>
                <div className="cat-card-name">{c.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
