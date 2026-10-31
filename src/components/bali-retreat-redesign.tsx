import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import villaAfterDark from "@/assets/villa-after-dark.jpeg";
import { baliSections, partnerRestaurants } from "@/components/bali-retreat-details";
import { packingList, PackingTitle, villaShots, type BaliDates } from "@/components/bali-retreat-page";
import { ScheduleGrid } from "@/components/schedule-grid";
import { scheduleBlocks, scheduleDays, scheduleTimes } from "@/lib/bali-schedule";

// Design test for the May departure: same content as BaliRetreatPage, laid out as an
// immersive editorial page — full-bleed hero, facts bar, sticky section nav and
// alternating cream, ink and sand bands.

const navItems = [
  { id: "villa", label: "The villa" },
  { id: "experience", label: "Experience" },
  { id: "daily", label: "Daily practice" },
  { id: "optional", label: "Optional activities" },
  { id: "food", label: "Nutrition" },
  { id: "packing", label: "What to pack" },
  { id: "rhythm", label: "Weekly rhythm" },
];

function section(value: (typeof baliSections)[number]["value"]) {
  return baliSections.find((item) => item.value === value)!;
}

function Eyebrow({ children, tone = "text-clay", rule = "bg-clay/40" }: { children: React.ReactNode; tone?: string; rule?: string }) {
  return (
    <div className={`flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase ${tone}`}>
      <span className={`inline-block h-px w-10 ${rule}`} />
      {children}
    </div>
  );
}

// Highlights the nav link of the section currently in view.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id.replace("bali-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const element = document.getElementById(`bali-${id}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const navIds = navItems.map((item) => item.id);

export function BaliRetreatRedesign({ month, days }: BaliDates) {
  const shortDates = `${month.slice(0, 3)} ${days}`;
  const active = useActiveSection(navIds);
  const navRef = useRef<HTMLDivElement>(null);
  // Keep the highlighted link visible when the nav scrolls sideways on phones.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#bali-${active}"]`);
    if (nav && link) nav.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
  }, [active]);
  const experience = section("experience");
  const daily = section("daily");
  const optional = section("optional");
  const nutrition = section("food");
  const [leadShot, ...otherShots] = villaShots;

  const facts = [
    { label: "Dates", value: `${month} ${days.replace("–", " – ")}` },
    { label: "Location", value: "Uluwatu Villa" },
    { label: "Availability", value: "8 rooms" },
    { label: "Max capacity", value: "16 people" },
    { label: "Base price", value: "From AED 15,000" },
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
          src={villaAfterDark}
          alt="The villa at night, warm light spilling over a sunken seating courtyard and the lit pool"
          width={1264}
          height={843}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
        <div className="mx-auto w-full max-w-[1360px] px-6 pt-40 pb-14">
          <div className="animate-rise">
            <Eyebrow tone="text-cream" rule="bg-cream/60">Bali · Wellness Retreat · {shortDates}</Eyebrow>
          </div>
          <h1
            className="animate-rise mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-medium text-cream text-balance"
            style={{ animationDelay: "0.1s" }}
          >
            Bali Body & <span className="text-sand italic">Breath</span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-[52ch] text-[16px] leading-relaxed text-pretty text-cream/85"
            style={{ animationDelay: "0.2s" }}
          >
            A retreat for wellness, introspection and connection — stretching, pilates, yoga,
            breathing and sound healing, with space to slow down at Uluwatu Villa.
          </p>
        </div>
      </section>

      {/* Facts bar */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1360px] px-6 py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-cream/15 pl-4">
                <dt className="text-[11px] tracking-[0.25em] text-cream/55 uppercase">{fact.label}</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-tight font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-col gap-6 border-t border-cream/15 pt-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-cream/55 uppercase">Discipline</p>
              <p className="mt-2 text-[14px] text-cream/85">Stretching · Pilates · Yoga · Breathing · Sound healing</p>
            </div>
            <div className="flex flex-col gap-4 md:max-w-[520px] md:flex-row md:items-center md:gap-8">
              <p className="text-[13px] leading-relaxed text-cream/65">
                Every trip is quoted by hand. Send a note and a trip designer will share the full
                itinerary and a tailored proposal.
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
        </div>
      </section>

      {/* Sticky section nav */}
      <nav aria-label="Retreat sections" className="sticky top-0 z-20 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div ref={navRef} className="relative mx-auto max-w-[1360px] overflow-x-auto px-6">
          <ul className="flex w-max min-w-full gap-7">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#bali-${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block border-b-2 py-4 text-[12px] tracking-[0.16em] whitespace-nowrap uppercase transition-colors ${
                    active === item.id ? "border-clay text-clay" : "border-transparent text-ink/55 hover:text-clay"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Statement */}
      <section className="mx-auto max-w-[1360px] px-6 py-24 text-center">
        <Eyebrow tone="text-clay justify-center" rule="bg-clay/40">The retreat</Eyebrow>
        <h2 className="mx-auto mt-7 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] font-medium text-balance">
          The villa, the practice and the <span className="text-clay italic">time between</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-relaxed text-pretty text-ink/65">
          Where you’ll stay, how the days unfold, what you can add and what to bring — each a tap
          away.
        </p>
      </section>

      {/* The villa */}
      <section id="bali-villa" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>The villa</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance">
                Uluwatu Villa — the house you <span className="text-clay italic">stay in</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-pretty text-ink/70">
                Eight rooms, two pools, and pavilions that open straight onto the lawn.
                <br />
                Practise, eat and rest here for the whole week.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {leadShot && (
              <figure className="sm:col-span-2">
                <img
                  src={leadShot.src}
                  alt={leadShot.alt}
                  width={1360}
                  height={907}
                  loading="lazy"
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
                  width={1360}
                  height={907}
                  loading="lazy"
                  className={`${wide ? "aspect-[16/9]" : "aspect-[4/3]"} w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5 transition-transform duration-500 hover:scale-[1.01]`}
                />
                <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">{shot.caption}</figcaption>
              </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience — ink band */}
      <section id="bali-experience" tabIndex={-1} className="scroll-mt-16 bg-ink text-cream">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow tone="text-cream/70" rule="bg-cream/40">{experience.label}</Eyebrow>
          <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-medium text-balance">
            {experience.heading}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-cream/70">{experience.intro}</p>
          <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {experience.items.map((item, index) => (
              <li key={item.title} className="border-t border-cream/20 pt-6">
                <span className="font-display text-[34px] text-sand italic">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-[26px] font-medium">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-pretty text-cream/70">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Daily practice — numbered rows */}
      <section id="bali-daily" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>{daily.label}</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance">
                {daily.heading}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{daily.intro}</p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {daily.items.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/10 py-7 last:border-b sm:grid-cols-[4.5rem_14rem_1fr] sm:items-baseline">
                <span className="font-display text-[28px] text-clay italic">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[24px] font-medium">{item.title}</h3>
                <p className="col-start-2 text-[14px] leading-relaxed text-pretty text-ink/70 sm:col-start-3">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Optional activities — sand cards */}
      <section id="bali-optional" tabIndex={-1} className="scroll-mt-16 bg-sand/60">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow>{optional.label}</Eyebrow>
          <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance">
            {optional.heading}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-ink/65">{optional.intro}</p>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {optional.items.map((item) => (
              <li key={item.title} className="flex flex-col rounded-[14px] bg-cream p-6 ring-1 ring-ink/5">
                <span aria-hidden="true" className="h-1.5 w-8 rounded-full bg-clay/70" />
                <h3 className="mt-6 font-display text-[22px] leading-tight font-medium">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-pretty text-ink/70">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nutrition */}
      <section id="bali-food" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{nutrition.label}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance">
              {nutrition.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-pretty text-ink/70">{nutrition.intro}</p>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {nutrition.items.map((item) => (
              <li key={item.title} className="border-t border-clay/40 pt-5">
                <h3 className="font-display text-[22px] font-medium">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pretty text-ink/70">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-col gap-6 rounded-[14px] bg-glass px-6 py-7 ring-1 ring-ink/5 sm:px-10 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] tracking-[0.25em] text-ink/55 uppercase">Our partner restaurants</p>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
            {partnerRestaurants.map((partner) => (
              <li key={partner.name}>
                <img src={partner.src} alt={partner.name} loading="lazy" className={`w-auto mix-blend-multiply ${partner.className}`} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What to pack */}
      <section id="bali-packing" tabIndex={-1} className="scroll-mt-16 bg-sage/40">
        <div className="mx-auto max-w-[1360px] px-6 py-24">
          <Eyebrow>What to pack</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium">
            Pack light, we'll handle the <span className="text-clay italic">rest</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/65">
            A short list — mats, towels and everything for the practice are at the villa.
          </p>
          {/* A packing note visitors can tick off; ticks are not saved. */}
          <div className="mt-10 -rotate-[0.5deg] rounded-md bg-cream px-6 py-5 ring-1 ring-ink/10 motion-reduce:rotate-0 sm:px-8 sm:py-6">
            <p className="mb-2 text-[11px] tracking-[0.25em] text-ink/50 uppercase">Bali · {shortDates}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3">
              {packingList.map((item) => (
                <li key={item.title} className="border-b border-dashed border-ink/20 py-3 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-2 sm:first:border-l-0 sm:first:pl-0">
                  <label className="flex cursor-pointer items-start gap-4">
                    <input type="checkbox" className="mt-1.5 size-4 shrink-0 accent-clay" />
                    <span className="font-display text-[20px] leading-snug">
                      <PackingTitle item={item} />
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Weekly rhythm */}
      <section id="bali-rhythm" tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-16 px-6 py-24">
        <Eyebrow>The weekly rhythm</Eyebrow>
        <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium text-balance">
          A week, hour by <span className="text-clay italic">hour</span>
        </h2>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70">
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

      {/* Closing call to action — clay band */}
      <section className="bg-clay text-cream">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="text-cream/80" rule="bg-cream/50">Bali · {shortDates}</Eyebrow>
            <p className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none font-medium">
              Bali Body & <span className="italic">Breath</span>
            </p>
            <p className="mt-5 max-w-[48ch] text-[14px] leading-relaxed text-cream/80">
              Every trip is quoted by hand. Send a note and a trip designer will share the full
              itinerary and a tailored proposal.
            </p>
          </div>
          <Link
            to="/"
            hash="enquire"
            className="self-start rounded-full bg-cream px-7 py-3.5 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream md:self-auto"
          >
            Request the itinerary
          </Link>
        </div>
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
