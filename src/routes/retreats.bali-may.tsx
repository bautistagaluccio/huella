import { createFileRoute, redirect } from "@tanstack/react-router";

// The May 1–9 test page was withdrawn; the Bali retreat (now May 14–20) lives at /retreats/bali.
// This keeps links already shared to the old address pointing at the right page.
export const Route = createFileRoute("/retreats/bali-may")({
  beforeLoad: () => {
    throw redirect({ to: "/retreats/bali", code: 301 });
  },
  component: () => null,
});
