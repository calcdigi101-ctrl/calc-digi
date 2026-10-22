import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/hex-calculator";
const TITLE = "Hex Calculator – Hexadecimal Arithmetic | CalcDigi";
const DESCRIPTION = "Add, subtract, multiply, divide, AND, OR, or XOR two hex numbers, with instant decimal conversion.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Hex Calculator"
      intro="Perform arithmetic and bitwise operations on hexadecimal numbers, with automatic decimal conversion for both inputs and the result."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/binary-calculator",
                "icon": "0️⃣",
                "name": "Binary Calculator"
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
                "href": "/calculators/internet/ip-subnet-calculator",
                "icon": "🔗",
                "name": "IP Subnet Calculator"
        }
]}
      faq={[
        {
                "q": "What operations are supported?",
                "a": "Addition, subtraction, multiplication, integer division, and the bitwise operations AND, OR, and XOR."
        },
        {
                "q": "Is hex case-sensitive?",
                "a": "No — you can enter hex digits in upper or lower case (a-f or A-F), and results are shown in upper case by convention."
        },
        {
                "q": "Why are hex colors 6 digits?",
                "a": "Web colors use 2 hex digits (00–FF) for each of red, green, and blue, giving 6 digits total — e.g. #1A5C3A."
        },
        {
                "q": "How do I convert hex to binary?",
                "a": "Each hex digit converts directly to exactly 4 binary digits — for example hex A = binary 1010."
        },
        {
                "q": "Why use hex instead of binary or decimal?",
                "a": "Hex is more compact than binary (one hex digit = 4 binary digits) while still aligning perfectly with how computers store data in bytes — a good middle ground for humans reading machine data."
        },
        {
                "q": "What's the highest single hex digit?",
                "a": "F, which equals 15 in decimal. After F, the next value rolls over to 10 in hex (16 in decimal)."
        }
]}
      html={"<div class=\"content-section\"><h2>How Hexadecimal Works</h2><p>Hexadecimal (base-16) uses digits 0–9 and letters A–F, where A=10 through F=15. It's widely used in programming, color codes, and memory addresses because each hex digit maps cleanly to 4 binary bits.</p></div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>Adding hex 1A (decimal 26) and hex 2F (decimal 47): 26 + 47 = 73 in decimal, which converts back to hex as 49. This calculator performs the full round-trip automatically.</p></div>\n<div class=\"content-section\"><h2>Where Hexadecimal Is Used</h2><ul><li><strong>Web colors:</strong> Colors like #1A5C3A are defined in hexadecimal</li><li><strong>Memory addresses:</strong> Programmers use hex to represent memory locations compactly</li><li><strong>MAC addresses:</strong> Network hardware addresses are written in hex</li><li><strong>Debugging:</strong> Error codes and byte values are commonly shown in hex because it maps cleanly to binary</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Hex Calculator</h2><div class=\"form-group\"><label for=\"hex-a\">Hex A</label><input id=\"hex-a\" placeholder=\"e.g. 1A\" type=\"text\" value=\"1A\"/></div><div class=\"form-group\"><label for=\"hex-op\">Operation</label><select id=\"hex-op\"><option value=\"add\">A + B</option><option value=\"sub\">A − B</option><option value=\"mul\">A × B</option><option value=\"div\">A ÷ B</option><option value=\"and\">A AND B</option><option value=\"or\">A OR B</option><option value=\"xor\">A XOR B</option></select></div><div class=\"form-group\"><label for=\"hex-b\">Hex B</label><input id=\"hex-b\" placeholder=\"e.g. 2F\" type=\"text\" value=\"2F\"/></div><button class=\"calc-btn\" onclick=\"calcHex()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('hex-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"hex-result\" style=\"display:none;\"><div id=\"hex-ri\"></div><div class=\"ai-box\" id=\"hex-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-hex-result\" onclick=\"printResult('hex-result','Hex Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Hex Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-hex-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcHex(){\\n  const aStr=document.getElementById('hex-a').value.trim();\\n  const bStr=document.getElementById('hex-b').value.trim();\\n  const op=document.getElementById('hex-op').value;\\n  if(!/^[0-9a-fA-F]+$/.test(aStr)||!/^[0-9a-fA-F]+$/.test(bStr)){alert('Enter valid hexadecimal numbers (0-9, A-F).');return;}\\n  const a=parseInt(aStr,16), b=parseInt(bStr,16);\\n  let dec;\\n  if(op==='add')dec=a+b;\\n  else if(op==='sub')dec=a-b;\\n  else if(op==='mul')dec=a*b;\\n  else if(op==='div'){if(b===0){alert('Cannot divide by zero.');return;}dec=Math.trunc(a/b);}\\n  else if(op==='and')dec=a&b;\\n  else if(op==='or')dec=a|b;\\n  else dec=a^b;\\n  const hexResult=(dec<0?'-':'')+Math.abs(dec).toString(16).toUpperCase();\\n  document.getElementById('hex-ri').innerHTML=\\n    ri('Result (Hex)','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+hexResult+'</strong>',true)+\\n    ri('Result (Decimal)',dec)+\\n    ri('A (Decimal)',a)+\\n    ri('B (Decimal)',b);\\n  document.getElementById('hex-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
