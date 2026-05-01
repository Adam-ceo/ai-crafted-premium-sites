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
    desc: "A focused email-based deep dive where we extract everything we need — your goals, your audience, your constraints. No lengthy questionnaires. No time-consuming calls. Just efficient communication that keeps the project moving.",
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
  isLast: boolean;
}

function StepItem({ step, index, isLast }: StepItemProps) {
  const [ref, inView] = useInView<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className="process-step"
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr",
        gap: "0 40px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* ── Left column: circle + connector line ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Numbered circle */}
        <div
          className="step-circle"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid rgba(184,150,46,0.35)",
            background: "rgba(184,150,46,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--gold)",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          }}
        >
          {step.n}
        </div>

        {/* Vertical connector — hidden on last step */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 1,
              background: "linear-gradient(to bottom, var(--border-c) 0%, transparent 100%)",
              marginTop: 8,
              minHeight: 48,
            }}
          />
        )}
      </div>

      {/* ── Right column: content ── */}
      <div
        style={{
          paddingBottom: isLast ? 0 : 64,
          paddingTop: 10,
        }}
      >
        {/* Step name row — title left, badge right */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              color: "var(--text)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {step.name}
          </h3>
          <span className="badge-gold" style={{ flexShrink: 0, marginTop: 3 }}>
            {step.days}
          </span>
        </div>

        {/* Description */}
        <p className="body-lg" style={{ marginBottom: 16 }}>
          {step.desc}
        </p>

        {/* Detail note */}
        <p
          style={{
            fontSize: 13,
            color: "var(--low)",
            lineHeight: 1.7,
            borderLeft: "2px solid var(--border-g)",
            paddingLeft: 14,
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {step.detail}
        </p>
      </div>

    </li>
  );
}

export default function Process() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-pad"
      style={{ position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div
          ref={ref}
          style={{
            marginBottom: 72,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>How it works</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "end",
            }}
            className="process-header-grid"
          >
            <h2
              id="process-heading"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                margin: 0,
              }}
            >
              From brief
              <br />
              to live in 14 days.
            </h2>
            <p className="body-lg" style={{ margin: 0 }}>
              A lean, repeatable process designed to eliminate the delays that
              plague traditional agencies — without cutting corners on craft.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((s, i) => (
            <StepItem key={s.n} step={s} index={i} isLast={i === steps.length - 1} />
          ))}
        </ol>
      </div>

    </section>
  );
}
