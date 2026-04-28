import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { scrollToSection } from "@/hooks/useScrollTo";

interface Plan {
  name: string;
  price: string;
  timeline: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const plans: Plan[] = [
  {
    name: "STARTER",
    price: "€1,500",
    timeline: "7–10 days",
    features: [
      "1–3 page website",
      "Mobile-responsive design",
      "Contact form included",
      "SEO foundations",
      "Performance optimised",
      "2 weeks post-launch support",
    ],
    cta: "Get a quote",
    featured: false,
  },
  {
    name: "PROFESSIONAL",
    price: "€3,500",
    timeline: "10–14 days",
    features: [
      "4–8 page website",
      "Custom animations & transitions",
      "CMS integration",
      "Advanced SEO setup",
      "Analytics & tracking setup",
      "Performance optimised (Lighthouse 90+)",
      "30 days post-launch support",
    ],
    cta: "Start your project",
    featured: true,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    timeline: "Custom timeline",
    features: [
      "Complex web applications",
      "E-commerce & SaaS platforms",
      "Dedicated project manager",
      "Priority delivery",
      "Custom third-party integrations",
      "Ongoing retainer available",
    ],
    cta: "Book a call",
    featured: false,
  },
];

interface PricingCardProps {
  plan: Plan;
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`pricing-card ${plan.featured ? "is-featured" : ""}`}
      style={{
        background: plan.featured ? "#141414" : "var(--card-bg)",
        border: plan.featured ? "1px solid rgba(201,168,76,0.30)" : "1px solid var(--border-c)",
        borderRadius: 14,
        padding: "36px 30px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: plan.featured ? "0 0 60px rgba(201,168,76,0.05)" : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.4s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease`,
        willChange: "transform",
      }}
    >
      {plan.featured && (
        <span
          className="badge-gold"
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9,
            padding: "4px 14px",
            background: "#0A0A0A",
          }}
        >
          Most Popular
        </span>
      )}

      <p className="section-label" style={{ marginBottom: 12 }}>{plan.name}</p>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "var(--low)",
          marginBottom: 6,
        }}
      >
        Starting from
      </p>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
          fontSize: plan.featured ? 44 : 40,
          color: plan.featured ? "var(--gold)" : "var(--text)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {plan.price}
      </div>

      <div className="flex items-center" style={{ gap: 6, marginTop: 10 }}>
        <Clock size={11} color="var(--low)" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "var(--low)",
          }}
        >
          {plan.timeline}
        </span>
      </div>

      <div style={{ height: 1, background: "var(--border-c)", margin: "24px 0" }} />

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 11,
          flexGrow: 1,
          marginBottom: 28,
          listStyle: "none",
          padding: 0,
        }}
      >
        {plan.features.map((f) => (
          <li key={f} className="flex items-start" style={{ gap: 10 }}>
            <CheckCircle size={13} color="var(--gold)" style={{ flexShrink: 0, marginTop: 4 }} />
            <span style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.55 }}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollToSection("contact")}
        className={plan.featured ? "btn-gold" : "btn-outline"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {plan.cta} <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default function Pricing() {
  const [headRef, headIn] = useInView<HTMLDivElement>();
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{ padding: "120px 0", position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={headRef}
          style={{
            marginBottom: 64,
            maxWidth: 560,
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>Pricing</p>
          <h2
            id="pricing-heading"
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
            Transparent pricing.
            <br />
            No surprises.
          </h2>
          <p className="body-lg" style={{ maxWidth: 440 }}>
            Every project is scoped individually, but here is what most clients invest.
          </p>
        </div>

        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} index={i} />
          ))}
        </div>

        <p
          className="text-center"
          style={{ marginTop: 28, fontSize: 12, color: "var(--low)" }}
        >
          All prices exclude VAT. Final quote provided after discovery call.
        </p>
      </div>

      <style>{`
        .pricing-card:hover {
          transform: translateY(-4px) !important;
          border-color: var(--border2) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.45) !important;
        }
        .pricing-card.is-featured:hover {
          border-color: rgba(201,168,76,0.55) !important;
          box-shadow: 0 24px 64px rgba(201,168,76,0.12) !important;
        }
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
