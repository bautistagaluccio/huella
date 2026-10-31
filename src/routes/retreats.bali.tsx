import { createFileRoute, Link } from "@tanstack/react-router";
import { Backpack, CalendarDays, House, Leaf, PersonStanding, Sparkles, UtensilsCrossed } from "lucide-react";
import { BaliRetreatDetails, baliSections } from "@/components/bali-retreat-details";
import { Button } from "@/components/ui/button";
import villaBathroom from "@/assets/villa-bathroom.webp";
import villaDiningPavilion from "@/assets/villa-dining-pavilion.jpeg";
import villaExterior from "@/assets/villa-exterior.webp";
import villaLounge from "@/assets/villa-lounge.webp";
import villaAfterDark from "@/assets/villa-after-dark.jpeg";
import villaPoolDeckLawn from "@/assets/villa-pool-deck-lawn.jpeg";
import villaSunsetPool from "@/assets/villa-sunset-pool.webp";
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

const retreatButtons = [
  { id: "villa", label: "The villa", icon: House },
  { id: "experience", label: "Experience", icon: Leaf },
  { id: "daily", label: "Daily practice", icon: PersonStanding },
  { id: "optional", label: "Optional activities", icon: Sparkles },
  { id: "food", label: "Nutrition", icon: UtensilsCrossed },
  { id: "packing", label: "What to pack", icon: Backpack },
];

const packingList = [
  { title: "Sport clothes & swimwear" },
  {
    title: "My documents (Passport, VISA)",
    link: { label: "Check if I need a VISA", href: "https://evisa.imigrasi.go.id/" },
  },
  { title: "My good energy" },
];

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
          src={villaAfterDark}
          alt="The villa at night, warm light spilling over a sunken seating courtyard and the lit pool"
          width={1264}
          height={843}
          className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
        />
      </section>

      {/* Trip details */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="min-w-0 md:col-span-7">
            <Eyebrow>The retreat</Eyebrow>
            <h2
              className="animate-rise mt-6 max-w-[24ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
              style={{ animationDelay: "0.1s" }}
            >
              The villa, the practice and the <span className="text-clay italic">time between</span>
            </h2>
            <p
              className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
              style={{ animationDelay: "0.15s" }}
            >
              Where you’ll stay, how the days unfold, what you can add and what to bring — each a
              tap away.
            </p>
            <nav aria-label="Retreat sections" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {retreatButtons.map((button) => (
                <Button key={button.id} variant="outline" asChild className="h-auto min-h-24 whitespace-normal border-ink/15 bg-sand/50 px-3 py-5 text-center text-[13px] text-ink shadow-none hover:bg-sand hover:text-clay">
                  <a href={`#bali-${button.id}`} className="flex flex-col gap-3">
                    {button.label}
                    <button.icon aria-hidden="true" className="size-5 text-clay" />
                  </a>
                </Button>
              ))}
              <Button variant="outline" asChild className="col-span-2 h-auto min-h-16 whitespace-normal border-ink/15 bg-sand/50 px-3 py-4 text-center text-[13px] text-ink shadow-none hover:bg-sand hover:text-clay sm:col-span-3">
                <a href="#bali-rhythm" className="flex items-center justify-center gap-3">
                  Weekly rhythm
                  <CalendarDays aria-hidden="true" className="size-5 text-clay" />
                </a>
              </Button>
            </nav>
          </div>

          {/* Facts panel */}
          <div className="min-w-0 md:col-span-5">
            <div className="flex h-full flex-col rounded-[14px] bg-sand p-6 ring-1 ring-ink/5 lg:p-8">
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
              <p className="mt-6 mb-6 text-[13px] leading-relaxed text-ink/60">
                Every trip is quoted by hand. Send a note and a trip designer will share the full
                itinerary and a tailored proposal.
              </p>
              <Link
                to="/"
                hash="enquire"
                className="mt-auto inline-block rounded-full bg-clay px-6 py-3 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink"
              >
                Request the itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The villa */}
      <section id="bali-villa" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
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
          Eight rooms, two pools, and pavilions that open straight onto the lawn.
          <br />
          Practise, eat and rest here for the whole week.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {villaShots.map((shot) => (
            <figure key={shot.src}>
              <img
                src={shot.src}
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

      {baliSections.map((section) => (
        <section key={section.value} id={`bali-${section.value}`} tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
          <Eyebrow>{section.label}</Eyebrow>
          <BaliRetreatDetails section={section.value} />
        </section>
      ))}

      {/* What to pack */}
      <section id="bali-packing" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
        <div>
          <div>
            <Eyebrow>What to pack</Eyebrow>
            <h2 className="mt-6 font-display text-[36px] leading-tight font-medium">
              Pack light, we'll handle the <span className="text-clay italic">rest</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/65">
              A short list — mats, towels and everything for the practice are at the villa.
            </p>
          </div>

          {/* A packing note visitors can tick off; ticks are not saved. */}
          <div className="mt-9">
            <div className="-rotate-[0.5deg] rounded-md bg-white/60 px-6 py-5 ring-1 ring-ink/10 motion-reduce:rotate-0 sm:px-8 sm:py-6">
              <p className="mb-2 text-[11px] tracking-[0.25em] text-ink/50 uppercase">Bali · Mar 6–14</p>
              <ul className="grid grid-cols-1 sm:grid-cols-3">
                {packingList.map(({ title, link }) => (
                  <li key={title} className="border-b border-dashed border-ink/20 py-3 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-2 sm:first:border-l-0 sm:first:pl-0">
                    <label className="flex cursor-pointer items-start gap-4">
                      <input type="checkbox" className="mt-1.5 size-4 shrink-0 accent-clay" />
                      <span className="font-display text-[20px] leading-snug">{title}</span>
                    </label>
                    {link && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 ml-8 inline-block text-[13px] text-clay underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly rhythm */}
      <section id="bali-rhythm" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
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
          <span className="font-display font-medium">Huella — Dubai Experience Studio</span>
          <span>contact@huellaretreat.com</span>
        </div>
      </footer>
    </div>
  );
}
