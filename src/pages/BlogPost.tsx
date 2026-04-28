import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";
import { scrollToSection } from "@/hooks/useScrollTo";
import { useNavigate } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const navigate = useNavigate();

  if (!post) return <Navigate to="/blog" replace />;

  const idx = blogPosts.findIndex((p) => p.slug === post.slug);
  const next = blogPosts[(idx + 1) % blogPosts.length];

  const goContact = () => {
    navigate("/");
    setTimeout(() => scrollToSection("contact"), 100);
  };

  return (
    <>
      <Nav />
      <main id="main" style={{ paddingTop: 96, paddingBottom: 80, minHeight: "100vh" }}>
        <article className="max-w-[760px] mx-auto px-6 md:px-10">
          <Link to="/blog" className="btn-ghost" style={{ marginBottom: 40 }}>
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <header style={{ marginTop: 24, marginBottom: 40 }}>
            <div className="flex items-center" style={{ gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "var(--elevated)",
                  border: "1px solid var(--border-c)",
                  borderRadius: 9999,
                  padding: "4px 12px",
                  fontSize: 11,
                  color: "var(--mid)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </span>
              <span style={{ fontSize: 12, color: "var(--low)" }}>
                {post.date} · {post.readTime}
              </span>
            </div>
            <h1
              className="display-serif"
              style={{ fontSize: "clamp(28px, 5vw, 48px)", marginBottom: 24 }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.7,
                color: "var(--mid)",
              }}
            >
              {post.intro}
            </p>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--text)",
                    marginBottom: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {section.heading}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: 16,
                        lineHeight: 1.8,
                        color: "var(--mid)",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 64,
              padding: "44px 40px",
              border: "1px solid var(--border-g)",
              borderRadius: 14,
              background: "var(--card-bg)",
              textAlign: "center",
            }}
          >
            <h3
              className="display-serif"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 14 }}
            >
              Ready to build yours?
            </h3>
            <p className="body-sm" style={{ marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
              Let us scope your project. Honest quote, honest timeline, no pressure.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-gold" onClick={goContact}>
                Start your project <ArrowRight size={14} />
              </button>
              <Link to="/blog" className="btn-outline">
                Back to blog
              </Link>
            </div>
          </div>

          {/* Next article */}
          {next && next.slug !== post.slug && (
            <Link
              to={`/blog/${next.slug}`}
              style={{
                display: "block",
                marginTop: 32,
                padding: "24px 28px",
                background: "var(--card-bg)",
                border: "1px solid var(--border-c)",
                borderRadius: 12,
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-c)")}
            >
              <p className="section-label" style={{ marginBottom: 8 }}>Next article</p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {next.title} <ArrowRight size={14} style={{ display: "inline", marginLeft: 6 }} />
              </p>
            </Link>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
