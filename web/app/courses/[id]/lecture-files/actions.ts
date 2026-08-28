"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

// Uploading the file itself happens client-side, straight to Supabase
// Storage — Vercel's platform enforces a request-body ceiling on functions
// (and the edge in front of them) well below what a real lecture PDF needs,
// and that ceiling can't be raised from app code. This action only ever
// receives a few strings, never file bytes, so it never hits that limit.
export async function recordLectureFile(
  courseId: string,
  fileName: string,
  storagePath: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("lecture_files").insert({
    course_id: courseId,
    file_name: fileName,
    storage_path: storagePath,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/courses/${courseId}`);
  return { error: null };
}
