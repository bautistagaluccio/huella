import { describe, expect, it } from "vitest";
import {
  scheduleBlocks,
  scheduleDays,
  scheduleTimes,
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
});
