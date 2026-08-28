"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

export async function createCourse(formData: FormData) {
  const name = optionalString(formData.get("name"));
  const startDate = optionalString(formData.get("start_date"));
  const endDate = optionalString(formData.get("end_date"));

  if (!name) {
    redirect(`/courses/new?error=${encodeURIComponent("Name is required.")}`);
  }

  if (startDate && endDate && endDate < startDate) {
    redirect(`/courses/new?error=${encodeURIComponent("End date must be on or after the start date.")}`);
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

  const { error } = await supabase.from("courses").insert(payload);

  if (error) {
    redirect(`/courses/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/courses");
  redirect("/courses");
}
