"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";

/**
 * Site header with top bar navigation, search box, centered dark mode moon,
 * responsive AI Assistant pill, 3-lines to cross mobile menu toggle without circle border,
 * and the complete 9-link mobile navigation drawer.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "";

  // Auto-close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close drawer on escape key or outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        !target.closest("#hamburger") &&
        !target.closest("#mobile-nav-toggle") &&
        !target.closest("#mobile-nav")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo: ∑ CalcDigi (Unified matching screenshot & footer) */}
          <a href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0" aria-label="CalcDigi Home">
            <div className="size-8 sm:size-9 rounded-xl bg-gradient-to-tr from-[#18533b] to-emerald-500 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-xs group-hover:scale-105 transition-transform">
              ∑
            </div>
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
              Calc<span className="text-emerald-700 dark:text-emerald-400">Digi</span>
            </span>
          </a>

          {/* Screenshot Navigation Links: Home, Calculators, Blog, About */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLinks />
          </nav>

          {/* Right Elements: [🌙 Moon] -> [ ● ✨ AI Assistant ] -> [ ☰ / ✕ Menu Toggle ] */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* Dark / Light Mode Moon Button */}
            <button 
              type="button"
              id="dark-toggle" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#f0f4f8]/85 dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              title="Toggle Dark / Light Mode"
              aria-label="Toggle Dark / Light Mode"
            >
              <span className="text-sm sm:text-base select-none leading-none">🌙</span>
            </button>

            {/* "✨ AI Assistant" Pill Action Button with live pulsing green dot */}
            <button 
              type="button"
              data-open-ai
              id="ai-fab-nav"
              aria-label="Open AI Assistant" 
              aria-controls="ai-panel"
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/50 hover:bg-[#d1fae5] dark:hover:bg-emerald-900/50 border border-[#a7f3d0] dark:border-emerald-800/80 active:scale-95 text-[#065f46] dark:text-emerald-300 font-bold text-xs sm:text-[13px] tracking-tight shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#10b981] dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-xs sm:text-sm leading-none">✨</span>
              <span>AI<span className="hidden min-[380px]:inline"> Assistant</span></span>
            </button>

            {/* Mobile Menu Toggle Button (Hamburger 3-lines / Close Cross ✕ without circle border) */}
            <button 
              type="button"
              id="hamburger"
              aria-label={isOpen ? "Close menu" : "Open menu"} 
              aria-expanded={isOpen} 
              aria-controls="mobile-nav"
              onClick={toggleNav}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer ml-1 border-0 bg-transparent"
              style={{ border: "none", background: "transparent", borderRadius: "12px", outline: "none" }}
            >
              <svg 
                id="hamburger-icon" 
                className={`w-5 h-5 ${isOpen ? "hidden" : "block"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg 
                id="close-icon" 
                className={`w-5 h-5 ${isOpen ? "block" : "hidden"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation (Original 9 Links Preserved) */}
      <div className={`mobile-nav${isOpen ? " open" : ""}`} id="mobile-nav" aria-label="Mobile navigation">
        <a href="/" onClick={() => setIsOpen(false)}>🏠 Home</a>
        <a href="/calculators" onClick={() => setIsOpen(false)}>⚡ All Calculators</a>
        <a href="/pages/finance" onClick={() => setIsOpen(false)}>💳 Finance Calculators</a>
        <a href="/pages/health" onClick={() => setIsOpen(false)}>🏋️ Health Calculators</a>
        <a href="/pages/math" onClick={() => setIsOpen(false)}>🧮 Math Calculators</a>
        <a href="/pages/blog" onClick={() => setIsOpen(false)}>📖 Blog &amp; Guides</a>
        <a href="/pages/about" onClick={() => setIsOpen(false)}>ℹ️ About Us</a>
        <a href="/pages/contact" onClick={() => setIsOpen(false)}>✉️ Contact</a>
        <a href="/pages/privacy-policy" onClick={() => setIsOpen(false)}>🔒 Privacy Policy</a>
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
