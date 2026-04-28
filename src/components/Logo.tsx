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
          stroke="#C9A84C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="14" r="1.6" fill="#C9A84C" />
      </svg>
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#F0F0F0",
        }}
      >
        LUXIFLOW
      </span>
    </span>
  );
}
