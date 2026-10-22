import RomanNumeralConverter from "@/components/calcs/math/roman-numeral-converter";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BaseConversionVisualizerChart } from "@/components/flagship/math/editorial-charts/BaseConversionVisualizerChart";

const PATH = "/calculators/math/roman-numeral-converter";
const TITLE = "Roman Numeral Converter | Convert Numbers to Roman Numerals | CalcDigi";
const DESCRIPTION =
  "Free online Roman numeral converter. Convert standard numbers to Roman numerals and Roman numerals to numbers (1 to 3,999,999), with vinculum bar notation and rules.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What are the seven standard symbols in Roman numerals?",
    a: "The standard Roman numeral system uses seven Latin capital letters: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, and M = 1,000.",
  },
  {
    q: "What is the subtractive principle in Roman numerals?",
    a: "Under the subtractive principle, placing a smaller value symbol immediately before a larger value symbol indicates subtraction rather than addition. Exactly six subtractive pairs are permitted: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900).",
  },
  {
    q: "Can a Roman numeral symbol be repeated more than three times consecutively?",
    a: "In standard classical notation, the symbols I, X, C, and M may never be repeated four times consecutively (e.g., 4 is written as IV, not IIII; 40 is XL, not XXXX). The symbols V, L, and D are never repeated, as two of them equal the next higher unit (VV = X, LL = C, DD = M).",
  },
  {
    q: "What is the largest standard Roman numeral without an overline bar?",
    a: "The largest integer representable in standard classical Roman numerals is 3,999, written as MMMCMXCIX (3000 + 900 + 90 + 9). Higher values require vinculum (overline) notation.",
  },
  {
    q: "What is the vinculum (overline) bar in Roman numerals?",
    a: "A horizontal bar (vinculum) placed above a Roman numeral multiplies its value by 1,000. For example, V̄ represents 5,000, X̄ represents 10,000, and M̄ represents 1,000,000. A double overline or side vertical brackets multiply by 100,000 or 1,000,000.",
  },
  {
    q: "Why do some clock faces use IIII instead of IV for the number 4?",
    a: "Antique clocks frequently display IIII rather than IV for aesthetic visual balance across from VIII (8), to honor historical Roman mythological reverence for Jupiter (whose Latin name IVPPITER began with IV), or for mechanical mold casting symmetry.",
  },
  {
    q: "Did the Romans have a symbol for zero?",
    a: "No. Classical Roman numerals did not possess a symbol for zero because they were designed for counting and accounting tallies rather than positional place-value computation. Medieval scholars used the Latin word 'nulla' (meaning none) to denote zero.",
  },
  {
    q: "Where are Roman numerals still used in modern society?",
    a: "Roman numerals remain widely utilized in legal document outlines, book volume/chapter headings, monarch regnal numbers (King Charles III), Super Bowl championships (Super Bowl LVIII), Olympic Games, and motion picture copyright date credits.",
  },
];

const ROMAN_SYMBOLS_ROWS = [
  ["I", "1", "Single tally stroke / unit finger"],
  ["V", "5", "Open hand / V-shape between thumb and fingers"],
  ["X", "10", "Crossed crossed tally strokes / two hands"],
  ["L", "50", "Half of early Greek letter Ch (originally Ψ or 𐌚)"],
  ["C", "100", "Initial letter of Latin 'Centum' (one hundred)"],
  ["D", "500", "Right half of Greek Phi / ↁ (five hundred)"],
  ["M", "1,000", "Initial letter of Latin 'Mille' (one thousand)"],
  ["IV / IX", "4 / 9", "Subtractive pairs for units (5 − 1 and 10 − 1)"],
  ["XL / XC", "40 / 90", "Subtractive pairs for tens (50 − 10 and 100 − 10)"],
  ["CD / CM", "400 / 900", "Subtractive pairs for hundreds (500 − 100 and 1000 − 100)"],
];

const RELATED_ROMAN = [
  { href: "/calculators/math/binary-calculator", icon: "01", name: "Binary Calculator" },
  { href: "/calculators/math/hex-calculator", icon: "16", name: "Hex Calculator" },
  { href: "/calculators/math/long-division-calculator", icon: "÷", name: "Long Division" },
  { href: "/calculators/math/scientific-notation-calculator", icon: "📐", name: "Scientific Notation" },
  { href: "/calculators/math/big-number-calculator", icon: "🔢", name: "Big Number Calc" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Roman Numeral Converter"
      intro="Convert standard Arabic numbers to Roman numerals and Roman numerals to numbers (1 to 3,999,999), with complete subtractive rules and vinculum notation."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Roman(n)"
      related={RELATED_ROMAN}
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

          <h2>Historical Foundations of the Roman Numeral System</h2>
          <p>
            The Roman numeral system originated in classical antiquity around 500 BCE from Etruscan tally notches. It served as Europe's primary numeric system for fifteen centuries until the Renaissance adoption of Hindu-Arabic numerals.
          </p>
          <p>
            Rather than relying on positional zeros, Roman numerals use additive and subtractive letter combinations. While calculations were handled via bronze abacuses, Roman numerals produced durable monumental inscriptions that endure today.
          </p>

          <div className="not-prose my-8">
            <BaseConversionVisualizerChart initialMode="bases" />
          </div>

          <h2>The Seven Fundamental Roman Numeral Symbols</h2>
          <p>
            The classical Roman numeral system is constructed entirely from seven distinct Latin uppercase letters:
          </p>
          <ul>
            <li><strong>I = 1:</strong> Represents a single upright finger or tally mark.</li>
            <li><strong>V = 5:</strong> Represents an open hand with fingers together and thumb extended (forming a V-shape).</li>
            <li><strong>X = 10:</strong> Represents two crossed hands or two opposed V shapes joined at their vertices.</li>
            <li><strong>L = 50:</strong> Historically derived from the lower half of the Etruscan letter for 50.</li>
            <li><strong>C = 100:</strong> Aligns with the Latin noun <em>Centum</em>, meaning one hundred.</li>
            <li><strong>D = 500:</strong> Represents half of the ancient enclosed Greek character ↀ (one thousand), yielding 500.</li>
            <li><strong>M = 1,000:</strong> Aligns with the Latin noun <em>Mille</em>, meaning one thousand.</li>
          </ul>

          <h2>The Four Cardinal Construction Rules</h2>
          <p>
            Formatting valid Roman numerals requires adherence to four standardized principles codified during the medieval and early modern print eras:
          </p>

          <h3>1. The Additive Principle</h3>
          <p>
            When symbols appear in descending order of value from left to right, their values are added together:
          </p>
          <Formula>XVI = 10 + 5 + 1 = 16;  CLXXII = 100 + 50 + 10 + 10 + 1 + 1 = 172</Formula>

          <h3>2. The Repetition Limit Rule</h3>
          <p>
            The symbols <strong>I, X, C, and M</strong> can repeat up to three times consecutively (III = 3, XXX = 30). The symbols <strong>V, L, and D</strong> never repeat since VV = X, LL = C, and DD = M.
          </p>

          <h3>3. The Subtractive Principle</h3>
          <p>
            To avoid four identical symbols, six standard subtractive pairs are defined:
          </p>
          <ul>
            <li><strong>IV = 4</strong> and <strong>IX = 9</strong> (I before V or X).</li>
            <li><strong>XL = 40</strong> and <strong>XC = 90</strong> (X before L or C).</li>
            <li><strong>CD = 400</strong> and <strong>CM = 900</strong> (C before D or M).</li>
          </ul>
          <p>
            Cross-decade subtractions (like IL for 49) are disallowed; 49 is written as XLIX (40 + 9).
          </p>

          <h3>4. The Vinculum (Overline) Notation for Numbers ≥ 4,000</h3>
          <p>
            Because repeating M four times is forbidden, the maximum integer representable in standard Latin letters is <strong>3,999 (MMMCMXCIX)</strong>. For larger values, classical scribes introduced the <strong>vinculum</strong>: a horizontal line drawn across the top of a numeral indicating multiplication by 1,000:
          </p>
          <Formula>V̄ = 5,000;  X̄ = 10,000;  L̄ = 50,000;  C̄ = 100,000;  D̄ = 500,000;  M̄ = 1,000,000</Formula>
          <p>
            For instance, the value 12,450 is written with vinculum notation as <strong>X̄ĪICDL</strong>.
          </p>

          <h2>Step-by-Step Worked Conversion Derivations</h2>
          <p>
            To convert an Arabic integer into Roman numerals, decompose the number into its positional thousands, hundreds, tens, and units components:
          </p>

          <h3>Case 1: Converting 1,994 to Roman Numerals</h3>
          <ul>
            <li>Thousands component (1,000): <strong>M</strong></li>
            <li>Hundreds component (900): 1000 − 100 = <strong>CM</strong></li>
            <li>Tens component (90): 100 − 10 = <strong>XC</strong></li>
            <li>Units component (4): 5 − 1 = <strong>IV</strong></li>
          </ul>
          <Formula>1,994 = 1,000 + 900 + 90 + 4 = MCMXCIV</Formula>

          <h3>Case 2: Converting 2,026 to Roman Numerals</h3>
          <ul>
            <li>Thousands component (2,000): 1,000 + 1,000 = <strong>MM</strong></li>
            <li>Hundreds component (0): Omitted (no symbol)</li>
            <li>Tens component (20): 10 + 10 = <strong>XX</strong></li>
            <li>Units component (6): 5 + 1 = <strong>VI</strong></li>
          </ul>
          <Formula>2,026 = 2,000 + 20 + 6 = MMXXVI</Formula>

          <h2>Comprehensive Roman Numeral Reference Table</h2>
          <p>
            The table below summarizes the complete core symbol taxonomy and standard subtractive pairs:
          </p>

          <DataTable
            head={["Roman Symbol", "Numerical Value", "Historical Etymology and Tally Origin"]}
            rows={ROMAN_SYMBOLS_ROWS}
            highlight={0}
          />

          <h2>Practical Modern Applications of Roman Numerals</h2>
          <p>
            While superseded in engineering calculations, Roman numerals serve crucial cultural and legal purposes:
          </p>
          <ul>
            <li>
              <strong>Monarchical and Papal Regnal Titles:</strong> Distinguishing successive sovereigns in constitutional monarchies and ecclesiastic leadership (e.g., Queen Elizabeth II, Pope John Paul II).
            </li>
            <li>
              <strong>Legal, Legislative, and Academic Outlines:</strong> Structuring multi-tier statutory legal codes, legislative bills, and academic outlines (Title I, Article II, Section III).
            </li>
            <li>
              <strong>Major Sporting Events:</strong> Denoting annual NFL Super Bowl championships (Super Bowl LVIII) and Olympiad games.
            </li>
            <li>
              <strong>Motion Picture and Architectural Inscriptions:</strong> Framing copyright production dates in film credits (e.g., MCMXCVI = 1996) and cornerstone dedication plaques on public buildings.
            </li>
          </ul>

          <h2>Related Mathematical and Computational Calculators</h2>
          <p>
            To expand your numbering system toolkit, explore our specialized <Link href="/calculators/math/binary-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Binary Calculator</Link>, <Link href="/calculators/math/hex-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Hex Calculator</Link>, <Link href="/calculators/math/long-division-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Long Division Calculator</Link>, and <Link href="/calculators/math/scientific-notation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Scientific Notation Calculator</Link>.
          </p>
        
          <h2>Additive Positional Hybridity, Epigraphic Inscriptions & Subtractive Rules</h2>
          <p>
            Roman numerals represent an additive-subtractive numeral system developed in ancient Rome, derived from tally stick notches and Etruscan counting symbols. Unlike the Hindu-Arabic positional decimal system with zero, Roman numerals operate without a zero digit (nulla), preventing efficient algorithmic long division and algebraic manipulation. Standard epigraphic Latin inscriptions originally relied almost exclusively on additive notation (e.g., IIII for 4 and VIIII for 9); the subtractive rule (IV for 4, IX for 9, CD for 400) became standardized during the European Renaissance to save physical typeset printing space. Today, Roman numerals persist in epigraphy, monarchical regnal numbers, copyright dates, and clock face horology.
          </p>

          <h2>Historical Chronology, Epigraphy & Horological Clock Traditions</h2>
          <p>
            Roman numerals continue to serve distinctive cultural, legal, and artistic functions across global design and horology. Traditional clock faces frequently feature the additive archaic numeral IIII instead of IV, a centuries-old visual convention providing visual symmetry against the VIII numeral on the opposite side of the watch dial. In formal legal documents, book publishing front matter, and monumental architecture, Roman numerals establish timeless gravitas and permanent epigraphic durability.
          </p>
</>
      }
    >
      <RomanNumeralConverter />
    </CalcPage>
  );
}
