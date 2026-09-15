"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getExamSet,
  markInProgress,
  optionLetter,
  scoreRound,
  submitRound,
  type ExamItem,
  type ExamSetWithItems,
} from "@/lib/simulation";

type Draft = { chosen: number | null; written: string };

export default function SimulationRound({ setId }: { setId: string }) {
  const [set, setSet] = useState<ExamSetWithItems | null>(null);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(() => {
    getExamSet(setId)
      .then((s) => {
        if (!s) {
          setMissing(true);
          return;
        }
        setSet(s);
        if (s.status === "ready") void markInProgress(setId).catch(() => {});
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : String(e)),
      );
  }, [setId]);

  useEffect(load, [load]);

  // A round is answerable until it has been submitted; after that every item
  // is read-only, because exam_attempts allows exactly one attempt per item.
  const answered = set ? set.items.some((i) => i.attempt !== null) : false;

  const draftFor = (item: ExamItem): Draft =>
    drafts[item.id] ?? { chosen: null, written: "" };

  const complete = useMemo(() => {
    if (!set) return false;
    return set.items.every((i) => {
      const d = draftFor(i);
      return i.item_type === "choice" ? d.chosen !== null : d.written.trim().length > 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, drafts]);

  async function handleSubmit() {
    if (!set || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRound(
        set.id,
        set.items.map((item) => ({ item, ...draftFor(item) })),
      );
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  if (missing) {
    return (
      <div className="page">
        <Link href="/simulation" className="back-btn">
          ← Simulation
        </Link>
        <p className="field-hint">No round with that id.</p>
      </div>
    );
  }

  if (!set) {
    return (
      <div className="page">
        <Link href="/simulation" className="back-btn">
          ← Simulation
        </Link>
        <p className="field-hint">{error ?? "Loading…"}</p>
      </div>
    );
  }

  const score = answered ? scoreRound(set.items) : null;

  return (
    <div className="page">
      <Link href="/simulation" className="back-btn">
        ← Simulation
      </Link>

      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">
          {`${set.subject} // Round ${set.set_number}`}
        </div>
        <h1 className="fa-intro-title">
          {answered ? "Results" : "Twelve items"}
        </h1>
        {score ? (
          <p className="fa-intro-sub">
            <span className="num">
              {score.choiceCorrect}/{score.choiceTotal}
            </span>{" "}
            on the choice half.{" "}
            {score.total === null ? (
              <>
                The {score.ungradedWritten} written{" "}
                {score.ungradedWritten === 1 ? "item is" : "items are"} still
                with Vega — an ungraded answer is not a zero, so the round has
                no total yet.
              </>
            ) : (
              <>
                Round total{" "}
                <span className="num">
                  {score.total}/{score.max}
                </span>
                .
              </>
            )}
          </p>
        ) : (
          <p className="fa-intro-sub">
            Answer all twelve, then submit once. Nothing reveals itself until
            the whole round is locked in — otherwise an early answer tells you
            how to change a later one, and the round stops being evidence.
          </p>
        )}
        {set.targeting_note && (
          <p className="sim-targeting">
            <span className="field-label">Why these twelve</span>
            {set.targeting_note}
          </p>
        )}
      </section>

      {error && (
        <p className="field-hint error" role="status">
          {error}
        </p>
      )}

      <div className="fa-item-list">
        {set.items.map((item) => {
          const d = draftFor(item);
          const a = item.attempt;
          return (
            <article key={item.id} className="fa-item cut-sm">
              <header className="fa-item-head">
                <span className="fa-item-id num">
                  {String(item.position).padStart(2, "0")}
                </span>
                <span className="tag">{item.technique_name}</span>
                <span className="fa-item-min">
                  {item.item_type === "choice" ? "1 pt" : "5 pts"}
                </span>
                <span className="fa-item-source">{item.source_basis}</span>
              </header>

              <p className="fa-item-prompt">{item.question}</p>

              {item.item_type === "choice" ? (
                <>
                  <div className="fa-options">
                    {(item.options ?? []).map((opt, i) => {
                      const chosen = a ? a.chosen_option === i : d.chosen === i;
                      const isKey = item.correct_option === i;
                      const cls = answered
                        ? isKey
                          ? "fa-option correct"
                          : chosen
                            ? "fa-option incorrect"
                            : "fa-option"
                        : "fa-option" + (chosen ? " selected" : "");
                      return (
                        <button
                          key={i}
                          type="button"
                          className={cls}
                          disabled={answered}
                          aria-pressed={!answered && chosen}
                          onClick={() =>
                            setDrafts((prev) => ({
                              ...prev,
                              [item.id]: { ...d, chosen: i },
                            }))
                          }
                        >
                          <span className="fa-option-letter">
                            {optionLetter(i)}
                          </span>
                          <span className="fa-option-text">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {answered && a && !a.is_correct && (
                    <p className="sim-diagnosis">
                      <span className="field-label">What that answer means</span>
                      {(a.chosen_option !== null &&
                        item.options?.[a.chosen_option]?.diagnosis) ||
                        "This distractor carries no diagnosis, so the item cannot say what the answer means. That is a malformed item, not a silent pass — it needs sending back."}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {answered ? (
                    <>
                      <p className="sim-written-answer">
                        {a?.written_answer || "(left blank)"}
                      </p>
                      {a && a.content_score !== null ? (
                        <div className="sim-grade">
                          <span className="tag">
                            content <span className="num">{a.content_score}</span>/3
                          </span>
                          <span className="tag">
                            clarity <span className="num">{a.writing_clarity ?? 0}</span>/1
                          </span>
                          <span className="tag">
                            precision{" "}
                            <span className="num">{a.writing_precision ?? 0}</span>/1
                          </span>
                          <span className="field-hint">
                            Only the content score moves the Technique.
                          </span>
                        </div>
                      ) : (
                        <p className="field-hint">
                          Not yet graded. Vega marks this against the item&rsquo;s
                          rubric.
                        </p>
                      )}
                      {a?.feedback && (
                        <p className="fa-model-answer">{a.feedback}</p>
                      )}
                    </>
                  ) : (
                    <label className="field">
                      <span className="field-label">Your answer</span>
                      <textarea
                        className="textarea"
                        rows={6}
                        value={d.written}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [item.id]: { ...d, written: e.target.value },
                          }))
                        }
                      />
                    </label>
                  )}
                </>
              )}
            </article>
          );
        })}
      </div>

      {set.items.length === 0 && (
        <p className="field-hint">This round has no items.</p>
      )}

      {!answered && set.items.length > 0 && (
        <div className="fa-item-actions sim-submit">
          <button
            type="button"
            className="btn primary"
            disabled={!complete || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting…" : "Submit round"}
          </button>
          {!complete && (
            <span className="field-hint">
              All twelve need an answer before the round can be submitted.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
