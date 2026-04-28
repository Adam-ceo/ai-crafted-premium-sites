import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { scrollToSection } from "@/hooks/useScrollTo";

const links = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Pricing", id: "pricing" },
  { label: "Blog", to: "/blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setProgress(0); return; }
      const raw = (y / docH) * 100;
      // Browsers stop 1–2px short of true bottom — snap to 100 when close
      setProgress(raw >= 99.5 ? 100 : Math.min(100, raw));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const goToSection = (id: string) => {
    setOpen(false);
    setDropdownOpen(false);
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    }
  };

  const onLinkClick = (e: React.MouseEvent, l: { id?: string; to?: string }) => {
    if (l.id) {
      e.preventDefault();
      goToSection(l.id);
    } else {
      setOpen(false);
    }
  };

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdownDelayed = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };
  const toggleDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen((v) => !v);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: "rgba(10,10,10,0.94)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid var(--border-c)" : "1px solid transparent",
        transition: "border-color 0.2s",
      }}
    >
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between relative">
        <Link to="/" aria-label="Luxiflow home">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const active =
              (l.to && location.pathname.startsWith(l.to)) ||
              false;
            const baseColor = active ? "#F0F0F0" : "var(--mid)";
            if (l.to) {
              return (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="transition-colors duration-150"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      color: baseColor,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F0F0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={l.label}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => onLinkClick(e, l)}
                  className="transition-colors duration-150"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--mid)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F0F0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mid)")}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span
              className="lx-pulse"
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--low)",
              }}
            >
              Available
            </span>
          </div>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdownDelayed}
          >
            <button
              className="btn-gold"
              style={{ padding: "9px 18px", fontSize: 13 }}
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Start a project <ArrowRight size={14} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2"
                  style={{
                    width: 200,
                    background: "var(--surface)",
                    border: "1px solid var(--border-c)",
                    borderRadius: 8,
                    padding: 6,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {[
                    { label: "Send a brief", id: "contact" },
                    { label: "View pricing", id: "pricing" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => goToSection(opt.id)}
                      className="w-full flex items-center justify-between transition-colors"
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: "var(--mid)",
                        background: "transparent",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#F0F0F0";
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
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center"
          style={{ width: 44, height: 44, color: "#F0F0F0", background: "transparent", border: "none" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isHome && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -1,
              left: 0,
              height: 1,
              width: `${progress}%`,
              background: "var(--gold)",
              transition: "width 0.1s linear",
            }}
          />
        )}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 z-[99] flex flex-col items-center justify-center gap-8 px-6"
            style={{
              top: 64,
              bottom: 0,
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 * i, duration: 0.3 }}
              >
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 30,
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => onLinkClick(e, l)}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 30,
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {l.label}
                  </a>
                )}
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * links.length, duration: 0.3 }}
              className="btn-gold mt-4"
              onClick={() => goToSection("contact")}
            >
              Start a project <ArrowRight size={14} />
            </motion.button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.07 * links.length + 0.15, duration: 0.3 }}
              className="flex items-center gap-2 mt-2"
            >
              <span
                className="lx-pulse"
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--gold)",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--low)",
              }}>
                Available for new projects
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
