"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import AnimatedBar from "@/components/AnimatedBar";
import { GRADING_BANDS, type ExamItem, type ExamMeta, type MCQItem, type UnitInfo, type WrittenItem } from "@/data/finalApproach/types";
import {
  getFinalApproachStore,
  type AnswerState,
  type AnswersMap,
} from "@/lib/finalApproachStore";

function isAnswered(item: ExamItem, a: AnswerState | undefined): boolean {
  if (!a) return false;
  return item.type === "mcq" ? !!a.selected : !!a.text && a.text.trim().length > 0;
}

type View = "overview" | number | "results";

export default function FinalApproach({
  subjectSlug,
  subjectTitle,
  items,
  units,
  meta,
}: {
  subjectSlug: string;
  subjectTitle: string;
  items: ExamItem[];
  units: UnitInfo[];
  meta: ExamMeta;
}) {
  const store = useMemo(() => getFinalApproachStore(subjectSlug), [subjectSlug]);
  const answers = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [view, setView] = useState<View>("overview");

  const updateAnswer = useCallback(
    (id: string, patch: Partial<AnswerState>) => {
      store.setAnswer(id, patch);
    },
    [store]
  );

  /** Reveals grading for every item in `items` that already has a student
   * answer entered but hasn't been revealed yet. Never reveals an item with
   * no answer — that's the closed-book guarantee for the bulk path too. */
  const revealAnswered = useCallback(
    (revealItems: ExamItem[]) => {
      store.updateAnswers((prev) => {
        const next = { ...prev };
        for (const item of revealItems) {
          const a = next[item.id];
          if (!isAnswered(item, a)) continue;
          if (item.type === "mcq" && !a?.checked) {
            next[item.id] = { ...a, checked: true };
          } else if (item.type === "written" && !a?.revealed) {
            next[item.id] = { ...a, revealed: true };
          }
        }
        return next;
      });
    },
    [store]
  );

  const progressByUnit = useMemo(() => {
    const map = new Map<number, { answered: number; total: number }>();
    for (const u of units) map.set(u.number, { answered: 0, total: u.total });
    let answeredTotal = 0;
    for (const item of items) {
      if (isAnswered(item, answers[item.id])) {
        answeredTotal++;
        map.get(item.unit)!.answered++;
      }
    }
    return { map, answeredTotal };
  }, [answers, items, units]);

  const results = useMemo(() => {
    const perUnitMcq = new Map<number, { correct: number; answered: number; total: number }>();
    const perUnitWritten = new Map<
      number,
      { scored: number; total: number; bandCounts: Record<string, number> }
    >();
    for (const u of units) {
      perUnitMcq.set(u.number, { correct: 0, answered: 0, total: u.mcq });
      perUnitWritten.set(u.number, { scored: 0, total: u.written, bandCounts: {} });
    }
    let mcqCorrect = 0;
    let mcqAnswered = 0;
    const writtenRows: { item: WrittenItem; band?: string }[] = [];
    for (const item of items) {
      const a = answers[item.id];
      if (item.type === "mcq") {
        const bucket = perUnitMcq.get(item.unit)!;
        if (a?.selected) {
          bucket.answered++;
          mcqAnswered++;
          if (a.selected === item.correct) {
            bucket.correct++;
            mcqCorrect++;
          }
        }
      } else {
        const bucket = perUnitWritten.get(item.unit)!;
        writtenRows.push({ item, band: a?.band });
        if (a?.band) {
          bucket.scored++;
          bucket.bandCounts[a.band] = (bucket.bandCounts[a.band] ?? 0) + 1;
        }
      }
    }
    return { perUnitMcq, perUnitWritten, mcqCorrect, mcqAnswered, writtenRows };
  }, [answers, items, units]);

  function enterResults() {
    revealAnswered(items);
    setView("results");
  }

  return (
    <div className="final-approach">
      <Link href="/final-approach" className="fa-subject-back">
        <span aria-hidden="true">‹</span> All Subjects
      </Link>
      {view === "overview" && (
        <OverviewView
          subjectTitle={subjectTitle}
          units={units}
          meta={meta}
          progressByUnit={progressByUnit}
          onEnterUnit={(n) => setView(n)}
          onResults={enterResults}
        />
      )}
      {typeof view === "number" && (
        <UnitView
          unit={view}
          units={units}
          items={items.filter((i) => i.unit === view)}
          answers={answers}
          updateAnswer={updateAnswer}
          onBack={() => setView("overview")}
          onRevealUnit={() => revealAnswered(items.filter((i) => i.unit === view))}
        />
      )}
      {view === "results" && (
        <ResultsView
          units={units}
          meta={meta}
          results={results}
          onBack={() => setView("overview")}
          onOpenUnit={(unit) => setView(unit)}
        />
      )}
    </div>
  );
}

function OverviewView({
  subjectTitle,
  units,
  meta,
  progressByUnit,
  onEnterUnit,
  onResults,
}: {
  subjectTitle: string;
  units: UnitInfo[];
  meta: ExamMeta;
  progressByUnit: { map: Map<number, { answered: number; total: number }>; answeredTotal: number };
  onEnterUnit: (unit: number) => void;
  onResults: () => void;
}) {
  const pct = Math.round((progressByUnit.answeredTotal / meta.totalItems) * 100);
  const hours = Math.floor(meta.totalMinutes / 60);
  const mins = meta.totalMinutes % 60;

  return (
    <>
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Closed-Book Revision</div>
        <h1 className="fa-intro-title">Final Approach</h1>
        <p className="fa-intro-sub">
          A full-subject item bank for &ldquo;{subjectTitle},&rdquo; covering
          every concept note across {units.length} units. Sized for split
          sessions, not one sitting — answer what you can, come back for the
          rest. Every answer autosaves as you go.
        </p>

        <div className="bento fa-stat-bento">
          <div className="tile">
            <span className="tile-label">Total Items</span>
            <span className="tile-figure num">{meta.totalItems}</span>
            <span className="tile-note num">
              {meta.mcqCount} MCQ / {meta.writtenCount} Written
            </span>
          </div>
          <div className="tile">
            <span className="tile-label">Estimated Time</span>
            <span className="tile-figure num">
              {meta.totalMinutes}
              <span className="unit">min</span>
            </span>
            <span className="tile-note num">
              ≈ {hours}h {mins}m
            </span>
          </div>
          <div className="tile">
            <span className="tile-label">Progress</span>
            <span className="tile-figure num">
              {progressByUnit.answeredTotal}
              <span className="unit">/ {meta.totalItems}</span>
            </span>
            <AnimatedBar pct={pct} trackClass="xp-track" fillClass="xp-fill" />
          </div>
        </div>
      </section>

      <section className="panel fa-unit-table-panel">
        <h2>Per-Unit Breakdown</h2>
        <div className="fa-table-wrap">
          <table className="fa-unit-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>MCQ</th>
                <th>Written</th>
                <th>Total</th>
                <th>Minutes</th>
                <th>Answered</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => {
                const p = progressByUnit.map.get(u.number)!;
                return (
                  <tr key={u.number}>
                    <td>
                      {u.number}. {u.title}
                    </td>
                    <td className="num">{u.mcq}</td>
                    <td className="num">{u.written}</td>
                    <td className="num">{u.total}</td>
                    <td className="num">{u.minutes}</td>
                    <td className="num">
                      {p.answered}/{p.total}
                    </td>
                  </tr>
                );
              })}
              <tr className="fa-total-row">
                <td>Total</td>
                <td className="num">{meta.mcqCount}</td>
                <td className="num">{meta.writtenCount}</td>
                <td className="num">{meta.totalItems}</td>
                <td className="num">{meta.totalMinutes}</td>
                <td className="num">
                  {progressByUnit.answeredTotal}/{meta.totalItems}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="fa-unit-grid">
        {units.map((u) => (
          <UnitCard key={u.number} unit={u} progress={progressByUnit.map.get(u.number)!} onEnter={() => onEnterUnit(u.number)} />
        ))}
      </section>

      <button type="button" className="fa-results-cta" onClick={onResults}>
        View Results Summary
      </button>
    </>
  );
}

function UnitCard({
  unit,
  progress,
  onEnter,
}: {
  unit: UnitInfo;
  progress: { answered: number; total: number };
  onEnter: () => void;
}) {
  const pct = progress.total ? Math.round((progress.answered / progress.total) * 100) : 0;
  return (
    <button type="button" className="subject-card cut-sm fa-unit-card" onClick={onEnter}>
      <div className="subject-head static">
        <span className="subject-name">
          Unit {unit.number} — {unit.title}
        </span>
        <span className="subject-meta num">
          {progress.answered}/{progress.total}
        </span>
      </div>
      <div className="fa-unit-card-body">
        <AnimatedBar pct={pct} trackClass="xp-track" fillClass="xp-fill" />
        <span className="fa-unit-card-note num">
          {unit.mcq} MCQ · {unit.written} Written · {unit.minutes} min
        </span>
      </div>
    </button>
  );
}

function UnitView({
  unit,
  units,
  items,
  answers,
  updateAnswer,
  onBack,
  onRevealUnit,
}: {
  unit: number;
  units: UnitInfo[];
  items: ExamItem[];
  answers: AnswersMap;
  updateAnswer: (id: string, patch: Partial<AnswerState>) => void;
  onBack: () => void;
  onRevealUnit: () => void;
}) {
  const info = units.find((u) => u.number === unit)!;
  const answeredCount = items.filter((i) => isAnswered(i, answers[i.id])).length;

  return (
    <section className="fa-unit-view">
      <div className="fa-unit-view-head">
        <button type="button" className="back-btn" onClick={onBack}>
          <span aria-hidden="true">‹</span> Overview
        </button>
        <h2 className="fa-unit-view-title">
          Unit {info.number} — {info.title}
        </h2>
        <span className="fa-unit-view-progress num">
          {answeredCount}/{info.total} answered
        </span>
        <button type="button" className="fa-check-btn fa-reveal-unit-btn" onClick={onRevealUnit}>
          Reveal graded in this unit
        </button>
      </div>

      <div className="fa-item-list">
        {items.map((item) =>
          item.type === "mcq" ? (
            <MCQCard
              key={item.id}
              item={item}
              answer={answers[item.id]}
              onAnswer={(patch) => updateAnswer(item.id, patch)}
            />
          ) : (
            <WrittenCard
              key={item.id}
              item={item}
              answer={answers[item.id]}
              onAnswer={(patch) => updateAnswer(item.id, patch)}
            />
          )
        )}
      </div>
    </section>
  );
}

function MCQCard({
  item,
  answer,
  onAnswer,
}: {
  item: MCQItem;
  answer?: AnswerState;
  onAnswer: (patch: Partial<AnswerState>) => void;
}) {
  const selected = answer?.selected;
  const checked = !!answer?.checked;
  const isCorrect = checked && selected === item.correct;

  return (
    <article className="fa-item cut-sm" id={item.id}>
      <ItemHead item={item} typeLabel="MCQ" />
      <p className="fa-item-prompt">{item.prompt}</p>

      <div className="fa-options" role="radiogroup" aria-label={`Answer choices for ${item.id}`}>
        {item.options.map((opt) => {
          const isSelected = selected === opt.letter;
          const isCorrectOpt = opt.letter === item.correct;
          let stateClass = "";
          if (checked) {
            if (isCorrectOpt) stateClass = "correct";
            else if (isSelected) stateClass = "incorrect";
          } else if (isSelected) {
            stateClass = "selected";
          }
          return (
            <button
              key={opt.letter}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={"fa-option" + (stateClass ? " " + stateClass : "")}
              onClick={() => !checked && onAnswer({ selected: opt.letter })}
              disabled={checked}
            >
              <span className="fa-option-letter">{opt.letter}</span>
              <span className="fa-option-text">{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div className="fa-item-actions">
        {!checked ? (
          <button
            type="button"
            className="fa-check-btn"
            disabled={!selected}
            onClick={() => onAnswer({ checked: true })}
          >
            Check Answer
          </button>
        ) : (
          <span className={"fa-result-badge " + (isCorrect ? "correct" : "incorrect")}>
            {isCorrect ? "Correct" : `Incorrect — correct answer is ${item.correct}`}
          </span>
        )}
      </div>

      {checked && (
        <div className="fa-rationales">
          {item.options
            .filter((o) => o.rationale)
            .map((o) => (
              <p key={o.letter} className={"fa-rationale" + (o.letter === selected ? " your-pick" : "")}>
                <strong>{o.letter}.</strong> {o.rationale}
              </p>
            ))}
        </div>
      )}
    </article>
  );
}

function WrittenCard({
  item,
  answer,
  onAnswer,
}: {
  item: WrittenItem;
  answer?: AnswerState;
  onAnswer: (patch: Partial<AnswerState>) => void;
}) {
  const text = answer?.text ?? "";
  const revealed = !!answer?.revealed;
  const band = answer?.band;

  return (
    <article className="fa-item cut-sm" id={item.id}>
      <ItemHead item={item} typeLabel="Written" />
      <p className="fa-item-prompt">{item.prompt}</p>

      <textarea
        className="textarea"
        placeholder="Type your answer here — closed-book, in your own words."
        value={text}
        onChange={(e) => onAnswer({ text: e.target.value })}
        rows={5}
      />

      <div className="fa-item-actions">
        <button
          type="button"
          className="fa-check-btn"
          disabled={!text.trim() || revealed}
          onClick={() => onAnswer({ revealed: true })}
        >
          Reveal Model Answer
        </button>
      </div>

      {revealed && (
        <div className="fa-model-answer">
          <h4>Must contain</h4>
          <p>{item.mustContain}</p>
          <h4>The trap</h4>
          <p>{item.trap}</p>
          <h4>Grading</h4>
          <p>{item.grading}</p>

          <div className="fa-band-picker">
            <span className="fa-band-label">Self-assign a score band</span>
            <div className="fa-band-row">
              {GRADING_BANDS.map((b) => (
                <button
                  key={b.band}
                  type="button"
                  className={"fa-band-btn" + (band === b.band ? " active" : "")}
                  onClick={() => onAnswer({ band: b.band })}
                  title={b.meaning}
                >
                  {b.band}
                </button>
              ))}
            </div>
            {band && (
              <p className="fa-band-meaning">
                <strong>{band}</strong> — {GRADING_BANDS.find((b) => b.band === band)?.meaning}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function ItemHead({ item, typeLabel }: { item: ExamItem; typeLabel: string }) {
  return (
    <header className="fa-item-head">
      <span className="fa-item-id num">{item.id}</span>
      <span className={"tag" + (typeLabel === "MCQ" ? " mastered" : " training")}>{typeLabel}</span>
      <span className="fa-item-min num">{item.minutes} min</span>
      <span className="fa-item-source">{item.source}</span>
    </header>
  );
}

function ResultsView({
  units,
  meta,
  results,
  onBack,
  onOpenUnit,
}: {
  units: UnitInfo[];
  meta: ExamMeta;
  results: {
    perUnitMcq: Map<number, { correct: number; answered: number; total: number }>;
    perUnitWritten: Map<number, { scored: number; total: number; bandCounts: Record<string, number> }>;
    mcqCorrect: number;
    mcqAnswered: number;
    writtenRows: { item: WrittenItem; band?: string }[];
  };
  onBack: () => void;
  onOpenUnit: (unit: number) => void;
}) {
  return (
    <section className="fa-results">
      <div className="fa-unit-view-head">
        <button type="button" className="back-btn" onClick={onBack}>
          <span aria-hidden="true">‹</span> Overview
        </button>
        <h2 className="fa-unit-view-title">Results Summary</h2>
      </div>

      <div className="bento fa-stat-bento">
        <div className="tile">
          <span className="tile-label">MCQ Score</span>
          <span className="tile-figure num">
            {results.mcqCorrect}
            <span className="unit">/ {meta.mcqCount}</span>
          </span>
          <span className="tile-note num">{results.mcqAnswered} answered</span>
        </div>
        <div className="tile">
          <span className="tile-label">Written Self-Scored</span>
          <span className="tile-figure num">
            {results.writtenRows.filter((r) => r.band).length}
            <span className="unit">/ {meta.writtenCount}</span>
          </span>
          <span className="tile-note">against the delta-band scale</span>
        </div>
      </div>

      <div className="panel">
        <h2>MCQ — per unit</h2>
        <div className="fa-table-wrap">
          <table className="fa-unit-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Correct</th>
                <th>Answered</th>
                <th>Total MCQ</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => {
                const r = results.perUnitMcq.get(u.number)!;
                return (
                  <tr key={u.number}>
                    <td>
                      {u.number}. {u.title}
                    </td>
                    <td className="num">{r.correct}</td>
                    <td className="num">{r.answered}</td>
                    <td className="num">{r.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Written — per unit</h2>
        <div className="fa-table-wrap">
          <table className="fa-unit-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Self-Scored</th>
                <th>Total Written</th>
                <th>Band Counts</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => {
                const r = results.perUnitWritten.get(u.number)!;
                const bands = Object.entries(r.bandCounts);
                return (
                  <tr key={u.number}>
                    <td>
                      {u.number}. {u.title}
                    </td>
                    <td className="num">{r.scored}</td>
                    <td className="num">{r.total}</td>
                    <td className="fa-band-counts">
                      {bands.length === 0
                        ? "—"
                        : bands.map(([band, count]) => (
                            <span key={band} className="tag">
                              {band} × {count}
                            </span>
                          ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Written items — your self-assigned scores</h2>
        <div className="fa-written-rows">
          {results.writtenRows.map(({ item, band }) => (
            <button
              key={item.id}
              type="button"
              className="fa-written-row"
              onClick={() => onOpenUnit(item.unit)}
            >
              <span className="fa-written-id num">{item.id}</span>
              <span className="fa-written-source">{item.source}</span>
              <span className={"tag" + (band ? " training" : "")}>{band ?? "not yet scored"}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
