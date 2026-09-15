"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getExamSets,
  getSubjectProgress,
  type ExamSet,
  type TechniqueProgress,
} from "@/lib/simulation";
import { getSubjects } from "@/lib/techniques";

const STATUS_LABEL: Record<ExamSet["status"], string> = {
  ready: "Ready",
  in_progress: "In progress",
  submitted: "Awaiting grading",
  graded: "Graded",
};

function movedClass(moved: number) {
  if (moved > 0) return "sim-moved up";
  if (moved < 0) return "sim-moved down";
  return "sim-moved flat";
}

function signed(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

export default function SimulationHome() {
  // Subjects are fetched after mount rather than on the server. This page has
  // no dynamic API left in its Server Component, so Next prerenders it at
  // build time — and a build-time fetch of a database the build machine may
  // not reach bakes an empty list into the shipped HTML permanently.
  // getSubjects() swallows its own error and returns [], so that failure is
  // silent and looks exactly like "no subjects exist".
  const [subjects, setSubjects] = useState<string[] | null>(null);
  const [sets, setSets] = useState<ExamSet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  // Keyed by the subject it belongs to, so switching subjects reads as
  // "loading" without the effect having to clear state synchronously on the
  // way in — which would cost a cascading render.
  const [loaded, setLoaded] = useState<{
    subject: string;
    rows: TechniqueProgress[];
  } | null>(null);
  const progress = loaded?.subject === subject ? loaded.rows : null;

  useEffect(() => {
    getSubjects()
      .then(setSubjects)
      .catch(() => setSubjects([]));
    getExamSets()
      .then(setSets)
      .catch((e: unknown) => {
        setSets([]);
        setError(e instanceof Error ? e.message : String(e));
      });
  }, []);

  useEffect(() => {
    if (!subject) return;
    let cancelled = false;
    getSubjectProgress(subject)
      .then((rows) => {
        if (!cancelled) setLoaded({ subject, rows });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLoaded({ subject, rows: [] });
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [subject]);

  const subjectSets = subject ? (sets ?? []).filter((s) => s.subject === subject) : [];

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Daily Drill</div>
        <h1 className="fa-intro-title">Simulation</h1>
        <p className="fa-intro-sub">
          Ten multiple choice and two written, on one subject, in about fifteen
          minutes. The score is not the point — the point is which Techniques
          move, and which keep refusing to.
        </p>
      </section>

      {error && (
        <p className="field-hint error" role="status">
          Could not reach the round data: {error}
        </p>
      )}

      <section className="panel">
        <h2>Pick a subject</h2>
        {subjects === null ? (
          <p className="field-hint">Loading…</p>
        ) : subjects.length === 0 ? (
          <p className="field-hint">
            No subjects captured yet. Techniques have to exist before a round
            can be targeted at them.
          </p>
        ) : (
          <div className="sim-subject-row">
            {subjects.map((s) => {
              const count = (sets ?? []).filter((x) => x.subject === s).length;
              return (
                <button
                  key={s}
                  type="button"
                  className={"fa-band-btn" + (subject === s ? " active" : "")}
                  aria-pressed={subject === s}
                  onClick={() => setSubject(subject === s ? null : s)}
                >
                  {s}
                  {sets !== null && (
                    <span className="sim-count num">
                      {" "}
                      {count} {count === 1 ? "round" : "rounds"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {subject && (
        <>
          <section className="panel">
            <h2>Rounds</h2>
            {sets === null ? (
              <p className="field-hint">Loading…</p>
            ) : subjectSets.length === 0 ? (
              <p className="field-hint">
                No rounds for {subject} yet. Ask for one and it gets generated,
                audited, and put here.
              </p>
            ) : (
              <ul className="sim-round-list">
                {subjectSets.map((s) => (
                  <li key={s.id}>
                    <Link href={`/simulation/${s.id}`} className="sim-round-row">
                      <span className="sim-round-no num">
                        Round {s.set_number}
                      </span>
                      <span className="sim-round-date num">
                        {s.created_at.slice(0, 10)}
                      </span>
                      <span className={`tag sim-status-${s.status}`}>
                        {STATUS_LABEL[s.status]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="panel">
            <h2>What moved</h2>
            {progress === null ? (
              <p className="field-hint">Loading…</p>
            ) : progress.length === 0 ? (
              <p className="field-hint">
                Nothing to compare yet. A Technique appears here once a round
                has actually been graded against it — Techniques that have
                never been examined are left out on purpose, because &ldquo;not
                yet tested&rdquo; and &ldquo;tested and did not move&rdquo; are
                different answers.
              </p>
            ) : (
              <ul className="sim-progress-list">
                {progress.map((p) => (
                  <li key={p.technique_id} className="sim-progress-row">
                    <span className="sim-progress-name">{p.skill_name}</span>
                    <span className="sim-progress-track num">
                      <span className="sim-from">{p.startedAt}</span>
                      <span className="sim-arrow" aria-hidden="true">
                        →
                      </span>
                      <span className={`tag ${p.status}`}>{p.score}</span>
                    </span>
                    <span className={movedClass(p.moved) + " num"}>
                      {signed(p.moved)}
                    </span>
                    <span className="sim-progress-count num">
                      {p.points.length}{" "}
                      {p.points.length === 1 ? "result" : "results"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
