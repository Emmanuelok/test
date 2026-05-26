const reviews = [
  {
    quote:
      "Sonny is a wizard with the clippers. Best fade I've had since I moved to the island. Worth the wait every time.",
    name: "Connor M.",
    where: "Topsail Rd · Google",
  },
  {
    quote:
      "Took my four-year-old in nervous about her first haircut. They had her laughing in two minutes and the cut was perfect.",
    name: "Sarah K.",
    where: "CBS · Facebook",
  },
  {
    quote:
      "Walked in from Bay Roberts on a Saturday at noon. Twenty-minute wait, gorgeous skin fade, twenty-six bucks. Unreal value.",
    name: "Liam P.",
    where: "Torbay Rd · Google",
  },
  {
    quote:
      "The hot-towel shave at Topsail is the most relaxing forty minutes in my month. I tip 30%. They deserve it.",
    name: "Devon R.",
    where: "Topsail Rd · Fresha",
  },
  {
    quote:
      "I'm from Manila. Sonny speaks Tagalog. He understood exactly what I wanted before I finished explaining it. This place is special.",
    name: "Mark V.",
    where: "Mt. Pearl · Instagram",
  },
  {
    quote:
      "They blended my grey at the temples in five minutes. I look ten years younger. My wife noticed. My boss noticed. Don't tell.",
    name: "Patrick D.",
    where: "Freshwater · Google",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="tracking-eyebrow text-[10px] text-gold mb-4">
            — Word from the chair
          </div>
          <h2 className="serif text-5xl lg:text-6xl leading-[0.95] tracking-display">
            1,800+ five-star reviews
            <br />
            <em className="text-gold">across the province.</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="border border-line bg-bg-elev/40 p-6 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-gold text-sm">★★★★★</div>
                <blockquote className="serif italic text-xl leading-snug mt-3 text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-line/60">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs tracking-eyebrow text-ink-mute mt-1">
                  {r.where}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
