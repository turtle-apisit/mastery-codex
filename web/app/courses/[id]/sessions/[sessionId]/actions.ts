"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

function requiredString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function saveDigest(courseId: string, sessionId: string, formData: FormData) {
  const summary = requiredString(formData.get("summary"));
  const confusions = requiredString(formData.get("confusions"));
  const understoodConcept = requiredString(formData.get("understood_concept"));
  const oneLiner = requiredString(formData.get("one_liner"));

  if (!summary || !confusions || !understoodConcept || !oneLiner) {
    redirect(
      `/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent("All four digest questions are required.")}`,
    );
  }

  const { error } = await supabase.from("digests").insert({
    session_id: sessionId,
    summary,
    confusions,
    understood_concept: understoodConcept,
    one_liner: oneLiner,
  });

  if (error) {
    redirect(`/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/courses/${courseId}/sessions/${sessionId}`);
  redirect(`/courses/${courseId}/sessions/${sessionId}`);
}

export async function closeSession(courseId: string, sessionId: string) {
  const { data: digest } = await supabase
    .from("digests")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!digest) {
    redirect(
      `/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent("Write the digest before closing this session.")}`,
    );
  }

  const { error } = await supabase
    .from("class_sessions")
    .update({ closed_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) {
    redirect(`/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/courses/${courseId}/sessions/${sessionId}`);
  redirect(`/courses/${courseId}/sessions/${sessionId}`);
}
