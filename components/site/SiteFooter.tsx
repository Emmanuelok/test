import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MapPin, Phone, Mail } from "lucide-react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
  </svg>
);
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.6V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9v2.4H8v3.2h2.6V21h2.9z" />
  </svg>
);
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 8.5a3 3 0 0 0-2.1-2.1C18.1 6 12 6 12 6s-6.1 0-7.9.4A3 3 0 0 0 2 8.5C1.6 10.3 1.6 12 1.6 12s0 1.7.4 3.5a3 3 0 0 0 2.1 2.1c1.8.4 7.9.4 7.9.4s6.1 0 7.9-.4a3 3 0 0 0 2.1-2.1c.4-1.8.4-3.5.4-3.5s0-1.7-.4-3.5z" />
    <path d="m10 14.5 4-2.5-4-2.5z" fill="currentColor" />
  </svg>
);
import { locations } from "@/lib/data/locations";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-bg-elev/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Logo size={88} />
            <p className="mt-6 text-ink-dim max-w-sm leading-relaxed">
              Newfoundland and Labrador&apos;s most celebrated barbershop.
              Founded 2018 in St. John&apos;s. Named for the year NL joined
              Confederation. Built for everyone.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/1949barbers/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 inline-grid place-items-center border border-line rounded-sm hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.facebook.com/1949shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 inline-grid place-items-center border border-line rounded-sm hover:border-gold hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=OX6HOyNh0_o"
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 inline-grid place-items-center border border-line rounded-sm hover:border-gold hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="tracking-eyebrow text-[10px] text-gold mb-4">Visit</h4>
            <ul className="space-y-2 text-sm text-ink-dim">
              <li>
                <Link href="/locations" className="hover:text-ink">All locations</Link>
              </li>
              {locations.slice(0, 4).map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="hover:text-ink"
                  >
                    {l.short}
                  </Link>
                </li>
              ))}
              <li><Link href="/careers" className="hover:text-ink">Careers</Link></li>
              <li><Link href="/press" className="hover:text-ink">Press kit</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="tracking-eyebrow text-[10px] text-gold mb-4">Book</h4>
            <ul className="space-y-2 text-sm text-ink-dim">
              <li><Link href="/book" className="hover:text-ink">A chair</Link></li>
              <li><Link href="/walk-in" className="hover:text-ink">Virtual queue</Link></li>
              <li><Link href="/group" className="hover:text-ink">Group / wedding</Link></li>
              <li><Link href="/club" className="hover:text-ink">Cut Club</Link></li>
              <li><Link href="/gift-cards" className="hover:text-ink">Gift cards</Link></li>
              <li><Link href="/loyalty" className="hover:text-ink">Rewards</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="tracking-eyebrow text-[10px] text-gold mb-4">Smart</h4>
            <ul className="space-y-2 text-sm text-ink-dim">
              <li><Link href="/concierge" className="hover:text-ink">AI Concierge</Link></li>
              <li><Link href="/style-studio" className="hover:text-ink">Style Studio</Link></li>
              <li><Link href="/match" className="hover:text-ink">Barber Match</Link></li>
              <li><Link href="/wait-times" className="hover:text-ink">Live wait times</Link></li>
              <li><Link href="/gallery" className="hover:text-ink">Gallery</Link></li>
              <li><Link href="/account" className="hover:text-ink">My account</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="tracking-eyebrow text-[10px] text-gold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-ink-dim">
              <li className="flex items-start gap-2">
                <Phone className="size-3.5 mt-1 text-gold shrink-0" />
                <span>(709) 576-2425</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-3.5 mt-1 text-gold shrink-0" />
                <span>hello@1949barbershop.ca</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 mt-1 text-gold shrink-0" />
                <span>St. John&apos;s · CBS · Mt. Pearl · Gander</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-mute">
          <div>
            © {year} 1949 Barber Shop Ltd. — All rights reserved. Newfoundland
            &amp; Labrador, Canada.
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ink-dim">Privacy</Link>
            <Link href="/terms" className="hover:text-ink-dim">Terms</Link>
            <Link href="/accessibility" className="hover:text-ink-dim">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
