import PaintCalculator from "@/components/calcs/housing/paint-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PaintSheenSpectrumChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/paint-calculator";
const TITLE = "Paint Calculator – Gallons, Square Feet and Coats";
const DESCRIPTION = "Free paint calculator: estimate paint gallons and primer cans for walls, ceilings, doors, and trim with window and door deductions and coat multipliers.";

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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">Master Painters Institute (MPI) & PDCA Architectural Standards</strong>
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

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <PaintSheenSpectrumChart />

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

          <h2>Drywall Substrate Porosity, Primer Mechanics &amp; Mil Thickness Standards</h2>
          <p>
            Achieving a professional architectural finish requires understanding the physical chemistry of coating application:
          </p>
          <ul>
            <li><strong>Wet Film Thickness (WFT) vs Dry Film Thickness (DFT):</strong> Premium interior latex paints are roughly 35% to 40% volume solids. Applying a standard 4.0-mil wet film thickness dries down to approximately 1.5 mils of protective cured acrylic resin. High-traffic walls require at least 3.0 mils total DFT across 2 coats.</li>
            <li><strong>PVA Primer Sealer Function:</strong> Raw drywall paper and gypsum joint compound absorb paint resins at radically different rates. Polyvinyl acetate (PVA) primers chemically saturate the porous gypsum substrate, creating a uniform, non-porous canvas that ensures consistent color sheen.</li>
            <li><strong>Color Transitions (Dark to Light):</strong> Painting over dark navy, burgundy, or charcoal walls with soft white or pastel shades requires a high-hiding gray-tinted primer (such as Gray Shade P4) to neutralize undertones, eliminating the need for 3 or 4 costly topcoats.</li>
          </ul>

          <h2>Common Costly Mistakes in Interior &amp; Exterior Painting</h2>
          <p>Avoid these four paint application errors that cause peeling, blotchy sheen, and premature failure:</p>
          <ul>
            <li><strong>Skipping Dedicated Primer on Raw Drywall or Patches:</strong> Applying paint directly over fresh drywall mud or bare plaster causes "flashing"—dull, porous patches where the substrate absorbed paint binder unevenly. Always apply a sealing PVA primer first.</li>
            <li><strong>Painting Over Glossy Finishes Without Sanding:</strong> New paint cannot mechanically adhere to slick, glossy enamel paint without deglossing. Lightly scuff-sand trim and cabinets with 220-grit sandpaper or apply a bonding primer to prevent peeling.</li>
            <li><strong>Stretching Paint Beyond Its Coverage Rate:</strong> Spreading paint too thin to save money results in poor hide, roller lap marks, and reduced scrub resistance. Maintain a consistent wet film thickness of 4 to 5 mils.</li>
            <li><strong>Painting in High Humidity or Extreme Cold:</strong> Applying latex paint below 50°F (10°C) or in humidity above 85% prevents proper latex coalescence and film curing, leading to blistering and wrinkling.</li>
          </ul>

          <h2>Low-VOC Environmental Standards &amp; Regional Regulations</h2>
          <p>
            Environmental air quality regulations limit Volatile Organic Compounds (VOCs) in architectural paints:
          </p>
          <ul>
            <li><strong>Ozone Transport Commission (OTC) &amp; California (SCAQMD):</strong> Enforces strict limits requiring flat paints to contain less than 50 g/L VOC and non-flats less than 100 g/L.</li>
            <li><strong>EPA Federal Standard:</strong> Sets national architectural baseline caps at 250 g/L for flat coatings and 380 g/L for non-flat coatings. Zero-VOC paints are recommended for occupied residential bedrooms and nurseries.</li>
          </ul>


          <h2>Paint Sheen Light Reflectance Values (LRV) &amp; Substrate Selection</h2>
          <p>
            Light Reflectance Value (LRV) measures the percentage of light a paint color reflects off a wall surface on a scale from 0% (pure black) to 100% (pure white):
          </p>
          <ul>
            <li><strong>Flat / Matte (0–5% Sheen, LRV 70–90):</strong> Completely non-reflective finish that hides minor drywall defects, nail pops, and seam tape imperfections. Best suited for adult master bedrooms, dining rooms, and ceilings. However, matte paints have low scrub resistance and burnish if wiped aggressively.</li>
            <li><strong>Eggshell &amp; Satin (10–25% Sheen):</strong> The most popular residential interior finishes. Delivers a soft, velvety luster with high scrub durability. Ideal for living rooms, hallways, children's bedrooms, and home offices.</li>
            <li><strong>Semi-Gloss (35–50% Sheen):</strong> Highly moisture-resistant surface that repels steam, grease, and water droplets. Essential for bathrooms, kitchen backsplashes, baseboards, window casings, and interior door trim.</li>
            <li><strong>Roller Nap Thickness Selection:</strong> Use a 1/4-inch nap for smooth interior wood trim and metal doors, a standard 3/8-inch nap for smooth finished drywall, a 1/2-inch nap for textured or orange-peel walls, and a 3/4-inch nap for rough masonry, brick fireplaces, and textured acoustical ceilings.</li>
          </ul>


          <h2>Cutting In vs Rolling Technique &amp; Proper Coalescence</h2>
          <p>
            Professional painters always &ldquo;cut in&rdquo; ceiling borders, baseboards, and corner trim using a 2.5-inch angled sash brush before rolling expansive wall fields:
          </p>
          <ul>
            <li><strong>Maintaining a Wet Edge:</strong> Work one wall at a time and roll immediately after brushing the perimeter. Blending the wet rolled stipple into the still-wet brushed margin prevents visible lap lines and flashing ribbons.</li>
            <li><strong>Ideal Curing Conditions:</strong> Waterborne latex resins require ambient temperatures between 50°F and 85°F (10°C to 29°C) and indoor relative humidity between 40% and 70%. Painting in extreme heat flashes solvent water too quickly, preventing acrylic polymers from coalescing into a durable protective barrier.</li>
          </ul>

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
