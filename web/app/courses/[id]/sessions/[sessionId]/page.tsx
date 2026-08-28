import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getAllConcepts } from "@/lib/vault";
import { saveDigest, closeSession } from "./actions";
import { addAssignedHomework, updateHomeworkFeedback, addGeneratedHomework } from "./homework-actions";

const DIGEST_QUESTIONS = [
  { name: "summary", label: "วันนี้เรียนเรื่องอะไรบ้าง" },
  { name: "confusions", label: "มีจุดไหนที่ยังไม่เข้าใจ/งงอยู่บ้าง" },
  { name: "understood_concept", label: "concept ไหนที่รู้สึกว่าเข้าใจแล้วจริงๆวันนี้" },
  { name: "one_liner", label: "ถ้าจะอธิบายสิ่งที่เรียนวันนี้ให้คนอื่นฟังใน 1 ประโยค จะพูดว่าอะไร" },
] as const;

export default async function SessionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; sessionId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id: courseId, sessionId } = await params;
  const { error } = await searchParams;

  const { data: session } = await supabase
    .from("class_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("course_id", courseId)
    .single();

  if (!session) notFound();

  const { data: course } = await supabase.from("courses").select("name").eq("id", courseId).single();
  const techniques = course
    ? getAllConcepts().filter((c) => c.subject === course.name)
    : [];

  const { data: sessionFileLinks } = await supabase
    .from("session_files")
    .select("lecture_file_id")
    .eq("session_id", sessionId);

  const lectureFileIds = (sessionFileLinks ?? []).map((link) => link.lecture_file_id);

  const { data: referencedFiles } =
    lectureFileIds.length > 0
      ? await supabase.from("lecture_files").select("id, file_name").in("id", lectureFileIds)
      : { data: [] };

  const { data: digest } = await supabase
    .from("digests")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  const { data: assignedHomework } = await supabase
    .from("assigned_homework")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

  const { data: generatedHomework } = await supabase
    .from("generated_homework")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

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
        {(referencedFiles ?? []).map((file) => (
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
          <form action={saveDigest.bind(null, courseId, sessionId)} className="form-grid">
            {DIGEST_QUESTIONS.map((q) => (
              <div key={q.name} className="field">
                <label className="field-label" htmlFor={q.name}>
                  {q.label}
                </label>
                <textarea className="textarea" id={q.name} name={q.name} rows={3} required />
              </div>
            ))}
            <div className="form-actions">
              <button type="submit" className="btn primary">
                Save Digest
              </button>
            </div>
          </form>
        )}
      </section>

      {digest && !session.closed_at && (
        <section className="panel">
          <form action={closeSession.bind(null, courseId, sessionId)}>
            <div className="form-actions">
              <button type="submit" className="btn primary">
                Close Session
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="panel">
        <h2>Assigned Homework</h2>
        <p className="field-hint">
          The real homework the professor gave, and what you actually turned in.
        </p>

        {(assignedHomework ?? []).map((hw) => (
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
              <form action={updateHomeworkFeedback.bind(null, courseId, sessionId, hw.id)} className="form-grid">
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
                  <button type="submit" className="btn primary">
                    Save
                  </button>
                </div>
              </form>
            </details>
          </div>
        ))}

        <details>
          <summary className="btn primary">+ Add Assigned Homework</summary>
          <form action={addAssignedHomework.bind(null, courseId, sessionId)} className="form-grid">
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
              <button type="submit" className="btn primary">
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

        {(generatedHomework ?? []).map((hw) => (
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
          <form action={addGeneratedHomework.bind(null, courseId, sessionId)} className="form-grid">
            <div className="field">
              <label className="field-label" htmlFor="technique_name">
                Technique
              </label>
              {techniques.length === 0 ? (
                <span className="field-hint">
                  No Techniques found for &ldquo;{course?.name}&rdquo; in the vault yet.
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
              <button type="submit" className="btn primary">
                Save
              </button>
            </div>
          </form>
        </details>
      </section>
    </div>
  );
}
