import { createFileRoute } from "@tanstack/react-router";
import { baliRetreatHead } from "@/components/bali-retreat-page";
import { BaliRetreatRedesign } from "@/components/bali-retreat-redesign";

// A second run of the March retreat: same villa, programme and price.
// May tests a redesigned layout of the same content; March keeps the original page.
const dates = { month: "May", days: "1–9" } as const;

export const Route = createFileRoute("/retreats/bali-may")({
  head: () => baliRetreatHead(dates),
  component: () => <BaliRetreatRedesign {...dates} />,
});
