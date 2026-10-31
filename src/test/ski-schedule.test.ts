import { describe, expect, it } from "vitest";
import { skiAgendaTimeRange, skiBlocks, skiDays, skiTimes } from "@/lib/ski-schedule";

const day = (n: number) => skiBlocks.filter((block) => block.day === n);
const entries = (n: number) => day(n).map((block) => ({
  lines: block.lines,
  time: skiAgendaTimeRange(block),
}));

describe("Owner's ski agenda image", () => {
  it("keeps Tuesday departure at 11 pm through the midnight row", () => {
    expect(entries(0)).toEqual([{ lines: ["Departure"], time: "11 pm" }]);
  });

  it("keeps arrival separate from sleep without inventing an arrival time", () => {
    expect(entries(1).slice(0, 2)).toEqual([
      { lines: ["Arrival", "Early check in"], time: "Before 7.30 am" },
      { lines: ["Sleep"], time: "7.30 am – 12 pm" },
    ]);
  });

  it("keeps Wednesday lunch, ski, free time and welcome dinner boundaries", () => {
    expect(entries(1).slice(2)).toEqual([
      { lines: ["Lunch & rental"], time: "12.30 pm – 2 pm" },
      { lines: ["Ski"], time: "2.30 pm – 5 pm" },
      { lines: ["Free time"], time: "5 pm – 7.30 pm" },
      { lines: ["Dinner", "Welcome", "@Lodge"], time: "8 pm – 10.30 pm" },
    ]);
  });

  it.each([2, 3, 4])("keeps day %i breakfast, opens with stretching and separates skiing from afternoon optional activities", (n) => {
    expect(entries(n).slice(0, 6)).toEqual([
      { lines: ["Breakfast"], time: "8.30 am – 9.30 am" },
      { lines: ["Stretching and mobility"], time: "10 am – 10.30 am" },
      { lines: ["Ski"], time: "10.30 am – 2.30 pm" },
      { lines: ["Free lunch"], time: "" },
      { lines: ["Up to you!", "Afternoon ski / spa session"], time: "2.30 pm – 5 pm" },
      { lines: ["Free time"], time: "5 pm – 7.30 pm" },
    ]);
  });

  it("keeps Thursday's dinner separate from the night out at Drunk Cherry", () => {
    expect(entries(2).slice(-2)).toEqual([
      { lines: ["Dinner", "@Ati Ambavi"], time: "8 pm – 10.30 pm" },
      { lines: ["Night out", "Drunk Cherry"], time: "" },
    ]);
  });

  it("keeps Friday dinner separate from optional night skiing", () => {
    expect(entries(3).slice(-2)).toEqual([
      { lines: ["Dinner on the slopes"], time: "7.30 pm – 8 pm" },
      { lines: ["Night ski", "Optional"], time: "8 pm – 10.30 pm" },
    ]);
  });

  it("keeps Saturday farewell dinner with wine tasting at the sheet's times", () => {
    expect(entries(4).at(-1)).toEqual({ lines: ["Dinner", "Farewell", "Wine tasting"], time: "8 pm – 10.30 pm" });
  });

  it("keeps Sunday breakfast and the full return travel block exactly as supplied", () => {
    expect(entries(5)).toEqual([
      { lines: ["Breakfast"], time: "9 am – 10.30 am" },
      { lines: ["Departure", "Flight back", "Arrival"], time: "11 am – 9.30 pm" },
    ]);
  });

  it("adds stretching on Thursday to Saturday only, not on Wednesday arrival day", () => {
    expect(skiBlocks.filter((block) => block.lines[0] === "Stretching and mobility").map((block) => block.day)).toEqual([2, 3, 4]);
  });

  it("adds Free lunch between the two ski entries on the three full ski days", () => {
    expect(skiBlocks.filter((block) => block.lines[0] === "Free lunch").map((block) => block.day)).toEqual([2, 3, 4]);
  });

  it("keeps the Tuesday–Sunday columns and nonoverlapping valid blocks", () => {
    expect(skiDays.map((d) => d.name)).toEqual(["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
    for (const block of skiBlocks) {
      expect(block.day).toBeGreaterThanOrEqual(0);
      expect(block.day).toBeLessThan(skiDays.length);
      expect(block.start).toBeGreaterThanOrEqual(0);
      expect(block.end).toBeLessThan(skiTimes.length);
      if (block.noTime) expect(block.start).toBe(block.end);
      else expect(block.start).toBeLessThan(block.end);
    }
    for (let n = 0; n < skiDays.length; n++) {
      const blocks = day(n);
      blocks.slice(1).forEach((block, index) => {
        expect(block.start).toBeGreaterThanOrEqual(blocks[index]?.end ?? 0);
      });
    }
  });
});