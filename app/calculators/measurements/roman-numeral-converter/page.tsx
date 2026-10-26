import type { Metadata } from "next";
import Link from "next/link";
import RomanNumeralConverterComponent from "@/components/calcs/measurements/roman-numeral-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RomanNumeralAdditiveSubtractiveEvolutionChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/roman-numeral-converter";
const TITLE = "Roman Numeral Converter | Roman to Arabic & Arabic to Roman";
const DESCRIPTION =
  "Convert Roman numerals to Arabic integers and vice versa (1 to 3,999) with epigraphic subtractive conventions and interactive character composition modeling.";

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
  { href: "/calculators/measurements/number-system-converter", icon: "🔢", name: "Number System" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/calculators/education/gpa-calculator", icon: "🎓", name: "GPA Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage" },
  { href: "/pages/measurements", icon: "🏛️", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why do Roman numerals omit the number zero (0)?",
    a: "Classical Roman mathematics was an empirical counting and accounting system based on physical tallies (abaci and counting boards). Roman numerals functioned as linguistic label tokens for tangible quantities of coins, soldiers, or grain bushels. Because 'nothing' cannot be counted as a physical collection, the Romans had no conceptual symbol for zero, using the Latin word 'nulla' when representing absence.",
  },
  {
    q: "Why do clock faces often display 'IIII' instead of 'IV' for the number four?",
    a: "The use of additive 'IIII' on traditional clock faces stems from four historical traditions: religious deference (in classical Latin, the Roman supreme deity Jupiter was spelled 'IVPPITER', making 'IV' taboo), visual aesthetic balance (IIII neatly balances the heavy VIII on the opposite side of the clock dial), and medieval clockmaker foundry convenience using four identical casting molds.",
  },
  {
    q: "What is the standard upper limit of standard Roman numeral representation?",
    a: "Standard classical Roman notation without overlines operates from 1 (I) to 3,999 (MMMCMXCIX). Beyond 3,999, classical epigraphy employed the 'vinculum'—a horizontal overline placed above a numeral to multiply its value by 1,000 (e.g., V̄ represents 5,000, and X̄ represents 10,000).",
  },
  {
    q: "What are the strict subtractive rules in standard modern Roman numerals?",
    a: "Modern standardized subtractive notation restricts subtractive prefixes: 'I' can precede only 'V' (IV = 4) and 'X' (IX = 9); 'X' can precede only 'L' (XL = 40) and 'C' (XC = 90); and 'C' can precede only 'D' (CD = 400) and 'M' (CM = 900). Symbols V, L, and D are never used subtractively, and a smaller numeral cannot be placed before a larger one if their difference is greater than one power of ten.",
  },
];

export default function RomanNumeralConverterPage() {
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
            <strong>Quick Epigraphic Guidance:</strong> Roman numerals represent historical additive and subtractive tally tokens. In historical chronology, legal document dating, and horology, cross-reference positional computer radices in our <Link href="/calculators/measurements/number-system-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">number system converter</Link> and calculate chronological dates using our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Epigraphic Origins of Roman Numerals: From Tally Sticks to Inscriptions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Roman numerals constitute Western civilization&apos;s most enduring non-positional numeral system. Originating from prehistoric shepherd tally sticks and Etruscan notch carving practices rather than abstract alphabet letters, each fundamental symbol mimics physical hand gestures: a single vertical notch represents one finger (I); a V-shaped cut represents the open hand between thumb and index finger (V, five); and two crossed notches represent ten fingers (X, ten).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As Roman administrative statecraft expanded across the Mediterranean basin, stone carvers standardized these symbols into Latin epigraphic majuscules: C (centum, 100), M (mille, 1,000), alongside intermediate half-values L (50) and D (500). While replaced by Hindu-Arabic decimal numerals for scientific calculation in the late Middle Ages, Roman numerals retain profound cultural, legal, and architectural resonance across the modern world.
          </p>

          <RomanNumeralAdditiveSubtractiveEvolutionChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Rules: Greedy Decomposition & Subtractive Syntax
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Converting a modern Arabic decimal integer N into standard Roman numerals executes via a greedy algorithm against an ordered descending table of thirteen discrete token values:
          </p>
          <Formula>{"\\mathcal{T} = \\{ (1000, \\text{M}), (900, \\text{CM}), (500, \\text{D}), (400, \\text{CD}), (100, \\text{C}), \\dots, (4, \\text{IV}), (1, \\text{I}) \\}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At each iterative step, the algorithm matches the largest integer v ≤ N, appends its character token to the output string, and decrements N = N - v until N = 0:
          </p>
          <Formula>{"2026 = 1000 (\\text{M}) + 1000 (\\text{M}) + 20 (\\text{XX}) + 6 (\\text{VI}) \\implies \\text{MMXXVI}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To parse a Roman numeral string back to decimal, the parser iterates left-to-right: if a current character value is less than the subsequent character value (e.g., I before X in IX), it subtracts its value (-1); otherwise, it adds its value (+10), resolving IX to -1 + 10 = 9. For positional binary and hexadecimal conversions, explore our <Link href="/calculators/measurements/number-system-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">number system converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Roman Numeral Value Tokens
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact numerical values, Latin etymological origins, and subtractive character pairs across the classical Roman numbering system:
          </p>
          <DataTable
            head={["Roman Numeral", "Decimal Value", "Token Type", "Latin Linguistic Origin", "Max Sequential Repeats"]}
            rows={[
              ["I", "1", "Base Unit", "Unus (Single Tally)", "3 (III)"],
              ["IV", "4", "Subtractive Pair", "Quattuor (5 - 1)", "1"],
              ["V", "5", "Intermediate", "Quinque (Open Hand)", "1"],
              ["IX", "9", "Subtractive Pair", "Novem (10 - 1)", "1"],
              ["X", "10", "Base Unit", "Decem (Crossed Hands)", "3 (XXX)"],
              ["XL", "40", "Subtractive Pair", "Quadraginta (50 - 10)", "1"],
              ["L", "50", "Intermediate", "Quinquaginta", "1"],
              ["XC", "90", "Subtractive Pair", "Nonaginta (100 - 10)", "1"],
              ["C", "100", "Base Unit", "Centum (Hundred)", "3 (CCC)"],
              ["CD", "400", "Subtractive Pair", "Quadringenti (500 - 100)", "1"],
              ["D", "500", "Intermediate", "Quingenti", "1"],
              ["CM", "900", "Subtractive Pair", "Nongenti (1,000 - 100)", "1"],
              ["M", "1,000", "Base Unit", "Mille (Thousand)", "3 (MMM)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Case Study: Deciphering Monumental Epigraphy & Architectural Dates
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an architectural historian inspecting a carved stone cornerstone inscription on a historic public library building in Boston: MDCCCLXXXVII. The historian must translate this Roman numeral string into the modern Gregorian calendar year to cross-reference historical municipal construction permits:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Parse Thousands Token):</strong> M = 1,000.</li>
            <li><strong>Step 2 (Parse Hundreds Tokens):</strong> D = 500; followed by CCC = 100 + 100 + 100 = 300. Combined hundreds = 500 + 300 = 800.</li>
            <li><strong>Step 3 (Parse Tens Tokens):</strong> L = 50; followed by XXX = 10 + 10 + 10 = 30. Combined tens = 50 + 30 = 80.</li>
            <li><strong>Step 4 (Parse Units Tokens):</strong> V = 5; followed by II = 1 + 1 = 2. Combined units = 5 + 2 = 7.</li>
            <li><strong>Step 5 (Sum Positional Sub-Totals):</strong> 1,000 + 800 + 80 + 7 = 1887. The building cornerstone was laid in the year 1887. Elapsed centuries can be cross-verified in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Historical Transition from Roman Numerals to Hindu-Arabic Decimals
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Throughout the Middle Ages, arithmetic calculations in Europe were executed physically using abacus counting boards, while Roman numerals served solely to record the final result in commercial ledgers. Performing long multiplication or division directly in Roman numerals is notoriously unwieldy (e.g., multiplying CXLVII by XXXIV).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1202, Leonardo of Pisa (Fibonacci) published &apos;Liber Abaci&apos; (The Book of Calculation), introducing the Hindu-Arabic positional numeral system (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) to European merchants. Positional decimal arithmetic enabled rapid pencil-and-paper commercial accounting, sparking the commercial banking boom of Renaissance Italy and laying the mathematical foundation for modern scientific computing.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Horology, Monarchy & Cinematic Copyrights
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In contemporary society, Roman numerals fulfill prestigious ornamental and legal roles. In horology, luxury mechanical watch dials feature Roman numerals. In cinema and television production, motion picture copyright notices at the conclusion of closing credits display production years in Roman numerals (e.g., MCMXCV for 1995, MMXXIV for 2024).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In sports, the National Football League (NFL) designates championship Super Bowls using Roman numerals (e.g., Super Bowl LVIII). In medicine and publishing, book prefaces and preface pagination utilize lowercase Roman numerals (i, ii, iii, iv). For academic and general tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and calculate statistical percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <RomanNumeralConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Roman Hand Abacus & The Physical &apos;Calculi&apos; Origins of Calculus
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because Roman numerals were impossible to calculate with directly using pencil-and-paper long division, Roman engineers, tax collectors (publicani), and military quartermasters executed all mathematical calculations using portable bronze pocket abaci. A Roman hand abacus featured parallel vertical slots containing movable bronze pebbles called &apos;calculi&apos; (from the Latin word for limestone pebble, which gave rise to the modern mathematical terms &apos;calculate&apos; and &apos;calculus&apos;).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Remarkably, while written Roman numerals lacked a zero symbol, the physical abacus operated as a positional biquinary decimal calculator! Each vertical slot represented a decimal power of ten (units, tens, hundreds, thousands), with an upper slot containing one pebble worth 5 and a lower slot containing four pebbles worth 1 each. An empty slot physically represented zero! Once the calculation was completed on the bronze abacus, the accountant recorded only the final static tally string in stone or papyrus using standard Roman numerals. You can cross-reference ancient linear measures using our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and calculate Roman trade ballast mass in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Classical Roman Duodecimal Fractions: Unciae & As Subdivisions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While whole integers in Roman mathematics were counted in decimal base-10 groupings, Roman commercial currency and weight fractions operated in a duodecimal (base-12) system based on the &apos;as&apos; (a standard bronze unit of weight). The fundamental fractional unit was the &apos;uncia&apos; (one-twelfth, 1/12), which is the direct etymological ancestor of both the modern English word &apos;ounce&apos; (weight) and &apos;inch&apos; (length).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Roman epigraphers denoted fractions through dot symbols (·): one dot represented 1/12 (uncia); two dots represented 2/12 (sextans, 1/6); three dots represented 3/12 (quadrans, 1/4); four dots represented 4/12 (triens, 1/3); five dots represented 5/12 (quincunx); and the letter S (semis) represented one half (6/12 = 1/2). Combining whole numerals with fraction dots allowed Roman tax assessors to document complex fractional coin and land valuations with rigorous legal precision.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Epigraphic Serifs & Classical Trajan Inscriptional Geometry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In typography, epigraphy, and graphic arts, classical Roman numerals represent the pinnacle of proportional letterform aesthetics. The monumental inscriptional capitals carved at the base of Trajan&apos;s Column in Rome (dedicated in 113 CE) established the geometric proportions for Western uppercase typography.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Stone masons painted letters on marble blocks with flat broad-edge brushes before chiseling incisions with hammers and stone gouges. The characteristic flared terminal &apos;serifs&apos; at the tips of Roman numerals (such as the crossbars atop I, V, and X) originated as practical stonecutting techniques: a horizontal chisel stroke carved into the stone prevented vertical fractures from splitting along marble crystalline fault planes when chiseling deep V-grooves.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            These ancient stonecutter proportions were revived by Italian Renaissance masters like Luca Pacioli and Leonardo da Vinci, establishing the golden proportions that continue to define Roman numerals on government monuments and historic buildings today.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern legal codification and statutory drafting, legislative acts and constitutional articles are partitioned into major titles, chapters, and sections using Roman numerals to denote hierarchical priority. This epigraphic structure ensures unambiguous legal cross-referencing across centuries of judicial precedents.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, in pharmaceutical pharmacopeias and traditional medical prescriptions, apothecaries historically used Roman numerals alongside grain and dram measures to prevent decimal transcription errors that could lead to dangerous drug overdoses.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In classical numismatics and coin collecting, ancient Roman imperial coins (denarii, sesterces, and aurei) feature inscriptions with abbreviated imperial titles and consular dates in Roman numerals, allowing museum historians to date archaeological artifacts to exact calendar years.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding the distinction between additive classical epigraphy and standardized medieval subtractive notation ensures historians, educators, and archivists transcribe historical manuscripts with complete archaeological accuracy.
          </p>

    </CalcPage>
  );
}
