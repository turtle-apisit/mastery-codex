import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { createSession } from "../actions";

export default async function NewSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id: courseId } = await params;
  const { error } = await searchParams;

  const { data: course } = await supabase.from("courses").select("id, name").eq("id", courseId).single();
  if (!course) notFound();

  const { data: lectureFiles } = await supabase
    .from("lecture_files")
    .select("id, file_name")
    .eq("course_id", courseId)
    .order("uploaded_at", { ascending: false });

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">{course.name}</div>
        <h1 className="fa-intro-title">New Session</h1>
        <p className="fa-intro-sub">
          Pick the date and every lecture file this class covered — at least one.
        </p>
      </section>

      <section className="panel">
        {error && <p className="field-hint error">{error}</p>}

        <form action={createSession.bind(null, courseId)} className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="session_date">
              Session date
            </label>
            <input className="input" id="session_date" name="session_date" type="date" required />
          </div>

          <div className="field">
            <span className="field-label">Lecture files referenced</span>
            {(!lectureFiles || lectureFiles.length === 0) ? (
              <span className="field-hint">
                No lecture files uploaded yet — <Link href={`/courses/${courseId}`}>upload one first</Link>.
              </span>
            ) : (
              <div className="fa-band-row">
                {lectureFiles.map((file) => (
                  <label key={file.id} className="checkbox-pill">
                    <input type="checkbox" name="lecture_file_id" value={file.id} />
                    {file.file_name}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary">
              Create Session
            </button>
            <Link href={`/courses/${courseId}`} className="btn">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
