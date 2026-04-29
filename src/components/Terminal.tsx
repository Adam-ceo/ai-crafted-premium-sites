import { useEffect, useRef, useState } from "react";

const lines = [
  { text: "$ luxiflow init my-project", color: "var(--mid)" },
  { text: "✓  Brief analysed (AI)", color: "var(--gold)" },
  { text: "✓  Design direction locked", color: "var(--gold)" },
  { text: "✓  Components scaffolded", color: "var(--gold)" },
  { text: "✓  Deployed to production", color: "var(--gold)" },
  { text: "→  Delivered: Day 12 of 14", color: "var(--text)" },
];

// Override line colors for the dark terminal surface so they stay readable
const LINE_COLORS: Record<string, string> = {
  "var(--mid)":  "#8C8C8C",
  "var(--gold)": "#C9A84C",
  "var(--text)": "#F0F0F0",
};

export default function Terminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (done) {
      timerRef.current = setTimeout(() => {
        setDone(false);
        setLineIdx(0);
        setCharIdx(0);
      }, 3200);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }

    const current = lines[lineIdx];
    if (!current) return;

    if (charIdx < current.text.length) {
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), 38);
    } else if (lineIdx < lines.length - 1) {
      timerRef.current = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 220);
    } else {
      timerRef.current = setTimeout(() => setDone(true), 600);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lineIdx, charIdx, done]);

  return (
    <div
      style={{
        background: "#0D0D0D",
        border: "1px solid #1E1E1E",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.18), 0 4px 14px rgba(0,0,0,0.10)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 38,
          background: "#111",
          borderBottom: "1px solid #1A1A1A",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#4E4E4E",
          }}
        >
          luxiflow-cli
        </span>
      </div>

      {/* Body — fixed height: all lines always occupy space, future ones are invisible */}
      <div
        style={{
          padding: "20px 22px 28px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          lineHeight: 1.85,
        }}
      >
        {lines.map((l, i) => {
          const isCurrent = i === lineIdx && !done;
          const isPast    = i < lineIdx || done;
          const isFuture  = i > lineIdx && !done;

          const displayText = isCurrent
            ? l.text.slice(0, charIdx)
            : isPast
            ? l.text
            : l.text; // future: full text rendered but invisible → reserves height

          return (
            <div
              key={i}
              style={{
                color: LINE_COLORS[l.color] ?? l.color,
                whiteSpace: "pre",
                // future lines are invisible but still occupy their full height
                visibility: isFuture ? "hidden" : "visible",
              }}
            >
              {displayText}
              {isCurrent && (
                <span
                  className="cursor-blink"
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 14,
                    background: "#C9A84C",
                    verticalAlign: "text-bottom",
                    marginLeft: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
