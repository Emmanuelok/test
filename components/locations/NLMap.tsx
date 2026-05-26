"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { locations, type Location } from "@/lib/data/locations";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";

/**
 * Stylised Newfoundland outline with the six chairs pinned by lat/lng.
 * Projection: simple equirectangular into a 1000×640 viewport.
 *   x = (lng + 60) * (1000 / 8)
 *   y = (52 - lat) * (640 / 6)
 * Five of six pins fall on the Avalon — we render an inset cluster
 * close-up on the right.
 */

const VIEW = { w: 1000, h: 640 };
const BOUNDS = { west: -60, east: -52, north: 52, south: 46 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h;
  return { x, y };
}

// Hand-built simplified outline of the island of Newfoundland.
// Not survey-grade — designed to read as "Newfoundland" at a glance.
const NL_PATH = `
M 110 360
L 140 320 L 165 280 L 175 250 L 165 220 L 160 180 L 175 140 L 200 110 L 230 95 L 260 105 L 270 140 L 250 170 L 240 200 L 250 230 L 280 250 L 320 250 L 360 240 L 400 235 L 445 240 L 490 235 L 525 220 L 560 215 L 595 230 L 630 245 L 650 270 L 660 295 L 645 320 L 615 335 L 595 355 L 575 360 L 555 380 L 575 405 L 600 415 L 625 405 L 640 380 L 660 380 L 680 400 L 690 425 L 680 450 L 655 460 L 625 458 L 600 448 L 575 445 L 545 450 L 525 440 L 505 425 L 480 430 L 460 450 L 440 470 L 420 485 L 395 495 L 370 500 L 345 495 L 320 490 L 295 485 L 270 480 L 245 475 L 220 465 L 205 450 L 195 430 L 185 410 L 170 390 L 140 380 L 110 360 Z
`;

export function NLMap() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 relative border border-line bg-bg-elev/30 rounded-sm p-4 lg:p-8 overflow-hidden">
        <div className="absolute top-4 left-4 right-4 flex items-baseline justify-between text-[10px] tracking-eyebrow text-ink-mute z-10">
          <span>NEWFOUNDLAND · 1:2,000,000</span>
          <span>N ↑</span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="w-full h-auto"
          aria-label="Map of 1949 Barber Shop locations in Newfoundland"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0.5" cy="0.5" r="0.5" fill="currentColor" />
            </pattern>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c8a35a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#c8a35a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1b1b20" />
              <stop offset="100%" stopColor="#13131a" />
            </linearGradient>
          </defs>

          {/* Ocean grid */}
          <rect
            width={VIEW.w}
            height={VIEW.h}
            fill="url(#grid)"
            className="text-ink-mute opacity-10"
          />

          {/* Land */}
          <path
            d={NL_PATH}
            fill="url(#land)"
            stroke="#c8a35a"
            strokeWidth="1"
            strokeOpacity="0.7"
          />

          {/* Coastline glow */}
          <path
            d={NL_PATH}
            fill="none"
            stroke="#c8a35a"
            strokeWidth="3"
            strokeOpacity="0.08"
          />

          {/* Pin halos & dots */}
          {locations.map((l) => {
            const p = project(l.lat, l.lng);
            const active = hover === l.slug;
            return (
              <g key={l.slug}>
                <circle cx={p.x} cy={p.y} r="60" fill="url(#halo)" />
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="0"
                  fill="none"
                  stroke="#e6c47a"
                  strokeWidth="1.5"
                  animate={{ r: [4, 22], opacity: [0.8, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 9 : 7}
                  fill="#e6c47a"
                  stroke="#0b0b0c"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHover(l.slug)}
                  onMouseLeave={() => setHover(null)}
                />
                <text
                  x={p.x + 14}
                  y={p.y + 4}
                  fontSize="14"
                  fill="#f5f1e8"
                  fontFamily="serif"
                  fontStyle="italic"
                  className="pointer-events-none"
                  style={{ opacity: active ? 1 : 0.85 }}
                >
                  {l.short}
                </text>
              </g>
            );
          })}

          {/* Compass / scale ornament */}
          <g transform={`translate(${VIEW.w - 110}, ${VIEW.h - 80})`}>
            <circle r="32" fill="none" stroke="#c8a35a" strokeWidth="0.5" strokeOpacity="0.5" />
            <line x1="0" y1="-32" x2="0" y2="32" stroke="#c8a35a" strokeWidth="0.5" strokeOpacity="0.5" />
            <line x1="-32" y1="0" x2="32" y2="0" stroke="#c8a35a" strokeWidth="0.5" strokeOpacity="0.5" />
            <text y="-38" textAnchor="middle" fontSize="11" fill="#c8a35a" fontFamily="serif">N</text>
            <text y="48" textAnchor="middle" fontSize="11" fill="#c8a35a" fontFamily="serif">S</text>
            <text x="42" y="4" textAnchor="middle" fontSize="11" fill="#c8a35a" fontFamily="serif">E</text>
            <text x="-42" y="4" textAnchor="middle" fontSize="11" fill="#c8a35a" fontFamily="serif">W</text>
          </g>
        </svg>

        <AnimatePresence>
          {hover && <HoverCard slug={hover} />}
        </AnimatePresence>
      </div>

      <aside className="lg:col-span-4">
        <div className="border border-line bg-bg-elev/30 rounded-sm p-6">
          <div className="text-[10px] tracking-eyebrow text-gold mb-4">
            — 6 LOCATIONS
          </div>
          <ul className="space-y-1">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  onMouseEnter={() => setHover(l.slug)}
                  onMouseLeave={() => setHover(null)}
                  className={`group flex items-start justify-between py-3 border-b border-line/60 last:border-0 transition-colors ${
                    hover === l.slug ? "text-gold" : ""
                  }`}
                >
                  <div>
                    <div className="serif text-lg">{l.name}</div>
                    <div className="text-xs text-ink-dim mt-0.5">
                      {l.address} · {l.city}
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 text-ink-mute group-hover:text-gold group-hover:translate-x-0.5 transition-all mt-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function HoverCard({ slug }: { slug: string }) {
  const l = locations.find((x) => x.slug === slug);
  if (!l) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-sm border border-gold/40 bg-bg-elev/95 backdrop-blur rounded-sm p-5 pointer-events-none"
    >
      <div className="serif text-xl text-gold">{l.name}</div>
      <div className="mt-2 text-sm text-ink-dim flex items-start gap-2">
        <MapPin className="size-3.5 mt-0.5 text-gold shrink-0" />
        {l.address}, {l.city}
      </div>
      <div className="mt-1 text-sm text-ink-dim flex items-center gap-2">
        <Phone className="size-3.5 text-gold shrink-0" />
        {l.phone}
      </div>
      <div className="mt-3 text-[10px] tracking-eyebrow text-ink-mute">
        {l.chairs} CHAIRS · {l.features[0]?.toUpperCase()}
      </div>
    </motion.div>
  );
}

export function LocationsForLightTheme() {
  // unused placeholder kept for future theme-specific renderer
  return null;
}
