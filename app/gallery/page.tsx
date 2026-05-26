import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Portfolio",
  description: "240+ fresh cuts from every chair across Newfoundland.",
};

export default function GalleryPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— The Work</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.9] tracking-display">
          240+ cuts.
          <br />
          <em className="text-gold">Every chair.</em>
        </h1>
        <p className="mt-6 max-w-xl text-ink-dim text-lg">
          Fresh off the chair, tagged by style and barber. Filter, pick, book.
        </p>
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
}
