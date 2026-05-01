import { Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Exactly what we needed — delivered ahead of schedule. The quality blew our previous agency out of the water.",
    name: "Thomas K.",
    role: "Founder",
    company: "SaaS Platform",
  },
  {
    quote:
      "We had tried two other developers before Luxiflow. Neither matched the polish or the speed. This is a different league.",
    name: "Sarah M.",
    role: "CEO",
    company: "E-commerce Brand",
  },
  {
    quote:
      "Our conversion rate jumped from day one. The site finally reflects what we actually do — premium, fast, no excuses.",
    name: "Lena B.",
    role: "Co-Founder",
    company: "Wellness Studio",
  },
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-c)",
        borderRadius: 14,
        padding: "36px 32px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Quote
          size={20}
          color="var(--gold)"
          style={{ opacity: 0.7, flexShrink: 0 }}
          aria-hidden="true"
        />
        <div role="img" aria-label="Rated 5 out of 5 stars" style={{ display: "flex", gap: 2 }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} aria-hidden="true" style={{ color: "var(--gold)", fontSize: 12 }}>★</span>
          ))}
        </div>
      </div>
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(15px, 1.5vw, 17px)",
          fontStyle: "italic",
          color: "var(--mid)",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        "{t.quote}"
      </p>
      <div
        style={{
          borderTop: "1px solid var(--border-c)",
          paddingTop: 16,
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "var(--text)",
            margin: "0 0 2px",
          }}
        >
          {t.name}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--low)",
            margin: 0,
          }}
        >
          {t.role} · {t.company}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [headRef, headIn] = useInView<HTMLDivElement>();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-pad"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={headRef}
          className="text-center"
          style={{
            maxWidth: 560,
            margin: "0 auto 56px",
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 18 }}>Client results</p>
          <h2
            id="testimonials-heading"
            className="display-serif"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", margin: 0 }}
          >
            What founders say
            <br />
            after launch day.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
