import Link from "next/link";
import { Constants } from "@/lib/supabase/types";
import { createCourse } from "../actions";

const GRADES = Constants.public.Enums.grade;

export default async function NewCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="page">
      <section className="fa-intro cut">
        <div className="fa-intro-eyebrow eyebrow">Course Tracking</div>
        <h1 className="fa-intro-title">New Course</h1>
        <p className="fa-intro-sub">
          Name it exactly like the matching Technique&rsquo;s{" "}
          <code>subject</code> if you want its practice questions linked to
          real Techniques later.
        </p>
      </section>

      <section className="panel">
        {error && <p className="field-hint error">{error}</p>}

        <form action={createCourse} className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="name">
              Name
            </label>
            <input className="input" id="name" name="name" type="text" required />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="start_date">
              Start date
            </label>
            <input className="input" id="start_date" name="start_date" type="date" />
            <span className="field-hint">Optional — fill in later if you don&rsquo;t know it yet</span>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="end_date">
              End date
            </label>
            <input className="input" id="end_date" name="end_date" type="date" />
            <span className="field-hint">Optional — fill in later if you don&rsquo;t know it yet</span>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="midterm_date">
              Midterm date
            </label>
            <input className="input" id="midterm_date" name="midterm_date" type="date" />
            <span className="field-hint">Optional</span>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="midterm_grade">
              Midterm grade
            </label>
            <select className="select" id="midterm_grade" name="midterm_grade" defaultValue="">
              <option value="">—</option>
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="final_date">
              Final exam date
            </label>
            <input className="input" id="final_date" name="final_date" type="date" />
            <span className="field-hint">Optional</span>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="final_grade">
              Final grade
            </label>
            <select className="select" id="final_grade" name="final_grade" defaultValue="">
              <option value="">—</option>
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            <span className="field-hint">Certified once this is B or higher</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary">
              Create Course
            </button>
            <Link href="/courses" className="btn">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
