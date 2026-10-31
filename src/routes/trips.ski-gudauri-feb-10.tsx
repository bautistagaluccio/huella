import { createFileRoute } from "@tanstack/react-router";
import { SkiTripPage } from "@/components/ski-trip-page";

export const Route = createFileRoute("/trips/ski-gudauri-feb-10")({
  head: () => ({
    meta: [
      { title: "Caucasus Powder Days — Feb 10–14 · Huella" },
      {
        name: "description",
        content:
          "A five-day ski escape in Gudauri, February 10–14 — quiet slopes, mountain air and flights from Dubai included. From AED 10,000.",
      },
      { property: "og:title", content: "Caucasus Powder Days — Feb 10–14 · Huella" },
      {
        property: "og:description",
        content:
          "Five days on quiet slopes in Gudauri. February 10–14, flights from Dubai included, from AED 10,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SkiTripPage days="10–14" expandedMenu />,
});

