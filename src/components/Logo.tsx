interface LogoProps {
  size?: number;
}

export default function Logo({ size = 28 }: LogoProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <path
          d="M5 7 L14 21 L23 7"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="14" r="1.6" fill="var(--gold)" />
      </svg>
      <span
        className="font-sans"
        style={{
          fontWeight: "var(--fw-bold)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--ls-mono-sm)",
          textTransform: "uppercase",
          color: "var(--text)",
        }}
      >
        LUXIFLOW
      </span>
    </span>
  );
}
