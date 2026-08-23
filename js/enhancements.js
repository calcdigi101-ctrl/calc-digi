// ── CalcDigi – Enhancement Layer ──
// Dark mode, AI assistant, mega menu, trending, history, etc.

// ── Dark Mode ──
function initDarkMode(){
  const saved = localStorage.getItem('cd-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateToggleIcon(saved);
}
function toggleDarkMode(){
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cd-theme', next);
  updateToggleIcon(next);
}
function updateToggleIcon(theme){
  const btn = document.getElementById('dark-toggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ── Calculation History ──
const HISTORY_KEY = 'cd-calc-history';
function getHistory(){ try{ return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]'); }catch(e){ return []; } }
function addToHistory(name, result){
  const h = getHistory();
  h.unshift({ name, result, time: Date.now(), page: window.location.pathname });
  if(h.length > 20) h.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}
function renderHistoryPanel(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  const h = getHistory();
  if(h.length === 0){
    el.innerHTML = '<div class="history-empty">No calculations yet.<br>Results appear here after you calculate.</div>';
    return;
  }
  el.innerHTML = h.slice(0,6).map(item=>{
    const d = new Date(item.time);
    const timeStr = d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    return `<a href="${item.page}" class="history-item" style="text-decoration:none;color:inherit;">
      <div><div class="hi-name">${item.name}</div><div class="hi-time">${timeStr}</div></div>
      <div class="hi-result">${item.result}</div>
    </a>`;
  }).join('');
}

// ── Recently Used Calcs ──
const RECENT_KEY = 'cd-recent-calcs';
function trackPageVisit(){
  const path = window.location.pathname;
  const isCalc = path.includes('/calculators/');
  if(!isCalc) return;
  const title = document.querySelector('h1')?.textContent?.trim() || document.title;
  const recent = JSON.parse(localStorage.getItem(RECENT_KEY)||'[]');
  const filtered = recent.filter(r => r.path !== path);
  filtered.unshift({ path, title: title.replace(' Calculator','').trim() });
  if(filtered.length > 8) filtered.pop();
  localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
}
function renderRecentCalcs(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  const recent = JSON.parse(localStorage.getItem(RECENT_KEY)||'[]');
  if(recent.length === 0){ el.style.display='none'; return; }
  const base = getBasePath ? getBasePath() : '';
  el.innerHTML = recent.slice(0,6).map(r=>`
    <a href="${r.path}" class="recent-calc-chip">⏱ ${r.title}</a>
  `).join('');
}

// ── AI Assistant Modal ──
const AI_SUGGESTIONS = [
  "What is a good BMI range?",
  "How to save for retirement?",
  "Explain compound interest",
  "How many calories should I eat?",
  "What is TDEE?",
  "How to pay off debt fast?"
];

function initAIModal(){
  const overlay = document.getElementById('ai-modal-overlay');
  const closeBtn = document.getElementById('ai-modal-close');
  const floatBtn = document.getElementById('ai-float-btn');
  const sendBtn = document.getElementById('ai-modal-send');
  const input = document.getElementById('ai-modal-input');
  const msgs = document.getElementById('ai-modal-msgs');
  if(!overlay) return;

  floatBtn?.addEventListener('click', () => {
    overlay.classList.add('open');
    input?.focus();
  });
  closeBtn?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if(e.target === overlay) overlay.classList.remove('open'); });

  // Quick suggestions
  document.querySelectorAll('.ai-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if(input) input.value = btn.dataset.q;
      sendAIMessage();
    });
  });

  sendBtn?.addEventListener('click', sendAIMessage);
  input?.addEventListener('keydown', e => { if(e.key === 'Enter') sendAIMessage(); });

  async function sendAIMessage(){
    const q = input?.value?.trim();
    if(!q) return;
    if(input) input.value = '';
    appendMsg('user', q);
    const loadId = appendMsg('assistant', '', true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:'You are CalcDigi\'s AI assistant — a friendly, concise calculator and financial wellness expert. Give short, helpful answers (2-4 sentences max unless the user asks for more). Format numbers clearly. Always be encouraging and practical. You help with health calculations, finance questions, math, and calculator explanations.',
          messages:[{role:'user',content:q}]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b=>b.text||'').join('') || 'Sorry, I couldn\'t get a response. Please try again.';
      updateMsg(loadId, text);
    } catch(e){
      updateMsg(loadId, 'Connection issue. Please check your internet and try again.');
    }
    if(msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  let msgCount = 0;
  function appendMsg(role, text, loading=false){
    const id = 'msg-' + (++msgCount);
    const div = document.createElement('div');
    div.id = id;
    div.className = `ai-chat-bubble ${role}${loading?' loading':''}`;
    div.textContent = text;
    msgs?.appendChild(div);
    if(msgs) msgs.scrollTop = msgs.scrollHeight;
    return id;
  }
  function updateMsg(id, text){
    const el = document.getElementById(id);
    if(el){ el.textContent = text; el.classList.remove('loading'); }
  }
}

// ── Animated Stats Counters ──
function initCounters(){
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if(!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1200;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(ease * target);
        el.textContent = prefix + val.toLocaleString() + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => obs.observe(el));
}

// ── Newsletter ──
function initNewsletter(){
  const form = document.getElementById('newsletter-form');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('newsletter-success');
    const btn = form.querySelector('button');
    if(btn) btn.textContent = '✓ Subscribed!';
    if(success) success.style.display = 'block';
    form.querySelector('input').value = '';
    setTimeout(() => {
      if(btn) btn.textContent = 'Subscribe';
      if(success) success.style.display = 'none';
    }, 3500);
  });
}

// ── Page visit tracker (for recently used) ──
trackPageVisit();

// ── Init everything ──
document.addEventListener('DOMContentLoaded', function(){
  initDarkMode();
  initAIModal();
  initCounters();
  initNewsletter();
  // Dark toggle binding (after nav renders)
  setTimeout(() => {
    const btn = document.getElementById('dark-toggle');
    btn?.addEventListener('click', toggleDarkMode);
    renderRecentCalcs('recent-calcs-list');
    renderHistoryPanel('history-list');
  }, 100);
});
