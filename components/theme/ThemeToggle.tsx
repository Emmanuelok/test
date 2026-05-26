"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "system";

function applyTheme(mode: Mode) {
  const system = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  const actual = mode === "system" ? system : mode;
  document.documentElement.setAttribute("data-theme", actual);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (localStorage.getItem("theme") as Mode | null) ?? "system";
    setMode(stored);
    applyTheme(stored);

    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if ((localStorage.getItem("theme") as Mode | null) === "system" || !localStorage.getItem("theme")) {
        applyTheme("system");
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  function setAndPersist(next: Mode) {
    setMode(next);
    if (next === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", next);
    applyTheme(next);
  }

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  const opts: { v: Mode; Icon: typeof Sun; label: string }[] = [
    { v: "light", Icon: Sun, label: "Light" },
    { v: "system", Icon: Monitor, label: "System" },
    { v: "dark", Icon: Moon, label: "Dark" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center bg-bg-elev border border-line rounded-full p-0.5"
    >
      {opts.map((o) => {
        const active = mode === o.v;
        return (
          <button
            key={o.v}
            role="radio"
            aria-checked={active}
            onClick={() => setAndPersist(o.v)}
            className={cn(
              "inline-grid place-items-center size-7 rounded-full transition-colors",
              active
                ? "bg-gold text-bg"
                : "text-ink-dim hover:text-ink",
            )}
            title={o.label}
          >
            <o.Icon className="size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
