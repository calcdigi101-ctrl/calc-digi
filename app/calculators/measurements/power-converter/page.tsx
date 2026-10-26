import type { Metadata } from "next";
import Link from "next/link";
import PowerConverterComponent from "@/components/calcs/measurements/power-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PowerEnergyRateComparisonChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/power-converter";
const TITLE = "Power Converter | Watts, Horsepower, Kilowatts & BTU/hr";
const DESCRIPTION =
  "Convert Watts, mechanical horsepower, metric horsepower, kilowatts, and BTU per hour with thermodynamic rate derivations and interactive power regime charts.";

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
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/calculators/measurements/torque-converter", icon: "🔧", name: "Torque Converter" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "💡", name: "Ohm's Law" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "🏎️", name: "Kinetic Energy" },
  { href: "/calculators/measurements/fuel-economy-converter", icon: "⛽", name: "Fuel Economy" },
  { href: "/pages/measurements", icon: "🔌", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical definition of a Watt (W) in the SI system?",
    a: "One Watt (1 W) is the SI coherent derived unit of power, defined as an energy transfer rate of exactly one Joule per second (1 W = 1 J/s = 1 N·m/s = 1 kg·m²·s⁻³). In electrical circuits, one Watt equals the power dissipated when an electric potential of one Volt produces a current of one Ampere (P = V × I).",
  },
  {
    q: "What is the difference between mechanical horsepower and metric horsepower?",
    a: "Mechanical horsepower (hp or imperial hp) was formulated by James Watt as 33,000 foot-pounds per minute, equaling approximately 745.69987 Watts. Metric horsepower (PS, cv, or pk) was standardized in continental Europe as the power needed to lift 75 kilograms against standard gravity by 1 meter in 1 second, equaling exactly 735.49875 Watts. A 300 PS German car produces ~295.8 imperial horsepower.",
  },
  {
    q: "What is a 'ton of refrigeration' in air conditioning and chiller systems?",
    a: "A ton of refrigeration (TR or RT) is an HVAC power rating equal to the continuous cooling rate required to freeze 2,000 pounds (one US short ton) of liquid water at 0°C into ice in 24 hours. Under standard latent heat of fusion (144 BTU/lb), one ton of refrigeration equals exactly 12,000 BTU/hr (approximately 3,516.85 Watts or 3.517 kW).",
  },
  {
    q: "How does rotational torque relate mathematically to engine horsepower?",
    a: "In rotational mechanical drivetrains, power equals torque multiplied by angular velocity: P = τ × ω. In imperial engineering units, horsepower = (Torque in ft-lb × RPM) ÷ 5,252. In metric units, Power in kW = (Torque in N·m × RPM) ÷ 9,549. Because 5,252 is the mathematical balance constant, any engine's horsepower and torque curves intersect at exactly 5,252 RPM.",
  },
];

export default function PowerConverterPage() {
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
            <strong>Quick Power Guidance:</strong> Power quantifies the temporal rate of energy transfer or work delivery. In electrical engineering, automotive dynamometer testing, and industrial HVAC, cross-reference accumulated energy in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link> and calculate engine rotational dynamics using our <Link href="/calculators/measurements/torque-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">torque converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Physical Foundations of Power Delivery: Rate of Work Transfer
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While energy measures total capacity to perform mechanical work, power measures how rapidly that work is executed: P = dW/dt. An athlete lifting a 100 kg barbell in 1 second performs identical mechanical work to an athlete lifting the same barbell in 4 seconds; however, the first athlete delivers four times the instantaneous power output. In the International System of Units, power is measured in Watts (W), named after Scottish inventor James Watt whose steam engines propelled the Industrial Revolution.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern technological systems span staggering orders of magnitude in power delivery. Microscopic biosensors consume picowatts (10⁻¹² W), smartphone processors operate on milliwatts to watts, passenger automobiles generate kilowatts (hundreds of horsepower), commercial jet engines generate tens of megawatts, and national power grids synchronize gigawatts (10⁹ W) of electrical capacity.
          </p>

          <PowerEnergyRateComparisonChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation & Exact Conversion Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every power conversion executes through the SI base unit of Watts (1 W = 1 J/s). The conversion from source power to target unit computes via scalar ratios:
          </p>
          <Formula>{"P_{\\text{target}} = P_{\\text{source}} \\times \\left( \\frac{\\pi_{\\text{source}}}{\\pi_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where π represents the exact conversion scalar in Watts. Under international metrological definitions:
          </p>
          <Formula>{"1 \\text{ hp}_{\\text{mech}} = \\frac{33,000 \\text{ ft}\\cdot\\text{lbf}}{\\text{min}} = \\frac{33,000 \\times 1.355817948 \\text{ J}}{60 \\text{ s}} \\approx 745.699872 \\text{ W}"}</Formula>
          <Formula>{"1 \\text{ PS (metric hp)} = 75 \\text{ kg} \\times 9.80665 \\text{ m/s}^2 \\times 1 \\text{ m/s} = 735.49875 \\text{ W}"}</Formula>
          <Formula>{"1 \\text{ BTU/hr} = \\frac{1055.055852 \\text{ J}}{3600 \\text{ s}} \\approx 0.29307107 \\text{ W}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In electrical power distribution circuits, real power interacts with reactive impedance; analyze circuit voltage and current in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link> and calculate wire transmission losses using our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Power Units
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across mechanical, thermal, electrical, and refrigeration engineering domains:
          </p>
          <DataTable
            head={["Power Unit", "Symbol", "Value in Watts (W)", "Value in Mechanical Horsepower (hp)"]}
            rows={[
              ["Milliwatt", "mW", "0.001 W", "1.34102 × 10⁻⁶ hp"],
              ["Watt (SI Coherent)", "W / J·s⁻¹", "1.0 W", "0.00134102 hp"],
              ["Kilowatt", "kW", "1,000.0 W", "1.341022 hp"],
              ["Megawatt", "MW", "1,000,000.0 W", "1,341.022 hp"],
              ["Gigawatt", "GW", "1,000,000,000.0 W", "1,341,022 hp"],
              ["Mechanical Horsepower (Imperial)", "hp / bhp", "745.69987 W", "1.0 hp"],
              ["Metric Horsepower (Pferdestärke)", "PS / cv / ch", "735.49875 W", "0.986320 hp"],
              ["Electric Horsepower", "hp(E)", "746.0 W", "1.000403 hp"],
              ["Boiler Horsepower", "BHP", "9,809.5 W", "13.1547 hp"],
              ["BTU per Hour", "BTU/hr", "0.293071 W", "0.000393015 hp"],
              ["Foot-Pound per Second", "ft·lbf/s", "1.355818 W", "0.00181818 hp"],
              ["Ton of Refrigeration", "TR / RT", "3,516.853 W", "4.71618 hp"],
              ["Calorie per Second", "cal/s", "4.184 W", "0.00561083 hp"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Industrial Chiller Plant
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a facility mechanical engineer selecting a centrifugal water chiller for a 350,000-square-foot corporate data center. Thermal cooling load calculations indicate a peak cooling demand of 1,250 tons of refrigeration (TR). The electrical utility infrastructure team requires this rating converted to metric kilowatts (kW) and thermal BTU/hr to verify cooling tower heat dissipation:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Tons of Refrigeration to Kilowatts):</strong> 1,250 TR × 3.516853 kW/TR = 4,396.07 kW (approximately 4.40 MW thermal cooling capacity).</li>
            <li><strong>Step 2 (Convert to BTU per Hour):</strong> 1,250 TR × 12,000 BTU/(hr·TR) = 15,000,000 BTU/hr.</li>
            <li><strong>Step 3 (Mechanical Horsepower Equivalent):</strong> 4,396,066 W ÷ 745.69987 W/hp = 5,895.22 mechanical horsepower.</li>
            <li><strong>Step 4 (Electrical Input Power & COP):</strong> With a coefficient of performance (COP) of 6.2, required electrical input compressor power equals 4,396.07 ÷ 6.2 = 709.04 kW. You can verify total hourly electricity cost in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link> and calculate circuit breaker sizing in the <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Historical Origin of James Watt&apos;s Horsepower Standard
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In the early 1780s, Scottish engineer James Watt sought a compelling marketing metric to convince coal mine operators to replace traditional draft pit ponies with his newly patented condensing steam engines. Observing heavy draft horses operating a mine capstan wheel over an eight-hour shift, Watt estimated that an average horse could pull with a force of 180 pounds while walking a 24-foot diameter circle 2.5 times per minute.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Watt calculated the distance covered per minute as 2.5 × 24π ≈ 188.5 feet. Multiplying by 180 pounds-force yielded 33,929 foot-pounds per minute, which he generously rounded to exactly 33,000 ft·lbf/min (550 ft·lbf per second). Although peak athletic horses can transiently exert upwards of 14 to 15 horsepower in brief sprint bursts, Watt&apos;s standard represented sustainable, continuous industrial work delivery.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Three-Phase AC Electrical Power: Real, Reactive & Apparent Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In alternating current (AC) power engineering, calculating electrical power is more complex than simple DC multiplication (P = V × I) due to phase shifts between sinusoidal voltage and current waveforms caused by inductive electric motors and capacitive banks:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Active / Real Power (P, Watts):</strong> The actual rate of electrical energy converted into mechanical shaft torque, heat, or light: P = V_rms × I_rms × cos(θ).</li>
            <li><strong>Reactive Power (Q, Volt-Amperes Reactive, VAR):</strong> The sustaining magnetic energy oscillating back and forth between generator windings and inductive motor coils: Q = V_rms × I_rms × sin(θ).</li>
            <li><strong>Apparent Power (S, Volt-Amperes, VA):</strong> The vector hypotenuse representing total generating capacity required to service the load: S = √(P² + Q²).</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Automotive Dynamometers: Brake Horsepower (bhp) vs Wheel Horsepower (whp)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In automotive performance tuning, enthusiasts must differentiate engine brake horsepower (bhp) measured directly at the engine flywheel from wheel horsepower (whp) measured at the tire contact patch on a chassis dynamometer roller. Parasitic frictional losses in the transmission gears, driveshaft universal joints, differential hypoid gears, and wheel bearings consume approximately 15% (for manual front-wheel-drive vehicles) to 25% (for all-wheel-drive automatic vehicles) of flywheel power.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A vehicle rated by the manufacturer at 400 bhp will typically record between 320 and 340 whp on a rolling-road dyno. Cross-reference vehicle speed and acceleration dynamics using our <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> and calculate drivetrain rotational moment in the <Link href="/calculators/measurements/torque-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">torque converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Home Appliances, Fitness & Sustainable Energy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In domestic households, power ratings dictate energy consumption and electrical panel loading. A standard microwave oven draws 1,200 Watts, an electric kettle draws 1,800 Watts, and a central heat pump operates at 3,500 to 5,000 Watts. In indoor fitness training, stationary cycling trainers display athletic power in Watts; an average recreational cyclist sustains 150 to 200 Watts, while elite Tour de France cyclists sustain 400 to 450 Watts over grueling mountain ascents.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In clean energy transitions, utility-scale wind turbines generate peak power ratings between 3 MW and 15 MW each. For academic calculations, explore our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and track coursework in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aerodynamic Power Extraction: The Betz Limit in Wind Turbines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In renewable wind power generation, kinetic power available in an oncoming column of wind of cross-sectional area A and velocity v is given by classical fluid dynamics: P_wind = 0.5 × ρ × A × v³, where ρ is air density (~1.225 kg/m³ at sea level). Because kinetic power scales with the cube of wind velocity, doubling wind speed from 5 m/s to 10 m/s increases available wind power by eightfold (2³ = 8).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, no wind turbine can extract 100% of this kinetic power because air must retain sufficient velocity to exit the swept rotor disk area. In 1919, German physicist Albert Betz derived the theoretical maximum power extraction efficiency of an idealized thin actuator disk: C_p_max = 16/27 ≈ 59.26% (the Betz Limit). Modern utility-scale wind turbines with aerodynamically optimized carbon-fiber blades achieve operational power coefficients C_p between 45% and 50%, converting megawatts of mechanical shaft power into grid electricity.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aviation Propulsion: Thrust Specific Fuel Consumption & Propulsive Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In aeronautical engineering, jet engines produce thrust force (expressed in kilonewtons, kN, or pounds-force, lbf) rather than rotational shaft horsepower. However, propulsive power delivered to an aircraft in flight is the product of net aerodynamic thrust force and aircraft true airspeed: P_prop = T × v_TAS. A commercial high-bypass turbofan producing 70,000 lbf (311.4 kN) of thrust while propelling an airliner at 500 knots (257.2 m/s) delivers: 311,375 N × 257.2 m/s = 80,085,850 Watts (approximately 80.1 MW, or over 107,400 mechanical horsepower).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Aeronautical engineers evaluate engine thermodynamic efficiency using Thrust Specific Fuel Consumption (TSFC), measuring fuel burn mass per unit of thrust delivered per hour, converting between metric grams per kilonewton-second (g/(kN·s)) and imperial pounds of fuel per pound-thrust per hour (lbm/(lbf·hr)).
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Electrical Transformer Core Hysteresis & Copper Joule Losses
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In electrical power grid transmission, high-voltage substations employ step-up and step-down transformers operating with efficiencies exceeding 98.5%. Electrical engineers divide power losses into two primary categories: no-load core losses (iron hysteresis and eddy currents in magnetic silicon steel laminations) and full-load copper losses (I²R resistive Joule dissipation in primary and secondary copper windings). Minimizing these thermal megawatt losses across national electrical distribution networks saves millions of kilowatt-hours annually.
          </p>
        </>
      }
    >
      <PowerConverterComponent />
    </CalcPage>
  );
}
