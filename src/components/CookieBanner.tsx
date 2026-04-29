import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const KEY = "luxiflow_cookie_consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const decide = (val: "accepted" | "declined") => {
    localStorage.setItem(KEY, val);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60]"
          style={{
            backgroundColor: "rgba(255,255,255,0.94)",
            borderTop: "1px solid var(--border-c)",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            boxShadow: "0 -10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <p
              className="font-sans flex-1"
              style={{ fontSize: "13px", color: "var(--mid)", lineHeight: 1.6 }}
            >
              We use essential cookies to make this site work, and optional analytics to understand traffic. See our{" "}
              <Link to="/cookie-policy" style={{ color: "var(--gold)", textDecoration: "underline" }}>Cookie Policy</Link>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => decide("declined")}
                className="font-sans transition-colors duration-150"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--mid)",
                  border: "1px solid var(--border2)",
                  borderRadius: "6px",
                  padding: "0 18px",
                  height: 40,
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Decline
              </button>
              <button
                onClick={() => decide("accepted")}
                className="font-sans transition-all duration-150"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "#FFFFFF",
                  borderRadius: "6px",
                  padding: "0 18px",
                  height: 40,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
