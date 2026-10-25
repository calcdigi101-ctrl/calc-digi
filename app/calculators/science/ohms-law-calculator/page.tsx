import type { Metadata } from "next";
import Link from "next/link";
import OhmsLawCalculatorComponent from "@/components/calcs/science/ohms-law-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ElectrochemicalCellOverpotentialChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/ohms-law-calculator";
const TITLE = "Ohm's Law Calculator | Electrochemical Potential, Resistance & Power Solver";
const DESCRIPTION =
  "Calculate electrical voltage, current, resistance, and Joule heating power in physical chemistry, electrochemical cells, and laboratory circuits with Ohm's Law.";

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
  { href: "/calculators/physics/power-calculator", icon: "⚡", name: "Mechanical & Electrical Power" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Energy Vector" },
  { href: "/calculators/science/specific-heat-calculator", icon: "🔥", name: "Specific Heat & Calorimetry" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newtonian Force F=ma" },
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/buffer-calculator", icon: "🧪", name: "Electrophoresis Buffer" },
];

const FAQ_ITEMS = [
  {
    q: "What is Ohm's Law and how does it apply to physical chemistry and electrochemistry?",
    a: "Ohm&apos;s Law establishes that the electric current (I) flowing through a conductor or electrolytic solution between two points is directly proportional to the voltage difference (V) across the points, and inversely proportional to electrical resistance (R): V = I &middot; R. In electrochemistry, Ohm&apos;s Law dictates the internal resistance (IR drop) across electrolyte solutions, separator membranes, and electrode interfaces during battery discharge and electrolysis.",
  },
  {
    q: "What is Joule heating and how is electrical power dissipation calculated?",
    a: "Joule heating represents the thermodynamic conversion of electrical energy into thermal heat energy as electric charge carriers collide with lattice atoms or solvated ions: P = V &middot; I = I² &middot; R = V² / R, expressed in Watts (Joules per second). In chemical laboratories, Joule heating governs thermal dissipation in electrophoresis tanks and heating elements in reaction calorimeters.",
  },
  {
    q: "What is electrolytic solution conductance and how is it related to resistance?",
    a: "Conductance (G) is the mathematical reciprocal of electrical resistance: G = 1 / R, measured in Siemens (S) or mhos (&Omega;⁻¹). For an electrolyte solution contained between two parallel electrodes of cross-sectional area A and separation distance L, resistance equals R = &rho; &middot; (L / A), where &rho; is electrical resistivity. Electrolytic conductivity (&kappa; = 1 / &rho;) is widely measured in analytical chemistry to quantify total dissolved ions.",
  },
  {
    q: "Why is the Ohmic IR drop a critical performance bottleneck in lithium-ion batteries?",
    a: "Every electrochemical cell possesses internal resistance (R_int) stemming from electrolyte ion mobility, separator tortuosity, and electrode contact resistance. When a battery discharges current I, terminal operating voltage drops below thermodynamic open-circuit potential (E₀) by the Ohmic drop: V_cell = E₀ - I &middot; R_int. Under rapid fast-charging or heavy vehicle acceleration, large currents produce substantial voltage drops and severe I²R waste heat.",
  },
  {
    q: "How does temperature affect electrical resistance in metals versus electrolyte solutions?",
    a: "Metals and electrolyte solutions exhibit opposite temperature behaviors. In metallic conductors (like copper wires), resistance increases with temperature because thermal vibrations disrupt electron drift. In contrast, in electrolytic solutions, electrical resistance decreases (conductance increases) by roughly 2% per &deg;C because thermal energy lowers liquid viscosity and accelerates solvated ion diffusion.",
  },
  {
    q: "What is the difference between an Ohmic and a Non-Ohmic conductor in physical science?",
    a: "An Ohmic material maintains a strictly constant resistance across varying applied voltages, displaying a linear current-voltage (I-V) relationship passing through the origin. Non-Ohmic conductors—such as semiconductor diodes, electrochemical double layers, and ionized plasma arcs—exhibit non-linear I-V curves where dynamic resistance changes with current magnitude or voltage polarity.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Ohm's Law & Electrochemical Cell Power Calculator"
      intro="Calculate electrical voltage, current, resistance, conductance, and Joule heating power dissipation in laboratory circuits, electrochemical cells, and electrophoresis apparatus using fundamental Ohm's Law."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                IEC & IUPAC Electrochemical Standards
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Electrodynamic & Ohmic Dissipation Metrology</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Analytical Solver
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What are the primary formulas of Ohm's Law and electrical power?
                </strong>
                <p className="mt-1">
                  Ohm&apos;s Law is defined by the fundamental triad: V = I &middot; R, where V is electrical potential (Volts), I is current (Amperes), and R is resistance (Ohms &Omega;). Electrical power dissipation obeys Joule&apos;s First Law: P = V &middot; I = I² &middot; R = V² / R, expressed in Watts. In chemical systems, electrical work converts directly into thermodynamic heat. For broader physical power applications, evaluate mechanical power ratings with our <Link href="/calculators/physics/power-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">power calculator</Link>, quantify vector work transfers via the <Link href="/calculators/physics/work-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">work energy calculator</Link>, or examine thermal calorie generation using our <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Electrochemical Cell Polarization & Ohmic Voltage Drop Curves</h2>
          <div className="not-prose my-6">
            <ElectrochemicalCellOverpotentialChart />
          </div>

          <p>
            Formulated by German physicist Georg Simon Ohm in 1827, Ohm&apos;s Law forms the cornerstone of electrical circuit theory, electrochemistry, and bio-instrumentation. In physical chemistry, Ohm&apos;s Law underpins electrochemical impedance spectroscopy (EIS), electrophoresis separation of nucleic acids and proteins, potentiostatic coulometry, and battery energy storage.
          </p>

          <p>
            When electric potential is applied across an electrolytic solution, solvated ions migrate toward opposing electrodes (cations toward the cathode, anions toward the anode). The resistance encountered by migrating ions determines both the required driving voltage and the magnitude of Joule heat generated within the buffer matrix. When designing electrophoresis buffer systems, optimize ionic strength with our <Link href="/calculators/science/buffer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">buffer calculator</Link> and correlate solute molarities via the <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>.
          </p>

          <h2>Electrodynamic Equations & Mathematical Principles</h2>

          <p>
            Classical electrodynamics unites Ohm&apos;s Law with Joule heating and ionic solution geometry:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Fundamental Ohm's Law Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">V = I &middot; R   |   I = V / R   |   R = V / I</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Interrelates electrical potential V (Volts), current I (Amperes), and resistance R (Ohms).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Joule Heating Power Dissipation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = V &middot; I = I&sup2; &middot; R = V&sup2; / R</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies thermodynamic thermal dissipation rate in Watts (Joules per second).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Physical Conductor Resistance Geometry</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">R = &rho; &middot; (L / A) = L / (&kappa; &middot; A)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates resistance from length L, cross-sectional area A, resistivity &rho;, and conductivity &kappa;.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Electrical Conductance Definition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">G = 1 / R = I / V</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Measures ease of electric charge transport in Siemens (S = &Omega;⁻¹).</div>
          </Formula>

          <h2>Standard Conductivities & Resistivities of Materials (20 °C)</h2>

          <p>
            Electrical properties across metallic conductors, semiconductors, aqueous electrolytes, and insulators:
          </p>

          <DataTable
            head={["Material System", "Classification", "Resistivity ρ (Ω·m)", "Conductivity κ (S/m)", "Temperature Coeff. (/°C)"]}
            rows={[
              ["Silver (Pure)", "Metallic Superconductor", "1.59 × 10⁻⁸", "6.30 × 10⁷", "+0.0038"],
              ["Copper (Annealed)", "Standard Conductor", "1.68 × 10⁻⁸", "5.96 × 10⁷", "+0.0039"],
              ["Gold (24K)", "Noble Contact Metal", "2.44 × 10⁻⁸", "4.10 × 10⁷", "+0.0034"],
              ["Aluminum (EC Grade)", "Lightweight Conductor", "2.82 × 10⁻⁸", "3.55 × 10⁷", "+0.0039"],
              ["Platinum Wire", "Inert Electrode", "1.06 × 10⁻⁷", "9.43 × 10⁶", "+0.0039"],
              ["Seawater (3.5% Salt)", "Aqueous Electrolyte", "0.20", "5.00", "+0.0210 (drops R)"],
              ["0.1 M KCl Solution", "Standard Conductance", "0.78", "1.29", "+0.0190"],
              ["Drinking Tap Water", "Dilute Electrolyte", "20.0 - 100.0", "0.01 - 0.05", "+0.0200"],
              ["Deionized Water (Milli-Q)", "Purified Solvent", "1.82 × 10⁵", "5.50 × 10⁻⁶", "+0.0550"],
              ["Fused Silica Glass", "Dielectric Insulator", "1.0 × 10¹⁴", "1.0 × 10⁻¹⁴", "Negative"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Agarose Gel Electrophoresis Tank Thermal Management</h3>
          <p>
            A molecular genetics laboratory runs a DNA agarose gel electrophoresis chamber at a constant driving voltage V = 120 Volts. The gel submerged in 1&times; TAE buffer exhibits a measured electrical resistance R = 2,400 Ohms.
          </p>
          <ul>
            <li><strong>Current Flow:</strong> I = V &divide; R = 120 V &divide; 2,400 &Omega; = 0.050 Amperes = 50.0 milliamperes (mA).</li>
            <li><strong>Thermal Power Dissipation:</strong> P = V &times; I = 120 V &times; 0.050 A = 6.00 Watts (6.00 Joules/second).</li>
            <li><strong>Heat Generation over 90 Minutes:</strong> Energy = 6.00 W &times; (90 &times; 60 s) = 32,400 Joules (7.74 kcal).</li>
            <li><strong>Gel Thermal Risk:</strong> For a 500 mL buffer volume without external chilling, this heat elevates buffer temperature by: &Delta;T = 32,400 J &divide; (500 g &times; 4.184 J/g&middot;&deg;C) = +15.5 &deg;C, which can cause DNA band smiling or melting of low-percentage agarose.</li>
          </ul>

          <p>
            To evaluate temperature rise and calorie requirements in fluid volumes, calculate thermal capacities with our <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link> and verify fluid density using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>.
          </p>

          <h3>Case Study B: Lithium-Ion Battery Internal Resistance & Fast-Charge Polarization</h3>
          <p>
            An electric vehicle battery pack module consisting of lithium-ion NMC cells (nominal open-circuit voltage E₀ = 48.0 V) exhibits an internal module resistance R_int = 0.040 Ohms. A fast charger delivers current I = 100.0 Amperes into the module.
          </p>
          <ul>
            <li><strong>Internal Ohmic Voltage Drop:</strong> V_drop = I &times; R_int = 100.0 A &times; 0.040 &Omega; = 4.00 Volts.</li>
            <li><strong>Required Charger Terminal Voltage:</strong> V_terminal = 48.0 V + 4.00 V = 52.00 Volts.</li>
            <li><strong>Internal Joule Waste Heat:</strong> P_heat = I² &middot; R_int = (100.0 A)² &times; 0.040 &Omega; = 400.0 Watts.</li>
            <li><strong>Thermal Management Requirement:</strong> Active liquid cooling chiller plates must evacuate 400 W of waste heat per module to prevent thermal runaway.</li>
          </ul>

          <h2>Operational Constraints & Non-Ohmic Boundary Conditions</h2>

          <p>
            When utilizing Ohm&apos;s Law in physical chemistry and electro-analytical chemistry, four operational boundary constraints must be accounted for:
          </p>

          <ol>
            <li>
              <strong>Electrochemical Double-Layer Capacitance & Overpotentials:</strong> At electrode-solution interfaces, charge separation forms an electrical double layer (Helmholtz-Stern layer). The total voltage across an operating electrolytic cell includes thermodynamic equilibrium potential (E_rev), kinetic activation overpotential (&eta;_act), mass-transport concentration overpotential (&eta;_conc), and Ohmic drop: V_cell = E_rev + &eta;_act + &eta;_conc + I&middot;R.
            </li>
            <li>
              <strong>Wien Effect at Extreme Electric Fields:</strong> In very strong electric fields (&gt; 100 kV/cm), the ionic atmosphere surrounding migrating ions is stripped away faster than it can reform, causing solution conductivity to increase significantly above Ohm&apos;s Law predictions (the first and second Wien effects).
            </li>
            <li>
              <strong>Electrode Polarization in DC Conductance Measurements:</strong> Measuring electrolytic resistance using direct current (DC) causes rapid electrolysis, gas bubble formation, and electrode polarization. Analytical conductivity meters universally employ high-frequency alternating current (AC, typically 1 to 10 kHz) to neutralize capacitive polarization.
            </li>
            <li>
              <strong>Electrodynamic Thermal Runaway in Semiconductors:</strong> In semiconducting and ceramic materials with negative temperature coefficients of resistance (NTC thermistors), increasing current causes Joule heating, which lowers resistance, driving further current escalation and catastrophic thermal runaway.
            </li>
          </ol>


          <h2>Electrochemical Impedance Spectroscopy & Non-Ohmic Overpotentials</h2>
          <p>
            In electrochemical battery cells, electrolytic chlor-alkali cells, and fuel cell stacks, total operational
            cell voltage departs from ideal Ohmic proportionality due to kinetic activation overpotentials and mass
            transport concentration gradients:
          </p>
          <Formula>
            {"V_{terminal} = E^0_{cell} - I * R_{ohmic} - eta_{activation}(I) - eta_{concentration}(I)"}
          </Formula>
          <p>
            Pure Ohmic losses stem from electrolyte ion conduction and electronic busbar resistance, while activation
            overpotentials represent charge-transfer activation barriers described by Butler-Volmer kinetics.
            Electrochemical engineers utilize impedance spectroscopy to isolate pure Ohmic internal resistance from double-layer
            capacitance, combining Ohmic calculations with
            {" "}<Link href="/calculators/science/specific-heat-calculator">thermal specific heat models</Link>{" "}
            to design liquid cooling circuits that prevent battery thermal runaway. Furthermore, electrochemical sensors maintain constant background potential using
            {" "}<Link href="/calculators/science/buffer-calculator">constant ionic strength buffer solutions</Link>{" "}
            to guarantee reliable analytical potentiometry.
          </p>
          <p>
            In printed circuit board (PCB) trace design and power electronic busbars, engineers factor trace copper thickness (measured in ounces per square foot) and dielectric thermal conductivity into trace width sizing equations. Operating high currents through undersized conductors triggers resistive I²R heating that degrades dielectric substrate integrity and accelerates electromigration failure along metallic grain boundaries over extended operating lifetimes.
          </p>

          <h2>Authoritative International Electrical & Chemical Standards</h2>

          <p>
            For certified electrical measurements and electrochemical cell characterization, consult international standards organizations:
          </p>
          <ul>
            <li>
              <strong>IEC 60051:</strong> Direct acting indicating analogue electrical measuring instruments and their accessories.
            </li>
            <li>
              <strong>IUPAC Recommendations on Electrochemical Terminology:</strong> Definitive rules for electrode potentials, overpotentials, and solution conductivity.
            </li>
            <li>
              <strong>ASTM D1125-14:</strong> Standard Test Methods for Electrical Conductivity and Resistivity of Water.
            </li>
            <li>
              <strong>ISO/IEC Guide 98-3 (GUM):</strong> Uncertainty of measurement in electrical and physical calibration.
            </li>
          </ul>
        </>
      }
    >
      <OhmsLawCalculatorComponent />
    </CalcPage>
  );
}
