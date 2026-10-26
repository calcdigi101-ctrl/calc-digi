import type { Metadata } from "next";
import Link from "next/link";
import SevereWeatherCalculatorComponent from "@/components/calcs/weather/severe-weather-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AtmosphericInstabilityCapeWindShearChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/severe-weather-calculator";
const TITLE = "Severe Weather Calculator | CAPE, Bulk Wind Shear & Tornado Helicity";
const DESCRIPTION =
  "Assess severe convective storm hazards, thermodynamic CAPE, 0-6 km bulk wind shear, Energy Helicity Index (EHI), and supercell tornado potential.";

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
  { href: "/calculators/weather/dew-point-calculator", icon: "🌡️", name: "Dew Point Calculator" },
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/rainfall-calculator", icon: "🌧️", name: "Rainfall Calculator" },
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
  { href: "/calculators/weather/snowfall-calculator", icon: "❄️", name: "Snowfall Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What CAPE value is required for severe thunderstorms to develop?",
    a: "Severe thunderstorms typically require a minimum surface-based CAPE of 1,000 to 1,500 J/kg. Moderate instability ranges from 1,500 to 2,500 J/kg, while values above 2,500 J/kg represent extreme instability. However, during high-shear low-CAPE (HSLC) cool-season setups, severe tornadoes can occasionally form with CAPE values as low as 400 to 800 J/kg if low-level wind shear and helicity are extraordinarily strong.",
  },
  {
    q: "What is the difference between a tornado watch and a tornado warning?",
    a: "A Tornado Watch is issued by the NOAA Storm Prediction Center hours in advance when meteorological conditions are favorable for supercells capable of producing tornadoes across a broad region (be prepared). A Tornado Warning is issued by local National Weather Service forecast offices when an actual tornado has been visually spotted by trained storm spotters or indicated by Doppler radar rotation (take immediate shelter in an interior room or basement).",
  },
  {
    q: "Why does vertical wind shear matter so much for severe storms?",
    a: "Without vertical wind shear, a thunderstorm's updraft rises vertically, condenses moisture, and produces rain that falls straight back down through the updraft, choking off the storm's warm fuel supply and causing it to collapse in 30 to 45 minutes. Vertical wind shear tilts the updraft, allowing rain to fall away from the updraft, sustaining the storm for hours as an organized multicell or rotating supercell.",
  },
  {
    q: "How is hail size related to thunderstorm updraft strength?",
    a: "Hail forms when supercooled water droplets freeze onto ice nuclei in the updraft. To grow to golf ball size (1.75 inches), a hailstone requires a vertical updraft of at least 55 mph (25 m/s). To grow to softball size (4.0 inches), the updraft must exceed 100 mph (45 m/s), which directly corresponds to theoretical updraft velocities generated in environments with CAPE exceeding 3,000 J/kg (W_{\\max} = \\sqrt{2 \\cdot \\text{CAPE}}).",
  },
];

export default function SevereWeatherCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/weather", label: "Weather & Nature" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Convective Dynamics Quick Summary:</strong> Forecasting severe thunderstorm modes, damaging straight-line winds, giant hail, and tornadoes requires synthesizing thermodynamic buoyancy with kinematic vertical wind shear. The primary metric of atmospheric instability is <strong>Convective Available Potential Energy (CAPE)</strong>, measured in Joules per kilogram (J/kg), which defines the theoretical kinetic energy imparted to an ascending air parcel. However, high CAPE alone produces disorganized pulse storms unless organized by 0-6 kilometer deep-layer bulk wind shear exceeding 35 to 40 knots. Cross-checking atmospheric moisture with our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">dew point calculator</Link> and checking boundary layer vapor pressure in our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">humidity calculator</Link> establishes the thermodynamic foundation for tornadic supercell formation.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Energy Helicity Index (EHI) & Severe Convective Storm Mode Regimes
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Severe convective weather manifests in distinct structural morphologies: single-cell pulse storms, multicell clusters, linear Mesoscale Convective Systems (squall lines/derechos), and isolated rotating supercells. Vertical wind shear tilts the thunderstorm updraft, preventing falling precipitation downdrafts from suffocating the inflow of warm, moist boundary layer air. When evaluating extreme convective downpours alongside our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link>, high-precipitation (HP) supercells produce catastrophic flash flooding alongside tornadic vortices.
          </p>

          <AtmosphericInstabilityCapeWindShearChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The multi-tier chart above illustrates the non-linear interaction between deep-layer shear and CAPE across four thermodynamic energy tiers (1,000 to 4,000 J/kg) as quantified by the Energy Helicity Index (EHI). An EHI value exceeding 1.0 represents the critical threshold where rotating mesocyclones become probable. Values exceeding 2.0 to 3.0 correlate strongly with significant (EF2 to EF5) violent tornadoes. Conversely, in cold-season severe outbreaks, modest CAPE (under 800 J/kg) can still spawn violent tornadoes if low-level shear and storm-relative helicity are exceptionally intense, as also seen during winter frontal passages modeled in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Convective Available Potential Energy & Storm Kinematics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Thermodynamic CAPE is calculated as the vertical integral of positive parcel buoyancy between the Level of Free Convection (LFC) and the Equilibrium Level (EL):
          </p>

          <Formula>
            {"\text{CAPE} = \int_{z_{\text{LFC}}}^{z_{\text{EL}}} g \left( \frac{T_{v,\text{parcel}} - T_{v,\text{env}}}{T_{v,\text{env}}} \right) dz \quad (\text{J/kg})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"g = 9.80665\text{ m/s}^2"}</Formula> is gravitational acceleration, and <Formula>{"T_v"}</Formula> is the virtual temperature accounting for water vapor buoyancy. The theoretical maximum vertical updraft velocity <Formula>{"W_{\max}"}</Formula> inside the core of the thunderstorm is derived directly from conservation of energy:
          </p>

          <Formula>
            {"W_{\max} = \sqrt{2 \cdot \text{CAPE}} \quad (\text{m/s})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            In tornadic environments, Storm-Relative Helicity (<Formula>{"\text{SRH}"}</Formula>, in <Formula>{"\text{m}^2/\text{s}^2"}</Formula>) measures the potential for cyclonic updraft rotation in the lowest 1 or 3 kilometers. Combining CAPE and 0-1 km SRH yields the dimensionless Energy Helicity Index (<Formula>{"\text{EHI}"}</Formula>):
          </p>

          <Formula>
            {"\text{EHI} = \frac{\text{CAPE} \times \text{SRH}_{0-1\text{km}}}{160{,}000}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The kinetic impact energy of storm hail and wind gusts can be converted to structural loading forces using equations from our <Link href="/calculators/physics/kinetic-energy-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">kinetic energy calculator</Link> and vehicular collision dynamics in our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Severe Convective Storm Classification & Atmospheric Indices Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below synthesizes the Storm Prediction Center (SPC) convective threat categories alongside critical thermodynamic and kinematic thresholds:
          </p>

          <DataTable
            head={["CAPE Range (J/kg)", "0-6 km Shear (Knots)", "Lifted Index (°C)", "EHI Range", "Dominant Convective Storm Mode", "Severe Hazard Profile"]}
            rows={[
              ["0 to 1,000 J/kg", "< 25 knots", "0°C to -2°C", "< 0.5", "Weak Single-Cell Pulse Storms", "Brief heavy rain; lightning; sub-severe hail (< 0.75 in)"],
              ["1,000 to 2,000 J/kg", "25 to 35 knots", "-2°C to -4°C", "0.5 to 1.0", "Multicell Clusters & Linear Segments", "Damaging wind gusts (50-60 mph); quarter-sized hail; isolated spin-up"],
              ["2,000 to 3,000 J/kg", "35 to 50 knots", "-4°C to -7°C", "1.0 to 2.5", "Organized Supercell Storms", "Large hail (golf ball to baseball size); severe wind (70+ mph); tornadoes"],
              ["3,000 to 4,500+ J/kg", "50 to 75+ knots", "< -7°C", "> 2.5", "Violent Cyclic Supercells / Derrechos", "Giant hail (softball size > 4.0 in); destructive straight-line winds; EF2-EF5 tornadoes"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            When atmospheric soundings exhibit CAPE exceeding 3,000 J/kg alongside deep-layer shear above 50 knots, the atmosphere enters an explosive convective regime. Updraft velocities exceed 100 mph (45 m/s), suspending heavy water droplets within the sub-freezing hail growth zone (-10°C to -30°C) for extended periods to forge destructive hail stones. Furthermore, extreme summer heat preceding these convective events can be monitored with our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link> and solar ultraviolet intensity in our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Forecasting Dynamics: Convective Inhibition (CIN), Caps & Hodograph Curvature
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Evaluating whether an unstable atmospheric environment will actually detonate into severe storms requires assessing three subtle mesoscale mechanisms:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Convective Inhibition (CIN) & The Elevated Mixed Layer (EML):</strong> CIN represents the negative buoyant energy an air parcel must overcome to reach the LFC. An elevated capping inversion (typically a dry, hot layer advected from the desert southwest) acts as a lid, preventing premature weak storm development and allowing boundary layer heat and moisture to pool into extreme CAPE before being breached by a cold front or dryline.
            </li>
            <li>
              <strong>Hodograph Loop Curvature & Helicity:</strong> A hodograph plots vertical wind vectors with height. A clockwise curving hodograph in the lowest 1 to 3 kilometers indicates intense directional shear (winds backing from southeasterly at the surface to southwesterly aloft), creating horizontal streamwise vorticity that is tilted vertically by updrafts to form rotating mesocyclones.
            </li>
            <li>
              <strong>Downdraft CAPE (DCAPE) & Microburst Hazard:</strong> DCAPE measures the potential negative buoyancy of an evaporatively cooled downdraft. Environments with high DCAPE (&gt; 1,000 J/kg) generate violent dry or wet microbursts with surface divergence wind speeds exceeding 80 to 100 mph, posing extreme hazards to aviation landings tracked in our <Link href="/calculators/transportation/flight-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">flight time calculator</Link>.
            </li>
            <li>
              <strong>Winter Convective Transitions:</strong> Rapid cold air advection behind severe squall lines can transition thunderstorm rain into intense convective snow bursts and thunder-snow modeled in our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">snowfall calculator</Link>.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dual-Polarization Doppler Radar Signatures & The Significant Tornado Parameter (STP)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern operational storm forecasting relies heavily on the Significant Tornado Parameter (STP), an empirical composite index designed by Thompson et al. to discriminate between significant tornadic supercells (EF2+) and non-tornadic supercells. The fixed-layer STP integrates surface-based CAPE, effective storm-relative helicity (SRH), effective bulk wind difference (EBWD), and the lifting condensation level (LCL) height:
          </p>
          <Formula>
            {"\text{STP} = \left( \frac{\text{SBCAPE}}{1500} \right) \times \left( \frac{2000 - \text{SBLCL}}{1000} \right) \times \left( \frac{\text{SRH}_{0-1\text{km}}}{150} \right) \times \left( \frac{\text{BWD}_{0-6\text{km}}}{20} \right)"}
          </Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An STP value greater than 1.0 indicates a favorable thermodynamic and kinematic environment for significant tornadoes; values exceeding 4.0 to 8.0 are observed during historic violent tornado outbreaks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Simultaneously, National Weather Service dual-polarization WSR-88D Doppler radar algorithms detect the physical characteristics of storm hydrometeors. The Correlation Coefficient (CC) measures the uniformity of radar targets; when a tight gate-to-gate velocity circulation coincides with a localized drop in CC below 0.80, radar operators confirm a Tornadic Debris Signature (TDS)—proving that building fragments, shingles, and uprooted trees are lofted thousands of feet into the troposphere, validating emergency Tornado Warnings even in the dead of night.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mesoscale Convective Vortices (MCV) & Derecho Downburst Clusters
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            When large Mesoscale Convective Systems (MCS) persist across hundreds of miles overnight, latent heat release from condensing water vapor drives the development of a warm-core, mid-tropospheric cyclonic circulation known as a Mesoscale Convective Vortex (MCV). MCVs can survive for days after their parent thunderstorms dissipate, drifting downwind and acting as miniature tropical disturbances that trigger severe supercell and tornado outbreaks when exposed to daytime solar heating. Furthermore, when rear-inflow jets (RIJ) descend from the mid-troposphere to ground level, they generate violent progressive derechos—long-lived windstorms with continuous swaths of 75 to 100+ mph straight-line winds that flatten mature timber and cause widespread electrical grid blackouts across multi-state regions. Post-event storm damage surveys conducted by National Weather Service meteorologists utilize the Enhanced Fujita (EF) scale, analyzing 28 specific structural damage indicators to differentiate between straight-line microburst winds and multi-vortex rotational tornado damage tracks. This forensic meteorological evidence helps improve structural building codes for residential tornado safe rooms.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Doppler Radar Signatures, Dual-Polarization Metrics & Mesocyclone Dynamics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern severe weather warning meteorologists integrate thermodynamic sounding parameters with dual-polarization WSR-88D Doppler radar imagery to detect tornado genesis in real time. Beyond base reflectivity hook echoes and storm-relative velocity azimuthal shear couplets, dual-polarization variables provide definitive physical confirmation of severe phenomena. Differential Reflectivity (ZDR) identifies oblate raindrops and hail cores, while Correlation Coefficient (CC) detects non-meteorological scatterers.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The co-location of a tight velocity circulation couplet with a dramatic drop in Correlation Coefficient below 0.80 constitutes a definitive Tornado Debris Signature (TDS), confirming that lofted debris such as splintered wood, insulation, and foliage is circulating within the vortex. This real-time polarimetric radar confirmation enables National Weather Service warning meteorologists to issue emergency Tornado Catastrophe Warnings with zero-minute verification latency, saving lives prior to ground visual reporting.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Advanced operational meteorology also utilizes high-resolution numerical weather prediction systems like the High-Resolution Rapid Refresh (HRRR) model, updated hourly at 3-kilometer grid spacing. HRRR forecasts explicit convective storm initiation, simulated composite radar reflectivity, and updraft helicity tracks, allowing storm prediction centers to issue targeted mesoscale convective discussions several hours before supercells develop.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Broadcast meteorologists and certified storm spotters examine real-time hodograph curvature to anticipate convective storm evolution. Clockwise looping hodographs in the lowest kilometer indicate strong positive storm-relative helicity, favoring long-lived cyclonic right-moving supercells capable of producing long-track violent tornadoes and giant destructive hail swaths across vulnerable communities. Emergency managers utilize these physical indicators to initiate sirens well before storm cores cross jurisdictional borders.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Severe convective storm warning meteorologists correlate ground-based mesonets with terminal Doppler weather radars at major metropolitan airports. This multi-sensor network detects microburst wind shear events and gust fronts, providing immediate runway divergence alerts for commercial aviation traffic. Civil protection agencies conduct annual severe weather preparedness drills with regional school districts and municipal hospital systems, ensuring emergency operations centers maintain redundant satellite communication channels during destructive convective squall lines.
          </p>

        </>
      }
    >
      <SevereWeatherCalculatorComponent />
    </CalcPage>
  );
}
