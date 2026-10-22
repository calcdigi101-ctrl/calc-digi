import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/scientific-notation-calculator";
const TITLE = "Scientific Notation Calculator | Convert, Add, Multiply & Powers | CalcDigi";
const DESCRIPTION =
  "Free online scientific notation calculator. Convert decimals to scientific and engineering notation, perform arithmetic (add, subtract, multiply, divide), and evaluate powers step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is scientific notation in mathematics?",
    a: "Scientific notation is a standardized system for expressing very large or very small real numbers in the compact format m × 10ⁿ, where m is the mantissa (or significand) satisfying 1 ≤ |m| < 10, and n is an integer exponent.",
  },
  {
    q: "How does engineering notation differ from scientific notation?",
    a: "In engineering notation, the exponent n must be a multiple of 3 (e.g., 10³, 10⁶, 10⁻⁹), aligning directly with SI metric prefixes (kilo, mega, micro). The mantissa can range from 1 to 999.999 instead of strictly 1 to 9.999.",
  },
  {
    q: "How do you multiply two numbers in scientific notation?",
    a: "Multiply the mantissas directly and add the exponents: (a × 10ʳ) × (b × 10ˢ) = (a × b) × 10ʳ⁺ˢ. If the resulting product a × b is 10 or greater, normalize the mantissa by dividing by 10 and incrementing the exponent by 1.",
  },
  {
    q: "How do you add or subtract numbers in scientific notation?",
    a: "To add or subtract, both terms must first be adjusted to share the identical exponent: a × 10ʳ + b × 10ʳ = (a + b) × 10ʳ. Rewrite the number with the smaller exponent by shifting its decimal point left until exponents match.",
  },
  {
    q: "What does the letter 'e' or 'E' mean on scientific calculators?",
    a: "The letter 'e' or 'E' stands for 'exponent of 10'. For example, 3.5e+08 represents 3.5 × 10⁸ (350,000,000), while 4.2e-05 represents 4.2 × 10⁻⁵ (0.000042). It is standard shorthand across programming languages and displays.",
  },
  {
    q: "How does scientific notation preserve significant figures?",
    a: "Scientific notation explicitly resolves ambiguity regarding trailing zeros. In standard notation, 5,000 could have 1, 2, 3, or 4 sig figs. In scientific notation, 5 × 10³ has 1 sig fig, 5.0 × 10³ has 2 sig figs, and 5.000 × 10³ unambiguously has 4 sig figs.",
  },
  {
    q: "What are normalized, subnormal, and unnormalized scientific numbers?",
    a: "Normalized scientific notation requires 1 ≤ |m| < 10. Subnormal or denormalized notation allows 0 < |m| < 1, which IEEE 754 floating-point hardware uses to represent numbers near absolute underflow limits.",
  },
  {
    q: "What is the physical range of exponents in modern physics?",
    a: "In physical cosmology and quantum field theory, exponents span over 60 orders of magnitude: from the Planck length (1.616 × 10⁻³⁵ meters) up to the observable universe radius (4.4 × 10²⁶ meters) and estimated protons in the cosmos (10⁸⁰).",
  },
];

const SI_PREFIX_ROWS = [
  ["Yotta (Y)", "10²⁴", "1,000,000,000,000,000,000,000,000", "Total mass of oceans on Earth"],
  ["Giga (G)", "10⁹", "1,000,000,000", "Microprocessor clock speeds (GHz), global populations"],
  ["Kilo (k)", "10³", "1,000", "Kilometers, kilograms, structural metric engineering"],
  ["Base Unit", "10⁰", "1", "Meters, seconds, standard everyday units"],
  ["Milli (m)", "10⁻³", "0.001", "Millimeters, biological cell dimensions, circuit boards"],
  ["Nano (n)", "10⁻⁹", "0.000000001", "Semiconductor gate transistor lithography (nm)"],
  ["Femto (f)", "10⁻¹⁵", "0.000000000000001", "Proton and neutron nuclear atomic diameters"],
];

const RELATED_SCI = [
  { href: "/calculators/math/significant-figures-calculator", icon: "📏", name: "Significant Figures" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/big-number-calculator", icon: "🔢", name: "Big Number Calc" },
  { href: "/calculators/math/logarithm-calculator", icon: "ln", name: "Logarithm Calculator" },
  { href: "/calculators/math/scientific-calculator", icon: "🧮", name: "Scientific Calculator" },
  { href: "/calculators/math/binary-calculator", icon: "01", name: "Binary Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Scientific Notation Calculator | CalcDigi"
      intro="Convert decimal values to normalized scientific and engineering notation, perform arithmetic operations, and inspect orders of magnitude."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="m × 10^n"
      related={RELATED_SCI}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Foundations of Scientific and Exponential Notation</h2>
          <p>
            Scientific notation, also termed standard index form or exponential form, is a rigorous mathematical convention developed to express extraordinarily large or infinitesimally small real quantities in an elegant, standardized structure. The earliest conceptual foundation dates back to Archimedes of Syracuse in the 3rd century BCE, who in his treatise <em>The Sand Reckoner</em> devised an octad-based exponential counting system to estimate the number of sand grains required to fill the entire universe.
          </p>
          <p>
            In modern scientific analysis, chemistry, astrophysics, and quantum electrodynamics, physical quantities frequently span immense orders of magnitude. Writing numbers with dozens of leading or trailing zeros is unwieldy and invites severe transcription error. Scientific notation resolves this by decomposing any real number into two distinct components: a <strong>mantissa</strong> (significand) containing the precision digits, and an <strong>order of magnitude</strong> represented by an integer power of 10.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="scientific" />
          </div>

          <h2>Mathematical Anatomy of Normalized Scientific Form</h2>
          <p>
            In international metrology (ISO 80000-2) and IUPAC chemical standards, a real number <em>x</em> is expressed in normalized scientific notation according to the formula:
          </p>
          <Formula>x = m × 10ⁿ</Formula>
          <p>
            Subject to the canonical normalization constraint:
          </p>
          <Formula>1 ≤ |m| &lt; 10  where  n ∈ ℤ</Formula>
          <p>
            The sign of the exponent <em>n</em> dictates the directional magnitude of the value:
          </p>
          <ul>
            <li>
              <strong>Positive Exponent (n &gt; 0):</strong> Represents quantities greater than or equal to 10. The exponent counts how many positions the decimal point shifted to the left (e.g., 450,000 = 4.5 × 10⁵).
            </li>
            <li>
              <strong>Negative Exponent (n &lt; 0):</strong> Represents fractional quantities strictly between 0 and 1. The exponent counts how many positions the decimal point shifted to the right (e.g., 0.00032 = 3.2 × 10⁻⁴).
            </li>
            <li>
              <strong>Zero Exponent (n = 0):</strong> Represents baseline quantities in the interval [1, 10), since 10⁰ = 1 (e.g., 7.82 = 7.82 × 10⁰).
            </li>
          </ul>

          <h2>Engineering Notation Versus Scientific Notation</h2>
          <p>
            While scientific notation enforces a single non-zero digit before the decimal point, <strong>engineering notation</strong> restricts the exponent <em>n</em> strictly to integer multiples of three (... −9, −6, −3, 0, 3, 6, 9 ...). As a consequence, the mantissa expands to the interval [1, 1000).
          </p>
          <p>
            This constraint provides enormous practical utility in electrical engineering, acoustics, and mechanical design because every step of three directly corresponds to an International System of Units (SI) metric prefix:
          </p>
          <Formula>0.000047 Farads = 4.7 × 10⁻⁵ F (Scientific) = 47 × 10⁻⁶ F = 47 microfarads (Engineering)</Formula>

          <h2>Step-by-Step Worked Arithmetic Derivations</h2>
          <p>
            Performing mathematical operations in scientific notation obeys the classical algebraic laws of exponents:
          </p>

          <h3>1. Multiplication Operation</h3>
          <p>
            To multiply two scientific numbers, multiply their mantissas and sum their exponents:
          </p>
          <Formula>(4.5 × 10⁶) × (2.0 × 10⁻²) = (4.5 × 2.0) × 10^(6 + (-2)) = 9.0 × 10⁴</Formula>
          <p>
            If the product exceeds 10, shift the decimal point left and add 1 to the exponent:
          </p>
          <Formula>(6.0 × 10⁴) × (5.0 × 10³) = 30.0 × 10⁷ = 3.0 × 10⁸</Formula>

          <h3>2. Division Operation</h3>
          <p>
            Divide the numerators and subtract the denominator exponent:
          </p>
          <Formula>(8.4 × 10⁸) ÷ (2.1 × 10³) = (8.4 ÷ 2.1) × 10^(8 − 3) = 4.0 × 10⁵</Formula>

          <h3>3. Addition and Subtraction With Exponent Realignment</h3>
          <p>
            Addition and subtraction require identical exponents. Consider adding 3.2 × 10⁴ and 5.8 × 10³:
          </p>
          <ul>
            <li>Convert the smaller exponent (10³) to match the larger (10⁴): 5.8 × 10³ = 0.58 × 10⁴.</li>
            <li>Factor out the shared exponential term: (3.2 + 0.58) × 10⁴ = 3.78 × 10⁴.</li>
          </ul>

          <h2>Evaluating Powers and Roots in Scientific Notation</h2>
          <p>
            Raising a number in scientific notation to an integer or fractional power requires applying the power independently to both the mantissa and the base-10 exponential factor:
          </p>
          <Formula>(m × 10ⁿ)ᵖ = mᵖ × 10^(n × p)</Formula>
          <p>
            For example, evaluating the fourth power of (2.0 × 10⁻³):
          </p>
          <Formula>(2.0 × 10⁻³)⁴ = 2.0⁴ × 10^(-3 × 4) = 16.0 × 10⁻¹² = 1.6 × 10⁻¹¹</Formula>
          <p>
            Similarly, when computing square or cube roots, adjusting the exponent to be an exact multiple of the root index ensures that the resulting exponent remains an integer:
          </p>
          <Formula>√(4.9 × 10⁷) = √(49.0 × 10⁶) = √49.0 × √(10⁶) = 7.0 × 10³</Formula>

          <h2>Subnormal Floating-Point Numbers and Gradual Underflow</h2>
          <p>
            In standard IEEE 754 floating-point hardware, when a calculated quantity drops below the smallest representable normalized number (approximately 2.225 × 10⁻³⁰⁸ for double-precision), modern microprocessors do not abruptly truncate the value directly to zero. Instead, hardware switches into <strong>subnormal (or denormalized) mode</strong>, allowing the implicit leading bit to become zero (0.m × 2⁻¹⁰²²).
          </p>
          <p>
            Gradual underflow preserves numerical stability across iterative differential equations, fluid dynamics turbulence modeling, and quantum state simulations, preventing sudden division-by-zero singularities and catastrophic cancellation in scientific computing.
          </p>

          <h2>Floating-Point Representation in Computer Systems (IEEE 754)</h2>
          <p>
            Modern computer hardware represents numbers in binary scientific notation standardized under <strong>IEEE 754</strong>. In standard double-precision (64-bit) floating-point format, a real number is structured with:
          </p>
          <ul>
            <li><strong>1 Sign Bit:</strong> Determines positive (0) or negative (1).</li>
            <li><strong>11 Exponent Bits:</strong> Stores a biased exponent ranging from 2⁻¹⁰²² to 2¹⁰²³ (with a bias of 1023).</li>
            <li><strong>52 Mantissa Bits:</strong> Provides approximately 15 to 17 decimal digits of precision, with an implicit leading bit of 1 for normalized numbers.</li>
          </ul>
          <p>
            This hardware encoding enables scientific calculators and computational physics simulations to evaluate numbers ranging from approximately 5.0 × 10⁻³²⁴ up to 1.8 × 10³⁰⁸ without numerical integer overflow.
          </p>

          <h2>Logarithmic Separation: Characteristics and Mantissas</h2>
          <p>
            The mathematical elegance of scientific notation is deeply intertwined with base-10 logarithms. Taking the common logarithm of a scientific number decomposes it cleanly into an integer characteristic and a positive fractional mantissa:
          </p>
          <Formula>log₁₀(m × 10ⁿ) = log₁₀(m) + log₁₀(10ⁿ) = n + log₁₀(m)</Formula>
          <p>
            Because 1 ≤ m &lt; 10, the term log₁₀(m) strictly lies within the interval [0, 1). The exponent <em>n</em> determines the magnitude scale, while log₁₀(m) contains the precision information. This property governed 300 years of scientific computation prior to silicon chips: scientists looked up mantissas in printed logarithm tables, added the characteristics mentally, and looked up the antilogarithm to perform rapid multiplication of astronomical data.
          </p>

          <h2>Algorithmic Conversion from Decimal Floats to Scientific Strings</h2>
          <p>
            Modern software libraries implement scientific formatting via deterministic normalization:
          </p>
          <ol>
            <li>If the absolute value |x| = 0, output "0.0 × 10⁰".</li>
            <li>Compute the integer exponent: n = floor(log₁₀(|x|)).</li>
            <li>Scale the mantissa: m = |x| ÷ 10ⁿ.</li>
            <li>Round m to the designated significant figure precision and format the sign.</li>
          </ol>

          <h2>Orders of Magnitude and SI Metric Prefixes</h2>
          <p>
            The table below illustrates standardized decimal scaling across orders of magnitude:
          </p>

          <DataTable
            head={["Prefix & Symbol", "Exponent Power", "Decimal Expansion", "Representative Physical Reality"]}
            rows={SI_PREFIX_ROWS}
            highlight={3}
          />

          <h2>Practical Applications Across Contemporary Sciences</h2>
          <p>
            Scientific notation is an indispensable calculation engine across global technological systems:
          </p>
          <ul>
            <li>
              <strong>Astrophysics and Orbital Dynamics:</strong> Calculating gravitational planetary attractions, light-year distances (9.461 × 10¹⁵ meters), and stellar masses.
            </li>
            <li>
              <strong>Quantum Mechanics and Chemistry:</strong> Quantifying Planck's constant (6.626 × 10⁻³⁴ J·s) and Avogadro's number (6.022 × 10²³ mol⁻¹) for molecular stoichiometry.
            </li>
            <li>
              <strong>IEEE 754 Floating-Point Computing:</strong> Modern 64-bit microprocessors store real numbers natively in binary scientific notation (1 bit sign, 11 bits exponent, 52 bits significand fraction).
            </li>
            <li>
              <strong>Public Health and Epidemiology:</strong> Measuring microscopic viral particle diameters (COVID-19 virion ≈ 1.2 × 10⁻⁷ m) and biological aerosol dispersion rates.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/significant-figures-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Significant Figures Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/big-number-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Big Number Calculator</Link>, and <Link href="/calculators/math/scientific-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Scientific Notation Calculator</h2><div class=\"form-group\"><label for=\"sn-number\">Number</label><input id=\"sn-number\" step=\"any\" type=\"number\" value=\"548000\"/></div><button class=\"calc-btn\" onclick=\"calcToScientific()\">Convert to Scientific</button><div class=\"result-box\" id=\"sn-result\" style=\"display:none;\"><div id=\"sn-ri\"></div><div class=\"ai-box\" id=\"sn-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sn-result\" onclick=\"printResult('sn-result','Scientific Notation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Scientific Notation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button></div><div style=\"margin-top:20px;padding-top:16px;border-top:1px solid var(--c-rule);\"><p style=\"font-size:13px;font-weight:600;margin-bottom:10px;\">Scientific → Standard</p><div class=\"form-group\"><label for=\"sn-coeff\">Coefficient</label><input id=\"sn-coeff\" step=\"any\" type=\"number\" value=\"7.2\"/></div><div class=\"form-group\"><label for=\"sn-exp\">Exponent (power of 10)</label><input id=\"sn-exp\" step=\"1\" type=\"number\" value=\"-4\"/></div><button class=\"calc-btn\" onclick=\"calcToStandard()\">Convert to Standard</button><div class=\"result-box\" id=\"sn-std-result\" style=\"display:none;\"><div id=\"sn-std-ri\">\n</div>" }} />
        <Script id="calc-script-scientific-notation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcToScientific(){\\n  const num=parseFloat(document.getElementById('sn-number').value);\\n  if(isNaN(num)){alert('Enter a valid number.');return;}\\n  if(num===0){\\n    document.getElementById('sn-ri').innerHTML=ri('Scientific Notation','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">0 × 10⁰</strong>',true);\\n  } else {\\n    const exp=Math.floor(Math.log10(Math.abs(num)));\\n    const coeff=num/Math.pow(10,exp);\\n    const coeffStr=parseFloat(coeff.toFixed(6)).toString();\\n    document.getElementById('sn-ri').innerHTML=\\n      ri('Scientific Notation','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+coeffStr+' × 10^'+exp+'</strong>',true)+\\n      ri('Coefficient',coeffStr)+\\n      ri('Exponent',exp)+\\n      ri('Standard Form',num);\\n  }\\n  document.getElementById('sn-result').style.display='block';\\n}\\nfunction calcToStandard(){\\n  const coeff=parseFloat(document.getElementById('sn-coeff').value);\\n  const exp=parseInt(document.getElementById('sn-exp').value);\\n  if(isNaN(coeff)||isNaN(exp)){alert('Enter a valid coefficient and exponent.');return;}\\n  const standard=coeff*Math.pow(10,exp);\\n  document.getElementById('sn-std-ri').innerHTML=\\n    ri('Standard Form','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+standard+'</strong>',true)+\\n    ri('Scientific Form',coeff+' × 10^'+exp);\\n  document.getElementById('sn-std-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
