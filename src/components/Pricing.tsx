import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "@/hooks/useInView";

interface Plan {
  name: string;
  price: string;
  originalPrice?: string;
  promoNote?: string;
  timeline: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "€299",
    originalPrice: "€399",
    promoNote: "First 5 customers only",
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
    name: "Professional",
    price: "€599",
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
    name: "Enterprise",
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

const PLAN_SLUGS: Record<string, string> = {
  Starter: "starter",
  Professional: "professional",
  Enterprise: "enterprise",
};

function PricingCard({ plan, index }: PricingCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const navigate = useNavigate();
  const slug = PLAN_SLUGS[plan.name] ?? "starter";

  return (
    <div
      ref={ref}
      className={`pricing-card ${plan.featured ? "is-featured" : ""}`}
      style={{
        background: plan.featured ? "var(--surface-warm)" : "var(--card-bg)",
        border: plan.featured
          ? "2px solid rgba(184,150,46,0.40)"
          : "1px solid var(--border-c)",
        borderRadius: 16,
        padding: "32px 28px 28px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: plan.featured
          ? "0 8px 40px rgba(184,150,46,0.10), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.4s ease, border-color 0.25s ease, box-shadow 0.25s ease`,
        willChange: "transform",
      }}
    >
      {/* Most Popular badge */}
      {plan.featured && (
        <span
          className="badge-gold"
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9,
            padding: "4px 16px",
            background: "var(--surface)",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          Most Popular
        </span>
      )}

      {/* ── Tier name — large, bold, high-contrast ── */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.02em",
            color: plan.featured ? "var(--gold)" : "var(--text)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {plan.name}
        </p>
        {plan.featured && (
          <p
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 10,
              color: "var(--gold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 4,
              opacity: 0.7,
            }}
          >
            Recommended
          </p>
        )}
      </div>

      {/* Price block */}
      <div style={{ marginBottom: 6 }}>
        <p
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: 10,
            color: "var(--low)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          Starting from
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--ff-mono)",
              fontWeight: 500,
              fontSize: plan.featured ? 46 : 40,
              color: plan.featured ? "var(--gold)" : "var(--text)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {plan.price}
          </div>
          {plan.originalPrice && (
            <span
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 18,
                color: "var(--low)",
                textDecoration: "line-through",
              }}
            >
              {plan.originalPrice}
            </span>
          )}
        </div>
        {plan.promoNote && (
          <p
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 10,
              color: "var(--gold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            {plan.promoNote}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="flex items-center" style={{ gap: 6, marginBottom: 24 }}>
        <Clock size={11} color="var(--low)" />
        <span
          style={{
            fontFamily: "var(--ff-mono)",
            fontSize: 11,
            color: "var(--low)",
          }}
        >
          {plan.timeline}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: plan.featured ? "rgba(184,150,46,0.18)" : "var(--border-c)",
          marginBottom: 24,
        }}
      />

      {/* Feature list */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flexGrow: 1,
          marginBottom: 28,
          listStyle: "none",
          padding: 0,
          margin: "0 0 28px 0",
        }}
      >
        {plan.features.map((f) => (
          <li key={f} className="flex items-start" style={{ gap: 10 }}>
            <CheckCircle
              size={14}
              color={plan.featured ? "var(--gold)" : "var(--mid)"}
              style={{ flexShrink: 0, marginTop: 3 }}
            />
            <span
              style={{
                fontSize: 13,
                color: plan.featured ? "var(--text)" : "var(--mid)",
                lineHeight: 1.55,
                fontWeight: plan.featured ? 450 : 400,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => navigate(`/quote/${slug}`)}
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
      className="section-pad"
      style={{ position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
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
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: 18,
            }}
          >
            Transparent pricing.
            <br />
            No surprises.
          </h2>
          <p className="body-lg" style={{ maxWidth: 440, margin: 0 }}>
            Every project is scoped individually, but here is what most clients invest.
          </p>
        </div>

        {/* Cards */}
        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
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

    </section>
  );
}
