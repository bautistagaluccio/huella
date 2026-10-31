import { createFileRoute, Link } from "@tanstack/react-router";

import baliImg from "@/assets/bali.jpg";
import golfImg from "@/assets/golf.jpg";
import kitesurfImg from "@/assets/kitesurf.jpg";
import skiImg from "@/assets/ski.jpg";
import surfImg from "@/assets/surf.jpg";
import yogaImg from "@/assets/yoga.jpg";
import skiGudauriImg from "@/assets/ski-gudauri.jpg";
import { getDeparturesByDate } from "@/lib/departures";

const sports = {
  kitesurf: {
    name: "Kitesurf",
    image: kitesurfImg,
    imageAlt: "Kitesurfer carving turquoise water off a desert coastline",
    description: "Private wind-led trips shaped around the best conditions and the right group.",
  },
  surf: {
    name: "Surf",
    image: surfImg,
    imageAlt: "Surfer riding a long glassy wave at dawn",
    description: "Small-group surf journeys selected for waves, setting and an unhurried rhythm.",
  },
  golf: {
    name: "Golf",
    image: golfImg,
    imageAlt: "Manicured desert golf green surrounded by palm trees",
    description: "Considered golf escapes combining memorable courses with seamless hospitality.",
  },
  ski: {
    name: "Ski",
    image: skiImg,
    imageAlt: "Skier descending a quiet alpine powder run",
    description: "Mountain weeks designed around excellent snow, quiet slopes and effortless access.",
  },
  yoga: {
    name: "Retreats",
    image: yogaImg,
    imageAlt: "Yoga practice on a quiet terrace at sunset",
    description: "Restorative retreats bringing movement, breath and beautiful places together.",
  },
} as const;

type SportKey = keyof typeof sports;

function getSport(sport: string) {
  return sport in sports ? sports[sport as SportKey] : undefined;
}

export const Route = createFileRoute("/sports/$sport")({
  head: ({ params }) => {
    const sport = getSport(params.sport);
    const name = sport?.name ?? "Sport Experiences";
    const description = sport
      ? `Explore Huella's available ${sport.name.toLowerCase()} experiences for private groups from Dubai.`
      : "Explore Huella's available private sports experiences from Dubai.";

    return {
      meta: [
        { title: `${name} Experiences — Huella` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} Experiences — Huella` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SportExperiences,
});

function SportExperiences() {
  const { sport: sportSlug } = Route.useParams();
  const sport = getSport(sportSlug);

  if (!sport) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-ink">
        <div className="text-center">
          <p className="font-display text-[2rem] font-medium">Sport not found</p>
          <Link to="/" className="mt-5 inline-block text-[12px] uppercase tracking-[0.18em] text-clay">
            Return to Huella
          </Link>
        </div>
      </main>
    );
  }

  const hasBaliRetreat = sportSlug === "yoga";
  const hasSkiTrip = sportSlug === "ski";

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium uppercase tracking-[0.3em]">Huella</span>
        </Link>
        <Link
          to="/"
          hash="disciplines"
          className="text-[12px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-clay"
        >
          All sports
        </Link>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1360px] grid-cols-1 gap-8 px-6 pt-6 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-clay">Available experiences</p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-none font-medium">
              {sport.name}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-pretty text-ink/70">
              {sport.description}
            </p>
          </div>
          <div className="md:col-span-7">
            <img
              src={sport.image}
              alt={sport.imageAlt}
              width={1120}
              height={672}
              className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
            />
          </div>
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-[1360px] px-6 py-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-clay">The calendar</p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium">
                  Upcoming {sport.name.toLowerCase()}
                </h2>
              </div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-ink/50">
                {hasSkiTrip ? "2 experiences" : hasBaliRetreat ? "1 experience" : "No scheduled dates"}
              </p>
            </div>

            {hasBaliRetreat ? (
              <Link
                to="/retreats/bali"
                className="mt-10 grid overflow-hidden rounded-[14px] bg-glass ring-1 ring-ink/5 transition-colors hover:ring-clay/40 md:grid-cols-12"
              >
                <img
                  src={baliImg}
                  alt="Open-air yoga pavilion overlooking Bali rice terraces"
                  width={1120}
                  height={768}
                  className="h-full min-h-[260px] w-full object-cover md:col-span-5"
                />
                <div className="flex flex-col justify-center p-7 md:col-span-7 md:p-10">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-clay">Mar 6–14 · Uluwatu Villa</p>
                  <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-medium">
                    Bali Body &amp; Breath
                  </h3>
                  <p className="mt-3 max-w-[50ch] text-[14px] leading-relaxed text-pretty text-ink/70">
                    Yoga, breathwork, meditation and pilates for a maximum of 16 guests.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
                    <span className="text-[13px] uppercase tracking-[0.14em] text-ink/60">From AED 15,000</span>
                    <span className="text-[12px] uppercase tracking-[0.16em] text-clay">View experience →</span>
                  </div>
                </div>
              </Link>
            ) : hasSkiTrip ? (
              getDeparturesByDate().filter((departure) => departure.discipline === "Ski").map((departure) => (
              <Link
                key={departure.id}
                to={departure.to}
                className="mt-10 grid overflow-hidden rounded-[14px] bg-glass ring-1 ring-ink/5 transition-colors hover:ring-clay/40 md:grid-cols-12"
              >
                <img
                  src={skiGudauriImg}
                  alt="Snow-covered Caucasus slopes above Gudauri at sunrise"
                  width={1120}
                  height={768}
                  className="h-full min-h-[260px] w-full object-cover md:col-span-5"
                />
                <div className="flex flex-col justify-center p-7 md:col-span-7 md:p-10">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-clay">
                    Feb {departure.days} · Gudauri
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-medium">
                    Caucasus Powder Days
                  </h3>
                  <p className="mt-3 max-w-[50ch] text-[14px] leading-relaxed text-pretty text-ink/70">
                    Four days on quiet mountain slopes — flights from Dubai included.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
                    <span className="text-[13px] uppercase tracking-[0.14em] text-ink/60">
                      From AED 10,000
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.16em] text-clay">
                      View experience →
                    </span>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <div className="mt-10 border-y border-ink/10 py-16 text-center">
                <p className="font-display text-[1.8rem] font-medium">No availability soon.</p>
                <p className="mx-auto mt-3 max-w-[44ch] text-[14px] leading-relaxed text-ink/60">
                  Tell us what you have in mind and we can shape a private experience for your group.
                </p>
                <Link
                  to="/"
                  hash="enquire"
                  className="mt-7 inline-block rounded-full bg-clay px-6 py-3 text-[13px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ink"
                >
                  Request a private trip
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-4 px-6 py-10 text-[12px] uppercase tracking-[0.14em] text-ink/50 sm:flex-row">
          <span className="font-display font-medium">Huella — Dubai Experience Studio</span>
          <span>contact@huellaretreat.com</span>
        </div>
      </footer>
    </div>
  );
}