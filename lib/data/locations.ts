export type Hours = {
  day:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  open: string | null;
  close: string | null;
};

export type Location = {
  slug: string;
  name: string;
  short: string;
  address: string;
  city: string;
  province: "NL";
  postal: string;
  phone: string;
  fresha?: string;
  lat: number;
  lng: number;
  hours: Hours[];
  chairs: number;
  walkIns: boolean;
  parking: string;
  features: string[];
  blurb: string;
};

const std = (open: string, close: string): Hours[] => [
  { day: "Sunday", open: "12:00", close: "17:00" },
  { day: "Monday", open, close },
  { day: "Tuesday", open, close },
  { day: "Wednesday", open, close },
  { day: "Thursday", open, close },
  { day: "Friday", open, close },
  { day: "Saturday", open, close },
];

export const locations: Location[] = [
  {
    slug: "topsail-road",
    name: "Village · Topsail Road",
    short: "Village Mall",
    address: "430 Topsail Road",
    city: "St. John's",
    province: "NL",
    postal: "A1E 4N1",
    phone: "(709) 576-2425",
    fresha:
      "https://www.fresha.com/lvp/1949-barber-shop-ltd-430topsail-road-st-johns-Mxe4J1",
    lat: 47.5363,
    lng: -52.7575,
    hours: std("10:00", "20:00"),
    chairs: 8,
    walkIns: true,
    parking: "Mall surface lot · 600+ spaces",
    features: [
      "Largest of the six chairs",
      "Inside Village Shopping Centre",
      "Sunday hours",
      "Express kids' line",
    ],
    blurb:
      "Our flagship inside the Village. Eight chairs, the world map on the wall, and the easiest parking in town.",
  },
  {
    slug: "torbay-road",
    name: "Torbay Road",
    short: "Torbay Rd",
    address: "141 Torbay Road",
    city: "St. John's",
    province: "NL",
    postal: "A1A 2H1",
    phone: "(709) 576-2425",
    lat: 47.5856,
    lng: -52.7099,
    hours: std("10:00", "20:00"),
    chairs: 6,
    walkIns: true,
    parking: "Free street + side lot",
    features: ["Late evenings", "Walk-ins encouraged", "Beard specialists"],
    blurb:
      "The east-end original. Where the music's a little louder and the regulars know each other by chair number.",
  },
  {
    slug: "freshwater-road",
    name: "Freshwater Road",
    short: "Freshwater",
    address: "336 Freshwater Road",
    city: "St. John's",
    province: "NL",
    postal: "A1B 1C1",
    phone: "(709) 576-2425",
    lat: 47.5736,
    lng: -52.7282,
    hours: std("09:00", "19:00"),
    chairs: 5,
    walkIns: true,
    parking: "Free on-site lot",
    features: ["Quick weekday lunch slots", "Quietest of the six"],
    blurb:
      "A short walk from MUN. The chair of choice for students, professors and the lunch-break crowd.",
  },
  {
    slug: "cbs",
    name: "Conception Bay South",
    short: "CBS",
    address: "54 Conception Bay Highway",
    city: "Conception Bay South",
    province: "NL",
    postal: "A1W 3A1",
    phone: "(709) 757-4567",
    fresha:
      "https://www.fresha.com/lvp/1949-barber-shop-cbs-conception-bay-highway-conception-bay-south-gn1xn1",
    lat: 47.5258,
    lng: -52.9893,
    hours: [
      { day: "Sunday", open: null, close: null },
      { day: "Monday", open: "10:00", close: "19:00" },
      { day: "Tuesday", open: "10:00", close: "19:00" },
      { day: "Wednesday", open: "10:00", close: "19:00" },
      { day: "Thursday", open: "10:00", close: "19:00" },
      { day: "Friday", open: "10:00", close: "19:00" },
      { day: "Saturday", open: "10:00", close: "19:00" },
    ],
    chairs: 5,
    walkIns: true,
    parking: "Free on-site",
    features: ["Closed Sundays", "Family-friendly", "Free parking"],
    blurb:
      "Our CBS home on the Conception Bay Highway. Walk in, grab a coffee next door, leave looking sharp.",
  },
  {
    slug: "mt-pearl",
    name: "Mt. Pearl",
    short: "Mt. Pearl",
    address: "Old Placentia Road",
    city: "Mt. Pearl",
    province: "NL",
    postal: "A1N 0A1",
    phone: "(709) 576-2425",
    lat: 47.5189,
    lng: -52.8086,
    hours: std("10:00", "19:00"),
    chairs: 5,
    walkIns: true,
    parking: "Free plaza lot",
    features: ["Plaza location", "Senior morning rate", "Kids' Saturday"],
    blurb:
      "The Mt. Pearl shop. Quiet mornings for our senior regulars, busy Saturdays for the whole family.",
  },
  {
    slug: "gander",
    name: "Gander",
    short: "Gander",
    address: "81 Elizabeth Drive",
    city: "Gander",
    province: "NL",
    postal: "A1V 1H7",
    phone: "(709) 651-1949",
    lat: 48.9569,
    lng: -54.6089,
    hours: std("10:00", "19:00"),
    chairs: 4,
    walkIns: true,
    parking: "Free on-site",
    features: [
      "Our central NL home",
      "Travellers welcome",
      "Same chairs, same craft",
    ],
    blurb:
      "Central Newfoundland's home for the 1949 chair. The same precision the rest of the province knows — closer to home for the centre and west.",
  },
];

export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);

export const formatHoursLine = (h: Hours) =>
  h.open === null
    ? `${h.day} — Closed`
    : `${h.day} · ${formatTime(h.open!)} – ${formatTime(h.close!)}`;

export function formatTime(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const am = hh < 12;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}${mm ? ":" + String(mm).padStart(2, "0") : ""} ${am ? "am" : "pm"}`;
}

export function isOpenNow(loc: Location, now = new Date()) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;
  const today = days[now.getDay()];
  const hours = loc.hours.find((h) => h.day === today);
  if (!hours || hours.open === null) return false;
  const [oh, om] = hours.open.split(":").map(Number);
  const [ch, cm] = hours.close!.split(":").map(Number);
  const open = new Date(now);
  open.setHours(oh, om, 0, 0);
  const close = new Date(now);
  close.setHours(ch, cm, 0, 0);
  return now >= open && now < close;
}
