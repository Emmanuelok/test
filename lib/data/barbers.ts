export type Barber = {
  slug: string;
  name: string;
  title: string;
  locationSlugs: string[];
  from: string; // homeland
  fromFlag: string;
  yearsBehindChair: number;
  specialties: string[];
  languages: string[];
  bio: string;
  bookableWith: string[]; // service slugs they specialise in
};

// Composite team roster informed by the CBC longform & public profiles.
// Names that are publicly attributed to the shop (Yaw, Mandip, Sonny) are kept;
// others are representative placeholders matching the shop's "UN of barbershops"
// identity. Replace once the team confirms.

export const barbers: Barber[] = [
  {
    slug: "yaw-antwi-adjei",
    name: "Yaw Antwi-Adjei",
    title: "Founder · Master Barber",
    locationSlugs: ["topsail-road", "cbs"],
    from: "Ghana",
    fromFlag: "🇬🇭",
    yearsBehindChair: 9,
    specialties: ["Skin Fades", "Textured Hair", "Beard Sculpt"],
    languages: ["English", "Twi"],
    bio: "Yaw arrived in St. John's from Ghana in 2016 on a Master of Philosophy at Memorial. He opened the first 1949 chair with Gustavo two years later. Today he runs six. He still cuts every week.",
    bookableWith: ["signature-fade", "skin-fade", "the-full-1949", "beard-trim"],
  },
  {
    slug: "gustavo-valoyes",
    name: "Gustavo Valoyes",
    title: "Co-Founder · Master Barber",
    locationSlugs: ["topsail-road", "torbay-road"],
    from: "Colombia",
    fromFlag: "🇨🇴",
    yearsBehindChair: 12,
    specialties: ["Classic Cut", "Hot-Towel Shave", "Scissor Work"],
    languages: ["English", "Spanish"],
    bio: "Gustavo brought twelve years of Bogotá barbering to St. John's and never looked back. The Full 1949 package is his recipe.",
    bookableWith: ["classic-cut", "hot-towel-shave", "the-full-1949"],
  },
  {
    slug: "mandip-garcha",
    name: "Mandip Garcha",
    title: "Senior Barber",
    locationSlugs: ["torbay-road", "freshwater-road"],
    from: "Italy",
    fromFlag: "🇮🇹",
    yearsBehindChair: 6,
    specialties: ["Fades", "Line Work", "Kids"],
    languages: ["English", "Italian", "Punjabi"],
    bio: "Mandip moved from Italy and, in his words, is 'living his dream.' Profiled by CBC — and routinely the longest waitlist in the shop.",
    bookableWith: ["signature-fade", "kids-cut", "line-up"],
  },
  {
    slug: "sonny",
    name: "Sonny",
    title: "Senior Barber",
    locationSlugs: ["topsail-road", "mt-pearl"],
    from: "Philippines",
    fromFlag: "🇵🇭",
    yearsBehindChair: 8,
    specialties: ["Precision Fades", "Hair Design", "Edge-Up"],
    languages: ["English", "Tagalog"],
    bio: "Reviewers single Sonny out by name. Precision is his religion — and his design work is the reason the shop gets tagged on Instagram every week.",
    bookableWith: ["signature-fade", "design", "line-up"],
  },
  {
    slug: "amare",
    name: "Amare",
    title: "Barber",
    locationSlugs: ["topsail-road", "cbs"],
    from: "Zimbabwe",
    fromFlag: "🇿🇼",
    yearsBehindChair: 5,
    specialties: ["Skin Fade", "Textured Hair", "Beard"],
    languages: ["English", "Shona"],
    bio: "Came to NL on a student visa, fell in love with the chair, never left. Specialises in textured hair and the cleanest skin fades east of Halifax.",
    bookableWith: ["skin-fade", "signature-fade", "beard-trim"],
  },
  {
    slug: "marco",
    name: "Marco",
    title: "Barber",
    locationSlugs: ["cbs", "mt-pearl"],
    from: "Mauritius",
    fromFlag: "🇲🇺",
    yearsBehindChair: 4,
    specialties: ["Classic Cut", "Beard Sculpt"],
    languages: ["English", "French", "Creole"],
    bio: "Trained in Port-Louis, brought the Mauritian classic-cut tradition to CBS. Speaks French to half the chair.",
    bookableWith: ["classic-cut", "beard-trim"],
  },
  {
    slug: "samir",
    name: "Samir",
    title: "Barber",
    locationSlugs: ["gander", "freshwater-road"],
    from: "Lebanon",
    fromFlag: "🇱🇧",
    yearsBehindChair: 7,
    specialties: ["Hot-Towel Shave", "Beard", "Senior Cut"],
    languages: ["English", "Arabic"],
    bio: "Beirut-trained, Newfoundland-loyal. The hot-towel shave at Gander is his ritual, perfected over seven years.",
    bookableWith: ["hot-towel-shave", "senior", "beard-trim"],
  },
  {
    slug: "kenji",
    name: "Kenji",
    title: "Apprentice Barber",
    locationSlugs: ["topsail-road"],
    from: "Japan",
    fromFlag: "🇯🇵",
    yearsBehindChair: 2,
    specialties: ["Line-Up", "Kids", "Design"],
    languages: ["English", "Japanese"],
    bio: "Our newest chair. Apprenticed under Sonny — already booked two weeks out.",
    bookableWith: ["line-up", "kids-cut", "design"],
  },
];

export const getBarber = (slug: string) => barbers.find((b) => b.slug === slug);

export const barbersForLocation = (locSlug: string) =>
  barbers.filter((b) => b.locationSlugs.includes(locSlug));
