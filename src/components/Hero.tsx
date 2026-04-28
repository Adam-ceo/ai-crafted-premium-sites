import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Container, Eyebrow, NumberDisplay, Text } from "./ui/primitives";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useLineReveal } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";

const PaperShader = lazy(() => import("./canvas/PaperShader"));

const ROTATING = ["websites.", "landing pages.", "portfolios.", "stores."];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduced;
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-block relative align-baseline">
      <span aria-hidden className="invisible whitespace-nowrap">
        landing pages.
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <motion.span
          key={ROTATING[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="block italic text-accent whitespace-nowrap"
        >
          {ROTATING[i]}
        </motion.span>
      </span>
    </span>
  );
}

function MagneticCTA({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLButtonElement>(0.2, 80);
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`lx-btn ${variant === "primary" ? "lx-btn-primary" : "lx-btn-outline"} px-6 py-3.5`}
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const reveal = useLineReveal<HTMLHeadingElement>({ delay: 0.2, stagger: 0.09 });

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex flex-col pt-[var(--nav-h)] pb-12 overflow-hidden"
    >
      {/* Animated paper shader background */}
      {!reduced && (
        <Suspense fallback={null}>
          <PaperShader />
        </Suspense>
      )}

      {/* Faint editorial grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--hairline)) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />

      <Container className="flex-1 flex flex-col justify-center pt-12 lg:pt-20">
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-12 lg:mb-16"
        >
          <Eyebrow accent>Independent AI-native web studio</Eyebrow>
          <span className="hairline-vert h-3 hidden sm:block" />
          <span className="text-eyebrow text-[10px]">Est. 2025 · Europe</span>
          <span className="hairline-vert h-3 hidden sm:block" />
          <span className="text-eyebrow text-[10px]">№ 001 — Edition Light</span>
        </motion.div>

        {/* Headline */}
        <h1
          ref={reveal}
          id="hero-heading"
          className="font-display text-display-xl text-ink mb-10 lg:mb-12 max-w-[14ch]"
        >
          <span className="lx-reveal-line">
            <span className="lx-reveal-inner">Premium</span>
          </span>
          <span className="lx-reveal-line">
            <span className="lx-reveal-inner">
              <RotatingWord />
            </span>
          </span>
          <span className="lx-reveal-line">
            <span className="lx-reveal-inner">
              <span className="text-ink-mid">Shipped in </span>
              <span className="font-display-italic">14 days</span>
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        {/* Sub + CTA + meta in a 12-col grid */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-5"
          >
            <Text variant="lg" tone="mid" className="max-w-[42ch] mb-8">
              We design and build bespoke websites for founders who want results —
              AI-assisted speed, hand-finished detail. Starting at{" "}
              <span className="text-ink font-medium">€1,500</span>.
            </Text>
            <div className="flex flex-wrap gap-3">
              <MagneticCTA onClick={() => scrollToId("contact", -64)}>
                Start a project <ArrowUpRight size={15} strokeWidth={1.8} />
              </MagneticCTA>
              <MagneticCTA variant="outline" onClick={() => scrollToId("process", -64)}>
                See how we work
              </MagneticCTA>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
          >
            <div className="hairline mb-6" />
            <dl className="grid grid-cols-3 gap-8">
              {[
                { n: "14", u: "days", l: "Average delivery" },
                { n: "98", u: "Lighthouse", l: "Performance floor" },
                { n: "100%", u: "custom", l: "No templates, ever" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <NumberDisplay value={s.n} unit={s.u} size="sm" />
                    <p className="text-caption text-ink-low mt-2">{s.l}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-auto pt-16 lg:pt-24 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-eyebrow mb-2.5">— Selected for</p>
            <p className="font-display text-[clamp(20px,2.4vw,32px)] text-ink leading-tight">
              Founders building at speed,{" "}
              <span className="text-ink-mid italic">across Europe.</span>
            </p>
          </div>

          <button
            onClick={() => scrollToId("services", -64)}
            aria-label="Scroll to services"
            className="hidden md:inline-flex flex-col items-center gap-2 text-ink-mid hover:text-ink transition-colors group"
          >
            <span className="text-eyebrow text-[10px] !tracking-[0.2em]">Scroll</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
