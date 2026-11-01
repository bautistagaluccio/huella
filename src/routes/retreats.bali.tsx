import { createFileRoute } from "@tanstack/react-router";
import { BaliRetreatPage, baliRetreatHead } from "@/components/bali-retreat-page";

// Saturday to Friday, matching the weekly rhythm in src/lib/bali-schedule.ts.
const dates = { month: "May", days: "15–21" } as const;

export const Route = createFileRoute("/retreats/bali")({
  head: () => baliRetreatHead(dates),
  component: () => <BaliRetreatPage {...dates} />,
});
