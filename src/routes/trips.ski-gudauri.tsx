import { createFileRoute } from "@tanstack/react-router";
import { SkiTripPage } from "@/components/ski-trip-page";

export const Route = createFileRoute("/trips/ski-gudauri")({
  head: () => ({
    meta: [
      { title: "Caucasus Powder Days — Feb 17–21 · Huella" },
      {
        name: "description",
        content:
          "A five-day ski escape in Gudauri, February 17–21 — quiet slopes, mountain air and flights from Dubai included. From AED 10,000.",
      },
      { property: "og:title", content: "Caucasus Powder Days — Feb 17–21 · Huella" },
      {
        property: "og:description",
        content:
          "Five days on quiet slopes in Gudauri. February 17–21, flights from Dubai included, from AED 10,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkiTripPage,
});

