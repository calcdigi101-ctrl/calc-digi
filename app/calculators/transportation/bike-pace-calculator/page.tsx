import type { Metadata } from "next";
import Link from "next/link";
import BikePaceCalculatorComponent from "@/components/calcs/transportation/bike-pace-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CyclingPowerVelocityResistanceChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/bike-pace-calculator";
const TITLE = "Bike Pace Calculator | Cycling Speed, Mechanical Watts & Drag";
const DESCRIPTION =
  "Calculate cycling pace, average velocity, mechanical power output in watts, aerodynamic drag resistance, and metabolic calories burned across road grades.";

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
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚲", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
];

export default function BikePaceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/transportation", label: "Transportation & Travel" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Cycling Physics Summary: Cubic Air Drag & Metabolic Power
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Unlike running where energy scales linearly with velocity, cycling power demand increases with the cube of airspeed (v3). At speeds exceeding 15 mph (24 km/h), overcoming aerodynamic wind drag consumes between 70% and 90% of a cyclist&apos;s mechanical wattage. You can cross-verify physical energy burn with our{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium underline hover:text-amber-900">
                calorie burn calculator
              </Link>{" "}
              and evaluate multi-modal urban transit expenses in the{" "}
              <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium underline hover:text-amber-900">
                commute cost calculator
              </Link>.
            </p>
          </div>

          <h2>Aerodynamic Drag Mechanics & The Governing Power Equation</h2>
          <CyclingPowerVelocityResistanceChart />
          <p>
            In athletic locomotion and vehicular dynamics, a bicycle-rider system moving through atmospheric air must overcome three distinct resistive forces: aerodynamic profile drag (F_aero), mechanical tire rolling resistance (F_rolling), and gravitational gradient resistance (F_gravity).
          </p>
          <p>
            The total instantaneous mechanical power (P_total) delivered to the rear drive wheel through pedals and drivetrain crank arms represents the product of these collective resistive vectors and forward ground velocity. When cycling on level pavement, aerodynamic drag dominates exponentially due to fluid boundary layer turbulence. Route journey intervals can be verified in our{" "}
            <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              speed distance time calculator
            </Link>:
          </p>

          <Formula>
            {"P_{\text{total}} = P_{\text{aero}} + P_{\text{rolling}} + P_{\text{gravity}} + P_{\text{drivetrain}}"}
          </Formula>

          <Formula>
            {"P_{\text{aero}} = \frac{1}{2} \rho C_d A \cdot (v + v_{\text{wind}})^2 \cdot v"}
          </Formula>

          <Formula>
            {"P_{\text{rolling}} = C_{rr} \cdot m \cdot g \cdot v"}
          </Formula>

          <Formula>
            {"P_{\text{gravity}} = m \cdot g \cdot \sin(\theta) \cdot v \approx m \cdot g \cdot s \cdot v"}
          </Formula>

          <h2>Cycling Velocity, Power Demand & Cadence Benchmark Matrix</h2>
          <p>
            The reference matrix below establishes standard physiological and mechanical benchmarks across cycling ability tiers, detailing required wattage, speed, and pacing over level tarmac:
          </p>

          <DataTable
            head={[
              "Cycling Category / Rider Profile",
              "Average Speed (mph)",
              "Speed (km/h)",
              "Pace (min/mile)",
              "Sustained Watts",
              "Watts / kg (75 kg)",
              "Metabolic Kcal/hr",
            ]}
            rows={[
              ["Casual Urban Commuter", "10.0 - 12.0 mph", "16 - 19 km/h", "5:00 - 6:00 min/mi", "60 - 90 W", "0.8 - 1.2 W/kg", "250 - 350 kcal"],
              ["Club Enthusiast (Zone 2 Endurance)", "14.0 - 16.0 mph", "22 - 26 km/h", "3:45 - 4:17 min/mi", "120 - 160 W", "1.6 - 2.1 W/kg", "450 - 600 kcal"],
              ["Sportive / Fast Century Rider", "18.0 - 20.0 mph", "29 - 32 km/h", "3:00 - 3:20 min/mi", "200 - 240 W", "2.7 - 3.2 W/kg", "750 - 900 kcal"],
              ["Competitive Road Racer (Cat 2/3)", "22.0 - 24.0 mph", "35 - 39 km/h", "2:30 - 2:43 min/mi", "280 - 340 W", "3.7 - 4.5 W/kg", "1,050 - 1,250 kcal"],
              ["Professional WorldTour Peloton", "26.0 - 28.0 mph", "42 - 45 km/h", "2:08 - 2:18 min/mi", "380 - 450 W", "5.1 - 6.0 W/kg", "1,400 - 1,700 kcal"],
              ["Track Sprint Specialist (20s Peak)", "38.0 - 44.0 mph", "61 - 71 km/h", "1:21 - 1:35 min/mi", "1,600 - 2,200 W", "18 - 25 W/kg", "Anaerobic Burst"],
            ]}
          />

          <h2>Worked Analytical Scenario: Pacing a 40-Mile Rolling Course</h2>
          <p>
            Consider an amateur endurance cyclist weighing 72 kg with an 8 kg carbon road bike (total system mass = 80 kg) targeting a 40.0-statute-mile route across rolling countryside with an average 1.5% gradient. To manage energy expenditure alongside dietary glycogen refueling planned in our{" "}
            <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              nutrition calculator
            </Link>{" "}
            and vehicle trip tracking via the{" "}
            <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              distance calculator
            </Link>, we compute target velocity, wattage, and caloric consumption:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Target Elapsed Duration:</strong> The cyclist aims to complete the 40-mile distance in exactly 2 hours and 15 minutes (2.25 hours).
              <Formula>
                {"\text{Target Velocity} = \frac{40.0\,\text{miles}}{2.25\,\text{hours}} = 17.78\,\text{mph} = 28.61\,\text{km/h} = 7.948\,\text{m/s}"}
              </Formula>
              Target pace = (2.25 * 60) / 40.0 = 3 minutes and 22 seconds per mile.
            </li>
            <li>
              <strong>Aerodynamic Drag Component:</strong> Assuming a standard road hood posture with an effective frontal area (CdA) of 0.32 m2 and sea-level air density of 1.225 kg/m3:
              <Formula>
                {"P_{\text{aero}} = 0.5 \times 1.225 \times 0.32 \times (7.948)^3 = 0.196 \times 502.08 = 98.4\,\text{Watts}"}
              </Formula>
            </li>
            <li>
              <strong>Tire Rolling Resistance:</strong> On 28mm clincher road tires (coefficient Crr = 0.0050):
              <Formula>
                {"P_{\text{rolling}} = 0.0050 \times 80\,\text{kg} \times 9.80665\,\text{m/s}^2 \times 7.948\,\text{m/s} = 31.2\,\text{Watts}"}
              </Formula>
            </li>
            <li>
              <strong>Gravitational Climbing Component:</strong> Factoring net positive vertical gain over the rolling 1.5% gradient:
              <Formula>
                {"P_{\text{gravity}} = 80\,\text{kg} \times 9.80665 \times 0.015 \times 7.948 = 93.5\,\text{Watts}"}
              </Formula>
            </li>
            <li>
              <strong>Total Drivetrain Wattage:</strong> Assuming a clean ceramic-lubricated chain with 97% transmission efficiency:
              <Formula>
                {"P_{\text{mechanical}} = \frac{98.4 + 31.2 + 93.5}{0.97} = \frac{223.1}{0.97} = 230.0\,\text{Watts} \quad (3.19\,\text{W/kg})"}
              </Formula>
            </li>
            <li>
              <strong>Metabolic Bioenergetics:</strong> At a human gross mechanical efficiency of 23.5%, the rider oxidizes approximately 780 kcal per hour, requiring a total of 1,755 kcal across the ride.
            </li>
          </ul>

          <h2>Frontal Area (CdA), Yaw Angles & Ambient Environmental Variables</h2>
          <p>
            The critical coefficient governing cycling aerodynamic efficiency is the drag area, denoted as CdA (the product of the drag coefficient Cd and frontal cross-sectional area A). An upright commuter on a Dutch city bicycle presents a CdA of 0.55 to 0.70 m2, whereas a professional time trial specialist tucked into aero extensions compresses their frontal profile to as little as 0.20 to 0.22 m2.
          </p>
          <p>
            Furthermore, crosswinds generate yaw angles that detach laminar airflow from bicycle wheel rims and down-tubes, creating turbulent vortex shedding. Modern aerodynamic deep-section carbon wheels (45mm to 65mm rim depth) utilize toroidal and truncated airfoil profiles to maintain boundary layer attachment at yaw angles up to 15 degrees, saving 12 to 18 watts of energy at race velocities.
          </p>

          <h2>Operational Pitfalls in Cycling Metrology & Power Meter Calibration</h2>
          <p>
            Athletes and cycling commuters must guard against common data discrepancies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Strain Gauge Zero-Offset Drift:</strong> Temperature fluctuations during outdoor rides cause thermal expansion in crank-arm aluminum, shifting zero-offset calibration. Failing to perform a manual zero-calibration before riding introduces power reading errors of 5% to 12%.
            </li>
            <li>
              <strong>Tire Pressure & Casing Hysteresis:</strong> Over-inflating road tires beyond optimal pressure (e.g., pumping to 120 PSI on rough asphalt) increases surface impedance, bouncing the bike microscopically and paradoxically increasing rolling resistance compared to running supple 80 PSI tubeless setups.
            </li>
            <li>
              <strong>Commuter Fuel vs Auto Savings:</strong> Bicycle commuting provides substantial financial savings compared to vehicle ownership costs modeled in our{" "}
              <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                car depreciation calculator
              </Link>{" "}
              and fuel consumption tracked in the{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                fuel cost calculator
              </Link>.
            </li>
            <li>
              <strong>Drivetrain Frictional Losses:</strong> A dirty, wax-depleted bicycle chain with road grit contamination generates up to 15 watts of unnecessary drivetrain frictional drag, reducing average speed by nearly 1.0 mph.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does doubling cycling speed require eight times more aerodynamic power?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Aerodynamic drag force is proportional to the square of velocity (v2). Because mechanical power is force multiplied by velocity (P = F * v), aerodynamic power scales with the cube of velocity (v3). Doubling speed from 10 mph to 20 mph multiplies aerodynamic power demand by 2^3 = 8 times.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between speed in miles per hour and cycling pace in minutes per mile?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Speed expresses distance traveled per unit of time (miles per hour), whereas pace expresses the time required to travel one fixed unit of distance (minutes per mile). For example, cycling at 15.0 mph equals a pace of 4:00 min/mi, while 20.0 mph equals a pace of 3:00 min/mi.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How much energy does drafting in a cycling paceline actually conserve?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Wind tunnel and velodrome research demonstrates that drafting directly behind another rider at 25 mph (40 km/h) reduces aerodynamic drag by 25% to 40%. Riding in the middle of a dense peloton can reduce wind resistance by up to 60%, allowing riders to maintain high speeds at low cardiovascular exertion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does rider body weight influence climbing versus flat terrain speed?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                On flat terrain, absolute power output and frontal aerodynamic profile (CdA) dictate velocity, favoring larger, powerful riders. On steep mountain ascents exceeding 6% grade, gravitational resistance (m * g * s * v) dominates, making power-to-weight ratio (Watts per kilogram) the sole determinant of climbing speed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do bicycle commuters calculate their net annual transportation savings?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Urban commuters compare maintenance and tire replacement costs directly against motor vehicle depreciation analyzed in our{" "}
                <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car depreciation calculator
                </Link>{" "}
                and recurring loan payments in the{" "}
                <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car payment calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the typical human gross mechanical efficiency during cycling?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In exercise physiology, human skeletal muscle efficiency ranges between 20% and 25%. This means that for every 100 kilocalories of dietary food energy consumed, only 20 to 25 kcal are converted into mechanical propulsion at the pedals; the remaining 75% to 80% is dissipated as metabolic heat.
              </p>
            </div>
          </div>

          <h2>Authoritative Cycling Biomechanics & Ergonomics Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Union Cycliste Internationale (UCI Regulations Part 1):</strong> Technical specifications for bicycle geometry, mass, and aerodynamic fairing limits.
            </li>
            <li>
              <strong>Martin JC, Milliken DL, et al.:</strong> Validation of a mathematical model for road cycling power (Journal of Applied Biomechanics).
            </li>
            <li>
              <strong>American College of Sports Medicine (ACSM):</strong> Guidelines for metabolic calculation of energy expenditure during stationary and outdoor cycling.
            </li>
            <li>
              <strong>National Highway Traffic Safety Administration (NHTSA):</strong> Bicycle safety and commuter transport infrastructure research reports.
            </li>
          </ul>
        </>
      }
    >
      <BikePaceCalculatorComponent />
    </CalcPage>
  );
}
