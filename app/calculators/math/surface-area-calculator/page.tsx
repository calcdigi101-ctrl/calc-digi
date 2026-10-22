import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/surface-area-calculator";
const TITLE = "Surface Area Calculator – Cube, Box, Sphere | CalcDigi";
const DESCRIPTION = "Free surface area calculator for cubes, rectangular boxes, spheres, cylinders, and cones. Pick a shape and enter its dimensions.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Surface Area Calculator"
      intro="Calculate total surface area for a cube, rectangular box, sphere, cylinder, or cone — just pick a shape and enter its dimensions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Cube: 6s²  |  Box: 2(lw+lh+wh)  |  Sphere: 4πr²  |  Cylinder: 2πr²+2πrh  |  Cone: πr²+πrl"
      related={[
        {
                "href": "/calculators/math/volume-calculator",
                "icon": "🧊",
                "name": "Volume Calculator"
        },
        {
                "href": "/calculators/math/circle-calculator",
                "icon": "⭕",
                "name": "Circle Calculator"
        },
        {
                "href": "/calculators/math/area-calculator",
                "icon": "📐",
                "name": "Area Calculator"
        },
        {
                "href": "/calculators/housing/paint-calculator",
                "icon": "🎨",
                "name": "Paint Calculator"
        }
]}
      faq={[
        {
                "q": "What's the difference between surface area and volume?",
                "a": "Surface area measures the outer \"skin\" of a shape (in square units), while volume measures the space it fills (in cubic units)."
        },
        {
                "q": "What is \"slant height\" for a cone?",
                "a": "It's the straight-line distance from the edge of the base to the apex, calculated automatically here as √(r² + h²) from the radius and vertical height."
        },
        {
                "q": "Why does the shape change which fields I need?",
                "a": "Each shape needs different dimensions — a cube only needs one side length, while a box needs length, width, and height. The form updates automatically when you change shapes."
        },
        {
                "q": "What are common real-world uses for this calculator?",
                "a": "Estimating paint or wrapping paper needed, calculating material costs for manufacturing, and heat-transfer or insulation calculations in engineering."
        },
        {
                "q": "What shapes are supported?",
                "a": "Cube, rectangular box, sphere, cylinder, and cone — the five most common solids covered in geometry courses and everyday material estimates."
        }
]}
      html={"<div class=\"content-section\"><h2>Formulas by Shape</h2><div class=\"formula-box\">Cube: 6s²  |  Box: 2(lw+lh+wh)  |  Sphere: 4πr²  |  Cylinder: 2πr²+2πrh  |  Cone: πr²+πrl</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>A cylinder with radius 4 and height 10 has surface area = 2π(4)² + 2π(4)(10) = 100.53 + 251.33 ≈ 351.86 square units — the two circular ends plus the curved side wall \"unrolled\" into a rectangle.</p></div>\n<div class=\"content-section\"><h2>Practical Uses</h2><ul><li><strong>Painting and coating:</strong> Estimating how much paint or material covers a surface</li><li><strong>Packaging design:</strong> Calculating cardboard or material needed for a box or can</li><li><strong>Heat transfer:</strong> Surface area determines how quickly an object loses or gains heat</li><li><strong>3D printing:</strong> Estimating material usage based on a model's outer surface</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Surface Area Calculator</h2><div class=\"form-group\"><label for=\"sa-shape\">Shape</label><select id=\"sa-shape\" onchange=\"updateSAFields()\"><option value=\"cube\">Cube</option><option value=\"box\">Rectangular Box</option><option value=\"sphere\">Sphere</option><option value=\"cylinder\">Cylinder</option><option value=\"cone\">Cone</option></select></div><div class=\"form-group\" id=\"sa-row1\"><label for=\"sa-dim1\" id=\"sa-label1\">Side Length</label><input id=\"sa-dim1\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"5\"/></div><div class=\"form-group\" id=\"sa-row2\" style=\"display:none;\"><label for=\"sa-dim2\" id=\"sa-label2\">Width</label><input id=\"sa-dim2\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"3\"/></div><div class=\"form-group\" id=\"sa-row3\" style=\"display:none;\"><label for=\"sa-dim3\" id=\"sa-label3\">Height</label><input id=\"sa-dim3\" min=\"0.0001\" step=\"any\" type=\"number\" value=\"4\"/></div><button class=\"calc-btn\" onclick=\"calcSurfaceArea()\">Calculate Surface Area</button><button class=\"calc-btn\" onclick=\"document.getElementById('sa-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"sa-result\" style=\"display:none;\"><div id=\"sa-ri\"></div><div class=\"ai-box\" id=\"sa-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sa-result\" onclick=\"printResult('sa-result','Surface Area Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Surface Area Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-surface-area-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function updateSAFields(){\\n  const shape=document.getElementById('sa-shape').value;\\n  const labels={cube:['Side Length'],box:['Length','Width','Height'],sphere:['Radius'],cylinder:['Radius','Height'],cone:['Radius','Height']};\\n  const need=labels[shape];\\n  for(let i=1;i<=3;i++){\\n    const row=document.getElementById('sa-row'+i);\\n    const lbl=document.getElementById('sa-label'+i);\\n    if(need[i-1]){row.style.display='block';lbl.textContent=need[i-1];}\\n    else{row.style.display='none';}\\n  }\\n}\\nfunction calcSurfaceArea(){\\n  const shape=document.getElementById('sa-shape').value;\\n  const d1=parseFloat(document.getElementById('sa-dim1').value);\\n  const d2=parseFloat(document.getElementById('sa-dim2').value);\\n  const d3=parseFloat(document.getElementById('sa-dim3').value);\\n  let sa,label;\\n  if(shape==='cube'){\\n    if(isNaN(d1)||d1<=0){alert('Enter a valid side length.');return;}\\n    sa=6*d1*d1; label='Cube';\\n  } else if(shape==='box'){\\n    if([d1,d2,d3].some(function(v){return isNaN(v)||v<=0;})){alert('Enter valid length, width, and height.');return;}\\n    sa=2*(d1*d2+d1*d3+d2*d3); label='Rectangular Box';\\n  } else if(shape==='sphere'){\\n    if(isNaN(d1)||d1<=0){alert('Enter a valid radius.');return;}\\n    sa=4*Math.PI*d1*d1; label='Sphere';\\n  } else if(shape==='cylinder'){\\n    if([d1,d2].some(function(v){return isNaN(v)||v<=0;})){alert('Enter a valid radius and height.');return;}\\n    sa=2*Math.PI*d1*d1+2*Math.PI*d1*d2; label='Cylinder';\\n  } else {\\n    if([d1,d2].some(function(v){return isNaN(v)||v<=0;})){alert('Enter a valid radius and height.');return;}\\n    const slant=Math.sqrt(d1*d1+d2*d2);\\n    sa=Math.PI*d1*d1+Math.PI*d1*slant; label='Cone';\\n  }\\n  document.getElementById('sa-ri').innerHTML=\\n    ri('Surface Area','<strong style=\\\"font-size:21px;color:var(--c-accent)\\\">'+sa.toFixed(4)+' units²</strong>',true)+\\n    ri('Shape',label);\\n  document.getElementById('sa-result').style.display='block';\\n}\\nupdateSAFields();\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
