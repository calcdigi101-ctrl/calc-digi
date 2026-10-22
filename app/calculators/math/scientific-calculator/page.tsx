import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/scientific-calculator";
const TITLE = "Scientific Calculator | CalcDigi";
const DESCRIPTION = "Free online scientific calculator with trig functions, logarithms, exponents, roots and memory. Works on any device.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Scientific Calculator | CalcDigi"
      intro="A full-featured scientific calculator with trigonometric functions, logarithms, exponents, square roots, and more. No app download needed."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage"
        },
        {
                "href": "/calculators/math/fraction-calculator",
                "icon": "½",
                "name": "Fraction"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio"
        }
]}
      faq={[
        {
                "q": "What does log mean compared with ln?",
                "a": "log is the base-10 logarithm, so log(1000) = 3. ln is the natural logarithm with base e ≈ 2.71828, so ln(e) = 1."
        },
        {
                "q": "Why do I get an error for tan(90)?",
                "a": "tan(90°) is undefined because cos(90°) = 0 and tan = sin ÷ cos. The calculator reports it as undefined instead of returning a huge rounded number."
        }
]}
      html={"<div class=\"content-section\"><h2>Order of operations</h2>\n<p>Expressions are evaluated in standard order: parentheses first, then exponents and roots, then multiplication and division (left to right), then addition and subtraction (left to right).</p>\n<div class=\"formula-box\">2 + 3 × 4 = 14  (not 20)<br/>(2 + 3) × 4 = 20<br/>2^10 = 1024</div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Scientific Calculator</h2>\n<div style=\"background:#1a1a18;border-radius:var(--radius-md);padding:12px;margin-bottom:12px;\">\n<input id=\"sci-display\" aria-label=\"Calculator display\" readonly=\"\" style=\"width:100%;background:transparent;border:none;color:#fff;font-size:22px;text-align:right;font-family:monospace;padding:8px 4px;\" type=\"text\" value=\"0\"/>\n</div>\n<div id=\"sci-expr\" style=\"font-size:12px;color:var(--c-ink3);text-align:right;margin-bottom:8px;min-height:18px;\"></div>\n<div style=\"display:grid;grid-template-columns:repeat(5,1fr);gap:6px;\">\n<button class=\"sci-btn func\" onclick=\"sciFunc('sin')\">sin</button><button class=\"sci-btn func\" onclick=\"sciFunc('cos')\">cos</button><button class=\"sci-btn func\" onclick=\"sciFunc('tan')\">tan</button><button class=\"sci-btn func\" onclick=\"sciFunc('log')\">log</button><button class=\"sci-btn func\" onclick=\"sciFunc('ln')\">ln</button>\n<button class=\"sci-btn func\" onclick=\"sciFunc('sqrt')\">√</button><button class=\"sci-btn func\" onclick=\"sciPow()\">xⁿ</button><button class=\"sci-btn func\" onclick=\"sciFunc('abs')\">|x|</button><button class=\"sci-btn func\" onclick=\"sciInsert('Math.PI')\">π</button><button class=\"sci-btn func\" onclick=\"sciInsert('Math.E')\">e</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('7')\">7</button><button class=\"sci-btn\" onclick=\"sciInsert('8')\">8</button><button class=\"sci-btn\" onclick=\"sciInsert('9')\">9</button><button class=\"sci-btn op\" onclick=\"sciInsert('/')\">/</button><button class=\"sci-btn ac\" onclick=\"sciClear()\">AC</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('4')\">4</button><button class=\"sci-btn\" onclick=\"sciInsert('5')\">5</button><button class=\"sci-btn\" onclick=\"sciInsert('6')\">6</button><button class=\"sci-btn op\" onclick=\"sciInsert('*')\">×</button><button class=\"sci-btn del\" onclick=\"sciDel()\">⌫</button>\n<button class=\"sci-btn\" onclick=\"sciInsert('1')\">1</button><button class=\"sci-btn\" onclick=\"sciInsert('2')\">2</button><button class=\"sci-btn\" onclick=\"sciInsert('3')\">3</button><button class=\"sci-btn op\" onclick=\"sciInsert('-')\">−</button><button class=\"sci-btn op\" onclick=\"sciInsert('(')\">(</button>\n<button class=\"sci-btn span2\" onclick=\"sciInsert('0')\" style=\"grid-column:span 2;\">0</button><button class=\"sci-btn\" onclick=\"sciInsert('.')\">.</button><button class=\"sci-btn op\" onclick=\"sciInsert('+')\">+</button><button class=\"sci-btn op\" onclick=\"sciInsert(')')\">)</button>\n<button class=\"sci-btn eq\" onclick=\"sciCalc()\" style=\"grid-column:span 5;background:var(--c-accent);color:#fff;font-size:18px;\">=</button>\n</div>\n<style>.sci-btn{padding:10px;border-radius:8px;border:1.5px solid var(--c-rule);background:#fff;cursor:pointer;font-size:14px;font-family:var(--font-sans);transition:all 0.15s;}.sci-btn:hover{background:var(--c-rule2);}.sci-btn.func{background:var(--c-accent-lt);color:var(--c-accent);}.sci-btn.op{background:var(--c-accent2-lt);color:var(--c-accent2);}.sci-btn.ac{background:var(--c-red-lt);color:#8a1a1a;}.sci-btn.del{background:var(--c-rule2);}</style>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Scientific Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Scientific Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-scientific-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "let sciExpr='';\\nfunction sciInsert(v){sciExpr+=v;updateDisp();}\\nfunction sciFunc(f){sciExpr=f+'('+sciExpr+')';updateDisp();}\\nfunction sciPow(){sciExpr=sciExpr+'**';}\\nfunction sciClear(){sciExpr='';updateDisp(true);}\\nfunction sciDel(){sciExpr=sciExpr.slice(0,-1);updateDisp();}\\nfunction updateDisp(reset){document.getElementById('sci-display').value=reset?'0':(sciExpr||'0');document.getElementById('sci-expr').textContent=sciExpr;}\\nfunction sciCalc(){\\n  try{\\n    let expr=sciExpr.replace(/Math\\\\.PI/g,Math.PI).replace(/Math\\\\.E/g,Math.E);\\n    const r=Function('\\\"use strict\\\";return ('+expr+')')();\\n    document.getElementById('sci-display').value=isFinite(r)?fmtNum(r,10).replace(/\\\\.?0+$/,''):'Error';\\n    document.getElementById('sci-expr').textContent=sciExpr+' =';\\n    sciExpr=String(isFinite(r)?r:0);\\n    if(isFinite(r)){\\n      var a=document.getElementById('ai-hc-result');\\n    a.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n    }\\n  }catch(e){document.getElementById('sci-display').value='Error';sciExpr='';}\\n}\\nfunction doCalc(){sciCalc();\\n  if(typeof drawDonut==='function'){var cv=document.querySelector('.result-chart canvas');if(cv){drawDonut(cv.id,['Result','Reference'],[75,25],['#1a5c3a','#c8832a']);}}\\n\\n  // AI Insight\\n  if(typeof getAIInsight==='function'){\\n    var _aiBox=document.querySelector('.ai-box');\\n    if(!_aiBox){_aiBox=document.createElement('div');_aiBox.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_aiBox);}\\n    _aiBox.style.display='block';\\n    _aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    getAIInsight('Calculation completed. In 2 sentences give a practical tip related to this result.').then(function(_t){\\n      if(_t)_aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';\\n      else _aiBox.style.display='none';\\n    });\\n  }\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
