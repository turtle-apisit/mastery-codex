import NewCourseForm from "./NewCourseForm";

export default function NewCoursePage() {
  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Course Tracking</div>
        <h1 className="fa-intro-title">New Course</h1>
        <p className="fa-intro-sub">
          Name it exactly like a Technique&rsquo;s <code>subject</code> in
          Supabase if you want its practice questions linked to real
          Techniques later.
        </p>
      </section>

      <NewCourseForm />
    </div>
  );
}
