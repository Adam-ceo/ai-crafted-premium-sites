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
    desc: "We scope your project upfront and stick to it. No \u2018just one more change\u2019 invoices. No scope creep.",
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
        background: "#0A0A0A",
        padding: "40px 36px",
        position: "relative",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Large ghost number — decorative, top-right */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -8,
            right: -4,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 80,
            color: "#161616",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {item.n}
        </div>
        {/* Gold accent rule replaces the dim small number */}
        <div style={{ width: 24, height: 1, background: "var(--gold)", opacity: 0.5, marginBottom: 22 }} />
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: 17,
            color: "var(--text)",
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p className="body-sm">{item.desc}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const [headRef, headIn] = useInView<HTMLDivElement>();
  return (
    <section
      aria-labelledby="why-heading"
      style={{
        padding: "120px 0",
        background: "#0B0B0B",
        borderTop: "1px solid var(--border-c)",
        borderBottom: "1px solid var(--border-c)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={headRef}
          style={{
            marginBottom: 56,
            maxWidth: 460,
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
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            The honest difference.
          </h2>
        </div>

        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            background: "var(--border-c)",
            overflow: "hidden",
            borderRadius: 14,
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
