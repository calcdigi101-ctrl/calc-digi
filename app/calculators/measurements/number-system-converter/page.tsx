import type { Metadata } from "next";
import Link from "next/link";
import NumberSystemConverterComponent from "@/components/calcs/measurements/number-system-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberSystemPositionalRadixDensityChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/number-system-converter";
const TITLE = "Number System Converter | Binary, Decimal, Hexadecimal & Octal";
const DESCRIPTION =
  "Convert between decimal, binary, hexadecimal, and octal positional radices with full two's complement, ASCII, and IEEE-754 bit-pattern modeling.";

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
  { href: "/calculators/measurements/data-storage-converter", icon: "💾", name: "Data Storage" },
  { href: "/calculators/measurements/roman-numeral-converter", icon: "🏛️", name: "Roman Numerals" },
  { href: "/calculators/internet/bandwidth-calculator", icon: "🌐", name: "Bandwidth Calculator" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "🔬", name: "Scientific Notation" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage" },
  { href: "/pages/measurements", icon: "🔢", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why do modern digital computers operate exclusively in binary (Base-2)?",
    a: "Modern computer microprocessors are constructed from billions of CMOS field-effect transistors acting as microscopic electronic switches. In semiconductor physics, two discrete voltage states (e.g., 0V for logic 0, and +1.2V for logic 1) provide massive noise margins against thermal fluctuation, electromagnetic interference, and manufacturing tolerances. Binary arithmetic simplifies logic gate design (AND, OR, NOT, XOR) into robust silicon circuits.",
  },
  {
    q: "Why is hexadecimal (Base-16) so ubiquitous in computer programming?",
    a: "Hexadecimal functions as a compact human-readable shorthand for binary bit streams. Because 16 is an exact power of 2 (2⁴ = 16), exactly one hexadecimal character (0-9, A-F) maps directly to a 4-bit binary 'nibble'. Consequently, an 8-bit byte (00000000 to 11111111) is expressed cleanly as exactly two hex digits (0x00 to 0xFF), condensing memory addresses and web color codes.",
  },
  {
    q: "What is octal (Base-8) and where is it used today?",
    a: "Octal uses digits 0 through 7, where each octal digit maps to exactly 3 binary bits (2³ = 8). While largely replaced by hexadecimal in modern computing, octal remains standard in Unix/Linux file permissions (e.g., chmod 755 corresponds to binary 111 101 101: read/write/execute for owner, read/execute for group and others) and aviation transponder squawk codes (e.g., 7700 for emergency).",
  },
  {
    q: "How does two's complement represent negative integers in binary?",
    a: "Two's complement is the universal mathematical convention for signed integers in digital processors. To negate an n-bit binary number: invert all bits (0 becomes 1, 1 becomes 0) and add 1 to the least significant bit. This eliminates duplicate zero representations (+0 and -0) and allows standard binary addition circuits to perform subtraction without auxiliary hardware.",
  },
];

export default function NumberSystemConverterPage() {
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
            <strong>Quick Radix Guidance:</strong> Positional numeral systems represent quantities through radix bases and weighted digit positions. In computer architecture, cybersecurity, and embedded software, cross-reference byte memory units in our <Link href="/calculators/measurements/data-storage-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">data storage converter</Link> and convert classical non-positional numerals in our <Link href="/calculators/measurements/roman-numeral-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">roman numeral converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Foundations of Positional Radix Notation: The Power-Base Architecture
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Positional notation represents one of the crowning intellectual achievements in the history of mathematics. Developed by Indian mathematicians and popularized in Europe by Persian polymath Al-Khwarizmi and Italian mathematician Fibonacci, positional number systems represent numbers through an ordered sequence of digits where the absolute value of each symbol depends on its relative position within the string, scaled by successive powers of an integer radix base b.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While human biology settled on decimal (Base-10) due to our ten anatomical fingers, digital silicon computers operate natively in binary (Base-2). Bridging the gap between human cognitive preferences and silicon machine language requires constant translation across binary, octal (Base-8), decimal (Base-10), and hexadecimal (Base-16) radices in assembly programming, network packet inspection, and cryptographic key generation.
          </p>

          <NumberSystemPositionalRadixDensityChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation: Polynomial Radix Expansion & Repeated Division
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Any non-negative integer N expressed in a positional radix base b with digits d_k computes via polynomial summation:
          </p>
          <Formula>{"N = \\sum_{k=0}^{n-1} d_k \\times b^k = d_{n-1} b^{n-1} + \\dots + d_2 b^2 + d_1 b^1 + d_0 b^0"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where each digit d_k is an integer strictly bounded by 0 ≤ d_k &lt; b. To convert from decimal Base-10 into any arbitrary target radix b, computer algorithms execute the repeated division algorithm:
          </p>
          <Formula>{"N_{i+1} = \\lfloor N_i / b \\rfloor, \\quad \\text{remainder } r_i = N_i \\pmod b"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The remainders r_i recorded in reverse chronological order form the exact digits of the target radix string. For example, converting decimal 250 into hexadecimal Base-16:
          </p>
          <Formula>{"250 \\div 16 = 15 \\text{ R } 10 (\\text{A}), \\quad 15 \\div 16 = 0 \\text{ R } 15 (\\text{F}) \\implies 250_{10} = \\text{FA}_{16}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating network bit throughput and byte transmission timings, cross-reference line rates in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link> and calculate exponential quantities using our <Link href="/calculators/math/scientific-notation-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">scientific notation calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Positional Radix Values (0 to 15)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact numerical equivalencies across the four fundamental computational radices for a 4-bit nibble:
          </p>
          <DataTable
            head={["Decimal (Base 10)", "Binary (Base 2)", "Octal (Base 8)", "Hexadecimal (Base 16)", "ASCII Character Equivalent"]}
            rows={[
              ["0", "0000", "0", "0x0", "NUL (Null Byte)"],
              ["1", "0001", "1", "0x1", "SOH (Start of Header)"],
              ["2", "0010", "2", "0x2", "STX (Start of Text)"],
              ["3", "0011", "3", "0x3", "ETX (End of Text)"],
              ["4", "0100", "4", "0x4", "EOT (End of Trans)"],
              ["5", "0101", "5", "0x5", "ENQ (Enquiry)"],
              ["6", "0110", "6", "0x6", "ACK (Acknowledge)"],
              ["7", "0111", "7", "0x7", "BEL (Bell Sound)"],
              ["8", "1000", "10", "0x8", "BS (Backspace)"],
              ["9", "1001", "11", "0x9", "HT (Horizontal Tab)"],
              ["10", "1010", "12", "0xA", "LF (Line Feed)"],
              ["11", "1011", "13", "0xB", "VT (Vertical Tab)"],
              ["12", "1100", "14", "0xC", "FF (Form Feed)"],
              ["13", "1101", "15", "0xD", "CR (Carriage Return)"],
              ["14", "1110", "16", "0xE", "SO (Shift Out)"],
              ["15", "1111", "17", "0xF", "SI (Shift In)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: IPv4 Subnet Mask & Network IP Parsing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a network security engineer configuring a Cisco core router interface. A security policy specifies a Classless Inter-Domain Routing (CIDR) subnet prefix of /27 on an interface assigned the decimal dotted IP address 192.168.10.142. The engineer must convert the IP octets into 32-bit binary, derive the subnet mask in hexadecimal, and calculate the broadcast address:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Decimal Octets to 8-bit Binary):</strong> 192 = 11000000; 168 = 10101000; 10 = 00001010; 142 = 10001110. Concatenated binary: 11000000.10101000.00001010.10001110.</li>
            <li><strong>Step 2 (Construct /27 Subnet Mask in Binary & Hex):</strong> 27 leading ones followed by 5 zeros: 11111111.11111111.11111111.11100000. In decimal: 255.255.255.224. In hexadecimal: 0xFFFFFFE0.</li>
            <li><strong>Step 3 (Execute Bitwise AND for Network Address):</strong> Host octet 142 (10001110) AND mask 224 (11100000) = 10000000 (decimal 128). Network address = 192.168.10.128.</li>
            <li><strong>Step 4 (Usable Host Verification):</strong> 5 host bits provide 2⁵ - 2 = 30 usable host IP addresses. Total subnet bandwidth can be modeled in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link> and file download durations verified in our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Floating-Point Representation: The IEEE 754 Binary Standard
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern computer programming (C++, Rust, Python, JavaScript), real decimal numbers with fractional parts are encoded using the IEEE 754 binary floating-point standard. A standard 64-bit double-precision floating-point number (binary64) partitions bits into three distinct fields:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Sign Bit (Bit 63):</strong> 1 bit (0 for positive, 1 for negative).</li>
            <li><strong>Biased Exponent (Bits 62 to 52):</strong> 11 bits with a bias offset of +1023, representing powers of 2 from 2⁻¹⁰²² to 2⁺¹⁰²³.</li>
            <li><strong>Significand / Mantissa (Bits 51 to 0):</strong> 52 explicit bits providing 53 bits of precision (~15 to 17 decimal digits) via an implicit leading 1 bit.</li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because decimal fractions like 0.1 (1/10) cannot be represented cleanly in finite binary powers of two (0.1 in binary is a recurring fraction: 0.0001100110011...b), floating-point arithmetic produces microscopic rounding artifacts (e.g., 0.1 + 0.2 = 0.30000000000000004 in JavaScript), requiring fixed-point decimal integer math in financial software.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Web Design: 24-Bit RGB Hexadecimal Color Triplet Coding
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In web design and digital graphics, colors are displayed on computer monitors through additive RGB (Red, Green, Blue) color mixing. Standard TrueColor uses 24 bits per pixel, allocating exactly 8 bits (one byte, 0 to 255) per color channel.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            CSS style sheets encode these 24 bits as a six-digit hexadecimal triplet prefixed with a hash mark (#RRGGBB). For instance, pure emerald green (#10B981) decomposes into: Red = 0x10 = 16/255 (6.3%), Green = 0xB9 = 185/255 (72.5%), and Blue = 0x81 = 129/255 (50.6%). Hexadecimal coding condenses over 16.7 million distinct color combinations into compact, easily parseable strings.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Assembly Debugging, Cryptography & Transponders
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In software reverse engineering and assembly debugging, disassembly listings display machine opcodes in hexadecimal bytes (e.g., 0x90 for NOP, 0xCC for INT3 software breakpoint). In cryptography, cryptographic hash functions like SHA-256 output 256-bit digest integers formatted as 64-character hexadecimal strings.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For academic tracking and general mathematical tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and track test percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Gray Code: Reflected Binary & Rotary Optical Shaft Encoders
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial automation, robotics, and aerospace fly-by-wire controls, optical rotary shaft encoders measure the exact rotational angle of motor shafts. In standard binary arithmetic, counting from 3 (0011b) to 4 (0100b) requires three simultaneous bit transitions (two bits flip from 1 to 0, and one bit flips from 0 to 1). In physical hardware, microscopic misalignments of optical photodetectors cause bits to switch at slightly staggered nanosecond intervals, generating catastrophic spurious transient codes (e.g., momentarily reading 7 or 0 during the transition).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1953, Bell Labs engineer Frank Gray patented the Reflected Binary Code (Gray Code). In Gray code, consecutive numbers differ by exactly one single binary bit flip (Hamming distance = 1). Because only a single track transition occurs at any boundary, physical read glitches are completely eliminated. Software algorithms convert standard binary N into Gray code using a simple bitwise shift and XOR: G = N ^ (N &gt;&gt; 1).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Binary Coded Decimal (BCD) & Real-Time Clock Hardware Registers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In hardware real-time clock (RTC) chips (such as the ubiquitous DS3231) and legacy financial mainframe transaction processors, numbers are stored in Binary Coded Decimal (BCD). Rather than converting a large decimal number into pure binary, BCD encodes each individual base-10 digit (0 through 9) into its own dedicated 4-bit nibble.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For example, the decimal integer 59 is represented in packed BCD as 0101 1001b (0x59). While BCD wastes approximately 16.7% of potential 4-bit representation capacity (binary states 1010b through 1111b are unused), it completely eliminates fractional decimal rounding errors when performing financial accounting, and allows hardware seven-segment LED display drivers to decode digits without expensive division circuits.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Digital Signal Processors & Fixed-Point Q-Format Arithmetic
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In low-power embedded microcontrollers and audio digital signal processors (DSPs) lacking dedicated hardware floating-point units (FPUs), fractional decimal calculations are implemented using fixed-point Q-format binary arithmetic. In Q15 notation, a 16-bit signed two&apos;s complement integer dedicates 1 bit to the sign and 15 bits to the fractional magnitude.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The numerical value of a Q15 binary integer is computed as N ÷ 2¹⁵ (N ÷ 32,768), representing real numbers between -1.0 and +0.999969. In wireless telecommunications and noise-canceling headphone DSP filters, executing multiply-accumulate (MAC) operations in Q-format binary achieves microsecond throughput with minimal power consumption, proving the enduring practical power of positional radix engineering.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In embedded microcontroller firmware design and programmable logic controllers (PLCs), engineers configure bitmask flags using bitwise logical operators (AND, OR, NOT, XOR, left-shift, right-shift). For related computer engineering tools, explore our <Link href="/calculators/measurements/data-storage-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">data storage converter</Link> and calculate transmission bitrates in the <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link>.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern cybersecurity and cryptography, large prime numbers spanning 2,048 or 4,096 bits are generated for RSA public-key encryption. Storing and transmitting these gargantuan keys requires base-64 or hexadecimal radix formatting to ensure error-free transmission across international network gateways.
          </p>
        </>
      }
    >
      <NumberSystemConverterComponent />
    </CalcPage>
  );
}
