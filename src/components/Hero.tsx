import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import Terminal from "./Terminal";
import { scrollToSection } from "@/hooks/useScrollTo";

const ROTATING = ["websites", "landing pages", "portfolios", "online stores"];
const LONGEST = ROTATING.reduce((a, b) => a.length > b.length ? a : b);

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-grid", verticalAlign: "baseline" }}>
      <span aria-hidden style={{ visibility: "hidden", gridArea: "1/1", whiteSpace: "nowrap" }}>
        {LONGEST}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING[i]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "var(--gold)", display: "block", gridArea: "1/1", whiteSpace: "nowrap" }}
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative hero-section"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 hero-grid">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-7"
          >
            <span style={{ width: 1, height: 24, background: "var(--gold)" }} aria-hidden="true" />
            <span className="eyebrow">AI-Powered Web Development</span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="display-serif mb-7"
            style={{ fontSize: "clamp(46px, 5.5vw, 82px)" }}
          >
            Premium <RotatingWord />
            <br />
            built in 14 days.
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="body-lg mb-9"
            style={{ maxWidth: 460 }}
          >
            We design and build bespoke, high-performance websites for founders
            who want results — using AI to deliver faster, without cutting
            corners on craft. Starting at{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>€299</strong>.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button className="btn-gold" onClick={() => scrollToSection("contact")}>
              Start your project <ArrowRight size={14} />
            </button>
            <button className="btn-dark" onClick={() => scrollToSection("process")}>
              How it works
            </button>
          </motion.div>

        </motion.div>

        {/* RIGHT — Comparison card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--border-c)",
              background: "var(--card-bg)",
              boxShadow: "0 10px 40px -20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "var(--gold)",
                padding: "18px 24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                The Luxiflow Difference
              </span>
            </div>

            {/* Column headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr 1fr",
                padding: "16px 24px",
                borderBottom: "1px solid var(--border-c)",
                alignItems: "center",
              }}
            >
              <span />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--low)",
                }}
              >
                ✕ Typical Agency
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                }}
              >
                ✓ Luxiflow
              </span>
            </div>

            {/* Rows */}
            {[
              { label: "Timeline", bad: "8–12 weeks", good: "14 days" },
              { label: "Starting", bad: "€8,000+", good: "From €299" },
              { label: "Design", bad: "Template-based", good: "100% custom" },
              { label: "Performance", bad: "60–80 score", good: "100/100" },
              { label: "Revisions", bad: "Limited rounds", good: "Until perfect" },
            ].map((row, idx, arr) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr 1fr",
                  padding: "18px 24px",
                  borderBottom: idx < arr.length - 1 ? "1px solid var(--border-c)" : "none",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--low)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 14,
                    color: "var(--low)",
                    textDecoration: "line-through",
                  }}
                >
                  {row.bad}
                </span>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 14,
                    color: "var(--text)",
                    fontWeight: 500,
                  }}
                >
                  {row.good}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
