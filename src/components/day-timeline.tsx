import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScheduleDay, TimelineEntry, TimelineKind } from "@/lib/schedule";

const dots: Record<TimelineKind, string> = {
  practice: "bg-clay",
  meal: "bg-sand ring-1 ring-clay/60",
  optional: "border-[1.5px] border-clay bg-transparent",
  other: "bg-ink/25",
};

interface DayTimelineProps {
  days: ScheduleDay[];
  entriesFor: (day: number) => TimelineEntry[];
  legend: { kind: TimelineKind; label: string }[];
  /** Day shown first — the first full day of the trip. */
  initialDay: number;
  /** Shown for days whose label is empty. */
  fallbackLabel: string;
  timeZoneLabel?: string;
}

// A trip's schedule as a day picker: choose a day and its timeline slides in.
export function DayTimeline({ days: scheduleDays, entriesFor, legend, initialDay, fallbackLabel, timeZoneLabel }: DayTimelineProps) {
  const [day, setDay] = useState(String(initialDay));
  // Which way the last change moved, so the new day slides in from that side.
  const [direction, setDirection] = useState(0);
  const index = Number(day);
  const step = (delta: number) => {
    setDirection(delta);
    setDay(String((index + delta + scheduleDays.length) % scheduleDays.length));
  };

  // On touch screens a sideways swipe over the timeline moves to the next or previous day.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Mostly horizontal and long enough, so vertical page scrolling is never mistaken for a swipe.
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  // Keep the chosen day's button in view when the row of days scrolls sideways on phones.
  const daysRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = daysRef.current;
    const active = row?.querySelector<HTMLElement>('[data-state="active"]');
    if (row && active) row.scrollTo({ left: active.offsetLeft - 16, behavior: "smooth" });
  }, [day]);

  return (
    <Tabs value={day} onValueChange={(value) => { setDirection(Number(value) - index); setDay(value); }} className="mt-8">
      <div className="flex items-center gap-3">
        <div ref={daysRef} className="relative min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList aria-label="Choose a day" className="flex h-auto w-max gap-2 bg-transparent p-0">
            {scheduleDays.map((d, i) => (
              <TabsTrigger
                key={d.name}
                value={String(i)}
                className="rounded-full border border-ink/15 px-4 py-2 text-[13px] text-ink/70 shadow-none transition-colors hover:border-clay/60 hover:text-clay data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-cream data-[state=active]:shadow-none"
              >
                {d.name.slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous day"
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-clay hover:text-clay"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next day"
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-clay hover:text-clay"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {scheduleDays.map((d, i) => (
        <TabsContent
          key={d.name}
          value={String(i)}
          // Phones get a compact day (it fits an iPhone 15+ screen); the slide-in is clipped so
          // the page never shifts sideways.
          className="mt-5 touch-pan-y overflow-x-clip md:mt-10 md:overflow-x-visible"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`grid grid-cols-1 gap-4 duration-300 md:gap-8 motion-reduce:animate-none md:grid-cols-12 ${
              direction > 0 ? "animate-in fade-in slide-in-from-right-8" : direction < 0 ? "animate-in fade-in slide-in-from-left-8" : ""
            }`}
          >
            <div className="md:order-2 md:col-span-4 md:col-start-9">
              <div className="flex items-end justify-between gap-3 md:block">
                <div>
                  <p className="font-display text-[2rem] leading-none italic md:text-[clamp(2.2rem,4vw,3.2rem)]">{d.name}</p>
                  <p className="mt-2 text-[11px] tracking-[0.25em] text-clay uppercase md:mt-3">{d.dayLabel ?? fallbackLabel}</p>
                </div>
                <p className="pb-0.5 text-[10px] tracking-[0.2em] text-ink/40 uppercase md:hidden">Swipe to change day</p>
              </div>
              <ul className="mt-8 hidden space-y-2 text-[12px] text-ink/60 md:block">
                {legend.map((item) => (
                  <li key={item.kind} className="flex items-center gap-3">
                    <span className={`size-2.5 rounded-full ${dots[item.kind]}`} />
                    {item.label}
                  </li>
                ))}
              </ul>
              {timeZoneLabel && (
                <p className="mt-6 hidden text-[11px] tracking-[0.2em] text-ink/40 uppercase md:block">{timeZoneLabel}</p>
              )}
            </div>
            <ol className="relative md:order-1 md:col-span-7">
              <span aria-hidden="true" className="absolute top-3 bottom-3 left-[4.75rem] w-px bg-clay/25 sm:left-[8.75rem]" />
              {entriesFor(i).map((entry, n) => (
                <li
                  key={`${n}-${entry.title}`}
                  className="relative grid grid-cols-[4rem_1.5rem_1fr] items-start gap-x-1 py-[7px] animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none sm:grid-cols-[8rem_1.5rem_1fr] md:py-3"
                  style={{ animationDelay: `${n * 60}ms`, animationFillMode: "both" }}
                >
                  <span className="pt-0.5 text-[11px] leading-tight text-ink/55 sm:pt-1 sm:text-[12px] sm:whitespace-nowrap">{entry.time}</span>
                  <span className={`mt-1.5 size-2.5 justify-self-center md:mt-2 rounded-full ${dots[entry.kind]}`} aria-hidden="true" />
                  <div>
                    <p className={`font-display text-[17px] leading-snug md:text-[21px] ${entry.kind === "optional" ? "text-clay italic" : entry.kind === "other" ? "text-ink/60" : ""}`}>
                      {entry.title}
                      {entry.kind === "optional" && (
                        <span className="ml-2 align-[0.15em] font-sans text-[10px] tracking-[0.18em] text-clay/80 uppercase not-italic">
                          Optional
                        </span>
                      )}
                    </p>
                    {entry.details.length > 0 && (
                      <p className="mt-0.5 text-[12px] leading-snug text-ink/60 md:text-[13px]">{entry.details.join(" ")}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
