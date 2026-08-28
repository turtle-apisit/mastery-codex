"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export async function createSession(courseId: string, formData: FormData) {
  const sessionDate = formData.get("session_date");
  const lectureFileIds = formData
    .getAll("lecture_file_id")
    .filter((v): v is string => typeof v === "string" && v.trim() !== "");

  if (typeof sessionDate !== "string" || sessionDate.trim() === "") {
    redirect(
      `/courses/${courseId}/sessions/new?error=${encodeURIComponent("Session date is required.")}`,
    );
  }

  if (lectureFileIds.length === 0) {
    redirect(
      `/courses/${courseId}/sessions/new?error=${encodeURIComponent("Reference at least one lecture file.")}`,
    );
  }

  const { data: session, error: sessionError } = await supabase
    .from("class_sessions")
    .insert({ course_id: courseId, session_date: sessionDate })
    .select("id")
    .single();

  if (sessionError || !session) {
    redirect(
      `/courses/${courseId}/sessions/new?error=${encodeURIComponent(sessionError?.message ?? "Failed to create session.")}`,
    );
  }

  const { error: filesError } = await supabase
    .from("session_files")
    .insert(lectureFileIds.map((lectureFileId) => ({ session_id: session.id, lecture_file_id: lectureFileId })));

  if (filesError) {
    redirect(`/courses/${courseId}/sessions/new?error=${encodeURIComponent(filesError.message)}`);
  }

  redirect(`/courses/${courseId}/sessions/${session.id}`);
}
