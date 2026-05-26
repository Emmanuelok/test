import type { MetadataRoute } from "next";
import { locations } from "@/lib/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://1949barbershop.ca";
  const now = new Date();
  const fixed = [
    "/",
    "/book",
    "/locations",
    "/services",
    "/team",
    "/story",
    "/concierge",
    "/style-studio",
    "/match",
    "/wait-times",
    "/loyalty",
    "/account",
    "/gift-cards",
    "/notifications",
    "/app",
    "/club",
    "/gallery",
    "/walk-in",
    "/group",
    "/careers",
    "/press",
    "/lookup",
  ];
  return [
    ...fixed.map((p) => ({
      url: site + p,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...locations.map((l) => ({
      url: `${site}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
