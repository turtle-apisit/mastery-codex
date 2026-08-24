import { getJobSummaries } from "@/lib/vault";

export default function JobsPage() {
  const jobs = getJobSummaries();

  return (
    <div className="page">
      <section id="roster">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Job Roster
        </div>
        <div className="roster">
          {jobs.map((job) => (
            <div className="job-card" key={job.subject}>
              <div className="job-head">
                <span className="job-name">{job.subject}</span>
                <span className="job-lv">
                  <span>LV</span>
                  {job.level}
                </span>
              </div>
              <div className="job-xp-track">
                <div className="job-xp-fill" style={{ width: `${job.xpPct}%` }} />
              </div>
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
  );
}
