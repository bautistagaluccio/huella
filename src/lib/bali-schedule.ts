// Weekly rhythm for the Bali Body & Breath retreat — as provided by the host.
// Day 0 = arrival Saturday, days 1–5 = full retreat days (Day 1–Day 5),
// day 6 = departure Friday (Day 6).
import { type ScheduleBlock, type ScheduleDay, type TimelineEntry, type TimelineKind } from "@/lib/schedule";

export const scheduleDays: ScheduleDay[] = [
  { name: "Saturday", dayLabel: null },
  { name: "Sunday", dayLabel: "Day 1" },
  { name: "Monday", dayLabel: "Day 2" },
  { name: "Tuesday", dayLabel: "Day 3" },
  { name: "Wednesday", dayLabel: "Day 4" },
  { name: "Thursday", dayLabel: "Day 5" },
  { name: "Friday", dayLabel: "Day 6 · Departure" },
];


export const scheduleTimes = [
  "7.30AM", "8AM", "8.30AM", "9AM", "9.30AM", "10AM",
  "10.30AM", "11AM", "11.30AM", "12PM", "12.30PM", "1PM",
  "1.30PM", "2PM", "2.30PM", "3PM", "3.30PM", "4PM",
  "4.30PM", "5PM", "5.30PM", "6PM", "6.30PM", "7PM",
  "7.30PM", "8PM", "8.30PM",
] as const;

const stretching = { start: 0, end: 1, lines: ["Stretching"], tone: "blush" as const };
const pilates = { start: 1, end: 3, lines: ["Pilates"], tone: "blush" as const };
const breakfast = { start: 3, end: 5, lines: ["Breakfast"], tone: "sage" as const };
const surfClub = {
  start: 6,
  end: 10,
  lines: ["Activity Optional", "Surf / Beach Club"],
  tone: "mist" as const,
};
const lunch = { start: 11, end: 13, lines: ["Lunch"], tone: "sage" as const };
const yoga = { start: 20, end: 22, lines: ["Yoga"], tone: "blush" as const };
const dinner = { start: 25, end: 27, lines: ["Dinner"], tone: "sage" as const };

export const scheduleBlocks: ScheduleBlock[] = [
  // Morning movement
  { day: 1, ...stretching },
  { day: 2, ...stretching },
  { day: 3, ...stretching },
  { day: 4, ...stretching },
  { day: 6, ...stretching },
  { day: 1, ...pilates },
  { day: 2, ...pilates },
  { day: 3, ...pilates },
  { day: 4, start: 1, end: 3, lines: ["Run Club", "by the beach"], tone: "clay" },
  { day: 5, start: 1, end: 3, lines: ["Sleep in"], tone: "gray" },
  { day: 6, ...pilates },

  // Breakfast
  { day: 1, ...breakfast },
  { day: 2, ...breakfast },
  { day: 3, ...breakfast },
  { day: 4, ...breakfast },
  { day: 5, ...breakfast },
  { day: 6, ...breakfast },

  // Late morning
  { day: 1, ...surfClub },
  { day: 2, ...surfClub },
  { day: 3, ...surfClub },
  { day: 4, ...surfClub },
  { day: 6, ...surfClub },
  { day: 5, start: 6, end: 10, lines: ["Stretching", "Pilates"], tone: "blush" },

  // Lunch
  { day: 1, ...lunch },
  { day: 2, ...lunch },
  { day: 3, ...lunch },
  { day: 4, ...lunch },
  { day: 5, ...lunch },
  { day: 6, start: 11, end: 13, lines: ["Farewell Lunch"], tone: "sage" },

  // Afternoon
  { day: 1, start: 14, end: 19, lines: ["Activity Optional", "Cupping, acupuncture / massage"], tone: "mist" },
  { day: 2, start: 14, end: 19, lines: ["Activity Optional", "Ice bath, sauna / massage"], tone: "mist" },
  { day: 3, start: 15, end: 19, lines: ["Activity Optional", "Cooking session"], tone: "mist" },
  { day: 4, start: 14, end: 19, lines: ["Activity Optional", "Water pilates / massage"], tone: "mist" },
  { day: 5, start: 14, end: 19, lines: ["Activity Optional", "Tarot reading / massage"], tone: "mist" },
  { day: 0, start: 14, end: 24, lines: ["Arrival"], tone: "gray" },
  { day: 6, start: 14, end: 24, lines: ["Departure"], tone: "gray" },

  // Evening practice
  { day: 1, ...yoga },
  { day: 2, ...yoga },
  { day: 3, ...yoga },
  { day: 4, ...yoga },
  { day: 5, ...yoga },
  { day: 1, start: 22, end: 24, lines: ["Breathing session"], tone: "blush" },
  { day: 2, start: 22, end: 24, lines: ["Sound Healing"], tone: "blush" },
  { day: 3, start: 22, end: 24, lines: ["Breathing session"], tone: "blush" },
  { day: 4, start: 22, end: 24, lines: ["Sound Healing"], tone: "blush" },
  { day: 5, start: 22, end: 24, lines: ["Breathing session"], tone: "blush" },

  // Dinner
  { day: 0, ...dinner },
  { day: 1, start: 25, end: 27, lines: ["Welcome Dinner"], tone: "sage" },
  { day: 2, start: 25, end: 27, lines: ["Dinner Outside"], tone: "sage" },
  { day: 3, start: 25, end: 27, lines: ["Home Dinner"], tone: "sage" },
  { day: 4, start: 25, end: 27, lines: ["Special Dinner", "by the host", "& night out"], tone: "sage" },
  { day: 5, start: 25, end: 27, lines: ["Free Night"], tone: "gray" },
];

const kindByTone: Record<ScheduleBlock["tone"], TimelineKind> = {
  blush: "practice",
  clay: "practice",
  sage: "meal",
  mist: "optional",
  gray: "other",
};

// One day of the weekly rhythm as an ordered timeline. The host's sheet labels
// optional blocks "Activity Optional", so the activity itself becomes the title.
export function getDayTimeline(day: number): TimelineEntry[] {
  return scheduleBlocks
    .filter((block) => block.day === day)
    .sort((a, b) => a.start - b.start)
    .map((block) => {
      const kind = kindByTone[block.tone];
      const [first = "", ...rest] = block.lines;
      const optionalLabel = kind === "optional" && first === "Activity Optional";
      return {
        time: (scheduleTimes[block.start] ?? "").replace("AM", " am").replace("PM", " pm"),
        title: optionalLabel ? rest.join(" ") : first,
        details: optionalLabel ? [] : rest,
        kind,
      };
    });
}
