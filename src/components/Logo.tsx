import { Link } from "react-router-dom";

interface LogoProps {
  inverse?: boolean;
  size?: number;
}

export default function Logo({ inverse = false, size = 22 }: LogoProps) {
  const stroke = inverse ? "hsl(var(--inverse-fg))" : "hsl(var(--ink))";
  return (
    <Link to="/" aria-label="Luxiflow — home" className="inline-flex items-center gap-2.5 group">
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 7 L14 21 L23 7"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke] duration-300 group-hover:!stroke-accent"
        />
        <circle
          cx="14"
          cy="14"
          r="1.6"
          fill="hsl(var(--accent))"
        />
      </svg>
      <span
        className={`font-display text-[20px] tracking-tight leading-none ${
          inverse ? "text-inverse-fg" : "text-ink"
        }`}
      >
        Luxiflow
      </span>
    </Link>
  );
}
