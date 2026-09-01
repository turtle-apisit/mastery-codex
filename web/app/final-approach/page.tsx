import Link from "next/link";
import { getSubjects } from "@/lib/techniques";
import { FINAL_APPROACH_SUBJECTS, findSubjectEntry } from "@/data/finalApproach/registry";

export default async function FinalApproachPage() {
  const subjects = await getSubjects();

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Closed-Book Revision</div>
        <h1 className="fa-intro-title">Final Approach</h1>
        <p className="fa-intro-sub">
          Full-subject exam banks for revision before a final — every concept
          note in a subject, weighted toward what&rsquo;s easiest to get
          confused. Pick a subject to begin.
        </p>
      </section>

      <section className="fa-subject-list">
        {subjects.map((name) => {
          const entry = FINAL_APPROACH_SUBJECTS.find((s) => s.subjectName === name);
          const ready = !!entry && !!findSubjectEntry(entry.slug);

          return ready ? (
            <Link
              key={name}
              href={`/final-approach/${entry!.slug}`}
              className="subject-card cut-sm fa-subject-picker-card"
            >
              <div className="subject-head static">
                <span className="subject-name">{name}</span>
                <span className="tag mastered">Ready</span>
              </div>
            </Link>
          ) : (
            <div key={name} className="subject-card cut-sm fa-subject-picker-card disabled">
              <div className="subject-head static">
                <span className="subject-name">{name}</span>
                <span className="tag">Not built yet</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
