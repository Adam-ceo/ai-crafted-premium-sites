import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { scrollToSection } from "@/hooks/useScrollTo";

export default function CtaBanner() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section
      aria-labelledby="cta-heading"
      style={{ padding: "100px 0", textAlign: "center" }}
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
        <p className="section-label" style={{ marginBottom: 18 }}>Start today</p>
        <h2
          id="cta-heading"
          className="display-serif"
          style={{
            fontSize: "clamp(38px, 5vw, 72px)",
            margin: "0 auto 24px",
            maxWidth: 640,
          }}
        >
          Your next website,
          <br />
          <span style={{ color: "var(--gold)" }}>done in 14 days.</span>
        </h2>
        <p className="body-lg" style={{ maxWidth: 380, margin: "0 auto 40px" }}>
          No templates. No delays. Just a fast, beautiful website that works as
          hard as you do.
        </p>
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
