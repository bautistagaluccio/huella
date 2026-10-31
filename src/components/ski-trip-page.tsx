import { Link } from "@tanstack/react-router";
import skiGudauriImg from "@/assets/ski-gudauri.jpg";
import { SkiAgendaCards } from "@/components/ski-agenda";
import { SkiTripDetails } from "@/components/ski-trip-details";
import lodgeDining from "@/assets/lodge-dining.jpg.asset.json";
import lodgeLounge from "@/assets/lodge-lounge.jpg.asset.json";
import lodgePool from "@/assets/lodge-pool.jpg.asset.json";
import lodgeRoom from "@/assets/lodge-room.jpg.asset.json";
import lodgeSnowTerrace from "@/assets/lodge-snow-terrace.jpg.asset.json";
import lodgeTerrace from "@/assets/lodge-terrace.jpg.asset.json";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { KeyRound, MountainSnow, BadgeCheck, Sparkles, Backpack, Snowflake, IdCard, CalendarDays, Icon, type IconNode, type LucideProps } from "lucide-react";

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

const skiTabs = [
  { value: "main", label: "Main" },
  { value: "lodge", label: "The lodge", icon: KeyRound },
  { value: "agenda", label: "Agenda" },
  { value: "resort", label: "The ski resort", icon: MountainSnow },
  { value: "included", label: "What's included", icon: BadgeCheck },
  { value: "optional", label: "Optional activities", icon: Sparkles },
  { value: "packing", label: "What to take", icon: Backpack },
  { value: "audience", label: "Is this for me?", icon: FourPeopleIcon },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
      <span className="inline-block h-px w-10 bg-clay/40" />
      {children}
    </div>
  );
}

export function SkiTripPage({ days = "17–21", expandedMenu = false }: { days?: "10–14" | "17–21"; expandedMenu?: boolean }) {
  const [activeTab, setActiveTab] = useState("main");
  const tripTabs = skiTabs.map((tab) =>
    !expandedMenu && tab.value === "packing" ? { ...tab, label: "What to pack" } : tab,
  );
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
          <Eyebrow>Gudauri · Ski · Feb {days}</Eyebrow>
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

      {expandedMenu && (
        <section className="mx-auto max-w-[1360px] px-6 pb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto border-b border-ink/15">
              <TabsList aria-label="Ski experience" className="flex h-auto w-max min-w-full justify-between gap-3 rounded-none bg-transparent p-0">
                {tripTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}
                    onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
                    className="min-h-14 shrink-0 rounded-none border-b-2 border-transparent px-4 py-4 text-[13px] text-ink/60 data-[state=active]:border-clay data-[state=active]:bg-transparent data-[state=active]:text-clay data-[state=active]:shadow-none">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tripTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="m-0">
                {(tab.value === "resort" || tab.value === "included" || tab.value === "optional") && <SkiTripDetails section={tab.value} />}
                {(tab.value === "packing" || tab.value === "audience") && (
                  <div className="min-h-[240px] pt-9">
                    <h2 className="font-display text-[28px] font-medium">{tab.label}</h2>
                    <p className="mt-3 text-[14px] text-ink/65">Details coming soon.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      )}

      {expandedMenu && <section hidden={activeTab !== "lodge"} className="mx-auto max-w-[1360px] px-6 pb-14">
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
            <figure key={shot.src.asset_id}>
              <img
                src={shot.src.url}
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
      </section>}

      {/* Trip details */}
      <section hidden={expandedMenu && activeTab !== "main"} className="mx-auto max-w-[1360px] px-6 pb-14">
        <div className={`grid grid-cols-1 gap-10 md:grid-cols-12 ${expandedMenu ? "items-start" : ""}`}>
          {expandedMenu && (
            <div className="min-w-0 md:col-span-7 md:pr-8">
              <Eyebrow>The experience</Eyebrow>
              <h2 className="mt-6 max-w-[22ch] font-display text-[36px] leading-tight font-medium">
                Five days in the <span className="text-clay italic">Caucasus</span>
              </h2>
              <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-pretty text-ink/70">
                A ski escape from Dubai to Gudauri, where days on the mountain flow into shared
                dinners and time to unwind. Stay at Gudauri Lodge, a ski-in, ski-out base with
                a heated pool, mountain-facing terraces and a lounge to return to after the last run.
              </p>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-pretty text-ink/70">
                Flights, transfers within Georgia, ski passes and rental are arranged for you.
                Follow the group’s rhythm on the slopes, then choose an afternoon of skiing or
                a pause at the spa — with night ski and Georgian wine tasting in the mix.
              </p>
            </div>
          )}
          {!expandedMenu && <div className="min-w-0 md:col-span-7">
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
            <nav aria-label="Trip sections" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {tripTabs.filter((tab) => tab.value !== "main" && tab.value !== "agenda").map((tab) => (
                <Button key={tab.value} variant="outline" asChild className="h-auto min-h-24 whitespace-normal border-ink/15 bg-sand/50 px-3 py-5 text-center text-[13px] text-ink shadow-none hover:bg-sand hover:text-clay">
                  <a href={`#ski-${tab.value}`} className="flex flex-col gap-3">
                    {tab.label}
                    {tab.icon && <tab.icon aria-hidden="true" className="size-5 text-clay" />}
                  </a>
                </Button>
              ))}
              <Button variant="outline" asChild className="col-span-2 h-auto min-h-16 whitespace-normal border-ink/15 bg-sand/50 px-3 py-4 text-center text-[13px] text-ink shadow-none hover:bg-sand hover:text-clay sm:col-span-3">
                <a href="#ski-agenda" className="flex items-center justify-center gap-3">
                  Agenda
                  <CalendarDays aria-hidden="true" className="size-5 text-clay" />
                </a>
              </Button>
            </nav>
          </div>}

          {/* Facts panel */}
          <div className="min-w-0 md:col-span-5">
            <div className={`rounded-[14px] bg-sand p-6 ring-1 ring-ink/5 lg:p-8 ${expandedMenu ? "" : "flex h-full flex-col"}`}>
              <dl className="grid grid-cols-1 gap-5">
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Dates</dt>
                  <dd className="mt-1 font-display text-[1.3rem] font-medium">February {days}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink/50 uppercase">Location</dt>
                  <dd className="mt-1 flex items-center gap-2.5 font-display text-[1.3rem] font-medium">
                    <GeorgiaFlag className="h-[1.05rem] w-[1.6rem] shrink-0 rounded-[3px] ring-1 ring-ink/10" />
                    Gudauri, Georgia
                  </dd>
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
                className={`inline-block rounded-full bg-clay px-6 py-3 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-ink ${expandedMenu ? "mt-6" : "mt-auto"}`}
              >
                Request the itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {!expandedMenu && <>
        <section id="ski-lodge" className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14" tabIndex={-1}>
          <Eyebrow>The lodge</Eyebrow>
          <h2 className="mt-6 max-w-[22ch] font-display text-[36px] leading-tight font-medium">
            Gudauri Lodge, where the week <span className="text-clay italic">unfolds</span>
          </h2>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-pretty text-ink/70">
            A modern lodge above the valley — a heated pool in the snow, a terrace for long lunches
            and a lounge that fills after the last run.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lodgeShots.map((shot) => (
              <figure key={shot.src.asset_id}>
                <img src={shot.src.url} alt={shot.alt} width={1024} height={683} loading="lazy"
                  style={shot.position ? { objectPosition: shot.position } : undefined}
                  className="aspect-[16/9] w-full rounded-[14px] object-cover outline-1 -outline-offset-1 outline-ink/5 transition-transform duration-500 hover:scale-[1.01]" />
                <figcaption className="mt-3 text-[11px] tracking-[0.2em] text-ink/50 uppercase">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        {(["resort", "included", "optional"] as const).map((section) => (
          <section key={section} id={`ski-${section}`} tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
            <Eyebrow>{tripTabs.find((tab) => tab.value === section)?.label}</Eyebrow>
            <SkiTripDetails section={section} photoEditorial />
          </section>
        ))}
        {tripTabs.filter((tab) => tab.value === "packing" || tab.value === "audience").map((tab) => (
          <section key={tab.value} id={`ski-${tab.value}`} tabIndex={-1} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
            <Eyebrow>{tab.label}</Eyebrow>
            <h2 className="mt-6 font-display text-[28px] font-medium">
              {tab.value === "packing" ? (
                <>Pack light, we'll handle the <span className="text-clay italic">rest</span></>
              ) : (
                <>Skier or not, you're <span className="text-clay italic">in</span></>
              )}
            </h2>
            {tab.value === "packing" ? (
              <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { title: 'My winter clothes', icon: Snowflake },
                  { title: 'My documents (Passport, VISA)', icon: IdCard, link: { label: 'Check if I need a VISA', href: 'https://www.evisa.gov.ge/GeoVisa/' } },
                  { title: 'My good energy', icon: Sparkles },
                ].map(({ title, icon: ItemIcon, link }) => (
                  <div key={title} className="min-w-0">
                    <ItemIcon aria-hidden="true" className="mb-5 size-8 text-clay" strokeWidth={1.5} />
                    <h3 className="font-display text-[23px] leading-tight font-medium">{title}</h3>
                    {link && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-[14px] text-clay underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { title: 'A trip for everyone', icon: FourPeopleIcon, description: 'First time on snow or seasoned skier — the week is shaped so everyone finds their pace and their people.' },
                  { title: 'Lessons for every level', icon: MountainSnow, description: 'Want to learn or improve your skiing? We arrange lessons with local instructors, from your very first run to refining your technique.' },
                  { title: 'Beyond the slopes', icon: Sparkles, description: "Don't feel like skiing? Spa afternoons, wine tasting and evenings out keep the week just as full away from the slopes." },
                ].map(({ title, icon: ItemIcon, description }) => (
                  <div key={title} className="min-w-0">
                    <ItemIcon aria-hidden="true" className="mb-5 size-8 text-clay" strokeWidth={1.5} />
                    <h3 className="font-display text-[23px] leading-tight font-medium">{title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </>}

      {/* Agenda */}
      <section id="ski-agenda" tabIndex={-1} hidden={expandedMenu && activeTab !== "agenda"} className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-14">
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
          <span className="font-display font-medium">Huella — Dubai Experience Studio</span>
          <span>contact@huellaretreat.com</span>
        </div>
      </footer>
    </div>
  );
}
