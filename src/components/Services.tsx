import { Globe, Rocket, Palette, Package, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { scrollToSection } from "@/hooks/useScrollTo";

interface Service {
  icon: LucideIcon;
  name: string;
  desc: string;
  tags: string[];
  price: string;
  timeline: string;
}

const services: Service[] = [
  {
    icon: Globe,
    name: "Marketing Website",
    desc: "Fast, conversion-focused websites that make your brand impossible to ignore. Built with React, optimised for Core Web Vitals and search engines from day one.",
    tags: ["React", "Framer Motion", "Vercel"],
    price: "From €1,500",
    timeline: "7–10 days",
  },
  {
    icon: Rocket,
    name: "SaaS Landing Page",
    desc: "High-converting SaaS pages that communicate value in seconds. Analytics-wired and A/B test-ready from launch.",
    tags: ["Next.js", "Analytics", "A/B Testing"],
    price: "From €2,500",
    timeline: "10–14 days",
  },
  {
    icon: Palette,
    name: "Portfolio & Personal Brand",
    desc: "Distinctive personal sites for founders, creatives, and executives. Your story told with precision and craft.",
    tags: ["Custom Design", "CMS", "SEO"],
    price: "From €1,500",
    timeline: "7–10 days",
  },
  {
    icon: Package,
    name: "E-commerce & Product",
    desc: "Lean, product-focused shops that convert browsers into buyers. Optimised for speed, trust, and checkout completion.",
    tags: ["Shopify", "Custom Cart", "Payments"],
    price: "From €3,500",
    timeline: "10–14 days",
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const Icon = service.icon;
  return (
    <article
      ref={ref}
      className="service-card"
      style={{
        background: "var(--card-bg)",
        padding: 36,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s, background 0.25s ease`,
      }}
    >
      <div
        className="icon-box"
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "var(--gold-dim)",
          border: "1px solid var(--border-g)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          transition: "border-color 0.25s ease",
        }}
      >
        <Icon size={18} color="var(--gold)" strokeWidth={1} />
      </div>
      <h3
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 17,
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {service.name}
      </h3>
      <p className="body-sm" style={{ flexGrow: 1, marginBottom: 22 }}>
        {service.desc}
      </p>
      <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 24 }}>
        {service.tags.map((t) => (
          <span
            key={t}
            style={{
              background: "var(--elevated)",
              border: "1px solid var(--border-c)",
              borderRadius: 4,
              padding: "3px 9px",
              fontSize: 11,
              color: "var(--low)",
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        className="flex items-end justify-between"
        style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--border-c)" }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              color: "var(--gold)",
            }}
          >
            {service.price}
          </div>
          <div style={{ fontSize: 11, color: "var(--low)", marginTop: 2 }}>{service.timeline}</div>
        </div>
        <button className="btn-ghost" onClick={() => scrollToSection("contact")}>
          Get a quote <ArrowRight size={12} />
        </button>
      </div>
      <style>{`
        .service-card:hover { background: #F5F5F3 !important; }
        .service-card:hover .icon-box { border-color: rgba(184,150,46,0.40) !important; }
      `}</style>
    </article>
  );
}

export default function Services() {
  const [headRef, headIn] = useInView<HTMLDivElement>();
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad"
      style={{ position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={headRef}
          style={{
            marginBottom: 56,
            maxWidth: 560,
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 14 }}>What we build</p>
          <h2
            id="services-heading"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              maxWidth: 500,
            }}
          >
            Every engagement,
            <br />
            crafted from scratch.
          </h2>
        </div>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--border-c)",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid var(--border-c)",
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 40 }}>
          <span style={{ fontSize: 14, color: "var(--low)" }}>Not sure what fits? </span>
          <button
            className="btn-ghost"
            onClick={() => scrollToSection("contact")}
            style={{ color: "var(--gold)" }}
          >
            Tell us about your project <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .service-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}
