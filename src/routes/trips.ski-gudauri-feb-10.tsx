import { createFileRoute, redirect } from "@tanstack/react-router";

// The February 10–14 departure was withdrawn; February 17–21 is the remaining ski trip.
// This keeps links already shared to the old address pointing at the right page.
export const Route = createFileRoute("/trips/ski-gudauri-feb-10")({
  beforeLoad: () => {
    throw redirect({ to: "/trips/ski-gudauri", code: 301 });
  },
  component: () => null,
});
