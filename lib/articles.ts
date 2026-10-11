import { getSupabaseArticles } from "@/lib/supabase";

/**
 * Single source of truth for blog articles. The blog index, article pages,
 * homepage "Guides & Articles" cards and sitemap all read from getArticles().
 *
 * Built-in articles live here so every environment (Preview, local builds)
 * renders them; articles published in Supabase (Production only) are merged
 * in and win on a slug clash.
 */

export type Article = {
  slug: string;
  title: string;
  /** Used as the meta description and card excerpt — keep under ~155 chars. */
  excerpt: string;
  /** Trusted, hand-written HTML. */
  content: string;
  category: string;
  read_minutes: number;
  cover_emoji: string;
  related_calculator_url: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
};

const LOCAL_ARTICLES: Article[] = [
  {
    slug: "healthy-bmi-for-adults",
    title: "What Is a Healthy BMI for Adults?",
    excerpt:
      "What your BMI number means, the adult BMI ranges, where BMI falls short, and when it's worth talking to a doctor.",
    category: "Health",
    read_minutes: 5,
    cover_emoji: "📊",
    related_calculator_url: "/calculators/health/bmi-calculator",
    featured: false,
    published_at: "2025-01-15",
    updated_at: "2026-10-01",
    content: `
<p>Body mass index (BMI) is the most widely used screening number for weight-related health risk. It is quick to calculate, needs only your height and weight, and is used by the CDC, the NIH and the World Health Organization. It is also easy to misread. This guide explains what a healthy BMI is for adults, how to interpret your result, and where BMI stops being useful.</p>

<h2>How BMI is calculated</h2>
<p>BMI divides your weight by the square of your height:</p>
<ul>
  <li><strong>Metric:</strong> BMI = weight (kg) ÷ height (m)²</li>
  <li><strong>US units:</strong> BMI = 703 × weight (lb) ÷ height (in)²</li>
</ul>
<p>For example, a person who is 5 ft 9 in (69 in) and weighs 165 lb has a BMI of 703 × 165 ÷ 69² ≈ <strong>24.4</strong>.</p>

<h2>Adult BMI ranges</h2>
<p>For adults aged 20 and over, the CDC and WHO use the same categories for men and women:</p>
<table>
  <thead><tr><th>BMI</th><th>Category</th></tr></thead>
  <tbody>
    <tr><td>Below 18.5</td><td>Underweight</td></tr>
    <tr><td>18.5 – 24.9</td><td>Healthy weight</td></tr>
    <tr><td>25.0 – 29.9</td><td>Overweight</td></tr>
    <tr><td>30.0 – 34.9</td><td>Obesity class 1</td></tr>
    <tr><td>35.0 – 39.9</td><td>Obesity class 2</td></tr>
    <tr><td>40.0 and above</td><td>Obesity class 3</td></tr>
  </tbody>
</table>
<p>So a "healthy" adult BMI is <strong>18.5 to 24.9</strong>. For a 5 ft 9 in adult that corresponds to roughly 125–168 lb.</p>
<p>Some health bodies use lower cut-offs for people of Asian descent, because type 2 diabetes and heart-disease risk rise at lower BMIs in those populations. WHO guidance suggests treating 23 and above as increased risk and 27.5 and above as high risk.</p>

<h2>What BMI doesn't tell you</h2>
<p>BMI measures size, not body composition. It cannot tell muscle from fat, and it says nothing about where fat is stored. That leads to predictable blind spots:</p>
<ul>
  <li><strong>Muscular people</strong> such as athletes and lifters can score as "overweight" while having low body fat.</li>
  <li><strong>Older adults</strong> often lose muscle as they age, so a "healthy" BMI can hide a high body-fat percentage.</li>
  <li><strong>Fat distribution matters.</strong> Abdominal (visceral) fat carries more cardiometabolic risk than fat on the hips and thighs, and BMI can't see it.</li>
  <li><strong>Pregnancy</strong> makes BMI meaningless as a weight-status measure.</li>
</ul>
<p>Children and teens use BMI-for-age percentiles instead of the adult table, because healthy body composition changes as they grow.</p>

<h2>Better together: BMI plus waist measurements</h2>
<p>Pairing BMI with a waist-based measure fixes many of its blind spots. A simple rule of thumb is to keep your waist circumference below half your height (a waist-to-height ratio under 0.5). Waist-to-hip ratio and body-fat percentage add more detail.</p>

<h2>When to talk to a doctor</h2>
<p>BMI is a screening tool, not a diagnosis. It's worth a conversation with a healthcare professional if your BMI is under 18.5 or 30 and over, if it has changed quickly without explanation, or if you have a borderline BMI along with high blood pressure, high blood sugar or a family history of heart disease. A clinician can combine BMI with blood tests, blood pressure and your history to judge your real risk.</p>

<h2>Key takeaways</h2>
<ul>
  <li>A healthy adult BMI is 18.5–24.9.</li>
  <li>BMI is a fast screen. It doesn't measure body fat or show where fat sits.</li>
  <li>Combine it with waist-to-height ratio or body-fat percentage for a fuller picture.</li>
</ul>
<p><em>This article is for general information and is not medical advice.</em></p>
`,
  },
  {
    slug: "how-much-house-can-you-afford",
    title: "How Much House Can I Afford in 2026?",
    excerpt:
      "Use the 28/36 rule, your down payment and today's mortgage rates to estimate a safe home-buying budget for your income and debts.",
    category: "Finance",
    read_minutes: 7,
    cover_emoji: "🏠",
    related_calculator_url: "/calculators/finance/home-affordability-calculator",
    featured: true,
    published_at: "2025-02-01",
    updated_at: "2026-10-01",
    content: `
<p>The price a lender will approve and the price you can comfortably afford are often two different numbers. This guide walks through the rules lenders use, the costs people forget, and a worked example, so you can set a budget before you start touring homes.</p>

<h2>The 28/36 rule</h2>
<p>Most conventional lenders start from two debt-to-income (DTI) ratios:</p>
<ul>
  <li><strong>Front-end ratio (28%):</strong> your total monthly housing cost, meaning principal, interest, property tax, homeowners insurance and any HOA or PMI, should stay at or below 28% of gross monthly income.</li>
  <li><strong>Back-end ratio (36%):</strong> housing plus all other monthly debt payments (car loans, student loans, credit-card minimums) should stay at or below 36%.</li>
</ul>
<p>Lenders can approve higher ratios. FHA loans and some conventional programs go to 43–50% back-end DTI. But 28/36 is a sensible ceiling for a budget that still leaves room to save.</p>

<h2>A worked example</h2>
<p>Suppose a household earns <strong>$100,000 a year</strong> ($8,333 a month) and pays $450 a month on a car loan.</p>
<ul>
  <li>28% front-end limit: $8,333 × 0.28 = <strong>$2,333</strong> for total housing.</li>
  <li>36% back-end limit: $8,333 × 0.36 = $3,000, minus the $450 car payment = <strong>$2,550</strong>.</li>
</ul>
<p>The lower of the two, $2,333, is the monthly housing budget. If property tax, insurance and HOA come to about $600 a month, that leaves roughly $1,733 for principal and interest. At a 6.5% fixed rate over 30 years, $1,733 a month supports a loan of about $274,000. With a 10% down payment, that points to a home price of around <strong>$305,000</strong>. With 20% down (no PMI), it rises to about $342,000.</p>
<p>Rates move every day, so plug in a current quote. Each 1 percentage point change in the rate shifts the affordable loan amount by roughly 10–12%.</p>

<h2>Costs people forget</h2>
<ul>
  <li><strong>Closing costs:</strong> typically 2–5% of the loan amount, paid at closing.</li>
  <li><strong>Private mortgage insurance (PMI):</strong> usually required on conventional loans with less than 20% down, often 0.3–1.5% of the loan a year.</li>
  <li><strong>Maintenance:</strong> budget around 1–2% of the home's value each year for repairs.</li>
  <li><strong>Higher utilities and insurance</strong> than you pay as a renter, especially in larger or older homes.</li>
  <li><strong>An emergency fund:</strong> keep 3–6 months of expenses after your down payment and closing costs.</li>
</ul>

<h2>How to raise your budget safely</h2>
<ul>
  <li><strong>Pay down other debt</strong> first. Every $100 of monthly debt you clear frees up $100 of back-end capacity.</li>
  <li><strong>Improve your credit score.</strong> A higher score usually means a lower rate.</li>
  <li><strong>Save a larger down payment</strong> to shrink the loan and avoid PMI.</li>
  <li><strong>Shop several lenders</strong> on the same day and compare the APR, not just the rate.</li>
</ul>

<h2>Key takeaways</h2>
<ul>
  <li>Keep total housing costs at or below about 28% of gross income, and all debt at or below about 36%.</li>
  <li>Budget for taxes, insurance, PMI, closing costs and maintenance, not just the mortgage payment.</li>
  <li>Run your own numbers with a current rate quote before you start house-hunting.</li>
</ul>
<p><em>This article is for general information and is not financial advice. Talk to a licensed lender about your situation.</em></p>
`,
  },
  {
    slug: "power-of-compound-interest",
    title: "The Power of Compound Interest Explained",
    excerpt:
      "How compound interest works, why starting early matters so much, and worked examples showing how regular saving grows over time.",
    category: "Finance",
    read_minutes: 6,
    cover_emoji: "📈",
    related_calculator_url: "/calculators/finance/compound-interest-calculator",
    featured: false,
    published_at: "2025-03-01",
    updated_at: "2026-10-01",
    content: `
<p>Compound interest means earning interest on your interest. Each period's earnings are added to your balance, so the next period's earnings are calculated on a larger amount. Over long periods, that snowball effect does more of the work than your own contributions.</p>

<h2>The formula</h2>
<p>For a single lump sum, the future value is:</p>
<p><code>A = P × (1 + r/n)<sup>n×t</sup></code></p>
<ul>
  <li><strong>P</strong> is the starting principal</li>
  <li><strong>r</strong> is the annual interest rate as a decimal (7% = 0.07)</li>
  <li><strong>n</strong> is the number of compounding periods per year (12 for monthly)</li>
  <li><strong>t</strong> is the number of years</li>
</ul>
<p>$10,000 at 7% compounded annually for 30 years grows to $10,000 × 1.07³⁰ ≈ <strong>$76,123</strong>. With simple interest (interest on the original $10,000 only), it would be $10,000 + 30 × $700 = $31,000.</p>

<h2>The Rule of 72</h2>
<p>To estimate how long money takes to double, divide 72 by the annual rate. At 6% it takes about 12 years. At 9% it takes about 8. This shortcut makes it easy to compare options in your head.</p>

<h2>Why starting early matters</h2>
<p>Compare two savers who each earn 7% a year, compounded monthly:</p>
<table>
  <thead><tr><th></th><th>Saver A</th><th>Saver B</th></tr></thead>
  <tbody>
    <tr><td>Saves $300/month</td><td>Ages 25–35 (10 years)</td><td>Ages 35–65 (30 years)</td></tr>
    <tr><td>Total contributed</td><td>$36,000</td><td>$108,000</td></tr>
    <tr><td>Balance at 65</td><td>≈ $421,000</td><td>≈ $366,000</td></tr>
  </tbody>
</table>
<p>Saver A stops contributing at 35 and still ends up ahead, because the early deposits get 30 extra years to compound. Time in the market is the biggest lever most people have.</p>

<h2>Compounding frequency</h2>
<p>More frequent compounding helps, but less than you might expect. $10,000 at 5% for 10 years grows to $16,289 compounded annually, $16,470 monthly, and $16,487 daily. The rate and the time horizon matter far more than the frequency. When comparing savings accounts, look at the APY, which already includes the effect of compounding.</p>

<h2>Compounding works against you too</h2>
<p>Credit-card balances compound as well, often at 20–30% APR. A $5,000 balance at 24% that you only make minimum payments on can take well over a decade to clear and cost thousands in interest. Paying off high-interest debt is effectively a guaranteed return at that rate.</p>

<h2>Key takeaways</h2>
<ul>
  <li>Compound growth accelerates over time, so start as early as you can, even with small amounts.</li>
  <li>The rate of return and the number of years matter more than how often interest compounds.</li>
  <li>Fees and inflation compound too. A 1% annual fee can take a large share of long-run returns.</li>
</ul>
<p><em>Examples are illustrative. Investment returns are not guaranteed, and past performance does not predict future results.</em></p>
`,
  },
];

export async function getArticles(): Promise<Article[]> {
  const remote = await getSupabaseArticles();
  const bySlug = new Map(LOCAL_ARTICLES.map((a) => [a.slug, a]));
  for (const a of remote) bySlug.set(a.slug, a);
  return [...bySlug.values()].sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
}
