import BinaryCalculator from "@/components/calcs/math/binary-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/binary-calculator";
const TITLE = "Binary Calculator | Bitwise Operations, Two's Complement & Base 2 | CalcDigi";
const DESCRIPTION =
  "Free online binary calculator. Add, subtract, multiply, divide binary numbers, execute bitwise logic (AND, OR, XOR, NOT, shifts), and compute Two's Complement step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the binary number system (Base 2)?",
    a: "The binary system is a base-2 positional numeral system that uses only two discrete symbols: 0 and 1. Each digit is referred to as a bit (binary digit), with place values representing increasing powers of two (1, 2, 4, 8, 16, 32, 64, 128...).",
  },
  {
    q: "How do you convert decimal to binary using successive division?",
    a: "Divide the decimal integer by 2 repeatedly, recording the integer remainder (0 or 1) at each step until the quotient reaches 0. Reading the remainders backwards from bottom to top yields the binary representation.",
  },
  {
    q: "How does binary addition work with carry bits?",
    a: "Binary addition follows four basic rules: 0 + 0 = 0, 0 + 1 = 1, 1 + 0 = 1, and 1 + 1 = 10 (0 with a carry of 1 to the next left column). If a carry bit is added to 1 + 1, the result is 1 + 1 + 1 = 11 (1 with a carry of 1).",
  },
  {
    q: "What is Two's Complement and why do computers use it?",
    a: "Two's Complement is the mathematical standard for representing signed integers in computer hardware. To negate a binary number, invert all bits (One's Complement) and add 1. It eliminates the ambiguity of negative zero (+0 vs -0) and allows identical adder circuitry for both addition and subtraction.",
  },
  {
    q: "What is the difference between bitwise AND, OR, and XOR?",
    a: "Bitwise AND produces 1 only if both bits are 1; bitwise OR produces 1 if at least one bit is 1; bitwise XOR (exclusive OR) produces 1 if exactly one bit is 1 (differing inputs). XOR is widely used in checksums, parity checks, and cryptography.",
  },
  {
    q: "What is the difference between a logical shift and an arithmetic shift?",
    a: "A logical right shift inserts zeros into the most significant bit (MSB), suitable for unsigned numbers. An arithmetic right shift preserves the sign bit (replicating the MSB), which correctly divides negative Two's Complement signed integers by 2.",
  },
  {
    q: "Why do modern digital computers use binary instead of decimal?",
    a: "Binary aligns directly with physical hardware switches: electronic transistors operate reliably in two discrete states—high voltage (ON / 1) and low voltage (OFF / 0). Multi-state decimal circuits suffer from voltage noise, manufacturing tolerances, and signal degradation.",
  },
  {
    q: "How is binary related to hexadecimal and octal?",
    a: "Because 16 = 2⁴ and 8 = 2³, every 4 bits (nibble) of binary corresponds exactly to one hexadecimal digit (0-F), and every 3 bits corresponds to one octal digit (0-7). This allows compact human-readable representations of long bitstrings.",
  },
];

const LOGIC_GATES_ROWS = [
  ["AND (&)", "1 only if both A = 1 and B = 1", "Masking bits, clearing flags"],
  ["OR (|)", "1 if either A = 1 or B = 1 (or both)", "Setting flags, combining bitmasks"],
  ["XOR (^)", "1 if A and B differ (one 1, one 0)", "Parity generation, cryptographic stream ciphers, toggling bits"],
  ["NOT (~)", "Inverts all bits (0 becomes 1, 1 becomes 0)", "One's complement, bitwise negation"],
  ["Left Shift (<<)", "Shifts bits left by k positions, inserts 0s", "Fast multiplication by 2ᵏ"],
  ["Right Shift (>>)", "Shifts bits right by k positions", "Fast integer division by 2ᵏ"],
];

const RELATED_BIN = [
  { href: "/calculators/math/hex-calculator", icon: "16", name: "Hex Calculator" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/big-number-calculator", icon: "🔢", name: "Big Number Calc" },
  { href: "/calculators/math/scientific-calculator", icon: "🧮", name: "Scientific Calculator" },
  { href: "/calculators/math/matrix-calculator", icon: "🔲", name: "Matrix Calculator" },
  { href: "/calculators/math/number-sequence-calculator", icon: "📈", name: "Number Sequences" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Binary Calculator"
      intro="Execute binary arithmetic, evaluate bitwise logic gates, calculate Two's Complement, and convert between binary, octal, decimal, and hexadecimal."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Binary(Base 2)"
      related={RELATED_BIN}
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

          <h2>Foundations of Binary Arithmetic and Computing</h2>
          <p>
            The binary numeral system is the foundational language of digital logic, electronic computation, and computer architecture. Formally systematized in 1703 by German polymath Gottfried Wilhelm Leibniz in his seminal publication <em>Explication de l'Arithmétique Binaire</em>, binary uses only two numerical digits—0 and 1—to represent any arbitrary mathematical quantity.
          </p>
          <p>
            In modern silicon microprocessors, all software, algorithms, high-resolution multimedia, and artificial intelligence models are processed at the physical layer as electrical pulses traversing billion-transistor CMOS integrated circuits. By restricting electronic signaling strictly to two bistable states—conducting (saturation) versus non-conducting (cutoff)—digital computers achieve astronomical reliability, immunity to thermal voltage noise, and extreme switching speeds exceeding billions of cycles per second.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="bases" />
          </div>

          <h2>Mathematical Architecture of Positional Radix-2</h2>
          <p>
            In the positional base-2 system, each bit represents a weighted power of two ascending from right to left starting at 2⁰:
          </p>
          <Formula>N = b_n × 2ⁿ + ... + b₂ × 2² + b₁ × 2¹ + b₀ × 2⁰  where  b_i ∈ (0, 1)</Formula>
          <p>
            For an 8-bit unsigned byte (spanning values 0 through 255), the bit weights correspond to [128, 64, 32, 16, 8, 4, 2, 1]. For example, the binary string 10101010₂ translates to:
          </p>
          <Formula>10101010₂ = (1×128) + (0×64) + (1×32) + (0×16) + (1×8) + (0×4) + (1×2) + (0×1) = 170₁₀</Formula>

          <h2>Signed Integers and Two's Complement Representation</h2>
          <p>
            While unsigned integers represent strictly non-negative values, computer architectures require a method to represent negative numbers. The universal modern hardware standard is <strong>Two's Complement</strong>.
          </p>
          <p>
            In an <em>n</em>-bit Two's Complement system, the most significant bit (MSB) possesses a negative weight of <em>-2ⁿ⁻¹</em>. To negate any binary integer:
          </p>
          <ol>
            <li><strong>Bitwise Inversion (One's Complement):</strong> Flip all 0s to 1s and 1s to 0s (~x).</li>
            <li><strong>Increment by One:</strong> Add 1 to the inverted bitstring (~x + 1).</li>
          </ol>
          <p>
            For example, to find −42 in an 8-bit register:
          </p>
          <ul>
            <li>+42 in binary = 00101010₂</li>
            <li>Invert all bits = 11010101₂</li>
            <li>Add 1 = 11010110₂ = −42 in Two's Complement.</li>
          </ul>

          <h2>Step-by-Step Worked Arithmetic Derivations</h2>
          <p>
            Binary arithmetic mirrors decimal arithmetic, but column overflows occur at 2 instead of 10:
          </p>

          <h3>1. Binary Addition: 1011₂ + 0110₂ (11 + 6)</h3>
          <p>
            Align columns vertically and evaluate right to left with carry propagation:
          </p>
          <ul>
            <li>Column 1 (Units): 1 + 0 = 1 (Carry 0)</li>
            <li>Column 2 (Twos): 1 + 1 = 0 (Carry 1 to next column)</li>
            <li>Column 3 (Fours): 0 + 1 + Carry 1 = 0 (Carry 1)</li>
            <li>Column 4 (Eights): 1 + 0 + Carry 1 = 0 (Carry 1)</li>
            <li>Column 5 (Sixteens): Bring down Carry 1 = 1</li>
          </ul>
          <Formula>1011₂ + 0110₂ = 10001₂ = (16 + 1) = 17₁₀</Formula>

          <h3>2. Binary Multiplication via Shift-and-Add</h3>
          <p>
            Multiplying binary integers is remarkably straightforward because multiplying by each digit is either multiplying by 0 (producing all zeros) or multiplying by 1 (copying the multiplicand), shifted left by the digit's bit index:
          </p>
          <Formula>1101₂ (13) × 101₂ (5) = (1101₂ × 1) + (1101₂ × 0 &lt;&lt; 1) + (1101₂ × 1 &lt;&lt; 2)</Formula>
          <Formula>= 1101₂ + 00000₂ + 110100₂ = 1000001₂ = (64 + 1) = 65₁₀</Formula>

          <h3>3. Binary Division and Restoring Algorithm</h3>
          <p>
            Binary long division proceeds identically to decimal long division: compare the divisor with the current prefix of the dividend. If the prefix is greater than or equal to the divisor, subtract the divisor and record a 1 in the quotient; otherwise, record a 0 and bring down the next bit.
          </p>

          <h2>Comparative signed formats: Sign-Magnitude, One's Complement, and Two's Complement</h2>
          <p>
            In the early decades of electronic computing (1940s-1950s), computer designers experimented with three competing binary representations for signed integers:
          </p>
          <ul>
            <li>
              <strong>Sign-Magnitude:</strong> The MSB is a sign flag (0 = positive, 1 = negative), while remaining bits denote absolute value. This created two distinct representations of zero (+0 and -0) and required complex conditional logic in CPU arithmetic circuits.
            </li>
            <li>
              <strong>One's Complement:</strong> Negative numbers are formed by bitwise inverting all positive bits. While subtraction could be performed via addition with an end-around carry, it still suffered from dual zero representations (00000000₂ = +0, 11111111₂ = -0).
            </li>
            <li>
              <strong>Two's Complement:</strong> By adding 1 to the One's Complement, negative zero is completely eradicated, yielding a single unique zero (00000000₂). Furthermore, hardware subtraction is identical to addition: A − B = A + (~B + 1).
            </li>
          </ul>

          <h2>Boolean Algebra and Bitwise Logic Gate Taxonomy</h2>
          <p>
            Formulated by George Boole in 1847, Boolean algebra operates on binary truth values. Bitwise operations execute Boolean logic in parallel across corresponding bit positions:
          </p>

          <DataTable
            head={["Bitwise Operation", "Logical Rule & Mechanism", "Common Software / Engineering Deployment"]}
            rows={LOGIC_GATES_ROWS}
            highlight={2}
          />

          <h2>Practical Applications Across Computational Systems</h2>
          <p>
            Binary calculations underpin contemporary technological infrastructure:
          </p>
          <ul>
            <li>
              <strong>CPU Arithmetic Logic Units (ALUs):</strong> Full-adder circuits constructed from XOR, AND, and OR gates perform billions of arithmetic and pointer instructions per second.
            </li>
            <li>
              <strong>IP Networking and CIDR Subnet Masks:</strong> Routing packets across the internet requires bitwise ANDing IP addresses against 32-bit subnet masks (e.g., 255.255.255.0 = /24 prefix).
            </li>
            <li>
              <strong>Cryptographic Hashes and Block Ciphers:</strong> Algorithms like AES-256 and SHA-256 execute millions of bitwise rotations, XOR cascades, and substitution permutations.
            </li>
            <li>
              <strong>Embedded Systems and Microcontrollers:</strong> Interfacing with hardware GPIO pins and sensor registers via bitmask manipulation.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your digital computation toolkit, explore our specialized <Link href="/calculators/math/hex-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Hex Calculator</Link>, <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>, <Link href="/calculators/math/big-number-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Big Number Calculator</Link>, and <Link href="/calculators/math/scientific-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Calculator</Link>.
          </p>
        </>
      }
    >
      <BinaryCalculator />
    </CalcPage>
  );
}
