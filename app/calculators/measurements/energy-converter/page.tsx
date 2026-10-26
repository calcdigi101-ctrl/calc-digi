import type { Metadata } from "next";
import Link from "next/link";
import EnergyConverterComponent from "@/components/calcs/measurements/energy-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EnergyThermodynamicWorkEquivalenceChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/energy-converter";
const TITLE = "Energy Converter | Joules, Kilowatt-Hours, Calories & BTUs";
const DESCRIPTION =
  "Convert Joules, kilowatt-hours, dietary calories, British Thermal Units (BTU), electronvolts, and foot-pounds with thermodynamic work and enthalpy modeling.";

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
  { href: "/calculators/measurements/power-converter", icon: "🔌", name: "Power Converter" },
  { href: "/calculators/measurements/temperature-converter", icon: "🌡️", name: "Temperature Converter" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "🏎️", name: "Kinetic Energy" },
  { href: "/calculators/physics/force-calculator", icon: "💥", name: "Force Calculator" },
  { href: "/calculators/measurements/fuel-economy-converter", icon: "⛽", name: "Fuel Economy" },
  { href: "/pages/measurements", icon: "⚡", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical definition of a Joule (J) in the SI system?",
    a: "One Joule (1 J) is the SI coherent derived unit of energy, work, and heat. It is defined as the work done when a force of one Newton acts through a distance of one meter in the direction of the force (1 J = 1 N·m = 1 kg·m²·s⁻²). Alternatively, it represents the energy dissipated per second by an electric current of one Ampere flowing through a resistance of one Ohm (1 J = 1 W·s).",
  },
  {
    q: "What is the crucial difference between a chemical calorie and a dietary Calorie?",
    a: "In chemistry and physics, a 'small calorie' (cal) is the thermal energy needed to raise the temperature of 1 gram of water by 1°C at standard atmospheric pressure (~4.184 Joules). In food nutritional science, a 'large Calorie' (capitalized Calorie, or kcal) equals 1,000 small calories (4,184 Joules). A 250-Calorie candy bar actually contains 250,000 scientific calories of chemical energy.",
  },
  {
    q: "How is a kilowatt-hour (kWh) related to the standard SI Joule?",
    a: "A kilowatt-hour (kWh) is a commercial unit of electrical and thermal energy equal to 1,000 Watts of continuous power delivered over one hour (3,600 seconds). Therefore, 1 kWh = 1,000 W × 3,600 s = 3,600,000 Joules (3.6 Megajoules, MJ).",
  },
  {
    q: "What is a British Thermal Unit (BTU) and where is it used today?",
    a: "A British Thermal Unit (BTU) is an imperial unit of thermal energy defined as the heat required to raise the temperature of 1 pound of liquid water by 1°F (~1,055.06 Joules). While largely phased out in the UK, it remains standard across North America for rating natural gas heaters, air conditioning cooling capacity, and steam generation.",
  },
];

export default function EnergyConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Thermodynamic Guidance:</strong> Energy quantifies the capacity of a physical system to perform work or produce heat. In mechanical physics, electrical power distribution, and nutritional metabolism, cross-reference instantaneous power ratings in our <Link href="/calculators/measurements/power-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power converter</Link> and calculate dynamic impact energy using our <Link href="/calculators/physics/kinetic-energy-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">kinetic energy calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermodynamic Foundations & First Law of Conservation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Energy represents humanity&apos;s most universal quantitative currency. Governed by the First Law of Thermodynamics, energy can neither be created nor destroyed in an isolated system; it merely transforms between kinetic motion, gravitational potential, electrostatic fields, chemical bonds, and thermal enthalpy. In classical mechanics, James Prescott Joule established the mechanical equivalence of heat in the 1840s, proving that mechanical paddle-wheel friction and thermal temperature rise reflect identical underlying energetic phenomena.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because energy manifests across diverse physical disciplines, multiple measurement units emerged historically. Power utilities meter residential electricity in kilowatt-hours (kWh), nutritionists measure dietary energy in kilocalories (kcal), HVAC technicians size thermal furnaces in British Thermal Units (BTU), quantum physicists measure atomic bandgaps in electronvolts (eV), and petroleum engineers measure crude oil reserves in barrels of oil equivalent (BOE).
          </p>

          <EnergyThermodynamicWorkEquivalenceChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Fundamental SI Energy Factors
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In the International System of Units, the Joule (J) serves as the coherent derived unit for all energetic forms. The conversion from any energy unit to another executes through the invariant Joule:
          </p>
          <Formula>{"E_{\\text{target}} = E_{\\text{source}} \\times \\left( \\frac{\\eta_{\\text{source}}}{\\eta_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where η represents the exact scalar factor in Joules. The foundational legal equivalences defined under NIST SP 811 are:
          </p>
          <Formula>{"1 \\text{ kWh} = 3.6 \\times 10^6 \\text{ J}, \\quad 1 \\text{ cal}_{\\text{th}} = 4.184 \\text{ J}, \\quad 1 \\text{ BTU}_{\\text{IT}} = 1055.05585262 \\text{ J}"}</Formula>
          <Formula>{"1 \\text{ eV} = 1.602176634 \\times 10^{-19} \\text{ J}, \\quad 1 \\text{ ft}\\cdot\\text{lbf} = 1.3558179483314 \\text{ J}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To evaluate mechanical forces acting over linear distances to generate work, cross-reference our <Link href="/calculators/physics/force-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">force calculator</Link> and calculate thermodynamic state shifts in the <Link href="/calculators/measurements/temperature-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">temperature converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Energy Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles authoritative conversion coefficients across subatomic, chemical, mechanical, electrical, and astrophysical energy regimes:
          </p>
          <DataTable
            head={["Energy Unit", "Symbol", "Value in Joules (J)", "Value in Kilowatt-Hours (kWh)"]}
            rows={[
              ["Electronvolt", "eV", "1.602177 × 10⁻¹⁹ J", "4.45049 × 10⁻²⁶ kWh"],
              ["Erg (CGS System)", "erg", "1.0 × 10⁻⁷ J", "2.77778 × 10⁻¹⁴ kWh"],
              ["Foot-Pound Force", "ft·lbf", "1.355818 J", "3.76616 × 10⁻⁷ kWh"],
              ["Joule (SI Coherent)", "J / N·m", "1.0 J", "2.77778 × 10⁻⁷ kWh"],
              ["Thermochemical Calorie", "cal", "4.184 J", "1.16222 × 10⁻⁶ kWh"],
              ["Dietary Food Calorie (Kcal)", "Cal / kcal", "4,184.0 J", "0.00116222 kWh"],
              ["British Thermal Unit", "BTU", "1,055.056 J", "0.000293071 kWh"],
              ["Watt-Hour", "Wh", "3,600.0 J", "0.001 kWh"],
              ["Kilowatt-Hour (Commercial)", "kWh", "3,600,000.0 J", "1.0 kWh"],
              ["Megajoule", "MJ", "1,000,000.0 J", "0.277778 kWh"],
              ["Gigajoule", "GJ", "1,000,000,000.0 J", "277.778 kWh"],
              ["Therm (Natural Gas)", "thm", "105,480,400.0 J", "29.3001 kWh"],
              ["Barrel of Oil Equivalent", "BOE", "6.12 × 10⁹ J", "1,700.0 kWh"],
              ["Ton of TNT Explosive", "tTNT", "4.184 × 10⁹ J", "1,162.22 kWh"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Electric Vehicle Battery Pack Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a lithium-ion battery engineer designing an electric vehicle (EV) battery pack rated at 82.5 kilowatt-hours (kWh) of usable capacity. The automotive powertrain simulation software requires energy storage metrics to be expressed in SI megajoules (MJ), equivalent gasoline energy gallons (GGE), and total mechanical foot-pounds:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert kWh to Megajoules):</strong> 82.5 kWh × 3.6 MJ/kWh = 297.0 Megajoules (2.97 × 10⁸ Joules).</li>
            <li><strong>Step 2 (Gasoline Gallon Equivalent Comparison):</strong> One gallon of standard automotive gasoline contains approximately 120.5 MJ (33.7 kWh) of lower heating value (LHV) chemical energy. Therefore: 82.5 kWh ÷ 33.7 kWh/GGE = 2.448 Gasoline Gallons Equivalent.</li>
            <li><strong>Step 3 (Convert Joules to Imperial Foot-Pounds):</strong> 297,000,000 J ÷ 1.355818 J/(ft·lbf) = 219,055,950 foot-pounds.</li>
            <li><strong>Step 4 (Energy Consumption & Efficiency):</strong> Vehicle range can be evaluated against EPA test cycles using our <Link href="/calculators/measurements/fuel-economy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">fuel economy converter</Link> and electrical charging currents modeled in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mass-Energy Equivalence & Nuclear Binding Energies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1905, Albert Einstein published the most celebrated formula in physics: E = mc², establishing that mass and energy are interchangeable manifestations of the same physical entity. Because the speed of light squared c² is extraordinarily immense (~8.98755 × 10¹⁶ m²/s²), a microscopic quantity of matter harbors monumental latent energy. Complete conversion of just 1 gram (0.001 kg) of mass liberates exactly 8.98755 × 10¹³ Joules—equivalent to approximately 21.48 kilotons of TNT or the energy released by burning 2.8 million liters of gasoline.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial nuclear fission power stations, uranium-235 nuclei capture thermal neutrons, splitting into smaller fission fragments with a tiny mass defect of approximately 0.1% per reaction. This mass defect converts directly into kinetic energy of fission fragments, producing thermal heat that drives steam turbine electrical generators. You can cross-verify fuel mass in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Semiconductor Bandgaps & Quantum Electronvolts (eV)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In solid-state physics and microelectronics, the Joule is far too large an energetic unit to describe quantum atomic phenomena. Physicists utilize the electronvolt (eV), defined as the kinetic energy acquired by a single electron accelerated across an electric potential difference of one Volt: 1 eV = 1.602176634 × 10⁻¹⁹ Joules.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Crystalline silicon, the foundation of modern computer microprocessors, exhibits an indirect electronic bandgap of approximately 1.12 eV at room temperature (300 K). Photons with energy greater than this threshold (wavelengths λ &lt; 1,100 nm) can excite valence electrons into the conduction band, generating electron-hole pairs that produce electric current in solar photovoltaic cells.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Home Energy Bills, Dietetics & Athletic Metabolism
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In residential household billing, electric utilities charge consumers per kilowatt-hour consumed (e.g., a 100-Watt incandescent light bulb burning for 10 hours consumes 1 kWh). In human nutrition, food packaging displays caloric content in dietary Calories (kcal). Burning 2,000 kcal per day corresponds to a continuous metabolic power output of approximately 96.85 Watts—virtually identical to the heat dissipation of a standard 100W light bulb.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In athletic sports physiology, endurance runners and cyclists monitor metabolic energy expenditure in kilojoules (kJ) using crank-arm strain gauge power meters. Understanding that human mechanical efficiency averages approximately 20% to 25% (with the remaining 75% to 80% converted to body heat) allows athletes to replenish carbohydrates accurately during marathon events. For academic calculations, explore our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, track grades in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <EnergyConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Chemical Enthalpy of Combustion & Higher vs Lower Heating Values (HHV / LHV)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In combustion thermodynamics and thermal power generation, the chemical energy released during fuel oxidation is quantified using bomb calorimeters complying with ASTM D240 and ISO 1928 standards. Mechanical engineers must distinguish between the Higher Heating Value (HHV, or gross calorific value) and the Lower Heating Value (LHV, or net calorific value).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Higher Heating Value assumes that all water vapor produced during hydrocarbon combustion is completely condensed into liquid water at 25°C, thereby recovering the latent heat of vaporization (approximately 2.44 MJ per kg of water). The Lower Heating Value assumes water vapor remains in the gaseous exhaust flue stack, venting its latent heat into the atmosphere. For natural gas (pure methane), HHV equals approximately 55.5 MJ/kg (39.8 MJ/m³ or 1,070 BTU/SCF), whereas LHV drops to ~50.0 MJ/kg (35.8 MJ/m³ or 960 BTU/SCF). In international liquefied natural gas (LNG) contracts, billions of dollars depend on whether pricing is indexed to metric gigajoules (GJ) or British thermal units (MMBTU).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hydroelectric Gravitational Potential & Pumped Storage Reservoir Capacities
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On national electrical utility grids, pumped storage hydroelectric reservoirs represent over 90% of global utility-scale electrical energy storage capacity. The gravitational potential energy stored in an elevated reservoir is governed by classical mechanics: E_pot = m × g × h = ρ × V × g × h, where ρ is water density (1,000 kg/m³), V is reservoir active volume in cubic meters, g is gravitational acceleration, and h is the effective net hydraulic head in meters.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For example, a pumped storage reservoir holding 10 million cubic meters of water with a hydraulic elevation head of 350 meters stores: 10⁷ m³ × 1,000 kg/m³ × 9.81 m/s² × 350 m = 3.4335 × 10¹³ Joules. Dividing by 3.6 × 10⁶ J/kWh yields approximately 9,537,500 kilowatt-hours (9.54 Gigawatt-hours, GWh) of grid storage capacity. Factoring in reversible Francis pump-turbine round-trip efficiency (typically 75% to 80%), power plant operators convert stored potential energy into dispatchable electricity during peak pricing hours.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermodynamic Entropy & Carnot Maximum Heat Engine Thermal Limits
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1824, French military engineer Nicolas Léonard Sadi Carnot established that no heat engine operating between a hot thermal reservoir at temperature T_hot and a cold reservoir at T_cold can exceed the Carnot thermal efficiency limit: η_Carnot = 1 - (T_cold / T_hot), where temperatures must be expressed in absolute Kelvin.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In coal, natural gas combined-cycle, and nuclear power plants, thermal energy released during fuel combustion cannot be fully converted into mechanical shaft work. The Second Law of Thermodynamics dictates that a substantial portion of thermal enthalpy must be rejected into cooling towers or ocean heat sinks as unavailable energy (anergy / entropy generation). Power plant thermal efficiency optimizations focus on maximizing boiler turbine inlet temperatures while minimizing condenser back-pressures.
          </p>

    </CalcPage>
  );
}
