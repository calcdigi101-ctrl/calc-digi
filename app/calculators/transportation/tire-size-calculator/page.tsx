import type { Metadata } from "next";
import Link from "next/link";
import TireSizeCalculatorComponent from "@/components/calcs/transportation/tire-size-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TireDiameterSpeedometerVarianceChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/tire-size-calculator";
const TITLE = "Tire Size Calculator | Diameter, Sidewall & Speedometer Error";
const DESCRIPTION =
  "Compare tire dimensions, overall diameter, sidewall height, wheel circumference, revolutions per mile, and speedometer calibration error.";

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
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
  { href: "/calculators/transportation/mpg-calculator", icon: "📊", name: "MPG Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/road-trip-cost-calculator", icon: "🗺️", name: "Road Trip Cost Calculator" },
];

export default function TireSizeCalculatorPage() {
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
            <strong>Tire Sizing Quick Guidance:</strong> Changing automotive tire or wheel specifications directly modifies the rolling circumference of your vehicle's driven wheels. A standard ISO metric tire designation such as <strong>225/50R17</strong> defines a section width of 225 millimeters, an aspect ratio where sidewall height equals 50% of width (112.5 mm), and a wheel rim diameter of 17 inches. When you increase overall tire diameter by more than 3% without recalibrating your vehicle's transmission speed sensor, your speedometer will read slower than your actual ground speed, falsifying fuel economy numbers modeled in our <Link href="/calculators/transportation/mpg-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">MPG calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Speedometer Reading Error Across Tire Outer Diameter Variations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern vehicle instrument clusters and powertrain control modules (PCMs) determine ground speed by measuring wheel rotational velocity via anti-lock braking system (ABS) tone rings or transmission output shafts. The onboard computer assumes a fixed factory rolling circumference. Installing larger all-terrain tires or aftermarket alloy wheels causes the wheel to cover more ground per revolution. Drivers monitoring interstate velocities with our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link> must account for this discrepancy to avoid inadvertent speeding citations.
          </p>

          <TireDiameterSpeedometerVarianceChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The comparison chart above illustrates true ground speed versus instrument cluster readouts across varying tire outer diameter modifications. When upgrading to an oversize tire with +1.0 inch greater diameter (+3.7% circumference increase), an indicated 70 mph speedometer reading corresponds to an actual road speed of 72.6 mph. With an aggressive +2.0 inch oversize fitment (+7.5% increase), an indicated 70 mph represents 75.3 mph. Conversely, downsizing tire diameter causes the speedometer to read faster than actual road speed while artificially inflating odometer mileage.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation of Tire Geometry & Speedometer Calibration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            ISO metric tire dimensions translate nominal section width (<Formula>{"W"}</Formula> in mm), aspect ratio (<Formula>{"AR"}</Formula> as a percentage), and rim diameter (<Formula>{"R"}</Formula> in inches) into total overall outer diameter (<Formula>{"D_{tire}"}</Formula>) and rolling circumference (<Formula>{"C_{rolling}"}</Formula>):
          </p>

          <Formula>
            {"H_{sidewall} = W \times \left( \frac{AR}{100} \right) \times \frac{1}{25.4} \quad \text{(inches)}"}
          </Formula>

          <Formula>
            {"D_{tire} = R + \left( 2 \times H_{sidewall} \right) \quad \text{(inches)}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Rolling circumference <Formula>{"C_{tire}"}</Formula> and wheel revolutions per mile (<Formula>{"Rev/mi"}</Formula>) are subsequently modeled as:
          </p>

          <Formula>
            {"C_{tire} = \pi \times D_{tire}, \qquad \text{Revolutions Per Mile} = \frac{63,360\text{ inches/mile}}{C_{tire}}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            When transitioning from an original factory tire (<Formula>{"D_{orig}"}</Formula>) to a replacement specification (<Formula>{"D_{new}"}</Formula>), the speedometer calibration variance and actual true velocity (<Formula>{"V_{actual}"}</Formula>) at any indicated speed (<Formula>{"V_{indicated}"}</Formula>) follow:
          </p>

          <Formula>
            {"\% \text{ Variance} = \left( \frac{D_{new} - D_{orig}}{D_{orig}} \right) \times 100, \qquad V_{actual} = V_{indicated} \times \left( \frac{D_{new}}{D_{orig}} \right)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Odometer drift from oversized tires artificially reduces recorded mileage, which can alter vehicle market valuation calculated in our <Link href="/calculators/transportation/car-depreciation-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">car depreciation calculator</Link> and distort long-distance fuel expenditure computed via our <Link href="/calculators/transportation/fuel-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">fuel cost calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Specification Comparison Table: Plus-Sizing & Wheel Upgrade Profiles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below demonstrates the engineering principle of 'Plus-Sizing'—increasing wheel rim diameter while reducing tire aspect ratio to maintain OEM rolling circumference within the safe 3% industry tolerance:
          </p>

          <DataTable
            head={["Tire Specification", "Section Width / Sidewall", "Total Diameter", "Rev / Mile", "Speed @ 65 Indicated", "Fitment Classification"]}
            rows={[
              ["205/55R16 (OEM Base)", "205 mm / 4.44 in", "24.88 in (632 mm)", "810 rev/mi", "65.0 mph", "Factory OEM stock specification"],
              ["225/45R17 (Plus-One)", "225 mm / 3.99 in", "24.97 in (634 mm)", "807 rev/mi", "65.2 mph", "+0.36% (Ideal performance upgrade)"],
              ["225/40R18 (Plus-Two)", "225 mm / 3.54 in", "25.09 in (637 mm)", "803 rev/mi", "65.5 mph", "+0.84% (Ideal track / sport upgrade)"],
              ["245/45R18 (Oversized)", "245 mm / 4.34 in", "26.68 in (678 mm)", "755 rev/mi", "69.7 mph", "+7.23% (Unsafe; rubs fender & error)"],
              ["195/65R15 (Winter Fit)", "195 mm / 4.99 in", "24.98 in (634 mm)", "807 rev/mi", "65.2 mph", "+0.40% (Optimal snow tire narrow setup)"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The Plus-One and Plus-Two upgrades preserve factory overall diameter within 1%, maintaining accurate speedometer calibration, factory ABS braking response, and original transmission shift timing. Conversely, the oversized 245/45R18 configuration introduces a dangerous 7.23% speedometer error, causing an indicated 65 mph to actually travel at nearly 70 mph. When planning cross-country itineraries with our <Link href="/calculators/transportation/road-trip-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">road trip cost calculator</Link> and checking route distances with our <Link href="/calculators/transportation/distance-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">distance calculator</Link>, verified tire dimensions ensure accurate trip logs.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mechanical & Dynamics Tradeoffs: Ride Quality, Gearing & Fuel Economy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Selecting non-factory tire dimensions alters vehicle dynamics far beyond speedometer readouts:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Effective Final Drive Ratio:</strong> Installing larger diameter tires effectively creates taller gearing. While taller gearing can marginally lower engine cruising RPM on level freeways, it degrades off-the-line torque, sluggishly retards low-speed acceleration, and forces automatic transmissions to hunt between gears on highway inclines.
            </li>
            <li>
              <strong>Unsprung Mass & Rotational Inertia:</strong> Larger wheels and wider tires significantly increase unsprung weight at each corner of the vehicle. Heavier wheel assemblies degrade suspension damper response, increase ride harshness over road imperfections, and slightly elevate vehicle energy consumption modeled in our <Link href="/calculators/transportation/ev-savings-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">EV savings calculator</Link>.
            </li>
            <li>
              <strong>Sidewall Compliance vs Cornering Rigidity:</strong> Lower profile tires (aspect ratios below 45) feature stiffer sidewalls that deliver sharper steering response and higher lateral cornering grip. However, shorter sidewalls provide minimal impact cushioning, elevating the risk of rim fractures and tire pinch flats from metropolitan potholes.
            </li>
            <li>
              <strong>Wheel Well Clearance & Scrub Radius:</strong> Oversized tires or altered wheel offsets can cause tire rub against inner plastic fender liners, suspension struts, or brake calipers during full steering lock or heavy suspension compression.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Wheel Offset (ET), Scrub Radius & Structural Tire Construction Classes
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When upsizing wheels and tires, automotive enthusiasts often focus exclusively on section width and rim diameter while overlooking wheel offset (commonly denoted as ET, from the German <em>Einpresstiefe</em>). Offset represents the distance in millimeters from the wheel's centerline to its mounting hub pad. Altering wheel offset shifts the wheel inward toward the suspension strut or outward toward the exterior fender lip, fundamentally altering the vehicle's scrub radius—the distance between the steering kingpin axis and the center of the tire contact patch. Commuters evaluating daily running outlays with our <Link href="/calculators/transportation/commute-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">commute cost calculator</Link> will notice that improper offset accelerates outer shoulder tire tread wear and increases steering wheel tug over highway expansion joints.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, truck and SUV owners frequently choose between standard Passenger-metric (P-metric) tires and heavy-duty Light Truck (LT-metric) specifications. P-metric tires prioritize low rolling resistance, compliant passenger ride comfort, and reduced curb weight. In contrast, LT-metric tires feature 10-ply rated (Load Range E) structural carcasses with reinforced steel belts and thicker sidewalls designed to withstand severe rock cuts and heavy payload towing. However, the added rotational unsprung mass of LT tires reduces fuel efficiency, which can be tracked alongside monthly vehicle financing with our <Link href="/calculators/transportation/car-payment-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">car payment calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Finally, tire speed ratings (ranging from Q for off-road rubber to Y and (Y) for exotic supercars) reflect the maximum sustained velocity a tire can dissipate centrifugal heat without experiencing sudden structural tread delamination. Matching both the load index and speed rating specified on your vehicle's door jamb tire placard is mandatory to ensure safety when cruising at highway speeds modeled in our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link>.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tire Pressure Monitoring Systems (TPMS) & Calibration Procedures
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Whenever automotive enthusiasts alter wheel rim diameters or swap tire aspect ratios, recalibrating the Tire Pressure Monitoring System (TPMS) is essential to preserve safety compliance. Modern automobiles deploy either Direct TPMS (utilizing battery-powered radio sensors mounted inside the valve stems measuring actual gauge pressure and temperature) or Indirect TPMS (utilizing ABS wheel speed sensors to compute rotational rate differentials indicative of under-inflation). When mounting aftermarket alloy wheels, Direct TPMS sensors must either be cloned to duplicate factory sensor serial IDs or relearned through the vehicle's onboard diagnostic computer. With Indirect TPMS setups, an intentional tire diameter change alters rotational circumference, requiring the driver to perform an explicit dashboard reset procedure while driving at steady highway cruise speeds to establish a new rotational baseline. Furthermore, maintaining accurate cold tire inflation pressures according to door jamb placard specifications prevents irregular center tread wear, maximizes hydroplaning resistance, and optimizes vehicle braking distances under emergency stopping conditions. Routine cross-rotation every 5,000 to 7,500 miles also equalizes tread depth differences across driven and non-driven axles, extending usable tire life.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About Automotive Tire Sizing
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What is the maximum safe percentage change in tire diameter?
              </h3>
              <p>
                The universal automotive engineering rule of thumb recommends keeping replacement tire diameter within plus or minus 3% of original factory equipment specifications. Changes exceeding 3% disrupt speedometer accuracy, degrade ABS and Electronic Stability Control (ESC) braking algorithms, cause transmission gear hunting, and can lead to mechanical rubbing against suspension components.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How do I read tire size markings like 225/45R18 95W?
              </h3>
              <p>
                In 225/45R18 95W: <strong>225</strong> is section width in millimeters; <strong>45</strong> is aspect ratio (sidewall height equals 45% of 225 mm, or 101.25 mm); <strong>R</strong> indicates radial construction; <strong>18</strong> is wheel rim diameter in inches; <strong>95</strong> is the load index (1,521 lbs per tire); and <strong>W</strong> is the maximum speed rating (up to 168 mph).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Does changing tire size void my vehicle warranty?
              </h3>
              <p>
                Installing reasonable Plus-One or Plus-Two sizes that match OEM rolling diameter within 1-2% does not void vehicle warranties. However, fitting massive oversized tires or extreme lift setups that strain wheel bearings, ball joints, or differential gearing may cause dealerships to deny warranty coverage for premature drivetrain and suspension failures.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why are narrower tires recommended for winter driving?
              </h3>
              <p>
                A narrower tire (such as a 195 mm width compared to a 225 mm standard tire) concentrates vehicle curb weight over a smaller contact area. This increased ground contact pressure enables the tire to slice through slush and pack snow, delivering superior mechanical traction and braking bite compared to wide tires that tend to hydroplane and float over loose winter precipitation.
              </p>
            </div>
          </div>
        </>
      }
    >
      <TireSizeCalculatorComponent />
    </CalcPage>
  );
}
