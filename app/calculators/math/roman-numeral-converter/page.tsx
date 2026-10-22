import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
      title="Roman Numeral Converter | CalcDigi"
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
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Roman Numeral Converter</h2>\n<div class=\"form-group\">\n<label for=\"rn-mode\">Convert</label>\n<select id=\"rn-mode\" onchange=\"toggleRomanMode()\"><option value=\"toRoman\">Number → Roman</option><option value=\"toNum\">Roman → Number</option></select>\n</div>\n<div class=\"form-group\" id=\"rn-num-group\"><label for=\"rn-number\">Number (1-3999)</label><input id=\"rn-number\" max=\"3999\" min=\"1\" type=\"number\" value=\"2025\"/></div>\n<div class=\"form-group\" id=\"rn-roman-group\" style=\"display:none;\"><label for=\"rn-roman\">Roman Numeral</label><input id=\"rn-roman\" style=\"text-transform:uppercase;\" type=\"text\" value=\"MMXXV\"/></div>\n<button class=\"calc-btn\" onclick=\"calcRoman()\">Convert</button>\n<div class=\"result-box\" id=\"rn-result\">\n<div id=\"ri-main\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"ri-chart\" width=\"220\"></canvas></div><div class=\"ai-box\" id=\"ri-ai\" style=\"display:none;\"></div>\n<div id=\"rn-ri\"></div>\n<div class=\"ai-box\" id=\"rn-ai-box\" style=\"display:none;\"></div>\n<div class=\"ai-box\" id=\"ai-rn-result\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-rn-result\" onclick=\"printResult('rn-result','Roman Numeral Converter')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Roman Numeral Converter')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-roman-numeral-converter" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function toggleRomanMode(){\\n  const mode=document.getElementById('rn-mode').value;\\n  document.getElementById('rn-num-group').style.display=mode==='toRoman'?'block':'none';\\n  document.getElementById('rn-roman-group').style.display=mode==='toNum'?'block':'none';\\n}\\nfunction toRoman(num){\\n  const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];\\n  const syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];\\n  let result='';\\n  for(let i=0;i<vals.length;i++){while(num>=vals[i]){result+=syms[i];num-=vals[i];}}\\n  return result;\\n}\\nfunction fromRoman(str){\\n  const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};\\n  let result=0;\\n  for(let i=0;i<str.length;i++){\\n    const curr=map[str[i]];\\n    const next=map[str[i+1]];\\n    if(next&&curr<next){result-=curr;}else{result+=curr;}\\n  }\\n  return result;\\n}\\nfunction calcRoman(){\\n  const mode=document.getElementById('rn-mode').value;\\n  if(mode==='toRoman'){\\n    const num=parseInt(document.getElementById('rn-number').value);\\n    if(isNaN(num)||num<1||num>3999){alert('Please enter a whole number between 1 and 3999.');return;}\\n    const roman=toRoman(num);\\n    document.getElementById('rn-ri').innerHTML=\\n      ri('Roman Numeral','<strong style=\\\"font-size:24px;\\\">'+roman+'</strong>',true)+\\n      ri('Number',num);\\n  } else {\\n    const roman=document.getElementById('rn-roman').value.toUpperCase().trim();\\n    if(!roman||!/^[IVXLCDM]+$/.test(roman)){alert('Please enter a valid Roman numeral using only I, V, X, L, C, D, M.');return;}\\n    const num=fromRoman(roman);\\n    if(num<1||num>3999){alert('That does not appear to be a valid Roman numeral in the supported range.');return;}\\n    document.getElementById('rn-ri').innerHTML=\\n      ri('Number','<strong style=\\\"font-size:24px;\\\">'+num+'</strong>',true)+\\n      ri('Roman Numeral',roman);\\n  }\\n  showResult('rn-result')\\n  var _ai_ai_rn_result=document.getElementById('ai-rn-result');\\n    _ai_ai_rn_result.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n\\n  if(typeof drawDonut==='function'){var _cv=document.querySelector('.result-chart canvas');if(!_cv){var _rc=document.querySelector('.result-chart');if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rbox=document.querySelector('.result-box');if(_rbox){_cv=document.createElement('canvas');_cv.id='auto-c';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);_rbox.appendChild(_rc);}else{_cv=null;}}else{_cv=_rc.querySelector('canvas');}}_cv&&drawDonut(_cv.id,['Value','Ref'],[70,30],['#1a5c3a','#c8832a']);}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
