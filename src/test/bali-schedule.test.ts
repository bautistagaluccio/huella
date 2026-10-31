import { describe, expect, it } from "vitest";
import {
  scheduleBlocks,
  scheduleDays,
  scheduleTimes,
  getDayTimeline,
} from "@/lib/bali-schedule";

describe("Bali weekly schedule", () => {
  it("runs from Saturday arrival to Friday departure across 7 day columns", () => {
    expect(scheduleTimes).toHaveLength(27);
    expect(scheduleDays).toHaveLength(7);
    expect(scheduleDays[0]!.name).toBe("Saturday");
    expect(scheduleDays[1]!.name).toBe("Sunday");
    expect(scheduleDays[1]!.dayLabel).toBe("Day 1");
    expect(scheduleDays[6]!.name).toBe("Friday");

    const arrival = scheduleBlocks.find((b) => b.lines.includes("Arrival"));
    expect(arrival?.day).toBe(0);
    const departure = scheduleBlocks.find((b) => b.lines.includes("Departure"));
    expect(departure?.day).toBe(6);
  });

  it("schedules yoga on every full retreat day in the early evening slot", () => {
    const yoga = scheduleBlocks.filter((b) => b.lines.includes("Yoga"));
    expect(yoga.map((b) => b.day)).toEqual([1, 2, 3, 4, 5]);
    for (const block of yoga) {
      expect(block.start).toBe(20);
      expect(block.end).toBe(22);
      expect(block.tone).toBe("blush");
    }
  });

  it("keeps every block inside the 7-day, 27-slot grid without collisions on the same day", () => {
    for (const block of scheduleBlocks) {
      expect(block.day).toBeGreaterThanOrEqual(0);
      expect(block.day).toBeLessThanOrEqual(6);
      expect(block.start).toBeGreaterThanOrEqual(0);
      expect(block.end).toBeLessThanOrEqual(scheduleTimes.length);
      expect(block.start).toBeLessThan(block.end);
    }
  });

  it("turns Sunday into an ordered timeline with optional activities named directly", () => {
    expect(getDayTimeline(1)).toEqual([
      { time: "7.30 am", title: "Stretching", details: [], kind: "practice" },
      { time: "8 am", title: "Pilates", details: [], kind: "practice" },
      { time: "9 am", title: "Breakfast", details: [], kind: "meal" },
      { time: "10.30 am", title: "Surf / Beach Club", details: [], kind: "optional" },
      { time: "1 pm", title: "Lunch", details: [], kind: "meal" },
      { time: "2.30 pm", title: "Cupping, acupuncture / massage", details: [], kind: "optional" },
      { time: "5.30 pm", title: "Yoga", details: [], kind: "practice" },
      { time: "6.30 pm", title: "Breathing session", details: [], kind: "practice" },
      { time: "8 pm", title: "Welcome Dinner", details: [], kind: "meal" },
    ]);
  });

  it("keeps every block of the week in the day timelines", () => {
    const total = scheduleDays.reduce((sum, _day, index) => sum + getDayTimeline(index).length, 0);
    expect(total).toBe(scheduleBlocks.length);
    expect(getDayTimeline(4).find((entry) => entry.title === "Special Dinner")?.details).toEqual(["by the host", "& night out"]);
  });
});
