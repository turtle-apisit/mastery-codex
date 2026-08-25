/**
 * Registry of Final Approach subjects that have an exam built.
 *
 * The vault (`02-Concepts/`) currently holds three subjects, but only one —
 * Modern Software Engineering Principles — has an exam authored yet (see
 * `test-exam-pattern-solution/exam-02-*.md`). The landing page at
 * `/final-approach` reads every subject out of the vault (via
 * `getSubjects()` in `@/lib/vault`) and cross-references this list to decide
 * which ones link into a working exam versus show as "not built yet."
 *
 * To add a second subject once its exam exists:
 *   1. Add its data file next to `modernSwePrinciples.ts` (e.g.
 *      `softwareArchitecture.ts`), exporting `EXAM_ITEMS` / `UNITS` /
 *      `EXAM_META` in the same shape (types in `./types`).
 *   2. Add an entry below with its exact `02-Concepts/` folder name and a
 *      slug.
 *   3. Add a case for that slug in `app/final-approach/[subject]/page.tsx`
 *      that imports the new data file and renders `<FinalApproach>` with it.
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
