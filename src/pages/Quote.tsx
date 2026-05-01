import { useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  AlertCircle,
  Send,
  Clock,
  Shield,
  MessageCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

/* ─────────────────────────── Data ─────────────────────────── */

interface PlanDef {
  name: string;
  price: number | null;
  priceLabel: string;
  timeline: string;
  tagline: string;
  features: string[];
  featured: boolean;
}

const PLANS: Record<string, PlanDef> = {
  starter: {
    name: "Starter",
    price: 299,
    priceLabel: "€299 (first 5 customers, then €399)",
    timeline: "7–10 days",
    tagline: "The fastest path to a professional online presence.",
    featured: false,
    features: [
      "1–3 page website",
      "Mobile-responsive design",
      "Contact form included",
      "SEO foundations",
      "Performance optimised",
      "2 weeks post-launch support",
    ],
  },
  professional: {
    name: "Professional",
    price: 599,
    priceLabel: "From €599",
    timeline: "10–14 days",
    tagline: "Your full brand presence — animated, integrated, ready to convert.",
    featured: true,
    features: [
      "4–8 page website",
      "Custom animations & transitions",
      "CMS integration",
      "Advanced SEO setup",
      "Analytics & tracking setup",
      "Performance optimised (Lighthouse 90+)",
      "30 days post-launch support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: null,
    priceLabel: "Custom pricing",
    timeline: "Custom timeline",
    tagline: "Complex platforms, dedicated management, and ongoing partnership.",
    featured: false,
    features: [
      "Complex web applications",
      "E-commerce & SaaS platforms",
      "Dedicated project manager",
      "Priority delivery",
      "Custom third-party integrations",
      "Ongoing retainer available",
    ],
  },
};

interface AddOnDef {
  id: string;
  name: string;
  desc: string;
  price: number;
  plans: string[];
}

const ADD_ONS: AddOnDef[] = [
  {
    id: "cms",
    name: "CMS / Blog System",
    desc: "Contentful, Sanity, or a custom solution — easy content updates without a developer.",
    price: 350,
    plans: ["starter", "professional"],
  },
  {
    id: "analytics",
    name: "Analytics & Conversion Tracking",
    desc: "GA4, Hotjar, or custom events — fully configured and verified on launch day.",
    price: 250,
    plans: ["starter", "professional"],
  },
  {
    id: "seo-advanced",
    name: "Advanced SEO Package",
    desc: "Schema markup, technical audit, keyword research, and full on-page implementation.",
    price: 400,
    plans: ["starter", "professional"],
  },
  {
    id: "priority",
    name: "Priority Delivery (7 days)",
    desc: "We restructure our schedule to deliver your complete, production-ready site in 7 days.",
    price: 600,
    plans: ["starter", "professional"],
  },
  {
    id: "support-ext",
    name: "Extended 90-Day Support",
    desc: "Triple your post-launch window — three full months of adjustments, no extra charge.",
    price: 300,
    plans: ["starter", "professional"],
  },
  {
    id: "copy",
    name: "Professional Copywriting",
    desc: "We write every word — conversion-focused, brand-aligned, zero AI filler.",
    price: 500,
    plans: ["starter", "professional", "enterprise"],
  },
  {
    id: "email-domain",
    name: "Email & Domain Setup",
    desc: "Professional email (you@yourbrand.com) and domain registration or transfer.",
    price: 150,
    plans: ["starter", "professional", "enterprise"],
  },
];

/* ─────────────────────────── Types ────────────────────────── */

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}
type FormErrors = Partial<Record<keyof FormState, string>>;
type FormTouched = Partial<Record<keyof FormState, boolean>>;

/* ─────────────────────────── Helpers ──────────────────────── */

function validateField(name: keyof FormState, value: string | boolean): string | undefined {
  if (name === "name" && String(value).trim().length < 2)
    return "Please enter your full name.";
  if (name === "email") {
    const v = String(value).trim();
    if (!v) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Please enter a valid email address.";
  }
  if (name === "consent" && !value) return "Please agree to continue.";
  return undefined;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--ff-mono)",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--low)",
  marginBottom: 8,
};

const fieldBase: React.CSSProperties = {
  width: "100%",
  background: "var(--elevated)",
  border: "1px solid var(--border2)",
  borderRadius: 8,
  padding: "13px 16px",
  fontSize: 14,
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

/* ─────────────────────────── Component ────────────────────── */

export default function Quote() {
  const { plan: planParam = "starter" } = useParams<{ plan: string }>();
  const initial = Object.keys(PLANS).includes(planParam) ? planParam : "starter";

  const [planKey, setPlanKey] = useState(initial);
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const planData = PLANS[planKey];
  const isEnterprise = planKey === "enterprise";
  const isFeatured = planData.featured;

  const switchPlan = (key: string) => {
    setPlanKey(key);
    setSelectedAddOns(new Set());
    setShowPlanPicker(false);
  };

  const filteredAddOns = ADD_ONS.filter((a) => a.plans.includes(planKey));
  const addonTotal = ADD_ONS.filter((a) => selectedAddOns.has(a.id)).reduce(
    (s, a) => s + a.price,
    0
  );
  const basePrice = planData.price ?? 0;
  const totalEstimate = basePrice + addonTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const update = (name: keyof FormState, value: string | boolean) => {
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name])
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const onBlur = (name: keyof FormState) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, form[name]) }));
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--gold)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(184,150,46,0.10)";
  };

  const onBlurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.currentTarget.id.replace("q-", "") as keyof FormState;
    const hasErr = !!errors[key];
    e.currentTarget.style.borderColor = hasErr ? "var(--error)" : "var(--border2)";
    e.currentTarget.style.boxShadow = hasErr ? "0 0 0 3px rgba(239,68,68,0.08)" : "none";
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const all: FormErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      consent: validateField("consent", form.consent),
    };
    setErrors(all);
    setTouched({ name: true, email: true, consent: true });
    if (Object.values(all).some(Boolean)) return;

    setLoading(true);
    try {
      const addonNames = ADD_ONS.filter((a) => selectedAddOns.has(a.id)).map((a) => a.name);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          email: form.email,
          budget: `${planData.name} (${planData.priceLabel}${addonTotal > 0 ? ` + €${addonTotal} add-ons` : ""})`,
          phone: form.phone || "Not provided",
          message: [
            `Plan: ${planData.name}`,
            `Add-ons: ${addonNames.length ? addonNames.join(", ") : "None"}`,
            !isEnterprise ? `Estimated total: €${totalEstimate.toLocaleString("en-IE")}` : "",
            form.message ? `\nNotes: ${form.message}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
          to_email: "hello@luxiflow.io",
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSuccess(true);
      toast.success("Quote request sent — we'll respond within 24 hours.");
    } catch (err) {
      console.error("EmailJS failed:", err);
      toast.error("Something went wrong. Please email hello@luxiflow.io directly.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────── Render ─────────── */

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: "100vh" }}>

        {/* ── Page header ── */}
        <section style={{ paddingTop: 96, paddingBottom: 48 }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: 36, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <Link
                to="/"
                style={{ fontSize: 13, color: "var(--low)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--low)")}
              >
                <ArrowLeft size={12} /> Home
              </Link>
              <span style={{ color: "var(--border2)", fontSize: 12 }}>/</span>
              <Link
                to="/#pricing"
                style={{ fontSize: 13, color: "var(--low)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--low)")}
              >
                Pricing
              </Link>
              <span style={{ color: "var(--border2)", fontSize: 12 }}>/</span>
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>
                {planData.name} Quote
              </span>
            </nav>

            {/* Heading */}
            <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>
              Configure your project
            </span>
            <h1
              className="display-serif"
              style={{ fontSize: "clamp(32px, 4vw, 60px)", marginBottom: 18, maxWidth: 660 }}
            >
              Your{" "}
              <span style={{ color: "var(--gold)" }}>{planData.name}</span>{" "}
              quote
            </h1>
            <p className="body-lg" style={{ maxWidth: 520, margin: 0 }}>
              {planData.tagline}{" "}
              <span style={{ color: "var(--low)" }}>
                Pricing adapts to your exact scope — the numbers below are a
                starting point, confirmed after a short discovery call.
              </span>
            </p>
          </div>
        </section>

        {/* ── Two-column main content ── */}
        <section style={{ paddingBottom: 120 }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 quote-grid">

            {/* ═══ LEFT: Plan config ═══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Plan summary card — key triggers lx-fade-up on plan switch */}
              <div
                key={planKey}
                className="lx-fade-up"
                style={{
                  background: "var(--surface)",
                  border: isFeatured
                    ? "2px solid rgba(184,150,46,0.40)"
                    : "1px solid var(--border-c)",
                  borderRadius: 14,
                  padding: "28px 28px 24px",
                  position: "relative",
                  boxShadow: isFeatured
                    ? "0 8px 40px rgba(184,150,46,0.09)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {isFeatured && (
                  <span
                    className="badge-gold"
                    style={{
                      position: "absolute",
                      top: -13,
                      left: 28,
                      background: "var(--surface)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                {/* Plan header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--low)",
                        margin: "0 0 6px",
                      }}
                    >
                      Selected plan
                    </p>
                    <h2
                      style={{
                        fontWeight: 700,
                        fontSize: 22,
                        letterSpacing: "-0.02em",
                        color: isFeatured ? "var(--gold)" : "var(--text)",
                        margin: 0,
                        lineHeight: 1,
                      }}
                    >
                      {planData.name}
                    </h2>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 26,
                        fontWeight: 500,
                        color: isFeatured ? "var(--gold)" : "var(--text)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {planData.priceLabel}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        color: "var(--low)",
                        marginTop: 5,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {planData.timeline}
                    </div>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border-c)", marginBottom: 20 }} />

                {/* Feature list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {planData.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle
                        size={14}
                        color={isFeatured ? "var(--gold)" : "var(--mid)"}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <span style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.55 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Change plan toggle */}
                <button
                  type="button"
                  onClick={() => setShowPlanPicker((v) => !v)}
                  style={{
                    background: showPlanPicker ? "var(--elevated)" : "var(--gold)",
                    border: showPlanPicker ? "1px solid var(--border-c)" : "1px solid var(--gold)",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    color: showPlanPicker ? "var(--text)" : "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.18s ease",
                    boxShadow: showPlanPicker
                      ? "none"
                      : "0 4px 14px rgba(184,150,46,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    if (!showPlanPicker) {
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(184,150,46,0.45)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    if (!showPlanPicker) {
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(184,150,46,0.35)";
                    }
                  }}
                  aria-expanded={showPlanPicker}
                  aria-controls="plan-picker"
                >
                  {showPlanPicker ? "Close" : "Change plan"}
                  <ChevronDown
                    size={14}
                    style={{
                      transform: showPlanPicker ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.22s ease",
                    }}
                  />
                </button>

                {/* Inline plan picker panel */}
                <div
                  id="plan-picker"
                  className={`plan-picker-panel${showPlanPicker ? " open" : ""}`}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {Object.entries(PLANS).map(([key, p]) => {
                      const active = key === planKey;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => switchPlan(key)}
                          style={{
                            background: active
                              ? "rgba(184,150,46,0.07)"
                              : "var(--elevated)",
                            border: active
                              ? "1.5px solid rgba(184,150,46,0.42)"
                              : "1px solid var(--border-c)",
                            borderRadius: 8,
                            padding: "11px 16px",
                            cursor: active ? "default" : "pointer",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                            transition: "border-color 0.15s, background 0.15s",
                          }}
                          aria-pressed={active}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: 13,
                                color: active ? "var(--gold)" : "var(--text)",
                                marginBottom: 2,
                              }}
                            >
                              {p.name}
                              {active && (
                                <span
                                  style={{
                                    fontFamily: "var(--ff-mono)",
                                    fontSize: 9,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--gold)",
                                    marginLeft: 8,
                                    opacity: 0.75,
                                  }}
                                >
                                  Current
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--ff-mono)",
                                fontSize: 10,
                                color: "var(--low)",
                              }}
                            >
                              {p.timeline}
                            </div>
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--ff-mono)",
                              fontSize: 12,
                              fontWeight: 500,
                              color: active ? "var(--gold)" : "var(--mid)",
                              flexShrink: 0,
                            }}
                          >
                            {p.priceLabel}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Add-ons ── */}
              {!isEnterprise && filteredAddOns.length > 0 && (
                <div>
                  <div style={{ marginBottom: 18 }}>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--text)",
                        margin: "0 0 6px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Extend your build
                    </h3>
                    <p className="body-sm" style={{ margin: 0 }}>
                      Optional. Toggle what you need — the estimate updates live.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filteredAddOns.map((addon) => {
                      const on = selectedAddOns.has(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddOn(addon.id)}
                          style={{
                            background: on
                              ? "rgba(184,150,46,0.05)"
                              : "var(--surface)",
                            border: on
                              ? "1.5px solid rgba(184,150,46,0.40)"
                              : "1px solid var(--border-c)",
                            borderRadius: 10,
                            padding: "14px 16px",
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            transition: "border-color 0.18s, background 0.18s",
                          }}
                          aria-pressed={on}
                        >
                          {/* Checkbox visual */}
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 5,
                              border: on ? "none" : "1.5px solid var(--border2)",
                              background: on ? "var(--gold)" : "transparent",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                          >
                            {on ? (
                              <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
                                <path
                                  d="M2 9 L7 14 L16 4"
                                  stroke="#FFFFFF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <Plus size={11} color="var(--low)" strokeWidth={2} />
                            )}
                          </div>

                          {/* Label */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--text)",
                                marginBottom: 2,
                              }}
                            >
                              {addon.name}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--low)", lineHeight: 1.5 }}>
                              {addon.desc}
                            </div>
                          </div>

                          {/* Price */}
                          <div
                            style={{
                              fontFamily: "var(--ff-mono)",
                              fontSize: 13,
                              color: on ? "var(--gold)" : "var(--mid)",
                              fontWeight: 500,
                              flexShrink: 0,
                              transition: "color 0.15s",
                            }}
                          >
                            +€{addon.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Enterprise note */}
              {isEnterprise && (
                <div
                  style={{
                    background: "var(--elevated)",
                    border: "1px solid var(--border-c)",
                    borderRadius: 10,
                    padding: "20px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--low)",
                      marginBottom: 8,
                    }}
                  >
                    Custom scope
                  </p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    Enterprise projects are fully scoped to your requirements. Use the
                    form opposite to describe what you need — we'll prepare a detailed
                    proposal within 24 hours.
                  </p>
                </div>
              )}

              {/* ── Price estimate ── */}
              {!isEnterprise && (
                <div
                  style={{
                    background: isFeatured
                      ? "rgba(184,150,46,0.04)"
                      : "var(--surface)",
                    border: "1px solid var(--border-c)",
                    borderLeft: "3px solid var(--gold)",
                    borderRadius: 10,
                    padding: "20px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--low)",
                      margin: "0 0 10px",
                    }}
                  >
                    Estimated starting from
                  </p>

                  {/* Total — key triggers fade-up on every change */}
                  <div
                    key={totalEstimate}
                    className="lx-fade-up"
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 36,
                      fontWeight: 500,
                      color: "var(--gold)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: addonTotal > 0 ? 14 : 10,
                    }}
                  >
                    €{totalEstimate.toLocaleString("en-IE")}
                  </div>

                  {/* Breakdown when add-ons selected */}
                  {addonTotal > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        marginBottom: 14,
                        paddingBottom: 14,
                        borderBottom: "1px solid var(--border-c)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "var(--low)",
                        }}
                      >
                        <span>{planData.name} base</span>
                        <span>€{basePrice.toLocaleString("en-IE")}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "var(--mid)",
                        }}
                      >
                        <span>
                          Add-ons ({selectedAddOns.size})
                        </span>
                        <span>+€{addonTotal.toLocaleString("en-IE")}</span>
                      </div>
                    </div>
                  )}

                  {/* Negotiation note */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <Sparkles
                      size={12}
                      color="var(--gold)"
                      style={{ flexShrink: 0, marginTop: 1, opacity: 0.7 }}
                    />
                    <p style={{ fontSize: 11, color: "var(--low)", lineHeight: 1.6, margin: 0 }}>
                      Price is discussable. Final quote confirmed after a free 30-minute
                      discovery call — scope changes are always reflected transparently.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ═══ RIGHT: Quote form ═══ */}
            <div className="quote-form-sticky">
              {success ? (
                /* ── Success state ── */
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-c)",
                    borderRadius: 14,
                    padding: "52px 32px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.10)",
                      border: "1px solid rgba(34,197,94,0.28)",
                      marginBottom: 20,
                    }}
                  >
                    <CheckCircle size={26} color="var(--success)" />
                  </div>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 10,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Quote request sent
                  </h3>
                  <p className="body-sm" style={{ marginBottom: 28 }}>
                    We'll review your brief and reply within 24 hours
                    with a tailored proposal.
                  </p>
                  <Link to="/" className="btn-outline">
                    Back to home
                  </Link>
                </div>
              ) : (
                /* ── Form ── */
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-c)",
                    borderRadius: 14,
                    padding: "28px 28px 32px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--text)",
                      margin: "0 0 6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Get your custom quote
                  </h3>
                  <p className="body-sm" style={{ marginBottom: 24 }}>
                    We respond within 24 hours with a tailored proposal.
                  </p>

                  <form
                    onSubmit={onSubmit}
                    noValidate
                    style={{ display: "flex", flexDirection: "column", gap: 16 }}
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="q-name" style={labelStyle}>Full name</label>
                      <input
                        id="q-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => { onBlurStyle(e); onBlur("name"); }}
                        style={{
                          ...fieldBase,
                          borderColor:
                            errors.name && touched.name ? "var(--error)" : "var(--border2)",
                        }}
                        aria-required="true"
                        aria-invalid={!!(errors.name && touched.name)}
                      />
                      {errors.name && touched.name && (
                        <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--error)", marginTop: 6 }}>
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="q-email" style={labelStyle}>Email address</label>
                      <input
                        id="q-email"
                        type="email"
                        autoComplete="email"
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => { onBlurStyle(e); onBlur("email"); }}
                        style={{
                          ...fieldBase,
                          borderColor:
                            errors.email && touched.email ? "var(--error)" : "var(--border2)",
                        }}
                        aria-required="true"
                        aria-invalid={!!(errors.email && touched.email)}
                      />
                      {errors.email && touched.email && (
                        <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--error)", marginTop: 6 }}>
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="q-phone" style={labelStyle}>
                        Phone{" "}
                        <span
                          style={{
                            letterSpacing: 0,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+44 7700 900000"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlurStyle}
                        style={fieldBase}
                      />
                    </div>

                    {/* Project notes */}
                    <div>
                      <label htmlFor="q-message" style={labelStyle}>
                        Project notes{" "}
                        <span
                          style={{
                            letterSpacing: 0,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="q-message"
                        rows={4}
                        placeholder="Anything else you'd like us to know — your audience, goals, or existing brand assets..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlurStyle}
                        style={{ ...fieldBase, resize: "vertical", minHeight: 96 }}
                      />
                    </div>

                    {/* Consent */}
                    <label
                      htmlFor="q-consent"
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
                    >
                      <span style={{ position: "relative", display: "inline-block", flexShrink: 0, marginTop: 2 }}>
                        <input
                          id="q-consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => update("consent", e.target.checked)}
                          style={{ position: "absolute", opacity: 0, width: 18, height: 18, margin: 0, cursor: "pointer" }}
                          aria-required="true"
                        />
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 18,
                            height: 18,
                            borderRadius: 5,
                            background: form.consent ? "var(--gold)" : "var(--elevated)",
                            border: form.consent ? "1px solid var(--gold)" : "1px solid var(--border2)",
                            transition: "all 0.15s",
                          }}
                        >
                          {form.consent && (
                            <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
                              <path d="M2 9 L7 14 L16 4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </span>
                      <span style={{ fontSize: 12, color: "var(--low)", lineHeight: 1.55 }}>
                        I agree to the processing of my data per the{" "}
                        <Link
                          to="/privacy-policy"
                          style={{ color: "var(--mid)", textDecoration: "underline" }}
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && touched.consent && (
                      <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--error)", marginTop: -6 }}>
                        <AlertCircle size={12} /> {errors.consent}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      className="btn-gold"
                      style={{ width: "100%", justifyContent: "center", height: 50, marginTop: 6 }}
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={14} /> Request quote
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust strip */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 9,
                      marginTop: 22,
                      paddingTop: 22,
                      borderTop: "1px solid var(--border-c)",
                    }}
                  >
                    {[
                      { icon: Clock, text: "Response within 24 hours" },
                      { icon: Shield, text: "No payment required to enquire" },
                      { icon: MessageCircle, text: "Free initial email consultation included" },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--low)" }}
                      >
                        <Icon size={12} color="var(--low)" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
