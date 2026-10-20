import SquareFootageCalculator from "@/components/calcs/housing/square-footage-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SquareFootageGlaChart } from "@/components/flagship/housing/editorial-charts";

const PATH = "/calculators/housing/square-footage-calculator";
const TITLE = "Square Footage Calculator – Rooms, Houses & Waste Margin | CalcDigi";
const DESCRIPTION =
  "Free square footage calculator: calculate total sq ft and square meters for rectangular rooms, L-shaped spaces, circular areas, and multi-room homes with material waste allowances.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Square Footage Calculator"
      intro="Accurately calculate square footage and square meters for single rooms, multi-room houses, L-shaped layouts, and circular spaces with custom waste factors."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Area (sq ft) = Length (ft) * Width (ft) * (1 + Waste %)"
      related={[
        { href: "/calculators/housing/room-area-calculator", icon: "📐", name: "Room Area" },
        { href: "/calculators/housing/flooring-calculator", icon: "🧱", name: "Flooring Calculator" },
        { href: "/calculators/housing/paint-calculator", icon: "🎨", name: "Paint Calculator" },
        { href: "/calculators/housing/concrete-calculator", icon: "🏗️", name: "Concrete Calculator" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/land-area-calculator", icon: "🗺️", name: "Land Area Calculator" },
      ]}
      faq={[
        {
          q: "How do I calculate square footage of an irregular or L-shaped room?",
          a: "Divide the room into separate simple geometric rectangles or triangles. Calculate the area of each section (Length × Width) individually, then sum all areas together. If you are ordering flooring or tile, add 10% to 15% to account for perimeter cutting waste.",
        },
        {
          q: "What is the ANSI Z765 standard for square footage in residential homes?",
          a: "The ANSI Z765-2021 standard is the official measurement method mandated by Fannie Mae and Freddie Mac for single-family residential appraisals. It requires measuring exterior dimensions of above-grade heated and finished living space with minimum ceiling heights of 7 feet (or 5 feet under sloped ceilings).",
        },
        {
          q: "Does a finished basement count towards official square footage?",
          a: "In real estate appraisal standards (ANSI Z765), any space where even one wall is partially below ground level is classified as Below-Grade Finished Area. While it adds substantial appraised value, it cannot be combined with Above-Grade Gross Living Area (GLA) in official MLS listings.",
        },
        {
          q: "How do I convert square feet to square meters?",
          a: "To convert square feet to square meters, multiply by 0.092903 (or divide by 10.764). For example, a 500 sq ft room equals approximately 46.45 square meters.",
        },
        {
          q: "How much extra square footage should I buy for flooring waste?",
          a: "For standard rectangular rooms with luxury vinyl plank (LVP) or laminate, buy 7% to 10% extra. For diagonal hardwood, ceramic tile with intricate grout patterns, or rooms with multiple closets and alcoves, budget 12% to 15% extra for cut waste.",
        },
        {
          q: "How many drywall sheets do I need for a ceiling or wall?",
          a: "A standard 4ft × 8ft drywall sheet covers 32 square feet. Divide total square footage by 32 and add 10% for cuts and screw margins. For 4ft × 12ft sheets (48 sq ft each), divide by 48.",
        },
      ]}
      article={
        <>
          {/* Sleek Clinical/Appraisal Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ANSI/BOMA Z765-2021 Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Aligned with <strong className="font-semibold text-slate-800 dark:text-slate-200">Fannie Mae Single-Family Appraisal Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Architectural &amp; Real Estate Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How to Calculate Square Footage</h2>
          <p>
            Square footage (sq ft or ft²) is the foundational unit of measurement in residential real
            estate, architectural planning, interior remodeling, and property taxation. Whether estimating how many boxes of
            hardwood to purchase, calculating total drywall needed for a ceiling remodel, or checking property value per square foot,
            accurate spatial measurement prevents expensive material deficits.
          </p>
          <p>
            For a standard rectangular room, simply measure the length and width in feet using a laser distance meter or tape
            measure, and multiply the two numbers:
          </p>
          <Formula>Square Footage = Length (ft) × Width (ft)</Formula>

          {/* Graph #2: Interactive visual benchmark with live mouse hover */}
          <SquareFootageGlaChart />

          <h2>Formulas for Complex Room Shapes</h2>
          <h3>1. L-Shaped or T-Shaped Rooms</h3>
          <p>
            Decompose the floor plan into two separate rectangles (A and B):
          </p>
          <Formula>Total Area = (Length_A × Width_A) + (Length_B × Width_B)</Formula>

          <h3>2. Triangular Rooms or Bay Window Alcoves</h3>
          <Formula>Area = 0.5 × Base × Height</Formula>

          <h3>3. Circular Rooms or Round Patios</h3>
          <Formula>Area = π × (Diameter ÷ 2)²</Formula>

          <h3>4. Trapezoid Rooms (Slanted Wall)</h3>
          <Formula>Area = [(Base_1 + Base_2) ÷ 2] × Height</Formula>

          <h2>Real Estate Benchmarks: Price per Square Foot by US Metro</h2>
          <p>
            Home valuation and remodeling construction costs correlate closely with geographic median price per square foot:
          </p>
          <DataTable
            head={["Metropolitan Area", "Median Price / sq ft", "Average Remodel Cost / sq ft", "Typical Lot Size"]}
            rows={[
              ["Midwest (Columbus, Indianapolis, Kansas City)", "$165 – $210", "$85 – $140", "0.20 – 0.35 acres"],
              ["South / Sunbelt (Dallas, Atlanta, Charlotte, Tampa)", "$195 – $265", "$100 – $165", "0.18 – 0.28 acres"],
              ["Mountain West (Denver, Salt Lake City, Boise)", "$275 – $360", "$130 – $210", "0.15 – 0.25 acres"],
              ["Northeast Metro (Boston, New York Metro, Philadelphia)", "$340 – $520", "$160 – $275", "0.10 – 0.20 acres"],
              ["West Coast (San Francisco, Seattle, Los Angeles)", "$480 – $850+", "$210 – $380", "0.08 – 0.16 acres"],
            ]}
          />

          <h2>Essential Measurement Rules for Homeowners</h2>
          <ul>
            <li>
              <strong>Always Deduct Large Obstacles:</strong> When purchasing flooring, measure the full room and subtract
              large stationary obstacles like kitchen islands, brick fireplace hearths, or built-in cabinetry runs.
            </li>
            <li>
              <strong>Factor in Waste Margins:</strong> Always buy 10% extra material for standard rectangular rooms. For
              rooms with 45-degree angled walls or herringbone tile layouts, increase the buffer to 15%.
            </li>
            <li>
              <strong>Measure in Inches First:</strong> If your tape measure reads in inches, multiply Length (in) × Width (in)
              and divide by 144 to get exact square footage (1 sq ft = 144 sq inches).
            </li>
          </ul>
          <p>
            Now that you know your square footage, calculate paint quantities with our{" "}
            <a href="/calculators/housing/paint-calculator">paint calculator</a>, determine materials with the{" "}
            <a href="/calculators/housing/flooring-calculator">flooring calculator</a>, or see how home dimensions impact your
            borrowing power on the <a href="/calculators/housing/home-affordability-calculator">home affordability calculator</a>.
          </p>
        </>
      }
    >
      <SquareFootageCalculator />
    </CalcPage>
  );
}
