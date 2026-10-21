import type { Metadata } from "next";
import { Suspense } from "react";
import { BodyFatCalculator } from "@/components/flagship/health/BodyFatCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { NavyBodyFatCircumferenceChart } from "@/components/flagship/health/editorial-charts/NavyBodyFatCircumferenceChart";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/body-fat-calculator";
const TITLE = "Body Fat Calculator – US Navy Method & Body Composition | CalcDigi";
const DESCRIPTION =
  "Free body fat percentage calculator using the clinically validated US Navy circumference method. Calculate body fat mass, lean body mass, and health categories with interactive charts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const FAQ_ITEMS = [
  {
    q: "How accurate is the US Navy body fat method?",
    a: "The US Navy circumference formula is accurate within 3% to 4% of a clinical DEXA scan or hydrostatic weighing for the majority of adults. Its accuracy depends heavily on using a non-stretch measuring tape pulled taut against bare skin without compressing soft tissues.",
  },
  {
    q: "What is an ideal body fat percentage for men?",
    a: "For men, the American Council on Exercise (ACE) defines 14% to 17% as fitness level, 6% to 13% for competitive athletes, and 18% to 24% as the healthy average. Body fat percentages above 25% for men are classified as clinically obese.",
  },
  {
    q: "What is an ideal body fat percentage for women?",
    a: "For women, ACE defines 21% to 24% as fitness level, 14% to 20% for athletes, and 25% to 31% as healthy average. Women require higher baseline essential fat (10% to 13%) for endocrine function and reproductive health. Body fat above 32% is classified as obese.",
  },
  {
    q: "Why do women need to measure hip circumference while men do not?",
    a: "Biological sex influences body fat distribution patterns. Estrogen causes women to store subcutaneous adipose tissue primarily around the hips, buttocks, and thighs (gynoid pattern), while testosterone in men results in visceral and subcutaneous fat accumulation around the waist and abdomen (android pattern). The US Navy equation accounts for this dimorphism.",
  },
  {
    q: "Where exactly should I measure my waist for body fat calculation?",
    a: "For men, measure horizontally around the abdomen at the level of the navel (belly button), with arms relaxed at the sides. For women, measure at the narrowest point of the torso (natural waistline), usually located between the lowest rib and the iliac crest (hip bone).",
  },
  {
    q: "How does body fat percentage differ from BMI?",
    a: "Body Mass Index (BMI) only evaluates total weight relative to height (kg/m²), failing to differentiate between dense muscle mass, skeletal bone, and adipose tissue. A heavily muscled athlete may register as 'overweight' or 'obese' on BMI despite having low body fat, whereas a body fat calculator measures actual tissue composition.",
  },
];

const ACE_ROWS = [
  ["Essential Fat", "2% – 5%", "10% – 13%", "Critical for neurological, cellular, and endocrine survival."],
  ["Athletes", "6% – 13%", "14% – 20%", "High muscular definition, vascularity, and competitive athletic conditioning."],
  ["Fitness", "14% – 17%", "21% – 24%", "Fit, toned appearance with visible muscle contours and optimal metabolic health."],
  ["Average / Healthy", "18% – 24%", "25% – 31%", "Normal, healthy population baseline with low cardiovascular risk."],
  ["Obese", "25%+", "32%+", "Elevated cardiometabolic, diabetic, and hypertension risk factors."],
];

const METHOD_COMPARISON = [
  ["DEXA Scan (Dual-Energy X-ray)", "Gold Standard (±1.5%)", "Clinical X-ray laboratory", "$100 – $250 per scan"],
  ["Hydrostatic Underwater Weighing", "Near Gold Standard (±1.5%)", "Submersion tank water displacement", "$50 – $150 per test"],
  ["US Navy Circumference (This Tool)", "High Practicality (±3% to 4%)", "Flexible tape measure (Neck, Waist, Hip)", "100% Free instant online"],
  ["Bioelectrical Impedance (BIA)", "Moderate (±4% to 6%)", "Smart scale handheld electrodes", "Varies wildly with hydration status"],
  ["Skinfold Calipers (3-site/7-site)", "Moderate to High (±3.5%)", "Pinch calipers at specific skin sites", "Requires trained clinical technician"],
];

const RELATED = [
  { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
  { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
  { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
  { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
  { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
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
                { "@type": "ListItem", position: 3, name: "Body Fat Calculator", item: `${SITE_URL}${PATH}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Body Fat Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              applicationCategory: "HealthApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "HowTo",
              name: "How to Measure Body Fat Percentage Using a Tape Measure",
              description: "Step-by-step instructions for taking accurate neck, waist, and hip measurements for the US Navy body fat formula.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Measure Neck Circumference",
                  text: "Place the measuring tape horizontally around your neck, starting just below the larynx (Adam's apple), with your head upright looking forward.",
                },
                {
                  "@type": "HowToStep",
                  name: "Measure Waist Circumference",
                  text: "For men, measure around the abdomen at navel level. For women, measure at the narrowest point of the natural waistline between ribs and hips.",
                },
                {
                  "@type": "HowToStep",
                  name: "Measure Hip Circumference (Women Only)",
                  text: "Stand with feet together and measure horizontally around the widest part of the buttocks and hips.",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      <CalculatorPage
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/pages/health", label: "Health" },
          { label: "Body Fat Calculator" },
        ]}
        title="Body Fat Calculator"
        intro="Calculate your body fat percentage, lean body mass, and fat mass with the clinically verified US Navy circumference formula. Includes interactive visual composition charts and ACE health targets."
      >
        <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
          <BodyFatCalculator />
        </Suspense>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡</span> Related Calculators
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
          </div>
          <RelatedLinks links={RELATED} />
        </section>

        <Editorial>
          {/* AI Overview Direct Answer Box (GEO Optimized) */}
          <div className="not-prose my-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/20 p-5 sm:p-6 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <span>⚡ Quick Answer · Body Fat Percentage (BFP)</span>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              <strong>Body Fat Percentage</strong> represents the total mass of adipose fat tissue divided by total body weight. Unlike the standard <a href="/calculators/health/bmi-calculator">BMI Calculator</a>, which only factors height and weight, body fat percentage distinguishes between metabolically active <a href="/calculators/health/lean-body-mass-calculator">lean muscle mass</a>, bones, water, and fat stores. Pair this with our <a href="/calculators/health/waist-to-hip-ratio-calculator">Waist to Hip Ratio</a> or <a href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</a> for comprehensive body composition assessment.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-emerald-100 dark:border-emerald-900/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Healthy Range (Men):</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">14% – 17%</span> (Fitness) · 18% – 24% (Average)
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Healthy Range (Women):</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">21% – 24%</span> (Fitness) · 25% – 31% (Average)
              </div>
            </div>
          </div>

          <h2>American Council on Exercise (ACE) Body Fat Categories</h2>
          <p>
            The American Council on Exercise categorizes body fat into five distinct tiers based on cardiometabolic health and physiological requirement. Women naturally possess higher baseline essential body fat than men to protect vital organs and sustain hormonal equilibrium:
          </p>
          <DataTable
            head={["Classification", "Men (% Fat)", "Women (% Fat)", "Clinical Significance"]}
            rows={ACE_ROWS}
          />

          <div className="not-prose my-8">
            <NavyBodyFatCircumferenceChart />
          </div>

          <h2>The US Navy Circumference Method Explained</h2>
          <p>
            Developed by <em>Hodgdon and Beckett</em> at the Naval Health Research Center in 1984, the US Navy formula is used by military branches worldwide to evaluate body composition without cumbersome clinical machinery. It utilizes logarithmic ratios of circumferences against overall height:
          </p>

          <h3>US Navy Formula for Men</h3>
          <Formula>
            % Fat = 495 ÷ [1.0324 − 0.19077 × log₁₀(Waist − Neck) + 0.15456 × log₁₀(Height)] − 450
          </Formula>
          <p className="text-xs text-slate-500">
            *Where measurements are taken in centimeters (cm). Waist is measured horizontally at the navel level, and neck is measured below the larynx.
          </p>

          <h3>US Navy Formula for Women</h3>
          <Formula>
            % Fat = 495 ÷ [1.29579 − 0.35004 × log₁₀(Waist + Hip − Neck) + 0.22100 × log₁₀(Height)] − 450
          </Formula>
          <p className="text-xs text-slate-500">
            *Where measurements are taken in centimeters (cm). Hip circumference accounts for female gynoid fat distribution patterns.
          </p>

          <h2>Body Composition Measurement Methods Compared</h2>
          <p>
            Different body composition assessments offer varied tradeoffs between laboratory precision, convenience, and financial cost:
          </p>
          <DataTable
            head={["Measurement Method", "Typical Accuracy", "How It Works", "Cost & Accessibility"]}
            rows={METHOD_COMPARISON}
          />

          <h2>Step-by-Step Measurement Guide for Maximum Accuracy</h2>
          <ol>
            <li>
              <strong>Use a non-elastic tape measure:</strong> A flexible cloth or fiberglass tape ensures accurate readings without stretching over time.
            </li>
            <li>
              <strong>Measure against bare skin:</strong> Take all measurements directly on skin rather than over clothing or compression garments.
            </li>
            <li>
              <strong>Keep the tape snug but uncompressed:</strong> The tape should lie flat and parallel to the floor without pinching or indenting the subcutaneous fat.
            </li>
            <li>
              <strong>Take three consecutive readings:</strong> Average the three measurements to eliminate minor breathing or postural deviations.
            </li>
          </ol>

          <Faq items={FAQ_ITEMS} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
