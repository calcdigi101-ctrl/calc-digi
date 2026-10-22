import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/binary-calculator";
const TITLE = "Binary Calculator – Add, Subtract & Convert | CalcDigi";
const DESCRIPTION = "Add, subtract, multiply, divide, AND, OR, or XOR two binary numbers, with instant decimal conversion.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Binary Calculator"
      intro="Perform arithmetic and bitwise operations on binary numbers, with automatic decimal conversion for both inputs and the result."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/hex-calculator",
                "icon": "#️⃣",
                "name": "Hex Calculator"
        },
        {
                "href": "/calculators/measurements/number-system-converter",
                "icon": "🔢",
                "name": "Number System Converter"
        },
        {
                "href": "/calculators/math/big-number-calculator",
                "icon": "💯",
                "name": "Big Number Calculator"
        },
        {
                "href": "/calculators/math/scientific-calculator",
                "icon": "🔬",
                "name": "Scientific Calculator"
        }
]}
      faq={[
        {
                "q": "What operations are supported?",
                "a": "Addition, subtraction, multiplication, integer division, and the bitwise operations AND, OR, and XOR."
        },
        {
                "q": "Can I enter negative binary numbers?",
                "a": "This calculator works with unsigned binary input. For negative results (e.g. from subtraction), the result is shown as a negative decimal/binary pair."
        },
        {
                "q": "Why does division give a whole number?",
                "a": "Binary division here returns the integer quotient (remainder dropped), matching how integer division works in most binary/digital logic contexts."
        },
        {
                "q": "How do I convert binary to decimal by hand?",
                "a": "Multiply each digit by its place value (powers of 2 from right to left, starting at 2⁰) and sum the results."
        },
        {
                "q": "What does AND, OR, and XOR mean?",
                "a": "These are bitwise operations comparing each binary digit: AND returns 1 only if both bits are 1, OR returns 1 if either bit is 1, and XOR returns 1 only if the bits differ."
        },
        {
                "q": "How many bits does this calculator support?",
                "a": "It handles binary numbers up to the limits of a standard JavaScript integer (safely up to 32-bit values for bitwise operations) — plenty for learning and everyday conversions."
        }
]}
      html={"<div class=\"content-section\"><h2>How Binary Works</h2><p>Binary (base-2) uses only the digits 0 and 1. Each position represents a power of 2, so binary <code>1011</code> equals 1×8 + 0×4 + 1×2 + 1×1 = 11 in decimal.</p></div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>Adding binary 1010 (decimal 10) and 0110 (decimal 6): 10 + 6 = 16 in decimal, which is 10000 in binary. This calculator does exactly that conversion-then-operation-then-reconversion automatically.</p></div>\n<div class=\"content-section\"><h2>Where Binary Is Used</h2><ul><li><strong>Computer memory and CPUs:</strong> All data is ultimately stored and processed as binary (on/off) signals</li><li><strong>Networking:</strong> IP addresses and subnet masks are calculated in binary</li><li><strong>Digital logic:</strong> AND, OR, and XOR are the building blocks of digital circuits</li><li><strong>Computer science courses:</strong> Binary arithmetic is foundational to understanding how computers compute</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Binary Calculator</h2><div class=\"form-group\"><label for=\"bin-a\">Binary A</label><input id=\"bin-a\" placeholder=\"e.g. 1010\" type=\"text\" value=\"1010\"/></div><div class=\"form-group\"><label for=\"bin-op\">Operation</label><select id=\"bin-op\"><option value=\"add\">A + B</option><option value=\"sub\">A − B</option><option value=\"mul\">A × B</option><option value=\"div\">A ÷ B</option><option value=\"and\">A AND B</option><option value=\"or\">A OR B</option><option value=\"xor\">A XOR B</option></select></div><div class=\"form-group\"><label for=\"bin-b\">Binary B</label><input id=\"bin-b\" placeholder=\"e.g. 0110\" type=\"text\" value=\"0110\"/></div><button class=\"calc-btn\" onclick=\"calcBinary()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('bin-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"bin-result\" style=\"display:none;\"><div id=\"bin-ri\"></div><div class=\"ai-box\" id=\"bin-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-bin-result\" onclick=\"printResult('bin-result','Binary Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Binary Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-binary-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcBinary(){\\n  const aStr=document.getElementById('bin-a').value.trim();\\n  const bStr=document.getElementById('bin-b').value.trim();\\n  const op=document.getElementById('bin-op').value;\\n  if(!/^[01]+$/.test(aStr)||!/^[01]+$/.test(bStr)){alert('Enter valid binary numbers (0s and 1s only).');return;}\\n  const a=parseInt(aStr,2), b=parseInt(bStr,2);\\n  let dec;\\n  if(op==='add')dec=a+b;\\n  else if(op==='sub')dec=a-b;\\n  else if(op==='mul')dec=a*b;\\n  else if(op==='div'){if(b===0){alert('Cannot divide by zero.');return;}dec=Math.trunc(a/b);}\\n  else if(op==='and')dec=a&b;\\n  else if(op==='or')dec=a|b;\\n  else dec=a^b;\\n  const binResult=dec<0?('-'+Math.abs(dec).toString(2)):dec.toString(2);\\n  document.getElementById('bin-ri').innerHTML=\\n    ri('Result (Binary)','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+binResult+'</strong>',true)+\\n    ri('Result (Decimal)',dec)+\\n    ri('A (Decimal)',a)+\\n    ri('B (Decimal)',b);\\n  document.getElementById('bin-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
