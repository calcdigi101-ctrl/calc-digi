// ── CalcDigi – Enhanced Shared Utilities ──

// Format USD
function fmtUSD(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n||0);}
// Format number
function fmtNum(n,d=2){return isNaN(n)?'0':n.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
// Result row
function ri(label,value,highlight=false){return `<div class="result-item${highlight?' highlight':''}"><span class="ri-label">${label}</span><span class="ri-value">${value}</span></div>`;}
// Show result
function showResult(id){const el=document.getElementById(id);if(el){el.style.display='block';el.classList.add('visible');el.scrollIntoView({behavior:'smooth',block:'nearest'});}}

// Draw donut chart
function drawDonut(canvasId,labels,data,colors){
  const canvas=document.getElementById(canvasId);
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const total=data.reduce((a,b)=>a+b,0);
  if(total<=0)return;
  const cx=canvas.width/2,cy=canvas.height/2,r=Math.min(cx,cy)-10,inner=r*0.55;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const isDark=document.body.classList.contains('dark');
  let angle=-Math.PI/2;
  data.forEach((val,i)=>{
    const slice=(val/total)*2*Math.PI;
    ctx.beginPath();ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,angle,angle+slice);
    ctx.closePath();
    ctx.fillStyle=(isDark&&colors[i]==='#e8e8e2')?'#2e2e2a':(colors[i]||'#ccc');
    ctx.fill();
    angle+=slice;
  });
  ctx.beginPath();ctx.arc(cx,cy,inner,0,2*Math.PI);
  ctx.fillStyle=isDark?'#1e1e1a':'#fff';ctx.fill();
}

// Draw bar chart on canvas
function drawBar(canvasId,labels,data,color='#1a5c3a'){
  const canvas=document.getElementById(canvasId);
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height,pad=30,barPad=8;
  ctx.clearRect(0,0,W,H);
  const max=Math.max(...data)||1;
  const barW=(W-pad*2)/data.length-barPad;
  const isDark=document.body.classList.contains('dark');
  ctx.fillStyle=isDark?'#b8b8b0':'#8a8a82';
  ctx.font='10px DM Sans, system-ui, sans-serif';
  data.forEach((val,i)=>{
    const x=pad+i*(barW+barPad);
    const barH=((val/max)*(H-pad*2));
    const y=H-pad-barH;
    ctx.fillStyle=color;
    const r=4;
    ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+barW-r,y);
    ctx.quadraticCurveTo(x+barW,y,x+barW,y+r);ctx.lineTo(x+barW,y+barH);
    ctx.lineTo(x,y+barH);ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();ctx.fill();
    ctx.fillStyle=isDark?'#6a6a62':'#8a8a82';
    ctx.fillText(labels[i]||'',x+barW/2-12,H-8);
  });
}

// ── Text escaping for anything inserted with innerHTML ──
function escHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

// ── Toast ──
function showToast(msg,duration=2000){
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),duration);
}

// ── FAQ accordion ──
function initFAQ(){
  document.querySelectorAll('.faq-q').forEach(q=>{
    if(q.dataset.faqBound)return;
    q.dataset.faqBound='1';
    q.addEventListener('click',function(){
      const a=this.nextElementSibling;
      const isOpen=a.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('open'));
      document.querySelectorAll('.faq-q').forEach(x=>x.classList.remove('open'));
      if(!isOpen){a.classList.add('open');this.classList.add('open');}
    });
  });
}

// ── Calculator History (localStorage) ──
function saveCalcHistory(calcName,resultSummary){
  try{
    const hist=JSON.parse(localStorage.getItem('cd-history')||'[]');
    hist.unshift({name:calcName,result:resultSummary,time:Date.now()});
    localStorage.setItem('cd-history',JSON.stringify(hist.slice(0,10)));
  }catch(e){}
}

function renderCalcHistory(containerId){
  const el=document.getElementById(containerId);
  if(!el)return;
  try{
    const hist=JSON.parse(localStorage.getItem('cd-history')||'[]');
    if(hist.length===0){el.innerHTML='<p style="font-size:13px;color:var(--c-ink3);">No recent calculations yet.</p>';return;}
    el.innerHTML=hist.slice(0,5).map(h=>{
      const d=new Date(h.time);
      const timeStr=d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
      return`<div class="history-item"><div><div class="history-item-label">${h.name}</div><div class="history-item-val">${h.result}</div></div><div class="history-time">${timeStr}</div></div>`;
    }).join('');
  }catch(e){el.innerHTML='';}
}

async function showAIRecommendation(containerId,prompt){
  const box=document.getElementById(containerId);
  if(!box)return;
  box.innerHTML=`<div class="ai-header"><span>✨</span> AI Insight</div><p>Analyzing your results…</p>`;
  box.style.display='block';
  const insight=await getAIInsight(prompt);
  if(insight){box.innerHTML='<div class="ai-header"><span>✨</span> AI Insight</div><p></p>';box.querySelector('p').textContent=insight;}
  else{box.style.display='none';}
}

// ── Card spotlight/tilt (cursor-tracking) ──
function initCardTilt(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.matchMedia && window.matchMedia('(hover: none)').matches)return;
  document.querySelectorAll('.calc-card').forEach(function(card){
    if(card.dataset.tiltBound)return;
    card.dataset.tiltBound='1';
    card.addEventListener('mousemove',function(e){
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width;
      const py=(e.clientY-r.top)/r.height;
      card.style.setProperty('--mx',(px*100)+'%');
      card.style.setProperty('--my',(py*100)+'%');
      card.style.setProperty('--rx',((px-0.5)*6)+'deg');
      card.style.setProperty('--ry',((0.5-py)*6)+'deg');
    });
    card.addEventListener('mouseleave',function(){
      card.style.setProperty('--rx','0deg');
      card.style.setProperty('--ry','0deg');
    });
  });
}

// ── Scroll reveal ──
// Reveal-once: elements are unobserved after their first reveal. A positive
// bottom rootMargin starts the animation just before an element scrolls into
// view, so nothing sits invisible on screen; the stagger is per-batch and capped.
// CSS keeps .reveal visible without JS and under prefers-reduced-motion.
var revealIO=null;
function initScrollReveal(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!('IntersectionObserver' in window))return;
  const selector='.content-section,.section-header,.blog-card,.calc-card,.related-card,.about-card,.health-calc-card,.stat-item,.faq-item,.calc-widget,.ai-feature-card,.popular-item,.testimonial-card,.trust-badge,.newsletter-section,.hero-stat';
  if(!revealIO){
    revealIO=new IntersectionObserver(function(entries){
      let n=0;
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        entry.target.style.transitionDelay=(Math.min(n++,4)*60)+'ms';
        entry.target.classList.add('in-view');
        revealIO.unobserve(entry.target);
      });
    },{threshold:0,rootMargin:'0px 0px 15% 0px'});
  }
  document.querySelectorAll(selector).forEach(function(el){
    if(el.classList.contains('reveal'))return;
    // Already on screen at load: show immediately rather than fading in.
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight && r.bottom>0){el.classList.add('reveal','in-view');return;}
    el.classList.add('reveal');
    revealIO.observe(el);
  });
}

// ── Header, mobile menu, back-to-top, AI panel ──
// Delegated listeners on document: this file loads before hydration and the
// header is server-rendered, so controls respond on the very first click.
var AI_MAX_CHARS=1000,AI_MAX_TURNS=11;
var aiHistory=window.__cdAIHistory||(window.__cdAIHistory=[]);

function setDark(on){
  document.body.classList.toggle('dark',on);
  try{localStorage.setItem('cd-dark',on?'1':'0');}catch(e){}
}
function setMobileNav(open){
  const nav=document.getElementById('mobile-nav-menu') || document.getElementById('mobile-nav');
  const btn=document.getElementById('mobile-nav-toggle') || document.getElementById('hamburger');
  if(!nav)return;
  nav.classList.toggle('open',open);
  nav.classList.toggle('hidden',!open);
  if(btn){
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    const ham=btn.querySelector('#hamburger-icon');
    const close=btn.querySelector('#close-icon');
    if(ham && close){
      ham.classList.toggle('hidden',open);
      close.classList.toggle('hidden',!open);
    }
  }
}
function setAIPanel(open){
  const panel=document.getElementById('ai-panel');
  if(!panel)return;
  panel.classList.toggle('open',open);
  if(open)setTimeout(()=>document.getElementById('ai-panel-input')?.focus(),50);
}
function aiBubble(cls,text){
  const box=document.getElementById('ai-panel-messages');
  const d=document.createElement('div');
  d.className='ai-msg '+cls;
  d.textContent=text;
  box.appendChild(d);
  box.scrollTop=box.scrollHeight;
  return d;
}
async function sendAIMessage(){
  const input=document.getElementById('ai-panel-input');
  const q=input?.value?.trim();
  if(!q)return;
  if(q.length>AI_MAX_CHARS){aiBubble('bot','Please keep questions under '+AI_MAX_CHARS+' characters.');return;}
  input.value='';
  aiBubble('user',q);
  aiHistory.push({role:'user',content:q});
  const typing=aiBubble('typing','thinking…');
  typing.insertAdjacentHTML('afterbegin','<span class="spinner"></span> ');
  const r=await askAI(aiHistory.slice(-AI_MAX_TURNS));
  typing.remove();
  if(r.reply){aiHistory.push({role:'assistant',content:r.reply});aiBubble('bot',r.reply);}
  else{aiHistory.pop();aiBubble('bot',r.error||"Sorry, I'm having trouble connecting. Please try again.");}
}

// Guard: if this file is ever executed twice, don't bind the listeners twice
// (a double-bound toggle would flip and immediately flip back).
if(!window.__cdBound){
window.__cdBound=true;
document.addEventListener('click',function(e){
  const t=e.target instanceof Element?e.target:null;
  if(!t)return;
  if(t.closest('#dark-toggle')){
    const on=!document.body.classList.contains('dark');
    setDark(on);showToast(on?'Dark mode on ✓':'Light mode on ✓');return;
  }
  if(t.closest('#hamburger') || t.closest('#mobile-nav-toggle')){
    const nav=document.getElementById('mobile-nav-menu') || document.getElementById('mobile-nav');
    const isClosed=nav?.classList.contains('hidden') || !nav?.classList.contains('open');
    setMobileNav(isClosed);
    return;
  }
  if(t.closest('#ai-panel-close')){setAIPanel(false);return;}
  if(t.closest('[data-open-ai]')){
    const panel=document.getElementById('ai-panel');
    setAIPanel(!(panel&&panel.classList.contains('open')&&t.closest('#ai-fab-nav')));
    return;
  }
  if(t.closest('#back-top')){window.scrollTo({top:0,behavior:'smooth'});return;}
  if(t.closest('#mobile-nav a') || t.closest('#mobile-nav-menu a'))setMobileNav(false);
});
document.addEventListener('submit',function(e){
  if(e.target&&e.target.id==='ai-panel-form'){e.preventDefault();sendAIMessage();}
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  setAIPanel(false);setMobileNav(false);
});
window.addEventListener('scroll',function(){
  document.getElementById('back-top')?.classList.toggle('show',window.scrollY>400);
},{passive:true});

// ── Legacy calculator input validation ──
// Inputs that ship with a default value are required; if one is cleared, the
// section's Calculate button shows an inline message instead of silently
// computing with a hidden fallback (or doing nothing).
document.addEventListener('click',function(e){
  const btn=e.target instanceof Element?e.target.closest('.calc-page .calc-btn'):null;
  if(!btn||btn.closest('[data-no-validate]'))return;
  const scope=btn.closest('.content-section')||btn.closest('.calc-widget');
  if(!scope)return;
  let first=null;
  scope.querySelectorAll('input[type="number"]').forEach(function(inp){
    if(inp.offsetParent===null||inp.disabled)return;
    const empty=inp.value.trim()==='';
    const bad=(empty&&inp.defaultValue!=='')||(!empty&&!inp.checkValidity()&&inp.validity.badInput);
    setFieldError(inp,bad?'Enter a value':'');
    if(bad&&!first)first=inp;
  });
  if(first){e.preventDefault();e.stopImmediatePropagation();first.focus();}
},true);
}
function setFieldError(inp,msg){
  const id=inp.id?inp.id+'-err':'';
  let el=id?document.getElementById(id):inp.parentElement.querySelector('.field-error');
  if(!msg){if(el)el.remove();inp.removeAttribute('aria-invalid');return;}
  if(!el){
    el=document.createElement('p');el.className='field-error';el.setAttribute('role','alert');
    if(id){el.id=id;inp.setAttribute('aria-describedby',id);}
    inp.insertAdjacentElement('afterend',el);
  }
  el.textContent=msg;inp.setAttribute('aria-invalid','true');
}
if(!window.__cdInputBound){window.__cdInputBound=true;
document.addEventListener('input',function(e){
  const inp=e.target;
  if(inp instanceof HTMLInputElement&&inp.getAttribute('aria-invalid')==='true'&&inp.value.trim()!=='')setFieldError(inp,'');
});
}

// ── AI (proxied through /api/ai so the API key stays on the server) ──
async function askAI(messages){
  try{
    const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages})});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)return{error:data.error||''};
    return{reply:data.reply||''};
  }catch(e){return{error:''};}
}

// Automatic per-result insights are disabled: they sent every result to the AI
// provider without the user asking, which contradicted the "calculations stay in
// your browser" promise. Legacy page scripts still call this and hide their
// insight box when it resolves empty. The header AI assistant is opt-in.
async function getAIInsight(prompt){return'';}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initPage);else initPage();
function initPage(){
  initFAQ();
  initScrollReveal();
  initCardTilt();
}

// ── Copy Result ──
function copyResult(resultId, btnId) {
  const box = document.getElementById(resultId);
  if (!box) return;
  const labels = box.querySelectorAll('.ri-label');
  const values = box.querySelectorAll('.ri-value');
  let text = '';
  labels.forEach((l, i) => {
    const v = values[i] ? values[i].innerText.trim() : '';
    text += l.innerText.trim() + ': ' + v + '\n';
  });
  if (!text.trim()) text = box.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✅</span> Copied!';
      btn.style.color = 'var(--c-accent)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    }
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.getElementById(btnId);
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✅</span> Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  });
}

// ── Print Result ──
function printEscapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
function printResult(resultId, title) {
  const box = document.getElementById(resultId);
  if (!box) return;
  // Calculators render results with a few different label/value class
  // conventions (most use the shared ri()/.ri-label/.ri-value helper,
  // a few hand-roll .rr-label/.rr-val). Try each, then fall back to the
  // box's plain rendered text so Print always produces something.
  let rows = '';
  [['.ri-label', '.ri-value'], ['.rr-label', '.rr-val']].forEach(([labelSel, valueSel]) => {
    const labels = box.querySelectorAll(labelSel);
    const values = box.querySelectorAll(valueSel);
    labels.forEach((l, i) => {
      const v = values[i] ? values[i].innerText.trim() : '';
      rows += '<tr><td class="pi-label">' + printEscapeHtml(l.innerText.trim()) + '</td><td class="pi-value">' + printEscapeHtml(v) + '</td></tr>';
    });
  });
  let bodyHtml;
  if (rows) {
    bodyHtml = '<table>' + rows + '</table>';
  } else {
    const text = box.innerText.trim();
    if (!text) return;
    bodyHtml = '<div class="pi-text">' + printEscapeHtml(text).replace(/\n{2,}/g, '\n').split('\n').map((l) => l.trim()).filter(Boolean).join('<br>') + '</div>';
  }
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const win = window.open('', '_blank', 'width=680,height=860');
  if (!win) return;
  win.document.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + printEscapeHtml(title) + ' — CalcDigi</title>' +
    '<style>' +
    '*{box-sizing:border-box;}' +
    'body{font-family:-apple-system,"Segoe UI",Arial,sans-serif;color:#1a1a18;margin:0;padding:40px;background:#fff;}' +
    '.pi-wrap{max-width:560px;margin:0 auto;border:1.5px solid #e3e3dd;border-radius:14px;overflow:hidden;}' +
    '.pi-head{background:#1a5c3a;color:#fff;padding:26px 28px;display:flex;align-items:center;justify-content:space-between;}' +
    '.pi-brand{font-size:21px;font-weight:700;letter-spacing:-0.3px;}' +
    '.pi-brand small{display:block;opacity:.75;font-weight:400;font-size:12px;margin-top:3px;letter-spacing:0;}' +
    '.pi-badge{font-size:11px;background:rgba(255,255,255,.15);padding:5px 10px;border-radius:100px;}' +
    '.pi-title{padding:24px 28px 6px;font-size:23px;font-weight:700;}' +
    '.pi-meta{padding:0 28px 18px;font-size:12px;color:#8a8a80;border-bottom:1px solid #eee;}' +
    'table{width:100%;border-collapse:collapse;}' +
    'td{padding:13px 28px;font-size:14px;border-bottom:1px solid #f1f1eb;}' +
    'tr:last-child td{border-bottom:none;}' +
    '.pi-label{color:#5a5a52;}' +
    '.pi-value{text-align:right;font-weight:700;}' +
    '.pi-text{padding:16px 28px 22px;font-size:14px;line-height:1.7;}' +
    '.pi-foot{padding:18px 28px;font-size:11px;color:#a3a399;text-align:center;border-top:1px solid #eee;}' +
    '@media print{body{padding:0;}.pi-wrap{border:none;border-radius:0;}}' +
    '</style></head><body>' +
    '<div class="pi-wrap">' +
    '<div class="pi-head"><div class="pi-brand">CalcDigi<small>Free Online Calculators</small></div><div class="pi-badge">calc-digi.vercel.app</div></div>' +
    '<div class="pi-title">' + printEscapeHtml(title) + '</div>' +
    '<div class="pi-meta">Generated ' + dateStr + ' at ' + timeStr + '</div>' +
    bodyHtml +
    '<div class="pi-foot">Results are for informational purposes only and do not constitute professional advice.</div>' +
    '</div>' +
    '<script>window.onload=function(){window.print();};<\/script>' +
    '</body></html>'
  );
  win.document.close();
}

// ── Share Result ──
function shareResult(title) {
  const url = window.location.href;
  const text = 'Check out this free ' + title + ' on CalcDigi!';
  if (navigator.share) {
    navigator.share({ title: title + ' | CalcDigi', text: text, url: url })
      .catch(() => {});
  } else {
    // Fallback: copy link
    navigator.clipboard.writeText(url).then(() => {
      showShareToast('Link copied to clipboard!');
    }).catch(() => {
      showShareToast('Share: ' + url);
    });
  }
}

function showShareToast(msg) {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1a18;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}
