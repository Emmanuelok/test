const stats = [
  { value: "6", label: "Locations across NL" },
  { value: "17", label: "Nationalities behind the chair" },
  { value: "47k+", label: "Cuts since 2018" },
  { value: "4.9★", label: "Average across 1,800+ reviews" },
];

export function StatStrip() {
  return (
    <section className="border-y border-line bg-bg-elev/40 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left lg:px-6 lg:border-l first:border-0 border-line">
            <div className="serif text-4xl text-gold gold-text font-semibold">
              {s.value}
            </div>
            <div className="mt-2 text-xs tracking-eyebrow text-ink-dim">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
