import { useState } from "react";
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
  const index = Number(day);
  const step = (delta: number) => setDay(String((index + delta + scheduleDays.length) % scheduleDays.length));

  return (
    <Tabs value={day} onValueChange={setDay} className="mt-8">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 overflow-x-auto">
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
        <TabsContent key={d.name} value={String(i)} className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:order-2 md:col-span-4 md:col-start-9">
              <p className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none italic">{d.name}</p>
              <p className="mt-3 text-[11px] tracking-[0.25em] text-clay uppercase">{d.dayLabel ?? fallbackLabel}</p>
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
              <span aria-hidden="true" className="absolute top-3 bottom-3 left-[5.25rem] w-px bg-clay/25 sm:left-[8.75rem]" />
              {entriesFor(i).map((entry, n) => (
                <li
                  key={`${n}-${entry.title}`}
                  className="relative grid grid-cols-[4.5rem_1.5rem_1fr] items-start gap-x-1 py-3 animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none sm:grid-cols-[8rem_1.5rem_1fr]"
                  style={{ animationDelay: `${n * 60}ms`, animationFillMode: "both" }}
                >
                  <span className="pt-1 text-[12px] text-ink/55 sm:whitespace-nowrap">{entry.time}</span>
                  <span className={`mt-2 size-2.5 justify-self-center rounded-full ${dots[entry.kind]}`} aria-hidden="true" />
                  <div>
                    <p className={`font-display text-[21px] leading-snug ${entry.kind === "optional" ? "text-clay italic" : entry.kind === "other" ? "text-ink/60" : ""}`}>
                      {entry.title}
                      {entry.kind === "optional" && <span className="sr-only"> (optional)</span>}
                    </p>
                    {entry.kind === "optional" && (
                      <p className="mt-0.5 text-[10px] tracking-[0.2em] text-clay/80 uppercase" aria-hidden="true">Optional</p>
                    )}
                    {entry.details.length > 0 && (
                      <p className="mt-0.5 text-[13px] text-ink/60">{entry.details.join(" ")}</p>
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
