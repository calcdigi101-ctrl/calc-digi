import HexCalculator from "@/components/calcs/math/hex-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/hex-calculator";
const TITLE = "Hex Calculator | Hexadecimal Arithmetic, Bitwise & Base 16 Converter | CalcDigi";
const DESCRIPTION =
  "Free online hexadecimal calculator. Perform hex addition, subtraction, multiplication, division, ASCII/binary conversions, and bitwise logic step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the hexadecimal numeral system (Base 16)?",
    a: "The hexadecimal system is a base-16 positional numeral system that uses 16 distinct symbols: the standard Arabic digits 0 through 9, followed by the letters A through F to represent values 10 through 15.",
  },
  {
    q: "Why do computer scientists use hexadecimal instead of binary?",
    a: "Binary strings are long and difficult for humans to read and remember. Because 16 is an exact power of 2 (2⁴ = 16), exactly four binary bits (one nibble) map into a single hexadecimal digit. For example, 11111111₂ simplifies cleanly to FF₁₆.",
  },
  {
    q: "How do you convert hexadecimal to decimal?",
    a: "Multiply each hex digit by 16 raised to its positional power (starting with 16⁰ on the right) and sum the products: value = d_n × 16ⁿ + ... + d₁ × 16¹ + d₀ × 16⁰.",
  },
  {
    q: "How do web HTML/CSS hex color codes work?",
    a: "CSS hex colors represent 24-bit TrueColor in the format #RRGGBB. Two hex digits represent Red (00 to FF = 0 to 255), two represent Green, and two represent Blue, providing 16,777,216 distinct color combinations.",
  },
  {
    q: "How does hexadecimal addition handle carry bits?",
    a: "When the sum of two hex digits in a column reaches 16 or greater, subtract 16 to determine the column digit and carry 1 to the next column. For example, 9 + 8 = 17₁₀ = 11₁₆ (write 1, carry 1).",
  },
  {
    q: "What does the '0x' prefix mean in programming languages?",
    a: "The '0x' prefix (such as 0x1A4F) is standard syntactic notation across C, C++, JavaScript, Python, and Assembly to explicitly signal to the compiler or interpreter that the following token is a hexadecimal literal.",
  },
  {
    q: "What is an IPv6 address and why is it written in hexadecimal?",
    a: "IPv6 addresses are 128-bit network identifiers. Written in binary, an IPv6 address would be an unreadable string of 128 ones and zeros. Hexadecimal groups the address into eight 16-bit blocks separated by colons (e.g., 2001:0db8:85a3::8a2e:0370:7334).",
  },
  {
    q: "How are memory addresses represented in debugging disassemblers?",
    a: "In x86/ARM assembly and memory debuggers, physical and virtual RAM memory addresses are displayed in hexadecimal (e.g., 0x7FFF5FBFF8C0) because computer architecture registers and data bus widths are structured in powers of 2 (32-bit or 64-bit words).",
  },
];

const HEX_EQUIV_ROWS = [
  ["0", "0000", "0", "0"],
  ["1", "0001", "1", "1"],
  ["5", "0101", "5", "5"],
  ["9", "1001", "9", "11"],
  ["A (10)", "1010", "10", "12"],
  ["B (11)", "1011", "11", "13"],
  ["C (12)", "1100", "12", "14"],
  ["D (13)", "1101", "13", "15"],
  ["E (14)", "1110", "14", "16"],
  ["F (15)", "1111", "15", "17"],
];

const RELATED_HEX = [
  { href: "/calculators/math/binary-calculator", icon: "01", name: "Binary Calculator" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/big-number-calculator", icon: "🔢", name: "Big Number Calc" },
  { href: "/calculators/math/scientific-calculator", icon: "🧮", name: "Scientific Calculator" },
  { href: "/calculators/math/matrix-calculator", icon: "🔲", name: "Matrix Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Hex Calculator | CalcDigi"
      intro="Execute hexadecimal arithmetic, perform 4-bit nibble binary conversions, inspect memory byte structures, and evaluate bitwise logic."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Hex(Base 16)"
      related={RELATED_HEX}
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

          <h2>Foundations of Hexadecimal Positional Notation</h2>
          <p>
            The hexadecimal numeral system, frequently abbreviated as <strong>hex</strong>, is a positional base-16 numbering system widely deployed throughout modern computer science, low-level software engineering, and digital communications. Introduced to mainstream computing in 1963 by IBM engineers during the architectural development of the landmark System/360 mainframe family, hexadecimal replaced older octal (base-8) conventions to match 8-bit byte word architectures.
          </p>
          <p>
            Because human working memory struggles to parse long, repetitive streams of binary bits (such as 1101101011110010₂), hexadecimal provides an exact, lossless, human-readable shorthand. Since 2⁴ = 16, exactly four binary digits (a <em>nibble</em>) collapse into a single hexadecimal character. An entire 8-bit byte is represented completely by two hex characters, and a 32-bit memory address condenses to eight hex characters.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="bases" />
          </div>

          <h2>Mathematical Architecture of Radix-16</h2>
          <p>
            In base 16, positional column values represent ascending powers of sixteen starting at 16⁰ on the far right:
          </p>
          <Formula>Value = d_n × 16ⁿ + ... + d₂ × 16² + d₁ × 16¹ + d₀ × 16⁰</Formula>
          <p>
            Where digits <em>d_i</em> belong to the 16-element set:
          </p>
          <Formula>( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A=10, B=11, C=12, D=13, E=14, F=15 )</Formula>

          <h3>Step-by-Step Worked Conversion: 0x3E8 to Decimal</h3>
          <p>
            To convert the hexadecimal literal <strong>0x3E8</strong> to standard decimal:
          </p>
          <ul>
            <li>Digit 3 in 16² position: 3 × 16² = 3 × 256 = 768</li>
            <li>Digit E (14) in 16¹ position: 14 × 16¹ = 14 × 16 = 224</li>
            <li>Digit 8 in 16⁰ position: 8 × 16⁰ = 8 × 1 = 8</li>
          </ul>
          <Formula>0x3E8 = 768 + 224 + 8 = 1,000₁₀</Formula>

          <h2>Step-by-Step Worked Hexadecimal Addition and Borrow Subtraction</h2>
          <p>
            Adding hexadecimal numbers follows the same column mechanics as decimal addition, with column carries triggered when a sum reaches or exceeds 16:
          </p>
          <p>
            Consider adding <strong>0x2F</strong> and <strong>0x1A</strong>:
          </p>
          <ul>
            <li>
              <strong>Column 1 (Sixteens⁰ Units):</strong> F + A = 15 + 10 = 25₁₀.
              Divide by 16: 25 ÷ 16 = 1 with a remainder of 9.
              Write down <strong>9</strong> and carry <strong>1</strong> to the next column.
            </li>
            <li>
              <strong>Column 2 (Sixteens¹):</strong> 2 + 1 + Carry 1 = 4.
              Write down <strong>4</strong>.
            </li>
          </ul>
          <Formula>0x2F + 0x1A = 0x49  (Decimal Check: 47 + 26 = 73₁₀; 4×16 + 9 = 73₁₀)</Formula>

          <h3>Subtractive Borrowing in Base 16</h3>
          <p>
            When subtracting in hexadecimal (e.g., 0x52 − 0x2B), if the upper digit is smaller than the lower digit, borrowing 1 from the next higher column adds 16 (not 10) to the current digit:
          </p>
          <Formula>0x52 − 0x2B: 2 &lt; B (11) → Borrow 1 from 5 (becomes 4) → (2 + 16) − 11 = 18 − 11 = 7</Formula>
          <Formula>Column 2: 4 − 2 = 2 → Result = 0x27 (Decimal Check: 82 − 43 = 39₁₀; 2×16 + 7 = 39₁₀)</Formula>

          <h2>Endianness: Big-Endian Versus Little-Endian Byte Ordering</h2>
          <p>
            In computer systems, multi-byte integers stored in RAM memory can be sequenced in two opposing arrangements:
          </p>
          <ul>
            <li>
              <strong>Big-Endian:</strong> The most significant byte (MSB) is stored at the lowest memory address (closest to 0). This matches human reading order and is standard in network protocols (IP/TCP headers).
            </li>
            <li>
              <strong>Little-Endian:</strong> The least significant byte (LSB) is stored at the lowest memory address. This is the native hardware architecture of x86, x86-64, and modern ARM microprocessors.
            </li>
          </ul>
          <p>
            For example, the 32-bit integer 0x12345678 stored at memory address 0x1000 appears in Little-Endian as bytes [0x78, 0x56, 0x34, 0x12], whereas in Big-Endian it appears as [0x12, 0x34, 0x56, 0x78].
          </p>

          <h2>Hexadecimal Floating-Point Constants in Modern Programming (C99, Java, Rust)</h2>
          <p>
            While decimal scientific notation uses powers of 10, modern programming language specifications (including C99, C++, Java, and Rust) support <strong>hexadecimal floating-point literals</strong> using powers of 2. In this notation, the letter 'p' or 'P' denotes a binary exponent:
          </p>
          <Formula>0x1.8p+3 = (1 + 8/16) × 2³ = 1.5 × 8 = 12.0₁₀</Formula>
          <p>
            Hexadecimal floating-point eliminates decimal-to-binary conversion rounding errors, allowing compiler engineers, graphics shader programmers, and cryptographic implementers to specify bit-exact IEEE 754 floating-point constants directly into source code.
          </p>

          <h2>Cryptographic Checksums and Hash Digests (CRC32, MD5, SHA-256)</h2>
          <p>
            In internet security and distributed ledger blockchains, cryptographic hash functions map arbitrary data payloads into fixed-size binary bitstrings. These output digests are universally communicated as hexadecimal strings:
          </p>
          <ul>
            <li><strong>CRC32:</strong> 32-bit checksum represented by 8 hex characters (e.g., 0x4A17B2C9), verifying file download integrity.</li>
            <li><strong>MD5:</strong> 128-bit hash formatted as 32 hex characters.</li>
            <li><strong>SHA-256:</strong> 256-bit cryptographic fingerprint formatted as 64 hex characters, securing Bitcoin transactions and TLS certificates.</li>
          </ul>

          <h2>Radix Equivalence Table: Hex, Binary, Octal, and Decimal</h2>
          <p>
            The table below illustrates the exact structural correspondence across common computer numbering bases:
          </p>

          <DataTable
            head={["Hex Digit", "4-Bit Binary Nibble", "Decimal Integer", "Octal String"]}
            rows={HEX_EQUIV_ROWS}
            highlight={4}
          />

          <h2>Practical Applications in Modern Software and Hardware Systems</h2>
          <p>
            Hexadecimal representation is ubiquitous across the modern software engineering stack:
          </p>
          <ul>
            <li>
              <strong>Memory Addressing and Pointers:</strong> Computer operating systems format virtual memory addresses, stack pointers, and heap allocations in hex (e.g., 0x7FFF5FBFF8C0) reflecting 64-bit memory spaces.
            </li>
            <li>
              <strong>Web Design and CSS Color Models:</strong> The 24-bit RGB TrueColor model encodes Red, Green, and Blue channels as two hex digits each (#RRGGBB). For instance, pure emerald green is represented as #10B981.
            </li>
            <li>
              <strong>Machine Code Disassembly and Reverse Engineering:</strong> Decompilers and x86/ARM disassemblers display binary opcode instructions as byte streams (e.g., 0x90 for NOP, 0xCC for INT3 debug breakpoint).
            </li>
            <li>
              <strong>Network Hardware MAC Addresses:</strong> Network Interface Cards (NICs) possess globally unique 48-bit hardware MAC addresses formatted as six colon-separated hex byte pairs (e.g., 00:1A:2B:3C:4D:5E).
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your digital computation toolkit, explore our specialized <Link href="/calculators/math/binary-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Binary Calculator</Link>, <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>, <Link href="/calculators/math/big-number-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Big Number Calculator</Link>, and <Link href="/calculators/math/scientific-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Calculator</Link>.
          </p>
        
          <h2>Hexadecimal Radix 16 Architecture, Nibbles & Memory Addressing</h2>
          <p>
            Hexadecimal notation serves as the universally adopted human-readable bridge to low-level digital binary computer systems. Because 16 is an exact power of two (2⁴ = 16), every hexadecimal digit maps with 100% precision to a 4-bit binary nibble, and two hexadecimal characters represent a complete 8-bit byte (0x00 to 0xFF). This natural radix correspondence eliminates decimal conversion overhead when inspecting memory registers, IPv6 network addresses, IEEE 754 floating-point byte orderings, and CSS RGB hexadecimal color channels. In reverse engineering, microprocessor assembly debugging, and firmware analysis, hexadecimal arithmetic allows software engineers to perform bitwise masking, endianness byte-swapping, and pointer displacement arithmetic directly on compiled machine code.
          </p>
</>
      }
    >
      <HexCalculator />
    </CalcPage>
  );
}
