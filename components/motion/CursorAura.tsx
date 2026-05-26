"use client";

import { useEffect, useState } from "react";

/**
 * Whole-page golden cursor aura — soft, blended-into-bg, follows pointer.
 * Disabled on touch / fine-pointer-absent devices.
 */
export function CursorAura() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!pos) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(200,163,90,0.06), transparent 50%)`,
      }}
    />
  );
}
