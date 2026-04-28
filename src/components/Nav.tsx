import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { scrollToId } from "@/lib/scroll";

interface NavLink {
  label: string;
  id?: string;
  to?: string;
}

const links: NavLink[] = [
  { label: "Work", to: "/work" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Pricing", id: "pricing" },
  { label: "Journal", to: "/blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setProgress(0); return; }
      const raw = (y / docH) * 100;
      setProgress(raw >= 99.5 ? 100 : Math.min(100, raw));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSection = (id: string) => {
    setOpen(false);
    if (isHome) {
      scrollToId(id, -64);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id, -64), 160);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
      style={{
        background: scrolled
          ? "hsl(var(--background) / 0.86)"
          : "hsl(var(--background) / 0.0)",
        backdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--hairline))" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto max-w-[1440px] h-[var(--nav-h)] px-[var(--container-px)] flex items-center justify-between relative">
        <Logo />

        <ul className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const active = l.to && location.pathname.startsWith(l.to);
            return (
              <li key={l.label}>
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`text-body-sm font-sans-ui transition-colors duration-200 ${
                      active ? "text-ink" : "text-ink-mid hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => l.id && handleSection(l.id)}
                    className="text-body-sm font-sans-ui text-ink-mid hover:text-ink transition-colors duration-200"
                  >
                    {l.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-eyebrow text-[10px] !tracking-[0.16em]">
              Booking May
            </span>
          </div>

          <button
            onClick={() => handleSection("contact")}
            className="lx-btn lx-btn-primary py-2.5 px-5 text-[13px]"
          >
            Start a project
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
        </button>

        {isHome && (
          <span
            aria-hidden="true"
            className="absolute bottom-[-1px] left-0 h-[2px] bg-accent transition-[width] duration-150"
            style={{ width: `${progress}%` }}
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
            className="md:hidden fixed inset-0 top-[var(--nav-h)] z-[99] bg-background flex flex-col items-start justify-start gap-2 px-[var(--container-px)] pt-12"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full border-b border-hairline py-5"
              >
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-[40px] text-ink leading-none"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => l.id && handleSection(l.id)}
                    className="font-display text-[40px] text-ink leading-none"
                  >
                    {l.label}
                  </button>
                )}
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * links.length, duration: 0.4 }}
              className="lx-btn lx-btn-primary mt-8 self-stretch text-base py-4"
              onClick={() => handleSection("contact")}
            >
              Start a project <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
