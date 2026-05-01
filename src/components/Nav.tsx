import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { scrollToSection } from "@/hooks/useScrollTo";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Pricing", id: "pricing" },
  { label: "Quote", to: "/quote" },
  { label: "Why Us", id: "why" },
  { label: "Blog", to: "/blog" },
];

const DROPDOWN_ITEMS = [
  { label: "Send a brief", id: "contact" },
  { label: "View pricing", id: "pricing" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Lock body scroll + close on Escape when mobile menu is open.
  // Using overflow:hidden on html+body (NOT position:fixed) so that
  // child portals using position:fixed still anchor to the visual viewport
  // on iOS Safari — position:fixed on <body> breaks fixed descendants.
  useEffect(() => {
    if (!menuOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add("mobile-menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;
      body.style.paddingRight = prev.paddingRight;
      body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Auto-close menu when leaving mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Scroll position + reading progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setProgress(0); return; }
      const pct = (y / docH) * 100;
      setProgress(pct >= 99.5 ? 100 : Math.min(100, pct));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const goToSection = useCallback((id: string) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (isHome) {
      // Wait a frame so the body scroll-lock is released before scrolling.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(id));
      });
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    }
  }, [isHome, navigate]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: "color-mix(in srgb, var(--bg) 94%, transparent)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: scrolled ? "1px solid var(--border-c)" : "1px solid transparent",
        transition: "border-color 0.2s",
      }}
    >
      {/* ══ Nav bar ══ */}
      <div
        className="max-w-[1280px] mx-auto px-6 md:px-10"
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Luxiflow home"
          style={{ flexShrink: 0, lineHeight: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Logo />
        </Link>

        {/* ── Desktop center nav links ── */}
        <ul
          className="hidden md:flex items-center"
          style={{ gap: 32, margin: 0, padding: 0, listStyle: "none", flex: 1, justifyContent: "center" }}
        >
          {NAV_LINKS.map((l) => {
            const active = l.to ? location.pathname.startsWith(l.to) : false;
            const baseColor = active ? "var(--text)" : "var(--mid)";
            return (
              <li key={l.label}>
                {l.to ? (
                  <Link
                    to={l.to}
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: baseColor,
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => goToSection(l.id!)}
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "var(--mid)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mid)")}
                  >
                    {l.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Desktop right: status + CTA dropdown ── */}
        <div className="hidden md:flex items-center" style={{ gap: 20, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span
              className="lx-pulse"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--low)" }}>
              Available
            </span>
          </div>

          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              type="button"
              className="btn-gold"
              style={{ padding: "9px 18px", fontSize: 13 }}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
            >
              Start a project <ArrowRight size={14} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 196,
                    background: "var(--surface)",
                    border: "1px solid var(--border-c)",
                    borderRadius: 10,
                    padding: 6,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
                    listStyle: "none",
                    margin: 0,
                    zIndex: 10,
                  }}
                >
                  {DROPDOWN_ITEMS.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => goToSection(opt.id)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          minHeight: 44,
                          fontSize: 13,
                          color: "var(--mid)",
                          background: "transparent",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "color 0.15s, background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text)";
                          e.currentTarget.style.background = "var(--elevated)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--mid)";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {opt.label}
                        <ArrowRight size={12} />
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: hamburger ── */}
        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden nav-burger"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {/* ── Scroll progress bar (full viewport width, home page only) ── */}
      {isHome && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            width: `${progress}%`,
            background: "var(--gold)",
            transition: "width 0.1s linear",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ══ Mobile menu overlay — rendered into <body> via portal ══ */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              style={{
                position: "fixed",
                top: 64,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 200,
                background: "var(--bg)",
                borderTop: "1px solid var(--border-c)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                display: "flex",
                flexDirection: "column",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "18px 28px 0",
                  paddingBottom: "max(40px, env(safe-area-inset-bottom))",
                }}
              >
                <nav aria-label="Mobile navigation">
                  {NAV_LINKS.map((l, i) => (
                    <motion.div
                      key={l.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {l.to ? (
                        <Link
                          to={l.to}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: "var(--text)",
                            minHeight: 68,
                            borderBottom: "1px solid var(--border-c)",
                            textDecoration: "none",
                          }}
                        >
                          {l.label}
                          <ArrowRight size={16} color="var(--low)" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => goToSection(l.id!)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: "var(--text)",
                            background: "none",
                            border: "none",
                            borderBottom: "1px solid var(--border-c)",
                            minHeight: 68,
                            padding: 0,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          {l.label}
                          <ArrowRight size={16} color="var(--low)" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * NAV_LINKS.length + 0.06, duration: 0.22 }}
                  style={{ marginTop: "auto", marginBottom: 8, display: "flex", flexDirection: "column", gap: 16, paddingTop: 36 }}
                >
                  <button
                    type="button"
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center", height: 56, fontSize: 15 }}
                    onClick={() => goToSection("contact")}
                  >
                    Start a project <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn-outline"
                    style={{ width: "100%", justifyContent: "center", height: 48, fontSize: 14 }}
                    onClick={() => goToSection("pricing")}
                  >
                    View pricing
                  </button>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 4 }}>
                    <span
                      className="lx-pulse"
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }}
                      aria-hidden="true"
                    />
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--low)" }}>
                      Available for new projects
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
