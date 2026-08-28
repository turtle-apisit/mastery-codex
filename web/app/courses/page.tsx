import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

// This list changes whenever a course is created — always read current data
// rather than serving a build-time static snapshot.
export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("start_date", { ascending: false });

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Course Tracking</div>
        <h1 className="fa-intro-title">Courses</h1>
        <p className="fa-intro-sub">
          Every course you&rsquo;re studying as a Skill — lecture files, class
          sessions, and the exam result that decides whether it&rsquo;s
          Certified.
        </p>
        <Link href="/courses/new" className="btn primary">
          + New Course
        </Link>
      </section>

      <section className="fa-subject-list">
        {(!courses || courses.length === 0) && (
          <p className="field-hint">No courses yet — add your first one.</p>
        )}
        {(courses ?? []).map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="subject-card cut-sm course-list-card"
          >
            <div className="subject-head static">
              <span className="subject-name">{course.name}</span>
              <span className="subject-meta">
                {course.start_date || course.end_date
                  ? `${course.start_date ?? "?"} – ${course.end_date ?? "?"}`
                  : "Dates not set yet"}
              </span>
              {course.is_certified ? (
                <span className="tag certified">Certified</span>
              ) : (
                <span className="tag">In progress</span>
              )}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
