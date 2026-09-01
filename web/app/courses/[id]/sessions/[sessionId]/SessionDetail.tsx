"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Concept } from "@/lib/vault";
import type { Tables } from "@/lib/supabase/types";

type ClassSession = Tables<"class_sessions">;
type Digest = Tables<"digests">;
type AssignedHomework = Tables<"assigned_homework">;
type GeneratedHomework = Tables<"generated_homework">;
type LectureFileRef = { id: string; file_name: string };

const DIGEST_QUESTIONS = [
  { name: "summary", label: "วันนี้เรียนเรื่องอะไรบ้าง" },
  { name: "confusions", label: "มีจุดไหนที่ยังไม่เข้าใจ/งงอยู่บ้าง" },
  { name: "understood_concept", label: "concept ไหนที่รู้สึกว่าเข้าใจแล้วจริงๆวันนี้" },
  { name: "one_liner", label: "ถ้าจะอธิบายสิ่งที่เรียนวันนี้ให้คนอื่นฟังใน 1 ประโยค จะพูดว่าอะไร" },
] as const;

function requiredString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export default function SessionDetail({ allConcepts }: { allConcepts: Concept[] }) {
  const { id: courseId, sessionId } = useParams<{ id: string; sessionId: string }>();

  const [session, setSession] = useState<ClassSession | null | undefined>(undefined);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [referencedFiles, setReferencedFiles] = useState<LectureFileRef[]>([]);
  const [digest, setDigest] = useState<Digest | null>(null);
  const [assignedHomework, setAssignedHomework] = useState<AssignedHomework[]>([]);
  const [generatedHomework, setGeneratedHomework] = useState<GeneratedHomework[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function fetchSessionData(courseId: string, sessionId: string) {
    const { data: sessionData } = await supabase
      .from("class_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("course_id", courseId)
      .single();
    if (!sessionData) return { session: null } as const;

    const { data: courseData } = await supabase.from("courses").select("name").eq("id", courseId).single();

    const { data: sessionFileLinks } = await supabase
      .from("session_files")
      .select("lecture_file_id")
      .eq("session_id", sessionId);
    const lectureFileIds = (sessionFileLinks ?? []).map((link) => link.lecture_file_id);

    const { data: files } =
      lectureFileIds.length > 0
        ? await supabase.from("lecture_files").select("id, file_name").in("id", lectureFileIds)
        : { data: [] };

    const { data: digestData } = await supabase
      .from("digests")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    const { data: assigned } = await supabase
      .from("assigned_homework")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    const { data: generated } = await supabase
      .from("generated_homework")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    return {
      session: sessionData,
      courseName: courseData?.name ?? null,
      referencedFiles: files ?? [],
      digest: digestData ?? null,
      assignedHomework: assigned ?? [],
      generatedHomework: generated ?? [],
    } as const;
  }

  function applySessionData(result: Awaited<ReturnType<typeof fetchSessionData>>) {
    setSession(result.session);
    if (!result.session) return;
    setCourseName(result.courseName);
    setReferencedFiles(result.referencedFiles);
    setDigest(result.digest);
    setAssignedHomework(result.assignedHomework);
    setGeneratedHomework(result.generatedHomework);
  }

  async function reload() {
    applySessionData(await fetchSessionData(courseId, sessionId));
  }

  useEffect(() => {
    async function run() {
      const result = await fetchSessionData(courseId, sessionId);
      setSession(result.session);
      if (!result.session) return;
      setCourseName(result.courseName);
      setReferencedFiles(result.referencedFiles);
      setDigest(result.digest);
      setAssignedHomework(result.assignedHomework);
      setGeneratedHomework(result.generatedHomework);
    }
    run();
  }, [courseId, sessionId]);

  const techniques = courseName ? allConcepts.filter((c) => c.subject === courseName) : [];

  async function handleSaveDigest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const summary = requiredString(formData.get("summary"));
    const confusions = requiredString(formData.get("confusions"));
    const understoodConcept = requiredString(formData.get("understood_concept"));
    const oneLiner = requiredString(formData.get("one_liner"));

    if (!summary || !confusions || !understoodConcept || !oneLiner) {
      setError("All four digest questions are required.");
      return;
    }

    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from("digests").insert({
      session_id: sessionId,
      summary,
      confusions,
      understood_concept: understoodConcept,
      one_liner: oneLiner,
    });
    setBusy(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }
    await reload();
  }

  async function handleCloseSession() {
    setBusy(true);
    setError(null);

    // Fresh check, not the already-loaded `digest` state — mirrors the
    // Server Action's exact gate rather than trusting stale page state.
    const { data: freshDigest } = await supabase
      .from("digests")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (!freshDigest) {
      setBusy(false);
      setError("Write the digest before closing this session.");
      return;
    }

    const { error: updateError } = await supabase
      .from("class_sessions")
      .update({ closed_at: new Date().toISOString() })
      .eq("id", sessionId);
    setBusy(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    await reload();
  }

  async function handleAddAssignedHomework(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const question = requiredString(formData.get("question"));
    const submittedAnswer = requiredString(formData.get("submitted_answer"));

    if (!question || !submittedAnswer) {
      setError("Question and your submitted answer are required.");
      return;
    }

    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from("assigned_homework").insert({
      session_id: sessionId,
      question,
      submitted_answer: submittedAnswer,
    });
    setBusy(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }
    form.reset();
    await reload();
  }

  async function handleUpdateFeedback(homeworkId: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const feedback = requiredString(formData.get("grade_or_feedback"));

    setBusy(true);
    setError(null);
    const { error: updateError } = await supabase
      .from("assigned_homework")
      .update({ grade_or_feedback: feedback || null })
      .eq("id", homeworkId);
    setBusy(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    await reload();
  }

  async function handleAddGeneratedHomework(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const techniqueName = requiredString(formData.get("technique_name"));
    const question = requiredString(formData.get("question"));
    const userAnswer = requiredString(formData.get("user_answer"));
    const isCorrectRaw = formData.get("is_correct");
    const correctAnswerExplanation = requiredString(formData.get("correct_answer_explanation"));
    const isCorrectValid = isCorrectRaw === "true" || isCorrectRaw === "false";

    if (!techniqueName || !question || !userAnswer || !correctAnswerExplanation || !isCorrectValid) {
      setError("Fill in the technique, question, your answer, whether it was correct, and the explanation.");
      return;
    }

    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from("generated_homework").insert({
      session_id: sessionId,
      technique_name: techniqueName,
      question,
      user_answer: userAnswer,
      is_correct: isCorrectRaw === "true",
      correct_answer_explanation: correctAnswerExplanation,
    });
    setBusy(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }
    form.reset();
    await reload();
  }

  if (session === undefined) {
    return (
      <div className="page">
        <p className="field-hint">Loading…</p>
      </div>
    );
  }

  if (session === null) notFound();

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Class Session</div>
        <h1 className="fa-intro-title">{session.session_date}</h1>
        {session.closed_at ? (
          <span className="tag mastered">Closed</span>
        ) : (
          <span className="tag">Open</span>
        )}
      </section>

      <section className="panel">
        <h2>Referenced Lecture Files</h2>
        {referencedFiles.map((file) => (
          <p key={file.id}>{file.file_name}</p>
        ))}
      </section>

      <section className="panel">
        <h2>Digest</h2>
        {error && <p className="field-hint error">{error}</p>}

        {digest ? (
          <div className="form-grid">
            {DIGEST_QUESTIONS.map((q) => (
              <div key={q.name} className="field">
                <span className="field-label">{q.label}</span>
                <p>{digest[q.name]}</p>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSaveDigest} className="form-grid">
            {DIGEST_QUESTIONS.map((q) => (
              <div key={q.name} className="field">
                <label className="field-label" htmlFor={q.name}>
                  {q.label}
                </label>
                <textarea className="textarea" id={q.name} name={q.name} rows={3} required />
              </div>
            ))}
            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={busy}>
                Save Digest
              </button>
            </div>
          </form>
        )}
      </section>

      {digest && !session.closed_at && (
        <section className="panel">
          <div className="form-actions">
            <button type="button" className="btn primary" disabled={busy} onClick={handleCloseSession}>
              Close Session
            </button>
          </div>
        </section>
      )}

      <section className="panel">
        <h2>Assigned Homework</h2>
        <p className="field-hint">
          The real homework the professor gave, and what you actually turned in.
        </p>

        {assignedHomework.map((hw) => (
          <div key={hw.id} className="field">
            <span className="field-label">Question</span>
            <p>{hw.question}</p>
            <span className="field-label">Submitted answer</span>
            <p>{hw.submitted_answer}</p>
            {hw.grade_or_feedback ? (
              <>
                <span className="field-label">Feedback</span>
                <p>{hw.grade_or_feedback}</p>
              </>
            ) : null}
            <details>
              <summary className="btn">
                {hw.grade_or_feedback ? "Edit feedback" : "Add feedback"}
              </summary>
              <form
                onSubmit={(e) => handleUpdateFeedback(hw.id, e)}
                className="form-grid"
              >
                <div className="field">
                  <label className="field-label" htmlFor={`feedback-${hw.id}`}>
                    Feedback / grade from the professor
                  </label>
                  <textarea
                    className="textarea"
                    id={`feedback-${hw.id}`}
                    name="grade_or_feedback"
                    rows={2}
                    defaultValue={hw.grade_or_feedback ?? ""}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn primary" disabled={busy}>
                    Save
                  </button>
                </div>
              </form>
            </details>
          </div>
        ))}

        <details>
          <summary className="btn primary">+ Add Assigned Homework</summary>
          <form onSubmit={handleAddAssignedHomework} className="form-grid">
            <div className="field">
              <label className="field-label" htmlFor="question">
                Question from the professor
              </label>
              <textarea className="textarea" id="question" name="question" rows={3} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="submitted_answer">
                Answer you submitted
              </label>
              <textarea className="textarea" id="submitted_answer" name="submitted_answer" rows={3} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={busy}>
                Save
              </button>
            </div>
          </form>
        </details>
      </section>

      <section className="panel">
        <h2>Generated Homework</h2>
        <p className="field-hint">
          Practice questions you drilled yourself — wrong answers are the point, not something to hide.
        </p>

        {generatedHomework.map((hw) => (
          <div key={hw.id} className="field">
            <span className="field-label">{hw.technique_name}</span>{" "}
            {hw.is_correct ? (
              <span className="tag mastered">Correct</span>
            ) : (
              <span className="tag untrained">Incorrect</span>
            )}
            <p>{hw.question}</p>
            <span className="field-label">Your answer</span>
            <p>{hw.user_answer}</p>
            <span className="field-label">Explanation</span>
            <p>{hw.correct_answer_explanation}</p>
          </div>
        ))}

        <details>
          <summary className="btn primary">+ Add Practice Question</summary>
          <form onSubmit={handleAddGeneratedHomework} className="form-grid">
            <div className="field">
              <label className="field-label" htmlFor="technique_name">
                Technique
              </label>
              {techniques.length === 0 ? (
                <span className="field-hint">
                  No Techniques found for &ldquo;{courseName}&rdquo; in the vault yet.
                </span>
              ) : (
                <select className="select" id="technique_name" name="technique_name" required>
                  {techniques.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.skill_name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="field">
              <label className="field-label" htmlFor="gh_question">
                Question
              </label>
              <textarea className="textarea" id="gh_question" name="question" rows={2} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="gh_user_answer">
                Your answer
              </label>
              <textarea className="textarea" id="gh_user_answer" name="user_answer" rows={2} required />
            </div>
            <div className="field">
              <span className="field-label">Was it correct?</span>
              <div className="fa-band-row">
                <label className="checkbox-pill">
                  <input type="radio" name="is_correct" value="true" required />
                  Correct
                </label>
                <label className="checkbox-pill">
                  <input type="radio" name="is_correct" value="false" />
                  Incorrect
                </label>
              </div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="gh_explanation">
                Correct answer / explanation
              </label>
              <textarea className="textarea" id="gh_explanation" name="correct_answer_explanation" rows={2} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={busy}>
                Save
              </button>
            </div>
          </form>
        </details>
      </section>
    </div>
  );
}
