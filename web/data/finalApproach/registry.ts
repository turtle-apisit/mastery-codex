/**
 * Registry of Final Approach subjects that have an exam built.
 *
 * All three subjects the vault (`02-Concepts/`) holds now have one. The landing
 * page at `/final-approach` reads every subject out of the vault (via
 * `getSubjects()` in `@/lib/vault`) and cross-references this list to decide
 * which ones link into a working exam versus show as "not built yet" — so a
 * fourth subject captured into the vault appears there as unbuilt until it is
 * added here too.
 *
 * To add a subject once its exam exists:
 *   1. Add its data file next to the others (e.g. `dataScienceEngineering.ts`),
 *      exporting `EXAM_ITEMS` / `UNITS` / `EXAM_META` in the same shape (types
 *      in `./types`).
 *   2. Add an entry below with its exact `02-Concepts/` folder name and a slug.
 *   3. Add a case for that slug in `app/final-approach/[subject]/page.tsx`
 *      that imports the new data file and renders `<FinalApproach>` with it.
 *
 * `modernSwePrinciples.ts` is transcribed from the hand-written exam in
 * `test-exam-pattern-solution/`; the other two were authored straight into
 * their data files against the concept notes, and those files are their only
 * source.
 */

export type FinalApproachSubjectEntry = {
  /** Must exactly match a folder name under 02-Concepts/. */
  subjectName: string;
  slug: string;
};

export const FINAL_APPROACH_SUBJECTS: FinalApproachSubjectEntry[] = [
  {
    subjectName: "Modern Software Engineering Principles",
    slug: "modern-software-engineering-principles",
  },
  {
    subjectName: "Data Science and Engineering Principles",
    slug: "data-science-and-engineering-principles",
  },
  {
    subjectName: "Software Architecture",
    slug: "software-architecture",
  },
];

export function slugifySubject(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findSubjectEntry(slug: string): FinalApproachSubjectEntry | undefined {
  return FINAL_APPROACH_SUBJECTS.find((s) => s.slug === slug);
}
