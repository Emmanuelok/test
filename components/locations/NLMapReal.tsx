"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { locations } from "@/lib/data/locations";
import { ArrowUpRight } from "lucide-react";

const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const ATTRIB =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

/** SVG markup for the gold 1949 pin — sized 36×46, with halo & shadow. */
const PIN_SVG = `
<div style="position:relative;">
  <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:9999px;background:radial-gradient(circle, rgba(200,163,90,0.35) 0%, transparent 70%);"></div>
  <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg" style="position:relative;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
    <defs>
      <linearGradient id="pin-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e6c47a"/>
        <stop offset="100%" stop-color="#8a6f33"/>
      </linearGradient>
    </defs>
    <path d="M18 0 C8 0 0 8 0 18 C0 30 18 46 18 46 C18 46 36 30 36 18 C36 8 28 0 18 0 Z" fill="url(#pin-grad)" stroke="#0b0b0c" stroke-width="1.5"/>
    <circle cx="18" cy="18" r="6" fill="#0b0b0c"/>
    <circle cx="18" cy="18" r="2.5" fill="#e6c47a"/>
  </svg>
</div>
`;

export function NLMapReal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown | null>(null);
  const tileRef = useRef<unknown | null>(null);
  const [active, setActive] = useState<string | null>(null);

  // Mount the Leaflet map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      // Bounds that frame the island of Newfoundland.
      const bounds = L.latLngBounds([46.4, -59.5], [51.7, -52.5]);

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        maxBounds: bounds.pad(0.3),
        minZoom: 6,
      });
      map.fitBounds(bounds, { padding: [20, 20] });

      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

      const tiles = L.tileLayer(isLight ? LIGHT_TILES : DARK_TILES, {
        attribution: ATTRIB,
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      tileRef.current = tiles;

      const icon = L.divIcon({
        className: "shop-pin",
        html: PIN_SVG,
        iconSize: [36, 46],
        iconAnchor: [18, 46],
        popupAnchor: [0, -42],
      });

      locations.forEach((l) => {
        const m = L.marker([l.lat, l.lng], { icon }).addTo(map);
        m.bindPopup(
          `
          <div style="font-family:'Cormorant Garamond',Georgia,serif;min-width:180px;color:#f5f1e8;background:#131316;border:1px solid #c8a35a;border-radius:2px;padding:10px 12px;">
            <div style="font-size:11px;letter-spacing:3px;color:#c8a35a;text-transform:uppercase;margin-bottom:4px;font-family:Inter,system-ui,sans-serif;">${l.short}</div>
            <div style="font-size:18px;font-style:italic;line-height:1.1;margin-bottom:6px;">${l.name}</div>
            <div style="font-size:11px;color:#b8b2a3;font-family:Inter,system-ui,sans-serif;">${l.address}</div>
            <a href="/locations/${l.slug}" style="display:inline-block;margin-top:8px;font-size:11px;color:#c8a35a;text-decoration:none;letter-spacing:2px;text-transform:uppercase;font-family:Inter,system-ui,sans-serif;">View &rarr;</a>
          </div>
          `,
          { closeButton: false, className: "shop-popup" },
        );
        m.on("mouseover", () => {
          setActive(l.slug);
          m.openPopup();
        });
        m.on("click", () => setActive(l.slug));
      });

      // Re-skin tiles when the theme toggle flips.
      const observer = new MutationObserver(async () => {
        const light =
          document.documentElement.getAttribute("data-theme") === "light";
        if (tileRef.current && mapRef.current) {
          const newTiles = L.tileLayer(light ? LIGHT_TILES : DARK_TILES, {
            attribution: ATTRIB,
            subdomains: "abcd",
            maxZoom: 19,
          });
          newTiles.addTo(map);
          map.removeLayer(tileRef.current as L.TileLayer);
          tileRef.current = newTiles;
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 relative border border-line bg-bg-elev/30 rounded-sm overflow-hidden">
        <div
          ref={containerRef}
          className="h-[480px] lg:h-[560px] w-full bg-bg-soft"
          aria-label="Map of 1949 Barber Shop locations across Newfoundland"
        />
        <style jsx global>{`
          .leaflet-container {
            background: var(--bg-soft) !important;
            font-family: var(--font-display), Inter, sans-serif !important;
          }
          .leaflet-control-attribution {
            background: rgba(11, 11, 12, 0.65) !important;
            color: var(--ink-mute) !important;
            font-size: 10px !important;
            padding: 2px 8px !important;
            backdrop-filter: blur(4px);
          }
          .leaflet-control-attribution a {
            color: var(--gold) !important;
          }
          .leaflet-popup-content-wrapper,
          .leaflet-popup-tip {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .leaflet-popup-content {
            margin: 0 !important;
          }
          .shop-popup .leaflet-popup-tip {
            display: none;
          }
          .leaflet-control-zoom a {
            background: var(--bg-elev) !important;
            color: var(--ink) !important;
            border: 1px solid var(--line) !important;
          }
          .leaflet-control-zoom a:hover {
            background: var(--gold) !important;
            color: var(--bg) !important;
          }
        `}</style>
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
                  onMouseEnter={() => setActive(l.slug)}
                  className={`group flex items-start justify-between py-3 border-b border-line/60 last:border-0 transition-colors ${
                    active === l.slug ? "text-gold" : ""
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
          <p className="mt-6 text-[10px] tracking-eyebrow text-ink-mute">
            DRAG · ZOOM · CLICK A PIN
          </p>
        </div>
      </aside>
    </div>
  );
}
