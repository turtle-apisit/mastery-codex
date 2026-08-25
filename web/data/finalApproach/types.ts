/**
 * Shared shape for every Final Approach subject's exam data. Kept separate
 * from any one subject's data file (e.g. modernSwePrinciples.ts) so a second
 * subject's file can import the same types without depending on the first
 * subject's content.
 */

export type Letter = "A" | "B" | "C" | "D";

export interface MCQOption {
  letter: Letter;
  text: string;
  /** Why this option is wrong, per the answer key. Omitted for the correct option. */
  rationale?: string;
}

export interface MCQItem {
  id: string;
  unit: number;
  type: "mcq";
  minutes: number;
  source: string;
  prompt: string;
  options: [MCQOption, MCQOption, MCQOption, MCQOption];
  correct: Letter;
}

export interface WrittenItem {
  id: string;
  unit: number;
  type: "written";
  minutes: number;
  source: string;
  prompt: string;
  mustContain: string;
  trap: string;
  grading: string;
}

export type ExamItem = MCQItem | WrittenItem;

export interface UnitInfo {
  number: number;
  title: string;
  mcq: number;
  written: number;
  total: number;
  minutes: number;
}

export interface ExamMeta {
  totalItems: number;
  mcqCount: number;
  writtenCount: number;
  totalMinutes: number;
}

/** The delta-band self-scoring scale for written items — a general grading
 * convention (from exercise-design), not specific to any one subject's exam,
 * so every subject's Final Approach exam shares this one definition. */
export const GRADING_BANDS: { band: string; meaning: string }[] = [
  { band: "+15 to +20", meaning: "Complete, correct mechanism, handles the boundary case" },
  { band: "+10 to +14", meaning: "Correct core, one meaningful omission" },
  { band: "+4 to +9", meaning: "Right direction, mechanism shaky or partly wrong" },
  { band: "0 to +3", meaning: "Recognizably on-topic, understanding not demonstrated" },
  { band: "−5 to −10", meaning: "Confidently wrong mechanism" },
];
