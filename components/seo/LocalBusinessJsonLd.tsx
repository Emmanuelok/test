import { locations } from "@/lib/data/locations";

export function LocalBusinessJsonLd() {
  const items = locations.map((l) => ({
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `https://1949barbershop.ca/locations/${l.slug}`,
    name: `1949 Barber Shop — ${l.name}`,
    image: "https://1949barbershop.ca/og.png",
    telephone: l.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: l.province,
      postalCode: l.postal,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: l.lat,
      longitude: l.lng,
    },
    openingHoursSpecification: l.hours
      .filter((h) => h.open)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: [
      "https://www.facebook.com/1949shop/",
      "https://www.instagram.com/1949barbers/",
    ],
  }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items) }}
    />
  );
}
