"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

// Mirrors assets/raw-data/<Subject>/<file> one level down: a lecture_files
// row only has course_id, not a subject string.
const BUCKET = "lecture-files";

export async function uploadLectureFiles(courseId: string, formData: FormData) {
  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) {
    redirect(`/courses/${courseId}?error=${encodeURIComponent("Choose at least one file to upload.")}`);
  }

  for (const file of files) {
    const path = `${courseId}/${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true });

    if (uploadError) {
      redirect(`/courses/${courseId}?error=${encodeURIComponent(`${file.name}: ${uploadError.message}`)}`);
    }

    const { error: insertError } = await supabase.from("lecture_files").insert({
      course_id: courseId,
      file_name: file.name,
      storage_path: uploadData.path,
    });

    if (insertError) {
      redirect(`/courses/${courseId}?error=${encodeURIComponent(`${file.name}: ${insertError.message}`)}`);
    }
  }

  revalidatePath(`/courses/${courseId}`);
  redirect(`/courses/${courseId}`);
}
