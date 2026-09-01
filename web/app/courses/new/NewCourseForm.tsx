"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Constants, type Enums, type TablesInsert } from "@/lib/supabase/types";

const GRADES: readonly string[] = Constants.public.Enums.grade;
type Grade = Enums<"grade">;

function optionalString(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function optionalGrade(value: FormDataEntryValue | null): Grade | undefined {
  const s = optionalString(value);
  if (!s) return undefined;
  return GRADES.includes(s) ? (s as Grade) : undefined;
}

export default function NewCourseForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = optionalString(formData.get("name"));
    const startDate = optionalString(formData.get("start_date"));
    const endDate = optionalString(formData.get("end_date"));

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setError("End date must be on or after the start date.");
      return;
    }

    const payload: TablesInsert<"courses"> = {
      name,
      start_date: startDate,
      end_date: endDate,
      midterm_date: optionalString(formData.get("midterm_date")),
      midterm_grade: optionalGrade(formData.get("midterm_grade")),
      final_date: optionalString(formData.get("final_date")),
      final_grade: optionalGrade(formData.get("final_grade")),
    };

    setBusy(true);
    setError(null);

    const { error: insertError } = await supabase.from("courses").insert(payload);

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    router.push("/courses");
  }

  return (
    <section className="panel">
      {error && <p className="field-hint error">{error}</p>}

      <form onSubmit={handleSubmit} className="form-grid">
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
          <button type="submit" className="btn primary" disabled={busy}>
            {busy ? "Creating…" : "Create Course"}
          </button>
          <Link href="/courses" className="btn">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
