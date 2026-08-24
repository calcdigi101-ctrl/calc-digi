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
  let angle=-Math.PI/2;
  data.forEach((val,i)=>{
    const slice=(val/total)*2*Math.PI;
    ctx.beginPath();ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,angle,angle+slice);
    ctx.closePath();ctx.fillStyle=colors[i]||'#ccc';ctx.fill();
    angle+=slice;
  });
  ctx.beginPath();ctx.arc(cx,cy,inner,0,2*Math.PI);
  const isDark=document.body.classList.contains('dark');
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

// ── ALL_CALCS now defined in layout.js (CALC_DATA-derived) — removed duplicate here ──

// ── Search ──
function buildSearchResults(q,results,basePath=''){
  const matches=ALL_CALCS.filter(c=>c.name.toLowerCase().includes(q)||(c.catLabel||c.cat||'').toLowerCase().includes(q));
  if(matches.length===0){results.innerHTML='<div class="search-result-item"><span class="sri-name" style="color:var(--c-ink3)">No calculators found</span></div>';results.classList.add('active');return;}
  results.innerHTML=matches.slice(0,8).map(c=>`<a class="search-result-item" href="${basePath}${c.url}"><span class="sri-icon">${c.icon}</span><div><div class="sri-name">${c.name}</div><div class="sri-cat">${c.catLabel||c.cat}</div></div></a>`).join('');
  results.classList.add('active');
}

function initSearch(){
  const base=getBasePath?getBasePath():'';
  // Hero search
  const heroInput=document.getElementById('calc-search');
  const heroResults=document.getElementById('search-results');
  if(heroInput&&heroResults){
    heroInput.addEventListener('input',function(){
      const q=this.value.trim().toLowerCase();
      if(q.length<2){heroResults.classList.remove('active');return;}
      buildSearchResults(q,heroResults,base);
    });
    document.addEventListener('click',e=>{if(!heroInput.contains(e.target)&&!heroResults.contains(e.target))heroResults.classList.remove('active');});
  }
  // Nav search
  const navInput=document.getElementById('nav-search');
  const navResults=document.getElementById('nav-search-results');
  if(navInput&&navResults){
    navInput.addEventListener('input',function(){
      const q=this.value.trim().toLowerCase();
      if(q.length<2){navResults.classList.remove('active');return;}
      buildSearchResults(q,navResults,base);
    });
    document.addEventListener('click',e=>{if(!navInput.contains(e.target)&&!navResults.contains(e.target))navResults.classList.remove('active');});
  }
}

// ── Dark Mode ──
function initDarkMode(){
  const toggle=document.getElementById('dark-toggle');
  if(!toggle)return;
  const saved=localStorage.getItem('cd-dark');
  if(saved==='1'){document.body.classList.add('dark');toggle.textContent='☀️';}
  toggle.addEventListener('click',function(){
    const isDark=document.body.classList.toggle('dark');
    this.textContent=isDark?'☀️':'🌙';
    localStorage.setItem('cd-dark',isDark?'1':'0');
    showToast(isDark?'Dark mode on ✓':'Light mode on ✓');
  });
}

// ── Toast ──
function showToast(msg,duration=2000){
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),duration);
}

// ── Mobile nav toggle ──
function initMobileNav(){
  const btn=document.getElementById('hamburger');
  const nav=document.getElementById('mobile-nav');
  if(!btn||!nav)return;
  btn.addEventListener('click',function(){
    const open=nav.classList.toggle('open');
    this.setAttribute('aria-expanded',open);
  });
}

// ── FAQ accordion ──
function initFAQ(){
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',function(){
      const a=this.nextElementSibling;
      const isOpen=a.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('open'));
      document.querySelectorAll('.faq-q').forEach(x=>x.classList.remove('open'));
      if(!isOpen){a.classList.add('open');this.classList.add('open');}
    });
  });
}

// ── Back to top ──
function initBackTop(){
  const btn=document.getElementById('back-top');
  if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>400));
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// ── Cookie banner ──
function initCookie(){
  if(localStorage.getItem('cd-cookie'))return;
  const banner=document.getElementById('cookie-banner');
  if(!banner)return;
  setTimeout(()=>banner.classList.add('show'),1400);
  document.getElementById('cookie-accept')?.addEventListener('click',()=>{localStorage.setItem('cd-cookie','1');banner.classList.remove('show');});
  document.getElementById('cookie-decline')?.addEventListener('click',()=>banner.classList.remove('show'));
}

// ── AI Chat Panel ──
function initAIPanel(){
  const panel=document.getElementById('ai-panel');
  const fabBtn=document.getElementById('ai-fab-nav');
  const closeBtn=document.getElementById('ai-panel-close');
  const sendBtn=document.getElementById('ai-send-btn');
  const input=document.getElementById('ai-panel-input');
  const messages=document.getElementById('ai-panel-messages');
  if(!panel)return;

  function openPanel(){panel.classList.add('open');}
  function closePanel(){panel.classList.remove('open');}

  fabBtn?.addEventListener('click',()=>{panel.classList.toggle('open');});
  closeBtn?.addEventListener('click',closePanel);

  async function sendMsg(){
    const q=input?.value?.trim();
    if(!q)return;
    input.value='';
    // User bubble
    messages.innerHTML+=`<div class="ai-msg user">${q}</div>`;
    messages.innerHTML+=`<div class="ai-msg typing" id="ai-typing"><span class="spinner"></span> thinking</div>`;
    messages.scrollTop=messages.scrollHeight;
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:'You are CalcDigi AI, a helpful assistant for a calculator website. You help users understand calculations, financial concepts, health metrics, math, and explain how to use calculators. Keep answers concise, clear, and friendly. If relevant, suggest which CalcDigi calculator they should use.',
          messages:[{role:'user',content:q}]
        })
      });
      const data=await res.json();
      const reply=data.content?.map(b=>b.text||'').join('\n')||'Sorry, I could not get a response.';
      document.getElementById('ai-typing')?.remove();
      messages.innerHTML+=`<div class="ai-msg bot">${reply.replace(/\n/g,'<br>')}</div>`;
    }catch(e){
      document.getElementById('ai-typing')?.remove();
      messages.innerHTML+=`<div class="ai-msg bot">Sorry, I'm having trouble connecting. Please try again.</div>`;
    }
    messages.scrollTop=messages.scrollHeight;
  }

  sendBtn?.addEventListener('click',sendMsg);
  input?.addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg();});
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

// ── AI Insight ──
async function getAIInsight(prompt){
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})
    });
    const data=await res.json();
    return data.content?.map(b=>b.text||'').join('\n')||'';
  }catch(e){return'';}
}

async function showAIRecommendation(containerId,prompt){
  const box=document.getElementById(containerId);
  if(!box)return;
  box.innerHTML=`<div class="ai-header"><span>✨</span> AI Insight</div><p>Analyzing your results…</p>`;
  box.style.display='block';
  const insight=await getAIInsight(prompt);
  if(insight){box.innerHTML=`<div class="ai-header"><span>✨</span> AI Insight</div><p>${insight.replace(/\n/g,'<br>')}</p>`;}
  else{box.style.display='none';}
}

// ── Category filter for homepage ──
function initCatFilter(){
  const tabs=document.querySelectorAll('.cat-tab');
  if(!tabs.length)return;
  tabs.forEach(tab=>{
    tab.addEventListener('click',function(){
      tabs.forEach(t=>t.classList.remove('active'));
      this.classList.add('active');
      const cat=this.dataset.cat;
      document.querySelectorAll('.calc-card[data-cat]').forEach(card=>{
        card.style.display=(cat==='all'||card.dataset.cat===cat)?'flex':'none';
      });
    });
  });
}

// ── Newsletter stub ──
function initNewsletter(){
  const form=document.getElementById('newsletter-form');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const email=this.querySelector('input')?.value;
    if(!email)return;
    this.innerHTML='<p style="color:var(--c-accent);font-weight:500;">✓ You\'re subscribed! Thanks for joining.</p>';
    showToast('Subscribed! ✓');
  });
}

// ── Scroll reveal ──
function initScrollReveal(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!('IntersectionObserver' in window))return;
  const selector='.content-section,.blog-card,.calc-card,.related-card,.about-card,.health-calc-card,.stat-item,.faq-item,.calc-widget,.ai-feature-card,.mega-calc-item';
  const els=document.querySelectorAll(selector);
  if(!els.length)return;
  const io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){
    if(el.classList.contains('reveal'))return;
    el.classList.add('reveal');
    io.observe(el);
  });
}

// ── Init all ──
document.addEventListener('DOMContentLoaded',function(){
  initSearch();
  initDarkMode();
  initMobileNav();
  initFAQ();
  initBackTop();
  initCookie();
  initAIPanel();
  initCatFilter();
  initNewsletter();
  initScrollReveal();
  setTimeout(initMegaSearch, 150);
});

// ── Mega Menu Close on ESC ──
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){if(typeof closeMega==='function')closeMega();}
});

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
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--c-ink);color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}
