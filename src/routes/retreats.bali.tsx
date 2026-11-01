import { createFileRoute } from "@tanstack/react-router";
import { BaliRetreatPage, baliRetreatHead } from "@/components/bali-retreat-page";

const dates = { month: "May", days: "14–20" } as const;

export const Route = createFileRoute("/retreats/bali")({
  head: () => baliRetreatHead(dates),
  component: () => <BaliRetreatPage {...dates} />,
});
