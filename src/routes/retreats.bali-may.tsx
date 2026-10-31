import { createFileRoute, redirect } from "@tanstack/react-router";

// The May 1–9 departure was withdrawn; March 6–14 is the remaining Bali retreat.
// This keeps links already shared to the old address pointing at the right page.
export const Route = createFileRoute("/retreats/bali-may")({
  beforeLoad: () => {
    throw redirect({ to: "/retreats/bali", code: 301 });
  },
  component: () => null,
});
