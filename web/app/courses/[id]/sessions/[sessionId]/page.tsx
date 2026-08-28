import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { saveDigest, closeSession } from "./actions";

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
    </div>
  );
}
