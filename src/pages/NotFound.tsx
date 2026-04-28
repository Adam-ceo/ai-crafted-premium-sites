import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid" style={{ backgroundColor: "#0F0F0F" }}>
      <div className="text-center px-6">
        <p
          className="font-mono mb-6"
          style={{ fontSize: "13px", letterSpacing: "0.12em", color: "#C9A84C", textTransform: "uppercase" }}
        >
          Error 404
        </p>
        <h1
          className="font-serif font-light mb-5"
          style={{ fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#FFFFFF" }}
        >
          Page not found.
        </h1>
        <p
          className="font-sans mb-10 mx-auto"
          style={{ fontSize: "16px", color: "#A1A1AA", lineHeight: 1.65, maxWidth: 460 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center font-sans transition-all duration-200"
          style={{
            backgroundColor: "#C9A84C",
            color: "#0F0F0F",
            borderRadius: "6px",
            padding: "14px 28px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
