import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCAD(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function pluralize(n: number, singular: string, plural?: string) {
  return n === 1 ? singular : plural ?? singular + "s";
}

const NICK = [
  "Atlas",
  "Beacon",
  "Cabot",
  "Dory",
  "Echo",
  "Flag",
  "Granite",
  "Hawthorn",
  "Iceberg",
  "Jib",
  "Kelp",
  "Lighthouse",
  "Mariner",
  "Northern",
  "Outport",
  "Puffin",
  "Quay",
  "Reef",
  "Skipper",
  "Trinity",
];

export function maskName(name: string) {
  if (!name) return "Guest";
  const first = name.split(" ")[0] ?? "";
  if (first.length < 2) return "Guest";
  return first[0] + first.slice(1).replace(/./g, "•");
}

export function nicknameFromSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return NICK[Math.abs(h) % NICK.length];
}
