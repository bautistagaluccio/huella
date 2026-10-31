// Text and photos for the Caucasus Powder Days ski trip page.
import afternoonSki from "@/assets/ski-afternoon-activity.jpg";
import lodgeDining from "@/assets/lodge-dining.jpg";
import lodgeLounge from "@/assets/lodge-lounge.jpg";
import lodgePool from "@/assets/lodge-pool.jpg";
import lodgeRoom from "@/assets/lodge-room.jpg";
import lodgeSnowTerrace from "@/assets/lodge-snow-terrace.jpg";
import lodgeTerrace from "@/assets/lodge-terrace.jpg";
import nightSki from "@/assets/ski-night-activity.jpg";
import wineTasting from "@/assets/ski-wine-activity.jpg";
import type { PackingItem } from "@/components/trip-layout";

export const lodgeShots: { src: string; alt: string; caption: string; position?: string }[] = [
  {
    src: lodgeLounge,
    alt: "Lounge with a suspended fireplace and panoramic windows onto snowy mountains",
    caption: "The lounge",
  },
  {
    src: lodgeSnowTerrace,
    alt: "Snow-covered terrace with dark framed lounge chairs and low tables, snow-laden evergreens and a panorama of snow-capped ridges under a bright blue sky",
    caption: "The lodge",
    // Portrait source: favour the lower half so the wide crop shows the seating, not just sky.
    position: "center 60%",
  },
  {
    src: lodgeTerrace,
    alt: "Upper terrace with timber tables and chairs lined with white sheepskin throws, overlooking snowy peaks",
    caption: "The upper terrace",
  },
  {
    src: lodgePool,
    alt: "Heated outdoor pool steaming in deep snow under a clear blue sky",
    caption: "The pool, in snow",
  },
  {
    src: lodgeDining,
    alt: "Outdoor dining terrace set for lunch with a snow-covered mountain view",
    caption: "Lunch on the terrace",
  },
  {
    src: lodgeRoom,
    alt: "Contemporary bedroom with a low timber bed, circular armchair and large windows",
    caption: "The rooms",
  },
];

export const included = [
  {
    title: "Flights from Dubai",
    description:
      "Both directions, together with the transfers within Georgia — you leave Dubai late Tuesday night and fly home at the end of the week.",
  },
  {
    title: "Gudauri Lodge",
    description:
      "The lodge for the full trip: lounge, terraces, dining room and the heated pool, all part of the stay.",
  },
  {
    title: "Breakfast & dinners",
    description: "Breakfast each morning and the dinners in the agenda, taken together at the lodge.",
  },
  {
    title: "The ski days",
    description:
      "The ski time laid out in the agenda, on the slopes with the group or at your own pace — passes and rental included.",
  },
];

export const includedNote =
  "Anything beyond the above — extras and personal requests — is confirmed in your tailored proposal.";

export const optionalActivities = [
  {
    title: "Afternoon ski",
    description: "More time on the snow in the early afternoon, for those who aren’t finished with the slopes.",
    photo: { src: afternoonSki, alt: "Skiers enjoying a snowy mountain slope in daylight" },
  },
  {
    title: "Spa",
    description: "The same window spent in the spa instead — heat, water and a long pause between the two.",
    photo: { src: lodgePool, alt: "Gudauri Lodge's heated outdoor pool surrounded by snow" },
  },
  {
    title: "Night ski",
    description: "An evening session on the mountain, for the ones who want the slopes after dark.",
    photo: { src: nightSki, alt: "Skiers on a floodlit slope at twilight" },
  },
  {
    title: "Wine tasting",
    description:
      "An evening with Georgian wines — a tasting arranged at the lodge or in the village, for the ones who would rather end the day slowly.",
    photo: { src: wineTasting, alt: "Wine glasses shared around a tasting table" },
  },
];

export const skiPackingList: PackingItem[] = [
  { title: "My winter clothes" },
  {
    title: "My documents (Passport, VISA)",
    // The word VISA links to Georgia's official e-visa site.
    link: { word: "VISA", href: "https://www.evisa.gov.ge/GeoVisa/" },
  },
  { title: "My good energy" },
];

export const audience = [
  {
    title: "A trip for everyone",
    description: "First time on snow or seasoned skier — the week is shaped so everyone finds their pace and their people.",
  },
  {
    title: "Lessons for every level",
    description:
      "Want to learn or improve your skiing? We arrange lessons with local instructors, from your very first run to refining your technique.",
  },
  {
    title: "Beyond the slopes",
    description: "Don't feel like skiing? Spa afternoons, wine tasting and evenings out keep the week just as full away from the slopes.",
  },
];
