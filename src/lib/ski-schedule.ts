// Day-by-day agenda for the Caucasus Powder Days ski trip — transcribed from the
// owner's spreadsheet. Day 0 = Tuesday night departure from Dubai,
// days 1–5 = Wednesday to Sunday on the mountain and the journey home.
import { type BlockTone, type ScheduleBlock, type ScheduleDay, type TimelineEntry, type TimelineKind } from "@/lib/schedule";

export const skiDays: ScheduleDay[] = [
  { name: "Tuesday", dayLabel: "Departure" },
  { name: "Wednesday", dayLabel: "Day 1" },
  { name: "Thursday", dayLabel: "Day 2" },
  { name: "Friday", dayLabel: "Day 3" },
  { name: "Saturday", dayLabel: "Day 4" },
  { name: "Sunday", dayLabel: "Day 5" },
];

export const skiTimes = [
  "6AM", "6.30AM", "7AM", "7.30AM", "8AM", "8.30AM",
  "9AM", "9.30AM", "10AM", "10.30AM", "11AM", "11.30AM",
  "12PM", "12.30PM", "1PM", "1.30PM", "2PM", "2.30PM",
  "3PM", "3.30PM", "4PM", "4.30PM", "5PM", "5.30PM",
  "6PM", "6.30PM", "7PM", "7.30PM", "8PM", "8.30PM",
  "9PM", "9.30PM", "10PM", "10.30PM", "11PM", "11.30PM", "12AM", "12.30AM",
] as const;

const breakfast = { start: 5, end: 7, lines: ["Breakfast"], tone: "sage" as const };
// The first half hour of each full ski day's morning session goes to stretching.
const stretching = { start: 8, end: 9, lines: ["Stretching and mobility"], tone: "blush" as const };
const skiDay = {
  start: 9,
  end: 17,
  lines: ["Ski"],
  tone: "blush" as const,
};
const skiOptional = { start: 17, end: 22, lines: ["Up to you!", "Afternoon ski / spa session"], tone: "blush" as const };
const freeTime = { start: 22, end: 27, lines: ["Free time"], tone: "gray" as const };
// Lunch on the full ski days is at your own pace — the sheet gives it no slot.
const freeLunch = { start: 17, end: 17, lines: ["Free lunch"], tone: "sage" as const, noTime: true };

export function skiAgendaTimeRange(block: ScheduleBlock) {
  const format = (index: number) => skiTimes[index]?.replace("AM", " am").replace("PM", " pm");
  // Entries the sheet gives no slot to show no time at all.
  if (block.noTime) return "";
  // Tuesday's sheet specifies departure, not an arrival/end time.
  if (block.day === 0) return format(block.start);
  // The arrival/early check-in block has no start time in the owner's sheet.
  if (block.day === 1 && block.lines[0] === "Arrival") return `Before ${format(block.end)}`;
  return `${format(block.start)} – ${format(block.end)}`;
}

export const skiBlocks: ScheduleBlock[] = [
  // The night before — wheels up from Dubai
  { day: 0, start: 34, end: 37, lines: ["Departure"], tone: "gray" },

  // Day 1 — arrival
  { day: 1, start: 0, end: 3, lines: ["Arrival", "Early check in"], tone: "gray" },
  { day: 1, start: 3, end: 12, lines: ["Sleep"], tone: "mist" },
  { day: 1, start: 13, end: 16, lines: ["Lunch & rental"], tone: "sage" },
  { day: 1, start: 17, end: 22, lines: ["Ski"], tone: "blush" },
  { day: 1, ...freeTime },
  { day: 1, start: 28, end: 33, lines: ["Dinner", "Welcome", "@Lodge"], tone: "sage" },

  // Day 2
  { day: 2, ...breakfast },
  { day: 2, ...stretching },
  { day: 2, ...skiDay },
  { day: 2, ...freeLunch },
  { day: 2, ...skiOptional },
  { day: 2, ...freeTime },
  { day: 2, start: 28, end: 33, lines: ["Dinner", "@Ati Ambavi"], tone: "sage" },
  // The night out is its own row — the sheet folded it into the dinner line.
  { day: 2, start: 33, end: 33, lines: ["Night out", "Drunk Cherry"], tone: "clay", noTime: true },

  // Day 3
  { day: 3, ...breakfast },
  { day: 3, ...stretching },
  { day: 3, ...skiDay },
  { day: 3, ...freeLunch },
  { day: 3, ...skiOptional },
  { day: 3, ...freeTime },
  { day: 3, start: 27, end: 28, lines: ["Dinner on the slopes"], tone: "sage" },
  { day: 3, start: 28, end: 33, lines: ["Night ski", "Optional"], tone: "mist" },

  // Day 4
  { day: 4, ...breakfast },
  { day: 4, ...stretching },
  { day: 4, ...skiDay },
  { day: 4, ...freeLunch },
  { day: 4, ...skiOptional },
  { day: 4, ...freeTime },
  { day: 4, start: 28, end: 33, lines: ["Dinner", "Farewell", "Wine tasting"], tone: "sage" },

  // Day 5 — journey home
  { day: 5, start: 6, end: 9, lines: ["Breakfast"], tone: "sage" },
  { day: 5, start: 10, end: 31, lines: ["Departure", "Flight back", "Arrival"], tone: "gray" },
];

const skiKindByTone: Record<BlockTone, TimelineKind> = {
  blush: "practice",
  sage: "meal",
  mist: "optional",
  clay: "other",
  gray: "other",
};

// One day of the ski agenda as a timeline, in the sheet's order. Sleep shares the
// sheet's "optional" colour but is rest, so it reads as travel and free time.
export function getSkiDayTimeline(day: number): TimelineEntry[] {
  return skiBlocks
    .filter((block) => block.day === day)
    .map((block) => {
      const [title = "", ...details] = block.lines;
      return {
        time: skiAgendaTimeRange(block) ?? "",
        title,
        details,
        kind: title === "Sleep" ? "other" : skiKindByTone[block.tone],
      };
    });
}
