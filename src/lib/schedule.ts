export type BlockTone = "blush" | "sage" | "mist" | "clay" | "gray";

export interface ScheduleBlock {
  /** Column index into the days array */
  day: number;
  /** Time slot index into the times array, inclusive */
  start: number;
  /** Time slot index, exclusive */
  end: number;
  /** Set for agenda entries the owner's sheet gives no time slot to. */
  noTime?: boolean;
  lines: string[];
  tone: BlockTone;
}

export interface ScheduleDay {
  name: string;
  dayLabel: string | null;
}

/** How a timeline entry is marked: movement, meals, optional extras, or travel and rest. */
export type TimelineKind = "practice" | "meal" | "optional" | "other";

export interface TimelineEntry {
  time: string;
  title: string;
  details: string[];
  kind: TimelineKind;
}
