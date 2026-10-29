import { createFileRoute, Link } from "@tanstack/react-router";
import { BaliRetreatDetails } from "@/components/bali-retreat-details";
import villaBathroom from "@/assets/villa-bathroom.webp.asset.json";
import villaDiningPavilion from "@/assets/villa-dining-pavilion.jpeg.asset.json";
import villaExterior from "@/assets/villa-exterior.webp.asset.json";
import villaLounge from "@/assets/villa-lounge.webp.asset.json";
import villaAfterDark from "@/assets/villa-after-dark.jpeg.asset.json";
import villaPoolDeckLawn from "@/assets/villa-pool-deck-lawn.jpeg.asset.json";
import villaSunsetPool from "@/assets/villa-sunset-pool.webp.asset.json";
import { scheduleBlocks, scheduleDays, scheduleTimes } from "@/lib/bali-schedule";
import { ScheduleGrid } from "@/components/schedule-grid";

export const Route = createFileRoute("/retreats/bali")({
  head: () => ({
    meta: [
      { title: "Bali Body & Breath — Mar 6–14 · Huella" },
      {
        name: "description",
        content:
          "A wellness retreat at Uluwatu Villa, Bali, March 6–14 — stretching, pilates, yoga, breathing and sound healing. From AED 15,000.",
      },
      { property: "og:title", content: "Bali Body & Breath — Mar 6–14 · Huella" },
      {
        property: "og:description",
        content:
          "Stretching, pilates, yoga, breathing and sound healing at Uluwatu Villa. March 6–14, from AED 15,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BaliRetreat,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
      <span className="inline-block h-px w-10 bg-clay/40" />
      {children}
    </div>
  );
}


function BaliRetreat() {
  const villaShots = [
    {
      src: villaExterior,
      alt: "Contemporary two-story villa with curved rooflines and floor-to-ceiling glass beside an organic-form pool",
      caption: "The house, pool and lawn",
    },
    {
      src: villaLounge,
      alt: "Open-air living lounge with white sofas and woven pendant lights, opening onto the pool deck",
      caption: "The open-air lounge",
    },
    {
      src: villaPoolDeckLawn,
      alt: "Sunlit lawn beside the pool with yoga mats laid in an arc and cushioned loungers under umbrellas",
      caption: "Pool deck & lawn",
    },
    {
      src: villaSunsetPool,
      alt: "Freeform pool reflecting a sunset over the villa garden",
      caption: "The pool at sunset",
    },
    {
      src: villaDiningPavilion,
      alt: "Open-air pavilion at night with yoga mats and bolsters beside a long timber dining table",
      caption: "Dinner in the pavilion",
    },
    {
      src: villaBathroom,
      alt: "Bathroom with a freestanding soaking tub, timber vanity and backlit mirror",
      caption: "Room bathroom",
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium tracking-[0.3em] uppercase">
            Huella
          </span>
        </Link>
        <Link
          to="/"
          hash="enquire"
          className="rounded-full bg-ink px-5 py-2.5 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-clay"
        >
          Request Info
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1360px] px-6 pt-6 pb-14">
        <div className="animate-rise">
          <Eyebrow>Bali · Wellness Retreat · Mar 6–14</Eyebrow>
        </div>
        <h1
          className="animate-rise mt-6 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Bali Body & <span className="text-clay italic">Breath</span>
        </h1>
        <p
          className="animate-rise mt-6 max-w-[56ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.2s" }}
        >
          A retreat for wellness, introspection and connection — stretching, pilates, yoga,
          breathing and sound healing, with space to slow down at Uluwatu Villa.
        </p>
      </section>

      {/* Hero image */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <img
          src={villaAfterDark.url}
          alt="The villa at night, warm light spilling over a sunken seating courtyard and the lit pool"
          width={1264}
          height={843}
          className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
        />
      </section>

      {/* The villa */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <Eyebrow>The villa</Eyebrow>
        <h2
          className="animate-rise mt-6 max-w-[22ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Uluwatu Villa — the house you <span className="text-clay italic">stay in</span>
        </h2>
        <p
          className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.15s" }}
        >
          Eight rooms, one pool, and pavilions that open straight onto the lawn. Practise, eat and
          rest here for the whole week.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {villaShots.map((shot) => (
            <figure key={shot.src.asset_id}>
              <img
                src={shot.src.url}
                alt={shot.alt}
                width={1360}
                height={907}
                loading="lazy"
                className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5 transition-transform duration-500 hover:scale-[1.01]"
              />
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="min-w-0 md:col-span-7">
            <BaliRetreatDetails />
          </div>

          {/* Facts panel */}
          <div className="min-w-0 md:col-span-5">
            <div className="rounded-[14px] bg-sand p-6 ring-1 ring-ink/5 lg:p-8">
              <dl className="grid grid-cols-1 gap-5">
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Dates</dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">March 6 – 14</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Location</dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">Uluwatu Villa</dd>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">
                      Availability
                    </dt>
                    <dd className="mt-1 font-display text-[1.3rem] font-medium">8 rooms</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">
                      Max capacity
                    </dt>
                    <dd className="mt-1 font-display text-[1.3rem] font-medium">16 people</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">
                    Base price
                  </dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">
                    From AED 15,000
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">
                    Discipline
                  </dt>
                  <dd className="mt-1 text-[14px] text-ink/70">
                    Stretching · Pilates · Yoga · Breathing · Sound healing
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-[13px] leading-relaxed text-ink/60">
                Every trip is quoted by hand. Send a note and a trip designer will share the full
                itinerary and a tailored proposal.
              </p>
              <Link
                to="/"
                hash="enquire"
                className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink"
              >
                Request the itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly rhythm */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <Eyebrow>The weekly rhythm</Eyebrow>
        <h2
          className="animate-rise mt-6 max-w-[24ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          A week, hour by <span className="text-clay italic">hour</span>
        </h2>
        <p
          className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.15s" }}
        >
          Arrive on Saturday and settle in — mornings of movement, afternoons for adventure or
          stillness, evenings together around the table.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-4 text-[10px] text-ink/65">
          {[
            { label: "Movement & mindfulness", color: "bg-blush" },
            { label: "Around the table", color: "bg-sage" },
            { label: "Optional experiences", color: "bg-mist" },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              {item.label}
            </span>
          ))}
        </div>

        <ScheduleGrid
          days={scheduleDays}
          times={scheduleTimes}
          blocks={scheduleBlocks}
          cornerLabel="Bali time"
          ariaLabel="Bali weekly schedule"
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-4 px-6 py-10 text-[12px] tracking-[0.14em] text-ink/50 uppercase sm:flex-row">
          <span className="font-display font-medium">Huella — Dubai Sports Trips Atelier</span>
          <span>hello@huella.travel · Dubai, UAE</span>
        </div>
      </footer>
    </div>
  );
}
