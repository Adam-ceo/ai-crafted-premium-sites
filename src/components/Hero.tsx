import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Terminal from "./Terminal";
import { scrollToSection } from "@/hooks/useScrollTo";

const ROTATING = ["websites", "landing pages", "portfolios", "online stores"];
const LONGEST = ROTATING.reduce((a, b) => a.length > b.length ? a : b);

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-grid", verticalAlign: "baseline" }}>
      {/* invisible sizer keeps width stable across all words */}
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
      className="relative"
      style={{ paddingTop: 80, paddingBottom: 32 }}
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
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>€1,500</strong>.
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

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            style={{ borderTop: "1px solid var(--border-c)", paddingTop: 20, marginTop: 8 }}
          >
            <div className="flex items-center" style={{ gap: 28 }}>
              {[
                { n: "14", u: "days", l: "average delivery" },
                { n: "€1.5k", u: "", l: "starting price" },
                { n: "100%", u: "", l: "custom code" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center" style={{ gap: 28 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 18,
                          color: "var(--gold)",
                          lineHeight: 1,
                        }}
                      >
                        {s.n}
                      </div>
                      {s.u && (
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--low)" }}>
                          {s.u}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 11,
                        color: "var(--low)",
                        marginTop: 4,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                  {i < 2 && <span style={{ width: 1, height: 28, background: "var(--border-c)" }} />}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--low)", marginTop: 16 }}>
              <span aria-hidden="true">🇬🇧 🇩🇪 🇭🇺 🇳🇱</span>
              <span style={{ marginLeft: 8 }}>Serving founders across Europe</span>
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal />
          <div
            style={{
              marginTop: 20,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid var(--border-c)",
              borderTop: "1px solid var(--border-g)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 1,
              background: "var(--border-c)",
            }}
          >
            {[
              { n: "14", u: "days", l: "avg. delivery" },
              { n: "€1.5k", u: "", l: "no hidden fees" },
              { n: "100%", u: "custom", l: "zero templates" },
            ].map((c) => (
              <div key={c.l} style={{ background: "var(--card-bg)", padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 24,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {c.n}
                  </span>
                  {c.u && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "var(--low)",
                      }}
                    >
                      {c.u}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    color: "var(--low)",
                    marginTop: 4,
                  }}
                >
                  {c.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <button
        className="lx-bounce hidden lg:inline-flex"
        onClick={() => scrollToSection("services")}
        aria-label="Scroll to services"
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
          border: "none",
          color: "var(--low)",
          cursor: "pointer",
          padding: 8,
          zIndex: 2,
        }}
      >
        <ChevronDown size={20} />
      </button>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
