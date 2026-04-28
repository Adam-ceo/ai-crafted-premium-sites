import { useInView } from "@/hooks/useInView";

interface Step {
  n: string;
  days: string;
  name: string;
  desc: string;
  detail: string;
}

const steps: Step[] = [
  {
    n: "01",
    days: "Days 1–2",
    name: "Discovery & Brief",
    desc: "A focused 60-minute call where we extract everything we need — your goals, your audience, your constraints. No lengthy questionnaires. No wasted weeks.",
    detail: "You receive a written brief summary for approval before we proceed.",
  },
  {
    n: "02",
    days: "Days 3–5",
    name: "Design & Prototype",
    desc: "AI-assisted wireframes in hours, not weeks. We present a clear design direction for your review. One round of revisions included.",
    detail: "You approve the design before a single line of production code is written.",
  },
  {
    n: "03",
    days: "Days 6–12",
    name: "Development",
    desc: "Clean, component-based code built to your approved design. Performance enforced at every step — Lighthouse 90+ on every deliverable.",
    detail: "Mobile-first, accessible, and optimised for search engines out of the box.",
  },
  {
    n: "04",
    days: "Days 13–14",
    name: "QA & Launch",
    desc: "Cross-browser testing, accessibility audit, final review, and deployment. Full ownership handed to you on launch day.",
    detail: "We stay on-hand for 30 days post-launch to handle any adjustments at no extra cost.",
  },
];

interface StepItemProps {
  step: Step;
  index: number;
}

function StepItem({ step, index }: StepItemProps) {
  const [ref, inView] = useInView<HTMLLIElement>();
  const reversed = index % 2 === 1;

  return (
    <li
      ref={ref}
      className="step-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        borderBottom: index < steps.length - 1 ? "1px solid var(--border-c)" : "none",
        paddingBottom: 96,
        marginBottom: index < steps.length - 1 ? 96 : 0,
      }}
    >
      <div
        className="step-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        {/* Title block */}
        <div
          className="step-title-block"
          style={{ position: "relative", order: reversed ? 2 : 1 }}
        >
          <span
            className="badge-gold"
            style={{
              position: "absolute",
              top: 0,
              [reversed ? "left" : "right"]: 0,
            } as React.CSSProperties}
          >
            {step.days}
          </span>
          <div
            aria-hidden="true"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 72,
              fontWeight: 300,
              color: "#1A1A1A",
              position: "absolute",
              top: -8,
              ...(reversed ? { right: -4 } : { left: -4 }),
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {step.n}
          </div>
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "var(--text)",
              lineHeight: 1.25,
              marginTop: 50,
              letterSpacing: "-0.01em",
              position: "relative",
              zIndex: 1,
            }}
          >
            {step.name}
          </h3>
        </div>

        {/* Description block */}
        <div style={{ paddingTop: 4, order: reversed ? 1 : 2 }}>
          <p className="body-lg" style={{ marginBottom: 16 }}>{step.desc}</p>
          <p
            style={{
              fontSize: 13,
              color: "var(--low)",
              lineHeight: 1.7,
              borderLeft: "2px solid var(--border-g)",
              paddingLeft: 16,
              fontStyle: "italic",
            }}
          >
            {step.detail}
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .step-item .step-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .step-item .step-title-block,
          .step-item .step-grid > div {
            order: unset !important;
          }
          .step-item .step-title-block { padding-top: 56px; }
          .step-item .step-title-block > .badge-gold {
            position: static !important;
            display: inline-flex;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </li>
  );
}

export default function Process() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      style={{ padding: "120px 0", position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={ref}
          style={{
            marginBottom: 80,
            maxWidth: 560,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>How it works</p>
          <h2
            id="process-heading"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 18,
            }}
          >
            From brief to live
            <br />
            in 14 days.
          </h2>
          <p className="body-lg" style={{ maxWidth: 400 }}>
            A lean, repeatable process designed to eliminate the delays that
            plague traditional agencies.
          </p>
        </div>

        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((s, i) => (
            <StepItem key={s.n} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
