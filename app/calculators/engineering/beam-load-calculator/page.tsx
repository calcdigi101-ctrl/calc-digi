import type { Metadata } from "next";
import BeamLoadCalculator from "@/components/calcs/engineering/beam-load-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BeamDeflectionStressSpectrumChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/beam-load-calculator";
const TITLE = "Beam Load Calculator — Deflection, Bending Stress & Moment | CalcDigi";
const DESCRIPTION =
  "Calculate structural beam deflection, maximum bending moment, extreme fiber stress, and support reactions for simply supported and cantilever beams under point loads and uniform distributed loads (UDL). Evaluates IBC/AISC L/360 serviceability limits.";

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
  { href: "/calculators/engineering/structural-steel-calculator", icon: "🏗️", name: "Structural Steel Column & Beam" },
  { href: "/calculators/engineering/bolt-torque-calculator", icon: "🔩", name: "Bolt Torque & Preload Force" },
  { href: "/calculators/engineering/concrete-mix-calculator", icon: "🧱", name: "Concrete Mix Design & Bags" },
  { href: "/calculators/physics/force-calculator", icon: "⚡", name: "Force & Newton Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem Calculator" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "⛰️", name: "Elevation Grade & Slope Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the formula for beam deflection under a center point load?",
    a: "For a simply supported beam of span L with a concentrated center point load P, the maximum deflection occurring at midspan (x = L/2) is delta_max = (P * L^3) / (48 * E * I). Here, P represents applied load in Newtons, L is unsupported clear span in meters, E is modulus of elasticity in Pascals (e.g., 200 GPa for structural steel), and I is area moment of inertia in m^4. The deflection scales with the third power of span, meaning doubling span increases deflection eightfold.",
  },
  {
    q: "How does beam deflection differ for a uniformly distributed load (UDL)?",
    a: "Under a uniformly distributed load w (in N/m or kN/m) along the entire simply supported length, the maximum midspan deflection is delta_max = (5 * w * L^4) / (384 * E * I). For an equivalent total load (where total W = w * L = P), a distributed load causes approximately 38% less midspan deflection than a concentrated center point load because weight is spread closer to the rigid end supports.",
  },
  {
    q: "Why do cantilever beams deflect so much more than simply supported beams?",
    a: "A cantilever beam fixed at one end with a tip load P deflects by delta_max = (P * L^3) / (3 * E * I). Comparing this to a simply supported center point load (P * L^3 / 48EI), the cantilever beam deflects exactly 16 times more under identical load, span, and cross-section geometry. Cantilever beams lack intermediate boundary restraint, producing massive flexural curvature and hogging moments concentrated at the fixed root.",
  },
  {
    q: "What is the allowable deflection limit according to building codes (L/360, L/240)?",
    a: "The International Building Code (IBC Table 1604.3) and AISC 360-16 specify serviceability deflection ceilings to prevent architectural cracking and excessive floor bounce. For structural floor joists carrying live pedestrian loads, the ceiling is span divided by 360 (L/360). For total dead plus live load on plastered ceilings, L/240 applies. For roof purlins without plaster ceilings, L/180 is typically permitted.",
  },
  {
    q: "How is maximum bending stress (flexural stress) calculated in a beam?",
    a: "Flexural bending stress is governed by the Euler-Bernoulli beam equation: sigma = (M * c) / I, or sigma = M / S, where M is maximum bending moment (N·m), c is distance from the neutral axis to the extreme outer tension/compression fiber (m), I is moment of inertia (m^4), and S = I/c is elastic section modulus (m^3). Maximum stress must remain below the design yield strength divided by safety factor (e.g., 150 MPa allowable for ASTM A36 steel in ASD).",
  },
  {
    q: "How does doubling the beam depth affect stiffness compared to doubling width?",
    a: "For a rectangular cross-section, second moment of area is I = (b * h^3) / 12. Doubling beam width b merely doubles moment of inertia and doubles flexural stiffness. However, doubling beam depth (height h) increases moment of inertia by 2^3 = 8 times, providing 800% higher stiffness and an 87.5% reduction in deflection. This cubic relationship explains why structural engineers select deep I-beams rather than wide, shallow plates.",
  },
];

export default function BeamLoadPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Beam Load Calculator"
      intro="Calculate structural beam deflection, maximum flexural bending stress, internal shear, and support reactions for simply supported and cantilever beams under point and distributed loads. Includes AISC and IBC L/360 deflection serviceability checks."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-500/30">
                <svg className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Structural Engineering Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">AISC 360-16 Specification &amp; IBC Section 1604 Serviceability</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Mechanics of Materials</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Beam Deflection and Bending Stress Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              For a <strong>simply supported beam</strong> carrying a center point load <em>P</em> over clear span <em>L</em>, maximum midspan deflection is <strong>δ = (P · L³) / (48 · E · I)</strong> and maximum bending moment is <strong>M = (P · L) / 4</strong>. Maximum bending stress at the outermost fiber is governed by the flexure formula <strong>σ = (M · c) / I = M / S</strong>. Under building codes such as <strong>IBC Table 1604.3</strong>, floor live-load deflection must not exceed <strong>L / 360</strong> (e.g., 16.7 mm on a 6.0 m span). For steel column buckling and compressive section checks, pair this tool with our <a href="/calculators/engineering/structural-steel-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">structural steel calculator</a>, or assess foundation requirements using our <a href="/calculators/engineering/concrete-mix-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concrete mix calculator</a>.
            </p>
          </div>

          <h2>Beam Deflection Spectrum &amp; AISC Serviceability Limits</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <BeamDeflectionStressSpectrumChart />
          </div>

          <p>
            In structural analysis and civil engineering, beams are horizontal members engineered to carry transverse loads spanning open distances between foundations, columns, or bearing walls. When a transverse load is applied, the beam experiences internal shear forces and flexural bending moments that deform its longitudinal axis into an elastic curve. If the member lacks sufficient moment of inertia (second moment of area, <em>I</em>) or material stiffness (modulus of elasticity, <em>E</em>), excessive sagging occurs. This causes cracked drywall finishes, dynamic floor vibrations, unsealed window frames, and long-term structural distress.
          </p>
          <p>
            Beam behavior is dictated by support conditions and load distributions. In simply supported configurations resting on pin and roller boundaries, reactions at each support resist vertical gravity forces. For concentrated loads, evaluate applied forces using our <a href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</a>, and when calculating physical member angles or diagonal truss hypotenuse spans, reference our <a href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</a> and <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Beam Deflection &amp; Flexural Mechanics Equations</div>
            delta_center_point = (P * L^3) / (48 * E * I)
            <br />
            delta_uniform_udl = (5 * w * L^4) / (384 * E * I)
            <br />
            delta_cantilever_tip = (P * L^3) / (3 * E * I)
            <br />
            sigma_bending = (M_max * c) / I = M_max / S
            <br />
            delta_allowable_floor = L_span / 360
          </Formula>

          <h2>Understanding Section Modulus and Moment of Inertia</h2>
          <p>
            The resistance of any beam profile to bending deformation is governed by its cross-sectional geometry, quantified as the second moment of area (<em>I</em>, expressed in mm⁴, cm⁴, or in⁴). For a standard solid rectangular timber or steel section of width <em>b</em> and depth <em>h</em>, the centroidal moment of inertia is <code>I = (b · h³) / 12</code>. Because depth is raised to the third power, deepening a beam yields disproportionately higher stiffness than widening it.
          </p>
          <p>
            When fastening structural steel flanges, web stiffeners, or connection gussets, preload clamping force is critical to prevent joint slip under cyclical reversing moments. Ensure connection integrity using our <a href="/calculators/engineering/bolt-torque-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">bolt torque calculator</a>. For wide-flange beams (W-shapes), material is concentrated in outer flanges at maximum distance <em>c</em> from the neutral axis, optimizing both section modulus <code>S = I / c</code> and strength-to-weight ratio.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Common Structural Material Stiffness &amp; Allowable Flexural Stress Properties</p>
          <DataTable
            head={["Material Specification", "Elastic Modulus E (GPa)", "Yield Strength Fy (MPa)", "Allowable Bending Stress ASD (MPa)", "Density (kg/m³)"]}
            rows={[
              ["ASTM A36 Carbon Steel", "200 GPa", "250 MPa", "150 MPa (0.60 Fy)", "7,850 kg/m³"],
              ["ASTM A992 High-Strength Steel (W-Shapes)", "200 GPa", "345 MPa", "225 MPa (0.65 Fy)", "7,850 kg/m³"],
              ["6061-T6 Structural Aluminum", "69 GPa", "240 MPa", "135 MPa", "2,700 kg/m³"],
              ["Douglas Fir-Larch Timber (No. 1)", "12.4 GPa", "14.5 MPa", "9.8 MPa", "530 kg/m³"],
              ["Southern Yellow Pine Glue-Lam", "13.8 GPa", "16.2 MPa", "11.5 MPa", "560 kg/m³"],
              ["Reinforced Concrete (C30/37 Uncracked)", "31 GPa", "N/A (Compression: 30 MPa)", "13.5 MPa (Service)", "2,400 kg/m³"],
            ]}
          />

          <h2>Serviceability Limit States vs. Ultimate Failure</h2>
          <p>
            In modern structural engineering design frameworks (such as AISC LRFD and Eurocode 3), engineers evaluate members under two distinct operational paradigms:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Ultimate Limit State (ULS):</strong> Ensures the structural member will not undergo plastic hinge formation, catastrophic web shear failure, or lateral-torsional buckling under factored design combinations. Factors of safety typically range from 1.5 to 1.7 in ASD, or load factors of 1.2 Dead + 1.6 Live in LRFD.
            </li>
            <li>
              <strong>Serviceability Limit State (SLS):</strong> Ensures the beam remains functional, aesthetic, and comfortable for human occupants under unfactored nominal service loads. SLS criteria govern deflections, floor vibration frequencies, and ponding instability on flat roofs.
            </li>
          </ul>
          <h2>Continuous Multi-Span Beams &amp; Moment Redistribution</h2>
          <p>
            While simply supported single-span beams are common in residential timber framing, commercial structural frameworks utilize continuous multi-span beams passing across multiple intermediate column supports.
          </p>
          <p>
            Governed by <strong>Clapeyron's Three-Moment Equation</strong>, continuity introduces negative hogging bending moments over interior column supports. This continuity pulls upward against midspan sagging, reducing peak midspan positive bending moment from <code>w · L² / 8</code> (in simply supported beams) down to approximately <code>w · L² / 12</code>, while midspan deflection is slashed by more than 60%. Structural codes permit up to 10% to 20% plastic moment redistribution from highly stressed support sections into adjacent spans, enabling lighter, shallower steel beam profiles.
          </p>

          <h2>Composite Steel-Concrete Floor Beam Systems</h2>
          <p>
            In modern steel-framed office towers, efficiency is maximized by creating <strong>composite action</strong> between steel wide-flange beams and overlying cast-in-place reinforced concrete floor slabs. Heavy cylindrical <strong>headed shear studs</strong> (typically 19 mm diameter) are welded through profiled steel decking onto the top beam flange.
          </p>
          <p>
            Under transformed section analysis (using the modular elasticity ratio <code>n = E_steel / E_concrete ≈ 8</code>), the concrete slab acts as an enormous supplementary compression flange, shifting the composite neutral axis upward into the slab. This composite synergy increases flexural stiffness (moment of inertia <em>I_eff</em>) by 250% to 350% and reduces required structural steel beam weight by 30% to 45%, providing large open column-free floor layouts.
          </p>
        </>
      }
    >
      <BeamLoadCalculator />
    </CalcPage>
  );
}
