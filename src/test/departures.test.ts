import { describe, expect, it } from "vitest";
import { departures, getDeparturesByDate } from "@/lib/departures";

describe("Departure calendar", () => {
  it("lists only real departures, ordered by departure month", () => {
    expect(getDeparturesByDate().map(({ id, month }) => ({ id, month }))).toEqual([
      { id: "ski-gudauri", month: 2 },
      { id: "bali", month: 3 },
      { id: "bali-may", month: 5 },
    ]);
  });
  it("preserves the original February 17–21 trip", () => {
    expect(departures.find(({ id }) => id === "ski-gudauri")).toMatchObject({
      month: 2, days: "17–21", to: "/trips/ski-gudauri", detail: "From AED 10,000",
    });
  });
  it("repeats the Bali retreat in May with the same price", () => {
    expect(departures.find(({ id }) => id === "bali-may")).toMatchObject({
      month: 5, days: "1–9", to: "/retreats/bali-may", detail: "From AED 15,000",
    });
  });
});
