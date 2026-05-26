/**
 * Mock concierge "brain". Real LLM goes here next — wire an Anthropic/OpenAI
 * client and replace `respond()` with a streamed model call. The shape of the
 * output (text chunks + structured suggestions) is identical, so the front-end
 * doesn't change.
 */

import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { barbers } from "@/lib/data/barbers";

export type Msg = { role: "user" | "assistant"; content: string };

export type ResponseEvent =
  | { t: "text"; v: string }
  | { t: "suggestions"; v: { label: string; href?: string }[] };

const FACE_SHAPES = ["oval", "round", "square", "oblong", "heart", "diamond"];

const RECS: Record<string, { service: string; why: string }> = {
  oval: {
    service: "signature-fade",
    why: "Oval is the most versatile face shape — almost any cut works, but a mid-fade with texture on top is the most flattering balance.",
  },
  round: {
    service: "signature-fade",
    why: "A higher fade with length on top adds vertical line and slims the face. Avoid heavy sides.",
  },
  square: {
    service: "classic-cut",
    why: "Square jaws benefit from softer, scissor-led cuts and a longer top to balance angular features.",
  },
  oblong: {
    service: "classic-cut",
    why: "Oblong faces look best with volume on the sides and shorter on top — the opposite of a high fade.",
  },
  heart: {
    service: "skin-fade",
    why: "Heart-shaped faces look sharp with a low skin fade and medium length on top — balances a wider forehead.",
  },
  diamond: {
    service: "signature-fade",
    why: "Highlight your cheekbones with a textured mid-fade and natural fringe.",
  },
};

function detectIntent(text: string) {
  const t = text.toLowerCase();
  return {
    book: /(book|schedule|appointment|slot|chair|reserve|tomorrow|today|tonight|saturday|sunday|next week)/i.test(t),
    walkin: /(walk[- ]?in|wait time|how busy|right now|line up|line-up)/i.test(t),
    gift: /(gift card|present|gift)/i.test(t),
    recommend: /(recommend|advice|what cut|what style|face shape|hair|suit me)/i.test(t),
    barber: /(yaw|gustavo|sonny|mandip|amare|samir|kenji|marco|with .* barber)/i.test(t),
    location: /(topsail|village|torbay|freshwater|cbs|conception|mt\.? pearl|gander|near me|close to)/i.test(t),
    hours: /(open|closed|hours|when are you)/i.test(t),
    price: /(price|cost|how much)/i.test(t),
    language: /(spanish|french|arabic|tagalog|twi|italian|japanese|punjabi)/i.test(t),
    kids: /(kid|child|son|daughter|toddler)/i.test(t),
    beard: /(beard|moustache|stubble|shave)/i.test(t),
    faceShape: FACE_SHAPES.find((f) => t.includes(f)),
  };
}

function pickService(text: string): (typeof services)[number] | undefined {
  const t = text.toLowerCase();
  if (/skin fade/.test(t)) return services.find((s) => s.slug === "skin-fade");
  if (/fade/.test(t)) return services.find((s) => s.slug === "signature-fade");
  if (/shave/.test(t)) return services.find((s) => s.slug === "hot-towel-shave");
  if (/beard/.test(t)) return services.find((s) => s.slug === "beard-trim");
  if (/kid|child/.test(t)) return services.find((s) => s.slug === "kids-cut");
  if (/senior/.test(t)) return services.find((s) => s.slug === "senior");
  if (/full|works|package/.test(t)) return services.find((s) => s.slug === "the-full-1949");
  if (/line[- ]up|edge/.test(t)) return services.find((s) => s.slug === "line-up");
  return undefined;
}

function pickLocation(text: string) {
  const t = text.toLowerCase();
  if (/topsail|village/.test(t)) return locations.find((l) => l.slug === "topsail-road");
  if (/torbay/.test(t)) return locations.find((l) => l.slug === "torbay-road");
  if (/freshwater|mun|university/.test(t)) return locations.find((l) => l.slug === "freshwater-road");
  if (/cbs|conception/.test(t)) return locations.find((l) => l.slug === "cbs");
  if (/mt\.? pearl|pearl/.test(t)) return locations.find((l) => l.slug === "mt-pearl");
  if (/gander/.test(t)) return locations.find((l) => l.slug === "gander");
  return undefined;
}

function pickBarber(text: string) {
  const t = text.toLowerCase();
  return barbers.find((b) => t.includes(b.name.toLowerCase().split(" ")[0]));
}

export async function* respond(messages: Msg[]): AsyncGenerator<ResponseEvent> {
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    yield { t: "text", v: "Tell me what you need and I'll handle it." };
    return;
  }
  const text = last.content;
  const intent = detectIntent(text);

  let reply = "";
  let suggestions: { label: string; href?: string }[] = [];

  if (intent.walkin) {
    const loc = pickLocation(text);
    if (loc) {
      const wait = mockWait(loc.slug);
      reply = `Right now the **${loc.name}** chair has roughly **${wait} minute${wait === 1 ? "" : "s"}** of walk-in wait — ${wait < 10 ? "basically walk straight in" : wait < 25 ? "comfortable" : "a bit of a line but moving"}. You can also lock a slot:`;
      suggestions = [
        { label: `Book at ${loc.short}`, href: `/book?location=${loc.slug}` },
        { label: "Live wait at all 6 locations", href: "/wait-times" },
      ];
    } else {
      reply =
        "Walk-ins are welcome at every chair. Tell me which spot you're closest to and I'll give you live wait — Topsail Rd, Torbay Rd, Freshwater, CBS, Mt. Pearl, or Gander?";
      suggestions = locations.slice(0, 4).map((l) => ({ label: l.short }));
    }
  } else if (intent.gift) {
    reply =
      "Easy. Pick an amount, write a note, and I'll text or email a 1949 gift card in 30 seconds. It works at every chair and every location.";
    suggestions = [
      { label: "$25 — a beard trim", href: "/gift-cards?amount=25" },
      { label: "$45 — a signature fade", href: "/gift-cards?amount=45" },
      { label: "$95 — The Full 1949", href: "/gift-cards?amount=95" },
    ];
  } else if (intent.recommend || intent.faceShape) {
    const shape = intent.faceShape ?? "oval";
    const rec = RECS[shape];
    const svc = services.find((s) => s.slug === rec.service)!;
    reply = `For a **${shape} face**, my pick is the **${svc.name}** — $${svc.priceCad}, about ${svc.durationMin} min.\n\n${rec.why}\n\nWant to see eight cuts that suit you side-by-side? Run the Style Studio (upload a selfie, takes 20 seconds).`;
    suggestions = [
      { label: "Open Style Studio", href: "/style-studio" },
      { label: `Book the ${svc.name}`, href: `/book?service=${svc.slug}` },
    ];
  } else if (intent.barber) {
    const b = pickBarber(text);
    if (b) {
      reply = `${b.name} (${b.fromFlag} ${b.from}) — ${b.title}. ${b.bio}\n\nSpecialties: ${b.specialties.join(", ")}. Cuts at: ${b.locationSlugs.map((s) => locations.find((l) => l.slug === s)?.short).join(" & ")}.`;
      suggestions = [
        { label: `Book with ${b.name.split(" ")[0]}`, href: `/book?barber=${b.slug}` },
        { label: "See the full team", href: "/team" },
      ];
    } else {
      reply =
        "Tell me the barber's name and I'll pull their next openings. Yaw, Gustavo, Sonny, Mandip, Amare, Samir, Marco, or Kenji?";
      suggestions = [
        { label: "Run Barber Match instead", href: "/match" },
      ];
    }
  } else if (intent.book) {
    const svc = pickService(text);
    const loc = pickLocation(text);
    const b = pickBarber(text);
    const parts: string[] = ["On it."];
    if (svc) parts.push(`Service: **${svc.name}** ($${svc.priceCad}, ${svc.durationMin} min).`);
    if (loc) parts.push(`Location: **${loc.name}**.`);
    if (b) parts.push(`Barber: **${b.name}**.`);
    parts.push(
      `\nLet's grab a time. I've pre-filled what I caught from your message — just pick a slot:`,
    );
    reply = parts.join(" ");
    const qs = new URLSearchParams();
    if (svc) qs.set("service", svc.slug);
    if (loc) qs.set("location", loc.slug);
    if (b) qs.set("barber", b.slug);
    suggestions = [
      { label: "Open booking", href: `/book?${qs.toString()}` },
      { label: "Try a different service", href: "/services" },
    ];
  } else if (intent.hours || intent.location) {
    const loc = pickLocation(text) ?? locations[0];
    reply = `**${loc.name}** — ${loc.address}, ${loc.city}.\n\n${loc.blurb}\n\nPhone: ${loc.phone}. ${loc.chairs} chairs, walk-ins welcome, ${loc.parking.toLowerCase()}.`;
    suggestions = [
      { label: `Book at ${loc.short}`, href: `/book?location=${loc.slug}` },
      { label: "See all 6 locations", href: "/locations" },
    ];
  } else if (intent.price) {
    reply =
      "Our menu:\n\n• Classic Cut — $35\n• Signature Fade — $42\n• Skin Fade — $45\n• Hot-Towel Shave — $45\n• Beard Sculpt — $22\n• Kids' Cut — $25\n• Senior Cut — $28\n• The Full 1949 (fade + beard + shave) — $95\n\nPrices are the same at every chair, every location.";
    suggestions = [
      { label: "Full menu", href: "/services" },
      { label: "Book a chair", href: "/book" },
    ];
  } else if (intent.language) {
    reply =
      "Our team speaks **17 languages** between them — English, French, Spanish, Arabic, Tagalog, Twi, Italian, Punjabi, Japanese, Shona, Creole, and more. Tell me yours and I'll route you to the right chair.";
    suggestions = [
      { label: "See the team by language", href: "/team" },
    ];
  } else {
    reply =
      "I can book chairs, check live wait times, recommend cuts, match you with a barber, send gift cards, and answer anything about the shop. What do you need?";
    suggestions = [
      { label: "Book a chair", href: "/book" },
      { label: "Recommend a cut", href: "/style-studio" },
      { label: "Live wait times", href: "/wait-times" },
    ];
  }

  // Stream the reply word by word.
  for (const part of reply.split(/(\s+)/)) {
    yield { t: "text", v: part };
    await new Promise((r) => setTimeout(r, 22));
  }
  yield { t: "suggestions", v: suggestions };
}

export function mockWait(locSlug: string): number {
  // Deterministic per location + 10-minute bucket, looks "live" between refreshes.
  const bucket = Math.floor(Date.now() / (10 * 60 * 1000));
  let h = 0;
  const s = locSlug + ":" + bucket;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  const min = Math.abs(h) % 45;
  return min;
}
