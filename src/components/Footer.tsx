import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { scrollToSection } from "@/hooks/useScrollTo";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleSection = (id: string) => {
    if (isHome) scrollToSection(id);
    else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    }
  };

  const sectionLabel: React.CSSProperties = {
    fontFamily: "var(--ff-mono)",
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--ls-mono)",
    textTransform: "uppercase",
    color: "var(--low)",
    marginBottom: 20,
  };

  const linkStyle: React.CSSProperties = {
    fontSize: 14,
    color: "var(--low)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "left",
    transition: "color 0.15s",
  };

  const onHover = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--text)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "var(--low)";
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-c)",
        background: "var(--bg)",
        padding: "60px 0 40px",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="footer-grid" style={{ display: "grid", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <Logo />
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--low)",
                maxWidth: 280,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              Premium websites built fast and affordably. AI-powered speed,
              human craft — delivered in 14 days.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a
                href="mailto:hello@luxiflow.io"
                style={{ fontSize: 13, color: "var(--mid)", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mid)")}
              >
                hello@luxiflow.io
              </a>
            </div>
          </div>

          <div>
            <p style={sectionLabel}>Navigation</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {(["services", "process", "pricing", "contact"] as const).map((id) => (
                <li key={id}>
                  <button
                    onClick={() => handleSection(id)}
                    style={linkStyle}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p style={sectionLabel}>Legal</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Cookie Policy", "/cookie-policy"],
                ["Terms of Service", "/terms-of-service"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid var(--border-c)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: 12, color: "var(--low)" }}>
            © {new Date().getFullYear()} Luxiflow. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--low)" }}>
            Hand-crafted in Europe. Zero templates, ever.
          </p>
        </div>
      </div>

    </footer>
  );
}
