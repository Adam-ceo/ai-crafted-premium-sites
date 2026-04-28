import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { Container } from "./ui/primitives";
import { scrollToId } from "@/lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-[120px] pb-10 border-t border-hairline">
      <Container>
        {/* Mega heading */}
        <div className="mb-20 max-w-[920px]">
          <p className="text-eyebrow mb-6">— Let's begin</p>
          <h2 className="font-display text-display-md text-ink mb-8">
            Have a project in mind? <br />
            <span className="italic text-ink-mid">We'd love to hear it.</span>
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <button onClick={() => scrollToId("contact", -64)} className="lx-btn lx-btn-primary">
              Send a brief <ArrowUpRight size={14} />
            </button>
            <a href="mailto:hello@luxiflow.io" className="lx-btn lx-btn-outline">
              hello@luxiflow.io
            </a>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] mb-16">
          <div>
            <Logo />
            <p className="font-sans-ui text-body-sm text-ink-mid mt-5 max-w-[280px] leading-relaxed">
              Independent AI-native web studio. Premium websites shipped in 14 days.
            </p>
          </div>

          {[
            {
              label: "Studio",
              items: [
                ["Work", "/work"],
                ["About", "/about"],
                ["Journal", "/blog"],
                ["Book a call", "/book"],
              ],
            },
            {
              label: "Services",
              items: [
                ["Marketing site", "#services"],
                ["Landing page", "#services"],
                ["Portfolio", "#services"],
                ["E-commerce", "#services"],
              ],
            },
            {
              label: "Legal",
              items: [
                ["Privacy", "/privacy-policy"],
                ["Cookies", "/cookie-policy"],
                ["Terms", "/terms-of-service"],
              ],
            },
          ].map((col) => (
            <div key={col.label}>
              <p className="text-eyebrow mb-5">{col.label}</p>
              <ul className="flex flex-col gap-3">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-body-sm text-ink-mid hover:text-ink transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized brand mark */}
        <div className="hairline mb-8" />
        <div
          aria-hidden="true"
          className="font-display text-[clamp(80px,18vw,260px)] leading-[0.85] tracking-[-0.04em] text-ink/[0.06] select-none -mb-4 overflow-hidden"
        >
          Luxiflow<span className="italic text-accent/30">.</span>
        </div>

        <div className="hairline mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-body-sm text-ink-low">
          <p>© {year} Luxiflow Studio. Crafted with care in Europe.</p>
          <p className="font-mono-ui text-caption">v2.0 · Edition Light</p>
        </div>
      </Container>
    </footer>
  );
}
