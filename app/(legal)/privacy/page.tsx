export const metadata = { title: "Privacy" };

export default function Page() {
  return (
    <article className="py-20 px-6 max-w-3xl mx-auto prose-lg text-ink-dim">
      <h1 className="serif text-5xl text-ink tracking-display">Privacy</h1>
      <p className="mt-6">
        We collect only what we need to confirm your booking and send you a
        reminder: your name, email, phone, and the details of your visit. We
        don&apos;t sell your data and we don&apos;t train AI models on it.
      </p>
      <p className="mt-4">
        Our AI concierge processes your messages to answer your question and
        book your chair. Conversations are kept for 30 days for service quality
        and then deleted. Email <a className="text-gold" href="mailto:hello@1949barbershop.ca">hello@1949barbershop.ca</a>{" "}
        for a copy or deletion of your data.
      </p>
    </article>
  );
}
