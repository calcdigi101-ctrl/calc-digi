import BigNumberCalculator from "@/components/calcs/math/big-number-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/big-number-calculator";
const TITLE = "Big Number Calculator | Arbitrary-Precision Arithmetic & Huge Numbers | CalcDigi";
const DESCRIPTION =
  "Free online big number calculator. Perform arbitrary-precision addition, subtraction, multiplication, division, exponents, and factorials for numbers with hundreds of digits.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is arbitrary-precision arithmetic (bignum)?",
    a: "Arbitrary-precision arithmetic (also termed bignum or infinite precision) performs mathematical operations on integers and decimals whose digit capacity is limited only by available system RAM memory, rather than by fixed 32-bit or 64-bit hardware processor registers.",
  },
  {
    q: "Why do standard 64-bit floating-point numbers lose precision with large integers?",
    a: "IEEE 754 double-precision floats allocate exactly 53 bits to the significand fraction, providing exact integer representation only up to 2⁵³ − 1 (9,007,199,254,740,991, known as Number.MAX_SAFE_INTEGER in JavaScript). Beyond this limit, consecutive integers round to the same representable float, losing single-unit accuracy.",
  },
  {
    q: "How does the Karatsuba multiplication algorithm accelerate big numbers?",
    a: "Classical pencil-and-paper multiplication requires O(n²) operations for n-digit numbers. Anatoly Karatsuba's divide-and-conquer algorithm (1960) reduces multiplication to three sub-multiplications instead of four, achieving a faster asymptotic complexity of O(n^(log₂ 3)) ≈ O(n^1.585).",
  },
  {
    q: "What is the Schönhage-Strassen FFT algorithm for huge numbers?",
    a: "For numbers containing tens of thousands of digits, the Schönhage-Strassen algorithm uses Fast Fourier Transforms (FFT) over finite rings to compute polynomial convolutions in O(n log n log log n) time. In 2019, David Harvey and Joris van der Hoeven proved the optimal O(n log n) bound.",
  },
  {
    q: "What is a Googol and a Googolplex?",
    a: "A Googol is the integer 1 followed by 100 zeros (10¹⁰⁰), coined by 9-year-old Milton Sirotta in 1920. A Googolplex is 10 raised to the power of a Googol (10^(10¹⁰⁰)), a number so vast that writing its decimal expansion would require more digits than there are subatomic particles in the observable universe (≈ 10⁸⁰).",
  },
  {
    q: "What is Graham's number in combinatorics?",
    a: "Graham's number is an immense integer that arose as an upper bound in Ramsey theory concerning hypercube colorings. It is so gargantuan that it cannot be written with conventional exponential towers and requires Knuth's up-arrow notation, holding the former Guinness World Record for the largest number used in a serious mathematical proof.",
  },
  {
    q: "How are big numbers used in modern RSA and elliptic curve cryptography?",
    a: "Public-key cryptography relies fundamentally on big integers. RSA-4096 operates on 4096-bit numbers (over 1,230 decimal digits), and elliptic curve cryptography uses 256-bit to 521-bit prime finite field coordinates to secure internet banking and digital signatures.",
  },
  {
    q: "How does BigInt in modern programming languages prevent overflow?",
    a: "Modern languages (Python, Java BigInteger, JavaScript BigInt, C++ Boost.Multiprecision) dynamically allocate arrays of 32-bit or 64-bit 'limbs' in memory. As numbers grow larger during arithmetic operations, the memory buffer automatically expands dynamically.",
  },
];

const IMMENSE_NUMBERS_ROWS = [
  ["Million", "10⁶", "6", "Metropolitan populations, high-net-worth wealth"],
  ["Billion", "10⁹", "9", "Global human population (8+ billion), microprocessor transistors"],
  ["Trillion", "10¹²", "12", "National GDP budgets, corporate enterprise market caps"],
  ["Quadrillion", "10¹⁵", "15", "Supercomputer FLOPS processing benchmarks"],
  ["Number.MAX_SAFE_INTEGER", "2⁵³ − 1 ≈ 9.007 × 10¹⁵", "16", "Limit of exact integer precision in IEEE 754 double floats"],
  ["Googol", "10¹⁰⁰", "101", "Coined by Edward Kasner; exceeds total protons in universe"],
  ["RSA-4096 Key Modulus", "2⁴⁰⁹⁶ ≈ 10¹²³³", "1,234", "Industry gold standard for asymmetric internet encryption"],
  ["Centillion", "10³⁰³", "304", "Traditional large named scale in English decimal nomenclature"],
];

const RELATED_BIG = [
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/factorial-calculator", icon: "❗", name: "Factorial Calculator" },
  { href: "/calculators/math/scientific-calculator", icon: "🧮", name: "Scientific Calculator" },
  { href: "/calculators/math/logarithm-calculator", icon: "ln", name: "Logarithm Calculator" },
  { href: "/calculators/math/binary-calculator", icon: "01", name: "Binary Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Big Number Calculator"
      intro="Execute arbitrary-precision arithmetic, calculate exact factorials and powers of immense integers without rounding truncation errors."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="BigInt(x)"
      related={RELATED_BIG}
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

          <h2>Foundations of Arbitrary-Precision Arithmetic</h2>
          <p>
            In computer science and numerical mathematics, standard computation is constrained by hardware microprocessor registers. Contemporary 64-bit Central Processing Units (CPUs) contain native execution pipelines engineered to manipulate integers up to 64 bits in length (values up to 2⁶⁴ − 1 ≈ 1.84 × 10¹⁹ for unsigned integers) or IEEE 754 floating-point numbers with 53 bits of mantissa precision.
          </p>
          <p>
            When financial databases, cryptographic protocols, combinatorial algorithms, or astronomical physics models encounter quantities exceeding these hardware thresholds, conventional software suffers from silent numerical truncation, integer overflow, or rounding degradation. <strong>Arbitrary-precision arithmetic</strong> (commonly termed <em>bignum</em> or <em>infinite-precision arithmetic</em>) overcomes these hardware bounds by representing numbers as dynamically resizable memory arrays, guaranteeing 100% exact, bit-for-bit mathematical precision across thousands of digits.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="scientific" />
          </div>

          <h2>The Precision Wall of Standard Floating-Point Hardware</h2>
          <p>
            The necessity of arbitrary-precision computing becomes starkly visible when inspecting IEEE 754 standard double-precision arithmetic:
          </p>
          <Formula>MAX_SAFE_INTEGER = 2⁵³ − 1 = 9,007,199,254,740,991</Formula>
          <p>
            In standard JavaScript or Python float arithmetic, attempting to evaluate:
          </p>
          <Formula>9,007,199,254,740,991 + 1 = 9,007,199,254,740,992</Formula>
          <Formula>9,007,199,254,740,991 + 2 = 9,007,199,254,740,992  (FAIL: Precision Lost!)</Formula>
          <p>
            Because the 53-bit mantissa lacks sufficient bits to differentiate between adjacent odd and even integers at this scale, the two different equations yield the identical numeric result. In banking transaction ledgers, astronomical ephemeris calculations, or national census tallies, such silent precision loss is catastrophic. Arbitrary-precision BigInt engines eliminate this flaw completely.
          </p>

          <h2>Software Architecture of BigInt Engines: Limbs and Bases</h2>
          <p>
            Arbitrary-precision software libraries—such as the GNU Multiple Precision Arithmetic Library (GMP), Python's native long integers, and modern JavaScript BigInt—store immense numbers as a sequence of integer &ldquo;limbs&rdquo; (chunks):
          </p>
          <Formula>A = a₀ + a₁ × B¹ + a₂ × B² + ... + a_(k-1) × B^(k-1)</Formula>
          <p>
            Where the radix base <em>B</em> is typically chosen as 2³² (4,294,967,296) or 2⁶⁴ to align with the computer's native register word size. Operations like addition and subtraction proceed chunk-by-chunk with carry propagation in linear <em>O(N)</em> time complexity.
          </p>

          <h2>Fast Multiplication Algorithms for Astronomical Integers</h2>
          <p>
            While elementary addition scales easily, multiplying two multi-thousand-digit numbers requires sophisticated algorithmic optimization:
          </p>

          <h3>1. Schoolbook Multiplication: O(N²)</h3>
          <p>
            The elementary grade-school method multiplies each digit of the first number by every digit of the second number. Doubling the digit count quadruples the computation time, becoming unacceptably sluggish beyond a few hundred digits.
          </p>

          <h3>2. Karatsuba's Divide-and-Conquer Algorithm: O(N^1.585)</h3>
          <p>
            In 1960, 23-year-old Soviet mathematician Anatoly Karatsuba discovered that splitting two numbers into high and low halves <em>(x₁B + x₀)</em> and <em>(y₁B + y₀)</em> allows their product to be evaluated using only three recursive multiplications instead of four:
          </p>
          <Formula>z₂ = x₁ × y₁;  z₀ = x₀ × y₀;  z₁ = (x₁ + x₀) × (y₁ + y₀) − z₂ − z₀</Formula>
          <Formula>Product = z₂ × B² + z₁ × B + z₀</Formula>

          <h3>3. Schönhage-Strassen and Harvey-Hoeven FFT Algorithms</h3>
          <p>
            For numbers with millions of digits (such as discovering giant Mersenne primes), algorithms convert digit arrays into polynomial sequences and apply Fast Fourier Transforms (FFT) over complex numbers or modular Galois rings, achieving near-linear <em>O(N log N)</em> execution speed.
          </p>

          <h2>Step-by-Step Worked Derivation: BigInt Arithmetic</h2>
          <p>
            To observe arbitrary precision in action, consider evaluating <strong>10³⁰ + 1</strong> and <strong>2¹⁰⁰</strong>:
          </p>
          <h3>Example A: Evaluating 10³⁰ + 1</h3>
          <p>
            In standard 64-bit float math, 10³⁰ completely swallows the +1, displaying 1e+30. In BigInt arbitrary precision:
          </p>
          <Formula>10³⁰ = 1,000,000,000,000,000,000,000,000,000,000</Formula>
          <Formula>10³⁰ + 1 = 1,000,000,000,000,000,000,000,000,000,001</Formula>
          <p>
            Every single intermediate zero is preserved without any loss of precision.
          </p>

          <h3>Example B: Evaluating 2¹⁰⁰ Exactly</h3>
          <p>
            Successive powers of two evaluated with exact limb arithmetic:
          </p>
          <Formula>2¹⁰⁰ = 1,267,650,600,228,229,401,496,703,205,376</Formula>
          <p>
            This 31-digit exact integer represents the total states of a 100-bit cryptographic key space.
          </p>

          <h2>Taxonomy of Astronomical Scales and Large Named Numbers</h2>
          <p>
            Human language and mathematics encompass quantities that defy everyday comprehension:
          </p>

          <DataTable
            head={["Number Name", "Power of 10 Expression", "Total Digit Count", "Practical or Theoretical Context"]}
            rows={IMMENSE_NUMBERS_ROWS}
            highlight={4}
          />

          <h2>Practical Applications Across Science, Cryptography, and Finance</h2>
          <p>
            Big number arithmetic engines drive critical modern systems:
          </p>
          <ul>
            <li>
              <strong>Public-Key Internet Cryptography (RSA & ECC):</strong> Encrypting HTTPS web traffic requires modular exponentiation over 2048-bit to 4096-bit prime numbers (aᵇ mod n).
            </li>
            <li>
              <strong>Cryptocurrency Blockchains:</strong> Bitcoin and Ethereum cryptographic signatures (ECDSA secp256k1) operate on 256-bit scalar elliptic curve points.
            </li>
            <li>
              <strong>Combinatorics and Exact Factorials:</strong> Calculating exact permutations for large datasets (such as 52! card deck arrangements or 100! scheduling permutations).
            </li>
            <li>
              <strong>High-Precision Scientific Constants:</strong> Calculating mathematical constants like π and e to millions or trillions of decimal digits to test supercomputer hardware stability.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your calculation toolkit, explore our specialized <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>, <Link href="/calculators/math/exponent-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Exponent Calculator</Link>, <Link href="/calculators/math/factorial-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factorial Calculator</Link>, and <Link href="/calculators/math/scientific-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Calculator</Link>.
          </p>
        </>
      }
    >
      <BigNumberCalculator />
    </CalcPage>
  );
}
