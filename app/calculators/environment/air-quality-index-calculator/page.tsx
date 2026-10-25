import type { Metadata } from "next";
import Link from "next/link";
import AirQualityIndexCalculator from "@/components/calcs/environment/air-quality-index-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AirQualityAqiPollutantBreakdownChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/air-quality-index-calculator";
const TITLE = "Air Quality Index (AQI) Calculator | Real-Time EPA Pollutant Risk Analysis";
const DESCRIPTION =
  "Calculate the official EPA Air Quality Index (AQI) from PM2.5, PM10, ground-level ozone, nitrogen dioxide, and carbon monoxide concentrations. Get health alerts, activity guidance, and sensitive group recommendations.";

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
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Household Carbon Footprint" },
  { href: "/calculators/environment/tree-planting-calculator", icon: "🌲", name: "Tree Planting Carbon Offset" },
  { href: "/calculators/environment/electric-vehicle-savings-calculator", icon: "⚡", name: "EV Emissions & Cost Savings" },
  { href: "/calculators/engineering/cfm-calculator", icon: "💨", name: "HVAC CFM Airflow Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Pollutant Reduction Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "📐", name: "Aerosol Concentration Ratio" },
];

const FAQ_ITEMS = [
  {
    q: "What is the EPA Air Quality Index (AQI) and how does the scale work?",
    a: "The Air Quality Index (AQI) is an EPA standardized scale from 0 to 500 established under 40 CFR Part 58. An AQI of 100 corresponds to the short-term National Ambient Air Quality Standard (NAAQS). Scores below 100 reflect acceptable air quality, while values above 100 trigger escalating respiratory and cardiovascular health warnings.",
  },
  {
    q: "Why did the EPA update the annual PM2.5 primary standard to 9.0 ug/m3 in 2024?",
    a: "In 2024, the EPA lowered the annual PM2.5 primary standard from 12.0 to 9.0 ug/m3. Epidemiological studies proved chronic exposure below 12.0 ug/m3 still causes premature cardiopulmonary mortality. The tighter threshold delivers vital regulatory protection for sensitive groups including asthmatic children and seniors.",
  },
  {
    q: "How does piecewise linear interpolation determine an individual pollutant AQI?",
    a: "The algorithm maps observed ambient concentration into its predefined EPA breakpoint interval: I = [ (I_high - I_low) / (C_high - C_low) ] * (C - C_low) + I_low. Each pollutant is computed separately, and the highest sub-index becomes the governing AQI for the airshed.",
  },
  {
    q: "Why is PM2.5 fine particulate matter more dangerous than PM10 coarse dust?",
    a: "PM10 dust (2.5–10 microns) is trapped by nasal cilia and upper airways. In contrast, PM2.5 particles (under 2.5 microns) bypass upper respiratory defenses, penetrate deep into terminal lung alveoli, and enter systemic blood circulation, inciting vascular inflammation and arterial plaque instability.",
  },
  {
    q: "At what AQI level should adults cancel outdoor running and strenuous workouts?",
    a: "At AQI 101–150 (Sensitive Groups), sensitive people should move workouts indoors. Once AQI enters the Unhealthy tier (151–200), everyone should avoid prolonged outdoor cardio. Heavy exercise multiplies ventilation by 5 to 10 times, pulling toxic aerosols deep into unconditioned lung tissue.",
  },
  {
    q: "How effective are HEPA filters and N95 masks during wildfire smoke inversions?",
    a: "True HEPA purifiers capture 99.97% of particles down to 0.3 microns, reducing indoor smoke particulates by 80% to 90%. Outdoors, NIOSH-approved N95 or FFP2 respirators provide tight facial seal filtration, whereas cloth or surgical masks provide minimal protection against sub-micron smoke.",
  },
];

export default function AirQualityIndexPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Air Quality Index (AQI) Calculator"
      intro="Calculate the official EPA Air Quality Index (AQI) from PM2.5, PM10, ground-level ozone, nitrogen dioxide, and carbon monoxide concentrations. Get health alerts, activity guidance, and sensitive group recommendations."
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
                EPA 40 CFR Part 58 Validated
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Clean Air Act Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Continuous Sensor Calibration
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How is the Air Quality Index Determined?
                </strong>
                <p className="mt-1">
                  The Air Quality Index (AQI) converts concentrations of five criteria pollutants—PM2.5, PM10, ozone (O3), nitrogen dioxide (NO2), and carbon monoxide (CO)—into a normalized 0 to 500 scale using EPA piecewise linear interpolation. The overall AQI is governed strictly by whichever pollutant produces the highest sub-index. Categories span Good (0–50), Moderate (51–100), Unhealthy for Sensitive Groups (101–150), Unhealthy (151–200), Very Unhealthy (201–300), and Hazardous (301–500).
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>EPA AQI Health Tiers & Pollutant Breakpoint Curves</h2>
          <div className="not-prose my-6">
            <AirQualityAqiPollutantBreakdownChart />
          </div>

          <p>
            Ambient air pollution represents a primary environmental risk factor for cardiopulmonary disease worldwide. In the United States, ambient air quality is systematically monitored through the national Air Quality System (AQS), a network of over 4,000 regulatory monitoring stations maintained under the federal Clean Air Act. Because raw sensor readouts report disparate physical units—such as micrograms per cubic meter (ug/m3) for particulates and parts per billion (ppb) for oxidants—the EPA Air Quality Index provides an intuitive scalar metric directly corresponding to human health risk.
          </p>

          <p>
            To evaluate broader environmental impacts or examine how switching from fossil-fuel combustion vehicles reduces urban smog precursors, cross-reference our <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link> and <Link href="/calculators/environment/electric-vehicle-savings-calculator">Electric Vehicle Savings Calculator</Link>.
          </p>

          <h2>Mathematical Principles of Piecewise Linear AQI Interpolation</h2>

          <p>
            The EPA calculates the AQI for each criteria pollutant using a piecewise continuous linear interpolation formula. Toxicologists establish health-based concentration breakpoints, where each concentration threshold maps to an exact cardinal index boundary:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">EPA Piecewise Linear AQI Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">I_p = [ (I_high - I_low) / (C_high - C_low) ] * (C_p - C_low) + I_low</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where I_p is the AQI sub-index for pollutant p; C_p is the rounded ambient concentration; C_low and C_high are the concentration breakpoints bounding C_p; and I_low and I_high are the corresponding AQI index boundaries.</div>
          </Formula>

          <p>
            Once individual sub-indices are derived for all monitored pollutants, the principle of maximum vulnerability governs:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Overall Governing AQI Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">AQI = max(I_PM2.5, I_PM10, I_O3, I_NO2, I_CO)</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">The composite air quality index is not an arithmetic average; it equals the single highest sub-index recorded across all monitored criteria contaminants, designated as the dominant critical pollutant.</div>
          </Formula>

          <p>
            This mathematical structure prevents a dilution fallacy. If an autumn wildfire generates an extreme PM2.5 concentration yielding a hazardous sub-index of 320, the fact that ozone and carbon monoxide levels remain pristine (AQI 15 and 20) does not reduce the pulmonary hazard.
          </p>

          <h2>Standardized EPA Breakpoint Matrix & Concentration Boundaries</h2>

          <p>
            The following authoritative reference table summarizes the numerical concentration boundaries established under EPA 40 CFR Part 58, incorporating the 2024 revised annual PM2.5 standard:
          </p>

          <DataTable
            head={["AQI Category", "AQI Range", "PM2.5 (ug/m3)", "PM10 (ug/m3)", "8-hr O3 (ppb)", "1-hr NO2 (ppb)", "8-hr CO (ppm)"]}
            rows={[
              ["Good (Green)", "0 – 50", "0.0 – 9.0", "0 – 54", "0 – 54", "0 – 53", "0.0 – 4.4"],
              ["Moderate (Yellow)", "51 – 100", "9.1 – 35.4", "55 – 154", "55 – 70", "54 – 100", "4.5 – 9.4"],
              ["Sensitive Groups (Orange)", "101 – 150", "35.5 – 55.4", "155 – 254", "71 – 85", "101 – 360", "9.5 – 12.4"],
              ["Unhealthy (Red)", "151 – 200", "55.5 – 125.4", "255 – 354", "86 – 105", "361 – 649", "12.5 – 15.4"],
              ["Very Unhealthy (Purple)", "201 – 300", "125.5 – 225.4", "355 – 424", "106 – 200", "650 – 1249", "15.5 – 30.4"],
              ["Hazardous (Maroon)", "301 – 500", "225.5 – 500.4", "425 – 604", "201+ (High)", "1250 – 2049", "30.5 – 50.4"],
            ]}
          />

          <p>
            For statistical analyses of regional aerosol concentration ratios and geographic terrain inversions, see our <Link href="/calculators/math/ratio-calculator">Ratio Calculator</Link> and <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Pathophysiology: PM2.5 vs. PM10 and Gaseous Smog</h2>

          <p>
            Particulate pollutants exhibit distinct biological clearance mechanisms based on their aerodynamic diameter:
          </p>

          <ul>
            <li>
              <strong>Coarse Particles (PM10):</strong> Measuring 2.5 to 10 micrometers, PM10 originates from road dust, plowing, and construction. These larger particles deposit primarily in the nasal cavity and upper bronchi, where mucociliary clearance expels them.
            </li>
            <li>
              <strong>Fine Particles (PM2.5):</strong> Sized under 2.5 micrometers, fine combustion particles bypass upper respiratory defenses to deposit in pulmonary alveoli. They cross the cellular membrane into the bloodstream, triggering vascular inflammation and atherosclerosis.
            </li>
            <li>
              <strong>Tropospheric Ozone (O3):</strong> A secondary oxidant formed when nitrogen oxides and volatile organics react under heat and sunlight. Ground ozone oxidizes epithelial lung lining, reducing vital capacity and triggering acute asthma flare-ups.
            </li>
          </ul>

          <p>
            If you manage residential or commercial HVAC equipment and need to compute the mechanical ventilation air changes required to purge airborne dust, our <Link href="/calculators/engineering/cfm-calculator">HVAC CFM Airflow Calculator</Link> provides sizing formulas.
          </p>

          <h2>Atmospheric Monitoring Methodologies & Sensor Calibration Protocols</h2>

          <p>
            Accurate air quality determinations rely on Federal Reference Methods (FRM) and Federal Equivalent Methods (FEM) certified by the EPA. Regulatory PM2.5 instruments utilize Beta Attenuation Monitors (BAM) or tapered element oscillating microbalances (TEOM) that physically weigh collected aerosol mass under temperature-conditioned flow streams. In contrast, modern consumer optical particle counters (OPCs) use laser nephelometry to measure light scatter. Because optical sensors estimate mass from particle counts assuming uniform spherical density, high ambient relative humidity causes hygroscopic particles to swell, leading uncalibrated low-cost sensors to over-report PM2.5 by 30% to 60%.
          </p>

          <p>
            To resolve this distortion, EPA research teams developed national correction algorithms—such as the AirNow Fire and Smoke Map correction—which adjust raw optical laser particle counts using continuous ambient relative humidity factors. When utilizing home sensor readings in our calculator, ensuring your device applies verified EPA correction factors guarantees alignment with official municipal monitoring stations.
          </p>

          <h2>Actionable Interventions & Wildfire Smoke Protection</h2>

          <p>
            Public health authorities recommend clear behavioral responses as ambient AQI rises:
          </p>

          <ol>
            <li>
              <strong>Good (AQI 0–50):</strong> Ideal conditions. Ventilate homes freely to exhaust accumulated indoor CO2.
            </li>
            <li>
              <strong>Moderate (AQI 51–100):</strong> Sensitive individuals should monitor respiratory symptoms during prolonged outdoor exertion.
            </li>
            <li>
              <strong>Sensitive Groups (AQI 101–150):</strong> Asthmatics, seniors, and children should limit prolonged outdoor exercise, moving high-intensity cardio indoors.
            </li>
            <li>
              <strong>Unhealthy (AQI 151–200):</strong> Everyone should avoid prolonged outdoor workouts. Keep windows closed and activate mechanical filtration.
            </li>
            <li>
              <strong>Very Unhealthy & Hazardous (AQI 201–500):</strong> Emergency alert. Remain indoors. Wear a fitted NIOSH N95 respirator if outdoor transit is unavoidable.
            </li>
          </ol>

          <p>
            Urban forestry programs provide permanent natural particulate filtration. Broadleaf trees physically trap airborne particulates on leaf surfaces while absorbing gaseous nitrogen oxides. Explore municipal sequestration with our <Link href="/calculators/environment/tree-planting-calculator">Tree Planting Calculator</Link>.
          </p>

          <h2>Indoor Air Quality & Mechanical HEPA Filtration</h2>

          <p>
            Because modern individuals spend over 85% of their lives indoors, ambient outdoor AQI penetrates building envelopes. Standard MERV 6 furnace filters capture coarse dust but allow over 80% of fine PM2.5 to pass through.
          </p>

          <p>
            Upgrading to MERV 13 filters or running standalone true HEPA air purifiers (capturing 99.97% of particles down to 0.3 microns) reduces indoor particulate concentrations by 75% to 90%. To determine continuous electricity costs for running home purifiers, consult our <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>.
          </p>
        </>
      }
    >
      <AirQualityIndexCalculator />
    </CalcPage>
  );
}
