import PaintCalculator from "@/components/calcs/housing/paint-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/paint-calculator";
const TITLE = "Paint Calculator – Gallons Needed for Walls & Ceilings | CalcDigi";
const DESCRIPTION =
  "Free paint calculator: determine exact gallons of interior paint and primer required for walls, ceilings, and trim with door and window deductions, coats, and cost estimation.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Paint Calculator"
      intro="Calculate exact paint gallons and primer needed for walls and ceilings with automatic window, door, and trim deductions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Gallons = Ceil([Net Wall Sq Ft * Coats] / 350)"
      related={[
        { href: "/calculators/housing/room-area-calculator", icon: "📐", name: "Room Area" },
        { href: "/calculators/housing/flooring-calculator", icon: "🧱", name: "Flooring Calculator" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📏", name: "Square Footage" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/electricity-cost-calculator", icon: "⚡", name: "Electricity Cost" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How many square feet does one gallon of paint cover?",
          a: "One standard gallon of interior architectural paint covers approximately 350 to 400 square feet on smooth, pre-primed drywall. On textured walls (such as knockdown, orange peel, or rough plaster) or porous raw drywall, coverage drops to 250 to 300 square feet per gallon.",
        },
        {
          q: "Do I always need 2 coats of paint?",
          a: "For virtually all professional interior jobs, two coats are required to achieve true color depth, hide roller stipple, and deliver maximum sheen uniformity and washable durability. A single coat is only acceptable when refreshing the exact same color and brand over an undamaged surface.",
        },
        {
          q: "When is a separate primer coat necessary?",
          a: "You need a dedicated primer when painting over raw unprimed drywall or fresh joint compound, covering water or smoke stains, painting over high-gloss enamel, or making a radical color shift (such as dark navy to pure white).",
        },
        {
          q: "How do I calculate paint for doors, baseboards, and window trim?",
          a: "As a rule of thumb, trim and baseboards require 1 quart to 1/2 gallon of semi-gloss enamel per standard 12×14 room. Standard interior doors require approximately 1 quart per door for two coats.",
        },
        {
          q: "What is the 350 square foot rule?",
          a: "The 350 rule is the industry standard benchmark used by the Painting and Decorating Contractors of America (PDCA): Total Net Square Feet × Number of Coats ÷ 350 = Gallons of Paint to Purchase (rounded up to the nearest whole gallon).",
        },
        {
          q: "How much paint should I save for future touch-ups?",
          a: "Keep at least 1 quart to 1/2 gallon of leftover paint stored in an airtight container in a climate-controlled room (never let latex paint freeze in an unheated garage). Stir or shake thoroughly before using for touch-ups.",
        },
      ]}
      article={
        <>
          {/* Sleek Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                PDCA Standard P1 Aligned
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">Painting &amp; Decorating Contractors of America Coverage Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Architectural Coatings Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate How Much Paint You Need</h2>
          <p>
            Painting is the most cost-effective home improvement project, but running out of paint midway through a wall
            causes uneven &ldquo;lap marks&rdquo; and color mismatch between different store batches. Conversely, buying
            excess custom-tinted cans wastes money because custom paint cannot be returned.
          </p>
          <p>
            To calculate paint accurately, determine your room perimeter, multiply by wall height, subtract window and door
            cutouts, multiply by the number of coats, and divide by 350 square feet per gallon.
          </p>

          {/* Graph #2: Authoritative Visual Paint Sheen & Coverage Matrix */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Paint Sheen Spectrum (Reflectivity vs Scrubbability &amp; Application Guide)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual benchmark comparing light reflectance value (LRV) and washability across 5 core paint finishes.
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                PDCA Architectural Matrix
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[640px]" viewBox="0 0 720 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 5 columns for Sheens */}
                {/* 1. Flat/Matte */}
                <rect x="20" y="25" width="120" height="150" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
                <rect x="35" y="35" width="90" height="22" rx="4" fill="#64748b" />
                <text x="80" y="50" fontSize="11" fill="#ffffff" textAnchor="middle" fontWeight="bold">Flat / Matte</text>
                <text x="80" y="78" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">0–5% Sheen</text>
                <text x="80" y="103" fontSize="10" fill="#64748b" textAnchor="middle">Low Washability</text>
                <text x="80" y="128" fontSize="10" fill="#10b981" textAnchor="middle">Hides Wall Flaws</text>
                <text x="80" y="156" fontSize="10" fill="#334155" textAnchor="middle" fontWeight="bold">Ceilings, Adult Bed</text>

                {/* 2. Eggshell */}
                <rect x="160" y="25" width="120" height="150" rx="8" fill="#f0fdf4" stroke="#bbf7d0" />
                <rect x="175" y="35" width="90" height="22" rx="4" fill="#10b981" />
                <text x="220" y="50" fontSize="11" fill="#ffffff" textAnchor="middle" fontWeight="bold">Eggshell</text>
                <text x="220" y="78" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">10–25% Sheen</text>
                <text x="220" y="103" fontSize="10" fill="#64748b" textAnchor="middle">Moderate Wash</text>
                <text x="220" y="128" fontSize="10" fill="#10b981" textAnchor="middle">Soft Warm Glow</text>
                <text x="220" y="156" fontSize="10" fill="#334155" textAnchor="middle" fontWeight="bold">Living, Bedrooms</text>

                {/* 3. Satin */}
                <rect x="300" y="25" width="120" height="150" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
                <rect x="315" y="35" width="90" height="22" rx="4" fill="#2563eb" />
                <text x="360" y="50" fontSize="11" fill="#ffffff" textAnchor="middle" fontWeight="bold">Satin</text>
                <text x="360" y="78" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">25–35% Sheen</text>
                <text x="360" y="103" fontSize="10" fill="#64748b" textAnchor="middle">High Scrub</text>
                <text x="360" y="128" fontSize="10" fill="#2563eb" textAnchor="middle">Resists Moisture</text>
                <text x="360" y="156" fontSize="10" fill="#334155" textAnchor="middle" fontWeight="bold">Kitchen, Hallways</text>

                {/* 4. Semi-Gloss */}
                <rect x="440" y="25" width="120" height="150" rx="8" fill="#faf5ff" stroke="#e9d5ff" />
                <rect x="455" y="35" width="90" height="22" rx="4" fill="#8b5cf6" />
                <text x="500" y="50" fontSize="11" fill="#ffffff" textAnchor="middle" fontWeight="bold">Semi-Gloss</text>
                <text x="500" y="78" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">35–70% Sheen</text>
                <text x="500" y="103" fontSize="10" fill="#64748b" textAnchor="middle">Very Durable</text>
                <text x="500" y="128" fontSize="10" fill="#8b5cf6" textAnchor="middle">Wipe Clean</text>
                <text x="500" y="156" fontSize="10" fill="#334155" textAnchor="middle" fontWeight="bold">Bathrooms, Trim</text>

                {/* 5. High Gloss */}
                <rect x="580" y="25" width="120" height="150" rx="8" fill="#fffbeb" stroke="#fde68a" />
                <rect x="595" y="35" width="90" height="22" rx="4" fill="#f59e0b" />
                <text x="640" y="50" fontSize="11" fill="#ffffff" textAnchor="middle" fontWeight="bold">High Gloss</text>
                <text x="640" y="78" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">70%+ Sheen</text>
                <text x="640" y="103" fontSize="10" fill="#64748b" textAnchor="middle">Ultra Washable</text>
                <text x="640" y="128" fontSize="10" fill="#f59e0b" textAnchor="middle">Glass-Like Shine</text>
                <text x="640" y="156" fontSize="10" fill="#334155" textAnchor="middle" fontWeight="bold">Cabinets, Doors</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Higher gloss increases durability and stain resistance, while lower sheens hide drywall taping flaws and texture inconsistencies.
            </p>
          </div>

          <h2>Formulas for Paint Calculation</h2>
          <Formula>
            Room Perimeter = 2 × (Length + Width)
          </Formula>
          <Formula>
            Gross Wall Area = Perimeter × Ceiling Height
          </Formula>
          <Formula>
            Net Wall Area = Gross Wall Area - [(Doors × 21 sq ft) + (Windows × 15 sq ft)]
          </Formula>
          <Formula>
            Gallons Required = Ceil([Net Wall Area × Number of Coats] ÷ 350)
          </Formula>

          <h2>Paint Grade &amp; Cost Estimation Guide</h2>
          <DataTable
            head={["Paint Quality Tier", "Avg Cost per Gallon", "Resin Type &amp; Solids", "Recommended Usage"]}
            rows={[
              ["Contractor Grade", "$25 – $35", "Vinyl acrylic (low volume solids ~30%)", "Rental unit refreshes, flipping on budget"],
              ["Mid-Grade Interior (Behr Premium Plus / Valspar)", "$38 – $48", "100% Acrylic latex (~35-38% solids)", "Standard residential bedrooms, living rooms, hallways"],
              ["Premium (Benjamin Moore Regal / SW Duration)", "$60 – $80", "Advanced ceramic / cross-linking acrylic (~40% solids)", "High-traffic family homes, stain-prone dining rooms"],
              ["Ultra-Luxury (Farrow & Ball / BM Aura)", "$110 – $140", "Proprietary rich pigment micro-emulsion", "Designer focal rooms, architectural feature walls"],
            ]}
            highlight={1}
          />

          <h2>Step-by-Step Practical Calculation Example</h2>
          <p>
            Let&rsquo;s calculate the paint required for a standard <strong>14 ft × 12 ft bedroom</strong> with{" "}
            <strong>8-foot ceilings</strong>, <strong>1 door</strong>, and <strong>2 windows</strong>, applying{" "}
            <strong>2 coats</strong>:
          </p>
          <ol>
            <li><strong>Perimeter:</strong> 2 × (14 + 12) = 52 linear ft.</li>
            <li><strong>Gross Walls:</strong> 52 ft × 8 ft = 416 sq ft.</li>
            <li><strong>Openings Deducted:</strong> (1 × 21) + (2 × 15) = 51 sq ft.</li>
            <li><strong>Net Single Coat:</strong> 416 - 51 = <strong>365 sq ft</strong>.</li>
            <li><strong>Two Coats:</strong> 365 sq ft × 2 = <strong>730 total sq ft</strong> to cover.</li>
            <li><strong>Gallons to Buy:</strong> 730 ÷ 350 = 2.08 gallons → Round up to <strong>3 gallons</strong>.</li>
          </ol>
          <p>
            Measuring full rooms before buying paint? Check room perimeter with our{" "}
            <a href="/calculators/housing/room-area-calculator">room area calculator</a>, budget new baseboards on the{" "}
            <a href="/calculators/housing/flooring-calculator">flooring calculator</a>, or evaluate full project budgets on our{" "}
            <a href="/calculators/housing/renovation-cost-calculator">renovation cost calculator</a>.
          </p>
        </>
      }
    >
      <PaintCalculator />
    </CalcPage>
  );
}
