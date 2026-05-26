import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ConciergeMount } from "@/components/concierge/ConciergeMount";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { CursorAura } from "@/components/motion/CursorAura";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";

const display = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE = "https://1949barbershop.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "1949 Barber Shop — The UN of Barbershops · Newfoundland & Labrador",
    template: "%s · 1949 Barber Shop",
  },
  description:
    "Newfoundland and Labrador's most celebrated barbershop. Precision fades, hot-towel shaves, and a chair for every story — across six locations in St. John's, CBS, Mt. Pearl and Gander. Book in 30 seconds.",
  keywords: [
    "barbershop St. John's",
    "barber Newfoundland",
    "1949 barber shop",
    "haircut St. John's",
    "fade barber NL",
    "CBS barber shop",
    "Gander barber",
    "Mt. Pearl barber",
    "hot towel shave Newfoundland",
  ],
  authors: [{ name: "1949 Barber Shop Ltd." }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "1949 Barber Shop",
    title: "1949 Barber Shop — The UN of Barbershops",
    description:
      "Six locations across Newfoundland & Labrador. Precision fades, hot-towel shaves, and an AI concierge that books you in 30 seconds.",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "1949 Barber Shop",
    description: "The UN of Barbershops — Newfoundland & Labrador.",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="grain min-h-screen flex flex-col bg-bg text-ink">
        <ScrollProgress />
        <CursorAura />
        <SiteHeader />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <ConciergeMount />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
