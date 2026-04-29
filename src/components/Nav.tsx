import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { scrollToSection } from "@/hooks/useScrollTo";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Pricing", id: "pricing" },
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

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

  const goToSection = (id: string) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 120);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: "rgba(247,247,245,0.94)",
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
        <Link to="/" aria-label="Luxiflow home" style={{ flexShrink: 0, lineHeight: 0 }}>
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
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 450,
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
                    onClick={() => goToSection(l.id!)}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 450,
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
          {/* Available indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span
              className="lx-pulse"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--low)" }}>
              Available
            </span>
          </div>

          {/* CTA + dropdown — click-only, works on touch too */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className="btn-gold"
              style={{ padding: "9px 18px", fontSize: 13 }}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
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
                          fontFamily: "'Manrope', sans-serif",
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

        {/* ── Mobile: hamburger only ── */}
        <button
          className="md:hidden"
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            width: 44,
            height: 44,
            position: "relative",
            zIndex: 101,
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: menuOpen ? "var(--surface)" : "var(--elevated)",
            border: "1px solid var(--border-c)",
            borderRadius: 8,
            cursor: "pointer",
            color: "var(--text)",
            touchAction: "manipulation",
            transition: "background 0.15s, border-color 0.15s",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </motion.span>
          </AnimatePresence>
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

      {/* ══ Mobile menu overlay ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "rgba(247,247,245,0.985)",
              borderTop: "1px solid var(--border-c)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
              display: "flex",
              flexDirection: "column",
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
              {/* Nav links */}
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -12 }}
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
                          fontFamily: "'Manrope', sans-serif",
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
                        onClick={() => goToSection(l.id!)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontFamily: "'Manrope', sans-serif",
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

              {/* Spacer + CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * NAV_LINKS.length + 0.08, duration: 0.22 }}
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
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--low)" }}>
                    Available for new projects
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
