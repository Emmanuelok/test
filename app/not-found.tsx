import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="inline-block opacity-40 mb-10">
          <Logo size={120} />
        </div>
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">
          — 404
        </div>
        <h1 className="serif text-6xl lg:text-8xl leading-[0.9] tracking-display">
          Empty chair.
        </h1>
        <p className="mt-6 text-ink-dim text-lg max-w-md mx-auto">
          The page you&apos;re looking for has wandered off. The chairs
          haven&apos;t. Want a fresh cut instead?
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gold text-bg font-semibold px-7 py-3.5 rounded-sm hover:bg-gold-bright"
          >
            Back to home
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center justify-center border border-gold/40 hover:border-gold hover:bg-gold/5 px-7 py-3.5 rounded-sm"
          >
            Book a chair
          </Link>
        </div>
      </div>
    </div>
  );
}
