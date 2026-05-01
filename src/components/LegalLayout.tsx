import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface LegalLayoutProps {
  title: string;
  sections: Section[];
  children?: ReactNode;
}

export default function LegalLayout({ title, sections }: LegalLayoutProps) {
  return (
    <>
      <Nav />
      <main id="main" style={{ paddingTop: 96, paddingBottom: 80, minHeight: "100vh" }}>
        <article className="max-w-[760px] mx-auto px-6 md:px-10">
          <Link to="/" className="btn-ghost" style={{ marginBottom: 32 }}>
            <ArrowLeft size={14} /> Back to home
          </Link>

          <p className="section-label" style={{ marginTop: 20, marginBottom: 14 }}>Legal</p>
          <h1
            style={{
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 48px)",
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 13, color: "var(--low)", marginBottom: 48 }}>
            Last updated: 27 April 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {sections.map((s, i) => (
              <section key={i}>
                <h2
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "var(--text)",
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {`${i + 1}. ${s.heading}`}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {s.paragraphs.map((p, j) => (
                    <p key={j} style={{ fontSize: 15, lineHeight: 1.75, color: "var(--mid)" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
