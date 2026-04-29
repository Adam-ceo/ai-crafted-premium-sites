import { useState } from "react";
import { useInView } from "@/hooks/useInView";

interface Item {
  n: string;
  title: string;
  desc: string;
}

const items: Item[] = [
  {
    n: "01",
    title: "No templates. Ever.",
    desc: "Every site we build is coded from a blank file. No drag-and-drop builders, no recycled layouts. Just your brand, built right.",
  },
  {
    n: "02",
    title: "Speed without sacrifice.",
    desc: "AI handles the repetitive parts. We handle the parts that make a website actually good. The result: agency quality at freelancer speed.",
  },
  {
    n: "03",
    title: "Fixed scope, fixed price.",
    desc: "We scope your project upfront and stick to it. No 'just one more change' invoices. No scope creep.",
  },
  {
    n: "04",
    title: "You own everything.",
    desc: "Your site, your code, your hosting. Full ownership on launch day. No lock-in, no recurring platform fees.",
  },
];

interface WhyItemProps {
  item: Item;
  index: number;
}

function WhyItem({ item, index }: WhyItemProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface)",
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s, box-shadow 0.25s ease`,
        boxShadow: hover ? "inset 0 0 0 1px rgba(184,150,46,0.20)" : "inset 0 0 0 1px transparent",
      }}
    >
      {/* Hover gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(184,150,46,0.05) 0%, transparent 55%)",
          pointerEvents: "none",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Card content — number in its own fixed column, never overlapping text */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 24 }}>

        {/* Number column — fixed width, clearly separated */}
        <div
          style={{
            flexShrink: 0,
            width: 36,
            paddingTop: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gold)",
              letterSpacing: "0.06em",
              display: "block",
            }}
          >
            {item.n}
          </span>
        </div>

        {/* Content column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "var(--text)",
              marginBottom: 10,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </h3>
          <p className="body-sm" style={{ margin: 0 }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const [headRef, headIn] = useInView<HTMLDivElement>();
  return (
    <section
      aria-labelledby="why-heading"
      className="section-pad"
      style={{
        background: "var(--elevated)",
        borderTop: "1px solid var(--border-c)",
        borderBottom: "1px solid var(--border-c)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          ref={headRef}
          style={{
            marginBottom: 56,
            maxWidth: 520,
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>Why Luxiflow</p>
          <h2
            id="why-heading"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: 0,
            }}
          >
            The honest difference.
          </h2>
        </div>

        {/* 2×2 grid */}
        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            background: "var(--border-c)",
            overflow: "hidden",
            borderRadius: 14,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {items.map((it, i) => (
            <WhyItem key={it.n} item={it} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
