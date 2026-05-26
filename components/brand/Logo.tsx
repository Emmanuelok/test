import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  /** If true, omits the outer ring text — useful in tight headers */
  compact?: boolean;
  monoGold?: boolean;
};

/**
 * Brand mark — circular badge with "BARBER SHOP" / "THE UN OF BARBER SHOPS"
 * on the ring, "19/49" in the centre, gold on dark. Pure SVG, scales infinitely.
 */
export function Logo({ size = 96, className, compact = false, monoGold = true }: Props) {
  const gold = monoGold ? "#c8a35a" : "currentColor";
  const ink = monoGold ? "#f5f1e8" : "currentColor";
  const id = `ring-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0", className)}
      aria-label="1949 Barber Shop"
      role="img"
    >
      <defs>
        <path
          id={id + "-top"}
          d="M 30,100 A 70,70 0 0 1 170,100"
          fill="none"
        />
        <path
          id={id + "-bot"}
          d="M 30,100 A 70,70 0 0 0 170,100"
          fill="none"
        />
        <linearGradient id={id + "-grad"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c47a" />
          <stop offset="50%" stopColor="#c8a35a" />
          <stop offset="100%" stopColor="#8a6f33" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke={gold}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke={gold}
        strokeWidth="1"
        opacity="0.35"
      />

      {!compact && (
        <>
          <text
            fill={gold}
            style={{
              fontSize: 13,
              letterSpacing: 4,
              fontFamily: "var(--font-display, Inter), sans-serif",
              fontWeight: 600,
            }}
          >
            <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
              BARBER · SHOP
            </textPath>
          </text>
          <text
            fill={gold}
            style={{
              fontSize: 9.5,
              letterSpacing: 3,
              fontFamily: "var(--font-display, Inter), sans-serif",
              fontWeight: 500,
            }}
          >
            <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">
              THE · UN · OF · BARBER · SHOPS
            </textPath>
          </text>
        </>
      )}

      {/* Star ornaments */}
      <g fill={gold}>
        <path d="M 38,100 l 3,-3 l 3,3 l -3,3 z" />
        <path d="M 156,100 l 3,-3 l 3,3 l -3,3 z" />
      </g>

      {/* 19 / 49 numerals */}
      <g>
        <text
          x="78"
          y="118"
          textAnchor="middle"
          fill={`url(#${id}-grad)`}
          style={{
            fontSize: 52,
            fontFamily: "var(--font-serif, Cormorant Garamond), serif",
            fontWeight: 600,
            fontStyle: "italic",
          }}
        >
          19
        </text>
        <text
          x="123"
          y="118"
          textAnchor="middle"
          fill={`url(#${id}-grad)`}
          style={{
            fontSize: 52,
            fontFamily: "var(--font-serif, Cormorant Garamond), serif",
            fontWeight: 600,
            fontStyle: "italic",
          }}
        >
          49
        </text>
        {/* Slash divider */}
        <line
          x1="100"
          y1="78"
          x2="100"
          y2="122"
          stroke={ink}
          strokeWidth="1.2"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "serif italic tracking-display text-2xl font-semibold leading-none gold-text",
        className,
      )}
    >
      1949
    </span>
  );
}
