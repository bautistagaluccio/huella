import { type BlockTone, type ScheduleBlock, type ScheduleDay } from "@/lib/schedule";

const toneClasses: Record<BlockTone, string> = {
  blush: "bg-blush/75 border-clay/50 text-ink",
  sage: "bg-sage/75 border-sage text-ink",
  mist: "bg-mist/75 border-mist text-ink",
  clay: "bg-sand/85 border-clay text-ink",
  gray: "bg-sand/40 border-ink/25 text-ink/65",
};

interface ScheduleGridProps {
  days: ScheduleDay[];
  times: readonly string[];
  blocks: ScheduleBlock[];
  cornerLabel: string;
  ariaLabel: string;
  /** Height of one half-hour row, in px */
  rowHeight?: number;
}

export function ScheduleGrid({
  days,
  times,
  blocks,
  cornerLabel,
  ariaLabel,
  rowHeight = 26,
}: ScheduleGridProps) {
  const cols = days.length;

  return (
    <div
      className="retreat-calendar mt-6 overflow-x-auto pb-2"
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `54px repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `72px repeat(${times.length}, ${rowHeight}px)`,
          minWidth: 54 + cols * 118,
        }}
      >
        <div className="flex items-end pb-4 text-[8px] text-ink/40 uppercase">{cornerLabel}</div>

        {days.map((d, i) => (
          <div
            key={d.name}
            style={{ gridColumn: i + 2, gridRow: "1 / 2" }}
            className="flex flex-col justify-center gap-1 border-b border-ink/20 pl-2"
          >
            <span className="text-[8px] text-clay uppercase">{d.dayLabel ?? "Arrival"}</span>
            <span className="font-display text-[17px] font-medium">{d.name}</span>
          </div>
        ))}

        {days.map((d, i) => (
          <div
            key={`column-${d.name}`}
            aria-hidden="true"
            className={`border-l border-ink/5 ${i === 0 || i === cols - 1 ? "bg-sand/15" : ""}`}
            style={{ gridColumn: i + 2, gridRow: `2 / ${times.length + 2}` }}
          />
        ))}

        {times.map((t, i) => (
          <div key={t} className="contents">
            <div
              style={{ gridColumn: 1, gridRow: `${i + 2} / ${i + 3}` }}
              className={`flex items-start pt-1 text-[9px] whitespace-nowrap ${i % 2 === 1 ? "text-ink/50" : "text-ink/30"}`}
            >
              {t.replace("AM", " am").replace("PM", " pm")}
            </div>
            <div
              aria-hidden="true"
              className={`pointer-events-none border-t ${i % 2 === 1 ? "border-ink/8" : "border-ink/4"}`}
              style={{ gridColumn: `2 / ${cols + 2}`, gridRow: `${i + 2} / ${i + 3}` }}
            />
          </div>
        ))}

        {blocks.map((block, i) => (
          <div
            key={i}
            style={{
              gridColumn: block.day + 2,
              gridRow: `${block.start + 2} / ${block.end + 2}`,
            }}
            className={`relative mx-1 my-[2px] flex flex-col justify-center gap-0.5 rounded-r-md border-l-2 px-2 py-[3px] text-[10px] leading-tight ${toneClasses[block.tone]}`}
          >
            {block.end - block.start > 1 ? (
              <span className="text-[8px] text-ink/45">
                {times[block.start]?.replace("AM", " am").replace("PM", " pm")}
              </span>
            ) : null}
            {block.lines.map((line, j) => (
              <span
                key={j}
                className={
                  j > 0
                    ? block.lines.length > 2
                      ? "text-[8px] text-ink/65"
                      : "text-[9px] text-ink/65"
                    : "font-medium"
                }
              >
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
