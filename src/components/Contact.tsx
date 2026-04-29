import { useState, FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useInView } from "@/hooks/useInView";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'JetBrains Mono', monospace",
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
  padding: "14px 18px",
  fontFamily: "'Manrope', sans-serif",
  fontSize: 15,
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const errorStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  color: "var(--error)",
  marginTop: 8,
  fontFamily: "'Manrope', sans-serif",
};

type FormState = {
  name: string;
  email: string;
  budget: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof FormState, string>>;
type Touched = Partial<Record<keyof FormState, boolean>>;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [headRef, headIn] = useInView<HTMLDivElement>();
  const [boxRef, boxIn] = useInView<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", budget: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validateField = (name: keyof FormState, value: string | boolean): string | undefined => {
    if (name === "name") {
      const v = String(value).trim();
      if (v.length < 2) return "Please enter your full name.";
    }
    if (name === "email") {
      const v = String(value).trim();
      if (!v) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
    }
    if (name === "message") {
      const v = String(value).trim();
      if (v.length < 20) return "Please describe your project (at least 20 characters).";
    }
    if (name === "consent" && !value) return "Please agree to continue.";
    return undefined;
  };

  const validateAll = (): Errors => ({
    name: validateField("name", form.name),
    email: validateField("email", form.email),
    message: validateField("message", form.message),
    consent: validateField("consent", form.consent),
  });

  const onBlur = (name: keyof FormState) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, form[name]) }));
  };

  const update = (name: keyof FormState, value: string | boolean) => {
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const all = validateAll();
    setErrors(all);
    setTouched({ name: true, email: true, message: true, consent: true });
    if (Object.values(all).some(Boolean)) return;

    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          email: form.email,
          budget: form.budget || "Not specified",
          message: form.message,
          to_email: "hello@luxiflow.io",
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSuccess(true);
      toast.success("Brief sent — we will respond within 24 hours.");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      toast.error("Something went wrong. Please email hello@luxiflow.io directly.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setForm({ name: "", email: "", budget: "", message: "", consent: false });
    setErrors({});
    setTouched({});
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--gold)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(184,150,46,0.10)";
  };
  const onBlurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.currentTarget.id.replace("contact-", "") as keyof FormState;
    const hasError = !!errors[fieldName];
    e.currentTarget.style.borderColor = hasError ? "var(--error)" : "var(--border2)";
    e.currentTarget.style.boxShadow = hasError ? "0 0 0 3px rgba(239,68,68,0.08)" : "none";
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div
          ref={headRef}
          className="text-center"
          style={{
            maxWidth: 640,
            margin: "0 auto 56px",
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.55s ease",
          }}
        >
          <p className="section-label" style={{ marginBottom: 18 }}>Get in touch</p>
          <h2
            id="contact-heading"
            className="display-serif"
            style={{
              fontSize: "clamp(32px, 4.5vw, 60px)",
              marginBottom: 20,
            }}
          >
            Ready to build something remarkable?
          </h2>
          <p className="body-lg" style={{ maxWidth: 420, margin: "0 auto" }}>
            Tell us about your project. We will respond within 24 hours.
          </p>
        </div>

        <div
          ref={boxRef}
          style={{
            maxWidth: 540,
            margin: "0 auto",
            opacity: boxIn ? 1 : 0,
            transform: boxIn ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {success ? (
            <div
              className="text-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-c)",
                borderRadius: 14,
                padding: "56px 40px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.10)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  marginBottom: 20,
                }}
              >
                <CheckCircle size={28} color="var(--success)" />
              </div>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                Brief received
              </h3>
              <p className="body-sm" style={{ marginBottom: 28 }}>
                Thank you. We will review your brief and reply within 24 hours.
              </p>
              <button onClick={reset} className="btn-outline">
                Send another brief
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-c)",
                borderRadius: 14,
                padding: "clamp(28px, 5vw, 44px) clamp(22px, 5vw, 40px) clamp(32px, 5vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Full name</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  onFocus={onFocus}
                  onBlur={(e) => { onBlurStyle(e); onBlur("name"); }}
                  style={{
                    ...fieldBase,
                    borderColor: errors.name && touched.name ? "var(--error)" : "var(--border2)",
                  }}
                  aria-required="true"
                  aria-invalid={!!(errors.name && touched.name)}
                  aria-describedby={errors.name && touched.name ? "err-name" : undefined}
                />
                {errors.name && touched.name && (
                  <p id="err-name" style={errorStyle}>
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onFocus={onFocus}
                  onBlur={(e) => { onBlurStyle(e); onBlur("email"); }}
                  style={{
                    ...fieldBase,
                    borderColor: errors.email && touched.email ? "var(--error)" : "var(--border2)",
                  }}
                  aria-required="true"
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? "err-email" : undefined}
                />
                {errors.email && touched.email && (
                  <p id="err-email" style={errorStyle}>
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-budget" style={labelStyle}>Budget range</label>
                <select
                  id="contact-budget"
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlurStyle}
                  style={{
                    ...fieldBase,
                    appearance: "none",
                    cursor: "pointer",
                    paddingRight: 44,
                    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A5A58' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 18px center",
                  }}
                >
                  <option value="">Select a range</option>
                  <option value="<1k">Under €1,000</option>
                  <option value="1-3k">€1,000 – €3,000</option>
                  <option value="3-6k">€3,000 – €6,000</option>
                  <option value="6k+">€6,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" style={labelStyle}>Project description</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us what you are building, who it is for, and what success looks like."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onFocus={onFocus}
                  onBlur={(e) => { onBlurStyle(e); onBlur("message"); }}
                  style={{
                    ...fieldBase,
                    resize: "vertical",
                    minHeight: 120,
                    borderColor: errors.message && touched.message ? "var(--error)" : "var(--border2)",
                  }}
                  aria-required="true"
                  aria-invalid={!!(errors.message && touched.message)}
                  aria-describedby={errors.message && touched.message ? "err-message" : undefined}
                />
                {errors.message && touched.message && (
                  <p id="err-message" style={errorStyle}>
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              <label
                htmlFor="contact-consent"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                <span style={{ position: "relative", display: "inline-block", flexShrink: 0, marginTop: 2 }}>
                  <input
                    id="contact-consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: 18,
                      height: 18,
                      margin: 0,
                      cursor: "pointer",
                    }}
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
                      transition: "all 0.15s ease",
                    }}
                  >
                    {form.consent && (
                      <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                        <path d="M2 9 L7 14 L16 4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </span>
                <span style={{ fontSize: 13, color: "var(--low)", lineHeight: 1.55 }}>
                  I agree to the processing of my personal data in accordance with the{" "}
                  <Link to="/privacy-policy" style={{ color: "var(--mid)", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/cookie-policy" style={{ color: "var(--mid)", textDecoration: "underline" }}>
                    Cookie Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && touched.consent && (
                <p style={errorStyle}>
                  <AlertCircle size={12} /> {errors.consent}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="btn-gold"
                style={{ width: "100%", justifyContent: "center", height: 52, marginTop: 8 }}
              >
                {loading ? "Sending..." : (
                  <>
                    Send brief <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
