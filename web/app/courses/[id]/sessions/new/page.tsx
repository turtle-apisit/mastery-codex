"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";

type Course = Pick<Tables<"courses">, "id" | "name">;
type LectureFile = Pick<Tables<"lecture_files">, "id" | "file_name">;

export default function NewSessionPage() {
  const { id: courseId } = useParams<{ id: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null | undefined>(undefined);
  const [lectureFiles, setLectureFiles] = useState<LectureFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: courseData } = await supabase
        .from("courses")
        .select("id, name")
        .eq("id", courseId)
        .single();
      setCourse(courseData ?? null);
      if (!courseData) return;

      const { data: files } = await supabase
        .from("lecture_files")
        .select("id, file_name")
        .eq("course_id", courseId)
        .order("uploaded_at", { ascending: false });
      setLectureFiles(files ?? []);
    }
    load();
  }, [courseId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sessionDate = formData.get("session_date");
    const lectureFileIds = formData
      .getAll("lecture_file_id")
      .filter((v): v is string => typeof v === "string" && v.trim() !== "");

    if (typeof sessionDate !== "string" || sessionDate.trim() === "") {
      setError("Session date is required.");
      return;
    }
    if (lectureFileIds.length === 0) {
      setError("Reference at least one lecture file.");
      return;
    }

    setBusy(true);
    setError(null);

    const { data: session, error: sessionError } = await supabase
      .from("class_sessions")
      .insert({ course_id: courseId, session_date: sessionDate })
      .select("id")
      .single();

    if (sessionError || !session) {
      setError(sessionError?.message ?? "Failed to create session.");
      setBusy(false);
      return;
    }

    const { error: filesError } = await supabase
      .from("session_files")
      .insert(lectureFileIds.map((lectureFileId) => ({ session_id: session.id, lecture_file_id: lectureFileId })));

    if (filesError) {
      setError(filesError.message);
      setBusy(false);
      return;
    }

    router.push(`/courses/${courseId}/sessions/${session.id}`);
  }

  if (course === undefined) {
    return (
      <div className="page">
        <p className="field-hint">Loading…</p>
      </div>
    );
  }

  if (course === null) notFound();

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

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="session_date">
              Session date
            </label>
            <input className="input" id="session_date" name="session_date" type="date" required />
          </div>

          <div className="field">
            <span className="field-label">Lecture files referenced</span>
            {lectureFiles.length === 0 ? (
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
            <button type="submit" className="btn primary" disabled={busy}>
              {busy ? "Creating…" : "Create Session"}
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
