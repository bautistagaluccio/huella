import { Link } from "@tanstack/react-router";
import { BadgeCheck, Icon, KeyRound, Maximize2, MountainSnow, Plane, Sparkles, Utensils, type IconNode, type LucideProps } from "lucide-react";
import pisteMap from "@/assets/gudauri-piste-map.webp";
import skiGudauriImg from "@/assets/ski-gudauri.jpg";
import { DayTimeline } from "@/components/day-timeline";
import { BackToTop, Eyebrow, PackingNote, SectionNav } from "@/components/trip-layout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSkiDayTimeline, skiDays } from "@/lib/ski-schedule";
import { audience, included, includedNote, lodgeShots, optionalActivities, skiPackingList } from "@/lib/ski-trip-content";

// The ski trip page, in the same editorial layout as the Bali retreat: full-bleed hero,
// facts bar, sticky section nav and alternating cream, ink and sand bands.

const fourPeopleNode: IconNode = [
  ["circle", { cx: "9", cy: "6", r: "2", key: "head-left" }],
  ["circle", { cx: "15", cy: "6", r: "2", key: "head-right" }],
  ["circle", { cx: "3", cy: "10", r: "2", key: "head-outer-left" }],
  ["circle", { cx: "21", cy: "10", r: "2", key: "head-outer-right" }],
  ["path", { d: "M6 20v-6a3 3 0 0 1 6 0v6M12 20v-6a3 3 0 0 1 6 0v6M1 20v-4a2 2 0 0 1 4 0M19 16a2 2 0 0 1 4 0v4", key: "group" }],
];

function FourPeopleIcon(props: LucideProps) {
  return <Icon {...props} iconNode={fourPeopleNode} />;
}

function GeorgiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#ffffff" />
      <rect x="12.5" width="5" height="20" fill="#ff0000" />
      <rect y="7.5" width="30" height="5" fill="#ff0000" />
      {([
        [7.5, 5],
        [22.5, 5],
        [7.5, 15],
        [22.5, 15],
      ] as [number, number][]).map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} fill="#ff0000">
          <rect x={cx - 0.9} y={cy - 2.5} width="1.8" height="5" />
          <rect x={cx - 2.5} y={cy - 0.9} width="5" height="1.8" />
        </g>
      ))}
    </svg>
  );
}

const navItems = [
  { id: "lodge", label: "The lodge" },
  { id: "resort", label: "The ski resort" },
  { id: "included", label: "What's included" },
  { id: "optional", label: "Optional activities" },
  { id: "packing", label: "What to pack" },
  { id: "audience", label: "Is this for me?" },
  { id: "agenda", label: "Agenda" },
];

const inclusionIcons = [Plane, KeyRound, Utensils, MountainSnow];
const audienceIcons = [FourPeopleIcon, MountainSnow, Sparkles];

const headingClass = "mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance";

function PisteMap() {
  return (
    <Dialog>
      <DialogTrigger className="group mt-10 flex w-full flex-col items-start gap-5 rounded-[14px] bg-cream/10 p-5 text-left ring-1 ring-cream/15 transition-colors hover:ring-sand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand sm:flex-row sm:items-center sm:p-6">
        <img
          src={pisteMap}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-40 w-full max-w-[220px] shrink-0 rounded-[10px] bg-cream object-contain p-2"
        />
        <span className="min-w-0">
          <span className="block font-display text-[22px] font-medium">The piste map</span>
          <span className="mt-2 block max-w-[52ch] text-[14px] leading-relaxed text-pretty text-cream/75">
            The whole mountain in one page — every lift, run and facility at Gudauri.
          </span>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-sand uppercase">
            <Maximize2 className="h-3.5 w-3.5" />
            Click to open
          </span>
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[min(1040px,94vw)] border-none bg-cream p-5 sm:p-7">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-[22px] font-medium">Gudauri piste map</DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed text-ink/60">
            Every lift, run and facility on the mountain, in one page.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[68vh] overflow-y-auto">
          <img
            src={pisteMap}
            alt="Piste map of the Gudauri ski resort showing lifts, runs of every level, facilities and the legend"
            className="w-full rounded-[10px] outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>
        <a
          href={pisteMap}
          target="_blank"
          rel="noreferrer"
          className="justify-self-start text-[11px] tracking-[0.2em] text-clay uppercase transition-colors hover:text-ink"
        >
          Open full size
        </a>
      </DialogContent>
    </Dialog>
  );
}

export function SkiTripPage({ days = "17–21" }: { days?: string }) {
  const [leadShot, ...otherShots] = lodgeShots;

  const facts = [
    { label: "Dates", value: <>February {days}</> },
    {
      label: "Location",
      value: (
        <span className="flex items-center gap-2.5">
          <GeorgiaFlag className="h-[1.05rem] w-[1.6rem] shrink-0 rounded-[3px] ring-1 ring-cream/20" />
          Gudauri, Georgia
        </span>
      ),
    },
    { label: "Flights", value: <>Included</> },
    { label: "Price", value: <>From AED 10,000</> },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium tracking-[0.3em] uppercase">Huella</span>
        </Link>
        <Link
          to="/"
          hash="enquire"
          className="rounded-full bg-ink px-5 py-2.5 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-clay"
        >
          Request Info
        </Link>
      </header>

      {/* Full-bleed hero */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden md:h-[82vh]">
        <img
          src={skiGudauriImg}
          alt="Snow-covered Caucasus slopes above Gudauri at sunrise"
          width={1120}
          height={768}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
        <div className="mx-auto w-full max-w-[1360px] px-6 pt-40 pb-14">
          <div className="animate-rise">
            <Eyebrow tone="text-cream" rule="bg-cream/60">Gudauri · Ski · Feb {days}</Eyebrow>
          </div>
          <h1
            className="animate-rise mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-medium text-cream text-balance"
            style={{ animationDelay: "0.1s" }}
          >
            Caucasus Powder <span className="text-sand italic">Days</span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-[52ch] text-[16px] leading-relaxed text-pretty text-cream/85"
            style={{ animationDelay: "0.2s" }}
          >
            Five days on quiet mountain slopes in Gudauri — flights from Dubai included, with every
            transfer and detail settled before you land.
          </p>
        </div>
      </section>

      {/* Facts bar */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1360px] px-6 py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-cream/15 pl-4">
                <dt className="text-[11px] tracking-[0.25em] text-cream/55 uppercase">{fact.label}</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-tight font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-col gap-6 border-t border-cream/15 pt-7 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[60ch] text-[13px] leading-relaxed text-cream/65">
              Every trip is quoted by hand. Send a note and a trip designer will share the full itinerary
              and a tailored proposal.
            </p>
            <Link
              to="/"
              hash="enquire"
              className="shrink-0 self-start rounded-full bg-clay px-6 py-3 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink md:self-auto"
            >
              Request the itinerary
            </Link>
          </div>
        </div>
      </section>

      <SectionNav items={navItems} prefix="ski" label="Trip sections" />

      {/* Statement */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 text-center">
        <Eyebrow tone="text-clay justify-center">The trip</Eyebrow>
        <h2 className="mx-auto mt-7 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] font-medium text-balance">
          The lodge, the slopes and the <span className="text-clay italic">hours between</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-relaxed text-pretty text-ink/65">
          Three looks at the same week: where you’ll be staying, what the trip covers, and what you can
          add on when you feel like it.
        </p>
      </section>

      {/* The lodge */}
      <section id="ski-lodge" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>The lodge</Eyebrow>
              <h2 className={headingClass}>
                Gudauri Lodge, where the week <span className="text-clay italic">unfolds</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-pretty text-ink/70">
                A modern lodge above the valley — a heated pool in the snow, a terrace for long lunches and
                a lounge that fills after the last run.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {leadShot && (
              <figure className="sm:col-span-2">
                <img
                  src={leadShot.src}
                  alt={leadShot.alt}
                  width={1024}
                  height={683}
                  loading="lazy"
                  style={leadShot.position ? { objectPosition: leadShot.position } : undefined}
                  className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
                />
                <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">{leadShot.caption}</figcaption>
              </figure>
            )}
            {otherShots.map((shot, index) => {
              // An odd photo out closes the mosaic full width instead of sitting alone.
              const wide = otherShots.length % 2 === 1 && index === otherShots.length - 1;
              return (
                <figure key={shot.src} className={wide ? "sm:col-span-2" : undefined}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1024}
                    height={683}
                    loading="lazy"
                    style={shot.position ? { objectPosition: shot.position } : undefined}
                    className={`${wide ? "aspect-[16/9]" : "aspect-[4/3]"} w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5 transition-transform duration-500 hover:scale-[1.01]`}
                  />
                  <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">{shot.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* The resort — ink band */}
      <section id="ski-resort" tabIndex={-1} className="scroll-mt-16 bg-ink text-cream">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow tone="text-cream/70" rule="bg-cream/40">The ski resort</Eyebrow>
          <h2 className={`${headingClass} max-w-[22ch]`}>
            The <span className="text-sand italic">slopes</span>, right at your door
          </h2>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-cream/75">
            A <strong className="font-semibold text-cream">ski-in, ski-out</strong> lodge above the valley — the
            week happens here, with the lounge, the terraces and the pool all facing the mountains.
          </p>
          <PisteMap />
        </div>
      </section>

      {/* What's included */}
      <section id="ski-included" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>What’s included</Eyebrow>
              <h2 className={headingClass}>
                We’ve got it <span className="text-clay italic">covered</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/65">
                The essentials are arranged with the trip, so the only thing left to decide is how much you ski.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {included.map((item, index) => {
                const ItemIcon = inclusionIcons[index] ?? BadgeCheck;
                return (
                  <li key={item.title} className="border-t border-clay/40 pt-6">
                    <ItemIcon aria-hidden="true" className="size-7 text-clay" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-[24px] leading-tight font-medium">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-pretty text-ink/70">{item.description}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-10 border-t border-ink/10 pt-5 text-[13px] leading-relaxed text-ink/55">{includedNote}</p>
          </div>
        </div>
      </section>

      {/* Optional activities */}
      <section id="ski-optional" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 pb-24">
        <Eyebrow>Optional activities</Eyebrow>
        <h2 className={`${headingClass} max-w-[22ch]`}>
          For the days you want <span className="text-clay italic">more</span>
        </h2>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-ink/65">
          Nothing here is compulsory. These are there for whoever wants them.
        </p>
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {optionalActivities.map((item) => (
            <li key={item.title} className="min-w-0">
              <img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/5] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5"
              />
              <h3 className="mt-5 font-display text-[23px] leading-tight font-medium">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-pretty text-ink/70">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What to pack */}
      <section id="ski-packing" tabIndex={-1} className="scroll-mt-16 bg-sand/60">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow>What to pack</Eyebrow>
          <h2 className={headingClass}>
            Pack light, we'll handle the <span className="text-clay italic">rest</span>
          </h2>
          <PackingNote label={`Gudauri · Feb ${days}`} items={skiPackingList} />
        </div>
      </section>

      {/* Is this for me? — ink band */}
      <section id="ski-audience" tabIndex={-1} className="scroll-mt-16 bg-ink text-cream">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow tone="text-cream/70" rule="bg-cream/40">Is this for me?</Eyebrow>
          <h2 className={`${headingClass} max-w-[22ch]`}>
            Skier or not, you're <span className="text-sand italic">in</span>
          </h2>
          <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {audience.map((item, index) => {
              const ItemIcon = audienceIcons[index] ?? Sparkles;
              return (
                <li key={item.title} className="border-t border-cream/20 pt-6">
                  <ItemIcon aria-hidden="true" className="size-8 text-sand" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-[26px] font-medium">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-pretty text-cream/70">{item.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Agenda */}
      <section id="ski-agenda" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 py-24">
        <Eyebrow>The agenda</Eyebrow>
        <h2 className={`${headingClass} max-w-[24ch]`}>
          Five days, hour by <span className="text-clay italic">hour</span>
        </h2>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70">
          Leave Dubai late Tuesday night, wake up in Gudauri on Wednesday, and spend three full days on
          the slopes before the flight home on Sunday.
        </p>
        <DayTimeline
          days={skiDays}
          entriesFor={getSkiDayTimeline}
          legend={[
            { kind: "practice", label: "On the slopes" },
            { kind: "meal", label: "Around the table" },
            { kind: "optional", label: "Optional" },
            { kind: "other", label: "Travel & free time" },
          ]}
          // Open on Thursday, the first full ski day.
          initialDay={2}
          fallbackLabel=""
        />
      </section>

      {/* Closing call to action — ink band, echoing the facts bar */}
      <section className="bg-ink text-cream">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="text-cream/70" rule="bg-cream/40">Gudauri · Feb {days}</Eyebrow>
            <p className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none font-medium">
              Caucasus Powder <span className="text-sand italic">Days</span>
            </p>
            <p className="mt-5 max-w-[48ch] text-[14px] leading-relaxed text-cream/70">
              Every trip is quoted by hand. Send a note and a trip designer will share the full itinerary
              and a tailored proposal.
            </p>
          </div>
          <Link
            to="/"
            hash="enquire"
            className="self-start rounded-full bg-clay px-7 py-3.5 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink md:self-auto"
          >
            Request the itinerary
          </Link>
        </div>
      </section>

      <BackToTop />

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
