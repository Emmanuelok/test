"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/**
 * Instagram official embed. Works for any public post or reel URL — no API
 * token required. The iframe is served by instagram.com, so we're not
 * proxying or storing their imagery; we link to it.
 *
 * Pass the canonical post URL, e.g.:
 *   https://www.instagram.com/reel/C3dBPW3sNpd/
 */
export function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    // Process this specific embed once mounted. Loads embed.js if missing.
    const trigger = () => window.instgrm?.Embeds.process();
    if (window.instgrm) {
      trigger();
      return;
    }
    const id = "instagram-embed-script";
    if (document.getElementById(id)) {
      trigger();
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = trigger;
    document.body.appendChild(s);
  }, [url]);

  return (
    <blockquote
      ref={ref}
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-captioned
      data-instgrm-version="14"
      style={{
        background: "var(--bg-elev)",
        border: "1px solid var(--line)",
        margin: 0,
        maxWidth: "100%",
        minWidth: 280,
        padding: 0,
        width: "100%",
      }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 text-sm text-ink-dim hover:text-gold"
      >
        View on Instagram →
      </a>
    </blockquote>
  );
}
