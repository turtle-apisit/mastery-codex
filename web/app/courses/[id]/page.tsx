import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single();

  if (!course) notFound();

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Course</div>
        <h1 className="fa-intro-title">{course.name}</h1>
        <p className="fa-intro-sub">
          {course.start_date} – {course.end_date}
        </p>
        {course.is_certified ? (
          <span className="tag certified">Certified</span>
        ) : (
          <span className="tag">In progress</span>
        )}
      </section>

      <section className="panel">
        <h2>Lecture files &amp; sessions</h2>
        <p className="field-hint">Coming soon.</p>
      </section>
    </div>
  );
}
