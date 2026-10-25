import type { Metadata } from "next";
import Link from "next/link";
import PotentialEnergyCalculator from "@/components/calcs/physics/potential-energy-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PotentialEnergyElevationChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/potential-energy-calculator";
const TITLE = "Potential Energy Calculator | Gravitational PE = mgh & Planetary Gravity";
const DESCRIPTION =
  "Calculate gravitational potential energy (PE = mgh), static weight loads, equivalent free fall impact speeds, and hydroelectric energy storage across Earth, Lunar, and Martian fields.";

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
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Free Fall Gravity" },
  { href: "/calculators/physics/gravitational-force-calculator", icon: "🌌", name: "Newtonian Gravitation" },
  { href: "/calculators/physics/power-calculator", icon: "💡", name: "Mechanical Power Rate" },
  { href: "/calculators/engineering/torque-calculator", icon: "🔄", name: "Engineering Torque" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for potential energy?",
    a: "Gravitational potential energy (PE) is the stored mechanical energy possessed by an object due to its relative vertical position within a gravitational field. In uniform local fields, gravitational potential energy is given by: PE = m · g · h, where m is inertial mass in kilograms (kg), g is local gravitational acceleration (9.80665 m/s² on Earth), and h is vertical elevation in meters (m) above an arbitrary baseline datum.",
  },
  {
    q: "Why is the choice of reference datum arbitrary in potential energy calculations?",
    a: "Potential energy is fundamentally a relative differential quantity rather than an absolute property. The ground level, sea level, floor surface, or center of Earth can all serve as the zero-potential datum (PE = 0). Physical processes—such as water flowing through a turbine or a roller coaster dropping down a hill—depend exclusively on the potential energy change: ΔPE = m · g · Δh. The absolute value carries no physical significance until the reference coordinate is fixed.",
  },
  {
    q: "How does potential energy convert into kinetic energy during free descent?",
    a: "Under the Law of Conservation of Mechanical Energy in a closed conservative system, the sum of kinetic and potential energy remains constant: E_total = PE + KE = constant. As an object falls from height h, its potential energy steadily contracts while its kinetic energy expands by an identical amount: ΔKE = -ΔPE. Setting final kinetic energy equal to initial potential energy (½mv² = mgh) yields the terminal free-fall speed: v = √(2gh).",
  },
  {
    q: "How does pumped-storage hydroelectricity utilize gravitational potential energy?",
    a: "Pumped-storage hydroelectric facilities represent over 90% of global grid-scale energy storage. During periods of surplus off-peak power, water is pumped from a lower reservoir to an elevated upper reservoir, converting electrical energy into gravitational potential energy (PE = m·g·h = ρ·V·g·h). During peak demand, water releases downward through hydraulic Francis or Pelton turbines, generating electricity with a round-trip cycle efficiency of 75% to 82%.",
  },
  {
    q: "What is the difference between gravitational potential energy and elastic potential energy?",
    a: "Gravitational potential energy stores work performed against gravity (PE_grav = m·g·h). Elastic potential energy stores work performed against molecular deformation in elastic springs or materials obeying Hooke's Law: PE_elastic = ½ · k · x², where k is the spring stiffness constant in N/m and x is displacement compression or extension from equilibrium. Both forms represent conservative mechanical energy capable of full recovery into kinetic energy.",
  },
  {
    q: "When does the formula PE = mgh become inaccurate for orbital mechanics?",
    a: "The linear approximation PE = mgh assumes gravitational field strength g is constant. When elevation h is significant compared to Earth's radius (R_e ≈ 6,371 km)—such as ballistic missiles, orbital satellites, or lunar spacecraft—Newton's universal inverse-square gravitational law must be integrated: PE = -G · M · m / r. The negative sign establishes that potential energy approaches zero at infinite separation.",
  },
];

export default function PotentialEnergyCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Gravitational Potential Energy Calculator"
      intro="Calculate gravitational potential energy (PE = mgh), static weight loads, equivalent free fall velocities, and celestial energy storage capacity."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-950/40 dark:text-indigo-400 dark:ring-indigo-500/30">
                <svg className="size-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-4 & CODATA Standardized
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Conservative Energy Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Celestial Field Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How do you calculate gravitational potential energy?
                </strong>
                <p className="mt-1">
                  Gravitational potential energy is calculated by multiplying mass by local gravitational acceleration and vertical elevation: PE = m · g · h. On Earth's surface (g = 9.80665 m/s²), hoisting an 85 kg mass to an elevation of 35 meters stores 29.18 kilojoules (kJ) of mechanical potential energy. If released into free fall, this stored potential energy completely converts into kinetic energy, striking the ground at 26.2 m/s (94.3 km/h or 58.6 mph).
                 Model dynamic energy transfer into motion with our <Link href="/calculators/physics/kinetic-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">kinetic energy calculator</Link>, calculate vertical descent velocity with the <Link href="/calculators/physics/free-fall-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">free fall calculator</Link>, or evaluate celestial gravity fields via our <Link href="/calculators/physics/gravitational-force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gravitational force calculator</Link>.</p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Potential Energy Storage Scaling Across Celestial Gravitational Fields</h2>
          <div className="not-prose my-6">
            <PotentialEnergyElevationChart />
          </div>

          <p>
            Potential energy is a fundamental concept in classical physics, quantifying the stored energy of a configuration within a conservative force field. When an object is lifted vertically against gravity, work is performed against the downward gravitational pull. Because gravity is a conservative force, this expended work is not dissipated as friction heat, but is preserved within the gravitational field configuration as potential energy, ready to be recovered as kinetic motion.
          </p>

          <p>
            Standardized internationally under ISO 80000-4, the unit of potential energy is the Joule (J). From civil hydroelectric dam design and heavy industrial crane rigging to rollercoaster layout engineering and pumped thermal energy storage systems, mastering gravitational potential energy is crucial for optimizing mechanical efficiency and structural safety envelopes.
          </p>

          <h2>Core Mathematical Equations of Gravitational Potential Energy</h2>

          <p>
            Under local uniform gravitational fields, potential energy correlates directly with mass, field strength, and vertical displacement:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Uniform Field Potential Energy</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">PE = m · g · h</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates stored energy from mass m (kg), gravity g (m/s²), and vertical height h (m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Gravitational Static Weight Load</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W = m · g   ⟹   PE = W · h</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Expresses potential energy as static weight load multiplied by vertical elevation.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Conservative Free Fall Conversion Velocity</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">m · g · h = ½ · m · v²   ⟹   v = √(2 · g · h)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Torricelli conversion of potential energy into maximum impact kinetic velocity.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. General Inverse-Square Orbital Gravitational Potential</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">U(r) = -G · M · m / r</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Rigorous orbital formulation accounting for gravitational decay at planetary distances.</div>
          </Formula>

          <h2>Pumped-Storage Hydroelectricity & Grid Energy Storage</h2>

          <p>
            Gravitational potential energy represents the largest operational form of grid-scale energy storage on planet Earth. Pumped-storage hydroelectricity (PSH) utilizes two water reservoirs situated at disparate physical elevations. During periods of low electrical demand and low market pricing (such as nighttime or periods of peak solar generation), reversible pump-turbines consume surplus grid electricity to hoist water from the lower reservoir to the upper head.
          </p>

          <p>
            The stored electrical energy is calculated via fluid gravitational potential: E_stored = η · ρ · V · g · h_net, where ρ is water density (1,000 kg/m³), V is active storage reservoir volume (m³), h_net is the hydraulic head after friction penstock losses, and η is the round-trip electro-mechanical conversion efficiency (typically 75% to 82%). A facility boasting a 10,000,000 m³ upper reservoir with a 300-meter head stores approximately 6.5 Gigawatt-hours (GWh) of rapidly dispatchable renewable energy.
          </p>


          <h2>Elastic Potential Energy in Hookean Mechanical Systems</h2>

          <p>
            In addition to gravitational potential energy, mechanical engineering frequently employs elastic potential energy stored within deformable materials obeying Hooke's Law: F = -k · x, where k is spring stiffness in N/m and x is spatial deformation displacement.
          </p>

          <p>
            Because the restoring force scales linearly with displacement, the work required to deform the spring represents the integral of force over distance, yielding the quadratic elastic potential energy formulation:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Hookean Elastic Potential Energy Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">PE_elastic = ½ · k · x²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies recoverable potential energy stored in compressed or extended elastic springs.</div>
          </Formula>

          <p>
            Automotive suspension coil springs, industrial shock dampers, and archery bows utilize elastic potential energy to absorb kinetic impacts and smoothly release mechanical impulse without permanent material deformation.
          </p>


          <h2>Hydrostatic & Gravitational Analytical Tools</h2>

          <p>
            Potential energy storage forms the foundation of civil hydro storage and mechanical lifting equipment. Determine external lifting work done against gravity with our <Link href="/calculators/physics/work-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">work energy calculator</Link>, convert metric energy units with the <Link href="/calculators/measurements/energy-converter" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">energy converter</Link>, and compute sustained lifting power through our <Link href="/calculators/physics/power-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">power calculator</Link>. For hydroelectric penstocks, evaluate hydrostatic fluid pressure using our <Link href="/calculators/physics/pressure-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pressure calculator</Link> and assess fluid flow rates via the <Link href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</Link>.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical potential energy dynamics across disparate physical domains:
          </p>

          <h3>Case Study A: Industrial Overhead Factory Crane Lift</h3>
          <p>
            An industrial bridge crane hoists a steel container of mass m = 3,500 kg to a storage mezzanine elevation of h = 25.0 meters above the factory floor on Earth (g = 9.807 m/s²).
          </p>
          <ul>
            <li><strong>Gravitational Weight Load:</strong> W = m · g = 3,500 kg × 9.807 m/s² = 34,324.5 Newtons (7,716.5 lbf).</li>
            <li><strong>Stored Potential Energy:</strong> PE = 34,324.5 N × 25.0 m = 858,113 Joules (858.11 kJ = 0.858 MJ).</li>
            <li><strong>Electrical Storage Equivalent:</strong> 858,113 J ÷ 3,600,000 J/kWh = 0.238 kWh.</li>
            <li><strong>Potential Impact Velocity:</strong> If accidentally released, terminal impact speed would reach v = √(2 × 9.807 × 25.0) = 22.14 m/s (79.72 km/h = 49.53 mph).</li>
          </ul>

          <h3>Case Study B: High-Alpine Hydroelectric Penstock Water Head</h3>
          <p>
            A high-alpine hydroelectric intake discharges water down an elevation head of h = 450.0 meters through steel penstocks. We evaluate potential energy per metric ton (1,000 kg) of water.
          </p>
          <ul>
            <li><strong>Potential Energy per Ton:</strong> PE = 1,000 kg × 9.807 m/s² × 450.0 m = 4,413,150 Joules (4.413 MJ per ton).</li>
            <li><strong>Electrical Output per Ton:</strong> At 85% hydraulic turbine generator efficiency: E_out = 4.413 MJ × 0.85 = 3.751 MJ = 1.042 kWh per ton of water.</li>
            <li><strong>Static Hydraulic Pressure at Nozzle:</strong> P_static = ρ · g · h = 1,000 kg/m³ × 9.807 m/s² × 450.0 m = 4,413,150 Pascals (44.13 bar = 640 psi).</li>
            <li><strong>Torricelli Jet Discharge Speed:</strong> v_jet = √(2 × 9.807 × 450.0) = 93.95 m/s (338.2 km/h).</li>
          </ul>

          <h2>Physical Constraints & Boundary Conditions</h2>

          <p>
            When modeling potential energy in advanced engineering systems:
          </p>

          <ol>
            <li>
              <strong>Non-Conservative Dissipation:</strong> In real physical descents, friction and aerodynamic drag continuously convert part of the initial potential energy into waste heat, meaning v_final &lt; √(2gh).
            </li>
            <li>
              <strong>Tectonic & Gravitational Anomalies:</strong> Earth's gravitational acceleration g varies from 9.78 m/s² at the equator to 9.83 m/s² at the poles due to centrifugal rotational relief and equatorial planetary bulging.
            </li>
            <li>
              <strong>Elastic Deformation Coupling:</strong> Elevated civil structures (such as suspension bridge cables) store both gravitational potential energy (from elevated deck weight) and elastic strain energy (from stretched steel wire elongation).
            </li>
          </ol>

          <h2>Authoritative Energy & Physical Standards</h2>

          <p>
            For verified potential energy standards and gravitational constants:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International specifications for physical quantities and units of mechanics, energy, and work.
            </li>
            <li>
              <strong>CODATA Recommended Values:</strong> Standard terrestrial gravity constant g₀ = 9.80665 m/s² and gravitational constant G = 6.67430 × 10⁻¹¹ N·m²/kg².
            </li>
            <li>
              <strong>NIST SP 811:</strong> Guide for the use of the International System of Units (SI) in engineering dynamics.
            </li>
            <li>
              <strong>International Hydropower Association (IHA):</strong> Technical standards for pumped storage hydraulic head and energy potential modeling.
            </li>
          </ul>
        </>
      }
    >
      <PotentialEnergyCalculator />
    </CalcPage>
  );
}
