import type { Metadata } from "next";
import { Suspense } from "react";
import { BmiCalculator } from "@/components/flagship/bmi/BmiCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { WHO_CLASSES } from "@/lib/bmi";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/bmi-calculator";
const TITLE = "BMI Calculator – Body Mass Index for Adults (US & Metric) | CalcDigi";
const DESCRIPTION =
  "Free BMI calculator for adults. Enter height and weight in ft/lbs or cm/kg to get your Body Mass Index, WHO category, healthy weight range, BMI Prime and Ponderal Index.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: PATH },
};

const FAQ = [
  {
    q: "What is a healthy BMI range for adults?",
    a: "For adults 20 and older, the WHO and CDC define a healthy (normal) BMI as 18.5 to 24.9. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is obese.",
  },
  {
    q: "How accurate is BMI?",
    a: "BMI is a quick, inexpensive screening tool, not a diagnosis. It does not measure body fat directly or account for muscle mass, bone density, or where fat is stored, so muscular people can score high and older adults with low muscle mass can score deceptively low.",
  },
  {
    q: "Is BMI calculated differently for men and women?",
    a: "No. The adult formula is identical for both sexes. At the same BMI, women typically carry more body fat than men, which is why some clinicians interpret results alongside waist circumference or body-fat measurements.",
  },
  {
    q: "What BMI is considered obese?",
    a: "A BMI of 30 or higher. The WHO subdivides it into Class I (30–34.9), Class II (35–39.9), and Class III (40 and above), with health risk rising at each class.",
  },
  {
    q: "Can children use this BMI calculator?",
    a: "The calculation works for ages 2 and up, but for children and teens (2–19) the result must be compared with age- and sex-specific CDC growth percentiles rather than the adult categories.",
  },
  {
    q: "What are BMI Prime and Ponderal Index?",
    a: "BMI Prime is your BMI divided by 25, the upper limit of the healthy range, so values from 0.74 to 1.0 are healthy. The Ponderal Index divides weight by height cubed, which scales better for very tall or very short people.",
  },
];

export default function Page() {
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
                { "@type": "ListItem", position: 2, name: "Health Calculators", item: `${SITE_URL}/pages/health` },
                { "@type": "ListItem", position: 3, name: "BMI Calculator", item: `${SITE_URL}${PATH}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "BMI Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              applicationCategory: "HealthApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <CalculatorPage
        crumbs={[{ href: "/", label: "Home" }, { href: "/pages/health", label: "Health" }, { label: "BMI Calculator" }]}
        title="BMI Calculator"
        intro="Calculate your Body Mass Index in US or metric units and see where you fall on the WHO scale, plus the healthy weight range for your height."
      >
        <Suspense fallback={<div className="mt-6 h-[520px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <BmiCalculator />
        </Suspense>

        <Editorial>
          <h2>What is BMI?</h2>
          <p>
            Body Mass Index (BMI) estimates whether your weight is in a healthy proportion to your height. It was developed
            by Belgian statistician Adolphe Quetelet in the 1830s and is used today by the World Health Organization (WHO),
            the CDC and the NIH as a first-line screen for underweight, overweight and obesity in adults.
          </p>
          <p>
            Because it needs only height and weight, BMI is fast and free to measure, which makes it useful for tracking
            trends over time. It is a screening number, not a diagnosis: a doctor will look at it alongside waist size,
            blood pressure, blood work and family history.
          </p>

          <h2>WHO BMI classification for adults</h2>
          <p>These categories apply to adults aged 20 and over, regardless of sex.</p>
          <DataTable
            head={["Classification", "BMI range (kg/m²)"]}
            rows={WHO_CLASSES.map((c) => [c.label, c.range])}
            highlight={3}
          />

          <h2>BMI formula</h2>
          <h3>Metric units</h3>
          <Formula>BMI = weight (kg) ÷ [height (m)]²</Formula>
          <p>
            Example: 70 kg and 1.75 m → 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = <strong>22.9</strong>
          </p>
          <h3>US customary units</h3>
          <Formula>BMI = 703 × weight (lbs) ÷ [height (in)]²</Formula>
          <p>
            Example: 160 lbs and 5′10″ (70 in) → 703 × 160 ÷ 4,900 = <strong>23.0</strong>. The factor 703 converts
            lb/in² to kg/m².
          </p>
          <h3>BMI Prime</h3>
          <Formula>BMI Prime = BMI ÷ 25</Formula>
          <p>
            BMI Prime expresses your BMI as a ratio of the upper healthy limit. A value of 0.74–1.00 is in the healthy
            range; 1.20 means you are 20% above it.
          </p>
          <h3>Ponderal Index</h3>
          <Formula>Ponderal Index = weight (kg) ÷ [height (m)]³</Formula>
          <p>
            Because it divides by height cubed, the Ponderal Index stays more stable for very tall and very short people,
            where standard BMI tends to over- or under-estimate. A typical adult range is roughly 11–15 kg/m³.
          </p>

          <h2>Health risks of being overweight</h2>
          <p>A BMI of 25 or higher is associated with increased risk of:</p>
          <ul>
            <li>High blood pressure and coronary heart disease</li>
            <li>Type 2 diabetes and insulin resistance</li>
            <li>Stroke and abnormal blood lipids (high LDL, low HDL, high triglycerides)</li>
            <li>Osteoarthritis, sleep apnea and other breathing problems</li>
            <li>Several cancers, including endometrial, breast, colon, kidney and liver cancer</li>
            <li>Gallbladder disease, fatty liver disease, and mental-health conditions such as depression</li>
          </ul>

          <h2>Health risks of being underweight</h2>
          <p>A BMI below 18.5 carries its own risks:</p>
          <ul>
            <li>Malnutrition, vitamin deficiencies and anemia</li>
            <li>Osteoporosis and a higher chance of bone fractures</li>
            <li>A weakened immune system and slower wound healing</li>
            <li>Fertility problems and irregular menstrual cycles</li>
            <li>Growth and development problems in children and teens</li>
          </ul>

          <h2>Limitations of BMI</h2>
          <p>BMI treats every kilogram the same, whether it is muscle, fat or bone. Keep these limits in mind:</p>
          <ul>
            <li>
              <strong>Muscular people</strong> such as athletes can be classed as overweight while having low body fat.
            </li>
            <li>
              <strong>Older adults</strong> often lose muscle with age, so a &ldquo;normal&rdquo; BMI can hide excess body
              fat.
            </li>
            <li>
              <strong>Fat distribution</strong> matters: abdominal fat carries more risk than fat on the hips. Waist
              circumference or waist-to-height ratio helps here.
            </li>
            <li>
              <strong>Ethnicity</strong> changes risk at a given BMI; for example, many people of Asian descent face higher
              metabolic risk at lower BMIs.
            </li>
            <li>
              <strong>Children and teens</strong> must be assessed with growth percentiles, and BMI is not valid during
              pregnancy.
            </li>
          </ul>
          <p>
            For a fuller picture, pair BMI with a <a href="/calculators/health/body-fat-calculator">body fat estimate</a>{" "}
            or your <a href="/calculators/health/waist-to-height-ratio-calculator">waist-to-height ratio</a>.
          </p>

          <h2>Frequently asked questions</h2>
          <Faq items={FAQ} />

          <h2>Related health calculators</h2>
          <RelatedLinks
            links={[
              { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
              { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
              { href: "/calculators/health/ideal-weight-calculator", icon: "🏋️", name: "Ideal Weight" },
              { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
              { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
              { href: "/calculators/health/weight-loss-calculator", icon: "📉", name: "Weight Loss Calculator" },
            ]}
          />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
