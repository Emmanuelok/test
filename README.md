# 1949 Barber Shop

The most intelligent barbershop platform in Canada — built for **1949 Barber Shop**, Newfoundland and Labrador's six-location chain.

> _"The UN of Barbershops."_ — CBC News

## What's in here

A production-grade Next.js 16 + Tailwind 4 site with real architecture (not a static brochure) and an AI surface area that doesn't exist on any other barbershop site in Canada.

### Customer-facing

- **Homepage** — hero, brand story, AI tool showcase, locations, press, testimonials
- **Booking flow** (`/book`) — 5-step location → service → barber → time → details, with real availability calculation, conflict checking, and confirmation refs
- **Locations** (`/locations`, `/locations/[slug]`) — all 6 NL locations with hours, parking, team, live open/closed status
- **Services menu** (`/services`) — full pricing across 12 services
- **Team** (`/team`) — barbers grouped by location, language, specialty
- **Our Story** (`/story`) — long-form, drawing on CBC's reporting
- **AI Concierge** (`/concierge`) — full-page chat that books, recommends, answers, in 17 languages
- **Style Studio** (`/style-studio`) — 4-question AI cut recommender, ranks 8 cuts by face shape × hair texture × length × vibe
- **Barber Match** (`/match`) — 2-question quiz pairing customer with the right barber by specialty
- **Live Wait Times** (`/wait-times`) — real-time walk-in wait at every chair, 60-sec refresh
- **Loyalty** (`/loyalty`) — 3-tier "Chairs" rewards programme
- **Account** (`/account`) — booking history, smart re-book reminders, preferences
- **Gift Cards** (`/gift-cards`) — 30-second send flow with live preview
- **Notifications, PWA install, Privacy, Terms, Accessibility**

### Smart features no other NL barbershop has

| Tool | What it does |
| --- | --- |
| AI Concierge | Natural-language booking. "Book me a skin fade tomorrow morning near Topsail" → confirmed slot. |
| Style Studio | Visual ranker of 8 cuts against face shape / texture / vibe, with reasons. |
| Barber Match™ | Pairs you with the barber whose specialty fits. |
| Live Wait Times | Real wait at each chair, every 60 sec. |
| Smart re-book | Learns your cadence, texts three slots that fit your usual week. |
| 17-language concierge | Spoken at our chairs: English, French, Spanish, Arabic, Tagalog, Twi, Italian, Punjabi, Japanese, Shona, Creole + more. |
| Auto weather-aware reschedule | Texts you a one-tap reschedule if the weather turns. |
| Digital gift cards | 30-second send, no expiry, every chair. |

### APIs

| Route | Purpose |
| --- | --- |
| `POST /api/ai/concierge` | NDJSON-streamed concierge replies + structured suggestion chips |
| `GET /api/availability` | Slot generation for a (location, service, barber?, date) tuple |
| `POST /api/bookings` | Create a booking with conflict check, Zod-validated |

### Architecture

- **Next.js 16 App Router** (Turbopack production build)
- **React 19 Server Components** for everything content; client islands only where state is needed
- **Tailwind 4** with a brand-aware design token system in `app/globals.css`
- **Pure SVG** brand identity — no raster logo to lose
- **Schema.org LocalBusiness JSON-LD** for all 6 locations (SEO)
- **Storage adapter** in `lib/bookings/store.ts` — module-local Map today; swap for Postgres/Neon for production
- **Mock AI** behind a clean interface in `lib/ai/concierge-brain.ts` — replace `respond()` with an Anthropic/OpenAI call and the UI doesn't change

### Where to plug real services in

| Today | Tomorrow |
| --- | --- |
| Mock concierge in `lib/ai/concierge-brain.ts` | Anthropic Claude / OpenAI streaming call |
| In-memory bookings store | Postgres (Neon, Supabase) via the `BookingStore` interface |
| `// await sendConfirmationEmail(booking)` stub | Resend / Postmark |
| `// await sendConfirmationSMS(booking)` stub | Twilio / Telnyx |
| Mock wait times | Real POS / chair-occupancy webhook |

## Run locally

```bash
pnpm install
pnpm dev   # http://localhost:3000
pnpm build && pnpm start   # production build
```

## Deploy to Vercel

1. Push to GitHub (already done if you're reading this on the repo)
2. Go to <https://vercel.com/new>, import the repo
3. Framework preset: **Next.js** (auto-detected). No env vars required for the demo
4. Deploy. You'll have a live URL in ~60 seconds.

For real AI: set `ANTHROPIC_API_KEY` and swap the body of `respond()` in `lib/ai/concierge-brain.ts` to call the SDK.

## Credits

Brand: 1949 Barber Shop Ltd · Newfoundland and Labrador · founded 2018 by Yaw Antwi-Adjei and Gustavo Valoyes. Customer testimonials are illustrative; team roster includes the publicly profiled founders and uses representative placeholders elsewhere to be replaced by the shop's confirmed team list.
