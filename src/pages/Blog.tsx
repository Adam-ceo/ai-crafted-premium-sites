import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";

const categoryColors: Record<string, string> = {
  Business: "rgba(201,168,76,0.20)",
  Technology: "rgba(79,70,229,0.20)",
  Process: "rgba(34,197,94,0.20)",
};

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Nav />
      <main id="main" style={{ paddingTop: 96, paddingBottom: 80, minHeight: "100vh" }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <Link to="/" className="btn-ghost" style={{ marginBottom: 40 }}>
            <ArrowLeft size={14} /> Back to home
          </Link>

          <header style={{ marginBottom: 64, marginTop: 24, maxWidth: 720 }}>
            <p className="section-label" style={{ marginBottom: 18 }}>Blog</p>
            <h1
              className="display-serif"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", marginBottom: 20 }}
            >
              Thoughts on web,
              <br />
              design & business.
            </h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>
              Practical insights from building websites for founders and growing
              businesses.
            </p>
          </header>

          {/* Featured */}
          <Link
            to={`/blog/${featured.slug}`}
            style={{
              display: "block",
              background: "var(--card-bg)",
              border: "1px solid var(--border-g)",
              borderRadius: 14,
              padding: "44px 40px",
              marginBottom: 32,
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-g)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-center" style={{ gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <span className="badge-gold">Latest Post</span>
              <span
                style={{
                  background: categoryColors[featured.category] || "var(--elevated)",
                  border: "1px solid var(--border-c)",
                  borderRadius: 9999,
                  padding: "4px 12px",
                  fontSize: 11,
                  color: "var(--mid)",
                  fontFamily: "var(--ff-mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {featured.category}
              </span>
              <span style={{ fontSize: 12, color: "var(--low)" }}>
                {featured.date} · {featured.readTime}
              </span>
            </div>
            <h2
              className="display-serif"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 14 }}
            >
              {featured.title}
            </h2>
            <p className="body-lg" style={{ marginBottom: 20, maxWidth: 700 }}>
              {featured.excerpt}
            </p>
            <span className="btn-ghost" style={{ color: "var(--gold)" }}>
              Read article <ArrowRight size={12} />
            </span>
          </Link>

          {/* Other posts */}
          <div
            className="blog-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
          >
            {rest.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                style={{
                  display: "block",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-c)",
                  borderRadius: 14,
                  padding: "32px 30px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-c)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-center" style={{ gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: categoryColors[p.category] || "var(--elevated)",
                      border: "1px solid var(--border-c)",
                      borderRadius: 9999,
                      padding: "3px 10px",
                      fontSize: 10,
                      color: "var(--mid)",
                      fontFamily: "var(--ff-mono)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.category}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--low)" }}>{p.readTime}</span>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 12,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p className="body-sm" style={{ marginBottom: 16 }}>{p.excerpt}</p>
                <p style={{ fontSize: 12, color: "var(--low)" }}>{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
