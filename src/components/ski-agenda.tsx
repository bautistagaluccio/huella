import { Coffee, Plane, Snowflake, Utensils, Moon, PersonStanding, Sparkles, Clock, type LucideIcon } from "lucide-react";
import { skiAgendaTimeRange, skiBlocks, skiDays } from "@/lib/ski-schedule";
import type { BlockTone, ScheduleBlock } from "@/lib/schedule";

const tones: Record<BlockTone, string> = {
  blush: "bg-blush text-clay",
  sage: "bg-sage text-ink",
  mist: "bg-mist text-ink",
  clay: "bg-clay text-cream",
  gray: "bg-cream text-ink/60",
};

function activityIcon(block: ScheduleBlock): LucideIcon {
  const activity = block.lines[0]?.toLowerCase() ?? "";
  if (activity.includes("stretching")) return PersonStanding;
  if (activity.includes("ski")) return Snowflake;
  if (activity.includes("breakfast")) return Coffee;
  if (activity.includes("lunch") || activity.includes("dinner")) return Utensils;
  if (activity.includes("arrival") || activity.includes("departure")) return Plane;
  if (activity.includes("free")) return Moon;
  // The owner's "Up to you!" card names the activity only in its second line.
  if (block.lines.slice(1).join(" ").toLowerCase().includes("ski")) return Snowflake;
  return Sparkles;
}

export function SkiAgendaCards() {
  return (
    <div
      role="region"
      aria-label="Caucasus Powder Days day cards"
      className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {skiDays.map((day, index) => (
        <section key={day.name} className="rounded-lg bg-sand/65 px-5 py-6">
          <header className="mb-6 border-b border-ink/10 pb-5">
            <h3 className="font-display text-[25px] italic">{day.name}</h3>
            <p className="mt-1 text-[10px] text-clay">{day.dayLabel}</p>
          </header>
          <ol className="space-y-5">
            {skiBlocks.filter((block) => block.day === index).map((block, blockIndex) => {
              const Icon = activityIcon(block);
              return (
                <li key={blockIndex} className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tones[block.tone]}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-relaxed font-medium">{block.lines[0]}</p>
                    {!block.noTime && (
                      <p className="mt-1 flex items-start gap-1 text-[10px] text-ink/55">
                        <Clock className="mt-0.5 h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                        <span>{skiAgendaTimeRange(block)}</span>
                      </p>
                    )}
                    {block.lines.slice(1).map((line, lineIndex) => (
                      <p key={lineIndex} className="mt-1 font-display text-[13px] leading-relaxed text-ink/65 italic">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
