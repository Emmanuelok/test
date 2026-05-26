import { GiftCardComposer } from "@/components/gift/GiftCardComposer";

export const metadata = {
  title: "Gift Cards",
  description:
    "Send a 1949 Barber Shop gift card by text or email in 30 seconds. Redeemable at every chair, every location.",
};

export default function GiftCardsPage() {
  return (
    <div className="py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tracking-eyebrow text-[10px] text-gold mb-3">— Gift Cards</div>
        <h1 className="serif text-5xl lg:text-7xl leading-[0.95] tracking-display max-w-3xl">
          The cut as a gift.
          <br />
          <em className="text-gold">Send in 30 seconds.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-ink-dim text-lg">
          Pick an amount, write a note, send by text or email. They redeem at
          any of our six chairs. No expiry.
        </p>
        <div className="mt-16">
          <GiftCardComposer />
        </div>
      </div>
    </div>
  );
}
