import { createFileRoute } from "@tanstack/react-router";
import { BaliRetreatPage, baliRetreatHead } from "@/components/bali-retreat-page";

// A second run of the March retreat: same villa, programme and price.
const dates = { month: "May", days: "1–9" } as const;

export const Route = createFileRoute("/retreats/bali-may")({
  head: () => baliRetreatHead(dates),
  component: () => <BaliRetreatPage {...dates} />,
});
