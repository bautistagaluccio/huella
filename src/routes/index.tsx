import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDeparturesByDate } from "@/lib/departures";

import kitesurfImg from "@/assets/kitesurf.jpg";
import surfImg from "@/assets/surf.jpg";
import golfImg from "@/assets/golf.jpg";
import skiImg from "@/assets/ski.jpg";
import yogaImg from "@/assets/yoga.jpg";
import skiGudauriImg from "@/assets/ski-gudauri.jpg";
import villaAfterDark from "@/assets/villa-after-dark.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huella — Sports Trips Atelier, Dubai" },
      {
        name: "description",
        content:
          "Huella composes kitesurf, surf, golf, ski and yoga trips for private groups in Dubai and beyond — sourced, scoped and handled end to end.",
      },
      { property: "og:title", content: "Huella — Sports Trips Atelier, Dubai" },
      {
        property: "og:description",
        content:
          "Kitesurf, surf, golf, ski and yoga retreats for private groups, arranged end to end from Dubai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase ${
        light ? "text-clay" : "text-clay"
      }`}
    >
      <span className={`inline-block h-px w-10 ${light ? "bg-clay/60" : "bg-clay/40"}`} />
      {children}
    </div>
  );
}

const departureImages = {
  ski: skiGudauriImg,
  bali: villaAfterDark.url,
};

function Index() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium uppercase tracking-[0.3em]">
            Huella
          </span>
        </a>
        <nav className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.14em] text-ink/70 md:flex">
          <a href="#disciplines" className="transition-colors hover:text-clay">
            Trips
          </a>
          <a href="#atelier" className="transition-colors hover:text-clay">
            The Atelier
          </a>
          <a href="#departures" className="transition-colors hover:text-clay">
            Departures
          </a>
        </nav>
        <a
          href="#enquire"
          className="rounded-full bg-ink px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-clay"
        >
          Request Info
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1360px] px-6 pt-6 pb-16">
        <div className="animate-rise">
          <Eyebrow>Dubai · By invitation</Eyebrow>
        </div>
        <h1
          className="animate-rise mt-6 max-w-[19ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] font-medium text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Sport, <span className="italic text-clay">quietly</span> arranged for the few who travel
          well.
        </h1>
        <div
          className="animate-rise mt-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-pretty text-ink/70">
            Five disciplines, one atelier. We compose kitesurf, surf, golf, ski and yoga retreats
            for private groups and small circles — each one sourced, scoped and handled end to end.
          </p>
          <a
            href="#enquire"
            className="shrink-0 rounded-full bg-clay px-6 py-3 text-[13px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ink"
          >
            Request the programme
          </a>
        </div>
      </section>

      {/* Disciplines grid */}
      <section id="disciplines" className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[230px]">
          <Link
            to="/sports/$sport"
            params={{ sport: "ski" }}
            className="group relative overflow-hidden rounded-[14px] bg-sand outline-1 -outline-offset-1 outline-ink/5 md:col-span-7 md:row-span-2"
          >
            <img
              src={skiImg}
              alt="Skier descending a powder run above a quiet alpine resort"
              width={992}
              height={672}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className="mt-1 font-display text-[2rem] leading-tight font-medium text-cream">
                Ski
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-cream/70">
                Next experience · Gudauri · Feb 17–21
              </p>
            </div>
          </Link>

          <Link
            to="/sports/$sport"
            params={{ sport: "yoga" }}
            className="group relative overflow-hidden rounded-[14px] bg-sand outline-1 -outline-offset-1 outline-ink/5 md:col-span-5 md:row-span-2"
          >
            <img
              src={yogaImg}
              alt="Yoga practitioner in silhouette on a desert terrace at sunset"
              width={1120}
              height={592}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className="mt-1 font-display text-[2rem] leading-tight font-medium text-cream">
                Retreats
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-cream/70">
                Next experience · Bali · Mar 6–14
              </p>
            </div>
          </Link>

          <Link
            to="/sports/$sport"
            params={{ sport: "kitesurf" }}
            className="group relative min-h-[220px] overflow-hidden rounded-[14px] bg-sand outline-1 -outline-offset-1 outline-ink/5 md:col-span-4 md:row-span-1"
          >
            <img
              src={kitesurfImg}
              alt="Kitesurfer carving turquoise water off a desert coastline at golden hour"
              loading="lazy"
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-[1.35rem] font-medium text-cream">Kitesurf</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/70">
                No availability soon
              </p>
            </div>
          </Link>

          <Link
            to="/sports/$sport"
            params={{ sport: "surf" }}
            className="group relative min-h-[220px] overflow-hidden rounded-[14px] bg-sand outline-1 -outline-offset-1 outline-ink/5 md:col-span-4 md:row-span-1"
          >
            <img
              src={surfImg}
              alt="Surfer riding a long glassy wave at dawn"
              loading="lazy"
              width={992}
              height={672}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-[1.35rem] font-medium text-cream">Surf</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/70">
                No availability soon
              </p>
            </div>
          </Link>

          <Link
            to="/sports/$sport"
            params={{ sport: "golf" }}
            className="group relative min-h-[220px] overflow-hidden rounded-[14px] bg-sand outline-1 -outline-offset-1 outline-ink/5 md:col-span-4 md:row-span-1"
          >
            <img
              src={golfImg}
              alt="Manicured desert golf green with palm trees in warm afternoon light"
              loading="lazy"
              width={992}
              height={672}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-[1.35rem] font-medium text-cream">Golf</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/70">
                No availability soon
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="atelier" className="scroll-mt-8 bg-ink py-20 text-cream">
        <div className="mx-auto max-w-[1360px] px-6">
          <Eyebrow light>How it works</Eyebrow>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <p className="text-[13px] uppercase tracking-[0.2em] text-cream/50">01</p>
              <h4 className="mt-3 font-display text-[1.5rem] font-medium">Tell us the circle</h4>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-pretty text-cream/70">
                Dates, discipline, and how many you're gathering — a short note is enough to begin.
              </p>
            </div>
            <div>
              <p className="text-[13px] uppercase tracking-[0.2em] text-cream/50">02</p>
              <h4 className="mt-3 font-display text-[1.5rem] font-medium">We source quietly</h4>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-pretty text-cream/70">
                Instructors, lodges and guides are hand-picked to fit the trip, never a fixed
                package.
              </p>
            </div>
            <div>
              <p className="text-[13px] uppercase tracking-[0.2em] text-cream/50">03</p>
              <h4 className="mt-3 font-display text-[1.5rem] font-medium">You simply arrive</h4>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-pretty text-cream/70">
                Every transfer, permit and detail is settled before you land. Nothing left to
                arrange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured departures */}
      <section id="departures" className="mx-auto max-w-[1360px] scroll-mt-8 px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[20ch] font-display text-[2rem] leading-tight font-medium sm:text-[2.9rem]">
            Featured &amp; upcoming departures
          </h2>
          <p className="text-[11px] uppercase tracking-[0.16em] text-clay">
            The departure calendar
          </p>
        </div>
        <div className="mt-10 border-t border-ink/20">
          {getDeparturesByDate().map((departure) => {
            const content = (
              <>
                <div className="flex items-baseline justify-between gap-4 sm:block">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-clay">
                    {String(departure.month).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-[1.6rem] font-medium sm:mt-2">
                    {departure.monthName}
                  </h3>
                  {departure.days && (
                    <p className="text-[14px] text-ink/60 sm:mt-2">{departure.days}</p>
                  )}
                </div>
                <img
                  src={departureImages[departure.image]}
                  alt={departure.title}
                  loading="lazy"
                  width={1120}
                  height={768}
                  className="aspect-[16/10] w-full rounded-lg object-cover sm:aspect-[4/3]"
                />
                <div className="self-center">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-clay">
                    {departure.discipline}
                  </p>
                  <h4 className="mt-2 font-display text-[1.5rem] leading-tight font-medium sm:text-[1.8rem]">
                    {departure.title}
                  </h4>
                  <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
                    {departure.description}
                  </p>
                  {departure.detail && (
                    <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-ink/60">
                      {departure.detail}
                    </p>
                  )}
                </div>
                {departure.to && (
                  <span aria-hidden="true" className="hidden self-center text-[1.8rem] text-clay md:block">↗</span>
                )}
              </>
            );
            const rowClass = "grid grid-cols-1 gap-5 border-b border-ink/15 py-7 sm:grid-cols-[150px_200px_minmax(0,1fr)] sm:gap-8 md:grid-cols-[180px_240px_minmax(0,1fr)_32px] md:gap-10";
            return (
              <Link key={departure.id} to={departure.to} className={`${rowClass} transition-colors hover:bg-sand/40`}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pb-24">
        <div className="grid grid-cols-1 items-center gap-8 rounded-[14px] bg-sand p-8 ring-1 ring-ink/5 md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-medium text-balance">
              Tell us what you're planning.
            </h2>
            <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-pretty text-ink/70">
              We don't take online bookings — every trip is quoted by hand. Send a note and a trip
              designer replies within one working day.
            </p>
          </div>
          {sent ? (
            <div className="md:col-span-7">
              <div className="rounded-[14px] bg-cream/70 p-8 ring-1 ring-ink/5">
                <p className="font-display text-[1.5rem] font-medium">Request received.</p>
                <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-ink/70">
                  Thank you — a trip designer will reply within one working day with a tailored
                  proposal.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setSending(true);
                setError(null);
                const { error: err } = await supabase.from("enquiries").insert({
                  full_name: String(fd.get("full_name") ?? "").trim().slice(0, 120),
                  email: String(fd.get("email") ?? "").trim().slice(0, 255),
                  discipline: String(fd.get("discipline") ?? ""),
                  message: String(fd.get("message") ?? "").trim().slice(0, 2000) || null,
                });
                setSending(false);
                if (err) setError("Something went wrong — please try again.");
                else setSent(true);
              }}
            >
              <input
                name="full_name"
                type="text"
                required
                maxLength={120}
                placeholder="Full name"
                className="rounded-full bg-cream/70 px-5 py-3 text-[14px] ring-1 ring-ink/5 transition-shadow outline-none placeholder:text-ink/40 focus:ring-clay/50"
              />
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                placeholder="Email"
                className="rounded-full bg-cream/70 px-5 py-3 text-[14px] ring-1 ring-ink/5 transition-shadow outline-none placeholder:text-ink/40 focus:ring-clay/50"
              />
              <select
                name="discipline"
                required
                defaultValue=""
                className="rounded-full bg-cream/70 px-5 py-3 text-[14px] text-ink/70 ring-1 ring-ink/5 transition-shadow outline-none focus:ring-clay/50 sm:col-span-2"
              >
                <option value="" disabled>
                  Which discipline?
                </option>
                <option>Kitesurf</option>
                <option>Surf</option>
                <option>Golf</option>
                <option>Ski</option>
                <option>Yoga retreat</option>
                <option>Bali retreat</option>
                <option>Mixed / custom</option>
              </select>
              <textarea
                name="message"
                maxLength={2000}
                placeholder="Dates, group size, anything you'd like us to know"
                rows={3}
                className="rounded-[14px] bg-cream/70 px-5 py-3 text-[14px] ring-1 ring-ink/5 transition-shadow outline-none placeholder:text-ink/40 focus:ring-clay/50 sm:col-span-2"
              />
              {error && <p className="text-[13px] text-clay sm:col-span-2">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="justify-self-start rounded-full bg-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-clay disabled:opacity-60 sm:col-span-2"
              >
                {sending ? "Sending…" : "Send request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-4 px-6 py-10 text-[12px] uppercase tracking-[0.14em] text-ink/50 sm:flex-row">
          <span className="font-display font-medium">Huella — Dubai Sports Trips Atelier</span>
          <span>hello@huella.travel · Dubai, UAE</span>
        </div>
      </footer>
    </div>
  );
}
