import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/big-number-calculator";
const TITLE = "Big Number Calculator – Arbitrary Precision Math | CalcDigi";
const DESCRIPTION = "Add, subtract, multiply, or divide whole numbers of any size — no rounding errors.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Big Number Calculator"
      intro="Add, subtract, multiply, or divide whole numbers of virtually any size, with exact precision and no rounding errors."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/factorial-calculator",
                "icon": "❗",
                "name": "Factorial Calculator"
        },
        {
                "href": "/calculators/math/scientific-notation-calculator",
                "icon": "🔟",
                "name": "Scientific Notation"
        },
        {
                "href": "/calculators/math/binary-calculator",
                "icon": "0️⃣",
                "name": "Binary Calculator"
        },
        {
                "href": "/calculators/math/factor-calculator",
                "icon": "🧮",
                "name": "Factor Calculator"
        }
]}
      faq={[
        {
                "q": "How many digits can this handle?",
                "a": "Effectively unlimited — arbitrary-precision arithmetic scales with available memory, so numbers with hundreds of digits work exactly."
        },
        {
                "q": "Does this work with decimals?",
                "a": "This calculator works with whole numbers (integers). For decimal values, use the Scientific Calculator instead."
        },
        {
                "q": "What does the remainder mean in division?",
                "a": "Since big-number division here is exact integer division, the remainder shows what's left over after dividing as many whole times as possible."
        },
        {
                "q": "Why do normal calculators round large numbers?",
                "a": "JavaScript and most calculators use 64-bit floating point numbers, which can only represent integers exactly up to about 9 quadrillion before precision is lost."
        },
        {
                "q": "Can I calculate factorials with this?",
                "a": "This calculator handles two-number operations (+, −, ×, ÷). For factorials specifically, use the dedicated Factorial Calculator, which also supports arbitrarily large results."
        },
        {
                "q": "Why is division sometimes not exact?",
                "a": "When dividing two whole numbers that don't divide evenly, this calculator shows the integer quotient plus the remainder, since big integers can't represent a repeating or infinite decimal exactly."
        }
]}
      html={"<div class=\"content-section\"><h2>Why a Dedicated Big Number Calculator?</h2><p>Standard calculators lose precision above about 15–17 digits because of how computers store decimal numbers. This tool uses arbitrary-precision integer arithmetic, so results stay exact no matter how many digits are involved.</p></div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>25! (25 factorial) equals 15,511,210,043,330,985,984,000,000 — a 26-digit number that a standard calculator would round and lose precision on. Enter this as two separate big numbers and the appropriate operation, and the result stays exact down to the last digit.</p></div>\n<div class=\"content-section\"><h2>Why Standard Calculators Round Large Numbers</h2><p>JavaScript (and most calculators) use 64-bit floating-point numbers, which can only represent whole numbers exactly up to 2⁵³ (about 9 quadrillion). Beyond that, precision is silently lost. This calculator uses BigInt arithmetic instead, which has no upper limit on integer size — only your device's memory limits it.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Big Number Calculator</h2><div class=\"form-group\"><label for=\"bn-a\">Number A</label><input id=\"bn-a\" placeholder=\"e.g. 123456789123456789\" type=\"text\" value=\"123456789123456789\"/></div><div class=\"form-group\"><label for=\"bn-op\">Operation</label><select id=\"bn-op\"><option value=\"add\">A + B</option><option value=\"sub\">A − B</option><option value=\"mul\">A × B</option><option value=\"div\">A ÷ B</option></select></div><div class=\"form-group\"><label for=\"bn-b\">Number B</label><input id=\"bn-b\" placeholder=\"e.g. 987654321\" type=\"text\" value=\"987654321\"/></div><button class=\"calc-btn\" onclick=\"calcBigNumber()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('bn-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"bn-result\" style=\"display:none;\"><div id=\"bn-ri\"></div><div class=\"ai-box\" id=\"bn-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-bn-result\" onclick=\"printResult('bn-result','Big Number Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Big Number Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-big-number-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcBigNumber(){\\n  const aStr=document.getElementById('bn-a').value.trim();\\n  const bStr=document.getElementById('bn-b').value.trim();\\n  const op=document.getElementById('bn-op').value;\\n  if(!/^-?\\\\d+$/.test(aStr)||!/^-?\\\\d+$/.test(bStr)){alert('Enter valid whole numbers (integers only, no decimals).');return;}\\n  let a,b;\\n  try{a=BigInt(aStr);b=BigInt(bStr);}catch(e){alert('Invalid number.');return;}\\n  let result, remainder=null;\\n  if(op==='add')result=a+b;\\n  else if(op==='sub')result=a-b;\\n  else if(op==='mul')result=a*b;\\n  else{\\n    if(b===0n){alert('Cannot divide by zero.');return;}\\n    result=a/b; remainder=a%b;\\n  }\\n  document.getElementById('bn-ri').innerHTML=\\n    ri('Result','<strong style=\\\"font-size:17px;color:var(--c-accent);word-break:break-all;\\\">'+result.toString()+'</strong>',true)+\\n    (remainder!==null?ri('Remainder',remainder.toString()):'')+\\n    ri('Digits in Result',result.toString().replace('-','').length);\\n  document.getElementById('bn-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
