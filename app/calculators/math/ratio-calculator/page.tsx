import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/ratio-calculator";
const TITLE = "Ratio Calculator | CalcDigi";
const DESCRIPTION = "Simplify ratios, solve proportions, and scale ratios up or down. Fast and accurate.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Ratio Calculator | CalcDigi"
      intro="Simplify ratios, find missing values in proportions, and scale ratios for recipes, maps, models, and more."
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
        }
]}
      faq={[
        {
                "q": "How do I split an amount in a given ratio?",
                "a": "Add the parts of the ratio, divide the amount by that total, then multiply by each part. Splitting $500 in a 2 : 3 ratio gives 500 ÷ 5 = 100 per part, so $200 and $300."
        },
        {
                "q": "Is a ratio the same as a fraction?",
                "a": "A ratio compares parts to each other, while a fraction compares a part to the whole. A 2 : 3 ratio of boys to girls means boys are 2/5 of the group."
        }
]}
      html={"<div class=\"content-section\"><h2>Solving ratios</h2>\n<div class=\"formula-box\">A : B = C : D  ⇒  D = B × C ÷ A<br/>Simplify A : B by dividing both by GCD(A, B)</div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Ratio Calculator</h2>\n<div class=\"form-group\"><label>Simplify Ratio (A : B)</label><div class=\"form-row\"><input id=\"rat-a\" aria-label=\"Simplify Ratio (A : B)\" step=\"any\" type=\"number\" value=\"12\"/><input id=\"rat-b\" aria-label=\"Simplify Ratio (A : B)\" step=\"any\" type=\"number\" value=\"8\"/></div></div>\n<div class=\"form-group\"><label for=\"rat-scale\">Scale Factor</label><input id=\"rat-scale\" min=\"0.1\" step=\"0.1\" type=\"number\" value=\"1\"/></div>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Ratio Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Ratio Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-ratio-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;}\\nfunction doCalc(){\\n  const a=parseFloat(document.getElementById('rat-a').value)||12;\\n  const b=parseFloat(document.getElementById('rat-b').value)||8;\\n  const scale=parseFloat(document.getElementById('rat-scale').value)||1;\\n  const g=gcd(Math.round(a),Math.round(b));\\n  const sa=a/g;const sb=b/g;const pct=a+b>0?a/(a+b)*100:0;\\n  document.getElementById('hc-ri').innerHTML=ri('Original Ratio',a+' : '+b)+ri('Simplified',sa+' : '+sb,true)+ri('Fraction',sa+'/'+sb+' = '+fmtNum(sa/sb,4))+ri('Percentage',''+fmtNum(pct,1)+'% / '+fmtNum(100-pct,1)+'%')+ri('Scaled (x'+scale+')',fmtNum(a*scale)+' : '+fmtNum(b*scale));\\n  showResult('hc-result')\\n  var _ai_ai_hc_result=document.getElementById('ai-hc-result');\\n    _ai_ai_hc_result.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n\\n  // AI Insight\\n  if(typeof getAIInsight==='function'){\\n    var _aiBox=document.querySelector('.ai-box');\\n    if(!_aiBox){_aiBox=document.createElement('div');_aiBox.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_aiBox);}\\n    _aiBox.style.display='block';\\n    _aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    getAIInsight('Calculation completed. In 2 sentences give a practical tip related to this result.').then(function(_t){\\n      if(_t)_aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';\\n      else _aiBox.style.display='none';\\n    });\\n  }\\n\\n  // Draw chart\\n  if(typeof drawDonut==='function'){\\n    var _cv=document.getElementById('result-chart-cv');\\n    if(!_cv){\\n      var _rc=document.querySelector('.result-chart');\\n      if(!_rc){_rc=document.createElement('div');_rc.className='result-chart';var _rb2=document.querySelector('.result-box');if(_rb2)_rb2.insertBefore(_rc,_rb2.firstChild);}\\n      _cv=document.createElement('canvas');_cv.id='result-chart-cv';_cv.width=220;_cv.height=160;_rc.appendChild(_cv);\\n    }\\n    drawDonut('result-chart-cv',['Value','Reference'],[75,25],['#1a5c3a','#c8832a']);\\n  }\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
