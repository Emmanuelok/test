"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/team", label: "Team" },
  { href: "/story", label: "Our Story" },
  { href: "/style-studio", label: "Style Studio", badge: "AI" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden md:flex items-center justify-between bg-bg-elev/80 text-ink-dim text-[11px] tracking-eyebrow py-2 px-6 border-b border-line/60">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <MapPin className="size-3 text-gold" />
            6 Locations · Newfoundland &amp; Labrador
          </span>
          <span className="flex items-center gap-2">
            <Phone className="size-3 text-gold" />
            (709) 576-2425
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gold">Walk-ins welcome · Booking in 30 seconds</span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur transition-colors duration-300",
          scrolled
            ? "bg-bg/85 border-b border-line"
            : "bg-bg/40 border-b border-transparent",
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="1949 Barber Shop home"
          >
            <Logo size={48} compact className="transition-transform group-hover:rotate-3" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="serif italic text-xl text-gold font-semibold tracking-display">
                1949
              </span>
              <span className="text-[9px] tracking-eyebrow text-ink-dim">
                Barber Shop · NL
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-ink-dim hover:text-ink relative inline-flex items-center gap-1.5 transition-colors"
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[9px] tracking-eyebrow text-gold bg-gold/10 border border-gold/30 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/concierge"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-ink-dim hover:text-gold transition-colors"
            >
              <Sparkles className="size-3.5" />
              Ask Concierge
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-gold text-bg font-semibold text-sm px-4 py-2.5 rounded-sm hover:bg-gold-bright transition-colors"
            >
              Book Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-2 p-2 text-ink"
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden border-t border-line bg-bg-elev">
            <ul className="px-4 py-3 flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 text-base text-ink border-b border-line/50 last:border-0"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] tracking-eyebrow text-gold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/concierge"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-3 text-base text-gold"
                >
                  <Sparkles className="size-4" />
                  AI Concierge
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
