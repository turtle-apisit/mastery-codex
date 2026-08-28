import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import UploadForm from "./lecture-files/UploadForm";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single();

  if (!course) notFound();

  const { data: lectureFiles } = await supabase
    .from("lecture_files")
    .select("*")
    .eq("course_id", id)
    .order("uploaded_at", { ascending: false });

  const { data: sessions } = await supabase
    .from("class_sessions")
    .select("*")
    .eq("course_id", id)
    .order("session_date", { ascending: false });

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Course</div>
        <h1 className="fa-intro-title">{course.name}</h1>
        <p className="fa-intro-sub">
          {course.start_date || course.end_date
            ? `${course.start_date ?? "?"} – ${course.end_date ?? "?"}`
            : "Dates not set yet"}
        </p>
        {course.is_certified ? (
          <span className="tag certified">Certified</span>
        ) : (
          <span className="tag">In progress</span>
        )}
      </section>

      <section className="panel">
        <h2>Lecture Files</h2>

        {(!lectureFiles || lectureFiles.length === 0) && (
          <p className="field-hint">No files uploaded yet.</p>
        )}
        {(lectureFiles ?? []).map((file) => {
          const { data: urlData } = supabase.storage
            .from("lecture-files")
            .getPublicUrl(file.storage_path);
          return (
            <p key={file.id}>
              <a href={urlData.publicUrl} target="_blank" rel="noreferrer">
                {file.file_name}
              </a>{" "}
              {file.techniques_generated ? (
                <span className="tag mastered">Generated</span>
              ) : (
                <span className="tag">Not generated yet</span>
              )}
            </p>
          );
        })}

        <UploadForm courseId={course.id} />
      </section>

      <section className="panel">
        <h2>Class Sessions</h2>
        {(!sessions || sessions.length === 0) && (
          <p className="field-hint">No sessions logged yet.</p>
        )}
        {(sessions ?? []).map((session) => (
          <p key={session.id}>
            <Link href={`/courses/${course.id}/sessions/${session.id}`}>
              {session.session_date}
            </Link>{" "}
            {session.closed_at ? (
              <span className="tag mastered">Closed</span>
            ) : (
              <span className="tag">Open</span>
            )}
          </p>
        ))}
        <div className="form-actions">
          <Link href={`/courses/${course.id}/sessions/new`} className="btn primary">
            + New Session
          </Link>
        </div>
      </section>
    </div>
  );
}
