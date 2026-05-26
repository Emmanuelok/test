export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  durationMin: number;
  priceCad: number;
  category: "haircut" | "beard" | "shave" | "kids" | "package" | "specialty";
  popular?: boolean;
  signature?: boolean;
  includes?: string[];
};

export const services: Service[] = [
  {
    slug: "signature-fade",
    name: "The 1949 Signature Fade",
    tagline: "The cut we're known for.",
    description:
      "A precision skin, mid, low or taper fade — sculpted to your face shape and hair texture, finished with hot-towel detailing around the ears and neck.",
    durationMin: 45,
    priceCad: 42,
    category: "haircut",
    popular: true,
    signature: true,
    includes: [
      "Consultation & face-shape read",
      "Clipper-over-comb blend",
      "Hot-towel neck cleanup",
      "Style finish with product",
    ],
  },
  {
    slug: "classic-cut",
    name: "Classic Cut",
    tagline: "Scissor work. Done right.",
    description:
      "A traditional gentleman's haircut — scissor-led, blended on the sides, styled with your choice of finish.",
    durationMin: 35,
    priceCad: 35,
    category: "haircut",
    popular: true,
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    tagline: "Bald to blended, seamlessly.",
    description:
      "Razor-finished bald fade with a clean blend into your length on top. The cut that put us on every Instagram feed in the province.",
    durationMin: 50,
    priceCad: 45,
    category: "haircut",
  },
  {
    slug: "kids-cut",
    name: "Kids' Cut",
    tagline: "Their first chair to their hundredth.",
    description:
      "For under-12s. We take the time to make it fun — and to make it look great in their school photo.",
    durationMin: 30,
    priceCad: 25,
    category: "kids",
  },
  {
    slug: "senior",
    name: "Senior Cut",
    tagline: "For our regulars who started it all.",
    description:
      "For 65+. A classic cut, an unhurried chair, and a real conversation. Mornings Tuesday–Thursday.",
    durationMin: 35,
    priceCad: 28,
    category: "haircut",
  },
  {
    slug: "beard-trim",
    name: "Beard Sculpt",
    tagline: "Lines you can see from across the room.",
    description:
      "Shape, line-up, and a hot-towel finish. We map the beard to your jawline — no guesswork.",
    durationMin: 25,
    priceCad: 22,
    category: "beard",
    popular: true,
  },
  {
    slug: "hot-towel-shave",
    name: "Hot-Towel Straight Razor Shave",
    tagline: "The full ritual. 35 minutes of quiet.",
    description:
      "The traditional shave: hot towels, pre-shave oil, hand-lathered cream, straight razor pass with and against the grain, cold towel, balm.",
    durationMin: 40,
    priceCad: 45,
    category: "shave",
    signature: true,
    includes: [
      "Pre-shave hot-towel prep",
      "Hand-lathered shave",
      "Two-pass straight razor",
      "Cold towel + post-shave balm",
    ],
  },
  {
    slug: "the-full-1949",
    name: "The Full 1949",
    tagline: "Fade. Beard. Shave. The works.",
    description:
      "Our signature package. Signature fade, beard sculpt, hot-towel straight razor finish — about 90 minutes in the chair, one price.",
    durationMin: 90,
    priceCad: 95,
    category: "package",
    signature: true,
    includes: [
      "1949 Signature Fade",
      "Beard Sculpt",
      "Hot-Towel Razor Finish",
      "Style + product takeaway",
    ],
  },
  {
    slug: "line-up",
    name: "Line-Up / Edge-Up",
    tagline: "Between cuts. Sharp lines, fast.",
    description:
      "Razor line-up on hairline, neck and beard. The seven-day touch-up that keeps the cut looking like day one.",
    durationMin: 15,
    priceCad: 15,
    category: "specialty",
  },
  {
    slug: "design",
    name: "Hair Design",
    tagline: "Add-on. Initials, parts, custom work.",
    description:
      "Add a hair part, design line or freehand work to any cut. Priced per design, talk to your barber.",
    durationMin: 10,
    priceCad: 10,
    category: "specialty",
  },
  {
    slug: "colour-grey-blending",
    name: "Grey Blending",
    tagline: "Subtle. Natural. Nobody will know.",
    description:
      "A 5-minute colour camo at the temples and beard — knocks ten years off without the commitment of a full colour.",
    durationMin: 20,
    priceCad: 30,
    category: "specialty",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
