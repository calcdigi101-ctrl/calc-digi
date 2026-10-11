import { NavLinks } from "./NavLinks";

/**
 * Site header, mobile menu and AI assistant panel, rendered on the server so
 * crawlers see every link. Interactivity (dark mode, menu, AI chat) is wired by
 * delegated listeners in /js/main.js, which load before hydration, so the
 * buttons respond on the very first click.
 */
export function Header() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="nav" aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">
            <a href="/" className="logo" aria-label="CalcDigi Home">
              <span className="logo-mark">
                CalcDigi<span className="logo-dot" />
              </span>
            </a>

            <NavLinks />

            <div className="nav-right">
              <button type="button" className="dark-toggle" id="dark-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
                <span className="dark-toggle-moon" aria-hidden>
                  🌙
                </span>
                <span className="dark-toggle-sun" aria-hidden>
                  ☀️
                </span>
              </button>
              <button type="button" className="ai-btn" id="ai-fab-nav" data-open-ai aria-label="Open AI Assistant" aria-controls="ai-panel">
                <span className="ai-btn-pulse" /> AI
              </button>
              <button type="button" className="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        <a href="/">🏠 Home</a>
        <a href="/calculators">🧮 All Calculators</a>
        <a href="/pages/health">🩺 Health Calculators</a>
        <a href="/pages/finance">💰 Finance Calculators</a>
        <a href="/pages/math">📐 Math Calculators</a>
        <a href="/pages/blog">📖 Blog</a>
        <a href="/pages/about">ℹ️ About Us</a>
        <a href="/pages/contact">📧 Contact</a>
        <a href="/pages/privacy-policy">🔒 Privacy Policy</a>
      </div>

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
          <input type="text" id="ai-panel-input" placeholder="Ask me anything…" aria-label="AI chat input" maxLength={1000} autoComplete="off" />
          <button type="submit" className="ai-send-btn" id="ai-send-btn" aria-label="Send message">
            ➤
          </button>
        </form>
      </div>

      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
