"use client";

import { NavLinks } from "./NavLinks";

/**
 * Site header with top bar navigation, search box, centered dark mode moon,
 * and AI Assistant pill button with live pulsing green status dot.
 */
export function Header() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo: CalcDigi• (Serif styled matching screenshot) */}
          <a href="/" className="flex items-center gap-1 group shrink-0" aria-label="CalcDigi Home">
            <span className="font-serif font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
              CalcDigi
            </span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#18533b] dark:bg-emerald-400 mb-0.5 group-hover:scale-125 transition-transform"></span>
          </a>

          {/* Screenshot Navigation Links: Home, Calculators, Blog, About */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLinks />
          </nav>

          {/* Right Elements: [🌙 Moon] -> [ ● ✨ AI Assistant ] */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Dark / Light Mode Moon Button (CENTERED between Search & AI Assistant as requested) */}
            <button 
              type="button"
              id="dark-toggle" 
              className="w-10 h-10 rounded-2xl bg-[#f0f4f8]/85 dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              title="Toggle Dark / Light Mode"
              aria-label="Toggle Dark / Light Mode"
            >
              <span className="text-base select-none leading-none">🌙</span>
            </button>

            {/* "✨ AI Assistant" Pill Action Button with live pulsing green dot */}
            <button 
              type="button"
              data-open-ai
              id="ai-fab-nav"
              aria-label="Open AI Assistant" 
              aria-controls="ai-panel"
              className="px-3.5 sm:px-4 py-2 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/50 hover:bg-[#d1fae5] dark:hover:bg-emerald-900/50 border border-[#a7f3d0] dark:border-emerald-800/80 active:scale-95 text-[#065f46] dark:text-emerald-300 font-bold text-xs sm:text-[13px] tracking-tight shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981] dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-sm leading-none">✨</span>
              <span>AI Assistant</span>
            </button>

            {/* Mobile Menu Toggle Button (Hamburger) */}
            <button 
              type="button"
              id="hamburger"
              aria-label="Open menu" 
              aria-expanded="false" 
              aria-controls="mobile-nav"
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer ml-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        <a href="/">🏠 Home</a>
        <a href="/calculators">⚡ All Calculators</a>
        <a href="/pages/finance">💳 Finance Calculators</a>
        <a href="/pages/health">🏋️ Health Calculators</a>
        <a href="/pages/math">🧮 Math Calculators</a>
        <a href="/pages/blog">📖 Blog &amp; Guides</a>
        <a href="/pages/about">ℹ️ About Us</a>
        <a href="/pages/contact">✉️ Contact</a>
        <a href="/pages/privacy-policy">🔒 Privacy Policy</a>
      </div>

      {/* Existing AI Assistant Dialog Panel (Preserves full chat functionality) */}
      <div className="ai-assistant-panel" id="ai-panel" role="dialog" aria-label="AI Calculator Assistant">
        <div className="ai-panel-header">
          <div className="ai-panel-title">
            <span>✨</span> CalcDigi AI Assistant
          </div>
          <button type="button" className="ai-panel-close" id="ai-panel-close" aria-label="Close AI panel">
            ✕
          </button>
        </div>
        <div className="ai-panel-messages" id="ai-panel-messages" aria-live="polite">
          <div className="ai-msg bot">
            Hi! I&apos;m your CalcDigi AI assistant. Ask me anything about calculations, finance, health metrics, or math concepts. Please
            don&apos;t share personal or sensitive information.
          </div>
        </div>
        <form className="ai-panel-input" id="ai-panel-form">
          <input type="text" id="ai-panel-input" placeholder="Ask me anything..." aria-label="AI chat input" maxLength={1000} autoComplete="off" />
          <button type="submit" className="ai-send-btn" id="ai-send-btn" aria-label="Send message">
            ➤
          </button>
        </form>
      </div>

      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
