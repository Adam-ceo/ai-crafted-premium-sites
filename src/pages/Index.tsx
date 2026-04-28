import { useEffect } from "react";
import { useSmoothScroll } from "@/lib/scroll";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Index() {
  useSmoothScroll();

  // Title for SPA route
  useEffect(() => {
    document.title = "Luxiflow — Premium Websites in 14 Days · From €1,500";
  }, []);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        {/* Placeholder sections for upcoming phases — keep structural anchors */}
        <SectionPlaceholder id="services" eyebrow="What we build" title="Services" />
        <SectionPlaceholder id="process" eyebrow="How it works" title="Process" inverse />
        <SectionPlaceholder id="pricing" eyebrow="Pricing" title="Investment" />
        <SectionPlaceholder id="contact" eyebrow="Get in touch" title="Send a brief" />
      </main>
      <Footer />
    </>
  );
}

function SectionPlaceholder({
  id,
  eyebrow,
  title,
  inverse,
}: {
  id: string;
  eyebrow: string;
  title: string;
  inverse?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-section relative ${inverse ? "bg-inverse-bg text-inverse-fg" : ""}`}
    >
      <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
        <p
          className={`text-eyebrow mb-6 ${
            inverse ? "!text-inverse-mid" : ""
          }`}
        >
          — {eyebrow}
        </p>
        <h2
          className={`font-display text-display-md max-w-[18ch] ${
            inverse ? "text-inverse-fg" : "text-ink"
          }`}
        >
          {title}{" "}
          <span className="italic text-ink-mid">— coming next.</span>
        </h2>
        <p className={`mt-6 text-body-sm font-mono-ui ${inverse ? "text-inverse-mid" : "text-ink-low"}`}>
          Phase 2 of redesign · scheduled in next iteration
        </p>
      </div>
    </section>
  );
}
