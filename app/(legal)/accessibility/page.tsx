export const metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <article className="py-20 px-6 max-w-3xl mx-auto text-ink-dim">
      <h1 className="serif text-5xl text-ink tracking-display">Accessibility</h1>
      <p className="mt-6">
        This site is built to WCAG 2.2 AA. All chairs are step-free. Our
        concierge speaks 17 languages and accepts plain-English requests so
        nobody needs to fight a form to book a cut. If a chair, an interface,
        or anything else here isn&apos;t working for you — please tell us at{" "}
        <a className="text-gold" href="mailto:hello@1949barbershop.ca">hello@1949barbershop.ca</a>{" "}
        and we&apos;ll fix it.
      </p>
    </article>
  );
}
