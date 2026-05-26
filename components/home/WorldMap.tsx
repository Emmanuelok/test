/**
 * Decorative dotted world map — pure SVG, used as a hero backdrop.
 * Pins mark a handful of the homelands of the 1949 team & clientele.
 */
export function WorldMap() {
  // A coarse 80x40 grid of dots roughly outlining continents.
  // Encoded as a string per row; "•" = dot, " " = empty.
  const rows = [
    "      ▪▪▪▪▪▪▪▪▪▪      ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                            ",
    "    ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                  ",
    "   ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪             ",
    "    ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪          ",
    "     ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪    ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪        ",
    "      ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪      ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪        ",
    "       ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪      ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪         ",
    "        ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪      ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪           ",
    "         ▪▪▪▪▪▪▪▪▪▪▪▪▪▪       ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪              ",
    "         ▪▪▪▪▪▪▪▪▪▪▪          ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                ",
    "          ▪▪▪▪▪▪▪▪▪            ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                 ",
    "          ▪▪▪▪▪▪▪▪             ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                    ",
    "           ▪▪▪▪▪               ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                       ",
    "           ▪▪▪▪                 ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪                         ",
    "           ▪▪▪                   ▪▪▪▪▪▪▪▪▪▪▪▪▪                           ",
    "           ▪▪                     ▪▪▪▪▪▪▪▪▪▪                             ",
    "                                   ▪▪▪▪▪▪▪                               ",
    "                                    ▪▪▪▪                                 ",
    "                                     ▪▪                                  ",
    "                                                                         ",
  ];

  // City pins (homelands referenced in shop's story): St. John's (origin),
  // Accra (Ghana), Bogotá (Colombia), Naples (Italy), Manila (Philippines),
  // Beirut (Lebanon), Harare (Zimbabwe), Port Louis (Mauritius), Tokyo (Japan).
  const pins = [
    { x: 28, y: 10, label: "St. John's", primary: true },
    { x: 41, y: 13, label: "Accra" },
    { x: 31, y: 14, label: "Bogotá" },
    { x: 44, y: 11, label: "Naples" },
    { x: 64, y: 13, label: "Manila" },
    { x: 47, y: 11, label: "Beirut" },
    { x: 46, y: 16, label: "Harare" },
    { x: 50, y: 16, label: "Port Louis" },
    { x: 65, y: 11, label: "Tokyo" },
  ];

  return (
    <svg
      viewBox="0 0 80 22"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full opacity-[0.18] absolute inset-0"
      aria-hidden
    >
      {rows.map((row, y) =>
        Array.from(row).map((ch, x) =>
          ch === "▪" ? (
            <circle
              key={`${x}-${y}`}
              cx={x + 0.5}
              cy={y + 1}
              r={0.18}
              fill="#c8a35a"
            />
          ) : null,
        ),
      )}
      {pins.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={p.primary ? 0.55 : 0.4} fill="#e6c47a" />
          <circle
            cx={p.x}
            cy={p.y}
            r={p.primary ? 1.2 : 0.9}
            fill="none"
            stroke="#e6c47a"
            strokeWidth="0.1"
            opacity="0.5"
          >
            <animate
              attributeName="r"
              from={p.primary ? "0.6" : "0.5"}
              to={p.primary ? "2" : "1.6"}
              dur={p.primary ? "2s" : "3s"}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.6"
              to="0"
              dur={p.primary ? "2s" : "3s"}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
