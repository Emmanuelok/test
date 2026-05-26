"use client";

import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";

const events = [
  { who: "Sonny", where: "Topsail Rd", what: "skin fade · chair 3" },
  { who: "Yaw", where: "CBS", what: "The Full 1949 · chair 1" },
  { who: "Mandip", where: "Torbay Rd", what: "kids' cut · chair 2" },
  { who: "Marco", where: "Mt. Pearl", what: "beard sculpt · chair 4" },
  { who: "Samir", where: "Gander", what: "hot-towel shave · chair 1" },
  { who: "Amare", where: "CBS", what: "skin fade · chair 5" },
  { who: "Kenji", where: "Topsail Rd", what: "line-up · chair 7" },
  { who: "Gustavo", where: "Freshwater", what: "classic cut · chair 2" },
  { who: "Sonny", where: "Topsail Rd", what: "signature fade · chair 3" },
  { who: "Mandip", where: "Torbay Rd", what: "design line · chair 6" },
];

export function LiveTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % events.length), 3200);
    return () => clearInterval(id);
  }, []);
  const e = events[i];
  return (
    <div className="flex items-center gap-2 text-[11px] tracking-eyebrow text-ink-dim">
      <span className="size-1.5 rounded-full bg-success animate-pulse" />
      <Scissors className="size-3 text-gold" />
      <span className="hidden sm:inline">NOW CUTTING ·</span>
      <span key={i} className="text-ink animate-[fadeIn_.4s_ease-out]">
        {e.who} at {e.where} — {e.what}
      </span>
    </div>
  );
}
