import { ViewTransition } from "react";
import AnimatedBar from "@/components/AnimatedBar";
import AnimatedNum from "@/components/AnimatedNum";
import { getJobSummaries } from "@/lib/vault";
import { classTitle, subjectGlyph } from "@/lib/gameFlavor";

export default function JobsPage() {
  const jobs = getJobSummaries();

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="page">
        <section id="roster">
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Job Roster
          </div>
          <div className="roster">
            {jobs.map((job) => (
              <div className="job-card cut-sm" key={job.subject}>
                <div className="job-head">
                  <span className="job-emblem" aria-hidden="true">
                    {subjectGlyph(job.subject)}
                  </span>
                  <span className="job-id">
                    <span className="job-name">{job.subject}</span>
                    <span className="job-class">{classTitle(job.level)}</span>
                  </span>
                  <span className="job-lv">
                    <span>LV</span>
                    <AnimatedNum value={job.level} />
                  </span>
                </div>
                <AnimatedBar
                  pct={job.xpPct}
                  trackClass="job-xp-track"
                  fillClass="job-xp-fill"
                />
                <div className="job-tags">
                  {job.mastered > 0 && <span className="tag mastered">{job.mastered} Mastered</span>}
                  {job.training > 0 && <span className="tag training">{job.training} Training</span>}
                  {job.untrained > 0 && <span className="tag untrained">{job.untrained} Untrained</span>}
                  {job.locked > 0 && <span className="tag locked">{job.locked} Locked</span>}
                  {job.rusty > 0 && <span className="tag rusty">{job.rusty} Rusty</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
