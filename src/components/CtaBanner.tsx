import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { scrollToSection } from "@/hooks/useScrollTo";

const trustItems = [
  { icon: Clock, text: "14-day delivery guarantee" },
  { icon: Shield, text: "Fixed price, no surprises" },
  { icon: Zap, text: "Lighthouse 90+ on every build" },
];

export default function CtaBanner() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section
      aria-labelledby="cta-heading"
      className="section-pad"
      style={{ textAlign: "center" }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-6 md:px-10"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
        }}
      >
        <p className="section-label" style={{ marginBottom: 18 }}>Still deciding?</p>
        <h2
          id="cta-heading"
          className="display-serif"
          style={{
            fontSize: "clamp(36px, 5vw, 68px)",
            margin: "0 auto 20px",
            maxWidth: 680,
          }}
        >
          Every week without a great site
          <br />
          <span style={{ color: "var(--gold)" }}>is a client you're not getting.</span>
        </h2>
        <p className="body-lg" style={{ maxWidth: 400, margin: "0 auto 36px" }}>
          Let's build something you'll be proud to share. From brief to live in 14 days — guaranteed.
        </p>

        {/* Trust indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {trustItems.map(({ icon: Icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--mid)",
              }}
            >
              <Icon size={14} color="var(--gold)" />
              {text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button className="btn-gold" onClick={() => scrollToSection("contact")}>
            Start your project <ArrowRight size={14} />
          </button>
          <Link to="/blog" className="btn-outline">
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
