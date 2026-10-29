import { createFileRoute, redirect } from "@tanstack/react-router";

// The trip lives in Gudauri, Georgia, so its address is /trips/ski-gudauri.
// This keeps links already shared to the old address pointing at the right page.
export const Route = createFileRoute("/trips/ski-azerbaijan")({
  beforeLoad: () => {
    throw redirect({ to: "/trips/ski-gudauri", code: 301 });
  },
  component: () => null,
});
