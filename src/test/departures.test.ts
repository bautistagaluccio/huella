import { describe, expect, it } from "vitest";
import { getDeparturesByDate } from "@/lib/departures";

describe("Departure calendar", () => {
  it("lists only real departures, ordered by departure month", () => {
    expect(getDeparturesByDate().map(({ id, month }) => ({ id, month }))).toEqual([
      { id: "ski-gudauri", month: 2 },
      { id: "bali", month: 3 },
    ]);
  });
});