import type { Metadata } from "next";
import Link from "next/link";
import SpecificHeatCalculatorComponent from "@/components/calcs/science/specific-heat-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SpecificHeatThermalStorageChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/specific-heat-calculator";
const TITLE = "Specific Heat Calculator | Sensible Heat Transfer & Calorimetry Solver";
const DESCRIPTION =
  "Calculate sensible heat transfer Q = mcΔT, equilibrium temperature, specific heat capacity, and thermal energy storage across materials and phases.";

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
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Elevation" },
  { href: "/calculators/science/ideal-gas-law-calculator", icon: "🎈", name: "Ideal Gas Law" },
  { href: "/calculators/science/density-calculator", icon: "⚖️", name: "Density Solver" },
  { href: "/calculators/science/ohms-law-calculator", icon: "⚡", name: "Ohm's Law Joule Heat" },
];

export default function SpecificHeatCalculatorPage() {
  return (
    <CalcPage
      title="Specific Heat Calculator"
      intro="Comprehensive analytical solver for laboratory, clinical, and industrial chemical calculations."
      description="Compute sensible thermal energy transfer (Q = mcΔT), final equilibrium temperature, and material specific heat capacity. Evaluate heat exchange across metals, liquids, and gases in industrial heat exchangers, calorimetry, and energy storage systems."
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Specific Heat is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Sensible heat transfer represents the thermal energy gained or lost by a substance undergoing a temperature change without a change of phase: Q = m · c · ΔT. Here, Q is heat energy (Joules), m is mass (kg), c is specific heat capacity (J/(kg·°C)), and ΔT is temperature differential (T_final - T_initial). Liquid water possesses an exceptionally high specific heat capacity of 4,184 J/(kg·°C), making it the premier thermal storage and cooling fluid. Check phase transitions against the <Link href="/calculators/science/boiling-point-calculator">boiling point elevation solver</Link> and calculate mass feeds using the <Link href="/calculators/science/density-calculator">density calculator</Link>.
            </p>
          </div>

          <h2>Specific Heat Capacity Comparison: Thermal Energy Storage (J/kg·°C)</h2>
          <p>
            Specific heat capacity dictates how much energy an object absorbs before experiencing a rise in temperature. High heat capacity substances (like water and ethanol) serve as thermal buffers, while low heat capacity metals (like lead and copper) heat up and cool down rapidly under identical thermal fluxes.
          </p>

          <SpecificHeatThermalStorageChart />

          <h2>First-Principles Calorimetric Derivations & Thermodynamics</h2>
          <p>
            In thermodynamics, specific heat capacity (c) is defined as the amount of thermal energy required to elevate the temperature of one unit mass of a material by one degree Celsius (or one Kelvin). The sensible heat equation is expressed as:
          </p>
          <Formula>
            {"Q = m \cdot c \cdot \Delta T = m \cdot c \cdot (T_{\text{final}} - T_{\text{initial}})"}
          </Formula>
          <p>
            When two bodies at different temperatures are placed in an isolated adiabatic calorimeter, the law of conservation of energy dictates that heat lost by the warmer body equals heat absorbed by the cooler body:
          </p>
          <Formula>
            {"\sum Q = 0 \implies m_1 \cdot c_1 \cdot (T_{\text{final}} - T_1) + m_2 \cdot c_2 \cdot (T_{\text{final}} - T_2) = 0"}
          </Formula>
          <p>
            Solving for final equilibrium temperature (T_final) yields:
          </p>
          <Formula>
            {"T_{\text{final}} = \frac{m_1 \cdot c_1 \cdot T_1 + m_2 \cdot c_2 \cdot T_2}{m_1 \cdot c_1 + m_2 \cdot c_2}"}
          </Formula>
          <p>
            For gases, specific heat depends heavily on the thermodynamic process: constant pressure specific heat (Cp) exceeds constant volume specific heat (Cv) by the universal gas constant (Cp - Cv = R) due to the boundary work performed during isobaric thermal expansion. Engineers model gas expansion work through the <Link href="/calculators/science/ideal-gas-law-calculator">ideal gas law calculator</Link> and evaluate electrical heating elements using the <Link href="/calculators/science/ohms-law-calculator">Ohmic Joule heating tool</Link>.
          </p>

          <h2>Material Specific Heat Benchmarks & Thermal Conductivity Reference</h2>
          <p>
            The table below compiles documented specific heat capacities, molar heat capacities, and thermal conductivities for standard engineering solids, liquids, and gases at 25 °C (298.15 K) and 1 atm.
          </p>

          <DataTable
            head={["Material / Substance", "Phase", "Specific Heat c (J/kg·°C)", "Molar Heat C_m (J/mol·°C)", "Thermal Conductivity k (W/m·K)"]}
            rows={[
              ["Liquid Water (H₂O)", "Liquid", "4,184", "75.38", "0.606"],
              ["Ice (Solid H₂O at -10 °C)", "Solid", "2,090", "37.65", "2.22"],
              ["Steam (Water Vapor at 100 °C)", "Gas (Cp)", "2,010", "36.21", "0.025"],
              ["Ethanol (C₂H₅OH)", "Liquid", "2,440", "112.4", "0.171"],
              ["Ethylene Glycol (Antifreeze)", "Liquid", "2,360", "146.5", "0.258"],
              ["Aluminum (Al)", "Solid", "897", "24.20", "237"],
              ["Iron / Structural Carbon Steel", "Solid", "450", "25.13", "50.2"],
              ["Copper (Cu)", "Solid", "385", "24.47", "401"],
              ["Lead (Pb)", "Solid", "129", "26.73", "35.3"],
              ["Dry Air (Sea Level)", "Gas (Cp)", "1,005", "29.07", "0.026"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Bomb Calorimetry of Food Caloric Energy Content</h3>
          <p>
            A food science analytical laboratory burns a 1.250 g sample of sucrose in a bomb calorimeter surrounded by 2.000 kg of liquid water (c = 4,184 J/kg·°C). The steel bomb vessel has an effective heat capacity of 650 J/°C. The initial temperature of the water bath is 21.40 °C, and the final equilibrium temperature after combustion is 23.75 °C.
          </p>
          <ol>
            <li>
              <strong>Calculate temperature elevation:</strong>
              <br />
              ΔT = 23.75 °C - 21.40 °C = 2.35 °C (2.35 K).
            </li>
            <li>
              <strong>Calculate heat absorbed by water:</strong>
              <br />
              Q_water = m · c · ΔT = 2.000 kg × 4,184 J/(kg·°C) × 2.35 °C = 19,664.8 J.
            </li>
            <li>
              <strong>Calculate heat absorbed by bomb vessel:</strong>
              <br />
              Q_bomb = C_bomb × ΔT = 650 J/°C × 2.35 °C = 1,527.5 J.
            </li>
            <li>
              <strong>Compute total energy released and specific energy:</strong>
              <br />
              Q_total = 19,664.8 J + 1,527.5 J = 21,192.3 J = 21.19 kJ.
              <br />
              Specific combustion energy = 21.19 kJ / 1.250 g = 16.95 kJ/g (4.05 kcal/g), exactly matching standard nutritional carbohydrate values. Verify reagent molecular weights with the <Link href="/calculators/science/molecular-weight-calculator">molecular weight tool</Link>.
            </li>
          </ol>

          <h3>Case Study B: Industrial Quenching of Forged Steel Components</h3>
          <p>
            A metallurgical heat-treating plant quenches a 15.0 kg forged carbon steel shaft (c = 450 J/kg·°C) heated to 850 °C into an agitated industrial oil quenching bath containing 200.0 kg of mineral oil (c = 1,900 J/kg·°C) initially at 35 °C.
          </p>
          <ol>
            <li>
              <strong>Set up heat balance equation:</strong>
              <br />
              (m_steel · c_steel)(850 - T_final) = (m_oil · c_oil)(T_final - 35).
              <br />
              (15.0 × 450)(850 - T_final) = (200.0 × 1,900)(T_final - 35).
              <br />
              6,750 × (850 - T_final) = 380,000 × (T_final - 35).
            </li>
            <li>
              <strong>Solve for equilibrium temperature T_final:</strong>
              <br />
              5,737,500 - 6,750 T_final = 380,000 T_final - 13,300,000.
              <br />
              386,750 T_final = 19,037,500  &rarr;  T_final = 49.22 °C.
            </li>
            <li>
              <strong>Thermal Conclusion:</strong> The oil bath temperature rises by only 14.22 °C, safely below the 180 °C flashpoint of mineral oil. Engineers verify reaction yields in secondary salt baths via the <Link href="/calculators/science/percent-yield-calculator">chemical percent yield calculator</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Non-Linear High-Temperature Physics</h2>
          <ol>
            <li>
              <strong>Temperature Dependence of Specific Heat (Debye Model):</strong> Specific heat capacity is not strictly constant across broad temperature intervals. According to quantum solid-state theory (the Debye T³ model), at temperatures approaching absolute zero (0 K), lattice vibrational phonon modes freeze out and c drops to zero proportional to T³. At high temperatures, metals asymptotically approach the classical Dulong-Petit limit of 3R ≈ 24.9 J/(mol·K).
            </li>
            <li>
              <strong>Sensible Heat vs. Latent Heat Phase Decoupling:</strong> The equation Q = mcΔT applies strictly to sensible heating within a single thermodynamic phase. At phase transition boundaries (melting point, boiling point), heat input supplies latent enthalpy of fusion (ΔH_fus) or latent enthalpy of vaporization (ΔH_vap) without any change in temperature (ΔT = 0).
            </li>
            <li>
              <strong>Thermal Radiative Losses in Non-Adiabatic Calorimeters:</strong> In real-world calorimetry, heat transfer occurs to surrounding air via convection and blackbody radiation according to the Stefan-Boltzmann law (P = εσA(T⁴ - T_env⁴)), necessitating Regnault-Pfaundler graphical correction methods for analytical rigor.
            </li>
          </ol>

          <h2>Differential Scanning Calorimetry (DSC) & Thermal Analysis Metrology</h2>
          <p>
            In modern materials science and pharmaceutical development, specific heat capacity and phase transition enthalpies are quantified via Differential Scanning Calorimetry (DSC). A DSC instrument maintains a sample pan and an inert reference pan at identical temperatures while heating both at a constant linear scanning rate (β = dT/dt, typically 10 °C/min). The differential heat flow rate (dH/dt) required to maintain isothermal parity is directly proportional to sample specific heat capacity:
          </p>
          <Formula>
            {"c_p(T) = \frac{1}{m \cdot \beta} \cdot \left( \frac{dH}{dt} \right)_{\text{sample}} - \left( \frac{dH}{dt} \right)_{\text{blank}}"}
          </Formula>
          <p>
            Modulated-temperature DSC (MTDSC) overlays a sinusoidal temperature oscillation on top of the linear temperature ramp. This decouples reversing thermodynamic heat capacity phenomena (such as glass transitions and heat capacity shifts) from non-reversing kinetic events (such as cold crystallization, solvent evaporation, and chemical decomposition). Material scientists evaluate thermal stability alongside <Link href="/calculators/science/boiling-point-calculator">vaporization boiling thresholds</Link> and calculate solution concentrations via the <Link href="/calculators/science/concentration-calculator">solution concentration tool</Link>.
          </p>
          <p>
            In cryogenic rocketry and LNG transport vessel engineering, cryogenic fluids (liquid nitrogen at 77 K and liquid methane at 111 K) undergo flash boil-off when wall heat leak exceeds sensible heat absorption capacities. Finite element thermal models incorporate temperature-dependent specific heat curves to size vacuum perlite insulation blankets and prevent catastrophic over-pressurization.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why does water have such an extraordinarily high specific heat capacity?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Water &apos;s high specific heat (4,184 J/kg·°C) results from its extensive intermolecular hydrogen bonding network. When thermal energy is added to liquid water, a substantial fraction of the energy is consumed breaking and reorienting intermolecular hydrogen bonds rather than directly increasing molecular translational kinetic energy, moderating global planetary climates and biological internal body temperatures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between specific heat capacity and heat capacity?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Heat capacity (C, in J/°C) is an extensive property that depends on the total mass of the object (C = m · c). Specific heat capacity (c, in J/(kg·°C)) is an intensive physical property of the substance itself, normalized per unit mass so that 1 gram of copper has the exact same specific heat capacity as a 50-ton copper ingot.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does specific heat relate to thermal effusivity and thermal diffusivity?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Thermal diffusivity (α = k / (ρ · c)) measures the speed at which heat propagates through a material, representing the ratio of heat conduction to heat storage. Thermal effusivity (e = √(k · ρ · c)) measures a material &apos;s ability to exchange thermal energy with its surroundings upon contact, determining why metal surfaces feel colder to human skin than wood at the same ambient temperature. Verify density inputs using the <Link href="/calculators/science/density-calculator">density calculator</Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative International Standards & Calorimetric Metrology</h2>
          <p>
            For standardized specific heat measurements, calorimeter calibration protocols, and reference thermal data, refer to:
          </p>
          <ul>
            <li>
              <strong>ASTM International (ASTM E1269):</strong> Standard Test Method for Determining Specific Heat Capacity by Differential Scanning Calorimetry.
            </li>
            <li>
              <strong>NIST Chemistry WebBook (SRD 69):</strong> Thermophysical Properties of Fluid Systems and Reference Heat Capacities.
            </li>
            <li>
              <strong>ISO 11357-4:</strong> Plastics — Differential Scanning Calorimetry (DSC) — Part 4: Determination of Specific Heat Capacity.
            </li>
            <li>
              <strong>International Committee for Weights and Measures (CIPM):</strong> Thermodynamic Temperature and Calorimetric Standards (BIPM).
            </li>
          </ul>
        </>
      }
    >
      <SpecificHeatCalculatorComponent />
    </CalcPage>
  );
}
