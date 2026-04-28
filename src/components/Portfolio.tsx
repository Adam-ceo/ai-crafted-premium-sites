// Archived — not currently rendered. Re-import in Index.tsx when real projects are ready.
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const projects = [
  {
    name: "Lumina Residence",
    cat: "LUXURY REAL ESTATE",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    name: "Ethereal Form",
    cat: "ARCHITECTURE STUDIO",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    name: "Maison Clair",
    cat: "INTERIOR DESIGN",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    name: "Atelier Noir",
    cat: "FASHION BRAND",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-luxiblack py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-end justify-between mb-16 flex-wrap gap-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif font-light text-warmwhite"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            What we've built.
          </motion.h2>
          <motion.span
            variants={fadeInUp}
            className="font-sans text-brass"
            style={{ fontSize: "11px", letterSpacing: "0.15em" }}
          >
            04 PROJECTS
          </motion.span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((p) => (
            <motion.a
              key={p.name}
              href="#contact"
              variants={fadeInUp}
              className="group relative block aspect-[16/9] overflow-hidden bg-card"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: "grayscale(100%)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(60%)";
                  e.currentTarget.style.transform = "scale(1.025)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0) 100%)",
                }}
              >
                <p
                  className="font-sans text-brass mb-2"
                  style={{ fontSize: "11px", letterSpacing: "0.15em" }}
                >
                  {p.cat}
                </p>
                <h3
                  className="font-serif italic text-warmwhite mb-3"
                  style={{ fontSize: "20px" }}
                >
                  {p.name}
                </h3>
                <span
                  className="font-sans text-warmwhite/80"
                  style={{ fontSize: "12px", letterSpacing: "0.1em" }}
                >
                  View project →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
