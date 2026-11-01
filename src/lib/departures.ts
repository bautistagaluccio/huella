export const departures = [
  {
    id: "ski-gudauri",
    month: 2,
    monthName: "February",
    days: "17–21",
    discipline: "Ski",
    title: "Caucasus Powder Days",
    description: "Five days on quiet slopes in Gudauri — flights from Dubai included.",
    detail: "From AED 10,000",
    image: "ski",
    to: "/trips/ski-gudauri",
  },
  {
    id: "bali",
    month: 5,
    monthName: "May",
    days: "14–20",
    discipline: "Wellness",
    title: "Bali Body & Breath",
    description: "Daily yoga, breathwork, meditation and pilates amid the rice terraces.",
    detail: "From AED 15,000",
    image: "bali",
    to: "/retreats/bali",
  },
] as const;

export function getDeparturesByDate() {
  return [...departures].sort((a, b) => a.month - b.month || Number(a.days.split("–")[0]) - Number(b.days.split("–")[0]));
}