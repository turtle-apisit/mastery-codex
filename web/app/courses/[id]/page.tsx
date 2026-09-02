"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { getAllConcepts, type Concept } from "@/lib/techniques";
import type { Tables } from "@/lib/supabase/types";
import UploadForm from "./lecture-files/UploadForm";

type Course = Tables<"courses">;
type LectureFile = Tables<"lecture_files">;
type ClassSession = Tables<"class_sessions">;

/** Groups techniques by unit (falling back to the first source file when a
 * Technique has no unit set), in first-seen order, and sorts each group's
 * techniques alphabetically — a stable reading order for review, not a graph
 * layout. */
function groupByUnit(techniques: Concept[]): [string, Concept[]][] {
  const groups = new Map<string, Concept[]>();
  for (const t of techniques) {
    const key = t.unit ?? t.source[0] ?? "Ungrouped";
    const arr = groups.get(key) ?? [];
    arr.push(t);
    groups.set(key, arr);
  }
  for (const arr of groups.values()) {
    arr.sort((a, b) => a.skill_name.localeCompare(b.skill_name));
  }
  return Array.from(groups.entries());
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<Course | null | undefined>(undefined);
  const [lectureFiles, setLectureFiles] = useState<LectureFile[]>([]);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [techniques, setTechniques] = useState<Concept[]>([]);

  useEffect(() => {
    async function load() {
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();
      setCourse(courseData ?? null);
      if (!courseData) return;

      const [{ data: files }, { data: sessionRows }, allConcepts] = await Promise.all([
        supabase
          .from("lecture_files")
          .select("*")
          .eq("course_id", id)
          .order("uploaded_at", { ascending: false }),
        supabase
          .from("class_sessions")
          .select("*")
          .eq("course_id", id)
          .order("session_date", { ascending: false }),
        getAllConcepts(),
      ]);
      setLectureFiles(files ?? []);
      setSessions(sessionRows ?? []);
      // Course = Skill/subject: a Technique belongs to this course when its
      // `subject` matches the course name exactly, same rule the Navigation
      // page's Skills Acquired uses.
      setTechniques(allConcepts.filter((c) => c.subject === courseData.name));
    }
    load();
  }, [id]);

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

        {lectureFiles.length === 0 && <p className="field-hint">No files uploaded yet.</p>}
        {lectureFiles.map((file) => {
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

        <UploadForm courseId={course.id} courseName={course.name} />
      </section>

      <section className="panel">
        <h2>Class Sessions</h2>
        {sessions.length === 0 && <p className="field-hint">No sessions logged yet.</p>}
        {sessions.map((session) => (
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

      <section className="panel">
        <h2>Techniques</h2>
        {techniques.length === 0 ? (
          <p className="field-hint">
            No Techniques captured for this course yet — ask Lyra to read a
            lecture file above once it&rsquo;s uploaded.
          </p>
        ) : (
          <>
            <p className="field-hint">{techniques.length} techniques captured</p>
            {groupByUnit(techniques).map(([unit, group]) => (
              <div className="technique-group" key={unit}>
                <h3 className="technique-group-title">{unit}</h3>
                {group.map((t) => (
                  <div className="technique-note" key={t.slug}>
                    <div className="technique-note-head">
                      <h3>{t.skill_name}</h3>
                      {t.content_type && <span className="tag">{t.content_type}</span>}
                    </div>
                    {t.explanation ? (
                      <p>{t.explanation}</p>
                    ) : (
                      <p className="field-hint">
                        No explanation captured for this one yet.
                      </p>
                    )}
                    {t.prerequisites.length > 0 && (
                      <p className="field-hint">
                        Requires: {t.prerequisites.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}
