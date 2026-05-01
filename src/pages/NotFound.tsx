import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center px-6">
        <p
          className="font-mono mb-6"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "var(--ls-mono-sm)",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          Error 404
        </p>
        <h1
          className="font-serif font-light mb-5"
          style={{
            fontSize: "var(--text-4xl)",
            lineHeight: 1.05,
            letterSpacing: "var(--ls-snug)",
            color: "var(--text)",
          }}
        >
          Page not found.
        </h1>
        <p
          className="font-sans mb-10 mx-auto"
          style={{
            fontSize: "var(--text-md)",
            color: "var(--low)",
            lineHeight: 1.65,
            maxWidth: 460,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-gold">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
