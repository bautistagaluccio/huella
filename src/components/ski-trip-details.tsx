import { useState, type ReactNode } from "react";
import { Maximize2, Plane, KeyRound, Utensils, MountainSnow } from "lucide-react";
import afternoonSki from "@/assets/ski-afternoon-activity.jpg";
import nightSki from "@/assets/ski-night-activity.jpg";
import wineTasting from "@/assets/ski-wine-activity.jpg";
import lodgePool from "@/assets/lodge-pool.jpg";
import pisteMap from "@/assets/gudauri-piste-map.webp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const included = [
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
    description:
      "Breakfast each morning and the dinners in the agenda, taken together at the lodge.",
  },
  {
    title: "The ski days",
    description:
      "The ski time laid out in the agenda, on the slopes with the group or at your own pace — passes and rental included.",
  },
];

const optional = [
  {
    title: "Afternoon ski",
    description:
      "More time on the snow in the early afternoon, for those who aren’t finished with the slopes.",
  },
  {
    title: "Spa",
    description:
      "The same window spent in the spa instead — heat, water and a long pause between the two.",
  },
  {
    title: "Night ski",
    description:
      "An evening session on the mountain, for the ones who want the slopes after dark.",
  },
  {
    title: "Wine tasting",
    description:
      "An evening with Georgian wines — a tasting arranged at the lodge or in the village, for the ones who would rather end the day slowly.",
  },
];

const inclusionIcons = [Plane, KeyRound, Utensils, MountainSnow];
const activityPhotos = [
  { src: afternoonSki, alt: "Skiers enjoying a snowy mountain slope in daylight" },
  { src: lodgePool, alt: "Gudauri Lodge's heated outdoor pool surrounded by snow" },
  { src: nightSki, alt: "Skiers on a floodlit slope at twilight" },
  { src: wineTasting, alt: "Wine glasses shared around a tasting table" },
];

type DetailItem = { title: string; description: string };

const sections: {
  value: string;
  label: string;
  heading: ReactNode;
  intro: ReactNode;
  items: DetailItem[];
  note?: string;
}[] = [
  {
    value: "resort",
    label: "The resort",
    heading: <>The <span className="text-clay italic">slopes</span>, right at your door</>,
    intro: (
      <>
        A <strong className="font-semibold text-ink">ski-in, ski-out</strong> lodge above the valley —
        the week happens here, with the lounge, the terraces and the pool all facing the mountains.
      </>
    ),
    items: [],
  },
  {
    value: "included",
    label: "What’s included",
    heading: <>We’ve got it <span className="text-clay italic">covered</span></>,
    intro: "The essentials are arranged with the trip, so the only thing left to decide is how much you ski.",
    items: included,
    note: "Anything beyond the above — extras and personal requests — is confirmed in your tailored proposal.",
  },
  {
    value: "optional",
    label: "Optional activities",
    heading: <>For the days you want <span className="text-clay italic">more</span></>,
    intro: "Nothing here is compulsory. These are there for whoever wants them.",
    items: optional,
  },
];

const indicatorPositions: Record<string, string> = {
  resort: "translate-x-0",
  included: "translate-x-full",
  optional: "translate-x-[200%]",
};

export function SkiTripDetails({ section, photoEditorial = false }: { section?: "resort" | "included" | "optional"; photoEditorial?: boolean }) {
  const [selected, setSelected] = useState("resort");

  return (
    <Tabs value={section ?? selected} onValueChange={setSelected} className="min-w-0">
      {!section && <div className="overflow-x-auto">
        <div className="relative min-w-[520px] border-b border-ink/15">
          <TabsList
            aria-label="Trip details"
            className="grid h-auto w-full grid-cols-3 rounded-none bg-transparent p-0"
          >
            {sections.map((section) => (
              <TabsTrigger
                key={section.value}
                value={section.value}
                className="min-h-14 rounded-none px-2 py-4 text-[12px] text-ink/55 transition-colors data-[state=active]:bg-transparent data-[state=active]:text-clay data-[state=active]:shadow-none"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-0 h-0.5 w-1/3 bg-clay transition-transform duration-300 motion-reduce:transition-none ${
              indicatorPositions[selected] ?? "translate-x-0"
            }`}
          />
        </div>
      </div>}
      {sections.filter((item) => !section || item.value === section).map((section) => (
        <TabsContent
          key={section.value}
          value={section.value}
          className="mt-8 min-h-[380px]"
        >
          <h2 className="font-display text-[28px] leading-tight font-medium">{section.heading}</h2>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink/65">{section.intro}</p>
          {photoEditorial && section.value === "included" && (
            <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item, index) => {
                const ItemIcon = inclusionIcons[index];
                return (
                  <div key={item.title} className="min-w-0">
                    {ItemIcon && <ItemIcon aria-hidden="true" className="mb-5 size-8 text-clay" strokeWidth={1.5} />}
                    <h3 className="font-display text-[23px] leading-tight font-medium">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{item.description}</p>
                  </div>
                );
              })}
            </div>
          )}
          {photoEditorial && section.value === "optional" && (
            <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item, index) => {
                const photo = activityPhotos[index];
                return (
                  <figure key={item.title} className="min-w-0">
                    {photo && <img src={photo.src} alt={photo.alt} loading="lazy" width={1024} height={768}
                      className="aspect-[4/3] w-full rounded-lg object-cover" />}
                    <figcaption className="mt-5">
                      <h3 className="font-display text-[23px] leading-tight font-medium">{item.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{item.description}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          )}
          {!photoEditorial && section.items.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.title} className="border-t border-ink/10 pt-4">
                  <h3 className="font-display text-[21px] font-medium">{item.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-[14px] leading-relaxed text-pretty text-ink/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
          {section.value === "resort" && (
            <Dialog>
              <DialogTrigger className="group mt-9 flex w-full flex-col items-start gap-5 rounded-[14px] bg-sand p-5 text-left ring-1 ring-ink/5 transition-colors hover:ring-clay/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay sm:flex-row sm:items-center sm:p-6">
                <img
                  src={pisteMap}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-40 w-full max-w-[200px] shrink-0 rounded-[10px] bg-cream object-contain p-2 outline-1 -outline-offset-1 outline-ink/10"
                />
                <span className="min-w-0">
                  <span className="block font-display text-[21px] font-medium">The piste map</span>
                  <span className="mt-2 block max-w-[52ch] text-[14px] leading-relaxed text-pretty text-ink/70">
                    The whole mountain in one page — every lift, run and facility at Gudauri.
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-clay uppercase">
                    <Maximize2 className="h-3.5 w-3.5" />
                    Click to open
                  </span>
                </span>
              </DialogTrigger>
              <DialogContent className="max-w-[min(1040px,94vw)] border-none bg-cream p-5 sm:p-7">
                <DialogHeader className="text-left">
                  <DialogTitle className="font-display text-[22px] font-medium">
                    Gudauri piste map
                  </DialogTitle>
                  <DialogDescription className="text-[13px] leading-relaxed text-ink/60">
                    Every lift, run and facility on the mountain, in one page.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[68vh] overflow-y-auto">
                  <img
                    src={pisteMap}
                    alt="Piste map of the Gudauri ski resort showing lifts, runs of every level, facilities and the legend"
                    className="w-full rounded-[10px] outline-1 -outline-offset-1 outline-ink/10"
                  />
                </div>
                <a
                  href={pisteMap}
                  target="_blank"
                  rel="noreferrer"
                  className="justify-self-start text-[11px] tracking-[0.2em] text-clay uppercase transition-colors hover:text-ink"
                >
                  Open full size
                </a>
              </DialogContent>
            </Dialog>
          )}
          {section.note && (
            <div className="mt-8 border-t border-ink/10 pt-4">
              <p className="max-w-[60ch] text-[13px] leading-relaxed text-ink/55">{section.note}</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
