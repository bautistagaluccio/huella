import { createFileRoute, Link } from "@tanstack/react-router";
import skiGudauriImg from "@/assets/ski-gudauri.jpg";
import { SkiAgendaCards } from "@/components/ski-agenda";
import { SkiTripDetails } from "@/components/ski-trip-details";
import lodgeDining from "@/assets/lodge-dining.jpg";
import lodgeLounge from "@/assets/lodge-lounge.jpg";
import lodgePool from "@/assets/lodge-pool.jpg";
import lodgeRoom from "@/assets/lodge-room.jpg";
import lodgeSnowTerrace from "@/assets/lodge-snow-terrace.jpg";
import lodgeTerrace from "@/assets/lodge-terrace.jpg";

export const Route = createFileRoute("/trips/ski-gudauri")({
  head: () => ({
    meta: [
      { title: "Caucasus Powder Days — Feb 17–21 · Huella" },
      {
        name: "description",
        content:
          "A five-day ski escape in Gudauri, February 17–21 — quiet slopes, mountain air and flights from Dubai included. From AED 10,000.",
      },
      { property: "og:title", content: "Caucasus Powder Days — Feb 17–21 · Huella" },
      {
        property: "og:description",
        content:
          "Five days on quiet slopes in Gudauri. February 17–21, flights from Dubai included, from AED 10,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkiGudauri,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
      <span className="inline-block h-px w-10 bg-clay/40" />
      {children}
    </div>
  );
}

function SkiGudauri() {
  const lodgeShots: {
    src: typeof lodgeSnowTerrace;
    alt: string;
    caption: string;
    position?: string;
  }[] = [
    {
      src: lodgeLounge,
      alt: "Lounge with a suspended fireplace and panoramic windows onto snowy mountains",
      caption: "The lounge",
    },
    {
      src: lodgeSnowTerrace,
      alt: "Snow-covered terrace with dark framed lounge chairs and low tables, snow-laden evergreens and a panorama of snow-capped ridges under a bright blue sky",
      caption: "The lodge",
      // Portrait source: favour the lower half so the wide crop shows the seating, not just sky.
      position: "center 60%",
    },
    {
      src: lodgeTerrace,
      alt: "Upper terrace with timber tables and chairs lined with white sheepskin throws, overlooking snowy peaks",
      caption: "The upper terrace",
    },
    {
      src: lodgePool,
      alt: "Heated outdoor pool steaming in deep snow under a clear blue sky",
      caption: "The pool, in snow",
    },
    {
      src: lodgeDining,
      alt: "Outdoor dining terrace set for lunch with a snow-covered mountain view",
      caption: "Lunch on the terrace",
    },
    {
      src: lodgeRoom,
      alt: "Contemporary bedroom with a low timber bed, circular armchair and large windows",
      caption: "The rooms",
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
          <Eyebrow>Gudauri · Ski · Feb 17–21</Eyebrow>
        </div>
        <h1
          className="animate-rise mt-6 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Caucasus Powder <span className="text-clay italic">Days</span>
        </h1>
        <p
          className="animate-rise mt-6 max-w-[56ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.2s" }}
        >
          Five days on quiet mountain slopes in Gudauri — flights from Dubai included, with
          every transfer and detail settled before you land.
        </p>
      </section>

      {/* Hero image */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <img
          src={skiGudauriImg}
          alt="Snow-covered Caucasus slopes above Gudauri at sunrise"
          width={1120}
          height={768}
          className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
        />
      </section>

      {/* The lodge */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <Eyebrow>The lodge</Eyebrow>
        <h2
          className="animate-rise mt-6 max-w-[22ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Gudauri Lodge, where the week <span className="text-clay italic">unfolds</span>
        </h2>
        <p
          className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.15s" }}
        >
          A modern lodge above the valley — a heated pool in the snow, a terrace for long lunches
          and a lounge that fills after the last run.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lodgeShots.map((shot) => (
            <figure key={shot.src}>
              <img
                src={shot.src}
                alt={shot.alt}
                width={1024}
                height={683}
                loading="lazy"
                style={shot.position ? { objectPosition: shot.position } : undefined}
                className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5 transition-transform duration-500 hover:scale-[1.01]"
              />
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Trip details */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <Eyebrow>The trip</Eyebrow>
        <h2
          className="animate-rise mt-6 max-w-[24ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          The lodge, the table and the <span className="text-clay italic">hours between</span>
        </h2>
        <p
          className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.15s" }}
        >
          Three looks at the same week: where you’ll be staying, what the trip covers, and what
          you can add on when you feel like it.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="min-w-0 md:col-span-7">
            <SkiTripDetails />
          </div>

          {/* Facts panel */}
          <div className="min-w-0 md:col-span-5">
            <div className="rounded-[14px] bg-sand p-6 ring-1 ring-ink/5 lg:p-8">
              <dl className="grid grid-cols-1 gap-5">
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Dates</dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">February 17 – 21</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Location</dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">Gudauri, Georgia</dd>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Flights</dt>
                    <dd className="mt-1 font-display text-[1.3rem] font-medium">Included</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Price</dt>
                    <dd className="mt-1 font-display text-[1.3rem] font-medium">From AED 10,000</dd>
                  </div>
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

      {/* Agenda */}
      <section className="mx-auto max-w-[1360px] px-6 pb-14">
        <Eyebrow>The agenda</Eyebrow>
        <h2
          className="animate-rise mt-6 max-w-[24ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Five days, hour by <span className="text-clay italic">hour</span>
        </h2>
        <p
          className="animate-rise mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70"
          style={{ animationDelay: "0.15s" }}
        >
          Leave Dubai late Tuesday night, wake up in Gudauri on Wednesday, and spend three full
          days on the slopes before the flight home on Sunday.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-4 text-[10px] text-ink/65">
          {[
            { label: "On the slopes", color: "bg-blush" },
            { label: "Around the table", color: "bg-sage" },
            { label: "Optional", color: "bg-mist" },
            { label: "Travel & free time", color: "bg-sand" },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              {item.label}
            </span>
          ))}
        </div>

        <SkiAgendaCards />
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
