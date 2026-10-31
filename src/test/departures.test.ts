import { describe, expect, it } from "vitest";
import { departures, getDeparturesByDate } from "@/lib/departures";

describe("Departure calendar", () => {
  it("lists only real departures, ordered by departure month", () => {
    expect(getDeparturesByDate().map(({ id, month }) => ({ id, month }))).toEqual([
      { id: "ski-gudauri-feb-10", month: 2 },
      { id: "ski-gudauri", month: 2 },
      { id: "bali", month: 3 },
    ]);
  });
  it("adds a February 10–14 replica with a separate detail page", () => {
    expect(departures.find(({ id }) => id === "ski-gudauri-feb-10")).toMatchObject({
      month: 2, days: "10–14", to: "/trips/ski-gudauri-feb-10", detail: "From AED 10,000",
    });
  });
  it("preserves the original February 17–21 trip", () => {
    expect(departures.find(({ id }) => id === "ski-gudauri")).toMatchObject({
      month: 2, days: "17–21", to: "/trips/ski-gudauri", detail: "From AED 10,000",
    });
  });
});