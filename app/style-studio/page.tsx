import { StyleStudio } from "@/components/studio/StyleStudio";

export const metadata = {
  title: "Style Studio",
  description:
    "Upload a selfie. We read your face shape and walk you through eight cuts that suit you — side-by-side, in 20 seconds.",
};

export default function StyleStudioPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Style Studio · AI</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display max-w-3xl">
          Eight cuts.
          <br />
          <em className="text-gold">Twenty seconds.</em>
          <br />
          Built for your face.
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Tell us about you. We&apos;ll show you cuts that actually suit
          your face shape, hair texture, and lifestyle — and book the one you
          like with a tap.
        </p>

        <div className="mt-16">
          <StyleStudio />
        </div>
      </div>
    </div>
  );
}
