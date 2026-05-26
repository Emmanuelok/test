"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight — wraps any card and tracks the mouse to project a soft golden
 * pool of light onto it on hover. Tracks per-card, not globally.
 */
export function Spotlight({
  children,
  className,
  intensity = 0.18,
  size = 320,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, on: false });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      className={cn("relative overflow-hidden group", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.on ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(230,196,122,${intensity}), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
