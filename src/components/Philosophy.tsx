import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-luxiblack py-32 md:py-40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-[700px] mx-auto px-6 text-center"
      >
        <motion.div variants={fadeInUp} className="flex justify-center mb-12">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="0.8"
          >
            <circle cx="20" cy="20" r="14" />
            <line x1="20" y1="2" x2="20" y2="14" />
            <line x1="20" y1="26" x2="20" y2="38" />
            <line x1="2" y1="20" x2="14" y2="20" />
            <line x1="26" y1="20" x2="38" y2="20" />
            <circle cx="20" cy="20" r="1.5" fill="#C9A96E" />
          </svg>
        </motion.div>

        <blockquote
          className="font-serif font-light italic text-warmwhite mb-12"
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {[
            "Luxury is not ornamentation.",
            "It is the complete absence",
            "of the unnecessary.",
          ].map((line, i) => (
            <motion.span key={i} variants={fadeInUp} className="block">
              {line}
            </motion.span>
          ))}
        </blockquote>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-5">
          <span className="block w-10 h-px bg-brass/40" />
          <span
            className="font-sans text-brass"
            style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.20em" }}
          >
            THE LUXIFLOW DIRECTIVE
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
