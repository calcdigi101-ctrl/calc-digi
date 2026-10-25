import type { Metadata } from "next";
import StructuralSteelCalculator from "@/components/calcs/engineering/structural-steel-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SteelSectionStrengthWeightSpectrumChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/structural-steel-calculator";
const TITLE = "Structural Steel Calculator — Column Buckling & AISC Section Capacity | CalcDigi";
const DESCRIPTION =
  "Calculate structural steel column axial compression capacity, Euler critical elastic buckling load, effective slenderness ratio (KL/r), AISC 360-16 ASD/LRFD allowable stress, and plastic flexural moment for W-beams, HSS tubes, and angles.";

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

const RELATED_CALCULATORS = [
  { href: "/calculators/engineering/beam-load-calculator", icon: "📐", name: "Beam Deflection & Bending Stress" },
  { href: "/calculators/engineering/bolt-torque-calculator", icon: "🔩", name: "Bolt Torque & Preload Force" },
  { href: "/calculators/engineering/concrete-mix-calculator", icon: "🧱", name: "Concrete Footing Mix Calculator" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Axial Compression Force Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📏", name: "Diagonal Truss Geometry Calculator" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "⛰️", name: "Elevation Grade & Slope Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is Euler's critical column buckling formula?",
    a: "Euler's elastic buckling load equation predicts the critical axial compressive load at which a slender column buckles elastically: P_cr = (pi^2 * E * I) / (K * L)^2 = (pi^2 * E * A) / (K * L / r)^2. Here, E is the elastic modulus (200 GPa / 29,000 ksi for structural steel), I is the second moment of area about the weak axis, A is cross-sectional area, K is the effective length factor based on boundary end restraints, L is unbraced clear length, and r = sqrt(I/A) is radius of gyration.",
  },
  {
    q: "What are the effective length factors (K) for different column end support conditions?",
    a: "Under AISC 360-16 Commentary Table C-A-1.1, the theoretical and design K-factors are: Pinned-Pinned (both ends free to rotate) K = 1.0 (design 1.0); Fixed-Fixed (both ends clamped against rotation and translation) theoretical K = 0.5 (design 0.65); Fixed-Pinned theoretical K = 0.7 (design 0.80); and Fixed-Free Cantilever theoretical K = 2.0 (design 2.10). For sway-permitted moment frames, K always exceeds 1.0.",
  },
  {
    q: "What is the maximum allowable slenderness ratio (KL/r) for structural steel columns?",
    a: "AISC 360-16 Section E2 recommends that the effective slenderness ratio (KL/r) for compression members not exceed 200: KL/r <= 200. While not an absolute strength limit, exceeding 200 makes members excessively flexible during fabrication, shipping, and erection, and drastically degrades compressive capacity due to initial geometric out-of-straightness.",
  },
  {
    q: "What is the difference between elastic buckling and inelastic column buckling?",
    a: "Elastic buckling occurs in slender columns where the slenderness ratio KL/r > 4.71 * sqrt(E / F_y) (approximately 133 for 50 ksi steel). The column buckles while material fibers remain below yield strength. Inelastic buckling occurs in stocky or intermediate columns (KL/r <= 133) where outer fibers yield under residual stresses before buckling ensues, governed by parabolic AISC equations.",
  },
  {
    q: "Why is ASTM A992 the universal standard for wide-flange (W-shape) structural steel?",
    a: "ASTM A992 replaced ASTM A36 and A572 Grade 50 as the preferred material specification for rolled wide-flange shapes in the late 1990s. A992 specifies a minimum yield strength of 50 ksi (345 MPa), a maximum yield-to-tensile ratio of 0.85 (ensuring ductile plastic deformation before fracture), and tight chemical composition controls that guarantee exceptional field weldability.",
  },
  {
    q: "What is the difference between Allowable Strength Design (ASD) and LRFD in steel design?",
    a: "In ASD (Allowable Strength Design), unfactored nominal service loads are compared against nominal material strength divided by a safety factor Omega (typically Omega_c = 1.67 for column compression). In LRFD (Load and Resistance Factor Design), service loads are multiplied by load factors (1.2 Dead + 1.6 Live) and compared against nominal strength multiplied by a resistance factor phi (phi_c = 0.90 for compression). Both methods yield virtually identical structural safety margins.",
  },
];

export default function StructuralSteelPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Structural Steel Calculator"
      intro="Calculate structural steel column axial compression capacity, Euler critical elastic buckling load, effective slenderness ratio (KL/r), AISC 360-16 ASD/LRFD allowable stress, and plastic flexural moment for W-beams, HSS tubes, and angles."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-800 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-500/30">
                <svg className="size-3.5 shrink-0 text-slate-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                AISC &amp; Eurocode 3 Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">AISC 360-16 Chapter E (Compression) &amp; Chapter F (Flexure)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Structural Mechanics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Steel Column Capacity and Buckling Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Structural steel column capacity is governed by the <strong>slenderness ratio (KL / r)</strong>, where <em>K</em> is the effective boundary length factor, <em>L</em> is unbraced height, and <em>r</em> is weak-axis radius of gyration. Euler elastic critical stress is <strong>F_e = (π² · E) / (KL / r)²</strong>. For intermediate columns (<em>KL/r ≤ 4.71√(E/Fy)</em>), AISC 360-16 Chapter E mandates the inelastic critical stress equation: <strong>F_cr = [0.658^(Fy / Fe)] · Fy</strong>. Allowable design axial capacity in ASD is <strong>P_allow = (F_cr · A) / 1.67</strong>. Check lateral beam deflection with our <a href="/calculators/engineering/beam-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">beam load calculator</a>, size base plate anchor bolts with our <a href="/calculators/engineering/bolt-torque-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">bolt torque calculator</a>, or design foundation footings with our <a href="/calculators/engineering/concrete-mix-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concrete mix calculator</a>.
            </p>
          </div>

          <h2>Wide-Flange Section Plastic Moment vs. Weight Spectrum</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <SteelSectionStrengthWeightSpectrumChart />
          </div>

          <p>
            Structural steel is the premier framing material for high-rise commercial towers, long-span stadiums, industrial manufacturing plants, and seismic-resistant bridges. With an ultimate tensile strength exceeding 450 MPa and an elastic modulus of 200 GPa, steel provides unrivaled structural efficiency. However, because steel members are thin-walled and slender, compression members are acutely vulnerable to instability phenomena including flexural column buckling, torsional buckling, and local plate wrinkling.
          </p>
          <p>
            In building design, column stability is determined by weak-axis radius of gyration <code>r_y = sqrt(I_y / A)</code>. Providing intermediate lateral bracing along the weak axis cuts effective length <em>L_y</em> in half, increasing Euler critical buckling load fourfold. To calculate applied vertical dead and live forces, use our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>, evaluate diagonal truss bracings using our <a href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</a>, and calculate terrain grade changes with our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AISC 360-16 Column Compression &amp; Buckling Equations</div>
            Slenderness = (K * L) / r
            <br />
            F_e = (pi^2 * E) / (Slenderness)^2
            <br />
            If (KL/r &lt;= 4.71 * sqrt(E / F_y)):
            <br />
            &nbsp;&nbsp;F_cr = [0.658^(F_y / F_e)] * F_y (Inelastic Buckling)
            <br />
            Else:
            <br />
            &nbsp;&nbsp;F_cr = 0.877 * F_e (Elastic Buckling)
            <br />
            P_n = F_cr * A_g
            <br />
            P_allow_ASD = P_n / 1.67
            <br />
            P_design_LRFD = 0.90 * P_n
          </Formula>

          <h2>AISC Effective Length Factors (K) and Boundary Conditions</h2>
          <p>
            The boundary conditions restraining a column's ends exert a dominant influence on its resistance to lateral buckling. Clamping column ends against rotation forces inflection points into the member, effectively shortening its buckling length.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">AISC Effective Length Factors (K) for Idealized Column Boundary Conditions</p>
          <DataTable
            head={["Boundary Condition", "Theoretical K", "AISC Recommended Design K", "Buckled Shape", "Practical Application"]}
            rows={[
              ["Pinned - Pinned", "1.00", "1.00", "Single half-sine wave", "Standard simple shear connections with seated web angles"],
              ["Fixed - Pinned", "0.70", "0.80", "Inflection point at 0.7L", "Continuous column passing through braced floor level with pinned base"],
              ["Fixed - Fixed", "0.50", "0.65", "Two inflection points", "Welded heavy moment frame column anchored to rigid concrete grade beams"],
              ["Fixed - Free (Cantilever)", "2.00", "2.10", "Quarter sine wave", "Flagpole, cantilever sign post, or industrial crane support column"],
              ["Fixed - Guided (Sidesway)", "1.00", "1.20", "S-curve with translation", "Unbraced multi-story portal frame column undergoing drift"],
            ]}
          />

          <h2>Local Flange and Web Buckling Considerations</h2>
          <p>
            In addition to global member buckling, cross-sections must be verified against local buckling under AISC Table B4.1a. Wide-flange beams with wide, thin flanges or tall, thin webs can experience localized plate wrinkling before the overall column buckles. Sections are classified as <em>compact</em>, <em>non-compact</em>, or <em>slender</em> based on width-to-thickness ratios (<em>b/t</em> and <em>h/t_w</em>). For standard structural hot-rolled W-shapes (such as W14×90 and W12×65), flanges and webs are proportioned to ensure compact performance without premature local buckling failure.
          </p>
        </>
      }
    >
      <StructuralSteelCalculator />
    </CalcPage>
  );
}
